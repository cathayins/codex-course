---
title: Skills：把方法變成可重用能力
description: 從 Basic 選用現有 Skill，到 Advanced 設計、建立、測試與分享可重複使用的工作流程。
outline: [2, 3]
---

# Skills：把方法變成可重用能力

## 先從一個情境開始

每個禮拜一整理例會摘要時，你一定希望 Codex 每次都能乖乖照著同樣的規矩來：

- 先抓出「已決策事項」。
- 再列出「行動項目」與「待確認問題」。
- **絕對不能自己發揮**：沒寫負責人或期限的地方，不能隨便補上。

第一次你把這些要求寫進 Prompt，結果很棒。可是到了下週，新的紀錄一來，你又得把同一套規則重寫一次。只要少打了一句話，出來的格式可能就完全走樣，或是多出一些不實資訊。

其實，這項任務包含兩個部分：每週變動的「會議內容」，**以及每週固定的**「處理規則」。而 Skill 就是為了解決這個麻煩而誕生的——它能直接幫你把「處理規則」存起來，以後只要丟進新內容就好！

<figure class="skills-scenario-map" aria-labelledby="skills-scenario-title">
  <figcaption>
    <span>REPEATED WORK → REUSABLE METHOD</span>
    <strong id="skills-scenario-title">把重複交代的方法，從每次 Prompt 中抽出來</strong>
  </figcaption>
  <div class="skills-scenario-map__flow" role="group" aria-label="從新任務、經過 Skill，到穩定成果的流程">
    <article class="is-input">
      <b>01 · INPUT</b>
      <strong>新的會議紀錄</strong>
      <p>日期、討論內容、參與者與本次目標。</p>
      <small>每次任務都會改變</small>
    </article>
    <span class="skills-scenario-map__arrow" aria-hidden="true">→</span>
    <article class="is-skill">
      <b>02 · SKILL</b>
      <strong>固定的整理方法</strong>
      <p>辨識決策、行動項目與待確認問題，套用格式，最後檢查不得推測。</p>
      <small>設計一次，之後重複使用</small>
    </article>
    <span class="skills-scenario-map__arrow" aria-hidden="true">→</span>
    <article class="is-output">
      <b>03 · OUTPUT</b>
      <strong>一致且可檢查的摘要</strong>
      <p>欄位、順序與品質標準維持一致，缺少的資訊清楚標示待確認。</p>
      <small>結果更穩定，也更容易驗收</small>
    </article>
  </div>
  <div class="skills-scenario-map__formula" aria-label="Prompt 加上 Skill，產生符合本次需求的成果">
    <span><b>Prompt</b><small>這次要處理什麼</small></span>
    <i aria-hidden="true">＋</i>
    <span class="is-skill"><b>Skill</b><small>這類任務怎麼做</small></span>
    <i aria-hidden="true">＝</i>
    <span class="is-result"><b>成果</b><small>既符合本次需求，也沿用成熟方法</small></span>
  </div>
</figure>

簡單來說，**Skill 就是專為某類任務打造的「標準作業流程（SOP）」**。它可以幫你把一套固定的工作方法保存下來，包含：

* **怎麼做（執行順序）**：從第一步到最後一步的處理邏輯。
* **長怎樣（輸出格式）**：產出結果的排版與呈現方式。
* **查什麼（檢查標準）**：必須遵守的規則與防呆機制。

有了 Skill，你就不必每次都寫落落長的 Prompt 來教 Codex 怎麼做事。在實際操作上，你跟 AI 會有非常明確的分工：

* **你在 Prompt 裡寫的**：輸入「這次」的新資料、當下具體目標與特殊限制。
* **Skill 負責提供的**：一套穩定、經過驗證的處理流程。

只要一項工作會**反覆出現**，或者需要**嚴格遵守固定步驟與品質**，交給 Skill 就能大幅減少重複說明、降低漏掉條件的風險，讓每一次都能產出品質一致的好結果！

---

你可以依目前的目標選擇學習深度：如果只想使用現有 Skill，先完成 **Basic**；如果還想把自己的工作方法做成 Skill，再接著學習 **Advanced**。

<nav class="skills-route-map" aria-label="Skills 學習路徑">
  <a class="skills-route-card is-basic" href="#basic">
    <span>從這裡開始</span>
    <strong>Basic｜會選擇與使用</strong>
    <small>判斷時機 → App 操作 → 補上本次資訊</small>
  </a>
  <span class="skills-route-map__connector" aria-hidden="true">＋</span>
  <a class="skills-route-card is-advanced" href="#advanced">
    <span>繼續深入</span>
    <strong>Advanced｜會設計與驗證</strong>
    <small>載入機制 → 建立結構 → 測試與分享</small>
  </a>
</nav>

::: tip 建議學習順序
第一次使用 Skill 時，先完成 Basic 並實際呼叫一個現有 Skill。當你想建立、測試或分享自己的 Skill，再繼續 Advanced；後半段會直接沿用 Basic 的操作經驗。
:::

## Basic｜會選擇與使用 Skill {#basic}

<header class="skills-chapter-banner is-basic">
  <span>BASIC · USE EXISTING SKILLS</span>
  <strong>先把 Skill 用對，再談怎麼製作</strong>
  <p>先不用閱讀 Skill 的內部檔案。從判斷任務開始，選擇合適的能力，再把這次真正要完成的工作說清楚。</p>
</header>

<section class="lesson-goals" aria-labelledby="skills-basic-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="skills-basic-goals-title" class="lesson-goals__title">完成 Basic 後，你可以</strong>
    <p>從 Desktop App 找到合適的 Skill，使用 <code>$</code> 明確指定，並分辨哪些資訊已由 Skill 提供、哪些要在本次 Prompt 補充。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>判斷使用時機</strong><span>分清楚 Prompt、AGENTS.md 與 Skill。</span></article>
    <article><strong>從 App 選用</strong><span>會看用途、明確呼叫並確認 Skill 已被採用。</span></article>
    <article><strong>分清固定與變動</strong><span>沿用 Skill 的預設，只補本次任務與例外。</span></article>
    <article><strong>檢查結果</strong><span>確認輸出符合任務要求，而不只看檔案有沒有產生。</span></article>
  </div>
</section>

<nav class="lesson-flow skills-lesson-flow skills-basic-flow" aria-label="Basic 學習流程">
  <span><b>01</b> 判斷何時使用</span>
  <span><b>02</b> 從 App 找到並呼叫</span>
  <span><b>03</b> 補上本次資訊</span>
</nav>

### 1｜先判斷：這次真的需要 Skill 嗎？

同一句要求放在不同位置，會有不同生命週期。開始前先問：「這是只屬於本次任務、整個 Repository 的長期規則，還是某一類任務每次都要重複的方法？」

| 需求 | 放在哪裡 | 例子 |
| --- | --- | --- |
| 這次任務的目標、輸入與限制 | **Prompt** | 這次只整理昨天的會議，供主管週報使用 |
| Repository 長期都要遵守的規範 | **[AGENTS.md](/advanced/agents-md)** | 修改文件後要執行連結檢查 |
| 某一類任務每次都使用的工作方法 | **Skill** | 每次整理會議都要分出決策、行動項目與待確認問題 |
| 工作方法還需要即時讀取外部資料 | **[MCP](/advanced/mcp-tools)** | 同時安裝信件整理流程與 Gmail connector |

適合使用 Skill 的常見訊號：

- 已有成熟 Skill 能處理這類檔案或任務，例如文件、簡報、試算表或圖片。
- 結果必須遵循固定步驟，例如產出後還要 render、檢查溢位或核對來源。
- 同一類工作反覆出現，需要一致的格式與驗收方式。

如果只是一次性限制、流程還在探索，或只要提醒一句「這次不要改 API」，直接寫在本次 Prompt 會更清楚。

::: warning Skill 不是更長的 Prompt
Prompt 說明「這次要完成什麼」；Skill 保存「這類任務通常怎麼做」。兩者會一起使用，不能互相取代。
:::

### 2｜從 Desktop App 找到並呼叫 Skill

先從介面操作，不需要一開始就理解 `SKILL.md`：

1. 在側欄開啟 **Skills**，瀏覽目前環境可用的能力。
2. 點開一個 Skill，閱讀名稱、用途與簡介，確認它真的符合任務。
3. 回到輸入區輸入 `$`，選擇要使用的 Skill。
4. 在 Skill 名稱後面繼續寫本次任務，不要只送出一個名稱。
5. 從 Codex 的工作過程與結果，確認它有遵循該 Skill 的方法。

<MediaTabs
  class="skills-media-tabs"
  aria-label="從 Desktop App 瀏覽與查看 Skill"
  :items="[
    {
      label: 'Skills 總覽',
      title: '先從 Skills 清單找到適合的能力',
      description: '在側欄開啟 Skills，先用搜尋或瀏覽 Installed 清單，比對 Skill 名稱與 description。先確認用途符合任務，再開啟詳細資料。',
      image: '/images/skills/skills_overview.png',
      alt: 'Codex Desktop App 的 Skills 清單，顯示搜尋框與已安裝的多個 Skills',
      fit: 'compact'
    },
    {
      label: '查看詳細資料',
      title: '打開 Skill 詳細資料確認適用情境',
      description: '詳細資料會說明 Skill 的用途、何時使用，以及可能提供的工具或流程。讀完後再決定是否在本次 Prompt 用 `$skill-name` 明確呼叫。',
      image: '/images/skills/skill_details.png',
      alt: 'Codex Desktop App 中 Find Skills 的詳細資料頁，顯示用途、適用情境與 Try now 按鈕',
      fit: 'tall'
    }
  ]"
/>

#### 兩種選用方式：明確呼叫與自動選用

兩者的差別在於「誰來指定 Skill」。剛開始使用時，先練習明確呼叫：你可以直接看到自己選了什麼，也比較容易判斷結果是否真的遵循該 Skill。

<MediaTabs
  class="skills-media-tabs"
  aria-label="明確呼叫與自動選用 Skill 的操作示範"
  :items="[
    {
      label: '明確呼叫',
      title: '指定 Skill，再交代本次任務',
      description: '在 Prompt 中加入 `$skill-name`；在 App 裡則先輸入 `$`、從清單選擇 Skill，再在名稱後方補上本次任務。適合剛開始使用、需要確認流程、高風險或要求可重現的任務。',
      image: '/images/skills/use_skills.png',
      alt: 'Codex Desktop App 輸入區輸入錢字符號後，從清單選擇 Human Tone Skill',
      fit: 'compact'
    },
    {
      label: '自動選用',
      title: '直接描述任務，讓 Codex 自動判斷',
      description: '不指定 Skill 名稱，直接描述任務與目標；Codex 會依可用 Skill 的 description 判斷是否自動選用。適合已熟悉環境、任務意圖非常明確的日常工作。',
      image: '/images/skills/auto_choose_skills.png',
      alt: 'Codex 任務中直接描述工作，系統依任務內容自動選用 Skill 並顯示處理紀錄',
      fit: 'compact'
    }
  ]"
/>

### 3｜Skill 選好後，只補上本次任務需要的資訊

你不需要在每次 Prompt 都重寫輸入、成果、格式與禁止事項。設計完整的 Skill 本來就可以保存固定流程、預期成果、預設格式、模板、檢查標準，以及每次都必須遵守或避免的規則。

Prompt 的責任是指出「這次是哪一個任務」，並補上會隨任務改變的資料或例外。可以用下面三步判斷要寫到什麼程度：

<section class="skills-prompt-anatomy" aria-label="搭配 Skill 撰寫 Prompt 的三個步驟">
  <article class="is-task">
    <b>01 · TASK</b>
    <strong>交代本次任務</strong>
    <span>指定這次要處理的檔案、資料、時間範圍或對象；若 Skill 名稱不足以表達目的，再補一句本次目標。</span>
    <small>通常需要</small>
  </article>
  <span class="skills-prompt-anatomy__arrow" aria-hidden="true">→</span>
  <article class="is-default">
    <b>02 · SKILL DEFAULTS</b>
    <strong>沿用 Skill 的預設</strong>
    <span>執行步驟、預設輸出、固定模板、品質檢查與長期禁止事項，若 Skill 已定義，就不必在 Prompt 重複。</span>
    <small>自動套用</small>
  </article>
  <span class="skills-prompt-anatomy__arrow" aria-hidden="true">→</span>
  <article class="is-override">
    <b>03 · OVERRIDES</b>
    <strong>只補例外與差異</strong>
    <span>受眾、語言、篇幅、排序、期限、輸出位置或一次性限制與預設不同時，才在本次 Prompt 說明。</span>
    <small>有差異才補</small>
  </article>
</section>

| 資訊 | 通常放在哪裡 | 什麼時候寫進 Prompt |
| --- | --- | --- |
| 本次檔案、附件、連結或時間範圍 | **Prompt** | 幾乎每次都要指出，除非目前對話已經非常明確 |
| 固定工作步驟與檢查方式 | **Skill** | 只有這次要改變流程時才補充 |
| 預設成果、欄位、模板與格式 | **Skill** | 本次受眾、語言、篇幅或交付形式不同時才覆寫 |
| 這類任務一律遵守的禁止事項 | **Skill** | 本次有額外限制時才補充；整個 Repository 都適用的規則應放在 `AGENTS.md` |

假設 `$meeting-follow-up` 已經規定：輸出分成「決策、行動項目、待確認問題」，行動項目包含負責人與期限，缺少的資訊標示「待確認」，不得自行推測。這次的 Prompt 就可以寫得很短：

```text
$meeting-follow-up

請整理附上的 product-sync-0717.md，供產品團隊週報使用。
這次改用繁體中文，並將行動項目依期限排序。
```

第一句指出本次輸入與用途；第二句只補充和 Skill 預設不同的語言與排序。原本已寫在 Skill 裡的欄位、檢查與禁止推測，不需要再次貼進 Prompt。

::: tip 判斷原則
每次都相同的方法與標準，寫進 Skill；只有這次不同的內容，寫進 Prompt。若你發現每次呼叫都要加上同一段補充，代表那段內容可能應該回到 Skill。
:::

#### 三個常見錯誤

<div class="skills-mistake-grid">
  <article><span>錯誤 01</span><strong>只送出 <code>$skill</code></strong><p>Skill 可以保存方法，但未必知道這次要處理哪個檔案、日期範圍或對象。</p></article>
  <article><span>錯誤 02</span><strong>只看名稱就選</strong><p>先閱讀 description；同樣叫「文件」的能力，可能面向完全不同的流程。</p></article>
  <article><span>錯誤 03</span><strong>把結果存在當成完成</strong><p>還要檢查欄位、順序、禁止推測與 Skill 要求的品質驗證。</p></article>
</div>

### 動手練習｜選用一個現有 Skill

1. 從 Skills 側欄選一個你看得懂用途的 Skill。
2. 用一句話說明「為什麼這次應該用 Skill，而不是只寫 Prompt」。
3. 使用 `$skill-name`，指出本次輸入與任務；只有和 Skill 預設不同時，才補上格式、限制或其他例外。
4. 執行後檢查：結果是否同時符合本次任務與 Skill 的品質流程？

<aside class="skills-level-complete is-basic" aria-label="Basic 學習成果">
  <span>BASIC CHECKPOINT</span>
  <strong>你已經能選擇並使用現有 Skill</strong>
  <p>現在，你可以先把 Skills 用在日常任務中；如果還想理解 Codex 為什麼會選到某個 Skill，並建立自己的流程，就繼續 Advanced。</p>
  <a href="#advanced">繼續學習 Advanced ↓</a>
</aside>

## Advanced｜理解、建立與驗證 Skill {#advanced}

<header class="skills-chapter-banner is-advanced">
  <span>ADVANCED · BUILD AND TEST</span>
  <strong>從「會使用」進階到「會設計」</strong>
  <p>你已經知道怎麼從 App 選用 Skill；接下來要理解觸發與載入機制，並把一套成熟流程做成可測試、可維護的能力。</p>
</header>

<section class="lesson-goals" aria-labelledby="skills-advanced-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="skills-advanced-goals-title" class="lesson-goals__title">完成 Advanced 後，你可以</strong>
    <p>設計聚焦的 Skill，決定需要哪些資源與儲存範圍，並用觸發測試與成果測試驗證它。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>理解載入機制</strong><span>說明 progressive disclosure 如何節省 context。</span></article>
    <article><strong>設計 Skill 結構</strong><span>分配 SKILL.md、scripts、references、assets 與 metadata。</span></article>
    <article><strong>建立與放置</strong><span>使用 creator，並選擇 Repository 或 User scope。</span></article>
    <article><strong>測試與演進</strong><span>驗證觸發、成果、失敗行為與 Plugin 邊界。</span></article>
  </div>
</section>

<nav class="lesson-flow skills-lesson-flow skills-advanced-flow" aria-label="Advanced 學習流程">
  <span><b>01</b> 理解載入機制</span>
  <span><b>02</b> 設計結構與觸發</span>
  <span><b>03</b> 建立並選擇範圍</span>
  <span><b>04</b> 測試、維護與分享</span>
</nav>

### 1｜Progressive disclosure：需要時才載入

如果每個 Skill 的完整說明一開始就全部塞進 context，可用空間很快就會被占滿。Codex 使用 **progressive disclosure**，依任務需要逐層載入：

<figure class="skills-disclosure" aria-labelledby="skills-disclosure-title">
  <figcaption>
    <span class="lesson-eyebrow">PROGRESSIVE DISCLOSURE</span>
    <strong id="skills-disclosure-title">Skill 的三層載入流程</strong>
  </figcaption>
  <ol>
    <li>
      <b>01</b>
      <strong>先看 Metadata</strong>
      <code>name + description + path</code>
      <p>Codex 用最少資訊判斷哪些 Skills 可能與任務有關。</p>
    </li>
    <li>
      <b>02</b>
      <strong>觸發後讀指示</strong>
      <code>SKILL.md body</code>
      <p>被明確指定或 description 符合時，才讀取完整工作流程。</p>
    </li>
    <li>
      <b>03</b>
      <strong>需要時取資源</strong>
      <code>references · assets · scripts</code>
      <p>只載入相關參考資料、使用輸出素材，或執行確定性程式。</p>
    </li>
  </ol>
  <p class="skills-disclosure__takeaway"><strong>關鍵：</strong>description 在第一層就要說清楚「做什麼、何時使用」；把觸發條件只寫在 body，Codex 可能根本不會載入它。</p>
</figure>

::: details 進階補充：初始 Skills 清單也有 context budget
Codex 會把可用 Skills 的名稱與 description 放進初始 context，但這份清單最多使用 context window 的 2%；若無法得知 context window，則以上限 8,000 字元計算。Skills 很多時，description 會先被縮短，甚至可能有部分 Skill 未出現在初始清單。

因此應把核心用途與觸發詞放在 description 前面，避免先寫一長段背景。這個限制只影響初始清單；Skill 被選中後，Codex 仍會讀取完整 `SKILL.md`。
:::

### 2｜Skill 的完整結構與責任

一個 Skill 至少是一個含有 `SKILL.md` 的資料夾。先做 instruction-only，再依真實需求加入資源：

<div class="lesson-file-tree skills-file-tree" role="group" aria-label="meeting-follow-up Skill 完整檔案結構">
  <div class="lesson-file-tree__title">
    <span>SKILL ANATOMY</span>
    <small>必要檔案只有 SKILL.md，其餘按需求加入</small>
  </div>
  <ul>
    <li>
      <div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">▾</span><code>meeting-follow-up/</code></div>
      <ul>
        <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◆</span><code>SKILL.md</code><span class="lesson-file-tree__badge is-active">必要</span></div></li>
        <li>
          <div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">▾</span><code>agents/</code><span class="lesson-file-tree__badge is-global">建議</span></div>
          <ul><li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◇</span><code>openai.yaml</code><span class="lesson-file-tree__badge is-global">UI 與依賴</span></div></li></ul>
        </li>
        <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◇</span><code>scripts/</code><span class="lesson-file-tree__badge is-local">選用</span></div></li>
        <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◇</span><code>references/</code><span class="lesson-file-tree__badge is-local">選用</span></div></li>
        <li><div class="lesson-file-tree__node"><span class="lesson-file-tree__icon">◇</span><code>assets/</code><span class="lesson-file-tree__badge is-local">選用</span></div></li>
      </ul>
    </li>
  </ul>
</div>

| 位置 | 放什麼 | 何時才需要 |
| --- | --- | --- |
| `SKILL.md` | `name`、`description` 與必要工作指示 | 每個 Skill 都需要；保持聚焦、使用命令式步驟 |
| `agents/openai.yaml` | 顯示名稱、簡介、預設 Prompt、呼叫政策與工具依賴 | 建立工具通常會產生；需要 App 呈現或依賴宣告時保留 |
| `scripts/` | 可執行的確定性程式 | 同一段程式反覆重寫，或脆弱操作必須穩定一致 |
| `references/` | 規格、schema、政策與長篇領域知識 | 內容只在特定情境需要，不應讓 `SKILL.md` 持續膨脹 |
| `assets/` | 模板、圖片、字型與可複製的 boilerplate | 檔案會用於最終輸出，而不是拿來當工作指示閱讀 |

不要在 Skill 裡額外建立 README、安裝指南、快速參考或 changelog。只保留 Codex 完成這項工作真正需要的檔案；同一份資訊也不要在 `SKILL.md` 與 references 重複維護。

#### Description 是觸發介面，不只是介紹文案

<div class="lesson-rule-grid skills-description-compare">
  <section class="lesson-rule-card is-skip" aria-labelledby="skills-description-bad-title">
    <span class="lesson-rule-card__mark">過度模糊</span>
    <strong id="skills-description-bad-title" class="lesson-rule-card__title">幫忙處理會議內容</strong>
    <ul>
      <li>沒有說明輸入是逐字稿、筆記還是行事曆。</li>
      <li>沒有明確成果與觸發語境。</li>
      <li>容易誤觸發一般文件摘要。</li>
    </ul>
  </section>
  <section class="lesson-rule-card is-do" aria-labelledby="skills-description-good-title">
    <span class="lesson-rule-card__mark">可判斷觸發</span>
    <strong id="skills-description-good-title" class="lesson-rule-card__title">把會議紀錄整理成可追蹤後續</strong>
    <ul>
      <li>輸入包含會議逐字稿、筆記或多份紀錄。</li>
      <li>輸出包含決策、行動項目、負責人、期限與待確認問題。</li>
      <li>使用於會議摘要與 follow-up，不處理無關的一般文件摘要。</li>
    </ul>
  </section>
</div>

### 3｜建立 `meeting-follow-up` Skill

適合建立 Skill 的訊號是：同一流程已重複出現、步驟與輸出大致穩定，而且漏掉其中一步會形成實際品質風險。不要因為做過一次，就急著把探索中的做法固定下來。

#### 建立前先完成五格定義

| 問題 | `meeting-follow-up` 的答案 |
| --- | --- |
| 輸入 | 逐字稿、會議筆記或多份會議紀錄 |
| 成果 | 可追蹤的決策、行動項目與待確認問題 |
| 固定步驟 | 讀完輸入 → 分類內容 → 核對 owner／deadline → 標示缺漏 |
| 禁止事項 | 不得把提案當決策，不得推測負責人、期限或結論 |
| 完成條件 | 欄位齊全；所有缺漏明確標示「待確認」 |

接著使用內建 creator，先建立 instruction-only 版本：

```md{1,3}
$skill-creator

請建立一個 meeting-follow-up skill。

用途：把會議逐字稿、筆記或多份紀錄整理成可追蹤的後續事項。
輸出：會議目的、已確認決策、行動項目、負責人、期限與待確認問題。
限制：不得推測未明確記載的負責人、期限或決策；缺少資訊時標示「待確認」。
觸發：會議摘要、會後追蹤、從會議紀錄提取決策或 action items。
排除：與會議無關的一般文件摘要。

先建立 instruction-only 版本，儲存在此 Repository 的 .agents/skills。
```

建立完成後，先檢查 `SKILL.md` 的三個部分：

```markdown
---
name: meeting-follow-up
description: 將會議逐字稿、筆記或多份紀錄整理成已確認決策、行動項目、負責人、期限與待確認問題。用於會議摘要、會後追蹤或提取 action items；不要用於和會議無關的一般文件摘要。
---

1. 讀完所有提供的會議紀錄，再開始整理。
2. 將已確認決策與提案、討論內容分開。
3. 列出每個行動項目的負責人與期限。
4. 將缺少的負責人或期限標示為「待確認」，不要自行推測。
5. 最後列出尚未解決的問題，以及紀錄中明確提到的下次追蹤日期。
```

- **`name`**：使用小寫字母、數字與連字號，資料夾名稱與 Skill 名稱一致。
- **`description`**：同時包含做什麼、什麼情境使用與重要排除邊界。
- **Body**：使用可執行的命令式步驟，只留下觸發後真正需要的流程。

::: tip 自由度要配合任務風險
會議摘要允許依內容調整措辭，適合 instruction-only 的高自由度指示；若流程涉及固定格式轉換、精確計算或容易出錯的檔案操作，再用參數化 script 降低自由度。
:::

#### 選擇儲存範圍

<section class="skills-scope-grid" aria-label="Repository 與 User Skill 儲存範圍比較">
  <article>
    <span>REPOSITORY</span>
    <strong><code>.agents/skills/meeting-follow-up/</code></strong>
    <p>適合同一 Repository、模組或團隊共同使用；可以和專案一起版本控制與審查。</p>
  </article>
  <article>
    <span>USER</span>
    <strong><code>$HOME/.agents/skills/meeting-follow-up/</code></strong>
    <p>適合個人跨 Repository 使用；不要放入只對單一專案成立的內部規則。</p>
  </article>
</section>

判斷方式很簡單：先問「這套流程屬於誰？」屬於專案或團隊就放 Repository；屬於個人跨專案習慣才放 User。

::: details 進階補充：其他 scope、巢狀掃描、同名與停用
- **巢狀 Repository**：Codex 會從目前工作目錄一路向上掃描到 Repository root 的 `.agents/skills`，因此模組可放局部 Skill，根目錄可放全專案 Skill。
- **Admin**：共享機器或 container 可以從 `/etc/codex/skills` 提供共同能力。
- **System**：OpenAI 隨 Codex 提供的內建 Skills，例如 creator 類能力。
- **同名 Skill**：不同位置的同名 Skill 不會合併，可能同時出現在選擇器；名稱應避免造成使用者無法分辨。
- **暫時停用**：可在 `~/.codex/config.toml` 以 `[[skills.config]]` 指定 `SKILL.md` 路徑並設為 `enabled = false`，修改後重新啟動 Codex。

Skill 資料夾更新後通常會被自動偵測；若沒有出現，再重新啟動 Codex。
:::

### 4｜兩層測試：先選對，再做對

測試 Skill 時，只要先回答兩個問題：**Codex 有沒有在正確時機選到它？選到之後，有沒有照它的方法完成工作？** 兩層要分開測，才知道失敗時應該修改哪裡。

<figure class="skills-test-flow" aria-labelledby="skills-test-flow-title">
  <figcaption>
    <span>SKILL TESTING</span>
    <strong id="skills-test-flow-title">一個 Skill，要連續通過兩層</strong>
    <small>第一層檢查選擇，第二層檢查執行。</small>
  </figcaption>
  <div class="skills-test-flow__stages">
    <article class="is-trigger">
      <span>01 · TRIGGER TEST</span>
      <strong>有沒有選對 Skill？</strong>
      <p>準備兩句 Prompt，不需要一開始就做大量案例。</p>
      <ul>
        <li><b>應觸發：</b>整理會議逐字稿並列出行動項目。</li>
        <li><b>不應觸發：</b>把產品白皮書濃縮成摘要。</li>
      </ul>
      <footer><b>判斷錯誤</b><span>修改 <code>description</code> 的用途與排除邊界。</span></footer>
    </article>
    <span class="skills-test-flow__connector" aria-hidden="true">→</span>
    <article class="is-output">
      <span>02 · OUTPUT TEST</span>
      <strong>選到後，有沒有做對？</strong>
      <p>用一份真實會議紀錄執行，再檢查三件事：</p>
      <ul>
        <li>有沒有依序完成必要步驟。</li>
        <li>成果是否包含預期欄位與格式。</li>
        <li>缺少資料時是否標示待確認，而不是自行推測。</li>
      </ul>
      <footer><b>結果錯誤</b><span>修改 <code>SKILL.md</code> 的步驟、格式或完成條件。</span></footer>
    </article>
  </div>
  <p class="skills-test-flow__result"><strong>通過標準</strong><span>該用時選得到，不該用時不會誤用；選到後能穩定產生合格結果。</span></p>
</figure>

先用這組最小測試找出明顯問題即可。每次修改 `description` 或 `SKILL.md` 後，再重跑同一組案例，確認原本正確的行為沒有消失。

### 5｜讓 Skill 演進，但不要過早複雜化

Skill 不需要一開始就擁有完整的資料夾。先用 `SKILL.md` 證明流程可行，再針對實際遇到的問題加入 resources 或 scripts。判斷的重點不是檔案多不多，而是 **Codex 此刻需要思考、查閱，還是精確執行**。

<div class="skills-evolution-decision" role="group" aria-label="依工作性質選擇 Skill 組成">
  <span><b>需要判斷</b><small>寫進 Instructions</small></span>
  <i aria-hidden="true">→</i>
  <span><b>需要查閱或套用</b><small>加入 Resources</small></span>
  <i aria-hidden="true">→</i>
  <span><b>需要固定執行</b><small>加入 Scripts</small></span>
</div>

下面三張牌卡沿用同一個 `insurance-intake-check` Skill。先讀每一層的設計原則；想看它如何用在核保收件情境，再展開牌卡底部的保險案例。

<section class="skills-evolution-guide" aria-label="Instructions、Resources 與 Scripts 的建立時機和內容">
  <article class="is-instructions">
    <header><span>01 · INSTRUCTIONS</span><strong>每個 Skill 都從指示開始</strong><small>必要核心：<code>SKILL.md</code></small></header>
    <div class="skills-evolution-guide__body">
      <section><b>何時建立</b><p>同一項工作已重複出現，而且輸入、必要步驟與合格成果大致穩定時，就可以建立第一版 Skill。若做法仍在探索，先留在本次 Prompt，不急著固定。</p></section>
      <section><b>適合放什麼</b><ul><li><code>name</code>、<code>description</code> 與觸發邊界。</li><li>輸入檢查、步驟順序與需要判斷的規則。</li><li>成果要求、完成條件，以及資料不足時的處理方式。</li></ul></section>
    </div>
    <details class="skills-evolution-example">
      <summary><span>保險案例 · 第一階段</span><strong>先用火險驗證共同流程</strong></summary>
      <div class="skills-evolution-example__body">
        <p><b>情境</b> 第一版只處理火險投保文件，規則數量不多，可以先直接寫在 Instructions。</p>
        <ul><li>確認險種為火險，以及本次投保或異動的目的。</li><li>依火險收件規則，把文件分成「已收到、缺少、待確認」。</li><li>影像模糊、欄位空白或資料矛盾時，保留原文並標示待確認。</li><li>不得推測資料，也不得回答是否承保、費率或承保條件。</li></ul>
        <p class="skills-evolution-example__result"><code>SKILL.md</code><span>先確認共同收件流程與風險邊界，能否穩定產生可複核清單。</span></p>
      </div>
    </details>
  </article>
  <div class="skills-evolution-guide__connector"><span>只有在內容變長，或需要重複使用檔案時才加入</span><b aria-hidden="true">↓</b></div>
  <article class="is-resources">
    <header><span>02 · RESOURCES</span><strong>把按需查閱的內容拆出去</strong><small>選用：<code>references/</code></small></header>
    <div class="skills-evolution-guide__body">
      <section><b>何時建立</b><p><code>SKILL.md</code> 已被長篇規格、大量範例或不同領域的規則淹沒，而且這些內容只在特定任務需要時，再加入 references。</p></section>
      <section><b>適合放什麼</b><ul><li>規格、術語、分類表、政策、schema 與長篇範例。</li><li>不同產品、險種或領域各自適用的規則。</li><li>在 <code>SKILL.md</code> 寫清楚判斷條件，以及什麼情況讀哪一份 reference。</li></ul></section>
    </div>
    <details class="skills-evolution-example">
      <summary><span>保險案例 · 第二階段</span><strong>加入水險後，按險種拆分規則</strong></summary>
      <div class="skills-evolution-example__body">
        <p><b>情境</b> 火險與水險需要檢查的風險資料和文件不同，全部塞進 <code>SKILL.md</code> 會讓流程難以閱讀與維護。</p>
        <ul><li><code>references/fire-insurance-rules.md</code>：火險標的、建築與使用性質、保額及必要文件規則。</li><li><code>references/marine-insurance-rules.md</code>：水險的運送標的、航程、運輸方式、保額等規則。</li><li><code>SKILL.md</code> 只保留共同流程：先辨識險種，再讀取對應的 reference；險種不明時先詢問。</li></ul>
        <p class="skills-evolution-example__result"><code>references/</code><span>每個險種各自維護規則；新增險種時，不需要複製整套 Skill。</span></p>
      </div>
    </details>
  </article>
  <div class="skills-evolution-guide__connector"><span>只有在步驟必須可重複、可驗證時才加入</span><b aria-hidden="true">↓</b></div>
  <article class="is-scripts">
    <header><span>03 · SCRIPTS</span><strong>把不可漂移的操作固定下來</strong><small>選用：<code>scripts/</code></small></header>
    <div class="skills-evolution-guide__body">
      <section><b>何時建立</b><p>同一串命令或程式反覆被重寫、人工操作容易漏步驟，或結果有明確規則可以自動驗證時，才值得加入 script。</p></section>
      <section><b>適合放什麼</b><ul><li>蒐集或解析資料、固定格式轉換與檔案產生。</li><li>schema、欄位、連結、測試結果或輸出格式的驗證。</li><li>明確的參數、輸出、錯誤訊息與非零失敗狀態。</li></ul></section>
    </div>
    <details class="skills-evolution-example">
      <summary><span>保險案例 · 第三階段</span><strong>固定文件清點與格式驗證</strong></summary>
      <div class="skills-evolution-example__body">
        <p><b>情境</b> 一件投保案可能包含數十個檔案，人工清點容易漏件，輸出的檢核表也可能少了必要欄位。</p>
        <ul><li><code>scripts/inventory-submission-files.py</code>：以固定規則列出檔名、格式與頁數。</li><li><code>scripts/validate-intake-checklist.py</code>：檢查必要區塊、狀態值與來源標示。</li><li><code>SKILL.md</code> 說明執行順序；script 失敗時停止並回報，不把不完整結果當成完成。</li></ul>
        <p class="skills-evolution-example__result"><code>scripts/</code><span>Script 固定清點與格式驗證；險種判斷與文件規則仍由 Instructions 和對應 reference 負責。</span></p>
      </div>
    </details>
  </article>
</section>

三個階段會累積在同一個 Skill：`SKILL.md` 保存共同流程，references 保存各險種規則，scripts 負責可重複驗證的操作。只有真的出現下一層需求時，才加入對應檔案。

#### 從個人到團隊：Skill 的存放位置與擴充建議

| 需求 | 建議做法 |
| --- | --- |
| 一套聚焦的可重用流程 | 保持為 Skill |
| Repository 內團隊共同使用 | 版本控制 `.agents/skills` |
| 個人跨專案使用 | 放在 User scope |
| 要讓他人安裝，或一起散布多個 Skills | 封裝成 [Plugin](/advanced/plugins) |
| 流程還需要 connector、MCP tools 或其他擴充 | 用 Plugin 組合並交付 |

第三方 Skill 安裝前，至少閱讀 `SKILL.md`、scripts、references、依賴與資料流向。確認它會執行哪些命令、讀取哪些資料、連接哪些服務，以及失敗時怎麼處理；社群 Skill 也不能取代產品或框架的官方文件。

### 動手練習｜建立與測試一個 Skill

<figure class="course-visual" aria-labelledby="skills-shot-creator-title">
  <div class="media-tabs__stage is-tall">
    <div class="media-tabs__glow" aria-hidden="true"></div>
    <div class="media-tabs__window">
      <img src="/images/skills/skills_creator.png" width="1172" height="1404" alt="Codex Desktop App 中 Skill Creator 的詳細資料頁，顯示建立或更新 Skill 的用途與說明" loading="lazy" decoding="async">
    </div>
  </div>
  <figcaption id="skills-shot-creator-title">Skill Creator 會說明如何建立或更新 Skill；開始練習前，先確認它的用途與適用範圍，再用 <code>$skill-creator</code> 建立自己的流程。</figcaption>
</figure>

1. 選一項你至少做過三次、而且步驟已大致固定的任務。
2. 寫出輸入、成果、固定步驟、禁止事項與完成條件。
3. 使用 `$skill-creator` 建立 instruction-only 版本，放到適合的 Repository 或 User scope。
4. 檢查名稱是否聚焦，description 是否包含用途、觸發情境與重要排除邊界。
5. 用一個應觸發與一個不應觸發的 Prompt，確認 Codex 有沒有選對 Skill。
6. 用一份真實輸入檢查必要步驟、預期成果，以及缺少資料時不會自行推測。
7. 只有觀察到重複程式、長篇參考或固定模板需求時，才規劃 scripts、references 或 assets。

## 延伸閱讀

- [OpenAI：Build skills](https://learn.chatgpt.com/docs/build-skills) — 結構、觸發、儲存位置與建立方式的主要規格。
- [OpenAI：Skills & Plugins](https://learn.chatgpt.com/docs/skills-and-plugins) — Skill 與 Plugin 的定位與選擇方式。
- [Agent Skills specification](https://agentskills.io/specification) — 開放 Agent Skills 標準。
- [CodexGuide：Skills、Plugins 與 MCP](https://codexguide.ai/advanced/03-skills-plugins-mcp.html) — 中文概念與案例參考；產品規格仍以官方文件為準。
- [下一章：MCP 與外部工具](/advanced/mcp-tools) — 為成熟方法連接即時 context 與可執行 tools。
- [後續：Plugins](/advanced/plugins) — 把 Skills、連線與擴充元件做成可安裝的能力包。
