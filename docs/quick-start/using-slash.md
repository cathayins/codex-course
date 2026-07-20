---
title: 用 / 調整工作方式
description: 用斜線選單開啟 Plan、壓縮過長的對話，或檢查目前的程式碼變更。
outline: [2, 3]
aside: true
pageClass: quickstart-story slash-commands-page
---

# Slash Commands｜調整工作方式

<p class="lesson-lead">輸入 <code>/</code> 會打開目前任務的控制選單。Prompt 是交代工作；斜線指令則用來改變 Codex 的工作方式，或整理已經太長的對話。</p>

<SlashCommandDemo />

QuickStart 不用背整張清單。先學會 Plan 與 Compact：一個用在動手前，一個用在同一件事已經談了很久之後。

## Planning & Context 管理

<MediaTabs
  aria-label="Plan 與 Compact 的用途"
  :items="[
    {
      label: 'Plan｜規劃模式',
      title: '先看清楚，再開始修改',
      description: 'Plan 的價值，是讓你在 Codex 動手前先看見工作範圍、可能風險與驗證方式。方向不對時，修改計畫會比修改已完成的程式碼更快。',
      steps: [
        {
          title: '探索現況',
          description: '讀取相關檔案，確認需求、限制與還不確定的地方。'
        },
        {
          title: '提出計畫',
          description: '列出修改範圍、執行順序，以及完成後要如何驗證。'
        },
        {
          title: '確認後執行',
          description: '你可以先調整方向；確認計畫後，再請 Codex 開始動手。'
        }
      ],
      code: '/plan',
      note: '好處：減少誤改、先處理不確定性，也讓完成條件可以被驗證。適合跨檔案修改、資料分析、網站重構與高風險操作。'
    },
    {
      label: 'Compact｜壓縮對話',
      title: '上下文精簡',
      description: 'Codex 會依賴目前任務的 Context 理解前因後果，但模型一次能參考的資訊量有限。當訊息、檔案內容與工具結果累積太多時，Compact 會把它們濃縮成較短的工作摘要。',
      steps: [
        {
          title: '內容持續累積',
          description: '對話、已讀檔案與工具輸出逐漸占用可用空間。'
        },
        {
          title: '濃縮成工作摘要',
          description: '保留目標、重要決策、目前進度、限制與下一步。'
        },
        {
          title: '接著完成任務',
          description: '騰出空間後，Codex 依照摘要在同一個任務中繼續。'
        }
      ],
      code: '/compact',
      note: 'Context（上下文）是 Codex 在目前任務中用來理解工作的資訊，包括你的訊息、已讀檔案、工具結果、規則與決策。Compact 會保留重點，但不會逐字保存全部對話。'
    }
  ]"
/>

## 其他補充

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
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
