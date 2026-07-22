---
title: The New Paradign of SDLC in the Era of Codex
description: 工程師如何從親手完成每個步驟，轉向定義問題與完成標準，再由 Codex 或 Claude Code 執行、驗證並回報。
outline: [2, 3]
aside: true
pageClass: quickstart-story codex-for-engineer
prev:
  text: What Is Codex
  link: /quick-start/
next:
  text: Installation
  link: /quick-start/installation
---

# The New Paradign of SDLC in the Era of Codex

<p class="lesson-lead">從親手寫每一步，到帶著 Agent 把任務做完。<br><strong>工程師把問題與標準說清楚，Agent 負責實作、測試與回報。</strong></p>

## 從 Ctrl C、V 到直接交辦任務

這三個階段改變的，除了模型能力，還有 **我們交給 AI 的工作：從一小段答案，逐步變成完整任務**。

<EngineerEvolution />

使用 ChatGPT 時，工程師常把工作區外的答案搬回 IDE。Cursor 把程式補全帶進編輯器，仍由人一步步往前推。到了 Codex，我們交辦的單位變成「一個可驗收的任務」：Agent 探索、修改、測試，工程師檢查 Diff 和結果。

<div class="takeaway">
  <span>THE SHIFT</span>
  <strong>以前是人操作工具、AI 提供片段；現在是人定義方向、Agent 執行迴圈。</strong>
  <p>Just Ask Codex 的前提，是說清楚工程意圖與完成條件。</p>
</div>

## 有了 Codex，工程師的工作怎麼變？

以前，工程師從拆需求、寫程式到除錯和測試，大多要自己一步步完成。現在，實作可以交給 Agent 反覆執行，工程師則要先把問題、限制和完成標準講清楚，最後再檢查結果。NStarX 用 **AI-assisted** 和 **AI-native** 區分這兩種工作方式；這裡只看工程師最直接的變化。

<div class="engineer-role-split" role="group" aria-label="工程師工作方式的 Before 與 After">
  <article class="engineer-role-card is-before">
    <span class="engineer-role-card__eyebrow">BEFORE｜以前</span>
    <h3>工程師自己一步步做</h3>
    <p>從拆需求、寫程式、找問題到跑測試，主要都由工程師親手完成。AI 即使有參與，也多半只是補幾行程式碼或提供建議。</p>
    <div class="engineer-role-card__tags" aria-label="以前的工作方式">
      <span>拆需求</span><span>寫程式</span><span>找問題</span><span>跑測試</span>
    </div>
  </article>
  <span class="engineer-role-split__handoff" aria-hidden="true">→</span>
  <article class="engineer-role-card is-after">
    <span class="engineer-role-card__eyebrow">AFTER｜現在</span>
    <h3>工程師先定方向，再交給 Agent 執行</h3>
    <p>工程師先說清楚要解決的問題、不能碰的地方，以及怎樣才算完成。Codex 負責讀專案、修改、測試和回報，工程師再確認方向與結果。</p>
    <div class="engineer-role-card__tags" aria-label="現在的工作方式">
      <span>定方向</span><span>設邊界</span><span>Agent 執行</span><span>檢查結果</span>
    </div>
  </article>
</div>

工程師不是退出實作，而是把時間往前移：先想清楚要做什麼，再判斷 Agent 做得對不對。

## 1｜將程式碼庫作為唯一可信來源

Agent 只能依照它找得到的資料工作。如果架構規則留在 Google 文件、決策散在 Slack，還有一些做法只有資深工程師知道，Codex 看到的就不是完整專案。把規格、設計、決策和程式碼放在同一個 Repository，才能一起搜尋、修改和追蹤版本。

<figure class="course-visual course-visual--wide">
  <img src="/images/quick-start/agent-knowledge-limits.webp" width="1800" height="938" loading="lazy" decoding="async" alt="OpenAI 圖解 Codex 無法看見外部文件、Slack 訊息與隱性知識，必須把重要內容編碼進程式碼庫">
  <figcaption>重要知識要成為 Repository 內可發現、可版本控制的內容。圖片來源：OpenAI Harness Engineering。</figcaption>
</figure>

### 先看地圖，需要時再找細節

不要把所有規則都塞進 `AGENTS.md`。讓它保持精簡，負責指向更深入的設計、架構與計畫文件；重複使用的工作方法則整理成 Skill。Agent 需要什麼才讀什麼，不必每次把整套文件都塞進 Context。這就是**漸進式揭露**。

導入 Agent 協作後，Repository 通常會多出這幾份文件。`DESIGN.md`、`ARCHITECTURE.md` 與 `PLANS.md` 不是每個工具都會自動載入，因此要從 `AGENTS.md` 清楚指向它們。

```text
repository/
├── AGENTS.md
├── DESIGN.md
├── ARCHITECTURE.md
├── PLANS.md
├── .agents/
│   └── skills/
│       └── <workflow>/
│           └── SKILL.md
└── docs/
    ├── design-docs/
    └── exec-plans/
```

<AgentKnowledgeNav />

<div class="takeaway">
  <span>LIVE REPOSITORY｜課堂示範</span>
  <strong><a href="https://github.com/cathayins/codex-course" target="_blank" rel="noreferrer">cathayins/codex-course ↗</a></strong>
  <p>這份教材本身就是一個可以直接打開的 Repository。上課時可以從程式碼、課程文件、<code>AGENTS.md</code> 與 <code>DESIGN.md</code> 開始，看規則和實作怎麼放在同一個地方。</p>
</div>


## 2｜讓 Agent 不只讀程式碼，也看得到程式怎麼跑

只看程式碼，Codex 只能推測程式「應該」怎麼運作。要讓它自己找問題、修改並驗證，還得把 App 跑起來後的畫面與執行訊號交給它。

<div class="agent-runtime-points" aria-label="讓 Agent 讀取程式執行結果的兩種做法">
  <section class="agent-runtime-point">
    <b class="agent-runtime-point__index">01</b>
    <div>
      <span class="agent-runtime-point__eyebrow">BROWSER｜看 UI</span>
      <h3>網站開發：直接看使用者遇到什麼</h3>
      <p>讓 Coding Agent 啟動網站、操作頁面，再讀 DOM、截圖與瀏覽器事件。它可以從實際畫面找問題，修改後再走一次相同流程。</p>
      <div class="agent-runtime-path" aria-label="透過 Browser 判斷 UI 的流程"><b>啟動 App</b><i>→</i><b>操作頁面</b><i>→</i><b>讀 DOM／截圖</b><i>→</i><b>修改後重跑</b></div>
    </div>
  </section>
  <section class="agent-runtime-point">
    <b class="agent-runtime-point__index">02</b>
    <div>
      <span class="agent-runtime-point__eyebrow">OBSERVABILITY｜查系統</span>
      <h3>系統除錯：從 Logs、Metrics 與 Traces 找原因</h3>
      <p>把 <code>LogQL</code>、<code>PromQL</code>、<code>TraceQL</code> 等查詢介面接給 Codex，它就能自己查線索、關聯訊號，再修改程式並重跑測試。</p>
      <div class="agent-runtime-path" aria-label="透過遙測資料除錯的流程"><b>查詢訊號</b><i>→</i><b>關聯資料</b><i>→</i><b>找出原因</b><i>→</i><b>修改與重跑</b></div>
    </div>
  </section>
</div>

<figure class="agent-observability-figure">
  <div class="agent-observability-figure__canvas">
    <img src="/images/quick-start/codex-observability-stack.svg" width="802" height="469" loading="lazy" decoding="async" alt="Codex 查詢日誌、指標與追蹤，修改程式後重啟應用程式並重跑 UI 測試的可觀測性回饋迴圈">
  </div>
  <figcaption>OpenAI 的做法：讓 Codex 查詢日誌、指標與追蹤，修改後重新啟動 App、重跑流程，再把結果送回下一輪。手機可左右滑動查看圖面細節。圖片來源：<a href="https://openai.com/zh-Hant-HK/index/harness-engineering/">OpenAI Harness Engineering</a>。</figcaption>
</figure>

### 看得到現場之後，還要補上兩件事

Agent 還需要知道怎樣才算完成，以及出錯後該往哪裡查。

<div class="agent-feedback-stack" aria-label="讓 Agent 自己完成驗證與除錯的兩個條件">

  <section class="agent-feedback-card is-validation">
    <header>
      <b class="agent-feedback-card__index">01</b>
      <div><span>DEFINE DONE</span><h3>有清楚的驗證標準</h3></div>
    </header>
    <div class="agent-feedback-card__meaning">
      <strong>代表什麼</strong>
      <p>在動手前先說清楚「做到什麼才算完成」。Codex 修改後必須重跑約定的檢查與操作流程，不能只看程式碼覺得應該沒問題。</p>
    </div>
    <div class="agent-feedback-card__checks" aria-label="常見的完成驗證方式">
      <div><b>Unit Test</b><span>確認功能邏輯</span></div>
      <div><b>Lint</b><span>確認程式規範</span></div>
      <div><b>Type Check</b><span>確認型別與介面</span></div>
    </div>
    <div class="agent-feedback-card__example"><span>完成條件範例</span><p><code>npm run lint</code> 與 <code>npm test</code> 通過，並重跑原本出錯的操作流程。</p></div>
  </section>

  <section class="agent-feedback-card is-error">
    <header>
      <b class="agent-feedback-card__index">02</b>
      <div><span>READ THE ERROR</span><h3>讀得到可以採取行動的錯誤</h3></div>
    </header>
    <div class="agent-feedback-card__meaning">
      <strong>代表什麼</strong>
      <p>Logs、Network 與 Exception 要留下足夠線索。如果你正在開發會由 Agent 操作的系統，Error Message 應說明失敗動作、資料、實際狀態、預期狀態與下一步。</p>
    </div>
    <div class="agent-feedback-card__error-compare">
      <article class="is-poor"><span>✕ 只知道失敗</span><code>Update failed</code></article>
      <article class="is-useful"><span>✓ 知道下一步怎麼查</span><code>更新訂單 order_123 失敗：API 回傳 409，目前狀態為 paid，預期為 pending。請先重新讀取訂單狀態。</code></article>
    </div>
    <footer class="agent-feedback-card__tags"><span>Logs</span><span>Network</span><span>Exception</span><span>Next step</span></footer>
  </section>
</div>

## 參考資料

- [Harness 工程：在以代理為核心的世界利用 Codex 推動工程效率｜OpenAI](https://openai.com/zh-Hant-HK/index/harness-engineering/)
- [How Claude remembers your project｜Anthropic](https://code.claude.com/docs/en/memory)
- [The New Paradigm of SDLC in the Era of Claude & Codex｜NStarX](https://nstarxinc.com/blog/the-new-paradigm-of-sdlc-in-the-era-of-claude-codex/)

<p class="source-note">「Agentic Engineer」與三階段演化是本課的教學框架；OpenAI 文章著重工程師角色、Harness、Agent 可讀性與回饋迴圈，NStarX 文章則以 AI-assisted／AI-native SDLC 描述流程轉變。官方圖片保留原始內容；本文未沿用 NStarX 的預測性效益數字。</p>
