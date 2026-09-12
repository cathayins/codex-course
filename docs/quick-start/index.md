---
title: What Is Codex
description: 認識 Codex 的工作方式，以及它和 ChatGPT 瀏覽器對話在工作環境上的差別。
outline: [2, 3]
aside: false
pageClass: quickstart-story quickstart-editorial chatgpt-vs-codex
---

# What Is Codex

<p class="lesson-lead">Codex 是 OpenAI 開發的 Agent 系統。你交代一個目標，它會自己拆解步驟、使用需要的工具，把事情做完，並把成果留在你指定的地方。這一頁先從你熟悉的 ChatGPT 對話出發，說清楚兩者到底差在哪裡。</p>

<LessonBlock
  id="codex-in-one-sentence"
  title="它不只是回答你，而是會動手把事情做完"
  description="一般的對話會給你答案或一段程式碼；Codex 會實際打開檔案、執行工具，然後把完成的東西交給你。"
  tone="accent"
>
  <p>你在電腦上的工作，很少停在「知道答案」這一步。多數時候還要打開檔案、算出結果、產生一份可以交出去的東西 — 中間可能牽涉到程式、套件與終端機指令。</p>
  <p>Codex 的差別就在這裡：它能實際執行這些動作，而不只是把做法寫給你看。你不需要會寫程式，但需要說清楚三件事 — 要達成什麼、資料在哪裡、怎樣才算做完。</p>
</LessonBlock>

<LessonBlock
  id="chatgpt-vs-codex"
  title="顧問與同事：工作發生在不同的環境"
  description="一邊是在瀏覽器裡給你建議的顧問，一邊是坐在你電腦前直接動手的同事。差別不在誰比較聰明，而在工作在哪裡發生。"
>
  <CodexEnvironmentDemo />
</LessonBlock>

<LessonBlock
  id="programming-environment"
  title="寫得出程式碼，不等於跑得起來"
  description="拿到一份 .py 檔只是第一步。電腦要先裝好執行環境、補齊套件、排掉錯誤，程式才會真的跑出結果 — 而這段路，決定了你會不會卡住。"
  tone="sand"
>
  <p>這是很多人第一次用 AI 寫程式時最挫折的地方：對話框裡的程式碼看起來完整又漂亮，複製下來卻跑不動。缺 Python、缺套件、路徑不對、版本不合 — 每一個都要自己查、自己試。</p>
  <p>下面用同一個需求，看兩邊走到「真的產生出結果」各自需要做什麼。</p>

  <CodexRuntimeDemo />

  <p class="runtime-takeaway">差別不在程式寫得好不好，而在<strong>有沒有權限實際執行與驗證</strong>。能夠自己跑一次、看到錯誤、修好再跑，才有辦法把責任揹到最後。</p>
</LessonBlock>

<LessonBlock
  id="codex-for-almost-everything"
  title="Codex 不只用來寫程式"
  description="只要任務需要讀取素材、操作檔案，或留下可以繼續使用的成果，都可以交給 Codex。"
>

寫程式只是其中一種用途。OpenAI 的 [ChatGPT Use Cases](https://learn.chatgpt.com/use-cases) 與 [Showcase](https://developers.openai.com/showcase) 也涵蓋資料整理、簡報、研究、網站與創作工具 — 用 Codex 時，這些任務可以直接在你指定的工作環境中完成。

<div class="codex-use-case-gallery">
  <a class="codex-use-case-card" href="https://learn.chatgpt.com/use-cases/daily-work-brief" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/work-brief.webp" width="1200" height="566" loading="lazy" decoding="async" alt="OpenAI 官方每日工作摘要案例畫面"></figure>
    <div><span>工作管理｜USE CASE</span><h3>把一天整理成可執行清單</h3><p>整合行事曆、訊息、Email 與專案脈絡，找出今天的優先事項、待回覆內容與會議準備。</p><b>Create a daily work brief ↗</b></div>
  </a>
  <a class="codex-use-case-card" href="https://learn.chatgpt.com/use-cases/generate-slide-decks" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/slide-decks.webp" width="1200" height="566" loading="lazy" decoding="async" alt="OpenAI 官方自動製作簡報案例畫面"></figure>
    <div><span>簡報製作｜USE CASE</span><h3>從資料直接做出簡報</h3><p>讀取內容與既有範本，操作 PowerPoint 檔案並產生需要的視覺，最後留下可繼續編輯的簡報。</p><b>Generate slide decks ↗</b></div>
  </a>
  <a class="codex-use-case-card" href="https://learn.chatgpt.com/use-cases/deploy-app-or-website" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/web-app.webp" width="1200" height="566" loading="lazy" decoding="async" alt="OpenAI 官方建立並部署 Web App 案例畫面"></figure>
    <div><span>想法落地｜USE CASE</span><h3>建立 Web App 並部署預覽</h3><p>把需求、參考畫面與資料交給 Codex，完成可操作的網站或工具，再產生網址讓其他人試用。</p><b>Deploy an app or website ↗</b></div>
  </a>
  <a class="codex-use-case-card" href="https://developers.openai.com/showcase/procedural-city-generator" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/3d-city.webp" width="1285" height="800" loading="lazy" decoding="async" alt="OpenAI Showcase 的瀏覽器 3D 城市產生器"></figure>
    <div><span>3D 創作｜SHOWCASE</span><h3>做出互動式 3D 城市</h3><p>把一個點子做成能在瀏覽器操作的程序化城市產生器，調整建築、街道與場景，而不只停在概念圖。</p><b>Procedural City Generator ↗</b></div>
  </a>
  <a class="codex-use-case-card" href="https://developers.openai.com/showcase/waveform-studio" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/waveform-studio.webp" width="1200" height="760" loading="lazy" decoding="async" alt="OpenAI Showcase 的音訊波形視覺工具"></figure>
    <div><span>影音創作｜SHOWCASE</span><h3>建立自己的影音素材工具</h3><p>Waveform Studio 把本機音訊轉成可調整的視覺波形，示範 Codex 如何協助創作者做出符合自己工作流程的專用工具。</p><b>Waveform Studio ↗</b></div>
  </a>
  <a class="codex-use-case-card" href="https://learn.chatgpt.com/use-cases/datasets-and-reports" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/data-reports.webp" width="1200" height="566" loading="lazy" decoding="async" alt="OpenAI 官方資料分析與報告案例畫面"></figure>
    <div><span>資料分析｜USE CASE</span><h3>把雜亂資料變成分析報告</h3><p>清理資料、計算指標、建立視覺化，再把方法與結論整理成可重跑、可分享的報告。</p><b>Analyze datasets and ship reports ↗</b></div>
  </a>
</div>

這些案例有一個共同點：都是從現有的素材出發，經過整理或工具操作，最後留下一份可以檢查、修改、繼續使用的成果 — 而不只是一段對話紀錄。
</LessonBlock>

## 參考資料

- [Codex for (almost) everything｜OpenAI](https://openai.com/index/codex-for-almost-everything/)
- [Codex：How to get started](https://openai.com/academy/codex-how-to-start/)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Codex Use cases](https://learn.chatgpt.com/use-cases)
- [OpenAI Showcase](https://developers.openai.com/showcase)
- [Codex 完整新手教學｜Frank Chiu](https://frankchiu.io/ai-chatgpt-codex-intro/)
- [零基礎 30 分鐘學會 Codex｜李厂长来了](https://www.youtube.com/watch?v=dMiV7Yx9yk4)
- [Codex - Full Course for Beginners｜Tech With Tim](https://www.youtube.com/watch?v=ZXkeWiWB4xg)

<p class="source-note">ChatGPT／Codex 的選擇框架是本課為了教學整理的判斷方式，不是官方的產品界線。案例 Gallery 使用 OpenAI 官方原圖，其餘插圖為本課生成素材。</p>
