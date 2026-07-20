---
title: Marketing 數據分析｜Excel → HTML Dashboard
description: 從 GitHub 下載 Marketing Excel，完成 Excel insight 與可互動的本地 HTML Dashboard。
---

# Marketing 數據分析：打造自己的數據分析 Agent

## 任務 Summary

這是一個約 5 分鐘可以完成的 Marketing 數據分析實戰。使用三張原始 Excel sheet，先在 Excel 中回答一個需要數據判讀的問題，再把同一份資料做成可以在地端直接打開、可以互動的 HTML Dashboard。

本案例的輸入與輸出：

- 輸入：`Marketing_Campaign_Data.xlsx`
- Task 1 輸出：原始 Excel 上新增公式、分析區與一張水平比較圖表。
- Task 2 輸出：`marketing_dashboard.html`，可在瀏覽器中開啟並使用篩選器互動。

::: warning 資料限制
這份資料是教學用 hypothetical marketing data，不代表任何學校或公司的真實績效。洞察只用來示範分析流程，不應直接作為預算決策。
:::

### 資料下載方式

資料集使用 [Kaggle Markting Campaign Dataset](https://www.kaggle.com/datasets/minalchoudhary/marketing-campaign-dataset)，可從下面的連結直接下載目標資料集。
- [下載 Marketing_Campaign_Data.xlsx](https://github.com/cathayins/codex-course-demo-cases/raw/refs/heads/main/data-analyst/Marketing_Campaign_Data.xlsx)

下載後把 Excel 放到 demo 資料夾中，完成 demo 任務前置作業!

### 資料說明

這是一份為教育機構行銷分析情境設計的合成資料，模擬 2024 年 1 月至 2025 年 10 月間，Google Ads、Facebook、Instagram、LinkedIn 與 YouTube 等平台的數位行銷活動。資料涵蓋曝光、點擊、名單、申請到入學的完整轉換流程，並包含成本與營收（₹）、目標受眾、活動目標及投放區域。

資料由 ChatGPT 生成，不含真實機構資料或個人資訊，可用來練習：

- 比較 Campaign 成效、ROI 與轉換效率。
- 建立 Star Schema、事實表與維度表，練習 DAX 計算。
- 製作 Power BI 或 HTML Dashboard，練習圖表與互動設計。
- 進行機器學習、Kaggle Notebook、教學與作品集專案。

#### Sheet overview

| Sheet | 筆數 | 用途 |
| --- | ---: | --- |
| `CampaignPerformance` | 763 筆資料列 | 每日／期間的曝光、點擊、leads、applications、enrollments、成本與營收 |
| `CampaignMeta` | 5 筆資料列 | Campaign 的目標、期間、預算、類型、負責人、渠道與轉換目標 |
| `ChannelRates` | 5 筆資料列 | 各渠道的 AvgCPM、AvgCPC 與備註，作為成本效率的參考 |

#### 欄位定義

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

## Task 1

### 任務目標說明

讓 Codex 可以依照分析目標，直接編輯 Excel，產製公式與圖表，並透過 Data Analytics Skills 提供數據分析 Insight。<br>
請在 Excel 新增 `Task1_Analysis` 工作表，用公式產生分析指標，並繪製一張 ROAS by Platform 的水平長條圖。最後用數據寫出「資料事實、解讀、下一步」的 insight。

#### 指標說明

| 指標 | 公式 | 意思與判讀方式 |
| --- | --- | --- |
| ROAS | `Revenue (₹) / Cost (₹)` | 每投入 ₹1 行銷成本帶回多少營收。通常越高越有效率，但仍要搭配營收與 Enrollments 規模。 |
| CTR | `Clicks / Impressions` | 看到廣告的人有多少比例點擊。可觀察素材與受眾吸引力，但不能單獨代表最終轉換。 |
| Enrollment Rate | `Enrollments / Applications` | 已申請的人最後完成入學／註冊的比例。通常越高越好，但要一起看 Applications 數量。 |
| Cost per Enrollment | `Cost (₹) / Enrollments` | 平均取得一筆入學／註冊所需的行銷成本。通常越低越好，但仍要確認 Enrollments 不是太少。 |

判讀時不要只找單一最高或最低值，要把效率、轉換率與實際產出放在一起比較。

### 範例 Prompt

```text
請使用 @Spreadsheet 分析 @Marketing_Campaign_Data.xlsx
新增 `Task1_Analysis` sheet，以 Platform 彙總資料，使用 Excel 公式計算：

- Impressions、Clicks、Applications、Enrollments
- Cost、Revenue
- CTR
- ROAS
- Enrollment Rate

請加入一張「ROAS by Platform」水平長條圖，回答：
「哪一個平台的成本效率與入學轉換表現最值得優先檢視？」
在圖表旁以「資料事實、解讀、下一步」寫出簡短 insight。不要只依總營收下結論，也不要將相關性描述為因果。
```

### 期待結果

- Excel 新增 `Task1_Analysis` 工作表。
- 每個 Platform 有可追溯的公式欄：CTR、Enrollment Rate、Cost per Enrollment、ROAS。
- 有一張 ROAS 水平長條圖，能快速看出平台排名。
- 圖表旁有「資料事實／解讀／下一步」的 insight，且保留資料期間與限制。

![Task 1 Excel 分析結果](/images/cases/marketing-task1-result.png)

圖 1：Task 1 完成結果（Excel `Task1_Analysis`、公式欄、ROAS 水平長條圖與 insight）。

## Task 2 說明

### 任務目標說明

來實作網頁吧! 透過 Codex 把這份 Excel 做成一個本地互動 Dashboard，變成精美的可互動數據儀表板。<br>

Dashboard 至少要有：

- KPI：總成本、總營收、總 Enrollments、ROAS。
- 篩選器：Platform、Region、CampaignName。
- 圖表：月度營收趨勢、Platform ROAS 比較、行銷漏斗。
- Insight 區塊：根據目前篩選結果更新資料事實、解讀與下一步。
- 頁尾：資料來源、資料期間、幣別與 hypothetical data 限制。

### 範例 Prompt

```text
請讀取 `Marketing_Campaign_Data.xlsx`，產出可地端離線開啟的 `marketing_dashboard.html`。

Dashboard 請包含：

* KPI：Total Cost、Total Revenue、Total Enrollments、ROAS
* 篩選器：Platform、Region、CampaignName，以及 Clear filters
* 圖表：月度 Revenue 趨勢、Platform ROAS 比較、行銷漏斗
* Insight：依目前篩選結果更新「資料事實、解讀、下一步」
* 資料來源、日期範圍、幣別與 hypothetical data 限制
```

### 期待結果說明

- 產出 `marketing_dashboard.html`，不需要啟動 server，直接雙擊即可開啟。
- 篩選 Platform、Region、CampaignName 時，KPI、三張圖表與 insight 會同步變化。
- Dashboard 使用同一份 Excel 的數據，與 Task 1 的 ROAS 定義一致。
- 版面在桌機與手機寬度都可讀，且標示資料來源、日期範圍、幣別與資料限制。

![Task 2 Dashboard 結果](/images/cases/marketing-task2-dashboard.png)

圖 2：Task 2 完成結果（可在地端開啟的互動 Dashboard）。
