---
title: Credits 精打細算
description: 減少不必要的 Token，並依任務選擇適合的 Model，讓 Codex 把 Credits 用在真正需要的地方。
outline: [2, 3]
aside: true
pageClass: quickstart-story credit-savings-page
---

# Credits 精打細算

<p class="lesson-lead">Codex 的 Credits 可以先看兩件事：用了多少 Token，以及選了哪個 Model。先減少不必要的 Context、重工與過長輸出，再依任務難度選擇剛好夠用的模型，不必每次都從最高能力開始。</p>

<div class="credit-savings-hero" aria-label="Codex 精打細算的兩個核心原則">
  <div class="credit-savings-hero__heading">
    <span>先抓住兩個原則</span>
    <h2>減少 Token，選對 Model</h2>
    <p>Input、cached input 和 output 會影響 Token 使用量；Model 與 reasoning 則會影響處理能力和 Credits 消耗。</p>
  </div>
  <div class="credit-savings-factors">
    <section><b>01｜TOKEN</b><strong>減少不必要的使用量</strong><p>縮小 Context、控制輸出、減少重工；重複內容則盡量讓 Cache 重用。</p></section>
    <section><b>02｜MODEL</b><strong>選擇剛好夠用的模型</strong><p>先用能完成工作的 Model；真的需要更深判斷時，再提高模型能力或 reasoning。</p></section>
  </div>
</div>

::: info Cache 省的是重複處理
當這一輪輸入的前段內容和先前相同，模型可以重用已經處理過的部分，這些就是 cached input。

Cache 不代表 Session 越長越省。後來加入的內容仍會增加使用量，無關的 Context 也可能讓 Codex 更難抓到重點。
:::

## 4 個精打細算的工作習慣

接下來從模型、Prompt、Cache 和 `AGENTS.md` 四個地方下手，看看平常怎麼少走冤枉路。

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
      title: '先說清楚希望得到什麼結果',
      description: '先講要交付什麼、做到什麼程度、怎麼驗收，再補上必要素材和限制。結果說得越清楚，越不容易做完才發現方向不對。',
      visual: 'prompt',
      steps: [
        { title: '希望的結果', description: '整理成一份可以直接拿去規劃行程的東京旅遊資料，輸出為 Markdown。' },
        { title: '範圍與邊界', description: '依 tokyo-trip-brief.txt 蒐集交通、區域、景點、餐飲與注意事項；附上來源，先不要排行程。' }
      ],
      note: '範例 Prompt：請依 tokyo-trip-brief.txt 蒐集東京旅遊需要的資訊，整理成 Markdown。內容包含交通、區域、景點、餐飲與注意事項，每項附上資料來源。這一階段只整理資料，先不要安排行程。'
    },
    {
      label: '03 Cache',
      title: '同一個目標，沿用同一個 Session',
      description: '延續同一件工作時，前面的輸入比較有機會被重用。不過 Session 越長不代表越省；新增內容和無關 Context 仍會增加使用量。',
      visual: 'session',
      steps: [
        { title: '讓前面的內容保持穩定', description: '專案規則與共用資料不要每一輪重寫，把這次才會變動的要求接在後面。' },
        { title: '目標換了就開新 Session', description: '不要為了 Cache，把不相關的工作全部接在同一段對話裡。' }
      ],
      note: '是否命中 Cache，關鍵是輸入前段是否相同，不是 Session 名稱本身。'
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

同一個目標可以留在同一個 Session，通常比較容易重用前面的 Context；目標換了，就另開一個。Cache 省得了重複輸入，省不了無關內容和重工。

東京旅遊 Demo 的每一輪只做一件事：先蒐集資料，再確認規劃方向與準則，接著製作計畫書，最後決定交付格式。這比一開始同時要求搜尋、排行程、做網頁，更容易檢查，也能減少整份重做。

## 參考資料

- [Codex rate card｜OpenAI Help Center](https://help.openai.com/en/articles/20001106)
- [Using Codex with your ChatGPT plan｜OpenAI Help Center](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
- [Prompt caching｜OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching)
- [Claude Code 如何使用 prompt caching｜Anthropic](https://code.claude.com/docs/zh-TW/prompt-caching)
- [Slash Commands](/quick-start/using-slash)
- [Prompting](/quick-start/prompting)
- [AGENTS.md](/advanced/agents-md)

<p class="source-note">本頁的 Credits 計算以 OpenAI Codex rate card 為準；Cache 的工作方式參考 OpenAI Prompt Caching 與 Claude Code 文件。不同模型與產品的 Cache 規則可能不同，實際費率與行為請以各自的官方文件為準。</p>
