<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import { withBase } from 'vitepress'

type KnowledgeEntry = {
  name: string
  kind: string
  note: string
  title: string
  description: string
  includes: string[]
  avoid: string
  example: string
}

const entries: KnowledgeEntry[] = [
  {
    name: 'AGENTS.md',
    kind: 'ENTRY',
    note: '共同規範',
    title: 'Agent 進專案後，先看的導覽地圖',
    description: '保存每次任務都要遵守的專案規則，並告訴 Agent 遇到不同問題時，下一份文件要去哪裡讀。',
    includes: ['Build／Test／Lint 指令', '變更邊界與驗收標準', '深入文件的閱讀路徑'],
    avoid: '不要把完整設計、架構和所有歷史決策塞進來；入口太長，反而找不到重點。',
    example: `# AGENTS.md
- 安裝：npm install
- 驗證：npm run lint && npm test
- 改 UI 前先讀 DESIGN.md
- 跨模組變更先讀 ARCHITECTURE.md
- 複雜任務依 PLANS.md 建立 ExecPlan`,
  },
  {
    name: 'DESIGN.md',
    kind: 'PRODUCT',
    note: '設計原則',
    title: '說清楚產品應該長什麼樣、怎麼操作',
    description: '記錄穩定的視覺與互動原則，讓 Agent 修改畫面時有判斷依據，不必每次從現有頁面猜設計意圖。',
    includes: ['視覺語言', '互動與回饋', 'Loading／Empty／Error 狀態'],
    avoid: '不要只貼單一頁面的暫時規格；一次性需求放在 Prompt 或對應的 design doc。',
    example: `# DESIGN.md
- 主要操作使用藍色按鈕
- 表單錯誤顯示在欄位下方
- 390px 寬度不得水平捲動
- Loading、Empty、Error 都要有畫面`,
  },
  {
    name: 'ARCHITECTURE.md',
    kind: 'SYSTEM',
    note: '系統地圖',
    title: '讓 Agent 看懂模組、資料流與不能打破的邊界',
    description: '提供系統的高層地圖，說明各層責任、依賴方向和重要不變條件；細部 API 再連到對應文件。',
    includes: ['模組責任', '資料流向', '依賴規則與系統邊界'],
    avoid: '不要逐檔解釋程式碼；能直接從程式碼讀到的細節，不必在這裡重複維護。',
    example: `# ARCHITECTURE.md
UI → Application → Domain → Infrastructure

- Domain 不得 import Infrastructure
- 外部 API 只能由 src/adapters/ 呼叫
- 新模組要標示 owner 與 public API`,
  },
  {
    name: 'PLANS.md',
    kind: 'EXECUTION',
    note: '長任務計畫',
    title: '先定義複雜任務要怎麼規劃與留下進度',
    description: 'PLANS.md 保存計畫格式與使用時機；真正的長任務可另外建立 ExecPlan，持續記錄範圍、進度、決策與驗證。',
    includes: ['目標與範圍', '里程碑與進度', '決策紀錄與驗證方式'],
    avoid: '小改動不用硬寫長計畫；也不要只列待辦事項，卻沒有完成條件與決策原因。',
    example: `# ExecPlan：拆分付款模組
## Goal
## Scope
## Progress
## Decisions
## Validation`,
  },
  {
    name: 'SKILL.md',
    kind: 'WORKFLOW',
    note: '重複流程',
    title: '把做過很多次的工作，整理成可重用流程',
    description: '一個 Skill 是含有 SKILL.md 的資料夾，可再搭配 references、scripts 和 assets；只有任務符合時才載入完整流程。',
    includes: ['觸發條件', '固定步驟與品質標準', '參考資料或自動化 scripts'],
    avoid: '整個 Repository 每次都要遵守的規則，仍然放在 AGENTS.md，不要藏進特定 Skill。',
    example: `.agents/skills/release-check/
├── SKILL.md
├── references/
└── scripts/

name: release-check
description: 發版前檢查；準備 release 時使用`,
  },
]

const instanceId = useId()
const rootElement = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const activeEntry = computed(() => entries[activeIndex.value])

async function select(index: number) {
  activeIndex.value = index
  await nextTick()

  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
  rootElement.value?.scrollIntoView({ behavior, block: 'start' })
}

async function onKeydown(event: KeyboardEvent, index: number) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

  event.preventDefault()
  const last = entries.length - 1
  let next = index

  if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = last

  const tablist = (event.currentTarget as HTMLElement).parentElement
  await select(next)
  tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
}
</script>

<template>
  <section ref="rootElement" class="agent-knowledge" aria-label="Repository 內五種 Agent 文件與流程">
    <div class="agent-knowledge__nav" role="tablist" aria-label="選擇要查看的文件或流程">
      <button
        v-for="(entry, index) in entries"
        :id="`${instanceId}-tab-${index}`"
        :key="entry.name"
        type="button"
        role="tab"
        :aria-selected="activeIndex === index"
        :aria-controls="`${instanceId}-panel`"
        :tabindex="activeIndex === index ? 0 : -1"
        @click="select(index)"
        @keydown="onKeydown($event, index)"
      >
        <strong>{{ entry.name }}</strong>
      </button>
    </div>

    <div class="agent-knowledge__body">
      <div
        :id="`${instanceId}-panel`"
        :key="activeIndex"
        class="agent-knowledge__panel"
        role="tabpanel"
        :aria-labelledby="`${instanceId}-tab-${activeIndex}`"
        aria-live="polite"
      >
        <div class="agent-knowledge__copy">
          <span class="agent-knowledge__kind">{{ activeEntry.kind }} · {{ activeEntry.note }}</span>
          <h3>{{ activeEntry.title }}</h3>
          <p>{{ activeEntry.description }}</p>

          <div class="agent-knowledge__includes" aria-label="適合放入的內容">
            <b v-for="item in activeEntry.includes" :key="item">{{ item }}</b>
          </div>

          <div class="agent-knowledge__avoid">
            <span>不要放</span>
            <p>{{ activeEntry.avoid }}</p>
          </div>
        </div>

        <div class="agent-knowledge__example">
          <header>
            <span>MINIMUM EXAMPLE</span>
            <code>{{ activeEntry.name }}</code>
          </header>
          <pre><code>{{ activeEntry.example }}</code></pre>
        </div>
      </div>

      <div class="agent-knowledge__shared">
        <div class="agent-knowledge__shared-copy">
          <span>TEAM EXAMPLE</span>
          <strong>每個人的 Codex，都照同一套規範開發</strong>
          <p>把前面這些文件放進 Repository，並從 <code>AGENTS.md</code> 指向它們，團隊中每個人的 Codex 就能依照相同的專案規則、設計原則與驗證方式工作。</p>
        </div>
        <div class="agent-knowledge__shared-flow" aria-hidden="true">
          <div class="agent-knowledge__shared-source">
            <span>REPOSITORY</span>
            <b>共用規範</b>
            <small>AGENTS.md 與相關文件</small>
          </div>
          <i>→</i>
          <div class="agent-knowledge__shared-team">
            <div><b>工程師 A</b><small>Codex</small></div>
            <div><b>工程師 B</b><small>Codex</small></div>
            <div><b>工程師 C</b><small>Codex</small></div>
          </div>
        </div>
      </div>

      <footer class="agent-knowledge__links">
        <a :href="withBase('/advanced/agents-md')">Advanced：AGENTS.md <span aria-hidden="true">→</span></a>
        <a :href="withBase('/advanced/skills')">Advanced：Skills <span aria-hidden="true">→</span></a>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.agent-knowledge {
  margin: 28px 0 40px;
  scroll-margin-top: calc(var(--vp-nav-height) + 18px);
}

.agent-knowledge__body {
  overflow: hidden;
  border: 1px solid #cfdbe8;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 18px 48px rgb(39 60 86 / 8%);
}

.agent-knowledge__nav {
  position: sticky;
  z-index: 12;
  top: calc(var(--vp-nav-height) + 8px);
  display: flex;
  gap: 8px;
  margin: 0 -8px 12px;
  padding: 8px;
  overflow-x: auto;
  border: 1px solid rgb(216 225 235 / 88%);
  border-radius: 999px;
  background: rgb(247 249 251 / 92%);
  box-shadow: 0 10px 28px rgb(39 60 86 / 9%);
  backdrop-filter: blur(14px);
  scrollbar-width: thin;
}

.agent-knowledge__nav button {
  display: inline-flex;
  min-height: 42px;
  flex: 0 0 auto;
  align-items: center;
  padding: 0 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  background: #fff;
  cursor: pointer;
  transition: border-color 120ms ease, color 120ms ease, background 120ms ease;
}

.agent-knowledge__nav button:hover {
  border-color: #8dbbe6;
  color: var(--vp-c-brand-1);
}

.agent-knowledge__nav button[aria-selected="true"] {
  border-color: var(--vp-c-brand-1);
  color: #fff;
  background: var(--vp-c-brand-1);
}

.agent-knowledge__nav button:focus-visible {
  outline: 3px solid rgb(22 119 210 / 22%);
  outline-offset: 2px;
}

.agent-knowledge__kind,
.agent-knowledge__example header span,
.agent-knowledge__shared-copy > span {
  color: #3574b9;
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  font-weight: 750;
  letter-spacing: .08em;
}

.agent-knowledge__nav strong {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.agent-knowledge__panel {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, .95fr);
  gap: 28px;
  min-height: 380px;
  padding: 30px;
  border: 0;
  background:
    radial-gradient(circle at 100% 0%, rgb(56 125 208 / 10%), transparent 34%),
    linear-gradient(150deg, #f8fbff, #fff 68%);
  animation: agent-knowledge-in .25s ease both;
}

.agent-knowledge__copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.agent-knowledge__copy h3 {
  margin: 9px 0 0;
  color: var(--vp-c-text-1);
  font-size: 25px;
  line-height: 1.35;
  letter-spacing: -.025em;
}

.agent-knowledge__copy > p {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.agent-knowledge__includes {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 20px;
}

.agent-knowledge__includes b {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 10px;
  border: 1px solid #cbdff4;
  border-radius: 999px;
  color: #426382;
  background: rgb(255 255 255 / 82%);
  font-size: 10px;
  font-weight: 700;
}

.agent-knowledge__avoid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 11px;
  margin-top: auto;
  padding: 15px;
  border: 1px solid #ecdcc9;
  border-radius: 10px;
  background: #fff9f2;
}

.agent-knowledge__avoid span {
  align-self: start;
  padding: 3px 7px;
  border-radius: 999px;
  color: #9b5a17;
  background: #ffecd4;
  font-size: 9px;
  font-weight: 750;
  line-height: 1.3;
  white-space: nowrap;
}

.agent-knowledge__avoid p {
  margin: 0;
  color: #705d48;
  font-size: 12px;
  line-height: 1.65;
}

.agent-knowledge__example {
  align-self: stretch;
  overflow: hidden;
  border: 1px solid #d8e1eb;
  border-radius: 12px;
  background: #172231;
  box-shadow: 0 14px 30px rgb(23 34 49 / 13%);
}

.agent-knowledge__example header {
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  background: #1d2a3b;
}

.agent-knowledge__example header span {
  color: #82b8ef;
}

.agent-knowledge__example header code {
  color: #cbd9e8;
  background: transparent;
  font-size: 11px;
}

.agent-knowledge__example pre {
  min-height: 250px;
  margin: 0;
  padding: 22px;
  background: transparent;
}

.agent-knowledge__example pre code {
  display: block;
  padding: 0;
  color: #e6edf5;
  background: transparent;
  font-size: 12px;
  line-height: 1.85;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.agent-knowledge__shared {
  display: grid;
  gap: 18px;
  padding: 24px 30px;
  border-top: 1px solid #dbe4ee;
  background:
    radial-gradient(circle at 100% 0%, rgb(50 126 205 / 9%), transparent 38%),
    #f5f8fc;
}

.agent-knowledge__shared-flow {
  display: grid;
  grid-template-columns: minmax(180px, .75fr) auto minmax(0, 1.5fr);
  gap: 14px;
  align-items: center;
  padding: 16px;
  border: 1px solid #d4e0ec;
  border-radius: 12px;
  background: rgb(255 255 255 / 78%);
}

.agent-knowledge__shared-source {
  display: grid;
  gap: 3px;
  min-width: 0;
  padding: 12px 14px;
  border-left: 3px solid var(--vp-c-brand-1);
  background: #eef6ff;
}

.agent-knowledge__shared-source > span {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 8px;
  font-weight: 750;
  letter-spacing: .08em;
}

.agent-knowledge__shared-source b,
.agent-knowledge__shared-team b {
  color: var(--vp-c-text-1);
  font-size: 11px;
}

.agent-knowledge__shared-source small,
.agent-knowledge__shared-team small {
  color: var(--vp-c-text-3);
  font-size: 9px;
}

.agent-knowledge__shared-flow > i {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border: 1px solid #b9d0e6;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  background: #fff;
  font-size: 12px;
  font-style: normal;
}

.agent-knowledge__shared-team {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.agent-knowledge__shared-team div {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 11px 8px;
  border: 1px solid #d4deea;
  border-radius: 9px;
  background: #fff;
  text-align: center;
}

.agent-knowledge__shared-copy strong {
  display: block;
  margin-top: 5px;
  color: var(--vp-c-text-1);
  font-size: 17px;
  line-height: 1.45;
}

.agent-knowledge__shared-copy p {
  margin: 7px 0 0;
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.7;
}

.agent-knowledge__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  padding: 15px 30px;
  border-top: 1px solid #dbe4ee;
  background: #fff;
}

.agent-knowledge__links a {
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
}

.agent-knowledge__links a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@keyframes agent-knowledge-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 720px) {
  .agent-knowledge__body {
    border-radius: 13px;
  }

  .agent-knowledge__nav {
    margin-right: -8px;
  }

  .agent-knowledge__nav button {
    min-height: 42px;
    padding: 0 16px;
  }

  .agent-knowledge__panel {
    grid-template-columns: 1fr;
    gap: 20px;
    min-height: 0;
    padding: 22px;
  }

  .agent-knowledge__copy h3 {
    font-size: 22px;
  }

  .agent-knowledge__avoid {
    margin-top: 22px;
  }

  .agent-knowledge__example pre {
    min-height: 0;
    padding: 18px;
  }

  .agent-knowledge__shared {
    gap: 16px;
    padding: 22px;
  }

  .agent-knowledge__shared-flow {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 14px;
  }

  .agent-knowledge__shared-flow > i {
    justify-self: center;
    transform: rotate(90deg);
  }

  .agent-knowledge__shared-team {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .agent-knowledge__links {
    display: grid;
    padding: 14px 22px;
  }
}
</style>
