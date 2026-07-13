---
version: alpha
name: ChatGPT Learn
description: >-
  A clean, accessible documentation and use-case discovery platform for ChatGPT workflows. The design emphasizes
  clarity, progressive disclosure, and task-oriented navigation through a refined minimalist aesthetic.
logo:
  src: https://learn.chatgpt.com/favicon.png
colors:
  surface: '#ffffff'
  surface-dim: '#f9f9f9'
  surface-bright: '#ffffff'
  surface-container-lowest: '#f3f3f3'
  surface-container-low: '#efefef'
  surface-container: '#e8e8e8'
  surface-container-high: '#e0e0e0'
  surface-container-highest: '#d9d9d9'
  on-surface: '#181818'
  on-surface-variant: '#5d5d5d'
  inverse-surface: '#1a1a1a'
  inverse-on-surface: '#f5f5f5'
  outline: '#8f8f8f'
  outline-variant: '#c0c0c0'
  surface-tint: '#339cff'
  primary: '#339cff'
  on-primary: '#ffffff'
  primary-container: '#d4e8ff'
  on-primary-container: '#003d7a'
  inverse-primary: '#7ab8ff'
  secondary: '#006aff'
  on-secondary: '#ffffff'
  secondary-container: '#cce0ff'
  on-secondary-container: '#001d4d'
  tertiary: '#8b6cff'
  on-tertiary: '#ffffff'
  tertiary-container: '#e8deff'
  on-tertiary-container: '#2d1b5f'
  error: '#d32f2f'
  on-error: '#ffffff'
  error-container: '#ffcdd2'
  on-error-container: '#b71c1c'
  primary-fixed: '#d4e8ff'
  primary-fixed-dim: '#7ab8ff'
  on-primary-fixed: '#001d4d'
  on-primary-fixed-variant: '#003d7a'
  secondary-fixed: '#cce0ff'
  secondary-fixed-dim: '#7ab8ff'
  on-secondary-fixed: '#001d4d'
  on-secondary-fixed-variant: '#003d7a'
  tertiary-fixed: '#e8deff'
  tertiary-fixed-dim: '#b47af4'
  on-tertiary-fixed: '#2d1b5f'
  on-tertiary-fixed-variant: '#5d3fa0'
  background: '#ffffff'
  on-background: '#181818'
  surface-variant: '#f0f0f0'
typography:
  display:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 60px
    fontWeight: '700'
    lineHeight: 68px
    letterSpacing: '-0.02em'
  headline-lg:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: '-0.01em'
  headline-md:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: 0em
  title-lg:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: OpenAI Sans, ui-sans-serif, system-ui, sans-serif
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1280px
elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.05)
  md: 0 4px 12px rgba(0, 0, 0, 0.08)
  lg: 0 16px 40px rgba(0, 0, 0, 0.12)
layout:
  containerMaxWidth: 1280px
  gridColumns: 12
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.full}'
    padding: 8px 16px
    height: 40px
    border: none
  button-primary-hover:
    backgroundColor: '#2a8fd4'
    textColor: '{colors.on-primary}'
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)
  button-secondary:
    backgroundColor: transparent
    textColor: '{colors.primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    padding: 6px 12px
    height: 32px
    border: 1px solid {colors.outline-variant}
  button-secondary-hover:
    backgroundColor: '{colors.surface-container-high}'
    textColor: '{colors.primary}'
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)
  button-tag:
    backgroundColor: '{colors.surface-container}'
    textColor: '{colors.on-surface}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.md}'
    padding: 6px 12px
    height: 32px
    border: none
  button-tag-hover:
    backgroundColor: '{colors.surface-container-high}'
    textColor: '{colors.on-surface}'
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)
  card-collection:
    backgroundColor: '{colors.surface-container-lowest}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
    border: 1px solid {colors.outline-variant}
    boxShadow: '{elevation.sm}'
  card-collection-hover:
    backgroundColor: '{colors.surface-container-low}'
    boxShadow: '{elevation.md}'
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)
  input-search:
    backgroundColor: '{colors.surface-container-lowest}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.full}'
    padding: 12px 16px
    height: 44px
    border: 1px solid {colors.outline-variant}
  input-search-focus:
    borderColor: '{colors.primary}'
    boxShadow: 0 0 0 3px rgba(51, 156, 255, 0.1)
    transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)
  list-item:
    backgroundColor: transparent
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    textColor: '{colors.on-surface}'
  list-item-hover:
    backgroundColor: '{colors.surface-container-high}'
    textColor: '{colors.primary}'
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)
  badge-icon:
    backgroundColor: '{colors.primary-container}'
    rounded: '{rounded.lg}'
    padding: 12px
    width: 48px
    height: 48px
    display: flex
    alignItems: center
    justifyContent: center
  badge-icon-secondary:
    backgroundColor: '{colors.secondary-container}'
    rounded: '{rounded.lg}'
    padding: 12px
    width: 48px
    height: 48px
  badge-icon-tertiary:
    backgroundColor: '{colors.tertiary-container}'
    rounded: '{rounded.lg}'
    padding: 12px
    width: 48px
    height: 48px
---

## Overview

ChatGPT Learn is a task-oriented documentation platform that embodies 'Accessible Minimalism'—a design philosophy that prioritizes clarity, progressive disclosure, and purposeful whitespace over decorative elements. The interface serves developers, teams, and enterprises seeking structured workflows and use-case discovery. The aesthetic is deliberately restrained: a pure white canvas (#ffffff) with a vibrant blue accent (#339cff) that draws attention to actionable elements. The brand personality is precise, helpful, and non-prescriptive—it guides without overwhelming. Voice: direct, example-driven, conversational yet authoritative. Example sentence: 'Build a workflow that turns customer feedback into actionable insights in minutes.'

## Colors

The color system is anchored in a high-contrast, light-mode-first approach. Primary (#339cff) is the signature accent—used exclusively on CTAs ('Try ChatGPT'), interactive links, and focus states. It conveys trust and energy without aggression. Secondary (#006aff) provides a deeper blue for emphasis in data-heavy contexts; tertiary (#8b6cff) adds a gentle purple accent for specialized UI regions (badges, highlights). The surface stack is meticulously calibrated: surface (#ffffff) is the canvas, surface-container-lowest (#f3f3f3) creates subtle depth for cards and input fields, and surface-container-high (#e0e0e0) is reserved for hover states and active selections. On-surface (#181818) is near-black for maximum readability at 16px body text. On-surface-variant (#5d5d5d) is used for secondar

## Typography

The type system uses OpenAI Sans exclusively, a humanist sans-serif that balances technical precision with approachability. Display (60px, 700 weight, -0.02em tracking) anchors hero sections; headline-lg (40px, 600 weight) is reserved for page titles like 'Use cases'; headline-md (30px, 600 weight) breaks major content sections. Body-lg (18px, 400 weight, 28px line-height) is used for descriptive copy and hero subtitles; body-md (16px, 400 weight, 24px line-height) is the default for all body text and ensures 1.5 line-height ratio for accessibility. Label-md (14px, 600 weight, 20px line-height, 0.01em tracking) is applied to button text and category tags; label-sm (12px, 500 weight, 16px line-height, 0.02em tracking) is used for metadata, timestamps, and helper text. All headings use -0.01

## Layout

The layout follows a 12-column grid with a 1280px max-width container. The page rhythm is built on a 24px gutter (md spacing) for horizontal padding and 40px (lg spacing) for vertical section separation. The left sidebar (on desktop) uses 16px padding and a fixed width of ~200px; the main content area flexes to fill remaining space. On mobile (< 768px), the sidebar collapses into a hamburger menu, and the main content takes full width with 24px horizontal padding. The search input (44px height, full rounded corners) sits prominently below the hero, with 24px margin-bottom to the filter tags. Collection cards are laid out in a responsive grid: 1 column on mobile, 2 columns at 870px, 3 columns at 1284px, and 4 columns at 1496px. Each card has 24px padding and 1.5rem (24px) gap between items.

## Elevation & Depth

Depth is conveyed through subtle shadows and surface-color shifts rather than dramatic layering. Level 1 (Base): the white canvas with no shadow. Level 2 (Cards & Inputs): 0 1px 2px rgba(0, 0, 0, 0.05) shadow, 1px solid border at outline-variant (#c0c0c0), background at surface-container-lowest (#f3f3f3). Level 3 (Hover/Active Cards): 0 4px 12px rgba(0, 0, 0, 0.08) shadow, background shifts to surface-container-low (#efefef). Level 4 (Modals/Dropdowns): 0 16px 40px rgba(0, 0, 0, 0.12) shadow, background at surface (#ffffff) with 1px border. All shadow transitions use 150ms cubic-bezier(0.4, 0,

## Shapes

The shape philosophy is 'Functional Geometry'—rounded corners are applied strategically to signal interactivity and reduce visual harshness without sacrificing clarity. Buttons use full (9999px) border-radius to create pill-shaped CTAs that feel inviting and modern (e.g., 'Try ChatGPT' button). Secondary buttons and input fields use md (0.75rem / 12px) radius for a slightly more structured appearance. Collection cards and larger containers use lg (1rem / 16px) radius to balance softness with professionalism. Small UI elements (badges, icons) use md (0.75rem) radius. The DEFAULT radius (0.5rem

## Components

### Action Elements
Primary buttons (#339cff background, white text, 8px 16px padding, 40px height, full radius) are used for high-intent CTAs like 'Try ChatGPT'. On hover, the background shifts to #2a8fd4 with a 150ms transition. Secondary buttons (transparent background, primary text, 1px outline-variant border, 6px 12px padding, 32px height, md radius) are used for navigation and lower-priority actions. Tag buttons (surface-container background, on-surface text, 6px 12px padding, 32px height, md radius) filter use cases by category; on hover, the background shifts to surface-container-high. All buttons use label-md typography (14px, 600 weight).

### Containers & Surfaces
Collection cards (surface-container-lowest background, 24px padding, lg radius, 1px outline-variant border, sm shado

## Do's and Don'ts

**Do**
- Do use primary (#339cff) exclusively for CTAs, focus states, and interactive affordances—never for backgrounds or body text.
- Do maintain 24px gutter padding on all sides of the main content area; this ensures consistent breathing room and prevents text from touching viewport edges.
- Do apply 150ms cubic-bezier(0.4, 0, 0.2, 1) transitions to all interactive state changes (hover, focus, active) for predictable, smooth feedback.
- Do use full (9999px) border-radius only on primary buttons; use md (12px) or lg (16px) for cards and secondary elements to maintain visual hierarchy.
- Do stack sections vertically with 40px (lg spacing) separation; use 24px (md spacing) for subsection breaks within a major section.
- Do apply 1px solid outline-variant (#c0c0c0) borders to all input fields and cards to define boundaries without visual heaviness.

**Don't**
- Don't use secondary (#006aff) or tertiary (#8b6cff) as primary CTA colors; reserve them for supporting accents and specialized UI regions.
- Don't apply shadows larger than 0 16px 40px rgba(0, 0, 0, 0.12); excessive shadow depth contradicts the minimalist aesthetic.
- Don't use on-surface-variant (#5d5d5d) for body text; it's reserved for secondary labels, disabled states, and metadata.
- Don't mix border-radius values arbitrarily; stick to the defined scale (sm, DEFAULT, md, lg, xl, full) to maintain visual consistency.
- Don't apply background colors to body text or use text-shadow on body-md or larger; the high contrast of on-surface (#181818) on surface (#ffffff) is sufficient.
- Don't use more than 2 accent colors (primary + secondary or primary + tertiary) in a single UI region; visual noise undermines clarity.
