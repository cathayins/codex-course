---
title: 調整分析方向
description: 分析報告製作中，用 Steer 改變分析重點，用 Queue 安排完成後的檢查。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial task-lesson follow-up-page
---

# 調整分析方向

<p class="lesson-lead">上一頁的報告正在跑 — 這一頁所有操作都發生在「它還在工作」的那段時間。真實工作裡，需求常常是做到一半才想清楚的；重點是不打掉重做，直接在過程中把方向修正過來。</p>

<LessonBlock id="follow-up-choice" title="現在插隊，還是排到後面？" description="Codex 工作中仍然收得到訊息。差別只有一個：這則訊息要進到「現在這一輪」，還是「這一輪做完之後」。">

<FollowUpChoiceDemo />

判斷方式只有一句話 — **這件事會改變它現在正在寫的內容嗎？** 會，就 Steer；不會，就 Queue。

<div class="followup-cases">
  <section class="followup-cases--steer">
    <h3><span class="followup-cases__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 12 7 8.4v7.2z"/><rect x="9.2" y="3.9" width="11.8" height="3.3" rx="1.65" opacity=".34"/><rect x="9.2" y="10.35" width="11.8" height="3.3" rx="1.65"/><rect x="9.2" y="16.8" width="11.8" height="3.3" rx="1.65" opacity=".34"/></svg></span> 這些情況用 Steer</h3>
    <ul>
      <li>分析少了一個指標，想現在就補進去</li>
      <li>發現方向偏了，要立刻轉向</li>
      <li>語言、格式或檔名交代錯了</li>
      <li>它正在往你不要的地方做，越早喊停越省</li>
    </ul>
  </section>
  <section class="followup-cases--queue">
    <h3><span class="followup-cases__icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="3.9" width="18" height="3.3" rx="1.65"/><rect x="3" y="10.35" width="18" height="3.3" rx="1.65" opacity=".62"/><rect x="3" y="16.8" width="18" height="3.3" rx="1.65" opacity=".34"/></svg></span> 這些情況用 Queue</h3>
    <ul>
      <li>報告寫完之後才要做的核對</li>
      <li>接下來的另一件事，例如整理成簡報</li>
      <li>想到就先記下來，免得等一下忘記</li>
      <li>需要看到完整成果才能判斷的修改</li>
    </ul>
  </section>
</div>

在 Settings → 一般 → 後續跟進行為可以選預設方式，也能依設定頁顯示的快捷鍵，臨時改用另一種送出方式。
</LessonBlock>

<LessonBlock id="steer-report" title="動手一：用 Steer 改變分析重點" description="趁報告還在製作，把以下訊息以「引導」方式送出。">

```text
請調整這次報告的分析重點：
除了營收與 ROAS，也要比較各平台的入學轉換率。
建議不要只依 ROAS 排名，請一起考慮實際入學人數。
```

這段話刻意寫得像你會當場打出來的樣子 — 不是規格書。中途引導不需要重新交代背景，因為這一輪的脈絡都還在；你只要講**改變的部分**。

如果想更精確，可以再補一句定義，例如「入學轉換率＝加總 Enrollments ÷ 加總 Applications，分母為零請標示無法計算」。不補的話，Codex 通常會自己選一種算法 — 那就要在結果裡確認它用的是哪一種。

送出後看後續回覆有沒有開始提到入學轉換率。注意它不一定會立刻中斷正在執行的工具，可能要等當前這個步驟跑完才看得到反應。
</LessonBlock>

<LessonBlock id="queue-report-check" title="動手二：用 Queue 排完成後的核對" description="報告還在製作時，把下面的檢查要求排進佇列。">

```text
報告完成後，請核對 marketing_analysis_report.md
與 Marketing_Campaign_Data.xlsx 的各平台數字：
總成本、總營收、ROAS、Applications、Enrollments 與入學轉換率。

確認比率使用加總後的分子與分母，
並檢查摘要與正文是否一致。
如有差異，請修正報告並說明修正內容。
將檢查結果附在報告末尾，保留原始 Excel 與 Dashboard。
```

送出後在輸入框上方會看到這則待辦訊息，需要時可以編輯、調整順序或刪除。這是 Queue 比「等它做完再打字」好用的地方：想到的當下就排進去，不必守在螢幕前。
</LessonBlock>

<LessonBlock id="check-report" title="驗收：打開報告，確認改的東西留下來了">

中途引導最常見的失敗，是「它口頭答應了，但檔案裡沒有」。完成後開啟 `marketing_analysis_report.md`，逐項確認：

<ul class="task-checklist">
  <li><b>新增的在不在</b><span>平台比較是否同時有 ROAS、入學轉換率與實際入學人數。</span></li>
  <li><b>原本的有沒有掉</b><span>月度分析是否保留，摘要是否也跟著更新。</span></li>
  <li><b>算法對不對</b><span>比率是否用加總後的分子分母，分母為零有沒有標示。</span></li>
  <li><b>核對有沒有做</b><span>報告末尾是否記錄 Queue 那則要求的檢查結果。</span></li>
</ul>

如果這一輪已經跑完才想到要改，直接在同一段對話提出就好 — Steer 與 Queue 的差別，只存在於 Codex 還在工作的那段時間。
</LessonBlock>

<LessonBlock id="new-thread" title="換一件事，就換一段對話">

同一份報告的補充與修正，留在原本的對話裡最省事，脈絡都還在。但如果接下來要處理的是無關的會議記錄或另一份資料，就開一個新任務，重新交代檔案與目標。新任務可以用同一個工作資料夾，但別假設它知道前一段對話做過的所有決定。
</LessonBlock>

<div class="lesson-next-step"><span>下一步</span><a href="./token-efficiency">Credits：用量與效率 →</a></div>

## 參考資料

- [Settings｜OpenAI](https://learn.chatgpt.com/docs/reference/settings)
- [Steering and queuing｜OpenAI](https://learn.chatgpt.com/docs/prompting#steering-and-queuing)
