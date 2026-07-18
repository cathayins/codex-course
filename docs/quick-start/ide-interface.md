---
title: Codex IDE
description: 快速看懂 IDE 中的檔案 Context、composer、Diff、Terminal、帳號與個人設定。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Codex IDE：不用離開正在看的檔案

<p class="lesson-lead">IDE 的優勢不是「比較工程師」，而是 Context 已經在畫面上。工程師可以選程式碼，PM 可以選需求或設定檔；兩者都能清楚指出這一輪要談哪裡。</p>

<figure class="interface-figure">
  <img src="/images/quick-start/codex-ide-official.webp" alt="Codex IDE Extension 的變更審查畫面，左側為程式碼，右側顯示修改摘要與差異">
  <figcaption>OpenAI 官方 Codex IDE Extension 畫面：檔案、對話、修改摘要與 Diff 留在同一個工作現場。</figcaption>
</figure>

## 一眼看懂六個位置

<div class="interface-map interface-map--six">
  <section><span>01</span><b>Explorer</b><p>專案裡有哪些資料夾與檔案。</p></section>
  <section><span>02</span><b>Editor</b><p>你目前正在讀的內容。</p></section>
  <section><span>03</span><b>Selection</b><p>這一輪真正要討論的精確範圍。</p></section>
  <section><span>04</span><b>Codex Sidebar</b><p>訊息、模式、模型與權限入口。</p></section>
  <section><span>05</span><b>Diff / Source Control</b><p>哪些檔案被改、改了哪幾行。</p></section>
  <section><span>06</span><b>Terminal / Problems</b><p>命令、測試、建置與錯誤訊息。</p></section>
</div>

如果 App 是從「任務」出發，IDE 就是從「眼前這份檔案」出發。你不用先把整段程式貼進對話，也不必重新描述檔案路徑。

## `@` 與 `/` 在 IDE 怎麼用

<div class="syntax-grid syntax-grid--two">
  <section><kbd>@</kbd><h3>加入檔案 Context</h3><p>指向開啟中的檔案、整份檔案或其他相關檔案。Selection 則適合把範圍縮到幾行內容。</p></section>
  <section><kbd>/</kbd><h3>控制目前 chat</h3><p>用 `/plan` 先規劃、`/status` 看 Context、`/compact` 壓縮長對話，或用 `/ide-context` 控制自動帶入的編輯器 Context。</p></section>
</div>

```text
請根據我選取的驗收條件，先找出目前專案裡可能相關的檔案。
不要修改，先用白話說明需求現在是怎麼被實作的。
```

這是一個 PM 也能直接使用的起手式。先從 Selection 出發，再讓 Codex 探索 Project；不用假裝自己已經知道答案在哪個檔案。

### Open file、Selection、Project 是三層 Context

<div class="context-layers">
  <section><span>OPEN FILE</span><b>我正在看哪一份內容</b><p>適合解釋檔案角色，或追一段資料怎麼流動。</p></section>
  <section><span>SELECTION</span><b>這一輪只談哪幾行</b><p>適合需求條目、函式、錯誤訊息與局部文案。</p></section>
  <section><span>PROJECT</span><b>它和整個系統怎麼連起來</b><p>Codex 可以繼續探索 Workspace；選取內容只是起點。</p></section>
</div>

## Diff 與 Terminal：先知道它們在回答什麼

<div class="evidence-pair">
  <section><span>DIFF</span><h3>它到底改了什麼？</h3><p>看新增、刪除與修改落在哪些檔案。Diff 太大時，可以先請 Codex 按檔案說明目的。</p></section>
  <section><span>TERMINAL / PROBLEMS</span><h3>它怎麼知道改動可行？</h3><p>看它執行了什麼命令、出現什麼錯誤，以及哪些地方仍然沒有被檢查。</p></section>
</div>

QuickStart 只要看懂這兩個區域的用途。如何做完整 Code Review、測試與 PR 交付，留到後面的 Codebase 課程。

## 帳號、Extension 設定與個人化

### 帳號

第一次使用時，從 Codex Sidebar 選擇 **Sign in with ChatGPT**。共用電腦或課後要切換帳號時，從 Codex 的帳號選單登出，不要只關掉瀏覽器登入頁。

### IDE Extension 設定

打開 VS Code Settings，搜尋：

```text
@ext:openai.chatgpt
```

常用設定包含啟動時是否打開 Codex、訊息在執行中要 queue 還是 steer、Enter 行為、Review 顯示方式，以及 chat 字級。

### 個人化

支援的版本可以輸入 `/personality` 選擇回覆風格。較長期的個人偏好也會與 ChatGPT App 的 Personalization／個人 `AGENTS.md` 設定連動；專案規範則應留在 Repository 內的 `AGENTS.md`，不要混成個人習慣。

::: warning Plugin 不在 IDE Extension 裡
目前 OpenAI 官方文件列出的 Plugin 支援介面是 ChatGPT desktop app、Work mode 與 Codex CLI；IDE Extension 不提供 Plugin browser。課堂的 Spreadsheet Plugin 示範會放在 App，IDE 這段專注在檔案 Context、Selection 與 Diff。
:::

## 參考資料

- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [IDE slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)
- [IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide)
- [Plugins](https://learn.chatgpt.com/docs/plugins)

<p class="source-note">本課以 VS Code 示範。Cursor、Windsurf、Xcode 與 JetBrains 的入口不同，但「開啟內容、Selection、Project、Diff」這幾個觀念可以沿用。</p>
