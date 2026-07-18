---
title: Codex App
description: 認識 Codex App 的畫面、輸入方式、Enterprise Credits 與個人設定。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Codex App：先認得畫面，再開始工作

<p class="lesson-lead">第一次打開 App，先確認它現在連到哪個資料夾。接著再看輸入框、執行方式，以及結果會出現在哪裡。</p>

<figure class="interface-figure">
  <img src="/images/quick-start/codex-app-official-v2.webp" alt="Codex App 執行本機資料任務的畫面，包含工作進度、composer、權限、模型、推理強度與工作模式">
</figure>

## 畫面上有哪些東西

<div class="interface-map">
  <section><span>左邊</span><b>專案與對話</b><p>在這裡切換資料夾、對話和正在執行的工作。</p></section>
  <section><span>畫面上方</span><b>目前的資料夾</b><p>送出任務前，先確認 Codex 正在正確的資料夾裡。</p></section>
  <section><span>畫面下方</span><b>輸入框</b><p>在這裡交代工作、加入檔案，或指定 Plugin。</p></section>
  <section><span>輸入框旁</span><b>模型、模式與權限</b><p>選擇怎麼執行，以及這次允許 Codex 做到哪裡。</p></section>
  <section><span>對話中</span><b>回覆與檔案</b><p>Codex 的說明、修改內容和新檔案都會出現在這裡。</p></section>
</div>

送出第一句話前，先看資料夾名稱。很多第一次使用時遇到的問題，不是 Prompt 寫得不好，而是開錯了資料夾。

## 輸入框裡的 `@`、`/` 和 `$`

<div class="syntax-grid syntax-grid--projector">
  <section><kbd>@</kbd><h3>叫出檔案或 Plugin</h3><p>已經知道這次要用什麼，就直接點名。清單內容會依安裝項目與公司設定不同。</p></section>
  <section><kbd>/</kbd><h3>打開 Codex 指令</h3><p>切換 Plan、查看目前狀態，或整理已經太長的對話。</p></section>
  <section><kbd>$</kbd><h3>指定一個 Skill</h3><p>想讓 Codex 按照某套固定做法執行，就從這裡選。</p></section>
</div>

<figure class="interface-figure interface-figure--composer">
  <img src="/images/quick-start/plugin-github-invoke.png" alt="Codex App 輸入框中已加入 GitHub Plugin，並顯示模型、推理強度、執行位置、權限與分支設定">
</figure>

這裡用的是正斜線 `/`。Windows 路徑常見的反斜線 `\`，不是 Codex 指令。

### 用 `@` 點名這次的檔案

```text
請讀取 @q2-campaign.csv 與 @budget.xlsx，
回答哪三個渠道值得加碼。先不要修改來源檔。
```

只要加入這次真的會用到的資料。資料夾裡有二十份檔案，不代表每一份都要手動 `@`；不確定時，可以先請 Codex 盤點，再挑出重要來源。

### 先記這三個 `/` 指令

| 指令 | 什麼時候用 | 會發生什麼 |
|---|---|---|
| `/plan` | 任務牽涉多個步驟，想先談好怎麼做 | Codex 先查看現況、列出做法，還不會立刻修改 |
| `/status` | 想看目前這段對話的狀態 | 顯示 chat ID、Context usage 與使用限制 |
| `/compact` | 同一件事聊了很久，內容已經太長 | 先整理前面的重點，再接著做下去 |

只改一個小地方時，可以直接請 Codex 動手。牽涉多個檔案、需要先查現況，或改錯的代價比較高時，再開 Plan 先談做法。

## Credits 還剩多少

這堂課使用 Enterprise 帳號。先知道自己的使用額度是否快到上限，以及 Workspace 還有沒有 Credits，就夠了。

<figure class="screenshot-slot screenshot-slot--wide credits-screenshot">
  <div>ENTERPRISE CREDITS SCREENSHOT</div>
  <figcaption>
    <b>待換成公司 Enterprise 的 Credits／Usage 畫面</b>
    <span>保留剩餘 Credits、使用進度與重設時間；請遮住 Workspace 名稱、帳號與合約金額。</span>
  </figcaption>
</figure>

<div class="metric-grid metric-grid--credits">
  <section><span>一般使用者</span><b>看自己的使用額度</b><p>快到上限或暫時不能使用時，依公司流程申請增加額度。</p></section>
  <section><span>Workspace 管理者</span><b>看整體 Credits</b><p>到 Billing 或 Analytics 查看剩餘額度、使用狀況與提醒。</p></section>
</div>

每個人看到的選單不一定相同，會依公司設定和帳號權限而定。Credits 是使用額度；`/status` 裡的 Context，則是目前這段對話還能容納多少內容。

## 帳號和偏好設定

在 App menu 打開 **Settings**，或使用：

- macOS：`Cmd + ,`
- Windows：`Ctrl + ,`

<div class="settings-grid">
  <section><span>GENERAL</span><h3>送出訊息與長任務</h3><p>調整 Enter 的行為、Follow-up behavior，以及長任務時是否讓電腦保持喚醒。</p></section>
  <section><span>PROFILE</span><h3>帳號與 Credits</h3><p>確認目前登入的帳號，以及這個 Workspace 開放給你的使用資訊。</p></section>
  <section><span>PERSONALIZATION</span><h3>回答方式</h3><p>選擇回覆風格，也可以寫下希望 Codex 長期記得的偏好。</p></section>
  <section><span>APPEARANCE</span><h3>字體與配色</h3><p>調整主題、前景色、背景色與字型。投影前可以先把對比和字級調好。</p></section>
</div>

像是「請用繁體中文、先講結論、技術名詞保留英文」這種長期偏好，可以放在 Personalization。這一次要做什麼、有哪些限制，還是寫在當次訊息裡最清楚。

## 參考資料

- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Settings](https://learn.chatgpt.com/docs/reference/settings)
- [Slash commands](https://learn.chatgpt.com/docs/reference/slash-commands)
- [Enterprise／Edu 使用額度與 Credits](https://help.openai.com/en/articles/20001001-manage-usage-limits-and-overages-in-chatgpt-enterprise-and-edu)
- [Global Admin Console](https://help.openai.com/en/articles/12289294-global-admin-console)

<p class="source-note">介面與 Plugin 畫面取自 OpenAI 官方教材。`@`、`/`、`$` 的可用項目，以及 Credits 顯示位置，會依產品版本、安裝項目、帳號權限與 Workspace 政策而異。</p>
