---
title: Prompting｜說清楚你要什麼
description: 從結果開始，補上必要的來源、格式與限制，再用 Follow-up 把第一版改到能用。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Prompting｜說清楚你要什麼

<p class="lesson-lead">先說清楚 Goal，再補會改變答案的 Context、需要的 Output，以及真正不能踩的 Boundaries。簡單任務一句話就夠；任務變複雜時，再把缺少的資訊補上。</p>

## 建議的四層 Prompt 架構

Prompt 可以是一個問題、一句指令，或一個完整任務。OpenAI 的建議不是要求你套固定模板，而是提供四個檢查方向：

<div class="brief-grid">
  <section><span>GOAL</span><b>要完成什麼</b><p>直接說明任務與最後想看到的結果。</p></section>
  <section><span>CONTEXT</span><b>有哪些背景</b><p>補上檔案、資料來源、使用情境與必要的前置脈絡。</p></section>
  <section><span>OUTPUT</span><b>成品要怎麼交付</b><p>交代讀者、格式、篇幅、細節深度、檔名或內容順序。</p></section>
  <section><span>BOUNDARIES</span><b>哪些底線不能踩</b><p>指出不能更動的內容、不能猜的事實，以及執行前要先詢問的動作。</p></section>
</div>

這四項不是必填欄位。整理一句話、改一個標題時，直接說要做什麼即可；只有當讀者、來源、格式或風險會改變答案時，才需要補上對應資訊。

::: tip 最常漏掉的是 Output 與 Boundaries
沒有交代讀者、篇幅與格式，Codex 只能自己猜成品長什麼樣；沒有說清楚底線，就可能修改不該動的數字、檔案或對外內容。
:::

## 1-Goal｜描述你要的結果

從成果開始，不要一上來就規定十個步驟。

```text
整理這份會議筆記。
找出已確認的決策，以及接下來要做的事。
```

這兩句已經說清楚任務與結果。如果執行方式會影響正確性、安全性或稽核，再指定流程；其他時候，留一點空間讓 Codex 自己搜尋與比較。

## 2-Context｜補上有用的背景脈絡

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
  <img src="/images/quick-start/artifact-viewer-light.webp" width="1920" height="1300" alt="Codex App 中的生成檔案預覽，右側顯示簡報內容與註記區" loading="lazy" decoding="async">
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

## 3-Output｜說清楚成品要怎麼交付

告訴 Codex 你接下來會怎麼用成品。它才知道要寫多長、先放什麼，以及哪些細節不能漏。

```text
整理成主管開會前能快速看完的一頁摘要。
先放待決事項與下一步，再列進度、風險、負責人與期限。
```

重要工作可以多加一次完成前檢查，例如確認每個下一步都有負責人與期限，或列出仍無法核對的數字。最後還是要由你打開成品驗收。

## 4-Boundaries｜只留真正不能踩的底線

Boundary 不是越多越好。通常只要寫下一兩條真正會讓成果失敗、造成資安風險，或產生對外影響的限制；其他做法留給 Codex 判斷。限制寫得太細，Prompt 會重新變成一份僵硬的操作手冊。

```text
保留已核准的日期與預算；資料矛盾時先標記，不要自行修改。
只建立草稿，不要寄送、上傳或發布。
```

::: warning 重要結論仍要人工把關
可以請 Codex 在交付前自動檢查，但涉及金流、預算、商務決策、法務條款或對外發布時，最後一定要由人確認。
:::

## 參考資料

- [Prompting｜OpenAI](https://learn.chatgpt.com/docs/prompting)
- [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer?surface=app)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Settings｜Personalization](https://learn.chatgpt.com/docs/reference/settings#personalization)

<p class="source-note">本頁依 OpenAI Prompting 指南整理 Goal、Context、Output 與 Boundaries，並補上 Codex 的檔案選取、成品驗收與 Follow-up 操作。四個要素是檢查方向，不是固定模板，也不需要每次全部填滿。</p>
