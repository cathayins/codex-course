<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { CheckIcon, PlayIcon } from '@heroicons/vue/24/outline'

type Mode = 'steer' | 'queue'
type WorkState = 'done' | 'running' | 'pending'

const STEP_MS = 1900
const DRAIN_MS = 1250

const tracks = {
  steer: {
    name: 'Steer',
    role: '插隊進現在這一輪',
    title: '插進去，跟著這一輪一起做完',
    steps: ['報告執行中', '你送出補充', '插進工作清單', '一次做完'],
    gaps: [0, STEP_MS, STEP_MS, STEP_MS],
    note: '新的要求排進同一輪，報告只會產出一份。'
  },
  queue: {
    name: 'Queue',
    role: '排到這一輪後面',
    title: '排進佇列，等這一輪結束才開始',
    steps: ['報告執行中', '排入第一則', '再排兩則', '依序消化佇列'],
    gaps: [0, STEP_MS, STEP_MS, DRAIN_MS],
    note: '目前這輪不受影響；佇列照你送出的順序，一則一則接著做。'
  }
} as const

const baseWork = ['讀取 Marketing Excel', '計算各平台 ROAS', '撰寫平台比較段落']
const queueItems = ['核對各平台數字', '把摘要整理成 3 點', '匯出 PDF 給主管']

const selected = ref<Mode>('steer')
const activeStep = ref(-1)
/** -1 = queue untouched; 0..n-1 = that item is running; n = every item consumed. */
const drainIndex = ref(-1)
const hasPlayed = ref(false)
const runId = ref(0)
let timers: Array<ReturnType<typeof setTimeout>> = []

const track = computed(() => tracks[selected.value])
const isFinished = computed(() => activeStep.value >= track.value.steps.length - 1)

const status = computed(() => {
  if (!hasPlayed.value) return '點選播放'
  return track.value.steps[Math.max(activeStep.value, 0)]
})

/** Steer cuts a new item into the list; the item it displaced waits its turn. */
const steerCutIn = computed(() => selected.value === 'steer' && activeStep.value >= 2)

const workRows = computed(() => {
  const rows: Array<{ label: string; state: WorkState; cutIn?: boolean }> = [
    { label: baseWork[0], state: 'done' },
    { label: baseWork[1], state: 'done' }
  ]
  if (steerCutIn.value) {
    rows.push({
      label: '加入入學轉換率比較',
      state: isFinished.value ? 'done' : 'running',
      cutIn: true
    })
    rows.push({ label: baseWork[2], state: isFinished.value ? 'done' : 'pending' })
  } else {
    rows.push({ label: baseWork[2], state: isFinished.value ? 'done' : 'running' })
  }
  return rows
})

/**
 * Every queue row stays in the DOM and is collapsed with CSS instead of being
 * removed, so there is no transition bookkeeping that can leave a row stranded.
 */
const queueRows = computed(() => queueItems.map((label, index) => {
  const entered = activeStep.value >= (index === 0 ? 1 : 2)
  const consumed = index <= drainIndex.value
  return {
    label,
    entered,
    consumed,
    position: Math.max(index - drainIndex.value, 1)
  }
}))

const queueWaiting = computed(() => queueRows.value.filter((row) => row.entered && !row.consumed).length)

/** Rows pulled out of the queue: the newest one is running, the rest are done. */
const drainedRows = computed(() => queueItems.map((label, index) => ({
  label,
  shown: index <= drainIndex.value,
  done: index < drainIndex.value
})))

const queuePromoted = computed(() => selected.value === 'queue' && drainIndex.value >= 0)
const queueCleared = computed(() => drainIndex.value >= queueItems.length)

const bubbleVisible = computed(() => activeStep.value >= 1 && !queuePromoted.value)
const bubbleText = computed(() => selected.value === 'steer'
  ? '也要比較各平台的入學轉換率'
  : activeStep.value >= 2 ? '還有兩件事，做完再處理' : '報告完成後，核對各平台數字')

function clearTimers() {
  timers.forEach((timer) => clearTimeout(timer))
  timers = []
}

function isActive(index: number) {
  return activeStep.value === index
}

function startDrain() {
  for (let index = 0; index <= queueItems.length; index += 1) {
    timers.push(setTimeout(() => {
      drainIndex.value = index
    }, index * DRAIN_MS))
  }
}

function play(mode: Mode) {
  clearTimers()
  selected.value = mode
  activeStep.value = -1
  drainIndex.value = -1
  hasPlayed.value = true
  runId.value += 1

  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lastIndex = tracks[mode].steps.length - 1

  if (reduceMotion) {
    activeStep.value = lastIndex
    if (mode === 'queue') drainIndex.value = queueItems.length
    return
  }

  let at = 150
  tracks[mode].gaps.forEach((gap, index) => {
    at += gap
    timers.push(setTimeout(() => {
      activeStep.value = index
      if (mode === 'queue' && index === lastIndex) startDrain()
    }, at))
  })
}

onBeforeUnmount(clearTimers)
</script>

<template>
  <div class="choice-demo">
    <div class="choice-demo__selector" role="group" aria-label="選擇要播放的送出方式">
      <button
        v-for="(item, mode) in tracks"
        :key="mode"
        type="button"
        :class="[`is-${mode}`, { 'is-selected': selected === mode }]"
        :aria-pressed="selected === mode"
        @click="play(mode)"
      >
        <span class="choice-demo__glyph" aria-hidden="true">
          <svg v-if="mode === 'steer'" class="mark-steer" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12 7 8.4v7.2z" />
            <rect x="9.2" y="3.9" width="11.8" height="3.3" rx="1.65" opacity=".34" />
            <rect x="9.2" y="10.35" width="11.8" height="3.3" rx="1.65" />
            <rect x="9.2" y="16.8" width="11.8" height="3.3" rx="1.65" opacity=".34" />
          </svg>
          <svg v-else class="mark-queue" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3.9" width="18" height="3.3" rx="1.65" />
            <rect x="3" y="10.35" width="18" height="3.3" rx="1.65" opacity=".62" />
            <rect x="3" y="16.8" width="18" height="3.3" rx="1.65" opacity=".34" />
          </svg>
        </span>
        <span>
          <strong>{{ item.name }}</strong>
          <small>{{ item.role }}</small>
        </span>
        <PlayIcon aria-hidden="true" />
      </button>
    </div>

    <section
      :key="`${selected}-${runId}`"
      class="choice-demo__stage"
      :class="`is-${selected}`"
      :aria-label="`${track.name} 的運作方式`"
    >
      <header class="choice-demo__header">
        <h3>{{ track.title }}</h3>
        <em aria-live="polite">{{ status }}</em>
      </header>

      <div class="choice-task">
        <div class="choice-task__bar">
          <span class="choice-task__spin" :class="{ 'is-done': isFinished }" aria-hidden="true"></span>
          <b>製作行銷分析報告</b>
          <em>{{ isFinished ? '已完成' : '執行中' }}</em>
        </div>

        <ol class="choice-work">
          <li
            v-for="row in workRows"
            :key="row.label"
            :class="[`is-${row.state}`, { 'is-cut-in': row.cutIn }]"
          >
            <span class="choice-work__mark" aria-hidden="true">
              <CheckIcon v-if="row.state === 'done'" />
              <i v-else-if="row.state === 'running'"></i>
              <u v-else></u>
            </span>
            <span>{{ row.label }}</span>
            <b v-if="row.cutIn && !isFinished">
            <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2.4 1.9 9 6l-6.6 4.1z" /></svg>
            插隊
          </b>
            <b v-else-if="row.state === 'pending'" class="choice-work__wait">往後排</b>
          </li>
        </ol>
      </div>

      <div v-if="selected === 'queue'" class="choice-queue" :class="{ 'is-empty': queueWaiting === 0 }">
        <div class="choice-queue__head">
          <svg class="mark-queue" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="3" y="3.9" width="18" height="3.3" rx="1.65" />
            <rect x="3" y="10.35" width="18" height="3.3" rx="1.65" opacity=".62" />
            <rect x="3" y="16.8" width="18" height="3.3" rx="1.65" opacity=".34" />
          </svg>
          <b>待辦佇列</b>
          <em :class="{ 'is-cleared': queueCleared }">{{ queueCleared ? '已清空' : `${queueWaiting} 則等待中` }}</em>
        </div>
        <ol>
          <li
            v-for="row in queueRows"
            :key="row.label"
            :class="{ 'is-hidden': !row.entered, 'is-consumed': row.consumed }"
          >
            <span aria-hidden="true">{{ row.position }}</span>
            <span>{{ row.label }}</span>
          </li>
        </ol>
      </div>

      <div v-if="selected === 'queue'" class="choice-drained" :class="{ 'is-active': queuePromoted }">
        <div
          v-for="row in drainedRows"
          :key="row.label"
          class="choice-drained__row"
          :class="{ 'is-done': row.done, 'is-hidden': !row.shown }"
        >
          <span class="choice-drained__mark" aria-hidden="true">
            <CheckIcon v-if="row.done" />
            <i v-else class="choice-task__spin"></i>
          </span>
          <b>{{ row.label }}</b>
          <em v-if="!row.done">從佇列接著執行</em>
        </div>
      </div>

      <div class="choice-bubble" :class="[`is-${selected}`, { 'is-visible': bubbleVisible }]">
        <span aria-hidden="true">你</span>
        <span>{{ bubbleText }}</span>
      </div>

      <p class="choice-demo__note" :class="{ 'is-visible': isFinished }">{{ track.note }}</p>

      <ol class="choice-demo__progress" aria-label="目前流程進度">
        <li
          v-for="(step, index) in track.steps"
          :key="step"
          :class="{ 'is-current': isActive(index), 'is-complete': activeStep > index }"
        >
          <span><CheckIcon v-if="activeStep > index" aria-hidden="true" /><template v-else>{{ index + 1 }}</template></span>
          <small>{{ step }}</small>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.choice-demo {
  width: 100%;
  margin: 22px 0 0;
  container: choicedemo / inline-size;
}

/* ---------- selector ---------- */

.choice-demo__selector {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.choice-demo__selector button {
  display: grid;
  min-width: 0;
  grid-template-columns: 40px minmax(0, 1fr) 20px;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  border: 1px solid #dce4ed;
  border-radius: 14px;
  color: #2a2927;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
}

.choice-demo__selector button:hover {
  border-color: #a9bccd;
  box-shadow: 0 8px 18px rgb(30 50 70 / 9%);
  transform: translateY(-1px);
}

.choice-demo__selector button:focus-visible {
  outline: 3px solid rgb(22 119 210 / 26%);
  outline-offset: 2px;
}

.choice-demo__selector button.is-selected.is-steer {
  border-color: #1677d2;
  background: #f7fbff;
  box-shadow: inset 0 0 0 1px rgb(22 119 210 / 18%);
}

.choice-demo__selector button.is-selected.is-queue {
  border-color: #7b5cc4;
  background: #faf8ff;
  box-shadow: inset 0 0 0 1px rgb(123 92 196 / 18%);
}

.choice-demo__glyph {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 11px;
}

.choice-demo__glyph svg {
  width: 20px;
  height: 20px;
}

.is-steer .choice-demo__glyph { color: #1160a9; background: #e6f1fc }
.is-queue .choice-demo__glyph { color: #6344ad; background: #f0ebfb }

.choice-demo__selector span,
.choice-demo__selector strong,
.choice-demo__selector small {
  display: block;
}

.choice-demo__selector strong {
  font-size: 16.5px;
  line-height: 1.35;
}

.choice-demo__selector small {
  margin-top: 3px;
  color: #74736f;
  font-size: 12.5px;
}

.choice-demo__selector button > svg {
  width: 18px;
  color: #97a3af;
}

.is-selected.is-steer > svg { color: #1677d2 }
.is-selected.is-queue > svg { color: #7b5cc4 }

/* ---------- stage ---------- */

.choice-demo__stage {
  padding: clamp(16px, 2.6vw, 22px);
  border: 1px solid #e1e0dc;
  border-radius: 18px;
  background: #f7f8f9;
}

.choice-demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.choice-demo__header h3 {
  margin: 0;
  color: #232321;
  font-size: clamp(16px, 1.9vw, 19px);
  line-height: 1.4;
  letter-spacing: -.01em;
}

.choice-demo__header em {
  flex: 0 0 auto;
  padding: 6px 11px;
  border-radius: 999px;
  color: #65645f;
  background: #e9e8e4;
  font-size: 11.5px;
  font-style: normal;
  white-space: nowrap;
}

/* ---------- running task ---------- */

.choice-task {
  border: 1px solid #dbe2e9;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 8px 20px rgb(38 56 73 / 6%);
}

.choice-task__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border-bottom: 1px solid #e7ebef;
  font-size: 13.5px;
}

.choice-task__bar b { font-weight: 700 }

.choice-task__bar em {
  margin-left: auto;
  padding: 3px 10px;
  border-radius: 999px;
  color: #5d6b78;
  background: #eef2f6;
  font-size: 11.5px;
  font-style: normal;
}

.choice-task__spin {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  border: 2px solid #cfdae4;
  border-radius: 50%;
  border-top-color: #1677d2;
  animation: choice-spin .9s linear infinite;
}

.choice-task__spin.is-done {
  border-color: #35a06f;
  border-top-color: #35a06f;
  animation: none;
}

@keyframes choice-spin { to { transform: rotate(360deg) } }

.choice-work {
  display: grid;
  margin: 0;
  padding: 9px 15px 11px;
  list-style: none;
}

.choice-work li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 7px 0;
  color: #46525e;
  font-size: 13.5px;
  transition: color .3s ease;
}

.choice-work li.is-done { color: #9aa4ae }
.choice-work li.is-pending { color: #b2bac2 }

.choice-work__mark {
  display: grid;
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  place-items: center;
}

.choice-work__mark svg { width: 15px; color: #35a06f }

.choice-work__mark i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1677d2;
  animation: choice-pulse 1.1s ease-in-out infinite;
}

.choice-work__mark u {
  width: 7px;
  height: 7px;
  border: 1.5px solid #ccd4dc;
  border-radius: 50%;
}

@keyframes choice-pulse {
  0%, 100% { opacity: .35; transform: scale(.8) }
  50% { opacity: 1; transform: scale(1.15) }
}

/* the cut-in row is the whole point of Steer, so it gets the emphasis */
.choice-work li.is-cut-in {
  margin: 2px -9px;
  padding: 8px 9px;
  border-radius: 9px;
  color: #14507f;
  background: #e9f4fd;
  box-shadow: inset 0 0 0 1px rgb(22 119 210 / 16%);
  animation: choice-cut-in .44s cubic-bezier(.22, 1.32, .4, 1) both;
}

.choice-work li.is-cut-in b {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding: 2px 8px 2px 6px;
  border-radius: 999px;
  color: #fff;
  background: #1677d2;
  font-size: 11px;
  font-weight: 800;
}

.choice-work li.is-cut-in b svg { width: 9px; height: 9px }

.choice-work__wait {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  color: #8c96a0;
  background: #f1f3f5;
  font-size: 11px;
  font-weight: 700;
}

@keyframes choice-cut-in {
  from { opacity: 0; transform: translateX(-14px) }
  to { opacity: 1; transform: translateX(0) }
}

/* ---------- queue ---------- */

.choice-queue {
  margin-top: 11px;
  padding: 12px 15px 6px;
  border: 1px dashed #c9bae9;
  border-radius: 13px;
  background: #faf8ff;
  transition: opacity .3s ease;
}

.choice-queue.is-empty { opacity: .6 }

.choice-queue__head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a3a7d;
  font-size: 13px;
}

.choice-queue__head svg { width: 16px; height: 16px }
.choice-queue__head b { font-weight: 700 }

.choice-queue__head em {
  margin-left: auto;
  padding: 2px 9px;
  border-radius: 999px;
  color: #6344ad;
  background: #ede6fb;
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
}

.choice-queue ol {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

.choice-queue li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 6px;
  padding: 9px 12px;
  max-height: 44px;
  overflow: hidden;
  border-radius: 9px;
  color: #443a63;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgb(123 92 196 / 14%);
  font-size: 13px;
  transition:
    max-height .32s cubic-bezier(.3, .8, .4, 1),
    margin-bottom .32s cubic-bezier(.3, .8, .4, 1),
    padding .32s cubic-bezier(.3, .8, .4, 1),
    opacity .26s ease,
    transform .3s cubic-bezier(.45, 0, .85, .3);
}

/* A consumed row slides out of the line and collapses, pulling the rest up. */
.choice-queue li.is-consumed {
  max-height: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  transform: translateX(30px) scale(.95);
}

.choice-queue li.is-hidden {
  max-height: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  transform: translateY(-8px);
}

.choice-queue li span:first-child {
  display: grid;
  flex: 0 0 auto;
  width: 19px;
  height: 19px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #7b5cc4;
  font-size: 11px;
  font-weight: 800;
}



.choice-queue__head em.is-cleared {
  color: #1c7a52;
  background: #dcf2e6;
}

.choice-drained {
  margin-top: 0;
  transition: margin-top .3s ease;
}

.choice-drained.is-active {
  margin-top: 11px;
}

.choice-drained__row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;
  padding: 12px 15px;
  max-height: 50px;
  overflow: hidden;
  border: 1px solid #ddd2f4;
  border-radius: 13px;
  background: #fff;
  font-size: 13.5px;
  transition:
    max-height .34s cubic-bezier(.22, 1.1, .4, 1),
    margin-bottom .34s ease,
    padding .34s ease,
    border-color .3s ease,
    opacity .3s ease,
    transform .34s cubic-bezier(.22, 1.16, .4, 1);
}

.choice-drained__row:last-child { margin-bottom: 0 }

.choice-drained__row.is-hidden {
  max-height: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-width: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.choice-drained__row.is-done {
  border-color: #e3e7ea;
  color: #97a1ab;
}

.choice-drained__mark {
  display: grid;
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  place-items: center;
}

.choice-drained__mark svg { width: 15px; color: #35a06f }

.choice-drained__row .choice-task__spin {
  border-color: #ddd2f4;
  border-top-color: #7b5cc4;
}

.choice-drained__row b { font-weight: 700 }

.choice-drained__row em {
  margin-left: auto;
  padding: 3px 10px;
  border-radius: 999px;
  color: #6344ad;
  background: #f0ebfb;
  font-size: 11.5px;
  font-style: normal;
  white-space: nowrap;
}

/* ---------- message bubble ---------- */

.choice-bubble {
  display: flex;
  align-items: center;
  gap: 9px;
  width: fit-content;
  max-width: 100%;
  margin: 11px 0 0 auto;
  padding: 9px 14px;
  border-radius: 14px 14px 4px 14px;
  opacity: 0;
  color: #14405f;
  background: #dcecfa;
  font-size: 13px;
  transform: translateY(10px);
  transition: opacity .34s ease, transform .34s ease;
}

.choice-bubble.is-queue { color: #3f2f6b; background: #eae2fb }

.choice-bubble.is-visible { opacity: 1; transform: translateY(0) }

.choice-bubble span:first-child {
  display: grid;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  background: rgb(255 255 255 / 75%);
  font-size: 11px;
  font-weight: 800;
}

/* ---------- note + progress ---------- */

.choice-demo__note {
  margin: 14px 0 0;
  color: #5c6873;
  font-size: 13px;
  line-height: 1.65;
  opacity: 0;
  transition: opacity .35s ease;
}

.choice-demo__note.is-visible { opacity: 1 }

.choice-demo__progress {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  margin: 15px 0 0;
  padding: 0;
  list-style: none;
}

.choice-demo__progress li {
  position: relative;
  display: grid;
  min-width: 0;
  justify-items: center;
  gap: 7px;
  margin: 0;
  color: #96958f;
  text-align: center;
}

.choice-demo__progress li::before {
  position: absolute;
  z-index: 0;
  top: 14px;
  right: 50%;
  left: -50%;
  height: 1px;
  background: #dcdcd8;
  content: '';
}

.choice-demo__progress li:first-child::before { display: none }

.choice-demo__progress li > span {
  z-index: 1;
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid #d7d6d1;
  border-radius: 50%;
  background: #f7f8f9;
  font-size: 11.5px;
  font-weight: 800;
  transition: background-color .25s ease, border-color .25s ease, color .25s ease;
}

.choice-demo__progress li > span svg { width: 14px }

.choice-demo__progress small { font-size: 11.5px; line-height: 1.4 }

.is-steer .choice-demo__progress li.is-current,
.is-steer .choice-demo__progress li.is-complete { color: #1677d2 }

.is-steer .choice-demo__progress li.is-current > span,
.is-steer .choice-demo__progress li.is-complete > span {
  border-color: #1677d2;
  color: #fff;
  background: #1677d2;
}

.is-queue .choice-demo__progress li.is-current,
.is-queue .choice-demo__progress li.is-complete { color: #7b5cc4 }

.is-queue .choice-demo__progress li.is-current > span,
.is-queue .choice-demo__progress li.is-complete > span {
  border-color: #7b5cc4;
  color: #fff;
  background: #7b5cc4;
}

/* ---------- responsive ---------- */

@container choicedemo (max-width: 500px) {
  .choice-demo__selector { grid-template-columns: 1fr }

  .choice-demo__header {
    display: grid;
    gap: 8px;
  }

  .choice-demo__header em { justify-self: start }

  .choice-work li.is-cut-in b span,
  .choice-work__wait { display: none }

  .choice-demo__progress small { font-size: 10px }
}

@media (prefers-reduced-motion: reduce) {
  .choice-demo *,
  .choice-demo *::before,
  .choice-demo *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
</style>
