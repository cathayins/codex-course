---
title: Codex App
description: 認識 Codex App 的主要畫面、左右側邊欄與常用設定。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Codex App

<figure class="interface-figure interface-figure--hero">
  <img src="/images/quick-start/codex-app-interface.png" alt="Codex App 完整介面，左側是專案與任務，中間是對話，右側顯示檔案變更">
</figure>

## 畫面分成三個部分

<div class="screen-zones">
  <section><span>左側</span><h3>找專案與任務</h3><p>建立新任務、回到之前的工作，或打開 Plugin 與設定。</p></section>
  <section><span>中央</span><h3>和 Codex 說明工作</h3><p>交代目標、補充檔案，也在這裡看它目前做到哪裡。</p></section>
  <section><span>右側</span><h3>打開工作成果</h3><p>看檔案、終端機、網站預覽與本次修改的差異。</p></section>
</div>

## 左側：專案與任務都在這裡

<div class="sidebar-guide">
  <div class="refined-media refined-media--tall refined-media--sidebar-compact">
    <div class="refined-media__window">
      <img src="/images/quick-start/app-left-sidebar.png" alt="Codex App 左側欄，包含新增任務、網站、已排程、外掛程式、專案與任務">
    </div>
  </div>
  <div class="sidebar-guide__copy">
    <h3>看工作需不需要一個資料夾</h3>
    <p><strong>專案</strong>會連到一個工作資料夾。Codex 可以讀取、建立或修改裡面的檔案，適合網站、報告、資料整理等需要持續留下成果的工作。</p>
    <p><strong>任務</strong>比較像臨時對話，不一定先指定資料夾。適合先問問題、整理想法或做一次性的內容；確定要動到本機檔案時，再從專案開始會比較清楚。</p>
  </div>
</div>

## 右側：需要核對成果時再打開

按右上角的側邊面板圖示，就能叫出這組工具。macOS 畫面顯示的快捷鍵是 <kbd>Option</kbd> + <kbd>Command</kbd> + <kbd>B</kbd>；若你改過快捷鍵，以自己 App 裡顯示的為準。

<MediaTabs
  aria-label="Codex App 右側面板"
  :items="[
    {
      label: '檢閱（審查）｜Diff',
      title: '先看這次到底改了什麼',
      description: '在 Git 專案裡，可以用檢閱畫面比較新增與刪除的內容。Codex 說「已完成」之後，先看變更範圍是否符合交辦，再決定要不要繼續調整。',
      image: '/images/quick-start/app-right-review.png',
      alt: 'Codex App 主任務與右側檢閱面板，顯示分支差異和變更檔案',
      note: '一般文件或試算表不一定會顯示程式碼 Diff；這時改用「檔案」直接打開成品。',
      fit: 'compact'
    },
    {
      label: '終端機｜Terminal',
      title: '看指令、測試與錯誤訊息',
      description: 'Codex 執行安裝、測試或建置時，終端會留下實際輸出。網站跑不起來或測試失敗，不必只看最後一句摘要，打開終端通常更快找到原因。',
      image: '/images/quick-start/app-right-terminal.png',
      alt: 'Codex App 主任務與右側終端，顯示目前工作資料夾與命令列輸出',
      fit: 'compact'
    },
    {
      label: '瀏覽器｜Browser',
      title: '直接看網站現在長什麼樣子',
      description: '做網站或互動頁面時，可以在 App 裡預覽結果，也能操作按鈕、表單與不同頁面。畫面和需求不一樣，就留在原本任務裡繼續說要改哪裡。',
      image: '/images/quick-start/app-right-browser.png',
      alt: 'Codex App 主任務與右側瀏覽器，顯示 Google 網站',
      fit: 'compact'
    },
    {
      label: '檔案｜Files',
      title: '打開 Codex 建立或修改的檔案',
      description: '報告、Markdown、CSV 或其他成果，都可以從檔案面板直接打開。除了確認檔名，也要抽查數字、段落與格式，確定內容真的符合這次交辦。',
      image: '/images/quick-start/app-right-files.png',
      alt: 'Codex App 主任務與右側檔案面板，顯示工作資料夾的檔案樹',
      fit: 'compact'
    }
  ]"
/>

## 設定｜Settings

從 App menu 打開 **Settings**。macOS 可按 <kbd>Command</kbd> + <kbd>,</kbd>，Windows 可按 <kbd>Ctrl</kbd> + <kbd>,</kbd>。
<MediaTabs
  aria-label="Codex App 設定頁面"
  :items="[
    {
      label: '一般',
      title: '先確認 Codex 可以做到哪裡',
      description: '一般設定裡最重要的是檔案權限。預設權限適合多數工作；完整存取權限則代表 Codex 能接觸更大的本機範圍，只有真的需要時才開。這裡也能調整語言、檔案預設用哪個 App 開啟，以及長任務進行時是否避免電腦睡眠。',
      image: '/images/quick-start/settings-general.png',
      alt: 'Codex App 一般設定，顯示預設權限、自動審查、完整存取權限與日常選項',
      table: {
        caption: '一般設定會影響什麼',
        headers: ['設定', '代表什麼'],
        rows: [
          ['預設權限', 'Codex 可以讀取及編輯目前工作區；需要接觸其他位置時，再另外詢問。'],
          ['自動審查', '由 reviewer agent 檢查部分額外權限請求，但不會因此擴大原本的存取範圍。'],
          ['完整存取權限', '允許 Codex 接觸更大的本機與網路範圍，風險較高，只在工作真的需要時開啟。'],
          ['檔案預設開啟目的地', '決定從 Codex 打開檔案時，要交給 VS Code 或其他 App。'],
          ['語言', '調整 App 的介面語言；當次希望用哪種語言回覆，仍可直接寫在訊息裡。'],
          ['選單列與底部面板', '決定 Codex 是否留在系統選單列，以及 App 底部是否顯示工具面板。'],
          ['終端機位置', '設定終端機預設出現在畫面底部或右側。'],
          ['執行時防止睡眠', '長任務進行時讓電腦保持喚醒，避免本機工作被睡眠中斷。']
        ]
      },
      note: '第一次使用先保留預設權限即可。若公司裝置有管理政策，能否變更完整存取權限也可能由管理員決定。',
      fit: 'settings'
    },
    {
      label: '外觀',
      title: '把畫面調成自己看得清楚的樣子',
      description: '可以跟著系統，也可以固定使用淺色或深色主題。需要長時間閱讀 Diff 或程式碼時，再調整強調色、背景、前景與字型；投影授課則優先確認字夠大、對比夠清楚，不必追求和別人的畫面完全一樣。',
      image: '/images/quick-start/settings-appearance.png',
      alt: 'Codex App 外觀設定，顯示系統、淺色、深色主題與程式碼配色',
      fit: 'settings'
    },
    {
      label: '寵物',
      title: '用小角色看工作狀態',
      description: 'Pet 可以浮在其他視窗上方，讓你不用一直切回 Codex 也能看到任務狀態。它會分成 Running、Needs input、Ready 與 Blocked；同時有多個任務時，會先提醒需要你回覆或核准的那一個。選哪隻只改外觀，不會改變 Codex 的能力。',
      image: '/images/quick-start/settings-pets.png',
      alt: 'Codex App 寵物設定，顯示 Codex、Dewey、Fireball 與 Hoots 等角色',
      note: '可從 Settings > Pets 選擇角色，再輸入 /pet 叫出或收起。Pet 位置會保留到下次開啟 App。',
      fit: 'settings'
    },
    {
      label: '個人化',
      title: '把長期偏好留給 Codex',
      description: '這裡適合放每次都成立的偏好，例如「使用繁體中文、先講結論、技術名詞保留英文」。語氣、自訂指示與記憶會影響後續任務，但不應拿來放某一次工作的截止日或檔名；當次目標與限制，仍要寫在當次訊息裡。',
      image: '/images/quick-start/settings-personalization.png',
      alt: 'Codex App 個人化設定，顯示回覆語氣、自訂指示與記憶選項',
      table: {
        caption: '個人化設定會影響什麼',
        headers: ['項目', '代表什麼'],
        rows: [
          ['性格', '選擇 Friendly、Pragmatic 或 None，決定平常回覆的預設語氣。'],
          ['自訂指示', '留下跨任務都成立的偏好，例如使用繁體中文、先講結論，或保留英文技術名詞。'],
          ['啟用記憶', '允許 Codex 從過去任務保留穩定偏好與工作脈絡，帶到之後的任務。'],
          ['允許工具任務產生記憶', '決定使用 MCP、網路搜尋或其他工具時，相關內容是否也能成為記憶來源。'],
          ['重設記憶', '清除目前保存的記憶；不會同時刪除原本的任務或工作檔案。']
        ]
      },
      note: '個人化適合放長期偏好。某一次工作的目標、期限與檔名，仍然要寫在當次訊息裡；記憶是否可用也會依帳號與 Workspace 設定而異。',
      fit: 'settings'
    },
    {
      label: 'Plugins',
      title: '管理 Codex 可以使用的工具',
      description: 'Plugin 頁面會列出 Codex 可以叫用的文件、PDF、試算表、瀏覽器與其他工具。先把工作會用到的項目打開即可；清單太長不會讓結果更好。公司帳號能看到哪些 Plugin，也會受到 Workspace 安裝狀態、授權與管理政策影響。',
      image: '/images/quick-start/settings-plugins.png',
      alt: 'Codex App Plugin 管理頁，顯示文件、PDF、試算表與簡報等工具',
      table: {
        caption: 'Plugin 頁面裡會看到什麼',
        headers: ['項目', '代表什麼'],
        rows: [
          ['Plugins', '把一組相關能力包在一起，例如文件處理、資料分析或網站製作；可以依工作需要開啟或停用。'],
          ['Apps', '連接 SharePoint、GitHub、Google Drive 等服務，讓 Codex 在授權範圍內讀取資料或執行動作。'],
          ['MCP', '提供外部工具與資料來源的連線。多數使用者直接使用已設定好的項目即可，連線細節通常由管理員處理。'],
          ['Skills', '保存可重複使用的工作方法與步驟，讓 Codex 遇到同類任務時按照一致的做法處理。']
        ]
      },
      note: '安裝或啟用新 Plugin 後，通常要開一個新的任務才會載入。可以直接描述想要的結果，也可以用 @ 明確指定要使用的 Plugin。',
      fit: 'settings'
    },
    {
      label: '使用量',
      title: '個人帳號看百分比，Enterprise 看 Credits',
      description: '一般月訂閱帳號主要看到週期還剩多少百分比，以及下一次重設時間。採 Credits 計費的 Enterprise／Edu Workspace 會從公司的共享額度扣除；管理員可以設定 Workspace、群組或個別使用者的月額度，所以每位使用者看到的是自己目前可用的 Credits 上限與已使用量。',
      image: '/images/quick-start/settings-usage.png',
      alt: 'Codex App 使用量與帳單設定，顯示方案、點數與使用上限',
      table: {
        caption: 'GPT-5.6 token-based rate card｜每 100 萬 tokens 使用的 Credits',
        headers: ['Model', 'Input', 'Cached input', 'Output'],
        rows: [
          ['GPT-5.6 Sol', '125', '12.5', '750'],
          ['GPT-5.6 Terra', '62.5', '6.25', '375'],
          ['GPT-5.6 Luna', '25', '2.5', '150']
        ]
      },
      note: '不是每開一個任務就扣固定點數。Input 是送進模型的 Prompt、檔案與對話內容；重複使用的內容可能按 cached input 計；output 是模型產生的內容。三者各自依表中費率換算後，再加總成 Credits。模型不同，費率也不同；輸出多、任務長或使用 Fast mode，通常會消耗得更快。費率依 2026-07-19 OpenAI Codex rate card。',
      fit: 'settings'
    }
  ]"
/>

「後續跟進行為」也在一般設定裡，但它要搭配實際任務才好理解。我們會在下一頁操作 Steer 與 Queue 時再回來看。

## 參考資料

- [Codex App](https://learn.chatgpt.com/docs/app)
- [Settings](https://learn.chatgpt.com/docs/reference/settings)
- [Pets](https://learn.chatgpt.com/docs/pets?surface=app)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card)
- [Enterprise usage limits](https://help.openai.com/en/articles/20001001)

<p class="source-note">介面名稱、Pets、Credits 與設定依 2026-07-19 OpenAI 官方文件核對。圖片保留真實介面內容，外層以課程網站的背景與視窗框重新整理；實際選項仍會隨 App 版本與 Workspace 政策調整。</p>
