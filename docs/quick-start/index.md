---
title: What Is Codex
description: 從工作環境與交付方式理解 ChatGPT 和 Codex 的差別，以及 Codex 為什麼不只適合工程師。
outline: [2, 3]
aside: true
pageClass: quickstart-story chatgpt-vs-codex
---

# ChatGPT vs Codex

<p class="lesson-lead">Codex 剛推出時，大家常用一句話區分：寫程式用 Codex，整理知識用 ChatGPT。這個說法很好記，現在卻不太準確了。</p>

## 別再用「是不是工程師」區分

<div class="work-entry-contrast">
  <section class="work-entry-card work-entry-card--legacy">
    <header><span>THEN｜以前</span><em>舊分法</em></header>
    <h3>看職稱選工具</h3>
    <div class="work-entry-legacy-rule" aria-label="以前用職稱選擇工具">
      <span>工程師 <b>→ 用 Codex</b></span>
      <span>不是工程師 <b>→ 用 ChatGPT</b></span>
    </div>
    <p>工程師寫程式就開 Codex；顧問、企劃和研究人員則留在 ChatGPT，做研究、整理想法。</p>
    <strong>這樣分很簡單，現在已經不夠用了。</strong>
  </section>
  <section class="work-entry-card work-entry-card--current">
    <header><span>NOW｜現在</span><em>換個分法</em></header>
    <h3>先看工作在哪裡</h3>
    <p class="work-entry-card__lead">先別管職稱。看看這次要在哪裡動手，最後要留下什麼。</p>
    <ol class="work-entry-questions">
      <li><b>01</b><span><strong>你會先從哪裡動手？</strong><small>先查資料、討論想法，還是直接打開檔案和專案？</small></span></li>
      <li><b>02</b><span><strong>做完要留下什麼？</strong><small>一個答案，還是能繼續編輯的檔案或工具？</small></span></li>
    </ol>
    <div class="work-entry-routes" aria-label="依工作環境選擇入口">
      <span><small>先查資料、整理想法</small><b>先用 ChatGPT</b></span>
      <i aria-hidden="true">或</i>
      <span><small>直接處理檔案或專案</small><b>先用 Codex</b></span>
    </div>
  </section>
</div>

現在 ChatGPT 和 Codex 都能讀取檔案、搜尋資料，也能用 Plugin 連接 GitHub、Figma 或 Atlassian／Jira 等工作工具；實際能用哪些項目，取決於安裝狀態、帳號和 Workspace 權限。兩者不是非此即彼。你要判斷的是：**哪個工作空間離手上的任務最近？**

## 顧問 vs 能進工作環境的同事

顧問可以先在 ChatGPT 研究、推演，再把確認過的方法交給 Codex，做成能重複產生報告的小工具。產品經理也可以先談清楚需求，再讓 Codex 把截圖、規格與資料做成能操作的 Web App。

一個簡單的選法是：

- 主要在問問題、整理知識、比較觀點：**先從 ChatGPT 開始**。
- 主要在處理本機檔案、專案資料夾或需要執行工具：**先從 Codex 開始**。

<div class="outcome-examples">
  <section class="outcome-example outcome-example--chatgpt">
    <header><div class="outcome-example__icon outcome-example__icon--chatgpt" aria-hidden="true"><img src="/images/quick-start/chatgpt-icon.webp" width="256" height="256" decoding="async" alt=""></div><div><span>CHATGPT｜從知識與對話開始</span><h3>研究、理解與整理</h3></div></header>
    <p>例如顧問要調研市場、比較多方觀點、整理訪談，或和 AI 一起推敲策略。資料主要來自提問、網路與已連接的知識來源。</p>
    <b>常見交付：分析、觀點、摘要與決策建議</b>
  </section>
  <section class="outcome-example outcome-example--codex">
    <header><div class="outcome-example__icon outcome-example__icon--codex" aria-hidden="true"><img src="/images/quick-start/codex-icon.webp" width="256" height="256" decoding="async" alt=""></div><div><span>CODEX｜從本機工作環境開始</span><h3>讀檔案、做出成品</h3></div></header>
    <p>工作任務主要在各專案資料夾裡，包含 PDF、Excel、CSV、簡報、圖片、逐字稿或程式碼；你希望 AI 批次整理、修改並留下檔案。</p>
    <b>常見交付：整理後的文件、Web App 或自動化工作流</b>
  </section>
</div>



## Codex for (Almost) Everything

不用急著背 Codex 的功能，先看它能交出哪些成果。以下案例選自 OpenAI 官方的 [Use cases](https://learn.chatgpt.com/use-cases) 與 [Showcase](https://developers.openai.com/showcase)：前者示範日常工作流程，後者展示完成的作品。

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

這些案例都不只停在回答問題。Codex 會讀取素材、操作工具，最後留下能直接使用或繼續修改的成果。你不必先學會寫程式，從手上的真實問題和想拿到的成品開始即可。

## 參考資料

- [Codex for (almost) everything｜OpenAI](https://openai.com/index/codex-for-almost-everything/)
- [Codex：How to get started](https://openai.com/academy/codex-how-to-start/)
- [Codex best practices](https://learn.chatgpt.com/guides/best-practices)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [Codex Use cases](https://learn.chatgpt.com/use-cases)
- [OpenAI Showcase](https://developers.openai.com/showcase)
- [Codex 完整新手教學｜Frank Chiu](https://frankchiu.io/ai-chatgpt-codex-intro/)
- [零基礎 30 分鐘學會 Codex｜李厂长来了](https://www.youtube.com/watch?v=dMiV7Yx9yk4)
- [Codex - Full Course for Beginners｜Tech With Tim](https://www.youtube.com/watch?v=ZXkeWiWB4xg)

<p class="source-note">ChatGPT／Codex 的選擇框架是本課為了教學整理的判斷方式，不是官方的產品界線。產品定位依 2026-07-19 OpenAI 官方資料核對；案例 Gallery 使用 OpenAI 官方原圖，其餘插圖為本課生成素材。</p>
