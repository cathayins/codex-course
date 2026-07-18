---
title: 安裝 Codex
description: 安裝 ChatGPT desktop app、Codex IDE Extension 或 CLI，並完成登入。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 安裝 Codex：先把入口裝好

<p class="lesson-lead">不用一次裝齊。App 課先準備 Codex App；IDE 課再加裝 Extension。平常已經使用 Terminal，再考慮 CLI。</p>

<div class="install-picker install-picker--compact">
  <section><span>APP 課必裝</span><h3>Codex App</h3></section>
  <section><span>IDE 課必裝</span><h3>IDE Extension</h3></section>
  <section><span>依習慣選裝</span><h3>Codex CLI</h3></section>
</div>

## Codex App

<p class="section-intro">Codex 現在放在 ChatGPT desktop app 裡。到 <a href="https://chatgpt.com/download/">ChatGPT 官方下載頁</a>選擇 macOS 或 Windows 版本，安裝後再切換到 Codex。</p>

<figure class="install-visual install-visual--screenshot install-visual--dark">
  <img src="/images/quick-start/install-chatgpt-desktop-download.png" alt="ChatGPT 官方下載頁的桌面版區域，提供 macOS 與 Windows 下載按鈕，並說明可在桌面版開啟 Codex">
</figure>

<div class="install-steps">
  <section><span>01</span><b>下載桌面版 ChatGPT</b><p>選擇 macOS 或 Windows，完成一般 App 安裝流程。</p></section>
  <section><span>02</span><b>登入 ChatGPT</b><p>使用課堂要用的 ChatGPT 帳號登入。</p></section>
  <section><span>03</span><b>切換到 Codex</b><p>從產品選單選擇 Codex，看到 New chat 就完成了。</p></section>
</div>

<div class="install-done"><span>完成畫面</span><b>能開啟 Codex，並建立一個新的 chat。</b></div>

## Codex IDE Extension

<p class="section-intro">IDE 是用來開啟專案、編輯檔案和執行程式的工作畫面。Codex Extension 會裝在 IDE 裡，所以這裡要安裝兩樣東西。</p>

<div class="ide-primer">
  <a class="ide-primer__icon" href="https://code.visualstudio.com/" aria-label="前往 Visual Studio Code 官方網站">
    <img src="/images/quick-start/vscode.svg" alt="Visual Studio Code Icon">
  </a>
  <div>
    <span>先安裝 IDE</span>
    <h3>這堂課使用 Visual Studio Code</h3>
    <p>第一次使用 IDE，先從 <a href="https://code.visualstudio.com/">Visual Studio Code 官方網站</a>完成安裝。已經有 VS Code 的人可以直接進到下一步。</p>
  </div>
</div>

<figure class="install-visual install-visual--screenshot install-visual--dark">
  <img src="/images/quick-start/install-codex-extension-vscode.png" alt="Visual Studio Code 中的 OpenAI 官方 Codex Extension 頁面，顯示已驗證的 OpenAI 發行者與 openai.chatgpt 識別碼">
</figure>

<div class="install-steps">
  <section><span>01</span><b>打開 Extensions</b><p>在 VS Code 左側點 Extensions，搜尋 <code>Codex</code>。</p></section>
  <section><span>02</span><b>認明 OpenAI 官方版本</b><p>名稱是 Codex – OpenAI’s coding agent，發行者是已驗證的 OpenAI，識別碼為 <code>openai.chatgpt</code>。</p></section>
  <section><span>03</span><b>登入並打開側欄</b><p>使用 ChatGPT 帳號登入，再點 Codex 圖示開啟輸入框。</p></section>
</div>

官方也支援其他相容編輯器，以及 Xcode、JetBrains 的整合入口；這堂課只操作 Visual Studio Code。

<div class="install-done"><span>完成畫面</span><b>IDE 右側或側欄能看到 Codex composer。</b></div>

## Codex CLI

<p class="section-intro">CLI 適合已經習慣 Terminal 的學員。畫面不是重點；把安裝指令跑完，再輸入 <code>codex</code>。</p>

<figure class="install-visual">
  <img src="/images/quick-start/install-codex-cli.webp" alt="Codex CLI 在終端機中顯示模型、工作目錄與訊息輸入區">
</figure>

::: code-group

```bash [macOS / Linux]
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

```powershell [Windows PowerShell]
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

```bash [npm]
npm install -g @openai/codex
```

```bash [Homebrew]
brew install --cask codex
```

:::

安裝完成後輸入：

```bash
codex
```

第一次啟動時，選擇 **Sign in with ChatGPT** 或組織提供的登入方式。QuickStart 不要求每位學員安裝 CLI。

## 登入前，先知道這件事

課堂預設使用 **Sign in with ChatGPT**。API key 比較適合 CLI、SDK、CI/CD 或需要獨立 API 帳務的情境，和 ChatGPT 方案的使用方式不同。

不要把 API key 貼進對話、截圖、文件或 Git Repository。

::: warning 只從官方來源安裝
安裝程式與 Extension 都會進入你的本機工作環境。請使用上面的官方連結，不要從搜尋結果中的陌生下載站複製命令。
:::

## 參考資料

- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Authentication](https://learn.chatgpt.com/docs/auth)
- [Codex product page](https://openai.com/codex/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [VS Code Icon 使用規範](https://code.visualstudio.com/brand)
- [2026 最新 Codex 介紹｜奇寶網路](https://www.seoseo.com.tw/blog/article_detail_1068.html)

<p class="source-note">安裝步驟依 2026-07-17 OpenAI 官方文件核對。App 與 IDE 圖片由課堂實機截圖整理；Visual Studio Code Icon 取自 Microsoft 官方品牌素材。奇寶文章用於背景介紹，實際安裝方式仍以官方頁面為準。</p>
