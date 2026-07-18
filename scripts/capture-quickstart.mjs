import { mkdir } from 'node:fs/promises'
import { chromium } from '/Users/bocheng/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4173/codex-course'
const outputDir = process.argv[3] ?? '/private/tmp/quickstart-qa'

const routes = [
  ['01-what-is-codex', '/quick-start/'],
  ['02-codex-for-engineer', '/quick-start/codex-for-engineers'],
  ['03-installation', '/quick-start/installation'],
  ['04-app', '/quick-start/app-interface'],
  ['05-ide', '/quick-start/ide-interface'],
  ['06-first-project', '/quick-start/first-project']
]

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const desktop = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 })
const metrics = []

for (const [name, route] of routes) {
  const page = await desktop.newPage()
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: true })
  metrics.push(await page.evaluate((label) => ({
    page: label,
    title: document.title,
    width: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    images: [...document.images].map((image) => ({
      alt: image.alt,
      loaded: image.complete && image.naturalWidth > 0,
      width: image.naturalWidth,
      height: image.naturalHeight
    }))
  }), name))
  await page.close()
}

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
for (const [name, route] of [routes[0], routes[2], routes[3], routes[5]]) {
  const page = await mobile.newPage()
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
  await page.screenshot({ path: `${outputDir}/${name}-mobile.png`, fullPage: true })
  metrics.push(await page.evaluate((label) => ({
    page: `${label}-mobile`,
    width: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
  }), name))
  await page.close()
}

await browser.close()
console.log(JSON.stringify(metrics, null, 2))
