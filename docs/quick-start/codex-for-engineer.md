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

<p class="lesson-lead">工程師與 AI 的關係，已從「問答案」到「交辦任務」。<br>核心概念為：<strong>人類掌控方向。智能代理負責執行。</strong></p>

## 從 Ctrl C、V 到直接交辦任務

這三個階段的差別，不只是模型越來越聰明，而是 **AI 接到的工作單位越來越完整**。

<EngineerEvolution />

ChatGPT 在工作區外回答問題，工程師再把答案搬回 IDE；Cursor 把補全帶進編輯器，但仍由人一步一步推進。到了 Codex，互動單位從「下一行程式」變成「一個可驗收的任務」：探索、修改與測試由 Agent 執行，工程師檢查 Diff 與結果。

<div class="takeaway">
  <span>THE SHIFT</span>
  <strong>以前是人操作工具、AI 提供片段；現在是人定義方向、Agent 執行迴圈。</strong>
  <p>Just Ask Codex 的前提，是說清楚工程意圖與完成條件。</p>
</div>

## 重新定義工程師角色：我們要做什麼？

NStarX 將這個轉變區分為 **AI-assisted** 與 **AI-native**：前者替既有流程加上補全，後者重新設計人與 Agent 的分工。當 Codex 接手實作，工程師的價值不再只看寫了多少程式，而是能不能建立一個讓 Agent 做對事情的系統。

<div class="story-contrast">
  <section><span>HUMAN｜掌握方向</span><h3>意圖、邊界與判斷</h3><p>決定為什麼要做、哪些條件不能破壞，以及什麼才算完成。</p><b>負責：Intent、Constraints、Acceptance</b></section>
  <section><span>AGENT｜完成執行</span><h3>探索、修改與驗證</h3><p>讀取程式碼與規範，實作、測試、Review，再帶著證據回報。</p><b>負責：Explore、Build、Test、Report</b></section>
</div>

工程師的工作往更高的抽象層移動：定義系統、拆解目標、建立工具與檢查結果。大型任務先拆成設計、實作、Review 與測試；Agent 卡住時，也不只是要求它重試，而是追問：**它少了哪一項能力、資訊或驗證方式？**

## 1｜提升程式與應用的可讀性

給人看的程式通常強調命名、結構與文件；給 Agent 工作的系統還要再多一步：讓程式的狀態、操作方式與驗證結果都能被讀取。

<div class="use-case-grid">
  <section><span>01｜程式可導覽</span><h3>結構與邊界清楚</h3><p>模組、依賴方向與架構規則可以從程式碼庫直接理解，而不是依靠口頭默契。</p></section>
  <section><span>02｜應用可觀察</span><h3>狀態能被讀取</h3><p>讓 Agent 能使用瀏覽器、DOM、截圖、日誌與指標，直接看見實際行為。</p></section>
  <section><span>03｜結果可驗證</span><h3>檢查可以重跑</h3><p>把測試、Lint 與 CI 接回任務，讓 Agent 能重現問題並證明修正成立。</p></section>
</div>

例如每個 Git worktree 都能啟動獨立的 App，Codex 就能操作隔離的應用實例，透過 DOM 快照、截圖與日誌重現 UI 問題，再執行測試確認修正。重點不是多裝一個工具，而是讓 Agent 能自己完成「理解 → 操作 → 驗證」。

## 2｜將程式碼庫作為唯一可信來源

要讓 AI 理解系統，重要知識就不能只存在 Google 文件、Slack 討論或某位資深工程師腦中。架構、設計、規格與決策都應回到 Repository，成為可搜尋、可版本控制，也能和實際程式一起更新的內容。

<figure class="course-visual course-visual--wide">
  <img src="/images/quick-start/agent-knowledge-limits.webp" width="1800" height="938" loading="lazy" decoding="async" alt="OpenAI 圖解 Codex 無法看見外部文件、Slack 訊息與隱性知識，必須把重要內容編碼進程式碼庫">
  <figcaption>重要知識要成為 Repository 內可發現、可版本控制的內容。圖片來源：OpenAI Harness Engineering。</figcaption>
</figure>

### 給 Agent 一張可以逐步展開的地圖

把所有規則塞進大型 `AGENTS.md`，會擠壓任務真正需要的上下文，也讓優先順序與更新狀態更難維護。現代程式碼庫會多出一層專門給人與 Agent 閱讀的工程知識：

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

Agent 先從短而穩定的 `AGENTS.md` 進入，再依任務決定是否讀取設計、架構或計畫。這就是**漸進式揭露**：先給足以開始的地圖，需要時才展開下一層，而不是一開始就塞進所有 Context。

## 參考資料

- [Harness 工程：在以代理為核心的世界利用 Codex 推動工程效率｜OpenAI](https://openai.com/zh-Hant-HK/index/harness-engineering/)
- [The New Paradigm of SDLC in the Era of Claude & Codex｜NStarX](https://nstarxinc.com/blog/the-new-paradigm-of-sdlc-in-the-era-of-claude-codex/)

<p class="source-note">「Agentic Engineer」與三階段演化是本課的教學框架；OpenAI 文章著重工程師角色、Harness、Agent 可讀性與回饋迴圈，NStarX 文章則以 AI-assisted／AI-native SDLC 描述流程轉變。官方圖片保留原始內容；本文未沿用 NStarX 的預測性效益數字。</p>
