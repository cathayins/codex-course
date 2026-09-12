<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { withBase } from 'vitepress'
import {
  ArrowDownTrayIcon,
  CheckIcon,
  PlayIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'

type RuntimeMode = 'chatgpt' | 'codex'
type LineKind = 'cmd' | 'out' | 'err' | 'ok' | 'note'

type Line = { step: number; kind: LineKind; text: string }

type Track = {
  name: string
  role: string
  eyebrow: string
  title: string
  summary: string
  icon: string
  fileName: string
  fileNote: string
  terminalLabel: string
  terminalOwner: string
  steps: string[]
  lines: Line[]
  verdictLabel: string
  verdict: string
  settles: 'stuck' | 'done'
}

const STEP_MS = 2200

const tracks: Record<RuntimeMode, Track> = {
  chatgpt: {
    name: 'ChatGPT',
    role: '給你一份程式檔',
    eyebrow: '拿到檔案，但環境要自己處理',
    title: '它寫得出程式，但跑不跑得起來是你的事',
    summary: 'ChatGPT 可以產生一份完整的 Python 程式讓你下載。可是程式要在你的電腦上跑起來，還需要執行環境、套件與一連串排錯，而這些它碰不到。',
    icon: '/images/quick-start/chatgpt-icon.webp',
    fileName: 'report.py',
    fileNote: '下載到你的電腦',
    terminalLabel: '你自己的終端機',
    terminalOwner: '你',
    steps: ['產生程式檔', '下載回電腦', '自己執行看看', '卡在錯誤訊息'],
    lines: [
      { step: 2, kind: 'cmd', text: 'python report.py' },
      { step: 2, kind: 'err', text: 'zsh: command not found: python' },
      { step: 3, kind: 'note', text: '# 查了之後改用 python3 再試一次' },
      { step: 3, kind: 'cmd', text: 'python3 report.py' },
      { step: 3, kind: 'err', text: "ModuleNotFoundError: No module named 'pandas'" },
      { step: 3, kind: 'out', text: '要裝哪個版本？pip 還是 pip3？要不要開虛擬環境？' }
    ],
    verdictLabel: '卡住了',
    verdict: '檔案拿到了，但環境沒裝、套件沒補、錯誤沒解，程式還是跑不出結果。',
    settles: 'stuck'
  },
  codex: {
    name: 'Codex',
    role: '把程式跑到會動為止',
    eyebrow: '有權限，就能自己把問題解掉',
    title: '它會自己補環境、自己排錯，直到真的跑出結果',
    summary: 'Codex 在你授權的範圍內可以開終端機、安裝缺少的東西、實際執行程式。遇到錯誤它會讀錯誤訊息、修正、再跑一次，直到成果真的產生出來。',
    icon: '/images/quick-start/codex-icon.webp',
    fileName: 'report.py',
    fileNote: '留在你的資料夾裡',
    terminalLabel: 'Codex 操作的終端機',
    terminalOwner: 'Codex',
    steps: ['同一個需求', '發現沒有環境', '自己補齊環境', '執行後自己修錯', '測到真的成功'],
    lines: [
      { step: 1, kind: 'cmd', text: 'python3 --version' },
      { step: 1, kind: 'err', text: 'command not found: python3' },
      { step: 1, kind: 'note', text: '# 這台電腦沒有 Python，先把環境補起來' },
      { step: 2, kind: 'cmd', text: 'brew install python@3.12' },
      { step: 2, kind: 'ok', text: 'Python 3.12.7 安裝完成' },
      { step: 2, kind: 'cmd', text: 'pip3 install pandas openpyxl' },
      { step: 2, kind: 'ok', text: '2 個套件安裝完成' },
      { step: 3, kind: 'cmd', text: 'python3 report.py' },
      { step: 3, kind: 'err', text: 'FileNotFoundError: data/source.xlsx' },
      { step: 3, kind: 'note', text: '# 路徑錯了，改讀資料夾裡實際的檔名' },
      { step: 4, kind: 'cmd', text: 'python3 report.py' },
      { step: 4, kind: 'ok', text: 'report.html 已產生，可以直接打開' }
    ],
    verdictLabel: '真的跑起來了',
    verdict: '環境自己裝、錯誤自己修、結果自己驗，你拿到的是一份已經確認能用的成果。',
    settles: 'done'
  }
}

const selected = ref<RuntimeMode>('chatgpt')
const activeStep = ref(-1)
const hasPlayed = ref(false)
const runId = ref(0)
let timers: Array<ReturnType<typeof setTimeout>> = []

const track = computed(() => tracks[selected.value])
const lastStep = computed(() => track.value.steps.length - 1)
const isFinished = computed(() => activeStep.value >= lastStep.value)

const status = computed(() => {
  if (!hasPlayed.value) return '點選上方按鈕播放'
  if (isFinished.value) return track.value.verdictLabel
  return track.value.steps[Math.max(activeStep.value, 0)]
})

/** Lines fade in one after another inside their own step, so each one stays readable. */
const visibleLines = computed(() => {
  const counters: Record<number, number> = {}
  return track.value.lines.map((line) => {
    counters[line.step] = (counters[line.step] ?? 0) + 1
    return { ...line, delay: (counters[line.step] - 1) * 0.42 }
  })
})

function clearTimers() {
  timers.forEach((timer) => clearTimeout(timer))
  timers = []
}

function hasReached(index: number) {
  return activeStep.value >= index
}

function isActive(index: number) {
  return activeStep.value === index
}

function play(mode: RuntimeMode) {
  clearTimers()
  selected.value = mode
  activeStep.value = -1
  hasPlayed.value = true
  runId.value += 1

  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    activeStep.value = tracks[mode].steps.length - 1
    return
  }

  tracks[mode].steps.forEach((_, index) => {
    timers.push(setTimeout(() => {
      activeStep.value = index
    }, 160 + index * STEP_MS))
  })
}

onBeforeUnmount(clearTimers)
</script>

<template>
  <div class="runtime-demo">
    <div class="runtime-demo__heading">
      <div>
        <h3>同一份程式，誰能真的把它跑起來？</h3>
        <p>點選其中一邊，看「產生程式碼」到「跑出結果」之間還差了多少步。</p>
      </div>
      <span><PlayIcon aria-hidden="true" /> 點選播放</span>
    </div>

    <div class="runtime-demo__selector" role="group" aria-label="選擇要播放的執行流程">
      <button
        v-for="(item, mode) in tracks"
        :key="mode"
        type="button"
        :class="{ 'is-selected': selected === mode }"
        :aria-pressed="selected === mode"
        @click="play(mode)"
      >
        <img :src="withBase(item.icon)" alt="" width="256" height="256" aria-hidden="true">
        <span>
          <strong>{{ item.name }}</strong>
          <small>{{ item.role }}</small>
        </span>
        <PlayIcon aria-hidden="true" />
      </button>
    </div>

    <section
      :key="`${selected}-${runId}`"
      class="runtime-demo__stage"
      :class="`is-${selected}`"
      :aria-label="`${track.name} 執行流程`"
    >
      <header class="runtime-demo__stage-header">
        <div>
          <span>{{ track.eyebrow }}</span>
          <h3>{{ track.title }}</h3>
          <p>{{ track.summary }}</p>
        </div>
        <em aria-live="polite">{{ status }}</em>
      </header>

      <div class="runtime-stage">
        <aside class="runtime-aside">
          <div class="runtime-file" :class="{ 'is-visible': hasReached(0), 'is-active': isActive(0) }">
            <svg class="runtime-file__glyph" viewBox="0 0 30 36" aria-hidden="true" focusable="false">
              <path class="runtime-file__page" d="M6 1.5h11.5L27 11v22.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V4A2.5 2.5 0 0 1 6 1.5z" />
              <path class="runtime-file__fold" d="M17.5 1.5 27 11h-7a2.5 2.5 0 0 1-2.5-2.5z" />
              <path class="runtime-file__code" d="M9 20.5 6.5 23 9 25.5M21 20.5 23.5 23 21 25.5M17 18l-4 12" fill="none" />
            </svg>
            <b>{{ track.fileName }}</b>
            <small>{{ track.fileNote }}</small>
            <i v-if="selected === 'chatgpt'" class="runtime-file__move" :class="{ 'is-active': isActive(1) }" aria-hidden="true">
              <ArrowDownTrayIcon />
            </i>
          </div>

          <ul class="runtime-checks" aria-hidden="true">
            <li :class="{ 'is-known': hasReached(selected === 'chatgpt' ? 2 : 1), 'is-solved': selected === 'codex' && hasReached(2) }">
              <span>Python 執行環境</span>
              <b>{{ selected === 'codex' && hasReached(2) ? '已安裝' : hasReached(selected === 'chatgpt' ? 2 : 1) ? '缺少' : '未知' }}</b>
            </li>
            <li :class="{ 'is-known': hasReached(selected === 'chatgpt' ? 3 : 1), 'is-solved': selected === 'codex' && hasReached(2) }">
              <span>需要的套件</span>
              <b>{{ selected === 'codex' && hasReached(2) ? '已補齊' : hasReached(selected === 'chatgpt' ? 3 : 1) ? '缺少' : '未知' }}</b>
            </li>
            <li :class="{ 'is-known': hasReached(3), 'is-solved': selected === 'codex' && hasReached(4) }">
              <span>實際執行結果</span>
              <b>{{ selected === 'codex' && hasReached(4) ? '成功' : hasReached(3) ? '仍失敗' : '未知' }}</b>
            </li>
          </ul>
        </aside>

        <div class="runtime-terminal" :class="[`is-${track.settles}`, { 'is-settled': isFinished }]">
          <div class="runtime-terminal__bar">
            <i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i>
            <span>{{ track.terminalLabel }}</span>
            <em>由 {{ track.terminalOwner }} 操作</em>
          </div>

          <ol class="runtime-terminal__body">
            <li
              v-for="(line, index) in visibleLines"
              :key="index"
              class="runtime-line"
              :class="[`runtime-line--${line.kind}`, { 'is-shown': hasReached(line.step) }]"
              :style="{ '--delay': `${line.delay}s` }"
            >
              <span class="runtime-line__mark" aria-hidden="true">{{ line.kind === 'cmd' ? '$' : line.kind === 'ok' ? '✓' : line.kind === 'err' ? '✗' : '' }}</span>
              <code>{{ line.text }}</code>
            </li>

            <li v-if="!hasPlayed" class="runtime-line runtime-line--idle is-shown">
              <span class="runtime-line__mark" aria-hidden="true">$</span>
              <code class="runtime-caret"></code>
            </li>

            <li v-else-if="track.settles === 'stuck' && isFinished" class="runtime-line runtime-line--wait is-shown">
              <span class="runtime-line__mark" aria-hidden="true">$</span>
              <code class="runtime-caret"></code>
            </li>
          </ol>

          <div class="runtime-terminal__verdict" :class="{ 'is-visible': isFinished }">
            <QuestionMarkCircleIcon v-if="track.settles === 'stuck'" aria-hidden="true" />
            <CheckIcon v-else aria-hidden="true" />
            <strong>{{ track.verdictLabel }}</strong>
            <p>{{ track.verdict }}</p>
          </div>
        </div>
      </div>

      <ol class="runtime-demo__progress" aria-label="目前流程進度">
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
.runtime-demo {
  width: 100%;
  max-width: 960px;
  margin-top: 26px;
  container: rtdemo / inline-size;
}

.runtime-demo__heading,
.runtime-demo__stage-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.runtime-demo__heading {
  margin-bottom: 16px;
}

.runtime-demo__heading h3,
.runtime-demo__heading p,
.runtime-demo__stage-header h3,
.runtime-demo__stage-header p {
  margin: 0;
}

.runtime-demo__heading h3 {
  color: #29251d;
  font-size: 19px;
  line-height: 1.45;
}

.runtime-demo__heading p {
  margin-top: 6px;
  color: #7a7161;
  font-size: 15px;
  line-height: 1.6;
}

.runtime-demo__heading > span {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #e0d7c4;
  border-radius: 999px;
  color: #7a7161;
  background: rgb(255 255 255 / 55%);
  font-size: 12.5px;
  font-weight: 700;
}

.runtime-demo__heading > span svg {
  width: 16px;
}

.runtime-demo__selector {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.runtime-demo__selector button {
  display: grid;
  min-width: 0;
  grid-template-columns: 44px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 13px;
  padding: 14px 16px;
  border: 1px solid #e2d9c7;
  border-radius: 14px;
  color: #2a2721;
  background: rgb(255 255 255 / 78%);
  cursor: pointer;
  text-align: left;
  transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease, background-color .2s ease;
}

.runtime-demo__selector button:hover {
  border-color: #c9bda4;
  background: #fff;
  box-shadow: 0 8px 18px rgb(96 80 48 / 10%);
  transform: translateY(-1px);
}

.runtime-demo__selector button:focus-visible {
  outline: 3px solid rgb(22 119 210 / 26%);
  outline-offset: 2px;
}

.runtime-demo__selector button.is-selected {
  border-color: #1677d2;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgb(22 119 210 / 18%);
}

.runtime-demo__selector img {
  width: 44px;
  height: 44px;
  margin: 0;
  object-fit: contain;
}

.runtime-demo__selector span,
.runtime-demo__selector strong,
.runtime-demo__selector small {
  display: block;
}

.runtime-demo__selector strong {
  font-size: 17px;
  line-height: 1.35;
}

.runtime-demo__selector small {
  margin-top: 3px;
  color: #7a7161;
  font-size: 12.5px;
  line-height: 1.45;
}

.runtime-demo__selector button > svg {
  width: 20px;
  color: #1677d2;
}

.runtime-demo__stage {
  padding: clamp(20px, 3vw, 28px);
  border: 1px solid #e5dcc9;
  border-radius: 20px;
  background: rgb(255 255 255 / 66%);
}

.runtime-demo__stage-header {
  margin-bottom: 22px;
}

.runtime-demo__stage-header > div {
  max-width: 660px;
}

.runtime-demo__stage-header span {
  display: block;
  margin-bottom: 8px;
  color: #1677d2;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: .04em;
}

.runtime-demo__stage-header h3 {
  color: #26231d;
  font-size: clamp(20px, 2.4vw, 26px);
  line-height: 1.32;
  letter-spacing: -.02em;
}

.runtime-demo__stage-header p {
  margin-top: 10px;
  color: #6d6555;
  font-size: 14.5px;
  line-height: 1.7;
}

.runtime-demo__stage-header em {
  flex: 0 0 auto;
  padding: 8px 12px;
  border-radius: 999px;
  color: #6d6555;
  background: #f1eadc;
  font-size: 12px;
  font-style: normal;
  white-space: nowrap;
}

/* ---------- stage ---------- */

.runtime-stage {
  display: grid;
  grid-template-columns: minmax(190px, .48fr) minmax(360px, 1fr);
  gap: 16px;
  align-items: start;
}

.runtime-aside {
  display: grid;
  gap: 12px;
}

.runtime-file {
  position: relative;
  display: grid;
  justify-items: center;
  padding: 20px 16px;
  border: 1px solid #e4dbc9;
  border-radius: 14px;
  opacity: .3;
  background: #fff;
  text-align: center;
  transform: translateY(6px);
  transition: opacity .45s ease, transform .45s ease, border-color .45s ease;
}

.runtime-file.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.runtime-file.is-active {
  border-color: #1677d2;
}

.runtime-file__glyph {
  width: 38px;
  height: 46px;
}

.runtime-file__page {
  fill: #f7fafc;
  stroke: #9fb1c2;
  stroke-width: 1.5;
}

.runtime-file__fold {
  fill: #dde7ef;
}

.runtime-file__code {
  stroke: #1677d2;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.runtime-file b {
  margin-top: 10px;
  color: #26231d;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}

.runtime-file small {
  margin-top: 4px;
  color: #857c6b;
  font-size: 12px;
}

.runtime-file__move {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 50%;
  opacity: 0;
  color: #fff;
  background: #1677d2;
  transition: opacity .3s ease;
}

.runtime-file__move svg {
  width: 15px;
}

.runtime-file__move.is-active {
  opacity: 1;
  animation: runtime-drop 1.1s ease-in-out infinite;
}

@keyframes runtime-drop {
  0%, 100% { transform: translateY(-3px) }
  50% { transform: translateY(3px) }
}

.runtime-checks {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.runtime-checks li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 0;
  padding: 11px 13px;
  border: 1px solid #e7dfcd;
  border-radius: 11px;
  background: rgb(255 255 255 / 70%);
  font-size: 12.5px;
  transition: border-color .4s ease, background-color .4s ease;
}

.runtime-checks span {
  color: #6d6555;
  font-weight: 700;
}

.runtime-checks b {
  flex: 0 0 auto;
  padding: 3px 9px;
  border-radius: 999px;
  color: #8d8474;
  background: #f1ebdd;
  font-size: 11.5px;
  font-weight: 800;
  transition: color .4s ease, background-color .4s ease;
}

.runtime-checks li.is-known {
  border-color: #f0cdbd;
  background: #fdf4f1;
}

.runtime-checks li.is-known b {
  color: #b4472a;
  background: #fbe2d9;
}

.runtime-checks li.is-solved {
  border-color: #c2e3d1;
  background: #f2fbf6;
}

.runtime-checks li.is-solved b {
  color: #1c7a52;
  background: #d9f2e5;
}

/* ---------- terminal ---------- */

.runtime-terminal {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 320px;
  overflow: hidden;
  border: 1px solid #1c2530;
  border-radius: 14px;
  background: #121a23;
  box-shadow: 0 18px 40px rgb(14 24 34 / 22%);
}

.runtime-terminal__bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  border-bottom: 1px solid #22303d;
  background: #18222c;
}

.runtime-terminal__bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #35485a;
}

.runtime-terminal__bar i:first-child { background: #e0654f }
.runtime-terminal__bar i:nth-child(2) { background: #e0b24f }
.runtime-terminal__bar i:nth-child(3) { background: #56b47c }

.runtime-terminal__bar span {
  margin-left: 8px;
  color: #c6d4e0;
  font-size: 12.5px;
  font-weight: 700;
}

.runtime-terminal__bar em {
  margin-left: auto;
  padding: 3px 9px;
  border-radius: 999px;
  color: #8fa3b6;
  background: #22303d;
  font-size: 11.5px;
  font-style: normal;
}

.runtime-terminal__body {
  display: grid;
  align-content: start;
  gap: 9px;
  margin: 0;
  padding: 16px 16px 18px;
  list-style: none;
}

.runtime-line {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  gap: 9px;
  margin: 0;
  opacity: 0;
  transform: translateY(5px);
}

.runtime-line.is-shown {
  animation: runtime-line-in .42s ease-out var(--delay, 0s) both;
}

@keyframes runtime-line-in {
  from { opacity: 0; transform: translateY(5px) }
  to { opacity: 1; transform: translateY(0) }
}

.runtime-line__mark {
  color: #6d8296;
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.6;
}

.runtime-line code {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: none;
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  line-height: 1.6;
  word-break: break-word;
}

.runtime-line--cmd .runtime-line__mark { color: #59b3f0 }
.runtime-line--cmd code { color: #eaf2f9 }
.runtime-line--out code { color: #93a6b8 }
.runtime-line--note code { color: #7f93a6; font-style: italic }
.runtime-line--err .runtime-line__mark { color: #ff8a6b }
.runtime-line--err code { color: #ff9d80 }
.runtime-line--ok .runtime-line__mark { color: #5fd39a }
.runtime-line--ok code { color: #7fdeb0 }
.runtime-line--idle .runtime-line__mark,
.runtime-line--wait .runtime-line__mark { color: #59b3f0 }

.runtime-caret {
  display: inline-block;
  width: 9px;
  height: 17px;
  background: #59b3f0;
  animation: runtime-blink 1.1s steps(2, start) infinite;
  vertical-align: -3px;
}

@keyframes runtime-blink {
  to { opacity: 0 }
}

.runtime-terminal__verdict {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 5px 11px;
  padding: 15px 16px;
  border-top: 1px solid #22303d;
  opacity: 0;
  background: #18222c;
  transition: opacity .45s ease;
}

.runtime-terminal__verdict.is-visible {
  opacity: 1;
}

.runtime-terminal__verdict svg {
  grid-row: 1 / span 2;
  width: 22px;
  margin-top: 1px;
}

.runtime-terminal__verdict strong {
  font-size: 13.5px;
}

.runtime-terminal__verdict p {
  grid-column: 2;
  margin: 0;
  color: #93a6b8;
  font-size: 13px;
  line-height: 1.62;
}

.is-stuck .runtime-terminal__verdict svg,
.is-stuck .runtime-terminal__verdict strong { color: #ff9d80 }
.is-done .runtime-terminal__verdict svg,
.is-done .runtime-terminal__verdict strong { color: #7fdeb0 }

.runtime-terminal.is-done.is-settled {
  border-color: #2c6b4e;
  box-shadow: 0 18px 40px rgb(14 24 34 / 22%), 0 0 0 3px rgb(95 211 154 / 16%);
}

.runtime-terminal.is-stuck.is-settled {
  border-color: #6b352c;
  box-shadow: 0 18px 40px rgb(14 24 34 / 22%), 0 0 0 3px rgb(255 138 107 / 14%);
}

/* ---------- progress ---------- */

.runtime-demo__progress {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 0;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.runtime-demo__progress li {
  position: relative;
  display: grid;
  min-width: 0;
  justify-items: center;
  gap: 8px;
  margin: 0;
  color: #9c9384;
  text-align: center;
}

.runtime-demo__progress li::before {
  position: absolute;
  z-index: 0;
  top: 15px;
  right: 50%;
  left: -50%;
  height: 1px;
  background: #e0d8c7;
  content: '';
}

.runtime-demo__progress li:first-child::before {
  display: none;
}

.runtime-demo__progress li > span {
  z-index: 1;
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border: 1px solid #e0d8c7;
  border-radius: 50%;
  background: #faf6ee;
  font-size: 12px;
  font-weight: 800;
  transition: background-color .25s ease, border-color .25s ease, color .25s ease;
}

.runtime-demo__progress li > span svg {
  width: 16px;
}

.runtime-demo__progress li.is-current,
.runtime-demo__progress li.is-complete {
  color: #1677d2;
}

.runtime-demo__progress li.is-current > span,
.runtime-demo__progress li.is-complete > span {
  border-color: #1677d2;
  color: #fff;
  background: #1677d2;
}

.runtime-demo__progress li.is-current > span {
  box-shadow: 0 0 0 5px rgb(22 119 210 / 14%);
}

.runtime-demo__progress small {
  font-size: 12px;
  line-height: 1.4;
}

/* ---------- responsive ---------- */

@container rtdemo (max-width: 680px) {
  .runtime-stage {
    grid-template-columns: 1fr;
  }

  .runtime-aside {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    align-items: start;
  }

  .runtime-terminal {
    min-height: 300px;
  }
}

@container rtdemo (max-width: 500px) {
  .runtime-demo__heading,
  .runtime-demo__stage-header {
    display: grid;
  }

  .runtime-demo__heading > span,
  .runtime-demo__stage-header em {
    justify-self: start;
  }

  .runtime-demo__selector {
    grid-template-columns: 1fr;
  }

  .runtime-aside {
    grid-template-columns: 1fr;
  }

  .runtime-demo__stage {
    padding: 16px 13px;
    border-radius: 16px;
  }

  .runtime-line code,
  .runtime-line__mark {
    font-size: 12.5px;
  }

  .runtime-demo__progress small {
    font-size: 10.5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .runtime-demo *,
  .runtime-demo *::before,
  .runtime-demo *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
</style>
