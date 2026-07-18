---
title: 用 / 調整工作方式與模型
description: 用斜線選單開啟 Plan、壓縮過長的對話，並選擇合適的模型與思考程度。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 用 `/` 調整工作方式與模型

<p class="lesson-lead">輸入 <code>/</code> 會打開目前任務的控制選單。Prompt 是交代工作；斜線指令則用來改變 Codex 的工作方式，或整理已經太長的對話。</p>

## 打開 `/` 選單

<div class="refined-media refined-media--wide refined-media--standalone">
  <div class="refined-media__window">
    <img src="/images/quick-start/slash-menu.webp" alt="Codex 斜線指令選單，包含模型、推理與規劃模式">
  </div>
</div>

QuickStart 不用背整張清單。先學會 Plan 與 Compact：一個用在動手前，一個用在同一件事已經談了很久之後。

## 兩個先學會的項目

<MediaTabs
  aria-label="Plan 與 Compact 的用途"
  :items="[
    {
      label: 'Plan｜規劃模式',
      title: '先把做法談清楚，再讓 Codex 動手',
      description: 'Plan 會讓 Codex 先探索現況，再提出一份可執行的做法。跨多個檔案、需求還有模糊處、需要比較幾種方案，或修改後不容易復原時，都適合先開 Plan。請它列出會讀哪些來源、準備修改哪些檔案、哪些事情還不確定，以及完成後要怎麼驗證。看完後可以直接修正計畫；方向確認了，再清楚回覆「照這個計畫執行」。',
      code: '/plan',
      note: '適合：跨檔案修改、資料分析、網站重構、高風險操作。小錯字或範圍很清楚的單一步驟工作，可以直接交辦，不必每次都先 Plan。'
    },
    {
      label: 'Compact｜壓縮對話',
      title: '把前面的對話濃縮後，留在同一個任務繼續',
      description: 'Compact 會把目前對話整理成摘要，保留主要目標、決策與進度，再騰出空間繼續同一件工作。它適合已經讀過很多檔案、累積大量工具輸出，或來回修改好幾輪的任務。壓縮前先把不能遺失的規則、數字與完成條件寫進工作檔案；壓縮後也要讀一次摘要，發現遺漏就立刻補回。Compact 不是逐字保存聊天內容。',
      code: '/compact',
      note: '適合：同一份成果已經修改多輪，後面仍要沿用原本決策。若工作目標已經換了，直接開新任務會比繼續 Compact 更乾淨。'
    }
  ]"
/>

## 選擇模型與思考程度

模型與思考程度也能從輸入框附近，或使用 `/model`、`/reasoning` 調整。課堂上不用背型號，先看工作需要多少判斷：

<div class="model-choice-grid">
  <section><span>/model｜模型</span><h3>決定由哪個模型處理</h3><p>整理一份文件先用預設模型；跨很多檔案、需要寫程式或判斷取捨時，再選較完整的模型。可用選項會隨帳號與 Workspace 更新。</p></section>
  <section><span>/reasoning｜思考程度</span><h3>決定這次要想得多深</h3><p>範圍清楚、容易驗證的工作可以用較低設定；複雜除錯、規則多或需要檢查邊界條件時再提高。思考越深，通常需要更多時間與 Credits。</p></section>
</div>

如果不確定，先用預設值。結果太粗、推論漏掉條件，或同一個問題反覆做錯時，再提高思考程度；不要把每個簡單任務都開到最高。

## 其他 command

斜線選單會依 App 版本、帳號與目前工作方式顯示不同項目。這一頁先把常見的列成表格，上課時知道去哪裡找即可。

| Command | 中文說法 | 什麼時候用 |
| --- | --- | --- |
| `/plan` | 規劃模式 | 多步驟或高風險工作，先確認做法再執行。 |
| `/compact` | 壓縮對話 | 同一個任務談很久，整理 Context 後繼續。 |
| `/model` | 選擇模型 | 需要更換目前任務使用的模型。 |
| `/reasoning` | 思考程度 | 依工作難度調整模型要想得多深。 |
| `/review` | 程式碼檢閱 | 檢查未提交變更，或和基準分支比較。 |
| `/side` | 側邊對話 | 臨時問一件事，不打斷主任務。 |
| `/goal` | 持續目標 | 設定需要多輪追蹤、具有完成條件的目標。 |
| `/project` | 選擇專案 | 指定新任務要在哪個專案中開始。 |
| `/task` | 新增任務 | 不指定專案，直接開始一個臨時任務。 |
| `/pet` | 顯示／收起寵物 | 叫出或收起桌面 Pet。 |
| `/mcp` | 查看 MCP | 確認目前有哪些 MCP server 已連線。 |
| `/worktree` | 開新 Worktree | 在新的 Git worktree 中平行處理工作。 |

## 參考資料

- [Slash commands](https://learn.chatgpt.com/docs/reference/slash-commands)
- [Models](https://learn.chatgpt.com/docs/models)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
