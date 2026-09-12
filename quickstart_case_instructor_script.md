# QuickStart 與 Marketing 實戰案例｜講師講稿

本講稿依 [`agenda.md`](agenda.md) 的現行 60 分鐘課程配置撰寫，涵蓋：

- 第一堂 Codex App：0–20 分 QuickStart、44–56 分 Marketing 資料分析 Demo。
- 第二堂 Codex IDE：0–12 分 QuickStart。

網站教材留給學員課後閱讀，現場不用逐頁講。時間採累計計時；`【講】`是可直接說的內容，其他標記則是操作、觀察重點和備援做法。

---

# 課前準備

## 共通檢查

- Codex App 已登入課堂帳號，字級與投影對比可讀；若另有 IDE 課程，再準備 VS Code。
- 每次示範都開新任務。需要重跑時，另開一個沒有舊產物的資料夾。
- App 的 **Settings → 一般 → 後續跟進行為**先設為 **Queue**。
- 課堂以預設 Model 與預設 reasoning 開始，不在 QuickStart 花時間比較全部模型。
- 關閉通知並開好計時器；需要等待生成的步驟，都先準備完成版。

## App QuickStart 檔案

在一個名為 `codex-demo` 的資料夾中準備：

- `Marketing_Campaign_Data.xlsx`：使用教材案例頁提供的教學用合成資料。
- 不要預先放入 `marketing_dashboard.html`，讓學員看見 Codex 從來源資料開始建立成果。
- 課前另存一份乾淨備份；若現場等待過久，再打開教材附的完成版 Dashboard。

## Marketing Demo 檔案

- 下載教材頁提供的 `Marketing_Campaign_Data.xlsx`，另存一份乾淨備份。
- 確認 Spreadsheet／Spreadsheets 能力可用；安裝或啟用後要開新 task。
- 預先下載 Task 1 完成版 Excel。
- 預先開啟教材附的 [`marketing_dashboard.html`](docs/public/demo-assets/data-analyst/marketing_dashboard.html)，確認篩選器與 Clear filters 可操作。
- Task 2 送出 30 秒後若還沒完成，直接切到課前完成版。

### Marketing 結果基準

這組數字只用來核對課堂範例是否讀對資料，不要求學員背誦。

| 範圍 | ROAS | Enrollment Rate | Cost per Enrollment | Enrollments |
| --- | ---: | ---: | ---: | ---: |
| 全部資料 | 23.68 | 50.06% | ₹233.10 | 392,314 |
| LinkedIn | 25.45 | 51.01% | ₹218.61 | 83,522 |
| Instagram | 24.01 | 50.74% | ₹229.70 | 75,249 |
| Facebook | 23.46 | 49.30% | ₹234.09 | 94,199 |
| Google Ads | 22.97 | 50.13% | ₹242.74 | 95,402 |
| YouTube | 22.13 | 48.72% | ₹243.38 | 43,942 |

數字若和現場結果不同，先確認資料版本、篩選器是否清空，以及 ROAS 是否使用 `Revenue ÷ Cost`。不要為了配合講稿而硬改分析結果。

---

# 第一堂｜Codex App QuickStart（0–20 分）

## 0:00–1:30｜Brief：今天會學什麼

【操作】先展示 QuickStart 的導覽，停在 [What Is Codex](docs/quick-start/index.md) 頁面開頭。

【講】

> 這一段 QuickStart 會先讓大家知道 Codex 是什麼，再看 Codex App 的畫面，最後用同一份 Marketing Excel，實際做出一個可以操作的 Dashboard。
>
> 大家不用先會寫程式，也不用先背指令。今天的重點是看懂工作範圍、把目標說清楚，最後自己檢查成果。

## 1:30–4:00｜開場：今天不是來背功能

【操作】開啟 [What Is Codex](docs/quick-start/index.md)，停在「顧問 vs 能進工作環境的同事」。

【講】

> 大家可能已經用過 ChatGPT。今天先別急著看按鈕，我想先問：什麼工作適合交給 Codex？
>
> 先用一個不完全精確、但很好記的比喻：ChatGPT 比較像一起討論、整理與提供建議的顧問；Codex 比較像可以進到指定工作環境、實際操作檔案與工具的同事。兩邊能做的事會重疊。會不會寫程式不是重點，先看工作從哪裡開始，成果最後要放在哪裡。

【問學員】

> 如果今天只是想比較兩個觀點，你們會先開哪一個？如果要讀一個資料夾裡的多份檔案，最後還要留下成品呢？

停一到兩個回答後收束：只是想聊想法，多半先開 ChatGPT；要進資料夾、讀幾份檔案，還得留下成品，我會開 Codex。

## 4:00–5:30｜Codex 的工作單位是「可驗收的任務」

【操作】仍停在 [ChatGPT vs Codex](docs/quick-start/index.md)，快速帶過成果案例區，不逐張開啟。

【講】

> Codex 接下的是一整件工作。我們交代一個目標，它可以讀來源、操作工具、建立或修改檔案，再把可檢查的結果交回來。
>
> 人還是得把目標、底線和驗收方式說清楚；探索、執行和驗證可以交給 Codex。等一下你們會看到，我不會只問它「哪個比較好」，而會說清楚來源、成品與不能亂猜的地方。

【現場取捨】

- App 班不展開 [Codex for Engineer](docs/quick-start/codex-for-engineer.md)；工程分工留到第二堂。
- Showcase 圖片只用來建立期待，不在此處逐一介紹。

## 5:30–7:30｜今天使用 Codex App

【操作】切到 [Codex App](docs/quick-start/app-interface.md)，先指三大區塊。

【講】

> 今天先從 Codex App 開始。左邊選工作，中間交代任務，右邊查看成果；先把這三件事記住，就足以完成今天的 Demo。

【講師提醒】

> 課堂帳號已經登入。大家自己安裝時，一般優先選 Sign in with ChatGPT；實際可用功能仍會受到方案與公司 Workspace 政策影響。

## 7:30–9:30｜認識 App：左邊開始、中間交代、右邊驗收

【操作】打開右側 Files、Browser 或 Review 面板，快速帶過每個用途。

【講】

> 看這個畫面，先從左邊開始。左邊選專案和任務，中間交代工作；Codex 做完後，我們到右邊看檔案、終端、網站預覽和變更。
>
> 左邊還有一個常見混淆：Project 會綁定一個資料夾，適合需要持續留下成果的工作；Task 可以是一次性的對話。今天要建立檔案，所以我們從 Project 開始。

【操作】依序點一下右側的 Files、Review、Browser、Terminal；每個只停三到五秒。

【講】

> 看到「完成」先別急著關掉。做網站就開 Browser，做文件看 Files，程式修改則看 Diff 和測試。最後要看哪一個面板，由交付物決定。

【現場取捨】Settings 這裡只確認 Queue，其他設定先留到課後補充。

## QuickStart 實作｜工作區、Excel、Dashboard 與分析報告

本段依執行速度安排示範，Prompt 以各教材頁的可複製區塊為準，避免現場使用不同版本。Excel 與 Dashboard 可準備完成範例備用。

### First Project｜開啟資料夾

【操作】在「專案」旁按 **＋** → **使用現有資料夾** → 選擇 `codex-demo`。介紹要求存取與代我核准，再送出：

```text
請告訴我目前資料夾下有什麼檔案
```

【看點】回覆包含 `Marketing_Campaign_Data.xlsx`。

### Prompting｜指定 Excel、查看並修改結果

【操作】切到 [Prompting](docs/quick-start/prompting.md)，用 @ 選取 Excel，送出「用 @ 指定檔案」的趨勢圖任務。

【看點】產出 `Marketing_Campaign_Click_Trend.xlsx`，點選檔案在右側查看圖表。使用教材中的實際截圖，說明檔案卡片與預覽的位置。

【操作】延續同一段對話，使用教材 Prompt 將每日資料改成每月加總。說明前後 Prompt 的差異，再介紹任務六要素。

【操作】送出「把 Marketing 資料做成 Dashboard」的完整 Prompt。完成後開啟 `marketing_dashboard.html`，測試 Platform 與清除篩選，抽查成本、營收與 ROAS。

### Slash Commands｜規劃並製作報告

【操作】切到 [Slash Commands](docs/quick-start/using-slash.md)，選取 /plan，使用原始 Excel 與 Dashboard 規劃報告。確認指標定義、資料期間、分析方法與報告大綱。

【操作】依 App 提示確認執行，或離開 Plan 模式，送出「確認計畫後，開始製作報告」的 Prompt，產出 `marketing_analysis_report.md`。

【銜接】報告開始製作後就進入 Follow Up，不必等它完成。

### Follow Up｜中途修改分析需求

【操作】切到 [Follow Up](docs/quick-start/follow-up.md)，以 Steer 補上入學轉換率與入學人數的比較。保留原本月度分析。

【操作】以 Queue 安排完成後核對 Excel 與報告數字，檢查結果附在報告末尾。

【看點】Steer 加入目前工作；Queue 等這輪完成後處理。若報告已完成，可在後續修改報告的執行過程中練習，或使用頁面動畫說明。

【驗收】打開報告，確認新增分析、摘要、指標公式與檢查結果一致。

## 18:30–20:00｜收束並交棒

【操作】回到 App 主畫面，讓 Project、task 與新檔案同時可見。

【講】

> 今天從工作資料夾出發，用 `@` 指定 Excel、建立趨勢圖與 Dashboard，再規劃分析報告，並在製作途中加入新的分析需求。
>
> 第一次不用丟一個大專案給 Codex。像剛才這種能打開成品、核對數字與互動的任務，更適合練習。接下來如果要深入，再另外介紹更多能力；今天先把這條基本工作流跑熟。

### QuickStart 超時版（剩 60 秒時）

立刻停止等待，打開課前準備的 `marketing_dashboard.html` 完成版：

> 還在跑，我們直接切完成版。來源是同一份 Marketing Excel，成果是可以操作的 Dashboard；還沒核對的數字集中標成待確認。這三件事有做到，示範就成立。

### QuickStart 課後閱讀

What Is Codex、Codex App、Demo 案例建立與 First Project 在現場走過；其餘頁面沿用同一份 Marketing Excel，依時間挑重點操作：

- [What Is Codex](docs/quick-start/index.md)
- [Codex App｜介面介紹](docs/quick-start/codex-app/interface.md)
- [Demo 案例建立](docs/quick-start/demo-setup.md)
- [First Project](docs/quick-start/first-project.md)
- [Models](docs/quick-start/models.md)
- [Prompting](docs/quick-start/prompting.md)
- [Slash Commands](docs/quick-start/using-slash.md)
- [Follow Up](docs/quick-start/follow-up.md)
- [Credits 精打細算](docs/quick-start/token-efficiency.md)

---

# 第一堂｜Marketing 資料分析 Demo（44–56 分）

## Demo 的一句話目的

> 今天會用同一份 Excel 做兩個成品：一份看得到公式的分析表，再加上一個能離線操作的 Dashboard。指標怎麼定、結果能不能採用，還是由人判斷。

## 44:00–45:00｜情境與輸入

【操作】開啟 [Marketing 數據分析教材](docs/cases/marketing-data.md)，停在 Task Summary 與三張 sheet 的說明。

【講】

> 前面 Course Team 講完 Skills 和 Plugins，現在直接拿一份 Marketing Excel 來跑。裡面有 763 筆 CampaignPerformance，另外兩張表補 Campaign 和 Channel 資訊。先在 Excel 留下公式和判讀，再用同一份資料做離線 Dashboard。這份是教學用合成資料，不能拿去做真實預算決策。

## 45:00–48:00｜Task 1：先做可追溯的 Excel 分析

【操作】在新的 Codex task 中，用 `@` 選取 Spreadsheet 能力與 `Marketing_Campaign_Data.xlsx`，貼上：

```text
請使用 Spreadsheet 能力分析 @Marketing_Campaign_Data.xlsx。

新增 `Task1_Analysis` sheet，以 Platform 彙總資料，使用 Excel 公式計算：
- Impressions、Clicks、Applications、Enrollments
- Cost、Revenue
- CTR
- ROAS
- Enrollment Rate
- Cost per Enrollment

加入一張「ROAS by Platform」水平長條圖，回答：
「哪一個平台的成本效率與入學轉換表現最值得優先檢視？」

在圖表旁以「資料事實、解讀、下一步」寫出簡短 insight。
不要只依總營收下結論，不要將相關性描述為因果，並保留資料期間與限制。
```

【講】

> 如果只問「哪個平台最好」，Codex 得自己猜判斷標準。這次我把指標、公式、圖表和 insight 格式都寫進 Prompt。
>
> 完成後我會直接點公式，確認數字能回到原始資料。

【等待時可講】

- ROAS 是 `Revenue ÷ Cost`，表示每投入 ₹1 帶回多少營收。
- Enrollment Rate 是 `Enrollments ÷ Applications`，要和實際量體一起看。
- Cost per Enrollment 是 `Cost ÷ Enrollments`；越低通常越有效率，但樣本與資料品質仍要檢查。
- CTR 高不代表最後 Enrollment 一定高；不要把漏斗前段指標當成最終成果。

## 48:00–50:30｜驗收 Task 1：先查公式，再讀 insight

【操作】若現場檔已完成就打開；否則直接切到 Task 1 完成版。依序檢查：

1. 原始三張 sheet 是否保留。
2. 是否新增 `Task1_Analysis`。
3. 指標欄是否為公式，不是手打數字。
4. 圖表是否為 ROAS 水平長條圖，標籤與資料期間是否清楚。
5. Insight 是否有資料事實、解讀、下一步與限制。

【講】

> LinkedIn 的 ROAS 約 25.45，是五個平台最高。Enrollment Rate 約 51.01%，Cost per Enrollment 約 ₹219，成本也最低。這幾個數字放在一起，我會先檢查 LinkedIn，但還不會直接加碼。
>
> 接著還要拆到 Campaign、日期與受眾，確認結果是不是由少數活動、資料分布或其他未控制因素造成。

若現場結果不同：

> 現場結果和基準值不同，就先停下來查資料版本、公式和篩選狀態。

## 50:30–52:00｜Task 2：把同一份資料做成離線 Dashboard

【操作】在同一個 Project 開新 task，重新用 `@` 選取原始 Excel，貼上：

```text
請讀取 @Marketing_Campaign_Data.xlsx，產出可在本機離線開啟的 `marketing_dashboard.html`。

Dashboard 請包含：
- KPI：Total Cost、Total Revenue、Total Enrollments、ROAS
- 篩選器：Platform、Region、CampaignName，以及 Clear filters
- 圖表：月度 Revenue 趨勢、Platform ROAS 比較、行銷漏斗
- Insight：依目前篩選結果更新「資料事實、解讀、下一步」
- 資料來源、日期範圍、幣別與 hypothetical data 限制

沿用 Task 1 的指標定義。完成後檢查桌機與手機寬度、篩選器連動，
以及檔案不啟動 server 也能直接開啟。
```

【講】

> Task 2 要交一個本機 HTML。我在 Prompt 裡明寫篩選器要連動、檔案要能離線開啟，而且指標定義要和 Task 1 一致。

【備援】送出後最多停 30 秒。若仍在執行：

> 它還在跑，我先不等。這個 task 留著繼續，我們直接打開課前完成版，照同一份 Prompt 驗收。

## 52:00–55:00｜操作 Dashboard，而不是只看首頁

【操作】開啟完成版 `marketing_dashboard.html`，依序完成：

1. 先讀全資料 KPI，確認 ROAS 約 23.68。
2. 篩選 Platform = LinkedIn，指出 KPI、三張圖與 Insight 同步更新。
3. 再加一個 Region，讓學員看到多條件篩選。
4. 按 **Clear filters**，確認回到全資料。
5. 縮窄視窗，快速確認手機寬度仍可讀。

【講】

> Dashboard 打得開還不夠。先選 LinkedIn，KPI、趨勢圖、平台比較、漏斗和 insight 都要一起變。再加 Region，所有區塊仍要使用同一批篩選後資料。
>
> 最後按 Clear filters 回到全資料。頁尾再核對來源、2024-01-01 到 2025-10-31 的資料期間、幣別是 ₹，以及 hypothetical data 限制。

【問學員】

> 如果這個 Dashboard 要交給主管使用，你們還會多驗收哪一件事？

可接受的答案包括：抽查原始數字、公式一致性、空篩選狀態、極端值、手機版、無障礙、資料更新方式與決策限制。只收一到兩個回答。

## 55:00–56:00｜收束

【講】

> 這次我們從 Excel 原始資料一路做到分析表和 Dashboard。Codex 可以幫忙做公式、圖表和互動頁面；問題問得對不對、數字有沒有對上、結論能不能採用，還是得自己看。
>
> 現場驗收就查四件事：公式、圖表、互動、資料限制。

## Marketing Demo 時間壓縮版

若只剩 6 分鐘：

| 時間 | 做法 |
| ---: | --- |
| 0:00–0:45 | 說明資料、兩個交付物與 hypothetical 限制 |
| 0:45–1:30 | 展示 Task 1 Prompt，不等待現場生成 |
| 1:30–3:15 | 打開完成版 Excel，講 LinkedIn 三項基準與「優先檢視 ≠ 直接加碼」 |
| 3:15–5:15 | 打開完成版 Dashboard，操作 LinkedIn、Region、Clear filters |
| 5:15–6:00 | 用「公式可查、互動可用、限制清楚」收束 |

## Marketing 常見狀況與講師回應

| 狀況 | 講師處理 |
| --- | --- |
| Spreadsheet 能力沒有出現 | 確認已安裝／啟用並開新 task；現場直接改用完成版，不在台上除錯安裝 |
| Codex 只回覆文字，沒有改 Excel | 重申交付物是新增 `Task1_Analysis` 的 `.xlsx`，並要求實際建立公式、圖表與 insight |
| 指標是硬編碼數字 | 要求改為可追溯公式，再重新核對總額與平台彙總 |
| 只用總營收判斷最佳平台 | 要求同時比較 ROAS、Enrollment Rate、Cost per Enrollment 與量體 |
| 直接說「LinkedIn 一定造成較好成效」 | 改成描述性結論，明確說相關性不代表因果，並列出要再檢查的切分 |
| Dashboard 需要 server 才能開 | 要求重做成單一檔案、本機可直接開啟的 HTML，或改展示課前完成版 |
| 篩選後只有 KPI 改變 | 這不算完成；三張圖與 Insight 也必須使用同一個篩選後資料集 |
| 現場數字和基準不同 | 先查資料版本、公式、篩選器與期間，不照講稿硬講 |

---

# 第二堂｜Codex IDE QuickStart（0–12 分）

## 0:00–2:00｜從補全下一行，到交辦可驗收的任務

【操作】開啟 [Codex for Engineer](docs/quick-start/codex-for-engineer.md)，停在「從 Ctrl C、V 到直接交辦任務」。

【講】

> 第一堂我們在 App 裡處理文件與資料；第二堂把同一個觀念帶進程式碼庫。以前我們常把答案複製回 IDE，或請 AI 補下一行。Codex 可以接下更完整的任務：先讀專案、修改程式，再跑測試。
>
> 工程師負責決定要改什麼，最後看 Diff 和測試結果。

## 2:00–4:00｜IDE 的三個核心工作方式

【操作】切到 [Codex IDE](docs/quick-start/ide-interface.md)，顯示 Hero 與三個編號區塊。

【講】

> IDE 版會示範三個動作：帶入目前的檔案和 Selection、在程式碼旁看 Diff，任務較大時再交給 Cloud。
>
> VS Code、Cursor 與 Windsurf 會從 Codex extension 進入；其他 IDE 的入口可能不同。安裝和登入課前已經完成，這裡直接開始操作。

## 4:00–7:00｜先用 Context 理解，不急著修改

【操作】在示範 Repository 開啟 `retry.ts`，選取 retry loop，再從 Codex composer 帶入 Selection。

```text
請追查選取區塊為什麼可能重複 retry。
先說明資料流、可能原因與驗證方式，先不要修改。
```

【講】

> 我不用把整份檔案貼進 Prompt。Codex 會從目前開啟的檔案、Selection 與 Project Context 開始。
>
> 第一輪我先要求理解，而且明確說「先不要修改」。先請它解釋，我才能確認它找對檔案、看懂 retry 流程，也知道接下來該跑哪個測試。

【看點】回答是否引用正確 symbol、是否說明 retry 次數與停止條件、是否提出可執行的 focused test。

## 7:00–10:00｜聚焦修改、測試、看 Diff

【操作】確認理解方向正確後送出：

```text
請修正 retry exhaustion 的停止條件，只修改相關檔案。
補上能重現問題的 focused test，完成後執行該測試。
回覆修改檔案、行為差異與測試結果。
```

【講】

> 確認方向後再讓它修改。做完要補一個能重現問題的測試，還要真的把測試跑過。

【操作】完成後先讀摘要，再打開 Diff，最後看 Terminal 的 test output。

【講】

> 驗收順序是摘要、Diff、測試。摘要告訴我們 Codex 認為自己做了什麼；Diff 告訴我們實際改了什麼；測試才是可重跑的證據。三者不一致時，以實際檔案和工具輸出為準。

## 10:00–11:00｜Local 或 Cloud

【操作】指向教材的 Local → Cloud 圖示，不必真的派送。

【講】

> 我需要邊看邊改時，就留在 Local。工作會跑一陣子，或我想先去做別的事，再交給 Cloud。換執行位置不會自動補上缺少的目標、限制與驗收方式。

## 11:00–12:00｜收束並交棒

【講】

> IDE QuickStart 也走同一套流程：帶入 Context、先理解、聚焦修改，再看 Diff 和測試。
>
> 接下來會把專案規則、Skills、Plugins、MCP、Worktree 和 Hooks 接進這套做法。

### IDE 備援

若現場 Repository 或 extension 無法操作，使用教材頁的 retry 範例畫面完成口述：

> 模型還沒跑完也沒關係。請看這個畫面：Selection 限定範圍，Prompt 交代目標和完成條件，最後用 Diff 和 focused test 檢查。

---

# 下課前共用結語

若需要用 20 秒統整兩堂 QuickStart 與案例：

> 做文件、Dashboard 或改程式，我都先檢查同幾件事：工作範圍對不對、來源有沒有選到、成品放在哪裡，最後要用什麼證據驗收。這幾件事講清楚，Codex 才知道什麼時候算做完。
