<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useId } from 'vue'
import { withBase } from 'vitepress'

type MediaTab = {
  label: string
  title: string
  description: string
  image?: string
  alt?: string
  note?: string
  code?: string
  icon?: {
    image: string
    alt: string
  }
  links?: {
    label: string
    href: string
  }[]
  steps?: {
    title: string
    description: string
  }[]
  commands?: {
    label: string
    code: string
  }[]
  platforms?: {
    label: string
    title: string
    description: string
    commands: {
      label: string
      code: string
    }[]
  }[]
  table?: {
    caption?: string
    headers: string[]
    rows: string[][]
  }
  fit?: 'wide' | 'tall' | 'compact' | 'narrow' | 'panel' | 'settings' | 'terminal'
}

const props = defineProps<{
  items: MediaTab[]
  ariaLabel?: string
}>()

const instanceId = useId()
const rootElement = ref<HTMLElement | null>(null)
const activeImageElement = ref<HTMLImageElement | null>(null)
const activeIndex = ref(0)
const activePlatformIndex = ref(0)
let imagePreloadScheduled = false
const activeItem = computed(() => props.items[activeIndex.value] ?? props.items[0])
const activePlatform = computed(() =>
  activeItem.value?.platforms?.[activePlatformIndex.value] ?? activeItem.value?.platforms?.[0],
)

async function select(index: number) {
  activeIndex.value = index
  activePlatformIndex.value = 0
  await nextTick()

  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
  rootElement.value?.scrollIntoView({ behavior, block: 'start' })
}

async function onKeydown(event: KeyboardEvent, index: number) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

  event.preventDefault()
  const last = props.items.length - 1
  let next = index

  if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = last

  await select(next)
  const target = (event.currentTarget as HTMLElement)
    .parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]
  target?.focus()
}

function selectPlatform(index: number) {
  activePlatformIndex.value = index
}

function onPlatformKeydown(event: KeyboardEvent, index: number) {
  const platforms = activeItem.value?.platforms
  if (!platforms?.length || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

  event.preventDefault()
  const last = platforms.length - 1
  let next = index

  if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = last

  selectPlatform(next)
  const target = (event.currentTarget as HTMLElement)
    .parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]
  target?.focus()
}

function preloadInactiveImages() {
  const currentSource = activeItem.value?.image
  const sources = [
    ...new Set(
      props.items
        .map((item) => item.image)
        .filter((source): source is string => Boolean(source)),
    ),
  ]

  for (const source of sources) {
    if (source === currentSource) continue

    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.as = 'image'
    preload.href = withBase(source)
    document.head.append(preload)
  }
}

function scheduleInactiveImagePreload() {
  if (imagePreloadScheduled) return
  imagePreloadScheduled = true

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadInactiveImages, { timeout: 1800 })
    return
  }

  window.setTimeout(preloadInactiveImages, 500)
}

onMounted(() => {
  if (!activeImageElement.value || activeImageElement.value.complete) {
    scheduleInactiveImagePreload()
  }
})
</script>

<template>
  <section v-if="activeItem" ref="rootElement" class="media-tabs">
    <div class="media-tabs__sticky">
      <div
        class="media-tabs__nav"
        role="tablist"
        :aria-label="ariaLabel || '內容切換'"
      >
        <button
          v-for="(item, index) in items"
          :id="`${instanceId}-tab-${index}`"
          :key="item.label"
          type="button"
          role="tab"
          :aria-selected="activeIndex === index"
          :aria-controls="`${instanceId}-panel-${index}`"
          :tabindex="activeIndex === index ? 0 : -1"
          @click="select(index)"
          @keydown="onKeydown($event, index)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div
      :id="`${instanceId}-panel-${activeIndex}`"
      :key="activeIndex"
      class="media-tabs__panel"
      role="tabpanel"
      :aria-labelledby="`${instanceId}-tab-${activeIndex}`"
    >
      <div
        v-if="activeItem.image"
        class="media-tabs__stage"
        :class="`is-${activeItem.fit || 'wide'}`"
      >
        <div class="media-tabs__glow" aria-hidden="true"></div>
        <div class="media-tabs__window">
          <img
            ref="activeImageElement"
            :src="withBase(activeItem.image)"
            :alt="activeItem.alt || activeItem.title"
            loading="eager"
            decoding="async"
            @load="scheduleInactiveImagePreload"
            @error="scheduleInactiveImagePreload"
          >
        </div>
      </div>

      <div class="media-tabs__copy">
        <p class="media-tabs__eyebrow">{{ activeItem.label }}</p>
        <div class="media-tabs__title-row">
          <img
            v-if="activeItem.icon"
            class="media-tabs__icon"
            :src="withBase(activeItem.icon.image)"
            :alt="activeItem.icon.alt"
          >
          <h3>{{ activeItem.title }}</h3>
        </div>
        <p>{{ activeItem.description }}</p>
        <div v-if="activeItem.links?.length" class="media-tabs__links">
          <a
            v-for="link in activeItem.links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
        <div v-if="activeItem.steps?.length" class="media-tabs__steps">
          <section v-for="(step, index) in activeItem.steps" :key="step.title">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <b>{{ step.title }}</b>
            <p>{{ step.description }}</p>
          </section>
        </div>
        <div v-if="activeItem.commands?.length" class="media-tabs__commands">
          <div v-for="command in activeItem.commands" :key="command.label">
            <span>{{ command.label }}</span>
            <pre><code>{{ command.code }}</code></pre>
          </div>
        </div>
        <div v-if="activeItem.platforms?.length && activePlatform" class="media-tabs__platforms">
          <div class="media-tabs__platform-nav" role="tablist" aria-label="選擇安裝平台">
            <button
              v-for="(platform, index) in activeItem.platforms"
              :id="`${instanceId}-platform-tab-${index}`"
              :key="platform.label"
              type="button"
              role="tab"
              :aria-selected="activePlatformIndex === index"
              :aria-controls="`${instanceId}-platform-panel-${index}`"
              :tabindex="activePlatformIndex === index ? 0 : -1"
              @click="selectPlatform(index)"
              @keydown="onPlatformKeydown($event, index)"
            >
              {{ platform.label }}
            </button>
          </div>
          <div
            :id="`${instanceId}-platform-panel-${activePlatformIndex}`"
            :key="activePlatformIndex"
            class="media-tabs__platform-panel"
            role="tabpanel"
            :aria-labelledby="`${instanceId}-platform-tab-${activePlatformIndex}`"
          >
            <b>{{ activePlatform.title }}</b>
            <p>{{ activePlatform.description }}</p>
            <div class="media-tabs__commands media-tabs__commands--platform">
              <div v-for="command in activePlatform.commands" :key="command.label">
                <span>{{ command.label }}</span>
                <pre><code>{{ command.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
        <code v-if="activeItem.code" class="media-tabs__code">{{ activeItem.code }}</code>
        <div v-if="activeItem.table" class="media-tabs__table-wrap">
          <table class="media-tabs__table">
            <caption v-if="activeItem.table.caption">{{ activeItem.table.caption }}</caption>
            <thead>
              <tr>
                <th v-for="header in activeItem.table.headers" :key="header" scope="col">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in activeItem.table.rows" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="activeItem.note" class="media-tabs__note">{{ activeItem.note }}</p>
      </div>
    </div>
  </section>
</template>
