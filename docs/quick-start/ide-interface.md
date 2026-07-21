---
title: Codex IDE｜使用編輯器裡已有的脈絡
description: 在 IDE 裡帶入開啟的檔案與選取內容、檢查修改，並把較長的工作交給 Codex cloud。
outline: [2, 3]
aside: true
pageClass: quickstart-story ide-official-page
---

<p class="ide-page-eyebrow">Codex IDE extension</p>

# 使用編輯器裡已有的脈絡完成工作

<p class="lesson-lead ide-page-lead">讓 Codex 留在程式碼旁邊。把開啟的檔案與選取內容帶進 Prompt、直接檢查修改；任務變大時，再交給 Codex cloud 繼續執行。</p>

<div class="ide-page-actions">
  <a class="ide-page-button ide-page-button--primary" href="https://marketplace.visualstudio.com/items?itemName=openai.chatgpt" target="_blank" rel="noreferrer">安裝 VS Code Extension ↗</a>
  <a class="ide-page-button" href="#開始使用">Extension Quickstart →</a>
</div>

<div class="ide-demo-window" aria-label="Codex IDE 操作示意">
  <div class="ide-demo-titlebar"><span class="ide-demo-dots">● ● ●</span><b>retry-service</b><span>5.6-Sol</span></div>
  <aside class="ide-demo-explorer"><small>EXPLORER</small><b>⌄ RETRY-SERVICE</b><span>⌄ src</span><span class="is-active">retry.ts</span><span>retry.test.ts</span><span>backoff.ts</span><span>› tests</span><span>package.json</span></aside>
  <div class="ide-demo-code"><div class="ide-demo-tabs"><span class="is-active">retry.ts</span><span>retry.test.ts</span><span>backoff.ts</span></div><pre><code><i>10</i> while (attempt &lt;= retries) {
<i>11</i>   try {
<i>12</i>     return await fn();
<i>13</i>   } catch (error) {
<i>14</i>     lastError = error;
<i class="ide-demo-change">15</i><mark>    if (attempt &gt;= retries) break;</mark>
<i>16</i>     await wait(200 * 2 ** attempt);
<i>17</i>     attempt++;
<i>18</i>   }
<i>19</i> }</code></pre></div>
  <section class="ide-demo-codex"><small>CODEX</small><h3>Trace and fix a flaky retry bug</h3><p><b>Fixed successfully.</b> Retry loop now stops at max retries before waiting.</p><ul><li>Retry exhaustion stops correctly</li><li>Focused tests pass</li></ul><div class="ide-demo-review"><span>Edited retry.ts <b>+2 −2</b></span><button>Review</button></div><div class="ide-demo-composer">Ask for follow-up changes <span>↑</span></div></section>
</div>

<div class="ide-feature-index" aria-label="Codex IDE 的三個核心工作方式">
  <section><span>01</span><h2>使用目前已開啟的脈絡</h2><p>直接引用檔案、選取內容與最近對話，少花時間重述問題。</p></section>
  <section><span>02</span><h2>在程式碼旁檢查修改</h2><p>閱讀摘要與 Diff，只保留需要的變更，並在同一段對話追問。</p></section>
  <section><span>03</span><h2>任務變大時再交出去</h2><p>快速調整留在本機；較長的工作交給 Codex cloud。</p></section>
</div>

## 開始使用

安裝或啟用 Codex 並登入帳號後，就能直接從編輯器裡已開啟的內容開始對話。

<div class="ide-quickstart" aria-label="Codex IDE 開始使用步驟">
  <section><span>1</span><h3>安裝或啟用 Codex</h3><p>VS Code、Cursor 與 Windsurf 使用 Codex extension；Xcode 與 JetBrains 使用各自的整合入口。</p></section>
  <section><span>2</span><h3>開啟 Codex</h3><p>選擇 Codex 圖示；若沒有顯示，從 Command Palette 執行 <code>Codex: Open Codex Sidebar</code>。</p></section>
  <section><span>3</span><h3>開始第一段對話</h3><p>開啟專案後，先請 Codex 說明程式、做一個聚焦修改，或協助追查錯誤。</p></section>
</div>

<figure class="ide-install-shot"><img src="/images/quick-start/install-codex-extension-vscode.webp" width="1672" height="941" alt="VS Code Marketplace 中的 Codex extension 安裝頁面" loading="lazy" decoding="async"><figcaption>VS Code Marketplace 中的官方 Codex extension；安裝並重新啟用 extension 後，就能從側邊欄開啟 Codex。</figcaption></figure>

::: tip 先留下 Git checkpoint
開始修改前先確認工作區狀態；完成後再查看 Diff。這樣更容易比較、保留或還原變更。
:::

## 01｜使用目前已開啟的脈絡

<div class="ide-story-grid">
  <div class="ide-story-copy"><p>Codex 可以從輸入框引用開啟的檔案、選取的程式碼與最近對話。它會先從你正在看的內容開始，因此不必貼上整份檔案，也不必每次重新交代背景。</p><p>第一次提問時，先縮小範圍並說清楚要「解釋、修改或除錯」。若只想理解現況，也要明確寫下「先不要修改」。</p><a href="/quick-start/prompting#補上有用的-context">了解如何用 @ 指定來源 →</a></div>
  <div class="ide-context-composer"><div class="ide-context-pills"><span>@ retry.ts</span><span>Selection · 12 lines</span><span>Recent chat</span></div><p>請追查選取區塊為什麼會重複 retry。先說明資料流與可能原因，列出驗證方式，先不要修改。</p><div><small>Local · workspace-write</small><b>↑</b></div></div>
</div>

## 02｜在程式碼旁檢查修改

<div class="ide-story-grid ide-story-grid--review">
  <div class="ide-story-copy"><p>Codex 完成工作後，先讀摘要，再查看實際修改的程式碼。來源、修改原因和後續對話都在同一個畫面，比只看一句「完成」更容易判斷結果。</p><ol><li><b>摘要：</b>確認任務目的、修改檔案與驗證結果。</li><li><b>Diff：</b>逐行檢查新增與刪除，留意是否超出範圍。</li><li><b>追問：</b>方向正確但細節不對時，留在同一段對話補充條件。</li></ol><p>需要檢查目前 Git 變更時，也可以輸入 <code>/review</code>。</p></div>
  <figure class="ide-review-shot"><img src="/images/quick-start/codex-ide-official.webp" width="1600" height="900" alt="Codex IDE 顯示程式碼 Diff、修改摘要與 Review 按鈕" loading="lazy" decoding="async"><figcaption>官方示意：摘要、Diff、修改檔案與後續輸入框都留在 IDE 裡。</figcaption></figure>
</div>

## 03｜任務變大時再交出去

<div class="ide-story-grid">
  <div class="ide-story-copy"><p>需要立即來回調整的小修改，適合留在 IDE。任務範圍較廣、需要跑一段時間，或你想先處理別的事時，可以把工作交給 Codex cloud，完成後再回來檢查結果。</p><p>交付前仍要寫清楚目標、驗收方式與不要改動的範圍；切換執行位置不會自動補上缺少的背景。</p></div>
  <div class="ide-delegate-panel"><small>CONTINUE IN</small><div><section><span>⌘</span><b>Work locally</b><p>快速修改、逐步追問、立即檢查 Diff。</p></section><i>→</i><section><span>☁</span><b>Cloud</b><p>較長任務、較大範圍、背景持續執行。</p></section></div><footer><span>openai / codex-course</span><b>Ready to delegate ✓</b></footer></div>
</div>

## 適合使用 Codex IDE 的情境

<div class="ide-use-cases">
  <section><span>01</span><h3>做聚焦修改</h3><p>把相關檔案與 Codex 留在同一個畫面。</p></section>
  <section><span>02</span><h3>閱讀陌生程式碼</h3><p>直接詢問目前已開啟的檔案與 symbol。</p></section>
  <section><span>03</span><h3>就地檢查變更</h3><p>在來源旁查看、保留或繼續調整修改。</p></section>
  <section><span>04</span><h3>分派較大任務</h3><p>從 IDE 啟動 cloud 工作，再回來檢查結果。</p></section>
</div>

## 不同 IDE 的入口

| IDE | 開啟方式 |
| --- | --- |
| VS Code、Cursor、Windsurf | Codex 圖示，或執行 `Codex: Open Codex Sidebar` |
| Xcode | 開啟 coding assistant、新增對話，選擇 Codex agent |
| JetBrains | 開啟 AI Chat，選擇 Codex |

不同 IDE、版本和帳號設定，看到的入口可能不一樣。第一次使用時先完成 **Sign in with ChatGPT**，再確認 Codex 能讀到目前的 Workspace。

## 下一步

- [Prompting：寫出可執行、可驗收的任務](/quick-start/prompting)
- [Slash Commands：執行工作流程操作](/quick-start/using-slash)
- [Models：依任務選擇模型](/quick-start/models)

## 參考資料

- [Codex IDE extension｜OpenAI](https://learn.chatgpt.com/docs/codex/ide)
- [IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)
- [IDE settings](https://learn.chatgpt.com/docs/developer-settings?surface=ide)
- [Code review](https://learn.chatgpt.com/docs/code-review)

<p class="source-note">本頁依官方 Codex IDE 頁面的 Hero、三個核心情境、Quickstart 與適用情境重整。官方 Hero 是互動式介面，沒有獨立 GIF；課程頁以輕量介面示意搭配官方 Review 圖片呈現。</p>
