<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  eyebrow?: string
  title: string
  description?: string
  tone?: 'default' | 'accent' | 'sand'
}>(), {
  tone: 'default'
})

const headingId = props.id ? `${props.id}-title` : undefined
</script>

<template>
  <section
    :id="id"
    class="lesson-block"
    :class="`lesson-block--${tone}`"
    :aria-labelledby="headingId"
  >
    <header class="lesson-block__header">
      <span v-if="eyebrow" class="lesson-block__eyebrow">{{ eyebrow }}</span>
      <h2 :id="headingId">{{ title }}</h2>
      <p v-if="description" class="lesson-block__description">{{ description }}</p>
    </header>
    <div class="lesson-block__body">
      <slot />
    </div>
  </section>
</template>
