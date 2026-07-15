---
title: Skills：把方法變成可重用能力
description: 從 App 中選用現有 Skill，到設計、建立與測試團隊可重複使用的工作流程。
outline: [2, 3]
---

# Skills：把方法變成可重用能力

Skill 是某一類任務的可重用工作方法。它把「什麼時候使用、依什麼順序執行、結果要通過哪些檢查」保存下來，讓 Codex 不必每次都靠一段很長的 Prompt 重新理解流程。

這一頁先從 App 中的基本使用開始，再進入 Skill 的檔案結構、progressive disclosure、建立方式與測試策略。

## Basic｜先會選用現有 Skill

### 從 App 畫面開始

1. 在側欄開啟 **Skills**，瀏覽目前環境可用的能力。
2. 點開一個 Skill，先看名稱、用途與簡介，不需要一開始就理解內部檔案。
3. 回到輸入區輸入 `$`，明確選擇要使用的 Skill。
4. 交代輸入、受眾、輸出格式與不可推測的內容。
5. 檢查結果是否真的遵循該 Skill 的品質流程。

不指定時，Codex 也能依照 Skill 的 description 自動判斷；教學、驗收與高風險任務建議明確指定，較容易理解與重現。

### 常見能力類別

以下名稱以課程環境為例，實際清單會隨 App 版本、帳號、Workspace 政策與已安裝 Plugins 改變：

| 類別 | 常見 Skills | 適合任務 |
| --- | --- | --- |
| 辦公檔案 | `presentations`、`documents`、`pdf`、`spreadsheets` | 建立、編修與驗收常見交付檔案 |
| 圖像 | `imagegen` | 產生或編修插圖、圖片與視覺素材 |
| 官方資訊 | `openai-docs` | 查核目前 OpenAI／Codex 官方文件 |
| 能力管理 | `skill-creator`、`skill-installer` | 建立自己的 Skill 或安裝外部 Skill |

使用者先學會閱讀用途並選對能力，不需要背誦安裝來源或完整清單。

### 一個基本 Prompt

```text
$documents
請把我附上的 3 份會議紀錄整理成一頁繁體中文會議摘要。

依序列出：
1. 已決策事項
2. 行動項目、負責人與期限
3. 待確認問題

不得自行補上未記載的負責人、期限或結論。
```

這裡仍要描述任務本身。Skill 提供方法，不會取代本次任務的輸入、目的與限制。

### 什麼時候使用 Skill

- 已有成熟 Skill 能處理任務，例如簡報、文件或試算表。
- 結果必須遵循固定步驟，例如產出後要 render、檢查溢位或核對來源。
- 同一類任務反覆出現，需要一致的模板與驗收標準。
- 團隊希望把專業做法保留下來，而不是只存在個人對話裡。

只做一次、流程仍在探索，或只有一句限制時，直接寫在本次 Prompt 即可。

## 從 Basic 到 Advanced

| 階段 | 你正在解決的問題 | 建議做法 |
| --- | --- | --- |
| 使用 | 這次任務需要成熟方法 | 用 `$skill-name` 明確指定 |
| 重複 | 每次都要貼相同規則 | 整理成 instruction-only Skill |
| 團隊化 | 同一專案要共用流程 | 放進 Repository 的 `.agents/skills` |
| 擴充 | 需要模板、參考資料或確定性程式 | 加入 `assets/`、`references/` 或 `scripts/` |
| 散布 | 多個 Skills 或連線要一起安裝 | 再封裝成 [Plugin](/advanced/plugins) |

不要從「建立很多檔案」開始。先確定流程值得重複，再逐步增加結構。

## Advanced｜理解 Skill 如何載入

一個 Skill 最少是一個包含 `SKILL.md` 的資料夾，也可以加入其他資源：

```text
meeting-follow-up/
├── SKILL.md        # 必要：metadata 與工作指示
├── scripts/        # 選用：需要確定性執行的程式
├── references/     # 選用：規範與參考資料
└── assets/         # 選用：模板與素材
```

Codex 使用 **progressive disclosure** 管理 context：

1. 一開始只取得 Skill 的名稱、description 與位置。
2. 任務符合或被明確指定後，才讀取完整 `SKILL.md`。
3. 只有實際需要時，才讀 references、使用 assets 或執行 scripts。

因此 description 不只是介紹文字，也是觸發條件。它要清楚說明適用情境、主要輸入與不該觸發的邊界。

## 建立自己的 Skill

適合建立的訊號：

- 同一件事已經重複做過數次。
- 流程與輸出已大致穩定。
- 每次都需要相同的檢查、術語或模板。
- 錯過其中一步會產生實際品質風險。

可以先使用內建 creator：

```text
$skill-creator
請建立一個 meeting-follow-up skill。

用途：當使用者提供會議紀錄時，整理可追蹤的後續事項。
輸入：逐字稿、會議筆記或多份會議紀錄。
輸出：會議目的、已決策事項、行動項目、負責人、期限、待確認問題。
限制：不得推測未明確記載的負責人、期限或決策；缺少資訊時標示「待確認」。
請先做成 instruction-only skill，儲存在此 Repository 的 .agents/skills。
```

最小 `SKILL.md`：

```markdown
---
name: meeting-follow-up
description: 將會議紀錄整理成決策、行動項目、負責人、期限與待確認問題；缺少資訊時不得自行推測。
---

1. Read every supplied meeting note before summarizing.
2. Separate confirmed decisions from proposals and discussion points.
3. List each action item with its owner and deadline.
4. Mark missing owners or deadlines as "待確認"; never infer them.
5. End with unresolved questions and the next follow-up date, if stated.
```

### 選擇儲存範圍

- Repository：`.agents/skills/<skill-name>/SKILL.md`，適合同一專案或團隊共用。
- User：`$HOME/.agents/skills/<skill-name>/SKILL.md`，適合個人跨專案使用。

## 測試觸發與品質

至少準備三種測試：

1. **明確符合**：應載入 Skill 並完成整套流程。
2. **邊界案例**：只有部分符合時，應詢問或採最小必要步驟。
3. **刻意無關**：不應因 description 過寬而誤觸發。

同時檢查輸出是否符合順序、格式與禁止推測等要求。若 Skill 含 scripts，還要測試輸入錯誤、依賴缺失與執行失敗時的行為。

## 第三方 Skills 的進階練習

後續 Codebase 案例可用兩種社群能力練習審查與選用：

- [Mermaid Skill](https://github.com/Agents365-ai/mermaid-skill)：將架構圖、流程圖與 ERD 保存成可版控的文字來源。
- [LangChain Skills](https://github.com/langchain-ai/langchain-skills)：查核 LangChain／LangGraph 建置方式，只載入案例需要的 Skills。

安裝前要閱讀 `SKILL.md`、scripts、references、依賴與資料流向；社群 Skill 不是框架 API 的最終依據，仍要以目前官方文件交叉驗證。

## 完成檢查

- [ ] 能從 App 找到 Skill，並用 `$` 明確指定。
- [ ] 知道 Skill 提供方法，但不取代本次任務內容。
- [ ] 能說明 progressive disclosure 的三個載入階段。
- [ ] Description 包含適用情境與重要邊界。
- [ ] 已測試符合、邊界與無關 Prompt。
- [ ] 第三方 scripts、依賴與資料流向已審查。

## 延伸閱讀

- [OpenAI：Build skills](https://learn.chatgpt.com/docs/build-skills)
- [下一章：Plugins](/advanced/plugins)

