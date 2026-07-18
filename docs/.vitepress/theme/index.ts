import DefaultTheme from 'vitepress/theme'
import CourseLayout from './CourseLayout.vue'
import MediaTabs from './MediaTabs.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: CourseLayout,
  enhanceApp({ app }) {
    app.component('MediaTabs', MediaTabs)
  }
}
