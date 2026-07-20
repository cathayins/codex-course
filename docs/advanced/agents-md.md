---
title: AGENTS.md：Repository 的長期規範
description: 從判斷、改寫到品質檢查，建立精簡、具體、可驗證且能持續維護的 AGENTS.md。
outline: [2, 3]
---

# `AGENTS.md`：Repository 的長期規範

`AGENTS.md` 保存的是「Codex 在這個專案資料夾下應長期遵循的工作規範」。它補足那些只看程式碼不一定能知道，卻會影響每次修改的專案慣例、操作邊界與驗收標準。

如果把 AI 想成新加入團隊的貼身助理，`AGENTS.md` 就像一份精簡的交接手冊。助理能看懂既有報表或程式碼，卻不會自然知道「正式報價前必須轉成 PDF」或「這個服務不能直接連 Production」。這些無法靠觀察穩定推得、而且每次工作都要遵守的規矩，才值得寫進去。

<section class="lesson-goals" aria-labelledby="lesson-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="lesson-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>判斷哪些資訊值得成為長期規範，並把一份冗長的初稿改成真正能協助 Codex 工作的 <code>AGENTS.md</code>。</p>
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

你可能曾經反覆提醒 Codex：「這個專案用 `uv`，不要改用 `pip`」、「修改付款流程要先跑 sandbox 測試」、「交付時要列出沒跑的檢查」。如果同一個提醒在不同任務一再出現，就值得考慮升級成 Repository 的共同規範。

但「常常出現」還不夠。寫入前依序問三個問題：

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

一個清楚的任務通常包含 **Goal、Context、Constraints、Done when**。其中，Goal 幾乎總是這次 Prompt 的責任；只有會跨任務重複使用、又無法從 Repository 穩定推得的 Context、Constraints 與 Done when，才適合進入 `AGENTS.md`。

::: warning 文字規範不能取代技術邊界
「不要連 Production」可以寫成行為提醒，但真正的防線仍應由 Sandbox、Permissions、憑證隔離或 CI 落實。高風險限制不要只依賴文字。
:::

## 2｜好的 `AGENTS.md` 有五個特徵

不是寫得越多越完整。好規範的價值，在於 Codex 能快速找到「現在該怎麼做」，而不是先讀完另一份專案百科。

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
    <strong>不可直接推得</strong>
    <p>解釋程式碼看不出的商業限制、歷史原因與責任邊界。</p>
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

後者不只比較詳細，更重要的是它回答了三件事：**何時做、做什麼、做到什麼程度**。Codex 不需要猜「完整」的意思，團隊也能檢查規則是否真的被完成。

## 3｜一份好規範的四個核心區塊

多數 Repository 不需要複雜格式。先從四個區塊開始，再依專案需要刪減或增加。

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
# Repository guide

## Quick commands

- Install: `uv sync`
- Fast test: `uv run pytest tests/unit -q`
- Full test: `uv run pytest -q`
- Lint: `uv run ruff check .`
- Type check: `uv run mypy app`

## Purpose and non-obvious context

- This service processes subscription billing events.
- Read `docs/billing-contracts.md` before changing invoice behavior.
- `app/legacy_gateway/` exists for partner compatibility; do not refactor it incidentally.

## Change boundaries

- Always use the existing test doubles; tests must not call live payment providers.
- Ask before adding a production dependency or changing a public API or schema.
- Never print credentials or customer payloads. Use redacted fixtures for debugging.

## Definition of done

- Run the checks relevant to the changed area and report the exact commands and results.
- Update `docs/billing-contracts.md` when invoice behavior changes.
- List skipped checks, remaining risks, migration impact, and rollback considerations.
```

這不是固定模板，而是起始骨架。若專案沒有 type check，就刪掉該命令；若完整測試需要一小時，應補上「哪些變更一定要跑完整測試」，而不是假裝每次都能執行。

### 四個區塊各自解決的問題

| 區塊 | Codex 不再需要猜什麼 | 撰寫時的檢查問題 |
| --- | --- | --- |
| Quick commands | 要用哪個工具、從哪裡開始驗證 | 每個命令現在真的能執行嗎？ |
| Purpose & context | 特殊設計為什麼存在、該先讀哪裡 | 這些資訊能從程式碼直接看出嗎？ |
| Change boundaries | 哪些變更可直接做、哪些要先問 | 禁止事項是否提供了安全替代方案？ |
| Definition of done | 何時可以交付、要回報哪些風險 | 完成條件能被人或工具檢查嗎？ |

## 4｜從看似完整，改成真正有用

下面是一份常見的 `/init` 初稿：資訊很多，但混合了 README 摘要、可自動執行的格式規則、空泛口號與單次需求。接著把它改成 Codex 真正需要的版本。

::: code-group

```markdown [Before｜冗長但不實用]
# Project instructions

This is a Python web application. Source code is in `src/`, tests are in
`tests/`, and documentation is in `docs/`. The project uses FastAPI,
PostgreSQL, Redis, Ruff, and pytest.

- Follow software engineering best practices and write clean code.
- Use four spaces for indentation and keep imports sorted.
- Make sure all tests pass after every change.
- Be careful when editing files and do not break existing behavior.
- For the current BILL-248 ticket, do not add a new dependency.
- See the README for installation, architecture, and all API endpoints.
```

```markdown [After｜精簡且可執行]
# Repository guide

## Quick commands

- Fast check: `uv run pytest tests/unit -q`
- Full check for API or database changes: `uv run pytest -q`
- Lint: `uv run ruff check .`

## Non-obvious context

- `src/legacy_sync/` must remain compatible with partner payload version 2.
- Read `docs/data-contracts.md` before changing database or API fields.

## Change boundaries

- Ask before changing a public API, schema, or production dependency.
- Use existing Redis and PostgreSQL test fixtures; tests must not call shared services.

## Definition of done

- Report the validation commands and results.
- For schema changes, include migration and rollback impact.
- List checks that were skipped and why.
```

:::

### 這次改寫做了什麼

<div class="lesson-rule-grid">
  <section class="lesson-rule-card is-skip" aria-labelledby="rewrite-removed-title">
    <span class="lesson-rule-card__mark">刪除／搬移</span>
    <strong id="rewrite-removed-title" class="lesson-rule-card__title">Codex 已能取得或工具能處理</strong>
    <ul>
      <li>技術棧與基本目錄可從 manifest、設定檔和 Repository 看出。</li>
      <li>縮排與 import 排序交給 Ruff，不再用自然語言重複。</li>
      <li>單張 ticket 的 dependency 限制移回這次 Prompt。</li>
      <li>「注意品質」「不要破壞」沒有可檢查的行動，因此刪除。</li>
    </ul>
  </section>
  <section class="lesson-rule-card is-do" aria-labelledby="rewrite-added-title">
    <span class="lesson-rule-card__mark">保留／補強</span>
    <strong id="rewrite-added-title" class="lesson-rule-card__title">真正影響決策的專案知識</strong>
    <ul>
      <li>用條件區分快速測試與完整測試，不再要求每次盲目全跑。</li>
      <li>補上 partner payload 相容性與資料契約的必讀入口。</li>
      <li>把高影響變更寫成「先詢問」，並指出禁止連線的替代 fixtures。</li>
      <li>用命令結果、migration 與剩餘風險定義完成。</li>
    </ul>
  </section>
</div>

## 5｜不該寫的內容，應該搬去哪裡

刪除不代表資訊不重要，而是讓每種資訊回到最適合被閱讀、維護或強制執行的位置。

| 不適合長留在 `AGENTS.md` 的內容 | 問題 | 更適合的位置 |
| --- | --- | --- |
| README 與安裝教學的逐段複製 | 形成兩份容易不同步的真相 | README，必要時只放連結與閱讀時機 |
| 完整資料夾樹與每個檔案說明 | 程式碼變動後很快過時 | 架構文件；只保留不直覺的入口 |
| Manifest 已列出的套件與版本 | Codex 可以直接讀取 | `package.json`、`pyproject.toml` 等 manifest |
| 縮排、引號、import 順序 | 自然語言無法保證執行 | Formatter、Linter、pre-commit、CI |
| 「遵守最佳實務」「保持高品質」 | 沒有具體動作或完成條件 | 改寫為可執行命令或直接刪除 |
| 完整 API reference 與架構設計 | 內容太長且受眾不只 Codex | `docs/`，在規範中指出何時必讀 |
| 這張 ticket 的特殊需求 | 下個任務可能立刻失效 | 本次 Prompt 或 issue |
| 只靠文字描述的機密與網路防線 | 無法形成可靠的安全控制 | Config、Permissions、憑證隔離與 CI |

### 研究提醒：自動生成只是初稿

針對 coding agent context files 的研究顯示，未經整理的自動生成內容可能增加推論成本，卻不一定提升任務成功率；在該研究的資料集上，自動生成版本的平均成功率反而下降約 3%，推論成本增加超過 20%。

這項結果來自特定 benchmark、Repository 與 coding tasks，不能推論所有私有專案都會得到相同結果，也沒有衡量完整的團隊知識傳承價值。合理的實務結論不是「不要寫」，而是：**把 `/init` 當成盤點素材，由人刪除可推得、重複與無法執行的內容，只保留最小且必要的規則。**

延伸查核：[原始論文](https://arxiv.org/abs/2602.11988)與[中文研究整理](https://blog.aihao.tw/2026/05/03/agents-md-research-and-practices/)。

## 6｜分層是為了控制內容範圍

當某條規則只適用於一個模組，不要讓整個 Repository 都背負它。把通用內容放在根目錄，局部內容放在更接近工作目錄的位置。

<div class="lesson-file-tree" role="group" aria-label="AGENTS.md 三層作用域範例">
  <div class="lesson-file-tree__title">
    <span>RULE SCOPE</span>
    <small>越接近工作目錄，內容越具體</small>
  </div>
  <ul>
    <li>
      <div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">⌂</span><code>~/.codex/AGENTS.md</code><span class="lesson-file-tree__badge is-global">個人跨專案偏好</span></div>
    </li>
    <li>
      <div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">▾</span><code>commerce-platform/</code></div>
      <ul>
        <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◆</span><code>AGENTS.md</code><span class="lesson-file-tree__badge is-active">全專案共同規則</span></div></li>
        <li>
          <div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">▾</span><code>services/payments/</code></div>
          <ul>
            <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◆</span><code>AGENTS.md</code><span class="lesson-file-tree__badge is-local">付款服務局部規則</span></div></li>
          </ul>
        </li>
      </ul>
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

專案指示合併後預設上限為 **32 KiB**。若接近 `project_doc_max_bytes`，先刪除重複內容或把規則移到正確的子目錄，不要把調高上限當成第一選項。完整機制請查閱 [OpenAI 官方文件](https://learn.chatgpt.com/docs/agent-configuration/agents-md)。
:::

若想做一次簡單的行為檢查，可在新的 session 要 Codex 摘要目前規範：

```bash
codex --ask-for-approval never \
  "Summarize the active project instructions before making any changes."
```

這只是快速確認 Codex 對規範的理解，不需要把課程重心變成逐層追查載入來源。真正重要的是：接下來的修改是否遵守命令、邊界與完成條件。

## 動手練習｜審查並重寫一份 `AGENTS.md`

選一個你熟悉、可以安全練習的 Repository，完成以下流程：

1. 回想最近三次使用 Codex 時重複糾正的內容，先列成候選規則。
2. 將候選內容分到 Prompt、`AGENTS.md`、文件、工具自動化或 Config／Permissions。
3. 讀取 README、manifest 與 lint／test 設定，刪除 Codex 已能直接推得的資訊。
4. 使用本章四區塊骨架，留下真實命令、非直覺背景、變更邊界與完成定義。
5. 實際執行列出的命令；不存在、位置錯誤或無法完成的命令不能留在規範裡。
6. 分別用小型 bug、功能調整、文件修改三種任務檢查：每條規則是否都必要且適用？

::: tip 從 `/init` 開始也可以
`/init` 適合快速盤點 Repository，但它的輸出是待審查的初稿。逐條問「是否重複、是否可推得、是否可執行、是否長期適用」，再決定保留或刪除。
:::

## 品質評分表

每項給 **0～2 分**：0 分代表缺少或放錯位置；1 分代表有提到但仍模糊；2 分代表清楚、可執行且適用範圍正確。

| 評分項目 | 得到 2 分的條件 |
| --- | --- |
| 真實命令 | install、lint、test、build 命令已實際驗證，並指出執行條件 |
| 非直覺背景 | 只補充程式碼無法穩定推得、會影響決策的資訊 |
| 變更邊界 | Always／Ask／Never 清楚，禁止事項有安全替代方案 |
| 完成定義 | 驗證結果、文件、風險與 migration 等交付條件可被檢查 |
| 沒有重複 | 不複製 README、manifest、完整 API 或目錄導覽 |
| 放對控制層 | 格式交給 linter，高風險邊界交給 Permissions 等技術控制 |
| 可持續維護 | 沒有單次 ticket 內容，局部規則放在正確子目錄且不複製上層 |

- **12～14 分**：可以投入使用，再從實際任務持續微調。
- **8～11 分**：已有骨架，優先補強模糊命令、邊界與完成條件。
- **0～7 分**：先停止追加內容，依本章 Before／After 範例重新刪減與分類。

## 延伸閱讀

- [CodexGuide：AGENTS.md](https://codexguide.ai/advanced/02-agents-md.html) — 作用、常見區塊與團隊使用情境。
- [Maple Feather：Codex Prompt 與 AGENTS.md](https://maplefeather.com/article/codex-prompt-tips-agents-md-2026) — Goal、Context、Constraints、Done when 與長期規範的分工。
- [愛好 AI 工程 Blog：AGENTS.md 該寫什麼、不該寫什麼](https://blog.aihao.tw/2026/05/03/agents-md-research-and-practices/) — WHAT／WHY／HOW、內容取捨與研究限制整理。
- [OpenAI：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) — 分層載入、override、fallback 與大小限制的規格依據。

下一章將把文字規範轉成可執行邊界：[Config、權限與沙盒](/advanced/permissions)。
