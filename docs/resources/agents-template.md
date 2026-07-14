---
title: AGENTS.md 範本
description: 建立簡短、可執行的 repository 協作說明。
---

# AGENTS.md 範本

```md
# Project rules

## Setup and commands
- Install: `npm ci`
- Test: `npm test`
- Build: `npm run build`

## Structure
- `src/`: application source
- `tests/`: automated tests

## Change rules
- Preserve existing public APIs unless requested.
- Do not commit generated output or secrets.

## Before delivery
- Run tests and build.
- Review the diff for unrelated changes.
```

## 調整原則

只保留此專案真正需要、且能被執行或檢查的規則。過長的背景說明應移到一般文件。
