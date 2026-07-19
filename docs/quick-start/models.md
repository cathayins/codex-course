---
title: Models｜選擇模型
description: 比較 5.6 Sol、Terra 與 Luna 的能力、速度與適用工作，再選擇合適的 reasoning effort。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Models｜選擇模型

<p class="lesson-lead">Sol、Terra 與 Luna 分別偏向深度、均衡與速度。先從預設模型與 reasoning effort 開始，再依任務難度、等待時間與成果品質調整。</p>

## 選擇模型與 Reasoning

<div class="model-choice-grid">
  <section><span>MODEL</span><h3>選擇能力與速度</h3><p>模型決定適合處理的工作類型。複雜工作偏向 Sol，日常工作選 Terra，清楚且大量的工作選 Luna。</p></section>
  <section><span>REASONING EFFORT</span><h3>決定這次要想多深</h3><p>較高設定能投入更多規劃與分析，但通常需要更久、使用更多 tokens。先用預設，再依結果往上調。</p></section>
</div>

官方目前的預設 Power 使用 **5.6 Sol + Medium reasoning**。需要更深分析時往 Smarter 調整；希望更快或降低使用量時往 Faster 調整。Advanced 可以指定模型與 reasoning effort。

## 官方推薦模型

<div class="recommended-models" aria-label="OpenAI 官方推薦模型比較">
  <article class="recommended-model">
    <div class="recommended-model__visual">
      <img src="/images/quick-start/gpt-5.6-sol.webp" width="696" height="360" alt="太陽與星空，代表 5.6 Sol" loading="eager" fetchpriority="high" decoding="async">
      <strong>5.6 Sol</strong>
    </div>
    <div class="recommended-model__body">
      <p>旗艦 GPT-5.6 模型。適合複雜程式修改、computer use、深入研究，以及需要更多判斷與完成度的工作。</p>
      <code>gpt-5.6-sol</code>
      <dl class="recommended-model__facts">
        <div><dt>Capability</dt><dd aria-label="能力五顆星">✦ ✦ ✦ ✦ ✦</dd></div>
        <div><dt>Speed</dt><dd aria-label="速度二格">ϟ ϟ</dd></div>
        <div><dt>Desktop / Web</dt><dd class="is-available">✓</dd></div>
        <div><dt>CLI / IDE</dt><dd class="is-available">✓</dd></div>
        <div><dt>Codex cloud</dt><dd class="is-unavailable">×</dd></div>
      </dl>
    </div>
  </article>

  <article class="recommended-model">
    <div class="recommended-model__visual">
      <img src="/images/quick-start/gpt-5.6-terra.webp" width="696" height="360" alt="地球與星空，代表 5.6 Terra" loading="lazy" decoding="async">
      <strong>5.6 Terra</strong>
    </div>
    <div class="recommended-model__body">
      <p>日常工作的均衡選擇。適合跨檔案閱讀、工具操作與一般程式修改，不需要 Sol 完整深度時可從這裡開始。</p>
      <code>gpt-5.6-terra</code>
      <dl class="recommended-model__facts">
        <div><dt>Capability</dt><dd aria-label="能力四顆星">✦ ✦ ✦ ✦</dd></div>
        <div><dt>Speed</dt><dd aria-label="速度三格">ϟ ϟ ϟ</dd></div>
        <div><dt>Desktop / Web</dt><dd class="is-available">✓</dd></div>
        <div><dt>CLI / IDE</dt><dd class="is-available">✓</dd></div>
        <div><dt>Codex cloud</dt><dd class="is-unavailable">×</dd></div>
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
        <div><dt>Desktop / Web</dt><dd class="is-available">✓</dd></div>
        <div><dt>CLI / IDE</dt><dd class="is-available">✓</dd></div>
        <div><dt>Codex cloud</dt><dd class="is-unavailable">×</dd></div>
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
| 能拆成數個獨立部分的大型工作 | 合適模型 | Ultra | 使用 subagents 平行處理不同部分 |

## Reasoning effort 比較

| 設定 | 適合的工作 | 注意事項 |
| --- | --- | --- |
| Light／CLI 的 Low | 範圍小、做法清楚、結果容易檢查 | 回應較快，投入較少推理 |
| Medium | 需要一些規劃、跨檔案閱讀或日常工具操作 | 官方預設的速度與深度平衡點 |
| High／Extra High | 多步驟、多來源、重要取捨或複雜分析 | 通常需要更久、使用更多 tokens |
| Max | 單一模型處理最困難的問題 | 只在深度比速度或使用量重要時使用 |
| Ultra | 能拆成數個有意義部分的大型工作 | 使用 subagents；大多數任務不需要 |

先使用能完成工作的最低 reasoning effort。結果方向正確但分析不夠，再往上調；模型不適合工作類型時，才換模型。

## 在 Codex 裡切換

在 App 輸入框下方使用模型與 reasoning 控制；CLI 或 IDE 也可以輸入：

```text
/model
```

CLI 也能在啟動時指定模型，例如 `codex -m gpt-5.6-sol`。選好後仍要確認 Prompt 的目標、來源、產出與限制；更強的模型不會自動補上缺少的背景。

## 一個簡單的決策順序

<div class="quickstart-flow quickstart-flow--next" aria-label="模型選擇順序">
  <section><span>01</span><h3>先用預設</h3><p>先讓工作跑一輪，確認真正的難點。</p></section>
  <section><span>02</span><h3>結果太淺，再調 reasoning</h3><p>方向正確但分析不足，才增加思考程度。</p></section>
  <section><span>03</span><h3>工作類型不同，再換模型</h3><p>在深度、日常均衡與高速度之間選擇。</p></section>
</div>

## 參考資料

- [Models｜ChatGPT Learn](https://learn.chatgpt.com/docs/models?surface=app)
- [Subagents](https://learn.chatgpt.com/docs/subagents)
- [Prompting](https://learn.chatgpt.com/docs/prompting)

<p class="source-note">本頁依 2026-07-19 OpenAI Models 頁面整理。模型名稱、能力、支援平台與 reasoning 選項會隨官方更新、帳號方案與 Workspace 設定變動。</p>
