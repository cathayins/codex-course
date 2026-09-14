---
title: 如何節省 Credits 用量
description: 了解 Credits 如何計算，以及哪些做法可以減少不必要的 Token 用量。
outline: [2, 3]
aside: true
pageClass: quickstart-story credit-savings-page
---

# 如何節省 Credits 用量

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
  title="盡量讓快取命中"
  description="重複讀取的內容只要 1／10 費率。實測顯示多數用量都花在重讀前文，因此讓快取命中是最直接的省法。"
>

每個 Model 的費率數字不同，但三種 Token 之間的比例在各個 Model 上是一致的。以該 Model 的一般 input 費率當作 1 倍：

<div class="rate-ratio" role="img" aria-label="同一個 Model 內，cached input 是一般 input 的 0.1 倍，output 是 5 到 6 倍">
  <div class="rate-ratio__row">
    <span class="rate-ratio__label">Cached input<em>可重用的前段內容</em></span>
    <span class="rate-ratio__track"><i class="is-low" style="width: 1.7%"></i></span>
    <b class="is-low">0.1<u>×</u></b>
  </div>
  <div class="rate-ratio__row is-base">
    <span class="rate-ratio__label">Input<em>這一輪新加入的內容</em></span>
    <span class="rate-ratio__track"><i class="is-mid" style="width: 16.7%"></i></span>
    <b>1<u>×</u></b>
  </div>
  <div class="rate-ratio__row">
    <span class="rate-ratio__label">Output<em>模型產生的內容</em></span>
    <span class="rate-ratio__track"><i class="is-high" style="width: 100%"></i></span>
    <b class="is-high">5–6<u>×</u></b>
  </div>
  <p class="rate-ratio__axis"><span>0</span><span>基準 1×</span><span>6×</span></p>
</div>

兩個可以直接拿來用的結論：**能重用的前段內容幾乎不花錢**，而 **output 是最貴的一段** — 所以控制回覆長度、避免重複產生同樣的內容，比減少讀進去的資料更有效。

### 為什麼值得花力氣讓它命中

實測 4 個 Session 的統計中，**重複讀取的 cached input 佔總輸入的 79～94%** — 也就是說每一輪裡，絕大部分都是「前面已經讀過、這次再讀一次」的內容。這些內容命中快取時只要 1／10 費率；一旦快取失效，就得用全價重算一次。

快取的存活時間（TTL）是 **30 分鐘**，而且**每次命中就重新計時** — 持續工作時它會一直是熱的，停下來超過 30 分鐘才會冷掉。

### 四個讓快取保持命中的做法

<ul class="task-checklist">
  <li><b>開場就選定模型與強度</b><span>每個 Model 各有一份快取，中途切換等於從零開始；改 reasoning effort 也會讓命中率明顯下降。決定好再開始，比做到一半調整省。</span></li>
  <li><b>一次把一件事做完</b><span>連續操作時快取會一直重新計時。中途離開超過 30 分鐘，回來的第一輪就是全額重算。</span></li>
  <li><b>做完一段再 Compact</b><span>壓縮會改寫前段內容，之後第一輪必定未命中。等一個任務告一段落再壓縮，不要在進行到一半時壓。</span></li>
  <li><b>工作中途別動設定檔</b><span>新增或移除 MCP 伺服器、改變工具順序、修改 AGENTS.md，都會改變前段內容。這些調整留到任務之間再做。</span></li>
</ul>

::: warning 不要靠「定時送訊息」保溫
每送一次訊息本身就是一筆快取讀取，長時間保溫的累計費用會超過重建一次快取的成本。閒置超過約 36 分鐘之後，直接讓它冷掉、下次重算反而比較划算。

與其研究保溫時機，不如集中時間一次做完 — 最省的快取，是根本不需要保溫的快取。
:::

同一項工作留在同一個 Session；目標改變時再開新 Session。

<p class="source-note">cached input 佔比、TTL 行為與保溫成本試算，引用自戴維廷〈搶救 Token 大作戰〉（2026-09-11）實測簡報；快取機制與 1／10 費率依 OpenAI Prompt Caching 文件。</p>
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

## 參考資料

- [ChatGPT rate card｜OpenAI Help Center](https://help.openai.com/en/articles/11481834)
- [Prompt caching｜OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching)
- [open-slide｜GitHub](https://github.com/1weiho/open-slide)
- [open-doc｜GitHub](https://github.com/simonliu-ai-product/open-doc)
- [open-sheet｜GitHub](https://github.com/lianghsun/open-sheet)

<p class="source-note">Credits 計算依 OpenAI Codex rate card；快取機制參考 OpenAI Prompt Caching。框架特點依各專案文件整理。</p>
