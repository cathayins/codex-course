---
title: Config、權限與沙盒
description: 以 config.toml 為主軸，逐步設定模型、Approval、Sandbox 與網路邊界，建立適合不同任務的 Codex 工作模式。
outline: [2, 3]
---

# Config、權限與沙盒

上一章把團隊的工作方式寫進 `AGENTS.md`；這一章要用 `config.toml` 決定 Codex 執行任務時採用的模型、權限與技術邊界。

先記住兩者的分工：`AGENTS.md` 告訴 Codex「應該怎麼做」，`config.toml` 則設定「使用什麼模型、可以做到哪裡、越界時要不要詢問」。本章不從名詞定義開始，而是逐步完成一份設定，並在每次加入欄位時理解它改變了什麼。

<section class="lesson-goals" aria-labelledby="permissions-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="permissions-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>知道設定應放在哪一層，能保存常用的模型選擇、設定 Approval 與 Sandbox，並讀懂一份日常使用的 <code>config.toml</code>。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>找到正確設定層</strong><span>分辨專案、使用者與 System config 的用途。</span></article>
    <article><strong>保存模型選擇</strong><span>把快速上手選好的 model 與 reasoning effort 寫入 Config。</span></article>
    <article><strong>設定權限決策</strong><span>用 Approval policy 與 Reviewer 決定何時詢問、由誰判斷。</span></article>
    <article><strong>設定技術邊界</strong><span>用 Sandbox、writable roots 與網路設定限制實際能力。</span></article>
  </div>
</section>

<nav class="lesson-flow permissions-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 找到 Config</span>
  <span><b>02</b> 保存 Model</span>
  <span><b>03</b> 設定 Permission</span>
  <span><b>04</b> 定義 Sandbox</span>
  <span><b>05</b> 組成工作模式</span>
</nav>

## 1｜先認識 config.toml 的控制範圍

`config.toml` 是 Codex 的持久化設定入口。同一份 TOML 可以控制不同層面的行為，但每個欄位回答的問題不同：

<figure class="permissions-control-map" aria-labelledby="permissions-config-map-title">
  <figcaption>
    <span class="lesson-eyebrow">CONFIG MAP</span>
    <strong id="permissions-config-map-title">從一份 Config 讀出四層控制</strong>
    <small><code>config.toml</code> 裡的欄位各有不同責任；理解組合，比只記住單一設定更重要。</small>
  </figcaption>
  <ol class="permissions-control-map__steps">
    <li class="is-action">
      <div class="permissions-control-map__card-head"><span>01</span><b>Model</b></div>
      <div class="permissions-control-map__fields"><code>model</code><code>model_reasoning_effort</code></div>
      <p>選擇模型與推理投入量，影響能力、速度與成本。</p>
    </li>
    <li class="is-policy">
      <div class="permissions-control-map__card-head"><span>02</span><b>Permission</b></div>
      <div class="permissions-control-map__fields"><code>approval_policy</code><code>approvals_reviewer</code></div>
      <p>決定何時需要 Approval，以及由使用者或 Auto-review 判斷。</p>
    </li>
    <li class="is-sandbox">
      <div class="permissions-control-map__card-head"><span>03</span><b>Sandbox</b></div>
      <div class="permissions-control-map__fields"><code>sandbox_mode</code><code>writable_roots</code></div>
      <p>限制檔案與命令的技術邊界，決定哪些位置可以寫入。</p>
    </li>
    <li class="is-reviewer">
      <div class="permissions-control-map__card-head"><span>04</span><b>External access</b></div>
      <div class="permissions-control-map__fields"><code>web_search</code><code>network_access</code></div>
      <p>分開控制內建搜尋與 Sandbox 內命令的對外網路。</p>
    </li>
  </ol>
  <p class="permissions-control-map__note">模型能力越強，不代表檔案權限越大；是否能執行某個動作，仍由 Sandbox 與 Approval 共同決定。</p>
</figure>

### Config 放在哪裡

<MediaTabs
  class="permissions-media-tabs"
  aria-label="在 App 與 IDE 中找到 config.toml"
  :items="[
    {
      label: 'App',
      title: '在 Configuration 選擇設定層級',
      description: '從 App 的 Configuration 頁開啟設定層級選單，可切換 Project config、User config 與 Admin config。先確認設定屬於哪一層，再決定放入專案或個人 config.toml。',
      image: '/images/permissions/app_settings.png',
      alt: 'Codex App 的 Configuration 設定頁，展開選單顯示 Project config、User config 與 Admin config',
      fit: 'compact'
    },
    {
      label: 'IDE',
      title: '在 IDE 的組態頁開啟 config.toml',
      description: 'IDE 的組態頁提供開啟 config.toml 的入口；若設定不是目前 workspace 專屬，仍要回到 User config 或 System config 判斷放置層級。',
      image: '/images/permissions/ide_settings.png',
      alt: 'IDE 的組態設定頁，顯示開啟 config.toml 的按鈕與模型功能設定',
      fit: 'compact'
    }
  ]"
/>

<section class="mcp-transport-grid permissions-config-grid" aria-label="專案與使用者 Config 比較">
  <article class="is-stdio">
    <header><span>PROJECT SCOPE</span><strong>專案 Config</strong></header>
    <p>只屬於目前 Repository 的設定；受信任的 Repository 才會載入。</p>
    <dl><div><dt>設定檔</dt><dd><code>.codex/config.toml</code></dd></div><div><dt>適合放</dt><dd>團隊共同的 Model、Sandbox、Approval、MCP、hooks 與 rules</dd></div><div><dt>判斷方式</dt><dd>換到另一個 Repository 後，仍然應該保留嗎？</dd></div></dl>
  </article>
  <article class="is-http">
    <header><span>USER SCOPE</span><strong>使用者 Config</strong></header>
    <p>跨 Repository 共用的個人預設；主機層設定與本機偏好應集中在這一層。</p>
    <dl><div><dt>設定檔</dt><dd><code>~/.codex/config.toml</code></dd></div><div><dt>適合放</dt><dd>模型供應商、LiteLLM Proxy、認證方式與個人工作偏好</dd></div><div><dt>判斷方式</dt><dd>只有自己使用，或會跟著這台機器走嗎？</dd></div></dl>
  </article>
</section>

可以用「這個設定屬於誰」判斷放置位置：專案團隊共同需要的行為放專案層；只屬於自己的模型服務與工作偏好放使用者層。System config 與內建預設是管理者提供的 fallback，不是日常自行選擇的專案／使用者設定層。上層設定可以覆寫下層預設，但組織的 `requirements.toml` 仍可限制哪些值允許使用。

::: warning Repository trust 是載入條件
不受信任的 Repository 不能用自己的 `.codex/config.toml`、hooks 或 rules 改變 Codex 行為。若設定看似正確卻沒有生效，先檢查目前目錄、設定優先順序與 Repository 是否受信任。
:::

## 2｜第一步：保存 Model 選擇

[Models｜選擇模型](/quick-start/models) 已說明如何依能力、速度與任務難度選擇模型。本章只處理下一步：需要固定行為時，把已選好的模型與 reasoning effort 寫進 Config。

```toml
# ~/.codex/config.toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
```

`model` 與 `model_reasoning_effort` 影響能力、速度與成本，不會改變檔案、網路或 Approval 權限。模型 ID 與可用選項可能依帳號和 Workspace 不同，請以目前選擇器顯示的值為準。

::: tip 什麼時候不必固定 model？
如果希望 Codex 自動採用目前的預設模型，可以省略 `model`。只有在課程示範、團隊驗證或工作流程需要可重現行為時，才需要明確固定模型與 reasoning effort。
:::

### 透過 LiteLLM Proxy 選擇模型

如果團隊透過 LiteLLM 呼叫模型，將下列設定寫進**使用者自己的** `~/.codex/config.toml`，讓 LiteLLM 成為 Codex 的模型 provider。

```toml
model = "coding-model"
model_provider = "litellm"
model_reasoning_effort = "high"

[model_providers.litellm]
name = "LiteLLM Proxy"
base_url = "http://localhost:4000"
env_key = "LITELLM_API_KEY"
wire_api = "responses"
```

設定時核對四件事：

1. Codex 的 `model` 必須和 LiteLLM 的 `model_name` 相同。
2. `base_url` 要指向實際 Proxy，且 Proxy 必須提供 Responses API。
3. `wire_api` 使用 `"responses"`。
4. `env_key` 只寫環境變數名稱；Token 放在執行環境，不寫進 TOML。

::: warning Provider 設定與 Token 都不要放進專案 Config
專案 `.codex/config.toml` 會忽略 `model_provider` 與 `model_providers` 等主機層設定，因此 LiteLLM provider 應放在 `~/.codex/config.toml`。`env_key` 寫的是環境變數名稱，不是 Token 本身；請在執行環境設定 `LITELLM_API_KEY`，不要把 Proxy key 寫進 TOML 或版本控制。
:::

### Model 是能力選擇，不是權限選擇

即使模型更擅長寫程式，它仍只能在目前 Sandbox 允許的範圍內執行。接下來要加入的是「何時必須停下來詢問」的設定。

## 3｜第二步：加入 Permission 決策

在上一段設定下方加入：

```toml
approval_policy = "on-request"
approvals_reviewer = "user"
```

這兩個欄位共同定義互動式權限決策：

- `approval_policy` 決定什麼情況要提出 Approval。
- `approvals_reviewer` 決定符合條件的 Approval 交給使用者或 Auto-review。

### Approval policy 怎麼選

| 值 | 行為 | 適合情境 |
| --- | --- | --- |
| `untrusted` | 不在可信集合中的命令會先詢問 | 剛開始使用、需要更保守地觀察命令 |
| `on-request` | 先在 Sandbox 內工作，需要越界時再詢問 | 一般互動式開發的實用起點 |
| `never` | 遇到需要 Approval 的動作時，不建立互動流程<br>Sandbox 內的動作照常執行，Sandbox 外的動作不會自動取得權限 | 能接受越界動作直接失敗的自動流程；只有搭配完整外部隔離時才考慮 Full access |

::: danger 不要把 `never` 當成「Approve all」
如果你的期待是「先在 Sandbox 內工作，必要時再讓人決定能否越界」，應使用 `approval_policy = "on-request"`。`never` 適合的是不希望流程停下來，且可以接受受限動作無法完成的情境。
:::

### Reviewer：由誰判斷越界請求

| 值 | 行為 | 適合情境 |
| --- | --- | --- |
| `user` | Approval 顯示給使用者，由使用者閱讀動作、範圍與風險後決定；這是預設值 | 課程學習、互動式開發，以及部署、刪除、發送等需要人工確認的高影響任務 |
| `auto_review` | 符合條件的 Approval 交給獨立 reviewer agent；Reviewer 會核准或拒絕並提供理由，可能增加模型呼叫與用量 | 邊界與審查政策已清楚、需要減少中斷的長時間任務；仍不適合把模糊或高風險請求當成自動放行 |

```toml
# 手動審查（預設）
approvals_reviewer = "user"

# 自動審查符合條件的 Approval
# approvals_reviewer = "auto_review"
```

Auto-review 會評估符合條件的 Approval，但不會擴大 Sandbox、不會增加 writable roots，也不會自動開啟命令網路。它改變的是「誰審查」，不是「邊界在哪裡」。

::: tip Reviewer 只有在 Approval 可互動時才會介入
`approvals_reviewer` 通常搭配 `approval_policy = "on-request"` 或 granular approval policy。若使用 `approval_policy = "never"`，不會產生互動式 Approval，也就沒有請 Reviewer 判斷的流程。組織管理者也可以用 `allowed_approvals_reviewers` 限制可選值。
:::

<figure class="course-visual permissions-course-visual" aria-labelledby="permissions-shot-approval-title">
  <div class="media-tabs__stage is-compact">
    <div class="media-tabs__glow" aria-hidden="true"></div>
    <div class="media-tabs__window">
      <img src="/images/permissions/permission_selection.png" width="802" height="386" alt="Codex Desktop App 的 Approval 模式選單，列出 Ask for approval、Approve for me、Full access 與 Custom (config.toml)" loading="lazy" decoding="async">
    </div>
  </div>
  <figcaption id="permissions-shot-approval-title">App 會在送出任務前提供 Approval 模式選擇：可要求每次詢問、由 App 代為核准、開啟 Full access，或用 Custom (<code>config.toml</code>) 套用設定。選擇後，再用 <code>approval_policy</code> 與 <code>approvals_reviewer</code> 核對實際的詢問與審查行為。</figcaption>
</figure>

## 4｜第三步：用 Sandbox 畫出技術邊界

現在把日常工作的檔案邊界加入同一份設定：

```toml
sandbox_mode = "workspace-write"
```

Sandbox 決定 Codex 執行本機命令時，技術上可以讀寫哪些位置與使用哪些網路資源。它是實際限制，不是文字提醒。

| 模式 | 技術邊界 | 常見用途 |
| --- | --- | --- |
| `read-only` | 可檢查檔案；寫入與需要寫入的命令受限制 | 陌生專案理解、程式碼 review、風險盤點 |
| `workspace-write` | 可在 workspace 內讀寫並執行例行命令，命令網路預設關閉 | 文件修改、補測試、一般本機開發 |
| `danger-full-access` | 移除本機 Sandbox 的檔案與網路限制 | 已有外部隔離且確實需要完整存取的短期任務 |

### Sandbox 與 Approval 必須一起讀

<div class="permissions-risk-matrix" role="region" aria-labelledby="permissions-risk-title" tabindex="0">
  <table>
    <caption id="permissions-risk-title">同一個 Sandbox 搭配不同 Approval policy，會形成不同工作模式</caption>
    <thead>
      <tr><th scope="col">Sandbox ＼ Approval</th><th scope="col"><code>untrusted</code></th><th scope="col"><code>on-request</code></th><th scope="col"><code>never</code></th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><code>read-only</code></th><td class="risk-low">保守探索</td><td class="risk-low">需要寫入時詢問</td><td class="risk-note">無提示，仍不能寫入</td></tr>
      <tr><th scope="row"><code>workspace-write</code></th><td class="risk-note">安全但詢問較多</td><td class="risk-recommended">日常建議起點</td><td class="risk-medium">workspace 的流程可自動</td></tr>
      <tr><th scope="row"><code>danger-full-access</code></th><td class="risk-high">邊界過寬</td><td class="risk-high">只有明確需求才使用</td><td class="risk-critical">Full access：最高風險</td></tr>
    </tbody>
  </table>
</div>

::: danger Full access 是兩個欄位的組合
只有 `sandbox_mode = "danger-full-access"` 加上 `approval_policy = "never"`，才是移除沙盒又不再詢問的 Full access。不要只看到 `never` 就判斷權限大小。
:::

### 需要另一個目錄時，只擴充必要範圍

**情境**：假設課程網站位於 `course-site`，會在 `course-site` 修改網頁，並把產生的講義同步到 `shared-handouts`。

```text
/Users/student/projects/course-site       ← 目前開啟的 workspace
/Users/student/projects/shared-handouts  ← 另一個共用教材目錄
```

- `course-site` 是目前 workspace，因此可以直接修改。
- `shared-handouts` 是相鄰目錄，不在預設 writable roots 內，因此寫入時需要 Approval。

如果此行為反覆出現，而且 `shared-handouts` 確實是受信任教材目錄，才加入可寫入的**絕對路徑**：

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[sandbox_workspace_write]
writable_roots = ["/Users/student/projects/shared-handouts"] # [!code highlight]
network_access = false
```

設定前後的差異如下：

| 動作 | 設定前 | 加入 writable root 後 |
| --- | --- | --- |
| 寫入 `course-site` | 允許 | 允許，沒有改變 |
| 寫入 `shared-handouts` | 超出寫入邊界；`on-request` 會要求 Approval | 位於新增的 writable root，可在 Sandbox 內直接寫入 |
| 寫入 `其他資料夾` | 受限制 | 仍然受限制，沒有被一起放行 |

`writable_roots` 是在目前 workspace 之外**增加精確的可寫目錄**，不是取代原本 workspace，也不是開啟整個父目錄。它只改變檔案寫入範圍，不會改變 Web search、命令網路、Reviewer 或 Approval policy。

::: tip 什麼時候應該設定 writable root？
只有當跨目錄寫入會反覆發生、目錄範圍固定，而且資料屬於同一個可信工作流程時，才適合設成 writable root。若只是單次輸出，保留 `on-request` Approval 通常更容易看清楚這次越界的原因與影響。
:::

:::: details 進階：Permission profiles（Beta）
Named permission profiles 把檔案系統與網路規則整理成可重用的權限設定。官方目前提供 `:read-only`、`:workspace` 與 `:danger-full-access` 三個內建 profile。

```toml
default_permissions = "project-edit"
approval_policy = "on-request"

[permissions.project-edit]
extends = ":workspace"

[permissions.project-edit.filesystem.":workspace_roots"]
"**/*.env" = "deny"

[permissions.project-edit.network]
enabled = true

[permissions.project-edit.network.domains]
"api.github.com" = "allow"
"registry.npmjs.org" = "allow"
```

::: danger 不要混用新舊兩套權限設定
同一個 session 應選擇 `default_permissions`／`[permissions]`，或 `sandbox_mode`／`[sandbox_workspace_write]`。只要載入的設定或 CLI 參數出現 `sandbox_mode`，Codex 會使用舊式 Sandbox 設定，而不是 `default_permissions`。
:::

Permission profiles 仍是 Beta；實際欄位與平台限制請以 [OpenAI Permissions](https://learn.chatgpt.com/docs/permissions) 當下版本為準。
::::

## 5｜第四步：釐清 Web 搜尋與沙盒的網路權限

最後把 Web search 加進主設定：

```toml
web_search = "cached"
```

此時要分清兩個網路控制：

<figure class="permissions-network-map" aria-labelledby="permissions-network-map-title">
  <figcaption>
    <strong id="permissions-network-map-title">同樣是「連網」，其實走兩條不同路徑</strong>
    <small>先看動作由誰執行，再找對應的 <code>config.toml</code> 開關。</small>
  </figcaption>
  <div class="permissions-network-map__request">
    <span>任務需求</span>
    <strong>取得網路上的資料或資源</strong>
  </div>
  <div class="permissions-network-map__decision" aria-hidden="true">誰要連網？</div>
  <div class="permissions-network-map__lanes">
    <section class="permissions-network-lane is-search" aria-labelledby="permissions-search-lane-title">
      <header>
        <span>路徑 A</span>
        <strong id="permissions-search-lane-title">Codex 幫你搜尋網頁</strong>
      </header>
      <div class="permissions-network-lane__step">
        <small>設定開關</small>
        <code>web_search</code>
      </div>
      <div class="permissions-network-lane__arrow" aria-hidden="true">↓</div>
      <div class="permissions-network-lane__step">
        <small>執行者</small>
        <b>內建 Web search 工具</b>
      </div>
      <p>用來查文件、新聞或網頁資料；<code>cached</code>、<code>indexed</code>、<code>live</code> 決定搜尋來源的新鮮度。</p>
      <footer><b>不會授權</b> <code>curl</code>、<code>npm install</code> 等命令連網</footer>
    </section>
    <section class="permissions-network-lane is-command" aria-labelledby="permissions-command-lane-title">
      <header>
        <span>路徑 B</span>
        <strong id="permissions-command-lane-title">Sandbox 裡的命令要連網</strong>
      </header>
      <div class="permissions-network-lane__step">
        <small>設定開關</small>
        <code>sandbox_workspace_write.network_access</code>
      </div>
      <div class="permissions-network-lane__arrow" aria-hidden="true">↓</div>
      <div class="permissions-network-lane__step">
        <small>執行者</small>
        <b>Shell 與子程序</b>
      </div>
      <p>用來下載套件、呼叫 API 或抓取檔案；<code>true</code> 只開放命令的網路通道。</p>
      <footer><b>不會啟用</b> Codex 的 Web search，也不保證外部內容可信</footer>
    </section>
  </div>
  <p class="permissions-network-map__takeaway"><strong>判斷口訣：</strong>「找資料」看 <code>web_search</code>；「跑命令連網」看 <code>network_access</code>。兩者互不替代。</p>
</figure>

| 設定 | 控制對象 | 常用值 |
| --- | --- | --- |
| `web_search` | Codex 內建的 Web search 工具 | `cached`、`indexed`、`live`、`disabled` |
| `sandbox_workspace_write.network_access` | Sandbox 內啟動的命令，例如套件管理器或 `curl` | `true`、`false` |

`web_search = "cached"` 不代表 `npm install` 或其他子程序可以連網；反過來，開啟命令網路也不代表所有網頁內容都可信。需要最新資訊才使用 `live`，並把搜尋結果視為不受信任輸入。

## 6｜把四個步驟組成日常 Config

將前面的欄位合在一起，就得到一份適合一般本機開發的教學起點：

```toml
# 模型：需要固定行為時設定；也可以省略，跟隨目前預設
model = "gpt-5.6"
model_reasoning_effort = "high"

# 權限決策：越界時由使用者判斷
approval_policy = "on-request"
approvals_reviewer = "user"

# 技術邊界：允許目前 workspace 內的日常修改
sandbox_mode = "workspace-write"

# 搜尋：先使用已建立索引的快取結果
web_search = "cached"

# 命令網路：預設關閉
[sandbox_workspace_write]
network_access = false
```

這份 Config 可以用一句話讀成：**使用指定模型，在目前 workspace 內工作；需要跨越邊界時詢問使用者；搜尋先走 cached，命令本身不任意連網。**

::: warning 這是教學起點，不是所有環境的標準答案
正式環境仍要依資料敏感度、網路政策、組織的 `requirements.toml` 與任務類型調整。不要為了少一次 Approval，就把 Full access 設成長期預設。
:::

### 依任務切換 Config 配方

以下三種配方都沿用相同欄位，只調整任務真正需要的部分。

<MediaTabs
  class="permissions-recipe-tabs"
  aria-label="依任務切換 Config 配方"
  :items="[
    {
      label: '配方 A',
      title: '陌生專案只讀審查',
      description: '先理解內容，不讓探索階段直接改檔案，也不需要外部網路。若任務後來變成實作，再明確切換模式。',
      commands: [
        {
          label: 'config.toml',
          code: 'model_reasoning_effort = &quot;high&quot;\napproval_policy = &quot;on-request&quot;\napprovals_reviewer = &quot;user&quot;\nsandbox_mode = &quot;read-only&quot;\nweb_search = &quot;disabled&quot;'
        }
      ],
      note: '適合陌生 Repository、程式碼 review 與風險盤點。'
    },
    {
      label: '配方 B',
      title: '一般文件或程式修改',
      description: '這是多數互動式工作的起點：workspace 內可以持續修改，跨目錄或命令連網時才出現新的決策。',
      commands: [
        {
          label: 'config.toml',
          code: 'approval_policy = &quot;on-request&quot;\napprovals_reviewer = &quot;user&quot;\nsandbox_mode = &quot;workspace-write&quot;\nweb_search = &quot;cached&quot;\n\n[sandbox_workspace_write]\nnetwork_access = false'
        }
      ],
      note: '適合一般文件、程式修改與需要逐步核對結果的日常工作。'
    },
    {
      label: '配方 C',
      title: '固定的跨目錄或網路任務',
      description: '只有在額外目錄與網路是穩定、反覆出現且來源可信時，才把它們寫成持久設定；一次性需求仍保留 Approval。',
      commands: [
        {
          label: 'config.toml',
          code: 'approval_policy = &quot;on-request&quot;\napprovals_reviewer = &quot;user&quot;\nsandbox_mode = &quot;workspace-write&quot;\nweb_search = &quot;live&quot;\n\n[sandbox_workspace_write]\nwritable_roots = [&quot;/absolute/path/to/shared-docs&quot;]\nnetwork_access = true'
        }
      ],
      note: '放寬前先確認目錄、網域、命令與資料來源都屬於可信工作流程。'
    }
  ]"
/>

## Takeaway

- **Config 是主控台**：先確認設定層級與優先順序，再討論欄位值。
- **Model 決定使用哪種能力**：它影響品質、速度與推理量，但不會增加檔案或網路權限。
- **Permission 是決策流程**：`approval_policy` 決定何時詢問，`approvals_reviewer` 決定由誰判斷。
- **Sandbox 是技術邊界**：它決定實際可讀、可寫與可連線的範圍；Auto-review 不會把邊界變大。
- **判斷風險要看組合**：`never` 不等於 Full access；只有 `danger-full-access + never` 才是完整放開。
- **先縮小，再放寬**：優先增加單一 writable root 或明確網域，不要因一次需求永久移除 Sandbox。

## 延伸閱讀

### OpenAI 官方文件

- [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) — 設定位置、優先順序、模型與常用欄位。
- [Configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) — 查詢 `config.toml` 的完整欄位與可選值。
- [Sandbox](https://learn.chatgpt.com/docs/sandboxing) — 本機命令的檔案與網路邊界。
- [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security) — Sandbox、Approval 與常見模式組合。
- [Permissions](https://learn.chatgpt.com/docs/permissions) — Beta permission profiles、檔案與網路規則。
- [LiteLLM 官方文件](https://docs.litellm.ai/) — Proxy、模型路由與 OpenAI-compatible Responses API。

### 中文補充教材

- [CodexGuide：config.toml 常見配置項](https://codexguide.ai/advanced/09-config-toml.html#%E5%B8%B8%E8%A7%81%E9%85%8D%E7%BD%AE%E9%A1%B9%E6%8C%89%E7%94%A8%E9%80%94%E7%90%86%E8%A7%A3)
- [CodexGuide：Sandbox 與審批策略](https://codexguide.ai/advanced/07-sandbox-approvals.html#%E5%AE%A1%E6%89%B9%E7%AD%96%E7%95%A5)
- [CodexGuide：Permissions 自訂配置](https://codexguide.ai/advanced/04-permissions-security.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE)

下一章會把「可重複的專業工作流程」從設定與權限邊界中拆出來，整理成可按需載入的 [Skills](/advanced/skills)。
