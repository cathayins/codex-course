# QuickStart 與 Marketing 實戰案例｜講師講稿

本講稿依 [`agenda.md`](agenda.md) 的現行 60 分鐘課程配置撰寫，涵蓋：

- 第一堂 Codex App：0–20 分 QuickStart、44–56 分 Marketing 資料分析 Demo。
- 第二堂 Codex IDE：0–12 分 QuickStart。

網站教材留給學員課後閱讀，現場不用逐頁講。時間採累計計時；`【講】`是可直接說的內容，其他標記則是操作、觀察重點和備援做法。

---

# 課前準備

## 共通檢查

- Codex App 與 VS Code 已登入課堂帳號，字級與投影對比可讀。
- 每次示範都開新任務。需要重跑時，另開一個沒有舊產物的資料夾。
- App 的 **Settings → 一般 → 後續跟進行為**先設為 **Queue**。
- 課堂以預設 Model 與預設 reasoning 開始，不在 QuickStart 花時間比較全部模型。
- 關閉通知並開好計時器；需要等待生成的步驟，都先準備完成版。

## App QuickStart 檔案

在一個名為 `tokyo-travel-demo` 的資料夾中準備：

- `tokyo-trip-brief.txt`：可從 [`docs/public/demo-assets/tokyo-trip-brief.txt`](docs/public/demo-assets/tokyo-trip-brief.txt) 複製。
- 不要預先放入 `tokyo-travel-research.md` 或 `tokyo-travel-plan.html`，讓學員看見 Codex 先蒐集素材，再建立最後成果。

備援素材放在另一個不會被現場 task 讀到的資料夾：

- 搜尋太慢時，將 [`docs/public/demo-assets/tokyo-travel-research-fallback.md`](docs/public/demo-assets/tokyo-travel-research-fallback.md) 複製成 `tokyo-travel-research.md`，再繼續 `/plan`。
- HTML 產生太慢時，打開 [`docs/public/demo-assets/tokyo-travel-plan-fallback.html`](docs/public/demo-assets/tokyo-travel-plan-fallback.html)。

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

## 0:00–1:30｜開場：今天不是來背功能

【操作】開啟 [ChatGPT vs Codex](docs/quick-start/index.md)，停在主標與「顧問 vs 能進工作環境的同事」。

【講】

> 大家可能已經用過 ChatGPT。今天先別急著看按鈕，我想先問：什麼工作適合交給 Codex？
>
> 先用一個不完全精確、但很好記的比喻：ChatGPT 比較像一起討論、整理與提供建議的顧問；Codex 比較像可以進到指定工作環境、實際操作檔案與工具的同事。兩邊能做的事會重疊。會不會寫程式不是重點，先看工作從哪裡開始，成果最後要放在哪裡。

【問學員】

> 如果今天只是想比較兩個觀點，你們會先開哪一個？如果要讀一個資料夾裡的多份檔案，最後還要留下成品呢？

停一到兩個回答後收束：只是想聊想法，多半先開 ChatGPT；要進資料夾、讀幾份檔案，還得留下成品，我會開 Codex。

## 1:30–4:00｜Codex 的工作單位是「可驗收的任務」

【操作】仍停在 [ChatGPT vs Codex](docs/quick-start/index.md)，快速帶過成果案例區，不逐張開啟。

【講】

> Codex 接下的是一整件工作。我們交代一個目標，它可以讀來源、操作工具、建立或修改檔案，再把可檢查的結果交回來。
>
> 人還是得把目標、底線和驗收方式說清楚；探索、執行和驗證可以交給 Codex。等一下你們會看到，我不會只問它「哪個比較好」，而會說清楚來源、成品與不能亂猜的地方。

【現場取捨】

- App 班不展開 [Codex for Engineer](docs/quick-start/codex-for-engineer.md)；工程分工留到第二堂。
- Showcase 圖片只用來建立期待，不在此處逐一介紹。

## 4:00–5:30｜今天選 App，入口依工作現場決定

【操作】切到 [安裝 Codex](docs/quick-start/installation.md)，顯示 App、IDE Extension、CLI 三個入口。

【講】

> Codex 有 App、IDE Extension 與 CLI。三個入口沿用同一套工作方式，差別只在你平常在哪裡做事。
>
> 一般文件、資料與跨應用工作，可以先從 App 開始；平常就在編輯器裡工作的人，用 IDE；習慣命令列或自動化的人，再選 CLI。今天先用 App，讓大家直接走完第一個任務。

【講師提醒】

> 課堂帳號已經登入。大家自己安裝時，一般優先選 Sign in with ChatGPT；實際可用功能仍會受到方案與公司 Workspace 政策影響。

不要現場安裝，不展開 CLI 指令與 API key 計費。

## 5:30–9:00｜認識 App：左邊開始、中間交代、右邊驗收

【操作】切到 [Codex App](docs/quick-start/app-interface.md)，先指三大區塊，再打開右側 Files 或 Review 面板。

【講】

> 看這個畫面，先從左邊開始。左邊選專案和任務，中間交代工作；Codex 做完後，我們到右邊看檔案、終端、網站預覽和變更。
>
> 左邊還有一個常見混淆：Project 會綁定一個資料夾，適合需要持續留下成果的工作；Task 可以是一次性的對話。今天要建立檔案，所以我們從 Project 開始。

【操作】依序點一下右側的 Files、Review、Browser、Terminal；每個只停三到五秒。

【講】

> 看到「完成」先別急著關掉。做網站就開 Browser，做文件看 Files，程式修改則看 Diff 和測試。最後要看哪一個面板，由交付物決定。

【現場取捨】Settings 這裡只確認 Queue，其他頁籤今天先跳過。

## 9:00–15:30｜第一個 Project：資料夾、Model、Message

【操作】切到 [First Project](docs/quick-start/first-project.md)，再回 App 實際操作。

### 9:00–10:30｜選資料夾

【操作】在「專案」旁按 **＋** → **使用現有資料夾** → 選擇 `tokyo-travel-demo`。

【講】

> 這個資料夾就是今天的工作範圍。Codex 可以讀裡面的來源，也會把成果留在這裡。今天只放教學資料。客戶資料、密碼和公司機密都不要拿來練習。

### 10:30–11:00｜沿用預設 Model

【操作】指一下輸入框下方的 Model 與 reasoning，不切換。

【講】

> Model 會影響速度、深度與用量，但不會替我們補上沒說的目標。第一次沿用預設值就好。結果太淺再提高 reasoning，工作類型變了再換 Model。今天先把任務跑起來。

### 11:00–15:30｜送出第一個任務

【操作】用 `@` 從選單選取 `tokyo-trip-brief.txt`，貼上並送出：

```text
請讀取 @tokyo-trip-brief.txt，蒐集規劃這趟東京旅行會用到的資訊。

可以搜尋網路，優先參考官方或可信的來源。
請把蒐集到的內容整理成 `tokyo-travel-research.md`，
保留來源連結與查詢日期；還不能確認的內容請清楚標示。

這一輪只做資料蒐集與整理，先不要安排每天的行程。
```

【講】

> 第一步先蒐集資料，不急著排行程。來源是剛才用 `@` 選的需求檔，再讓 Codex 找到規劃會用到的最新資訊，整理成一份新的研究素材。外部資料要保留來源，後面才能核對。
>
> `@` 不只是把檔名打進句子。我會從選單選取，讓 Codex 確實帶入這份檔案或能力。

【操作】從 Files 確認 `tokyo-travel-research.md` 已建立，再送出：

```text
/plan

請讀取 @tokyo-trip-brief.txt 與 @tokyo-travel-research.md，
規劃如何產出一份完整的東京旅遊規劃計畫書。

請先提出這趟旅程的規劃方向、安排行程時要遵守的準則、
遇到衝突時的取捨原則、計畫書應包含的內容，以及完成後的檢查方式。

最終成果要是一份可以實際使用的旅遊規劃計畫書，
但這個階段先確認規劃方法與計畫書架構，
先不要建立最終成品。
```

【講】

> Plan 會同時參考原始需求和剛蒐集的新素材，但這時還不直接排行程。先確認它打算依照哪些方向與準則規劃，以及最後的計畫書會包含什麼；方向不對，可以在動手前修正。

【操作】確認 Plan 後送出：

```text
請依照剛才確認的規劃方向與準則，
開始製作完整的東京旅遊規劃計畫書。
```

【看點】Codex 是否同時使用需求檔與研究素材，並依照剛確認的方向與準則開始製作計畫書。

## 15:30–18:30｜用 Steer 改成交付 HTML，再驗收

【操作】趁 Codex 還在製作行程時，用 Steer 送出：

```text
我希望最後交付的是一份可以直接打開的 HTML 旅遊計畫。
請改成建立 `tokyo-travel-plan.html`，並繼續完成目前的工作。
```

【講】

> 行程內容沒有換題，但我現在才補上真正需要的交付格式。這會直接改變眼前成果，所以用 Steer，不用等一般文字做完再重來。

【操作】從 Files 打開 `tokyo-travel-plan.html`，再用 Browser 預覽。快速檢查日期、航班、住宿、預約、飲食限制與「出發前確認」。

【講】

> 現在直接打開檔案，先查日期、航班、住宿、預約和飲食限制。這幾個地方最不能出錯。
>
> 內容大致正確，只是格式不好用，留在原任務裡改就好。

【操作】把下一步排進 Queue：

```text
這一版完成後，請檢查手機版是否能正常閱讀、互動是否可操作，
並列出仍需要出發前確認的資訊。
```

【講】

> 第一句 Prompt 不用把後面所有要求都塞進去。要改變眼前結果，用 Steer；要等目前成果完成後再驗收，就用 Queue；如果是不同目標，再開 New Task。

如果第一個任務已完成，Follow-up 直接送出即可，不必為了展示 Steer 人為拖長任務。

## 18:30–20:00｜收束並交棒

【操作】回到 App 主畫面，讓 Project、task 與新檔案同時可見。

【講】

> QuickStart 到這裡，我們已經走完一輪：選資料夾、用 `@` 指定來源、交代成果，最後打開檔案檢查。
>
> 第一次不用丟一個大專案給 Codex。像剛才這種十幾分鐘能做完、打得開檔案核對的任務，更適合練習。接下來 Roy 會介紹 Skills、Plugins 與 Automation：也就是怎麼替 Codex 增加做法、工具，以及重複執行的能力。

### QuickStart 超時版（剩 60 秒時）

立刻停止等待，打開課前準備的 `tokyo-travel-plan-fallback.html`：

> 還在跑，我們直接切完成版。來源是同一份旅遊需求，成果是可以操作的 HTML；還沒核對的資訊集中放在「出發前確認」。這三件事有做到，示範就成立。

### QuickStart 課後閱讀

不在 20 分鐘現場逐頁講解：

- [Models](docs/quick-start/models.md)
- [Prompting](docs/quick-start/prompting.md)
- [Slash Commands](docs/quick-start/using-slash.md)
- [Follow Up](docs/quick-start/follow-up.md)
- [Using Goals](docs/quick-start/goals.md)
- [Credits 精打細算](docs/quick-start/token-efficiency.md)

---

# 第一堂｜Marketing 資料分析 Demo（44–56 分）

## Demo 的一句話目的

> 今天會用同一份 Excel 做兩個成品：一份看得到公式的分析表，再加上一個能離線操作的 Dashboard。指標怎麼定、結果能不能採用，還是由人判斷。

## 44:00–45:00｜情境與輸入

【操作】開啟 [Marketing 數據分析教材](docs/cases/marketing-data.md)，停在 Task Summary 與三張 sheet 的說明。

【講】

> 前面 Roy 講完 Skills 和 Plugins，現在直接拿一份 Marketing Excel 來跑。裡面有 763 筆 CampaignPerformance，另外兩張表補 Campaign 和 Channel 資訊。先在 Excel 留下公式和判讀，再用同一份資料做離線 Dashboard。這份是教學用合成資料，不能拿去做真實預算決策。

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
