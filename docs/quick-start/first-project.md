---
title: 開啟工作區
description: 在 Codex 開啟資料夾、認識存取權限，並送出第一個訊息。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial first-project-page
---

<script setup>
import PermissionOnion from '../.vitepress/theme/PermissionOnion.vue'
</script>

# 開啟工作區

<p class="lesson-lead">在 Codex 開啟工作資料夾，確認權限，再用一句話請它列出目前的檔案。</p>

<LessonBlock
  id="open-workspace"
  title="在 Codex 開啟資料夾（工作區）"
  description="Codex 透過資料夾區分工作區。開啟哪個資料夾，就是指定這次任務從哪裡開始。"
>
  <p>在 Codex App 的「專案」旁按 <strong>＋</strong>，選擇<strong>使用現有資料夾</strong>，再開啟上一頁準備好的 <code>codex-demo</code>。之後的對話與操作就從這個工作區開始。</p>

  <FirstProjectDemo mode="folder" />
</LessonBlock>

<LessonBlock
  id="project-permissions"
  title="Codex 能讀到哪裡、能做哪些事？"
  description="權限包含兩件事：可以存取的檔案與工具範圍，以及超出範圍時由誰核准。"
>
  <p>在允許的範圍內，Codex 可以讀取資料、建立或修改檔案，也能執行程式。當任務需要額外權限，例如存取其他位置或執行受限制的操作，就會依下方選項處理。</p>

  <PermissionOnion />

  <div class="fp-company-note">
    <strong>本課公司環境：完整存取已停用</strong>
    <p>課程操作以目前開啟的工作資料夾為範圍。需要使用的資料請放在 <code>codex-demo</code>，不要預期 Codex 能直接取得其他位置的檔案。</p>
    <p>實際可讀取的位置由公司權限設定決定；「完整存取已停用」本身不代表所有資料夾外的檔案都不可讀。</p>
  </div>
</LessonBlock>

<LessonBlock
  id="first-message"
  title="送出第一個訊息"
  description="在 codex-demo 的對話中貼上以下提示詞，確認 Codex 已開啟正確的工作資料夾。"
>

```text
請告訴我目前資料夾下有什麼檔案
```

  <FirstProjectDemo mode="message" />

  <p>檢查回覆中是否包含 <code>Marketing_Campaign_Data.xlsx</code>。如果沒有，先確認目前選取的工作區，以及 Excel 是否放在該資料夾中。</p>
</LessonBlock>

<div class="lesson-next-step">
  <span>下一步</span>
  <a href="./models">Models：認識模型與推理強度 →</a>
</div>

## 參考資料

- [Sandbox 與存取權限｜OpenAI](https://learn.chatgpt.com/docs/sandboxing)
- [代我核准（Auto-review）｜OpenAI](https://learn.chatgpt.com/docs/sandboxing/auto-review)
