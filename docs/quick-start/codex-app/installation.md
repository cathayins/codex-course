---
title: 安裝 Codex App
description: 依公司提供的流程安裝 Codex App，完成登入並認識 Windows 上的 Codex 本機資料夾。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial codex-app-installation-page
---

# 安裝 Codex App

<p class="lesson-lead">本課程使用 Codex App。安裝完成後，以公司提供且具備 Codex 權限的 ChatGPT 帳號登入。</p>

<LessonBlock
  id="internal-installation"
  title="國泰產險內部安裝方式"
  description="公司內部環境使用公司提供的軟體申請與安裝流程。"
  tone="accent"
>
  <div class="internal-install-note">
    <strong>安裝來源以公司流程為準</strong>
    <p>國泰產險內部環境無法直接開啟 Codex App 官方下載頁，請依公司提供的軟體申請與安裝流程取得安裝程式。若畫面、版本或權限要求與教材不同，以公司內部流程為準。</p>
  </div>

  <ol class="installation-checklist">
    <li><span>01</span><div><strong>取得安裝程式</strong><p>依公司提供的軟體申請與安裝流程完成安裝。</p></div></li>
    <li><span>02</span><div><strong>登入公司帳號</strong><p>開啟 App，使用公司提供且具備 Codex 權限的 ChatGPT 帳號登入。</p></div></li>
    <li><span>03</span><div><strong>確認 Codex 可以使用</strong><p>切換至 Codex，並確認畫面中可以新增 Project 或 Task。實際可用功能仍以 Workspace 權限與公司設定為準。</p></div></li>
  </ol>
</LessonBlock>

<LessonBlock
  id="codex-home-directory"
  title="Codex 的本機資料夾"
  description="設定、登入快取與任務紀錄會保存在 Windows 使用者目錄中。"
>
  <div class="codex-home-path">
    <span>Windows</span>
    <code>C:\Users\&lt;員工編號&gt;\.codex</code>
  </div>

  <p>Codex 的本機資料通常位於上方路徑。這個資料夾會保存設定、登入快取與任務紀錄等資料；Log 的位置可能依版本或 <code>log_dir</code> 設定不同。一般使用時不需要手動修改，之後處理設定或除錯問題時可能會用到。</p>
</LessonBlock>

<LessonBlock
  id="windows-sandbox-troubleshooting"
  title="Windows 沙箱設定卡住怎麼辦？"
  description="若安裝後停在「完成 Windows 設定」，依序重新測試、清除登入快取；仍無法完成，再蒐集 Log 回報協助排查。"
>
  <WindowsSandboxGuide />
</LessonBlock>

## 參考資料

- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [ChatGPT desktop app for Windows](https://learn.chatgpt.com/docs/windows/windows-app)
- [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)
- [Codex authentication](https://learn.chatgpt.com/docs/auth)
- [Codex Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)

<p class="source-note">Codex App、Windows 使用者目錄、登入快取與沙箱 Log 位置依 2026-09-14 OpenAI 官方文件核對；國泰產險內部的下載、安裝與 Trainer／業管回報流程仍以公司提供的最新方式為準。Windows 設定畫面與流程圖為本課重製示意，並非使用者提供截圖或實際產品畫面。</p>
