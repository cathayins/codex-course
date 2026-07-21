---
title: Credits 精打細算
description: 從縮小 Context、選對模型到控制輸出，學會在 Codex 中精打細算 Credits。
outline: [2, 3]
aside: true
pageClass: quickstart-story credit-savings-page
---

# Credits 精打細算

<p class="lesson-lead">Codex 的使用量，主要來自送進模型的 input、可重複利用的 cached input，以及模型產生的 output。想減少使用量，重點是讓每次任務只帶必要 Context、只做必要工作，並產出能直接驗收的結果。單純把每句話縮短，幫助不大。</p>

<div class="credit-savings-hero" aria-label="Codex 使用量的四個主要來源">
  <div class="credit-savings-hero__heading">
    <span>先看消耗從哪裡來</span>
    <h2>先減少無關輸入與重工</h2>
    <p>Credits 不是每開一個任務就固定扣除；任務越長、讀入檔案越多、輸出越大，或模型與 reasoning 設定越高，通常消耗越多。</p>
  </div>
  <div class="credit-savings-factors">
    <section><b>01</b><strong>Input</strong><p>Prompt、檔案、程式碼與對話 Context。</p></section>
    <section><b>02</b><strong>Cached input</strong><p>已重複使用、可被快取的輸入內容。</p></section>
    <section><b>03</b><strong>Output</strong><p>模型回覆、程式碼、解釋與工具輸出。</p></section>
    <section><b>04</b><strong>Model × effort</strong><p>模型能力與 reasoning 深度的選擇。</p></section>
  </div>
</div>

## 4 個精打細算的工作習慣

以下四個分頁分別處理模型、Prompt、Compact 和 `AGENTS.md`，右側動畫會標出各自影響的使用量來源。

<MediaTabs
  aria-label="Credits 精打細算技巧"
  :items="[
    {
      label: '01 模型',
      title: '輕量模型先跑一輪',
      description: '範圍清楚、容易驗證的擷取、分類與簡單修正，可以先用輕量模型。深度不足時，再提高模型或 reasoning。',
      visual: 'model',
      steps: [
        { title: '先用能完成工作的模型', description: '小錯字與簡單轉換，不必一開始就用最高能力。' },
        { title: '結果不夠，再升級', description: '方向正確但深度不足時，再提高模型或 reasoning。' }
      ],
      note: '把較高的推理成本留給需要深入判斷的任務。'
    },
    {
      label: '02 Prompt',
      title: '一次交代必要資訊',
      description: '說明目標、範圍、已知問題、完成條件與限制，可以減少 Codex 猜測和重試的次數。',
      visual: 'prompt',
      steps: [
        { title: '建議 Prompt', description: '先依 tokyo-trip-brief.txt 蒐集需要的資訊，再用新的研究素材規劃行程。' },
        { title: '避免的 Prompt', description: '幫我查完整個東京，把所有景點、餐廳和交通都放進去。' }
      ],
      note: '建議先給目標、範圍、完成條件與驗收方式；避免一次塞進整個 Repository，也不要只給模糊需求。'
    },
    {
      label: '03 Compact 壓縮',
      title: '對話太長，就用 /compact 壓縮',
      description: '同一件工作談了很多輪、讀了很多檔案或累積大量工具輸出時，用 /compact 保留目標、決策與進度，再繼續工作。',
      visual: 'compact',
      steps: [
        { title: '先整理不能遺失的內容', description: '把規則、數字、完成條件寫進工作檔案，不要只留在聊天裡。' },
        { title: '同一個目標再繼續', description: 'Compact 適合延續原工作；如果目標變了，直接開新任務。' }
      ],
      note: 'Compact 是把 Context 變短，不是逐字保存聊天；壓縮後要確認摘要沒有遺漏。'
    },
    {
      label: '04 AGENTS.md',
      title: '把穩定規則放進 AGENTS.md',
      description: '把跨任務都成立的專案結構、Coding Style、Build／Test 指令、不可修改的路徑與 Review 規則放在 AGENTS.md。',
      visual: 'agents',
      steps: [
        { title: '放長期規則', description: '把專案結構、命令、限制與完成標準寫成可重複使用的說明。' },
        { title: '不要放一次性內容', description: '秘密、長篇日誌、單次任務與整份需求文件不適合放在這裡。' }
      ],
      note: '把長期有效的 Context 寫進 AGENTS.md，每次下 Prompt 就不用重新貼一遍。'
    }
  ]"
/>

## 把工作分流，避免重複投餵

長篇問答、資料整理和觀點比較，可以先在適合的工作空間完成。確認目標後，再把必要檔案交給 Codex 執行，避免同一個 coding session 累積太多無關內容。

<div class="credit-savings-routing" aria-label="ChatGPT 與 Codex 的工作分流">
  <section class="credit-savings-routing__panel credit-savings-routing__panel--chatgpt">
    <div class="credit-savings-routing__icon" aria-hidden="true">
      <img src="/images/quick-start/chatgpt-icon.webp" width="256" height="256" alt="" decoding="async">
    </div>
    <div class="credit-savings-routing__copy">
      <span>CHATGPT｜先做理解與整理</span>
      <h3>把問題想清楚</h3>
      <ul>
        <li>詢問概念、發想與比較</li>
        <li>整理長文、會議紀錄與研究資料</li>
        <li>寫報告、摘要、翻譯與溝通稿</li>
      </ul>
    </div>
  </section>
  <section class="credit-savings-routing__panel credit-savings-routing__panel--codex">
    <div class="credit-savings-routing__icon" aria-hidden="true">
      <img src="/images/quick-start/codex-icon.webp" width="256" height="256" alt="" decoding="async">
    </div>
    <div class="credit-savings-routing__copy">
      <span>CODEX｜專心處理工作區</span>
      <h3>把成果做出來</h3>
      <ul>
        <li>修改、重構與除錯程式</li>
        <li>執行測試、檢查 Diff／Review</li>
        <li>讀取專案檔案並留下可使用的成果</li>
      </ul>
    </div>
  </section>
</div>

要省 Token，就縮小 Context、減少重複、控制輸出，並讓同一個 Session 只累積和目前目標有關的進度。

東京旅遊 Demo 的每一輪只做一件事：先蒐集資料，再確認規劃方向與準則，接著製作計畫書，最後決定交付格式。這比一開始同時要求搜尋、排行程、做網頁，更容易檢查，也能減少整份重做。

## 參考資料

- [Codex rate card｜OpenAI Help Center](https://help.openai.com/en/articles/20001106)
- [Using Codex with your ChatGPT plan｜OpenAI Help Center](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [Slash Commands](/quick-start/using-slash)
- [Prompting](/quick-start/prompting)
- [AGENTS.md](/advanced/agents-md)

<p class="source-note">本頁依 2026-07-19 OpenAI 官方 Credits、Codex 使用量與工作方式文件整理。實際使用量會依模型、輸入／快取輸入／輸出、reasoning、Fast mode、任務複雜度與 Workspace 設定變動；產品名稱與費率更新時，請以官方 rate card 為準。</p>
