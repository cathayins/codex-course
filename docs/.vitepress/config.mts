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
      {
        text: '快速上手',
        activeMatch: '^/quick-start/',
        items: [
          { text: 'What Is Codex', link: '/quick-start/' },
          { text: 'Codex for Engineer', link: '/quick-start/codex-for-engineer' },
          { text: 'Installation', link: '/quick-start/installation' },
          {
            text: 'Overview',
            items: [
              { text: 'Codex App', link: '/quick-start/app-interface' },
              { text: 'Codex IDE', link: '/quick-start/ide-interface' }
            ]
          },
          {
            text: 'Quick Start',
            items: [
              { text: 'First Project', link: '/quick-start/first-project' },
              { text: 'Models', link: '/quick-start/models' },
              { text: 'Prompting', link: '/quick-start/prompting' },
              { text: 'Slash Commands', link: '/quick-start/using-slash' },
              { text: 'Follow Up', link: '/quick-start/follow-up' },
              { text: 'Using Goals in Codex', link: '/quick-start/goals' },
              { text: 'Credits 精打細算', link: '/quick-start/token-efficiency' }
            ]
          }
        ]
      },
      {
        text: '進階課程',
        activeMatch: '^/advanced/',
        items: [
          { text: '學習路線', link: '/advanced/' },
          { text: 'AGENTS.md', link: '/advanced/agents-md' },
          { text: 'Config、權限與沙盒', link: '/advanced/permissions' },
          { text: 'Skills', link: '/advanced/skills' },
          { text: 'Plugins', link: '/advanced/plugins' },
          { text: 'MCP 與外部工具', link: '/advanced/mcp-tools' },
          { text: 'Scheduled tasks', link: '/advanced/automation' },
          { text: 'Subagents', link: '/advanced/worktrees' },
          { text: 'Hooks', link: '/advanced/hooks' }
        ]
      },
      {
        text: '實戰案例',
        activeMatch: '^/cases/',
        items: [
          { text: '案例總覽', link: '/cases/' },
          { text: 'Marketing 數據分析', link: '/cases/marketing-data' }
        ]
      }
    ],
    sidebar: {
      '/quick-start/': [
        {
          text: '快速上手',
          items: [
            { text: 'What Is Codex', link: '/quick-start/' },
            { text: 'Codex for Engineer', link: '/quick-start/codex-for-engineer' },
            { text: 'Installation', link: '/quick-start/installation' },
            {
              text: 'Overview',
              collapsed: false,
              items: [
                { text: 'Codex App', link: '/quick-start/app-interface' },
                { text: 'Codex IDE', link: '/quick-start/ide-interface' }
              ]
            },
            {
              text: 'Quick Start',
              collapsed: false,
              items: [
                { text: 'First Project', link: '/quick-start/first-project' },
                { text: 'Models', link: '/quick-start/models' },
                { text: 'Prompting', link: '/quick-start/prompting' },
                { text: 'Slash Commands', link: '/quick-start/using-slash' },
                { text: 'Follow Up', link: '/quick-start/follow-up' },
                { text: 'Using Goals in Codex', link: '/quick-start/goals' },
                { text: 'Credits 精打細算', link: '/quick-start/token-efficiency' }
              ]
            }
          ]
        }
      ],
      '/advanced/': [
        {
          text: '進階課程',
          items: [
            { text: '學習路線', link: '/advanced/' },
            { text: 'AGENTS.md', link: '/advanced/agents-md' },
            { text: 'Config、權限與沙盒', link: '/advanced/permissions' },
            { text: 'Skills', link: '/advanced/skills' },
            { text: 'Plugins', link: '/advanced/plugins' },
            { text: 'MCP 與外部工具', link: '/advanced/mcp-tools' },
            { text: 'Scheduled tasks', link: '/advanced/automation' },
            { text: 'Subagents', link: '/advanced/worktrees' },
            { text: 'Hooks', link: '/advanced/hooks' }
          ]
        }
      ],
      '/cases/': [
        {
          text: '實戰案例',
          items: [
            { text: '案例總覽', link: '/cases/' },
            { text: 'Marketing 數據分析', link: '/cases/marketing-data' }
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
