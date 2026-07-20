---
title: Plugins：安裝與分享完整能力包
description: 從情境理解、瀏覽與安全使用 Plugin，到判斷何時值得建立團隊能力包。
outline: [2, 3]
---

# Plugins：安裝與分享完整能力包

## 先從一個跨工具任務開始

假設你每週都要整理產品上線進度：先讀雲端文件裡的最新規格，再查看團隊訊息中的風險，最後依固定格式產出主管摘要。

這項工作不只有一套「怎麼整理」的方法，還需要連接資料來源、取得可用工具，有時甚至要執行草擬或更新等動作。如果每位同事都要自己尋找 Skill、設定 connector、理解工具名稱，再重新組合一次，導入成本會很高。

Plugin 解決的是這個問題：它把一組可以一起安裝、分享與更新的能力包裝起來。

<figure class="plugins-scenario-map" aria-labelledby="plugins-scenario-title">
  <figcaption>
    <span>METHOD + CONNECTION + TOOLS</span>
    <strong id="plugins-scenario-title">Plugin 把完成一類工作需要的能力組合起來</strong>
    <small>不是每個 Plugin 都包含全部元件；實際內容仍要以詳細資料為準。</small>
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
      <p>完成登入，連接文件、訊息、設計或商務系統。</p>
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
      <p>讓團隊從相同起點安全地完成一類任務。</p>
    </article>
  </div>
</figure>

Plugin 可以只包含 Skills，也可以加入 connectors、MCP servers、Hooks 或其他元件。它的重點不是把 Prompt 寫得更長，而是把一組成熟能力變成**可安裝、可分享、可治理**的工作流。

學習本章前，建議先完成[上一章：Skills](/advanced/skills)。先理解「這類任務怎麼做」，再學習如何把方法和連線一起交付，會比較容易分清責任。

<section class="lesson-goals" aria-labelledby="plugins-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="plugins-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>從目前環境找到合適的 Plugin，完成安裝與安全的首次任務，並判斷何時只要 Prompt、Skill，何時才值得使用或建立 Plugin。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>讀懂定位</strong><span>分辨 Prompt、Skill、Plugin、connector 與 MCP。</span></article>
    <article><strong>完成首次使用</strong><span>會瀏覽、審查、安裝、連線並在新 task 驗證。</span></article>
    <article><strong>守住資料邊界</strong><span>確認 Workspace／Codex、Plugin 與外部帳號三層權限。</span></article>
    <article><strong>判斷是否建立</strong><span>只在能力已成熟且確實需要散布時才封裝 Plugin。</span></article>
  </div>
</section>

### 先分清楚五個相近名詞

| 名稱 | 回答的問題 | 例子 |
| --- | --- | --- |
| **Prompt** | 這次要完成什麼？ | 只整理今天更新的文件，不要改動原始資料 |
| **Skill** | 這類任務每次怎麼做？ | 固定把內容分成摘要、風險、行動項目 |
| **Plugin** | 如何安裝與分享整組能力？ | 一起提供整理方法、資料連線與所需工具 |
| **Connector／App** | 如何登入並連接外部服務？ | 連接雲端文件、訊息、CRM 或設計平台 |
| **MCP** | 外部系統如何提供 context 與 tools？ | 讓 Codex 用結構化工具查詢資料或執行動作 |

判斷口訣是：**本次差異寫 Prompt，重複方法做成 Skill，需要把方法、連線或其他能力整組安裝與分享時，再使用 Plugin。** MCP 的技術細節會留到[下一章：MCP 與外部工具](/advanced/mcp-tools)。

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
第一次接觸 Plugin 時，先完成 Basic 的通用練習。你不需要和講師看到相同清單；能從自己的環境選擇一個 Plugin、讀懂它並完成低風險驗證，就已達成本章主要目標。
:::

## Basic｜選擇、安裝與安全使用 {#basic}

<header class="plugins-chapter-banner is-basic">
  <span>BASIC · USE AN EXISTING PLUGIN</span>
  <strong>先看懂再安裝，先低風險驗證再放大任務</strong>
  <p>這一段不要求你理解 manifest 或 marketplace。你只需要從目前看得到的清單中做出合適選擇，確認連線帳號與資料範圍，再完成一次可檢查的任務。</p>
</header>

<nav class="lesson-flow" aria-label="Basic 學習流程">
  <span><b>01</b> 確認支援介面</span>
  <span><b>02</b> 瀏覽來源</span>
  <span><b>03</b> 安裝前審查</span>
  <span><b>04</b> 安裝與連線</span>
  <span><b>05</b> 跨角色應用</span>
</nav>

### 1｜先確認你所在的介面支援 Plugins

這一頁是網頁課程，但真正操作 Plugin 時，仍要先確認使用的 ChatGPT／Codex 介面是否支援。

<div class="plugins-surface-grid" role="list" aria-label="Plugins 支援與不支援的產品介面">
  <article class="is-supported" role="listitem"><span>支援</span><strong>ChatGPT 網頁版</strong><p>切換到 <b>Work mode</b>，再開啟 Plugins。</p></article>
  <article class="is-supported" role="listitem"><span>支援</span><strong>ChatGPT Desktop App</strong><p>使用 Work mode，或選擇 Codex 後開啟 Plugins。</p></article>
  <article class="is-supported" role="listitem"><span>支援</span><strong>Codex CLI</strong><p>執行 Codex 後輸入 <code>/plugins</code> 開啟瀏覽器。</p></article>
  <article class="is-unsupported" role="listitem"><span>目前不支援</span><strong>其他介面</strong><p>Chat mode、IDE extension 與 mobile 目前沒有 Plugin browser。</p></article>
</div>

如果畫面中完全找不到 Plugins，先確認不是位於 Chat mode 或 IDE extension，再檢查 App 版本、帳號、Workspace 政策與地區可用性。

::: warning 介面與清單會持續更新
不用背固定的 Plugin 名稱或畫面位置。課程真正要你學會的是：確認來源、閱讀能力、辨識權限，並用低風險任務驗證。
:::

### 2｜瀏覽來源，不要只看名稱

Plugins Directory 可能依來源分成：

- **OpenAI**：由 OpenAI 提供的 Plugins。
- **Workspace 名稱**：由目前 Workspace 提供或管理的 Plugins。
- **Personal**：個人 marketplace，以及環境支援時的 Created by me、Shared with me。
- **Installed**：目前已安裝的 Plugins；這是狀態，不是另一個作者來源。

<!-- Screenshot asset: /images/plugins/plugins-directory.webp -->
<figure class="plugins-screenshot" aria-labelledby="plugins-shot-directory-title">
  <div class="plugins-screenshot__placeholder" role="img" aria-label="待補：Plugins Directory 的來源分頁與 Installed 狀態">
    <span>SCREENSHOT PLACEHOLDER · BASIC 01</span>
    <strong id="plugins-shot-directory-title">瀏覽 Plugins Directory</strong>
    <code>/images/plugins/plugins-directory.webp</code>
    <p>拍攝 OpenAI、Workspace、Personal 與 Installed 等來源或狀態；遮蔽帳號、Workspace 名稱、私人 Plugin 與其他組織資訊。</p>
  </div>
  <figcaption>學生看到的分頁與清單可能不同；請用「來源可信嗎、用途符合嗎」做第一輪判斷。</figcaption>
</figure>

先用一句話寫下你要解決的工作，再比較 Plugin 詳細資料。名稱看起來相似，不代表它們使用相同資料、執行相同動作或遵循相同流程。

### 3｜安裝前，用六個問題閱讀詳細資料

打開 Plugin 詳細頁後，至少確認：

1. **誰提供？** 作者、Workspace、版本與來源是否可信。
2. **解決什麼？** 說明與範例是否符合你的真實任務。
3. **帶入什麼？** 是否包含 Skills、connectors、MCP tools 或 Hooks。
4. **連到哪裡？** 需要登入哪些服務，準備使用哪個帳號。
5. **可以做什麼？** Tools 只有 read，還是包含 write、send、delete、publish。
6. **資料會去哪裡？** 外部服務的條款、隱私政策與組織規範是否允許。

<section class="plugins-inspection-strip" aria-label="安裝 Plugin 前的三階段檢查">
  <article><b>來源</b><span>作者 · 版本 · Workspace</span></article>
  <i aria-hidden="true">→</i>
  <article><b>能力</b><span>Skills · tools · Hooks</span></article>
  <i aria-hidden="true">→</i>
  <article><b>資料</b><span>帳號 · 範圍 · 讀寫動作</span></article>
</section>

<!-- Screenshot asset: /images/plugins/plugin-details.webp -->
<figure class="plugins-screenshot" aria-labelledby="plugins-shot-details-title">
  <div class="plugins-screenshot__placeholder" role="img" aria-label="待補：Plugin 詳細資料、安裝按鈕與 Authentication 提示">
    <span>SCREENSHOT PLACEHOLDER · BASIC 02</span>
    <strong id="plugins-shot-details-title">安裝前閱讀詳細資料</strong>
    <code>/images/plugins/plugin-details.webp</code>
    <p>拍攝作者、簡介、包含能力、安裝入口與 Authentication 提示；不要讓電子郵件、租戶、連線帳號或授權範圍出現在截圖。</p>
  </div>
  <figcaption>看見安裝按鈕不代表應直接安裝；先確認來源、能力與資料範圍。</figcaption>
</figure>

### 4｜安裝、連線，然後開啟新 task

找到合適的 Plugin 後，依序完成：

<ol class="plugins-install-journey" aria-label="從安裝 Plugin 到首次驗證的五個步驟">
  <li><b>01</b><span><strong>Install</strong><small>從詳細頁安裝，確認畫面出現 Installed 狀態。</small></span></li>
  <li><b>02</b><span><strong>Authenticate</strong><small>若需要 connector，確認登入的是正確服務與帳號。</small></span></li>
  <li><b>03</b><span><strong>Start new task</strong><small>安裝後開啟新 task／chat；CLI 則開新 session。</small></span></li>
  <li><b>04</b><span><strong>Invoke</strong><small>直接描述成果，或輸入 <code>@</code> 明確選擇 Plugin／bundled Skill。</small></span></li>
  <li><b>05</b><span><strong>Verify</strong><small>核對使用的來源、資料範圍、動作與最終結果。</small></span></li>
</ol>

為什麼一定要開新 task？因為 bundled Skills 與 tools 會在新 task 或 CLI session 啟動時載入。若你留在安裝前就已開啟的對話，新增能力可能尚未出現在該 task 中。

有些 connectors 會在安裝時要求 Authentication，有些則等到第一次使用才詢問。無論在哪個時點出現，都要確認帳號、組織與授權範圍，不要只按下一步。

<!-- Screenshot asset: /images/plugins/plugin-composer.webp -->
<figure class="plugins-screenshot" aria-labelledby="plugins-shot-composer-title">
  <div class="plugins-screenshot__placeholder" role="img" aria-label="待補：新 task 中輸入 @ 明確選擇已安裝 Plugin">
    <span>SCREENSHOT PLACEHOLDER · BASIC 03</span>
    <strong id="plugins-shot-composer-title">在新 task 中明確選擇 Plugin</strong>
    <code>/images/plugins/plugin-composer.webp</code>
    <p>拍攝輸入 <code>@</code> 後的選擇清單與一段 read-only／draft-only Prompt；範例資料請使用虛構名稱，不顯示真實文件、信件或客戶資訊。</p>
  </div>
  <figcaption>意圖非常清楚時可以直接描述成果；教學與首次驗證建議先用 <code>@</code> 明確指定。</figcaption>
</figure>

### 5｜Plugins 實戰應用案例

了解完 Plugins 的強大機制後，接下來我們直接來看看這批新功能可以如何在實際工作中落地。以下整理了 6 個不同專業領域的 Plugin 應用案例，帶您快速想像這些外掛如何成為各種角色的得力助手。

（註：以下為應用情境展示，實際可用的 Plugin 項目請以您帳號目前在 Plugins Directory 與 Workspace 政策中的設定為準。）

<section class="plugins-role-gallery" aria-label="六種角色型 Plugin 的應用案例">
  <article>
    <span>DATA ANALYTICS</span>
    <strong>數據分析</strong>
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
    <p><b>產出成果：</b>會前簡報、跟進信件草稿、風險評估整理</p>
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
    <small>可整合資源：公開監管文件與授權市場資料庫。</small>
  </article>
  <article>
    <span>INVESTMENT BANKING</span>
    <strong>投資銀行</strong>
    <p><b>適合對象：</b>銀行家、併購與財務顧問</p>
    <p><b>產出成果：</b>簡報架構、同業估值比較、盡職調查摘要</p>
    <small>可整合資源：券商研究報告與授權財務數據。</small>
  </article>
</section>

### 動手練習｜任選一個你看得到的 Plugin

1. 從目前 Plugins Directory 選一個你理解用途的 Plugin；若不想連接外部帳號，優先選擇不需 Authentication 的能力。
2. 寫下選擇理由，並記錄來源、作者、包含能力、需要的連線與可能的 write actions。
3. 安裝或確認 Installed 狀態；需要連線時，核對服務、帳號與授權範圍。
4. 開啟新 task，完成一個範圍小、容易核對的 read-only 或 draft-only 任務；清楚寫出資料範圍與禁止動作。
5. 驗證結果：它用了正確資料嗎？是否超出指定範圍？有沒有執行你禁止的動作？

完成的標準不是「成功安裝」，而是你能說明：**為什麼選它、它帶入什麼、資料從哪裡來，以及這次實際允許了哪些動作。**

<aside class="plugins-level-complete is-basic" aria-label="Basic 學習成果">
  <span>BASIC CHECKPOINT</span>
  <strong>你已經能安全地選擇與驗證現有 Plugin</strong>
  <p>日常使用者完成到這裡已足夠。接下來的 Advanced 會拆解 Plugin 的組成，透過兩個完整案例說明如何組合能力，最後帶你建立與分享一個最小版本。</p>
  <a href="#advanced">繼續學習 Advanced ↓</a>
</aside>

## Advanced｜拆解、組合與分享團隊能力 {#advanced}

<header class="plugins-chapter-banner is-advanced">
  <span>ADVANCED · COMPOSE AND SHARE</span>
  <strong>從一組元件，組成團隊真正用得上的工作流</strong>
  <p>你已經會使用現有 Plugin。現在進一步拆解它可以包含的能力，觀察同一組元件如何支援不同專業，再學會管理邊界、建立最小版本並選擇分享方式。</p>
</header>

<nav class="lesson-flow" aria-label="Advanced 學習流程">
  <span><b>01</b> 看懂組成</span>
  <span><b>02</b> 對照完整案例</span>
  <span><b>03</b> 管理安全邊界</span>
  <span><b>04</b> 建立與分享</span>
</nav>

### 1｜Plugin 可以包含什麼

<section class="plugins-capability-grid" aria-label="Plugin 可能包含的六種能力">
  <article><span>01</span><strong>Skills</strong><p>可重用的工作流程、參考資料、輔助 scripts 與品質標準。</p></article>
  <article><span>02</span><strong>Connectors／Apps</strong><p>連接外部服務並提供 tools；App 也可以包含自訂 ChatGPT UI。</p></article>
  <article><span>03</span><strong>MCP servers</strong><p>定義 tools、處理 Authentication、回傳結構化資料並對外部系統執行動作。</p></article>
  <article><span>04</span><strong>Browser capabilities</strong><p>在工作流需要操作特定瀏覽器狀態時，提供相關能力。</p></article>
  <article><span>05</span><strong>Hooks</strong><p>在 lifecycle 的特定時點執行 command；啟用前必須閱讀與信任。</p></article>
  <article><span>06</span><strong>Scheduled templates</strong><p>在支援 Scheduled tasks 的介面中，提供重複工作的起始模板。</p></article>
</section>

Plugin 不必包含全部元件。只有一套成熟方法時，一個 Skill 通常就夠；需要登入外部服務時才需要 connector／App；需要結構化 tools 或共享 context 時才涉及 MCP；只有必須在 lifecycle 固定時點執行 command 時才考慮 Hooks。

接下來用兩個刻意包含六項能力的案例觀察它們如何分工。這是為了方便比較的完整示範；真實 Plugin 應該只加入完成任務真正需要的元件。

### 2｜兩個完整案例：同一組能力，不同工作流

Plugin 不只服務工程師。下面兩個案例從相同問題出發：團隊有一項反覆發生的工作，需要固定方法、內外部資料、可執行的工具，以及穩定的交付節奏。差別在於它們面對的資料、風險與成果完全不同。

<figure class="plugins-case-map" aria-labelledby="plugins-case-map-title">
  <figcaption>
    <span>ONE BUNDLE, TWO PROFESSIONAL WORKFLOWS</span>
    <strong id="plugins-case-map-title">六項能力如何組成兩種不同的 Plugin</strong>
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
        <div><dt>Browser capabilities</dt><dd>核對公開說明中心、版本公告或其他公開資訊。</dd></div>
        <div><dt>Hooks</dt><dd>在寫入或分享前檢查敏感資料與必要欄位。</dd></div>
        <div><dt>Scheduled templates</dt><dd>提供每週固定啟動的週報任務模板。</dd></div>
      </dl>
      <footer><strong>價值：</strong>研究、客服、產品與營運團隊都能從同一套方法開始。</footer>
    </section>
    <section class="plugins-case-lane is-engineering" aria-labelledby="plugins-engineering-case-title">
      <header>
        <span>案例 B · 工程工作流</span>
        <strong id="plugins-engineering-case-title">工程交付守門 Plugin</strong>
        <p>把發布前散落在不同系統的檢查，整理成可追蹤的交付判斷。</p>
      </header>
      <div class="plugins-case-lane__outcome">
        <small>交付成果</small>
        <strong>交付狀態、阻擋問題、風險與 release note 草稿</strong>
      </div>
      <dl>
        <div><dt>Skills</dt><dd>定義 release readiness、驗收順序與報告格式。</dd></div>
        <div><dt>Connectors／Apps</dt><dd>連接 Repository、Issue 與團隊溝通系統。</dd></div>
        <div><dt>MCP servers</dt><dd>取得 CI、測試、部署與環境狀態的結構化結果。</dd></div>
        <div><dt>Browser capabilities</dt><dd>在 Preview／Staging 執行可見流程與畫面檢查。</dd></div>
        <div><dt>Hooks</dt><dd>在完成任務或高影響操作前執行品質閘門。</dd></div>
        <div><dt>Scheduled templates</dt><dd>提供每日或發布前的健康摘要任務模板。</dd></div>
      </dl>
      <footer><strong>價值：</strong>把團隊共識變成一致的檢查順序，但不自動授權 Production 部署。</footer>
    </section>
  </div>
  <p class="plugins-case-map__takeaway"><strong>判斷口訣：</strong>先從交付成果反推需要的能力；沒有明確用途的元件，就不要放進 Plugin。</p>
</figure>

這兩個案例都可能包含六項能力，但單次 task 不一定會全部用到。例如只要草擬週報時，可能不需要 Browser；只檢查 CI 狀態時，也不需要執行 Scheduled template。Plugin 是可安裝的能力集合，不是每次都要跑完的固定流水線。

### 3｜從三層邊界管理整個生命週期

「安裝成功」不代表 Plugin 可以任意讀寫。一次任務的有效能力，會同時受到使用介面、Plugin 本身與外部服務帳號限制。

<figure class="plugins-boundary-map" aria-labelledby="plugins-boundary-title">
  <figcaption>
    <span>PERMISSION AND DATA BOUNDARIES</span>
    <strong id="plugins-boundary-title">資料通過三層邊界，任何一層都不能忽略</strong>
  </figcaption>
  <div class="plugins-boundary-map__layers">
    <article class="is-host">
      <b>01 · HOST</b>
      <strong>ChatGPT Workspace／Codex</strong>
      <p>使用目前可用的 Workspace 權限，且受 Sandbox 與 Approval policy 限制。</p>
    </article>
    <span aria-hidden="true">→</span>
    <article class="is-plugin">
      <b>02 · PLUGIN</b>
      <strong>Skills、tools、MCP、Hooks</strong>
      <p>檢查它提供哪些 read／write actions、會帶入哪些指示，以及是否會執行 command。</p>
    </article>
    <span aria-hidden="true">→</span>
    <article class="is-service">
      <b>03 · SERVICE</b>
      <strong>外部帳號與原服務權限</strong>
      <p>最終可見資料仍取決於登入帳號、組織、角色與授權範圍；傳送資料時也適用該服務條款與隱私政策。</p>
    </article>
  </div>
  <p class="plugins-boundary-map__takeaway"><strong>最小權限原則：</strong>先縮小資料範圍與允許動作，再逐步開放真正需要的能力。</p>
</figure>

#### 把檢查放進四個生命週期

不需要把安全審查變成一份只能在安裝前閱讀的長清單。把正確問題放進 Plugin 的每個生命週期，反而比較容易持續執行。

<div class="plugins-lifecycle" role="list" aria-label="Plugin 的四個生命週期與安全檢查">
  <article role="listitem"><b>INSTALL</b><strong>確認來源與帳號</strong><p>檢查作者、版本、內含元件、Authentication、登入帳號與資料範圍，再用非敏感資料測試。</p></article>
  <article role="listitem"><b>USE</b><strong>限制資料與動作</strong><p>分清 read、write、send、delete、publish，從最小範圍開始並保留人工確認。</p></article>
  <article role="listitem"><b>UPDATE</b><strong>版本更新</strong><p>確認新版本是否加入 Skills、tools、MCP 或 Hooks；更新內容不能自動沿用舊信任。</p></article>
  <article role="listitem"><b>REMOVE</b><strong>停用並解除連線</strong><p>解安裝後另外確認 bundled connectors 是否仍保持登入，並移除不再需要的授權。</p></article>
</div>

在三個時點停下來檢查即可：**首次使用前**確認來源與帳號、**高影響動作前**確認資料與動作、**更新或移除後**重新檢查能力與連線。Token 與 credentials 都不應寫進 Repository、Prompt 或輸出。

::: danger 高影響動作保留人工確認
寄信、刪除資料、公開發布、部署與修改 Production 都會影響他人或外部系統。Plugin 提供能力，不代表這些動作應在無人審查下自動執行。Codex 端的技術邊界可回到[Config、權限與沙盒](/advanced/permissions)複習；外部 tools 與 lifecycle command 可延伸閱讀 [MCP](/advanced/mcp-tools) 與 [Hooks](/advanced/hooks)。
:::

Workspace-installed 或 default Plugin 可能由管理者控制，使用者不一定能自行解除安裝。團隊導入時應明確指定 owner、允許的使用者、更新節奏與重新審查方式。

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
    <small>例：研究流程加公司資料 connector 與安全 Hooks。</small>
  </article>
</section>

只有同時符合多項條件時，才值得從 Skill 進一步封裝：

- 多個 Skills 必須一起安裝與版本化。
- 工作流依賴固定 connector、MCP 設定或 Hooks。
- 多位使用者、團隊或 Repository 都需要相同能力。
- 流程已經穩定，有 owner、測試、版本與安全審查方式。

如果流程仍在頻繁試驗，先保留為本機 Skill。過早建立 Plugin 只會把尚未成熟的做法更快散布出去。

#### 建立自己的 Plugin：先做最小版本

確定值得建立後，不必從完整 manifest 或 Marketplace 設定開始。先完成一個可以本機安裝、能在新 task 驗證的最小版本。

<ol class="plugins-build-journey" aria-label="建立最小 Plugin 的五個步驟">
  <li><b>01</b><span><strong>定義穩定工作流</strong><small>寫下任務、使用者、交付成果、資料來源與 owner；仍在頻繁變動時先回到 Skill。</small></span></li>
  <li><b>02</b><span><strong>請 Plugin Creator 建立骨架</strong><small>在 ChatGPT Work mode 使用 <code>@plugin-creator</code>，或在 Codex 使用 <code>$plugin-creator</code>。</small></span></li>
  <li><b>03</b><span><strong>檢查必要入口與選用元件</strong><small>確認 <code>.codex-plugin/plugin.json</code>，再依需求加入 Skills、Hooks、Apps、MCP 或 assets。</small></span></li>
  <li><b>04</b><span><strong>建立本機測試入口</strong><small>請 Plugin Creator 加入 Personal marketplace entry，重新整理後從自己的來源安裝。</small></span></li>
  <li><b>05</b><span><strong>開啟新 task 驗證</strong><small>確認 Plugin 能被選用、資料與動作沒有越界，而且交付成果符合原本定義。</small></span></li>
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

建立完成後，分享不是把資料夾直接傳給所有人。先看接收者是同一個 Workspace 的指定成員，還是需要從 Repository／CLI 取得一組可維護的 Plugin 清單。

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
    <footer>適合讓同一 Workspace 的特定角色，從 Desktop App 自行安裝。</footer>
  </article>
  <article class="is-marketplace">
    <span>Repository／CLI 散布</span>
    <strong>使用 Marketplace</strong>
    <p>當團隊需要維護策展清單、以 Repository 版本化，或讓 CLI 追蹤來源時，再建立 Marketplace。</p>
    <ul>
      <li>一個 Marketplace 可以包含一個或多個 Plugins。</li>
      <li>適合 Repository、團隊或個人的策展清單。</li>
      <li>需要另外維護來源、版本與安裝政策。</li>
    </ul>
    <footer>本章只教選擇時機；完整設定請依官方 Build Plugins 文件操作。</footer>
  </article>
</section>

Workspace 分享不會把 Plugin 發布到公開 Plugins Directory；內容仍留在該 Workspace 與組織邊界。Workspace 管理者也可以停用 Plugin sharing。需要 Repository 或 CLI 型散布時，再閱讀[官方 Build Plugins 文件](https://learn.chatgpt.com/docs/build-plugins)。

<aside class="plugins-level-complete is-advanced" aria-label="Advanced 學習成果">
  <span>ADVANCED CHECKPOINT</span>
  <strong>你已經能拆解、評估、建立並選擇 Plugin 的分享方式</strong>
  <p>完成標準不是做出功能最多的 Plugin，而是能從交付成果反推必要能力、守住三層邊界、建立最小版本，並選擇 Workspace sharing 或 Marketplace。</p>
</aside>

## 延伸閱讀

- [OpenAI：Plugins](https://learn.chatgpt.com/docs/plugins?surface=app) — 瀏覽、安裝、使用介面與權限規則的主要依據。
- [OpenAI：Build Plugins](https://learn.chatgpt.com/docs/build-plugins) — 真正需要製作與散布 Plugin 時再閱讀。
- [AlphaMatch：OpenAI Codex 六大角色型 Plugins](https://www.alphamatch.ai/zh/blog/openai-codex-six-role-plugins-2026) — 本章角色案例的介紹靈感；產品規格與可用性仍以官方資料為準。
- [上一章：Skills](/advanced/skills) — 先把單一工作方法設計成熟。
- [下一章：MCP 與外部工具](/advanced/mcp-tools) — 深入外部 context、Authentication 與 tools。
- [延伸：Hooks](/advanced/hooks) — 理解 Plugin 可能帶入的 lifecycle command。
