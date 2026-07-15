---
title: Worktrees：隔離平行與背景工作
description: 用獨立 Git checkout 隔離多條修改支線，並透過 Handoff 安全移動 task 與 code。
outline: [2, 3]
---

# Worktrees：隔離平行與背景工作

Worktree 解決的是「多條修改如何避免互相干擾」。它讓同一個 Git Repository 擁有多份獨立 checkout，每一份都有自己的檔案與 index，但共用 Git metadata。

這讓 Codex 可以在背景處理工作，而你繼續使用 Local checkout；也能讓不同任務各自修改與驗證，完成後再決定整合順序。

## 先認識三個名詞

- **Local checkout**：平常使用的 Repository 工作目錄，App 中通常簡稱 Local。
- **Worktree**：從相同 Repository 建立的另一份 checkout。
- **Handoff**：在 Local 與 Worktree 之間移動 task 與 code 的 App 流程。

::: info 使用條件
App-managed Worktrees 需要 Git Repository，並且只在 ChatGPT desktop app 的 Codex 中使用。非 Git 專案無法建立 Git Worktree。
:::

## 什麼時候值得使用

- 讓 Codex 在背景處理任務，不打擾 Local 的未完成工作。
- 同時進行兩條可獨立驗證、修改範圍不同的支線。
- 為 Scheduled task 隔離可能產生的檔案修改。
- 完成第一輪實作後，再移回日常 IDE 與本機服務環境驗證。

以下情況不一定需要：

- 只有一項短小修改，Local 沒有其他未完成工作。
- 兩條任務必須反覆修改相同 shared files。
- 專案 setup 無法在第二份 checkout 重現。
- 工作不是 Git Repository。

## 在 App 建立第一個 Worktree task

1. 建立新 task 時，在 composer 下方選擇 **Worktree**。
2. 選擇要作為起點的 branch。
3. 確認 base commit 與本機未提交修改是否符合預期。
4. 送出範圍清楚、可獨立驗證的 Prompt。
5. 在 Worktree 中檢查 Diff、執行測試並決定後續去向。

Codex-managed Worktree 預設可能處於 detached `HEAD`。修改確定要保留時，可以在 task header 使用 **Create branch here**，再 commit、push 或建立 PR。

## Handoff：把工作移到前景或背景

Handoff 不只移動對話 context，也會處理 Local 與 Worktree 之間所需的 Git 操作。

### Worktree 移回 Local

適合以下情境：

- 想在慣用 IDE 仔細檢查修改。
- 只有 Local 能啟動完整開發服務或模擬器。
- 準備進行整合、人工測試或後續協作。

### Local 交給 Worktree

適合需要把長時間工作移到背景，讓 Local checkout 回到其他任務的情境。

Git 不允許同一個 branch 同時 checkout 在兩個 Worktrees。要在 Local 繼續相同工作時，優先使用 Handoff，不要嘗試讓兩邊同時佔用同一 branch。

## Advanced｜平行前先寫 branch contract

從同一個乾淨 base commit 建立兩個 Worktrees，仍不代表它們能安全平行。每條支線都要先定義：

| 欄位 | Worktree A | Worktree B |
| --- | --- | --- |
| 目標 | human-review gate | decision citations |
| 可修改範圍 | policy、service、對應測試 | schema、repository、對應測試 |
| 不可修改 | shared migration、無關 API | shared policy、無關 API |
| 驗證 | unit test A、lint | unit test B、lint |
| 交付 | 行為、Diff、風險 | 行為、Diff、migration 影響 |

如果兩條支線都必須修改同一組 shared files，平行化的衝突成本可能高於節省的時間。此時應重新切分責任，或改成依序完成。

## 可重現的 Worktree 環境

每個 Worktree 都要能從 Repository 內容重建基本環境。不要假設 Local 已安裝的 dependency、build cache 或 ignored files 會自動存在。

課堂案例可先執行：

```bash
uv sync
uv run pytest tests/unit -q
```

真正命令仍以 Repository 的 `AGENTS.md` 與 README 為準。

### 使用 `.worktreeinclude`

若 App-managed Worktree 確實需要被 Git 忽略的本機測試檔，可在 Repository root 建立 `.worktreeinclude`：

```text
.env.test
```

只列入安全、必要、可供隔離測試使用的檔案。不要複製 Production token、客戶資料或個人 credentials。

## 與 Scheduled tasks 搭配

Git Repository 的 Scheduled task 可以直接在 Local 執行，也可以使用隔離的 background Worktree。若排程可能修改檔案，Worktree 能避免與正在編輯的 Local checkout 互相干擾。

排程頻率高時也會累積 Worktrees 與 build cache。定期歸檔不再需要的 runs，不要為了保留歷史而無限制 pin 所有 task。

## 整合多條支線

兩條支線完成後，依序：

1. 各自回報變更檔案、行為、測試與剩餘風險。
2. 依 dependency 決定整合順序，例如先 schema／contract，再 service／UI。
3. 對 shared files 進行語意合併，不直接選擇其中一邊整檔覆蓋。
4. 在整合後的 branch 重新執行完整 lint、test、type-check 與 build。
5. PR 說明 branch contract、整合順序、未執行檢查與 rollback 影響。

Worktree 只提供隔離，不會自動證明兩份修改相容；最終整合後的驗證仍不可省略。

## 常見失敗

- 兩條支線沒有檔案責任邊界，同時修改 shared core。
- Worktree 依賴 Local 未追蹤的檔案，導致環境無法重現。
- 把 Production secrets 放進 `.worktreeinclude`。
- 忽略 detached `HEAD`，完成後才發現修改沒有對應 branch。
- 嘗試讓同一個 branch 同時 checkout 在 Local 與 Worktree。
- 只看各支線測試通過，沒有驗證整合後結果。

## 完成檢查

- [ ] 平行支線從同一個已確認 base commit 開始。
- [ ] 每條支線有目標、可修改範圍、驗證與交付格式。
- [ ] Shared files 與整合順序已事先定義。
- [ ] Worktree setup 能由 Repository 指示重現。
- [ ] `.worktreeinclude` 不含 Production secrets 或敏感資料。
- [ ] 整合後已重新執行完整驗證。

## 延伸閱讀

- [OpenAI：Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees)
- [上一章：Scheduled tasks](/advanced/automation)
- [下一章：Hooks](/advanced/hooks)

