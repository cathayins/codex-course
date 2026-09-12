# QuickStart Teaching Model

本文件記錄 QuickStart 的教學語意。它不是投影教材；用途是讓後續新增頁面、Demo 或截圖時仍維持同一條故事線。

## 對象

- 第一次接觸 Codex 的一般使用者。
- 熟悉 AI 工具，但不一定寫程式的 PM。
- 想從 AI completion／pair programming 走向 delegation 的工程師。
- 負責處理帳號、安裝與現場落差的講師／TA。

## 核心比喻

- ChatGPT：像一位能快速討論、整理與提供建議的顧問。
- Codex：像一位能進入指定工作環境、操作檔案與工具的同事。

這是工作方式的比喻，不是產品能力的硬邊界。單一檔案的快速問題可以留在 ChatGPT；多個本機檔案、持續修改與可重複工作更適合 Codex。

## 核心物件

| 物件 | QuickStart 說法 |
|---|---|
| Project / Folder | 這次工作放在哪裡 |
| Chat / Task | 這一輪要完成什麼 |
| Context | 哪些檔案、Selection 或來源會影響判斷 |
| Plugin / Skill | 這次要用哪一套額外能力 |
| Permission | Codex 這次被允許做到哪裡 |
| Result / Artifact | 回答最後落在哪一個可繼續使用的內容 |

## 目前 QuickStart 主線

公開課程先放一頁 Brief，讓學員知道這一段會從 Codex 基本介紹、App 畫面一路走到實際 Demo。接著用同一份 Marketing Excel 貫穿每個步驟，最後留下可以操作、也可以人工驗收的 Dashboard。

```text
Brief
  ↓
What Is Codex：從 ChatGPT 對話走向可交付工作
  ↓
Codex App：左邊選工作、中間交代、右邊驗收
  ↓
Marketing Excel：建立 Project、盤點來源、規劃 Dashboard
  ↓
逐步完成：Model、Prompt、Plan、Follow-up
  ↓
打開 Dashboard：核對 KPI、圖表、篩選器與資料限制
```

Goals 保留在工作區作為延伸素材，但不加入公開導覽；IDE、安裝與其他進階課程素材也保留檔案，現階段不作為這條新手主線的頁面入口。

## 原始投影主線（歷史版本）

```text
回答問題
  ↓
進入工作環境
  ↓
選擇 App / IDE / CLI
  ↓
看懂 composer 與設定
  ↓
用一個資料夾完成第一次委派
```

## 教學原則

1. 先說明為什麼，再介紹按鈕。
2. 入口用工作現場選，不用職稱選。
3. `@`、`/`、`$` 都要放回 composer 的實際畫面講。
4. Plugin Demo 放在 App／CLI，不放在 IDE Extension。
5. 語氣要像講師現場說話，避免產品型錄與抽象口號。
6. QuickStart 先讓學員開始使用；完整驗收、PR 與交付留到後續課程。
7. 介面、安裝與操作示範優先使用「標題＋一句說明＋真實畫面」；概念比較、語法、安全提醒與可複製指令保留文字或卡片，避免為了放圖犧牲清楚度。

## 課前待確認

- App 與 IDE 的帳號登入是否完成。
- Spreadsheet Plugin 是否已安裝，且在新 chat 可被 `@` 選到。
- 三份範例資料已去識別化。
- 介面截圖與目前版本沒有重大落差。
- 已準備預錄畫面，避免現場網路影響節奏。
