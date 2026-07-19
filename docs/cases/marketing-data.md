---
title: Marketing 數據分析｜Excel → HTML Dashboard
description: 從 GitHub 下載 Marketing Excel，完成 Excel insight 與可互動的本地 HTML Dashboard。
---

# Marketing 數據分析：Excel → Insight → HTML Dashboard

## 任務 Summary

這是一個約 5 分鐘可以完成的 Marketing 數據分析實戰。使用三張原始 Excel sheet，先在 Excel 中回答一個需要數據判讀的問題，再把同一份資料做成可以在地端直接打開、可以互動的 HTML Dashboard。

本案例的輸入與輸出：

- 輸入：`Marketing_Campaign_Data.xlsx`
- Task 1 輸出：原始 Excel 上新增公式、分析區與一張水平比較圖表。
- Task 2 輸出：`marketing_dashboard.html`，可在瀏覽器中開啟並使用篩選器互動。

::: warning 資料限制
這份資料是教學用 hypothetical marketing data，不代表任何學校或公司的真實績效。洞察只用來示範分析流程，不應直接作為預算決策。
:::

## 資料下載方式

Kaggle 仍保留作為原始資料 reference：[Marketing Campaign Dataset](https://www.kaggle.com/datasets/minalchoudhary/marketing-campaign-dataset)。如果環境無法登入 Kaggle，請直接使用已放在 GitHub 的 Excel：

- [下載 Marketing_Campaign_Data.xlsx](https://github.com/cathayins/codex-course-demo-cases/raw/refs/heads/main/data-analyst/Marketing_Campaign_Data.xlsx)
- [查看 GitHub demo repo](https://github.com/cathayins/codex-course-demo-cases/tree/main/data-analyst)

下載後把 Excel 放到 workspace，或直接拖入 Codex App 對話。這個 workbook 已整理成三張原始 sheet，不需要另外下載或合併三個檔案。

## 資料說明

### Sheet overview

| Sheet | 筆數 | 用途 |
| --- | ---: | --- |
| `CampaignPerformance` | 763 筆資料列 | 每日／期間的曝光、點擊、leads、applications、enrollments、成本與營收 |
| `CampaignMeta` | 5 筆資料列 | Campaign 的目標、期間、預算、類型、負責人、渠道與轉換目標 |
| `ChannelRates` | 5 筆資料列 | 各渠道的 AvgCPM、AvgCPC 與備註，作為成本效率的參考 |

### 欄位定義

以下用水平分頁查看三張 sheet 的欄位；Task 1 與 Task 2 都應以這些實際欄位為準，不要自行發明欄位名稱。

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

## Task 1 說明

### 任務目標說明

不要只看總營收。請以 Platform 為單位，找出成本效率與入學轉換表現最值得優先檢視的平台。

請在 Excel 新增 `Task1_Analysis` 工作表，用公式產生分析指標，並繪製一張 ROAS by Platform 的水平長條圖。最後用數據寫出「資料事實、解讀、下一步」的 insight。

### 指標說明

| 指標 | 公式 | 意思與判讀方式 |
| --- | --- | --- |
| ROAS | `Revenue (₹) / Cost (₹)` | 每投入 ₹1 行銷成本帶回多少營收。通常越高越有效率，但仍要搭配營收與 Enrollments 規模。 |
| CTR | `Clicks / Impressions` | 看到廣告的人有多少比例點擊。可觀察素材與受眾吸引力，但不能單獨代表最終轉換。 |
| Enrollment Rate | `Enrollments / Applications` | 已申請的人最後完成入學／註冊的比例。通常越高越好，但要一起看 Applications 數量。 |
| Cost per Enrollment | `Cost (₹) / Enrollments` | 平均取得一筆入學／註冊所需的行銷成本。通常越低越好，但仍要確認 Enrollments 不是太少。 |

判讀時不要只找單一最高或最低值，要把效率、轉換率與實際產出放在一起比較。

## Task 1 可以直接複製貼上的 Prompt

```text
請使用 Spreadsheet skill 分析目前提供的 Marketing_Campaign_Data.xlsx，完成 Task 1。請直接修改並另存為 Marketing_Campaign_Data_Task1.xlsx，不要覆蓋原始檔。

問題：以 Platform 為單位，哪一個平台的成本效率與入學轉換表現最值得優先檢視？不要只用總營收下結論，請同時比較 ROAS、CTR、Enrollment Rate 與 Cost per Enrollment。

請完成：
1. 先檢查三張原始 sheet 的欄位、資料列數、空值與日期範圍；不要修改 CampaignPerformance、CampaignMeta、ChannelRates 的原始資料。
2. 新增工作表 Task1_Analysis，以 Platform 彙總 CampaignPerformance。
3. 在 Task1_Analysis 用 Excel 公式建立以下欄位：Platform、Impressions、Clicks、Applications、Enrollments、Cost (₹)、Revenue (₹)、CTR、Enrollment Rate、Cost per Enrollment、ROAS。計算欄要用公式引用原始 sheet，不要把結果寫成固定數字；除法遇到 0 時用 IFERROR 或等價方式處理。
4. 使用正確的跨工作表引用，例如 ='CampaignPerformance'!A2；請避免把原始資料複製成另一份 hardcode 表。
5. 新增一張以 ROAS 為數值、Platform 為分類的水平長條圖。圖表要有標題、數值單位，並在圖表旁標註資料期間。
6. 在分析區下方寫出一段簡短 insight，分成「資料事實、解讀、下一步」。不要把相關性寫成因果；如果樣本量或資料定義不足，請明確標註限制。
7. 驗證 Task1_Analysis 的 Cost、Revenue、Enrollments 總額能回勾 CampaignPerformance，並掃描 #REF!、#DIV/0!、#VALUE! 等錯誤。最後回報新增工作表、公式欄、圖表與輸出檔案路徑。
```

### 期待結果說明

- Excel 新增 `Task1_Analysis` 工作表。
- 每個 Platform 有可追溯的公式欄：CTR、Enrollment Rate、Cost per Enrollment、ROAS。
- 有一張 ROAS 水平長條圖，能快速看出平台排名。
- 圖表旁有「資料事實／解讀／下一步」的 insight，且保留資料期間與限制。

![Task 1 Excel 分析結果](/images/cases/marketing-task1-result.png)

圖 1：Task 1 完成結果（Excel `Task1_Analysis`、公式欄、ROAS 水平長條圖與 insight）。

## Task 2 說明

### 任務目標說明

把同一份 Excel 做成一個本地互動 Dashboard，讓觀眾不用打開工作表，也能回答「目前哪個平台／區域／Campaign 表現較好」。

Dashboard 至少要有：

- KPI：總成本、總營收、總 Enrollments、ROAS。
- 篩選器：Platform、Region、CampaignName。
- 圖表：月度營收趨勢、Platform ROAS 比較、行銷漏斗。
- Insight 區塊：根據目前篩選結果更新資料事實、解讀與下一步。
- 頁尾：資料來源、資料期間、幣別與 hypothetical data 限制。

## Task 2 可以直接複製貼上的 Prompt

```text
請使用 Spreadsheet skill 與 Data Analytics skill，讀取目前提供的 Marketing_Campaign_Data.xlsx，完成 Task 2。請不要修改原始 Excel，輸出一個可以直接在地端打開、可互動的 marketing_dashboard.html。

請先確認三張 sheet 的欄位與資料範圍：CampaignPerformance、CampaignMeta、ChannelRates。不要連線到 Kaggle，也不要捏造資料；Dashboard 的資料必須來自這份 Excel。

請建立一個可離線運作的 HTML Dashboard：
1. 將需要的資料以安全、可追溯的方式嵌入 HTML；不要依賴外部 CDN、遠端 API、內網服務或需要登入的資料源，完成後可直接雙擊檔案開啟。
2. 頁首顯示資料標題、資料期間、幣別（₹）與資料來源檔名。
3. 建立 KPI cards：Total Cost、Total Revenue、Total Enrollments、ROAS。
4. 建立三個互動篩選器：Platform、Region、CampaignName。任一篩選改變時，KPI、圖表與 insight 都要同步更新；提供 Clear filters。
5. 建立三個圖表：月度 Revenue 趨勢、Platform ROAS 水平比較、Impressions → Clicks → Leads → Applications → Enrollments 漏斗。圖表標題、單位與計算定義要清楚。
6. 建立 Insight 區塊。針對目前篩選結果，列出「資料事實、解讀、下一步」；請避免把相關性寫成因果，並顯示樣本量或資料限制。
7. 優先使用簡單、可離線運作的 HTML／CSS／JavaScript；手機寬度不可水平溢出，空資料篩選要顯示友善提示。
8. 完成後驗證：HTML 可以用瀏覽器直接開啟、篩選器會更新所有 KPI 與圖表、主要 KPI 能與 Excel 原始資料對上，且 Console 沒有錯誤。回報輸出路徑與驗證結果。
```

### 期待結果說明

- 產出 `marketing_dashboard.html`，不需要啟動 server，直接雙擊即可開啟。
- 篩選 Platform、Region、CampaignName 時，KPI、三張圖表與 insight 會同步變化。
- Dashboard 使用同一份 Excel 的數據，與 Task 1 的 ROAS 定義一致。
- 版面在桌機與手機寬度都可讀，且標示資料來源、日期範圍、幣別與資料限制。

![Task 2 Dashboard 結果](/images/cases/marketing-task2-dashboard.png)

圖 2：Task 2 完成結果（可在地端開啟的互動 Dashboard）。
