import DefaultTheme from 'vitepress/theme'
import CourseLayout from './CourseLayout.vue'
import LessonBlock from './LessonBlock.vue'
import MediaTabs from './MediaTabs.vue'
import EngineerEvolution from './EngineerEvolution.vue'
import AgentKnowledgeNav from './AgentKnowledgeNav.vue'
import FirstProjectDemo from './FirstProjectDemo.vue'
import SlashCommandDemo from './SlashCommandDemo.vue'
import CodexEnvironmentDemo from './CodexEnvironmentDemo.vue'
import CodexRuntimeDemo from './CodexRuntimeDemo.vue'
import FollowUpChoiceDemo from './FollowUpChoiceDemo.vue'
import WindowsSandboxGuide from './WindowsSandboxGuide.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: CourseLayout,
  enhanceApp({ app }) {
    app.component('LessonBlock', LessonBlock)
    app.component('MediaTabs', MediaTabs)
    app.component('EngineerEvolution', EngineerEvolution)
    app.component('AgentKnowledgeNav', AgentKnowledgeNav)
    app.component('FirstProjectDemo', FirstProjectDemo)
    app.component('SlashCommandDemo', SlashCommandDemo)
    app.component('CodexEnvironmentDemo', CodexEnvironmentDemo)
    app.component('CodexRuntimeDemo', CodexRuntimeDemo)
    app.component('FollowUpChoiceDemo', FollowUpChoiceDemo)
    app.component('WindowsSandboxGuide', WindowsSandboxGuide)
  }
}
