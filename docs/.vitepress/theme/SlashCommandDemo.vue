<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const commands = [
  { icon: '◇', name: 'Plan', description: '先規劃做法，再開始執行' },
  { icon: '≡', name: 'Compact', description: '壓縮對話，保留重要脈絡' },
  { icon: '✓', name: 'Review', description: '檢查目前的程式碼變更' },
  { icon: '↗', name: 'Side', description: '另開對話，不打斷目前工作' },
]

const showSlash = ref(false)
const showMenu = ref(false)
const activeCommand = ref(-1)
let timers: number[] = []

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer))
  timers = []
}

function play() {
  if (typeof window === 'undefined') return

  clearTimers()
  showSlash.value = false
  showMenu.value = false
  activeCommand.value = -1

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showSlash.value = true
    showMenu.value = true
    return
  }

  timers.push(window.setTimeout(() => {
    showSlash.value = true
  }, 700))
  timers.push(window.setTimeout(() => {
    showMenu.value = true
  }, 1250))

  commands.forEach((_, index) => {
    timers.push(window.setTimeout(() => {
      activeCommand.value = index
    }, 1900 + index * 650))
  })

  timers.push(window.setTimeout(play, 5600))
}

onMounted(play)

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') clearTimers()
})
</script>

<template>
  <section class="slash-demo" aria-label="輸入斜線並開啟 Codex 指令選單的動畫示意">
    <div class="slash-demo__window">
      <header>
        <span class="slash-demo__mark">C</span>
        <div><b>Codex</b><small>開始一個任務</small></div>
        <i aria-hidden="true"></i>
      </header>

      <div class="slash-demo__content">
        <div class="slash-demo__composer">
          <div class="slash-demo__input" aria-hidden="true">
            <span v-if="showSlash">/</span>
            <span v-else class="slash-demo__placeholder">交代 Codex 要完成的工作</span>
            <i class="slash-demo__caret"></i>
          </div>
          <div class="slash-demo__actions">
            <span class="slash-demo__add">＋</span>
            <small>5.6 Sol</small>
            <span class="slash-demo__send">↑</span>
          </div>
        </div>

        <Transition name="slash-menu">
          <div v-if="showMenu" class="slash-demo__menu" aria-hidden="true">
            <span class="slash-demo__menu-title">Commands</span>
            <div
              v-for="(command, index) in commands"
              :key="command.name"
              class="slash-demo__command"
              :class="{ 'is-active': activeCommand === index }"
            >
              <span class="slash-demo__command-icon">{{ command.icon }}</span>
              <span><b>{{ command.name }}</b><small>{{ command.description }}</small></span>
              <kbd>/{{ command.name.toLowerCase() }}</kbd>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <p class="slash-demo__sr-only">
      在 Codex 對話框輸入斜線後，會出現 Plan、Compact、Review 與 Side 等指令。
    </p>
  </section>
</template>

<style scoped>
.slash-demo {
  position: relative;
  display: grid;
  min-height: 390px;
  margin: 24px 0 34px;
  padding: clamp(14px, 3vw, 24px);
  place-items: start center;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background:
    radial-gradient(circle at 70% 22%, rgb(132 97 255 / 72%), transparent 36%),
    radial-gradient(circle at 18% 80%, rgb(46 141 255 / 65%), transparent 36%),
    linear-gradient(140deg, #e7f2ff, #9bc5ff 48%, #b4a1ff);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 46%);
}

.slash-demo__window {
  width: min(100%, 560px);
  overflow: hidden;
  border: 1px solid #303033;
  border-radius: 15px;
  color: #f2f2f3;
  background: #111112;
  box-shadow: 0 18px 42px rgb(0 0 0 / 14%);
}

.slash-demo__window > header {
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: 10px;
  padding: 0 15px;
  border-bottom: 1px solid #2b2b2e;
  background: #181819;
}

.slash-demo__window > header div {
  display: grid;
  line-height: 1.15;
}

.slash-demo__window > header b { font-size: 12px; }
.slash-demo__window > header small { margin-top: 3px; color: #86868b; font-size: 9px; }
.slash-demo__window > header > i { width: 7px; height: 7px; margin-left: auto; border-radius: 50%; background: #63d18a; }

.slash-demo__mark {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border: 1px solid #48484d;
  border-radius: 8px;
  color: #dddde0;
  font-size: 11px;
  font-weight: 700;
}

.slash-demo__content {
  min-height: 300px;
  padding: 16px;
  background:
    radial-gradient(circle at 50% -20%, rgb(255 255 255 / 6%), transparent 52%),
    #111112;
}

.slash-demo__composer {
  overflow: hidden;
  border: 1px solid #414146;
  border-radius: 14px;
  background: #252527;
  box-shadow: 0 12px 28px rgb(0 0 0 / 22%);
}

.slash-demo__input {
  display: flex;
  min-height: 44px;
  align-items: center;
  padding: 12px 15px 6px;
  color: #f4f4f5;
  font-size: 15px;
}

.slash-demo__placeholder { color: #85858a; font-size: 12px; }

.slash-demo__caret {
  width: 1px;
  height: 18px;
  margin-left: 2px;
  background: #f2f2f3;
  animation: slash-caret .8s steps(1) infinite;
}

.slash-demo__actions {
  display: flex;
  min-height: 36px;
  align-items: center;
  gap: 10px;
  padding: 3px 9px 9px 12px;
  color: #b7b7bb;
}

.slash-demo__actions small { margin-left: auto; font-size: 10px; }
.slash-demo__add { font-size: 19px; font-weight: 300; }

.slash-demo__send {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  border-radius: 50%;
  color: #1e1e20;
  background: #f0f0f1;
  font-size: 15px;
  font-weight: 700;
}

.slash-demo__menu {
  margin-top: 8px;
  padding: 6px;
  border: 1px solid #3d3d41;
  border-radius: 12px;
  background: #252527;
  box-shadow: 0 18px 38px rgb(0 0 0 / 38%);
  transform-origin: top center;
}

.slash-demo__menu-title {
  display: block;
  padding: 5px 9px 6px;
  color: #828287;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.slash-demo__command {
  display: grid;
  min-height: 39px;
  align-items: center;
  gap: 10px;
  padding: 6px 9px;
  border-radius: 8px;
  color: #d9d9dc;
  grid-template-columns: 25px minmax(0, 1fr) auto;
  transition: color .2s ease, background-color .2s ease, transform .2s ease;
}

.slash-demo__command.is-active {
  color: #fff;
  background: #444448;
  transform: translateX(2px);
}

.slash-demo__command-icon {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border: 1px solid #4a4a4f;
  border-radius: 6px;
  color: #c7c7ca;
  font-size: 11px;
}

.slash-demo__command > span:nth-child(2) { display: grid; line-height: 1.25; }
.slash-demo__command b { font-size: 11px; font-weight: 600; }
.slash-demo__command small { margin-top: 2px; color: #949499; font-size: 9px; }
.slash-demo__command kbd { border: 0; color: #77777d; background: transparent; box-shadow: none; font-size: 9px; }

.slash-demo__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  white-space: nowrap;
}

.slash-menu-enter-active,
.slash-menu-leave-active { transition: opacity .25s ease, transform .25s ease; }
.slash-menu-enter-from,
.slash-menu-leave-to { opacity: 0; transform: translateY(-8px) scale(.985); }

@keyframes slash-caret { 50% { opacity: 0; } }

@media (max-width: 640px) {
  .slash-demo { min-height: 370px; padding: 10px; }
  .slash-demo__content { min-height: 300px; padding: 12px; }
  .slash-demo__command { gap: 7px; }
  .slash-demo__command kbd { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .slash-demo *,
  .slash-demo *::before,
  .slash-demo *::after { animation: none !important; transition: none !important; }
}
</style>
