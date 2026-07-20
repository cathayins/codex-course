---
title: 進階能力學習路線
description: 依序學習規範、權限、可重複使用的方法、外部連線、能力包與背景排程，再依需求選修平行協作與強制執行規則。
outline: [2, 3]
---

# 進階能力學習路線

完成快速上手後，下一步是判斷每項要求該由哪個功能處理。Codex 有多個名稱相近、用途不同的功能；先弄清楚各自負責什麼，再把它們組合成可重複、可審查且安全的工作流程。

核心路線從文字規範與權限邊界開始，再依序學習可重複使用的方法、外部連線、能力包和背景排程。需要多 agent 協作，或需要在 agent 生命週期中強制執行規則時，再閱讀 Subagents 和 Hooks。

## 你會學到什麼

完成這套進階課程後，你應能：

1. 判斷一項要求該放在 Prompt、`AGENTS.md`、Config、Skill、MCP、Plugin、Scheduled task、Subagent 或 Hook。
2. 分清楚文字規範、技術權限，以及生命週期中需要強制執行的規則。
3. 把工作方法保存成可重複使用的 Skill，連接外部工具，再將這些能力安裝、分享或設為自動執行。
4. 為背景任務設定最小權限與人工審查點，並在選修單元中把相同原則用於平行任務。
5. 驗證每種能力確實生效，而不是只完成設定。

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

## 核心路線｜時間有限時，先完成這六章

### 1. [`AGENTS.md`：先說清楚長期規範](/advanced/agents-md)

`AGENTS.md` 用來記錄專案用途、實際可用的驗證命令、變更邊界和完成條件，讓每次任務都有一致的依據。

### 2. [Config、權限與沙盒：建立執行邊界](/advanced/permissions)

Config／Permissions 用來區分「應該怎麼做」和「技術上允許做什麼」。安裝工具、連接資料或執行背景任務前，先透過 Sandbox、Approval 和管理政策設定安全邊界。

### 3. [Skills：保存可重複使用的工作方法](/advanced/skills)

內容涵蓋在 App 中選用現有 Skill，以及 progressive disclosure、`SKILL.md`、儲存範圍與觸發測試。

### 4. [MCP：連接即時資料與外部工具](/advanced/mcp-tools)

內容涵蓋工作方法與外部連線的差別，以及 MCP transport、Authentication、tool 白名單和各項工具的 Approval。

### 5. [Plugins：安裝與分享完整能力包](/advanced/plugins)

Plugin 可將方法、Apps、MCP servers 和其他擴充元件組成完整能力包，方便安裝、設定連線與分享。

### 6. [Scheduled tasks：定期執行已驗證的任務](/advanced/automation)

一般 task 的流程驗證完成後，才交由背景排程執行。內容涵蓋 standalone task 與延續既有 task 的差別，以及無變更、失敗與停止條件的設定方式。

前六章涵蓋日常工作需要的核心路線；後兩章可依時間與需求選修。

## 選修進階｜協作與強制執行

### 7. [Subagents：拆分、平行處理與彙整](/advanced/worktrees)

Subagents 適合用於平行探索或多角色審查，內容包括工作方式、threads 和客製化 Agent。小型任務或前後相依很強的任務，通常不必拆成多個 agent。

### 8. [Hooks：強制執行關鍵規則](/advanced/hooks)

Hooks 會執行命令，因此應在規範、權限與驗證方式都釐清後再使用。少數關鍵政策可交由 `PreToolUse` 或 `Stop` 強制執行。
