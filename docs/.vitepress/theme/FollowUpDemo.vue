<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{ mode: 'steer' | 'queue' }>()

const phase = ref(0)
let timers: number[] = []

const message = computed(() => props.mode === 'steer'
  ? '這個區塊太大，請縮小 20%，按鈕間距改為 16px。'
  : '這件事完成後，請整理預覽連結與待確認項目。')

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

  timers.push(window.setTimeout(() => { phase.value = 1 }, 700))
  timers.push(window.setTimeout(() => { phase.value = 2 }, 1900))
  timers.push(window.setTimeout(play, 5200))
}

onMounted(play)
watch(() => props.mode, play)
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') clearTimers()
})
</script>

<template>
  <section
    class="follow-up-motion"
    :aria-label="mode === 'steer' ? 'Steer 立即改變目前工作的動畫示意' : 'Queue 將訊息排入等待佇列的動畫示意'"
  >
    <div class="follow-up-demo__window">
      <div class="follow-up-demo__status">
        <span class="follow-up-demo__spinner" :class="{ 'is-stopped': mode === 'steer' && phase === 2 }"></span>
        <div>
          <small>{{ mode === 'steer' && phase === 2 ? '已中斷原本方向' : '正在執行任務' }}</small>
          <b>{{ mode === 'steer' && phase === 2 ? '依照補充指示繼續' : '正在檢查網站畫面…' }}</b>
        </div>
        <span>已處理 8s</span>
      </div>

      <div class="follow-up-demo__body">
        <Transition name="follow-up-pop">
          <div v-if="mode === 'steer' && phase === 2" class="follow-up-demo__steer-result">
            <span>↳</span>
            <div><b>已立即加入新指示</b><small>{{ message }}</small></div>
            <em>Steer</em>
          </div>
        </Transition>

        <Transition name="follow-up-pop">
          <div v-if="mode === 'queue' && phase === 2" class="follow-up-demo__queued">
            <span>☷</span>
            <div><b>{{ message }}</b><small>等待目前工作完成</small></div>
            <em>↳ 改為引導&nbsp;&nbsp;⋯</em>
          </div>
        </Transition>

        <div class="follow-up-demo__composer">
          <p :class="{ 'is-placeholder': phase === 0 || phase === 2 }">
            {{ phase === 0 ? '要求後續跟進變更' : phase === 1 ? message : mode === 'queue' ? '訊息已排入上方佇列' : '補充指示已送出' }}
            <i v-if="phase === 1"></i>
          </p>
          <footer>
            <span>＋</span>
            <small>◉ 代我核准</small>
            <span class="follow-up-demo__model">5.6 Luna&nbsp; 極高⌄</span>
            <b :class="{ 'is-ready': phase === 1 }">{{ phase === 1 ? '↑' : '■' }}</b>
          </footer>
        </div>
      </div>

      <div class="follow-up-demo__meaning">
        <b>{{ mode === 'steer' ? 'Steer｜現在就改' : 'Queue｜接下來再做' }}</b>
        <span>{{ mode === 'steer' ? '中斷目前方向，立即套用補充內容' : '目前工作繼續，訊息先在上方等待' }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.follow-up-motion {
  display: grid;
  min-height: 380px;
  padding: clamp(14px, 2vw, 24px);
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 74% 18%, rgb(132 97 255 / 68%), transparent 35%),
    radial-gradient(circle at 18% 82%, rgb(46 141 255 / 62%), transparent 37%),
    linear-gradient(140deg, #e7f2ff, #9bc5ff 48%, #b4a1ff);
}

.follow-up-demo__window {
  width: 100%;
  max-width: 760px;
  overflow: hidden;
  border: 1px solid #363638;
  border-radius: 15px;
  color: #eeeef0;
  background: #151516;
  box-shadow: 0 24px 60px rgb(21 36 64 / 32%);
}

.follow-up-motion b { color: #f4f4f5; }

.follow-up-demo__status {
  display: flex;
  min-height: 62px;
  align-items: center;
  gap: 11px;
  padding: 11px 16px;
  border-bottom: 1px solid #303033;
}

.follow-up-demo__status div { display: grid; gap: 3px; }
.follow-up-demo__status small { color: #96969b; font-size: 10px; }
.follow-up-demo__status b { font-size: 12px; font-weight: 550; }
.follow-up-demo__status > span:last-child { margin-left: auto; color: #9a9a9f; font-size: 10px; }

.follow-up-demo__spinner {
  width: 13px;
  height: 13px;
  border: 2px solid #77777c;
  border-right-color: transparent;
  border-radius: 50%;
  animation: follow-up-spin .9s linear infinite;
}

.follow-up-demo__spinner.is-stopped {
  border: 0;
  border-radius: 3px;
  background: #d27c73;
  animation: none;
}

.follow-up-demo__body {
  position: relative;
  min-height: 224px;
  padding: 15px;
}

.follow-up-demo__queued,
.follow-up-demo__steer-result {
  display: grid;
  min-height: 58px;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  padding: 9px 12px;
  border: 1px solid #444448;
  border-radius: 11px;
  background: #29292b;
  grid-template-columns: 20px minmax(0, 1fr) auto;
}

.follow-up-demo__steer-result { border-color: #505055; background: #29292c; }
.follow-up-demo__queued > span,
.follow-up-demo__steer-result > span { color: #99999e; font-size: 12px; }
.follow-up-demo__queued div,
.follow-up-demo__steer-result div { display: grid; gap: 4px; }
.follow-up-demo__queued b,
.follow-up-demo__steer-result b { overflow: hidden; font-size: 11px; font-weight: 550; text-overflow: ellipsis; white-space: nowrap; }
.follow-up-demo__queued small,
.follow-up-demo__steer-result small { color: #a0a0a5; font-size: 10px; }
.follow-up-demo__queued em,
.follow-up-demo__steer-result em { color: #a2a2a7; font-size: 10px; font-style: normal; white-space: nowrap; }

.follow-up-demo__composer {
  position: absolute;
  right: 15px;
  bottom: 15px;
  left: 15px;
  min-height: 105px;
  overflow: hidden;
  border: 1px solid #424246;
  border-radius: 17px;
  background: #2b2b2d;
  box-shadow: 0 16px 34px rgb(0 0 0 / 28%);
}

.follow-up-demo__composer p {
  min-height: 61px;
  margin: 0;
  padding: 14px;
  color: #eeeef0;
  font-size: 12px;
}

.follow-up-demo__composer p.is-placeholder { color: #77777c; }
.follow-up-demo__composer p i { display: inline-block; width: 1px; height: 14px; margin-left: 2px; background: #eee; animation: follow-up-caret .7s steps(1) infinite; vertical-align: -2px; }
.follow-up-demo__composer footer { display: flex; align-items: center; gap: 12px; padding: 5px 9px 9px 13px; color: #b0b0b4; }
.follow-up-demo__composer footer small { font-size: 10px; }
.follow-up-demo__model { margin-left: auto; color: #d8d8dc; font-size: 10px; }
.follow-up-demo__composer footer b { display: grid; width: 27px; height: 27px; place-items: center; border-radius: 50%; color: #29292b; background: #f0f0f1; font-size: 11px; }
.follow-up-demo__composer footer b.is-ready { color: #242426; background: #f4f4f5; }

.follow-up-demo__meaning {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-top: 1px solid #303033;
  color: #a0a0a5;
  background: #1c1c1e;
  font-size: 10px;
}

.follow-up-demo__meaning b { color: #f1f1f2; font-size: 11px; }
.follow-up-demo__meaning span { color: #aaaab0; }
.follow-up-pop-enter-active,
.follow-up-pop-leave-active { transition: opacity .25s ease, transform .25s ease; }
.follow-up-pop-enter-from,
.follow-up-pop-leave-to { opacity: 0; transform: translateY(8px); }

@keyframes follow-up-spin { to { transform: rotate(360deg); } }
@keyframes follow-up-caret { 50% { opacity: 0; } }

@media (max-width: 640px) {
  .follow-up-motion { min-height: 360px; padding: 12px; }
  .follow-up-demo__queued em,
  .follow-up-demo__steer-result em { display: none; }
  .follow-up-demo__meaning { align-items: flex-start; flex-direction: column; gap: 3px; }
}

@media (prefers-reduced-motion: reduce) {
  .follow-up-motion *,
  .follow-up-motion *::before,
  .follow-up-motion *::after { animation: none !important; transition: none !important; }
}
</style>
