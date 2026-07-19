---
title: Prompting｜說清楚你要什麼
description: 從結果開始，補上必要的來源、格式與限制，再用 Follow-up 把第一版改到能用。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Prompting｜說清楚你要什麼

<p class="lesson-lead">先說 Task，再補會改變答案的 Context／Persona，最後交代 Output。重要工作再加上必要的 Boundary；不用一開始就寫成一份規格書。</p>

## Prompting overview

Prompt 可以是一個問題、一句指令，或一個目標。剛開始時，先記住這個三層加法：

<div class="evolution-labels">
  <section><span>OKAY｜TASK</span><h3>先說要做什麼</h3><p>「分析這些行銷資料。」</p></section>
  <section><span>BETTER｜+ CONTEXT / PERSONA</span><h3>補上你的情境</h3><p>「我是要決定下一季預算的行銷企劃。請分析 @q2-campaign.csv 與 @budget.xlsx，找出值得加碼的渠道。」</p></section>
  <section><span>BEST｜+ OUTPUT</span><h3>說清楚成品</h3><p>「整理成給主管會議用的一頁摘要。先列三個建議，再列數據依據、預算差額與待確認事項。」</p></section>
</div>

Persona 不是一定要叫 AI 扮演某個角色。只要說明「你是誰、誰會使用成果、現在要做什麼決定」，就能讓回答更貼近情境；地點、專業程度或時間範圍只有在會改變答案時才需要補。

三層加法能讓多數 Prompt 從「可以回答」走到「可以使用」。任務更大、風險更高時，再用下面四項檢查是否漏掉重要資訊。

<div class="brief-grid">
  <section><span>GOAL</span><b>要完成什麼</b><p>直接說最後想看到的結果。</p></section>
  <section><span>CONTEXT</span><b>要參考什麼</b><p>指出檔案、圖片、網站、Project 或 Plugin。</p></section>
  <section><span>OUTPUT</span><b>成果要長什麼樣</b><p>交代讀者、格式、長度、檔名或內容順序。</p></section>
  <section><span>BOUNDARIES</span><b>什麼不能動</b><p>保留哪些內容、不能猜什麼，以及哪些動作要先問你。</p></section>
</div>

這是檢查清單，不是必填表格。Task 對應 Goal，Context／Persona 補足背景，Output 定義成品；Boundary 則負責避免真正會造成返工或誤操作的問題。

這一頁會照實際工作順序往下走：先說結果、加入來源、設下必要限制，再定義成品與驗收方式。最後再看同一套原則怎麼用在 Chat、Work mode 與 Codex。

## 描述你要的結果

從成果開始，不要一上來就規定十個步驟。

```text
把這份會議筆記整理成給專案團隊看的短版更新。
決策與下一步放在最前面。
```

這兩句已經說清楚成品、讀者與順序。如果執行方式會影響正確性、安全性或稽核，再指定流程；其他時候，留一點空間讓 Codex 自己搜尋與比較。

## 補上有用的 Context

Context 不是越多越好。把真正會改變答案的來源加進來，並說明要從每份來源找什麼。

- **檔案：** 摘要、比較、轉換或產生新文件時使用。
- **Web search：** 資訊會更新時，要求搜尋並附上來源。

### Work with Your Files

在輸入框打 `@`，從清單選擇這次要用的來源。不要只把 `@檔名` 當一般文字打完；從選單點選，Codex 才能帶入正確的檔案或工具。

<div class="command-grid">
  <section><kbd>@檔案</kbd><h3>已經知道要讀哪一份</h3><p>直接選 CSV、Excel、PDF、圖片或 Markdown，適合比較、整理與修改指定內容。</p></section>
  <section><kbd>@資料夾</kbd><h3>先限定搜尋範圍</h3><p>檔案散在同一個目錄時，先請 Codex 盤點，再選真正會影響答案的來源。</p></section>
  <section><kbd>@Plugin</kbd><h3>使用外部資料或工具</h3><p>例如 SharePoint、Spreadsheets 或 PDF。可用項目取決於安裝、帳號授權與 Workspace 設定。</p></section>
</div>

<figure class="interface-figure interface-figure--hero">
  <img src="/images/quick-start/artifact-viewer-light.webp" alt="Codex App 中的生成檔案預覽，右側顯示簡報內容與註記區" loading="lazy" decoding="async">
</figure>

把來源與用途放在同一個 Prompt，不要只丟附件：

```text
使用 @Spreadsheets 讀取 @q2-campaign.csv 與 @budget.xlsx。
比較各渠道的成效與預算差額，找出下一季值得加碼的三個渠道。
不要修改來源檔；缺少的數字標成待確認。
```

### 還不知道要讀哪些檔案時

來源很多時，分成兩輪。先請 Codex 盤點，再點名真正要用的檔案。

```text
先盤點 @campaign-data 資料夾。
告訴我每份檔案大概放什麼、哪些可能和預算決策有關。
先不要修改或建立檔案。
```

這樣比一次塞進二十份附件容易核對，也能避開舊版本或同名檔案。

### Connected sources 與 Plugins

如果 Codex 能連到 Drive、SharePoint、Teams 或 Slack，直接說去哪裡找、要找什麼。不用替它列出每一個搜尋步驟。

```text
讀取 SharePoint 裡最新的專案計畫，並整理 Teams 中已確認的決策。
產出本週狀態更新；找不到負責人或日期時，標成待確認。
```

Plugin 會提供固定指令或外部工具連線。你可以直接描述成果，讓 Codex 選擇可用工具；要指定某一個 Plugin，就用 `@` 從清單選取。

::: tip 名稱以現場畫面為準
Plugin 名稱與能力會受到安裝狀態、帳號授權及 Workspace 政策影響。課程範例的名稱如果和你的畫面不同，以實際選單為準。
:::

### Personalization

別把每種規則都塞進當次 Prompt。放錯地方，之後只會一直重複。

| 內容 | 放哪裡 |
| --- | --- |
| 只影響這次工作的目標、來源與限制 | 當次 Prompt |
| 希望不同對話都沿用的個人偏好 | Settings → Personalization |
| Repository 長期共用的規則與驗證方式 | [`AGENTS.md`](/advanced/agents-md) |

## 設下能防止實際問題的 Boundary

Boundary 的用途是避免返工或誤操作，不是把每一步鎖死。通常一兩條就夠。

```text
保留已核准的日期與預算數字。
只使用提供的來源；缺少資訊時標成待確認，不要猜。
先建立草稿，不要寄送、上傳或發布。
```

想一個很實際的問題：哪個錯誤會讓這份成果不能用？把那一條寫進去。

## 讓成果可以直接使用

告訴 Codex 你接下來會怎麼用成品。它才知道要寫多長、先放什麼，以及哪些細節不能漏。

```text
整理成主管開會前能快速看完的一頁摘要。
先放待決事項與下一步，再列進度、風險、負責人與期限。
```

重要工作可以多加一次完成前檢查，例如確認每個下一步都有負責人與期限，或列出仍無法核對的數字。最後還是要由你打開成品驗收。

### 建立檔案時，說清楚要新增還是修改

```text
使用 @PDF 讀取 @campaign-proposal.pdf。
另外建立 notes/proposal-brief.md，包含目標、預算、風險與待確認問題。
保留原始 PDF，不要修改或覆蓋。
```

「另外建立」和檔案路徑很重要。若要改現有檔案，就直接寫「只修改 `@檔名`，不要建立新檔」。


Codex 建立文件、簡報、試算表或 PDF 後，可以直接在 App 裡預覽。先確認檔名、格式與頁數，再抽查數字和內容；預覽支援註記時，選取要改的段落、圖表或畫面區域，直接說哪裡需要調整。

送出 Prompt 前，快速看三件事：

- `@` 清單裡選到的是正確版本與正確 Plugin。
- 已說清楚要讀、要修改，還是要另外建立檔案。
- 成品格式、儲存位置與完成前檢查沒有留給 Codex 猜。

## 用 Follow-up 改第一版

第一個 Prompt 不需要完美。看完結果，直接說要改哪裡。

```text
開頭再直接一點，保留數據依據，把建議移到背景說明前面。
第二個渠道的預算差額請重新核對 budget.xlsx。
```

你可以補來源、修正方向、要求另一版，或改變詳細程度，不必重開任務。

### Steer 與 Queue

Codex 還在工作時也能補訊息：

| 操作 | 什麼時候用 |
| --- | --- |
| **Steer** | 這一輪就要改方向、補條件或加入新資訊 |
| **Queue** | 等目前工作完成，再處理下一個要求 |

完整操作方式放在 [Follow Up](/quick-start/follow-up)。

## 把這些內容組成一個 Prompt

延續 First Project 的行銷資料案例，可以這樣寫：

```text
我是要準備下週預算會議的行銷企劃。
找出下一季值得加碼的三個渠道。

使用 @Spreadsheets 讀取 @q2-campaign.csv、@budget.xlsx
與 @channel-notes.md。
建立給主管閱讀的 outputs/q3-channel-brief.md，先放結論，再列數據依據、
預算差額、限制與待確認問題。

不要修改三份來源，也不要補猜缺少的數字。
完成前核對渠道名稱、金額加總與引用來源，
最後回報新檔位置與仍無法確認的資訊。
```

它包含 Goal、Context、Output、Boundary 與最後檢查，但沒有替 Codex 寫死每一個執行步驟。

## Prompting Codex

Codex 的 Prompt 要多交代三件事：相關程式碼或重現步驟、不能破壞的行為，以及怎麼驗證修正。

```text
Bug：設定頁顯示「已儲存」，重新整理後開關卻回到原值。

請先照 README 啟動專案並重現問題，再找出原因。
不要改 API 格式；修正保持最小，並補一個 regression test。
完成後執行 lint 與最小相關測試，列出實際命令和結果。
```

工作跨多個檔案、做法還不確定時，可以先輸入 [`/plan`](/quick-start/using-slash)。IDE 會自動帶入開啟的檔案；CLI 則要清楚寫出路徑，或用 `@` 加入檔案。

## 參考資料

- [Prompting｜OpenAI](https://learn.chatgpt.com/docs/prompting)
- [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer?surface=app)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Settings｜Personalization](https://learn.chatgpt.com/docs/reference/settings#personalization)

<p class="source-note">本頁先用 Task → Context／Persona → Output 建立入門骨架，再依 OpenAI Prompting 文件的章節順序展開，並把 Work with files 的來源選取與成品驗收放回 Context、Output 流程。Goal、Context、Output 與 Boundaries 是可選提示，不是固定格式。</p>
