# Codex 進階：從 Codebase 理解到可治理的專業開發工作流

> [!NOTE]
> 本文件是進階能力與 Demo 的詳細素材庫，不是現行 60 分鐘課表。最新課程順序、Demo 拆分與講師分工請以 [`agenda.md`](agenda.md) 為準。

本課使用兩個彼此獨立的 Demo，避免讓學員誤以為 Codebase 理解只適用於 Databricks：

1. **Demo A／一般 Codebase 理解**：接手陌生的 Python API Repository，先建立有程式碼證據的系統地圖。
2. **Demo B／Databricks 專業開發**：安裝並使用官方 [`databricks/databricks-agent-skills`](https://github.com/databricks/databricks-agent-skills)，建立 Genie Space，並完成一個以 LangChain agent 為核心的 Databricks App。

課程主線改為：

> **先用一般專案練習 Codebase 理解 → 將規則放入 AGENTS 與 Config → 依序認識 Skill、Plugin、MCP、Worktree、Hooks → 在隔離環境中建立 Genie Space 與 LangChain agent App → 回到選型框架**

`databricks-agent-skills` 提供 `databricks-core`、`databricks-apps-python`、`databricks-apps`、`databricks-app-design` 等穩定 Skills；`databricks-genie` 目前屬 experimental。Codex Plugin 會再帶入 prompt routing、session context 與 auth-failure hints Hooks。Skills 主要透過 Databricks CLI 與相關 SDK／工具完成工作，MCP 不是使用這套 Skills 的必要前提。([Databricks Agent Skills][15])

這樣才會和基礎課形成清楚差異：

| 基礎課                 | 進階課                              |
| ------------------- | ------------------- |
| Codex 可以做什麼         | 陌生 Codebase 要怎麼先建立可信理解                 |
| 如何下指令               | 如何把規範、權限與驗證放在正確層級                   |
| 如何完成單次任務            | 如何建立可重複、可審查的資料開發工作流                |
| 使用既有 Skills／Plugins | 安裝並使用官方 Databricks Skills／Plugin 建立 Genie-powered agent App |
| 人工要求驗收              | 使用 Hooks、最小權限與工作區隔離建立確定性治理          |
| 單一 Thread           | Worktree／平行任務與安全的非 Production Databricks 操作 |

---

# 一、課程學習目標

完成一小時課程後，學員應能：

1. 先不修改程式，從 README、設定、入口與測試建立附程式碼證據的 Codebase map。
2. 使用 `/init` 建立 `AGENTS.md`，並從初始版本改善成可維護的專案規範。
3. 分辨全域、Repository、子目錄與 Override 層級的 `AGENTS.md`。
4. 使用 `config.toml` 設定模型、推理強度、權限、Approval、Sandbox、功能開關與 MCP，並理解各層設定的優先順序。
5. 安裝官方 Databricks Skills 或 Codex Plugin，理解 `databricks-core` 與產品 Skill 的父子關係。
6. 使用 `databricks-apps-python` 與 `databricks-apps` 的 Genie workflow，在 Dev／Staging 建立 Genie Space，並將它接入 LangChain agent App。
7. 分辨何時直接使用官方 Skill、何時以 `AGENTS.md` 補充專案規則、何時才需要 `$skill-creator` 或 `@plugin-creator` 建立團隊資產。
8. 理解 MCP 是外部資料／工具連線層，不是 `databricks-agent-skills` 的必要依賴，並能限制其工具與 Approval 行為。
9. 判斷何時應使用 Local、Worktree 或平行任務，並使用官方 Plugin Hooks 或 Repository Hook 執行路由、提示與確定性驗證。

Codex 目前支援全域與專案層級的 `AGENTS.md`、使用者與專案層級的 `config.toml`、Skills、Plugins、MCP、Worktrees 與生命週期 Hooks；但部分功能會受客戶端版本、Workspace 管理設定與專案信任狀態影響。([Learn ChatGPT][1])

---

# 二、建議的 60 分鐘 Agenda

| 時間 | 模組 | 示範內容 | 學員帶走的能力 |
| ---: | --- | --- | --- |
| 0–4 | **能力地圖** | 先定位 Prompt、`AGENTS.md`、Config，以及五種擴充能力 Skill、Plugin、MCP、Worktree、Hooks；暫不展開操作。 | 建立共同語言與課程路線。 |
| 4–12 | **Demo A：一般 Codebase 理解** | 使用非 Databricks 的 Python API 專案，以 read-only Prompt 追蹤 request → service → persistence → response，附檔案證據與未知事項。 | 安全理解陌生 Repository，並發現需要長期保存的規則。 |
| 12–18 | **AGENTS.md** | 將 Demo A 的重複規則整理成 Repository 指示、驗證命令、變更邊界與分層規範。 | 知道 Codex 在這個 Repository 應如何工作。 |
| 18–23 | **Config** | 設定 Sandbox、Approval、Profile 與專案信任；區分 Codex Profile 和 Databricks CLI Profile。 | 知道 Codex 最多可以怎麼執行。 |
| 23–27 | **Skill** | 說明 Skill 是可重用工作方法；檢視 `databricks-core`、`databricks-apps-python`、`databricks-apps` 的路由關係，以及 experimental `databricks-genie` 何時才需要。 | 能為產品任務選擇正確 Skill。 |
| 27–30 | **Plugin** | 安裝官方 Databricks Plugin，理解它如何一起散布穩定 Skills 與 Hooks；Creator／Marketplace 留到後文延伸。 | 知道 Plugin 解決安裝、版本與團隊分享。 |
| 30–33 | **MCP** | 說明 MCP 是外部資料／動作連線；Databricks Skills 主要走 CLI／SDK，內部 Catalog MCP 僅作選配案例。 | 不再混淆 Skill 的方法與 MCP 的連線。 |
| 33–36 | **Worktree** | 建立 Demo B 專用 Worktree，說明隔離、Diff 與 Handoff。 | 在不污染 Local 的情況下進行平台開發。 |
| 36–39 | **Hooks** | 用 `/hooks` 審查官方 Plugin Hooks，並說明 Repository Stop Hook 如何執行確定性檢查。 | 知道哪些檢查不能只靠 Prompt 記住。 |
| 39–56 | **Demo B：Genie Space ＋ LangChain agent App** | 用官方 Skills 探索資料、建立／重用 Genie Space，Scaffold Python Databricks App，讓 LangChain agent 以 Genie Conversation API 為工具；最後在同一 Demo 內查看 Diff、測試與 Apps validation。 | 將七個模組整合成一條可觀察的 Codex 工作流。 |
| 56–60 | **團隊化選型與 Q&A** | 判斷公司規範應放 `AGENTS.md`、subskill、Plugin、MCP 或 Hook，並回顧兩個 Demo。 | 建立可遷移的選型能力。 |

## 為什麼採用「先案例、依序介紹、再整合」

Demo B 會同時用到 Skill、Plugin、Worktree 與 Hooks，因此應放在這些能力介紹之後；但整堂課也不應從 0 分鐘開始連續講功能。建議採用 **先案例引出需求、依正文順序介紹、最後整合**：

1. 開場只用 4 分鐘建立能力地圖，不在此時展開所有設定細節。
2. Demo A 先讓學員遇到真實問題，再將重複規則依序回收到 AGENTS 與 Config。
3. Skill、Plugin、MCP、Worktree、Hooks 各自用一個問題與一個操作介紹，順序和後續正文完全一致。
4. Demo B 不再插入新名詞，而是把前面七個模組串成一條完整路徑。

這種節奏保留完整功能內容，也避免功能介紹變成與實作分離的名詞清單。

## 「驗證與交付」不保留為獨立時段

驗證本身不是獨立的 Codex 擴充能力，因此不再安排一個抽離情境的「驗證與交付」模組。必要動作仍保留在 Demo B 的最後 2–3 分鐘，並明確回扣到 Codex：

* `AGENTS.md`／Skill 定義應執行哪些測試與 validation。
* Stop Hook 在 Codex 宣稱完成前確定性觸發檢查。
* Worktree 提供隔離的 Diff，並支援 review 後再 Handoff。
* Approval／Sandbox 決定 validation 可以做到哪裡；課堂停在 Dev validation，不 deploy。

因此它是 Demo B 的閉環，不是第八個功能模組。

## 時間設計原則

一小時內不適合：

* 同時完整示範 Genie、Databricks Apps 與 Lakeflow Jobs；本版只做 Genie-powered LangChain agent App，Jobs 不進主線。
* 從零寫完整 MCP Server、複雜 Databricks 專案或完整 Plugin manifest。
* 手工建立複雜 Plugin manifest，或完整講解所有 `config.toml` 欄位。
* 實際完成大型 coding task，或對 Production Databricks 執行任何查詢、部署、寫入或刪除。
* 深入示範十種 Hook event。

因此課堂應以「預先準備好的 Repository，逐步新增設定」進行，Databricks Apps CLI／Skills 負責 Scaffold，講師把時間放在：

* Codebase 結論是否能回指檔案證據，而非模型猜測。
* 為什麼這樣設定，以及應該放在哪一層。
* 官方 Databricks Skill 如何依序完成 Genie Space 與 Python agent App 工作流。
* MCP 為何是選配的外部連線，而不是 Databricks Skills 的前置依賴。
* 如何驗證設定、Skill 與安全邊界真的生效。

---

# 三、兩個獨立 Demo Case

兩個 Demo 不共用情境，只共用同一套 Codex 選型框架。

## Case A：一般 Codebase 理解

使用一個小型 Python API／內部工單服務，刻意不包含 Databricks：

```text
support-ticket-service/
├── AGENTS.md
├── README.md
├── pyproject.toml
├── src/
│   ├── api/routes.py
│   ├── services/triage.py
│   ├── repositories/tickets.py
│   └── models/ticket.py
└── tests/
    ├── test_routes.py
    └── test_triage.py
```

任務是追蹤「建立一張支援工單」的完整路徑，產生 Codebase map、檔案證據、未知事項與最小驗證計畫。Demo A 不需要 Databricks CLI、Workspace、Skill 或 MCP。

## Case B：建立 Genie Space 與 LangChain agent App

Demo B 使用已準備好的 Unity Catalog 測試資料與 Dev SQL Warehouse。現場建立或重用一個 Genie Space（Databricks 新版文件亦稱 Genie Agent），再建立 Python Databricks App；App 內的 LangChain agent 將 Genie Conversation API 包成 `ask_genie` tool。Databricks Apps 可將 Genie resource 的 Space ID 注入環境變數，而 Databricks custom agents 支援 LangChain 等 Python authoring libraries。([Databricks Apps Genie resource][17])([Databricks custom agents][18]) Repository 可使用：

```text
databricks-genie-agent-app/
├── AGENTS.md
├── README.md
├── pyproject.toml
├── app.yaml
├── databricks.yml
├── genie/
│   └── genie_space.json
├── agent_server/
│   ├── agent.py
│   └── tools/genie.py
├── app.py
└── tests/
    ├── test_agent.py
    └── test_genie_tool.py
```

主 Demo 任務：

> 使用 `databricks-core`、`databricks-apps-python` 與 `databricks-apps`，在新的 Worktree 中探索指定測試表，依 Apps Skill 的 Genie workflow 建立或重用 Genie Space，再將它接入 LangChain agent App。只執行本機測試與 `databricks apps validate --profile <dev-profile>`；不得使用 Production、deploy App 或授予廣泛權限。

17 分鐘的主 Demo 僅保留以下最小範圍：

| 階段 | 使用 Skills | 現場成果 |
| --- | --- | --- |
| Genie Space | `databricks-core` → `databricks-apps` 的 Genie workflow | 探索兩個已準備好的 UC tables，建立／重用 Space，加入 2 個 sample questions 與 1 組 text instructions。 |
| LangChain agent App | `databricks-core` → `databricks-apps-python`；平台資源與 validation 搭配 `databricks-apps` | Scaffold 最小 Python App，實作 `ask_genie` tool，透過環境變數取得 Space ID。 |
| Codex 閉環 | AGENTS／Config／Worktree／Hooks | 查看 Diff、單元測試與 Apps validation；不 deploy。 |

主 Demo 只依賴穩定 Skills。`databricks-genie` 目前屬 experimental，僅在要深入做 Space export／import、conversation testing 或進階 tuning 時顯式安裝；它不是現場成功條件。若建立 Space 失敗，就改用講師預先建立的 Dev Space，仍完成 App wiring 與 validation。需要 Genie chat UI 設計時再搭配 `databricks-app-design`。([Databricks Agent Skills][15])

官方 stable Skills 已包含 Python Apps 與 App platform workflows；experimental Skills 不會被預設安裝，需顯式 opt-in。([Databricks Agent Skills Docs][16])([Databricks Agent Skills][15])

---

# 四、Demo 1：先理解 Codebase，再決定能不能動

這個 Demo 放在 4 分鐘能力地圖之後、詳細功能說明之前。先用當次 Prompt 限定 read-only 與輸出格式；完成後再帶學員判斷哪些限制應升級成 `AGENTS.md` 或 Config。

## 4.1 Demo 任務與完成標準

給學員的任務卡：

> 「使用者建立支援工單後，優先級偶爾與預期不同。請先追蹤 HTTP request 到資料寫入與 response 的完整路徑，指出可能影響 priority 的模組、測試與目前無法證明的事項。**不要修改檔案。**」

成功標準不是得到一個漂亮的架構圖，而是得到一份能讓 reviewer 查核的結果：

1. Repository map：主要目錄、入口與責任。
2. Request flow：route → validation／model → service → repository → response。
3. 每個結論的檔案路徑與程式位置。
4. 已確認、合理推測與需要人工確認的內容分開列示。
5. 建議的最小驗證範圍；尚不提出修改。

## 4.2 現場操作腳本

先讓 Codex 建立閱讀計畫，再依它列出的順序開啟檔案；講師不要先告訴它答案。

```text
先不要修改任何檔案。

請閱讀 README、AGENTS.md、pyproject.toml、src/ 與 tests/。
針對「建立工單後 priority 偶爾不符預期」，建立 Codebase map
並追蹤 request → validation/model → service → repository → response。

輸出請包含：
1. 建議閱讀順序與理由
2. 主要模組、API 入口、服務層、資料存取層與測試責任
3. request → persistence → response 的完整流程
4. 每個結論可回指的檔案與程式位置
5. 已確認、推測、待人工確認三類事項
6. 最小驗證計畫；不要修改程式
```

講師在輸出後追問兩題，避免 Demo 變成單向展示：

* 「哪個檔案最能證明 API route 實際呼叫哪個 service method？」
* 「哪個結論只是從檔名推論，而不是有程式碼證據？」

## 4.3 本段要帶出的工作法

| 不佳做法 | 課堂示範的做法 |
| --- | --- |
| 一開始就說「修好 priority bug」 | 先限定不修改，建立閱讀順序與證據標準。 |
| 只產生概念性架構圖 | 對每個節點與連線附 Repository 證據；沒有證據就標示待確認。 |
| 看到函式名稱就猜測整條流程 | 沿著實際 import、呼叫與測試逐步追蹤。 |
| 將長期規則都重複寫進 Prompt | 將可重複的規則在下一段整理到 `AGENTS.md` 或 Skill。 |

本段結束時，收束出一份可查核的 Codebase map 即可。Demo B 會切換到另一個 Repository，刻意展示同一套 Codex 工作法如何套用到專業平台開發。

---

# 五、模組一：`AGENTS.md` 從 `/init` 到 Best Practice

## 5.1 先用 `/init` 建立初始版本

Codex CLI 的 `/init` 可建立給 Codex 使用的 `AGENTS.md`；課堂重點不應停在「產生成功」，而應讓學員知道生成內容只是起點。([OpenAI Developers][2])

示範順序：

```text
/init
```

接著要求 Codex：

```text
檢查目前 Repository 的 README、pyproject.toml、src、
tests 與 CI 設定。

請審查剛建立的 AGENTS.md，指出：

1. 哪些指令並不存在。
2. 哪些規範過於抽象。
3. 哪些重要資料規則尚未包含。
4. 哪些規則應移到子目錄。
5. 哪些內容不應放在 AGENTS.md。
```

## 5.2 Best Practice 結構

建議課堂建立以下版本：

```markdown
# Repository purpose

This repository exposes an API for creating and triaging support tickets.

## Repository map

- `src/api/`: HTTP routes and request/response models
- `src/services/`: ticket triage and business rules
- `src/repositories/`: persistence adapters
- `tests/`: unit and API tests
- `output/`: generated artifacts; do not commit

## Setup

- Install dependencies: `uv sync`
- Run API locally: `uv run uvicorn src.main:app --reload`

## Validation commands

- Unit tests: `uv run pytest`
- Lint: `uv run ruff check .`
- Type check: `uv run mypy src`

## Change boundaries

- Do not change the public API response schema without explicit approval.
- Do not modify production database or authentication settings.
- Do not add dependencies unless required by the task.
- Prefer the smallest change that satisfies the requirement.

## Data rules

- Never use real customer data in tests.
- Preserve ticket audit timestamps and actor identity.
- Priority changes must be traceable to a documented triage rule.

## Definition of done

Before declaring completion:

1. Report every changed file.
2. Run relevant tests.
3. State whether the API contract or persistence schema changed.
4. List assumptions and remaining risks.
```

## 5.3 分層設計

Codex 會從全域設定開始，再由 Repository 根目錄一路讀到目前工作目錄；較接近工作目錄的指示會排在後面並覆蓋較廣泛的規則。`AGENTS.override.md` 的優先度高於同層的 `AGENTS.md`。([Learn ChatGPT][1])

課堂展示：

```text
~/.codex/AGENTS.md
        ↓
repo/AGENTS.md
        ↓
repo/src/repositories/AGENTS.override.md
```

`src/repositories/AGENTS.override.md`：

```markdown
# Repository-layer rules

- Run `uv run pytest tests/test_routes.py tests/test_triage.py` after changing this directory.
- Never execute a command against the production database.
- Do not add or alter a database migration without explicit approval.
```

## 5.4 驗證，而不是假設已載入

```bash
codex --ask-for-approval never \
  "Summarize the active project instructions and list their source files."
```

也可以從子目錄執行：

```bash
codex --cd src/repositories --ask-for-approval never \
  "Show which instruction files are active."
```

官方文件也建議用這類方式確認指示來源與覆蓋順序。([Learn ChatGPT][1])

## 5.5 課堂要強調的反例

不佳的 `AGENTS.md`：

```markdown
- Write good code.
- Follow best practices.
- Make sure everything works.
- Be careful.
```

改善原則：

* 寫出真正存在的指令。
* 寫出不可違反的業務限制。
* 寫出完成定義。
* 避免放一次性任務。
* 避免複製整份 README。
* 子系統規則放到最接近的目錄。

---

# 六、模組二：`config.toml`

## 6.1 先教「設定放在哪裡」

Codex 的使用者設定位於：

```text
~/.codex/config.toml
```

Repository 設定位於：

```text
<repo>/.codex/config.toml
```

專案層級設定只有在使用者信任該專案時才會載入；設定優先序大致是 CLI override、專案設定、指定 Profile、使用者設定、系統設定及內建預設。([OpenAI Developers][3])

建議課堂使用這個分類：

| 設定                             | 放置位置                             |
| ------------------------------ | -------------------------------- |
| 個人慣用模型、UI 行為                   | `~/.codex/config.toml`           |
| Repository 的 MCP、Hooks、Feature | `.codex/config.toml`             |
| 深度 Review／快速修改等模式              | `~/.codex/<profile>.config.toml` |
| 公司強制政策                         | 管理式 `requirements.toml`          |
| 單次臨時變更                         | CLI flag 或 `--config`            |

## 6.2 課堂版 `config.toml`

```toml
# ~/.codex/config.toml

model = "gpt-5.6"
model_reasoning_effort = "high"

approval_policy = "on-request"
default_permissions = ":workspace"

web_search = "disabled"

[features]
hooks = true
multi_agent = true
remote_plugin = true
```

目前官方範例將模型、Approval、Sandbox／Permission、Web Search、推理強度及 Feature flags 都列為 `config.toml` 可管理的項目。([OpenAI Developers][3])

### 必須講清楚的兩個問題

#### Approval：什麼時候要問人？

```toml
approval_policy = "on-request"
```

#### Permission／Sandbox：它最多能做什麼？

```toml
default_permissions = ":workspace"
```

內建 Permission Profile 包括：

```text
:read-only
:workspace
:danger-full-access
```

Permission Profile 同時管理檔案系統與網路邊界；`default_permissions` 不應與 `sandbox_mode` 或 `[sandbox_workspace_write]` 混用。([OpenAI Developers][4])

課堂上可以用一句話區分：

> Approval 是「要不要問」；Permission 是「就算批准了，最多能去哪裡」。

## 6.3 Profile 設計

不要再使用舊式的：

```toml
[profiles.review]
```

目前 Profile 採獨立檔案，例如：

```text
~/.codex/review.config.toml
~/.codex/build.config.toml
```

官方目前的 Profile 機制是透過 `--profile` 疊加獨立 TOML 檔案。([OpenAI Developers][5])

### Review Profile

```toml
# ~/.codex/review.config.toml

model_reasoning_effort = "xhigh"
default_permissions = ":read-only"
web_search = "disabled"
```

執行：

```bash
codex --profile review
```

### Build Profile

```toml
# ~/.codex/build.config.toml

model_reasoning_effort = "high"
default_permissions = ":workspace"
approval_policy = "on-request"
```

執行：

```bash
codex --profile build
```

這能讓學員理解：

* Review 不需要寫入權限。
* Coding 可以寫 Workspace，但不應預設 full access。
* 不同工作類型不該共用同一套權限。

### 不要把 Codex Profile 與 Databricks CLI Profile 混為一談

* `codex --profile build`：選擇 Codex 的模型、Permission、Approval 等執行設定。
* `databricks ... --profile class-dev`：選擇 Databricks Workspace authentication profile。

Demo B 必須先列出 Databricks Profiles，由講師明確指定 Dev／Staging Profile；不得讓 Agent 根據名稱自行猜選，也不要把 token 寫入 `config.toml` 或 `AGENTS.md`。([Databricks Agent Skills][15])

## 6.4 Feature flags 不要全部講

課堂只挑三個：

```toml
[features]
hooks = true
multi_agent = true
remote_plugin = true
```

目前這些設定分別用於啟用 Hooks、多 Agent 協作工具及遠端 Plugin Catalog。([OpenAI Developers][6])

其他實驗性功能只說明：

> 查看當下版本的 Configuration Reference，不要把整份 Sample Config 複製到公司專案。

---

# 七、模組三：Skill——可重用的工作方法

## 7.1 先理解 Skill，再決定安裝方式

Skill 定義「遇到某類任務時應依什麼順序閱讀、決策、實作與驗證」。它不是外部連線，也不是權限邊界。Databricks CLI 可只安裝 Skills：

```bash
databricks aitools install
```

Databricks CLI 會偵測 Codex 等支援的 coding agent；也可選擇特定 Skill 或使用 project scope。這條路徑適合只需要 Skills、或需要安裝 experimental Skill 的情況。([Databricks Agent Skills Docs][16])

若課後要深入進行 Genie Space authoring／tuning，可另外顯式安裝 experimental Skill：

```bash
databricks aitools install databricks-genie --experimental
```

主 Demo 不依賴這個 experimental Skill；`databricks-apps` 已提供 Genie-powered App 所需的建立／重用 Space 與 resource wiring 流程。下一章再以 Codex Plugin 安裝穩定 Skills 與官方 Hooks。課前必須固定 Plugin／Skill 版本、確認 Databricks CLI 與 OAuth／Profile 可用，並準備一份無 Workspace 連線時仍可展示的預錄輸出。

## 7.2 Skill 路由：先載入 `databricks-core`，再載入產品 Skill

`databricks-core` 是所有 Databricks 工作的 parent／entry point，負責 CLI、authentication、profile selection 與 data exploration；產品開發再搭配對應 Skill。([Databricks Agent Skills][15])

| 開發任務 | 建議 Skills | 本課用途 |
| --- | --- | --- |
| 驗證 CLI／Profile、探索資料 | `databricks-core` | 所有 Databricks 任務的 parent／entry point。 |
| Python／LangChain Databricks App | `databricks-core` → `databricks-apps-python` | 建立 Python App 與 agent runtime。 |
| Genie-powered App 與平台資源 | `databricks-core` → `databricks-apps` | 建立／重用 Space、讀取 manifest、設定 Genie resource、執行 Apps validation。 |
| 深入 Genie authoring／tuning | experimental `databricks-genie` | 選配：Space export／import、conversation test 與進階 tuning。 |
| Chat／Genie UI | `databricks-app-design` | 規劃 chat states、來源與錯誤呈現；非本課主要 coding 範圍。 |
| Lakeflow Jobs | `databricks-core` → `databricks-jobs` ＋ `databricks-dabs` | 保留為產品 Skill 選型例，不進 Demo B 主線。 |

Demo B 的載入順序固定為 `databricks-core` → Genie／Apps 產品 Skills，不讓 Agent 從名稱猜測 Databricks authentication profile。

## 7.3 何時才需要 `$skill-creator`

不要複製或改寫官方 Skill 來加入公司規範。先依範圍選擇：

| 需求 | 放置位置 |
| --- | --- |
| 這個 Repository 永遠不得 deploy Production | `AGENTS.md`。 |
| 本次 Demo 只能 validate、不能 deploy／run | 當次 Prompt。 |
| 所有公司 Databricks 專案都要套用同一套 naming／cost／security review | 建立一個以官方產品 Skill 為 parent 的公司 subskill。 |
| 公司 subskill、MCP 與驗證 Hook 要一起給團隊安裝 | 內部 Plugin。 |

若真的需要公司 subskill，再使用 `$skill-creator` 建立精簡的 `company-databricks-standards`，讓它引用既有產品 Skill，而不是將上游內容整份複製。官方 repository 也建議較窄的變體以 frontmatter `parent` 宣告父 Skill，保留上游 Skill 的穩定性。([Databricks Agent Skills][15])

## 7.4 安裝與建立的精確說法

* Databricks CLI：可選擇個別 Skills，且能安裝 experimental Skills。
* 官方 Databricks Codex Plugin：下一章透過 Codex Plugin Marketplace 安裝穩定 Skills 與 Hooks。
* `$skill-creator`：建立公司或 Repository 自有 Skill。
* `@plugin-creator`：把內部 Skills、MCP、Hooks 等封裝成團隊可安裝能力。

---

# 八、模組四：Plugin Creator 與 Marketplace

## 8.1 先示範「安裝官方 Plugin」，再講「建立內部 Plugin」

Databricks Demo 的第一個 Plugin 教學點不是 Creator，而是消費一個已維護的官方能力包：

```text
codex plugin marketplace add databricks/databricks-agent-skills
codex plugin add databricks
```

官方 Codex Plugin 會一起安裝穩定 Skills 與三個 Hooks。這一章先查看 Plugin 內容與 Skills 清單；`/hooks` 的 Trust Review 留到 Hooks 章，讓操作順序和概念順序一致。([Databricks Agent Skills][15])

這讓學員先理解 Plugin 的價值在於安裝、版本與分享，再討論什麼情況值得自行封裝。

## 8.2 何時從 Skill 升級成內部 Plugin

| 情況                | 使用 Skill | 使用 Plugin |
| ----------------- | -------: | --------: |
| 單一 Repository 使用  |        ✓ |           |
| 個人反覆使用            |        ✓ |           |
| 多個 Skill 一起安裝     |          |         ✓ |
| Skill 搭配 MCP      |          |         ✓ |
| 需要生命週期 Hooks      |          |         ✓ |
| 給整個團隊安裝           |          |         ✓ |
| 需要版本與 Marketplace |          |         ✓ |

Plugin 可以封裝 Skills、MCP-backed App、MCP Server 設定、Hooks 等可重用能力。([OpenAI Developers][9])

## 8.3 使用 `@plugin-creator`

提示詞：

```text
@plugin-creator

Create an internal plugin named company-databricks-toolkit.

Include:

- A company-databricks-standards subskill that builds on the official Databricks product skills
- A placeholder MCP configuration for the internal data catalog, not for duplicate Databricks CLI functionality
- A Stop hook that runs the repository verification script
- A local repository marketplace entry for testing

Do not publish it publicly.
```

`@plugin-creator` 可以建立 `.codex-plugin/plugin.json`，並協助建立本地 Marketplace entry。([Learn ChatGPT][10])

基本結構：

```text
plugins/company-databricks-toolkit/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── company-databricks-standards/
├── hooks/
│   └── hooks.json
└── .mcp.json
```

## 8.4 Repository Marketplace

```text
.agents/plugins/marketplace.json
```

概念範例：

```json
{
  "name": "company-data-platform-plugins",
  "interface": {
    "displayName": "Data Platform Plugins"
  },
  "plugins": [
    {
      "name": "company-databricks-toolkit",
      "source": {
        "source": "local",
        "path": "./plugins/company-databricks-toolkit"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Data Engineering"
    }
  ]
}
```

Repository Marketplace 與個人 Marketplace 可以將一個或多個 Plugin 組成可安裝清單；Plugin 修改後通常需要重新整理或重新啟動相關客戶端，並在新 Session 使用新增的能力。([Learn ChatGPT][10])

---

# 九、模組五：MCP 加入與權限限制

## 9.1 先說清楚：Databricks Agent Skills 不以 MCP 為必要前提

本課的 Databricks Demo 以官方 Skills、Databricks CLI、Bundle／Apps tooling 為主。不要為了硬塞 MCP 而架設一個重複 Databricks CLI 功能的 Server。

MCP 適合用在任務另外需要的公司系統，例如：

* 讀取內部資料產品 Catalog 或 data contract。
* 查詢 Jira／ServiceNow 變更單與核准狀態。
* 取得公司政策、指標字典或資源 owner。

## 9.2 不要只教「連得上」

MCP 模組應包含四個問題：

1. 這個 Server 提供哪些工具？
2. 哪些工具真的需要開放？
3. 哪些操作需要 Approval？
4. Token、OAuth 或環境變數如何管理？

Codex 的 MCP 設定可放在 `~/.codex/config.toml` 或可信任專案的 `.codex/config.toml`；桌面 App、CLI 與 IDE Extension 可共用該設定。([OpenAI Developers][11])

## 9.3 示範加入內部 Catalog Server

CLI：

```bash
# 僅使用公司核准、read-only 的 Server。
# `company_data_catalog_mcp` 為教材佔位名稱，現場改為實際命令。
codex mcp add data-catalog -- \
  python -m company_data_catalog_mcp
```

檢查：

```bash
codex mcp list
```

Session 內：

```text
/mcp
```

## 9.4 `config.toml` 最小權限範例

以下為概念範例；MCP 的實際工具名稱依公司 Server 而異，必須先以 `codex mcp list` 與該 Server 文件確認，不能照抄未驗證的工具名稱。

```toml
[mcp_servers.data_catalog]
command = "python"
args = ["-m", "company_data_catalog_mcp"]
enabled = true
required = false

enabled_tools = [
  "search_data_products",
  "get_data_contract",
  "get_metric_definition",
  "get_resource_owner"
]

disabled_tools = [
  "update_metadata",
  "delete_data_product",
  "change_permissions"
]

default_tools_approval_mode = "prompt"
startup_timeout_sec = 10
tool_timeout_sec = 60
```

MCP 設定目前可限制 `enabled_tools`、`disabled_tools`，並設定 Server 或單一工具的 Approval mode。([OpenAI Developers][6])

課程要強調：

> 「MCP 已驗證」不代表「所有 MCP 工具都應自動批准」。

課堂 MCP 範例應優先使用：

* Data product 搜尋。
* Data contract、owner 與指標定義讀取。
* Read-only metadata。

不要在一小時課程中直接示範：

* Production SQL 查詢或寫入。
* 更新 metadata、刪除資料產品或變更權限。
* 將 Token 寫死在設定檔。

---

# 十、模組六：Git Worktree

## 10.1 為什麼數據開發需要 Worktree

適合情境：

* 同時嘗試兩種 agent／tool wiring 實作。
* 一邊修 Bug，一邊產生測試。
* Codex 在背景修改，使用者繼續本機工作。
* 平行執行文件更新、測試補強與主要實作。
* Databricks App scaffold 不應碰到尚未完成的本機修改。

Git Worktree 讓同一 Repository 同時 Checkout 多個工作目錄；Codex 桌面版可建立隔離的 Worktree，並支援將工作在 Local 與 Worktree 間 Handoff。([Git][12])

## 10.2 課堂 Demo

主流程只建立一個 Databricks Demo Worktree；第二個方案用口頭說明平行工作的可能性即可：

### Worktree A

```text
Build or update a Genie Space from the instructor-approved Unity Catalog tables.
Create the LangChain agent Databricks App and wire the Space as a tool.
Run local tests and Apps validation for dev only. Do not deploy.
```

### Worktree B

```text
Try a different LangChain tool schema or chat UI without modifying Worktree A.
Stop after local tests; do not create a second Workspace resource.
```

展示：

* 兩者修改不同工作目錄。
* 可以各自查看 Diff。
* 某個方案失敗時可直接捨棄 Worktree。
* 完成後才建立 Branch、Commit 或 Handoff 到 Local；Handoff 不等於 deploy Databricks。

## 10.3 Local Environment Setup

新 Worktree 常缺少：

* 未被 Git 追蹤的 `.env`。
* Dependencies。
* Build artifacts。
* Virtual environment。

因此可設定 Worktree Setup Script，例如：

```bash
uv sync
cp .env.example .env
uv run pytest --collect-only
```

Databricks CLI 的 profile 選擇、Genie Space 建立與 `databricks apps validate` 留在 Demo 中由講師明確核准，不放進自動 Setup Script。

Codex 的 Local Environment 可以為新 Worktree 自動執行 Setup Script，並定義常用 Run／Test actions。([OpenAI Developers][13])

---

# 十一、模組七：Hooks

這裡必須先區分兩種東西。

## Git Hooks

由 Git 操作觸發，例如：

* `pre-commit`
* `commit-msg`
* `pre-push`
* `post-merge`

適合確保所有開發者都遵守 Git 流程。

## Codex Hooks

由 Codex Agent 生命週期觸發，例如：

* `UserPromptSubmit`
* `PreToolUse`
* `PermissionRequest`
* `PostToolUse`
* `PreCompact`
* `PostCompact`
* `SessionStart`
* `SubagentStart`
* `SubagentStop`
* `Stop`

適合在 Codex Agent loop 中加入確定性檢查。([OpenAI Developers][14])

## 11.1 選擇方式

| 需求                          | 使用                          |
| --------------------------- | --------------------------- |
| Commit 前一定要跑 lint           | Git pre-commit hook         |
| Push 前一定要跑測試                | Git pre-push hook           |
| Codex 收到 Prompt 時掃描 API key | Codex UserPromptSubmit Hook |
| Codex 執行工具前檢查高風險命令          | Codex PreToolUse Hook       |
| Codex 說完成前執行驗證              | Codex Stop Hook             |
| 紀錄 Codex 的工具活動              | Codex PostToolUse Hook      |

## 11.2 Databricks Plugin Hooks 與 Repository Hook 分兩層展示

官方 Databricks Codex Plugin 已帶入三個 fail-open Hooks：

| Plugin Hook | 課堂觀察點 |
| --- | --- |
| Prompt router／`UserPromptSubmit` | Databricks 類 Prompt 會被導向 `databricks-core` 與相符的產品 Skill。 |
| Context primer／`SessionStart` | 提供本機 CLI 版本、profiles 等 session context，不帶出 token。 |
| Auth-failure hint／`PostToolUse` | CLI 出現 authentication 類錯誤時提供修復提示，不自動改寫或重試命令。 |

安裝或更新 Plugin 後，講師用 `/hooks` 展示 Trust Review；這一段不需要自己重寫相同的 routing Hook。([Databricks Agent Skills][15])

Repository 仍可另外提供一個確定性 Stop Hook：

最適合數據部的是 Stop Hook：

```text
Codex 宣稱完成
        ↓
Stop Hook 執行 verify_changes.sh
        ↓
檢查測試、App resource 與敏感資料
        ↓
輸出結果供最終驗收
```

`.codex/hooks.json` 概念：

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/verify_changes.sh"
          }
        ]
      }
    ]
  }
}
```

講師應展示 Hook 首次執行前的 Trust Review。非管理式 Command Hook 需要使用者審查與信任；若 Hook 內容改變，會再次被標記為需要審查。([OpenAI Developers][14])

---

# 十二、Demo B：Genie Space ＋ LangChain agent Databricks App

Demo B 放在七個模組介紹之後，不再加入新名詞；它的任務是讓學員看見每個 Codex 能力如何在同一條工作流中出現。

## 12.1 課前固定條件

為了在 17 分鐘內完成，講師需事先準備：

* 兩個小型、無敏感資料的 Unity Catalog tables，以及一個 Dev SQL Warehouse。
* 一個明確指定的 Databricks Dev profile；不讓 Agent 自動選 Profile。
* 一個已存在的 Dev model endpoint 名稱，供 LangChain agent 呼叫；本課不建立 Model Serving endpoint。
* 一份可建立 Genie Space 的本機 `genie/genie_space.json` 骨架。
* 一個預先建立的 fallback Genie Space；Workspace 連線或 Space 建立失敗時改用它。
* 可在本機執行的 unit tests，外部 SDK 呼叫以 mock 隔離。

本 Demo 不需要公司 MCP。刻意「不使用 MCP」也是選型結果：Databricks 平台工作由官方 Skills 搭配 CLI／SDK 完成；MCP 只在另需內部 Catalog、Jira 或政策資料時加入。

## 12.2 七個模組在 Demo 中的角色

| 能力 | Demo B 中可觀察的行為 |
| --- | --- |
| `AGENTS.md` | 指定 Dev-only、禁止 hard-code token、必要測試與 Apps validation。 |
| Config | 以 Sandbox／Approval 限制外部操作，並區分 Codex Profile 與 Databricks CLI Profile。 |
| Skill | `databricks-core` 先處理 auth／profile／data discovery，再路由到 Genie 與 Apps Skills。 |
| Plugin | 一次提供主 Demo 所需的穩定 Databricks Skills 與官方 Hooks。 |
| MCP | 本次不啟用；藉此示範 MCP 不是 Databricks Agent Skills 的必要依賴。 |
| Worktree | App scaffold、Space JSON 與測試都留在隔離工作目錄，可獨立查看 Diff。 |
| Hooks | Plugin Hook 協助 Skill routing／auth 提示；Repository Stop Hook 執行最後檢查。 |

## 12.3 現場提示詞

```text
Use databricks-core, databricks-apps-python, and databricks-apps for this task.

Work only in the current Worktree and use the instructor-selected Dev profile.
Do not use Production, deploy the app, create a model endpoint, broaden permissions,
write tokens to files, or destroy resources.

Task:
1. Read AGENTS.md, app.yaml, databricks.yml, genie/genie_space.json,
   agent_server/, app.py, and tests/. Confirm the active constraints.
2. Inspect only the two instructor-approved Unity Catalog tables and propose a plan.
3. Ask whether to reuse the fallback Genie Space or create a Dev Space.
   If creating, update genie/genie_space.json with the two tables,
   two sample questions, and one text instruction. Ask for approval before creation.
4. Build the minimal Python Databricks App. Implement a LangChain agent with an
   ask_genie tool that calls the Genie Conversation API. Read GENIE_SPACE_ID and
   the provided model endpoint name from injected configuration; do not hard-code IDs.
5. Bind only the selected Genie resource with CAN_RUN permission.
6. Run mocked unit tests and `databricks apps validate --profile <dev-profile>`.
7. Return the changed-file summary, Diff highlights, validation evidence,
   assumptions, and remaining deployment risks. Stop before deploy.
```

## 12.4 17 分鐘操作節奏

| 時間 | 現場操作 | 教學觀察點 |
| ---: | --- | --- |
| 39–42 | Hook routing、載入 Skills、確認 `AGENTS.md` 與 Dev profile | Codex 先取得方法、規則與權限邊界。 |
| 42–46 | 探索兩個 tables；建立或選擇 Genie Space | Workspace mutation 前出現 Approval；失敗時使用預建 Space。 |
| 46–52 | Scaffold Python App，建立 LangChain agent 與 `ask_genie` tool | Skill 決定實作順序；Space ID 由 App resource 注入。 |
| 52–54 | 檢查 `app.yaml`／`databricks.yml` 與最小權限 | 不把 Token、Space ID 或 Production 設定寫死。 |
| 54–56 | 跑 unit tests、Apps validation、Stop Hook，查看 Worktree Diff | 驗證是 Codex 工作流的閉環，不是額外功能。 |

## 12.5 為什麼驗證留在 Demo 裡

| 證據 | 對應的 Codex 能力 |
| --- | --- |
| 要跑哪些 unit tests／validation | `AGENTS.md` 與產品 Skill。 |
| 檢查是否必定被執行 | Repository Stop Hook。 |
| 允許連哪個 Workspace、是否可 deploy | Config、Approval 與當次 Prompt。 |
| 修改是否能獨立 review／捨棄 | Worktree Diff 與 Handoff。 |

Demo 在 Diff 與 validation evidence 完成後停止。Commit、Handoff 或真正 deploy 是後續人工決策，不占用另一個課程模組。

---

# 十三、貫穿全課的「該放在哪裡」互動題

| 需求                            | 正確位置                             |
| ----------------------------- | -------------------------------- |
| 接手陌生 Repository 時，先列出 request flow、證據與未知事項 | 當次 Discover Prompt；若流程重複出現，再考慮 Codebase Explorer Skill |
| 每次修改 SQL 都要使用 `sqlfluff lint` | `AGENTS.md`；需要強制執行時再加 Hook／CI    |
| Review 任務預設只能讀檔               | `config.toml` Permission Profile |
| 建立 Genie Space 並接入 LangChain agent App | `databricks-core`＋`databricks-apps-python`＋`databricks-apps`；進階 Space tuning 才加 experimental `databricks-genie` |
| 所有公司專案都要套用相同的 Databricks naming／cost review | 以官方 Skill 為 parent 的公司 subskill |
| 將公司 subskill、資料目錄 MCP、Stop Hook 一起給團隊安裝 | 內部 Plugin |
| 讓 Codex 查詢內部 Catalog 的 data contract／owner | MCP |
| 同時嘗試兩種資料模型設計                  | Worktree                         |
| Codex 送出結果前一定要跑 Schema Check  | Codex Stop Hook                  |
| 所有人 Commit 前都必須通過格式檢查         | Git Hook 或 CI                    |
| 單次要求不要修改某個檔案                  | 當次 Prompt，不要寫進全域 Config          |


[1]: https://learn.chatgpt.com/codex/agent-configuration/agents-md "
  Custom instructions with AGENTS.md | ChatGPT Learn
"
[2]: https://developers.openai.com/codex/cli/features?utm_source=chatgpt.com "Codex CLI features"
[3]: https://developers.openai.com/codex/config-basic "
  Config basics | ChatGPT Learn
"
[4]: https://developers.openai.com/codex/permissions?utm_source=chatgpt.com "Permissions | ChatGPT Learn - OpenAI Developers"
[5]: https://developers.openai.com/codex/config-advanced "
  Advanced Configuration | ChatGPT Learn
"
[6]: https://developers.openai.com/codex/config-reference "
  Configuration Reference | ChatGPT Learn
"
[7]: https://learn.chatgpt.com/docs/build-skills "
  Build skills | ChatGPT Learn
"
[8]: https://developers.openai.com/codex/skills "
  Build skills | ChatGPT Learn
"
[9]: https://developers.openai.com/codex/plugins "
  Plugins | ChatGPT Learn
"
[10]: https://learn.chatgpt.com/docs/build-plugins "
  Build plugins | ChatGPT Learn
"
[11]: https://developers.openai.com/codex/mcp "
  Model Context Protocol | ChatGPT Learn
"
[12]: https://git-scm.com/docs/git-worktree "Git - git-worktree Documentation"
[13]: https://developers.openai.com/codex/environments/local-environment "
  Local environments | ChatGPT Learn
"
[14]: https://developers.openai.com/codex/hooks "
  Hooks | ChatGPT Learn
"
[15]: https://github.com/databricks/databricks-agent-skills "Databricks Agent Skills"
[16]: https://docs.databricks.com/aws/en/agent-skills/ "Agent skills for AI coding assistants | Databricks"
[17]: https://docs.databricks.com/aws/en/dev-tools/databricks-apps/genie "Add a Genie Agent resource to a Databricks app | Databricks"
[18]: https://docs.databricks.com/aws/en/agents/agent-framework/build-agents "Use agents on Databricks | Databricks"
