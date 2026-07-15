---
title: 進階能力學習路線
description: 依序理解規範、權限、能力封裝、外部連線、背景執行、隔離與確定性閘門。
outline: [2, 3]
---

# 進階能力學習路線

完成快速上手後，下一步不是把 Prompt 寫得更長，而是把要求放到正確的位置。Codex 提供多種名稱相近、責任不同的能力；理解它們的先後關係，才能建立可重複、可審查又安全的工作流。

這套順序從最容易理解的文字規範開始，逐步走到能力封裝、外部工具、背景工作、環境隔離與強制閘門。

## 你會學到什麼

完成本章後，你應能：

1. 判斷一項要求該放在 Prompt、`AGENTS.md`、Config、Skill、Plugin、MCP、Scheduled task、Worktree 或 Hook。
2. 分清楚文字規範、技術權限與 lifecycle enforcement。
3. 從使用現有能力，逐步進階到建立、安裝、連接與自動執行。
4. 為背景或平行任務設計最小權限、隔離方式與人工審查點。
5. 驗證每種能力確實生效，而不是只完成設定。

## 先建立一個心智模型

| 需要回答的問題 | 對應能力 | 一句話責任 |
| --- | --- | --- |
| 這次要完成什麼？ | Prompt | 本次任務的目標、輸入與限制 |
| 這個 Repository 長期怎麼工作？ | `AGENTS.md` | 專案規範、真實命令與完成定義 |
| Codex 技術上能做什麼？ | Config／Permissions | Sandbox、Approval、網路與功能設定 |
| 這類任務每次怎麼做？ | Skill | 可重用的工作流程與品質標準 |
| 如何安裝與分享整組能力？ | Plugin | Skills、連線與擴充元件的能力包 |
| 如何取得即時資料或外部 tools？ | MCP | 連接外部 context 與可執行工具 |
| 什麼時候自動重跑？ | Scheduled task | 未來或固定頻率的背景執行 |
| 修改在哪裡隔離執行？ | Worktree | 獨立 Git checkout 與平行工作空間 |
| 哪些規則必須機械式執行？ | Hook | agent lifecycle 的確定性閘門 |

::: tip 由文字走向機制
先用 Prompt 與 `AGENTS.md` 說清楚，再用 Config 建立邊界；流程穩定後封裝成 Skill，需要散布與連線時使用 Plugin／MCP；最後才加入排程、隔離與 Hooks。
:::

## 建議閱讀順序

### 1. [`AGENTS.md`：先說清楚長期規範](/advanced/agents-md)

從最接近 README 的文字檔開始。把 Repository purpose、真實驗證命令、變更邊界與 Definition of Done 寫清楚，讓每次任務都有一致起點。

### 2. [Config、權限與沙盒：建立執行邊界](/advanced/permissions)

接著分清楚「應該怎麼做」與「技術上允許做什麼」。Sandbox、Approval 與管理政策是安裝工具、連接資料和背景執行之前的安全基礎。

### 3. [Skills：把成熟方法保存下來](/advanced/skills)

先從 App 中選用現有 Skill，再理解 progressive disclosure、`SKILL.md`、儲存範圍與觸發測試。這一頁由 basic 逐步進入 advanced。

### 4. [Plugins：安裝與分享完整能力包](/advanced/plugins)

在理解 Skill 後，再學習如何把多個 Skills、Apps、MCP servers、Hooks 與其他資源一起安裝、連線與散布。

### 5. [MCP：連接即時資料與外部工具](/advanced/mcp-tools)

理解 Plugin 可能帶入的連線後，再深入 MCP transport、Authentication、tool 白名單與逐工具 Approval。

### 6. [Scheduled tasks：讓成熟任務定期執行](/advanced/automation)

只有一般 task 已經測通，才交給背景排程。學會區分 standalone 與延續既有 task，並設計無變更、失敗和停止條件。

### 7. [Worktrees：隔離背景與平行修改](/advanced/worktrees)

當背景工作會修改 Git Repository，或多條支線要同時進行時，用獨立 checkout、branch contract 與 Handoff 降低互相干擾。

### 8. [Hooks：最後加入確定性閘門](/advanced/hooks)

Hooks 會執行 command，應放在最後學習。只有規範、權限與驗證方式都已清楚，才把少數關鍵政策提升為 `PreToolUse` 或 `Stop` 閘門。

## 一張表快速選擇

| 需求 | 建議 |
| --- | --- |
| 這次修改不要新增 dependency | 寫在本次 Prompt |
| 每次修改都要執行相同測試 | 寫入 `AGENTS.md` |
| 限制可寫目錄、網路與審批時機 | 設定 Config／Permissions |
| 每次會議紀錄都整理成相同格式 | 使用或建立 Skill |
| 同時安裝文件流程、公司模板與雲端連線 | 使用 Plugin |
| 查詢目前套件文件或外部設計稿 | 連接 MCP／App connector |
| 每週一產生文件變更摘要 | 建立 Scheduled task |
| 同時處理兩條互不相依的修改 | 建立 Worktrees |
| 每次結束前強制執行快速測試 | 建立 `Stop` Hook |

## 開始前準備

- 已完成[快速上手](/quick-start/)，知道如何選擇專案、下達任務與檢查 Diff。
- 使用可安全練習的 Git Repository，不直接連接 Production 資料。
- 知道專案真正可執行的 setup、lint、test 與 build 指令。
- 第一次安裝第三方 Skill、Plugin、MCP 或 Hook 前，先閱讀來源、scripts、權限與資料流向。

::: warning 介面與清單會更新
Skills、Plugins、Scheduled 與權限控制的名稱或位置可能隨 App 版本、帳號與 Workspace 政策改變。課程重點是責任與判斷順序；操作時以目前畫面與官方文件為準。
:::

## 本章完成標準

- [ ] 能用一句話說明九種任務與能力表面的責任。
- [ ] 能指出哪些是文字規範、技術邊界、工具連線與 lifecycle 閘門。
- [ ] 能說明為何 Skill 應在 Plugin 之前、Worktree 應在 Hook 之前理解。
- [ ] 能為背景工作設計停止條件、最小權限與隔離方式。
- [ ] 能說明如何驗證每項設定實際生效。
