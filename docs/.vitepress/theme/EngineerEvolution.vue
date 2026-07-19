<script setup lang="ts">
import { ref } from 'vue'

const activeStage = ref(0)

const stages = [
  { command: 'CTRL C / V', title: 'ChatGPT → IDE', note: '把答案搬回工作區' },
  { command: 'TAB', title: 'Cursor', note: '接受下一段補全' },
  { command: 'JUST ASK', title: 'Codex', note: '交辦一個完整任務' }
]
</script>

<template>
  <section class="engineer-evolution" aria-label="AI 工程協作的三階段演化">
    <div class="engineer-evolution__nav" role="tablist" aria-label="選擇工程協作階段">
      <button
        v-for="(stage, index) in stages"
        :id="`engineer-stage-tab-${index}`"
        :key="stage.command"
        type="button"
        role="tab"
        :aria-selected="activeStage === index"
        :aria-controls="`engineer-stage-panel-${index}`"
        :class="{ 'is-active': activeStage === index }"
        @click="activeStage = index"
      >
        <span>0{{ index + 1 }}</span>
        <strong>{{ stage.command }}</strong>
        <small>{{ stage.title }}</small>
      </button>
    </div>

    <div class="engineer-evolution__stage">
      <div
        v-show="activeStage === 0"
        id="engineer-stage-panel-0"
        class="engineer-evolution__panel engineer-evolution__panel--copy is-active"
        role="tabpanel"
        aria-labelledby="engineer-stage-tab-0"
      >
        <div class="evolution-window evolution-window--chat">
          <header><i></i><i></i><i></i><b>ChatGPT</b></header>
          <div class="chat-bubble chat-bubble--question">這個函式怎麼修？</div>
          <div class="chat-bubble chat-bubble--answer"><code>function fix() { … }</code></div>
        </div>
        <div class="copy-transfer" aria-hidden="true">
          <code>function fix()</code>
          <b>CTRL C&nbsp; → &nbsp;CTRL V</b>
        </div>
        <div class="evolution-window evolution-window--editor">
          <header><i></i><i></i><i></i><b>IDE</b></header>
          <pre><span>12</span> function checkout() {
<span>13</span>   <mark>function fix() { … }</mark>
<span>14</span> }</pre>
        </div>
      </div>

      <div
        v-show="activeStage === 1"
        id="engineer-stage-panel-1"
        class="engineer-evolution__panel engineer-evolution__panel--tab is-active"
        role="tabpanel"
        aria-labelledby="engineer-stage-tab-1"
      >
        <div class="completion-editor">
          <header><i></i><i></i><i></i><b>IDE</b><span>Inline completion</span></header>
          <pre><span>08</span> function total(items) {
<span>09</span>   const subtotal = items.reduce(
<span>10</span>   <em>return subtotal + calculateTax(subtotal)</em>
<span>11</span> <em>}</em></pre>
        </div>
        <div class="tab-action">
          <span>Suggestion ready</span>
          <kbd>Tab</kbd>
          <b>接受補全</b>
        </div>
      </div>

      <div
        v-show="activeStage === 2"
        id="engineer-stage-panel-2"
        class="engineer-evolution__panel engineer-evolution__panel--agent is-active"
        role="tabpanel"
        aria-labelledby="engineer-stage-tab-2"
      >
        <div class="agent-composer">
          <span>JUST ASK CODEX</span>
          <p>找出 checkout 錯誤、完成最小修正、跑測試，再整理變更。</p>
          <b class="agent-composer__submit">送出任務&nbsp; ↑</b>
        </div>
        <div class="agent-run" aria-label="Codex 執行任務的流程">
          <div style="--step: 0"><i>1</i><span>Explore</span><b>讀取專案與規範</b></div>
          <div style="--step: 1"><i>2</i><span>Edit</span><b>完成最小修改</b></div>
          <div style="--step: 2"><i>3</i><span>Test</span><b>執行相關測試</b></div>
          <div style="--step: 3"><i>4</i><span>Review</span><b>帶回 Diff 與證據</b></div>
        </div>
      </div>
    </div>

    <p class="engineer-evolution__note">
      <b>{{ stages[activeStage].title }}</b>
      <span>{{ stages[activeStage].note }}</span>
    </p>
  </section>
</template>

<style scoped>
.engineer-evolution {
  margin: 28px 0 40px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: #f8fafc;
  box-shadow: 0 16px 42px rgb(24 39 58 / 8%);
}

.engineer-evolution__nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(190px, 1fr));
  overflow-x: auto;
  border-bottom: 1px solid var(--vp-c-divider);
  scrollbar-width: thin;
}

.engineer-evolution__nav button {
  display: grid;
  min-height: 106px;
  padding: 17px 20px;
  border: 0;
  border-right: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  background: #fff;
  text-align: left;
  cursor: pointer;
  transition: color .2s ease, background .2s ease, box-shadow .2s ease;
}

.engineer-evolution__nav button:last-child { border-right: 0; }
.engineer-evolution__nav button:hover { background: #f5f8ff; }

.engineer-evolution__nav button.is-active {
  color: var(--vp-c-text-1);
  background: #eef4ff;
  box-shadow: inset 0 -3px 0 #5668df;
}

.engineer-evolution__nav span {
  color: #6b7aa5;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
}

.engineer-evolution__nav strong {
  margin-top: 3px;
  font-family: var(--vp-font-family-mono);
  font-size: 17px;
  letter-spacing: .025em;
}

.engineer-evolution__nav small {
  margin-top: 2px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.engineer-evolution__stage {
  min-height: 360px;
  padding: 34px;
  background:
    radial-gradient(circle at 82% 18%, rgb(112 127 239 / 12%), transparent 26%),
    linear-gradient(180deg, #fbfcff, #f4f7fb);
}

.engineer-evolution__panel {
  min-height: 292px;
  animation: panel-in .35s ease both;
}

.engineer-evolution__panel--copy {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 128px minmax(0, 1fr);
  align-items: center;
  gap: 18px;
}

.evolution-window,
.completion-editor,
.agent-composer,
.agent-run {
  overflow: hidden;
  border: 1px solid #d9e0e9;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 12px 28px rgb(28 45 67 / 8%);
}

.evolution-window header,
.completion-editor header {
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 38px;
  padding: 0 13px;
  border-bottom: 1px solid #e5e9ef;
  color: #54606f;
  font-size: 11px;
}

.evolution-window header i,
.completion-editor header i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ccd4df;
}

.evolution-window header b,
.completion-editor header b { margin-left: 6px; }

.chat-bubble {
  max-width: 82%;
  margin: 18px;
  padding: 10px 12px;
  border-radius: 9px;
  font-size: 12px;
  line-height: 1.55;
}

.chat-bubble--question {
  margin-left: auto;
  color: #31405c;
  background: #e9efff;
}

.chat-bubble--answer {
  color: #e4e8f3;
  background: #202633;
}

.copy-transfer {
  display: grid;
  justify-items: center;
  gap: 14px;
  color: #6270d8;
  text-align: center;
}

.copy-transfer code {
  display: block;
  padding: 8px 10px;
  border: 1px solid #cfd7ff;
  border-radius: 7px;
  color: #3e4c96;
  background: #fff;
  font-size: 10px;
  box-shadow: 0 7px 18px rgb(87 104 218 / 15%);
  animation: copy-code 2.1s ease-in-out infinite;
}

.copy-transfer b { font-family: var(--vp-font-family-mono); font-size: 10px; }

.evolution-window pre,
.completion-editor pre {
  min-height: 174px;
  margin: 0;
  padding: 22px 17px;
  overflow: hidden;
  color: #39485c;
  background: #fbfcfe;
  font-size: 11px;
  line-height: 2;
}

.evolution-window pre span,
.completion-editor pre span { margin-right: 12px; color: #a0a9b7; }
.evolution-window mark { color: #5366d7; background: #e8edff; }

.engineer-evolution__panel--tab {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  align-items: center;
  gap: 28px;
}

.completion-editor header span { margin-left: auto; color: #6a79df; }
.completion-editor pre em { color: #9ba6b5; font-style: normal; animation: suggestion-in 1.8s ease-in-out infinite; }

.tab-action {
  display: grid;
  justify-items: center;
  gap: 10px;
  color: #677386;
  font-size: 11px;
}

.tab-action kbd {
  display: grid;
  width: 86px;
  height: 64px;
  place-items: center;
  border: 1px solid #b9c5ed;
  border-bottom-width: 5px;
  border-radius: 12px;
  color: #34439a;
  background: #fff;
  font-family: var(--vp-font-family-mono);
  font-size: 19px;
  box-shadow: 0 12px 26px rgb(67 83 178 / 16%);
  animation: tab-press 1.8s ease-in-out infinite;
}

.tab-action b { color: #39485d; }

.engineer-evolution__panel--agent {
  display: grid;
  grid-template-columns: minmax(220px, .9fr) minmax(0, 1.25fr);
  align-items: center;
  gap: 24px;
}

.agent-composer { padding: 24px; }
.agent-composer span { color: #5d6bd0; font-family: var(--vp-font-family-mono); font-size: 10px; font-weight: 700; }
.agent-composer p { margin: 12px 0 20px; color: #28364b; font-size: 14px; line-height: 1.65; }
.agent-composer__submit { display: block; width: 100%; padding: 10px 14px; border-radius: 8px; color: #fff; background: #5366d7; font-size: 12px; text-align: center; }

.agent-run { display: grid; gap: 0; padding: 10px 18px; }
.agent-run div { display: grid; grid-template-columns: 28px 70px 1fr; align-items: center; gap: 10px; padding: 13px 0; border-bottom: 1px solid #e8ebf0; animation: agent-step 3.2s ease-in-out infinite; animation-delay: calc(var(--step) * .35s); }
.agent-run div:last-child { border-bottom: 0; }
.agent-run i { display: grid; width: 24px; height: 24px; place-items: center; border-radius: 50%; color: #fff; background: #8390aa; font-size: 10px; font-style: normal; }
.agent-run span { color: #33425a; font-family: var(--vp-font-family-mono); font-size: 11px; font-weight: 700; }
.agent-run b { color: #687588; font-size: 11px; font-weight: 500; }

.engineer-evolution__note {
  display: flex;
  gap: 9px;
  margin: 0;
  padding: 14px 20px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  background: #fff;
  font-size: 12px;
}

.engineer-evolution__note b { color: var(--vp-c-text-1); }

@keyframes panel-in { from { opacity: 0; transform: translateY(7px); } }
@keyframes copy-code { 0%, 100% { transform: translateX(-17px); } 50% { transform: translateX(17px); } }
@keyframes suggestion-in { 0%, 25% { opacity: .18; } 55%, 100% { opacity: 1; } }
@keyframes tab-press { 0%, 58%, 100% { transform: translateY(0); border-bottom-width: 5px; } 70% { transform: translateY(4px); border-bottom-width: 1px; } }
@keyframes agent-step { 0%, 20% { opacity: .45; } 42%, 82% { opacity: 1; } 100% { opacity: .45; } }

@media (max-width: 700px) {
  .engineer-evolution__nav { grid-template-columns: repeat(3, minmax(0, 1fr)); overflow: visible; }
  .engineer-evolution__nav button { min-height: 92px; padding: 13px 10px; }
  .engineer-evolution__nav strong { font-size: 12px; }
  .engineer-evolution__nav small { font-size: 10px; }
  .engineer-evolution__stage { min-height: 510px; padding: 22px; }
  .engineer-evolution__panel--copy { grid-template-columns: 1fr; gap: 12px; }
  .copy-transfer { grid-template-columns: 1fr auto; align-items: center; }
  .copy-transfer code { display: none; }
  .engineer-evolution__panel--tab,
  .engineer-evolution__panel--agent { grid-template-columns: 1fr; }
  .tab-action { grid-template-columns: 1fr auto auto; }
  .tab-action kbd { width: 64px; height: 44px; font-size: 15px; }
  .engineer-evolution__note { flex-direction: column; gap: 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .engineer-evolution *,
  .engineer-evolution *::before,
  .engineer-evolution *::after { animation: none !important; transition: none !important; }
}
</style>
