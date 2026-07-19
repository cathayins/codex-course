---
title: 開始第一個任務
description: 先看懂完整流程，再從工作資料夾開始建立第一個 Codex 任務。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 開始第一個任務

<p class="lesson-lead">先把整段流程看完，再逐步操作。今天不是要背指令，而是要讓 Codex 在正確的資料夾裡，把一件工作做進真正的檔案。</p>

## 我們會走過這六步

<div class="quickstart-flow" aria-label="Codex 快速開始六個步驟">
  <section><span>01</span><h3>準備資料夾</h3><p>把這次會用到的檔案放在一起。</p></section>
  <section><span>02</span><h3>建立任務</h3><p>告訴 Codex 要完成什麼。</p></section>
  <section><span>03</span><h3>指定來源</h3><p>用 <code>@</code> 點名檔案或 Plugin。</p></section>
  <section><span>04</span><h3>確認做法</h3><p>用 <code>/</code> 看 Plan、Status 與 Context。</p></section>
  <section><span>05</span><h3>讓 Codex 執行</h3><p>需要時調整方向，或排下一件事。</p></section>
  <section><span>06</span><h3>打開結果</h3><p>確認產生的檔案是否正確。</p></section>
</div>

一句話記住就好：**資料放進工作資料夾，目標說清楚，Codex 在裡面工作，最後由你打開結果確認。**

## Step 1｜準備一個工作資料夾

今天用這個情境：行銷團隊要安排下一季預算，想從活動成效、預算與會議備註裡，找出值得加碼的三個渠道。

先在 Finder 或檔案總管建立資料夾：

```text
codex-quickstart/
├── q2-campaign.csv
├── budget.xlsx
└── channel-notes.md
```

<div class="file-role-grid">
  <section><code>q2-campaign.csv</code><p>曝光、點擊、轉換與營收。</p></section>
  <section><code>budget.xlsx</code><p>各渠道的預算與已花金額。</p></section>
  <section><code>channel-notes.md</code><p>檔期、素材與業務限制。</p></section>
</div>

工作資料夾就是 Codex 這次的工作範圍。練習時先用無敏感資訊的素材，不要放客戶個資、密碼或公司機密。

## Step 2｜建立任務，先說清楚想完成什麼

在 Codex App 按 **新增任務**，選擇 `codex-quickstart` 資料夾。送出第一句話前，先確認畫面上的資料夾名稱沒有選錯。

不用先寫一大段規格，可以先說結果、來源與邊界：

```text
請讀取這個資料夾裡的資料，找出下一季值得加碼的三個渠道。
先不要修改來源檔。請先回覆：
1. 你的分析方向
2. 會使用哪些檔案
3. 還缺哪些資訊
```

這段話交代了目標、來源、預期回覆與限制。Codex 有疑問時會再問，不需要一次把所有細節都想完。下一頁先看怎麼選模型，再把 Prompt 寫法拆開練習。

## 接下來怎麼走

第一個任務建立好之後，接下來分頁練習各個操作，最後再用一個 Demo 全部串起來：

<div class="quickstart-flow quickstart-flow--next" aria-label="快速使用後續內容">
  <a href="/codex-course/quick-start/models"><span>NEXT</span><h3>選擇模型</h3><p>先認識 Sol、Terra、Luna 與 reasoning effort。</p></a>
  <a href="/codex-course/quick-start/prompting"><span>03</span><h3>寫好 Prompt 與指定來源</h3><p>說清楚結果，再用 <code>@</code> 加入檔案、資料夾或 Plugin。</p></a>
  <a href="/codex-course/quick-start/using-slash"><span>04</span><h3>調整工作方式</h3><p>用 <code>/</code> 開啟 Plan、Compact、Review 等指令。</p></a>
  <a href="/codex-course/quick-start/follow-up"><span>05</span><h3>分派與調整工作</h3><p>開新任務，或用 Steer／Queue 補充同一件工作。</p></a>
  <a href="/codex-course/quick-start/goals"><span>06</span><h3>持續追一個 Goal</h3><p>任務需要反覆嘗試時，先寫清楚怎樣才算完成。</p></a>
  <a href="/codex-course/quick-start/demo"><span>07</span><h3>全流程 Demo</h3><p>從空資料夾開始，接上本機檔案與 SharePoint 共用資料。</p></a>
</div>

## 參考資料

- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Prompting](https://learn.chatgpt.com/docs/prompting)
