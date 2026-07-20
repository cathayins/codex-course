---
title: 進階能力學習路線
description: 依序建立規範、權限、可重用方法、外部連線、能力包與背景執行，再選修平行拆分與確定性閘門。
outline: [2, 3]
---

# 進階能力學習路線

完成快速上手後，下一步不是把 Prompt 寫得更長，而是把要求放到正確的位置。Codex 提供多種名稱相近、責任不同的能力；先理解單一元件，再學如何組合，才能建立可重複、可審查又安全的工作流。

核心路線從文字規範與權限邊界開始，依序建立可重用方法、外部連線、能力包與背景排程。時間有限時完成前六章即可；需要處理多 agent 協作或 lifecycle 強制控制時，再繼續選修 Subagents 與 Hooks。

## 你會學到什麼

完成本章後，你應能：

1. 判斷一項要求該放在 Prompt、`AGENTS.md`、Config、Skill、MCP、Plugin、Scheduled task、Subagent 或 Hook。
2. 分清楚文字規範、技術權限與 lifecycle enforcement。
3. 從保存工作方法、連接外部工具，逐步進階到安裝、分享與自動執行。
4. 為背景任務，以及選修的平行任務設計最小權限與人工審查點。
5. 驗證每種能力確實生效，而不是只完成設定。

## 先建立一個心智模型

| 需要回答的問題 | 對應能力 | 一句話責任 |
| --- | --- | --- |
| 這次要完成什麼？ | Prompt | 本次任務的目標、輸入與限制 |
| 這個 Repository 長期怎麼工作？ | `AGENTS.md` | 專案規範、真實命令與完成定義 |
| Codex 技術上能做什麼？ | Config／Permissions | Sandbox、Approval、網路與功能設定 |
| 這類任務每次怎麼做？ | Skill | 可重用的工作流程與品質標準 |
| 如何取得即時資料或外部 tools？ | MCP | 連接外部 context 與可執行工具 |
| 如何安裝與分享整組能力？ | Plugin | Skills、連線與擴充元件的能力包 |
| 什麼時候自動重跑？ | Scheduled task | 未來或固定頻率的背景執行 |
| 如何把工作交給多個 agents？ | Subagents | 拆分、平行處理，再由主 agent 彙整 |
| 哪些規則必須機械式執行？ | Hook | agent lifecycle 的確定性閘門 |

::: tip 由文字走向機制
先用 Prompt 與 `AGENTS.md` 說清楚，再用 Config 建立邊界；流程穩定後封裝成 Skill，需要即時資料時連接 MCP，再用 Plugin 安裝與分享整組能力。一般工作測通後才加入排程；多 agent 協作與 Hooks 留到選修階段。
:::

## 核心路線｜時間有限先完成這六章

### 1. [`AGENTS.md`：先說清楚長期規範](/advanced/agents-md)

從最接近 README 的文字檔開始。把 Repository purpose、真實驗證命令、變更邊界與 Definition of Done 寫清楚，讓每次任務都有一致起點。

### 2. [Config、權限與沙盒：建立執行邊界](/advanced/permissions)

接著分清楚「應該怎麼做」與「技術上允許做什麼」。Sandbox、Approval 與管理政策是安裝工具、連接資料和背景執行之前的安全基礎。

### 3. [Skills：把成熟方法保存下來](/advanced/skills)

先從 App 中選用現有 Skill，再理解 progressive disclosure、`SKILL.md`、儲存範圍與觸發測試。這一頁由 basic 逐步進入 advanced。

### 4. [MCP：連接即時資料與外部工具](/advanced/mcp-tools)

先分清楚工作方法與外部連線，再深入 MCP transport、Authentication、tool 白名單與逐工具 Approval。

### 5. [Plugins：安裝與分享完整能力包](/advanced/plugins)

理解 Skills 與 MCP 後，再學習如何把方法、Apps、MCP servers 與需要的擴充元件一起安裝、連線與散布。

### 6. [Scheduled tasks：讓成熟任務定期執行](/advanced/automation)

只有一般 task 已經測通，才交給背景排程。學會區分 standalone 與延續既有 task，並設計無變更、失敗和停止條件。

完成這一章後，你已走完日常工作需要的核心路線。後面兩章不影響前六章的操作，可以依時間與需求選修。

## 選修進階｜協作與確定性控制

### 7. [Subagents：拆分、平行處理與彙整](/advanced/worktrees)

需要平行探索或多角色審查時，再理解 Subagents 的工作原理、threads 與客製化 Agent；小型或有強烈前後依賴的任務可以跳過。

### 8. [Hooks：最後加入確定性閘門](/advanced/hooks)

Hooks 會執行 command，應放在最後學習。只有規範、權限與驗證方式都已清楚，才把少數關鍵政策提升為 `PreToolUse` 或 `Stop` 閘門。
