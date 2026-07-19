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
                <span>國泰產險內部教育訓練教材</span>
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
                  <strong>Roy</strong>
                  <a href="mailto:roysung@cathay-ins.com.tw">roysung@cathay-ins.com.tw</a>
                </li>
                <li>
                  <strong>Benson</strong>
                  <a href="mailto:bocheng@cathay-ins.com.tw">bocheng@cathay-ins.com.tw</a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div class="course-footer__legal">
          <div class="course-footer__legal-inner">
            <small>© {{ currentYear }} 國泰世紀產物保險股份有限公司. All rights reserved.</small>
            <small>僅供國泰產險內部教育訓練使用，未經授權不得對外公開、轉載或散布。</small>
          </div>
        </div>
      </footer>

      <footer v-else class="course-footer course-footer--legal" aria-label="教材聲明">
        <div class="course-footer__legal-inner">
          <small>© {{ currentYear }} 國泰世紀產物保險股份有限公司</small>
          <small>僅供國泰產險內部教育訓練使用</small>
        </div>
      </footer>
    </template>
  </Layout>
</template>
