---
title: 選擇模型
description: 理解 Model 與 reasoning effort 的差別，以及它們換算成 Credits 之後的實際差距。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 選擇模型

<p class="lesson-lead">Model 會影響 Codex 的處理方式、速度與 Credits 用量。這一頁比較不同模型、reasoning effort 與 Credits 費率。</p>

## 模型與推理強度

<div class="model-choice-grid">
  <section><span>MODEL</span><h3>選擇能力與速度</h3><p>Sol 適合需要較多判斷的工作，Terra 適合一般跨檔案與工具操作，Luna 適合目標清楚、容易驗證的批次任務。</p></section>
  <section><span>REASONING EFFORT</span><h3>調整分析深度</h3><p>提高 reasoning effort 通常會增加分析時間與 Token 用量。可先沿用預設值，再依結果調整。</p></section>
</div>

官方目前的 Power 預設為 **5.6 Sol + Medium reasoning**。Smarter 會提高分析深度，Faster 則偏向速度與較低用量。第一次操作可先沿用預設值。

Reasoning effort 目前有 Light、Medium、High、Extra High、Max、Ultra 六級。提高 reasoning 不會改變每個 Token 的費率，但通常會增加計入 output 的 reasoning token，因此 Credits 用量通常也會增加。

::: tip Marketing Dashboard Demo 先沿用預設值
Marketing Demo 會讀取 Excel、整理指標、製作 Dashboard，再規劃分析報告並檢查結果。操作時先沿用預設 Model 與 reasoning；如果分析不夠深入，再提高 reasoning。
:::

## 官方推薦模型

<div class="recommended-models" aria-label="OpenAI 官方推薦模型比較">
  <article class="recommended-model">
    <div class="recommended-model__visual">
      <img src="/images/quick-start/gpt-5.6-sol.webp" width="696" height="360" alt="太陽與星空，代表 5.6 Sol" loading="eager" fetchpriority="high" decoding="async">
      <strong>5.6 Sol</strong>
    </div>
    <div class="recommended-model__body">
      <p>旗艦 GPT-5.6 模型。適合複雜程式修改、computer use、深入研究，以及需要整合多項證據再做判斷的工作。</p>
      <code>gpt-5.6-sol</code>
      <dl class="recommended-model__facts">
        <div><dt>Capability</dt><dd aria-label="能力五顆星">✦ ✦ ✦ ✦ ✦</dd></div>
        <div><dt>Speed</dt><dd aria-label="速度二格">ϟ ϟ</dd></div>
        <div><dt>Codex App</dt><dd class="is-available">✓</dd></div>
      </dl>
    </div>
  </article>

  <article class="recommended-model">
    <div class="recommended-model__visual">
      <img src="/images/quick-start/gpt-5.6-terra.webp" width="696" height="360" alt="地球與星空，代表 5.6 Terra" loading="lazy" decoding="async">
      <strong>5.6 Terra</strong>
    </div>
    <div class="recommended-model__body">
      <p>日常工作的均衡選擇。適合跨檔案閱讀、工具操作與一般程式修改；如果任務不需要 Sol 的分析深度，可以先從 Terra 開始。</p>
      <code>gpt-5.6-terra</code>
      <dl class="recommended-model__facts">
        <div><dt>Capability</dt><dd aria-label="能力四顆星">✦ ✦ ✦ ✦</dd></div>
        <div><dt>Speed</dt><dd aria-label="速度三格">ϟ ϟ ϟ</dd></div>
        <div><dt>Codex App</dt><dd class="is-available">✓</dd></div>
      </dl>
    </div>
  </article>

  <article class="recommended-model">
    <div class="recommended-model__visual">
      <img src="/images/quick-start/gpt-5.6-luna.webp" width="696" height="360" alt="月球與星空，代表 5.6 Luna" loading="lazy" decoding="async">
      <strong>5.6 Luna</strong>
    </div>
    <div class="recommended-model__body">
      <p>快速且較低成本的 GPT-5.6 模型。適合目標清楚、數量多、容易驗證的擷取、分類、轉換與結構化摘要。</p>
      <code>gpt-5.6-luna</code>
      <dl class="recommended-model__facts">
        <div><dt>Capability</dt><dd aria-label="能力三顆星">✦ ✦ ✦</dd></div>
        <div><dt>Speed</dt><dd aria-label="速度四格">ϟ ϟ ϟ ϟ</dd></div>
        <div><dt>Codex App</dt><dd class="is-available">✓</dd></div>
      </dl>
    </div>
  </article>
</div>

<p class="source-note">模型圖片、能力與速度排序依 OpenAI 官方 Models 頁面。完整清單另有 gpt-6-astra，以及 ChatGPT Pro 可用的 gpt-5.3-codex-spark。支援平台與選項可能隨帳號、Workspace 與產品更新。</p>

## 模型費率比較

依下表的輸入費率，Sol 為 100 Credits／百萬 Token，Luna 為 5 Credits／百萬 Token，相差 **20 倍**。

| 模型 | 輸入 | 命中快取的輸入 | 輸出 |
| --- | --- | --- | --- |
| `gpt-5.6-sol` | 100 | 10 | 500 |
| `gpt-5.6-terra` | 50 | 5 | 300 |
| `gpt-5.6-luna` | 5 | 0.5 | 30 |

<p class="model-credit-note">單位：Credits／百萬 Token。<b>命中快取的輸入費率是一般輸入的 1／10</b>，輸出費率依 Model 而異。</p>

選擇模型時，可以比較三項差異：

<ul class="task-checklist">
  <li><b>模型會改變單價</b><span>Sol 的輸入單價是 Luna 的 20 倍，輸出單價約為 16.7 倍。提高 reasoning 可能增加 output token，但不會改變每個 Token 的費率。</span></li>
  <li><b>輸出單價較高</b><span>Reasoning token 也計入 output。精簡回覆可以減少輸出用量。</span></li>
  <li><b>命中快取較便宜</b><span>命中快取的輸入費率是一般輸入的 1／10；新增內容與輸出仍會計入用量。</span></li>
</ul>

## 怎麼選模型

<div class="model-pick" aria-label="模型選擇的實務建議">
  <section class="model-pick__card model-pick__card--daily">
    <span class="model-pick__tag">目標清楚的日常任務</span>
    <h3><code>gpt-5.6-luna</code> ＋ Max</h3>
    <p>Luna 的單價較低，可在需要時提高 reasoning。適合擷取、分類、轉換、批次修正，以及依既有規則產出等容易驗證的工作。</p>
  </section>
  <section class="model-pick__card model-pick__card--hard">
    <span class="model-pick__tag">需要較多判斷的任務</span>
    <h3><code>gpt-5.6-sol</code> ＋ High／Extra High</h3>
    <p>需要整合多個來源、做架構取捨或處理開放式問題時，可使用 Sol。提高 reasoning 通常會增加處理時間與 output token。</p>
  </section>
</div>

<p class="model-pick__note">Terra 的能力與費率介於 Luna 和 Sol 之間，適合大量跨檔案閱讀、工具操作，以及需要一定判斷的工作。</p>

## 調整推理強度

| 設定 | 適合的工作 | 對 Credits 的影響 |
| --- | --- | --- |
| Light | 範圍小、做法清楚、結果容易檢查 | 思考用的 output 最少 |
| Medium | 需要一些規劃、跨檔案閱讀或日常工具操作 | 官方預設的平衡點 |
| High／Extra High | 多步驟、多來源、重要取捨或複雜分析 | output 明顯增加，Sol 上特別有感 |
| Max／Ultra | 需要最深入分析的問題 | 處理時間較長，用量也較高 |

## 參考資料

- [Models｜ChatGPT Learn](https://learn.chatgpt.com/docs/models?surface=app)
- [ChatGPT rate card｜OpenAI Help Center](https://help.openai.com/en/articles/11481834)
- [Prompt caching｜OpenAI](https://developers.openai.com/api/docs/guides/prompt-caching)
- [Credits｜用量與成本](/quick-start/token-efficiency)

<p class="source-note">模型能力與 reasoning 選項依 OpenAI Models 頁面（2026-09 查閱）。GPT-5.6 Sol 使用促銷費率，Credits 請以 Codex rate card 的即時數字為準。模型與選項可能隨帳號方案及 Workspace 設定變動。</p>
