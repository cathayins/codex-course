---
title: Hooks：從 Matcher 到 Handler
description: 從事件、Matcher 與 Handler 的判讀順序，透過工程、非工程與安全護欄案例理解 Codex Hooks。
outline: [2, 3]
---

# Hooks：從 Matcher 到 Handler

::: tip 選修章
Hooks 適合少數必須在 lifecycle 固定時點機械式執行的規則。若文字規範、Permissions 與人工審查已足夠，不需要為了完成核心路線而設定 Hook。
:::

本課程先用一個簡化式理解 Agent：**Agent = Model + Harness**。Model 負責理解、推理與產生下一步；Harness 則把 Model 放進一個可工作的環境，提供 context、tools、permissions 與執行流程。

<section class="hooks-agent-equation" aria-label="Agent 等於 Model 加上 Harness 的概念圖">
  <article class="is-agent">
    <span>AGENT</span>
    <strong>能完成任務的整體</strong>
    <p>不只會推理，也能取得資料、使用工具並依規則執行。</p>
  </article>
  <i aria-hidden="true">＝</i>
  <article class="is-model">
    <span>MODEL</span>
    <strong>理解與推理</strong>
    <p>根據 context 判斷下一步要說什麼、做什麼。</p>
  </article>
  <i aria-hidden="true">＋</i>
  <article class="is-harness">
    <span>HARNESS</span>
    <strong>把推理接上環境</strong>
    <p>管理 tools、permissions、context 與 lifecycle。</p>
    <small><b>HOOK</b> 是 Harness 在固定 lifecycle 時點執行規則的一種呈現。</small>
  </article>
</section>

前面的章節已經看過 Harness 的其他部分：`AGENTS.md` 提供長期 context，Config 與 Permissions 建立執行邊界。本章的 Hook 則讓 Harness 在 session、Prompt、工具或結束等固定時點，自動叫一支程式來檢查、提醒或阻擋。

讀 Hook 不必先理解整份 JSON。只要依序回答三個問題：

1. **Event**：什麼時候檢查？
2. **Matcher**：這次事件符合條件嗎？
3. **Handler**：符合後要執行哪一支程式？

<section class="lesson-goals" aria-labelledby="hooks-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="hooks-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>從需求找到事件，說明 Matcher 與 Handler 的分工，並用同一套判讀方法看懂不同領域的 Hook。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>理解 Harness</strong><span>知道 Hook 是 Harness 在 lifecycle 中執行規則的一種方式。</span></article>
    <article><strong>讀懂 Matcher</strong><span>辨識 Matcher 篩選的是 tool name、啟動來源或其他事件欄位。</span></article>
    <article><strong>讀懂 Handler</strong><span>知道 Handler 會收到事件資料，並執行實際的檢查或回應。</span></article>
    <article><strong>判讀案例</strong><span>能分析工程、非工程與安全護欄情境，不把 Hook 當成完整安全系統。</span></article>
  </div>
</section>

<nav class="lesson-flow hooks-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 看懂三層流程</span>
  <span><b>02</b> 找到 Event</span>
  <span><b>03</b> Matcher, Handler</span>
  <span><b>04</b> 選擇存放位置</span>
  <span><b>05</b> 套用案例與護欄</span>
</nav>

## 1｜先看全貌：Event → Matcher → Handler

一個 Hook 從事件發生到執行檢查，會依序經過三層。**Event 找到時機，Matcher 縮小範圍，Handler 才處理實際內容。**

<section class="hooks-config-anatomy" aria-label="Hook 從 event 經 matcher 到 handler 的三層結構">
  <article><b>01</b><span>EVENT</span><strong><code>PostToolUse</code></strong><p>工具產生結果時，Codex 找到這一組 Hook。</p></article>
  <i aria-hidden="true">→</i>
  <article><b>02</b><span>MATCHER</span><strong><code>^Bash$</code></strong><p>只有 tool name 是 Bash 時才繼續。</p></article>
  <i aria-hidden="true">→</i>
  <article><b>03</b><span>HANDLER</span><strong><code>review_test.py</code></strong><p>啟動程式，讀取 command 與執行結果。</p></article>
</section>

把它念成一句話就是：**工具執行後，如果這次工具是 Bash，就執行 `review_test.py`。**

三層的責任不能混在一起：

1. Event 不判斷內容，只定義 lifecycle 時點。
2. Matcher 不負責完整決策，只先篩選事件提供的分類欄位。
3. Handler 才讀取事件資料，執行真正的檢查並回傳結果。

接下來依序拆開三層來看。

## 2｜先找 Event：要在哪個時點介入？

Hook 的起點不是 script，而是**時機**。先問「我需要在事情發生前、發生後，還是結束前看見資料？」再選 Event。

<figure class="hooks-lifecycle" aria-labelledby="hooks-lifecycle-title">
  <figcaption>
    <span>CODEX LIFECYCLE</span>
    <strong id="hooks-lifecycle-title">10 個事件分布在六個階段</strong>
    <small>箭頭是常見閱讀順序；不是每一輪都會發生 compact 或啟動 subagent。</small>
  </figcaption>
  <div class="hooks-lifecycle__track">
    <article class="is-start"><b>01</b><strong>Session</strong><code>SessionStart</code></article>
    <i aria-hidden="true">→</i>
    <article class="is-prompt"><b>02</b><strong>Prompt</strong><code>UserPromptSubmit</code></article>
    <i aria-hidden="true">→</i>
    <article class="is-tool"><b>03</b><strong>Tool</strong><code>PreToolUse</code><code>PermissionRequest</code><code>PostToolUse</code></article>
    <i aria-hidden="true">→</i>
    <article class="is-context"><b>04</b><strong>Compact</strong><code>PreCompact</code><code>PostCompact</code></article>
    <i aria-hidden="true">→</i>
    <article class="is-agent"><b>05</b><strong>Subagent</strong><code>SubagentStart</code><code>SubagentStop</code></article>
    <i aria-hidden="true">→</i>
    <article class="is-stop"><b>06</b><strong>Finish</strong><code>Stop</code></article>
  </div>
</figure>

第一次學習先掌握以下六個事件：

| Event | 觸發時機 | 常見用途 |
| --- | --- | --- |
| `SessionStart` | Session 啟動或恢復時 | 加入啟動 context；固定規範仍優先放在 `AGENTS.md` |
| `UserPromptSubmit` | Prompt 送進 agent loop 前 | 檢查使用者剛送出的文字 |
| `PreToolUse` | 工具真正執行前 | 在副作用發生前檢查或阻擋 |
| `PermissionRequest` | Codex 準備詢問權限時 | allow、deny，或回到原本的 Approval 流程 |
| `PostToolUse` | 工具產生結果後 | 根據結果提供回饋，但不能撤銷副作用 |
| `Stop` | 一輪工作準備結束前 | 未達條件時要求 Codex 繼續 |

::: details 另外四個進階事件
- `PreCompact`／`PostCompact`：分別在 context 壓縮前後觸發。
- `SubagentStart`／`SubagentStop`：分別在 subagent 啟動與準備結束時觸發。
- `SessionStart` 與 `SubagentStart` 在 thread 或 subagent-start scope 執行；其他事件在 turn scope 執行。
:::

## 3｜Matcher：只做第一層篩選

Event 決定何時檢查，Matcher 則決定**這一次事件要不要叫 Handler**。它是一段 regex，通常只比對事件提供的某個分類欄位。

假設 Matcher 是 `^Bash$`，它只能知道「這是一個 Bash 工具呼叫」，**不知道 command 是跑測試、部署，還是刪除檔案**。更細的判斷要留給 Handler 讀取事件資料後決定。

<div class="hooks-matcher-table">
  <table aria-label="各 Hook 事件的 Matcher 比對欄位">
    <thead>
      <tr><th>Event</th><th>Matcher 比對什麼</th><th>範例</th></tr>
    </thead>
    <tbody>
      <tr><td><code>PreToolUse</code>、<code>PermissionRequest</code>、<code>PostToolUse</code></td><td>tool name</td><td><code>^Bash$</code>、<code>^apply_patch$</code>、<code>mcp__.*</code></td></tr>
      <tr><td><code>SessionStart</code></td><td>啟動來源</td><td><code>startup|resume</code></td></tr>
      <tr><td><code>PreCompact</code>、<code>PostCompact</code></td><td>壓縮來源</td><td><code>manual|auto</code></td></tr>
      <tr><td><code>SubagentStart</code>、<code>SubagentStop</code></td><td>subagent type</td><td>依啟動的 subagent 類型</td></tr>
      <tr><td><code>UserPromptSubmit</code>、<code>Stop</code></td><td>目前不支援 Matcher</td><td>設定後也會被忽略</td></tr>
    </tbody>
  </table>
</div>

要讓所有情況都符合，可以省略 Matcher，或使用 `"*"`、空字串。實務上應先從精確條件開始，避免每一次事件都執行不必要的 Handler。

```json
{
  "hooks": {
    "PostToolUse": [ // [!code highlight]
      {
        "matcher": "^Bash$", // [!code highlight]
        "hooks": [
          {
            "type": "command",
            "command": "python3 /path/to/review_test.py" // [!code highlight]
          }
        ]
      }
    ]
  }
}
```

由外往內讀就是：**工具執行後 → 只挑 Bash → 執行 `review_test.py`。**

## 4｜Handler：命中後「實際做什麼」

Matcher 通過後，Codex 會啟動 Handler。現在 Codex 只會執行 `type: "command"` 的 Handler；`prompt`、`agent` 與 async command hooks 目前不會執行。

<figure class="hooks-data-flow" aria-labelledby="hooks-data-flow-title">
  <figcaption>
    <span>MATCH TO ACTION</span>
    <strong id="hooks-data-flow-title">Matcher 選中，Handler 才讀資料並回應</strong>
  </figcaption>
  <div class="hooks-data-flow__track">
    <article><b>01 · MATCH</b><strong><code>^Bash$</code></strong><small>確認這次 tool name 符合條件</small></article>
    <i aria-hidden="true">符合後啟動 →</i>
    <article class="is-command"><b>02 · HANDLE</b><strong><code>review_test.py</code></strong><small>從 stdin 讀取 command 與執行結果</small></article>
    <i aria-hidden="true">回傳結果 →</i>
    <article class="is-result"><b>03 · CODEX</b><strong>繼續或調整</strong><small>依 Event 支援的效果處理回應</small></article>
  </div>
</figure>

每個 command Handler 都會從 stdin 收到一個 JSON object。常見欄位包括目前的 `cwd`、`hook_event_name` 與 `session_id`；工具事件還會提供 `tool_name`、`tool_input`，執行後事件另有 `tool_response`。Handler 應只讀取完成判斷所需的欄位。

### Handler 的能力，取決於選在哪一個 Event

用測試來看最清楚：Codex 會執行 `npm test`。如果測試失敗，我們希望它看見失敗原因並繼續修正，而不是直接結束。三個 Event 就像三個檢查站：**執行前、執行後、結束前**。選到不同的檢查站，Handler 能拿到的資料與能做的事也會不同。

<section class="hooks-output-grid hooks-timing-compare" aria-label="測試失敗需求在三個 Hook 事件的效果比較">
  <article class="is-before">
    <span>01 · BEFORE</span>
    <strong><code>PreToolUse</code></strong>
    <p><code>npm test</code> 還沒執行，因此 Handler 只看得到 command，不知道測試會不會通過。</p>
    <small><b>能做：</b>決定是否允許這個 command。<br><b>不能做：</b>根據尚未出現的測試結果要求修正。</small>
  </article>
  <article class="is-after">
    <span>02 · AFTER</span>
    <strong><code>PostToolUse</code></strong>
    <p>測試已經執行，Handler 可以讀取 command 與 <code>tool_response</code>，知道哪些測試失敗。</p>
    <small><b>能做：</b>立刻把失敗原因交給 Codex，請它修正。<br><b>不能做：</b>撤銷已經執行的 command。</small>
  </article>
  <article class="is-stop">
    <span>03 · BEFORE FINISH</span>
    <strong><code>Stop</code></strong>
    <p>Codex 準備結束這一輪。Handler 可以做最後的完成條件檢查，但不會直接取得先前的 <code>tool_response</code>。</p>
    <small><b>能做：</b>發現條件未達時建立 continuation prompt。<br><b>注意：</b>要避免相同要求造成無限延續。</small>
  </article>
</section>

因此，「看見測試輸出後立即回饋」最適合 `PostToolUse`；「整輪工作結束前再確認一次」才使用 `Stop`。Event 不是標籤，而是決定 Handler **何時執行、收到哪些資料，以及能影響哪一個下一步**。

## 5｜Hooks 放在哪裡？

存放位置先只分成兩種範圍：**跟著使用者**，或是**跟著 Repository**。JSON 與 TOML 只是兩種設定寫法，不代表不同作用範圍。

<section class="hooks-source-grid" aria-label="User 與 Repository Hooks 的差異">
  <article>
    <span>USER · 個人範圍</span>
    <strong>User Hooks</strong>
    <p>適合你在不同 Repository 都想使用的個人流程，例如統一記錄或個人提醒。</p>
    <small><code>~/.codex/hooks.json</code><br><code>~/.codex/config.toml</code></small>
  </article>
  <article class="is-repo">
    <span>REPOSITORY · 專案範圍</span>
    <strong>Repository Hooks</strong>
    <p>適合團隊共同遵守、只屬於這個專案的規則；project layer 必須受信任才會載入。</p>
    <small><code>&lt;repo&gt;/.codex/hooks.json</code><br><code>&lt;repo&gt;/.codex/config.toml</code></small>
  </article>
</section>

兩個範圍可以同時存在；所有符合條件的 Hooks 都會載入。判斷方式很簡單：**只代表我的工作習慣，放 User；屬於這個專案的共同規則，放 Repository。**

## 6｜兩個完整案例：工程與非工程

以下兩個案例都用相同順序閱讀：先選 Event，再看 Matcher，最後說明 Handler 真正檢查的資料。

<section class="hooks-case-grid" aria-label="工程與非工程 Hook 案例">
  <article class="hooks-case-study is-engineering">
    <header>
      <span>CASE 01 · ENGINEERING</span>
      <strong>測試跑完後，失敗就請 Codex 繼續修正</strong>
      <p>團隊不希望 Codex 看見測試失敗後仍直接結束工作。</p>
    </header>
    <ol>
      <li><b>EVENT</b><code>PostToolUse</code><span>需要先取得工具執行結果。</span></li>
      <li><b>MATCHER</b><code>^Bash$</code><span>先把範圍縮到 shell command。</span></li>
      <li><b>HANDLER</b><code>review_test.py</code><span>讀取 command 與 response；只有測試命令失敗時才回饋。</span></li>
    </ol>
    <footer><b>結果</b><span>Codex 收到失敗原因並繼續處理；已經執行過的 command 不會被撤銷。</span></footer>
  </article>
  <article class="hooks-case-study is-non-engineering">
    <header>
      <span>CASE 02 · NON-ENGINEERING</span>
      <strong>活動企劃交付前，確認必要段落齊全</strong>
      <p>每份活動企劃都必須包含目標受眾、時程、負責人與預算四個段落。</p>
    </header>
    <ol>
      <li><b>EVENT</b><code>Stop</code><span>需要在 Codex 準備結束這一輪時檢查。</span></li>
      <li><b>MATCHER</b><code>不使用</code><span><code>Stop</code> 目前不支援 Matcher。</span></li>
      <li><b>HANDLER</b><code>check_brief.py</code><span>讀取最後一則回覆，只檢查四個明確標題是否存在。</span></li>
    </ol>
    <footer><b>結果</b><span>若缺少段落，Handler 回傳具體原因，Codex 依原因再補完一輪。</span></footer>
  </article>
</section>

兩個案例的差異不在「工程或非工程」，而在資料出現的時機：測試結果要等 `PostToolUse`，交付物則要等 `Stop`。Matcher 只能先縮小範圍；真正的「這是不是測試命令」或「是否缺少段落」，仍由 Handler 判斷。

::: details 兩個案例的最小設定
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "^Bash$",
        "hooks": [{ "type": "command", "command": "python3 /path/to/review_test.py" }]
      }
    ],
    "Stop": [
      {
        "hooks": [{ "type": "command", "command": "python3 /path/to/check_brief.py" }]
      }
    ]
  }
}
```

這裡只示意設定結構，不要求在本章完成 Python script。Repository 內的正式設定應從 Git root 組成 script 路徑，避免 Codex 從子目錄啟動時找錯位置。
:::

## 7｜安全護欄：在副作用發生前阻擋

安全情境多一個要求： **檢查點必須放在副作用發生前。** 假設 Repository 規定「不得對 Production 資料庫執行 migration」，就不能等 `PostToolUse` 才提醒。

<figure class="hooks-scenario-map" aria-labelledby="hooks-guardrail-title">
  <figcaption>
    <span>GUARDRAIL CASE · PRODUCTION SAFETY</span>
    <strong id="hooks-guardrail-title">Matcher 選出 Bash，Handler 再判斷 command</strong>
    <small>Matcher 不負責理解命令內容；阻擋規則必須由 Handler 明確判斷。</small>
  </figcaption>
  <div class="hooks-scenario-map__lanes">
    <article class="hooks-scenario-lane">
      <header><b>MATCHER</b><strong><code>^Bash$</code></strong></header>
      <p>只把 Bash 工具呼叫送進安全檢查，避免所有工具都執行同一支 Handler。</p>
      <footer>回答：這一類工具需要檢查嗎？</footer>
    </article>
    <span class="hooks-scenario-map__plus" aria-hidden="true">→</span>
    <article class="hooks-scenario-lane is-hook">
      <header><b>HANDLER</b><strong><code>check_command.py</code></strong></header>
      <p>讀取 <code>tool_input.command</code>；命中明確禁止的 Production migration 才回傳 deny。</p>
      <footer>回答：這一個 command 應該阻擋嗎？</footer>
    </article>
  </div>
</figure>

事件要選 `PreToolUse`。阻擋時，Handler 可以回傳這個縮短後的結果：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Production migration 必須由 DBA 執行，請改用測試資料庫。"
  }
}
```

安全護欄應該只阻擋**少數、明確、可程式判斷**的行為，並提供安全替代方案。若規則需要大量語意判斷，先交給人工 review，不要把所有未知情況一律 deny。

::: warning Hook 是護欄，不是完整安全邊界
部分 specialized 或 hosted tools 可能不走相同的 Hook path。Hooks 不能取代 Sandbox、Permissions、Approval、人工 review 或 CI；它只是讓特定 lifecycle 時點多一道可自動執行的檢查。
:::

## 延伸閱讀

- [OpenAI 官方：Hooks](https://learn.chatgpt.com/docs/hooks)
- [OpenAI 官方：Advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced#hooks)
- [Codex Guide：Hooks](https://codexguide.ai/advanced/06-hooks.html#%E5%B8%B8%E8%A7%81%E4%BA%8B%E4%BB%B6)
- [Claude Code Hooks 案例整理](https://www.oao.tw/ai-knowledge/claude-code-hooks)（只參考情境；事件、schema 與支援能力不可直接套用到 Codex）
- [選修上一章：Subagents](/advanced/worktrees) — Hooks 的 lifecycle 也包含 SubagentStart 與 SubagentStop。
