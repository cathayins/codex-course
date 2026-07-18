---
title: What Is Codex
description: 先分清 ChatGPT 與 Codex，再看 Codex 如何改變工程工作方式。
outline: [2, 3]
aside: true
pageClass: quickstart-story chatgpt-vs-codex
---

# ChatGPT vs Codex

<p class="lesson-lead">ChatGPT 很像一位隨時可以討論的顧問。Codex 更像一位能進入工作環境的同事：它可以打開資料夾、讀取檔案、使用工具，最後把結果留在真正的檔案裡。</p>

## 顧問與同事

<div class="story-contrast story-contrast--projector">
  <section><span>CHATGPT</span><h3>先把問題想清楚</h3><p>你提出問題，它幫你整理資訊、比較選項、發想，或寫出第一版內容。</p><b>適合：快速問答、腦力激盪、單次分析</b></section>
  <section><span>CODEX</span><h3>進入工作環境完成任務</h3><p>你指定資料夾與目標，它讀取多個檔案、使用工具、建立或修改成果，再回來說明做了什麼。</p><b>適合：多檔案、需要落地、會持續修改的工作</b></section>
</div>

兩邊的能力會重疊。ChatGPT 也能處理檔案，Codex 也會先和你討論。這裡先用一個簡單的問題判斷：**最後要的是一個回答，還是一份做進工作資料夾的成果？**

## 看最後要交付什麼

<div class="outcome-examples">
  <section>
    <div class="outcome-example__icon" aria-hidden="true"><svg viewBox="0 0 72 72" role="img"><path d="M15 15h42a7 7 0 0 1 7 7v24a7 7 0 0 1-7 7H33L20 63V53h-5a7 7 0 0 1-7-7V22a7 7 0 0 1 7-7Z" /><path d="M22 29h28M22 39h19" /></svg></div>
    <div><span>用 ChatGPT｜比較兩份活動提案</span><h3>答案就是成果</h3><p>你想知道兩個方案的預算差異、風險和適合客群。整理完成後，看著回答就能做決定。</p><b>交付：一段分析與建議</b></div>
  </section>
  <section>
    <div class="outcome-example__icon" aria-hidden="true"><svg viewBox="0 0 72 72" role="img"><path d="M8 23a6 6 0 0 1 6-6h16l7 8h21a6 6 0 0 1 6 6v25a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6V23Z" /><path d="M22 34h13v18H22zM39 34h13v18H39zM26 39h5M26 44h5M43 39h5M43 44h5" /></svg></div>
    <div><span>用 Codex｜整理 12 份 CSV 與 3 份 Excel</span><h3>檔案就是成果</h3><p>你要合併欄位、找出重複資料、核對總額，並把整理結果留在原本的工作資料夾。</p><b>交付：整理後的試算表與摘要檔</b></div>
  </section>
</div>

## Codex 可以做什麼

<figure class="course-visual course-visual--wide"><img src="/images/quick-start/codex-work-examples.png" alt="Q 版角色把本機 PDF、收據與票券整理成資料夾，再建立個人知識庫、網站與小工具"></figure>

<div class="use-case-grid">
  <section><span>本機文件</span><h3>整理 PDF、收據與票券</h3><p>批次分類、重新命名、找出重複內容，再整理成清單或試算表。</p></section>
  <section><span>個人資料</span><h3>建立本機 AI Wiki</h3><p>把散落的筆記與文件整理成可搜尋、可持續更新的知識庫。</p></section>
  <section><span>想法落地</span><h3>建立網站或小工具</h3><p>從需求、畫面到可執行版本，一路留在同一個專案資料夾。</p></section>
</div>

Codex 不只用來寫程式。只要工作需要讀取多份本機資料、使用電腦上的工具，或把結果留下來，都可以先想想是否適合交給 Codex。

## 交辦前先說清楚

<div class="brief-grid">
  <section><span>01</span><b>要完成什麼</b><p>不要只說「幫我看一下」，說清楚最後要得到什麼。</p></section>
  <section><span>02</span><b>資料在哪裡</b><p>指定資料夾、檔案、選取內容，或必要的外部來源。</p></section>
  <section><span>03</span><b>哪些不能碰</b><p>例如不要改原始檔、不要寄出、不要連外，或先不要執行。</p></section>
  <section><span>04</span><b>回來時要帶什麼</b><p>一份整理後的檔案、一個可執行版本，或一段說明。</p></section>
</div>

# Codex for Engineer

<p class="lesson-lead">這一段先看工程工作方式怎麼變。程式碼、測試、Review 與交付的細節，會留到進階課程。</p>

## 工程協作的三個階段

<figure class="course-visual"><img src="/images/quick-start/engineering-evolution.png" alt="從複製貼上、程式碼補全到委派完整任務的三階段 Q 版視覺"></figure>

<div class="evolution-labels evolution-labels--large" aria-label="工程協作三階段">
  <section><span>01｜Q&amp;A</span><h3>Ctrl C、Ctrl V</h3><p>以前去論壇找答案，後來改問 ChatGPT；最後仍要把答案貼回 IDE，再自己整合。</p></section>
  <section><span>02｜CODE COMPLETION</span><h3>Tab、Tab、Tab</h3><p>AI 猜下一段程式，人一邊看、一邊接受補全，仍然控制每一步。</p></section>
  <section><span>03｜AGENTIC DELEGATION</span><h3>說清楚，按 Enter</h3><p>交代目標與邊界，Codex 自己探索、修改、執行工具，再帶結果回來。</p></section>
</div>

到了第三個階段，工作單位不再只是一行程式，而是一個可以回來檢查的任務。

```text
幫我補完這個函式
        ↓
跟我一起找出這個 bug
        ↓
找出問題、完成最小修正、跑相關測試，再整理變更
```

## 從工具切換到任務

<figure class="course-visual course-visual--wide"><img src="/images/quick-start/one-workspace-v2.png" alt="Q 版工程師從多個散落畫面切換到一個統整任務、檔案與狀態的工作台"></figure>

需求在文件、討論在訊息、程式在 IDE、命令在 Terminal、結果在瀏覽器，最後還要回到 GitHub 看 Diff。每切一次畫面，都要重新找回剛才的脈絡。

Codex App 把任務放在中間。它可以使用檔案、終端機、瀏覽器與其他工具；你回來時看進度、改動，以及下一個需要決定的地方。

## AI-Native Teams：Plan、Build、Test、Ship

<div class="lifecycle-grid">
  <section><span>PLAN</span><h3>整理需求</h3><p>Codex 讀規格、Ticket 與依賴；團隊決定優先順序。</p></section>
  <section><span>DESIGN</span><h3>搭出骨架</h3><p>Codex 建立初始元件；團隊調整 UX、架構與限制。</p></section>
  <section><span>BUILD</span><h3>完成實作</h3><p>Codex 編輯檔案、接線與修 bug；團隊說清楚行為與取捨。</p></section>
  <section><span>TEST</span><h3>執行檢查</h3><p>Codex 從規格與程式提出測試；團隊確認邊界與意圖。</p></section>
  <section><span>REVIEW</span><h3>檢查變更</h3><p>Codex 找出風險與不一致；團隊做最後的合併判斷。</p></section>
  <section><span>DOCUMENT</span><h3>更新文件</h3><p>Codex 整理摘要、文件與 release notes；團隊決定怎麼說。</p></section>
  <section><span>SHIP &amp; MAINTAIN</span><h3>部署與維護</h3><p>Codex 協助整理 log、alert 與可疑 commit；團隊處理高風險決策。</p></section>
</div>

QuickStart 先建立這個全貌。進階課程再練習如何拆任務、寫專案規範、驗證結果，以及把變更安全地交付出去。

## 參考資料

- [Codex：How to get started](https://openai.com/academy/codex-how-to-start/)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [Codex 完整新手教學｜Frank Chiu](https://frankchiu.io/ai-chatgpt-codex-intro/)
- [零基礎 30 分鐘學會 Codex｜李厂长来了](https://www.youtube.com/watch?v=dMiV7Yx9yk4)
- [Codex - Full Course for Beginners｜Tech With Tim](https://www.youtube.com/watch?v=ZXkeWiWB4xg)

<p class="source-note">「顧問／能進入工作環境的同事」是本課使用的比喻。產品功能依 2026-07-18 OpenAI 官方文件核對；兩張 Q 版配圖為本課生成素材。</p>
