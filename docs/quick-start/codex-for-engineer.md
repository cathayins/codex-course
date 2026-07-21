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

## 重新定義工程師角色：我們要做什麼？

NStarX 把這個轉變分成 **AI-assisted** 和 **AI-native**：前者在既有流程裡加入補全，後者重新安排人與 Agent 的分工。當 Codex 接手實作，工程師會把更多心力放在建立一套讓 Agent 做對事的工作系統。

<div class="story-contrast">
  <section><span>HUMAN｜掌握方向</span><h3>意圖、邊界與判斷</h3><p>決定為什麼要做、哪些條件不能破壞，以及什麼才算完成。</p><b>負責：Intent、Constraints、Acceptance</b></section>
  <section><span>AGENT｜完成執行</span><h3>探索、修改與驗證</h3><p>讀取程式碼與規範，實作、測試、Review，再帶著證據回報。</p><b>負責：Explore、Build、Test、Report</b></section>
</div>

工程師開始把更多時間放在定義系統、拆解目標、準備工具和檢查結果。遇到大型任務，先拆成設計、實作、Review 與測試；Agent 卡住時，別只叫它再試一次，先問：**它缺了哪項能力、資訊或驗證方式？**

## 1｜讓 Agent 讀得懂程式與系統

讓人讀得懂的程式，需要清楚的命名、結構和文件。要讓 Agent 也能工作，還得讓它讀得到系統狀態、操作方式和驗證結果。

<div class="use-case-grid">
  <section><span>01｜程式可導覽</span><h3>結構與邊界清楚</h3><p>模組、依賴方向與架構規則可以從程式碼庫直接理解，而不是依靠口頭默契。</p></section>
  <section><span>02｜應用可觀察</span><h3>狀態能被讀取</h3><p>讓 Agent 能使用瀏覽器、DOM、截圖、日誌與指標，直接看見實際行為。</p></section>
  <section><span>03｜結果可驗證</span><h3>檢查可以重跑</h3><p>把測試、Lint 與 CI 接回任務，讓 Agent 能重現問題並證明修正成立。</p></section>
</div>

例如，每個 Git worktree 都能啟動獨立的 App，Codex 就可以操作彼此隔離的應用實例，用 DOM 快照、截圖和日誌重現 UI 問題，再執行測試確認修正。工具本身不是目的。Agent 最後要能跑完「理解 → 操作 → 驗證」這個迴圈。

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
