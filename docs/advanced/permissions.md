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
    <p>知道設定應放在哪一層，能從任務需求選擇模型、Approval 與 Sandbox，並讀懂一份日常使用的 <code>config.toml</code>。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>找到正確設定層</strong><span>分辨專案、使用者與 System config 的用途。</span></article>
    <article><strong>設定模型行為</strong><span>理解 model 與 reasoning effort 影響品質、速度與成本。</span></article>
    <article><strong>設定權限決策</strong><span>用 Approval policy 與 Reviewer 決定何時詢問、由誰判斷。</span></article>
    <article><strong>設定技術邊界</strong><span>用 Sandbox、writable roots 與網路設定限制實際能力。</span></article>
  </div>
</section>

<nav class="lesson-flow permissions-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 找到 Config</span>
  <span><b>02</b> 選擇 Model</span>
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

<ol class="permissions-config-stack" aria-label="Codex 三個主要設定層，由高到低">
  <li><b>01</b><span><strong>專案 <code>.codex/config.toml</code></strong><small>設定只屬於這個 Repository 的模型、Sandbox、Approval、MCP、hooks 或 rules；只有受信任的 Repository 會載入，越靠近目前目錄越優先</small></span></li>
  <li><b>02</b><span><strong>使用者 <code>~/.codex/config.toml</code></strong><small>設定跨 Repository 共用的個人預設；模型供應商、LiteLLM Proxy、認證方式與本機偏好應放在這一層</small></span></li>
  <li><b>03</b><span><strong>System config 與內建預設</strong><small>由管理者提供整台機器或組織的共同起點；當上層沒有指定欄位時，Codex 才沿用 system config 或內建預設</small></span></li>
</ol>

可以用「這個設定屬於誰」判斷放置位置：專案團隊共同需要的行為放專案層；只屬於自己的模型服務與工作偏好放使用者層；所有使用者都必須遵循的基準交給 system config 或組織管理政策。上層設定可以覆寫下層預設，但組織的 `requirements.toml` 仍可限制哪些值允許使用。

::: warning Repository trust 是載入條件
不受信任的 Repository 不能用自己的 `.codex/config.toml`、hooks 或 rules 改變 Codex 行為。若設定看似正確卻沒有生效，先檢查目前目錄、設定優先順序與 Repository 是否受信任。
:::

<figure class="permissions-screenshot" aria-labelledby="permissions-shot-config-title">
  <div class="permissions-screenshot__placeholder" role="img" aria-label="待補：Codex App 設定頁中開啟 config.toml 的畫面">
    <span>SCREENSHOT PLACEHOLDER</span>
    <strong id="permissions-shot-config-title">開啟 Config 設定</strong>
    <code>docs/public/images/permissions/config-settings.webp</code>
    <p>拍攝 App 或 IDE 設定頁中開啟 <code>config.toml</code> 的入口；遮蔽使用者路徑、帳號、工作區名稱、環境變數與 Token。</p>
  </div>
  <figcaption>介面入口可能隨版本調整；設定檔的層級與欄位才是本章重點。</figcaption>
</figure>

## 2｜第一步：先設定 Model

先從最容易觀察的兩個欄位開始：選擇模型，以及設定模型願意投入多少推理量。

```toml
# ~/.codex/config.toml
model = "gpt-5.6"
model_reasoning_effort = "high"
```

| 欄位 | 控制什麼 | 不控制什麼 |
| --- | --- | --- |
| `model` | 預設使用的模型與該模型支援的能力 | 不會改變檔案或網路權限 |
| `model_reasoning_effort` | 支援模型的推理投入量；較高通常更適合複雜規劃與分析 | 不保證結果正確，也不會繞過 Approval |

官方文件會隨產品版本更新模型範例，帳號與工作區可用模型也可能不同。如果上例的模型 ID 在你的環境不可用，請從目前的模型選擇器或官方模型文件確認可用值，再修改 `model`。

::: tip 什麼時候不必固定 model？
如果希望 Codex 自動採用目前的預設模型，可以省略 `model`。只有在課程示範、團隊驗證或工作流程需要可重現行為時，才需要明確固定模型與 reasoning effort。
:::

### 透過 LiteLLM Proxy 選擇模型

如果團隊使用 LiteLLM 作為 LLM Gateway，可以把 Codex 指向 LiteLLM 的 OpenAI-compatible Responses API。先在 LiteLLM 的 `config.yaml` 建立對外使用的模型名稱；以下用 `coding-model` 隱藏實際供應商與 deployment：

```yaml
model_list:
  - model_name: coding-model
    litellm_params:
      model: openai/gpt-5.6
      api_key: os.environ/OPENAI_API_KEY
```

接著把 LiteLLM provider 寫進**使用者層** `~/.codex/config.toml`：

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

這段設定的讀法是：Codex 把 `coding-model` 的 Responses API 請求送到 LiteLLM；LiteLLM 再依 `config.yaml` 路由到實際模型。`model` 必須和 LiteLLM 的 `model_name` 相同，`base_url` 則要改成你的 Proxy 位址。

::: warning Provider 設定與 Token 都不要放進專案 Config
專案 `.codex/config.toml` 會忽略 `model_provider` 與 `model_providers` 等主機層設定，因此 LiteLLM provider 應放在 `~/.codex/config.toml`。`env_key` 寫的是環境變數名稱，不是 Token 本身；請在執行環境設定 `LITELLM_API_KEY`，不要把 Proxy key 寫進 TOML 或版本控制。
:::

如果 LiteLLM Proxy 沒有提供 Responses API，或所選的上游模型不支援 Codex 需要的能力，這份設定仍可能無法正常工作；先用 LiteLLM 的 `/responses` 端點驗證模型路由，再交給 Codex 使用。

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

<figure class="permissions-screenshot" aria-labelledby="permissions-shot-selector-title">
  <div class="permissions-screenshot__placeholder" role="img" aria-label="待補：Codex App composer 下方展開權限選擇器的畫面">
    <span>SCREENSHOT PLACEHOLDER</span>
    <strong id="permissions-shot-selector-title">App 權限選擇器</strong>
    <code>docs/public/images/permissions/permissions-selector.webp</code>
    <p>拍攝 composer 下方展開選單的狀態，需同時看見 Ask、Approve for me、Full access 與 Custom；遮蔽專案名稱、帳號與私人路徑。</p>
  </div>
  <figcaption>介面名稱可能調整，仍可用 Approval policy、Reviewer 與 Sandbox 三個欄位理解模式差異。</figcaption>
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

## 7｜依任務切換 Config 配方

以下三種配方都沿用相同欄位，只調整任務真正需要的部分。

### 配方 A｜陌生專案只讀審查

```toml
model_reasoning_effort = "high"
approval_policy = "on-request"
approvals_reviewer = "user"
sandbox_mode = "read-only"
web_search = "disabled"
```

重點是先理解內容，不讓探索階段直接改檔案，也不需要外部網路。若任務後來變成實作，再明確切換模式。

### 配方 B｜一般文件或程式修改

```toml
approval_policy = "on-request"
approvals_reviewer = "user"
sandbox_mode = "workspace-write"
web_search = "cached"

[sandbox_workspace_write]
network_access = false
```

這是多數互動式工作的起點：workspace 內可以持續修改，跨目錄或命令連網時才出現新的決策。

### 配方 C｜固定的跨目錄或網路任務

```toml
approval_policy = "on-request"
approvals_reviewer = "user"
sandbox_mode = "workspace-write"
web_search = "live"

[sandbox_workspace_write]
writable_roots = ["/absolute/path/to/shared-docs"]
network_access = true
```

只有在額外目錄與網路是穩定、反覆出現且來源可信時，才把它們寫成持久設定。一次性需求保留 Approval，通常比永久放寬邊界更容易審查。

<figure class="permissions-screenshot" aria-labelledby="permissions-shot-auto-title">
  <div class="permissions-screenshot__placeholder" role="img" aria-label="待補：Auto-review 拒絕高風險命令的畫面">
    <span>SCREENSHOT PLACEHOLDER</span>
    <strong id="permissions-shot-auto-title">越界請求被拒絕</strong>
    <code>docs/public/images/permissions/auto-review-denied.webp</code>
    <p>使用不含真實憑據的示範命令，保留拒絕原因與狀態；不得讓畫面出現 Token、SSH key、使用者名稱或真實檔案內容。</p>
  </div>
  <figcaption>被拒絕不代表設定失敗；它通常表示 Sandbox 或 Reviewer 正在依預期阻止超出範圍的動作。</figcaption>
</figure>

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
