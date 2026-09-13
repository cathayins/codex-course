---
title: 控制 Credits 用量
description: 了解 Credits 如何計算，以及哪些做法可以減少不必要的 Token 用量。
outline: [2, 3]
aside: true
pageClass: quickstart-story credit-savings-page
---

# 控制 Credits 用量

<p class="lesson-lead">Codex 會依實際使用的 input、cached input 與 output Token 計算 Credits。Model、任務大小與輸出長度都會影響用量。</p>

<div class="credit-savings-hero" aria-label="影響 Codex Credits 用量的主要因素">
  <div class="credit-savings-hero__heading">
    <span>Credits 怎麼計算</span>
    <h2>Token 用量與模型費率</h2>
    <p>相同的 Token 數量，使用不同 Model，換算出的 Credits 也不同。</p>
  </div>
  <div class="credit-savings-factors">
    <section><b>01｜TOKEN</b><strong>減少無關內容</strong><p>只提供任務需要的檔案與 Context，並控制輸出篇幅。</p></section>
    <section><b>02｜MODEL</b><strong>依任務選擇模型</strong><p>需要更深入的分析時，再提高模型能力或 reasoning effort。</p></section>
  </div>
</div>

::: info Cached input 的費率較低
前段內容相同時，部分輸入可以計為 cached input，費率是一般 input 的 1／10。新增內容與 output 仍會計入用量。
:::

<LessonBlock
  id="cache-pricing"
  title="快取費率怎麼算"
  description="Codex 依 input、cached input 與 output Token 計算 Credits，不另外收取 cache write 費用。"
>

以一般 input 費率作為 100%：

<div class="cache-chart" role="img" aria-label="Codex Credits 包含一般 input、cached input 與 output；cached input 是一般 input 費率的 10%">
  <div class="cache-chart__row">
    <span class="cache-chart__label">Input<small>新加入的內容</small></span>
    <span class="cache-chart__track"><i class="is-base" style="width: 80%"></i></span>
    <b>100%</b>
  </div>
  <div class="cache-chart__row">
    <span class="cache-chart__label">Cached input<small>可重用的前段內容</small></span>
    <span class="cache-chart__track"><i class="is-good" style="width: 8%"></i></span>
    <b class="is-good">10%</b>
  </div>
  <div class="cache-chart__row">
    <span class="cache-chart__label">Output<small>模型產生的內容</small></span>
    <span class="cache-chart__track"><i class="is-warn" style="width: 100%"></i></span>
    <b>依 Model</b>
  </div>
</div>

### 哪些變動會影響快取

快取需要相同的前段內容。以下變動可能降低重用比例：

<ul class="task-checklist">
  <li><b>切換 Model</b><span>不同 Model 的快取行為可能不同。</span></li>
  <li><b>修改指令或工具</b><span>前段指令、工具內容或順序改變時，可能無法沿用原快取。</span></li>
  <li><b>Compact</b><span>壓縮會改變前段內容，之後可能需要建立新快取。</span></li>
</ul>

同一項工作可以留在同一個 Session；目標改變時再開新 Session。
</LessonBlock>

<LessonBlock
  id="doc-frameworks"
  title="用框架處理固定格式"
  description="固定格式可以交給框架處理，減少透過對話反覆調整版面、公式與匯出。"
>

以下三個開源框架會分開處理內容、版面、公式與匯出，皆採 MIT License：

<MediaTabs
  aria-label="文件、試算表、簡報的專用框架"
  :items="[
    {
      label: 'open-slide',
      title: 'open-slide｜簡報',
      description: '用 React 建立投影片，框架處理 1920×1080 畫布、縮放、導覽與播放模式。',
      image: '/images/credits/open-slide-cover.webp',
      alt: 'open-slide 的投影片編輯畫面，左側是頁面縮圖，中間是 1920×1080 的投影片畫布',
      fit: 'wide',
      steps: [
        { title: '固定簡報畫布', description: '框架處理縮放、導覽、預覽與播放模式。' },
        { title: '匯出 HTML 與 PDF', description: '可以從工具列匯出，也能建立靜態網站。' },
        { title: 'PPTX 以圖片呈現', description: '每頁是一張圖片，無法直接編輯文字。' },
        { title: '內建簡報 Skills', description: '/create-slide 會先確認主題、頁數、密度與轉場。' }
      ],
      commands: [
        { label: '安裝', code: 'npx @open-slide/cli init my-slide\ncd my-slide && pnpm dev' },
        { label: '交代需求', code: '/create-slide\n\n依 draft.md 做一份 10 頁簡報，\n扁平卡通風格、資訊密度中等、逐步揭示。' },
        { label: '匯出', code: '瀏覽器工具列 Export → HTML / PDF / PPTX' }
      ],
      links: [{ label: 'github.com/1weiho/open-slide ↗', href: 'https://github.com/1weiho/open-slide' }],
      note: '作者 Yiwei Ho，MIT License；畫面取自 open-slide.dev。'
    },
    {
      label: 'open-doc',
      title: 'open-doc｜文件',
      description: '用 React 建立文件，框架處理頁面尺寸、自動分頁、目錄、頁碼與匯出。',
      image: '/images/credits/open-doc.webp',
      alt: 'open-doc 的文件檢視畫面，呈現帶有目錄與頁碼的 A4 報告',
      fit: 'wide',
      steps: [
        { title: 'A4 自動分頁', description: '依實際頁面尺寸安排內容與換頁。' },
        { title: '目錄與頁碼', description: '目錄、頁碼、註腳與交叉參照會自動更新。' },
        { title: '可匯入 Markdown', description: '既有草稿直接帶進來，不必重寫。' },
        { title: '內建文件 Skills', description: '/create-doc 起草，/doc-authoring 提供版面規則。' }
      ],
      commands: [
        { label: '安裝', code: 'npx @open-document/cli init my-docs\ncd my-docs && pnpm dev' },
        { label: '交代需求', code: '/create-doc\n\n依 notes.md 寫一份給主管的季度成效報告，\n要有目錄、頁碼與資料來源註腳。' },
        { label: '匯出', code: 'open-doc export q3-review --format pdf' }
      ],
      links: [{ label: 'github.com/simonliu-ai-product/open-doc ↗', href: 'https://github.com/simonliu-ai-product/open-doc' }],
      note: '作者 Simon Liu，MIT License；畫面取自專案 README。'
    },
    {
      label: 'open-sheet',
      title: 'open-sheet｜試算表',
      description: '用 React 定義欄位與公式，框架負責儲存格位置、公式參照、重新計算與匯出。',
      image: '/images/credits/open-sheet.webp',
      alt: 'open-sheet 的來源碼與產出對照：左側是 React 定義，右側是含公式的試算表',
      fit: 'wide',
      steps: [
        { title: '名稱轉成位址', description: '具名參照會在編譯時轉成實際儲存格位置。' },
        { title: '公式可重新計算', description: '同一套公式用於畫面預覽與 XLSX 匯出。' },
        { title: '四種匯出格式', description: '支援 XLSX、CSV、HTML 與 PDF。' },
        { title: '內建試算表 Skills', description: '/create-sheet 起草，/sheet-authoring 提供公式寫法。' }
      ],
      commands: [
        { label: '安裝', code: 'npx @open-sheet/cli init my-sheets\ncd my-sheets && npm install && npm run dev' },
        { label: '交代需求', code: '/create-sheet\n\n依 data.csv 做一份月度營收試算表，\n加上成長率與累計欄位，公式要能在 Excel 裡重算。' },
        { label: '匯出', code: '從介面匯出 .xlsx / .csv / .html / .pdf' }
      ],
      links: [{ label: 'github.com/lianghsun/open-sheet ↗', href: 'https://github.com/lianghsun/open-sheet' }],
      note: '作者 lianghsun，MIT License；畫面取自專案 README。'
    }
  ]"
/>

</LessonBlock>

<LessonBlock
  id="visual-editing"
  title="不用 Prompt 的修改"
  description="文字、字型與顏色這類調整可以直接在編輯畫面完成，不必每次都透過對話。"
>

open-slide 的 Visual editor 可以直接修改文字、字型與顏色並寫回檔案，不會呼叫模型。透過留言請 Agent 修改時，仍會使用 Token。PPTX 匯出目前以圖片呈現，無法直接編輯文字。

<figure class="task-result">
  <img src="/images/credits/open-slide-inspector.webp" width="1600" height="924" alt="open-slide 的瀏覽器編輯畫面：左側頁面縮圖、中間投影片、右側可調整文字內容、字級、粗細、顏色與 Design tokens" loading="lazy" decoding="async">
  <figcaption>open-slide 的 Inspector：點任一元素就能在右側改文字、字級、對齊與顏色，全域配色在 Design tokens 一次調整。圖片來源：<a href="https://open-slide.dev" target="_blank" rel="noreferrer">open-slide.dev</a>（MIT License）</figcaption>
</figure>

</LessonBlock>

<LessonBlock
  id="reduce-usage"
  title="減少不必要的用量"
  description="除了選對模型與框架，日常操作也會影響用量。以下幾點的共同原則是：不要讓同樣的內容被重複處理。"
>

### 開始之前先決定

<ul class="task-checklist">
  <li><b>先定模型與推理強度</b><span>兩者中途變更都會使快取失效。開場就選定，比做到一半再調整省。</span></li>
  <li><b>一次處理完一件事</b><span>持續工作時快取會一直有效；中斷越久，下一輪重新計算的量越大。</span></li>
  <li><b>Compact 放在自然斷點</b><span>壓縮後第一輪必定未命中快取，因此適合放在任務之間，而不是任務中途。</span></li>
</ul>

### 控制進入對話的內容

<ul class="task-checklist">
  <li><b>只提供需要的內容</b><span>移除和目前任務無關的檔案與 Context。</span></li>
  <li><b>長輸出先截尾</b><span>測試與建置的 log 可以接 <code>2&gt;&amp;1 | tail -30</code>，只把結尾帶進對話；需要細節時再用 grep 取出對應片段。</span></li>
  <li><b>跨多檔的探索交給子代理</b><span>由子代理讀完再回報結論，原始內容不會進入主對話。查單一檔案則直接讀取即可。</span></li>
</ul>

### 修改的時候

<ul class="task-checklist">
  <li><b>先檢查再修改</b><span>確認目前結果，再提出具體的修改要求。</span></li>
  <li><b>一次只改一個問題</b><span>指出具體欄位或行為，讓下一輪的修改範圍保持清楚。</span></li>
  <li><b>同一目標沿用同一個 Session</b><span>目標改變時再開新 Session。</span></li>
</ul>

<p class="source-note">快取失效條件與長輸出截尾、子代理回報等做法，參考戴維廷〈搶救 Token 大作戰〉（2026-09-11）實測簡報整理。實測 4 個 Session 中，重複讀取的 cached input 佔總輸入的 79～94%。</p>
</LessonBlock>

## 參考資料

- [ChatGPT rate card｜OpenAI Help Center](https://help.openai.com/en/articles/11481834)
- [Prompt caching｜OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching)
- [open-slide｜GitHub](https://github.com/1weiho/open-slide)
- [open-doc｜GitHub](https://github.com/simonliu-ai-product/open-doc)
- [open-sheet｜GitHub](https://github.com/lianghsun/open-sheet)

<p class="source-note">Credits 計算依 OpenAI Codex rate card；快取機制參考 OpenAI Prompt Caching。框架特點依各專案文件整理。</p>
