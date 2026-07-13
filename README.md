# Codex 學習中心

Codex 內部課程的靜態教材網站。目前先提供首頁、頂部導覽、教材左側目錄與內容佔位區，方便多人共同編輯。

## 網站結構

```text
site/
├── index.html            # 首頁
├── quick-start/          # 快速上手
├── advanced/             # 進階課程
├── cases/                # 實戰案例
├── resources/            # 學習資源
└── assets/
    ├── app.js            # 共用導覽與目錄設定
    └── styles.css        # 共用視覺樣式
```

新增或調整頂部導覽、左側目錄時，優先修改 `site/assets/app.js`；全站視覺統一由 `site/assets/styles.css` 管理。

## 本機預覽

在 repository 根目錄執行：

```bash
python3 -m http.server 4173 --directory site
```

接著開啟 <http://localhost:4173>。

## GitHub Pages

`.github/workflows/pages.yml` 會在變更合併並推送到 `main` 後，自動部署 `site/`。

首次啟用時，請到 GitHub repository：

1. `Settings` → `Pages`
2. `Build and deployment` → `Source`
3. 選擇 `GitHub Actions`

目前刻意只讓 `main` 自動部署，避免多個 feature branches 互相覆蓋同一個正式網站。`feature/github-pages` 上的修改不會直接更新網站；合併到 `main` 後才會上線。

> GitHub Pages 的公開範圍會受 repository 類型、方案與組織政策影響。加入內部教材前，請先確認 Pages 的存取政策。
