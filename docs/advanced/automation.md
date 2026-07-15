---
title: Scheduled tasks：讓成熟任務定期執行
description: 先手動測通，再用明確輸入、停止條件與最小權限安排背景工作。
outline: [2, 3]
---

# Scheduled tasks：讓成熟任務定期執行

Scheduled task 適合把**已經測通**的工作，在未來某個時間或固定頻率重新執行。它不是用來替模糊需求補完細節，而是把清楚、可驗收的流程交給 Codex 在背景重跑。

## 什麼時候適合排程

- 每天、每週或每月都要產生相同結構的報告。
- 定期檢查 PR、測試、文件或外部狀態是否改變。
- 稍後回到同一個 task，繼續追蹤長時間作業。
- 已有成熟 Skill，希望定期以相同方法執行。

不適合直接排程：

- 第一次執行、輸入與輸出尚未確認。
- 每次都需要重大人工判斷或重新定義需求。
- 會無人審查地對外發送、刪除資料、部署或修改 Production。
- 沒有停止條件，可能無限重複或持續產生噪音。

## 獨立排程或延續既有 task

| 類型 | 適合情境 | Context 與結果 |
| --- | --- | --- |
| Standalone scheduled task | 每次執行彼此獨立、固定產生新報告 | 每次建立獨立 task，結果集中在 **Scheduled** |
| 從既有 task 排程 | 需要沿用目前討論、反覆追蹤同一件事 | 回到同一個 task，保留既有 context |

例如「每週一產生 Repository 摘要」適合獨立排程；「每 15 分鐘檢查這次 deployment，成功或失敗就停止」則適合延續既有 task。

## 建立前先手動測試

1. 在一般 task 執行完整 Prompt。
2. 確認來源、工具與權限都可用。
3. 檢查輸出是否能快速判讀。
4. 刻意測試「沒有變更」「工具失敗」「資料不足」等情況。
5. 補上停止條件與需要人工介入的條件。
6. 再建立排程，並檢查前幾次執行結果。

::: warning
如果普通 task 尚未穩定，排程只會定期重複不穩定結果。
:::

## 一個可排程的 Prompt

```text
每週一 09:00 檢查這個專案過去一週 docs/ 的變更。

輸出：
1. 新增或大幅修改的課程頁面
2. 可能失效的連結或過期說明
3. 本週建議優先檢查的 3 件事

規則：
- 只讀取與分析，不修改檔案。
- 若沒有變更，明確回報「本週無文件更新」。
- 若無法取得 Git history，說明原因後停止，不用其他來源猜測。
- 不要發送訊息或建立 PR。
```

一個耐用的排程 Prompt 應寫清楚：

- **範圍**：檢查哪個專案、目錄、服務或資料來源。
- **每次動作**：每一輪都要重新做什麼。
- **輸出**：收件人能快速判斷的固定格式。
- **無變更行為**：沒有新狀況時如何回報。
- **失敗行為**：資料不足或工具失敗時怎麼停止。
- **副作用**：能否修改、發送、部署或建立 PR。

## 與 Skill、Plugin 組合

如果每次執行都要遵循固定方法，可在 Prompt 中用 `$skill-name` 明確指定 Skill。需要查詢 GitHub、信件或其他外部服務時，排程也能使用已安裝且完成 Authentication 的 Plugin。

把「怎麼做」放在 Skill，把「何時執行、這次範圍與停止條件」放在 Scheduled task，可讓流程較容易維護與分享。

## 本機專案與 Worktree

Scheduled task 需要使用本機檔案時：

- 電腦需保持開機。
- ChatGPT desktop app 需持續執行。
- 排程時間到達時，專案路徑仍需存在。

對 Git Repository，可選擇直接在 local project 執行，或使用隔離的 background [Worktree](/advanced/worktrees)。可能修改檔案時，Worktree 能避免與尚未完成的本機工作互相干擾；非 Git 專案只能直接在專案目錄執行。

## 權限與無人值守風險

Scheduled tasks 在背景無人值守執行，會使用預設的 Sandbox 設定。應從能完成任務的最小權限開始：

- 報告與監控工作優先使用 read-only。
- 需要修改時，限制在 workspace，並優先使用 Worktree 隔離。
- 只開啟必要的網路、Plugin 與 MCP tools。
- 不用 Full access 解決 Prompt 或流程仍不清楚的問題。
- 對外發送、正式部署與不可逆動作保留人工 review。

## Scheduled 是結果收件匣

在 App 左側開啟 **Scheduled**，可以查看 Active、Paused、Completed、下次執行時間與 Recent runs。排程建立後仍需要維護：

1. 檢查最初幾次輸出。
2. 調整過度頻繁或太少的 cadence。
3. 暫停已無價值或產生噪音的任務。
4. 歸檔不再需要的 runs，避免累積大量 Worktrees。

## 完成檢查

- [ ] 同一份 Prompt 已先在一般 task 測通。
- [ ] 已選對 standalone 或既有 task 排程。
- [ ] Prompt 包含範圍、輸出、無變更與失敗行為。
- [ ] 有明確停止條件與人工介入條件。
- [ ] 使用最小 Sandbox、工具與資料權限。
- [ ] 前幾次 runs 已人工檢查並調整。

## 延伸閱讀

- [OpenAI：Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [OpenAI：Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees)
- [OpenAI：Sandbox](https://learn.chatgpt.com/docs/sandboxing)
