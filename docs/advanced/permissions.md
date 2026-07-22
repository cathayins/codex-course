---
title: Config、權限與沙盒
description: 說明如何用 config.toml 設定模型、Approval、Sandbox 與網路邊界，並依任務調整 Codex 的工作模式。
outline: [2, 3]
pageClass: advanced-code-wrap
---

# Config、權限與沙盒

上一章介紹如何用 `AGENTS.md` 記錄團隊的工作方式；本章改用 `config.toml` 設定 Codex 執行任務時採用的模型、權限與技術邊界。

`AGENTS.md` 規範 Codex 應該怎麼做；`config.toml` 則控制使用哪個模型、可執行到哪裡，以及越界時是否詢問。本文直接從一份設定開始，說明每個欄位的作用。

<section class="lesson-goals" aria-labelledby="permissions-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="permissions-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>分辨設定層級、固定常用模型、設定 Approval 與 Sandbox，並讀懂日常使用的 <code>config.toml</code>。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>找到正確設定層</strong><span>分辨專案、使用者與 System config 的用途。</span></article>
    <article><strong>固定模型設定</strong><span>將快速上手章節選定的 model 與 reasoning effort 寫入設定檔。</span></article>
    <article><strong>設定權限決策</strong><span>用 Approval policy 與 Reviewer 決定何時詢問、由誰判斷。</span></article>
    <article><strong>設定技術邊界</strong><span>用 Sandbox、writable roots 與網路設定限制檔案和網路存取範圍。</span></article>
  </div>
</section>

<nav class="lesson-flow permissions-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 找到 Config</span>
  <span><b>02</b> 固定 Model 設定</span>
  <span><b>03</b> 設定 Permission 決策</span>
  <span><b>04</b> 定義 Sandbox</span>
  <span><b>05</b> 組成工作模式</span>
</nav>

## 1｜config.toml 的控制範圍

`config.toml` 儲存 Codex 的長期設定，不同欄位分別控制模型、權限、Sandbox 與網路存取：

<figure class="permissions-control-map" aria-labelledby="permissions-config-map-title">
  <figcaption>
    <span class="lesson-eyebrow">CONFIG MAP</span>
    <strong id="permissions-config-map-title">Config 的四類設定</strong>
    <small><code>config.toml</code> 裡的欄位各有不同責任；重點是理解欄位如何組合，而不是只背下單一設定。</small>
  </figcaption>
  <ol class="permissions-control-map__steps">
    <li class="is-action">
      <div class="permissions-control-map__card-head"><span>01</span><b>Model</b></div>
      <div class="permissions-control-map__fields"><code>model</code><code>model_reasoning_effort</code></div>
      <p>選擇模型與推理強度，影響能力、速度與成本。</p>
    </li>
    <li class="is-policy">
      <div class="permissions-control-map__card-head"><span>02</span><b>Permission</b></div>
      <div class="permissions-control-map__fields"><code>approval_policy</code><code>approvals_reviewer</code></div>
      <p>決定何時提出 Approval，以及交由使用者或 Auto-review 審查。</p>
    </li>
    <li class="is-sandbox">
      <div class="permissions-control-map__card-head"><span>03</span><b>Sandbox</b></div>
      <div class="permissions-control-map__fields"><code>sandbox_mode</code><code>writable_roots</code></div>
      <p>限制檔案與命令的存取範圍，決定哪些位置可以寫入。</p>
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
      description: '從 App 的 Configuration 頁開啟設定層級選單，可切換 Project config、User config 與 Admin config。設定層級確認後，再決定放入專案或個人 config.toml。',
      image: '/images/permissions/app_settings.png',
      alt: 'Codex App 的 Configuration 設定頁，展開選單顯示 Project config、User config 與 Admin config',
      fit: 'compact'
    },
    {
      label: 'IDE',
      title: '在 IDE 的組態頁開啟 config.toml',
      description: 'IDE 的組態頁提供開啟 config.toml 的入口；非目前 workspace 專屬的設定，應放在 User config 或 System config。',
      image: '/images/permissions/ide_settings.png',
      alt: 'IDE 的組態設定頁，顯示開啟 config.toml 的按鈕與模型功能設定',
      fit: 'compact'
    }
  ]"
/>

<section class="mcp-transport-grid permissions-config-grid" aria-label="專案與使用者 Config 比較">
  <article class="is-stdio">
    <header><span>PROJECT SCOPE</span><strong>專案 Config</strong></header>
    <p>這類設定只套用於目前的 Repository；Codex 只會載入受信任 Repository 中的設定。</p>
    <dl><div><dt>設定檔</dt><dd><code>.codex/config.toml</code></dd></div><div><dt>適用內容</dt><dd>團隊共同的 Model、Sandbox、Approval、MCP、hooks 與 rules</dd></div><div><dt>判斷方式</dt><dd>換到另一個 Repository 後仍需保留的設定，放在專案層。</dd></div></dl>
  </article>
  <article class="is-http">
    <header><span>USER SCOPE</span><strong>使用者 Config</strong></header>
    <p>這一層存放跨 Repository 共用的個人預設，包括主機層設定與本機偏好。</p>
    <dl><div><dt>設定檔</dt><dd><code>~/.codex/config.toml</code></dd></div><div><dt>適用內容</dt><dd>模型供應商、LiteLLM Proxy、認證方式與個人工作偏好</dd></div><div><dt>判斷方式</dt><dd>只供自己使用、需要隨這台機器保留的設定，放在使用者層。</dd></div></dl>
  </article>
</section>

設定屬於團隊共同需求時放在專案層；只屬於個人的模型服務與工作偏好時放在使用者層。System config 與內建預設是管理者提供的 fallback，不是日常自行選擇的專案或使用者設定層。上層設定可以覆寫下層預設，但組織的 `requirements.toml` 仍可限制可用值。

::: warning Repository trust 是載入條件
不受信任的 Repository 不能用自己的 `.codex/config.toml`、hooks 或 rules 改變 Codex 行為。若設定看似正確卻沒有生效，先檢查目前目錄、設定優先順序與 Repository 是否受信任。
:::

## 2｜第一步：固定 Model 設定

[Models｜選擇模型](/quick-start/models) 已說明如何依能力、速度與任務難度選擇模型。需要固定行為時，將選定的模型與 reasoning effort 寫入 Config。

```toml
# ~/.codex/config.toml
model = "gpt-5.6-sol"
model_reasoning_effort = "high"
```

`model` 與 `model_reasoning_effort` 影響能力、速度與成本，不會改變檔案、網路或 Approval 權限。模型 ID 與可用選項可能依帳號和 Workspace 不同，實際值以目前選擇器顯示的選項為準。

::: tip 什麼時候不必固定 model？
如果希望 Codex 自動採用目前的預設模型，可以省略 `model`。只有在課程示範、團隊驗證或工作流程需要可重現行為時，才需要明確固定模型與 reasoning effort。
:::

### 透過 LiteLLM Proxy 選擇模型

如果團隊透過 LiteLLM 呼叫模型，將下列設定寫入使用者層的 `~/.codex/config.toml`，指定 LiteLLM 為 Codex 的模型 provider。

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

設定完成後，確認以下四點：

1. Codex 的 `model` 必須與 LiteLLM 的 `model_name` 相同。
2. `base_url` 應指向實際的 Proxy，且 Proxy 必須提供 Responses API。
3. `wire_api` 使用 `"responses"`。
4. `env_key` 只寫環境變數名稱；Token 放在執行環境，不寫進 TOML。

::: warning Provider 設定與 Token 不應放在專案 Config
專案 `.codex/config.toml` 會忽略 `model_provider` 與 `model_providers` 等主機層設定，因此 LiteLLM provider 應放在 `~/.codex/config.toml`。`env_key` 寫的是環境變數名稱，不是 Token 本身；`LITELLM_API_KEY` 應設定在執行環境中，Proxy key 不應寫入 TOML 或版本控制。
:::

### Model 影響能力，不影響權限

即使模型更擅長寫程式，它仍只能在目前 Sandbox 允許的範圍內執行。下一節設定需要詢問使用者的時機。

## 3｜第二步：加入 Permission 決策

在同一份設定中加入：

```toml
approval_policy = "on-request"
approvals_reviewer = "user"
```

這兩個欄位分別控制互動式權限決策：

- `approval_policy` 決定何時需要 Approval。
- `approvals_reviewer` 決定由使用者或 Auto-review 審查符合條件的 Approval。

### Approval policy 怎麼選

| 值 | 行為 | 適合情境 |
| --- | --- | --- |
| `untrusted` | 不在可信集合中的命令會先詢問 | 初次使用，或需要逐一檢查不受信任的命令 |
| `on-request` | 先在 Sandbox 內工作，需要越界時再詢問 | 一般互動式開發 |
| `never` | 遇到需要 Approval 的動作時，不建立互動流程；Sandbox 內照常執行，Sandbox 外的動作直接失敗 | 適合能接受越界動作失敗的自動流程；僅在已有完整外部隔離時考慮 Full access |

::: danger `never` 不等於「Approve all」
若要先在 Sandbox 內工作，越界時再交由使用者決定，可使用 `approval_policy = "on-request"`。`never` 適合不希望流程停下來，且能接受受限動作無法完成的情境。
:::

### Reviewer：由誰判斷越界請求

| 值 | 行為 | 適合情境 |
| --- | --- | --- |
| `user` | Approval 顯示給使用者，由使用者閱讀動作、範圍與風險後決定；此為預設值 | 課程學習、互動式開發，以及部署、刪除、發送等需要人工確認的高影響任務 |
| `auto_review` | 符合條件的 Approval 交給獨立 reviewer agent，由它核准或拒絕並說明理由；可能增加模型呼叫次數與用量 | 邊界與審查政策明確、需要減少中斷的長時間任務；不適合自動處理模糊或高風險請求 |

```toml
# 手動審查（預設）
approvals_reviewer = "user"

# 自動審查符合條件的 Approval
# approvals_reviewer = "auto_review"
```

Auto-review 只改變審查者，不會擴大 Sandbox、writable roots 或命令網路的範圍。

::: tip Reviewer 只會介入可互動的 Approval 流程
`approvals_reviewer` 通常與 `approval_policy = "on-request"` 或 granular approval policy 搭配。若使用 `approval_policy = "never"`，不會產生互動式 Approval，也沒有 Reviewer 介入的流程。組織管理者仍可用 `allowed_approvals_reviewers` 限制可選值。
:::

<figure class="course-visual permissions-course-visual" aria-labelledby="permissions-shot-approval-title">
  <div class="media-tabs__stage is-compact">
    <div class="media-tabs__glow" aria-hidden="true"></div>
    <div class="media-tabs__window">
      <img src="/images/permissions/permission_selection.png" width="802" height="386" alt="Codex Desktop App 的 Approval 模式選單，列出 Ask for approval、Approve for me、Full access 與 Custom（config.toml）" loading="lazy" decoding="async">
    </div>
  </div>
  <figcaption id="permissions-shot-approval-title">送出任務前，App 提供 Approval 模式選單：可要求每次詢問、由 App 代為核准、開啟 Full access，或用 Custom（<code>config.toml</code>）套用設定。選擇後，再用 <code>approval_policy</code> 與 <code>approvals_reviewer</code> 核對實際的詢問與審查行為。</figcaption>
</figure>

## 4｜第三步：用 Sandbox 設定技術邊界

接著在同一份設定中加入日常工作的檔案邊界：

```toml
sandbox_mode = "workspace-write"
```

Sandbox 會實際限制 Codex 執行本機命令時可讀寫的位置與可用的網路資源。

| 模式 | 技術邊界 | 常見用途 |
| --- | --- | --- |
| `read-only` | 可檢查檔案；寫入與需要寫入的命令受限制 | 了解陌生專案、程式碼 review、風險盤點 |
| `workspace-write` | 可在 workspace 內讀寫並執行例行命令，命令網路預設關閉 | 文件修改、補測試、一般本機開發 |
| `danger-full-access` | 移除本機 Sandbox 的檔案與網路限制 | 已有外部隔離且確實需要完整存取的短期任務 |

### Sandbox 與 Approval 的組合

<div class="permissions-risk-matrix" role="region" aria-labelledby="permissions-risk-title" tabindex="0">
  <table>
    <caption id="permissions-risk-title">同一個 Sandbox 搭配不同 Approval policy，會形成不同工作模式</caption>
    <thead>
      <tr><th scope="col">Sandbox ＼ Approval</th><th scope="col"><code>untrusted</code></th><th scope="col"><code>on-request</code></th><th scope="col"><code>never</code></th></tr>
    </thead>
    <tbody>
      <tr><th scope="row"><code>read-only</code></th><td class="risk-low">保守探索</td><td class="risk-low">需要寫入時詢問</td><td class="risk-note">不會詢問，仍無法寫入</td></tr>
      <tr><th scope="row"><code>workspace-write</code></th><td class="risk-note">寫入受限，詢問較多</td><td class="risk-recommended">一般日常開發</td><td class="risk-medium">workspace 內可自動執行</td></tr>
      <tr><th scope="row"><code>danger-full-access</code></th><td class="risk-high">邊界過寬</td><td class="risk-high">適合有明確需求的短期任務</td><td class="risk-critical">Full access：最高風險</td></tr>
    </tbody>
  </table>
</div>

::: danger Full access 是兩個欄位的組合
只有 `sandbox_mode = "danger-full-access"` 加上 `approval_policy = "never"`，才會同時移除 Sandbox 限制並停止詢問。因此，單看 `never` 無法判斷權限大小。
:::

### 需要另一個目錄時，只擴充必要範圍

例如，課程網站位於 `course-site`，需要在 `course-site` 修改網頁，並將產生的講義同步到 `shared-handouts`。

```text
/Users/student/projects/course-site       ← 目前開啟的 workspace
/Users/student/projects/shared-handouts  ← 另一個共用教材目錄
```

- `course-site` 是目前 workspace，因此可以直接修改。
- `shared-handouts` 是相鄰目錄，不在預設 writable roots 內，因此寫入時需要 Approval。

跨目錄寫入反覆發生，且 `shared-handouts` 確實是受信任的教材目錄時，再加入可寫入的**絕對路徑**：

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[sandbox_workspace_write]
writable_roots = ["/Users/student/projects/shared-handouts"] # [!code highlight]
network_access = false
```

加入 writable root 後，差異如下：

| 動作 | 設定前 | 加入 writable root 後 |
| --- | --- | --- |
| 寫入 `course-site` | 允許 | 仍然允許 |
| 寫入 `shared-handouts` | 超出寫入邊界；`on-request` 會要求 Approval | 位於新增的 writable root，可在 Sandbox 內直接寫入 |
| 寫入 `其他資料夾` | 受限制 | 仍受限制 |

`writable_roots` 只會在目前 workspace 之外**增加指定的可寫目錄**；原本的 workspace 不受影響，也不會開啟整個父目錄。它只改變檔案寫入範圍，不會改變 Web search、命令網路、Reviewer 或 Approval policy。

::: tip 什麼時候應該設定 writable root？
跨目錄寫入反覆發生、目錄範圍固定，且資料屬於同一個可信工作流程時，才適合設成 writable root。單次輸出則保留 `on-request` Approval，較容易看清楚越界的原因與影響。
:::

:::: details 進階：Permission profiles（Beta）
Named permission profiles 可將檔案系統與網路規則整理為可重用的權限設定。官方目前提供 `:read-only`、`:workspace` 與 `:danger-full-access` 三個內建 profile。

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

::: danger 同一個 session 只使用其中一套權限設定
同一個 session 使用 `default_permissions`／`[permissions]`，或 `sandbox_mode`／`[sandbox_workspace_write]`。設定或 CLI 參數含有 `sandbox_mode` 時，Codex 會採用舊式 Sandbox 設定，不採用 `default_permissions`。
:::

Permission profiles 仍是 Beta；實際欄位與平台限制以 [OpenAI Permissions](https://learn.chatgpt.com/docs/permissions) 的最新版本為準。
::::

## 5｜第四步：釐清 Web 搜尋與沙盒的網路權限

主設定再加入 Web search：

```toml
web_search = "cached"
```

這裡有兩個獨立的網路控制：

<figure class="permissions-network-map" aria-labelledby="permissions-network-map-title">
  <figcaption>
    <strong id="permissions-network-map-title">同樣是「連網」，但分成兩條不同路徑</strong>
    <small>先確認執行者，再對應到 <code>config.toml</code> 中的設定開關。</small>
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
        <strong id="permissions-search-lane-title">Codex 搜尋網頁</strong>
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
      <p>用來查文件、新聞或網頁資料；<code>cached</code>、<code>indexed</code>、<code>live</code> 決定搜尋資料的更新程度。</p>
      <footer><b>不會授權</b> <code>curl</code>、<code>npm install</code> 等命令連網</footer>
    </section>
    <section class="permissions-network-lane is-command" aria-labelledby="permissions-command-lane-title">
      <header>
        <span>路徑 B</span>
        <strong id="permissions-command-lane-title">Sandbox 內的命令連網</strong>
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
  <p class="permissions-network-map__takeaway"><strong>判斷方式：</strong>「找資料」看 <code>web_search</code>；「跑命令連網」看 <code>network_access</code>。兩者互不替代。</p>
</figure>

| 設定 | 控制對象 | 常用值 |
| --- | --- | --- |
| `web_search` | Codex 內建的 Web search 工具 | `cached`、`indexed`、`live`、`disabled` |
| `sandbox_workspace_write.network_access` | Sandbox 內啟動的命令，例如套件管理器或 `curl` | `true`、`false` |

`web_search = "cached"` 不會開放 `npm install` 或其他子程序連網。開啟命令網路也不代表外部內容可信。需要最新資訊時才使用 `live`，搜尋結果仍應視為不受信任輸入。

## 6｜組合成日常 Config

把前述欄位合併，可得到一份適合一般本機開發的起始設定：

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

這份設定的作用是：使用指定模型，在目前 workspace 內工作；需要跨越邊界時詢問使用者；搜尋先走 cached，命令本身不任意連網。

::: warning 這份設定適合作為教學起點，實際值仍須依環境調整
正式環境應依資料敏感度、網路政策、組織的 `requirements.toml` 與任務類型調整。不應為了少一次 Approval，就把 Full access 設成長期預設。
:::

### 依任務切換 Config 設定

下面三種設定沿用相同欄位，只調整任務需要的部分。

<MediaTabs
  class="permissions-recipe-tabs"
  aria-label="依任務切換 Config 設定"
  :items="[
    {
      label: '設定 A',
      title: '陌生專案只讀審查',
      description: '閱讀陌生專案時使用只讀模式，不修改檔案，也不連接外部網路。任務進入實作階段後，再切換模式。',
      commands: [
        {
          label: 'config.toml',
          code: 'model_reasoning_effort = &quot;high&quot;\napproval_policy = &quot;on-request&quot;\napprovals_reviewer = &quot;user&quot;\nsandbox_mode = &quot;read-only&quot;\nweb_search = &quot;disabled&quot;'
        }
      ],
      note: '適合了解陌生專案、程式碼 review 與風險盤點。'
    },
    {
      label: '設定 B',
      title: '一般文件或程式修改',
      description: '適用於多數互動式工作：workspace 內可以持續修改；需要跨目錄或讓命令連網時，再決定是否放寬權限。',
      commands: [
        {
          label: 'config.toml',
          code: 'approval_policy = &quot;on-request&quot;\napprovals_reviewer = &quot;user&quot;\nsandbox_mode = &quot;workspace-write&quot;\nweb_search = &quot;cached&quot;\n\n[sandbox_workspace_write]\nnetwork_access = false'
        }
      ],
      note: '適合一般文件或程式修改，以及需要逐步核對結果的任務。'
    },
    {
      label: '設定 C',
      title: '固定的跨目錄或網路任務',
      description: '額外目錄或網路存取反覆出現、範圍固定且來源可信時，才適合寫成長期設定；一次性需求仍保留 Approval。',
      commands: [
        {
          label: 'config.toml',
          code: 'approval_policy = &quot;on-request&quot;\napprovals_reviewer = &quot;user&quot;\nsandbox_mode = &quot;workspace-write&quot;\nweb_search = &quot;live&quot;\n\n[sandbox_workspace_write]\nwritable_roots = [&quot;/absolute/path/to/shared-docs&quot;]\nnetwork_access = true'
        }
      ],
      note: '適用於目錄、網域、命令與資料來源均已確認可信的工作流程。'
    }
  ]"
/>

## 重點整理

- **Config** 決定設定層級、優先順序與各欄位的值。
- **Model** 影響能力、品質、速度與推理量，但不會增加檔案或網路權限。
- **Permission** 設定決定何時詢問，以及由誰判斷：`approval_policy` 控制前者，`approvals_reviewer` 控制後者。
- **Sandbox** 限制實際可讀、可寫與可連線的範圍；Auto-review 不會擴大這些限制。
- **風險取決於設定組合**：`never` 不等於 Full access；只有 `danger-full-access + never` 才會移除 Sandbox 限制並停止詢問。
- **放寬權限時**，優先增加單一 writable root 或明確網域；應避免因一次性需求永久移除 Sandbox。

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

下一章將介紹如何把可重複的專業工作流程整理成可視需要載入的 [Skills](/advanced/skills)。
