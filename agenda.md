# Codex 內部課程規劃（講師對焦版）

本文件規劃兩堂各 60 分鐘課程：

1. **Codex App：從專案建立到成果交付**——面向一般使用者。
2. **Codex IDE：從 Codebase 理解到可重複的開發工作流**——面向 Data／AI／IT 開發人員。

兩堂共用同一個工作模型：

```text
給定目標與脈絡 → Codex 先規劃 → 執行 → 驗證 → 人員審查 → 交付或沉澱成工作流
```

課堂以實際可用的功能為準。Browser Use、MCP、Plugins、Skills、Image generation、Cloud、Automation、特定 Model 或 Usage 欄位，都必須在課前以公司 Enterprise 測試帳號確認；教材標示為「依 workspace policy／credits 而定」的功能，不作為課程唯一成功條件。

---

## 第一堂：Codex App——從專案建立到成果交付

### 對象與課程目標

- 對象：一般使用者、非開發背景同仁。
- 目標：知道 Codex 與 ChatGPT 的差異，能建立專案、操作 App，並使用 Skills／Plugins 完成可審查的成果。
- 主線：**我有一批資料 → 如何建立專案 → 如何讓 Codex理解資料 → 如何產生簡報與分析成果 → 如何驗收。**

### 60 分鐘 Agenda

| 時間 | 主講 | 協講／轉場 | 內容與故事線 |
|---:|---|---|---|
| 0–5 | A | B | **Codex 是什麼**：用一句話區分 ChatGPT 與 Codex；今天會完成「簡報＋行銷數據分析」兩個成果。 |
| 5–15 | A | B | **App 介面導覽**：Project、Thread、Model、Context、Usage、`@`、`/`、檔案變更與工具活動。實際以公司可見介面為準。 |
| 15–20 | A | B | **如何開始專案**：建立資料夾、區分 source／reference／output；先要求 Codex盤點資料，再進入任務。帶入 Plan、diff、Context compression。 |
| 20–30 | B | A | **Codex 能力擴充**：Skill 是可重複流程；Plugin 是可安裝的能力包；MCP／Connector 是外部工具或資料連線；補充 Automation、Browser Use 與權限邊界。 |
| 30–40 | A | B | **Demo 1：raw 素材 → 簡報**：先產生 agenda，再指定素材與品牌規範，使用 PPT／Image Gen Skill 建立簡報；展示「先規劃、再生成、最後檢查」。 |
| 40–50 | B | A | **Demo 2：Marketing 數據分析**：讀取匿名 CSV／Excel，先做資料品質檢查，再產生洞察、圖表或 Dashboard；展示如何要求計算定義與驗收。 |
| 50–56 | A＋B | — | **成果串接**：從同一個 Project 產出簡報與分析摘要；快速展示課程圖庫 App、M365 Plugin 等可延伸案例。 |
| 56–60 | B | A | **收束與 Q&A**：三個帶走的原則——清楚指定脈絡、先規劃再執行、要求證據再交付；說明課後練習與功能限制。 |

### App 講師分工

**講師 A：使用者體驗與成果製作**

- 主講 Codex App 定位、介面、專案建立與基本操作。
- 操作 `@`、`/`、Plan、diff、Context compression、Model／Usage 顯示。
- 主操作 Demo 1（PPT／Image Gen）。
- 負責時間節奏及從「需求」轉成「成果」的敘事。

**講師 B：能力擴充、分析與審查**

- 主講 Skills、Plugins、MCP／Connector、Automation、Browser Use 的差異。
- 主操作 Demo 2（行銷數據分析）。
- 在 Demo 中扮演 reviewer，追問來源、計算方式、缺漏與驗收條件。
- 負責 Enterprise 功能／credits 限制、備援成果與 Q&A。

### App Demo 最小可行範圍

#### Demo 1：PPT／Image Gen Skill

輸入：一份 raw 素材 Markdown、受眾說明、品牌規範或簡報範例。

流程：

1. 要求 Codex 先提出簡報 agenda，不直接產出檔案。
2. 由講師 B 補充受眾、頁數、不可自行推論的內容。
3. A 指定 Skill 產出簡報與圖片。
4. B 要求逐頁檢查來源、版面、文字溢出與數字一致性。

#### Demo 2：Marketing 數據分析

輸入：完全匿名化的 CSV／Excel。

流程：

1. 先檢查欄位、缺值、重複值與異常值。
2. 明確要求 Codex 說明每個衍生指標的計算方式。
3. 產生一頁分析摘要或簡單 HTML Dashboard。
4. 展示如何追問「這是資料支持的事實，還是推論？」。

課程圖庫 App 適合作為 1 分鐘成果快閃或課後作業，不建議在 60 分鐘內作為第三個完整 Demo。

---

## 第二堂：Codex IDE——從 Codebase 理解到開發工作流

### 對象與課程目標

- 對象：Data／AI／IT 開發人員；已有 Codex 經驗或基本了解。
- 目標：快速熟悉 IDE，讓 Codex先理解陌生 Codebase，再用 Skills、專案文件與驗證流程提高品質與降低重工。
- 主線：**我接手一個陌生 repository → 先建立理解與架構 → 做一個小變更 → 驗證 → Review → 把重複流程沉澱為團隊資產。**

### 60 分鐘 Agenda

| 時間 | 主講 | 協講／轉場 | 內容與故事線 |
|---:|---|---|---|
| 0–3 | A | B | **開場**：只用 3 分鐘定位 App／IDE／CLI；說明本堂直接進入 Codebase 與完整工作流。 |
| 3–10 | A | B | **IDE 快速導覽**：開啟 Codex、目前 editor context、`@`／`/`、Model、Context、diff、terminal；同步說明何時切回 App。 |
| 10–20 | A | B | **Codebase 理解**：先讀 README、AGENTS.md、package／設定、入口與測試；建立閱讀順序與不確定事項，不一開始修改程式。 |
| 20–35 | B | A | **Advanced 設定與 Skills**：`AGENTS.md`、`config.toml`、Plugins、Skills、MCP、Git worktree、Hooks、Skill Creator／Marketplace；聚焦「哪些規則放哪裡」及如何減少重複 Context。 |
| 35–45 | A | B | **Demo 1：Codebase 理解**：追蹤一條主要資料流，列出檔案證據、模組責任與未知事項。 |
| 45–53 | B | A | **Demo 2：架構圖**：使用 diagram／Draw.io MCP 或 Mermaid fallback，建立架構圖並同步 `ARCHITECTURE.md`；要求 Codex反向驗證圖與程式碼一致。 |
| 53–57 | A＋B | — | **完整工作流收束**：Discover → Plan → Implement → Verify → Review → Document；示範 Git checkpoint／diff／PR 交付。 |
| 57–60 | B | A | **Q&A／帶走清單**：提供 `AGENTS.md`、Skill、架構文件與驗證腳本的 starter template。 |

### IDE 講師分工

**講師 A：IDE 操作與 Codebase 探索**

- 主講 IDE 快速導覽及 App／IDE 切換。
- 操作 editor context、`@`／`/`、Model、diff、terminal。
- 主操作 Demo 1：從陌生 repository 建立 codebase map、追蹤資料流。
- 負責示範如何先問、先計畫、再做最小修改。

**講師 B：架構、Skills 與團隊工程化**

- 主講 `AGENTS.md`、`config.toml`、Plugins、Skills、MCP、worktree、Hooks 的責任切分。
- 主操作 Demo 2：架構圖與 `ARCHITECTURE.md`。
- 說明 Skill 如何減少重複 Prompt、無目的探索與重工；同時提醒過大的 Skill 會增加 Context。
- 負責驗證、PR 交付、團隊規範與備援。

### IDE 主 Demo：Codebase 理解 → 架構圖 → 可驗證交付

#### Step 1：Discover

```text
先不要修改程式。
請閱讀 README、AGENTS.md、package files、主要入口與測試設定，
建立這個 repository 的理解計畫。

請列出：
1. 主要模組與責任
2. 主要入口與資料流
3. 外部依賴
4. 建議閱讀順序
5. 目前仍無法由程式碼證明的推測
```

#### Step 2：Trace

```text
請追蹤「使用者送出一次請求」的完整流程：
UI event → API request → validation → service → persistence → response。

每一步附檔案與程式位置；無法證明的內容標示為推測。
```

#### Step 3：Visualize

```text
請使用 diagram／Draw.io MCP；若不可用則使用 Mermaid，
建立目前系統的架構圖，並同步更新 docs/ARCHITECTURE.md。

要求：
- 區分前端、後端、資料儲存與外部服務
- 標示主要 request flow
- 每個節點與連線都要能回指程式碼證據
- 不加入 repository 中不存在的元件
```

#### Step 4：Verify

```text
請重新對照程式碼檢查架構圖與 ARCHITECTURE.md，
列出已確認、推測、及需要人工確認的內容。
不要先修改程式。
```

若時間允許，再加入一個小型 change：要求 Codex提出影響檔案、測試計畫及最小 diff，但不在課堂追求完成大型 Web App。

### IDE Skills／檔案建議

課堂使用以下最小範例，不要一次展示太多 Skill：

```text
repository/
├── AGENTS.md
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   └── adr/
├── .agents/skills/
│   ├── codebase-explorer/SKILL.md
│   ├── architecture-diagram/SKILL.md
│   └── test-and-verify/SKILL.md
└── scripts/
    └── verify.sh
```

責任切分：

- `AGENTS.md`：每個任務都要遵守的專案規則，保持精簡。
- `ARCHITECTURE.md`：穩定、可版本控制的系統地圖。
- Skill：某一類重複任務的流程，例如 codebase exploration、diagram、review。
- `scripts/`：把確定性的檢查交給程式，避免每次重新推理。
- MCP：需要外部系統或工具時才使用，不把外部連線當作基本流程前提。

Skills 的 token／Context 教學重點：

1. 用 Skill 取代每次重貼長 Prompt、模板與檢查清單。
2. `SKILL.md` 只放觸發條件、步驟與輸出要求。
3. 長規範放 `references/`，模板放 `assets/`，可重複檢查放 `scripts/`。
4. 每次只帶入與任務相關的檔案與 Skill。
5. Skill 不是保證省 token；過長或不相關的 Skill 反而會增加 Context。

### 團隊工作流

```text
Discover → Plan → Implement → Verify → Review → Document
```

建議團隊先落地四件事：

- Repository 根目錄有精簡的 `AGENTS.md`。
- `README.md`、`ARCHITECTURE.md`、ADR 與驗證命令可被 Codex讀到。
- PR template 要求說明 Codex 參與範圍、驗證結果、風險與截圖／log。
- 重複出現三次以上的工作才沉澱成 Skill，且要有 owner、版本與測試案例。

---

## 課前準備與功能備援

### App

- PPT／Image Gen Skill：若未開放，使用已產出的 HTML／PPT 及錄影；課堂仍示範輸入、規劃與驗證。
- Marketing 分析：準備 CSV、Excel、已整理的 Markdown 三種輸入格式。
- Browser／MCP：若被 policy 關閉，使用本機檔案與 Mermaid fallback。

### IDE

- 準備一個可在本機啟動的 starter repository。
- 提前建立 `AGENTS.md`、`ARCHITECTURE.md`、測試命令與三個最小 Skills。
- Diagram MCP 不可用時，切換 Mermaid；MCP／DevOps Demo 改為流程圖與預錄結果。
- 建立 Git checkpoint，避免現場 Demo 失敗後無法回復。

### Enterprise 備註

Browser Use、MCP、Plugins、Skills、Image generation、Cloud、Automation、Model、Usage／Credits 等能力可能受 workspace、RBAC、managed configuration、連接器授權及 credits 限制；課程不承諾所有帳號都能使用全部功能。Usage 要區分 Context 使用量與 credits 消耗，並以公司實際可見畫面為準。

---

## 參考資料

### OpenAI 官方

- [Codex 官方文件入口](https://developers.openai.com/codex/)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)：editor context、diff、local／cloud handoff、陌生 Codebase。
- [Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)：Skill、Plugin、MCP 與可重複工作流的區分。
- [ChatGPT desktop app／Codex App](https://learn.chatgpt.com/docs/app)：Project、Browser、Plugins、Slash commands、Usage 等入口。
- [OpenAI：Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)：App、多任務、Skills、Automations、sandbox。
- [OpenAI：Harness engineering](https://openai.com/index/harness-engineering/)：repository-local knowledge、plans、architecture documentation、feedback loops。
- [Codex use cases](https://developers.openai.com/codex/use-cases)：簡報、資料處理、理解大型 Codebase、部署與 CI 等案例。
- [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card-2)：Enterprise credits、token-based／legacy rate card 與用量差異。

### CodexGuide recipes／團隊實務

- [Recipes 總覽](https://codexguide.ai/recipes/)
- [PPT Skill：一句話生成簡報](https://codexguide.ai/recipes/01-ppt-skill-walkthrough)：適合 App Demo；重點是安裝前檢查、補足輸入、產出後驗證。
- [Draw.io MCP：自動繪製架構圖](https://codexguide.ai/recipes/02-drawio-mcp)：適合 IDE 架構圖 Demo；若 MCP 不可用則以 Mermaid fallback。
- [GitHub Actions：CI 失敗自動修復](https://codexguide.ai/recipes/13-github-actions-ci-fix)：適合作為 IDE 課後延伸，包含失敗觸發、最小修復、測試與 PR。
- [Skills 和 Plugins](https://codexguide.ai/advanced/03-skills-plugins-mcp)：參考 `AGENTS.md`／Skill／Plugin／MCP 的分工。
- [AGENTS.md](https://codexguide.ai/advanced/02-agents-md)：參考 repository 規則與團隊共享方式。
- [團隊實踐](https://codexguide.ai/advanced/10-team-playbook)：參考 `AGENTS.md`、測試命令、PR template、安全規則與案例復盤。

CodexGuide 是社群資料；產品功能、權限與官方行為以 OpenAI 目前文件及公司 workspace 實際狀態為準。
