<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  mode: 'overview' | 'folder' | 'model' | 'message'
}>()

const folderPhase = ref(0)
const modelMenuOpen = ref(false)
const selectedModel = ref('5.6 Sol')
const activePrompt = ref(0)
const sent = ref(false)
let timers: number[] = []

const models = ['5.6 Sol', '5.6 Terra', '5.6 Luna', '5.5', '5.4', '5.4 Mini']
const overviewSteps = [
  { title: '創建資料夾並於 Codex 打開', description: '建立工作資料夾，再從 Codex 選擇「使用現有資料夾」。' },
  { title: '選擇 Model', description: '打開 Model 選單，選擇模型與推理強度。' },
  { title: '送出第一個 Message', description: '輸入工作目標與需要的來源，再送出訊息。' },
]

type PromptPart = { text: string; mention?: boolean }

const prompts: { label: string; parts: PromptPart[] }[] = [
  {
    label: '盤點資料夾',
    parts: [
      { text: '請先盤點這個資料夾，說明每份檔案大概包含什麼，以及哪些資料可能和下一季預算有關。先不要修改檔案。' },
    ],
  },
  {
    label: '分析試算表',
    parts: [
      { text: '使用 ' },
      { text: '@Spreadsheets', mention: true },
      { text: ' 讀取活動成效與預算資料，找出下一季值得加碼的三個渠道，並列出數據依據與待確認事項。' },
    ],
  },
  {
    label: '建立摘要',
    parts: [
      { text: '使用 ' },
      { text: '@SharePoint', mention: true },
      { text: ' 裡最新的專案計畫與會議紀錄，建立一份給主管閱讀的一頁摘要。先放結論，再列依據、風險與下一步。' },
    ],
  },
]

const folderStatus = computed(() => [
  '點選專案旁的新增按鈕',
  '選擇「使用現有資料夾」',
  '在檔案視窗選取工作資料夾',
  '工作資料夾已在 Codex 開啟',
][folderPhase.value])

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer))
  timers = []
}

function playFolderDemo() {
  if (typeof window === 'undefined') return

  clearTimers()
  folderPhase.value = 0

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    folderPhase.value = 3
    return
  }

  ;[1, 2, 3].forEach((phase, index) => {
    timers.push(window.setTimeout(() => {
      folderPhase.value = phase
    }, 900 + index * 1250))
  })
  timers.push(window.setTimeout(playFolderDemo, 6100))
}

function selectModel(model: string) {
  selectedModel.value = model
  modelMenuOpen.value = false
}

function selectPrompt(index: number) {
  activePrompt.value = index
  sent.value = false
}

function onPromptKeydown(event: KeyboardEvent, index: number) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

  event.preventDefault()
  const last = prompts.length - 1
  let next = index

  if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = last

  selectPrompt(next)
  const buttons = (event.currentTarget as HTMLElement)
    .parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  buttons?.[next]?.focus()
}

onMounted(() => {
  if (props.mode === 'folder') playFolderDemo()
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') clearTimers()
})
</script>

<template>
  <div v-if="mode === 'overview'" class="fp-overview" aria-label="第一次使用 Codex 的三個步驟">
    <section
      v-for="(step, index) in overviewSteps"
      :key="step.title"
    >
      <span>{{ String(index + 1).padStart(2, '0') }}</span>
      <div><h3>{{ step.title }}</h3><p>{{ step.description }}</p></div>
    </section>
  </div>

  <section v-else-if="mode === 'folder'" class="fp-demo fp-folder-demo" aria-label="在 Codex 打開工作資料夾的動畫示意">
    <header class="fp-demo__header">
      <span class="fp-demo__status"><i></i>{{ folderStatus }}</span>
      <button type="button" @click="playFolderDemo">↻ 重新播放</button>
    </header>

    <div class="fp-app">
      <div class="fp-app__topbar">
        <b>Codex</b>
        <span>Workspace</span>
      </div>

      <aside class="fp-app__sidebar">
        <div class="fp-app__new">＋ <span>新增任務</span></div>
        <div class="fp-app__section-title">
          <span>專案</span>
          <b :class="{ 'is-pulsing': folderPhase === 0 }">＋</b>
        </div>
        <div class="fp-app__project">▱ 範例專案</div>
        <div v-if="folderPhase === 3" class="fp-app__project is-selected">▱ codex-quickstart</div>

        <Transition name="fp-pop">
          <div v-if="folderPhase === 1" class="fp-app__menu">
            <div>＋ 從零開始</div>
            <div class="is-active">▱ 使用現有資料夾</div>
          </div>
        </Transition>
      </aside>

      <main class="fp-app__main">
        <div class="fp-app__welcome">
          <span class="fp-app__mark">C</span>
          <b>{{ folderPhase === 3 ? 'codex-quickstart' : '開始一個 Codex 任務' }}</b>
          <small>{{ folderPhase === 3 ? '工作資料夾已連結' : '先選擇這次要使用的資料夾' }}</small>
        </div>
        <div class="fp-app__composer">
          <span>描述你想完成的工作…</span>
          <b>↑</b>
        </div>

        <Transition name="fp-fade">
          <div v-if="folderPhase === 2" class="fp-finder" role="presentation">
            <header class="fp-finder__titlebar">
              <span class="fp-finder__lights"><i></i><i></i><i></i></span>
              <span class="fp-finder__nav">‹ &nbsp;›</span>
              <b>Projects</b>
              <span class="fp-finder__view">▦</span>
            </header>
            <div class="fp-finder__body">
              <aside>
                <small>喜好項目</small>
                <span>◉ 最近使用</span>
                <span>▱ 桌面</span>
                <span>▱ 文件</span>
                <span class="is-active">▱ Projects</span>
                <small>位置</small>
                <span>▣ 本機</span>
              </aside>
              <main>
                <div class="fp-finder__path">Macintosh HD &nbsp;›&nbsp; Projects</div>
                <div class="fp-finder__folders">
                  <div><i></i><span>project-notes</span></div>
                  <div class="is-selected"><i></i><span>codex-quickstart</span></div>
                  <div><i></i><span>research</span></div>
                </div>
              </main>
            </div>
            <footer><button>取消</button><button class="is-primary">打開</button></footer>
          </div>
        </Transition>
      </main>
    </div>
  </section>

  <section
    v-else-if="mode === 'model'"
    class="fp-demo fp-model-demo"
    :class="{ 'is-open': modelMenuOpen }"
    aria-label="選擇 Codex Model 的互動示意"
  >
    <div class="fp-composer fp-composer--model">
      <p>請先盤點這個資料夾，告訴我有哪些檔案。</p>
      <div class="fp-composer__actions">
        <span>＋</span>
        <span class="fp-model-spinner" aria-hidden="true"></span>
        <div class="fp-model-picker">
          <button
            class="fp-model-trigger"
            type="button"
            aria-haspopup="menu"
            :aria-expanded="modelMenuOpen"
            aria-controls="fp-model-menu"
            @click="modelMenuOpen = !modelMenuOpen"
          >
            {{ selectedModel }} <em>極高</em> <small>⌄</small>
          </button>
          <div v-if="modelMenuOpen" id="fp-model-menu" class="fp-model-popovers">
            <div class="fp-model-settings" role="menu" aria-label="Model 設定">
              <button type="button" class="is-active"><b>模型</b><span>{{ selectedModel }}　›</span></button>
              <button type="button"><b>推理強度</b><span>極高　›</span></button>
              <button type="button" class="is-advanced"><b>進階</b><span>⌃</span></button>
            </div>
            <div class="fp-model-menu" role="menu" aria-label="選擇 Model">
              <span class="fp-model-menu__title">模型</span>
              <button
                v-for="model in models"
                :key="model"
                type="button"
                role="menuitemradio"
                :aria-checked="selectedModel === model"
                @click="selectModel(model)"
              >
                <b>{{ model }}</b>
                <i>{{ selectedModel === model ? '✓' : '' }}</i>
              </button>
            </div>
          </div>
        </div>
        <b class="fp-send">↑</b>
      </div>
    </div>
    <p class="fp-demo__hint">點擊模型名稱，試著切換不同 Model。</p>
  </section>

  <section v-else class="fp-demo fp-message-demo" aria-label="送出第一個 Message 的互動示意">
    <div class="fp-prompt-tabs" role="tablist" aria-label="選擇 Message 範例">
      <button
        v-for="(prompt, index) in prompts"
        :id="`fp-prompt-tab-${index}`"
        :key="prompt.label"
        type="button"
        role="tab"
        :aria-selected="activePrompt === index"
        :aria-controls="`fp-prompt-panel-${index}`"
        :tabindex="activePrompt === index ? 0 : -1"
        @click="selectPrompt(index)"
        @keydown="onPromptKeydown($event, index)"
      >
        {{ prompt.label }}
      </button>
    </div>

    <div
      :id="`fp-prompt-panel-${activePrompt}`"
      class="fp-composer fp-composer--message"
      role="tabpanel"
      :aria-labelledby="`fp-prompt-tab-${activePrompt}`"
    >
      <div
        :key="activePrompt"
        class="fp-message-editor"
        contenteditable="true"
        role="textbox"
        aria-label="Message 內容"
        @input="sent = false"
      >
        <span
          v-for="(part, index) in prompts[activePrompt].parts"
          :key="index"
          :class="{ 'fp-mention': part.mention }"
        >{{ part.text }}</span>
      </div>
      <div class="fp-composer__actions">
        <span>＋</span>
        <small>✦ 5.6 Sol</small>
        <button
          type="button"
          class="fp-send"
          aria-label="送出 Message"
          @click="sent = true"
        >
          {{ sent ? '✓' : '↑' }}
        </button>
      </div>
    </div>
    <p class="fp-message-status" role="status">{{ sent ? 'Message 已送出（互動示意）' : '切換範例，也可以直接修改文字。' }}</p>
  </section>
</template>

<style scoped>
.fp-overview {
  display: grid;
  gap: 0;
  margin: 28px 0 38px;
  padding: 8px 20px;
  border-left: 2px solid #dce7f2;
}

.fp-overview section {
  position: relative;
  display: grid;
  align-items: start;
  gap: 16px;
  margin: 0;
  padding: 13px 0;
  grid-template-columns: 36px minmax(0, 1fr);
}

.fp-overview span {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid #b8d2ec;
  border-radius: 50%;
  color: #2878bd;
  background: #eef7ff;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 800;
}

.fp-overview h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.4;
}

.fp-overview p {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.6;
}

.fp-demo {
  max-width: 100%;
  margin: 24px 0 44px;
  overflow: hidden;
  border: 1px solid #2c2c2f;
  border-radius: 16px;
  color: #f5f5f5;
  background: #0e0e0f;
  box-shadow: 0 18px 48px rgb(0 0 0 / 16%);
}

.fp-demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid #2d2d30;
  background: #171718;
}

.fp-demo__header button {
  border: 0;
  color: #c8c8ca;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
}

.fp-demo__status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e7e7e8;
  font-size: 12px;
}

.fp-demo__status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #73d89b;
  box-shadow: 0 0 0 5px rgb(115 216 155 / 11%);
}

.fp-app {
  display: grid;
  min-height: 420px;
  grid-template-columns: 190px minmax(0, 1fr);
  grid-template-rows: 44px 1fr;
}

.fp-app__topbar {
  display: flex;
  grid-column: 1 / -1;
  align-items: center;
  gap: 18px;
  padding: 0 16px;
  border-bottom: 1px solid #2c2c2f;
  background: #151516;
}

.fp-app__topbar b { font-size: 16px; }
.fp-app__topbar span { color: #858589; font-size: 11px; }

.fp-app__sidebar {
  position: relative;
  min-width: 0;
  padding: 16px 10px;
  border-right: 1px solid #29292c;
  background: #141415;
}

.fp-app__new,
.fp-app__project,
.fp-app__section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 8px 9px;
  border-radius: 7px;
  color: #d8d8da;
  font-size: 12px;
}

.fp-app__new { margin-bottom: 18px; }
.fp-app__section-title { justify-content: space-between; color: #7f7f83; font-size: 10px; }
.fp-app__section-title b { display: grid; width: 24px; height: 24px; place-items: center; color: #c5c5c8; }
.fp-app__section-title b.is-pulsing { border-radius: 50%; animation: fp-pulse 1.2s ease-in-out infinite; }
.fp-app__project { margin-top: 3px; white-space: nowrap; }
.fp-app__project.is-selected { color: #fff; background: #2a2a2c; animation: fp-highlight .45s ease both; }

.fp-app__menu {
  position: absolute;
  z-index: 4;
  top: 89px;
  left: 130px;
  width: 186px;
  padding: 6px;
  border: 1px solid #444448;
  border-radius: 10px;
  background: #29292b;
  box-shadow: 0 16px 38px rgb(0 0 0 / 42%);
}

.fp-app__menu div { padding: 9px 10px; border-radius: 7px; color: #e6e6e8; font-size: 12px; }
.fp-app__menu div.is-active { background: #464649; animation: fp-menu-choice .9s ease-in-out infinite; }

.fp-app__main {
  position: relative;
  display: grid;
  min-width: 0;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 38%, rgb(255 255 255 / 5%), transparent 30%),
    #101011;
}

.fp-app__welcome { display: grid; justify-items: center; gap: 8px; color: #e8e8e9; text-align: center; }
.fp-app__welcome b { font-size: 18px; }
.fp-app__welcome small { color: #858589; }
.fp-app__mark { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid #48484c; border-radius: 12px; font-weight: 700; }

.fp-app__composer {
  position: absolute;
  right: 9%;
  bottom: 24px;
  left: 9%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 62px;
  padding: 12px 14px;
  border: 1px solid #363639;
  border-radius: 15px;
  color: #88888c;
  background: #232325;
  font-size: 12px;
}

.fp-app__composer b,
.fp-send {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  color: #171718;
  background: #f5f5f5;
}

.fp-finder {
  position: absolute;
  z-index: 5;
  width: min(560px, calc(100% - 24px));
  overflow: hidden;
  border: 1px solid #55555b;
  border-radius: 12px;
  color: #eeeef1;
  background: #202124;
  box-shadow: 0 28px 76px rgb(0 0 0 / 62%);
}

.fp-finder__titlebar {
  display: grid;
  min-height: 43px;
  align-items: center;
  padding: 0 13px;
  border-bottom: 1px solid #44444a;
  background: #303034;
  grid-template-columns: 90px 1fr 80px 1fr;
}

.fp-finder__titlebar b { justify-self: center; font-size: 12px; }
.fp-finder__lights { display: flex; gap: 7px; }
.fp-finder__lights i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; }
.fp-finder__lights i:nth-child(2) { background: #febc2e; }
.fp-finder__lights i:nth-child(3) { background: #28c840; }
.fp-finder__nav,
.fp-finder__view { color: #a6a6ac; }
.fp-finder__view { justify-self: end; }
.fp-finder__body { display: grid; min-height: 230px; grid-template-columns: 145px minmax(0, 1fr); }
.fp-finder__body aside { display: grid; align-content: start; gap: 3px; padding: 12px 8px; border-right: 1px solid #414146; background: #29292d; }
.fp-finder__body aside small { margin: 7px 8px 3px; color: #7f7f87; font-size: 9px; font-weight: 700; }
.fp-finder__body aside span { padding: 5px 8px; border-radius: 5px; color: #c8c8cd; font-size: 10px; }
.fp-finder__body aside span.is-active { color: #fff; background: #4b4b51; }
.fp-finder__body main { min-width: 0; background: #1f2023; }
.fp-finder__path { padding: 9px 14px; border-bottom: 1px solid #34353a; color: #8e8e95; font-size: 9px; }
.fp-finder__folders { display: grid; grid-template-columns: repeat(3, minmax(70px, 1fr)); gap: 13px; padding: 28px 18px; }
.fp-finder__folders div { display: grid; justify-items: center; gap: 8px; padding: 9px 5px; border-radius: 7px; color: #d7d7db; font-size: 10px; text-align: center; }
.fp-finder__folders div.is-selected { background: #376ba5; animation: fp-finder-select .9s ease-in-out infinite; }
.fp-finder__folders i { position: relative; width: 52px; height: 36px; border-radius: 5px; background: linear-gradient(#75c1ff, #4398e5); box-shadow: inset 0 1px rgb(255 255 255 / 35%); }
.fp-finder__folders i::before { position: absolute; top: -5px; left: 3px; width: 22px; height: 8px; border-radius: 4px 4px 0 0; background: #67b4f6; content: ''; }
.fp-finder footer { display: flex; justify-content: flex-end; gap: 9px; padding: 10px 13px; border-top: 1px solid #414146; background: #29292d; }
.fp-finder footer button { min-width: 64px; padding: 6px 11px; border: 1px solid #55555b; border-radius: 6px; color: #e2e2e5; background: #39393e; font-size: 10px; }
.fp-finder footer button.is-primary { border-color: #177be8; color: #fff; background: #087ff0; }

.fp-model-demo,
.fp-message-demo { padding: clamp(24px, 6vw, 58px); }

.fp-composer {
  width: min(620px, 100%);
  margin: 0 auto;
  border: 1px solid #343437;
  border-radius: 17px;
  background: #242426;
  box-shadow: 0 15px 40px rgb(0 0 0 / 24%);
}

.fp-composer p { min-height: 72px; margin: 0; padding: 17px; color: #eeeef0; font-size: 14px; line-height: 1.6; }
.fp-composer__actions { display: flex; align-items: center; gap: 12px; min-height: 50px; padding: 7px 10px 10px 16px; color: #bdbdc0; }
.fp-composer__actions > small { margin-left: auto; }

.fp-model-demo {
  padding: 30px clamp(24px, 6vw, 58px);
  transition: padding-top .28s ease;
}
.fp-model-demo.is-open { padding-top: 275px; }
.fp-composer--model { width: min(520px, 100%); }
.fp-composer--model p { min-height: 58px; padding: 14px 16px; }
.fp-model-spinner { width: 14px; height: 14px; margin-left: auto; border: 3px solid #77777c; border-right-color: transparent; border-radius: 50%; }
.fp-model-picker { position: relative; }
.fp-model-trigger { padding: 9px 16px; border: 0; border-radius: 999px; color: #f3f3f4; background: #3a3a3e; font-size: 13px; cursor: pointer; }
.fp-model-trigger em { color: #aaaab0; font-style: normal; }
.fp-model-trigger small { color: #aaaab0; }
.fp-model-popovers {
  position: absolute;
  z-index: 3;
  right: -40px;
  bottom: calc(100% + 12px);
  display: flex;
  align-items: flex-start;
  gap: 4px;
}

.fp-model-settings,
.fp-model-menu {
  padding: 6px;
  border: 1px solid #444448;
  border-radius: 12px;
  background: #2b2b2e;
  box-shadow: 0 20px 48px rgb(0 0 0 / 48%);
}

.fp-model-settings { width: 250px; }
.fp-model-menu { width: 280px; }
.fp-model-settings button,
.fp-model-menu button { display: flex; width: 100%; min-height: 38px; align-items: center; justify-content: space-between; padding: 8px 10px; border: 0; border-radius: 7px; color: #f0f0f2; background: transparent; text-align: left; cursor: pointer; }
.fp-model-settings button.is-active,
.fp-model-settings button:hover,
.fp-model-menu button:hover,
.fp-model-menu button[aria-checked="true"] { background: #424247; }
.fp-model-settings button span { color: #b2b2b7; }
.fp-model-settings button.is-advanced { margin-top: 4px; border-top: 1px solid #444448; border-radius: 0; color: #94949a; }
.fp-model-menu__title { display: block; padding: 7px 10px 4px; color: #8f8f95; font-size: 11px; }
.fp-model-menu button b { font-weight: 500; }
.fp-model-menu i { font-style: normal; }
.fp-demo__hint,
.fp-message-status { margin: 16px 0 0; color: #929297; font-size: 12px; text-align: center; }

.fp-prompt-tabs {
  display: grid;
  width: min(580px, 100%);
  margin: 0 auto 16px;
  overflow-x: auto;
  border-radius: 999px;
  background: #2b2b2d;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  scrollbar-width: none;
}

.fp-prompt-tabs button { min-height: 40px; padding: 8px 13px; border: 0; border-radius: 999px; color: #a9a9ad; background: transparent; white-space: nowrap; cursor: pointer; }
.fp-prompt-tabs button[aria-selected="true"] { color: #fff; background: #505053; }

.fp-message-editor {
  display: block;
  width: 100%;
  min-height: 108px;
  padding: 17px;
  border: 0;
  outline: 0;
  color: #f1f1f2;
  background: transparent;
  font-size: 14px;
  line-height: 1.6;
}

.fp-message-editor:focus { box-shadow: inset 0 0 0 1px #4b4b50; }
.fp-mention { padding: 1px 4px; border-radius: 4px; color: #78b7ff; background: #203c5c; box-decoration-break: clone; }

button.fp-send { margin-left: 0; border: 0; font-weight: 700; cursor: pointer; }
button.fp-send:disabled { opacity: .38; cursor: not-allowed; }

.fp-pop-enter-active,
.fp-pop-leave-active,
.fp-fade-enter-active,
.fp-fade-leave-active { transition: opacity .25s ease, transform .25s ease; }
.fp-pop-enter-from,
.fp-pop-leave-to { opacity: 0; transform: translateY(-8px) scale(.98); }
.fp-fade-enter-from,
.fp-fade-leave-to { opacity: 0; transform: translateY(8px) scale(.98); }

@keyframes fp-pulse {
  0%, 100% { background: transparent; box-shadow: 0 0 0 0 rgb(255 255 255 / 0%); }
  50% { background: #414145; box-shadow: 0 0 0 6px rgb(255 255 255 / 7%); }
}

@keyframes fp-menu-choice { 50% { background-color: #55555a; } }
@keyframes fp-highlight { from { opacity: 0; transform: translateY(7px); } }
@keyframes fp-finder-select { 50% { background-color: #4382c5; } }
@media (max-width: 640px) {
  .fp-overview { padding: 4px 14px; }
  .fp-overview section { gap: 12px; grid-template-columns: 32px minmax(0, 1fr); }
  .fp-overview h3 { font-size: 15px; }
  .fp-app { min-height: 350px; grid-template-columns: 112px minmax(0, 1fr); }
  .fp-app__sidebar { padding: 12px 6px; }
  .fp-app__new,
  .fp-app__project,
  .fp-app__section-title { padding: 7px 5px; font-size: 10px; }
  .fp-app__menu { top: 78px; left: 62px; width: 165px; }
  .fp-app__welcome b { font-size: 14px; }
  .fp-app__welcome small { max-width: 150px; }
  .fp-app__composer { right: 5%; bottom: 15px; left: 5%; min-height: 52px; }
  .fp-model-demo,
  .fp-message-demo { padding: 24px 14px; }
  .fp-model-demo.is-open { padding-top: 255px; }
  .fp-model-popovers { right: -42px; width: calc(100vw - 66px); gap: 3px; }
  .fp-model-settings { width: 46%; }
  .fp-model-menu { width: 54%; }
  .fp-model-settings button,
  .fp-model-menu button { min-height: 32px; padding: 6px; font-size: 10px; }
  .fp-model-menu__title { font-size: 9px; }
  .fp-finder__body { grid-template-columns: 105px minmax(0, 1fr); }
  .fp-finder__body aside { padding: 8px 5px; }
  .fp-finder__folders { gap: 5px; padding: 24px 6px; }
  .fp-finder__folders i { width: 40px; height: 29px; }
  .fp-prompt-tabs { grid-template-columns: repeat(3, 145px); }
}

@media (prefers-reduced-motion: reduce) {
  .fp-demo *,
  .fp-demo *::before,
  .fp-demo *::after { animation: none !important; transition: none !important; }
}
</style>
