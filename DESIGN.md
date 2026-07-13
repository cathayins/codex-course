---
version: beta
name: Codex Learning Center
description: >-
  A white, technical learning site for Codex with a single glass navigation shell.
  The content system combines a blue-lavender atmospheric home cover, crisp modular
  cards, cool blue accents, monospace utility labels, and precise borders. Glass is
  reserved for the top navigation; reading surfaces stay opaque and high contrast.
logo:
  type: monogram
  character: C
  src: site/assets/favicon.svg
  backgroundColor: '#e4e0ff'
  textColor: '#4b438f'
colors:
  background: '#f7f9fb'
  surface: '#ffffff'
  surface-subtle: '#eef3f7'
  ink: '#09111c'
  ink-muted: '#536577'
  ink-faint: '#7d8d9d'
  line: '#c9d5df'
  line-strong: '#2b455c'
  accent: '#1677d2'
  accent-hover: '#0f63b3'
  accent-soft: '#e5f3ff'
  focus: '#1677d2'
  error: '#b42318'
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
  headline-lg:
    fontSize: clamp(34px, 4vw, 48px)
    fontWeight: '650'
    lineHeight: 1.08
    letterSpacing: '-0.035em'
  headline-md:
    fontSize: 28px
    fontWeight: '650'
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  title-lg:
    fontSize: 20px
    fontWeight: '650'
    lineHeight: 1.35
    letterSpacing: '-0.01em'
  body-lg:
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 1.65
    letterSpacing: 0
  body-md:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 1.6
    letterSpacing: 0
  label-md:
    fontSize: 13px
    fontWeight: '650'
    lineHeight: 1.4
    letterSpacing: '0.05em'
  label-sm:
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 1.4
    letterSpacing: '0.08em'
rounded:
  none: 0
  sm: 2px
  md: 6px
  glass: 9999px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 72px
  xxl: 112px
  gutter: clamp(20px, 4vw, 48px)
layout:
  containerMaxWidth: 1280px
  readingMaxWidth: 720px
  gridColumns: 12
  sidebarWidth: 264px
  headerHeight: 88px
elevation:
  base: none
  glass: 0 16px 40px rgba(9, 17, 28, 0.12)
  raised: 0 8px 24px rgba(9, 17, 28, 0.08)
motion:
  fast: 120ms ease-out
  standard: 180ms cubic-bezier(0.2, 0, 0, 1)
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '#ffffff'
    border: 1px solid {colors.ink}
    rounded: '{rounded.sm}'
    height: 44px
    padding: 10px 18px
  button-primary-hover:
    backgroundColor: '{colors.accent}'
    borderColor: '{colors.accent}'
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    border: 1px solid {colors.line-strong}
    rounded: '{rounded.sm}'
    height: 44px
    padding: 10px 18px
  button-secondary-hover:
    backgroundColor: '{colors.surface-subtle}'
  card:
    backgroundColor: '{colors.surface}'
    border: 1px solid {colors.line-strong}
    rounded: '{rounded.md}'
    padding: 28px
    boxShadow: none
  card-hover:
    backgroundColor: '{colors.surface-subtle}'
    borderColor: '{colors.accent}'
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    border: 1px solid {colors.line-strong}
    rounded: '{rounded.sm}'
    height: 44px
    padding: 10px 12px
  tag:
    backgroundColor: transparent
    textColor: '{colors.ink-muted}'
    border: 1px solid {colors.line}
    rounded: '{rounded.sm}'
    padding: 5px 8px
  header:
    backgroundColor: rgba(238, 243, 247, 0.72)
    border: 1px solid rgba(255, 255, 255, 0.82)
    rounded: '{rounded.glass}'
    backdropFilter: blur(20px) saturate(135%)
    boxShadow: '{elevation.glass}'
  favicon:
    canvas: 32px square
    backgroundColor: '{colors.ink}'
    character: C
    characterColor: '#ffffff'
    fontWeight: '700'
    rounded: 4px
decorativeElements:
  outline-square:
    border: 1px solid {colors.accent}
    fill: transparent
    allowedCountPerSection: 2
  solid-square:
    backgroundColor: '{colors.ink}'
    sizeRange: 10px-44px
    allowedCountPerSection: 1
  rule:
    borderColor: '{colors.line-strong}'
    thickness: 1px
---

## Direction

Codex Learning Center uses **Technical Glass Editorial**: a white, precise visual language inspired by developer tools, technical publications, and modular knowledge libraries. The floating glass navigation introduces polish and depth; the content below remains crisp and information-led.

The experience is calm and direct. Information hierarchy, alignment, and whitespace do most of the visual work. Blue is used like the LangChain reference—as a technical signal for links and active states. The first home panel is the one expressive exception: a soft blue-lavender atmospheric field inspired by the Codex reference. The second panel and all inner pages remain white or very pale cool gray. Do not use dot arrays, dot matrices, or persistent background grids.

## Reference Analysis

The supplied examples point to three useful ideas:

- **Stripe:** strong hierarchy and technical precision are useful, but its gradients, saturated color fields, and elevated cards are too expressive for this site.
- **Google Antigravity:** monochrome-first controls and restrained typography are useful, but pill buttons, glass headers, and soft rounded containers still read like a familiar AI-tool template.
- **Provided screenshot:** the most relevant reference. Its appeal comes from an off-white grid canvas, oversized type, thin black outlines, rectangular information blocks, and sparse blue-violet geometry.
- **Tenten navigation screenshot:** the reference for the top shell only—one wide, floating, translucent capsule with generous horizontal spacing and a solid action button.
- **LangChain screenshot:** the reference for information architecture—fine cool borders, modular content cards, monospace utility labels, and blue technical accents. Translate the dark palette into a white theme and omit its dot-matrix artwork.
- **Tenten cover screenshot:** the reference for the home-page composition—one centered statement, a supporting line, and minimal actions. Keep the Codex version white and content-led rather than introducing a dark photographic background.

The resulting system combines one controlled glass moment at the top with a flat, white technical content system below. Do not apply the header treatment to cards, sidebars, or documentation panels.

## Anti-AI-Look Rules

Avoid the visual shortcuts most associated with generated AI landing pages:

- No gradients, aurora fields, blurred color blobs, or noise overlays outside the first home panel. The home cover may use a restrained blue-lavender multi-layer gradient without animation or texture.
- No decorative robot, sparkle, brain, orbit, mesh, or abstract 3D imagery.
- No dot arrays, halftone fields, or full-section background grids.
- No glass panels outside the top navigation shell.
- No large-radius content cards. Standard cards use 4–6px corners; only the header may use a capsule radius.
- No colored icon tiles repeated across card grids.
- No default pill containers. Full rounding is limited to the glass header, its primary CTA, true status dots, or compact counters.
- No hover lift, scale, or bounce. State changes use color, underline, or a border shift.
- No shadow on ordinary cards, navigation, buttons, or inputs.
- No blue-purple palette expansion. Use one accent only, and keep it below roughly 10% of a page's visible area.
- No marketing-style filler labels such as “Powered by AI” when the content can state the task directly.

## Color

The canvas is white to very pale cool gray (`#f7f9fb`). Main content panels use white with cool blue-gray borders. Deep navy-black (`#09111c`) is the structural color for headings, primary buttons, strong borders, and geometric marks.

Technical blue (`#1677d2`) is the brand accent. Use it for active navigation, text links, focus indicators, card-border hover states, and sparse line graphics. It may expand into a blue-lavender atmospheric palette only on the first home panel. Secondary text uses cool slate (`#536577`).

## Typography

Use the system sans-serif stack with `Noto Sans TC` fallback so Traditional Chinese remains crisp and consistent without depending on a branded webfont. Headlines are compact, bold, and tightly tracked; body copy is regular weight with generous line height.

Hero headlines may combine two text colors—near-black and the single accent—to create hierarchy without graphics. Use bilingual outlined display text only as a rare campaign treatment, never for body copy or navigation. Limit paragraph width to about 720px.

Use monospace selectively for navigation labels, filter-like labels, metadata, step numbers, commands, and paths. Headings and body copy remain in the sans-serif stack; the mix should feel technical without reducing Chinese readability.

## Layout

Use a 12-column grid inside a 1280px container. Desktop gutters scale from 24px to 48px; mobile gutters are 20px. Large landing-page sections use 72–112px vertical space, while documentation pages use a denser 40–72px rhythm.

Alignment should be visible and repeatable. Titles, introductory copy, cards, and rules should share column edges. Asymmetry is encouraged only when it follows the grid—for example, text occupying columns 1–7 and a small geometric composition occupying columns 10–12.

The home page uses two vertically anchored panels. Panel one fills the viewport with a centered cover composition on the atmospheric gradient; panel two snaps into place with a white or pale-gray learning-path surface and includes the site footer. Use mandatory scroll snap on larger screens and proximity snap on small screens so long mobile card content remains reachable. Documentation pages use whitespace and horizontal rules, not patterned backgrounds.

## Geometry & Decorative Material

Decorative material is optional and built from CSS or SVG primitives:

- 1px horizontal and vertical rules.
- One transparent square and one offset transparent square, with black or accent outlines.
- One small solid near-black square used as a visual stop.
- Large index numbers such as `01`, `02`, `03` set as plain text, not icon badges.

Keep decoration sparse. Prefer no decoration on the home cover. If a later content section needs a marker, use one short rule or one small geometric element. Decorative geometry is `aria-hidden="true"` and never carries meaning.

## Components

### Header and Brand

The header is a floating capsule inset 8–16px from the viewport edges. It uses a translucent cool-white fill, a light inner border, `backdrop-filter: blur(20px) saturate(135%)`, and one soft shadow. The capsule overlays both the atmospheric home cover and pale inner pages. The brand mark is a simple **C** monogram: a near-black square with a white capital `C`. Do not add an orbit, notification dot, gradient, or secondary glyph.

Use the same monogram for the browser favicon. Provide an SVG favicon as the default and keep a future PNG fallback at 32×32 if required. Every HTML page must include the favicon link with the correct relative path.

Navigation uses text and an accent underline for the active page. Hover changes text color or underline only.

The complete primary navigation remains available in the header on every page. On small screens it collapses into a borderless circular hamburger with asymmetric lines; the lines morph into a close icon when opened. The sidebar uses the neutral label “本頁目錄” and owns chapter-level navigation. On inner pages, the breadcrumb is low contrast and the page title is reduced to 28–36px with a compact summary. This keeps labels such as “學習資源” useful for orientation without letting the folder-level heading overpower the lesson content.

### Footer

The footer label is **Codex Course**. The right side uses the same sans-serif typography as the site and lists only two plain mail links: Roy (`roysung@cathay-ins.com.tw`) and Benson (`bocheng@cathay-ins.com.tw`), separated by a neutral `&`. Do not add avatars, role labels such as “講師”, “持續更新”, editorial status, or shared-work-model messaging.

### Buttons

Buttons are rectangular with a 2px radius. The primary button is near-black, becoming accent on hover. The secondary button is transparent with a 1px black border. Buttons must not move vertically on hover and must keep a visible focus outline.

### Cards and Lists

Cards are white modules with a 1px cool blue-gray border, 4–6px corners, and no resting shadow. Use 28px padding on desktop and 20px on mobile. On hover, change the background subtly or switch the border to accent; do not lift the card. Course cards remain typographic and do not add abstract dot or pattern headers.

Card numbers are unboxed text aligned with the card grid. Avoid repeated badge tiles. Tags are small rectangular labels with neutral borders, not rounded capsules.

### Documentation Shell

Documentation pages remain visually quieter than the home page. The sidebar uses rules and spacing instead of a filled panel. The current item is indicated with a 2px accent line and near-black text. Reading content stays on a white or off-white flat surface without nested rounded containers.

### Feedback and Motion

All interactive elements need a visible `:focus-visible` state using the accent color. Motion is limited to 120–180ms color, border-color, opacity, and underline transitions. Respect `prefers-reduced-motion`; the interface must remain fully understandable with motion disabled.

Each page uses a fast reading-order reveal on initial load. Labels, title, summary, and primary content appear in four short steps using opacity, a 10–14px upward translation, and a clipping reveal. Each step lasts 320–420ms; the complete sequence finishes within 650ms. Do not animate the entire page as one layer, type characters one by one, or delay navigation availability. Under `prefers-reduced-motion`, show everything immediately.

## Accessibility

- Maintain at least WCAG AA contrast for text and controls.
- Never use accent color alone to communicate state; pair it with an underline, border, label, or `aria-current`.
- Preserve a minimum 44×44px target for primary touch actions.
- Keep the skip link, semantic heading order, and landmark labels.
- Mark decorative line art as hidden from assistive technology.
- Do not place essential text in an outlined font treatment.

## Do / Don't

**Do**

- Build hierarchy with typography, columns, whitespace, and 1px rules.
- Use the accent deliberately and in small areas.
- Keep card edges crisp, surfaces opaque, and corner radii small.
- Use the simple `C` consistently in the site header and browser tab.
- Reuse a small set of line-and-square motifs across the site.
- Keep the home cover centered and visually quiet.
- Keep complete global navigation available while reducing the visual scale of inner-page folder headings.
- Let course content remain the strongest visual element.

**Don't**

- Extend glass or blur beyond the top navigation, or atmospheric gradients beyond the first home panel.
- Combine blue, cyan, purple, and pink as separate brand accents.
- put every label inside a pill or every number inside a colored tile.
- Add shadows to compensate for weak spacing or hierarchy.
- Use oversized rounded rectangles as the default container.
- animate layout position on hover.
- Use dot arrays or a persistent grid as atmosphere.

## Acceptance Checklist

- The home hero uses one restrained blue-lavender atmospheric gradient and no texture or dot field.
- The interface uses one accent color and neutral surfaces.
- Standard cards have 4–6px radius, 1px cool borders, and no resting shadow.
- Primary and secondary buttons use 2px radius and do not lift on hover.
- Decorative visuals are limited to sparse rules or a single small geometric marker.
- The home cover has no grid, dot array, or floating geometric composition.
- Header branding is a plain `C` without the existing blue dot.
- Every page displays the `C` favicon in the browser tab.
- The top navigation is the only translucent glass surface.
- The page remains white or pale cool gray; it does not inherit LangChain's dark canvas.
- Every page retains the full top navigation; inner-page folder titles are compact and subordinate to content.
- The home page snaps between exactly two visual panels on desktop.
- The footer reads “Codex Course” and lists Roy and Benson without update-status text.
- The initial text reveal completes quickly and is disabled by reduced-motion.
- Keyboard focus, mobile navigation, and reduced-motion behavior remain usable.
