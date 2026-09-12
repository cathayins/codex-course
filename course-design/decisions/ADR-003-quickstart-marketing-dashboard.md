# ADR-003：QuickStart 以 Marketing Excel 到 Dashboard 為共同主線

- Status: Accepted
- Date: 2026-09-11

## Context

QuickStart 的主要學員只熟悉在 ChatGPT 對話框提問，尚未建立「工作環境、檔案與可驗收成果」的概念。原本的多入口與多案例安排會讓第一次使用者在還沒理解 Codex 前，就遇到 IDE、CLI、外部能力或不同資料情境。

## Decision

公開 QuickStart 採一條從理解到實作的主線：

```text
What Is Codex
  → Codex App
  → Demo 案例建立
  → First Project
  → Models
  → Prompting
  → Slash Commands
  → Follow Up
  → Credits
```

每個步驟都沿用 `Marketing_Campaign_Data.xlsx`，逐步完成：

1. 在 `codex-demo` 建立工作範圍。
2. 先盤點 Excel 的工作表、期間與欄位。
3. 使用 Model、Prompt 與 `/plan` 規劃 Dashboard。
4. 建立 `marketing_dashboard.html`，再用 Steer／Queue 推進修正與驗收。
5. 打開成果，檢查 KPI、圖表、篩選器、手機版與資料限制。

Demo 案例建立負責實際準備 QuickStart 會一路使用的 Marketing Excel、`codex-demo` 資料夾與欄位定義。What Is Codex 保留原本的 OpenAI Gallery，作為「Codex 不只適合寫程式」的視覺補充。

## Scope

- `goals.md` 保留在工作區，但不出現在公開導覽或 QuickStart 主線連結中。
- IDE、CLI、安裝與進階能力素材保留檔案，現階段不加入新手頁面入口。
- QuickStart 不使用外部 Plugin、MCP 或其他連線作為必要前置；外部能力留給後續課程。
- 現場除 Goals 外，QuickStart 公開頁面皆可直接拿來授課；講師可在時間不足時使用完成版 Dashboard 備援。

## Consequences

- 初學者只需理解一個案例，就能在每頁看到前一步成果如何接到下一步。
- 教學重點從「比較產品入口」移到「把工作交給 Codex，再驗收成果」。
- 講師必須準備 Excel 原始檔與 `marketing_dashboard.html` 完成版，並在課前確認檔案與資料版本。
- archive 與進階檔案不刪除，只透過導覽與頁面連結控制目前公開範圍。
