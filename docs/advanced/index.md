---
title: 進階能力學習路線
description: 從 AGENTS.md、權限、Skills、MCP、Plugins 到 Scheduled tasks，學會建立可重複、可審查且安全的 Codex 工作流程；另提供 Subagents 與 Hooks 選修內容。
aside: false
pageClass: advanced-path-index
---

<header class="advanced-path-hero">
  <span class="advanced-path-hero__eyebrow">ADVANCED COURSE</span>
  <h1>進階能力學習路線</h1>
  <p>進階課程的重點，是判斷不同要求該交給哪項功能處理。理解各功能的用途後，就能組合出可重複、可審查且安全的工作流程。</p>
  <p>核心路線涵蓋文字規範、權限、Skills、MCP、Plugins 與背景排程；Subagents 與 Hooks 則是選修內容。</p>
</header>

<nav class="advanced-path-directory" aria-label="進階課程主題導覽">
  <a class="advanced-path-directory__card has-image" href="./skills">
    <img src="/images/course-paths/skills-hover.webp" width="780" height="1040" alt="" decoding="async">
    <span class="advanced-path-directory__marker" aria-hidden="true">03</span>
    <span class="advanced-path-directory__body">
      <strong>Skills</strong>
      <small>把常用的工作流程保存為 Skill，讓同類任務依照相同步驟與品質標準執行。</small>
      <b>前往 Skills <span aria-hidden="true">↗</span></b>
    </span>
  </a>
  <a class="advanced-path-directory__card has-image" href="./plugins">
    <img src="/images/course-paths/plugins-hover.webp" width="780" height="1040" alt="" decoding="async">
    <span class="advanced-path-directory__marker" aria-hidden="true">05</span>
    <span class="advanced-path-directory__body">
      <strong>Plugins</strong>
      <small>將 Skills、連線設定與擴充元件組成 Plugin，便於安裝、設定與分享。</small>
      <b>前往 Plugins <span aria-hidden="true">↗</span></b>
    </span>
  </a>
  <a class="advanced-path-directory__card has-image" href="./automation">
    <img src="/images/course-paths/automation-hover.webp" width="780" height="1040" alt="" decoding="async">
    <span class="advanced-path-directory__marker" aria-hidden="true">06—08</span>
    <span class="advanced-path-directory__body">
      <strong>自動化與協作</strong>
      <small>替已驗證的流程設定排程；需要平行處理或強制檢查時，再加入對應功能。</small>
      <b>前往 Scheduled tasks <span aria-hidden="true">↗</span></b>
    </span>
  </a>
</nav>

## 你會學到什麼

<section class="advanced-path-outcomes" aria-label="進階課程學習成果">
  <div class="advanced-path-outcomes__intro">
    <span>LEARNING OUTCOMES</span>
    <strong>選擇合適的功能，並確認設定已生效</strong>
    <p>完成這套進階課程後，你可以獨立判斷工具、規範與權限的適用範圍。</p>
  </div>
  <ol class="advanced-path-outcomes__list">
    <li><span class="advanced-path-outcomes__index">01</span><span>判斷每項要求應由 Prompt、<code>AGENTS.md</code>、Config、Skill、MCP、Plugin、Scheduled task、Subagent 或 Hook 中的哪一項處理。</span></li>
    <li><span class="advanced-path-outcomes__index">02</span><span>分清楚文字規範、技術權限，以及生命週期中需要強制執行的規則。</span></li>
    <li><span class="advanced-path-outcomes__index">03</span><span>把工作方法保存為 Skill，透過 MCP 連接外部工具，再用 Plugin 安裝或分享；Scheduled task 則用來自動執行已驗證的流程。</span></li>
    <li><span class="advanced-path-outcomes__index">04</span><span>為背景任務和平行任務設定最小權限與人工審查點。</span></li>
    <li><span class="advanced-path-outcomes__index">05</span><span>完成設定後，進一步確認每項功能是否確實生效。</span></li>
  </ol>
</section>

## 各項能力與適用情境

| 要處理的問題 | 對應能力 | 主要用途 |
| --- | --- | --- |
| 這次任務要完成什麼？ | Prompt | 定義任務的目標、輸入與限制 |
| 這個專案有哪些長期規範？ | `AGENTS.md` | 記錄專案規範、驗證命令與完成條件 |
| Codex 可以執行哪些操作？ | Config／Permissions | 設定 Sandbox、Approval、網路存取與其他功能 |
| 這類任務要怎麼固定執行？ | Skill | 保存可重複使用的工作流程與品質標準 |
| 需要即時資料或外部工具時怎麼辦？ | MCP | 連接外部資料來源並使用外部工具 |
| 要怎麼安裝和分享一整套擴充功能？ | Plugin | 將 Skills、連線設定與擴充元件包裝成可安裝、可分享的 Plugin |
| 哪些任務要依排程自動執行？ | Scheduled task | 依指定時間或頻率執行背景任務 |
| 如何讓多個 agent 平行處理工作？ | Subagents | 拆分任務、平行處理，再彙整結果 |
| 哪些規則必須由系統執行？ | Hook | 在 agent 生命週期中執行強制檢查 |

## 選擇核心或選修路線

<section class="advanced-path-route-choices" aria-label="核心與選修學習路線">
  <article class="advanced-path-route-card">
    <div class="advanced-path-route-card__copy">
      <span>CORE PATH · 6 CHAPTERS</span>
      <h3>日常工作所需的六章核心內容</h3>
      <p>六章依序介紹長期規範、權限邊界、Skills、MCP、Plugins 與排程。</p>
      <a href="#core-path">查看核心六章 <span aria-hidden="true">↓</span></a>
    </div>
  </article>
  <article class="advanced-path-route-card is-elective">
    <div class="advanced-path-route-card__copy">
      <span>ELECTIVES · 2 CHAPTERS</span>
      <h3>選修內容：協作與強制檢查</h3>
      <p>選修單元聚焦多個 agent 的平行處理，以及 agent 生命週期中的系統檢查。</p>
      <a href="#elective-path">查看兩章選修 <span aria-hidden="true">↓</span></a>
    </div>
  </article>
</section>

## 核心路線｜六個基礎章節 {#core-path}

<div class="advanced-path-chapter-list" aria-label="核心路線章節">
  <a class="advanced-path-chapter" href="./agents-md">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-01-agents.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/01-document.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">規範 · CHAPTER 01</span>
      <h3><code>AGENTS.md</code>：定義專案的長期規範</h3>
      <span><code>AGENTS.md</code> 記錄專案用途、可用的驗證命令、變更邊界與完成條件，作為每次任務的共同依據。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./permissions">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-02-permissions.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/02-shield-check.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">安全 · CHAPTER 02</span>
      <h3>Config、權限與沙盒：建立執行邊界</h3>
      <span>本章區分「任務應如何執行」與「Codex 技術上可執行哪些操作」，並說明 Sandbox、Approval 和管理政策如何限制工具安裝、資料連線與背景任務。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./skills">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-03-skills.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/03-route.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">方法 · CHAPTER 03</span>
      <h3>Skills：把工作方法做成可重複使用的流程</h3>
      <span>本章介紹如何在 App 中選用 Skill，以及 Skill 的 progressive disclosure、<code>SKILL.md</code>、儲存範圍與觸發測試。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./mcp-tools">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-04-mcp.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/04-link.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">連線 · CHAPTER 04</span>
      <h3>MCP：連接即時資料與外部工具</h3>
      <span>本章聚焦 Skill 與 MCP 的差別、MCP transport、Authentication、tool 白名單，以及每項工具的 Approval 設定。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./plugins">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-05-plugins.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/05-package.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">能力包 · CHAPTER 05</span>
      <h3>Plugins：安裝與分享整套擴充功能</h3>
      <span>Plugin 可將 Skills、Apps、MCP servers 與其他擴充元件組合在一起，便於安裝、設定連線及分享。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./automation">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-06-automation.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/06-calendar.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">排程 · CHAPTER 06</span>
      <h3>Scheduled tasks：依排程執行已驗證的任務</h3>
      <span>一般 task 先完成流程驗證，再交由背景排程執行；本章比較 standalone task 與延續既有 task 的差異，也說明無變更、失敗與停止條件的設定方式。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
</div>

## 選修進階｜協作與強制執行 {#elective-path}

<div class="advanced-path-chapter-list" aria-label="選修進階章節">
  <a class="advanced-path-chapter is-elective" href="./worktrees">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-07-subagents.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/07-users.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">協作 · CHAPTER 07</span>
      <h3>Subagents：平行處理任務並彙整結果</h3>
      <span>Subagents、threads 與客製化 Agent 可用於平行探索或多角色審查；小型或前後高度相依的任務，通常不需要拆分。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter is-elective" href="./hooks">
    <span class="advanced-path-chapter__index" aria-hidden="true"><img class="advanced-path-chapter__image" src="/images/course-paths/chapters/chapter-08-hooks.webp" width="720" height="432" alt="" loading="lazy" decoding="async"><img class="advanced-path-chapter__icon" src="/images/course-paths/icons/08-checkpoint.svg" width="40" height="40" alt=""></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">強制執行 · CHAPTER 08</span>
      <h3>Hooks：強制執行關鍵規則</h3>
      <span>Hooks 會直接執行命令，使用前要先確認規範、權限與驗證方式；本章說明如何在 <code>PreToolUse</code> 或 <code>Stop</code> 階段執行必要的政策檢查。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
</div>
