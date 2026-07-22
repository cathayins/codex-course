---
title: MCP 與外部工具
description: 認識 MCP 的角色與能力、外部工具的連線方式，以及白名單、Authentication 與 Approval 的風險控管。
outline: [2, 3]
pageClass: advanced-code-wrap
---

# MCP 與外部工具

Codex 可以讀取目前的 Repository，但套件的最新文件、Figma 設計稿、GitHub issue 或 Sentry 紀錄通常不在本機檔案裡。若沒有連線方式，模型只能請你貼上資料，或依賴可能已經過時的記憶。

<strong>Model Context Protocol（MCP）</strong> 是一套讓 AI 應用連接外部資料與工具的開放標準。MCP 就像 **AI 應用的 USB-C**：AI 應用與外部系統各自遵守同一套介面，不必為每一種組合重新設計連線方式。

本章延續 [Config、權限與沙盒](/advanced/permissions) 設定的技術邊界，以及 [Skills](/advanced/skills) 保存的工作方法，進一步連接 workspace 之外的即時 context 與 tools。

<section class="lesson-goals" aria-labelledby="mcp-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="mcp-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>說明 MCP 解決什麼問題，辨認 Host、Client、Server 與三種核心能力，並用最小權限完成一次 read-only 文件查核。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>理解 MCP 的定位</strong><span>分辨 MCP 與模型、資料庫、自動工作流程的差異。</span></article>
    <article><strong>讀懂 Server 能力</strong><span>分辨 Tools、Resources、Prompts 的用途與控制方。</span></article>
    <article><strong>完成連線與驗證</strong><span>能透過 App 或 CLI 加入 Server，並確認 Server 與 tools 是否可見。</span></article>
    <article><strong>控制外部風險</strong><span>能用 Authentication、白名單與 Approval 區分 read 和 write。</span></article>
  </div>
</section>

<nav class="lesson-flow mcp-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 認識 MCP</span>
  <span><b>02</b> 讀懂 Server</span>
  <span><b>03</b> 選擇連線方式</span>
  <span><b>04</b> 完成查核案例</span>
  <span><b>05</b> 控制權限風險</span>
</nav>

## 1｜MCP 解決的問題

沒有共同協議時，每個 AI 應用都要分別整合每一個外部系統。假設有 3 個 AI 應用與 5 個工具，最多會出現 15 組不同的接法；API 格式、認證、錯誤處理與更新方式都可能不同。

MCP 在兩邊之間加入共同介面：AI 應用實作 MCP Client，資料或工具提供者實作 MCP Server。整合工作因此從 **N × M 組專用連線**，減少為 **N + M 個標準介面**。

<figure class="mcp-overview-figure" aria-labelledby="mcp-overview-title">
  <img src="/images/mcp/mcp-overview.png" alt="MCP 位於 AI 應用與資料來源、開發工具及生產力工具之間，透過標準協議進行雙向資料交換。">
  <figcaption id="mcp-overview-title">
    <strong>MCP 讓不同 AI 應用以一致的方式連接外部資料與工具。</strong>
    <span>圖片來源：<a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noreferrer">Model Context Protocol 官方介紹</a></span>
  </figcaption>
</figure>

<div class="mcp-integration-compare" role="group" aria-label="傳統整合與 MCP 整合比較">
  <article class="is-before">
    <span>BEFORE · N × M</span>
    <strong>每一組應用與工具都要個別串接</strong>
    <div class="mcp-integration-compare__diagram is-before-flow" role="img" aria-label="Codex 與 Claude Code 都必須分別建立 Docs、Figma、GitHub 三組專用整合">
      <div class="mcp-integration-compare__node">
        <b>Codex</b>
        <span>需要分別建立</span>
        <em>Docs、Figma、GitHub 三組整合</em>
      </div>
      <div class="mcp-integration-compare__node">
        <b>Claude Code</b>
        <span>也要重新建立</span>
        <em>Docs、Figma、GitHub 三組整合</em>
      </div>
    </div>
    <p>新增一個應用或工具，通常還要額外撰寫串接程式碼，並重新設計認證與錯誤處理。</p>
  </article>
  <article class="is-after">
    <span>AFTER · N + M</span>
    <strong>雙方依共同協議串接</strong>
    <div class="mcp-integration-compare__diagram is-after-flow" role="img" aria-label="Codex 與 Claude Code 透過同一套 MCP 共同協議連接 Docs、Figma、GitHub Servers">
      <div class="mcp-integration-compare__node">
        <b>Codex、Claude Code</b>
        <span>只要實作一套共同介面</span>
      </div>
      <i aria-hidden="true">↓</i>
      <mark>MCP 共同協議</mark>
      <i aria-hidden="true">↓</i>
      <div class="mcp-integration-compare__node">
        <b>外部系統</b>
        <span>Docs、Figma、GitHub Servers</span>
      </div>
    </div>
    <p>共同介面可以減少重複整合，但帳號授權、資料範圍與工具風險仍須分別管理。</p>
  </article>
</div>

::: tip 標準介面不等於自動信任
MCP 統一的是「如何描述、發現與呼叫能力」，不會替你判斷 Server 是否可信，也不會自動授予外部帳號或 write 權限。
:::

## 2｜三個角色如何合作

MCP 採用 client-server 架構，包含三個主要角色：**Host 管理整體體驗，Client 維持協議連線，Server 提供外部能力**。

<figure class="mcp-role-map" aria-labelledby="mcp-role-map-title">
  <figcaption>
    <span class="lesson-eyebrow">HOST → CLIENT → SERVER</span>
    <strong id="mcp-role-map-title">一次連線中的三個角色</strong>
    <small>Client 通常位於 Host 內部；Host 連接多個 Server 時，會分別維持對應的 Client 連線。</small>
  </figcaption>
  <div class="mcp-role-map__flow">
    <article class="is-host">
      <b>01 · MCP HOST</b>
      <strong>使用者操作的 AI 應用</strong>
      <p>例如 Codex、ChatGPT Desktop 或 IDE；Host 負責管理對話、模型、可用能力與使用者確認。</p>
      <code>你看得見的介面</code>
    </article>
    <span class="mcp-role-map__arrow" aria-hidden="true">→</span>
    <article class="is-client">
      <b>02 · MCP CLIENT</b>
      <strong>Host 內的連線元件</strong>
      <p>和單一 Server 建立連線、確認能力，並在 Host 與 Server 之間傳遞訊息。</p>
      <code>負責協議溝通</code>
    </article>
    <span class="mcp-role-map__arrow" aria-hidden="true">→</span>
    <article class="is-server">
      <b>03 · MCP SERVER</b>
      <strong>資料與工具提供者</strong>
      <p>透過標準介面，將文件、資料庫、設計工具或開發平台的能力提供給 Client。</p>
      <code>可以在本機或遠端</code>
    </article>
  </div>
</figure>

### Server 可以提供什麼

MCP 規格把 Server 的核心能力分成三種。三者的差異在於提供的內容及控制方：Tools 提供動作、Resources 提供資料，Prompts 提供預先定義的互動模板。

<section class="mcp-primitive-grid" aria-label="MCP Server 三種核心能力">
  <article class="is-tools">
    <header><span>MODEL-CONTROLLED</span><strong>Tools</strong></header>
    <p>具有明確輸入與輸出的可執行功能；模型會依任務需要決定是否呼叫。</p>
    <ul>
      <li>搜尋文件、查詢資料庫</li>
      <li>建立 issue、傳送訊息</li>
      <li>讀取或修改外部物件</li>
    </ul>
    <small>高影響動作即使可以執行，仍需 Approval。</small>
  </article>
  <article class="is-resources">
    <header><span>APPLICATION-CONTROLLED</span><strong>Resources</strong></header>
    <p>供應用程式載入的結構化 context，通常以 URI 識別，用來提供資料而非執行動作。</p>
    <ul>
      <li>檔案內容與資料庫紀錄</li>
      <li>API 文件或知識庫頁面</li>
      <li>專案 schema 與唯讀資訊</li>
    </ul>
    <small>由 Host 決定何時將哪些內容加入模型 context。</small>
  </article>
  <article class="is-prompts">
    <header><span>USER-CONTROLLED</span><strong>Prompts</strong></header>
    <p>Server 提供可重用的提示模板；使用者選擇模板並填入參數後，即可啟動對應的互動流程。</p>
    <ul>
      <li>程式碼審查模板</li>
      <li>會議摘要流程</li>
      <li>結合特定工具的工作入口</li>
    </ul>
    <small>由使用者選用，功能與 Codex 的 Skill 不同。</small>
  </article>
</section>

::: warning Host 不一定呈現所有 MCP 規格能力
MCP 規格定義 Tools、Resources 與 Prompts；Host、版本與 Workspace 政策不同，介面中呈現的能力也會不同。本章的實作練習以 Codex 可發現與呼叫的 **tools** 為主，Resources 與 Prompts 僅說明基本概念。
:::

## 3｜Skill 與 MCP 的分工

**Skill 保存工作方法，MCP 連接外部資料與工具。**

<section class="mcp-surface-grid is-compact" aria-label="Skill 與 MCP 的責任比較">
  <article><span>REUSABLE METHOD</span><strong>Skill</strong><p>保存可在同類任務中反覆套用的步驟、格式與品質標準。</p><small>例：每次查核都列出來源與未知事項</small></article>
  <article class="is-mcp"><span>LIVE CONNECTION</span><strong>MCP</strong><p>提供即時外部 context，以及能以結構化方式呼叫的 tools。</p><small>例：搜尋目前文件或讀取 Figma</small></article>
</section>

例如，「查核目前套件文件並列出版本假設」可寫成 Skill；文件型 MCP Server 負責搜尋目前文件，查核對象與 read 限制則由 Prompt 指定。下一章將說明如何把 Skill 與 MCP 組成可安裝的 Plugin。

### 何時值得連接 MCP

| 適合連接 | 不必連接 |
| --- | --- |
| 需要目前版本的官方文件或內部知識庫 | 資料已在目前 workspace，使用檔案搜尋即可完成 |
| 需要讀取 Figma、GitHub、Sentry 等專用系統 | 只是一次性工作規則，直接寫在 Prompt 更清楚 |
| 需要結構化 tool call，而不是模擬點擊網頁 | 沒有取得外部服務授權，或資料範圍仍不明 |
| 需要追蹤工具的輸入、輸出與 Authentication 紀錄 | 只要固定流程，不需要任何外部即時資料 |

### MCP 的三種應用案例

<section class="mcp-case-grid" aria-label="文件、Figma 與 GitHub 的 MCP 案例">
  <article class="is-docs">
    <span>CASE 01 · DOCUMENTATION</span>
    <strong>查核套件目前的用法</strong>
    <dl><div><dt>MCP 提供</dt><dd>搜尋、讀取目前文件</dd></div><div><dt>Codex 負責</dt><dd>比對 Repository 並整理結論</dd></div></dl>
  </article>
  <article class="is-figma">
    <span>CASE 02 · FIGMA</span>
    <strong>依照設計稿實作</strong>
    <dl><div><dt>MCP 提供</dt><dd>節點、樣式、元件與畫面 context</dd></div><div><dt>Codex 負責</dt><dd>理解設計並修改本機程式碼</dd></div></dl>
  </article>
  <article class="is-github">
    <span>CASE 03 · GITHUB</span>
    <strong>理解 issue 與 PR 狀態</strong>
    <dl><div><dt>MCP 提供</dt><dd>目前 issue、PR、review context</dd></div><div><dt>Codex 負責</dt><dd>分類、摘要，並提出下一步建議</dd></div></dl>
  </article>
</section>

這三個案例都使用外部 context，但風險不同：讀文件通常是 read-only；修改 Figma、在 GitHub 留言或合併 PR 都會改變外部狀態，應使用更嚴格的工具白名單與 Approval。

## 4｜兩種常見連線方式

Transport 決定 Client 與 Server 如何交換訊息，可依 Server 的執行位置選擇：本機命令通常使用 STDIO；部署在外部服務的 Server 通常使用 Streamable HTTP。

<section class="mcp-transport-grid" aria-label="STDIO 與 Streamable HTTP 比較">
  <article class="is-stdio">
    <header><span>LOCAL PROCESS</span><strong>STDIO Server</strong></header>
    <p>Codex 以本機命令啟動子程序，透過標準輸入與輸出交換訊息。</p>
    <dl><div><dt>設定入口</dt><dd><code>command</code>、<code>args</code></dd></div><div><dt>常見用途</dt><dd>本機工具、npm 套件、檔案系統</dd></div><div><dt>先檢查</dt><dd>套件來源、命令內容、環境變數與可存取檔案</dd></div></dl>
  </article>
  <article class="is-http">
    <header><span>REMOTE SERVICE</span><strong>Streamable HTTP Server</strong></header>
    <p>Codex 透過 URL 連線，服務可使用 HTTP 認證並支援串流回應。</p>
    <dl><div><dt>設定入口</dt><dd><code>url</code></dd></div><div><dt>常見用途</dt><dd>團隊共用服務、SaaS 與遠端資料</dd></div><div><dt>先檢查</dt><dd>網域、OAuth／Token、帳號與資料範圍</dd></div></dl>
  </article>
</section>

## 5｜從 App 連線並確認狀態

Codex App、CLI 與 IDE extension 共用 MCP 設定。第一次連線可使用 App，確認 Server 的 transport、啟用狀態與 Authentication 後，再調整細部設定。

1. 開啟 **Settings → MCP servers**。
2. 選擇 **Add server**。
3. 設定名稱，選擇 **STDIO** 或 **Streamable HTTP**，填入 command 或 URL。
4. 儲存後選擇 **Restart**。
5. 需要 OAuth 時執行 **Authenticate**。
6. 在輸入區使用 `/mcp`，確認 Server 與 tools 可見。

<MediaTabs
  class="mcp-media-tabs"
  aria-label="新增 MCP Server 的操作畫面"
  :items="[
    {
      label: 'MCP 清單',
      title: '從 MCP 清單新增 Server',
      description: '在 Plugins 頁開啟 MCPs 分頁，確認目前已設定的 Server 與啟用狀態，再按 Add server。',
      image: '/images/mcp/mcp_list.png',
      alt: 'Codex Desktop App 的 MCP 清單，顯示既有 Server、啟用開關與 Add server 按鈕',
      fit: 'compact'
    },
    {
      label: 'STDIO',
      title: '用 STDIO 連接本機命令',
      description: '選擇 STDIO 後填入 Server 名稱、啟動命令與 arguments；需要時再設定環境變數與工作目錄。這種方式適合需要由 Codex 在本機啟動的工具。',
      image: '/images/mcp/add_mcp_stdio.png',
      alt: 'Codex Desktop App 新增 MCP Server 的 STDIO 設定畫面，顯示命令、arguments、環境變數與工作目錄欄位',
      fit: 'tall'
    },
    {
      label: 'Streamable HTTP',
      title: '用 Streamable HTTP 連接遠端服務',
      description: '選擇 Streamable HTTP 後填入遠端 URL；若服務需要驗證，請用環境變數提供 bearer token 或 headers，不要直接貼入 token。',
      image: '/images/mcp/add_mcp_stream.png',
      alt: 'Codex Desktop App 新增 MCP Server 的 Streamable HTTP 設定畫面，顯示 URL、Bearer token 環境變數與 headers 欄位',
      fit: 'tall'
    }
  ]"
/>

<p class="mcp-media-caption">實際介面名稱可能隨版本調整，請確認畫面中的 MCP 清單、transport、啟用狀態與 Authentication。</p>

::: tip 網頁課程與本機 Codex 的差異
使用 ChatGPT 網頁版的 Work mode 時，請從 Plugins 瀏覽可用工具；本節的本機 MCP 設定與 `/mcp` 指令僅適用於 Codex App、CLI 或 IDE extension。
:::

## 6｜用 `config.toml` 做細部控制

MCP 可設定在使用者的 `~/.codex/config.toml`，或受信任的 Repository 中的 `.codex/config.toml`。第一次連線可透過 App 完成；`config.toml` 則可明確控制啟用狀態、timeout、工具清單與 Approval。

以文件型 STDIO Server 為例：

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
default_tools_approval_mode = "prompt"
startup_timeout_sec = 20
tool_timeout_sec = 45
enabled = true
```

這項設定會讓 Codex 在需要時以 `npx` 啟動 Context7，並在每次使用工具前要求確認。若 20 秒內無法啟動，或單次 tool 的執行時間超過 45 秒，就視為失敗。Context7 是第三方工具，使用前仍要審查套件來源、版本、資料流向與執行權限。

### 只開啟需要的 tools

Server 連線後，先以 allowlist 限制可用 tools，再針對單一 tool 設定 Approval：

```toml
[mcp_servers.docs]
url = "https://docs.example.com/mcp"
enabled_tools = ["search", "read"]
default_tools_approval_mode = "prompt"
enabled = true

[mcp_servers.docs.tools.search]
approval_mode = "approve"
```

上例只開啟 `search` 與 `read`；`search` 已審查為安全的 read-only tool，因此可單獨設為 `approve`。`url` 與 tool 名稱僅供示意，請改用該 Server 官方文件公布的值，並在使用前完成安全審查。

| Approval 設定 | 行為 | 初學建議 |
| --- | --- | --- |
| `prompt` | 每次 tool call 都先要求確認 | 第一次連線或工具影響不明時使用 |
| `writes` | 對未標示為 read-only 的 tool 詢問 | 確認 Server annotations 的 read-only 標示正確後再使用 |
| `approve` | 允許 tool 直接執行 | 只對範圍明確、已審查的單一 tool 使用 |
| `auto` | 交由 Codex 的自動策略決定是否詢問 | 第一次連線先用 `prompt`，熟悉工具後再評估 |

## 7｜Authentication 與 secrets

Transport 解決「如何連線」，Authentication 解決「以誰的身分、能看到什麼」；write 權限則須另外設定。

- OAuth Server 可在 App 中執行 **Authenticate**，或在 CLI 使用 `codex mcp login <server-name>` 登入。
- Bearer token 應透過 `bearer_token_env_var` 指定環境變數名稱。
- STDIO Server 僅轉交其執行所需的環境變數。
- 不要在 Prompt、Repository、靜態 header 或日誌中寫入 token。
- 連線成功後仍要確認實際帳號、Workspace、資料範圍與 write 權限。

```toml
[mcp_servers.example]
url = "https://mcp.example.com/mcp"
bearer_token_env_var = "EXAMPLE_MCP_TOKEN"
```

`bearer_token_env_var` 應填入環境變數**名稱**，而非 token 值。服務若支援 OAuth，建議使用登入流程，避免長期自行保存 bearer token。

## 8｜動手練習：用 Context7 查核目前套件文件

本練習將依序完成「審查 → 連線 → 驗證 → read-only 查核 → 核對來源」，不包含建立 MCP Server。

### Step 0｜開始前確認

<ul class="mcp-lab-checklist" aria-label="Context7 練習前置檢查">
  <li><b>環境</b><span>已安裝 Node.js 與 npm，終端機可以執行 <code>npx</code>。</span></li>
  <li><b>來源</b><span>已確認套件名稱、發行者、執行命令與預期資料流向。</span></li>
  <li><b>範圍</b><span>練習範圍限於搜尋與讀取文件，不使用外部 write tools。</span></li>
  <li><b>資料</b><span>不要在查詢中貼入 Token、客戶資料或其他敏感內容。</span></li>
</ul>

### Step 1｜從 CLI 或 App 加入 Server

使用 CLI 時執行：

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

若使用 App，請在 **Add server** 選擇 STDIO。Server 名稱填入 `context7`，command 填入 `npx`，args 依序填入 `-y` 與 `@upstash/context7-mcp`。儲存後重新啟動 App。

### Step 2｜確認 Server 與 tools 可見

輸入 `/mcp` 後，確認以下項目：

- `context7` 已啟用且成功連線。
- Server 公布的 tools 已出現在清單。
- 若服務需要 Authentication，確認流程已完成，且畫面未顯示 startup error。
- Tool 清單與 Step 0 審查的用途一致。

<figure class="course-visual mcp-status-visual" aria-labelledby="mcp-shot-status-title">
  <div class="media-tabs__stage is-compact">
    <div class="media-tabs__glow" aria-hidden="true"></div>
    <div class="media-tabs__window">
      <img src="/images/mcp/show_mcp.png" width="772" height="458" alt="Codex Desktop App 輸入 /mcp 後顯示 Server 清單與啟用狀態的畫面" loading="lazy" decoding="async">
    </div>
  </div>
  <figcaption id="mcp-shot-status-title">輸入 <code>/mcp</code> 後，確認 Server 已完成初始化、處於啟用狀態，且工具清單已出現。</figcaption>
</figure>

### Step 3｜用 Prompt 限定查核工具與輸出範圍

```text
請只使用目前已連線文件服務的 read／search 類工具，
查核目前套件中 structured output 與 human-in-the-loop 的官方用法。

輸出：
1. 目前確認的 API 與來源
2. 版本或日期假設
3. 可直接採用的最小範例
4. 仍無法確認的事項

不要修改檔案，不要使用 write 類工具，
也不要用模型記憶補齊查不到的 API。
```

套件名稱與查核主題可以替換；工具仍須限於 read／search，輸出須保留來源，無法確認的內容不得自行補齊。

## 9｜外部工具的選擇順序

1. 優先使用該服務專用的 App connector、MCP 或 API。
2. 只有缺少專用介面時，才考慮瀏覽器操作。
3. 資料若已在本機，直接用檔案與命令處理，不必繞到外部服務。
4. write、send、delete、deploy、publish 等操作，須採用比 read／search 更嚴格的權限與確認機制。

## 延伸閱讀

- [Model Context Protocol：What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro) — MCP 定位、USB-C 類比與應用案例。
- [Model Context Protocol：Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture) — Host、Client、Server、primitives 與 transports。
- [Meta Intelligence：MCP 教學](https://www.meta-intelligence.tech/insight-mcp) — 本章引用其中第 1、2 章對整合問題與基礎架構的說明。
- [OpenAI：Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp) — Codex App、CLI、IDE 與 `config.toml` 的目前設定方式。
- [OpenAI：Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) — Codex 設定檔的層級與基本概念。
- [上一章：Skills](/advanced/skills) — 可重用工作方法的設計方式。
- [下一章：Plugins](/advanced/plugins) — 把方法、連線與需要的擴充元件組成可安裝能力包。
