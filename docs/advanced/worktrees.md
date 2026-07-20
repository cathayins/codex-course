---
title: Subagents：拆分、平行處理與彙整
description: 介紹 Subagents 的工作原理、基礎配置與使用時機，包含平行派工與客製化 Agent 的實作。
outline: [2, 3]
---

# Subagents：拆分、平行處理與彙整

Subagent 是由主 agent 派出、負責**特定子任務**的輔助 agent。每個 Subagent 在自己的 thread 中工作，完成後將精簡結果交回主 task，再由主 agent 判斷並交付最終結果。

主 agent 像組長，負責掌握完整需求與做決定；Subagents 像專員，各自處理一個範圍明確的小問題。

<section class="lesson-goals" aria-labelledby="subagents-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="subagents-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>判斷任務是否適合拆分，學會派出與管理 Subagents，並為團隊建立專用的客製化 Agent。</p>
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

一次 Subagent 工作流通常分成三步：主 agent 拆出彼此獨立的子任務，等待多個 Subagents 完成後，再統一彙整結果。

<figure class="subagents-model" aria-labelledby="subagents-model-title">
  <figcaption>
    <span class="lesson-eyebrow">HOW IT WORKS</span>
    <strong id="subagents-model-title">一個主 agent，拆成多個 Subagents，再彙整為一個結果</strong>
  </figcaption>
  <div class="subagents-model__flow" role="group" aria-label="一個主 agent 拆分成三個 Subagents，再匯聚結果">
    <article class="subagents-model__main">
      <span>MAIN AGENT · DELEGATE</span>
      <strong>拆出三個獨立問題</strong>
      <p>主 agent 掌握完整需求，並界定每個子任務的範圍與回報格式。</p>
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
      <p>比較證據、處理重複或矛盾，再做出最終決策並回覆。</p>
    </article>
  </div>
</figure>

### 三個核心名詞

<section class="subagents-concept-grid" aria-label="Subagents 的三個核心名詞">
  <article><span>MAIN AGENT</span><strong>主 agent</strong><p>掌握需求與限制、負責決策，也對最終結果負責。</p></article>
  <article><span>SUBAGENT</span><strong>子代理</strong><p>由主 agent 啟動，專注處理範圍明確的子任務。</p></article>
  <article><span>AGENT THREAD</span><strong>工作 thread</strong><p>Subagent 的獨立工作空間，可用來查看進度與證據。</p></article>
</section>

### 為什麼不全部放在主 task？

探索筆記、測試 log、stack trace 與大量搜尋結果會佔用主 task 的 context。Subagents 將中間過程留在各自的 thread，只把精簡結論帶回主 task，讓主 agent 將 context 留給需求、判斷與交付。

::: info Subagent 不是另一個完全獨立的 task
一般 task 彼此沒有自動的派工與彙整關係。Subagent 則是由主 agent 建立與管理，結果會回到原本的主 task。
:::

::: warning 平行不等於免費
每個 Subagent 都會各自使用 model 與 tools，因此會增加 token 用量、工具呼叫次數與執行時間。子任務的界線越模糊，協調成本越高。
:::

## 2｜基礎配置

Codex 目前預設啟用 Subagents。在 Prompt 中直接要求 Codex 派出 Subagents 即可，不需要加入 feature flag。

### 支援 Subagents 的 Codex 介面

目前可在以下 Codex clients 查看 Subagent activity：

- **ChatGPT desktop app**：在主 task 查看活動，開啟個別 Subagent thread。
- **Codex CLI**：使用 `/agent` 查看與切換 agent threads。
- **Codex IDE extension**：從 background-agent panel 查看狀態與 thread。

### 通常維持預設設定即可

<section class="subagents-config-grid" aria-label="預設設定與選用設定">
  <article class="is-default">
    <span>RECOMMENDED</span>
    <strong>使用預設值</strong>
    <p>在 Prompt 中清楚說明任務如何拆分、是否等待，以及如何彙整結果。</p>
    <small>適合初次使用與大部分日常任務。</small>
  </article>
  <article class="is-optional">
    <span>OPTIONAL</span>
    <strong>需要調整的情境</strong>
    <p>若團隊需要限制同時開啟的 threads 或巢狀深度，再調整設定。</p>
    <small>可在個人或專案層級設定。</small>
  </article>
</section>

以下是 `.codex/config.toml` 的選用設定範例：

```toml
[agents]
max_threads = 6
max_depth = 1
```

| 設定 | 預設 | 意義 |
| --- | ---: | --- |
| `max_threads` | `6` | 可同時開啟的 agent thread 數量上限 |
| `max_depth` | `1` | 主 agent 只能建立第一層 Subagents |

`max_depth = 1` 適合大部分課程與專案。提高深度會讓 Subagent 繼續派出下一層 Subagent，容易增加成本，也更難掌握工作邊界。

::: danger 父 task 的權限設定
Subagents 會繼承父 task 當下的 Permission／Sandbox 與可用工具。派工前應確認權限。若任務只需審查，不應提供不必要的寫入或外部操作權限。
:::

## 3｜如何使用

### 第一次派工：在 Prompt 中指定使用 Subagents

在 App 的 Prompt 中，清楚列出要平行處理的子任務：

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

以下四個畫面依序呈現建立 Agent、查看狀態與追問結果的過程。

<MediaTabs
  class="subagents-media-tabs"
  aria-label="Subagent 執行中的管理畫面"
  :items="[
    {
      label: '開始任務',
      title: '在 Prompt 裡建立分工明確的 Agents',
      description: '在 Prompt 中先說明每個 Agent 的任務與回報格式。範例中一次派出 Architecture、Quality 與 Developer experience 三位 Agent，分別探索同一個 Repository 的不同面向。',
      image: '/images/worktrees/start-agent.png',
      alt: 'Codex 主 task 顯示建立三位 Subagent 的訊息與工作名稱',
      fit: 'compact'
    },
    {
      label: '查看全體',
      title: '先從 Subagents 面板掌握全體狀態',
      description: '右側面板將執行中的工作列在 Active，已完成的工作列在 Done。可從名稱、狀態與摘要掌握進度，再決定是否開啟個別 thread 查看。',
      image: '/images/worktrees/subagent-overview.png',
      alt: 'Codex 的 Subagents 面板，列出三位已完成的 Agent 與摘要',
      fit: 'compact'
    },
    {
      label: '開啟 thread',
      title: '查看單一 Agent 的完整結論',
      description: 'Architecture thread 會列出實際檢查範圍、引用檔案與結論。主 agent 應將這些內容作為研究材料，再自行判斷是否採用。',
      image: '/images/worktrees/subagent-thread.png',
      alt: 'Codex 開啟 Architecture Agent thread，顯示完整分析與結論',
      fit: 'compact'
    },
    {
      label: '補充追問',
      title: '回到主 task，用 @ 指名 Agent 補查',
      description: '答案不夠具體時，可在主 task 以 @ 指名 Agent，補充問題或範圍。畫面也會顯示其他 Agents 的狀態。',
      image: '/images/worktrees/subagent-followup.png',
      alt: 'Codex 主 task 以 @Architecture 追問，右側 Subagents 面板顯示三位 Agent 狀態',
      fit: 'compact'
    }
  ]"
/>

### 使用時機

若子任務能彼此獨立完成，並可在最後統一彙整，就適合使用 Subagents。

<section class="subagents-decision-grid" aria-label="適合與不適合使用 Subagents 的情境">
  <article class="is-good">
    <span>GOOD FIT</span>
    <strong>適合使用</strong>
    <ul>
      <li>從不同角度審查同一個 PR。</li>
      <li>探索大型 codebase 的不同模組。</li>
      <li>分別執行獨立的測試或 log 分析。</li>
      <li>比對多份文件並回報精簡摘要。</li>
      <li>由 Subagent 查證資料，主 agent 同時規劃。</li>
    </ul>
  </article>
  <article class="is-bad">
    <span>POOR FIT</span>
    <strong>不適合使用</strong>
    <ul>
      <li>任務規模小，單一 agent 就能完成。</li>
      <li>子任務有強烈前後依賴，不能平行。</li>
      <li>子任務的分工與責任範圍尚未明確。</li>
      <li>多個 agents 會同時修改相同檔案。</li>
      <li>協調成本高於實際工作量。</li>
    </ul>
  </article>
</section>

::: tip 讀取型任務的衝突風險較低
探索、審查、測試、分類與摘要較少互相衝突。多個 agents 同時寫入同一批 shared files，容易互相覆蓋或產生難以整合的修改。初次使用 Subagents 時，建議由主 agent 集中處理最後寫入。
:::

## 4｜進階：客製化 Agent

若某種分工會重複出現，例如每週檢查 CSV 品質並產生固定格式的摘要，可將這個角色定義為客製化 Agent。

Codex 內建三種 agent：

<section class="subagents-builtins" aria-label="Codex 內建 Agent">
  <article><span>default</span><strong>通用工作</strong><p>找不到其他合適角色時使用的預設 agent。</p></article>
  <article><span>worker</span><strong>實作與修正</strong><p>適合實作、修改與交付成果。</p></article>
  <article><span>explorer</span><strong>讀取與探索</strong><p>適合搜尋 codebase 與收集證據。</p></article>
</section>

### 選擇個人或專案範圍

| 放置位置 | 適用範圍 | 適合情境 |
| --- | --- | --- |
| `~/.codex/agents/` | 你的所有專案 | 個人的固定資料分析流程 |
| `.codex/agents/` | 目前 Repository | 團隊共同使用的專案角色 |

每個 `.toml` 檔定義一個 Agent。檔名建議與 Agent 名稱一致，方便維護；Codex 以檔案內的 `name` 辨識 Agent。

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
每個結論都要附上佐證數據。
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

1. **角色聚焦**：每個 Agent 專注一類工作，不要變成另一個「什麼都做」的 agent。
2. **描述清楚**：讓 Codex 知道何時選擇這個 Agent。
3. **限制明確**：明確說明是否允許修改、必須提供哪些證據，以及何時停止。
4. **預設設定優先**：僅在品質、速度或工具需求不同時，再指定 model、reasoning、MCP 或 Skills。
5. **小範圍驗證**：先用熟悉的小型資料集測試，確認計算正確後再交給團隊。

## 延伸閱讀

- [OpenAI 官方文件：Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [菜鳥教程：Codex 子代理（Subagents）](https://www.runoob.com/codex/codex-subagents.html)
- [CSDN：Codex Subagents 原理、時機與實戰](https://blog.csdn.net/qq_24256877/article/details/161925043)
- [核心路線終點：Scheduled tasks](/advanced/automation)
- [選修下一章：Hooks](/advanced/hooks)：需要 lifecycle 強制控制時可參考本章。
