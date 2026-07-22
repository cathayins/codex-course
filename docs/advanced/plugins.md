---
title: Plugins：安裝與分享完整能力包
description: 理解 Plugin 的使用情境、瀏覽與安全使用方式，並判斷何時值得建立團隊能力包。
outline: [2, 3]
pageClass: advanced-code-wrap
---

# Plugins：安裝與分享完整能力包

## 先從一個跨工具任務開始

假設你每週都要整理產品上線進度：先讀雲端文件裡的最新規格，再查看團隊訊息中的風險，最後依固定格式產出主管摘要。

要完成這項工作，除了決定整理方法，還得連接資料來源、準備可用工具，有時也要草擬內容或更新資料。如果每位同事都要自己尋找 Skill、設定 connector、理解工具名稱，再重新組合一次，導入成本會很高。

Plugin 解決的是這個問題：它把需要搭配使用的能力整理成可安裝、分享與更新的套件。

<figure class="plugins-scenario-map" aria-labelledby="plugins-scenario-title">
  <figcaption>
    <span>METHOD + CONNECTION + TOOLS</span>
    <strong id="plugins-scenario-title">Plugin 組合完成同類工作所需的能力</strong>
    <small>每個 Plugin 包含的元件不同，請以 Plugin 詳細資料為準。</small>
  </figcaption>
  <div class="plugins-scenario-map__flow" role="group" aria-label="從工作方法、外部連線與工具組合成 Plugin，再產生工作成果">
    <article>
      <b>01 · METHOD</b>
      <strong>Skills</strong>
      <p>定義這類任務的步驟、格式與品質標準。</p>
    </article>
    <span class="plugins-scenario-map__plus" aria-hidden="true">＋</span>
    <article>
      <b>02 · CONNECTION</b>
      <strong>Connectors／Apps</strong>
      <p>登入並連接文件、訊息、設計或商務系統。</p>
    </article>
    <span class="plugins-scenario-map__plus" aria-hidden="true">＋</span>
    <article>
      <b>03 · CAPABILITY</b>
      <strong>MCP tools 等能力</strong>
      <p>提供可讀取資料或執行動作的結構化工具。</p>
    </article>
    <span class="plugins-scenario-map__arrow" aria-hidden="true">→</span>
    <article class="is-result">
      <b>PLUGIN</b>
      <strong>可安裝的工作流</strong>
      <p>讓團隊共用相同的方法與工具，安全完成同類任務。</p>
    </article>
  </div>
</figure>

Plugin 可以只包含 Skills，也可以加入 connectors、MCP servers 或其他選用元件。它將一組成熟能力整理成**可安裝、可分享、可治理**的工作流；單純加長 Prompt 無法取代這層封裝。

本章以 [Skills](/advanced/skills) 與 [上一章：MCP 與外部工具](/advanced/mcp-tools) 為基礎：前者定義工作方法，後者提供即時資料與 tools。

<section class="lesson-goals" aria-labelledby="plugins-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="plugins-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>在目前環境中找到合適的 Plugin，完成安裝並安全執行第一個任務，再判斷何時使用 Prompt、Skill 或 Plugin。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>讀懂定位</strong><span>看懂 Plugin 如何組合 Skills、Apps 與 MCP。</span></article>
    <article><strong>完成首次使用</strong><span>會瀏覽、審查、安裝、連線並在新 task 驗證。</span></article>
    <article><strong>守住資料邊界</strong><span>確認 Workspace／Codex、Plugin 與外部帳號三層權限。</span></article>
    <article><strong>判斷是否建立</strong><span>確認能力已經成熟，而且需要提供給多人使用後，再封裝成 Plugin。</span></article>
  </div>
</section>

### Plugin 如何組合既有元件

Plugin 在這些元件之外，增加了一層可安裝與分享的封裝：

> **Skill（工作方法）＋ App／MCP（連線與 tools）→ Plugin（可安裝、可分享的能力包）**

Prompt 負責描述單次任務的資料與限制。當方法、連線或其他能力需要一起安裝、版本化或交付給多人時，再使用 Plugin。

<nav class="plugins-route-map" aria-label="Plugins 學習路徑">
  <a class="plugins-route-card is-basic" href="#basic">
    <span>從這裡開始</span>
    <strong>Basic｜選擇、安裝與安全使用</strong>
    <small>確認介面 → 閱讀詳細資料 → 安裝連線 → 新 task 驗證</small>
  </a>
  <span class="plugins-route-map__connector" aria-hidden="true">＋</span>
  <a class="plugins-route-card is-advanced" href="#advanced">
    <span>繼續深入</span>
    <strong>Advanced｜拆解、組合與分享</strong>
    <small>看懂組成 → 對照完整案例 → 管理邊界 → 建立與分享</small>
  </a>
</nav>

::: tip 建議學習方式
Plugin 清單會依環境而異，不必和課堂畫面完全相同。第一次接觸時，先完成 Basic 練習，從自己的環境選擇一個 Plugin、讀懂內容並完成低風險驗證。
:::

## Basic｜選擇、安裝與安全使用 {#basic}

<header class="plugins-chapter-banner is-basic">
  <span>BASIC · USE AN EXISTING PLUGIN</span>
  <strong>安裝前先確認內容，首次使用從低風險任務開始</strong>
  <p>使用現有 Plugin 不必先理解 manifest 或 marketplace。從目前可用的清單中選擇合適項目，確認連線帳號與資料範圍，再完成一次可檢查的任務。</p>
</header>

<nav class="lesson-flow" aria-label="Basic 學習流程">
  <span><b>01</b> 確認支援介面</span>
  <span><b>02</b> 瀏覽來源</span>
  <span><b>03</b> 安裝前審查</span>
  <span><b>04</b> 安裝與連線</span>
  <span><b>05</b> 低風險驗證</span>
</nav>

### 1｜先確認目前使用的介面支援 Plugins

Plugin 的實際操作介面是 ChatGPT 或 Codex，開始前先確認目前使用的介面是否支援。

<div class="plugins-surface-grid" role="list" aria-label="Plugins 支援與不支援的產品介面">
  <article class="is-supported" role="listitem"><span>支援</span><strong>ChatGPT 網頁版</strong><p>切換到 <b>Work mode</b>，再開啟 Plugins。</p></article>
  <article class="is-supported" role="listitem"><span>支援</span><strong>ChatGPT Desktop App</strong><p>使用 Work mode，或選擇 Codex 後開啟 Plugins。</p></article>
  <article class="is-supported" role="listitem"><span>支援</span><strong>Codex CLI</strong><p>執行 Codex 後輸入 <code>/plugins</code> 開啟瀏覽器。</p></article>
  <article class="is-unsupported" role="listitem"><span>目前不支援</span><strong>其他介面</strong><p>Chat mode、IDE extension 與 mobile 目前沒有 Plugin browser。</p></article>
</div>

如果畫面中完全找不到 Plugins，先確認目前不在 Chat mode 或 IDE extension，再檢查 App 版本、帳號、Workspace 政策與地區可用性。

::: warning 介面與清單會持續更新
Plugin 名稱和畫面位置可能改變。使用時應確認來源、查看功能說明、辨識權限，再用低風險任務驗證。
:::

### 2｜瀏覽來源，不要只看名稱

Plugins Directory 可能依來源分成：

- **OpenAI**：由 OpenAI 提供的 Plugins。
- **Workspace 名稱**：由目前 Workspace 提供或管理的 Plugins。
- **Personal**：個人 marketplace；若目前環境支援，也會顯示 Created by me 與 Shared with me。
- **Installed**：目前已安裝的 Plugins；這是狀態，不是另一個作者來源。

<figure class="course-visual" aria-labelledby="plugins-shot-directory-title">
  <div class="media-tabs__stage is-compact">
    <div class="media-tabs__glow" aria-hidden="true"></div>
    <div class="media-tabs__window">
      <img src="/images/plugins/plugins_directory.png" width="814" height="708" alt="Plugins Directory 畫面，顯示已安裝的 Plugins、Public 與 Personal 分頁，以及 Featured 清單" loading="lazy" decoding="async">
    </div>
  </div>
  <figcaption id="plugins-shot-directory-title">這個畫面展示 Installed、Public 與 Personal 分頁，以及 Featured 清單；先確認來源是否可信、用途是否符合需求，再打開詳細資料。</figcaption>
</figure>

先用一句話寫下你要解決的工作，再比較 Plugin 詳細資料。名稱看起來相似，不代表它們使用相同資料、執行相同動作或遵循相同流程。

### 3｜安裝前，從五個面向檢查詳細資料

安裝前，請從五個面向檢查 Plugin：用途、連線、能力、資訊與授權範圍。每個面向都有對應的檢查重點與通過條件：

<MediaTabs
  class="plugins-media-tabs"
  aria-label="安裝 Plugin 前閱讀詳細資料的五個面向"
  :items="[
    {
      label: '定位與範例',
      title: '它真的解決你的問題嗎？',
      description: '先讀名稱、簡介、建議任務與完整說明，確認它處理的工作、輸入與預期成果符合你的需求；不要只因名稱相似就安裝。',
      image: '/images/plugins/plugins_intro.png',
      alt: 'Data Analytics Plugin 詳細頁，顯示名稱、簡介、建議任務與完整用途說明',
      note: '通過條件：你能用一句話說明它解決什麼，而且範例確實對應你的任務。',
      fit: 'compact'
    },
    {
      label: 'Apps 連線',
      title: '它需要連到哪些服務？',
      description: '查看需要哪些 Apps、哪些服務顯示 Connect，以及目前的連線狀態。逐一確認外部服務是否必要，並預先決定要使用的帳號與組織。',
      image: '/images/plugins/plugins_app.png',
      alt: 'Data Analytics Plugin 的 Apps 清單，顯示 Slack、Notion、Google Drive、Gmail 與行事曆等服務的連線狀態',
      note: '通過條件：每個連線都有明確用途，預計使用的帳號與組織也正確。',
      fit: 'compact'
    },
    {
      label: 'MCP 與 Skills',
      title: '它會帶入哪些能力與動作？',
      description: '展開 MCP servers 與 Skills，確認包含哪些工作方法、工具與啟用狀態。名稱只提供線索，還要理解它們會讀取哪些資料、執行哪些步驟，以及可能造成的讀寫影響。',
      image: '/images/plugins/plugins_mcp_skills.png',
      alt: 'Data Analytics Plugin 的 MCP servers 與 Skills 清單，顯示一個 MCP server 和多個已啟用的分析 Skills',
      note: '通過條件：你理解它包含哪些方法與工具，並能說明可能造成的讀寫影響。',
      fit: 'compact'
    },
    {
      label: '資訊與政策',
      title: '來源、權限與政策可信嗎？',
      description: '核對 capabilities、developer、category、版本、網站、隱私政策與服務條款。若包含 Read、Write 或其他高影響動作，確認它們符合使用需求與組織規範。',
      image: '/images/plugins/plugins_info.png',
      alt: 'Data Analytics Plugin 的 Information 區塊，顯示 capabilities、developer、category、version 與政策連結',
      note: '通過條件：來源與版本可信、權限符合需求，資料處理方式也符合組織規範。',
      fit: 'compact'
    },
    {
      label: '授權範圍',
      title: '這次實際授權了什麼？',
      description: '先確認即將前往的服務、開發者、管理員核准狀態與資料使用方式；進入服務的授權頁面後，再核對登入帳號與實際授權 scope。',
      image: '/images/plugins/plugins_authentication.png',
      alt: 'Connect Gmail 授權畫面，顯示由 OpenAI 開發、管理員已核准、資料隱私說明與前往 Gmail 的按鈕',
      note: '通過條件：服務、帳號、授權 scope 與資料用途都符合預期；任何一項不符就停止。',
      fit: 'tall'
    }
  ]"
/>

### 4｜安裝、連線，然後開啟新 task

找到合適的 Plugin 後，依序完成：

<ol class="plugins-install-journey" aria-label="從安裝 Plugin 到首次驗證的五個步驟">
  <li><b>01</b><span><strong>Install</strong><small>從詳細頁安裝，確認畫面出現 Installed 狀態。</small></span></li>
  <li><b>02</b><span><strong>Authenticate</strong><small>若需要 connector，確認登入的是正確服務與帳號。</small></span></li>
  <li><b>03</b><span><strong>Start new task</strong><small>安裝後開啟新 task／chat；CLI 則開新 session。</small></span></li>
  <li><b>04</b><span><strong>Invoke</strong><small>直接描述成果，或輸入 <code>@</code> 明確選擇 Plugin／bundled Skill。</small></span></li>
  <li><b>05</b><span><strong>Verify</strong><small>核對使用的來源、資料範圍、動作與最終結果。</small></span></li>
</ol>

安裝後必須開啟新 task，因為 bundled Skills 與 tools 會在新 task 或 CLI session 啟動時載入。若沿用安裝前開啟的對話，新增能力可能尚未出現在該 task 中。

有些 connectors 會在安裝時要求 Authentication，有些則等到第一次使用才詢問。無論在哪個時點出現，都要確認帳號、組織與授權範圍，不要只按下一步。

<figure class="course-visual" aria-labelledby="plugins-shot-composer-title">
  <div class="media-tabs__stage is-compact">
    <div class="media-tabs__glow" aria-hidden="true"></div>
    <div class="media-tabs__window">
      <img src="/images/plugins/use_plugins.png" width="778" height="451" alt="Codex 新 task 的輸入區，輸入 @ 後從 Plugins 清單明確選擇 Data Analytics" loading="lazy" decoding="async">
    </div>
  </div>
  <figcaption id="plugins-shot-composer-title">安裝後先開啟新 task，再輸入 <code>@</code> 明確選擇 Plugin；首次使用時從範圍小、容易核對的任務開始。</figcaption>
</figure>

### 選讀｜不同角色可以怎麼用 Plugin

::: details 展開六種角色型應用案例

以下列出 6 種常見角色的應用情境，說明 Plugin 可以整合哪些資源、產出哪些成果。

這些內容僅示範應用情境；實際可用項目依帳號中的 Plugins Directory 與 Workspace 政策而定。

<section class="plugins-role-gallery" aria-label="六種角色型 Plugin 的應用案例">
  <article>
    <span>DATA ANALYTICS</span>
    <strong>資料分析</strong>
    <p><b>適合對象：</b>分析師、營運與產品團隊</p>
    <p><b>產出成果：</b>指標診斷、分析報告、互動儀表板</p>
    <small>可整合資源：資料倉儲、BI 工具與試算表資料。</small>
  </article>
  <article>
    <span>CREATIVE PRODUCTION</span>
    <strong>創意製作</strong>
    <p><b>適合對象：</b>行銷、品牌與創意團隊</p>
    <p><b>產出成果：</b>活動概念、廣告變體、視覺素材組</p>
    <small>可整合資源：設計檔案、品牌資產與影像編輯工具。</small>
  </article>
  <article>
    <span>SALES</span>
    <strong>銷售工作流</strong>
    <p><b>適合對象：</b>業務、客戶成功與營收團隊</p>
    <p><b>產出成果：</b>會前簡報、後續追蹤信件草稿、風險評估整理</p>
    <small>可整合資源：CRM 系統、電子郵件與團隊通訊軟體。</small>
  </article>
  <article>
    <span>PRODUCT DESIGN</span>
    <strong>產品設計</strong>
    <p><b>適合對象：</b>PM、UX 與產品設計團隊</p>
    <p><b>產出成果：</b>方向探索、流程審查、設計原型</p>
    <small>可整合資源：參考網址、介面截圖與設計協作平台。</small>
  </article>
  <article>
    <span>PUBLIC EQUITY</span>
    <strong>公開市場研究</strong>
    <p><b>適合對象：</b>研究員與資產管理團隊</p>
    <p><b>產出成果：</b>公司競品比較、財報重點摘要、論點追蹤</p>
    <small>可整合資源：主管機關公開文件與授權市場資料庫。</small>
  </article>
  <article>
    <span>INVESTMENT BANKING</span>
    <strong>投資銀行</strong>
    <p><b>適合對象：</b>銀行家、併購與財務顧問</p>
    <p><b>產出成果：</b>簡報架構、同業估值比較、盡職調查摘要</p>
    <small>可整合資源：券商研究報告與授權財務資料。</small>
  </article>
</section>
:::

### 動手練習｜任選一個目前可用的 Plugin

1. 從目前的 Plugins Directory 選擇一個用途明確的 Plugin；若不想連接外部帳號，優先選擇不需 Authentication 的能力。
2. 寫下選擇理由，並記錄來源、作者、包含的能力、需要的連線與可能的 write actions。
3. 安裝或確認 Installed 狀態；需要連線時，核對服務、帳號與授權範圍。
4. 開啟新 task，完成一個範圍小、容易核對的 read-only 或 draft-only 任務；清楚寫出資料範圍與禁止動作。
5. 驗證結果：它用了正確資料嗎？是否超出指定範圍？有沒有執行你禁止的動作？

完成練習後，請確認你能說明：**為什麼選它、它包含哪些能力、資料從哪裡來，以及這次允許了哪些動作。**安裝成功只是第一步。

<aside class="plugins-level-complete is-basic" aria-label="Basic 學習成果">
  <span>BASIC CHECKPOINT</span>
  <strong>你已經能安全地選擇與驗證現有 Plugin</strong>
  <p>如果只需要使用既有 Plugin，可以在此結束。若要建立或分享 Plugin，Advanced 將進一步拆解組成、說明能力如何搭配，並介紹最小版本的建立與分享方式。</p>
  <a href="#advanced">繼續學習 Advanced ↓</a>
</aside>

## Advanced｜拆解、組合與分享團隊能力 {#advanced}

<header class="plugins-chapter-banner is-advanced">
  <span>ADVANCED · COMPOSE AND SHARE</span>
  <strong>從一組元件，組成團隊真正用得上的工作流</strong>
  <p>這一節將拆解 Plugin 可包含的能力，對照同一組元件如何支援不同專業，接著說明邊界管理、最小版本與分享方式。</p>
</header>

<nav class="lesson-flow" aria-label="Advanced 學習流程">
  <span><b>01</b> 看懂組成</span>
  <span><b>02</b> 對照完整案例</span>
  <span><b>03</b> 管理安全邊界</span>
  <span><b>04</b> 建立與分享</span>
</nav>

### 1｜Plugin 可以包含什麼

<section class="plugins-capability-grid" aria-label="Plugin 可能包含的六種能力">
  <article><span>01 · CORE</span><strong>Skills</strong><p>可重用的工作流程、參考資料、輔助 scripts 與品質標準。</p></article>
  <article><span>02 · AS NEEDED</span><strong>Connectors／Apps</strong><p>連接外部服務並提供 tools；App 也可以包含自訂 ChatGPT UI。</p></article>
  <article><span>03 · AS NEEDED</span><strong>MCP servers</strong><p>定義 tools、處理 Authentication、回傳結構化資料並對外部系統執行動作。</p></article>
  <article><span>04 · OPTIONAL</span><strong>Browser capabilities</strong><p>只有工作流需要操作特定瀏覽器狀態時才加入。</p></article>
  <article><span>05 · OPTIONAL</span><strong>Hooks</strong><p>可在 lifecycle 的特定時點執行 command；設定方式見 Hooks。</p></article>
  <article><span>06 · OPTIONAL</span><strong>Scheduled templates</strong><p>為重複工作提供排程起始模板；設定方式見下一章。</p></article>
</section>

Plugin 不必包含所有元件。成熟的 Skill 可以直接作為核心；需要登入外部服務時再加入 connector／App，需要結構化 tools 或共享 context 時再加入 MCP。Browser capabilities、Hooks 與 Scheduled templates 可等到有明確需求時加入。

以下兩個案例只使用前三項，並從交付成果反推最小能力組合。

### 2｜兩個完整案例：同一組能力，不同工作流

Plugin 也適用於非工程工作。以下兩個案例都處理反覆發生的團隊任務，需要固定方法、內外部資料與可執行工具，但使用的資料、風險與成果不同。

<figure class="plugins-case-map" aria-labelledby="plugins-case-map-title">
  <figcaption>
    <span>ONE BUNDLE, TWO PROFESSIONAL WORKFLOWS</span>
    <strong id="plugins-case-map-title">三項核心能力如何組成兩種不同的 Plugin</strong>
    <small>兩個案例皆為組成概念示例，不代表 Plugins Directory 一定提供同名項目。</small>
  </figcaption>
  <div class="plugins-case-map__request">
    <span>共同需求</span>
    <strong>把重複工作變成可安裝、可驗證、可交接的團隊流程</strong>
  </div>
  <div class="plugins-case-map__decision" aria-hidden="true">這次要交付什麼？</div>
  <div class="plugins-case-map__lanes">
    <section class="plugins-case-lane is-customer" aria-labelledby="plugins-customer-case-title">
      <header>
        <span>案例 A · 商務工作流</span>
        <strong id="plugins-customer-case-title">客戶洞察週報 Plugin</strong>
        <p>把分散的客戶聲音整理成有證據、可採取行動的每週摘要。</p>
      </header>
      <div class="plugins-case-lane__outcome">
        <small>交付成果</small>
        <strong>主題、影響範圍、證據與建議行動</strong>
      </div>
      <dl>
        <div><dt>Skills</dt><dd>定義去重、分類、保留證據與撰寫管理摘要的方法。</dd></div>
        <div><dt>Connectors／Apps</dt><dd>連接客服、CRM、文件或團隊訊息等資料來源。</dd></div>
        <div><dt>MCP servers</dt><dd>用結構化 tools 查詢產品指標、客群或內部標籤。</dd></div>
      </dl>
      <footer><strong>價值：</strong>研究、客服、產品與營運團隊能共用一致的客戶洞察整理方式。</footer>
    </section>
    <section class="plugins-case-lane is-engineering" aria-labelledby="plugins-engineering-case-title">
      <header>
        <span>案例 B · 工程工作流</span>
        <strong id="plugins-engineering-case-title">工程交付守門 Plugin</strong>
        <p>把發布前散落在不同系統的檢查，整合成可追蹤的發布決策依據。</p>
      </header>
      <div class="plugins-case-lane__outcome">
        <small>交付成果</small>
        <strong>交付狀態、阻擋問題、風險與 release note 草稿</strong>
      </div>
      <dl>
        <div><dt>Skills</dt><dd>定義 release readiness、驗收順序與報告格式。</dd></div>
        <div><dt>Connectors／Apps</dt><dd>連接 Repository、Issue 與團隊溝通系統。</dd></div>
        <div><dt>MCP servers</dt><dd>取得 CI、測試、部署與環境狀態的結構化結果。</dd></div>
      </dl>
      <footer><strong>價值：</strong>把團隊共識變成一致的檢查順序，但不自動授權 Production 部署。</footer>
    </section>
  </div>
  <p class="plugins-case-map__takeaway"><strong>選擇原則：</strong>先從交付成果反推需要的能力；沒有明確用途的元件，就不要放進 Plugin。</p>
</figure>

兩個案例都以可驗證的最小版本為起點。當工作流需要操作特定網頁、定期啟動或在 lifecycle 強制檢查時，再分別加入 Browser capability、Scheduled template 或 Hook。Plugin 是可安裝的能力集合，不是每次都要跑完的固定流水線。

### 3｜從三層邊界管理整個生命週期

「安裝成功」不代表 Plugin 可以任意讀寫。Plugin 在單次任務中能使用哪些能力，仍受到操作介面、Plugin 本身與外部服務帳號限制。

<figure class="plugins-boundary-map" aria-labelledby="plugins-boundary-title">
  <figcaption>
    <span>PERMISSION AND DATA BOUNDARIES</span>
    <strong id="plugins-boundary-title">資料通過三層邊界，任何一層都不能忽略</strong>
  </figcaption>
  <div class="plugins-boundary-map__layers">
    <article class="is-host">
      <b>01 · HOST</b>
      <strong>ChatGPT Workspace／Codex</strong>
      <p>能力受目前的 Workspace 權限、Sandbox 與 Approval policy 限制。</p>
    </article>
    <span aria-hidden="true">→</span>
    <article class="is-plugin">
      <b>02 · PLUGIN</b>
      <strong>Skills、tools、MCP、Hooks</strong>
      <p>檢查它提供哪些 read／write actions、包含哪些指示，以及是否會執行 command。</p>
    </article>
    <span aria-hidden="true">→</span>
    <article class="is-service">
      <b>03 · SERVICE</b>
      <strong>外部帳號與原服務權限</strong>
      <p>最終可見資料仍取決於登入帳號、組織、角色與授權範圍；傳送資料時，也受該服務的條款與隱私政策約束。</p>
    </article>
  </div>
  <p class="plugins-boundary-map__takeaway"><strong>最小權限原則：</strong>先縮小資料範圍與允許動作，再逐步開放真正需要的能力。</p>
</figure>

#### 把檢查放進四個生命週期

將安全檢查分散到 Plugin 的各個生命週期，比只在安裝前檢查一次更容易持續執行。

<div class="plugins-lifecycle" role="list" aria-label="Plugin 的四個生命週期與安全檢查">
  <article role="listitem"><b>INSTALL</b><strong>確認來源與帳號</strong><p>檢查作者、版本、包含的元件、Authentication、登入帳號與資料範圍，再用非敏感資料測試。</p></article>
  <article role="listitem"><b>USE</b><strong>限制資料與動作</strong><p>分清 read、write、send、delete、publish，從最小範圍開始並保留人工確認。</p></article>
  <article role="listitem"><b>UPDATE</b><strong>版本更新</strong><p>確認新版本是否加入 Skills、tools、MCP 或 Hooks；新版本需重新審查，不能直接沿用對舊版本的信任。</p></article>
  <article role="listitem"><b>REMOVE</b><strong>停用並解除連線</strong><p>解除安裝後，另外確認 bundled connectors 是否仍維持登入狀態，並移除不再需要的授權。</p></article>
</div>

在三個時點停下來檢查即可：**首次使用前**確認來源與帳號、**高影響動作前**確認資料與動作、**更新或移除後**重新檢查能力與連線。Token 與 credentials 都不應寫進 Repository、Prompt 或輸出。

::: danger 高影響動作保留人工確認
寄信、刪除資料、公開發布、部署與修改 Production 都會影響他人或外部系統。Plugin 提供能力，不代表這些動作應在無人審查下自動執行。Codex 的技術權限請參考 [Config、權限與沙盒](/advanced/permissions)；外部 tools 與 lifecycle command 請參考 [MCP](/advanced/mcp-tools) 與 [Hooks](/advanced/hooks)。
:::

Workspace-installed 或 default Plugin 可能由管理者控制，使用者不一定能自行解除安裝。團隊導入時應明確指定 owner、可使用的人員、更新節奏與重新審查方式。

### 4｜何時才值得建立團隊 Plugin

<section class="plugins-decision-grid" aria-label="Prompt、Skill 與 Plugin 的選擇方式">
  <article class="is-prompt">
    <span>一次任務</span>
    <strong>留在 Prompt</strong>
    <p>只屬於這次的目標、資料、受眾或限制。</p>
    <small>例：這次不要新增 dependency。</small>
  </article>
  <article class="is-skill">
    <span>重複方法</span>
    <strong>建立 Skill</strong>
    <p>同類任務反覆使用的步驟、格式與品質標準。</p>
    <small>例：固定的 code review checklist。</small>
  </article>
  <article class="is-plugin">
    <span>整組能力</span>
    <strong>建立 Plugin</strong>
    <p>多個能力需要一起安裝、版本化、連線或跨團隊散布。</p>
    <small>例：研究流程加公司資料 connector 與 MCP tools。</small>
  </article>
</section>

只有同時符合多項條件時，才值得從 Skill 進一步封裝：

- 多個 Skills 必須一起安裝與版本化。
- 工作流依賴固定 connector、MCP 設定或其他需要一起交付的元件。
- 多位使用者、團隊或 Repository 都需要相同能力。
- 流程已經穩定，有 owner、測試、版本與安全審查方式。

如果流程仍在頻繁試驗，先保留為本機 Skill。過早建立 Plugin，反而會讓更多人使用尚未成熟的做法。

#### 建立自己的 Plugin：先做最小版本

確定值得建立後，不必從完整 manifest 或 Marketplace 設定開始。先完成可在本機安裝、可於新 task 驗證的最小版本。

<ol class="plugins-build-journey" aria-label="建立最小 Plugin 的五個步驟">
  <li><b>01</b><span><strong>定義穩定工作流</strong><small>寫下任務、使用者、交付成果、資料來源與 owner；仍在頻繁變動時先回到 Skill。</small></span></li>
  <li><b>02</b><span><strong>請 Plugin Creator 建立骨架</strong><small>在 ChatGPT Work mode 使用 <code>@plugin-creator</code>，或在 Codex 使用 <code>$plugin-creator</code>。</small></span></li>
  <li><b>03</b><span><strong>檢查必要入口與選用元件</strong><small>確認 <code>.codex-plugin/plugin.json</code>，先加入 Skills，再依需求加入 Apps、MCP 或 assets；Hooks 等延伸元件可在相關流程成熟後加入。</small></span></li>
  <li><b>04</b><span><strong>建立本機測試入口</strong><small>請 Plugin Creator 加入 Personal marketplace entry，重新整理後從自己的來源安裝。</small></span></li>
  <li><b>05</b><span><strong>開啟新 task 驗證</strong><small>確認 Plugin 能被選用、存取的資料與執行的動作符合預先設定的範圍，而且交付成果符合原本定義。</small></span></li>
</ol>

::: details 查看最小 Plugin 結構
每個 Plugin 都需要 `.codex-plugin/plugin.json` 作為入口；其他能力放在 Plugin root，只有實際需要時才加入。

```text
my-plugin/
├── .codex-plugin/
│   └── plugin.json       # 必要入口
├── skills/               # 選用
├── hooks/                # 選用
├── .app.json             # 選用：Apps／connectors
├── .mcp.json             # 選用：MCP servers
└── assets/               # 選用：圖示與呈現資源
```

`.codex-plugin/` 裡只放 `plugin.json`；`skills/`、`hooks/`、`.app.json`、`.mcp.json` 與 `assets/` 都位於 Plugin root。
:::

#### 分享給團隊：先選散布方式

建立完成後，請依接收者與維護方式選擇分享管道：同一個 Workspace 的指定成員可以使用 Workspace sharing；需要透過 Repository／CLI 維護 Plugin 清單時，則使用 Marketplace。

<section class="plugins-share-grid" aria-label="Workspace 分享與 Marketplace 散布的選擇方式">
  <article class="is-workspace">
    <span>指定成員或群組</span>
    <strong>使用 Workspace sharing</strong>
    <ol>
      <li>在 Desktop App 開啟 <b>Plugins</b>。</li>
      <li>進入 <b>Created by you</b> 並開啟詳細資料。</li>
      <li>選擇 <b>Share</b>。</li>
      <li>加入 Workspace 成員、群組，或複製分享連結。</li>
      <li>接收者從 <b>Shared with you</b> 安裝。</li>
    </ol>
    <footer>適合同一 Workspace 的指定成員從 Desktop App 自行安裝。</footer>
  </article>
  <article class="is-marketplace">
    <span>Repository／CLI 散布</span>
    <strong>使用 Marketplace</strong>
    <p>當團隊需要維護 Plugin 清單、透過 Repository 管理版本，或讓 CLI 追蹤來源時，再建立 Marketplace。</p>
    <ul>
      <li>一個 Marketplace 可以包含一個或多個 Plugins。</li>
      <li>適合用 Repository 維護團隊或個人的 Plugin 清單。</li>
      <li>需要另外維護來源、版本與安裝政策。</li>
    </ul>
    <footer>需要設定 Marketplace 時，請依官方 Build Plugins 文件操作。</footer>
  </article>
</section>

Workspace 分享不會把 Plugin 發布到公開 Plugins Directory；Plugin 仍只在該 Workspace 的組織邊界內分享。Workspace 管理者也可以停用 Plugin sharing。若要透過 Repository 或 CLI 散布，請參考 [官方 Build Plugins 文件](https://learn.chatgpt.com/docs/build-plugins)。

<aside class="plugins-level-complete is-advanced" aria-label="Advanced 學習成果">
  <span>ADVANCED CHECKPOINT</span>
  <strong>你已經能拆解、評估、建立並選擇 Plugin 的分享方式</strong>
  <p>完成 Advanced 後，你應該能從交付成果反推必要能力、守住三層邊界、建立最小版本，並選擇 Workspace sharing 或 Marketplace；功能數量不是目標。</p>
</aside>

## 延伸閱讀

- [OpenAI：Plugins](https://learn.chatgpt.com/docs/plugins?surface=app) — 瀏覽、安裝、使用介面與權限規則的主要依據。
- [OpenAI：Build Plugins](https://learn.chatgpt.com/docs/build-plugins) — 製作與散布 Plugin 的設定說明。
- [AlphaMatch：OpenAI Codex 六大角色型 Plugins](https://www.alphamatch.ai/zh/blog/openai-codex-six-role-plugins-2026) — 六大角色型 Plugin 案例介紹；產品規格與可用性仍以官方資料為準。
- [前置：Skills](/advanced/skills) — 單一工作方法的設計與整理方式。
- [上一章：MCP 與外部工具](/advanced/mcp-tools) — 理解外部 context、Authentication 與 tools。
- [下一章：Scheduled tasks](/advanced/automation) — 將通過測試的工作流交給背景排程。
- [選修：Hooks](/advanced/hooks) — lifecycle command 的設定與使用方式。
