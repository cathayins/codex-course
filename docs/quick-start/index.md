---
title: What Is Codex
description: 從工作環境與交付方式理解 ChatGPT、Codex，以及 Codex 為何不再只屬於工程師。
outline: [2, 3]
aside: true
pageClass: quickstart-story chatgpt-vs-codex
---

# ChatGPT vs Codex

<p class="lesson-lead">Codex 剛推出時，我們很容易這樣分：開發程式用 Codex，整理知識用 ChatGPT。這個說法曾經好懂，但現在已經不夠準確。</p>

## 別在用是不是工程師區分

<div class="story-contrast story-contrast--projector">
  <section><span>THEN｜以前</span><h3>用職稱分工具</h3><p>工程師寫程式，所以去用 Codex；顧問、企劃或研究人員整理知識，所以留在 ChatGPT。</p><b>好記，卻把兩邊的能力切得太窄。</b></section>
  <section><span>NOW｜現在</span><h3>用工作環境分入口</h3><p>ChatGPT 能連接檔案與工具；Codex 也能處理文件、資料、圖片與研究工作。重點不再是你會不會寫程式。</p><b>先看工作從哪裡開始，以及結果要留在哪裡。</b></section>
</div>

現在 ChatGPT 與 Codex 都能使用檔案、搜尋資料，也能透過 Plugin 連接 GitHub、Figma 或 Atlassian／Jira 這類工作工具；實際可用項目會依安裝、帳號與 Workspace 權限而定。兩邊不再是互斥選項，差別更像是：**哪一個工作空間最接近你手上的任務？**

## 顧問 vs 能進工作環境的同事

顧問可以先在 ChatGPT 做調研與推演，再把方法交給 Codex 做成可重複產生報告的小工具；產品經理也可以先討論需求，再讓 Codex 把截圖、規格與資料做成能操作的 Web App。

一個簡單的選法是：

- 主要在問問題、整理知識、比較觀點：**先從 ChatGPT 開始**。
- 主要在處理本機檔案、專案資料夾或需要執行工具：**先從 Codex 開始**。

<div class="outcome-examples">
  <section>
    <div class="outcome-example__icon outcome-example__icon--chatgpt" aria-hidden="true"><img src="/images/quick-start/chatgpt-icon.webp" width="256" height="256" decoding="async" alt=""></div>
    <div><span>CHATGPT｜從知識與對話開始</span><h3>研究、理解與整理</h3><p>例如顧問要調研市場、比較多方觀點、整理訪談，或和 AI 一起推敲策略。資料主要來自提問、網路與已連接的知識來源。</p><b>常見交付：分析、觀點、摘要與決策建議</b></div>
  </section>
  <section>
    <div class="outcome-example__icon outcome-example__icon--codex" aria-hidden="true"><img src="/images/quick-start/codex-icon.webp" width="256" height="256" decoding="async" alt=""></div>
    <div><span>CODEX｜從本機工作環境開始</span><h3>讀檔案、做出成品</h3><p>工作任務主要在各專案資料夾裡，包含 PDF、Excel、CSV、簡報、圖片、逐字稿或程式碼；你希望 AI 批次整理、修改並留下檔案。</p><b>常見交付：整理後的文件、Web App 或自動化工作流</b></div>
  </section>
</div>



## Codex for (Almost) Everything

最容易理解 Codex 的方式，不是背功能，而是看它最後能交出什麼。以下案例選自 OpenAI 官方的 [Use cases](https://learn.chatgpt.com/use-cases) 與 [Showcase](https://developers.openai.com/showcase)：前者示範一般工作怎麼做，後者展示能做成什麼樣的成品。

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
    <div><span>影音創作｜SHOWCASE</span><h3>建立自己的影音素材工具</h3><p>Waveform Studio 把本機音訊轉成可調整的視覺波形，示範 Codex 如何協助做出服務創作流程的專用工具。</p><b>Waveform Studio ↗</b></div>
  </a>
  <a class="codex-use-case-card" href="https://learn.chatgpt.com/use-cases/datasets-and-reports" target="_blank" rel="noreferrer">
    <figure><img src="/images/quick-start/use-cases/data-reports.webp" width="1200" height="566" loading="lazy" decoding="async" alt="OpenAI 官方資料分析與報告案例畫面"></figure>
    <div><span>數據分析｜USE CASE</span><h3>把雜亂資料變成分析報告</h3><p>清理資料、計算指標、建立視覺化，再把方法與結論整理成可重跑、可分享的報告。</p><b>Analyze datasets and ship reports ↗</b></div>
  </a>
</div>

這些案例的共同點，是 Codex 不只回答問題，而是讀取素材、操作工具，最後留下可以使用或繼續修改的成果。你不需要先會寫程式；先從一個真實工作問題，以及你想拿到的成品開始就好。

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
