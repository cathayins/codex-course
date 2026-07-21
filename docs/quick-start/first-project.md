---
title: First Project｜開始第一個 Codex 任務
description: 建立工作資料夾並在 Codex 開啟，選擇 Model，再送出第一個 Message。
outline: [2, 3]
aside: true
pageClass: quickstart-story first-project-page
---

<script setup>
import { withBase } from 'vitepress'
</script>

# First Project｜開始第一個 Codex 任務

<p class="lesson-lead">這次會用一份本機的東京旅遊需求，做出可以直接打開的行程網頁。先準備工作資料夾、沿用預設 Model，再確認 Codex 讀到正確檔案。</p>

<FirstProjectDemo mode="overview" />

## Step 1｜建立資料夾，並在 Codex 開啟

先在 Finder 或檔案總管建立 `tokyo-travel-demo`。下載下方的課程用需求檔，放進這個資料夾：

<a :href="withBase('/demo-assets/tokyo-trip-brief.txt')" download>下載 tokyo-trip-brief.txt</a>

開啟 Codex App，在「專案」旁按 **＋**，選擇 **使用現有資料夾**，再選取剛建立的 `tokyo-travel-demo`。這個資料夾就是 Codex 讀取需求、建立檔案與留下成果的範圍。

<FirstProjectDemo mode="folder" />

::: tip 資料夾只放這次要用的檔案
這次只放課程提供的 `tokyo-trip-brief.txt`，不要先放完成版。練習時也不要改用含有個資、密碼或公司機密的真實檔案。
:::

## Step 2｜選擇 Model

第一次練習先沿用輸入框下方顯示的預設 Model。之後要切換時，再點選 Model 名稱；實際選項以你的 Workspace 畫面為準。

<FirstProjectDemo mode="model" />

模型會影響速度、推理能力與用量，但不會替你補上缺少的工作目標。下一頁會再說明不同 Model 的適用情境。

## Step 3｜Send your first message

先用一句話說清楚目標，再補上 Codex 需要的檔案、背景或限制。第一個 Message 不必完美，看完結果後可以繼續補充。

<FirstProjectDemo mode="message" />

第一次先請 Codex 盤點資料夾，不要修改檔案：

```text
請先盤點這個資料夾，確認是否有 tokyo-trip-brief.txt。
說明檔案裡有哪些旅遊需求，先不要修改或建立檔案。
```

確認日期、同行者、住宿區域與限制都讀對後，再到 [Prompting](/quick-start/prompting) 蒐集規劃旅程會用到的資訊。

::: info 這個案例會一路用到 Quick Start 結束
後面會先根據需求檔蒐集新的研究素材，再用 Plan 安排行程、用 Steer 改變交付格式，最後留下單一 HTML 旅遊計畫。第一次操作不需要先安裝套件。
:::

## 這個 Demo 接下來怎麼走

- [選擇 Model](/quick-start/models)：先沿用預設值，知道什麼情況才需要調整。
- [Prompting](/quick-start/prompting)：蒐集資料並建立新的研究素材。
- [Slash Commands](/quick-start/using-slash)：用 `/plan` 讀取兩份素材，先定義規劃方向、準則與計畫書架構。
- [Follow Up](/quick-start/follow-up)：用 Steer 把交付格式改成 HTML，再用 Queue 安排驗收。
- [Credits 精打細算](/quick-start/token-efficiency)：回頭看這個任務如何縮小 Context、減少重工。
- [Using Goals](/quick-start/goals)：延伸練習，讓 Codex 持續追到畫面與內容都通過檢查。

## 參考資料

- [ChatGPT Quickstart](https://learn.chatgpt.com/docs/quickstart)
- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Prompting](https://learn.chatgpt.com/docs/prompting)
