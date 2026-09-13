---
title: 準備 Demo 資料
description: 下載 Marketing Excel、了解資料結構，並準備 codex-demo 工作資料夾。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial quickstart-demo-setup
---

<script setup>
const marketingExcelUrl = 'https://github.com/cathayins/codex-course-demo-cases/raw/refs/heads/main/data-analyst/Marketing_Campaign_Data.xlsx'
</script>

# 準備 Demo 資料

<p class="lesson-lead">開始第一個任務前，先準備這次會一路使用的 Marketing Excel。這一頁先處理資料來源與資料結構；下一頁再把檔案交給 Codex，開始建立第一個 Project。</p>

<LessonBlock
  id="demo-summary"
  title="今天預計完成內容"
  description="整個 QuickStart 都會沿用同一份 Marketing Excel，從理解資料開始，逐步做出可以互動的 Dashboard。"
  tone="accent"
>
  <p>這份案例模擬教育機構的數位行銷活動。資料包含曝光、點擊、名單、申請、入學／註冊、成本與營收，後續會用它練習如何把一個實際工作目標交給 Codex，再檢查它產出的結果。</p>

  <ul class="lesson-checklist">
    <li><b>使用資料</b><span><code>Marketing_Campaign_Data.xlsx</code>，內含三張工作表。</span></li>
    <li><b>先完成</b><span>下載 Excel、建立 <code>codex-demo</code> 資料夾，並了解資料欄位。</span></li>
    <li><b>後續內容</b><span>在同一個資料夾中，讓 Codex 讀取資料、分析指標，再完成互動式 Dashboard。</span></li>
  </ul>

  ::: warning 資料限制
  這份資料是教學用的合成資料，不代表任何學校或公司的真實績效，也不含真實個人資料。後續看到的洞察只用來示範分析流程，不直接作為預算決策。
  :::
</LessonBlock>

<LessonBlock
  id="download-marketing-excel"
  title="下載資料"
  description="先把來源檔案放在獨立資料夾，後續每個 QuickStart 步驟都從這個工作範圍開始。"
>
  <div class="demo-download-panel">
    <div class="demo-download-panel__copy">
      <span>SOURCE FILE</span>
      <strong>Marketing_Campaign_Data.xlsx</strong>
      <p>檔案放在 GitHub 的課程資料庫，點擊按鈕即可下載。</p>
    </div>
    <a class="demo-download-link" :href="marketingExcelUrl" download="Marketing_Campaign_Data.xlsx">
      下載 Marketing Excel <span aria-hidden="true">↓</span>
    </a>
  </div>

  <ol class="lesson-steps-list demo-setup-steps">
    <li><b>01｜下載</b><span>點擊上方按鈕，下載 <code>Marketing_Campaign_Data.xlsx</code>。</span></li>
    <li><b>02｜建立資料夾</b><span>在電腦上建立一個新的 <code>codex-demo</code> 資料夾，位置可以選擇容易找到的地方。</span></li>
    <li><b>03｜放入檔案</b><span>把下載好的 Excel 移到 <code>codex-demo</code> 裡，先不要加入其他檔案。</span></li>
  </ol>

  <div class="lesson-file-tree demo-file-tree" aria-label="Demo 案例建立後的工作資料夾">
    <div class="lesson-file-tree__title"><span>CODEX-DEMO</span><small>第一個 Project 的來源資料</small></div>
    <ul>
      <li><span class="lesson-file-tree__node"><i class="lesson-file-tree__icon lesson-file-tree__icon--folder" aria-hidden="true"></i><code>codex-demo/</code></span>
        <ul>
          <li><span class="lesson-file-tree__node"><i class="lesson-file-tree__icon lesson-file-tree__icon--file" aria-hidden="true"></i><code>Marketing_Campaign_Data.xlsx</code><em class="lesson-file-tree__badge is-active">SOURCE</em></span></li>
        </ul>
      </li>
    </ul>
  </div>
</LessonBlock>

<LessonBlock
  id="marketing-data-overview"
  title="資料說明與欄位定義"
  description="先知道每張工作表負責什麼、每個欄位代表什麼，後續交辦任務時才有共同的資料基礎。"
>
  <p>這是一份為教育機構行銷分析情境設計的合成資料，模擬 2024 年 1 月至 2025 年 10 月間，Google Ads、Facebook、Instagram、LinkedIn 與 YouTube 等平台的數位行銷活動。資料涵蓋從曝光到入學／註冊的轉換流程，也包含成本、營收、目標受眾、活動目標與投放區域。</p>

  <h3>三張工作表</h3>

  <div class="demo-sheet-table">
    <table>
      <thead>
        <tr><th>Sheet</th><th>筆數</th><th>用途</th></tr>
      </thead>
      <tbody>
        <tr><th><code>CampaignPerformance</code></th><td>763 筆資料列</td><td>每日期間的曝光、點擊、leads、applications、enrollments、成本與營收。</td></tr>
        <tr><th><code>CampaignMeta</code></th><td>5 筆資料列</td><td>Campaign 的目標、期間、預算、類型、負責人、渠道與轉換目標。</td></tr>
        <tr><th><code>ChannelRates</code></th><td>5 筆資料列</td><td>各渠道的 AvgCPM、AvgCPC 與備註，作為成本效率的參考。</td></tr>
      </tbody>
    </table>
  </div>

  <h3>欄位定義</h3>

  <p>以下分頁列出三張工作表的實際欄位。後續任務都以這些欄位為準，不另外發明名稱。</p>

  <MediaTabs
    ariaLabel="Excel 工作表欄位定義"
    :items="[
      {
        label: 'CampaignPerformance',
        title: 'CampaignPerformance',
        description: '績效事實表。每一列代表一個日期、Campaign、Platform、TargetAudience 與 Region 的表現。',
        table: {
          caption: '13 個欄位',
          headers: ['欄位', '定義'],
          rows: [
            ['Date', '績效日期'],
            ['CampaignID', 'Campaign 唯一識別碼'],
            ['CampaignName', 'Campaign 名稱'],
            ['Platform', '投放平台，例如 Google Ads、Facebook、YouTube'],
            ['TargetAudience', '目標受眾區段'],
            ['Impressions', '曝光次數'],
            ['Clicks', '點擊次數'],
            ['Leads', '取得的 leads 數量'],
            ['Applications', '申請數量'],
            ['Enrollments', '入學／註冊數量'],
            ['Cost (₹)', '行銷成本，單位為印度盧比'],
            ['Revenue (₹)', '產生營收，單位為印度盧比'],
            ['Region', '市場區域']
          ]
        }
      },
      {
        label: 'CampaignMeta',
        title: 'CampaignMeta',
        description: 'Campaign 維度表。以 CampaignID 對應績效資料，補上預算、活動目標與渠道資訊。',
        table: {
          caption: '10 個欄位',
          headers: ['欄位', '定義'],
          rows: [
            ['CampaignID', 'Campaign 唯一識別碼，與 CampaignPerformance 對應'],
            ['Objective', 'Campaign 目標'],
            ['StartDate', 'Campaign 開始日期'],
            ['EndDate', 'Campaign 結束日期'],
            ['Budget (₹)', 'Campaign 預算，單位為印度盧比'],
            ['Campaign Type', '活動類型'],
            ['Creative Type', '素材類型'],
            ['Manager', '負責人'],
            ['Channel', '渠道名稱，與 ChannelRates 對應'],
            ['Conversion Goal', '主要轉換目標']
          ]
        }
      },
      {
        label: 'ChannelRates',
        title: 'ChannelRates',
        description: '渠道參考表。用來補充各渠道的平均 CPM、CPC 與解讀備註。',
        table: {
          caption: '4 個欄位',
          headers: ['欄位', '定義'],
          rows: [
            ['Channel', '渠道名稱'],
            ['AvgCPM', '平均每千次曝光成本'],
            ['AvgCPC', '平均每次點擊成本'],
            ['Remarks', '渠道特性備註']
          ]
        }
      }
    ]"
  />
</LessonBlock>

<div class="lesson-next-step">
  <span>下一步</span>
  <a href="./first-project">First Project：把這份 Excel 交給 Codex →</a>
</div>
