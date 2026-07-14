---
version: 1.0
name: OpenAI Codex Course
description: >-
  A Markdown-first OpenAI Codex course site with a restrained blue-lavender cover,
  flat technical navigation, quiet documentation pages, and precise reading tools.
framework:
  name: VitePress
  version: 1.6.4
  contentSource: docs/**/*.md
  config: docs/.vitepress/config.mts
  theme: docs/.vitepress/theme/custom.css
logo:
  type: monogram
  character: C
  src: docs/public/favicon.svg
  backgroundColor: '#e4e0ff'
  textColor: '#4b438f'
colors:
  background: '#f7f9fb'
  surface: '#ffffff'
  surfaceSubtle: '#eef3f7'
  ink: '#09111c'
  inkMuted: '#536577'
  inkFaint: '#7d8d9d'
  line: '#c9d5df'
  lineStrong: '#2b455c'
  accent: '#1677d2'
  accentHover: '#0f63b3'
  accentSoft: '#e5f3ff'
  faviconBackground: '#e4e0ff'
  faviconText: '#4b438f'
typography:
  fontFamily: >-
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Noto Sans TC', sans-serif
  utilityFontFamily: >-
    'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace
  display:
    fontSize: clamp(48px, 7vw, 84px)
    fontWeight: '700'
    lineHeight: 0.98
    letterSpacing: '-0.055em'
  pageTitle:
    fontSize: clamp(30px, 3vw, 38px)
    fontWeight: '700'
    lineHeight: 1.18
    letterSpacing: '-0.03em'
  body:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 1.8
rounded:
  none: 0
  small: 3px
  card: 6px
spacing:
  unit: 4px
  gutter: clamp(20px, 4vw, 48px)
layout:
  containerMaxWidth: 1360px
  readingMaxWidth: 760px
  sidebarWidth: 280px
  headerHeight: 64px
motion:
  fast: 120ms ease-out
  reveal: 380ms cubic-bezier(0.2, 0.75, 0.25, 1)
---

## Direction

OpenAI Codex Course is a white, technical and editorial learning site. It should feel designed, calm and easy to maintain—not like a generated AI landing page. Typography, alignment, whitespace and fine rules provide most of the visual character.

The homepage is the only expressive surface: one restrained blue-lavender atmospheric cover followed by a white or pale-gray learning-path section. Inner pages stay quiet so the lesson content becomes the strongest element.

## Reference Analysis

The supplied references contribute different parts of the system:

- **Codex cover:** centered, confident product statement over a soft atmospheric field. Translate it into a course cover without copying OpenAI branding assets.
- **CodexGuide:** use its documentation information architecture—persistent global navigation, section navigation on the left, readable article content, an on-page outline on the right, and previous/next links below the article.
- **LangChain:** use fine borders, modular rhythm, monospace utility labels and blue technical accents. Do not inherit the dark canvas or dot-matrix artwork.
- **Tenten:** use the simple cover composition and generous spacing. The earlier rounded glass capsule is no longer part of this system; the latest direction requires a flat header.
- **Provided line-art example:** sparse lines and small squares are acceptable when a section needs structure. They are not required on every screen.

## Anti-AI-Look Rules

- No dot arrays, halftone fields, persistent grids, sparkles, robots, orbit graphics or abstract 3D objects.
- No aurora or blurred color fields outside the first homepage panel.
- No glass cards or floating rounded navigation capsule.
- No large-radius cards, repeated colored icon tiles or pill-shaped labels by default.
- No resting shadows on cards, buttons, sidebars or article panels.
- No hover lift, scale or bounce. Use color, underline and border changes.
- Use one functional accent color. Lavender belongs to the homepage atmosphere and favicon, not every control.
- Avoid filler labels such as “持續更新”, “Powered by AI” or internal implementation notes.

## Color

The general canvas is white to pale cool gray (`#f7f9fb`). Reading surfaces are white, bordered by cool blue-gray rules. Near-black (`#09111c`) structures headings and high-priority controls; slate (`#536577`) supports body copy.

Technical blue (`#1677d2`) is reserved for links, active navigation, focus indicators and sparse state changes. The homepage may expand into a restrained blue-lavender field. The favicon uses the dedicated DESIGN tokens: light lavender `#e4e0ff` behind a deep violet `#4b438f` **C**.

## Typography

Use the same system sans-serif stack throughout the site so Traditional Chinese and Latin text feel consistent. Headings are compact and tightly tracked; body copy is regular with generous line height. Do not introduce a decorative font for names, footer content or Chinese headings.

Monospace is limited to navigation labels, metadata, paths, commands and step numbers. It should signal technical information without becoming the primary reading face.

## Homepage

The homepage must state **OpenAI Codex Course** clearly. It consists of exactly two anchored visual sections on desktop:

1. A viewport-height centered cover on the restrained blue-lavender background, with one supporting statement and two actions.
2. A white or pale-gray learning-path section containing a short section introduction, one leading route and two supporting routes, followed by the footer.

Use mandatory scroll snap on larger screens, proximity snap on tablets, and no forced snap below 768px so the mobile header and long course cards remain stable. Do not add a dot field, grid texture, floating icon composition or product-logo imitation. Course route cards are typographic, rectangular and quiet.

## Global Navigation

The top navigation is a flat 64px bar spanning the viewport. It may use a subtle translucent pale fill and backdrop blur for legibility while scrolling, but it must not float, use a capsule radius, show a shadow or read as a glass component.

The brand is the lavender **C** favicon followed by “Codex Course”. Keep the complete primary navigation available on desktop as a simple text list: 首頁、快速上手、進階課程、實戰案例、學習資源. The active page uses a thin underline.

On mobile, use the framework’s compact menu control. It should be visually plain, have a 44px target and a visible focus state; do not add a circular glass button or decorative asymmetric icon treatment.

## Markdown Documentation Architecture

Every editable course page is a Markdown file under `docs/`. VitePress owns routing and common navigation.

- `docs/index.md`: homepage
- `docs/quick-start/`: 快速上手
- `docs/advanced/`: 進階課程
- `docs/cases/`: 實戰案例
- `docs/resources/`: 學習資源
- `docs/.vitepress/config.mts`: global navigation, sidebar order, search and labels

Markdown frontmatter stores the page title and description. `##` and `###` headings automatically form the right-side page outline. The order in the sidebar config also determines the previous and next page links.

## Inner Page Layout

Desktop documentation pages use three reading zones below the persistent top navigation:

1. **Left section navigation:** only the pages within the active section. Use spacing and one fine divider, not a large card. The active item receives a 2px blue line and pale blue background.
2. **Main article:** maximum 760px, white or pale background, no enclosing rounded panel. The lesson title is 30–38px and the introduction is compact.
3. **Right on-page outline:** generated from the current Markdown headings. Keep it low contrast and subordinate to the article.

The folder-level section label such as “學習資源” remains in the sidebar for orientation but must not repeat as an oversized visual banner inside every lesson. At the bottom of each article, show bordered **上一頁** and **下一頁** links based on sidebar order.

On tablet and mobile, the left sidebar becomes the framework’s section menu and the right outline may collapse. The article must remain readable without horizontal scrolling.

## Components

### Cards and Buttons

Cards use a white surface, 1px cool border, 4–6px radius and no resting shadow. Buttons use a 3px radius. Hover changes color or border only.

### Favicon

Provide SVG, 32×32 PNG and Apple touch icon formats in `docs/public/`. Every generated page includes the favicon links. Use a light-lavender square with a deep-violet **C**; do not add another symbol, notification dot or wordmark.

### Footer

The footer reads **Codex Course**. The right side contains two independent plain mail links:

- Roy — `roysung@cathay-ins.com.tw`
- Benson — `bocheng@cathay-ins.com.tw`

Do not place `&` between them. Do not add avatars, icons, “講師”, “持續更新”, editorial status or shared-directory implementation instructions.

## Motion

Each page uses a quick reading-order reveal: title, summary and initial content fade in while moving upward 10–14px. The full sequence finishes within 650ms. Navigation remains immediately available. Do not type characters one by one or animate the whole layout as one delayed layer.

Respect `prefers-reduced-motion`; when enabled, show content immediately and disable scroll snapping that could make navigation uncomfortable.

## Accessibility

- Maintain WCAG AA text and control contrast.
- Keep a visible `:focus-visible` indicator.
- Do not communicate active state by color alone; pair it with an underline, border or `aria-current`.
- Keep primary touch targets at least 44×44px.
- Preserve semantic heading order, skip links, landmarks and descriptive link text.
- Decorative lines are `aria-hidden` and never carry essential information.

## Acceptance Checklist

- Homepage clearly displays “OpenAI Codex Course”.
- Homepage has exactly two anchored sections on desktop and no dot/grid decoration.
- Top navigation is a flat text list, not a rounded floating capsule.
- Every course page is editable as Markdown under `docs/`.
- Inner pages show section navigation left, current-page outline right, and previous/next links below.
- Folder labels remain useful but subordinate to lesson content.
- The lavender `C` favicon appears in browser tabs and matches the DESIGN color tokens.
- The page remains white or pale gray; only the homepage cover uses the blue-lavender atmosphere.
- Cards and buttons have small radii, fine borders and no resting shadow.
- Footer shows Codex Course, Roy and Benson with no `&`, icons, role labels or update status.
- Initial reveal is quick and disabled under reduced-motion.
- Keyboard navigation, mobile layout and build output are verified before deployment.
