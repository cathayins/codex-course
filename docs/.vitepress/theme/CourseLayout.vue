<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
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
      <footer class="course-footer">
        <strong>Codex Course</strong>
        <div class="course-contacts">
          <a href="mailto:roysung@cathay-ins.com.tw">
            <b>Roy</b>
            <span>roysung@cathay-ins.com.tw</span>
          </a>
          <a href="mailto:bocheng@cathay-ins.com.tw">
            <b>Benson</b>
            <span>bocheng@cathay-ins.com.tw</span>
          </a>
        </div>
      </footer>
    </template>
  </Layout>
</template>
