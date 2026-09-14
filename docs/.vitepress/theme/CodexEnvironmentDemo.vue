<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import {
  ArrowDownTrayIcon, ArrowPathIcon, ArrowUpRightIcon, ArrowUpTrayIcon, ArrowsUpDownIcon,
  CommandLineIcon, PencilSquareIcon,
  ChatBubbleLeftEllipsisIcon, CheckIcon, ComputerDesktopIcon, CpuChipIcon,
  DocumentChartBarIcon, FolderOpenIcon, GlobeAltIcon, NoSymbolIcon, PauseIcon, PlayIcon,
  UserIcon
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
  verdict: string
}

// Leave enough time to read each step before the next handoff.
const STEP_SECONDS = 2.4

const flows: Record<FlowMode, Flow> = {
  chatgpt: {
    name: 'ChatGPT',
    role: '你下載、編修、執行',
    eyebrow: 'Chrome 裡的對話，和本機工作區是兩個環境',
    title: 'ChatGPT 給你回覆，你把工作做完',
    summary: '以一般瀏覽器對話為例：ChatGPT 在 Chrome 裡提供建議或可下載的檔案，但不會直接操作你電腦上的專案。上傳、下載、開檔編修、執行與存檔，都由你負責。',
    icon: '/images/quick-start/chatgpt-icon.webp',
    personNote: '上傳、下載，並接手後續操作',
    steps: ['你把檔案搬進 Chrome', 'ChatGPT 產生回覆', '你把成果搬回本機', '你自己編修與執行'],
    result: 'AI 的回覆已備妥；本機的編修、執行與存檔，還等你完成。',
    verdict: '等你接手操作'
  },
  codex: {
    name: 'Codex',
    role: '它直接操作，你驗收',
    eyebrow: 'Codex 收到回覆後，繼續在你的電腦動手',
    title: 'Codex 直接動手，你檢查成果',
    summary: '在你授權的工作環境裡，Codex 能讀取與修改檔案、執行程式、檢查結果，再把成果留在專案中。你交代目標，最後檢查成果，不必逐步代它操作。',
    icon: '/images/quick-start/codex-icon.webp',
    personNote: '交代目標，最後檢查成果',
    steps: ['你交代目標', 'AI 模型協助規劃', 'Codex 直接改本機檔案', 'Codex 在本機執行'],
    result: '檔案已更新，程式已執行，報表已存入專案。接下來由你檢查成果。',
    verdict: '等你檢查成果'
  }
}

const selected = ref<FlowMode>('chatgpt')
const activeStep = ref(-1)
const arrivedStep = ref(-1)
const playing = ref(false)
const paused = ref(false)
const finished = ref(false)
const localAction = ref(-1)
// ChatGPT mode: what you still have to do by hand, and whether a file is crossing the browser wall.
const manualStep = ref(-1)
const crossing = ref(false)
const root = ref<HTMLElement | null>(null)
const scene = ref<HTMLElement | null>(null)
const flow = computed(() => flows[selected.value])
const status = computed(() => finished.value ? (selected.value === 'chatgpt' ? '回覆完成，等你接手' : '執行完成，等你檢查')
  : paused.value ? '已暫停' : playing.value ? flow.value.steps[activeStep.value] ?? '準備開始' : '準備播放')

type Gsap = typeof import('gsap')['gsap']
let gsapPromise: Promise<Gsap | null> | null = null
let context: ReturnType<Gsap['context']> | null = null
let timeline: ReturnType<Gsap['timeline']> | null = null
let request = 0
let motionQuery: MediaQueryList | null = null
let resizeObserver: ResizeObserver | null = null

function loadGsap() {
  return gsapPromise ??= import('gsap').then(mod => mod.gsap).catch(() => null)
}

function clearAnimation() {
  context?.revert()
  context = null
  timeline = null
}

function complete() {
  crossing.value = false
  manualStep.value = selected.value === 'chatgpt' ? 3 : -1
  localAction.value = selected.value === 'codex' ? 3 : -1
  activeStep.value = 3
  arrivedStep.value = 3
  playing.value = false
  paused.value = false
  finished.value = true
}

// A changed layout or motion preference must not leave a token between panels.
function settle() {
  if (!playing.value) return
  request += 1
  clearAnimation()
  complete()
}

function togglePause() {
  if (!timeline) return
  paused.value = !paused.value
  timeline.paused(paused.value)
}

async function play(mode = selected.value) {
  const currentRequest = ++request
  clearAnimation()
  selected.value = mode
  manualStep.value = -1
  crossing.value = false
  localAction.value = -1
  activeStep.value = -1
  arrivedStep.value = -1
  playing.value = true
  paused.value = false
  finished.value = false
  await nextTick()
  const gsap = await loadGsap()
  if (currentRequest !== request || !scene.value || !root.value) return
  if (!gsap || motionQuery?.matches) {
    complete()
    return
  }

  const stage = scene.value
  const node = (name: string) => stage.querySelector<HTMLElement>(`[data-node="${name}"]`)!
  const bounds = stage.getBoundingClientRect()
  // Read every anchor before writing transforms. Cards keep the same dimensions during playback.
  const anchors = Object.fromEntries(Array.from(stage.querySelectorAll<HTMLElement>('[data-node]')).map(el => {
    const rect = el.getBoundingClientRect()
    return [el.dataset.node!, { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top }]
  }))

  context = gsap.context(() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onComplete: complete })
    timeline = tl
    const start = 0.2
    flow.value.steps.forEach((_, index) => {
      const at = start + index * STEP_SECONDS
      tl.addLabel(`step-${index}`, at)
      tl.call(() => { activeStep.value = index }, [], at)
      const bar = root.value!.querySelectorAll('.step-meter i')[index]
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: index === 3 ? STEP_SECONDS * 2 : STEP_SECONDS, ease: 'none' }, at)
      tl.call(() => { arrivedStep.value = index }, [], at + 1.85)
    })

    function transfer(tokenName: string, from: string, to: string, at: number, duration = 1.45) {
      const token = stage.querySelector<HTMLElement>(`[data-token="${tokenName}"]`)!
      const a = anchors[from]
      const b = anchors[to]
      const travel = gsap.timeline()
      travel.set(token, { x: a.x, y: a.y, xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.96 })
        .to(token, { autoAlpha: 1, scale: 1, duration: 0.2 }, 0)
        .to(token, { x: b.x, y: b.y, duration, ease: 'power2.inOut' }, 0.08)
        .to(token, { autoAlpha: 0, scale: 0.96, duration: 0.22 }, duration - 0.08)
      tl.add(travel, at)
    }

    function illuminate(name: string, at: number) {
      tl.fromTo(node(name), { opacity: 0.6 }, { opacity: 1, duration: 0.65, immediateRender: false }, at)
    }

    if (mode === 'chatgpt') {
      // Two legs each way: you carry the file across the browser wall, the network only moves it after that.
      const cross = (from: number, to: number) => {
        tl.call(() => { crossing.value = true }, [], from)
        tl.call(() => { crossing.value = false }, [], to)
      }
      transfer('lift', 'source', 'browser', start + 0.2, 0.85)
      cross(start + 0.2, start + 1.1)
      transfer('upload', 'browser', 'remote', start + 1.2, 0.85)
      illuminate('remote', start + STEP_SECONDS)
      transfer('browser-download', 'remote', 'browser', start + STEP_SECONDS * 2 + 0.05, 0.8)
      transfer('drop', 'browser', 'download', start + STEP_SECONDS * 2 + 1.0, 0.85)
      cross(start + STEP_SECONDS * 2 + 1.0, start + STEP_SECONDS * 2 + 1.9)
      illuminate('manual', start + STEP_SECONDS * 3)
      ;[0.2, 1.3, 2.5, 3.7].forEach((offset, index) => {
        tl.call(() => { manualStep.value = index }, [], start + STEP_SECONDS * 3 + offset)
      })
    } else {
      illuminate('agent', start + 0.45)
      transfer('send', 'agent', 'remote', start + STEP_SECONDS + 0.05, 0.95)
      transfer('reply', 'remote', 'agent', start + STEP_SECONDS + 1.25, 0.95)
      transfer('write', 'agent', 'folder', start + STEP_SECONDS * 2 + 0.15, 1.2)
      tl.call(() => { localAction.value = 0 }, [], start + STEP_SECONDS * 2)
      tl.call(() => { localAction.value = 1 }, [], start + STEP_SECONDS * 2 + 1.65)
      illuminate('execution', start + STEP_SECONDS * 3)
      tl.call(() => { localAction.value = 2 }, [], start + STEP_SECONDS * 3)
      tl.call(() => { localAction.value = 3 }, [], start + STEP_SECONDS * 3 + 2.6)
    }
    tl.fromTo('.remote-lines i', { scaleX: 0.15, opacity: 0.35 }, {
      scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.22, ease: 'power2.out', immediateRender: false
    }, start + STEP_SECONDS)
    tl.play()
  }, root.value)
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', settle)
  if (!motionQuery.matches) void loadGsap()
  let width = scene.value?.getBoundingClientRect().width
  resizeObserver = new ResizeObserver(entries => {
    const nextWidth = entries[0].contentRect.width
    if (width !== undefined && Math.abs(nextWidth - width) > 1) settle()
    width = nextWidth
  })
  if (scene.value) resizeObserver.observe(scene.value)
})

onBeforeUnmount(() => {
  request += 1
  clearAnimation()
  motionQuery?.removeEventListener('change', settle)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div ref="root" class="environment-demo" :class="`mode-${selected}`">
    <div class="environment-demo__heading">
      <h3>AI 回覆之後，誰把工作做完？</h3>
      <p>同樣是「整理資料並產出報表」，看看接下來由誰操作。</p>
    </div>

    <div class="environment-demo__selector" role="group" aria-label="選擇要播放的工作流程">
      <button v-for="(item, mode) in flows" :key="mode" type="button"
        :class="{ 'is-selected': selected === mode }" :aria-pressed="selected === mode" @click="play(mode)">
        <img :src="withBase(item.icon)" alt="" width="32" height="32" aria-hidden="true">
        <span><strong>{{ item.name }}</strong><small>{{ item.role }}</small></span>
        <ArrowUpRightIcon aria-hidden="true" />
      </button>
    </div>

    <section class="environment-demo__stage" :aria-label="`${flow.name} 工作流程`">
      <header class="environment-demo__stage-header">
        <h3>{{ flow.title }}</h3>
      </header>

      <div ref="scene" class="environment-scene" :class="{ 'is-playing': playing && !paused }">
        <div class="scene-human" :class="{ 'is-active': selected === 'chatgpt' ? activeStep !== 1 : activeStep === 0 || finished }">
          <span class="human-summary__icon"><UserIcon aria-hidden="true" /></span>
          <strong>你</strong>
          <ul v-if="selected === 'chatgpt'" aria-label="你需要做的事情">
            <li :class="{ 'is-active': activeStep === 0 }">搬進 Chrome</li>
            <li :class="{ 'is-active': activeStep === 2 }">搬回本機</li>
            <li :class="{ 'is-active': activeStep === 3 }">編修、執行<small>存檔</small></li>
          </ul>
          <ul v-else aria-label="你需要做的事情">
            <li :class="{ 'is-active': activeStep === 0 }">交代目標</li>
            <li :class="{ 'is-active': finished }">驗收成果</li>
          </ul>
          <span class="human-connection" aria-hidden="true">→</span>
        </div>
        <div class="scene-local">
          <div class="scene-panel scene-device">
            <div class="panel-label"><ComputerDesktopIcon aria-hidden="true" /><span>你的電腦</span><small v-if="selected === 'codex'">本機環境</small></div>
            <template v-if="selected === 'chatgpt'">
              <div class="panel-body chatgpt-local-stack">
                <div data-node="browser" class="chrome-window" :class="{ 'is-active': activeStep >= 0 && activeStep <= 2 }">
                  <div class="chrome-window__bar">
                    <span class="chrome-mark" aria-hidden="true"></span>
                    <strong>Chrome</strong>
                    <span class="operator-pill" :class="{ 'is-active': activeStep === 0 || activeStep === 2 }">你操作</span>
                  </div>
                  <div class="chrome-window__tab">
                    <img :src="withBase(flows.chatgpt.icon)" alt="" width="24" height="24" aria-hidden="true">
                    <span><strong>ChatGPT 對話</strong><small>{{ activeStep === 1 ? '正在產生回覆…' : arrivedStep >= 1 ? '回覆已備妥' : '等待你上傳檔案' }}</small></span>
                  </div>
                </div>

                <div class="browser-local-boundary" :class="{ 'is-active': crossing }">
                  <NoSymbolIcon aria-hidden="true" />
                  <span><strong>ChatGPT 只到瀏覽器為止</strong><small>下面的本機檔案它看不到、也改不了；這條線每次都要你自己跨</small></span>
                </div>

                <div data-node="manual" class="local-workspace" :class="{ 'is-active': activeStep === 3 }">
                  <div class="local-workspace__label"><ComputerDesktopIcon aria-hidden="true" /><strong>本機檔案</strong><small>ChatGPT 看不到</small></div>
                  <div class="local-file-grid">
                    <div data-node="source" class="file-row source-row" :class="{ 'is-active': activeStep === 0 }">
                      <DocumentChartBarIcon aria-hidden="true" />
                      <span><strong>原始檔案</strong></span>
                    </div>
                    <div data-node="download" class="file-row file-row--pending" :class="{ 'is-arrived': arrivedStep >= 2, 'is-active': activeStep === 2 }">
                      <DocumentChartBarIcon aria-hidden="true" /><span><strong>成果檔案</strong><small>{{ arrivedStep >= 2 ? '已回到本機' : '尚未產生' }}</small></span>
                    </div>
                  </div>
                </div>

                <div class="manual-work" :class="{ 'is-handoff': activeStep === 3 }">
                  <div class="operator-label"><UserIcon aria-hidden="true" /><strong>剩下的你自己做</strong><span>ChatGPT 幫不上</span></div>
                  <ul class="manual-tasks">
                    <li :class="{ 'is-done': manualStep >= 0 }"><FolderOpenIcon aria-hidden="true" />開啟檔案</li>
                    <li :class="{ 'is-done': manualStep >= 1 }"><PencilSquareIcon aria-hidden="true" />照著修改</li>
                    <li :class="{ 'is-done': manualStep >= 2 }"><CommandLineIcon aria-hidden="true" />自己執行</li>
                    <li :class="{ 'is-done': manualStep >= 3 }"><CheckIcon aria-hidden="true" />另存結果</li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="panel-body">
                <div data-node="agent" class="file-row agent-row" :class="{ 'is-arrived': activeStep >= 0 }">
                  <img :src="withBase(flows.codex.icon)" alt="" width="30" height="30" aria-hidden="true">
                  <span><strong>Codex 執行</strong><small>直接編修、執行、存檔</small></span>
                  <span class="operator-pill operator-pill--codex" :class="{ 'is-active': localAction >= 0 }">它操作</span>
                </div>

                <div class="local-direct-link" :class="{ 'is-active': localAction >= 0 }">
                  <ArrowsUpDownIcon aria-hidden="true" />
                  <span><strong>沒有瀏覽器擋在中間</strong><small>Codex 就在本機，和你看的是同一批檔案，可以直接讀寫</small></span>
                </div>
                <div data-node="folder" class="workspace-folder" :class="{ 'is-arrived': localAction >= 1 }">
                  <strong><FolderOpenIcon aria-hidden="true" /> 你的專案 <small>{{ localAction >= 1 ? '已儲存修改' : '等待編修' }}</small></strong>
                  <span><DocumentChartBarIcon aria-hidden="true" /> 來源檔案 <b>{{ localAction >= 1 ? '已更新' : localAction === 0 ? '編修中…' : '待整理' }}</b></span>
                  <span :class="{ 'report-ready': localAction >= 3 }"><DocumentChartBarIcon aria-hidden="true" /> report.xlsx <b>{{ localAction >= 3 ? '已產生' : '等待執行' }}</b></span>
                </div>
                <div data-node="execution" class="local-execution" :class="{ 'is-running': localAction === 2, 'is-done': localAction >= 3 }">
                  <div class="operator-label"><CommandLineIcon aria-hidden="true" /><strong>本機執行</strong><span>由 Codex 操作</span></div>
                  <code><span>$</span> python report.py</code>
                  <p><CheckIcon v-if="localAction >= 3" aria-hidden="true" /><span v-else class="execution-dot"></span>{{ localAction >= 3 ? '執行成功 · 報表已存入專案' : localAction === 2 ? '正在執行，檢查輸出結果…' : '等待 Codex 執行報表程式' }}</p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="scene-network" aria-hidden="true">
          <span class="network-line"></span>
          <span class="network-symbol"><GlobeAltIcon /></span>
          <small>網路</small>
        </div>

        <div class="scene-remote">
          <div data-node="remote" class="scene-panel remote-panel" :class="{ 'is-working': playing && !paused && activeStep === 1 }">
            <div class="panel-label"><GlobeAltIcon aria-hidden="true" /><span>遠端服務</span><small>雲端</small></div>
            <div class="remote-body">
              <span class="remote-symbol">
                <img v-if="selected === 'chatgpt'" :src="withBase(flows.chatgpt.icon)" alt="" width="44" height="44" aria-hidden="true">
                <CpuChipIcon v-else aria-hidden="true" />
              </span>
              <strong>{{ selected === 'chatgpt' ? 'ChatGPT' : '遠端 AI 模型' }}</strong>
              <small>{{ selected === 'chatgpt' ? '提供建議與可下載的檔案' : '協助規劃下一步操作' }}</small>
              <div class="remote-lines" aria-hidden="true"><i></i><i></i><i></i></div>
              <span class="remote-state" :class="{ 'is-thinking': activeStep === 1 && playing && !paused }"><i :class="{ 'is-active': activeStep === 1 && playing && !paused }"></i>{{ activeStep === 1 ? (paused ? '思考已暫停' : '思考中…') : arrivedStep >= 1 ? '回覆完成' : '等待需求' }}</span>
            </div>
          </div>
        </div>

        <div class="flight-layer" aria-hidden="true">
          <template v-if="selected === 'chatgpt'">
            <span data-token="lift" class="flight-token flight-token--hand"><ArrowUpTrayIcon /> 你上傳檔案</span>
            <span data-token="upload" class="flight-token"><DocumentChartBarIcon /> 你的檔案</span>
            <span data-token="browser-download" class="flight-token"><DocumentChartBarIcon /> 回覆與成果</span>
            <span data-token="drop" class="flight-token flight-token--hand"><ArrowDownTrayIcon /> 你另存到本機</span>
          </template>
          <template v-else>
            <span data-token="send" class="flight-token"><ChatBubbleLeftEllipsisIcon /> 你的需求</span>
            <span data-token="reply" class="flight-token"><ChatBubbleLeftEllipsisIcon /> 模型回覆</span>
            <span data-token="write" class="flight-token"><PencilSquareIcon /> Codex 修改並儲存</span>
          </template>
        </div>
      </div>

      <div class="playback-bar">
        <span class="playback-status" role="status"><i :class="{ 'is-active': playing && !paused }"></i>{{ status }}</span>
        <div>
          <button v-if="playing" type="button" :aria-label="paused ? '繼續動畫' : '暫停動畫'" @click="togglePause">
            <PlayIcon v-if="paused" aria-hidden="true" /><PauseIcon v-else aria-hidden="true" />{{ paused ? '繼續' : '暫停' }}
          </button>
          <button type="button" @click="play()"><ArrowPathIcon v-if="playing || finished" aria-hidden="true" /><PlayIcon v-else aria-hidden="true" />{{ playing || finished ? '重新播放' : '播放流程' }}</button>
        </div>
      </div>

      <ol class="environment-demo__progress" aria-label="目前流程進度">
        <li v-for="(step, index) in flow.steps" :key="`${selected}-${index}`"
          :class="{ 'is-current': activeStep === index, 'is-complete': activeStep > index || finished }"
          :aria-current="activeStep === index && !finished ? 'step' : undefined">
          <span class="step-meter" aria-hidden="true"><i :class="{ 'is-filled': finished }"></i></span>
          <span class="step-number"><CheckIcon v-if="activeStep > index || finished" aria-hidden="true" /><template v-else>0{{ index + 1 }}</template></span>
          <small>{{ step }}</small>
        </li>
      </ol>

      <footer :class="{ 'is-visible': finished }">
        <UserIcon v-if="selected === 'chatgpt'" aria-hidden="true" /><CheckIcon v-else aria-hidden="true" />
        <strong>{{ selected === 'chatgpt' ? '你動手完成' : '你驗收成果' }}</strong>
        <p>{{ selected === 'chatgpt' ? 'AI 停在 Chrome 裡，檔案進出與本機的每一步都要你動手。' : 'Codex 就在本機，檔案進出與執行都由它完成，你只負責驗收。' }}</p>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.environment-demo {
  --ink: #292c2b;
  --muted: #737975;
  --line: #e1e5e1;
  --accent: #367864;
  --accent-soft: #edf5ef;
  width: 100%;
  max-width: 940px;
  margin-top: 28px;
  color: var(--ink);
  container: envdemo / inline-size;
}
.environment-demo svg { flex-shrink: 0; width: 20px; height: 20px; stroke-width: 1.5 }
.environment-demo__heading h3 { margin: 0; font-size: 19px; letter-spacing: -.025em }
.environment-demo__heading p { margin: 6px 0 20px; color: var(--muted); font-size: 14px }
.environment-demo__selector { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px }
.environment-demo__selector button {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 15px 18px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  text-align: left;
  transition: border-color .2s, background-color .2s;
}
.environment-demo button { cursor: pointer }
.environment-demo button:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px }
.environment-demo__selector button:hover { border-color: #9fab9f; background: #fafbf9 }
.environment-demo__selector button.is-selected { border-color: #899e90; background: #f1f5ef }
.environment-demo__selector img { width: 32px; height: 32px; margin: 0; object-fit: contain }
.environment-demo__selector button > span { flex: 1; min-width: 0 }
.environment-demo__selector strong { display: block; font-size: 16px; font-weight: 600 }
.environment-demo__selector small { display: block; color: var(--muted); font-size: 12px; line-height: 1.6 }
.environment-demo__selector button > svg { width: 17px; color: #879189 }
.environment-demo__stage { overflow: hidden; padding: 28px; border: 1px solid var(--line); border-radius: 18px; background: #fafbf9 }
.stage-eyebrow { color: var(--accent); font-size: 12px; font-weight: 600; letter-spacing: .05em }
.environment-demo__stage-header h3 { max-width: 680px; margin: 10px 0; font-size: clamp(20px, 2.1vw, 26px); font-weight: 600; line-height: 1.45; letter-spacing: -.035em }
.environment-demo__stage-header p { max-width: 700px; margin: 0; color: var(--muted); font-size: 14px; line-height: 1.8 }
.environment-scene { position: relative; display: grid; grid-template-columns: minmax(0, 1.35fr) 72px minmax(0, 1fr); align-items: end; padding: 30px 0 24px }
.scene-local, .scene-remote { min-width: 0 }
.scene-person { display: flex; align-items: center; gap: 10px; height: 56px; margin-bottom: 16px }
.person-symbol { display: grid; flex-shrink: 0; width: 36px; height: 36px; place-items: center; border: 1px solid #dce2da; border-radius: 50%; background: #f0f3ed; color: #52664e }
.scene-person strong { display: block; font-size: 13px; font-weight: 600 }
.scene-person small { display: block; color: var(--muted); font-size: 11px }
.scene-person__line { flex: 1; height: 1px; margin-left: 8px; background: var(--line) }
.scene-panel { height: 440px; overflow: hidden; border: 1px solid #dce1db; border-radius: 12px; background: #fff; box-shadow: 0 3px 5px rgb(30 40 30 / 2%), 0 12px 26px -18px rgb(30 40 30 / 14%) }
.panel-label { display: flex; align-items: center; gap: 8px; height: 45px; padding: 0 16px; border-bottom: 1px solid #edf0eb; color: #59625a; font-size: 12px }
.panel-label svg { width: 17px; height: 17px }
.panel-label > small { margin-left: auto; color: #879085; font-size: 10px; letter-spacing: .08em }
.panel-body { padding: 17px 14px }
.file-row { display: flex; align-items: center; gap: 10px; min-height: 58px; padding: 10px; border: 1px solid #e6eae3; border-radius: 8px; background: #fcfdfb; transition: border-color .4s, background-color .4s }
.file-row > span:not(.file-symbol) { flex: 1; min-width: 0 }
.file-row strong { display: block; font-size: 12px; font-weight: 500; line-height: 1.5 }
.file-row small { display: block; margin-top: 2px; color: var(--muted); font-size: 10px; line-height: 1.5 }
.file-row > svg { width: 20px; color: #8a9388 }
.file-row > .row-check { width: 14px; color: var(--accent) }
.file-row--pending { min-height: 55px; margin-top: 8px; border-color: transparent; background: #f6f7f4; color: #717a70 }
.file-row.is-arrived, .workspace-folder.is-arrived { border-color: #b4ccb8; background: #f3f8f0; color: #315e42 }
.agent-row img { width: 30px; height: 30px; margin: 0; object-fit: contain }
.workspace-folder { margin-top: 12px; display: grid; gap: 8px; padding: 10px 12px; border: 1px solid #e1e7dc; border-radius: 8px; transition: border-color .4s, background-color .4s }
.workspace-folder > strong, .workspace-folder > span { display: flex; align-items: center; gap: 8px; font-size: 11px; line-height: 1.6; font-weight: 400 }
.workspace-folder > strong { margin-bottom: 2px; font-weight: 500 }
.workspace-folder svg { width: 15px; height: 15px; color: #7e8c76 }
.workspace-folder > span:last-child { color: #899283 }
.workspace-folder b, .workspace-folder > strong small { margin-left: auto; font-size: 10px; font-weight: 400 }
.workspace-folder > .report-ready:last-child, .workspace-folder .report-ready svg { color: #367864 }
.workspace-note { display: block; margin-top: 9px; color: #7f887a; font-size: 10px; text-align: center }
.scene-network { position: relative; align-self: end; display: flex; height: 440px; align-items: center; justify-content: center; flex-direction: column; color: #84917f }
.network-line { position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #dce3d7 }
.network-symbol { position: relative; display: grid; place-items: center; width: 32px; height: 32px; margin-top: 36px; border: 1px solid #e0e6dc; border-radius: 50%; background: #fafbf9 }
.network-symbol svg { width: 16px; height: 16px }
.scene-network > small { margin-top: 8px; font-size: 10px }
.network-caption { margin-top: 2px; font-size: 9px }
.remote-caption { display: flex; align-items: center; justify-content: flex-end; gap: 7px; height: 56px; margin-bottom: 16px; font-size: 11px; color: #7d8878 }
.remote-caption > span { width: 5px; height: 5px; border-radius: 50%; background: #b4c0ab }
.remote-panel { background: linear-gradient(150deg, #fff, #f6f8f3); transition: border-color .4s }
.remote-panel.is-working { border-color: #98b09a }
.remote-body { display: flex; min-height: 390px; justify-content: center; align-items: center; flex-direction: column; padding: 25px 16px 15px }
.remote-symbol { display: grid; place-items: center; width: 62px; height: 62px; border: 1px solid #e0e5db; border-radius: 16px; background: #fff; box-shadow: 0 4px 10px rgb(50 70 40 / 3%) }
.remote-symbol img { width: 40px; height: 40px; margin: 0; object-fit: contain }
.remote-symbol svg { width: 32px; height: 32px; color: #65765a }
.remote-body > strong { margin-top: 12px; font-size: 17px; font-weight: 500; letter-spacing: -.03em }
.remote-body > small { margin-top: 4px; color: var(--muted); font-size: 11px }
.remote-lines { display: grid; justify-items: start; gap: 6px; width: 94px; margin: 18px 0 14px }
.remote-lines i { width: 100%; height: 3px; border-radius: 2px; background: #ccd8c3; transform-origin: left }
.remote-lines i:nth-child(2) { width: 78% }
.remote-lines i:nth-child(3) { width: 52% }
.remote-state { display: flex; align-items: center; gap: 6px; color: #818c7c; font-size: 10px }
.remote-state i, .playback-status i { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #a8b2a1 }
.remote-state i.is-active, .playback-status i.is-active { background: var(--accent) }
.flight-layer { position: absolute; z-index: 4; inset: 0; pointer-events: none }
.flight-token { position: absolute; top: 0; left: 0; display: flex; align-items: center; gap: 7px; padding: 9px 12px; border: 1px solid #a9bda6; border-radius: 8px; background: #fff; color: #3e684d; box-shadow: 0 6px 20px rgb(42 65 34 / 12%); font-size: 11px; white-space: nowrap; opacity: 0; visibility: hidden }
.flight-token svg { width: 18px; height: 18px }
.is-playing .flight-token { will-change: transform, opacity }
.playback-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 16px; border-top: 1px solid var(--line) }
.playback-status { display: flex; align-items: center; gap: 7px; color: var(--muted); font-size: 11px }
.playback-bar > div { display: flex; gap: 6px }
.playback-bar button { display: flex; align-items: center; gap: 5px; padding: 5px 8px; border-radius: 5px; color: #5d6e54; font-size: 11px }
.playback-bar button:hover { background: #edf2e8 }
.playback-bar button svg { width: 13px; height: 13px }
.environment-demo__progress { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 18px 0 0; padding: 0; list-style: none }
.environment-demo__progress li { display: grid; grid-template-columns: 20px 1fr; gap: 10px 6px; align-items: center; margin: 0; color: #828b7e }
.step-meter { grid-column: 1 / -1; height: 2px; overflow: hidden; background: #e1e7da }
.step-meter i { display: block; width: 100%; height: 100%; transform: scaleX(0); transform-origin: left; background: var(--accent) }
.step-meter i.is-filled { transform: scaleX(1) !important }
.step-number { font-size: 10px; font-variant-numeric: tabular-nums }
.step-number svg { width: 13px; height: 13px }
.environment-demo__progress small { font-size: 11px; line-height: 1.5 }
.environment-demo__progress .is-current, .environment-demo__progress .is-complete { color: var(--accent) }
.environment-demo__stage footer { display: flex; gap: 12px; align-items: baseline; margin-top: 24px; padding: 14px 0 0; border-top: 1px solid var(--line) }
.environment-demo__stage footer strong { flex-shrink: 0; color: #77816f; font-size: 12px; font-weight: 500 }
.environment-demo__stage footer p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.7 }
.environment-demo__stage footer.is-visible strong { color: var(--accent) }
/* Responsibility relay — who holds the work at each stage. */
.responsibility-map { display: grid; grid-template-columns: 1fr 18px 1fr 18px 1fr; align-items: center; gap: 0 4px; margin-top: 22px; padding: 14px; border: 1px solid #e6eae3; border-radius: 11px; background: #fafbf9 }
.responsibility-map > div { display: flex; align-items: center; gap: 10px; min-width: 0; padding: 8px 10px; border-radius: 9px; opacity: .5; transition: opacity .4s, background-color .4s }
.responsibility-map > div.is-active { opacity: 1; background: #fff; box-shadow: 0 1px 2px rgb(30 40 30 / 4%), 0 8px 18px -14px rgb(30 40 30 / 18%) }
.responsibility-map > i { display: block; height: 1px; background: #d9e0d6 }
.responsibility-map span { min-width: 0 }
.responsibility-map small { display: block; color: #8b948c; font-size: 11px; letter-spacing: .02em }
.responsibility-map strong { display: block; margin-top: 2px; color: #34403a; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis }
.responsibility-map__finish.is-finished { background: #f3f8f0; box-shadow: inset 0 0 0 1px #cfe0c9 }
.actor-mark { display: grid; flex: 0 0 auto; width: 30px; height: 30px; place-items: center; border-radius: 50%; background: #edf1ea; color: #59625a }
.actor-mark svg { width: 16px }
.actor-mark img { width: 22px; height: 22px; margin: 0 }
.actor-mark--user { color: #7b6647; background: #f6ecdd }
.actor-mark--codex { background: #e8f0ff }

/* ChatGPT side: the browser is a separate box from the local project. */
.chatgpt-local-stack { display: flex; flex-direction: column; gap: 0; line-height: 1.5 }
.chrome-window { border: 1px solid #e2e5e0; border-radius: 9px; overflow: hidden; background: #fff; transition: border-color .4s, box-shadow .4s }
.chrome-window.is-active { border-color: #cdd8ca; box-shadow: 0 8px 18px -14px rgb(30 40 30 / 22%) }
.chrome-window__bar { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-bottom: 1px solid #eef1ec; background: #f7f8f6 }
.chrome-window__bar strong { color: #59625a; font-size: 11.5px; font-weight: 600 }
.chrome-mark { position: relative; flex: 0 0 auto; width: 14px; height: 14px; border-radius: 50%; background: conic-gradient(from -60deg, #ea4335 0 120deg, #fbbc04 120deg 240deg, #34a853 240deg 360deg) }
.chrome-mark::after { position: absolute; inset: 27%; border-radius: 50%; background: #4285f4; box-shadow: 0 0 0 1.5px #fff; content: '' }
.chrome-window__tab { display: flex; align-items: center; gap: 9px; padding: 10px }
.chrome-window__tab img { margin: 0 }
.chrome-window__tab strong { display: block; color: #34403a; font-size: 12.5px }
.chrome-window__tab small { display: block; margin-top: 2px; color: #8b948c; font-size: 11px }
.operator-pill { margin-left: auto; padding: 2px 8px; border-radius: 999px; color: #9aa39b; background: #eef1ec; font-size: 10.5px; font-weight: 600; white-space: nowrap; transition: color .4s, background-color .4s }
.operator-pill.is-active { color: #7b6647; background: #f6ecdd }

/* The gap Chrome cannot cross by itself. */
.browser-local-boundary { display: flex; align-items: center; gap: 9px; padding: 9px 10px; border: 1px dashed #ded7cb; border-radius: 9px; background: #fdfbf7; transition: border-color .4s, background-color .4s }
.browser-local-boundary.is-active { border-color: #d2bf9f; background: #faf2e7 }
.browser-local-boundary svg { flex: 0 0 auto; width: 17px; color: #a48a5f }
.browser-local-boundary strong { display: block; color: #34403a; font-size: 12px }
.browser-local-boundary small { display: block; margin-top: 1px; color: #8b948c; font-size: 11px }

.local-workspace { padding: 0; border: 0; background: transparent }
.local-workspace__label { display: flex; align-items: center; gap: 7px; margin-bottom: 8px }
.local-workspace__label svg { width: 15px; color: #7f8a80 }
.local-workspace__label strong { color: #34403a; font-size: 12px }
.local-workspace__label small { margin-left: auto; color: #9aa39b; font-size: 10.5px }
.local-file-grid { display: grid; gap: 8px }
.report-ready b { color: #367864 }

@container envdemo (max-width: 690px) {
  .environment-demo__stage { padding: 22px 18px }
  .environment-scene { grid-template-columns: minmax(0, 1.35fr) 46px minmax(0, 1fr) }
  .panel-label { padding-inline: 12px }
  .panel-body { padding: 17px 10px }
  .file-row { gap: 7px; padding-inline: 8px }
  .environment-demo__progress { gap: 8px }
}
@container envdemo (max-width: 620px) {
  .environment-demo__selector button { gap: 8px; padding: 12px 10px }
  .environment-demo__selector button > svg { display: none }
  .environment-demo__selector img { width: 25px; height: 25px }
  .environment-demo__selector strong { font-size: 14px }
  .environment-demo__selector small { font-size: 10px }
  .environment-demo__stage { padding: 20px 16px }
  .environment-demo__stage-header h3 { font-size: 21px }
  .environment-demo__stage-header p { font-size: 13px }
  .environment-scene { grid-template-columns: minmax(0, 1fr); padding-top: 20px; padding-bottom: 20px }
  .scene-person { height: 40px; margin-bottom: 14px }
  .scene-panel { height: auto }
  .scene-device { min-height: 305px }
  .scene-network { height: 72px; align-self: auto; flex-direction: row; gap: 8px }
  .network-line { top: 0; bottom: 0; left: 50%; right: auto; width: 1px; height: auto }
  .network-symbol { margin: 0 }
  .scene-network > small, .network-caption { position: relative; padding-block: 3px; margin: 0; background: #fafbf9 }
  .remote-caption { justify-content: center; height: auto; margin: 0 0 12px }
  .remote-body { display: grid; min-height: 0; grid-template-columns: 54px 1fr; column-gap: 16px; padding: 20px }
  .remote-symbol { grid-row: 1 / 4; width: 54px; height: 54px; border-radius: 13px }
  .remote-body > strong { margin: 0; font-size: 16px }
  .remote-body > small { margin-top: 3px }
  .remote-lines { display: none }
  .remote-state { margin-top: 8px }
  .environment-demo__progress { gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 16px }
  .environment-demo__stage footer { flex-direction: column; gap: 5px; margin-top: 20px }
}

.mode-chatgpt { --accent: #956536; --accent-soft: #faf2e7 }
.mode-chatgpt .environment-demo__selector button.is-selected { border-color: #c5aa88; background: #faf5ee }
.mode-chatgpt .person-symbol { color: #956536; background: #faf2e7; border-color: #e6d8c4 }
.source-row { min-height: 50px; background: transparent; border-color: transparent; padding-top: 0; padding-bottom: 4px }
.manual-work { margin-top: 16px; padding: 12px; border: 1px solid #e6ddd1; border-radius: 9px; background: #fcf8f2; transition: border-color .4s, background-color .4s }
.manual-work.is-handoff { border-color: #b98f5d; background: #faf0e1 }
.operator-label { display: flex; align-items: center; gap: 7px; font-size: 11px; line-height: 1.5 }
.operator-label > svg { width: 16px; height: 16px }
.operator-label strong { font-weight: 500 }
.operator-label > span { margin-left: auto; font-size: 10px; white-space: nowrap }
.manual-work .operator-label { color: #86582b }
.manual-tasks { display: grid; gap: 0; margin: 10px 0 0; padding: 0; list-style: none }
.manual-tasks li { display: flex; align-items: center; gap: 8px; margin: 0; padding: 10px 0; border-top: 1px solid #eadfce; color: #795d3c; font-size: 11px }
.manual-tasks li svg { width: 16px; height: 16px }
.manual-tasks li small { margin-left: auto; font-size: 10px; white-space: nowrap }
.manual-work p { margin: 8px 0 0; color: #967957; font-size: 10px; line-height: 1.6 }
.local-execution { margin-top: 12px; padding: 12px; border: 1px solid #dfe6db; border-radius: 9px; background: #f6f8f3 }
.local-execution .operator-label { color: #63765d }
.local-execution code { display: block; padding: 0; margin: 13px 0 9px; background: transparent; color: #53684c; font-size: 12px }
.local-execution code > span { color: #96a48e; margin-right: 5px }
.local-execution p { display: flex; align-items: center; gap: 6px; min-height: 18px; margin: 0; font-size: 10px; color: #7c8a73 }
.local-execution p svg { width: 14px; height: 14px }
.local-execution.is-running { border-color: #9db693 }
.local-execution.is-done { border-color: #b4ccb8; background: #edf6e9 }
.local-execution.is-done p { color: #367864 }
.execution-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor }
.environment-demo__stage footer > svg { width: 17px; height: 17px; align-self: center; color: var(--accent) }
.mode-chatgpt .environment-demo__stage footer.is-visible { padding: 14px; border: 1px solid #e6d8c4; border-radius: 8px; background: #faf2e7 }
.mode-codex .environment-demo__stage footer.is-visible { padding: 14px; border: 1px solid #d9e5d1; border-radius: 8px; background: #f0f6eb }
@container envdemo (max-width: 620px) {
  .environment-demo__stage footer > svg { display: none }
}

/* Keep the comparison compact; emphasize the local operator and browser boundary. */
.environment-demo__heading p { margin-bottom: 12px }
.environment-demo__selector { margin-bottom: 10px }
.environment-demo__selector button { padding: 11px 14px }
.environment-demo__selector small { color: #46523f; font-weight: 600 }
.mode-chatgpt .environment-demo__selector button:first-child small { color: #86582b }
.environment-demo__stage { padding: 18px 20px }
.environment-demo__stage-header h3 { margin: 0; font-size: 20px }
.environment-scene { padding: 14px 0; grid-template-columns: 104px minmax(0, 1.5fr) 42px minmax(0, .85fr); column-gap: 0 }
.scene-human { position: relative; align-self: center; display: flex; align-items: center; flex-direction: column; padding-right: 18px; line-height: 1.5 }
.scene-human > strong { margin-top: 7px; font-size: 13px }
.chatgpt-local-stack .local-workspace { margin-top: 14px; padding: 12px 9px; border: 1px solid var(--line); border-radius: 7px; background: #fafbf9; transition: border-color .3s }
.chatgpt-local-stack .local-workspace.is-active { border-color: var(--accent) }
.remote-state.is-thinking { color: var(--accent); font-weight: 600 }
.remote-state.is-thinking i { animation: thinking-pulse .8s ease-in-out infinite alternate }
@keyframes thinking-pulse { from { opacity: .3; transform: scale(.8) } to { opacity: 1; transform: scale(1.4) } }
.scene-human ul { display: grid; gap: 4px; margin: 10px 0 0; padding: 0; list-style: none; text-align: center }
.scene-human li { margin: 0; padding: 3px 5px; border-radius: 4px; color: var(--muted); font-size: 11px; white-space: nowrap; transition: color .3s, background-color .3s }
.scene-human li.is-active { color: var(--accent); background: var(--accent-soft); font-weight: 600 }
.scene-human li small { display: block; font-size: inherit }
.human-connection { position: absolute; right: 3px; top: 22px; color: var(--accent); font-size: 17px }
.scene-panel, .scene-network { height: 380px }
.panel-label { height: 36px; padding-inline: 12px }
.panel-body { padding: 5px 12px }
.human-summary__icon { display: grid; place-items: center; flex-shrink: 0; width: 52px; height: 52px; border-radius: 50%; color: var(--accent); background: var(--accent-soft); transition: background-color .3s, color .3s }
.human-summary__icon svg { width: 32px; height: 32px }
.scene-human.is-active .human-summary__icon { color: #fff; background: var(--accent) }
.remote-body { min-height: 340px; padding: 12px }
.remote-lines { margin: 10px 0 }
.chrome-window { overflow: hidden; border: 1px solid #d7dee5; border-radius: 7px; background: #f8fafc; transition: border-color .3s }
.chrome-window.is-active { border-color: #839ab3 }
.chrome-window__bar { display: flex; align-items: center; gap: 6px; padding: 5px 9px; border-bottom: 1px solid #e1e6ed; font-size: 11px }
.chrome-mark { width: 13px; height: 13px; border-radius: 50% }
.operator-pill { margin-left: auto; padding: 2px 6px; border-radius: 4px; background: #f3e8d8; color: #815526; font-size: 10px; font-weight: 600; white-space: nowrap }
.operator-pill.is-active { background: #956536; color: #fff }
.chrome-window__tab { display: flex; align-items: center; gap: 8px; padding: 7px 9px }
.chrome-window__tab img { width: 23px; height: 23px; margin: 0; object-fit: contain }
.chrome-window__tab strong, .chrome-window__tab small { display: block; font-size: 11px; line-height: 1.5 }
.chrome-window__tab small { font-size: 10px; color: var(--muted) }
.browser-local-boundary { display: flex; align-items: center; gap: 7px; margin: 6px 0; padding: 5px 7px; border-block: 1px dashed #dac9b1; color: #956536; background: #fbf5ec }
.browser-local-boundary > svg { width: 16px; height: 16px }
.browser-local-boundary strong { display: none }
.browser-local-boundary small { font-size: 10px }
.browser-local-boundary.is-active { background: #f5e7d1 }
.local-workspace__label { display: flex; align-items: center; gap: 5px; font-size: 11px; margin-bottom: 5px }
.local-workspace__label svg { width: 14px; height: 14px }
.local-workspace__label small { margin-left: auto; font-size: 10px; color: #8b775d }
.local-file-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px }
.local-file-grid .file-row { min-height: 42px; margin: 0; padding: 5px 7px; border: 1px solid #e5e4de }
.local-file-grid .file-row strong { font-size: 10px }
.local-file-grid .file-row svg { width: 16px }
.manual-work { margin-top: 8px; padding: 8px 10px }
.manual-work .operator-label strong { font-weight: 700 }
.manual-work.is-handoff { box-shadow: inset 3px 0 #956536 }
.manual-tasks { display: flex; justify-content: space-between; gap: 6px; margin-top: 5px }
.manual-tasks li { border: 0; padding: 3px 0; gap: 5px }
.agent-row { min-height: 48px; padding: 7px 10px; border-color: #bdd2b8; background: #edf6e9 }
.agent-row strong { color: #367864; font-weight: 700 }
.workspace-folder { margin-top: 10px; padding: 8px 10px; gap: 5px }
.local-execution { margin-top: 10px; padding: 9px 10px }
.local-execution code { margin: 7px 0 5px }
.local-execution.is-running, .workspace-folder.is-arrived { box-shadow: inset 3px 0 #367864 }
.playback-bar { padding-top: 8px }
.environment-demo__progress { margin-top: 10px; gap: 10px }
.environment-demo__progress li { gap: 6px 4px }
.environment-demo__progress small { font-size: 10px }
.environment-demo__stage footer { margin-top: 12px; padding-top: 10px }
.mode-chatgpt .environment-demo__stage footer.is-visible, .mode-codex .environment-demo__stage footer.is-visible { padding: 9px 10px }

/* The browser wall, and what it costs you — the point of the ChatGPT side. */
.browser-local-boundary strong { display: block; color: #86582b; font-size: 10.5px; font-weight: 700 }
.browser-local-boundary small { color: #9c8a70; line-height: 1.45 }
.browser-local-boundary.is-active { border-block-color: #b98f5d; background: #f6e6cd }
.manual-tasks li { opacity: .4; font-size: 10.5px; transition: opacity .35s, color .35s }
.manual-tasks li.is-done { opacity: 1; color: #86582b; font-weight: 600 }
.manual-tasks li svg { width: 13px; height: 13px }
.flight-token--hand { border-color: #c9a877; color: #7b5a2c; background: #fdf7ee }
/* Codex side: same slot as the wall, but nothing is in the way. */
.local-direct-link { display: flex; align-items: center; gap: 7px; margin: 6px 0; padding: 5px 7px; border-block: 1px solid #d6e2d1; color: #3d6b53; background: #f3f8f1; transition: background-color .3s }
.local-direct-link.is-active { background: #e9f3e6 }
.local-direct-link > svg { flex: 0 0 auto; width: 16px; height: 16px; color: #5f7a58 }
.local-direct-link strong { display: block; color: #367864; font-size: 10.5px; font-weight: 700 }
.local-direct-link small { display: block; color: #7e8a79; font-size: 10px; line-height: 1.45 }
.operator-pill--codex { background: #dfeada; color: #3f6236 }
.operator-pill--codex.is-active { background: #367864; color: #fff }
@container envdemo (max-width: 620px) {
  .environment-scene { grid-template-columns: 72px minmax(0, 1fr) }
  .scene-human { grid-column: 1; grid-row: 1 / 4; align-self: start; padding-right: 12px; margin-top: 38px }
  .human-summary__icon { width: 38px; height: 38px }
  .human-summary__icon svg { width: 26px; height: 26px }
  .human-connection { right: 0; top: 12px; font-size: 13px }
  .scene-human li { padding-inline: 0; font-size: 10px }
  .scene-local { grid-column: 2; grid-row: 1 }
  .scene-network { grid-column: 2; grid-row: 2 }
  .scene-remote { grid-column: 2; grid-row: 3 }
  .environment-demo__stage { padding: 14px }
  .environment-demo__stage-header h3 { font-size: 18px }
  .environment-demo__selector button { padding: 9px }
  .scene-panel, .mode-chatgpt .scene-panel { height: auto }
  .scene-device { min-height: 0 }
  .scene-network, .mode-chatgpt .scene-network { height: 34px }
  .scene-network > small, .network-caption { display: none }
  .network-symbol { width: 25px; height: 25px }
  .remote-panel .panel-label { display: none }
  .remote-body, .mode-chatgpt .remote-body { min-height: 0; padding: 10px 12px; column-gap: 10px; grid-template-columns: 36px 1fr }
  .remote-symbol { width: 36px; height: 36px; border-radius: 9px }
  .remote-symbol img, .remote-symbol svg { width: 25px; height: 25px }
  .remote-body > strong { font-size: 13px }
  .remote-body > small { font-size: 10px }
  .remote-state { margin-top: 3px }
  .environment-demo__progress { row-gap: 10px }
  .environment-demo__stage footer { gap: 2px }
  .environment-demo__stage footer p { font-size: 11px }
}
@media (prefers-reduced-motion: reduce) {
  .remote-state.is-thinking i { animation: none }
  .environment-demo *, .environment-demo *::before, .environment-demo *::after { transition: none !important }
}
</style>
