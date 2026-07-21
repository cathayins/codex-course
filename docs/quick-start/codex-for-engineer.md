---
title: Codex for Engineer
description: 從 ChatGPT、Cursor 到 Codex，理解工程師角色、Agent 可讀性，以及以程式碼庫為唯一可信來源的現代工程架構。
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

# Codex for Engineer

<p class="lesson-lead">工程師和 AI 的互動，正從「問答案」走向「交辦任務」。<br><strong>人掌握方向，Agent 負責執行。</strong></p>

## 從 Ctrl C、V 到直接交辦任務

這三個階段改變的，除了模型能力，還有 **我們交給 AI 的工作：從一小段答案，逐步變成完整任務**。

<EngineerEvolution />

使用 ChatGPT 時，工程師常把工作區外的答案搬回 IDE。Cursor 把程式補全帶進編輯器，仍由人一步步往前推。到了 Codex，我們交辦的單位變成「一個可驗收的任務」：Agent 探索、修改、測試，工程師檢查 Diff 和結果。

<div class="takeaway">
  <span>THE SHIFT</span>
  <strong>以前是人操作工具、AI 提供片段；現在是人定義方向、Agent 執行迴圈。</strong>
  <p>Just Ask Codex 的前提，是說清楚工程意圖與完成條件。</p>
</div>

## Codex 開始寫程式後，工程師在做什麼？

NStarX 用 **AI-assisted** 和 **AI-native** 描述兩種工作方式。AI-assisted 是在原本的流程裡加入補全；AI-native 則重新安排人與 Agent 怎麼合作。Codex 接手實作後，工程師的工作會往前移：先釐清真正的需求，決定該怎麼取捨、哪些邊界不能跨，再把完成條件說清楚。

<div class="engineer-role-split" role="group" aria-label="工程師與 Codex 的分工">
  <article class="engineer-role-card is-human">
    <span class="engineer-role-card__eyebrow">HUMAN｜工程師</span>
    <h3>釐清需求，做出取捨</h3>
    <p>定義真正要解決的問題，決定方案該怎麼取捨、哪些邊界不能跨，以及怎樣才算完成。</p>
    <div class="engineer-role-card__tags" aria-label="工程師負責項目">
      <span>Requirements</span><span>Trade-offs</span><span>Boundaries</span><span>Acceptance</span>
    </div>
  </article>
  <span class="engineer-role-split__handoff" aria-hidden="true">→</span>
  <article class="engineer-role-card is-agent">
    <span class="engineer-role-card__eyebrow">AGENT｜Codex</span>
    <h3>把任務做完並交代結果</h3>
    <p>先讀程式碼與規範，再動手修改、跑測試，最後回報改了什麼、檢查結果如何。</p>
    <div class="engineer-role-card__tags" aria-label="Codex 負責項目">
      <span>Explore</span><span>Build</span><span>Test</span><span>Report</span>
    </div>
  </article>
</div>

工程師不必把每一步都寫成指令，但要對幾個關鍵問題做決定：需求到底是什麼？這次優先顧速度、品質還是風險？哪些地方可以調整，哪些地方不能碰？這些判斷清楚後，再把任務交給 Agent 實作與驗證。

## 1｜讓 Agent 不只讀程式碼，還看得到執行結果

工程師修 Bug 時，會先把 App 跑起來，看畫面、讀錯誤訊息，修改後再測一次。如果 Agent 只能讀程式碼，卻看不到 App 實際怎麼跑，它就只能猜。OpenAI 團隊在這個專案的做法，是把工程師平常用來判斷問題的訊號也交給 Codex。

<div class="use-case-grid agent-readable-grid">
  <section><span>01｜找得到規則</span><h3>知道該去哪裡看</h3><p>把模組邊界、架構規則和常用指令放進 Repository，讓 Agent 不必依賴口頭默契。</p></section>
  <section><span>02｜看得到 App</span><h3>程式跑起來後，它也看得到</h3><p>讓 Agent 能啟動 App、讀 DOM 和截圖，也能查日誌、指標與追蹤，直接看到問題發生在哪裡。</p></section>
  <section><span>03｜能自己確認</span><h3>改完後，知道有沒有修好</h3><p>讓 Agent 重跑同一段操作、測試與 Lint，對照修改前後的結果，不必只靠「程式看起來沒問題」。</p></section>
</div>

<section class="agent-readable-loop" aria-labelledby="agent-readable-loop-title">
  <span>CODEX 的驗證迴圈</span>
  <strong id="agent-readable-loop-title">Codex 怎麼知道自己真的修好了？</strong>
  <ol>
    <li><b>1｜重現</b><small>啟動 App，走一次出錯的操作流程。</small></li>
    <li><b>2｜找原因</b><small>查看 DOM、截圖、日誌與執行指標。</small></li>
    <li><b>3｜修改</b><small>改完程式後，重新啟動自己的 App。</small></li>
    <li><b>4｜再驗證</b><small>重跑相同操作與測試，比較修改前後結果。</small></li>
  </ol>
  <p>OpenAI 讓每個 Git worktree（獨立工作目錄）啟動一套互不干擾的 App。Codex 因此可以在自己的環境反覆修改和重跑，不會踩到其他工作的狀態。這就是讓應用程式「對 Agent 可讀」：除了程式碼，也讓它讀得到畫面、錯誤與驗證結果。</p>
</section>

## 2｜將程式碼庫作為唯一可信來源

如果重要知識只放在 Google 文件、Slack 討論或某位資深工程師腦中，AI 就看不到完整系統。把架構、設計、規格和決策帶回 Repository，這些內容才能被搜尋、版本控制，並和程式一起更新。

<figure class="course-visual course-visual--wide">
  <img src="/images/quick-start/agent-knowledge-limits.webp" width="1800" height="938" loading="lazy" decoding="async" alt="OpenAI 圖解 Codex 無法看見外部文件、Slack 訊息與隱性知識，必須把重要內容編碼進程式碼庫">
  <figcaption>重要知識要成為 Repository 內可發現、可版本控制的內容。圖片來源：OpenAI Harness Engineering。</figcaption>
</figure>

### 給 Agent 一張可以逐步展開的地圖

如果把所有規則都塞進一份大型 `AGENTS.md`，會占掉任務需要的 Context，也更難看出優先順序和內容是否過期。可以另外整理一層給人與 Agent 閱讀的工程知識：

```text
repository/
├── AGENTS.md
├── DESIGN.md
├── ARCHITECTURE.md
├── PLANS.md
└── docs/
    ├── product-specs/
    └── exec-plans/
```

<div class="feature-case-grid">
  <section><span>AGENTS.md</span><h3>導覽地圖</h3><p>只放專案慣例、常用指令、驗證方式，以及下一步該去哪裡找資料。</p></section>
  <section><span>DESIGN.md</span><h3>設計原則</h3><p>記錄網站色調、視覺風格、互動原則與不能破壞的設計限制。</p></section>
  <section><span>ARCHITECTURE.md</span><h3>系統架構</h3><p>說明模組邊界、依賴方向、核心流程與重要技術決策。</p></section>
  <section><span>PLANS.md ＋ docs/</span><h3>規格與執行紀錄</h3><p>保存 PRD、執行計畫、目前進度、決策日誌與已知技術債。</p></section>
</div>

Agent 先讀短而穩定的 `AGENTS.md`，再依任務決定是否打開設計、架構或計畫文件。這種做法稱為**漸進式揭露**：先給一張足以出發的地圖，需要時再展開下一層。

## 參考資料

- [Harness 工程：在以代理為核心的世界利用 Codex 推動工程效率｜OpenAI](https://openai.com/zh-Hant-HK/index/harness-engineering/)
- [The New Paradigm of SDLC in the Era of Claude & Codex｜NStarX](https://nstarxinc.com/blog/the-new-paradigm-of-sdlc-in-the-era-of-claude-codex/)

<p class="source-note">「Agentic Engineer」與三階段演化是本課的教學框架；OpenAI 文章著重工程師角色、Harness、Agent 可讀性與回饋迴圈，NStarX 文章則以 AI-assisted／AI-native SDLC 描述流程轉變。官方圖片保留原始內容；本文未沿用 NStarX 的預測性效益數字。</p>
