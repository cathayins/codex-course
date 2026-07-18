---
title: 用 @ 指定檔案與 Plugin
description: 用 @ 點名這次要讀的檔案、資料夾或 Plugin，讓 Codex 從正確的來源開始工作。
outline: [2, 3]
aside: true
pageClass: quickstart-story
---

# 用 `@` 指定檔案與 Plugin

<p class="lesson-lead">資料夾裡的東西一多，就不要只說「幫我看一下」。用 <code>@</code> 點名來源，再把成品格式與檢查方式交代清楚，Codex 才知道要從哪裡開始、最後要交回什麼。</p>

<figure class="interface-figure interface-figure--hero">
  <img src="/images/quick-start/artifact-viewer-light.webp" alt="OpenAI 官方 Work with files 示意圖，左側是對話與生成檔案，右側是簡報預覽與註記區">
</figure>

Codex 建立文件、簡報、試算表或 PDF 後，可以直接在 App 裡預覽。第一版出來時不用重做整份檔案；選取需要修改的區域，再說明要換掉哪段文字、圖表或格式即可。

## 打開 `@` 選單

在輸入框打 `@`，Codex 會列出目前可以加入的檔案、資料夾與 Plugin。請從清單點選，不要只把 `@檔名` 當成一般文字打完。

<div class="command-grid">
  <section><kbd>@檔案</kbd><h3>這次就讀這一份</h3><p>已經知道來源時，直接選 CSV、Excel、PDF 或 Markdown。適合比較、整理與修改指定內容。</p></section>
  <section><kbd>@資料夾</kbd><h3>先看這個範圍</h3><p>檔案分散在同一個目錄時，先指定資料夾，請 Codex 盤點內容，再決定真正要用哪些檔案。</p></section>
  <section><kbd>@Plugin</kbd><h3>使用外部資料或工具</h3><p>例如 SharePoint、Spreadsheets 或 PDF。可用項目取決於安裝狀態、帳號授權與 Workspace 政策。</p></section>
</div>

## 把檔案與工具寫進同一句話

延續前一頁的行銷資料案例，這次要用 Spreadsheets Plugin 讀三份來源，並建立一份可以直接檢查的 Markdown 摘要。Prompt 裡要同時說明來源、檔案格式、內容結構與檢查方式：

```text
請使用 @Spreadsheets 讀取 @q2-campaign.csv、@budget.xlsx
與 @channel-notes.md，找出下一季值得加碼的三個渠道，
並建立 outputs/q3-channel-brief.md。

摘要依序放：結論、數據依據、預算差額、限制與待補資料。
保留三份來源檔，不要補猜缺少的數字。
完成前檢查渠道名稱、金額加總與來源檔是否一致，
最後告訴我新檔放在哪裡，以及你做了哪些檢查。
```

<div class="refined-media refined-media--wide refined-media--standalone">
  <div class="refined-media__window">
    <img src="/images/quick-start/at-menu.png" alt="Codex 輸入框輸入 @ 後，顯示檔案、資料夾與可用 Plugin 的選單">
  </div>
</div>

<div class="brief-grid">
  <section><span>來源</span><b>Plugin 與三份檔案</b><p>用 <code>@</code> 選到真正要讀的內容，不讓舊版或同名附件混進來。</p></section>
  <section><span>成品</span><b>指定檔名與格式</b><p>明確說要建立 Markdown、Excel、簡報或 PDF，以及檔案要放在哪裡。</p></section>
  <section><span>結構</span><b>先講內容怎麼排</b><p>例如段落順序、試算表欄位、投影片章節或一定要出現的圖表。</p></section>
  <section><span>檢查</span><b>完成前要核對什麼</b><p>把金額、日期、來源、公式或版面列出來，並請 Codex 說明它怎麼驗證。</p></section>
</div>

## 還不知道要讀哪些檔案時

使用 `@` 不代表資料夾裡的每一份檔案都要手動加入。來源很多時，可以分兩輪做：

```text
請先盤點 @campaign-data 資料夾。
告訴我每份檔案大概放什麼、哪些檔案可能和預算決策有關。
先不要修改或建立檔案。
```

看完盤點結果後，再用 `@` 點名真正會影響判斷的來源。這樣比一次塞進二十份檔案更容易檢查，也不會讓舊版本或無關附件混進分析。

## 同一個 `@`，可以處理兩種工作

### 先讀資料，不動原檔

```text
請使用 @SharePoint 找到「Q3 行銷預算核定版」，
再和本機的 @budget.xlsx 比較。

列出金額或日期不一致的地方，附上各自來源。
先不要修改、上傳或發布任何內容。
```

這種 Prompt 的成果是比較結果。它適合先確認來源、找差異，等你看過再決定要不要改檔案。

### 建立一份新的交付檔案

```text
請使用 @PDF 讀取 @campaign-proposal.pdf，
另外建立 notes/proposal-brief.md。

保留原始 PDF，不要修改或覆蓋。
新檔要包含目標、預算、風險與仍待確認的問題。
```

這裡要明確說「另外建立」以及新檔路徑。若你要改現有檔案，就改成「只修改 `@檔名`，不要建立新檔」。Codex 不需要猜最後該覆蓋哪一份。

::: tip Plugin 名稱以現場畫面為準
官方文件建議在 Prompt 裡說清楚要去哪個來源找什麼，再用 `@` 選擇指定 Plugin。實際名稱與可用能力會受到安裝、帳號授權及 Workspace 設定影響。
:::

## 成品出來後怎麼看

<div class="command-grid">
  <section><kbd>1</kbd><h3>先打開成品</h3><p>從對話裡的檔案連結，或右側檔案面板開啟。先確認檔名、格式與頁數，再抽查數字和內容。</p></section>
  <section><kbd>2</kbd><h3>直接指出要改的位置</h3><p>預覽支援註記時，選取段落、圖表或畫面區域，再說明要修改什麼，不必重新描述整份檔案。</p></section>
  <section><kbd>3</kbd><h3>問它怎麼檢查</h3><p>請 Codex 說明檔案儲存位置、用了哪些來源，以及完成前做過哪些驗證。你仍要負責最後確認。</p></section>
</div>

## 送出前看一眼

- `@` 清單裡選到的是正確檔案與 Plugin。
- Prompt 有寫要讀、要修改，還是要另外建立檔案。
- 需要保留的原檔、金額、日期或格式有說清楚。
- 結果要放在對話裡，還是存成指定路徑，沒有留給 Codex 猜。
- Prompt 有寫預期格式、內容結構，以及完成前要做的檢查。

## 參考資料

- [Plugins](https://learn.chatgpt.com/docs/plugins)
- [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer?surface=app)
- [Prompting｜Add useful context](https://learn.chatgpt.com/docs/prompting#add-useful-context)
- [Prompting｜Use plugins](https://learn.chatgpt.com/docs/prompting#use-plugins)
