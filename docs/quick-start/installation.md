---
title: 安裝 Codex
description: 安裝 Codex App、IDE Extension 或 CLI，並完成登入。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 安裝 Codex

<p class="lesson-lead">Codex 有 App、IDE Extension 與 CLI 三個入口。它們使用同一個 ChatGPT 帳號與相近的工作觀念，只是出現在不同的位置。</p>

## 選擇安裝方式

<MediaTabs
  aria-label="Codex 安裝方式"
  :items="[
    {
      label: 'Codex App',
      title: '首選推薦，整合在桌面版 ChatGPT',
      description: 'Codex App 整合在 ChatGPT desktop app。到官方下載頁選擇 macOS 或 Windows，安裝後登入，再從產品選單切換到 Codex。QuickStart 會先從這個入口開始。',
      image: '/images/quick-start/install-chatgpt-desktop-download.png',
      alt: 'ChatGPT 官方下載頁，桌面版提供 macOS 與 Windows 按鈕，並說明可以在桌面版開啟 Codex',
      links: [
        { label: '下載 ChatGPT desktop app', href: 'https://chatgpt.com/download/' }
      ],
      steps: [
        { title: '下載桌面版', description: '從官方下載頁選擇 macOS 或 Windows。' },
        { title: '登入 ChatGPT', description: '使用公司提供、且有 Codex 權限的 ChatGPT 帳號。' },
        { title: '開啟 Codex', description: '從產品選單切換到 Codex；能新增任務就代表安裝完成。' }
      ],
      fit: 'settings'
    },
    {
      label: 'IDE Extension',
      title: '已經習慣在 IDE 裡工作的人',
      description: 'IDE 是用來瀏覽專案、編輯檔案和執行程式的工作畫面。這堂課使用 Visual Studio Code；Codex Extension 會貼在編輯器旁邊，直接使用目前開啟的檔案、選取內容與專案脈絡。',
      icon: {
        image: '/images/quick-start/vscode.svg',
        alt: 'Visual Studio Code 圖示'
      },
      image: '/images/quick-start/install-codex-extension-vscode.png',
      alt: 'Visual Studio Code Extensions 頁面中的 OpenAI 官方 Codex Extension，顯示已驗證的 OpenAI 發行者與 openai.chatgpt 識別碼',
      links: [
        { label: '下載 Visual Studio Code', href: 'https://code.visualstudio.com/' },
        { label: '查看 Codex IDE 安裝說明', href: 'https://learn.chatgpt.com/docs/codex/ide' }
      ],
      steps: [
        { title: '安裝 VS Code', description: '還沒有 IDE 的學員，先完成 Visual Studio Code 安裝。' },
        { title: '找到官方 Extension', description: '在 Extensions 搜尋 Codex，認明已驗證的 OpenAI 發行者。' },
        { title: '登入並打開側欄', description: '使用 ChatGPT 帳號登入，再點 Codex 圖示開啟對話框。' }
      ],
      note: '這堂課以 VS Code 示範。官方也提供其他相容編輯器，以及 Xcode、JetBrains 的整合入口。',
      fit: 'settings'
    },
    {
      label: 'CLI',
      title: '習慣在 Terminal 工作的人',
      description: 'CLI 適合平常就在命令列工作的人。從下方選一種符合電腦環境的安裝方式；完成後移動到工作資料夾，輸入 codex 就能開始。',
      image: '/images/quick-start/install-codex-cli.webp',
      alt: 'Codex CLI 在終端機中顯示模型、工作目錄與訊息輸入區',
      links: [
        { label: '查看 Codex CLI 安裝說明', href: 'https://learn.chatgpt.com/docs/codex/cli' }
      ],
      platforms: [
        {
          label: 'macOS / Linux',
          title: '在 Terminal 執行安裝',
          description: '複製下面這一行執行即可。已經習慣 npm 或 Homebrew 的人，也可以從官方 CLI 文件選擇替代安裝方式。',
          commands: [
            { label: '建議安裝', code: 'curl -fsSL https://chatgpt.com/codex/install.sh | sh' }
          ]
        },
        {
          label: 'Windows',
          title: '在 PowerShell 執行安裝',
          description: '開啟 PowerShell，複製下面這一行執行。安裝完成後重新開啟終端機，再輸入 codex。',
          commands: [
            { label: '建議安裝', code: 'powershell -ExecutionPolicy ByPass -c &quot;irm https://chatgpt.com/codex/install.ps1 | iex&quot;' }
          ]
        }
      ],
      code: 'codex',
      fit: 'terminal'
    }
  ]"
/>

## 登入方式

<div class="auth-grid">
  <section><span>課堂使用</span><h3>Sign in with ChatGPT</h3><p>沿用 ChatGPT 的方案、Workspace 權限與 Credits。Enterprise 帳號通常選這個。</p></section>
  <section><span>另外計費</span><h3>API key</h3><p>適合 CLI、SDK、CI/CD 或需要獨立 API 帳務的工作，不會沿用 ChatGPT 方案額度。</p></section>
</div>

不要把 API key 貼進對話、截圖、文件或 Git Repository。安裝程式與 Extension 也只從官方頁面取得。

## 參考資料

- [ChatGPT desktop app](https://chatgpt.com/download/)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Authentication](https://learn.chatgpt.com/docs/auth)
- [Visual Studio Code](https://code.visualstudio.com/)

<p class="source-note">安裝步驟依 2026-07-19 OpenAI 官方文件核對。App 與 IDE 圖片由實機截圖整理；Visual Studio Code 圖示取自 Microsoft 官方品牌素材。</p>
