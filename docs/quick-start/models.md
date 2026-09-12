---
title: Models｜選擇模型
description: 先用同一個 Marketing Dashboard 任務理解 Model 與 reasoning effort，再選擇剛好夠用的設定。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Models｜選擇模型

<p class="lesson-lead">Model 會影響 Codex 思考與回應的方式，但不會取代清楚的任務描述。這次先沿用 App 的預設值，等看到 Marketing Dashboard 的結果後，再理解什麼情況值得調整。</p>

## 選擇模型與 Reasoning

<div class="model-choice-grid">
  <section><span>MODEL</span><h3>選擇能力與速度</h3><p>模型決定適合處理的工作類型。複雜工作偏向 Sol，日常工作選 Terra，清楚且大量的工作選 Luna。</p></section>
  <section><span>REASONING EFFORT</span><h3>決定這次要想多深</h3><p>提高 reasoning effort 後，模型會花更多時間規劃與分析，通常也會使用更多 tokens。先用預設，再依結果往上調。</p></section>
</div>

官方目前的預設 Power 使用 **5.6 Sol + Medium reasoning**。需要更深分析時往 Smarter 調整；希望更快或降低使用量時往 Faster 調整。第一次上手不用先改額外設定。

::: tip Marketing Dashboard Demo 先沿用預設值
這次會讀取 Excel、整理指標、規劃 Dashboard，再檢查篩選器與數字。先用畫面上的預設 Model 與 reasoning 就好；若分析方向正確但深度不足，再提高 reasoning。課堂上不用逐一比較所有模型。
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

<p class="source-note">模型圖片、能力與速度排序依 OpenAI 官方 Models 頁面。支援平台與可用選項可能隨帳號、Workspace 與產品更新。</p>

## 哪一個模型適合這次工作

| 工作情境 | 建議模型 | Reasoning 起點 | 選擇原因 |
| --- | --- | --- | --- |
| 複雜、開放式或高價值工作 | **Sol** | Medium | 需要更多分析、判斷與完成度 |
| 一般文件、跨檔案閱讀、日常程式修改 | **Terra** | Medium | 在能力、速度與使用量之間取得平衡 |
| 明確、可重複、大量且容易驗證 | **Luna** | Light／Medium | 速度快，適合擷取、分類與轉換 |
| 困難且需要單一模型深入思考 | 合適模型 | Max | 深度比速度與使用量重要 |

## Reasoning effort 比較

| 設定 | 適合的工作 | 注意事項 |
| --- | --- | --- |
| Light／較低 | 範圍小、做法清楚、結果容易檢查 | 回應較快，投入較少推理 |
| Medium | 需要一些規劃、跨檔案閱讀或日常工具操作 | 官方預設的速度與深度平衡點 |
| High／Extra High | 多步驟、多來源、重要取捨或複雜分析 | 通常需要更久、使用更多 tokens |
| Max | 單一模型處理最困難的問題 | 只在深度比速度或使用量重要時使用 |

先從足以完成工作的 reasoning effort 開始。方向正確但分析太淺時，再提高設定；工作類型明顯不合適時，才換模型。這次的判斷標準是：Dashboard 是否讀對資料、指標是否清楚、成果是否容易驗收。

## 參考資料

- [Models｜ChatGPT Learn](https://learn.chatgpt.com/docs/models?surface=app)
- [Prompting](https://learn.chatgpt.com/docs/prompting)

<p class="source-note">本頁依 2026-07-19 OpenAI Models 頁面整理。模型名稱、能力、支援平台與 reasoning 選項會隨官方更新、帳號方案與 Workspace 設定變動。</p>
