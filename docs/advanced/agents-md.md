---
title: AGENTS.md：Repository 的長期規範
description: 學習判斷哪些規則適合寫入 AGENTS.md，並透過改寫與檢查，讓規則具體、可驗證且容易維護。
outline: [2, 3]
---

# `AGENTS.md`：Repository 的長期規範

`AGENTS.md` 記錄 Codex 在這個專案中長期遵循的工作規範，包括無法直接從程式碼得知的專案慣例、操作邊界與驗收標準。

[Prompting](/quick-start/prompting) 用 Goal、Context、Output 與 Boundaries 描述單次任務。本章會進一步判斷哪些資訊能跨任務沿用，適合寫成 Repository 的長期規範。

Codex 能讀取既有報表與程式碼，但無法自行得知「正式報價前必須轉成 PDF」或「這個服務不能直接連 Production」等團隊規則。這類無法從專案內容直接判斷，而且每次工作都適用的規則，才需要寫入 `AGENTS.md`。

<section class="lesson-goals" aria-labelledby="lesson-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="lesson-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>判斷哪些資訊適合成為長期規範，並將冗長的初稿改成具體、可執行的 <code>AGENTS.md</code>。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>判斷內容</strong><span>分清楚一次性任務、長期規範與技術控制。</span></article>
    <article><strong>辨識品質</strong><span>用五個特徵檢查規則是否值得保留。</span></article>
    <article><strong>完成改寫</strong><span>把空泛說明改成具體命令、邊界與驗收條件。</span></article>
    <article><strong>控制範圍</strong><span>只在必要時使用根目錄與子目錄分層。</span></article>
  </div>
</section>

<nav class="lesson-flow agents-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 判斷該不該寫</span>
  <span><b>02</b> 看懂品質特徵</span>
  <span><b>03</b> 建立核心結構</span>
  <span><b>04</b> 刪減並改寫</span>
  <span><b>05</b> 評分與維護</span>
</nav>

## 1｜把重複糾正變成專案規則

同一項提醒若在不同任務中反覆出現，例如「這個專案用 `uv`，不要改用 `pip`」、「修改付款流程要先跑 sandbox 測試」或「交付時要列出沒跑的檢查」，可以考慮將它寫成 Repository 的共同規範。

寫入 `AGENTS.md` 前，先檢查三件事：

1. **它會在未來多個任務重複使用嗎？** 只服務這次需求的內容，留在 Prompt。
2. **Codex 能從程式碼或現有文件可靠推得嗎？** 能直接看出的資訊，不必再複製一次。
3. **它更適合由工具強制執行嗎？** 格式、型別與安全邊界，應優先交給 formatter、CI 或 Permissions。

### Prompt、`AGENTS.md` 與技術控制的分工

| 內容類型 | 建議位置 | 例子 |
| --- | --- | --- |
| 這次任務的目標與限制 | Prompt | 修正匯入錯誤，這次不要改 public API |
| 跨任務都適用的非直覺規則 | `AGENTS.md` | 付款測試只能使用 sandbox provider |
| 使用者或架構說明 | README／`docs/` | 安裝教學、完整模組設計與 API reference |
| 可自動判定的程式規則 | Formatter／Linter／Test／CI | 縮排、import 排序、型別與測試門檻 |
| 檔案、網路與核准邊界 | Config／Permissions | 限制寫入範圍、禁止網路、敏感操作需核准 |

Goal 與本次任務的 Output 通常留在 Prompt。能跨任務使用，而且無法從 Repository 直接判斷的 Context、Boundaries 與驗證條件，才適合寫入 `AGENTS.md`。

::: warning 文字規範不能取代技術邊界
「不要連 Production」可以寫成行為提醒；實際限制仍須由 Sandbox、Permissions、憑證隔離或 CI 執行。
:::

## 2｜好的 `AGENTS.md` 有五個特徵

`AGENTS.md` 應讓 Codex 快速找到目前適用的做法，不需要收錄完整的專案百科。

<section class="lesson-quality-grid" aria-label="好的 AGENTS.md 五個品質特徵">
  <article class="lesson-quality-card">
    <span>01</span>
    <strong>精簡</strong>
    <p>只保留會影響多數相關任務的最小資訊，避免重述 README。</p>
  </article>
  <article class="lesson-quality-card">
    <span>02</span>
    <strong>具體</strong>
    <p>提供真實命令、路徑、條件與替代方案，不寫「遵守最佳實務」。</p>
  </article>
  <article class="lesson-quality-card">
    <span>03</span>
    <strong>程式碼看不出來</strong>
    <p>補充無法從程式碼判斷的商業限制、歷史原因與責任邊界。</p>
  </article>
  <article class="lesson-quality-card">
    <span>04</span>
    <strong>可驗證</strong>
    <p>清楚定義要跑哪些檢查，以及交付時應回報什麼結果。</p>
  </article>
  <article class="lesson-quality-card">
    <span>05</span>
    <strong>可維護</strong>
    <p>規則有穩定的適用範圍；命令或流程改變時容易找到並更新。</p>
  </article>
</section>

請比較下面兩句：

```text
差：修改後請注意品質並完整測試。
好：修改 Python 程式後先執行 `uv run pytest tests/unit -q`；若變更 public API，再執行完整測試 `uv run pytest -q`。
```

後者明確回答了三件事：**何時做、做什麼、做到什麼程度**。Codex 不必猜測「完整測試」的範圍，團隊也能確認要求是否已執行。

## 3｜一份好規範的四個核心區塊

多數 Repository 使用以下四個區塊就足夠，再依專案需求調整內容。

<section class="lesson-anatomy-grid" aria-label="AGENTS.md 的四個核心區塊">
  <article class="lesson-anatomy-card">
    <span>QUICK COMMANDS</span>
    <strong>讓 Codex 立即開始工作</strong>
    <p>列出可直接執行的 install、lint、test、build，並說明執行目錄與快速／完整檢查的差異。</p>
  </article>
  <article class="lesson-anatomy-card">
    <span>PURPOSE & CONTEXT</span>
    <strong>補上程式碼看不出的背景</strong>
    <p>只記錄不直覺的入口、責任邊界、相容性需求與必讀文件，不做完整目錄導覽。</p>
  </article>
  <article class="lesson-anatomy-card">
    <span>CHANGE BOUNDARIES</span>
    <strong>說清楚 Always／Ask／Never</strong>
    <p>描述可以直接做、需要先確認與不可執行的變更；若禁止某做法，最好一併提供安全替代方案。</p>
  </article>
  <article class="lesson-anatomy-card">
    <span>DEFINITION OF DONE</span>
    <strong>定義什麼叫做完成</strong>
    <p>要求回報驗證命令、未執行項目、已知風險，以及文件、migration 或 rollback 等交付條件。</p>
  </article>
</section>

### 可直接改寫的精簡範本

```markdown
# 專案庫導覽

## 常用指令

* 安裝依賴：`uv sync`
* 快速測試：`uv run pytest tests/unit -q`
* 完整測試：`uv run pytest -q`
* 程式碼檢查（Lint）：`uv run ruff check .`
* 型別檢查：`uv run mypy app`

## 專案目的與注意事項

* 本服務用於處理訂閱計費事件。
* 修改發票／帳單行為前，請先閱讀 `docs/billing-contracts.md`。
* `app/legacy_gateway/` 是為了相容合作夥伴而保留，請勿順手對其進行重構。

## 變更邊界與限制

* 請務必使用現有的 Test Double（測試替身）；測試絕不可呼叫真實的支付服務提供者（Payment Provider）。
* 若要新增正式環境套件依賴（Production Dependency）、修改公開 API 或 Schema，請先詢問並確認。
* 嚴禁印出金鑰憑證（Credentials）或客戶資料載荷（Payload）；除錯時請使用去敏感化（Redacted）的 Fixture。

## 完成定義（Definition of Done）

* 針對修改涵蓋的領域執行相應檢查，並回報確切執行的指令與結果。
* 當發票／帳單行為有變更時，須同步更新 `docs/billing-contracts.md`。
* 列出跳過的檢查項目、潛在風險、Migration（資料庫遷移）影響以及 Rollback（復原）考量。
```

這份範本需要依專案調整。專案沒有 type check 時，刪除對應命令；完整測試若需要一小時，則註明哪些變更必須執行完整測試。

### 四個區塊各自解決的問題

| 區塊 | Codex 不再需要猜什麼 | 撰寫時的檢查問題 |
| --- | --- | --- |
| Quick commands | 要用哪個工具、從哪裡開始驗證 | 每個命令現在真的能執行嗎？ |
| Purpose & context | 特殊設計為什麼存在、該先讀哪裡 | 這些資訊能從程式碼直接看出嗎？ |
| Change boundaries | 哪些變更可直接做、哪些要先問 | 禁止事項是否提供了安全替代方案？ |
| Definition of done | 何時可以交付、要回報哪些風險 | 完成條件能被人或工具檢查嗎？ |

## 4｜刪除無效內容，留下可執行規則

這份 `/init` 初稿混合了 README 摘要、應由工具執行的格式規則、空泛要求與單次任務需求。Before／After 範例示範如何刪除或重新分類這些內容。

::: code-group

```markdown [Before｜冗長但不實用]
# 專案指引

這是一個 Python Web 應用程式。程式碼位於 `src/`，測試程式碼位於 `tests/`，而說明文件位於 `docs/`。本專案使用 FastAPI、PostgreSQL、Redis、Ruff 及 pytest。

* 遵循軟體工程最佳實踐，編寫乾淨整潔的程式碼。
* 使用 4 個空格進行縮排，並保持 import 排序整齊。
* 確保每次變更後所有測試皆能通過。
* 編輯檔案時請保持審慎，切勿破壞現有的行為機制。
* 針對目前的 BILL-248 單號（ticket），請勿新增任何新的套件依賴（dependency）。
* 關於安裝步驟、架構說明及所有 API 端點，請參閱 README。
```

```markdown [After｜精簡且可執行]
# 專案庫導覽

## 常用指令

* 快速檢查：`uv run pytest tests/unit -q`
* API 或資料庫變更的完整檢查：`uv run pytest -q`
* 程式碼檢查（Lint）：`uv run ruff check .`

## 注意事項與隱性規則

* `src/legacy_sync/` 必須保持對合作夥伴資料載荷（Payload）第 2 版的相容性。
* 修改資料庫或 API 欄位前，請先閱讀 `docs/data-contracts.md`。

## 變更邊界與限制

* 若要修改公開 API、Schema 或正式環境套件依賴（Production Dependency），請先詢問並確認。
* 請使用現有的 Redis 與 PostgreSQL 測試 Fixture；測試不得呼叫共用服務。

## 完成定義（Definition of Done）

* 附上驗證採用的指令與執行結果。
* 若有修改 Schema，須包含 Migration（資料庫遷移）與 Rollback（復原）的影響評估。
* 列出跳過的檢查項目及其原因。
```

:::

### 這次改寫做了什麼

<div class="lesson-rule-grid">
  <section class="lesson-rule-card is-skip" aria-labelledby="rewrite-removed-title">
    <span class="lesson-rule-card__mark">刪除／搬移</span>
    <strong id="rewrite-removed-title" class="lesson-rule-card__title">刪除 Codex 可自行取得或由工具處理的內容</strong>
    <ul>
      <li>使用的框架、工具與基本目錄結構，可以從 manifest、設定檔及 Repository 內容得知。</li>
      <li>縮排與 import 排序交給 Ruff，不再用自然語言重複。</li>
      <li>只適用於單一 ticket 的相依套件限制，移回該次任務的 Prompt。</li>
      <li>「注意品質」「不要破壞」沒有可檢查的行動，因此刪除。</li>
    </ul>
  </section>
  <section class="lesson-rule-card is-do" aria-labelledby="rewrite-added-title">
    <span class="lesson-rule-card__mark">保留／補強</span>
    <strong id="rewrite-added-title" class="lesson-rule-card__title">保留會影響決策的專案知識</strong>
    <ul>
      <li>列出快速測試與完整測試各自的適用條件，避免每次都執行完整測試。</li>
      <li>補上 partner payload 相容性與資料契約的必讀入口。</li>
      <li>將高影響變更列為「執行前先詢問」，並說明禁止連線時應使用哪些 fixtures。</li>
      <li>將驗證命令與結果、migration 影響及剩餘風險列入完成條件。</li>
    </ul>
  </section>
</div>

## 5｜不該寫的內容，應該搬去哪裡

從 `AGENTS.md` 刪除的資訊，應移到適合閱讀、維護或自動執行的位置。

| 不適合長留在 `AGENTS.md` 的內容 | 問題 | 更適合的位置 |
| --- | --- | --- |
| README 與安裝教學 | 兩份內容容易不同步 | README，必要時只放連結與閱讀時機 |
| 資料夾樹與檔案說明 | 程式碼變動後很快過時 | 架構文件；只保留不直覺的入口 |
| 需要的套件與版本 | Codex 可以直接讀取 | `package.json`、`pyproject.toml` 等 manifest |
| 縮排、import 順序等規則 | 自然語言無法保證執行 | Formatter、Linter、pre-commit、CI |
| 「遵守最佳實務」「保持高品質」 | 沒有具體動作或完成條件 | 改寫為可執行命令或直接刪除 |
| 完整 API reference 與架構設計 | 內容太長且受眾不只 Codex | `docs/`，在規範中指出何時必讀 |

### 研究提醒：自動生成只是初稿

針對 coding agent context files 的研究顯示，未經整理的自動生成內容可能增加推論成本，卻不一定提升任務成功率；在該研究的資料集上，自動生成版本的平均成功率反而下降約 3%，推論成本增加超過 20%。

這項研究只涵蓋特定 benchmark、Repository 與 coding tasks，結果不能直接套用到所有私有專案，也未衡量團隊知識傳承的完整價值。較合適的做法是將 `/init` 視為盤點素材，再由人刪除可直接推得、重複或無法執行的內容，只留下必要規則。

延伸查核：[原始論文](https://arxiv.org/abs/2602.11988)與[中文研究整理](https://blog.aihao.tw/2026/05/03/agents-md-research-and-practices/)。

## 6｜分層是為了控制內容範圍

只適用於特定模組的規則，應放在接近該模組的目錄；根目錄只保留全專案通用的內容。

<div class="lesson-file-tree" role="group" aria-label="AGENTS.md 三層作用域範例">
  <div class="lesson-file-tree__title">
    <span>RULE SCOPE</span>
    <small>越接近工作目錄，內容越具體</small>
  </div>
  <ul>
    <li class="lesson-file-tree__divider" role="separator" aria-label="使用者規則範圍"><span>USER SCOPE</span></li>
    <li>
      <div class="lesson-file-tree__node"><span class="lesson-file-tree__icon lesson-file-tree__icon--home" aria-hidden="true"></span><code>~/.codex/AGENTS.md</code><span class="lesson-file-tree__badge is-global">個人跨專案偏好</span></div>
    </li>
    <li class="lesson-file-tree__divider" role="separator" aria-label="專案規則範圍"><span>PROJECT SCOPE</span></li>
    <li>
      <details open>
        <summary class="lesson-file-tree__node lesson-file-tree__node--folder"><span class="lesson-file-tree__icon lesson-file-tree__icon--folder" aria-hidden="true"></span><code>commerce-platform/</code></summary>
        <ul>
          <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon lesson-file-tree__icon--file" aria-hidden="true"></span><code>AGENTS.md</code><span class="lesson-file-tree__badge is-active">全專案共同規則</span></div></li>
          <li>
            <details open>
              <summary class="lesson-file-tree__node lesson-file-tree__node--folder"><span class="lesson-file-tree__icon lesson-file-tree__icon--folder" aria-hidden="true"></span><code>services/payments/</code></summary>
              <ul>
                <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon lesson-file-tree__icon--file" aria-hidden="true"></span><code>AGENTS.md</code><span class="lesson-file-tree__badge is-local">付款服務局部規則</span></div></li>
              </ul>
            </details>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</div>

分層時遵守三個原則：

- **根目錄只放真正通用的規則**：例如共同的 lint 命令與交付格式。
- **局部規則靠近局部程式碼**：payments 的 sandbox provider 規則不應干擾 search 服務。
- **不要複製上層內容**：子目錄只寫差異與補充，避免未來需要同步修改兩份檔案。

::: details 進階補充：載入順序、override 與大小限制
Codex 先讀取 Codex home 的全域指示，再從 Repository root 沿著路徑讀到目前工作目錄。越靠近工作目錄的指示越晚加入，因此適合補充或覆蓋較通用的要求。

同一個目錄會優先尋找非空的 `AGENTS.override.md`，找不到才讀 `AGENTS.md`，再找 `project_doc_fallback_filenames` 設定的自訂名稱；每層最多選一份。暫時需要完全取代該層內容時才使用 override，平常的局部補充用 `AGENTS.md` 即可。

專案指示合併後預設上限為 **32 KiB**。接近 `project_doc_max_bytes` 時，應先刪除重複內容或將規則移至適用的子目錄，再考慮調高上限。完整機制請查閱 [OpenAI 官方文件](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。
:::

若想做一次簡單的行為檢查，可在新的 session 要 Codex 摘要目前規範：

```bash
codex --ask-for-approval never \
  "Summarize the active project instructions before making any changes."
```

這個命令可快速確認 Codex 對目前規範的理解。實際驗證時，則檢查後續修改是否遵守命令、操作邊界與完成條件。

## 動手練習｜審查並重寫一份 `AGENTS.md`

選一個你熟悉、可以安全練習的 Repository，完成以下流程：

1. 回想最近三次使用 Codex 時重複糾正的內容，先列成候選規則。
2. 將候選內容分到 Prompt、`AGENTS.md`、文件、工具自動化或 Config／Permissions。
3. 讀取 README、manifest 與 lint／test 設定，刪除 Codex 已能直接推得的資訊。
4. 使用本章四區塊骨架，留下真實命令、非直覺背景、變更邊界與完成定義。
5. 實際執行列出的命令；不存在、位置錯誤或無法完成的命令不能留在規範裡。
6. 分別用小型 bug、功能調整、文件修改三種任務檢查：每條規則是否都必要且適用？

::: tip 用 `/init` 產生初稿
`/init` 可以快速盤點 Repository，但輸出仍須審查。依序檢查內容是否重複、能否直接推得、是否可執行，以及能否長期適用，再決定保留或刪除。
:::

## 延伸閱讀

- [CodexGuide：AGENTS.md](https://codexguide.ai/advanced/02-agents-md.html) — 作用、常見區塊與團隊使用情境。
- [Maple Feather：Codex Prompt 與 AGENTS.md](https://maplefeather.com/article/codex-prompt-tips-agents-md-2026) — Goal、Context、Constraints、Done when 與長期規範的分工。
- [愛好 AI 工程 Blog：AGENTS.md 該寫什麼、不該寫什麼](https://blog.aihao.tw/2026/05/03/agents-md-research-and-practices/) — WHAT／WHY／HOW、內容取捨與研究限制整理。
- [OpenAI：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) — 分層載入、override、fallback 與大小限制的規格依據。

下一章會進一步用 Config、權限與沙盒落實技術邊界：[Config、權限與沙盒](/advanced/permissions)。
