# ADR-002：第一個任務使用多檔案資料夾與 Spreadsheet Plugin

- Status: Accepted
- Date: 2026-07-17

## Context

QuickStart 要讓一般使用者快速感受到 Codex 與純問答的差異，也要為後面的 Marketing 資料分析 Demo 鋪路。若第一個任務直接做網站，技術選型與驗收會搶走介面教學時間。

## Decision

App QuickStart 使用 `codex-quickstart` 資料夾：

- `q2-campaign.csv`：成效資料
- `budget.xlsx`：預算資料
- `channel-notes.md`：業務限制
- 透過 `@` 選擇 Spreadsheet Plugin
- 問一個跨檔問題，最後將簡短結果寫入 `notes/quick-read.md`

IDE QuickStart 不共用 Plugin 操作。IDE Extension 目前沒有 Plugin browser，改以 Open file、Selection、Project Context 與 Diff 說明。

## Consequences

- 一般使用者能立刻理解「多個本機檔案需要一起工作」的情境。
- 第一個任務能自然接到後面的 Marketing Data Demo，但不在 QuickStart 深挖分析方法。
- 講師需要在課前安裝 Plugin，並準備三份去識別化範例檔。
- 現場只示範選資料夾、使用 `@`、提問、留下第一份筆記。

## Rejected alternatives

- 建立活動網站：畫面直觀，但 HTML、CSS、瀏覽器與驗收會占用 QuickStart。
- 單一 CSV 問答：太接近一般聊天上傳檔案，難以呈現 Codex 的工作環境價值。
- 在 IDE 示範 Plugin：不符合目前官方支援範圍。
