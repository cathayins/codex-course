---
title: 進階能力學習路線
description: 依序理解規範、權限、能力封裝、外部連線、背景執行、平行拆分與確定性閘門。
outline: [2, 3]
---

# 進階能力學習路線

完成快速上手後，下一步不是把 Prompt 寫得更長，而是把要求放到正確的位置。Codex 提供多種名稱相近、責任不同的能力；理解它們的先後關係，才能建立可重複、可審查又安全的工作流。

這套順序從最容易理解的文字規範開始，逐步走到能力封裝、外部工具、背景工作、平行拆分與強制閘門。

## 你會學到什麼

完成本章後，你應能：

1. 判斷一項要求該放在 Prompt、`AGENTS.md`、Config、Skill、Plugin、MCP、Scheduled task、Subagent 或 Hook。
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
| 如何把工作交給多個 agents？ | Subagents | 拆分、平行處理，再由主 agent 彙整 |
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

### 7. [Subagents：拆分、平行處理與彙整](/advanced/worktrees)

理解 Subagents 的工作原理與設定方式，學會拆分任務、管理執行中的 threads，並為重複分工建立客製化 Agent。

### 8. [Hooks：最後加入確定性閘門](/advanced/hooks)

Hooks 會執行 command，應放在最後學習。只有規範、權限與驗證方式都已清楚，才把少數關鍵政策提升為 `PreToolUse` 或 `Stop` 閘門。
