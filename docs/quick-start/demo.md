---
title: QuickStart 全流程 Demo
description: 從空資料夾開始，讓 Codex 建立第一份檔案，再接上本機檔案與 SharePoint 共用資料。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# QuickStart Demo｜從零到共用資料

<p class="lesson-lead">這個練習約 15 分鐘。每個人從一個空資料夾開始，先靠 Prompt 產生自己的檔案，再用 <code>@</code> 接上本機檔案與同一份 SharePoint 資料。最後全班一起核對結果。</p>

## 全班會走過這六步

<div class="quickstart-flow" aria-label="QuickStart Demo 六個步驟">
  <section><span>01</span><h3>打開空資料夾</h3><p>一開始不放任何素材。</p></section>
  <section><span>02</span><h3>用 Prompt 建立檔案</h3><p>讓 Codex 先做出工作坊草稿。</p></section>
  <section><span>03</span><h3>用 @ 指回本機檔案</h3><p>告訴 Codex 這次要改哪一份內容。</p></section>
  <section><span>04</span><h3>讀取 SharePoint</h3><p>全班使用同一份共用需求。</p></section>
  <section><span>05</span><h3>補充下一個動作</h3><p>練習 Steer 或 Queue。</p></section>
  <section><span>06</span><h3>一起核對成果</h3><p>確認資料正確，而且沒有改到遠端來源。</p></section>
</div>

完成時，每個人的資料夾裡都會有這兩份檔案：

```text
codex-quickstart-demo/
├── workshop-plan.md
└── workshop-summary.md
```

## 講師課前準備

先下載 [QuickStart Demo 共用需求](/demo-assets/quickstart-sharepoint-brief.txt)，把內容放進全班都能讀取的 SharePoint 文件或頁面，名稱保留為 **QuickStart Demo｜AI 入門工作坊需求**。

上課前確認四件事：

- 學員使用桌面版 Codex，而不是 IDE Extension。
- Workspace 已開放 SharePoint Plugin，學員也已完成登入與授權。
- 每位學員都能讀取這份共用文件；不需要編輯權限。
- 練習只用課程資料，不放客戶資料、個人資料或公司機密。

::: tip 先用一台學員電腦試一次
Plugin 已安裝、SharePoint 已授權、使用者看得到文件，是三個不同的檢查點。正式上課前用一般學員帳號跑過一次，最容易提早發現權限問題。
:::

## Step 1｜從空資料夾開始

每位學員先建立一個空資料夾：

```text
codex-quickstart-demo/
```

在 Codex App 建立新任務，選擇這個資料夾。送出 Prompt 前，先看畫面上的資料夾名稱是不是 `codex-quickstart-demo`。

## Step 2｜不用素材，先讓 Codex 建立第一份檔案

直接貼上這段：

```text
請在這個空資料夾建立 workshop-plan.md。

這是一份給第一次使用 Codex 同事的 60 分鐘工作坊草稿，
請先放入：活動目標、流程、需要準備的東西、待確認事項。

目前沒有其他資料。不知道的地方請寫「待確認」，
不要自行補日期、人數或預算。

完成後告訴我建立了什麼檔案。
```

這一步只看兩件事：資料夾裡有沒有出現 `workshop-plan.md`，以及 Codex 是否把不知道的資訊留成「待確認」。內容不需要每個人一模一樣。

## Step 3｜用 `@` 告訴 Codex 要改哪個檔案

接著輸入 `@`，從清單選擇剛才建立的 `workshop-plan.md`，再送出：

```text
請讀取 @workshop-plan.md，把「流程」改成表格，
欄位是時間、活動、學員要做什麼。

只修改這個檔案，待確認內容先保留。
```

<div class="instruction-showcase">
  <div class="refined-media refined-media--square">
    <div class="refined-media__window">
      <img src="/images/quick-start/at-menu.webp" alt="Codex 輸入框輸入 @ 後，顯示檔案與 Plugin 的清單">
    </div>
  </div>
  <div>
    <h3>從清單選取，不只是在 Prompt 裡打字</h3>
    <p>從 <code>@</code> 清單選取檔案，Codex 會把它當成這次明確指定的來源。資料夾裡的內容變多時，這個習慣特別有用。</p>
  </div>
</div>

## Step 4｜接上全班共用的 SharePoint 資料

先確認 Codex 找到的是正確文件，不急著修改：

```text
請使用 @SharePoint 尋找「QuickStart Demo｜AI 入門工作坊需求」。

先告訴我找到的文件名稱與最後更新時間，
暫時不要修改本機檔案或 SharePoint 內容。
```

輸入 `@` 後，請從清單點選 SharePoint Plugin。不同 Workspace 顯示的名稱可能略有差異，現場以清單上的名稱為準。

文件名稱與時間都正確後，再送出：

```text
請根據 @SharePoint 的「QuickStart Demo｜AI 入門工作坊需求」，
更新 @workshop-plan.md 裡的日期、對象、人數、預算與限制。

SharePoint 沒寫的內容繼續保留「待確認」。
只修改本機的 @workshop-plan.md，
不要修改、上傳或發布 SharePoint 的內容。
```

不要把兩段合在一起。第一段先核對來源，第二段才把資料寫進本機成品；即使搜尋結果出現同名文件，也不會一找到就直接改內容。

## Step 5｜趁 Codex 還在執行，補上一句話

如果 Codex 還在更新檔案，可以用 **Steer** 補充眼前這一輪：

```text
補充：金額保留 NT$，不要換算成其他幣別。
```

也可以用 **Queue** 排好完成後的下一件事：

```text
完成更新後，再建立 workshop-summary.md，
整理成 5 點課前提醒，並標出仍待確認的內容。
```

這個練習很短，Codex 可能已經跑完。遇到這種情況，直接把同一句話當成下一則訊息送出就好，不需要為了練快捷鍵重新跑一次。

## Step 6｜用 `/status` 看一下，再打開檔案確認

輸入 `/status`，看目前任務的 Context 使用量。這個數字是在說這段任務裝了多少對話、檔案與工具輸出，不是 Enterprise Workspace 還剩多少 Credits。

接著打開兩份成果，全班一起核對：

| 要確認的事 | 正確結果 |
| --- | --- |
| SharePoint 內容 | 日期、時間、地點、人數與預算和共用需求一致 |
| 沒有提供的資訊 | 仍標示「待確認」，沒有自行猜測 |
| 本機成果 | `workshop-plan.md` 與 `workshop-summary.md` 都能打開 |
| 遠端來源 | SharePoint 文件沒有被修改、上傳或發布 |

全班的句子不會完全相同，這很正常。這次要對的是**事實、限制與檔案是否真的完成**，不是逐字比答案。

## 如果想把 Demo 再往前推

這次只有兩份檔案，一般 Prompt 就夠了，不需要為了用功能而開 Goal。若課後要繼續補齊所有待確認內容，才適合把完成線寫成 Goal：

```text
/goal 完成 workshop-plan.md 與 workshop-summary.md，
確認兩份檔案的活動資訊都和 SharePoint 共用需求一致，
所有缺少的資料都明確標示「待確認」，而且不修改遠端來源。
```

## 找不到 SharePoint 文件時

先依序檢查：

1. 現在用的是桌面版 Codex，不是 IDE Extension 或手機版。
2. SharePoint Plugin 已安裝並啟用。
3. 學員已登入正確帳號，也完成 SharePoint 授權。
4. 該帳號能在 SharePoint 直接打開共用需求。
5. Prompt 使用完整文件名稱，沒有只搜尋「工作坊」。

如果現場仍連不上，不要讓全班停在登入畫面。先兩人一組共用已連線的電腦完成 Plugin 步驟；其他人仍可在自己的資料夾完成純 Prompt 與 `@workshop-plan.md`。

## 參考資料

- [Get started with Work｜Add plugins for more context and better outputs](https://learn.chatgpt.com/docs/get-started-with-work#add-plugins-for-more-context-and-better-outputs)
- [Prompting｜Use connected sources](https://learn.chatgpt.com/docs/prompting#use-connected-sources)
- [Enterprise admin setup｜Configure plugins and connected capabilities](https://learn.chatgpt.com/docs/enterprise/admin-setup#step-6-configure-plugins-and-connected-capabilities)
