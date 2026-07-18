# ADR-001：QuickStart 採「從問答到交辦」的故事線

- Status: Accepted
- Date: 2026-07-17

## Context

App 課包含第一次接觸 Codex 的一般使用者；IDE 課包含熟悉 AI 開發但可能不寫程式的 PM。QuickStart 必須能直接投影授課，不能從 agenda 或功能清單開始。

## Decision

QuickStart 依下列順序前進：

```text
What Is Codex
├── ChatGPT vs Codex
└── Codex for Engineer

安裝 Codex

介面介紹
├── Codex App
└── Codex IDE

快速開始使用
```

開場使用「ChatGPT 像顧問，Codex 像能進入工作環境的同事」作為教學比喻。真正的選擇標準是任務是否需要進入本機資料夾、跨多個檔案持續工作，而不是用副檔名或職稱硬切。

## Consequences

- `/quick-start/` 直接進入「ChatGPT vs Codex」，不再保留課程導覽頁。
- `What Is Codex` 與「介面介紹」作為導覽群組，讓概念課與操作課的層次更清楚。
- App、IDE、CLI 只做一次大方向比較，詳細操作回到各自頁面。
- `@`、`/`、Plan、Context、Token、Compact、帳號與 Personalization 併入 App／IDE 介面頁。
- QuickStart 不設獨立的成果檢查與交付頁。
- 投影頁面以短段落、大圖與可直接說出口的文字為主。

## Rejected alternatives

- 依功能表逐項介紹：資訊很多，但缺少從「為什麼用」到「怎麼開始」的轉場。
- 先放完整 agenda：適合講師備課，不適合作為學員第一張投影畫面。
- 把 App、IDE、CLI 各自講成一套產品：重複概念，也讓選入口變得更難。
