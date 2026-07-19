<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress'
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
const route = useRoute()
const currentYear = new Date().getFullYear()
const isHome = computed(() => route.path === '/' || frontmatter.value.layout === 'home')
</script>

<template>
  <Layout>
    <template #home-hero-info-before>
      <p class="course-hero-eyebrow">COURSE 01 · FUNDAMENTALS</p>
    </template>
    <template #home-features-before>
      <section id="learning-paths" class="course-paths-intro">
        <div>
          <span>COURSE PATHS</span>
          <h2>從需要的深度開始</h2>
          <p>先完成一次可驗證的任務，再逐步理解工作流與真實案例。</p>
        </div>
      </section>
    </template>
    <template #layout-bottom>
      <footer
        v-if="isHome"
        class="course-footer course-footer--home"
        aria-label="網站資訊"
      >
        <div class="course-footer__main">
          <div class="course-footer__grid">
            <section class="course-footer__intro" aria-labelledby="course-footer-brand">
              <div class="course-footer__brand">
                <img :src="withBase('/favicon.svg')" alt="" width="24" height="24">
                <strong id="course-footer-brand">Codex Course</strong>
              </div>
              <p>
                <span>Codex Course 學習教材</span>
                從第一次任務開始，建立清楚、可驗證且可重複的 Codex 工作方式。
              </p>
            </section>

            <nav class="course-footer__nav" aria-labelledby="course-footer-nav-title">
              <h2 id="course-footer-nav-title">課程導覽</h2>
              <ul>
                <li><a :href="withBase('/quick-start/')">快速上手</a></li>
                <li><a :href="withBase('/advanced/')">進階課程</a></li>
                <li><a :href="withBase('/cases/')">實戰案例</a></li>
                <li><a :href="withBase('/resources/')">學習資源</a></li>
              </ul>
            </nav>

            <section class="course-footer__maintenance" aria-labelledby="course-footer-maintenance-title">
              <h2 id="course-footer-maintenance-title">教材維護</h2>
              <ul>
                <li>
                  <strong>Course Team</strong>
                  <a href="mailto:contact@example.invalid">contact@example.invalid</a>
                </li>
                <li>
                  <strong>Course Team</strong>
                  <a href="mailto:contact@example.invalid">contact@example.invalid</a>
                </li>
              </ul>
              <a
                class="course-footer__report"
                href="mailto:contact@example.invalid?cc=contact@example.invalid&amp;subject=Codex%20Course%20教材問題"
              >回報教材問題</a>
            </section>
          </div>
        </div>

        <div class="course-footer__legal">
          <div class="course-footer__legal-inner">
            <small>© {{ currentYear }} Codex Course. All rights reserved.</small>
            <small>本教材供公開學習參考，不作為正式政策、規範或操作指引。</small>
          </div>
        </div>
      </footer>

      <footer v-else class="course-footer course-footer--legal" aria-label="教材聲明">
        <div class="course-footer__legal-inner">
          <small>© {{ currentYear }} Codex Course</small>
          <small>本教材供公開學習參考</small>
        </div>
      </footer>
    </template>
  </Layout>
</template>
