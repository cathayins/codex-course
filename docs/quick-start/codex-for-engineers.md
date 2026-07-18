---
title: Codex for Engineer
description: 從 Code Completion、Pair Programming 走向 Agentic Delegation，理解工程工作方式的下一步。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Codex for Engineer：寫程式的方式正在改變

<p class="lesson-lead">工程師並沒有突然不寫程式。改變的是，人不需要再親手推進每一個細節。越來越多工作可以先交給 Codex 執行，再把注意力留給需求、設計、取捨與審查。</p>

## 從補下一行，到交辦一段工作

<figure class="course-visual">
  <img src="/images/quick-start/engineering-evolution.png" alt="從程式碼補全、結對協作到委派完整任務的三階段視覺">
</figure>

<div class="evolution-labels" aria-label="工程協作三階段">
  <section><span>01</span><h3>Code Completion</h3><p>AI 猜下一段程式，人仍然控制每一步。</p></section>
  <section><span>02</span><h3>Pair Programming</h3><p>人和 AI 在同一個問題上來回討論與修改。</p></section>
  <section><span>03</span><h3>Agentic Delegation</h3><p>人交代目標與邊界，Codex 自己探索、修改、執行工具，再帶結果回來。</p></section>
</div>

前兩個階段的單位通常是「一行程式」或「眼前這個問題」。到了 Agentic Delegation，工作單位變成「完成一個可以交回來審查的任務」。

```text
幫我補完這個函式
        ↓
跟我一起找出這個 bug
        ↓
找出問題、完成最小修正、跑相關測試，再整理變更
```

差異不只在模型更聰明，而是 Codex 能取得專案 Context、使用命令與工具，並在同一個任務裡持續推進。

## 少看幾個螢幕，多看一個完整任務

<figure class="course-visual course-visual--wide">
  <img src="/images/quick-start/one-workspace.png" alt="工程師從多個散落畫面切換到一個能統整任務、檔案與狀態的工作台">
  <figcaption>理想不是把所有工具刪掉，而是讓 Codex 代替你在工具之間搬運脈絡。</figcaption>
</figure>

傳統工作很常長這樣：需求在文件、討論在訊息、程式在 IDE、命令在 Terminal、結果在瀏覽器，還要再回到 GitHub 看 Diff。每切一次畫面，人就要重新找回上下文。

Codex App 想做的，是讓任務成為主畫面。它可以在背後使用檔案、終端機、瀏覽器與其他工具；你回來時看到的是進度、改動和下一個需要判斷的地方。

<div class="takeaway">
  <span>工作方式的轉換</span>
  <strong>從「我現在要打開哪個工具？」變成「這個任務現在需要什麼？」</strong>
  <p>工具仍然存在，只是操作工具不再是人唯一能推進工作的方式。</p>
</div>

## How AI-Native Teams Plan, Build, Test, and Ship

<p class="section-intro">AI-native 不是每一步都全自動。比較務實的做法，是讓 Codex 先處理可探索、可重複、可驗證的工作；團隊把時間放在方向與取捨。</p>

<div class="lifecycle-grid">
  <section><span>PLAN</span><h3>把模糊需求補成可執行計畫</h3><p>Codex 整理規格、Ticket 與依賴；團隊決定優先順序。</p></section>
  <section><span>DESIGN</span><h3>先搭出可以討論的骨架</h3><p>Codex 建立初始元件；團隊調整 UX、架構與限制。</p></section>
  <section><span>BUILD</span><h3>完成聚焦的實作與修正</h3><p>Codex 編輯檔案、接線與修 bug；團隊說清楚行為與取捨。</p></section>
  <section><span>TEST</span><h3>補測試並執行檢查</h3><p>Codex 從規格與程式提出測試；團隊確認邊界與意圖。</p></section>
  <section><span>REVIEW</span><h3>先做第一輪變更檢查</h3><p>Codex 找出風險與不一致；團隊做最後的合併判斷。</p></section>
  <section><span>DOCUMENT</span><h3>讓文件跟上真正的變更</h3><p>Codex 整理摘要、文件與 release notes；團隊決定怎麼說。</p></section>
  <section><span>DEPLOY & MAINTAIN</span><h3>從訊號回到可能的原因</h3><p>Codex 協助整理 log、alert 與可疑 commit；團隊處理高風險決策。</p></section>
</div>

這些步驟不一定全部發生在一個 Task。重點是，Codex 可以參與整段軟體生命週期，而不只是在 Editor 裡補字。

## 參考資料

- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)

<p class="source-note">本頁的三階段與 AI-native lifecycle 依使用者提供的課程素材重新整理，配圖為本課原創生成，不重製原投影片畫面。</p>
