---
title: 官方文件與課程參考
description: 查證 Codex 產品行為，並記錄 QuickStart 教材使用的外部參考。
outline: [2, 3]
---

# 官方文件與課程參考

Codex 的介面、模型、指令與方案會更新。涉及功能可用性、安裝、權限或計費時，以 OpenAI 官方資料與當下產品畫面為準；第三方教學用來補充案例與講解方式，不取代產品事實查證。

## QuickStart 官方來源

| 主題 | 來源 |
|---|---|
| 產品總覽 | [OpenAI Codex](https://openai.com/codex/) |
| Codex 文件入口 | [Codex documentation](https://learn.chatgpt.com/docs/codex) |
| App 安裝與操作 | [ChatGPT desktop app](https://learn.chatgpt.com/docs/app) |
| IDE 安裝與操作 | [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide) |
| CLI 安裝與操作 | [Codex CLI](https://learn.chatgpt.com/docs/codex/cli) |
| App 個人設定與 Usage | [Settings](https://learn.chatgpt.com/docs/reference/settings) |
| Plugins 與 `@` | [Plugins](https://learn.chatgpt.com/docs/plugins) |
| App slash commands | [Slash commands](https://learn.chatgpt.com/docs/reference/slash-commands) |
| IDE slash commands | [IDE commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide) |
| CLI slash commands | [CLI slash commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli) |
| Prompt 與 Plan | [Codex best practices](https://learn.chatgpt.com/guides/best-practices) |
| 登入方式 | [Authentication](https://learn.chatgpt.com/docs/auth) |
| CLI 開源專案 | [openai/codex](https://github.com/openai/codex) |

## 講師參考素材

### PAPAYA 電腦教室｜Office 與網站實作

[一個 AI 助手打趴整套 Office 軟體](https://www.youtube.com/watch?v=W5ymBPi53Tw)

影片以下載安裝、設定專案資料夾開始，再延伸到文件、表格、簡報、郵件、儀表板與網站。QuickStart 借用的是「**先讓 Codex 在一個資料夾處理真實素材**」的低門檻節奏，不複製影片畫面或逐字內容。

### AI Engineer｜OpenAI Codex Masterclass

[OpenAI Codex Masterclass — Vaibhav Srivastav & Katia Gil Guzman](https://www.youtube.com/watch?v=MhHEGMFCEB0&t=2763s)

影片涵蓋 App、CLI、worktree、automation、plugin、code review、subagent、hook 與 security。QuickStart 只用它確認「Codex 是一套工作系統，而不是單一聊天視窗」的定位；大部分功能留到進階課程，避免主線超載。

### CodexGuide

[CodexGuide 中文教程](https://codexguide.ai/)

參考其「安裝 → 基本組成 → 第一個任務」的學習順序，以及 App 介面截圖的資訊標示方式。本課重新設計為「從問答到交辦」的投影故事，產品事實仍回到官方資料核對。

### 奇寶網路｜Codex 入門文章

[2026 最新！Codex 是什麼？](https://www.seoseo.com.tw/blog/article_detail_1068.html)

文章使用「從回答到實際動手」說明 ChatGPT 與 Codex 的差異。課程只採用這個入門角度；涉及介面、支援範圍、模型與安裝方式時，仍以 OpenAI 官方文件為準。

## 每次授課前重新核對

```text
□ App、IDE、CLI 的官方安裝方式
□ ChatGPT 登入與 API key 登入差異
□ `/plan`、`/status`、`/compact` 是否仍在示範介面可用
□ App／IDE 的 Context usage 顯示位置
□ `@` 顯示的檔案、Plugin 與 Skill 名稱
□ IDE Extension 仍未提供 Plugin browser
□ 截圖中的按鈕名稱與目前版本是否一致
□ 方案、額度與 rate limit 的說法沒有使用舊數字
```

## 查證原則

1. 先確認文件適用的 surface：App、IDE、CLI 或 Cloud。
2. 區分官方說明、第三方經驗與講師推論。
3. 不把 account usage、context usage、rate limit 與 API 費用混為一談。
4. 若介面與教材不同，先教穩定概念，再指出最新入口。
5. 涉及權限、資料與外部操作時，以當前 Workspace 政策為準。

<p class="source-note">本頁最後核對：2026-07-17。Codex 更新速度快，正式授課前一日應再次檢查。</p>
