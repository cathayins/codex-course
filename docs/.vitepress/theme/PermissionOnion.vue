<script setup lang="ts">
import { computed, ref } from 'vue'

const selected = ref(0)
const modes = [
  { name: '要求存取', subtitle: '你來核准', scope: '與「代我核准」相同', action: '遇到需要額外權限的操作，Codex 會停下來詢問你。你查看操作內容，決定允許或拒絕；允許後才繼續執行。', example: '例如：下載套件需要額外網路權限 → 顯示核准請求 → 等你確認後才下載。', gate: 'Codex 提出請求 → 你決定 → 執行或停止' },
  { name: '代我核准', subtitle: '系統代你審核', scope: '與「要求存取」相同', action: '遇到符合自動審核條件的額外權限請求，系統會交給另一個審核代理判斷。通過就繼續執行，減少需要你手動確認的次數；不代表每個請求都會通過。', example: '例如：下載套件需要額外網路權限 → 系統審核請求 → 通過後繼續下載；也可能拒絕或需要人工處理。', gate: 'Codex 提出請求 → 系統審核 → 執行或停止' },
  { name: '完整存取', subtitle: '公司已停用・僅供說明', scope: '移除 Codex 的沙箱範圍限制', action: '可以存取更廣的檔案範圍、執行指令與使用網路，不再透過沙箱邊界逐次要求核准。仍受作業系統帳號與公司政策限制。', example: '例如：在帳號可存取的位置讀寫其他資料夾，或執行安裝工具的指令。', gate: '沙箱邊界解除・公司已停用' },
]
const mode = computed(() => modes[selected.value])
</script>

<template>
  <div class="permission-demo">
    <p class="permission-instruction"><strong>要求存取：你來決定。代我核准：系統代你審核。</strong><br>兩者的差別是「需要額外權限時，誰來核准」，不是 Codex 能讀到更多檔案。點選下方選項查看同一個下載套件案例。</p>
    <div class="permission-options" role="group" aria-label="比較 Codex 權限">
      <button v-for="(item, index) in modes" :key="item.name" type="button"
        :aria-pressed="selected === index" @click="selected = index">
        <strong>{{ item.name }}</strong><span>{{ item.subtitle }}</span>
      </button>
    </div>
    <div class="permission-content">
      <svg viewBox="0 0 460 460" role="img" :aria-label="'權限範圍同心圖：' + mode.scope">
        <circle cx="230" cy="230" r="215" :fill="selected === 2 ? '#e5eef9' : '#eeece7'" stroke="#d6d4cd" stroke-width="2" />
        <text x="230" y="57" class="ring-title">其他資料夾・網路・系統工具</text>
        <text x="230" y="82" class="ring-caption">仍受帳號與公司政策限制</text>
        <circle cx="230" cy="257" r="157" fill="#eef3fb" stroke="#8caed6" stroke-width="2" :stroke-dasharray="selected === 2 ? '0' : '6 5'" />
        <text x="230" y="133" class="ring-title">需要額外權限的操作</text>
        <text x="230" y="157" class="ring-caption">{{ selected === 2 ? '不透過沙箱邊界逐次核准' : selected === 0 ? '你核准後，Codex 才繼續' : '系統審核通過，Codex 才繼續' }}</text>
        <circle cx="230" cy="280" r="100" fill="#d9e8fa" stroke="#4e84bc" stroke-width="2" />
        <path d="M204 235h22l9 10h28v34h-59z" fill="#fff" stroke="#4e84bc" stroke-width="2" stroke-linejoin="round" />
        <text x="230" y="309" class="ring-title">目前工作區</text>
        <text x="230" y="332" class="ring-caption">codex-demo</text>
        <text x="230" y="355" class="ring-caption">讀檔・改檔・執行指令</text>
      </svg>
      <div class="permission-detail" aria-live="polite" aria-atomic="true">
        <h3>{{ mode.name }}</h3>
        <dl>
          <dt>資料範圍</dt><dd>{{ mode.scope }}</dd>
          <dt>{{ selected === 2 ? '操作方式' : '需要額外權限時會發生什麼？' }}</dt><dd>{{ mode.action }}</dd>
        </dl>
        <p class="permission-gate" :key="selected">{{ mode.gate }}</p>
        <p class="permission-example">{{ mode.example }}</p>
      </div>
    </div>
    <p class="permission-footnote">原本已允許的讀檔、改檔與指令，兩種模式都能直接執行，不必每一步核准。只有需要額外權限時，核准流程才不同；兩者都不能繞過公司禁止的操作。</p>
  </div>
</template>

<style scoped>
.permission-demo { margin: 24px 0; padding: clamp(16px, 3vw, 28px); border-radius: 20px; background: #f8f7f5; color: #292b30; }
.permission-instruction { margin: 0 0 16px !important; color: #666965; font-size: 15px; }
.permission-options { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.permission-options button { padding: 16px 10px; border: 1px solid #deded8; border-radius: 12px; text-align: left; background: #fff; cursor: pointer; }
.permission-options button[aria-pressed="true"] { border-color: #427eb8; box-shadow: 0 0 0 2px #dce9f6; background: #f0f6fd; }
.permission-options strong, .permission-options span { display: block; }
.permission-options strong { font-size: 17px; }
.permission-options span { margin-top: 6px; color: #686d75; font-size: 12px; line-height: 1.5; }
.permission-options button:focus-visible { outline: 3px solid #427eb8; outline-offset: 3px; }
.permission-content { display: grid; grid-template-columns: 1.1fr 1fr; gap: 26px; align-items: center; margin-top: 22px; }
svg { display: block; width: 100%; min-width: 0; }
svg text { text-anchor: middle; fill: #36506a; font-family: inherit; }
.ring-title { font-size: 17px; font-weight: 650; }
.ring-caption { font-size: 14px; }
.permission-detail h3 { margin: 0 0 18px; font-size: 23px; }
dt { margin-top: 14px; color: #646a73; font-size: 13px; }
dd { margin: 5px 0 0; font-size: 15px; line-height: 1.8; }
.permission-gate { padding: 12px 14px; border-radius: 10px; background: #e6eef8; color: #315c88; font-size: 14px; font-weight: 600; animation: permissionReveal .25s ease-out; }
.permission-example, .permission-footnote { color: #656b72; font-size: 13px; line-height: 1.8; }
.permission-footnote { margin: 16px 0 0; padding-top: 16px; border-top: 1px solid #e1dfda; }
@keyframes permissionReveal { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 640px) {
  .permission-content { grid-template-columns: 1fr; gap: 14px; }
  .permission-options { gap: 6px; }
  .permission-options button { padding: 12px 8px; }
  .permission-options strong { font-size: 14px; }
  .permission-options span { font-size: 11px; }
  svg { max-width: 420px; margin: auto; }
}
@media (prefers-reduced-motion: reduce) { .permission-gate { animation: none; } }
</style>
