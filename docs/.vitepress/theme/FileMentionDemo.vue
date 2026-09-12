<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const files = [
  'Marketing_Campaign_Data.xlsx',
  'Marketing_Campaign_Click_Trend.xlsx'
]

/** 0 idle · 1 typed @ and the list opened · 2 picked the file */
const phase = ref(0)
let timers: number[] = []

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer))
  timers = []
}

function play() {
  if (typeof window === 'undefined') return

  clearTimers()
  phase.value = 0

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    phase.value = 2
    return
  }

  timers.push(window.setTimeout(() => { phase.value = 1 }, 1100))
  timers.push(window.setTimeout(() => { phase.value = 2 }, 2600))
  timers.push(window.setTimeout(play, 5200))
}

onMounted(play)
onBeforeUnmount(clearTimers)
</script>

<template>
  <section class="mention-demo" aria-label="在輸入框輸入 @ 並選取檔案的動畫示意">
    <div class="mention-input" aria-hidden="true">
      <p class="mention-line">
        <span>請基於</span>
        <span v-if="phase >= 2" class="mention-chip">▤ {{ files[0] }}</span>
        <span v-else class="mention-at">@<i class="mention-caret"></i></span>
        <span v-if="phase >= 2">建立各平台點擊次數的趨勢圖。</span>
      </p>

      <div class="mention-menu" :class="{ 'is-open': phase >= 1 }">
        <span>工作區檔案</span>
        <b :class="{ 'is-active': phase === 1, 'is-picked': phase >= 2 }">
          ▤ {{ files[0] }}
          <i v-if="phase >= 2" aria-hidden="true">✓</i>
        </b>
        <em>▤ {{ files[1] }}</em>
      </div>
    </div>

    <p class="mention-hint">輸入 <code>@</code> 會列出工作區的檔案，選取後就成為這次任務的來源引用。</p>
  </section>
</template>

<style scoped>
.mention-demo {
  margin: 20px 0;
}

.mention-input {
  padding: 18px 20px;
  border: 1px solid #dce1e7;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 8px 20px rgb(38 56 73 / 6%);
}

.mention-line {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 7px;
  min-height: 64px;
  margin: 0;
  color: #3c4854;
  font-size: 15px;
  line-height: 1.8;
}

.mention-at {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #276da8;
  font-weight: 700;
}

.mention-caret {
  display: inline-block;
  width: 1.5px;
  height: 17px;
  background: #276da8;
  animation: mention-blink 1.1s steps(2, start) infinite;
}

@keyframes mention-blink {
  to { opacity: 0 }
}

.mention-chip {
  padding: 3px 8px;
  border-radius: 6px;
  color: #1d6198;
  background: #e8f2fb;
  font-size: 14px;
  overflow-wrap: anywhere;
}

.mention-menu {
  display: grid;
  gap: 4px;
  margin-top: 14px;
  padding: 11px 12px;
  border: 1px solid #e2e7ec;
  border-radius: 10px;
  opacity: .5;
  background: #f7f9fb;
  transition: opacity .3s ease, border-color .3s ease, background-color .3s ease;
}

.mention-menu.is-open {
  border-color: #d6e0e9;
  opacity: 1;
  background: #f8fbfe;
}

.mention-menu span {
  color: #6a7682;
  font-size: 11.5px;
  font-weight: 700;
}

.mention-menu b,
.mention-menu em {
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 13.5px;
  font-style: normal;
  overflow-wrap: anywhere;
}

.mention-menu b {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a5661;
  font-weight: 600;
  transition: color .28s ease, background-color .28s ease;
}

.mention-menu b.is-active,
.mention-menu b.is-picked {
  color: #1d6198;
  background: #e2eefa;
}

.mention-menu b i {
  margin-left: auto;
  color: #1d7a52;
  font-style: normal;
}

.mention-menu em {
  color: #8b96a1;
}

.mention-hint {
  margin: 12px 0 0;
  color: #68727c;
  font-size: 13px;
  line-height: 1.75;
}

.mention-hint code {
  padding: 1px 5px;
  border-radius: 4px;
  background: #eef1f4;
  font-size: 12.5px;
}

@media (prefers-reduced-motion: reduce) {
  .mention-demo *,
  .mention-demo *::before,
  .mention-demo *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
</style>
