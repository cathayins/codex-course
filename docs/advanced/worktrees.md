---
title: Subagents：拆分、平行處理與彙整
description: 從工作原理、基礎配置與使用時機開始，實際派出 Subagents，最後建立可重複使用的客製化 Agent。
outline: [2, 3]
---

# Subagents：拆分、平行處理與彙整

Subagent 是由主 agent 派出去處理**特定子任務**的輔助 agent。每個 Subagent 在自己的 thread 中工作，完成後把精簡結果交回主 task，由主 agent 做最後判斷與交付。

你可以把它想成一位組長帶著幾位專員：組長保存完整需求與做決定，專員則各自調查一個清楚的小問題。

::: tip 選修章
核心路線已在 Scheduled tasks 完成。只有需要平行探索、多角色審查或重複分工時，才繼續本章；小型任務或有強烈前後依賴的工作可以直接跳過。
:::

<section class="lesson-goals" aria-labelledby="subagents-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="subagents-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>判斷任務是否適合拆分、派出與管理 Subagents，並為團隊建立一個專用的客製化 Agent。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>看懂原理</strong><span>分清楚主 agent、Subagent 與 agent thread。</span></article>
    <article><strong>正確派工</strong><span>寫清楚子任務、限制與回報格式。</span></article>
    <article><strong>選對時機</strong><span>只平行處理彼此獨立的工作。</span></article>
    <article><strong>建立專員</strong><span>用 TOML 定義可重複使用的 Agent。</span></article>
  </div>
</section>

<nav class="lesson-flow subagents-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 工作原理</span>
  <span><b>02</b> 基礎配置</span>
  <span><b>03</b> 如何使用</span>
  <span><b>04</b> 使用時機</span>
  <span><b>05</b> 實戰</span>
  <span><b>06</b> 客製 Agent</span>
</nav>

## 1｜工作原理

一次 Subagent 工作流可以看成「一對多，再回到一」：主 agent 拆出彼此獨立的子任務，等待多個 Subagents 完成，最後再統一彙整。

<figure class="subagents-model" aria-labelledby="subagents-model-title">
  <figcaption>
    <span class="lesson-eyebrow">HOW IT WORKS</span>
    <strong id="subagents-model-title">一個主 agent，拆成多個 Subagents，再匯聚成一個結果</strong>
  </figcaption>
  <div class="subagents-model__flow" role="group" aria-label="一個主 agent 拆分成三個 Subagents，再匯聚結果">
    <article class="subagents-model__main">
      <span>MAIN AGENT · DELEGATE</span>
      <strong>拆出三個獨立問題</strong>
      <p>主 agent 保存完整需求，為每個子任務指定責任與回報格式。</p>
    </article>
    <div class="subagents-model__arrow" aria-hidden="true"><span>拆分並平行執行</span><i>↓</i></div>
    <div class="subagents-model__workers">
      <article>
        <span>SUBAGENT A</span>
        <strong>探索程式碼</strong>
        <p>追蹤相關模組與執行路徑。</p>
      </article>
      <article>
        <span>SUBAGENT B</span>
        <strong>執行測試</strong>
        <p>檢查失敗案例與測試缺口。</p>
      </article>
      <article>
        <span>SUBAGENT C</span>
        <strong>查證文件</strong>
        <p>確認 API 與版本相關行為。</p>
      </article>
    </div>
    <div class="subagents-model__arrow is-merge" aria-hidden="true"><span>等待並匯聚結果</span><i>↓</i></div>
    <article class="subagents-model__result">
      <span>MAIN AGENT · SYNTHESIZE</span>
      <strong>整理成一個可交付結論</strong>
      <p>比較證據、處理重複或矛盾，完成最後決策與回覆。</p>
    </article>
  </div>
</figure>

### 三個核心名詞

<section class="subagents-concept-grid" aria-label="Subagents 的三個核心名詞">
  <article><span>MAIN AGENT</span><strong>主 agent</strong><p>保存需求、限制與決策，也是最後對結果負責的人。</p></article>
  <article><span>SUBAGENT</span><strong>子代理</strong><p>由主 agent 啟動，專心完成一個有邊界的子任務。</p></article>
  <article><span>AGENT THREAD</span><strong>工作 thread</strong><p>Subagent 的獨立工作空間，可以開啟查看進度與證據。</p></article>
</section>

### 為什麼不全部放在主 task？

探索筆記、測試 log、stack trace 與大量搜尋結果會佔用主 task 的 context。Subagents 把這些中間過程留在各自的 thread，只把精簡結論帶回來，讓主 agent 繼續專注在需求、判斷與交付。

::: info Subagent 不是另一個完全獨立的 task
一般 task 彼此沒有自動的派工與彙整關係。Subagent 則是由主 agent 建立與管理，結果會回到原本的主 task。
:::

::: warning 平行不等於免費
每個 Subagent 都會進行自己的 model 與 tool 工作，因此會增加 token、工具與執行時間成本。拆分得越模糊，協調成本越高。
:::

## 2｜基礎配置

目前的 Codex 已預設啟用 Subagents。一般使用者不需要加入 feature flag，只要在 Prompt 中直接要求 Codex 派出 Subagents 即可。

### 先確認使用介面

Subagent activity 目前可出現在以下 Codex clients：

- **ChatGPT desktop app**：在主 task 查看活動，開啟個別 Subagent thread。
- **Codex CLI**：使用 `/agent` 查看與切換 agent threads。
- **Codex IDE extension**：從 background-agent panel 查看狀態與 thread。

### 大多數人不需要改設定

<section class="subagents-config-grid" aria-label="預設設定與選用設定">
  <article class="is-default">
    <span>RECOMMENDED</span>
    <strong>先使用預設值</strong>
    <p>直接在 Prompt 說明如何拆分、是否等待，以及最後如何彙整。</p>
    <small>適合第一次使用與大部分日常任務。</small>
  </article>
  <article class="is-optional">
    <span>OPTIONAL</span>
    <strong>需要時才調整</strong>
    <p>只有在團隊確實需要限制同時開啟的 threads 或巢狀深度時，才修改設定。</p>
    <small>設定檔可放在個人或專案範圍。</small>
  </article>
</section>

選用的 `.codex/config.toml` 範例：

```toml
[agents]
max_threads = 6
max_depth = 1
```

| 設定 | 預設 | 意義 |
| --- | ---: | --- |
| `max_threads` | `6` | 同時保持開啟的 agent thread 上限 |
| `max_depth` | `1` | 只允許主 agent 建立直接的 Subagents |

`max_depth = 1` 已適合大部分課程與專案。提高深度會讓 Subagent 繼續派出下一層 Subagent，容易增加成本，也更難掌握工作邊界。

::: danger 先設定父 task 的權限
Subagents 會繼承父 task 當下的 Permission／Sandbox 與可用工具。派工前先確認權限；只需要審查時，就不要提供不必要的寫入或外部操作權限。
:::

## 3｜如何使用

### 第一次派工：直接說出「使用 Subagents」

在 App 的 Prompt 清楚指定要平行處理的子任務：

```md{1}
請使用 3 個 Subagents 平行審查目前 branch：

1. 一個檢查安全風險。
2. 一個檢查測試缺口。
3. 一個檢查可維護性問題。

三個 Subagents 都只能讀取，不要修改檔案。
等待全部完成後，再由主 agent 依嚴重度彙整結果，
每項附上檔案路徑與證據。
```

### 從派工到追問

從建立 Agent 到追問結果，跟著下面四個畫面走一次。

<MediaTabs
  class="subagents-media-tabs"
  aria-label="Subagent 執行中的管理畫面"
  :items="[
    {
      label: '開始任務',
      title: '在 Prompt 裡建立分工明確的 Agents',
      description: '先說明每個 Agent 要處理的問題與最後要交回什麼。這裡一次派出 Architecture、Quality 與 Developer experience 三位 Agent，讓它們平行探索同一個 Repository 的不同面向。',
      image: '/images/worktrees/start-agent.png',
      alt: 'Codex 主 task 顯示建立三位 Subagent 的訊息與工作名稱',
      fit: 'compact'
    },
    {
      label: '查看全體',
      title: '先從 Subagents 面板掌握全體狀態',
      description: '右側面板把正在執行的工作放在 Active，完成的放在 Done。從名稱、狀態與摘要先判斷進度，再決定哪一條 thread 值得深入查看。',
      image: '/images/worktrees/subagent-overview.png',
      alt: 'Codex 的 Subagents 面板，列出三位已完成的 Agent 與摘要',
      fit: 'compact'
    },
    {
      label: '開啟 thread',
      title: '查看單一 Agent 的完整結論',
      description: '從清單開啟 Architecture thread，就能核對它實際檢查的範圍、引用的檔案與結論。把它當成主 task 的研究材料，而不是不經檢查就直接採用的最終答案。',
      image: '/images/worktrees/subagent-thread.png',
      alt: 'Codex 開啟 Architecture Agent thread，顯示完整分析與結論',
      fit: 'compact'
    },
    {
      label: '追問引導',
      title: '回到主 task，用 @ 指名 Agent 補查',
      description: '如果答案還不夠具體，直接在主 task 用 @ 指名要追問的 Agent，補上新的問題或範圍。畫面會同時保留整體狀態，讓你知道其他 Agents 是否已完成。',
      image: '/images/worktrees/subagent-followup.png',
      alt: 'Codex 主 task 以 @Architecture 追問，右側 Subagents 面板顯示三位 Agent 狀態',
      fit: 'compact'
    }
  ]"
/>

### 使用時機

最簡單的判斷方式是問：**這些子任務能不能彼此獨立完成，最後再一起整理？**

<section class="subagents-decision-grid" aria-label="適合與不適合使用 Subagents 的情境">
  <article class="is-good">
    <span>GOOD FIT</span>
    <strong>適合使用</strong>
    <ul>
      <li>從不同角度審查同一個 PR。</li>
      <li>探索大型 codebase 的不同模組。</li>
      <li>分別執行獨立的測試或 log 分析。</li>
      <li>比對多份文件並回報精簡摘要。</li>
      <li>讓專員查證資料，主 agent 繼續規劃。</li>
    </ul>
  </article>
  <article class="is-bad">
    <span>POOR FIT</span>
    <strong>先不要使用</strong>
    <ul>
      <li>任務很小，一個 agent 很快就能完成。</li>
      <li>子任務有強烈前後依賴，不能平行。</li>
      <li>你還無法說清楚每個人的責任。</li>
      <li>多個 agents 會同時修改相同檔案。</li>
      <li>協調成本高於實際工作量。</li>
    </ul>
  </article>
</section>

::: tip 從讀取型任務開始
探索、審查、測試、分類與摘要通常衝突較少。多個 agents 同時寫入同一批 shared files，容易互相覆蓋或產生難以整合的修改；初學時把最後寫入集中交給主 agent。
:::

## 4｜進階：客製化 Agent

當某種分工會重複出現，例如每週都要檢查 CSV 品質並產生相同格式的摘要，就可以把角色寫成客製化 Agent。

Codex 內建三種 agent：

<section class="subagents-builtins" aria-label="Codex 內建 Agent">
  <article><span>default</span><strong>通用工作</strong><p>沒有更適合角色時使用的預設 agent。</p></article>
  <article><span>worker</span><strong>實作與修正</strong><p>偏向執行、修改與完成交付。</p></article>
  <article><span>explorer</span><strong>讀取與探索</strong><p>偏向搜尋 codebase 與收集證據。</p></article>
</section>

### 選擇個人或專案範圍

| 放置位置 | 適用範圍 | 適合情境 |
| --- | --- | --- |
| `~/.codex/agents/` | 你的所有專案 | 個人的固定資料分析流程 |
| `.codex/agents/` | 目前 Repository | 團隊共同使用的專案角色 |

每個 `.toml` 檔定義一個 Agent。檔名最好與 Agent 名稱一致，方便維護；真正用來辨識 Agent 的是檔案內的 `name`。

### 建立資料分析 Agent

建立 `.codex/agents/data-analyst.toml`：

```toml
name = "data_analyst" # [!code highlight]
description = "檢查結構化資料品質，並產生有計算依據的分析摘要。" # [!code highlight]
nickname_candidates = ["Iris", "Nova", "Vega"]
sandbox_mode = "read-only"

developer_instructions = """ # [!code highlight]
像資料分析師一樣檢查資料與計算結果。

分析前先確認：
- 欄位名稱、資料型別與日期範圍
- 缺失值、重複列與明顯異常值
- 指標的定義與計算方式

使用可重現的 Python 計算，並區分資料事實與推論。
每個結論都要附上支持數據。
不要修改原始資料，也不要產生新的檔案。
"""
```

三個必要欄位是：

| 欄位 | 用途 |
| --- | --- |
| `name` | Codex 用來辨識與指派這個 Agent 的名稱 |
| `description` | 說明什麼情況應該使用它 |
| `developer_instructions` | 定義它的工作方式、優先順序與限制 |

`nickname_candidates` 與 `sandbox_mode` 是選用欄位。沒有指定 `model`、`model_reasoning_effort`、MCP 或 Skills 時，會繼承父 session 的設定。

### 使用客製化 Data Analyst

```text
請使用 data_analyst Agent 分析 data/north.csv。

先檢查資料品質，再計算總營收、每月營收與地區表現。
等待 data_analyst 完成後，由主 agent 將結果整理成摘要，
不要修改或產生任何檔案。
```

### 客製化原則

1. **角色要窄**：一個 Agent 專注一類工作，不要變成另一個「什麼都做」的 agent。
2. **描述要清楚**：讓 Codex 知道何時選擇這個 Agent。
3. **限制要明確**：寫出能否修改、必須提供的證據與停止條件。
4. **先用預設設定**：只有品質、速度或工具需求不同時，再指定 model、reasoning、MCP 或 Skills。
5. **先小範圍驗證**：用一份熟悉的小型資料集測試，檢查計算是否正確後再交給團隊。

## 延伸閱讀

- [OpenAI 官方文件：Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [菜鳥教程：Codex 子代理（Subagents）](https://www.runoob.com/codex/codex-subagents.html)
- [CSDN：Codex Subagents 原理、時機與實戰](https://blog.csdn.net/qq_24256877/article/details/161925043)
- [核心路線終點：Scheduled tasks](/advanced/automation)
- [選修下一章：Hooks](/advanced/hooks) — 需要 lifecycle 強制控制時再繼續。
