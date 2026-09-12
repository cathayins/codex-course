# Design QA — Quick Start / ChatGPT vs Codex

## Comparison target

- Source visual truth:
  - `/var/folders/93/jy5s5h4d6wb954g_5_jtd1m40000gn/T/TemporaryItems/NSIRD_screencaptureui_tApBFu/截圖 2026-09-11 17.09.36.png`
  - `/var/folders/93/jy5s5h4d6wb954g_5_jtd1m40000gn/T/TemporaryItems/NSIRD_screencaptureui_ZX9qTI/截圖 2026-09-11 17.11.36.png`
- Implementation route: `http://127.0.0.1:5175/codex-course/quick-start/`
- Implementation screenshots:
  - `/private/tmp/codex-course-what-is-final-v2.png` — ChatGPT resting state, desktop.
  - `/private/tmp/codex-course-what-is-codex-2.png` — Codex resting state, desktop.
  - `/private/tmp/codex-course-what-is-final-mobile-v2.png` — ChatGPT resting state, responsive layout.
  - `/private/tmp/codex-course-installation.png` — editorial style carried into the installation page.
- Combined comparison evidence:
  - `/private/tmp/codex-course-qa-full-final.png` — source and implementation full views in one image.
  - `/private/tmp/codex-course-qa-focus-final.png` — source interactive region and implementation comparison scene in one image.

## Viewport and normalization

- Source 1: 2140 × 1776 px. Source 2: 2210 × 1700 px. Both are desktop reference captures with their own page chrome and content.
- Desktop implementation: 1600 × 2400 px at a 1600 × 2400 CSS viewport and device scale factor 1.
- Responsive implementation: 500 × 3200 px at a 500 × 3200 CSS viewport and device scale factor 1.
- A 430 px headless capture was excluded because this Chrome build clamps `window.innerWidth` to 500 px while still writing a 430 px bitmap, which creates screenshot-only clipping. The 500 px capture is the valid minimum-width comparison for this browser.
- Source and implementation are not the same lesson. The source is treated as visual direction: compact top spacing, one comfortable reading surface, strong title hierarchy, a large interactive explanation area, and restrained neutral/blue tokens.

## States and interactions tested

- ChatGPT button: selected state, replay from step 1, four-step completion, final handoff message.
- Codex button: selected state, replay from step 1, four-step completion, final same-environment message.
- Repeated clicks restart the selected animation.
- Reduced-motion behavior resolves directly to the completed state.
- Button labels, pressed state, status updates, decorative icon hiding, and scene labels are present in the accessibility tree.
- Headless Chrome emitted macOS `CVDisplayLink` process warnings only; no page JavaScript, asset, or Vue errors appeared.

## Required fidelity surfaces

- Fonts and typography: Existing course fonts and weight hierarchy are preserved. Page headings remain large and direct; scene labels were increased after the first pass so they remain readable without competing with the lesson title. No truncation is visible at desktop or 500 px.
- Spacing and layout rhythm: The page keeps the reference’s compact start, generous section rhythm, and a single large explanation surface. The comparison switches from four repeated cards to two spatially different scenes. Desktop and responsive captures show no overlaps or valid-viewport horizontal overflow.
- Colors and visual tokens: The implementation uses the existing course neutral palette, blue interaction color, green Excel cue, and low-elevation surfaces. Selected and active states meet the surrounding contrast level without introducing an unrelated palette.
- Image quality and asset fidelity: Existing ChatGPT and Codex WebP assets remain sharp. Human, computer, cloud, file, folder, terminal, tool, and dashboard symbols come from Heroicons rather than custom SVG or CSS illustrations. No placeholder assets are present.
- Copy and content: Copy states the environment difference directly. ChatGPT shows upload/download handoff; Codex shows the AI working inside the selected computer and Project boundary. The programming and installation sections retain objective third-party wording.
- Icons and controls: Icons share one outline family, align to a consistent optical size, and do not replace the real ChatGPT/Codex brand marks. Both selector controls have visible hover, focus, selected, and replay behavior.
- Accessibility and responsiveness: Native buttons, focus-visible outlines, `aria-pressed`, live status text, reduced-motion handling, hidden decorative icons, and stacked mobile scenes are present. The valid 500 px capture has no clipped controls or text.

## Comparison history

### Pass 1

- [P1] ChatGPT and Codex looked like the same four-card process.
  - Evidence: both modes reused the same row of text-heavy cards; only labels changed.
  - Fix: replaced the shared layout with two distinct spatial scenes. ChatGPT places the user’s computer and cloud AI on opposite sides of a network boundary. Codex places Codex, Project, Terminal, Python, and Dashboard inside the user’s computer boundary.
  - Post-fix evidence: `/private/tmp/codex-course-what-is-final-v2.png` and `/private/tmp/codex-course-what-is-codex-2.png`.

- [P2] The prior editorial styling relied on too many nested cards.
  - Evidence: comparison, programming, overview, and installation steps each used separate bordered tiles.
  - Fix: kept one main reading surface, changed lesson sections to divider-based rhythm, flattened the introduction accent to a blue rule, and grouped secondary comparisons into continuous panels.
  - Post-fix evidence: `/private/tmp/codex-course-qa-full-final.png` and `/private/tmp/codex-course-installation.png`.

### Pass 2

- [P2] Scene labels were too small relative to the large explanation area.
  - Evidence: role, file, tool, and progress labels were visually faint in the first desktop comparison.
  - Fix: increased scene label sizes, raised inactive-state opacity, and kept the page/section hierarchy unchanged.
  - Post-fix evidence: `/private/tmp/codex-course-what-is-final-v2.png` and `/private/tmp/codex-course-qa-focus-final.png`.

## Findings

No actionable P0, P1, or P2 findings remain.

## Open questions

- None. The persistent VitePress sidebar is an intentional course-navigation constraint and was not present in the visual reference.

## Implementation checklist

- [x] Distinct ChatGPT and Codex environment scenes.
- [x] Click-to-replay interaction for both modes.
- [x] Desktop and responsive visual checks.
- [x] No valid-viewport horizontal overflow.
- [x] Build completes and Vue assets load.
- [x] Advanced-course page content remains untouched.

## Follow-up polish

- [P3] If classroom projection makes the progress labels feel small, they can be raised another 1 px without changing the scene layout.

## Demo setup follow-up QA

- Route: `http://127.0.0.1:5175/codex-course/quick-start/demo-setup`
- The page now contains only the preparation scope needed at this stage: Summary, Marketing Excel download, data explanation, sheet overview, and field definitions.
- The download anchor resolves to the exact GitHub raw URL supplied for `Marketing_Campaign_Data.xlsx` and retains a download filename.
- The sidebar places `Demo 案例建立` immediately before `First Project`; the removed Introduction route is no longer present in the sidebar, footer, or QuickStart configuration.
- The page uses the existing editorial reading surface, a focused download panel, the existing file-tree visual, and the existing `MediaTabs` component for the three sheets.
- At the local preview viewport (1017 px wide), `document.documentElement.scrollWidth` equals `clientWidth`; no horizontal overflow was detected. The download panel and data sections remain within the content column.
- The Codex App interface page was restored from the earlier complete `app-interface.md` content and placed at the current nested route without adding the new lesson wrappers.
- The homepage second course path is restored to `進階課程`, linking to `/advanced/`; its Skills, Plugins, and Scheduled tasks content remains untouched.
- VitePress production build and `git diff --check` pass. No files under `docs/advanced/` were modified in this follow-up.

final result: passed
