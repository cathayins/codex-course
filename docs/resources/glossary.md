---
title: QuickStart 術語表
description: 用工作語言理解 Codex 的任務、工作區、Context、Token、Diff 與權限。
outline: [2, 3]
---

# QuickStart 術語表

<p class="lesson-lead">遇到陌生名詞時，先看它幫你處理哪一件事：指出資料、控制 chat、限制權限，還是檢查修改。按鈕位置可能會變，這些用途比較不會變。</p>

## 工作單位

### Agent

可以理解目標、使用工具並採取多步驟行動的 AI 系統。Codex 是面向軟體開發與知識工作的 agent。

### Task / Thread

一次有目標、Context 與執行歷程的工作對話。產品介面常顯示 Task；底層與技術文件也可能稱 Thread。

### Project

把相關 Task、檔案與工作設定放在一起的上層容器。適合用來管理同一個案件或工作主題。

### Workspace

Codex 當下可以讀取或修改的實際工作目錄。上課比喻為員工的「辦公桌」。

### Repository / Repo

由版本控制（通常是 Git）管理的專案資料夾。它包含檔案、歷史、分支與協作資訊；不是所有 Workspace 都一定是 Repository。

## Context 與容量

### Context

這一輪判斷可用的資訊，包括 Prompt、對話、附加檔案、選取內容、工作區規則與工具輸出。

### Context Window

模型一次可以處理的 Context 容量。長對話、完整檔案與大量 log 都會占用空間。

### Token

模型處理文字時使用的基本計量單位，不等同於中文字數或單字數。Token 會用於理解輸入與產生輸出。

### Context Usage

目前 Task 已使用多少 Context window。它代表工作記憶容量，不等於帳單金額。

### Account Usage

帳號在一段時間內的 token 活動或產品額度使用。會受方案、Workspace 與登入方式影響。

### Rate Limit

特定時間範圍內可使用服務的上限。可能依方案、模型與服務狀態而不同。

### Compact / Compaction

把既有對話濃縮成摘要，保留目標、決策與進度，同時釋放 Context。它不會自動刪除或還原工作區檔案。

## 指令與模式

### `@` Mention

在 Prompt 中指向相關檔案、資料夾、Plugin 或可用來源。不同介面與安裝狀態會顯示不同項目，以輸入 `@` 後的清單為準。

### `$` Skill

新版 App 可用 `$` 帶出可用 Skill。Skill 是針對一類工作準備好的步驟、參考資料與工具使用方式。

### Slash Command

以 `/` 開頭、用來控制目前 Task 的指令，例如 `/plan`、`/status`、`/compact`。反斜線 `\` 不是 Codex slash command。

### Plan Mode

讓 Codex 先探索、提問並提出實作計畫，再進入修改。適合模糊、多步驟或高風險任務。

### Model / Reasoning Effort

Model 是執行 Task 的模型；reasoning effort 控制可用時的思考強度。任務越複雜，通常需要更多時間與 token，但不代表永遠越高越好。

## 執行與證據

### Terminal

執行命令並顯示輸出的介面。它讓 Codex 可以使用專案既有工具，也讓人看到建置、測試與錯誤證據。

### Diff

修改前後的差異。通常以刪除與新增行表示，是審查修改範圍最重要的證據之一。

### Validation

用測試、建置、畫面、連結、資料對照或其他檢查確認成果符合完成標準。

### Local

在目前電腦與 Workspace 執行任務。適合互動式修改與快速驗證。

### Cloud

在託管環境執行較長或背景任務，完成後回來審查成果。可用性與環境設定依帳號而異。

### Worktree

Git 提供的隔離工作副本。不同 Task 可以在不同 worktree 修改，降低平行工作互相干擾的風險。

## 權限與規則

### Sandbox

限制 Codex 能讀、寫、執行與連網範圍的執行環境。上課比喻為辦公室的牆與門禁範圍。

### Approval

當操作超出目前自動允許範圍，Codex 請人確認的流程。批准前要看清楚命令、目的與影響。

### `AGENTS.md`

放在 Repository 中、給 coding agent 閱讀的長期工作指引，可記錄專案結構、命令、規範、限制與完成標準。QuickStart 只認識，進階課再實作。

### Skill

針對一類重複任務封裝的專業流程與資源，例如簡報製作、CI 修復或資料分析。

### Plugin / MCP / Connector

讓 Codex 取得額外工作流程、工具或外部資料的擴充方式。它們的結構不同；QuickStart 先把它們理解為「要先安裝或連線，才能使用的額外能力」。Plugin 目前可在 ChatGPT desktop app、Work mode 與 Codex CLI 使用，不在 IDE Extension 裡。

## 最容易混淆的四組詞

| 不要混在一起 | 差異 |
|---|---|
| Project vs Workspace | Project 管理相關工作；Workspace 是實際檔案現場 |
| Context usage vs Account usage | 前者是目前 Task 容量；後者是帳號活動／額度 |
| Plan Mode vs Read Only | 前者是工作階段；後者是權限邊界 |
| Summary vs Evidence | Summary 說發生了什麼；Diff、測試與畫面證明它 |

<p class="source-note">名詞依 2026-07-17 OpenAI Codex manual 與產品文件整理；介面用語變更時，以官方文件與當前 App 顯示為準。</p>
