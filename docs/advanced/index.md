---
title: 進階能力學習路線
description: 依序學習規範、權限、可重複使用的方法、外部連線、能力包與背景排程，再依需求選修平行協作與強制執行規則。
aside: false
pageClass: advanced-path-index
---

<header class="advanced-path-hero">
  <span class="advanced-path-hero__eyebrow">ADVANCED COURSE</span>
  <h1>進階能力學習路線</h1>
  <p>完成快速上手後，下一步是判斷每項要求該由哪個功能處理。先弄清楚各自負責什麼，再把它們組合成可重複、可審查且安全的工作流程。</p>
  <p>核心路線從文字規範與權限邊界開始，再依序學習可重複使用的方法、外部連線、能力包和背景排程；多 agent 協作與強制執行規則則可依需求選修。</p>
</header>

<nav class="advanced-path-directory" aria-label="進階課程主題導覽">
  <a class="advanced-path-directory__card" href="./agents-md">
    <span class="advanced-path-directory__marker" aria-hidden="true">01—02</span>
    <span class="advanced-path-directory__body">
      <strong>規範與邊界</strong>
      <small>先說清楚長期規範，再建立執行權限與安全邊界。</small>
      <b>從 AGENTS.md 開始 <span aria-hidden="true">↗</span></b>
    </span>
  </a>
  <a class="advanced-path-directory__card is-featured" href="./skills">
    <img src="/images/course-paths/advanced.webp" width="780" height="1040" alt="" decoding="async">
    <span class="advanced-path-directory__marker" aria-hidden="true">03—05</span>
    <span class="advanced-path-directory__body">
      <strong>方法與連線</strong>
      <small>保存可重複使用的方法，連接即時資料，再組成完整能力包。</small>
      <b>前往 Skills <span aria-hidden="true">↗</span></b>
    </span>
  </a>
  <a class="advanced-path-directory__card" href="./automation">
    <span class="advanced-path-directory__marker" aria-hidden="true">06—08</span>
    <span class="advanced-path-directory__body">
      <strong>自動化與協作</strong>
      <small>把已驗證的流程交給排程，並依需求加入平行協作與強制檢查。</small>
      <b>前往 Scheduled tasks <span aria-hidden="true">↗</span></b>
    </span>
  </a>
</nav>

## 你會學到什麼

<section class="advanced-path-outcomes" aria-label="進階課程學習成果">
  <div class="advanced-path-outcomes__intro">
    <span>LEARNING OUTCOMES</span>
    <strong>從選對能力，到確認能力真的生效</strong>
    <p>完成這套進階課程後，你應能獨立判斷工具、規範與權限各自負責的範圍。</p>
  </div>
  <ol class="advanced-path-outcomes__list">
    <li><span>01</span>判斷一項要求該放在 Prompt、<code>AGENTS.md</code>、Config、Skill、MCP、Plugin、Scheduled task、Subagent 或 Hook。</li>
    <li><span>02</span>分清楚文字規範、技術權限，以及生命週期中需要強制執行的規則。</li>
    <li><span>03</span>把工作方法保存成可重複使用的 Skill，連接外部工具，再將這些能力安裝、分享或設為自動執行。</li>
    <li><span>04</span>為背景任務設定最小權限與人工審查點，並在選修單元中把相同原則用於平行任務。</li>
    <li><span>05</span>驗證每種能力確實生效，而不是只完成設定。</li>
  </ol>
</section>

## 先釐清每種能力的用途

| 要解決的問題 | 對應能力 | 主要用途 |
| --- | --- | --- |
| 這次要完成什麼？ | Prompt | 本次任務的目標、輸入與限制 |
| 這個專案應遵循哪些長期規範？ | `AGENTS.md` | 專案規範、實際驗證命令與完成條件 |
| Codex 可執行哪些操作？ | Config／Permissions | Sandbox、Approval、網路與功能設定 |
| 這類任務每次怎麼做？ | Skill | 可重複使用的工作流程與品質標準 |
| 如何取得即時資料或使用外部工具？ | MCP | 連接外部資料來源與可執行工具 |
| 如何安裝與分享整套擴充功能？ | Plugin | 由 Skills、連線設定與擴充元件組成的能力包 |
| 哪些任務要在何時自動執行？ | Scheduled task | 在指定時間或固定頻率執行背景任務 |
| 如何把工作交給多個 agent？ | Subagents | 拆分並平行處理任務，再由主 agent 彙整 |
| 哪些規則需要由系統強制執行？ | Hook | agent 生命週期中的強制檢查點 |

::: tip 從文字規範到自動執行
在 Prompt 與 `AGENTS.md` 寫清楚需求，並用 Config 設定權限邊界。流程穩定後可封裝成 Skill；需要即時資料就接上 MCP；要整套安裝或分享則使用 Plugin。確認一般任務流程可正常運作後，再交給排程。Subagents 與 Hooks 是選修內容。
:::

## 選擇學習深度

<section class="advanced-path-route-choices" aria-label="核心與選修學習路線">
  <article class="advanced-path-route-card">
    <div class="advanced-path-route-card__copy">
      <span>CORE PATH · 6 CHAPTERS</span>
      <h3>先完成日常工作需要的核心路線</h3>
      <p>從長期規範與權限邊界開始，逐步建立可重複、可連線並能安全排程的工作流程。</p>
      <a href="#core-path">查看核心六章 <span aria-hidden="true">↓</span></a>
    </div>
    <ol class="advanced-path-route-card__visual" aria-label="核心路線章節">
      <li><span>01</span><small>AGENTS</small></li>
      <li><span>02</span><small>權限</small></li>
      <li><span>03</span><small>Skills</small></li>
      <li><span>04</span><small>MCP</small></li>
      <li><span>05</span><small>Plugins</small></li>
      <li><span>06</span><small>排程</small></li>
    </ol>
  </article>
  <article class="advanced-path-route-card is-elective">
    <div class="advanced-path-route-card__copy">
      <span>ELECTIVES · 2 CHAPTERS</span>
      <h3>需要協作或強制檢查時再選修</h3>
      <p>將可拆分的工作交給多個 agent，或在 agent 生命週期中加入不可略過的系統檢查。</p>
      <a href="#elective-path">查看兩章選修 <span aria-hidden="true">↓</span></a>
    </div>
    <ol class="advanced-path-route-card__visual" aria-label="選修路線章節">
      <li><span>07</span><small>Subagents</small></li>
      <li><span>08</span><small>Hooks</small></li>
    </ol>
  </article>
</section>

## 核心路線｜時間有限時，先完成這六章 {#core-path}

<div class="advanced-path-chapter-list" aria-label="核心路線章節">
  <a class="advanced-path-chapter" href="./agents-md">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>CORE</small><strong>01</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">規範 · CHAPTER 01</span>
      <h3><code>AGENTS.md</code>：先說清楚長期規範</h3>
      <span><code>AGENTS.md</code> 用來記錄專案用途、實際可用的驗證命令、變更邊界和完成條件，讓每次任務都有一致的依據。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./permissions">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>CORE</small><strong>02</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">安全 · CHAPTER 02</span>
      <h3>Config、權限與沙盒：建立執行邊界</h3>
      <span>Config／Permissions 用來區分「應該怎麼做」和「技術上允許做什麼」。安裝工具、連接資料或執行背景任務前，先透過 Sandbox、Approval 和管理政策設定安全邊界。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./skills">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>CORE</small><strong>03</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">方法 · CHAPTER 03</span>
      <h3>Skills：保存可重複使用的工作方法</h3>
      <span>內容涵蓋在 App 中選用現有 Skill，以及 progressive disclosure、<code>SKILL.md</code>、儲存範圍與觸發測試。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./mcp-tools">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>CORE</small><strong>04</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">連線 · CHAPTER 04</span>
      <h3>MCP：連接即時資料與外部工具</h3>
      <span>內容涵蓋工作方法與外部連線的差別，以及 MCP transport、Authentication、tool 白名單和各項工具的 Approval。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./plugins">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>CORE</small><strong>05</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">能力包 · CHAPTER 05</span>
      <h3>Plugins：安裝與分享完整能力包</h3>
      <span>Plugin 可將方法、Apps、MCP servers 和其他擴充元件組成完整能力包，方便安裝、設定連線與分享。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter" href="./automation">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>CORE</small><strong>06</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">排程 · CHAPTER 06</span>
      <h3>Scheduled tasks：定期執行已驗證的任務</h3>
      <span>一般 task 的流程驗證完成後，才交由背景排程執行。內容涵蓋 standalone task 與延續既有 task 的差別，以及無變更、失敗與停止條件的設定方式。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
</div>

前六章涵蓋日常工作需要的核心路線；後兩章可依時間與需求選修。

## 選修進階｜協作與強制執行 {#elective-path}

<div class="advanced-path-chapter-list" aria-label="選修進階章節">
  <a class="advanced-path-chapter is-elective" href="./worktrees">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>OPTION</small><strong>07</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">協作 · CHAPTER 07</span>
      <h3>Subagents：拆分、平行處理與彙整</h3>
      <span>Subagents 適合用於平行探索或多角色審查，內容包括工作方式、threads 和客製化 Agent。小型任務或前後相依很強的任務，通常不必拆成多個 agent。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
  <a class="advanced-path-chapter is-elective" href="./hooks">
    <span class="advanced-path-chapter__index" aria-hidden="true"><small>OPTION</small><strong>08</strong></span>
    <span class="advanced-path-chapter__content">
      <span class="advanced-path-chapter__meta">強制執行 · CHAPTER 08</span>
      <h3>Hooks：強制執行關鍵規則</h3>
      <span>Hooks 會執行命令，因此應在規範、權限與驗證方式都釐清後再使用。少數關鍵政策可交由 <code>PreToolUse</code> 或 <code>Stop</code> 強制執行。</span>
    </span>
    <span class="advanced-path-chapter__arrow" aria-hidden="true">↗</span>
  </a>
</div>
