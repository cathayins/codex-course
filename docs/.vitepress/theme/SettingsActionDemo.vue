<script setup lang="ts">
defineProps<{ mode: 'general' | 'memory' }>()
</script>

<template>
  <section
    class="settings-recommendation"
    :class="{ 'is-general': mode === 'general' }"
    :aria-label="mode === 'general' ? '建議開啟情境視窗用量並選擇排入佇列' : '建議關閉啟用記憶'"
  >
    <template v-if="mode === 'general'">
      <div class="settings-recommendation__item is-context">
        <span class="settings-recommendation__guide is-on">
          <small>建議開啟</small>
          <span class="settings-recommendation__arrow" aria-hidden="true">→</span>
        </span>
        <b>顯示情境視窗使用量</b>
        <span class="settings-recommendation__toggle"><i></i></span>
      </div>
      <div class="settings-recommendation__item is-queue">
        <b>後續跟進行為</b>
        <span class="settings-recommendation__choice"><i>排入佇列</i><em>引導</em></span>
      </div>
    </template>

    <div v-else class="settings-recommendation__item is-memory">
      <span class="settings-recommendation__guide is-off">
        <small>建議關閉</small>
        <span class="settings-recommendation__arrow" aria-hidden="true">←</span>
      </span>
      <b>啟用記憶</b>
      <span class="settings-recommendation__toggle"><i></i></span>
    </div>
  </section>
</template>

<style scoped>
.settings-recommendation {
  display: flex;
  max-width: 520px;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: auto;
  padding-top: 24px;
}

.settings-recommendation.is-general { transform: translateY(-6px); }

.settings-recommendation__item {
  position: relative;
  display: flex;
  min-height: 42px;
  align-items: center;
  gap: 9px;
  padding: 7px 9px 7px 13px;
  border: 1px solid #dfe3e8;
  border-radius: 12px;
  color: #202124;
  background: #fff;
  box-shadow: 0 5px 14px rgb(28 39 52 / 7%);
}

.settings-recommendation__item b {
  font-size: 11px;
  font-weight: 550;
  white-space: nowrap;
}

.settings-recommendation__guide {
  position: absolute;
  right: 9px;
  bottom: calc(100% + 1px);
  display: grid;
  width: 36px;
  gap: 0;
  justify-items: center;
  pointer-events: none;
}

.settings-recommendation__guide small {
  color: #69717c;
  font-size: 9px;
  font-weight: 650;
  line-height: 1.1;
  white-space: nowrap;
}

.settings-recommendation__arrow {
  color: #6481a0;
  font-size: 13px;
  line-height: 1;
}

.settings-recommendation__guide.is-on .settings-recommendation__arrow {
  animation: settings-arrow-on 5s ease-in-out infinite;
}

.settings-recommendation__guide.is-off .settings-recommendation__arrow {
  animation: settings-arrow-off 5s ease-in-out infinite;
}

.settings-recommendation__toggle {
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: #2997ef;
  animation: settings-toggle-on 5s ease-in-out infinite;
}

.settings-recommendation__toggle i {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 38%);
  transform: translateX(16px);
  animation: settings-knob-on 5s ease-in-out infinite;
}

.settings-recommendation__choice {
  display: flex;
  gap: 2px;
  padding: 2px;
  border-radius: 8px;
  background: #f1f3f5;
}

.settings-recommendation__choice i,
.settings-recommendation__choice em {
  padding: 5px 8px;
  border-radius: 6px;
  color: #69717c;
  font-size: 9px;
  font-style: normal;
  white-space: nowrap;
}

.settings-recommendation__choice i {
  color: #146db8;
  background: #e5f2ff;
}

.settings-recommendation__item.is-memory .settings-recommendation__toggle {
  background: #d5dae0;
  animation: settings-toggle-off 5s ease-in-out infinite;
}

.settings-recommendation__item.is-memory .settings-recommendation__toggle i {
  transform: translateX(0);
  animation: settings-knob-off 5s ease-in-out infinite;
}

@keyframes settings-arrow-on {
  0%, 29% { opacity: .35; transform: translateX(-5px); }
  38%, 100% { opacity: 1; transform: translateX(5px); }
}

@keyframes settings-arrow-off {
  0%, 30% { opacity: .35; transform: translateX(5px); }
  42%, 100% { opacity: 1; transform: translateX(-5px); }
}

@keyframes settings-toggle-on {
  0%, 29% { background: #d5dae0; }
  38%, 100% { background: #2997ef; }
}

@keyframes settings-knob-on {
  0%, 29% { transform: translateX(0); }
  38%, 100% { transform: translateX(16px); }
}

@keyframes settings-toggle-off {
  0%, 30% { background: #2997ef; }
  42%, 100% { background: #d5dae0; }
}

@keyframes settings-knob-off {
  0%, 30% { transform: translateX(16px); }
  42%, 100% { transform: translateX(0); }
}

@media (max-width: 640px) {
  .settings-recommendation { display: grid; width: 100%; margin-left: 0; justify-items: start; }
}

@media (prefers-reduced-motion: reduce) {
  .settings-recommendation *,
  .settings-recommendation *::before,
  .settings-recommendation *::after { animation: none !important; }
}
</style>
