---
title: Scheduled tasks：讓已驗證的任務定期執行
description: 先手動確認流程能正常執行，再設定明確的輸入、輸出與停止條件，交由排程定期處理。
outline: [2, 3]
---

# Scheduled tasks：讓已驗證的任務定期執行

Scheduled task 適合把**已經測試完成**的工作，安排在指定時間執行一次，或依固定頻率重複執行。需求與驗收方式仍須事先寫清楚，Codex 才能在背景正確執行。

本章會把手動驗證完成的工作流程設定成排程，讓 Codex 在指定時間自動執行。

::: tip 核心課程的必要基礎
學到本章，就具備使用 Scheduled tasks 所需的基礎。後續的 Subagents 與 Hooks 會再介紹平行協作與生命週期控制。
:::

<section class="lesson-goals" aria-labelledby="automation-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="automation-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>判斷工作是否適合排程、選擇結果的儲存位置、寫出無人補充說明也能執行的 Prompt，並查看後續執行紀錄。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>判斷工作是否穩定</strong><span>辨別能重複執行的工作，以及仍需先釐清的需求。</span></article>
    <article><strong>選擇排程型態</strong><span>區分 standalone 與延續既有 task。</span></article>
    <article><strong>寫好排程 Prompt</strong><span>補齊來源、輸出、例外與停止條件。</span></article>
    <article><strong>管理排程結果</strong><span>查看執行結果，並視需要調整、暫停或刪除排程。</span></article>
  </div>
</section>

<nav class="lesson-flow automation-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 判斷適用性</span>
  <span><b>02</b> 選擇型態</span>
  <span><b>03</b> 測試 Prompt</span>
  <span><b>04</b> 建立排程</span>
  <span><b>05</b> 管理結果</span>
</nav>

<aside class="automation-case-intro" aria-labelledby="automation-case-title">
  <span>COURSE CASE · DAILY BRIEF</span>
  <strong id="automation-case-title">每日待辦早報</strong>
  <p>每天讀取 Outlook 與 Planner／Notion 的最新資料，整理待辦並排出優先順序，再把早報寄到自己的信箱。</p>
</aside>

## 1｜判斷工作是否值得排程

一個完整排程至少要回答四個問題；如果其中一項仍不確定，先在一般 task 中釐清。

<section class="automation-schedule-parts" aria-label="排程的四個構成要素">
  <article>
    <span>01 · TARGET</span>
    <strong>目標對象</strong>
    <p>要延續哪個 task，或使用哪些資料？</p>
    <small><b>本章案例</b> Outlook 與 Planner／Notion</small>
  </article>
  <article>
    <span>02 · TRIGGER</span>
    <strong>觸發時機</strong>
    <p>何時、多久執行一次？使用哪個時區？</p>
    <small><b>本章案例</b> 每天 08:00</small>
  </article>
  <article>
    <span>03 · ACTION</span>
    <strong>每次動作</strong>
    <p>每一輪都要重新做什麼？</p>
    <small><b>本章案例</b> 彙整待辦並評估優先度</small>
  </article>
  <article>
    <span>04 · DESTINATION</span>
    <strong>結果去向</strong>
    <p>結果要獨立儲存，還是回到原 task？</p>
    <small><b>本章案例</b> 寄到自己的信箱</small>
  </article>
</section>

### 適合與不適合的工作

| 適合排程 | 先不要排程 |
| --- | --- |
| 每週工作回顧、固定格式報告 | 第一次執行，輸入與輸出都未驗證 |
| 定期整理格式一致的資料 | 只有「整理一下」等模糊指示 |
| 會議前回顧已知議題 | 每次都需要重大人工判斷或協商 |
| 持續追蹤同一組待辦 | 在沒有人審查的情況下寄信給他人、刪除資料、付款或發布內容 |

::: warning 自動重跑不會自動改善流程
如果一般 task 還不能穩定產生正確結果，排程只會反覆產生相同問題。先確認單次執行符合預期，再設定執行頻率。
:::

## 2｜選擇排程型態

選擇排程型態前，先確認：「下一次執行是否需要沿用這次對話累積的資料？」

<section class="automation-type-compare" aria-label="兩種排程型態比較">
  <article>
    <header>
      <span>INDEPENDENT RUN</span>
      <strong>Standalone scheduled task</strong>
    </header>
    <dl>
      <div><dt>適合情境</dt><dd>每次執行都不需參照前一次的資料，並會產生一份新報告。</dd></div>
      <div><dt>Context 與結果</dt><dd>每次都使用已儲存的 Prompt，結果會集中顯示在 <strong>Scheduled</strong>。</dd></div>
    </dl>
  </article>
  <article class="is-existing-task">
    <header>
      <span>CONTINUOUS CONTEXT</span>
      <strong>從既有 task 排程</strong>
    </header>
    <dl>
      <div><dt>適合情境</dt><dd>需要持續回顧或追蹤同一件事。</dd></div>
      <div><dt>Context 與結果</dt><dd>每次執行結果都會回到同一個 task，因此能沿用既有對話與前次結果。</dd></div>
    </dl>
  </article>
</section>

例如「每日重新讀取最新資料並寄出一份早報」適合 standalone；「持續追蹤同一段討論」才需要回到既有 task。本章練習會使用 standalone scheduled task。

## 3｜先手動測試，再寫完整的排程 Prompt

寄信會對外部系統造成變更，因此第一次測試只產生預覽，不實際寄出郵件：

1. 確認目前 task 能讀取 Outlook，以及 Planner 或 Notion 其中一項服務。
2. 以「預覽模式」手動執行 Prompt，檢查待辦資料是否正確，以及是否有重複項目。
3. 確認優先度有明確依據，也沒有自行猜測資料未提供的期限或利害關係人。
4. 確認收件地址屬於自己，再實際寄出一封測試郵件。
5. 確認郵件內容無誤後，再建立每日排程。

### 排程 Prompt 要寫清楚的八件事

| 區塊 | 寫清楚什麼 |
| --- | --- |
| 目標 | 這份早報要幫助你做什麼決定 |
| 資料來源 | Outlook 與哪一個專案管理頁面 |
| 時間範圍 | 信件與任務要讀取哪段期間 |
| 待辦判定 | 哪些內容算待辦、哪些只是通知 |
| 優先度 | 如何判斷 P1、P2、P3，並說明依據 |
| 固定輸出 | 每項任務必須顯示哪些欄位 |
| 寄送規則 | 寄給誰、寄幾封、禁止哪些外部動作 |
| 例外處理 | 沒有待辦、來源無法讀取或資料缺漏時怎麼做 |

排程 Prompt 可以寫成以下結構：

::: code-group
```text [過度模糊]
每天整理我的待辦，寄信給我。
```

```text [結構化版本]
# 目標
產出「每日待辦早報」，讓我在早上快速決定今天先做什麼。

# 資料來源與範圍
- Outlook：過去 24 小時內收到，且明確要求我採取行動的信件。
- Planner 或 Notion：指派給我且尚未完成的任務；
  優先讀取已逾期、7 天內到期或狀態為進行中的項目。
- 只使用目前可存取的資料，不根據舊摘要自行補上內容。

# 待辦判定與整理
- 排除電子報、廣告、FYI 等不需採取行動的通知。
- 同一件事若同時出現在信件與專案頁面，只保留一筆並列出兩個來源。
- 利害關係人只列出資料中明確出現的寄件者、負責人或協作者。
- 最多列出 10 件；其餘只回報件數。

# 建議優先度
- P1：已逾期、今天到期、明確標示緊急，或會讓他人的工作受阻。
- P2：未來 3 天內到期，或需要多人協作才能完成。
- P3：其餘尚未到期的待辦。
- 每項都要寫出評估依據；資料不足時標示「無法判定」，不要猜測。

# 固定輸出
先列出資料來源狀態，再依 P1、P2、P3 排序。每項包含：
- 任務名稱
- 相關利害關係人
- 任務內容
- 到期時間
- 建議做法
- 建議優先度與評估依據
- 來源連結或來源名稱

# 寄送規則
- 目前模式：預覽模式。
- 預覽模式只在 task 顯示郵件主旨與內文，不寄信。
- 改為寄送模式後，每次只寄一封到 <自己的信箱地址>。
- 主旨：[每日待辦早報] YYYY-MM-DD｜P1 X 件、P2 X 件、P3 X 件。
- 不回覆或轉寄原信，不修改 Planner／Notion，也不寄給其他人。

# 例外處理
- 沒有待辦時，仍產生簡短早報，清楚寫「目前沒有符合條件的待辦」。
- 任一來源無法讀取時，列出無法讀取的來源；不可把讀取失敗寫成沒有待辦。
- 無法確認收件地址屬於我本人時，不寄信並回報原因。
```
:::

::: warning 先預覽，再切換到寄送模式
確認內容與收件地址後，才把 Prompt 的「目前模式」改為「寄送模式」。如果來源或寄信工具不可用，應停止並回報，不要改寄給其他收件者。
:::

## 4｜建立排程：把時間寫清楚

排程時間不要只寫「明天」「每週」或「下班前」，請同時提供以下資訊：

> **執行頻率＋日期或星期＋時間＋時區**

| 模糊寫法 | 建議寫法 |
| --- | --- |
| 每天早上 | 每天 08:00（Asia/Taipei） |
| 明天 | 2026 年 7 月 20 日 09:00（Asia/Taipei），只執行一次 |
| 下班前 | 每個工作日 17:30（Asia/Taipei） |

在剛才測試完成的 task 中，輸入以下內容：

```text
請把剛才測試完成的「每日待辦早報」
建立為 standalone scheduled task。

時間：每天 08:00（Asia/Taipei）
Prompt：沿用剛才測試完成的結構化 Prompt，
並把「目前模式」改為「寄送模式」。
收件者：<自己的信箱地址>

建立後回報下次執行時間（next run）。
如果時區或收件者不明確，先不要建立。
```

建立完成後，先核對 Codex 的回覆，再開啟排程設定。以下畫面分別示範這兩個步驟。

<MediaTabs
  class="automation-media-tabs"
  aria-label="Scheduled task 的建立結果與設定畫面"
  :items="[
    {
      label: '建立結果',
      title: '先核對建立結果與 next run',
      description: '送出建立指令後，確認 Codex 回報的執行頻率、時區、寄送模式、收件者與 next run。若任一欄位不正確，先暫停排程並修正設定。',
      image: '/images/automation/create_task.png',
      alt: 'Codex 回報已建立每日待辦早報 scheduled task，列出每日 08:00、Asia/Taipei、寄送模式與 next run',
      fit: 'compact'
    },
    {
      label: '排程設定',
      title: '打開排程，檢查 Prompt 與執行頻率',
      description: '從已建立的「每日待辦早報」打開設定，確認儲存的 Prompt、Runs in、Project、Model、Reasoning，以及每日執行與通知設定。這些欄位應與手動測試完成的版本一致。',
      image: '/images/automation/preview_task.png',
      alt: '每日待辦早報 scheduled task 的設定頁，顯示儲存的 Prompt、Project、Model、Reasoning、Repeat 與 Notifications',
      fit: 'compact'
    },
  ]"
/>

## 5｜管理排程與檢查執行結果

建立排程後，請到 **Scheduled** 確認排程狀態，並查看每次的執行結果。前幾次執行時，應逐一檢查資料範圍、輸出格式與例外訊息。時間或內容不正確時，修改排程或 Prompt；不再需要執行時，則暫停排程。

| 狀態 | 代表什麼 | 應檢查什麼 |
| --- | --- | --- |
| Active | 等待下一次執行 | 執行頻率、next run 與最近結果 |
| Paused | 保留設定但暫不執行 | 重新啟用前，確認工作已準備恢復，且資料來源可以正常讀取 |
| Completed | 單次工作已完成 | 最後結果是否需要補充或另建排程 |

<MediaTabs
  class="automation-media-tabs"
  aria-label="Scheduled task 的狀態與生命週期管理"
  :items="[
    {
      label: '建立排程',
      title: '從已測試完成的 Prompt 建立 standalone task',
      description: '在原本的 task 中指定頻率、時區、收件者與輸出模式。建立完成後，先核對回覆中的頻率、模式與 next run，再從右側設定確認儲存的 Prompt。',
      image: '/images/automation/task_status.png',
      alt: 'Scheduled 的 All 清單列出每日待辦早報，顯示 Daily at 8:00 AM 與 In progress，並列出 Suggestions',
      fit: 'compact'
    },
    {
      label: '暫停或恢復',
      title: '執行中的排程可暫停，之後再恢復',
      description: '在 Paused 清單開啟排程的操作選單，可以選擇 Run now、Resume 或 Delete。若只想暫停寄送並保留設定，請維持 Paused；恢復前先確認資料來源與收件者仍然正確。確定不再使用時，再選擇 Delete。',
      image: '/images/automation/task_pasue&resume.png',
      alt: 'Scheduled 的 Paused 清單打開每日待辦早報操作選單，顯示 Run now、Resume 與 Delete',
      fit: 'compact'
    }
  ]"
/>

### 常見失敗與修正方向

<section class="automation-troubleshooting" aria-label="四種常見排程問題與修正方式">
  <article>
    <span>01 · DELIVERY</span>
    <strong>沒有在預期時間收到早報</strong>
    <dl>
      <div><dt>先檢查</dt><dd>時區、收件者與寄信工具（MCP）。</dd></div>
      <div><dt>修正方式</dt><dd>修正時間或收件地址，再手動測試一次。</dd></div>
    </dl>
  </article>
  <article>
    <span>02 · FREQUENCY</span>
    <strong>執行太頻繁</strong>
    <dl>
      <div><dt>先檢查</dt><dd>每次執行是否真的有新資訊。</dd></div>
      <div><dt>修正方式</dt><dd>降低頻率，或縮短一般回報內容，只在有重要變化時補充細節。</dd></div>
    </dl>
  </article>
  <article>
    <span>03 · LENGTH</span>
    <strong>結果太長</strong>
    <dl>
      <div><dt>先檢查</dt><dd>涵蓋的期限範圍與件數上限。</dd></div>
      <div><dt>修正方式</dt><dd>限制為 10 件，或縮短期限範圍。</dd></div>
    </dl>
  </article>
  <article>
    <span>04 · LIFECYCLE</span>
    <strong>工作結束仍持續執行</strong>
    <dl>
      <div><dt>先檢查</dt><dd>這項工作是否已結束，或是否仍需定期執行。</dd></div>
      <div><dt>修正方式</dt><dd>立即暫停排程，或刪除這項排程。</dd></div>
    </dl>
  </article>
</section>

## 6｜動手練習：每日待辦早報

<section class="automation-lab-banner" aria-labelledby="automation-lab-title">
  <span>PRACTICE · DAILY WORK</span>
  <strong id="automation-lab-title">每天早上收到一封排好優先順序的待辦早報</strong>
  <p>從 Outlook 與 Planner／Notion 讀取最新資料，先預覽，再寄到自己的信箱，最後建立並管理每日排程。</p>
</section>

### Step 1｜用預覽模式測試

1. 在一般 task 中，確認可以讀取 Outlook，以及 Planner 或 Notion 其中一項服務。
2. 把第 3 節 Prompt 中的 `<自己的信箱地址>` 換成自己的地址，但保留「預覽模式」。
3. 手動執行一次，確認來源狀態、待辦判定、重複項目排除，以及 P1／P2／P3 排序。
4. 檢查每項都有任務名稱、利害關係人、內容、期限、建議做法與評估依據；資料未提供的欄位應標示為「未知」。

### Step 2｜測試寄送到自己的信箱

把「目前模式」改為「寄送模式」，手動執行一次。寄送前再次確認郵件只會寄到自己的信箱；收到郵件後，檢查主旨中的件數是否與內文一致。

### Step 3｜建立並管理每日排程

1. 依第 4 節設定每天 08:00、Asia/Taipei，建立 standalone scheduled task。
2. 從 Scheduled 核對 Active、next run 與儲存的 Prompt。
3. 檢查前幾次執行所寄出的郵件；如果項目太多，縮短期限範圍或提高篩選門檻。
4. 練習把時間改成 07:30，最後暫停排程並確認顯示 Paused。

不再需要這份早報、資料來源已更換，或郵件內容不再符合實際資料時，應先暫停排程，完成修改與測試後再恢復。

## 7｜進階補充：將 Scheduled tasks 與 Skills 搭配使用

Skill 適合儲存可重複使用的步驟、規則與驗證方式；Scheduled task 則負責設定執行時間、當次範圍、要使用的 Skill 與結果去向。如果排程 Prompt 愈寫愈長，應把重複出現的操作方法整理進 Skill。

### 案例一｜定期建立或更新個人 Skills

這個排程會定期檢查最近的 task 記錄；只有發現具體且反覆出現的問題時，才建立或改善個人 Skill。

```text
檢查 ~/.codex/sessions 過去 24 小時的記錄：

1. 如果某個個人 Skill 曾造成明確問題，更新它並說明修改原因。
2. 如果某類工作反覆出現，而且屢次需要補救，建立一個可重複使用的個人 Skill。
3. 只處理個人 Skills，不修改專案內的 Skills。
4. 沒有充分證據時，不要建立或修改任何 Skill。
5. 最後列出變更、依據與驗證方式；若沒有變更，清楚回報。
```

::: warning 先由使用者確認變更
Skill 會影響之後的工作方式。建立排程後，前幾次都應由使用者檢查修改依據與內容；若無法確認修改是否正確，先讓排程只提出建議，不要直接更新。
:::

### 案例二｜把複雜流程放進 Skill

在官方範例中，`$recent-code-bugfix` Skill 會儲存「找出自己近期造成的問題、確認根因、做最小修正、驗證與回報」的完整流程。手動確認 Skill 能正確執行後，排程 Prompt 只需寫成：

```text
Check my commits from the last 24h and submit a $recent-code-bugfix.
```

建立這類排程時，依序確認：

1. 先在一般 task 手動呼叫 Skill，確認流程與停止條件正確。
2. 排程只保留執行時間、當次範圍、Skill 名稱與結果去向。
3. 工作方法改變時更新 Skill；只有頻率或時間改變時才調整排程。

只執行一次，或每次都需要人工補充判斷的流程，不適合整理成 Skill。完整建立方式請參考 [Skills 課程](/advanced/skills)。

## 延伸閱讀

- [OpenAI：Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [OpenAI：Automatically create new skills](https://learn.chatgpt.com/docs/automations#automatically-create-new-skills)
- [OpenAI：Combining scheduled tasks with skills](https://learn.chatgpt.com/docs/automations#combining-scheduled-tasks-with-skills-to-fix-your-own-bugs)
- [遠見：Codex 每日自動收集案例](https://www.gvm.com.tw/article/130317)
- [OpenAI Academy：Automations](https://openai.com/academy/codex-automations/)
- [上一章：Plugins](/advanced/plugins)：把方法與外部連線組成可驗證的工作流程。
- [下一章（選修）：Subagents](/advanced/worktrees)：學習拆分任務與平行處理。
