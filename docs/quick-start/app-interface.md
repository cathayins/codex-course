---
title: Codex App
description: 認識 Codex App 的主要畫面、左右側邊欄與常用設定。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Codex App

<figure class="interface-figure interface-figure--hero">
  <img src="/images/quick-start/codex-app-interface.webp" width="1800" height="885" loading="eager" fetchpriority="high" decoding="async" alt="Codex App 完整介面，左側是專案與任務，中間是對話，右側顯示檔案變更">
</figure>

## 介面的三大區塊

<div class="screen-zones">
  <section><span>左側</span><h3>開始任務</h3><p>建立新任務、回到之前的工作，或打開 Plugin 與設定。</p></section>
  <section><span>中央</span><h3>和 Codex 說明工作</h3><p>交代目標、補充檔案，也在這裡看它目前做到哪裡。</p></section>
  <section><span>右側</span><h3>工作站台</h3><p>看檔案、終端機、網站預覽與本次修改的差異。</p></section>
</div>

## 左側開始｜New thread

<div class="sidebar-guide">
  <div class="refined-media refined-media--tall refined-media--sidebar-compact">
    <div class="refined-media__window">
      <img src="/images/quick-start/app-left-sidebar.png" width="241" height="342" loading="lazy" decoding="async" alt="Codex App 左側欄，包含新增任務、網站、已排程、外掛程式、專案與任務">
    </div>
  </div>
  <div class="sidebar-guide__copy">
    <h3>專案 vs 任務｜持續工作或臨時對話</h3>
    <p><strong>專案</strong> <br> 專案會綁定一個資料夾。Codex 可以讀取、建立或修改裡面的檔案，適合網站、報告、資料整理等需要持續留下成果的工作。</p>
    <p><strong>任務</strong> <br> 任務不用指定資料夾，適合先問問題、整理想法或處理一次性內容。確定要修改本機檔案時，再建立專案會更清楚。</p>
  </div>
</div>

## 側邊欄｜Side Panel

側邊欄集中顯示 Codex 建立的文件、程式、簡報、網站，以及執行過程留下的資訊。

<MediaTabs
  aria-label="Codex App 右側面板"
  :items="[
    {
      label: '檔案',
      title: '打開 Codex 建立或修改的檔案',
      description: '報告、Markdown、CSV 或其他成果，都可以從檔案面板直接打開。除了確認檔名，也要抽查數字、段落與格式，確定內容真的符合這次交辦。',
      image: '/images/quick-start/app-right-files-zh-tw.png',
      alt: 'Codex App 主任務與右側檔案面板，顯示工作資料夾的檔案樹',
      fit: 'compact'
    },
    {
      label: '檢閱（審查）',
      title: '先看這次到底改了什麼',
      description: '在 Git 專案裡，可以用檢閱畫面比較新增與刪除的內容。Codex 說「已完成」之後，先看變更範圍是否符合交辦，再決定要不要繼續調整。',
      image: '/images/quick-start/app-right-review-zh-tw.png',
      alt: 'Codex App 主任務與右側檢閱面板，顯示分支差異和變更檔案',
      note: '一般文件或試算表不一定會顯示程式碼 Diff；這時改用「檔案」直接打開成品。',
      fit: 'compact'
    },
    {
      label: '瀏覽器',
      title: '直接看網站現在長什麼樣子',
      description: '做網站或互動頁面時，可以在 App 裡預覽結果，也能操作按鈕、表單與不同頁面。畫面和需求不一樣，就留在原本任務裡繼續說要改哪裡。',
      image: '/images/quick-start/app-right-browser-zh-tw.png',
      alt: 'Codex App 主任務與右側瀏覽器，顯示 Google 網站',
      fit: 'compact'
    },
    {
      label: '終端機',
      title: '看指令、測試與錯誤訊息',
      description: 'Codex 執行安裝、測試或建置時，終端會留下實際輸出。網站跑不起來或測試失敗，不必只看最後一句摘要，打開終端通常更快找到原因。',
      image: '/images/quick-start/app-right-terminal-zh-tw.png',
      alt: 'Codex App 主任務與右側終端，顯示目前工作資料夾與命令列輸出',
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
      title: '一般常用設定',
      description: '一般設定會決定檔案從哪裡開啟、是否顯示 Context 使用量，以及 Codex 工作時，新訊息要立即介入還是先排隊。下面是課程建議的設定，你也可以依自己的工作方式調整。',
      image: '/images/quick-start/settings-general-zh-tw.png',
      alt: 'Codex App 中文一般設定，檔案預設開啟目的地設為 File Explorer',
      settingsDemo: 'general',
      table: {
        caption: '課程示範建議',
        headers: ['設定', '建議值', '為什麼'],
        rows: [
          ['檔案預設開啟目的地', 'File Explorer', '從 Codex 打開檔案或資料夾時，直接回到 Windows 檔案總管，方便確認位置與管理成果。'],
          ['撰寫工具 → 顯示情境視窗使用量', '開啟', '在輸入框旁看到 Context 使用狀況；對話變長時，更容易判斷何時要 Compact 或另開任務。'],
          ['後續跟進行為', '排入佇列', 'Codex 工作中送出的新訊息先等待，不會直接中斷目前進度；真的要立即改方向時，再切換成 Steer。']
        ]
      },
      note: '如果你習慣從 VS Code 開檔，或希望每次補充都立刻介入，也可以改用其他選項。請依自己的工作方式調整。',
      fit: 'settings'
    },
    {
      label: '外觀',
      title: '為了您的眼睛好，建議調成深色',
      description: '可以跟著系統，也可以固定使用淺色或深色主題。需要長時間閱讀 Diff 或程式碼時，再調整強調色、背景、前景與字型；投影授課則優先確認字夠大、對比夠清楚，不必追求和別人的畫面完全一樣。',
      image: '/images/quick-start/settings-appearance-zh-tw.png',
      alt: 'Codex App 中文外觀設定，顯示系統、淺色、深色主題與程式碼配色',
      fit: 'settings'
    },
    {
      label: '寵物',
      title: '為了您的心情好，可以喚起一隻寵物',
      description: 'Pet 會浮在其他視窗上方，不必切回 Codex 也能看到任務狀態。狀態分成 Running、Needs input、Ready 與 Blocked；同時有多個任務時，它會先提醒需要你回覆或核准的那一個。選哪隻只會改變外觀，不會影響 Codex 的能力。',
      image: '/images/quick-start/settings-pets-zh-tw.png',
      alt: 'Codex App 中文寵物設定，顯示 Codex、Dewey、Fireball 與 Hoots 等角色',
      note: '可從 Settings > Pets 選擇角色，再輸入 /pet 叫出或收起。Pet 位置會保留到下次開啟 App。',
      fit: 'settings'
    },
    {
      label: '個人化',
      title: '如何讓 Codex 更懂你',
      description: '目前記憶功能仍在實驗階段（Beta），建議可先關閉。關閉後，結果會以當次 Prompt、檔案與設定為主；之後可再依需要開啟。',
      image: '/images/quick-start/settings-memory-zh-tw.png',
      alt: 'Codex App 中文個人化設定，顯示自訂指示與記憶選項，啟用記憶目前關閉',
      settingsDemo: 'memory',
      table: {
        caption: '個人化設定會影響什麼',
        headers: ['項目', '代表什麼'],
        rows: [
          ['性格', '選擇 Friendly、Pragmatic 或 None，決定平常回覆的預設語氣。'],
          ['自訂指示', '留下跨任務都成立的偏好，例如使用繁體中文、先講結論，或保留英文技術名詞。'],
          ['啟用記憶', '課程任務建議關閉，避免過去任務的內容影響這次示範；日常使用可依需要開啟。'],
          ['允許工具任務產生記憶', '決定 MCP、網路搜尋或其他工具取得的內容能否成為記憶來源；只有啟用記憶時才需要考慮。'],
          ['重設記憶', '清除目前保存的記憶；不會同時刪除原本的任務或工作檔案。']
        ]
      },
      note: '關閉記憶不會刪除任務或工作檔案。某一次工作的目標、期限與檔名，仍然要寫在當次訊息裡。',
      fit: 'settings'
    },
    {
      label: '外掛程式',
      title: '工具管理｜Plugins, Skills, MCP',
      description: '外掛程式頁會列出 Browser、Chrome、Visualize 等已安裝能力，也能切換到應用程式、MCP 與市集。需要哪個就開哪個；全部啟用不會讓結果自動變好。公司帳號可用的項目也會受到 Workspace 授權與管理政策影響。',
      image: '/images/quick-start/settings-plugins-zh-tw.png',
      alt: 'Codex App 中文外掛程式設定，顯示 Browser、Chrome、Visualize 與 Ponytail 等項目',
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
      title: '查看使用量狀況',
      description: '一般月訂閱帳號會顯示本週期的剩餘百分比和下次重設時間。採 Credits 計費的 Enterprise／Edu Workspace 則使用公司共享額度；管理員可以替 Workspace、群組或個別使用者設定月額度。',
      image: '/images/quick-start/settings-usage.webp',
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

課程會先把「後續跟進行為」設為 Queue，讓一般補充等目前工作完成後再執行；需要立刻改方向時，才切換成 Steer。

## 參考資料

- [Codex App](https://learn.chatgpt.com/docs/app)
- [Settings](https://learn.chatgpt.com/docs/reference/settings)
- [Pets](https://learn.chatgpt.com/docs/pets?surface=app)
- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card)
- [Enterprise usage limits](https://help.openai.com/en/articles/20001001)

<p class="source-note">介面名稱、Pets、Credits 與設定依 2026-07-19 OpenAI 官方文件核對；截圖則以目前繁體中文 App 畫面為準。File Explorer、Context 使用量、Queue 與關閉記憶是本課程的示範建議，不是官方強制預設。實際選項仍會隨 App 版本與 Workspace 政策調整。</p>
