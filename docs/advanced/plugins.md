---
title: Plugins：安裝與分享完整能力包
description: 從 App 中瀏覽與安裝 Plugin，到理解 Skills、Apps、MCP、Hooks 與團隊散布方式。
outline: [2, 3]
---

# Plugins：安裝與分享完整能力包

Plugin 是可安裝、可分享的能力包。它可以只有 Skills，也能把 Skills、外部連線、MCP tools、Hooks 與其他資源一起交付，讓使用者不必逐項手動設定。

學習 Plugin 前，先確認你已理解 [Skill 是可重用的工作方法](/advanced/skills)。Plugin 的重點不是把規則寫得更長，而是把多個能力安全地安裝與散布。

## Basic｜先會瀏覽、安裝與使用

### 從 App 畫面開始

1. 在側欄開啟 **Plugins**。
2. 瀏覽 **OpenAI**、Workspace、Personal 與 **Installed** 等來源或狀態。
3. 打開詳細資料，確認 Plugin 提供哪些 Skills、Apps／connectors 或 tools。
4. 需要外部服務時，依畫面完成 Authentication。
5. 安裝後開啟新的 task，讓新增能力完整載入。
6. 直接描述成果，或輸入 `@` 明確選擇 Plugin。

::: warning 顯示內容因環境而異
可用 Plugins 會受到 App 版本、帳號、Workspace 政策、地區與登入狀態影響。授課時以目前 Plugins directory 為準，不需要背固定清單。
:::

### Skill 與 Plugin 的基本分工

| 需求 | 建議 |
| --- | --- |
| 只需要一套固定工作方法 | 使用或建立 Skill |
| 多個 Skills 要一起安裝 | 使用 Plugin |
| 同時需要流程與外部服務 | 使用包含 App／MCP 的 Plugin |
| 只有一次性限制 | 寫在本次 Prompt |

判斷口訣是：**先用 Skill 定義怎麼做，需要安裝、連線或分享整組能力時，再使用 Plugin。**

### 一個基本情境

假設你要整理今天尚未回覆的重要信件：

1. 安裝或確認信件服務的 Plugin。
2. 完成正確帳號的連線授權。
3. 開啟新 task，指定只讀取與草擬，不直接寄出。

```text
請使用已連線的信件 Plugin，找出今天需要我回覆的信件，
依「緊急、今天回覆、本週處理」分類。

先草擬回覆並列出判斷理由，不要寄出、封存、刪除或加上標籤。
```

「已安裝」不等於可以任意存取。Plugin 仍受登入帳號、原服務權限、Codex Sandbox 與 Approval 規則限制。

## 從 Basic 到 Advanced

| 階段 | 使用者要理解的事 |
| --- | --- |
| 瀏覽 | 這個 Plugin 解決什麼問題、由誰提供 |
| 安裝 | 會加入哪些 Skills、Apps、MCP tools 或 Hooks |
| 連線 | 使用哪個帳號、能讀寫哪些資料 |
| 執行 | 何時自動選擇、何時用 `@` 明確指定 |
| 治理 | 如何更新、停用、解除連線與重新審查 |
| 散布 | 何時值得建立團隊自己的 Plugin |

## Advanced｜Plugin 可以包含什麼

一個 Plugin 可以組合：

- **Skills**：可重用的工作流程與品質標準。
- **Apps／connectors**：連接 GitHub、信件、雲端文件等外部服務。
- **MCP servers**：提供結構化 context 與 tools。
- **Browser capabilities**：支援特定瀏覽器工作流。
- **Hooks**：在 Codex lifecycle 的特定時點執行 command。
- **Scheduled task templates**：提供排程工作的可重用起點。
- **Assets**：圖示、模板與呈現資源。

這些能力不一定全部存在。安裝前要以 Plugin 詳細資料和實際 manifest 為準。

## 安裝前的安全審查

第三方 Plugin 可能執行 scripts、啟動 MCP server、讀取外部資料或帶入 Hooks。至少確認：

1. 作者、來源、版本與更新紀錄是否可信。
2. Bundled Skills 的 `SKILL.md` 實際要求什麼。
3. Apps／MCP 會連接哪些服務、送出哪些資料。
4. Tools 中哪些是 read，哪些會 write、send、delete 或 publish。
5. Hooks 的 event、matcher、command 與 scripts 是否合理。
6. Token 與 credentials 如何保存，是否會進入 Repository 或輸出。
7. 能否先在不含敏感資料的測試環境驗證。

::: danger 外部寫入要保留人工確認
寄信、刪除資料、公開發布、部署與修改 Production 都屬於高影響動作。Plugin 提供能力，不代表這些動作應在無人審查下自動執行。
:::

## 權限與資料分享

Plugin 透過 Codex host 執行時，仍受 host 的 Sandbox 與 Approval policy 約束；連接外部服務時，也受該服務自己的 Authentication 與存取控制約束。

實務上要分開檢查三層：

```text
Codex 執行邊界
  ↓
Plugin／MCP 提供的 tools
  ↓
外部服務帳號的實際權限
```

任何一層過寬，都可能讓整體權限超出任務需要。先從 read-only 或 draft-only 情境開始，再逐步開放必要動作。

## 何時建立團隊 Plugin

符合以下條件時才值得建立：

- 兩個以上的 Skills 必須一起安裝與版本化。
- 工作流依賴固定的 App／MCP 連線或 Hooks。
- 多位使用者或多個 Repository 都需要相同能力。
- 團隊已有 owner、版本、更新與安全審查流程。

若只有一份 code review checklist，保留為 Skill；若只是本次任務不要新增 dependency，留在 Prompt；不要為了「看起來完整」而過度打包。

## 第三方 Plugin 的進階練習

[Ponytail Plugin](https://github.com/DietrichGebert/ponytail) 可用來示範 Plugin 如何同時帶入 review 流程與 lifecycle Hooks。它適合檢查 Plan 或 Diff 是否過度設計，但不是框架 API 的權威來源。

授課前重新審查 README、manifest、Skills、Hooks、scripts 與依賴；安裝後開新 task，並在 `/hooks` 逐一 review 新增的 Hook 定義。

## 完成檢查

- [ ] 能從 App 瀏覽來源、查看詳細資料並確認 Installed 狀態。
- [ ] 知道安裝後應開新 task 驗證能力。
- [ ] 能分辨 Skill、Plugin 與 MCP 的責任。
- [ ] 已確認外部服務使用的帳號與實際資料範圍。
- [ ] Bundled Hooks、scripts 與 write tools 已審查。
- [ ] 發送、刪除、部署與公開發布仍保留人工確認。

## 延伸閱讀

- [OpenAI：Plugins](https://learn.chatgpt.com/docs/plugins)
- [上一章：Skills](/advanced/skills)
- [下一章：MCP 與外部工具](/advanced/mcp-tools)

