---
title: Prompting｜說清楚你要什麼
description: 從結果開始，補上必要的來源、格式與限制，再用 Follow-up 把第一版改到能用。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Prompting｜說清楚你要什麼

<p class="lesson-lead">先說清楚 Goal，再補上會影響答案的 Context、需要的 Output，以及不能踩的 Boundaries。簡單任務一句話就夠；任務變複雜時，再把缺少的資訊補上。</p>

## 建議的四層 Prompt 架構

Prompt 可以是一個問題、一句指令，或一個完整任務。OpenAI 把 Prompt 整理成四個檢查方向，不需要每次套用固定模板：

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

Context 只要放會影響答案的來源，並說明要從每份來源找什麼。

- **檔案：** 摘要、比較、轉換或產生新文件時使用。
- **Web search：** 資訊會更新時，要求搜尋並附上來源。

### Work with Your Files

在輸入框打 `@`，再從選單挑選來源。資料已經在專案裡，就選 **@File**；資料放在外部服務，或需要特定工具處理，就選 **@Plugin**。請從選單點選，不要只把名稱當成一般文字輸入。

<div class="source-choice-grid" aria-label="使用 File 或 Plugin 選擇資料來源">
  <section class="source-choice-card source-choice-card--file">
    <div class="source-choice-card__header">
      <span class="source-choice-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
      </span>
      <div><kbd>@File</kbd><small>本機與專案檔案</small></div>
    </div>
    <h3>直接指定要讀的檔案</h3>
    <p>知道資料在哪裡時，從 <code>@</code> 選單挑選檔案。適合摘要、比較、轉換，或修改指定內容。</p>
    <div class="source-choice-card__examples" aria-label="File 支援的常見格式">
      <span>CSV</span><span>Excel</span><span>PDF</span><span>圖片</span><span>Markdown</span>
    </div>
  </section>

  <section class="source-choice-card source-choice-card--plugin">
    <div class="source-choice-card__header">
      <span class="source-choice-card__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/></svg>
      </span>
      <div><kbd>@Plugin</kbd><small>外部服務與專用工具</small></div>
    </div>
    <h3>連接外部資料或能力</h3>
    <p>資料在其他服務，或需要專用工具處理時使用。可用項目會依安裝、帳號授權與 Workspace 設定而不同。</p>
    <div class="source-choice-card__examples" aria-label="Plugin 的常見例子">
      <span>SharePoint</span><span>Spreadsheets</span><span>PDF</span>
    </div>
  </section>
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

重要工作可以要求 Codex 在交付前再檢查一次，例如確認每個下一步都有負責人與期限，或列出仍無法核對的數字。最後仍要由你打開成品驗收。

## 4-Boundaries｜只留不能踩的底線

Boundary 通常寫一兩條就夠：哪些情況會讓成果失敗、造成資安風險，或產生對外影響。其他做法留給 Codex 判斷。限制寫得太細，Prompt 會重新變成一份僵硬的操作手冊。

```text
這一輪先蒐集資料，不要開始排行程。
外部資訊請保留來源與查詢日期；還不能確認的內容要清楚標示。
```

::: warning 重要結論仍要人工把關
可以請 Codex 在交付前自動檢查，但涉及金流、預算、商務決策、法務條款或對外發布時，最後一定要由人確認。
:::

## 東京旅遊 Demo｜先蒐集規劃會用到的資訊

確認資料夾裡有 `tokyo-trip-brief.txt` 後，用 `@` 從選單選取它，再送出這段 Prompt：

```text
請讀取 @tokyo-trip-brief.txt，蒐集規劃這趟東京旅行會用到的資訊。

可以搜尋網路，優先參考官方或可信的來源。
請把蒐集到的內容整理成 `tokyo-travel-research.md`，
保留來源連結與查詢日期；還不能確認的內容請清楚標示。

這一輪只做資料蒐集與整理，先不要安排每天的行程。
```

這次的 Goal 是補齊規劃行程需要的資料；Context 是原始需求與網路來源；Output 是新的研究素材 `tokyo-travel-research.md`。Boundary 只留一條：這一輪先蒐集，不提前排行程。下一頁再用 `/plan` 讀取兩份素材，安排完整旅程。

## 參考資料

- [Prompting｜OpenAI](https://learn.chatgpt.com/docs/prompting)
- [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer?surface=app)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Settings｜Personalization](https://learn.chatgpt.com/docs/reference/settings#personalization)

<p class="source-note">本頁依 OpenAI Prompting 指南整理 Goal、Context、Output 與 Boundaries，並補上 Codex 的檔案選取、成品驗收與 Follow-up 操作。四個要素是檢查方向，不是固定模板，也不需要每次全部填滿。</p>
