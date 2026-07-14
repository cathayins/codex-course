# Codex App 基礎課：能力擴充與素材轉簡報

> 本文件依 [`agenda.md`](agenda.md) 的第一堂「Codex App」編排，只保留 **15–30 分的進階能力**與 **30–42 分的 Demo 1**。對象是第一次使用 Codex App 的一般使用者；內容從畫面與基本觀念開始，不深入 Plugin manifest、MCP 設定或 Automation 的進階排程語法。

## 課程順序與時間

| 時間 | Part | 主題 | 現場產出 |
| ---: | --- | --- | --- |
| 15–30 | **進階能力** | Skills → Plugins → Automation（Scheduled） | 學員能從 App 畫面找到三項能力，並判斷何時使用 |
| 30–42 | **Demo 1** | 讀取參考文件 → 產生 storyline → 內建 `presentations` skill → GordenSuperPPTSkills | 同一份 storyline 的兩種簡報製作結果與選用判斷 |

## 學習目標

完成這 27 分鐘後，學員應能：

1. 用一句話分辨 Skill、Plugin 與 Automation。
2. 從 Codex App 的 **Skills**、**Plugins**、**Scheduled** 畫面找到可用能力。
3. 知道何時直接用現有 Skill，何時值得建立自己的 Skill。
4. 先從參考文件整理證據與 storyline，再請 Codex 製作簡報。
5. 說明內建 `presentations` skill 與第三方 GordenSuperPPTSkills 的差異。

---

# Part 1｜進階能力（15–30 分）

## 現場節奏

| 時間 | 模組 | 畫面操作 | 一句話重點 |
| ---: | --- | --- | --- |
| 15:00–15:30 | 銜接 | 回到 Codex App 左側欄與 Prompt 輸入區 | QuickStart 是「交代任務」，接下來是「替 Codex 增加可重用能力」 |
| 15:30–22:00 | Skills | 開啟 **Skills**，瀏覽、點開一個 Skill，回到輸入區用 `$` 指定 | Skill 是某一類任務的可重用工作方法 |
| 22:00–26:00 | Plugins | 開啟 **Plugins**，切換 OpenAI／Workspace／Personal 與 Installed | Plugin 是可安裝、可分享的能力包 |
| 26:00–30:00 | Automation | 開啟 **Scheduled**，查看任務、狀態與執行紀錄 | Automation 讓已經測通的工作按時間自動重跑 |

## 1.1 Skills：讓 Codex 按固定方法完成一類任務

### 從 App 畫面開始

講師依序操作：

1. 在左側欄開啟 **Skills**，說明這裡是目前 App 能看見的 Skills。
2. 點開 `documents`，只看名稱、用途與簡介，不展開內部技術細節。
3. 回到任務輸入區，輸入 `$`，示範明確選擇一個 Skill。
4. 補充：不指定時，Codex 也可能依 Skill 的 description 自動選擇；初學者做 Demo 時明確指定，結果較容易理解與重現。

### 基本觀念

Skill 可以先想成「寫給 Codex 的標準作業流程」。它通常包含：

- 什麼情況應該使用。
- 執行順序與品質標準。
- 可選的範例、模板、參考資料與輔助 scripts。

Codex 一開始只看到 Skill 的名稱與描述；選中後才讀完整指示，需要時才讀 references 或執行 scripts。這種按需載入方式稱為 **progressive disclosure**，初學階段只要記住：「Skill 可以很完整，但不必每次都把所有內容塞進 Prompt。」

### 目前有哪些內建／預載 Skills

以下是 **2026-07-14 本課程環境可直接看到的主要 Skills**，用類別介紹即可，不要求學員記名稱。實際清單會隨 App 版本、帳號、Workspace 政策與已安裝 Plugins 改變，授課當天以 **Skills** 畫面為準。

| 類別 | 主要 Skills | 適合的任務 |
| --- | --- | --- |
| 檔案與內容 | `presentations`、`documents`、`pdf`、`spreadsheets` | 製作或編修簡報、文件、PDF 與試算表 |
| 圖像 | `imagegen` | 產生或編修點陣圖片、插圖與視覺素材 |
| 官方資訊 | `openai-docs` | 查核 OpenAI／Codex 的目前官方文件 |
| 建立與安裝能力 | `skill-creator`、`skill-installer`、`plugin-creator`、`template-creator` | 建立 Skill／Plugin／範本，或安裝外部 Skill |

> 講師提醒：從使用者角度，它們都是在 App 中可選用的 Skills；其中一部分可能由 OpenAI 預載的 Plugin 提供。課堂先學會「看用途、選對能力」，不用背安裝來源。

### 什麼時候適合使用 Skill

- 任務已經有成熟 Skill，例如製作簡報、整理 Word、分析試算表。
- 結果需要固定步驟或品質檢查，例如每次輸出簡報都要逐頁 render 與檢查溢位。
- 團隊希望同一類任務遵循一致的模板、命名或驗收方式。

簡單範例：

```text
$documents
請把我附上的 3 份會議紀錄整理成一頁繁體中文會議摘要。
依序列出「已決策事項、負責人與期限、待確認問題」，不得自行補上未記載的結論。
```

### 什麼時候適合建立自己的 Skill

同一件事已經重複做過幾次，而且每次都需要重新貼相同規則時，才值得建立 Skill，例如：

- 每週都要把會議紀錄整理成固定格式的主管摘要。
- 每次會議結束都要整理決策、負責人、期限與待確認問題。
- 團隊文件都要套用同一套術語、章節與檢查清單。

以下情況先不要建立：只做一次的任務、仍在頻繁改變的流程，或只需一句限制的要求。這些直接寫在本次 Prompt 即可。

### 如何建立自己的 Skill

初學者先用內建 `skill-creator`，不必手刻複雜目錄：

```text
$skill-creator
請建立一個 meeting-follow-up skill。

用途：當使用者提供會議紀錄時，依固定格式整理後續追蹤內容。

輸入：逐字稿、會議筆記或多份會議紀錄。
輸出：會議目的、已決策事項、行動項目、負責人、期限、待確認問題。
限制：不得推測未明確記載的負責人、期限或決策；缺少資訊時標示「待確認」。
請先做成 instruction-only skill，儲存在此 Repository 的 .agents/skills。
```

建立後帶學員看兩件事：

1. Repository Skill 通常位於 `.agents/skills/<skill-name>/SKILL.md`，適合同專案或團隊共用。
2. 使用者 Skill 通常位於 `$HOME/.agents/skills/<skill-name>/SKILL.md`，適合跨專案個人使用。

最小的 `SKILL.md` 概念如下：

```markdown
---
name: meeting-follow-up
description: Turn meeting notes into decisions, action items, owners, deadlines, and open questions.
---

1. Read every supplied meeting note before summarizing.
2. Separate confirmed decisions from proposals and discussion points.
3. List each action item with its owner and deadline.
4. Mark missing owners or deadlines as "To confirm"; never infer them.
5. End with unresolved questions and the next follow-up date, if stated.
```

最後用一個符合 description 的 Prompt 與一個無關 Prompt 測試，確認不會過度觸發。

## 1.2 Plugins：一次安裝完整能力包

### 從 App 畫面開始

講師依序操作：

1. 在 Codex App 左側欄開啟 **Plugins**。
2. 指出 **OpenAI**、Workspace、Personal 等來源，以及已安裝項目。
3. 點開一個 Plugin，看它提供的 Skills、外部連線或其他能力。
4. 說明安裝後通常要開新 task，新的 Skills 或 tools 才會完整出現。

### 基本觀念

Plugin 是「可安裝、可分享的能力包」。一個 Plugin 可以只有 Skills，也可以同時包含：

- Skills：可重用的工作流程。
- App／Connector 或 MCP 工具：連接 GitHub、Gmail、Figma 等外部服務。
- Hooks：在特定生命週期執行檢查。
- Scheduled task templates：排程任務的可重用起點。

對初學者的判斷方式：

- 只需要一套固定做法：先找或建立 **Skill**。
- 需要一起安裝做法、外部服務與多個工具：使用 **Plugin**。

### Codex 目前提供哪些 Plugins

以下是 **2026-07-14 本課程環境可見的主要 OpenAI／curated Plugins**。這不是永久固定或所有帳號都相同的清單；授課時應直接展示 Plugins directory 的即時內容。

| 類別 | 課堂環境的主要 Plugins | 用途示例 |
| --- | --- | --- |
| 辦公檔案 | Documents、Presentations、Spreadsheets、PDF、Template Creator | 建立可交付文件與範本 |
| 開發與設計協作 | GitHub、Figma、Notion | 查 Repository／PR、讀寫設計與知識內容 |
| 工作溝通 | Gmail、Google Calendar | 信件整理、行程與會議準備 |
| 分析與視覺 | Data Analytics、Visualize | 資料分析、圖表與互動視覺 |
| 瀏覽與發佈 | Browser、Chrome、Sites、Record & Replay | 網頁操作與測試、建站、錄製流程並轉成 Skill |

官方文件也以 Codex Security、Google Drive、Slack 等 Plugin 為例；是否顯示取決於版本、帳號、Workspace 開放政策、地區與登入狀態。

### 簡單範例

情境：想整理今天尚未回覆的重要信件。

1. 在 **Plugins** 安裝或確認 Gmail Plugin。
2. 完成 Gmail 連線授權。
3. 開新 task，直接描述結果，或用 `@` 明確選擇 Plugin。

```text
請使用 Gmail Plugin，找出今天需要我回覆的信件，
依「緊急、今天回覆、本週處理」分類；先草擬回覆，不要寄出。
```

講師提醒：Plugin 已安裝不代表可以任意存取所有資料。外部服務仍受登入帳號、原服務權限、Codex sandbox 與 approval 規則限制；寄信、刪除或發佈等外部寫入應保留人工確認。

## 1.3 Automation（Scheduled）：讓成熟任務定期執行

### 從 App 畫面開始

講師依序操作：

1. 在左側欄開啟 **Scheduled**。
2. 指出 Active／Paused／Completed 狀態、下次執行時間與 Recent runs。
3. 打開一筆執行紀錄，說明 Scheduled 也是結果收件匣。
4. 說明可建立獨立排程，或從既有 task 安排後續執行；需要延續同一段脈絡時，從既有 task 排程較合適。

### 什麼時候適合

- 每天、每週或每月都要重做的固定工作。
- 定期檢查是否出現新狀況，例如 PR 狀態、文件變更或測試結果。
- 提醒 Codex 在稍後繼續追蹤長時間作業。
- 已經用一般 task 測通，輸入、輸出與停止條件都清楚的工作。

不適合直接排程：需求仍模糊、每次都需要重大人工判斷、會自動對外發送或修改 Production、或第一次執行尚未驗證的 Prompt。

### 簡單範例

先在一般 task 測試以下 Prompt，再建立每週一 09:00 的排程：

```text
每週一 09:00 檢查這個專案過去一週 docs/ 的變更。

輸出：
1. 新增或大幅修改的課程頁面
2. 可能失效的連結或過期說明
3. 本週建議優先檢查的 3 件事

只產生摘要，不修改檔案；若沒有變更，明確回報「本週無文件更新」。
```

### 初學者一定要知道的限制

- Scheduled task 會在背景執行；要讀本機專案時，電腦需保持開機、App 需執行，而且專案路徑仍可用。
- 本機 Git 專案可選直接在專案執行或使用隔離 worktree；基礎課只說明「會改檔時優先隔離」。
- 排程會沿用 sandbox 與權限邊界，不應用寬鬆權限取代清楚的 Prompt。
- 正式排程前先手動測試，並檢查前幾次執行結果再調整頻率或輸出格式。

## 1.4 三項能力的快速判斷

| 需求 | 建議 |
| --- | --- |
| 只在這一次限制「不要新增依賴」 | 寫在本次 Prompt |
| 每次會議紀錄都要整理成相同格式的決策與待辦 | 使用或建立 Skill |
| 同時要簡報流程、公司範本與 Google Drive 連線 | 安裝或建立 Plugin |
| 每週一自動產出文件變更摘要 | 建立 Scheduled task |

轉場句：**先把方法封裝成 Skill，需要工具與分享時用 Plugin，確定流程穩定後再交給 Automation 重複執行。**

---

# Part 2｜Demo 1：讀參考文件，從 storyline 到兩種簡報成品（30–42 分）

## Demo 目標與情境

情境：根據本 Repository 的既有教材，製作一份給一般使用者的 **6 頁「Codex App 新手入門」簡報**，用於 8 分鐘內部分享。

Demo 不從「幫我做一份簡報」開始，而是依序完成：

```text
參考文件 → 來源證據 → 溝通目標 → storyline → 內建 presentations → GordenSuperPPTSkills → 比較與驗收
```

## Demo 使用的參考文件

- [`agenda.md`](agenda.md)：課程定位、對象與時間。
- [`docs/quick-start/what-is-codex.md`](docs/quick-start/what-is-codex.md)：Codex 的定位、適用工作與人的責任。
- [`docs/quick-start/app-interface.md`](docs/quick-start/app-interface.md)：App 的 task、workspace、terminal 與 diff。
- [`docs/advanced/skills-plugins.md`](docs/advanced/skills-plugins.md)：Skill 與 Plugin 的基礎分工。
- [`docs/cases/presentation.md`](docs/cases/presentation.md)：素材轉簡報的流程與驗收重點。

其中 `presentation.md` 主要提供「怎麼製作與驗收」的規則，不必硬塞成觀眾會看到的一頁內容。這也示範參考文件可以有不同角色：有些提供事實，有些提供製作規範。

## 課前準備

12 分鐘不足以等待兩套完整簡報流程，因此講師需同時準備「現場操作」與「已完成備援成果」。

1. 確認內建 `$presentations` 可在 Skills selector 找到。
2. 課前在獨立 task 完整跑過內建版本，保留 `.pptx` 與逐頁預覽。
3. 先審查 [GordenSuperPPTSkills Repository](https://github.com/GordenSun/GordenSuperPPTSkills) 的 README、三個 `SKILL.md`、scripts、references 與依賴。
4. 依 Repository 說明一起安裝 `GordenImagePPTGen`、`GordenImage2PPTX`、`GordenSuperPPTSkill`；Super Skill 依賴另外兩個 Skill，不能只裝一個。
5. 確認 Python 依賴 `python-pptx`、`pillow`、`numpy` 與 Codex 內建 `imagegen` 可用。
6. 重新開啟 App／新 task，確認 `$GordenSuperPPTSkill` 可被選取。
7. 課前完整跑過 Gorden 版本，保留每頁圖片、圖片型 PPTX、可編輯 PPTX 與中間產物。
8. 準備無網路、Skill 未出現、imagegen 不可用或生成超時時可直接展示的備援檔案。

> 第三方 Skill 可能執行 scripts、安裝依賴或產生大量圖片。安裝前先審查來源；不要在含敏感資料的專案第一次試跑。

## Demo 現場節奏

| 時間 | 步驟 | 現場操作 | 要讓學員看到的結果 |
| ---: | --- | --- | --- |
| 30:00–31:00 | 設定任務 | 選擇專案、附上 5 份參考文件，交代受眾、用途與 6 頁限制 | Codex 知道「為誰、為何、用哪些來源」 |
| 31:00–34:00 | 產生 storyline | 先要求來源表與逐頁故事線，不做 PPTX | 一句話溝通目標、6 頁 answer-first 標題、來源與未知事項 |
| 34:00–37:30 | 內建 `presentations` | 確認 storyline 後，用 `$presentations` 建立並 QA | 一份原生可編輯、已 render 檢查的 PPTX |
| 37:30–41:00 | GordenSuperPPTSkills | 在新 task 使用同一份 storyline，啟動圖片生成與可編輯還原流程；切到課前成品 | 每頁圖片、圖片型 PPTX、四層還原的可編輯 PPTX |
| 41:00–42:00 | 比較與收束 | 並排展示同一頁，說明選用時機 | 學員知道不是「哪個永遠比較好」，而是製作路線不同 |

## Step 1｜先讀文件並產生 storyline

在 Codex App 將 5 份文件加入 task 後，輸入：

```text
請先不要製作簡報。

讀取我附上的 5 份參考文件，規劃一份給第一次接觸 Codex App 的一般使用者、
用於 8 分鐘內部分享的 6 頁繁體中文簡報。

請依序輸出：
1. 一句話溝通目標：By the end, [受眾] should [成果] because [核心訊息]
2. 來源證據表：重要事實／來源檔案／可使用的頁面
3. 6 頁 storyline：頁次／takeaway-style 標題／本頁任務／三個內文要點／來源／建議視覺
4. 未知事項與不能從來源推論的內容

規則：
- 每頁只承擔一個主要訊息，標題要直接表達結論，不要只寫主題名稱。
- 故事線要前後累積，不要把六個主題並排成清單。
- 不得加入參考文件沒有的數字、案例、功能或承諾。
- 先等我確認 storyline，再開始製作簡報。
```

講師快速檢查三件事：

1. 開場是否說清楚這份簡報為什麼值得聽。
2. 每頁是否都有單一敘事任務與可追溯來源。
3. 結尾是否回到學員接下來可以採取的行動，而不是只有「Thank you」。

### 預期 storyline 骨架

實際文字以 Codex 讀取文件後的結果為準；若現場生成偏離，可用以下骨架說明如何修正：

| 頁次 | Takeaway-style 標題 | 本頁任務 | 主要來源 |
| ---: | --- | --- | --- |
| 1 | Codex App 把任務帶進真實工作區，成果也能被檢查 | 建立學習動機與核心訊息 | `what-is-codex.md` |
| 2 | 好任務先說清楚目標、限制、素材與驗收方式 | 說明如何交代第一個任務 | `what-is-codex.md` |
| 3 | 人決定目標與風險，Codex 負責在工作區執行與驗證 | 建立正確的人機分工 | `what-is-codex.md` |
| 4 | Task、workspace、terminal 與 diff 讓工作過程可追蹤 | 認識 App 的基本操作面 | `app-interface.md` |
| 5 | Skill 固化做法，Plugin 把做法與工具包成可安裝能力 | 從基本使用進入能力擴充 | `skills-plugins.md` |
| 6 | 從一個範圍小、可驗收的任務開始，再逐步重用成熟流程 | 收束並給出下一步 | `agenda.md`、其餘來源綜合 |

## Step 2｜用內建 `presentations` skill 製作簡報

確認 storyline 後，在同一個 task 明確叫用：

```text
$presentations

依照剛才確認的 storyline，製作 6 頁、16:9、繁體中文的可編輯 PPTX。

視覺方向：白底、深色文字、單一藍色重點色；技術編輯風格，避免大量卡片與裝飾。
內容要求：所有事實只使用已讀取的參考文件；每頁保留一個主要訊息。
品質要求：完成後逐頁 render，以全尺寸檢查文字換行、溢位、重疊與可讀性，修正後再交付。
輸出：codex-app-beginner-built-in.pptx。
```

講師在畫面上指出內建 Skill 的完整閉環：

1. 先確定受眾、簡報任務、核心 takeaway 與敘事順序。
2. 產生可編輯 PPTX，而不只是一組圖片。
3. Render 每一頁並檢查文字、圖像、重疊、裁切與資料一致性。
4. 回到 App 預覽成品；若時間不足，直接打開課前完成版本。

## Step 3｜用 GordenSuperPPTSkills 製作同一份簡報

為避免內建 Skill 與第三方 Skill 的製作規則互相干擾，**開新 task**，附上已確認的 storyline 與相同參考文件，再輸入：

```text
$GordenSuperPPTSkill

依照我附上的 approved storyline 與參考文件，製作 6 頁、16:9、繁體中文的
「Codex App 新手入門」簡報。

要求：
- 所有頁面文字與事實都必須來自 storyline 或參考文件，不得補造數字、案例或產品功能。
- 使用一致的白、深灰、藍色系；每頁可以有不同構圖，但整份視覺要一致。
- 嚴格依照 Skill 流程：先產生每頁圖片與圖片型 PPTX，再還原成可編輯 PPTX。
- 最後交付每頁圖片、圖片型 PPTX、可編輯 PPTX 與 Skill 規定的中間產物。
```

現場用流程圖解釋三個 Skill 的關係：

```text
GordenImagePPTGen
主題／storyline → 每頁 imagegen 圖片 → 圖片型 PPTX

GordenImage2PPTX
每頁圖片 → 背景／骨架／圖標與裝飾／文字四層 → 可編輯 PPTX

GordenSuperPPTSkill
依序編排上面兩個 Skill，交付圖片型與可編輯版本
```

完整流程會多次呼叫 `imagegen` 並產生中間素材，通常不會在 3.5 分鐘內完成。現場重點是讓學員看到 Skill 被選取、開始依流程產生；接著切換到課前完成成果，不把課堂時間花在等待。

## Step 4｜比較兩種製作路線

| 比較面向 | 內建 `presentations` | GordenSuperPPTSkills |
| --- | --- | --- |
| 定位 | OpenAI 預載的一般簡報建立、編修與 QA 流程 | 第三方、強調圖片先行與視覺還原的三 Skill 組合 |
| 主要流程 | storyline → 原生可編輯 PPTX → render／QA | storyline → 每頁圖片 → 圖片型 PPTX → 四層還原成可編輯 PPTX |
| 適合 | 一般商務／教學簡報、精確文字、後續編輯與穩定驗收 | 希望先追求高視覺密度，再保留一定後續編輯能力的情境 |
| 可編輯性 | 以簡報物件直接建立，適合持續修改 | 以背景、骨架、圖標／裝飾、文字分層還原；實際可編輯程度需用目標軟體驗收 |
| 時間與用量 | 依頁數、素材與視覺生成量而定 | 多次圖片生成與視覺解析，通常需要更多時間與圖片生成用量 |
| 信任與維護 | 依內建 Skill 與 App 更新 | 安裝前需審查第三方 Repository；更新後要重新測試 |

講師收束：**storyline 與來源正確性是共用底層；Skill 只能改變製作方法，不能取代內容判斷與驗收。**

## Demo 完成標準

- Codex 確實讀取指定參考文件，而不是只靠模型記憶。
- Storyline 先於簡報產生，且每頁有單一主張、敘事任務與來源。
- 兩條路線使用同一份 approved storyline，才具備可比較性。
- 內建版本完成逐頁 render 與版面 QA。
- Gorden 版本包含 Repository 所述的圖片、圖片型 PPTX、可編輯 PPTX 與必要中間產物。
- 兩份 PPTX 都能在目標簡報軟體開啟；中文字型、換行、重疊、裁切與可編輯性已實測。
- 學員能說出兩種路線的適用情境、成本與第三方 Skill 風險。

## 常見失敗與現場處理

| 狀況 | 處理方式 |
| --- | --- |
| Codex 一開始就做 PPTX | 停止執行，重申「先只輸出來源表與 storyline，確認後再製作」 |
| Storyline 像六個互不相干的主題 | 要求每頁回答前一頁留下的問題，並將標題改成 takeaway-style 句子 |
| 出現來源沒有的數字或功能 | 回到來源證據表，刪除無法追溯的內容並列入未知事項 |
| 內建簡報產生時間超出現場節奏 | 開啟課前完成的 PPTX 與 render 預覽，照樣示範 QA |
| 找不到 Gorden Super Skill | 確認三個 Skills 一起安裝，重啟 App 並開新 task |
| Gorden 回報 `imagegen` 不可用 | 不用程式繪圖假裝完成；說明阻塞並展示課前備援成品 |
| Gorden 完整流程來不及 | 保留正在執行的畫面，改展示課前完整產物與四層結構 |

---

# 參考資料與授課查核

Codex 介面與能力可能持續更新，授課前應重新打開 App 核對畫面與清單。本文件於 **2026-07-14** 依下列資料整理：

- [OpenAI：Build skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI：Plugins](https://learn.chatgpt.com/docs/plugins)
- [OpenAI：Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins)
- [OpenAI：Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [GordenSun/GordenSuperPPTSkills](https://github.com/GordenSun/GordenSuperPPTSkills)
- [GordenSuperPPTSkill 的實際流程](https://github.com/GordenSun/GordenSuperPPTSkills/blob/main/GordenSuperPPTSkill/SKILL.md)
