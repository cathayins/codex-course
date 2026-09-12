# Codex Course 改版實作意圖

## 1. 任務目標

將目前的 Codex Course VitePress 網站，逐步改造成更接近
[VibeAcademy Module 1](https://academy.vibetech.tw/module/1) 的閱讀體驗：

1. 以清楚的 Block 閱讀結構取代長篇連續文章。
2. 將重要概念包裝成可操作的互動實驗。
3. 建立一致、輕量、流暢的動畫系統。
4. 保留 VitePress 與目前網站的內容、路由及既有元件，採增量改造。

這是一個「內容呈現層」的改版，不是重寫課程內容，也不是更換整個技術棧。

## 2. 明確非目標

本次不要實作以下功能：

- 課程播放器。
- 音訊播放器、語音解說或影片同步播放。
- 講師頭像、跟隨解說或自動捲動。
- 影片進度、播放進度或課程播放器控制列。
- 將專案從 VitePress/Vue 遷移到 Next.js/React。
- 複製目標網站的 Logo、插圖、文字、原始碼或品牌資產。

只借鑑目標網站的資訊架構、Block 節奏、互動方式與動畫原則。

## 3. 重要保留規則

這個 repository 目前有使用者既有修改。實作時必須：

- 不刪除、不丟棄、不覆蓋目前 `docs/` 內已有的課程內容。
- 不任意刪除既有頁面、路由、圖片或 Vue 元件。
- 不使用 `git reset --hard`、`git checkout --` 或其他還原工作區的方式。
- 開始前先確認 `git status --short --branch`，保留所有與本任務無關的修改。
- 只在本次改版確實需要時修改檔案，避免大範圍重排或格式化既有內容。
- 優先重用現有的 `MediaTabs`、`EngineerEvolution`、`FirstProjectDemo`、`SlashCommandDemo` 等元件。
- 若既有元件已經能工作，先加上統一的 Block 外層，不要為了換皮而重寫互動邏輯。

所有既有文字都應該可以在改版後繼續被閱讀；若需要調整結構，應採「搬移到 Block」而不是刪除內容。

## 4. 目前技術基礎

- VitePress `1.6.4`。
- Vue 元件與 Markdown 混合內容。
- 主題入口：`docs/.vitepress/theme/index.ts`。
- 主要 Layout：`docs/.vitepress/theme/CourseLayout.vue`。
- 共用樣式：`docs/.vitepress/theme/custom.css`。
- 內容主要位於 `docs/quick-start/`、`docs/advanced/` 與 `docs/cases/`。

目前專案已經有卡片、圖片分頁、互動 Demo 及 reveal/hover 動畫，因此應先利用既有能力建立統一視覺語言，而不是引入新的 UI 框架或動畫框架。

## 5. 目標閱讀結構

### 5.1 Lesson Block

新增一套可重用的課程 Block 規範。每個 Block 只負責一個清楚的教學目標，建議包含：

- 可選的小標或主題標籤。
- Block 標題。
- 一句到兩句的引導說明。
- 可選的時間或難度提示，但不要做成播放器功能。
- 文字、圖片、程式碼或互動實驗內容。
- 需要時提供重設、繼續、查看結果等局部操作。

建議使用語意化結構，例如：

```vue
<LessonBlock
  id="first-task"
  title="先把任務說清楚"
  description="好的任務描述會讓 Codex 更容易驗證結果。"
>
  <!-- 保留原本的 Markdown、圖片或既有互動元件 -->
</LessonBlock>
```

實際 props 與檔名可依現有程式風格調整，但不要讓每一頁自行發明一套卡片 CSS。

### 5.2 視覺節奏

目標是「一條主要閱讀欄位、明確區塊、適度留白」：

- 內容欄桌機建議最大寬度約 `768px–840px`。
- 每個 Block 使用暖白背景、圓角與非常輕的陰影。
- Block 之間維持一致的垂直間距，建議約 `32px`。
- 手機版改為單欄，左右保留約 `16px` 內距。
- 互動內容必須在自己的 Block 內完成，不讓控制項散落在頁面各處。
- 原本 VitePress 的文件導航、sidebar、outline 應保留；只在指定的 lesson/block 頁套用較沉浸的閱讀樣式，避免整個網站失去文件導覽能力。

### 5.3 建議視覺 Token

可以朝以下方向調整，但先集中在 lesson 頁，不要一次改壞全站：

```css
--lesson-background: #f9f8f6;
--lesson-surface: #ffffff;
--lesson-text: #252423;
--lesson-muted-text: rgba(37, 36, 35, 0.7);
--lesson-border: #e3e2dd;
--lesson-accent: #7c3aed;
--lesson-highlight: #ff9b6e;
```

整體感受以暖灰、黑色文字、紫色互動重點和少量桃色高光為主。不要直接複製目標站的品牌資產。

## 6. 互動實驗方向

互動實驗應該用來幫助理解概念，而不是單純裝飾。優先從目前已存在的元件開始整理：

- `EngineerEvolution`：適合改成「狀態切換／時代演進」Block。
- `FirstProjectDemo`：適合改成任務流程或逐步完成的操作 Block。
- `SlashCommandDemo`：適合改成選擇指令後即時顯示結果的實驗。
- `MediaTabs`：保留其分頁、鍵盤操作及圖片預載能力，套上統一 Block 外觀。

後續可以建立共用互動 primitives：

- Tabs／狀態切換。
- Choice cards／選項卡片。
- Step reveal／逐步揭露。
- Sort cards／拖曳或鍵盤排序。
- Prompt builder／由選項組合輸出內容。
- Quiz／選擇答案並顯示即時回饋。

每個互動實驗至少要具備：

- 明確的初始狀態。
- 可重設或重新操作的方式。
- 操作後的視覺回饋。
- 鍵盤可操作的替代方式。
- 基本的 `aria-label`、focus 狀態與按鈕語意。
- 手機觸控不會誤觸或產生水平溢出。

## 7. 動畫系統方向

動畫以 CSS 為主，不要為了模仿目標站而引入 GSAP、Framer Motion 或其他大型依賴。

### 7.1 動畫原則

- 優先動畫 `transform` 和 `opacity`。
- 避免持續動畫 width、height、top、left 或會造成大量 layout recalculation 的屬性。
- 進場動畫約 `0.3s–0.5s`。
- hover／focus 回饋約 `0.15s–0.25s`。
- 狀態切換約 `0.25s–0.85s`，依內容複雜度調整。
- 可使用 `cubic-bezier(.22, 1, .36, 1)` 作為主要進場 easing。
- 只有需要傳達狀態的元素才使用 pulse；避免整頁不停閃動。
- 不要讓動畫阻塞內容閱讀或互動。

### 7.2 必須支援 reduced motion

所有新增的 animation/transition 都要提供：

```css
@media (prefers-reduced-motion: reduce) {
  .lesson-block,
  .lesson-block * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

實際 selector 應避免過度寬泛，不能因此破壞既有 VitePress 元件。

### 7.3 動畫命名

新增動畫請使用本專案自己的命名，例如 `lessonBlockIn`、`lessonStateChange`、`lessonChipRise`，不要照抄目標站的 `u111-*` 或 `u12-*` class 名稱。

## 8. 實作順序

### Phase 1：建立 lesson/block 外殼

1. 先檢查現有頁面及元件，不先重寫內容。
2. 建立 lesson page class 或等效的 frontmatter 開關。
3. 建立共用 `LessonBlock` 視覺外殼。
4. 只在 lesson 頁調整內容欄寬、背景、卡片、間距及 mobile reflow。
5. 確認一般文件頁仍維持可用的 VitePress sidebar 與 outline。

### Phase 2：選一頁做試點

優先使用 `docs/quick-start/first-project.md` 作為 pilot：

- 保留原有全部文字與圖片。
- 將內容整理成 3–4 個具有單一目的的 Block。
- 先套上 1–2 個現有互動元件。
- 確認 desktop/mobile 閱讀節奏，再推廣到其他頁面。

### Phase 3：統一互動與動畫

- 將既有 Demo 的卡片、按鈕、狀態回饋統一到 lesson token。
- 補足 keyboard、focus、reset 與 reduced-motion 行為。
- 僅對真正有意義的狀態變化加入動畫。
- 不要把每一個段落都做成動畫，避免閱讀疲勞。

### Phase 4：逐頁遷移

依序處理 quick-start、advanced、cases；每完成一頁就驗證，不要一次大規模改寫所有 Markdown。

## 9. 驗收條件

完成後應符合：

- 既有內容、路由、圖片與互動元件仍可使用。
- 不包含課程播放器或音訊播放功能。
- 指定 lesson 頁能清楚呈現為多個獨立 Block。
- 每個互動實驗都能重設、操作並得到即時回饋。
- 互動元件支援基本鍵盤操作與 focus 狀態。
- 動畫主要使用 transform/opacity，視覺上不應卡頓或造成明顯跳動。
- `prefers-reduced-motion` 使用者不會被強制觀看大量動畫。
- 1280px 桌機與約 390px 手機寬度都沒有水平溢出。
- 手機版 Block、按鈕、表格、程式碼及圖片都能正常閱讀。
- 執行 `npm run docs:build` 成功。
- 執行 `git diff --check` 沒有錯誤。

## 10. 下一個 Session 的開始方式

請先閱讀 `AGENTS.md` 與本檔案，接著：

1. 檢查工作區狀態，保留目前所有既有修改。
2. 查看 `CourseLayout.vue`、`custom.css`、`MediaTabs.vue` 與 pilot 頁面。
3. 先提出或實作最小的 `LessonBlock` 外殼，不要先改全部內容。
4. 以 `docs/quick-start/first-project.md` 驗證 Block、互動與動畫。
5. 以桌機和手機檢查後，再決定是否擴展到其他課程頁。

本任務的成功標準是：在不丟失現有教材的前提下，讓內容更容易分段閱讀，並讓互動實驗成為教學內容的一部分。
