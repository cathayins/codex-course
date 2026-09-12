---
title: Slash Commands｜規劃分析報告
description: 用 Plan 先釐清分析問題與報告架構，確認後再產出報告，並認識 Compact。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial task-lesson slash-commands-page
---

# Slash Commands｜規劃分析報告

<p class="lesson-lead">Dashboard 做好了，但它只回答「數字長什麼樣」。這一頁要往前一步：用原始 Excel 與這份 Dashboard，產出一份給行銷主管看的分析報告 — 而且先不急著寫，先把分析問題與報告架構講清楚。</p>

<LessonBlock id="slash-menu" title="用 / 開啟指令選單" description="在輸入框輸入 /，選擇要使用的指令。可用項目會依 App 版本與環境設定有所不同。">

<SlashCommandDemo />

這一頁會用到兩個：`/plan` 用來先規劃再動手，`/compact` 用在對話變長、脈絡需要整理的時候。
</LessonBlock>

<LessonBlock id="report-plan" title="用 Plan 把工作拆成兩個階段" description="報告這種任務，做錯方向的成本比做慢高。Plan 模式讓 Codex 先把做法講出來，你確認之後才開始寫。">

<div class="task-stages">
  <section>
    <span class="task-stages__num">階段 1</span>
    <h3>規劃：先講做法，不動檔案</h3>
    <p>Codex 提出分析方法、報告大綱、指標公式與驗證方式，並列出需要你決定的問題。這一輪不產生任何檔案。</p>
  </section>
  <section>
    <span class="task-stages__num">階段 2</span>
    <h3>執行：確認後才產出報告</h3>
    <p>你看過計畫、修正方向之後，才讓它照著計畫寫成報告檔案。</p>
  </section>
</div>

確認工作區已有 `Marketing_Campaign_Data.xlsx` 與 `marketing_dashboard.html`。輸入 `/plan` 選取規劃模式，再送出：

```text
請根據 @Marketing_Campaign_Data.xlsx 與剛才建立的 @marketing_dashboard.html，
規劃一份給行銷主管的成效分析報告，
說明平台表現、值得關注的變化，以及後續建議。

數字以原始 Excel 為依據，Dashboard 協助探索與呈現。
這一輪先討論計畫，不要建立或修改任何檔案。
```

需求只寫到這個程度就夠了。剩下的細節不是你要先想好的，而是**計畫回來之後你要檢查的**：

<ul class="task-checklist">
  <li><b>分析問題</b><span>它打算回答哪幾個問題？是不是行銷主管真正會問的？</span></li>
  <li><b>報告架構</b><span>大綱分成哪幾段？摘要、平台比較、月度變化、建議有沒有都在？</span></li>
  <li><b>指標定義</b><span>ROAS 是加總營收÷加總成本，還是各列平均？兩者結果會差很多。</span></li>
  <li><b>資料處理</b><span>資料期間是哪一段？異常值與缺漏值怎麼處理？</span></li>
  <li><b>驗證方式</b><span>報告寫完之後，它打算怎麼證明數字是對的？</span></li>
</ul>

哪一項不符合你的想法，直接在這段對話裡講，不必重寫整個需求。Plan 階段改一句話，比報告寫完再翻掉便宜得多。
</LessonBlock>

<LessonBlock id="write-report" title="確認計畫後，開始製作報告" description="依 App 提示確認執行，或離開 Plan 模式，再送出以下訊息。">

```text
請依照剛才確認的計畫執行，
將報告存成 marketing_analysis_report.md，使用繁體中文。

報告包含摘要、平台比較、月度變化、後續建議與資料限制。
重要結論請附上對應數字、資料期間與計算方式；
區分資料事實與推測，不將相關性描述為因果。
請核對報告數字與原始 Excel，說明已完成與尚未完成的檢查。
保留原始 Excel 與 Dashboard。
```

送出後**先不要關掉這個任務** — 下一頁要在報告還在製作的過程中，練習中途改變分析重點。如果這輪已經跑完也沒關係，可以在後續修改報告時再練習一次。
</LessonBlock>

<LessonBlock id="compact-context" title="對話變長時，用 Compact 整理脈絡" description="Compact 會把目前對話壓縮成較短的摘要，讓同一項工作能接著進行。">

```text
/compact
```

摘要會保留目標、重要決策與工作進度，但不會逐字保存所有內容。用完可以確認檔名、指標定義與還沒完成的要求是否仍然清楚。這次的練習不長，不需要為了示範刻意把上下文塞滿。
</LessonBlock>

<LessonBlock id="other-commands" title="其他常用指令">

| 指令 | 用途 |
| --- | --- |
| `/model` | 選擇目前任務使用的模型。 |
| `/reasoning` | 調整推理強度。 |
| `/status` | 查看任務狀態、上下文與用量資訊。 |
| `/review` | 檢查程式碼變更；分析報告的數字仍須另外核對。 |
| `/side` | 開啟暫時的側邊對話，不打斷主任務。 |
| `/project` | 選擇新任務使用的專案。 |
| `/task` | 開啟不指定專案的新任務。 |
| `/pet` | 顯示或收起桌面寵物。 |

請以目前 App 選單顯示的項目為準。
</LessonBlock>

<div class="lesson-next-step"><span>下一步</span><a href="./follow-up">Follow Up：報告製作途中改變分析重點 →</a></div>

## 參考資料

- [Slash commands｜OpenAI](https://learn.chatgpt.com/docs/reference/slash-commands)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
