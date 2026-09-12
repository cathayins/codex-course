<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { withBase } from 'vitepress'
import {
  ArrowDownTrayIcon,
  ChartBarSquareIcon,
  CheckIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  DocumentChartBarIcon,
  FolderOpenIcon,
  GlobeAltIcon,
  PlayIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'

type FlowMode = 'chatgpt' | 'codex'

type Flow = {
  name: string
  role: string
  eyebrow: string
  title: string
  summary: string
  icon: string
  personNote: string
  steps: string[]
  result: string
}

const STEP_MS = 1950

const flows: Record<FlowMode, Flow> = {
  chatgpt: {
    name: 'ChatGPT',
    role: '瀏覽器裡的顧問',
    eyebrow: 'AI 與工作環境分開',
    title: '檔案交給網站，完成後再下載回來',
    summary: '你把檔案上傳到網站，AI 在那裡處理；下載回來之後的執行與整理，仍然要自己接手。',
    icon: '/images/quick-start/chatgpt-icon.webp',
    personNote: '負責上傳與下載',
    steps: ['上傳檔案', '網站中處理', '下載成果', '自己放回專案'],
    result: '成果停在下載資料夾，接下來要自己開啟、執行與整理。'
  },
  codex: {
    name: 'Codex',
    role: '工作環境裡的同事',
    eyebrow: 'AI 進入指定工作範圍',
    title: '告訴它資料夾，工作直接在專案裡完成',
    summary: 'Codex 依照你授權的範圍直接讀取檔案、執行工具，再把成果留在原本的資料夾裡。',
    icon: '/images/quick-start/codex-icon.webp',
    personNote: '說明目標與資料位置',
    steps: ['指定資料夾', '直接讀檔', '執行本機工具', '成果留在原地'],
    result: '來源檔案、執行工具與產出的成果，全部都在同一個工作環境裡。'
  }
}

const selected = ref<FlowMode>('chatgpt')
const activeStep = ref(-1)
const hasPlayed = ref(false)
const runId = ref(0)
let timers: Array<ReturnType<typeof setTimeout>> = []

const flow = computed(() => flows[selected.value])
const status = computed(() => {
  if (!hasPlayed.value) return '點選上方按鈕播放'
  if (activeStep.value >= flow.value.steps.length - 1) return '流程完成'
  return flow.value.steps[Math.max(activeStep.value, 0)]
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

function play(mode: FlowMode) {
  clearTimers()
  selected.value = mode
  activeStep.value = -1
  hasPlayed.value = true
  runId.value += 1

  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    activeStep.value = flows[mode].steps.length - 1
    return
  }

  flows[mode].steps.forEach((_, index) => {
    timers.push(setTimeout(() => {
      activeStep.value = index
    }, 140 + index * STEP_MS))
  })
}

onBeforeUnmount(clearTimers)
</script>

<template>
  <div class="environment-demo">
    <div class="environment-demo__heading">
      <div>
        <h3>同樣一個任務，工作實際發生在哪裡？</h3>
        <p>點選其中一個角色，看檔案在你、AI 與電腦之間怎麼移動。</p>
      </div>
      <span><PlayIcon aria-hidden="true" /> 點選播放</span>
    </div>

    <div class="environment-demo__selector" role="group" aria-label="選擇要播放的工作流程">
      <button
        v-for="(item, mode) in flows"
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
      class="environment-demo__stage"
      :class="`is-${selected}`"
      :aria-label="`${flow.name} 工作流程`"
    >
      <header class="environment-demo__stage-header">
        <div>
          <span>{{ flow.eyebrow }}</span>
          <h3>{{ flow.title }}</h3>
          <p>{{ flow.summary }}</p>
        </div>
        <em aria-live="polite">{{ status }}</em>
      </header>

      <div class="environment-scene" :class="selected === 'chatgpt' ? 'chatgpt-scene' : 'codex-scene'">
        <svg class="scene-grain" aria-hidden="true" focusable="false">
          <defs>
            <pattern id="cxdDots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.4" cy="1.4" r="1.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cxdDots)" />
        </svg>

        <div class="scene-person" :class="{ 'is-speaking': isActive(0) }">
          <svg class="persona" viewBox="0 0 96 116" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="cxdPersonaSkin" x1=".28" y1="0" x2=".76" y2="1">
                <stop offset="0" stop-color="#f6e2cd" />
                <stop offset="1" stop-color="#e2c3a6" />
              </linearGradient>
              <linearGradient id="cxdPersonaHair" x1=".2" y1="0" x2=".85" y2="1">
                <stop offset="0" stop-color="#4d4a52" />
                <stop offset="1" stop-color="#221f28" />
              </linearGradient>
              <linearGradient id="cxdPersonaShirt" x1=".15" y1="0" x2=".85" y2="1">
                <stop offset="0" stop-color="#5d87b7" />
                <stop offset=".55" stop-color="#3f6690" />
                <stop offset="1" stop-color="#2c4a6a" />
              </linearGradient>
              <linearGradient id="cxdPersonaForm" x1="0" y1="0" x2="1" y2="0">
                <stop offset=".38" stop-color="#07182a" stop-opacity="0" />
                <stop offset="1" stop-color="#07182a" stop-opacity=".2" />
              </linearGradient>
              <filter id="cxdPersonaBlur" x="-60%" y="-160%" width="220%" height="420%">
                <feGaussianBlur stdDeviation="2.8" />
              </filter>
            </defs>
            <ellipse class="persona__shadow" cx="48" cy="104.5" rx="29" ry="6" filter="url(#cxdPersonaBlur)" />
            <g class="persona__figure">
              <path d="M42 44h12v15.5a6 6 0 0 1-12 0z" fill="url(#cxdPersonaSkin)" />
              <ellipse class="persona__jawshade" cx="48" cy="47" rx="6" ry="4.4" />
              <path
                class="persona__torso"
                d="M13 104c0-23.5 10.3-35.6 24.2-38.9 3.5-.8 7.1-1.3 10.8-1.3s7.3.5 10.8 1.3C72.7 68.4 83 80.5 83 104z"
                fill="url(#cxdPersonaShirt)"
              />
              <path
                class="persona__form"
                d="M13 104c0-23.5 10.3-35.6 24.2-38.9 3.5-.8 7.1-1.3 10.8-1.3s7.3.5 10.8 1.3C72.7 68.4 83 80.5 83 104z"
              />
              <path class="persona__neckline" d="M39.2 64.2c2.5 4.6 5.4 6.9 8.8 6.9s6.3-2.3 8.8-6.9" />
              <ellipse cx="30.6" cy="39.5" rx="3.1" ry="4.1" fill="url(#cxdPersonaSkin)" />
              <ellipse cx="65.4" cy="39.5" rx="3.1" ry="4.1" fill="url(#cxdPersonaSkin)" />
              <ellipse cx="48" cy="34.5" rx="17.4" ry="19" fill="url(#cxdPersonaSkin)" />
              <ellipse class="persona__eye" cx="41.4" cy="37" rx="1.9" ry="2.4" />
              <ellipse class="persona__eye" cx="54.6" cy="37" rx="1.9" ry="2.4" />
              <path class="persona__smile" d="M45.2 44.4c1.6 1.7 4 1.7 5.6 0" />
              <path
                class="persona__hair"
                d="M30.3 41.6C28.4 21.6 36.8 13 48 13s19.6 8.6 17.7 28.6c-.9-6.6-2.1-11.2-3.7-13.9-4.9 3.2-11.2 4.6-17.6 3.6-2.9-.5-5.3-1.6-7.2-3.2-2.6 2.6-4.7 7.2-6.9 13.5z"
                fill="url(#cxdPersonaHair)"
              />
              <path class="persona__hairlight" d="M35.5 24.2c2.6-4.6 7-7.3 12.9-7.7-4.8 1.6-8.3 4.5-10.6 8.7z" />
            </g>
          </svg>
          <strong>你</strong>
          <small>{{ flow.personNote }}</small>
        </div>

        <template v-if="selected === 'chatgpt'">
          <div class="scene-device scene-device--compact">
            <div class="scene-device__label"><ComputerDesktopIcon aria-hidden="true" /> 你的電腦</div>
            <div class="scene-file scene-file--excel" :class="{ 'is-muted': hasReached(0) }">
              <DocumentChartBarIcon aria-hidden="true" />
              <span>你的檔案</span>
            </div>
            <div class="scene-download" :class="{ 'is-visible': hasReached(2), 'is-active': isActive(2) }">
              <ArrowDownTrayIcon aria-hidden="true" />
              <span>下載成果</span>
            </div>
            <div class="scene-project" :class="{ 'is-visible': hasReached(3), 'is-active': isActive(3) }">
              <FolderOpenIcon aria-hidden="true" />
              <span>自己放回專案</span>
            </div>
          </div>

          <div class="scene-separator" aria-hidden="true">
            <i class="scene-separator__line"></i>
            <span class="scene-separator__chip"><GlobeAltIcon /> 網路</span>
          </div>

          <div class="scene-cloud" :class="{ 'is-working': isActive(1) }">
            <svg class="cloud" viewBox="0 0 340 200" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="cxdCloudMain" x1=".18" y1="0" x2=".72" y2="1">
                  <stop offset="0" stop-color="#ffffff" />
                  <stop offset=".52" stop-color="#f4f9fe" />
                  <stop offset="1" stop-color="#dfebf7" />
                </linearGradient>
                <linearGradient id="cxdCloudBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#edf4fa" />
                  <stop offset="1" stop-color="#d8e6f2" />
                </linearGradient>
                <filter id="cxdCloudLift" x="-30%" y="-30%" width="160%" height="180%">
                  <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#274f76" flood-opacity=".16" />
                </filter>
              </defs>
              <path
                class="cloud__back"
                d="M188 168c-2-22 12-38 33-40 6-25 28-43 53-43s46 18 52 43c5 10 6 26 4 40z"
                fill="url(#cxdCloudBack)"
              />
              <g filter="url(#cxdCloudLift)">
                <path
                  class="cloud__main"
                  d="M26 168c-3-27 13-47 37-51 0-38 30-64 66-64 30 0 55 18 65 43 9-9 21-14 34-14 29 0 52 21 54 48 21 4 35 19 35 38z"
                  fill="url(#cxdCloudMain)"
                />
              </g>
              <path
                class="cloud__rim"
                d="M68 113c1-33 29-55 61-55 25 0 47 13 59 34"
                fill="none"
              />
            </svg>

            <div class="scene-cloud__content">
              <span>瀏覽器與雲端服務</span>
              <img :src="withBase(flows.chatgpt.icon)" alt="" width="256" height="256" aria-hidden="true">
              <strong>ChatGPT</strong>
              <small>AI 留在網站對話中</small>
              <i class="cloud-thinking" aria-hidden="true"><b></b><b></b><b></b></i>
            </div>
          </div>

          <div class="flight-layer" aria-hidden="true">
            <div class="flight flight--upload" :class="{ 'is-live': isActive(0) }">
              <span class="flight__unit flight__unit--ghost" style="--lag: .13s"></span>
              <span class="flight__unit flight__unit--ghost" style="--lag: .065s"></span>
              <span class="flight__unit">
                <span class="flight__card flight__card--excel">
                  <svg class="file-glyph" viewBox="0 0 30 36" focusable="false">
                    <path class="file-glyph__page" d="M6 1.5h11.5L27 11v22.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V4A2.5 2.5 0 0 1 6 1.5z" />
                    <path class="file-glyph__fold" d="M17.5 1.5 27 11h-7a2.5 2.5 0 0 1-2.5-2.5z" />
                    <rect class="file-glyph__bar" x="8" y="17" width="5" height="12" rx="1.2" />
                    <rect class="file-glyph__bar" x="15" y="13" width="5" height="16" rx="1.2" />
                  </svg>
                  <b>你的檔案</b>
                </span>
              </span>
            </div>

            <div class="flight flight--download" :class="{ 'is-live': isActive(2) }">
              <span class="flight__unit flight__unit--ghost" style="--lag: .13s"></span>
              <span class="flight__unit flight__unit--ghost" style="--lag: .065s"></span>
              <span class="flight__unit">
                <span class="flight__card flight__card--result">
                  <svg class="file-glyph" viewBox="0 0 30 36" focusable="false">
                    <path class="file-glyph__page" d="M6 1.5h11.5L27 11v22.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V4A2.5 2.5 0 0 1 6 1.5z" />
                    <path class="file-glyph__fold" d="M17.5 1.5 27 11h-7a2.5 2.5 0 0 1-2.5-2.5z" />
                    <path class="file-glyph__spark" d="M8 27l4.5-6 4 3.5 5.5-8" fill="none" />
                  </svg>
                  <b>成果檔案</b>
                </span>
              </span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="scene-instruction" :class="{ 'is-visible': hasReached(0), 'is-active': isActive(0) }">
            <span>「檔案在這個資料夾，<br>幫我整理成一份報表」</span>
          </div>

          <div class="scene-device scene-device--workspace">
            <div class="scene-device__label"><ComputerDesktopIcon aria-hidden="true" /> 你的電腦與資料夾</div>
            <div class="workspace-grid">
              <div class="scene-project scene-project--source" :class="{ 'is-active': isActive(1) }">
                <FolderOpenIcon aria-hidden="true" />
                <span>你的資料夾</span>
                <small>來源檔案在這裡</small>
              </div>

              <div class="scene-codex" :class="{ 'is-working': hasReached(1) && activeStep < 3 }">
                <img :src="withBase(flows.codex.icon)" alt="" width="256" height="256" aria-hidden="true">
                <strong>Codex</strong>
                <small>在你授權的範圍內工作</small>
                <i class="cloud-thinking" aria-hidden="true"><b></b><b></b><b></b></i>
              </div>

              <div class="scene-tools" :class="{ 'is-visible': hasReached(2), 'is-active': isActive(2) }">
                <span><CommandLineIcon aria-hidden="true" /> Terminal</span>
                <span><WrenchScrewdriverIcon aria-hidden="true" /> Python</span>
              </div>

              <div class="scene-dashboard" :class="{ 'is-visible': hasReached(3), 'is-active': isActive(3) }">
                <ChartBarSquareIcon aria-hidden="true" />
                <span>成果</span>
                <small>直接留在資料夾</small>
              </div>
            </div>

            <div class="flight-layer flight-layer--inside" aria-hidden="true">
              <div class="flight flight--read" :class="{ 'is-live': isActive(1) }">
                <span class="flight__unit flight__unit--ghost" style="--lag: .12s"></span>
                <span class="flight__unit flight__unit--ghost" style="--lag: .06s"></span>
                <span class="flight__unit">
                  <span class="flight__card flight__card--excel flight__card--mini">
                    <svg class="file-glyph" viewBox="0 0 30 36" focusable="false">
                      <path class="file-glyph__page" d="M6 1.5h11.5L27 11v22.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V4A2.5 2.5 0 0 1 6 1.5z" />
                      <path class="file-glyph__fold" d="M17.5 1.5 27 11h-7a2.5 2.5 0 0 1-2.5-2.5z" />
                      <rect class="file-glyph__bar" x="8" y="17" width="5" height="12" rx="1.2" />
                      <rect class="file-glyph__bar" x="15" y="13" width="5" height="16" rx="1.2" />
                    </svg>
                    <b>來源檔</b>
                  </span>
                </span>
              </div>

              <div class="flight flight--emit" :class="{ 'is-live': hasReached(3) }">
                <span class="flight__unit flight__unit--ghost" style="--lag: .12s"></span>
                <span class="flight__unit flight__unit--ghost" style="--lag: .06s"></span>
                <span class="flight__unit">
                  <span class="flight__card flight__card--result flight__card--mini">
                    <svg class="file-glyph" viewBox="0 0 30 36" focusable="false">
                      <path class="file-glyph__page" d="M6 1.5h11.5L27 11v22.5a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V4A2.5 2.5 0 0 1 6 1.5z" />
                      <path class="file-glyph__fold" d="M17.5 1.5 27 11h-7a2.5 2.5 0 0 1-2.5-2.5z" />
                      <path class="file-glyph__spark" d="M8 27l4.5-6 4 3.5 5.5-8" fill="none" />
                    </svg>
                    <b>成果</b>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>

      <ol class="environment-demo__progress" aria-label="目前流程進度">
        <li
          v-for="(step, index) in flow.steps"
          :key="step"
          :class="{ 'is-current': isActive(index), 'is-complete': activeStep > index }"
        >
          <span><CheckIcon v-if="activeStep > index" aria-hidden="true" /><template v-else>{{ index + 1 }}</template></span>
          <small>{{ step }}</small>
        </li>
      </ol>

      <footer :class="{ 'is-visible': activeStep >= flow.steps.length - 1 }">
        <strong>{{ selected === 'chatgpt' ? '需要交接' : '同一個環境完成' }}</strong>
        <p>{{ flow.result }}</p>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.environment-demo {
  width: 100%;
  max-width: 940px;
  margin-top: 28px;
  container: envdemo / inline-size;
}

.environment-demo__heading,
.environment-demo__stage-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.environment-demo__heading {
  margin-bottom: 16px;
}

.environment-demo__heading h3,
.environment-demo__heading p,
.environment-demo__stage-header h3,
.environment-demo__stage-header p {
  margin: 0;
}

.environment-demo__heading h3 {
  color: #242423;
  font-size: 19px;
  line-height: 1.45;
}

.environment-demo__heading p {
  margin-top: 6px;
  color: #74736f;
  font-size: 15px;
  line-height: 1.6;
}

.environment-demo__heading > span {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  padding: 8px 11px;
  border: 1px solid #deddd8;
  border-radius: 999px;
  color: #6e6d69;
  font-size: 12.5px;
  font-weight: 700;
}

.environment-demo__heading > span svg {
  width: 16px;
}

.environment-demo__selector {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.environment-demo__selector button {
  display: grid;
  min-width: 0;
  grid-template-columns: 44px minmax(0, 1fr) 24px;
  align-items: center;
  gap: 13px;
  padding: 13px 15px;
  border: 1px solid #deddd8;
  border-radius: 14px;
  color: #2a2927;
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease;
}

.environment-demo__selector button:hover {
  border-color: #aaa9a4;
  box-shadow: 0 8px 18px rgb(30 36 42 / 8%);
  transform: translateY(-1px);
}

.environment-demo__selector button:focus-visible {
  outline: 3px solid rgb(22 119 210 / 24%);
  outline-offset: 2px;
}

.environment-demo__selector button.is-selected {
  border-color: #1677d2;
  background: #f7fbff;
  box-shadow: inset 0 0 0 1px rgb(22 119 210 / 18%);
}

.environment-demo__selector img {
  width: 44px;
  height: 44px;
  margin: 0;
  object-fit: contain;
}

.environment-demo__selector span,
.environment-demo__selector strong,
.environment-demo__selector small {
  display: block;
}

.environment-demo__selector strong {
  font-size: 17px;
  line-height: 1.35;
}

.environment-demo__selector small {
  margin-top: 3px;
  color: #74736f;
  font-size: 12.5px;
  line-height: 1.45;
}

.environment-demo__selector button > svg {
  width: 20px;
  color: #1677d2;
}

.environment-demo__stage {
  overflow: hidden;
  padding: clamp(22px, 3.5vw, 32px);
  border: 1px solid #e1e0dc;
  border-radius: 22px;
  background: #f7f7f5;
}

.environment-demo__stage-header {
  margin-bottom: 24px;
}

.environment-demo__stage-header > div {
  max-width: 650px;
}

.environment-demo__stage-header span {
  display: block;
  margin-bottom: 8px;
  color: #1677d2;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: .06em;
}

.environment-demo__stage-header h3 {
  color: #232321;
  font-size: clamp(20px, 2.5vw, 27px);
  line-height: 1.3;
  letter-spacing: -.02em;
}

.environment-demo__stage-header p {
  margin-top: 9px;
  color: #686762;
  font-size: 14.5px;
  line-height: 1.65;
}

.environment-demo__stage-header em {
  flex: 0 0 auto;
  padding: 7px 10px;
  border-radius: 999px;
  color: #65645f;
  background: #e9e8e4;
  font-size: 12px;
  font-style: normal;
  white-space: nowrap;
}

/* ---------- scene shell ---------- */

.environment-scene {
  position: relative;
  display: grid;
  align-items: center;
  min-height: 420px;
  padding: 32px;
  overflow: hidden;
  border: 1px solid #deddd8;
  border-radius: 18px;
  background:
    radial-gradient(120% 88% at 78% 16%, #f4f9fe 0%, rgb(244 249 254 / 0%) 58%),
    #fff;
}

.scene-grain {
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  color: #26384a;
  opacity: .05;
  pointer-events: none;
}

.scene-grain circle {
  fill: currentColor;
}

.chatgpt-scene {
  grid-template-columns: minmax(224px, .86fr) 86px minmax(248px, 1fr);
  grid-template-rows: auto auto;
  gap: 16px 20px;
}

.codex-scene {
  grid-template-columns: 132px minmax(150px, .54fr) minmax(396px, 1fr);
  gap: 20px;
}

/* ---------- persona ---------- */

.scene-person {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  text-align: center;
}

.chatgpt-scene .scene-person {
  grid-column: 1;
  grid-row: 1;
  align-self: end;
}

.persona {
  width: clamp(92px, 10.4vw, 116px);
  height: auto;
  overflow: visible;
}

.persona__shadow {
  fill: #26384a;
  opacity: .22;
  transform-box: fill-box;
  transform-origin: center;
  animation: persona-shadow 3.9s ease-in-out infinite alternate;
}

.persona__figure {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: persona-idle 3.9s ease-in-out infinite alternate;
}

.persona__jawshade {
  fill: #c79b7e;
  opacity: .5;
}

.persona__form {
  fill: url(#cxdPersonaForm);
}

.persona__neckline {
  fill: none;
  stroke: rgb(255 255 255 / 40%);
  stroke-width: 2.4;
  stroke-linecap: round;
}

.persona__eye {
  fill: #3b3a44;
}

.persona__smile {
  fill: none;
  stroke: #b97f63;
  stroke-width: 1.5;
  stroke-linecap: round;
  opacity: .85;
}

.persona__hairlight {
  fill: #fff;
  opacity: .14;
}

.scene-person.is-speaking .persona__figure {
  animation: persona-lean .9s ease-in-out infinite alternate;
}

.scene-person strong {
  margin-top: 10px;
  color: #222220;
  font-size: 17px;
}

.scene-person small {
  max-width: 150px;
  margin-top: 4px;
  color: #7a7974;
  font-size: 12.5px;
  line-height: 1.4;
}

@keyframes persona-idle {
  from { transform: translateY(0) }
  to { transform: translateY(-2.6px) }
}

@keyframes persona-lean {
  from { transform: translateY(-1px) rotate(-1.4deg) }
  to { transform: translateY(-3.4px) rotate(1.4deg) }
}

@keyframes persona-shadow {
  from { opacity: .12; transform: scale(1) }
  to { opacity: .08; transform: scale(.92) }
}

/* ---------- device ---------- */

.scene-device {
  position: relative;
  z-index: 2;
  min-width: 0;
  border: 2px solid #273a4b;
  border-radius: 16px;
  background: linear-gradient(180deg, #fbfdfe 0%, #f1f6f9 100%);
  box-shadow: 0 14px 30px rgb(38 56 73 / 11%);
}

.scene-device__label {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 15px;
  border-bottom: 1px solid #d9e0e5;
  color: #354b60;
  font-size: 12.5px;
  font-weight: 800;
}

.scene-device__label svg {
  width: 19px;
}

.scene-device--compact {
  grid-column: 1;
  grid-row: 2;
  align-self: start;
  min-height: 206px;
  padding: 0 16px 16px;
}

.scene-device--compact .scene-device__label {
  margin: 0 -16px 14px;
}

.scene-file,
.scene-download,
.scene-project,
.scene-tools,
.scene-dashboard {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;
  color: #31465a;
  background: #fff;
}

.scene-file,
.scene-download,
.scene-device--compact .scene-project {
  margin-top: 9px;
  padding: 11px 12px;
  border: 1px solid #dce3e8;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
}

.scene-file svg,
.scene-download svg,
.scene-project svg,
.scene-tools svg,
.scene-dashboard svg {
  flex: 0 0 auto;
  width: 22px;
}

.scene-file--excel {
  color: #217a52;
  transition: opacity .3s ease;
}

.scene-file--excel.is-muted {
  opacity: .42;
}

.scene-download,
.scene-device--compact .scene-project,
.scene-tools,
.scene-dashboard {
  opacity: .32;
  transform: translateY(5px);
  transition: opacity .35s ease, transform .35s ease, border-color .35s ease, background-color .35s ease;
}

.scene-download.is-visible,
.scene-device--compact .scene-project.is-visible,
.scene-tools.is-visible,
.scene-dashboard.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.scene-download.is-active,
.scene-device--compact .scene-project.is-active,
.scene-tools.is-active,
.scene-dashboard.is-active {
  border-color: #1677d2;
  background: #eef7ff;
  animation: tile-land .5s cubic-bezier(.22, 1.4, .4, 1) 1;
}

@keyframes tile-land {
  0% { transform: scale(.94) }
  55% { transform: scale(1.035) }
  100% { transform: scale(1) }
}

/* ---------- network boundary ---------- */

.scene-separator {
  position: relative;
  z-index: 2;
  display: grid;
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: stretch;
  place-items: center;
}

.scene-separator__line {
  position: absolute;
  top: 2%;
  bottom: 2%;
  left: 50%;
  border-left: 1px dashed #b9c6d2;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent);
}

.scene-separator__chip {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 10px 8px;
  border: 1px solid #dde5ec;
  border-radius: 999px;
  color: #7c8b99;
  background: #fff;
  box-shadow: 0 4px 12px rgb(38 66 94 / 8%);
  font-size: 11px;
  font-weight: 800;
}

.scene-separator__chip svg {
  width: 19px;
}

/* ---------- cloud ---------- */

.scene-cloud {
  position: relative;
  z-index: 2;
  display: grid;
  grid-column: 3;
  grid-row: 1 / span 2;
  min-height: 296px;
  place-items: center;
}

.scene-cloud::before {
  position: absolute;
  z-index: 0;
  width: 58%;
  aspect-ratio: 1;
  border-radius: 50%;
  opacity: 0;
  background: radial-gradient(circle, rgb(22 119 210 / 24%) 0%, rgb(22 119 210 / 0%) 68%);
  content: '';
  transition: opacity .4s ease;
}

.scene-cloud.is-working::before {
  opacity: 1;
  animation: glow-breathe 1.5s ease-in-out infinite alternate;
}

@keyframes glow-breathe {
  from { transform: scale(.88) }
  to { transform: scale(1.1) }
}

.cloud {
  position: absolute;
  z-index: 1;
  width: min(112%, 396px);
  height: auto;
  overflow: visible;
  animation: cloud-drift 9.5s ease-in-out infinite alternate;
}

.cloud__back {
  opacity: .8;
  transform-box: fill-box;
  transform-origin: center;
  animation: cloud-drift-back 11s ease-in-out infinite alternate;
}

.cloud__rim {
  stroke: #fff;
  stroke-width: 3.4;
  stroke-linecap: round;
  opacity: .92;
}

@keyframes cloud-drift {
  from { transform: translate3d(-5px, 3px, 0) }
  to { transform: translate3d(5px, -3px, 0) }
}

@keyframes cloud-drift-back {
  from { transform: translateX(5px) }
  to { transform: translateX(-5px) }
}

.scene-cloud__content {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  margin-top: 15%;
  text-align: center;
}

.scene-cloud__content > span {
  color: #65788a;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: .05em;
}

.scene-cloud__content img,
.scene-codex img {
  width: 56px;
  height: 56px;
  margin: 10px 0 7px;
  object-fit: contain;
  filter: drop-shadow(0 5px 12px rgb(29 59 88 / 16%));
}

.scene-cloud__content strong,
.scene-codex strong {
  color: #222220;
  font-size: 17px;
}

.scene-cloud__content small,
.scene-codex small {
  margin-top: 5px;
  color: #6d7c89;
  font-size: 12px;
}

.cloud-thinking {
  display: flex;
  gap: 5px;
  height: 0;
  margin-top: 0;
  opacity: 0;
  transition: opacity .25s ease, height .25s ease, margin-top .25s ease;
}

.is-working .cloud-thinking {
  height: 6px;
  margin-top: 11px;
  opacity: 1;
}

.cloud-thinking b {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1677d2;
}

.is-working .cloud-thinking b {
  animation: think-bounce 1s ease-in-out infinite;
}

.cloud-thinking b:nth-child(2) { animation-delay: .14s }
.cloud-thinking b:nth-child(3) { animation-delay: .28s }

@keyframes think-bounce {
  0%, 60%, 100% { opacity: .3; transform: translateY(0) }
  30% { opacity: 1; transform: translateY(-4px) }
}

/* ---------- file flight ---------- */

.flight-layer {
  position: absolute;
  z-index: 5;
  inset: 0;
  pointer-events: none;
}

.flight {
  --dur: 1.95s;

  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity .32s ease;
}

.flight.is-live {
  opacity: 1;
}

.flight__unit {
  position: absolute;
  animation-duration: var(--dur), var(--dur);
  animation-fill-mode: both, both;
  animation-iteration-count: 1, 1;
  animation-play-state: paused;
  animation-timing-function: ease-out, ease-in-out;
  transform: translate(-50%, -50%);
}

.flight__unit--ghost {
  width: 30px;
  height: 34px;
  border-radius: 8px;
  background: rgb(22 119 210 / 10%);
  animation-delay: var(--lag), var(--lag);
}

.flight__unit--ghost:first-child {
  background: rgb(22 119 210 / 5%);
  transform: translate(-50%, -50%) scale(.8);
}

.flight.is-live .flight__unit,
.flight.is-live .flight__card {
  animation-play-state: running;
}

.flight__card {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px 9px 10px;
  border: 1px solid #cddeeb;
  border-radius: 12px;
  color: #1a5b98;
  background: linear-gradient(180deg, #fff 0%, #f4f9fd 100%);
  box-shadow: 0 10px 22px rgb(22 66 110 / 18%), 0 2px 5px rgb(22 66 110 / 10%);
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
  animation: fly-pop var(--dur) ease-out both;
  animation-play-state: paused;
}

.flight__card--mini {
  padding: 7px 11px 7px 8px;
  border-radius: 10px;
  font-size: 11px;
}

.flight__card b {
  font-weight: 800;
}

.file-glyph {
  flex: 0 0 auto;
  width: 22px;
  height: 26px;
}

.flight__card--mini .file-glyph {
  width: 18px;
  height: 22px;
}

.file-glyph__page {
  fill: #fff;
  stroke: #9fb8cc;
  stroke-width: 1.5;
}

.file-glyph__fold {
  fill: #dfe9f2;
}

.flight__card--excel {
  border-color: #bfe0cd;
  color: #16724c;
}

.flight__card--excel .file-glyph__page { stroke: #86bfa2 }
.flight__card--excel .file-glyph__fold { fill: #d7efe2 }
.flight__card--excel .file-glyph__bar { fill: #2f9568 }

.flight__card--result .file-glyph__spark {
  stroke: #1677d2;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes fly-pop {
  0% { transform: rotate(-11deg) scale(.62) }
  12% { transform: rotate(-6deg) scale(1.04) }
  44% { transform: rotate(4deg) scale(1) }
  56%, 100% { transform: rotate(0deg) scale(1) }
}

.flight--upload .flight__unit { animation-name: fly-up-x, fly-up-y }
.flight--download .flight__unit { animation-name: fly-dn-x, fly-dn-y }
.flight--read .flight__unit { animation-name: fly-rd-x, fly-rd-y }
.flight--emit .flight__unit { animation-name: fly-em-x, fly-em-y }

.flight--emit.is-live {
  animation: fly-exit .5s ease-in calc(var(--dur) + .5s) both;
}

@keyframes fly-exit {
  from { opacity: 1 }
  to { opacity: 0 }
}

@keyframes fly-up-x { 0% { left: 25% } 56%, 100% { left: 71% } }
@keyframes fly-up-y {
  0% { top: 62% }
  27% { top: 15% }
  56%, 100% { top: 35% }
}

@keyframes fly-dn-x { 0% { left: 70% } 56%, 100% { left: 27% } }
@keyframes fly-dn-y {
  0% { top: 40% }
  27% { top: 86% }
  56%, 100% { top: 71% }
}

@keyframes fly-rd-x { 0% { left: 27% } 56%, 100% { left: 73% } }
@keyframes fly-rd-y {
  0% { top: 40% }
  27% { top: 21% }
  56%, 100% { top: 39% }
}

@keyframes fly-em-x {
  0% { left: 74% }
  28% { left: 87% }
  56%, 100% { left: 72% }
}
@keyframes fly-em-y { 0% { top: 42% } 56%, 100% { top: 73% } }

/* ---------- codex workspace ---------- */

.scene-instruction {
  position: relative;
  z-index: 2;
  grid-column: 2;
  opacity: .25;
  transform: translateX(-10px);
  transition: opacity .38s ease, transform .38s ease;
}

.scene-instruction.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.scene-instruction.is-active {
  animation: instruction-nudge .9s ease-in-out infinite alternate;
}

.scene-instruction span {
  position: relative;
  display: block;
  padding: 14px 16px;
  border: 1px solid #d7e3ee;
  border-radius: 15px;
  color: #3d5266;
  background: #fff;
  box-shadow: 0 8px 18px rgb(38 66 94 / 10%);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.55;
}

.scene-instruction span::before,
.scene-instruction span::after {
  position: absolute;
  top: 24px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 0;
  content: '';
}

.scene-instruction span::before {
  left: -9px;
  border-right-color: #d7e3ee;
}

.scene-instruction span::after {
  left: -8px;
  border-right-color: #fff;
}

@keyframes instruction-nudge {
  from { transform: translateX(-3px) }
  to { transform: translateX(3px) }
}

.scene-device--workspace {
  grid-column: 3;
  min-height: 320px;
  padding: 0 18px 18px;
}

.scene-device--workspace .scene-device__label {
  margin: 0 -16px 16px;
}

.workspace-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.workspace-grid > div {
  position: relative;
  min-height: 108px;
  padding: 14px;
  overflow: hidden;
  border: 1px solid #dce3e8;
  border-radius: 11px;
}

.scene-project--source,
.scene-dashboard {
  display: grid;
  grid-template-columns: 23px minmax(0, 1fr);
  align-content: center;
}

.scene-project--source span,
.scene-dashboard span {
  font-size: 13.5px;
  font-weight: 800;
}

.scene-project--source small,
.scene-dashboard small {
  grid-column: 2;
  color: #777671;
  font-size: 12px;
}

.scene-project--source.is-active {
  border-color: #2f9568;
  background: #f0fbf6;
}

.scene-codex {
  display: grid;
  justify-items: center;
  align-content: center;
  color: #354b60;
  background: #fff;
  text-align: center;
}

.scene-codex img {
  margin: 0 0 6px;
}

.scene-codex.is-working {
  border-color: #1677d2;
  background: #f6fbff;
}

.scene-codex.is-working::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, rgb(22 119 210 / 0%) 34%, rgb(22 119 210 / 13%) 50%, rgb(22 119 210 / 0%) 66%);
  background-size: 260% 100%;
  content: '';
  animation: codex-scan 1.8s linear infinite;
  pointer-events: none;
}

@keyframes codex-scan {
  from { background-position: 160% 0 }
  to { background-position: -60% 0 }
}

.scene-tools {
  display: grid;
  align-content: center;
  gap: 7px;
}

.scene-tools span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 700;
}

.scene-tools svg {
  width: 19px;
}

/* ---------- progress + footer ---------- */

.environment-demo__progress {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.environment-demo__progress li {
  position: relative;
  display: grid;
  min-width: 0;
  justify-items: center;
  gap: 7px;
  margin: 0;
  color: #96958f;
  text-align: center;
}

.environment-demo__progress li::before {
  position: absolute;
  z-index: 0;
  top: 15px;
  right: 50%;
  left: -50%;
  height: 1px;
  background: #d8d7d2;
  content: '';
}

.environment-demo__progress li:first-child::before {
  display: none;
}

.environment-demo__progress li > span {
  z-index: 1;
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border: 1px solid #d7d6d1;
  border-radius: 50%;
  background: #f7f7f5;
  font-size: 12px;
  font-weight: 800;
  transition: background-color .25s ease, border-color .25s ease, color .25s ease;
}

.environment-demo__progress li > span svg {
  width: 16px;
}

.environment-demo__progress li.is-current,
.environment-demo__progress li.is-complete {
  color: #1677d2;
}

.environment-demo__progress li.is-current > span,
.environment-demo__progress li.is-complete > span {
  border-color: #1677d2;
  color: #fff;
  background: #1677d2;
}

.environment-demo__progress li.is-current > span {
  box-shadow: 0 0 0 5px rgb(22 119 210 / 14%);
}

.environment-demo__progress small {
  font-size: 12px;
  line-height: 1.4;
}

.environment-demo__stage > footer {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 17px;
  padding: 13px 15px;
  border-radius: 11px;
  opacity: .4;
  background: #e9e8e4;
  transition: opacity .3s ease, background-color .3s ease;
}

.environment-demo__stage > footer.is-visible {
  opacity: 1;
  background: #e9f4fd;
}

.environment-demo__stage > footer strong,
.environment-demo__stage > footer p {
  margin: 0;
}

.environment-demo__stage > footer strong {
  flex: 0 0 auto;
  color: #1267b5;
  font-size: 13px;
}

.environment-demo__stage > footer p {
  color: #40566a;
  font-size: 13.5px;
  line-height: 1.55;
}

/* ---------- responsive ---------- */

@container envdemo (max-width: 740px) {
  .chatgpt-scene {
    grid-template-columns: minmax(196px, .92fr) 66px minmax(208px, 1fr);
    gap: 14px 12px;
    padding: 24px 18px;
  }

  .codex-scene {
    grid-template-columns: 104px minmax(128px, .5fr) minmax(330px, 1fr);
    gap: 14px;
    padding: 24px 18px;
  }

  .scene-cloud { min-height: 260px }
}

@container envdemo (max-width: 600px) {
  .environment-demo__heading,
  .environment-demo__stage-header {
    display: grid;
  }

  .environment-demo__heading > span,
  .environment-demo__stage-header em {
    justify-self: start;
  }

  .environment-scene {
    min-height: 0;
  }

  .chatgpt-scene,
  .codex-scene {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .chatgpt-scene .scene-person,
  .scene-device--compact,
  .scene-separator,
  .scene-cloud,
  .scene-instruction,
  .scene-device--workspace {
    grid-column: 1;
    grid-row: auto;
    align-self: auto;
  }

  .scene-device--compact {
    width: 100%;
  }

  .scene-separator {
    min-height: 56px;
  }

  .scene-separator__line {
    top: 50%;
    right: 2%;
    bottom: auto;
    left: 2%;
    border-top: 1px dashed #b9c6d2;
    border-left: 0;
    -webkit-mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent);
  }

  .scene-separator__chip {
    flex-direction: row;
    gap: 5px;
    padding: 6px 12px;
  }

  .scene-cloud {
    min-height: 228px;
  }

  .scene-cloud__content {
    margin-top: 12%;
  }

  .scene-instruction {
    justify-self: center;
    max-width: 280px;
  }

  .scene-instruction span::before,
  .scene-instruction span::after {
    top: -9px;
    left: 28px;
    border: 8px solid transparent;
    border-top: 0;
  }

  .scene-instruction span::before { border-bottom-color: #d7e3ee }
  .scene-instruction span::after { top: -8px; border-bottom-color: #fff }

  .flight--upload .flight__unit { animation-name: fly-up-x-s, fly-up-y-s }
  .flight--download .flight__unit { animation-name: fly-dn-x-s, fly-dn-y-s }

  @keyframes fly-up-x-s {
    0% { left: 32% }
    50% { left: 76% }
    100% { left: 52% }
  }
  @keyframes fly-up-y-s { from { top: 31% } to { top: 76% } }

  @keyframes fly-dn-x-s {
    0% { left: 58% }
    50% { left: 20% }
    100% { left: 33% }
  }
  @keyframes fly-dn-y-s { from { top: 76% } to { top: 41% } }
}

@container envdemo (max-width: 470px) {
  .environment-demo__selector {
    grid-template-columns: 1fr;
  }

  .environment-demo__stage {
    padding: 18px 14px;
    border-radius: 17px;
  }

  .environment-scene {
    padding: 20px 14px;
  }

  .workspace-grid {
    grid-template-columns: 1fr;
  }

  .flight--read .flight__unit { animation-name: fly-rd-x-s, fly-rd-y-s }
  .flight--emit .flight__unit { animation-name: fly-em-x-s, fly-em-y-s }

  @keyframes fly-rd-x-s {
    0% { left: 30% }
    50% { left: 66% }
    100% { left: 38% }
  }
  @keyframes fly-rd-y-s { from { top: 22% } to { top: 44% } }

  @keyframes fly-em-x-s {
    0% { left: 38% }
    50% { left: 74% }
    100% { left: 42% }
  }
  @keyframes fly-em-y-s { from { top: 46% } to { top: 88% } }

  .environment-demo__progress small {
    font-size: 10px;
  }

  .environment-demo__stage > footer {
    display: grid;
    gap: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .environment-demo *,
  .environment-demo *::before,
  .environment-demo *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
</style>
