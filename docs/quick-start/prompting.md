---
title: Prompting｜指定檔案與交代任務
description: 用 @ 指定 Marketing Excel，建立趨勢圖、調整結果，再製作互動式 Dashboard。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial task-lesson
---

<script setup>
import { withBase } from 'vitepress'
import FileMentionDemo from '../.vitepress/theme/FileMentionDemo.vue'

const dashboardUrl = withBase('/demo-assets/marketing_dashboard.html')
</script>

# Prompting｜指定檔案與交代任務

<p class="lesson-lead">從 Marketing Excel 做一張趨勢圖，查看結果並補充修改需求，再把分析內容做成 Dashboard。</p>

<LessonBlock id="mention-file" title="用 @ 指定檔案" description="在輸入框輸入 @，搜尋並選取工作區裡的檔案，再說明這份資料要怎麼使用。">

<FileMentionDemo />

複製下面這段，在輸入框照同樣方式選取上一頁的 `Marketing_Campaign_Data.xlsx` 後送出。

```text
請基於 @Marketing_Campaign_Data.xlsx 建立一份新的 Excel，
依 Date 與 Platform 彙總 Clicks，
製作各平台點擊次數的趨勢折線圖，並保留彙總表。
新檔案請命名為 Marketing_Campaign_Click_Trend.xlsx。
請保留原始檔案。
```

除了 @，也可以直接寫出清楚的檔案路徑。要注意的是：選取檔案本身不會增加存取權限，Codex 能讀到什麼仍由工作區範圍決定。
</LessonBlock>

<LessonBlock id="inspect-excel" title="在右側查看產生的 Excel" description="完成後，點選回覆中的檔案卡片或檔案連結，在右側預覽工作表與圖表。">

<figure class="task-result">
  <a href="/images/quick-start/marketing-click-trend-preview.webp" target="_blank" rel="noreferrer">
    <img src="/images/quick-start/marketing-click-trend-preview.webp" width="1800" height="978" alt="Codex 左側回覆列出 Marketing_Campaign_Click_Trend.xlsx，右側預覽依 Platform 分組的每日點擊趨勢折線圖" loading="lazy" decoding="async">
  </a>
  <figcaption>實際操作範例：左側是產生的檔案，右側是 Excel 預覽。點圖可放大查看。</figcaption>
</figure>

本例另存了一份 Excel，新增分析工作表與趨勢圖。可先檢查檔名、日期範圍、圖例與彙總表，確認使用的是指定的資料。實際輸出外觀可能與範例不同。
</LessonBlock>

<LessonBlock id="refine-result" title="在同一段對話中提出修改" description="指出想保留的內容與需要調整的地方，Codex 就能沿用目前檔案繼續處理。">

截圖中的每日資料較密集，不容易比較長期變化。可以要求改成月度趨勢：

```text
請修改剛才產生的 Marketing_Campaign_Click_Trend.xlsx：
將每日趨勢改為每月加總的點擊次數，
每個 Platform 保留一條折線，
圖表標題與座標軸使用繁體中文。
請同步更新彙總表，保留原始資料工作表。
```

完成後重新開啟產生的檔案，確認橫軸已改成月份，圖表與彙總表的數字一致。

<details class="task-context">
  <summary>◔ 查看上下文使用情況</summary>
  <p>對話、已讀取的檔案內容與工具結果會占用上下文空間。App 有顯示用量時，可點選輸入框附近的小圓圈查看；若未顯示，可確認設定中的「顯示情境視窗使用量」。介面位置以目前版本為準。</p>
  <p>較長的對話可能經過壓縮整理，不會永遠逐字保留。下一頁會介紹 Compact；這個用量也不同於帳號的 Credits 餘額。</p>
</details>
</LessonBlock>

<LessonBlock id="prompt-examples" title="補充哪些資訊，會讓需求更清楚？" description="不需要每次都寫長篇 Prompt。先補上會影響這次結果的資訊。">

<div class="task-comparisons">
  <section>
    <h3>目標：說明要比較什麼</h3>
    <p class="task-before">原本：幫我分析這份 Excel。</p>
    <p class="task-after">補充後：比較各平台每月點擊次數的變化，製作趨勢折線圖。</p>
    <p>「分析」可能得到文字摘要或表格；補上比較對象、時間單位與圖表形式，成果才有明確方向。</p>
  </section>
  <section>
    <h3>範圍與限制：說明要改哪一份</h3>
    <p class="task-before">原本：幫我改一下檔案。</p>
    <p class="task-after">補充後：修改剛才產生的分析檔，只更新趨勢圖與彙總表，保留原始資料。</p>
    <p>工作區裡已經有原始檔與分析檔，指定檔名和修改範圍可以減少誤解。</p>
  </section>
  <section>
    <h3>驗證與交付：說明怎麼檢查、留下什麼</h3>
    <p class="task-before">原本：做好給我。</p>
    <p class="task-after">補充後：核對圖表與彙總表的數字，另存成可編輯的 Excel，並說明檢查結果。</p>
    <p>成品格式與檢查方式寫清楚，拿到結果後就知道從哪裡確認。</p>
  </section>
</div>
</LessonBlock>

<LessonBlock id="task-elements" title="任務六要素" description="工作比較複雜時，可以用這六項檢查有沒有漏掉必要資訊，不必每次都套用固定格式。">

| 要素 | 要交代什麼 | Marketing 案例 |
| --- | --- | --- |
| 目標 | 希望完成的結果 | 製作互動式行銷 Dashboard |
| 背景 | 誰會使用、為什麼需要 | 供行銷主管比較平台投入與成果 |
| 範圍 | 使用的資料與處理內容 | 指定 Excel，呈現成本、營收、入學數與 ROAS |
| 約束 | 必須遵守的限制 | 保留原始 Excel，不補造數字 |
| 驗證 | 如何確認做對 | 核對指標加總，測試篩選器 |
| 交付 | 最後留下什麼 | HTML 檔案、開啟方式與檢查結果 |

任務設計會影響成果是否符合需求。資料本身的品質與最後的檢查，同樣會影響結果。
</LessonBlock>

<LessonBlock id="build-dashboard" title="把 Marketing 資料做成 Dashboard" description="Excel 已能查看趨勢，接下來加入 KPI 與互動篩選，讓使用者自己選擇平台、區域和活動。">

留在同一個工作區，指定原始 Excel，送出以下任務：

```text
請使用 @Marketing_Campaign_Data.xlsx，
製作一份供行銷主管比較平台成效的互動式 Dashboard。

內容包含：
- KPI：總成本、總營收、總 Enrollments、ROAS。
- 篩選器：Platform、Region、CampaignName，並提供清除篩選功能。
- 圖表：月度營收趨勢、各平台 ROAS 比較、
  Impressions → Clicks → Leads → Applications → Enrollments 行銷漏斗。

以 CampaignPerformance 作為績效資料來源。
如需其他工作表，先確認關聯方式，避免重複計算。
請保留原始 Excel，不要補造缺少的數字。
ROAS 以加總營收除以加總成本計算，不要平均各列 ROAS；
分母為零或資料不足時，請標示無法計算。

畫面使用繁體中文、淺色背景與清楚的圖例，
並標示資料來源、日期範圍、幣別與教學合成資料的限制。

完成後核對 KPI 與來源資料，
測試篩選與清除篩選後，KPI 和圖表是否同步更新。

交付可直接在瀏覽器離線開啟的 marketing_dashboard.html，
將必要資料與資源包含在檔案內，不依賴外部 CDN。
請說明開啟方式、檢查結果，以及尚未解決的問題。
```

<details class="task-embed" open>
  <summary class="task-embed__bar">
    <span class="task-embed__caret" aria-hidden="true"></span>
    <span class="task-embed__tag">Example output</span>
    <b>marketing_dashboard.html</b>
    <a :href="dashboardUrl" target="_blank" rel="noreferrer" @click.stop>在新分頁開啟 ↗</a>
  </summary>
  <iframe
    :src="dashboardUrl"
    title="行銷平台成效 Dashboard 範例成果"
    loading="lazy"
  ></iframe>
</details>

<p class="task-embed__note">可以篩選、檢視 KPI 與圖表。實際成果請在自己的電腦上執行產生。</p>

下一頁會用這份 Dashboard 加上原始 Excel，規劃一份給行銷主管的分析報告。
</LessonBlock>

<div class="lesson-next-step"><span>下一步</span><a href="./using-slash">Slash Commands：規劃行銷分析報告 →</a></div>

## 參考資料

- [Prompting｜OpenAI](https://learn.chatgpt.com/docs/prompting)
- [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer?surface=app)
- [任務設計｜CodexGuide](https://codexguide.ai/start/07-task-design.html)

<p class="source-note">六要素參考 CodexGuide 的任務設計整理，範例改用本課 Marketing 資料。成果截圖為實際操作範例。</p>
