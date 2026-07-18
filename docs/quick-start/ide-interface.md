---
title: Codex IDE
description: 認識 IDE 的 Explorer、Editor、Codex 對話與 Review。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Codex IDE

<p class="lesson-lead">IDE 把 Codex 放在正在看的檔案旁邊。工程師可以選程式碼，PM 也可以選需求或設定檔，直接指出這一輪要談哪裡。</p>

<figure class="interface-figure interface-figure--ide"><img src="/images/quick-start/codex-ide-official.webp" alt="Codex IDE Extension 畫面，左側是專案檔案，中間是編輯器與 Diff，右側是 Codex 對話與修改摘要"></figure>

## IDE 畫面

<div class="screen-zones screen-zones--ide">
  <section><span>左側</span><h3>Explorer</h3><p>專案裡有哪些資料夾與檔案。Codex 可以沿著這個 Workspace 繼續探索。</p></section>
  <section><span>中間</span><h3>Editor 與 Diff</h3><p>閱讀檔案、選取一段內容，也在這裡看哪些程式被加入或刪除。</p></section>
  <section><span>右側</span><h3>Codex Chat</h3><p>交代目標、切換 Plan、選擇模型，再查看 Codex 的說明與進度。</p></section>
</div>

App 通常從「這件任務」出發；IDE 通常從「眼前這個檔案」出發。你不用先把整段內容複製到對話，也不必重新打一次檔案路徑。

## 選取內容再問

<div class="context-layers">
  <section><span>OPEN FILE</span><b>目前開啟的檔案</b><p>適合詢問檔案角色，或追一段資料怎麼流動。</p></section>
  <section><span>SELECTION</span><b>這次只談這幾行</b><p>適合需求條目、函式、錯誤訊息與局部文案。</p></section>
  <section><span>PROJECT</span><b>放回整個專案理解</b><p>Codex 可以繼續找相關檔案；Selection 只是起點。</p></section>
</div>

```text
請根據我選取的驗收條件，找出專案裡可能相關的檔案。
先不要修改，用白話說明這個需求目前怎麼被實作。
```

這個問法不要求你先知道答案在哪裡。先選取需求，再讓 Codex 沿著 Project 找實作。

## Diff、Terminal 與 Problems

<div class="evidence-pair">
  <section><span>DIFF</span><h3>它改了什麼</h3><p>看新增、刪除與修改落在哪些檔案。Diff 太大時，可以先請 Codex 依檔案說明目的。</p></section>
  <section><span>TERMINAL / PROBLEMS</span><h3>它怎麼檢查</h3><p>看它執行了哪些命令、出現什麼錯誤，以及哪些地方還沒有驗證。</p></section>
</div>

IDE 的價值不只在產生程式碼。選取需求、閱讀陌生專案、確認 Diff 和錯誤，也都是很常用的工作。

## Codex Review

在 Git Repository 裡輸入：

```text
/review
```

Codex 會檢查目前變更或指定分支，整理出有優先順序的問題。Review 本身不會修改 Working Tree；你可以看完發現，再決定要不要請 Codex 修正。

<div class="review-flow">
  <section><span>01</span><b>選擇範圍</b><p>目前未提交變更，或與 Base branch 比較。</p></section>
  <section><span>02</span><b>閱讀 Findings</b><p>先看會造成錯誤、資料風險或行為改變的項目。</p></section>
  <section><span>03</span><b>再決定修改</b><p>確認問題成立，再請 Codex 做最小修正並跑檢查。</p></section>
</div>

QuickStart 先知道 `/review` 在哪裡。完整 Code Review、測試與 PR 交付會放在後面的 Codebase 課程。

## 帳號與 Extension 設定

第一次使用時，從 Codex Sidebar 選擇 **Sign in with ChatGPT**。VS Code 的設定可以搜尋：

```text
@ext:openai.chatgpt
```

常用項目包含 Follow-up 使用 Steer 或 Queue、Enter 行為、Review 顯示方式，以及 Chat 字級。IDE 不提供 Pet 選擇器與 Plugin browser；Plugin 示範會在 App 進行。

## 參考資料

- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)
- [IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide)
- [Code review](https://learn.chatgpt.com/docs/code-review)

<p class="source-note">本課以 Visual Studio Code 示範。Cursor、Windsurf、Xcode 與 JetBrains 的入口不同，但 Explorer、Editor、Selection、Chat 與 Diff 的觀念可以沿用。</p>
