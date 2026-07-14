# OpenAI Codex Course

以 **VitePress 1.6.4** 建立的 Markdown 課程網站。教材可直接編輯，合併到 `main` 後由 GitHub Actions 自動建置並部署 GitHub Pages。

## 專案結構

```text
docs/
├── index.md                    # 首頁內容
├── quick-start/                # 快速上手
├── advanced/                   # 進階課程
├── cases/                      # 實戰案例
├── resources/                  # 學習資源
├── public/                     # favicon 等公開素材
└── .vitepress/
    ├── config.mts              # 導覽、側欄、搜尋與網站設定
    └── theme/
        ├── CourseLayout.vue    # 共用版型與 footer
        └── custom.css          # 全站視覺樣式

DESIGN.md                       # 設計規範
.github/workflows/pages.yml     # GitHub Pages 部署流程
```

## Quick Start

先從最新 `main` 建立工作分支：

```bash
git switch main
git pull --ff-only
git switch -c codex/update-course-page
npm ci
npm run docs:dev
```

開啟終端顯示的本機網址即可預覽。

## 修改入口

- 編寫教材：修改或新增 `docs/**/*.md`
- 調整導覽與頁面順序：修改 `docs/.vitepress/config.mts`
- 調整首頁或 footer：修改 `docs/index.md`、`docs/.vitepress/theme/CourseLayout.vue`
- 調整全站樣式：修改 `docs/.vitepress/theme/custom.css`
- 調整 favicon：替換 `docs/public/` 內對應檔案
- 改變設計方向：同步更新 `DESIGN.md`

新增 Markdown 頁面後，記得在 `config.mts` 的 sidebar 加入連結；順序會同時決定上一頁與下一頁。

## Local 測試

```bash
npm run docs:build
npm run docs:preview
```

送出前確認桌機、手機、導覽、連結與 favicon；`docs:build` 必須成功。建置輸出位於已忽略版本控制的 `site/`。

## 發 PR 與 Merge

先提交並推送分支：

```bash
git status --short
git add docs/ README.md
git commit -m "精煉的中文修改說明"
git push -u origin HEAD
```

### GitHub 網頁操作

1. 到 repository 點選 **Compare & pull request**。
2. 確認 base 為 `main`，填寫中文標題、修改方向與測試結果。
3. 建立 PR，等待 GitHub Actions 通過。
4. 點選 **Squash and merge**，合併後確認 Pages 部署完成。

### GitHub CLI

```bash
gh pr create --base main --fill
gh pr checks --watch
gh pr merge --squash --delete-branch
```

若要自訂中文 PR 內容，可用 `gh pr create --base main --title "標題" --body "修改與測試說明"`。
