---
title: Steer 與 Queue
description: 任務進行中，用 Steer 立即修正方向、用 Queue 安排下一步，或另開 Thread 平行處理。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# Follow Up｜工作中也能改方向

<p class="lesson-lead">Codex 開始工作後，你不用等它全部做完才補充。現在就要改方向，用 Steer；想先讓這一輪做完，再安排下一步，用 Queue。</p>

## 先判斷：改現在，還是排下一步？

<div class="work-while-running">
  <section><span>Steer｜引導</span><h3>現在就要修正方向</h3><p>旅遊行程正在製作，這時才決定最後要交付成一份 HTML，就立刻補充。Codex 會沿用目前的規劃，改用新的格式繼續完成。</p></section>
  <section><span>Queue｜排入佇列</span><h3>目前先做完，下一步接著做</h3><p>HTML 還在建立，但你已經知道下一步要檢查手機版與待確認項目。先把驗收訊息排進 Queue，眼前的工作不會被打斷。</p></section>
</div>

補充內容和目前任務無關時，另外開新任務。例如行銷分析還在跑，你卻想整理另一場會議的筆記，兩邊分開會比較清楚。

你可以在 **Settings → 一般 → 後續跟進行為** 選擇預設送出方式。臨時想改用另一種方式，快捷鍵也會顯示在設定頁；請以自己的 App 畫面為準。

## Steer vs Queue

<MediaTabs
  aria-label="Steer 與 Queue 的差異"
  :items="[
    {
      label: 'Steer｜引導',
      title: '立即修正目前方向',
      description: '補充內容會改變這一輪的結果，就用 Steer。Codex 會停下原本的做法，改用你剛補充的指令繼續工作；不用等它做完，也不用手動取消重來。',
      demo: 'steer',
      steps: [
        {
          title: '看見偏差',
          description: '目前產出方向和真正想要的交付格式不同。'
        },
        {
          title: '補上具體指令',
          description: '直接指出要停止什麼、保留什麼，以及新的做法。'
        },
        {
          title: '沿新方向繼續',
          description: 'Codex 套用補充內容，接著完成目前的工作。'
        }
      ],
      code: '提供給我一份可以直接打開的 HTML 旅遊計畫。請建立 `tokyo-travel-plan.html`。'
    },
    {
      label: 'Queue｜排入佇列',
      title: '先讓目前工作完成，再接著處理',
      description: '下一步必須等目前結果出來，就用 Queue。訊息會先排在輸入框上方，等這一輪結束後再執行。',
      demo: 'queue',
      steps: [
        {
          title: '目前工作繼續',
          description: 'Queue 不會中斷 Codex 正在執行的內容。'
        },
        {
          title: '下一步先排隊',
          description: '訊息會出現在輸入框上方，輪到前都能編輯或刪除。'
        },
        {
          title: '完成後接著做',
          description: '目前工作結束後，Codex 再依序處理佇列訊息。'
        }
      ],
      code: '網站我想要有事前 checklist 功能。',
      note: 'Queue 不是平行執行。如果 B 與 A 無關，就另外開新任務。'
    }
  ]"
/>

## 留在同一個 Thread，還是開新 Thread？

判斷時看目標、檔案與 Context 是否相同，不用看訊息長短。

<div class="review-flow">
  <section><span>Steer｜現在</span><b>同一目標，立即修正</b><p>旅遊內容不變，但交付格式要從一般文字改成 HTML。用 Steer 補上新方向，Codex 會沿用目前素材與行程繼續製作。</p></section>
  <section><span>Queue｜下一步</span><b>同一目標，稍後接續</b><p>下一步需要用到目前產出，例如 HTML 完成後再檢查手機版與按鈕。先排進 Queue，等這一輪完成後接著做。</p></section>
  <section><span>New Thread｜獨立</span><b>不同目標，分開執行</b><p>工作跟目前結果無關、需要不同脈絡，或想平行處理，就開新 Thread。不要把兩件事的指示塞在同一段對話裡。</p></section>
</div>

::: tip 快速判斷
會改變**現在的結果**，用 **Steer**；需要等**目前產出完成**，用 **Queue**；目標或脈絡不同，開 **New Thread**。
:::

新 Thread 可以使用同一個工作資料夾，但不會接著上一段對話。請重新交代必要背景、檔案範圍與完成條件，不要假設它知道前一個 Thread 談過什麼。


## 參考資料

- [Settings](https://learn.chatgpt.com/docs/reference/settings)
- [Prompting｜Steering and queuing](https://learn.chatgpt.com/docs/prompting#steering-and-queuing)

<p class="source-note">本頁的 Steer／Queue 行為與佇列管理依 OpenAI 官方文件核對。快捷鍵會隨 App 版本、作業系統與「傳送快捷鍵」設定改變，請以 Settings → 一般顯示的提示為準。</p>
