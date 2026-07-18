---
title: 快速開始使用
description: 建立一個資料夾，放入 CSV、Excel 與備註，使用 Spreadsheet Plugin 完成第一個問題。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 快速開始使用：從一個資料夾開始

<p class="lesson-lead">概念講完後，第一個任務不用很大。準備一個乾淨資料夾、三份看得懂的素材，再問一個真的需要跨檔案才能回答的問題。</p>

## 今天的情境

> 行銷團隊要安排下一季預算。資料分散在活動成效 CSV、預算 Excel 與一份會議備註裡，想先知道哪三個渠道值得加碼。

這個案例能把前面的差異一次串起來：如果只有一句策略問題，可以直接問 ChatGPT；現在答案藏在多個本機檔案裡，還需要把分析留回資料夾，所以改用 Codex。

## Step 1｜建立資料夾

在 Finder 或檔案總管建立：

```text
codex-quickstart/
├── q2-campaign.csv
├── budget.xlsx
└── channel-notes.md
```

三份檔案各有一個角色：

| 檔案 | 放什麼 | 為什麼需要它 |
|---|---|---|
| `q2-campaign.csv` | 曝光、點擊、轉換與營收 | 看實際成效 |
| `budget.xlsx` | 各渠道預算與已花金額 | 看還有多少空間 |
| `channel-notes.md` | 檔期、素材與業務限制 | 避免只看數字下結論 |

練習資料不放真實客戶名稱、個資、密碼或公司機密。資料夾的目的不是把所有資料集中，而是先畫出這次任務的工作範圍。

## Step 2｜在 Codex App 打開資料夾

1. 開啟 Codex，建立 **New chat**。
2. 選擇 `codex-quickstart` 資料夾。
3. 看一眼 composer 上方或附近的資料夾名稱。
4. 確認畫面顯示的就是剛建立的資料夾，再輸入指令。

不要先建立 Git、不用先選 framework，也不用先打開 Terminal。這一段的重點只是讓 Codex 站在正確的工作桌前。

## Step 3｜先用 `@` 選擇 Spreadsheet Plugin

課前先在 App 的 **Plugins** 安裝 Spreadsheet／Spreadsheets Plugin。上課時在 composer 輸入 `@`，從清單選擇它。

接著輸入：

```text
請使用 @Spreadsheets 讀取目前資料夾中的 q2-campaign.csv、
budget.xlsx 與 channel-notes.md。

回答：如果下一季只能加碼三個渠道，你會選哪三個？
請同時說明數據理由、備註裡的限制，以及目前還缺什麼資訊。

不要修改來源檔。用繁體中文回答，先給結論，再給依據。
```

Plugin 名稱可能因安裝來源或版本略有不同。現場以 `@` 清單顯示的名稱為準，不要要求學員背完整名稱。

<div class="takeaway">
  <span>這個 Prompt 做對了什麼？</span>
  <strong>指定工具、指定來源、問一個問題，也說清楚不能動什麼。</strong>
  <p>它沒有規定每一步怎麼算，仍然讓 Codex 選擇做法；但不會讓它猜資料在哪裡、要回答誰的問題，或是否可以改原始檔。</p>
</div>

## Step 4｜把回答留回資料夾

第一輪看完後，再追問：

```text
請把剛才的結論整理成 notes/quick-read.md。
保留三個建議渠道、主要數據、限制與待補資料。
不要改動三份來源檔。
```

這一步就是「回答」和「進入工作環境」的差別。Codex 不只在對話裡說完，也把能繼續使用的內容放回指定資料夾。

<figure class="interface-figure">
  <img src="/images/quick-start/codex-app-data-result.webp" alt="Codex App 完成 CSV 清理與摘要後，同時顯示回覆與資料檔案">
  <figcaption>OpenAI 官方資料處理示範。左側是結論，右側直接打開處理後的資料；課堂案例會換成三份 QuickStart 素材。</figcaption>
</figure>

## 學員此時只要看懂四件事

<div class="brief-grid brief-grid--end">
  <section><span>01</span><b>資料夾是工作範圍</b><p>Codex 不是憑空知道本機檔案在哪裡。</p></section>
  <section><span>02</span><b>`@` 指定這次要用的能力</b><p>Plugin 與來源都能被明確點名。</p></section>
  <section><span>03</span><b>一次先問一個可回答的問題</b><p>範圍越清楚，第一輪越容易看出價值。</p></section>
  <section><span>04</span><b>結果可以回到真實檔案</b><p>這也是 Codex 和純對話最直觀的差別。</p></section>
</div>

::: warning Plugin 示範放在 App
目前 Plugin browser 不在 IDE Extension 裡。IDE QuickStart 會改用 Open file、Selection、Project Context 與 `/` commands；不要在 IDE 現場找 Plugin 選單。
:::

## 課前準備

```text
□ 三份範例檔已放進乾淨資料夾
□ Spreadsheet Plugin 已安裝並在新 chat 可用
□ 檔案不含個資、公司名稱與敏感資料
□ 已準備完成畫面或短錄影作為備援
□ App 通知與個人專案名稱已隱藏
```

## 參考資料

- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Prompting](https://learn.chatgpt.com/docs/prompting)
- [Work with files](https://learn.chatgpt.com/docs/files)

<p class="source-note">案例刻意只做到「建立資料夾、跨檔回答、留下第一份筆記」。完整資料品質檢查、成果驗收與交付會放在後續實戰，不放進這次 QuickStart。</p>
