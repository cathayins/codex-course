---
title: Working with files
description: 同時建立多個任務，並用 Steer 或 Queue 調整正在進行的工作。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Follow Up｜分派與調整工作

<p class="lesson-lead">Codex 還在工作時，你仍然可以補充要求。先判斷這是不是同一件工作：無關的事情另外開任務；同一件工作的修正或下一步，再交給 Steer 或 Queue。</p>

## 先判斷是否為同一件任務

<div class="work-while-running">
  <section><span>不同任務與脈絡</span><h3>另開 Session 新增任務</h3><p>例如行銷分析還在跑，但你想整理另一場會議的筆記。開新任務，兩邊各自保留自己的檔案、對話與進度。</p></section>
  <section><span>同一任務、同脈絡</span><h3>使用 Steer「引導」 Queue「排入佇列」延續任務</h3><p>要修正眼前這一輪，用 Steer；要等這輪完成後接著做，用 Queue。不要為了一句補充又開一個新任務。</p></section>
</div>

Steer 和 Queue 的預設行為在 **Settings → 一般 → 後續跟進行為** 設定。設定頁會同時顯示「這次要改用另一種送出方式」的快捷鍵，現場請以自己的 App 畫面為準。

## Steer 與 Queue 怎麼選

<MediaTabs
  aria-label="Steer 與 Queue 的差異"
  :items="[
    {
      label: 'Steer｜引導',
      title: '中斷目前正在執行的內容，立即修改方向',
      description: 'Steer 適合立即改方向、補上剛漏掉的限制，或提供會影響眼前結果的新資料。Codex 會在目前工作中接收這則訊息，而不是等整輪完成。若原本做法已經不合用，可以直接說要停止哪個方向、改採什麼做法；不需要先手動取消再從頭開始。',
      image: '/images/quick-start/settings-follow-up.png',
      alt: 'Codex 一般設定中的後續跟進行為，可選擇排入佇列或引導',
      code: '補充：停止修改 budget.xlsx。保留原檔，改成另外建立 budget-review.xlsx。',
      note: '適合現在就會影響結果的資訊。快捷鍵會跟作業系統與送出設定一起變動，請看 Settings 當下顯示的提示。'
    },
    {
      label: 'Queue｜排入佇列',
      title: '把訊息留給下一輪，先讓目前工作完成',
      description: 'Queue 適合相依的後續工作，例如分析完成後再整理摘要、建立另一份檔案，或執行最後檢查。訊息會先出現在輸入框上方，你可以在輪到它之前編輯、調整順序、立即送出或刪除。排入佇列不是平行執行；Codex 會先完成眼前這一輪，再處理下一則。',
      image: '/images/quick-start/settings-follow-up.png',
      alt: 'Codex 一般設定中的後續跟進行為，可選擇排入佇列或引導',
      code: '分析完成後，再把結論整理成 notes/quick-read.md。',
      note: '適合「完成 A 之後再做 B」。如果 B 和 A 沒有關係，另外開新任務會更清楚。'
    }
  ]"
/>

最簡單的分法：**Steer（引導）改變 Codex 現在正在做的事；Queue（排入佇列）安排它接下來要做什麼。**

## 同一個案例，兩種訊息放的位置不同

假設 Codex 正在比較 `q2-campaign.csv`、`budget.xlsx` 與 `channel-notes.md`，準備找出值得加碼的三個渠道。

### 發現眼前做法需要修正：用 Steer

```text
補充：不要修改 @budget.xlsx，也不要把缺少的預算填成 0。
如果資料不足，請保留空白並列入待確認事項。
```

這則訊息會影響目前正在進行的分析，越早補上越有用。

### 分析完成後還有下一個交付：用 Queue

同一件分析完成後，可以把下一個動作放進 Queue：

```text
分析完成後，請把結論整理成 notes/quick-read.md。
保留三個建議渠道、主要數據、限制與待補資料。
不要改動三份來源檔。
```

Queue 裡如果還有第二、第三則訊息，可以在輸入框上方先調整順序。若發現要求寫錯，也可以在執行前編輯或刪除，不需要等 Codex 做完才重來。

## 明確說要修改，還是要新建

Codex 能修改檔案，也能建立新檔。兩種都合理，但 Prompt 要說清楚：

<div class="work-while-running">
  <section><span>修改現有檔案</span><h3>只修改指定檔案</h3><code class="media-tabs__code">請只修改 @notes/quick-read.md，補上每個渠道的預算差額。不要建立其他檔案。</code></section>
  <section><span>保留原版</span><h3>另外建立新檔</h3><code class="media-tabs__code">請保留 @notes/quick-read.md，另外建立 notes/quick-read-v2.md，再加入預算差額。</code></section>
</div>

如果檔名、路徑或「要不要保留原檔」會影響交付，就直接寫在當次訊息裡。不要只說「幫我整理一下」，讓 Codex 自己猜該覆蓋還是另存。

## 確認結果

任務完成後，先看 Codex 的回覆列出了哪些 Created、Edited 或檔案連結，再開右側面板確認。

<figure class="interface-figure">
  <img src="/images/quick-start/codex-app-data-result.webp" width="1600" height="900" loading="lazy" decoding="async" alt="Codex App 完成資料分析後，同時顯示回覆與建立的檔案">
  <figcaption>右側面板可以直接打開新建立的檔案；Git 專案也能從「檢閱」查看變更內容。</figcaption>
</figure>

點右上角的側邊面板按鈕，或使用畫面顯示的快捷鍵開啟。QuickStart 先看兩個地方：

<div class="review-flow">
  <section><span>01</span><b>檔案</b><p>確認新建檔案真的存在、路徑正確，也能直接打開閱讀。</p></section>
  <section><span>02</span><b>檢閱</b><p>若目前是 Git 專案，可查看有哪些檔案被修改、新增或刪除，以及每一行的差異。</p></section>
  <section><span>03</span><b>內容</b><p>確認渠道、數字、限制與來源符合需求。看到檔案存在，不代表內容已經正確。</p></section>
</div>

官方文件特別提醒，檢閱面板呈現的是整個 Git 工作區的變更，不只 Codex 這一輪做的修改。開始檢查前先切到 **Last turn** 或對應範圍，避免把自己原本的修改也算進來。一般文件資料夾若還不是 Git 專案，先用「檔案」打開成果即可。

有問題就留在同一個任務，直接指出檔案與要修正的位置：

```text
請只修改 @notes/quick-read.md。
第二個渠道的預算差額和 @budget.xlsx 不一致，請重新核對來源。
不要建立新檔，也不要改動三份來源檔。
```

## 參考資料

- [Settings](https://learn.chatgpt.com/docs/reference/settings)
- [Prompting｜Steering and queuing](https://learn.chatgpt.com/docs/prompting#steering-and-queuing)
- [Code review](https://learn.chatgpt.com/docs/code-review?surface=app)

<p class="source-note">Steer／Queue 的行為、佇列管理與檢閱面板依 OpenAI 官方文件核對。快捷鍵會跟 App 版本、作業系統與「傳送快捷鍵」設定一起變動，現場以 Settings → 一般顯示的提示為準。</p>
