import { defineConfig } from 'vitepress'

const base = '/codex-course/'

export default defineConfig({
  lang: 'zh-Hant',
  title: 'OpenAI Codex Course',
  titleTemplate: ':title｜OpenAI Codex Course',
  description: '從第一次任務到可複用工作流的 OpenAI Codex 課程。',
  base,
  cleanUrls: true,
  outDir: '../site',
  appearance: false,
  lastUpdated: false,
  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg?v=4`, type: 'image/svg+xml', sizes: 'any' }],
    ['link', { rel: 'icon', href: `${base}favicon-32.png?v=4`, type: 'image/png', sizes: '32x32' }],
    ['link', { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png?v=4` }],
    ['meta', { name: 'theme-color', content: '#f7f9fb' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Codex Course',
    nav: [
      { text: '首頁', link: '/' },
      { text: '快速上手', link: '/quick-start/' },
      { text: '進階課程', link: '/advanced/' },
      { text: '實戰案例', link: '/cases/' },
      { text: '學習資源', link: '/resources/' }
    ],
    sidebar: {
      '/quick-start/': [
        {
          text: '快速上手',
          items: [
            { text: '課程導覽', link: '/quick-start/' },
            { text: '認識 Codex', link: '/quick-start/what-is-codex' },
            { text: 'Codex App 介面', link: '/quick-start/app-interface' },
            { text: '建立第一個專案', link: '/quick-start/first-project' },
            { text: '完成第一個任務', link: '/quick-start/first-task' },
            { text: '成果檢查與交付', link: '/quick-start/validation-delivery' }
          ]
        }
      ],
      '/advanced/': [
        {
          text: '進階課程',
          items: [
            { text: '學習路線', link: '/advanced/' },
            { text: '理解陌生 Codebase', link: '/advanced/codebase' },
            { text: 'AGENTS.md', link: '/advanced/agents-md' },
            { text: 'Skills 與 Plugins', link: '/advanced/skills-plugins' },
            { text: 'MCP 與外部工具', link: '/advanced/mcp-tools' },
            { text: '權限、沙盒與審批', link: '/advanced/permissions' },
            { text: '團隊工作流', link: '/advanced/team-workflow' }
          ]
        }
      ],
      '/cases/': [
        {
          text: '實戰案例',
          items: [
            { text: '案例總覽', link: '/cases/' },
            { text: '素材轉簡報', link: '/cases/presentation' },
            { text: 'Marketing 數據分析', link: '/cases/marketing-data' },
            {
              text: 'Codebase 理解 Demo',
              link: '/cases/codebase-review',
              collapsed: false,
              items: [
                { text: 'Part 1｜理解專案', link: '/cases/codebase-review/understand-project' },
                { text: 'Part 2｜動手修改', link: '/cases/codebase-review/modify-project' }
              ]
            },
            { text: '建立系統架構圖', link: '/cases/architecture-diagram' },
            { text: '驗證與 PR 交付', link: '/cases/pr-delivery' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '學習資源',
          items: [
            { text: '資源總覽', link: '/resources/' },
            { text: 'Prompt 範本', link: '/resources/prompt-template' },
            { text: 'AGENTS.md 範本', link: '/resources/agents-template' },
            { text: 'Skill Starter', link: '/resources/skill-starter' },
            { text: '驗收清單', link: '/resources/checklist' },
            { text: '官方文件', link: '/resources/official-docs' },
            { text: '課後練習', link: '/resources/practice' }
          ]
        }
      ]
    },
    outline: {
      level: [2, 3],
      label: '本頁內容'
    },
    docFooter: {
      prev: '上一頁',
      next: '下一頁'
    },
    sidebarMenuLabel: '本節目錄',
    returnToTopLabel: '回到頂端',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜尋', buttonAriaLabel: '搜尋課程' },
          modal: {
            noResultsText: '找不到相關內容',
            resetButtonTitle: '清除搜尋',
            footer: { selectText: '選擇', navigateText: '切換', closeText: '關閉' }
          }
        }
      }
    }
  }
})
