---
title: Using Goals in Codex
description: 把長時間任務寫成有完成條件、可驗證、可暫停的持續目標。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Using Goals in Codex

一般 Prompt 是請 Codex 做下一件事；Goal 則是把「做到什麼才算完成」留在目前的任務裡。只要 Goal 還在進行，Codex 就會根據每一輪得到的結果，判斷下一步該做什麼，直到有證據能確認完成，或遇到必須停下來的阻礙。

<figure class="goal-figure">
  <img src="/images/quick-start/goals-loop.webp" width="1800" height="1013" loading="eager" fetchpriority="high" decoding="async" alt="一般 Prompt 與 Active Goal 的工作方式比較：Prompt 完成一次回覆後等待，Goal 會反覆工作、檢查並決定下一步或完成">
  <figcaption>一般 Prompt 處理完這次要求就會等待；Active Goal 會在每輪結果之後，繼續檢查完成條件。</figcaption>
</figure>

## 什麼時候適合用 Goal

<div class="decision-grid">
  <section>
    <span>一般 Prompt</span>
    <h3>這一輪做完就好</h3>
    <p>修改一段文字、解釋一個問題、檢查一份檔案，或完成一次性的調整。</p>
  </section>
  <section>
    <span>Goal</span>
    <h3>終點清楚，但過程需要反覆嘗試</h3>
    <p>例如效能調校、追查不穩定測試、系統遷移、多步驟重構，或需要留下最終產物的研究任務。</p>
  </section>
</div>

判斷的重點不是任務看起來有多大，而是它有沒有一條能驗證的完成線。若只是「幫我改善一下」，Codex 不知道何時該停；若是「讓指定 benchmark 達標，而且測試維持通過」，Goal 才有辦法一輪一輪往終點靠近。

## 建立與管理 Goal

在 Composer 輸入 `/goal`，就能建立或查看目前任務的 Goal。

<div class="goal-command-grid">
  <section>
    <span>/goal &lt;目標&gt;</span>
    <h3>開始</h3>
    <p>寫下完成狀態、驗證方式與不能破壞的限制。</p>
  </section>
  <section>
    <span>/goal</span>
    <h3>查看</h3>
    <p>確認目前的 Goal、狀態，以及 Codex 正在追的完成線。</p>
  </section>
  <section>
    <span>/goal pause<br>/goal resume</span>
    <h3>暫停與繼續</h3>
    <p>需要人工確認或補資料時先暫停，準備好後再從原本的目標繼續。</p>
  </section>
  <section>
    <span>/goal clear</span>
    <h3>清除</h3>
    <p>確定不再追這個目標時清除，不把舊的完成條件留在任務裡。</p>
  </section>
</div>

::: info 先確認版本
Goals 從 Codex `0.128.0` 開始提供。如果看不到 `/goal`，先更新 Codex，再確認 Workspace 是否開放這項功能。
:::

## 把 Goal 寫成一條清楚的完成線

<figure class="goal-figure">
  <img src="/images/quick-start/goals-strong.webp" width="1800" height="1013" loading="lazy" decoding="async" alt="弱 Goal 與強 Goal 的比較，以及強 Goal 需要包含的完成結果、驗證方式、限制、範圍與不確定性處理方式">
  <figcaption>好的 Goal 不只寫方向，也交代如何證明完成，以及過程中不能破壞什麼。</figcaption>
</figure>

<div class="goal-anatomy-grid">
  <section>
    <span>01</span>
    <h3>完成結果</h3>
    <p>最後要看到什麼狀態，而不是只有「改善」或「處理」。</p>
  </section>
  <section>
    <span>02</span>
    <h3>驗證方式</h3>
    <p>用測試、benchmark、報告、畫面或成品確認結果。</p>
  </section>
  <section>
    <span>03</span>
    <h3>不能破壞的事</h3>
    <p>例如既有行為、相容性、資料正確性與使用者流程。</p>
  </section>
  <section>
    <span>04</span>
    <h3>可以動的範圍</h3>
    <p>說清楚允許使用的資料、工具、目錄與修改邊界。</p>
  </section>
  <section>
    <span>05</span>
    <h3>每輪怎麼選下一步</h3>
    <p>依最新證據，優先處理最接近完成線的問題。</p>
  </section>
  <section>
    <span>06</span>
    <h3>什麼情況要停</h3>
    <p>若沒有安全的前進方式，回報嘗試、阻礙與需要的資訊。</p>
  </section>
</div>

### 一個可以直接改寫的中文範本

```text
/goal 達成「[完成狀態]」，並以「[測試／報告／成品]」確認。
過程中不得破壞「[限制]」，只使用「[允許範圍]」。
每一輪依最新證據，選擇最接近完成線的下一個動作。
如果無法安全繼續，請停止並說明已嘗試的方法、目前阻礙，
以及還需要什麼資訊。
```

### 課程網站的例子

```text
/goal 完成 QuickStart 教材改版，確認 VitePress build 通過，
桌面與手機都沒有水平溢位，並保留現有導覽與其他人的修改。
每一輪先檢查頁面與驗證結果，再處理最影響授課的問題。
若缺少必要素材，請停止並列出缺少的內容，以及能讓工作繼續的最少資訊。
```

## Codex 什麼時候會自動繼續

<figure class="goal-figure">
  <img src="/images/quick-start/goals-continuation.webp" width="1800" height="1013" loading="lazy" decoding="async" alt="Goal 的持續執行條件與生命週期：Active、Paused、Completed、Cleared，以及預算與使用者輸入等執行閘門">
  <figcaption>Goal 只有在任務閒置、沒有新的使用者訊息，而且仍在允許的預算內，才會繼續下一輪。</figcaption>
</figure>

Codex 會在每一輪檢查目前的證據。如果完成條件已經成立，就把 Goal 標記為完成；如果還沒完成，而且仍有合理的下一步，才繼續工作。以下幾種情況會讓它停下來：

- 你暫停或清除了 Goal。
- 你送出新的訊息，需要先處理新的方向。
- 任務仍在執行其他工作，還沒有空出下一輪。
- 已達到這次允許的預算，或遇到需要人工處理的阻礙。

到達預算上限只代表這一輪先停，並不等於 Goal 已完成。完成應該由測試結果、benchmark、檔案或其他事先約定的證據判斷。

## Goal、Plan 與 Scheduled task 的差別

| 能力 | 適合處理什麼 | 何時結束 |
| --- | --- | --- |
| Prompt | 交代眼前這一輪要做的事 | 這次回覆或修改完成 |
| Plan | 先讀現場、拆解步驟，和你對齊做法 | 計畫確認後等待下一步 |
| Goal | 在同一個任務裡持續追一個可驗證的結果 | 證據成立、你暫停／清除，或遇到阻礙 |
| Scheduled task | 在指定時間或固定頻率重新執行工作 | 依排程與停止規則決定 |

Goal 不是全域記憶，也不會取代 `AGENTS.md`。專案長期規範仍放在 Repository；Goal 只服務目前這個任務要追到的結果。

## 上手時照這個順序

1. 先寫最後要達成的狀態，以及拿什麼證明。
2. 補上不能破壞的限制與允許修改的範圍。
3. 用 `/goal` 建立，觀察第一輪採取的做法是否合理。
4. 需要補資料或人工決策時先 `pause`，準備好再 `resume`。
5. 看到驗證證據後才算完成；若決定放棄這條路，再使用 `clear`。

## 常見問題

### 把方向當成 Goal

`/goal 改善效能` 沒有完成線。改成「指定 benchmark 的 p95 低於 120 ms，而且 correctness suite 全部通過」，Codex 才知道何時該繼續、何時該停。

### 簡單任務也開 Goal

改一行文字、請 Codex 解釋一段程式或做一次 review，用一般 Prompt 比較直接。Goal 適合路徑不確定、需要多輪驗證的任務。

### 只看它跑了多久

花很多時間或用完預算，都不是完成證據。開始前先約定測試、數字或成品，最後才有一致的判斷標準。

## 完成檢查

- [ ] Goal 寫的是可觀察的結果，不只是方向。
- [ ] 有清楚的測試、數字、報告或成品可以驗證。
- [ ] 已交代不能破壞的限制與允許修改的範圍。
- [ ] 知道何時使用 `pause`、`resume` 與 `clear`。
- [ ] 沒有把 Goal 當成專案規範或全域記憶。

## 延伸閱讀

- [Using Goals in Codex｜OpenAI Cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)

本頁依 2026-07-18 的 OpenAI 官方 Cookbook 整理。指令與可用範圍可能隨 Codex 版本及 Workspace 政策調整。
