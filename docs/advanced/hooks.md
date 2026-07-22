---
title: Hooks：從 Matcher 到 Handler
description: 說明 Event、Matcher 與 Handler 的判讀順序，並以工程、非工程和安全護欄案例介紹 Codex Hooks。
outline: [2, 3]
---

# Hooks：從 Matcher 到 Handler

::: tip 選修章
Hooks 適合處理少數需要在 lifecycle 固定時點自動執行的規則。若文字規範、Permissions 與人工審查已經足夠，就不必另外設定 Hook。
:::

可以用一個簡化公式理解 Agent：**Agent = Model + Harness**。Model 負責理解、推理並決定下一步；Harness 提供 context、tools、permissions 與執行流程，讓 Model 能在實際環境中工作。

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
    <small><b>HOOK</b> 是 Harness 在固定 lifecycle 時點執行規則的機制。</small>
  </article>
</section>

`AGENTS.md` 提供長期 context，Config 與 Permissions 建立執行邊界。Hook 則讓 Harness 在 session、Prompt、工具執行或工作結束等固定時點，自動呼叫程式進行檢查、提醒或阻擋。

閱讀 Hook 時，不需要先看完整份 JSON。先回答三個問題：

1. **Event**：什麼時候檢查？
2. **Matcher**：這次事件符合條件嗎？
3. **Handler**：符合後要執行哪個 Handler？

<section class="lesson-goals" aria-labelledby="hooks-goals-title">
  <div class="lesson-goals__intro">
    <span class="lesson-eyebrow">LEARNING GOALS</span>
    <strong id="hooks-goals-title" class="lesson-goals__title">完成本章後，你可以</strong>
    <p>依需求選擇 Event，說明 Matcher 與 Handler 的分工，並用同一套判讀方法看懂不同領域的 Hook。</p>
  </div>
  <div class="lesson-goals__grid">
    <article><strong>理解 Harness</strong><span>理解 Hook 如何讓 Harness 在 lifecycle 中執行規則。</span></article>
    <article><strong>讀懂 Matcher</strong><span>辨識 Matcher 篩選的是 tool name、啟動來源或其他事件欄位。</span></article>
    <article><strong>讀懂 Handler</strong><span>理解 Handler 會接收事件資料，執行檢查並回應。</span></article>
    <article><strong>判讀案例</strong><span>能分析工程、非工程與安全護欄情境，不把 Hook 當成完整安全系統。</span></article>
  </div>
</section>

<nav class="lesson-flow hooks-lesson-flow" aria-label="本章學習流程">
  <span><b>01</b> 看懂三層流程</span>
  <span><b>02</b> 選擇 Event</span>
  <span><b>03</b> Matcher、Handler</span>
  <span><b>04</b> 選擇存放位置</span>
  <span><b>05</b> 套用案例與護欄</span>
</nav>

## 1｜先看全貌：Event → Matcher → Handler

一個 Hook 從事件發生到執行檢查，會依序經過三層。**Event 決定時機，Matcher 縮小範圍，Handler 處理實際內容。**

<section class="hooks-config-anatomy" aria-label="Hook 從 event 經 matcher 到 handler 的三層結構">
  <article><b>01</b><span>EVENT</span><strong><code>PostToolUse</code></strong><p>工具產生結果時，Codex 觸發這組 Hook。</p></article>
  <i aria-hidden="true">→</i>
  <article><b>02</b><span>MATCHER</span><strong><code>^Bash$</code></strong><p>tool name 為 Bash 時才會繼續。</p></article>
  <i aria-hidden="true">→</i>
  <article><b>03</b><span>HANDLER</span><strong><code>review_test.py</code></strong><p>Handler 讀取 command 與執行結果。</p></article>
</section>

這段流程表示：**工具執行後，如果這次使用的是 Bash，就執行 `review_test.py`。**

三層的責任不能混在一起：

1. Event 只定義 lifecycle 時點，不判斷內容。
2. Matcher 先依事件提供的分類欄位篩選範圍，詳細判斷交給 Handler。
3. Handler 讀取事件資料，完成詳細檢查並回傳結果。

## 2｜先找 Event：要在哪個時點介入？

設定 Hook 時，先決定介入時機。要在事情發生前、發生後，還是工作結束前取得資料？答案會決定該選哪個 Event。

<figure class="hooks-lifecycle" aria-labelledby="hooks-lifecycle-title">
  <figcaption>
    <span>CODEX LIFECYCLE</span>
    <strong id="hooks-lifecycle-title">10 個事件分布在六個階段</strong>
    <small>箭頭表示常見閱讀順序；每一輪不一定都會 compact 或啟動 subagent。</small>
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

先看六個常用事件：

| Event | 觸發時機 | 常見用途 |
| --- | --- | --- |
| `SessionStart` | Session 啟動或恢復時 | 加入啟動時的 context；固定規範仍優先放在 `AGENTS.md` |
| `UserPromptSubmit` | Prompt 送入 agent loop 前 | 檢查使用者剛送出的文字 |
| `PreToolUse` | 工具執行前 | 在副作用發生前檢查或阻擋 |
| `PermissionRequest` | Codex 準備詢問權限時 | allow、deny，或回到原本的 Approval 流程 |
| `PostToolUse` | 工具產生結果後 | 根據結果提供回饋，但不能撤銷副作用 |
| `Stop` | 一輪工作準備結束前 | 完成條件未達成時，要求 Codex 繼續 |

::: details 另外四個進階事件
- `PreCompact`／`PostCompact`：分別在 context 壓縮前後觸發。
- `SubagentStart`／`SubagentStop`：分別在 subagent 啟動與準備結束時觸發。
- `SessionStart` 與 `SubagentStart` 在 thread 或 subagent-start scope 執行，其餘事件則在 turn scope 執行。
:::

## 3｜Matcher：只做第一層篩選

Event 決定何時檢查，Matcher 則決定**是否執行 Handler**。Matcher 使用 regex，通常只比對事件提供的某個分類欄位。

假設 Matcher 是 `^Bash$`，它只能知道「這是一個 Bash 工具呼叫」，無法判斷 command 執行的是測試、部署，還是刪除檔案。Handler 讀取事件資料後，再做更細的判斷。

<div class="hooks-matcher-table">
  <table aria-label="各 Hook 事件的 Matcher 比對欄位">
    <thead>
      <tr><th>Event</th><th>Matcher 比對什麼</th><th>範例</th></tr>
    </thead>
    <tbody>
      <tr><td><code>PreToolUse</code>、<code>PermissionRequest</code>、<code>PostToolUse</code></td><td>tool name</td><td><code>^Bash$</code>、<code>^apply_patch$</code>、<code>mcp__.*</code></td></tr>
      <tr><td><code>SessionStart</code></td><td>啟動來源</td><td><code>startup|resume</code></td></tr>
      <tr><td><code>PreCompact</code>、<code>PostCompact</code></td><td>壓縮來源</td><td><code>manual|auto</code></td></tr>
      <tr><td><code>SubagentStart</code>、<code>SubagentStop</code></td><td>subagent type</td><td>依啟動的 subagent 類型而定</td></tr>
      <tr><td><code>UserPromptSubmit</code>、<code>Stop</code></td><td>目前不支援 Matcher</td><td>設定後也會被忽略</td></tr>
    </tbody>
  </table>
</div>

若要匹配所有事件，可省略 Matcher，或使用 `"*"`、空字串。實務上應先從精確條件開始，避免每一次事件都執行不必要的 Handler。

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

這段設定由外往內表示：**工具執行後 → 篩選 Bash → 執行 `review_test.py`。**

::: details `review_test.py` 最小範例
它會讀取 Bash 指令與輸出，若發現測試失敗，就提醒 Codex 修正後重跑。

```python
"""Review failed test commands emitted by a PostToolUse Hook."""

import json
import sys


TEST_COMMANDS = ("npm test", "pnpm test", "pytest", "yarn test")
FAILURE_MARKERS = ("failed", "failure", "error")


def is_failed_test(command: str, response: str) -> bool:
    """Returns whether a known test command reported a failure."""
    normalized_command = command.lower()
    normalized_response = response.lower()
    is_test_command = any(
        test_command in normalized_command for test_command in TEST_COMMANDS
    )
    has_failure_marker = any(
        marker in normalized_response for marker in FAILURE_MARKERS
    )
    return is_test_command and has_failure_marker


def main() -> None:
    """Sends focused feedback to Codex when a test command fails."""
    event = json.load(sys.stdin)
    command = str(event.get("tool_input", {}).get("command", ""))
    response = json.dumps(event.get("tool_response", ""), ensure_ascii=False)

    if not is_failed_test(command, response):
        return

    result = {
        "decision": "block",
        "reason": "測試失敗，請檢查剛才的輸出、修正後重新執行。",
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": "剛才的測試命令失敗，請先找出失敗原因。",
        },
    }
    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()
```
:::

## 4｜Handler：命中後執行檢查

Matcher 命中後，Codex 會啟動 Handler。目前只會執行 `type: "command"` 的 Handler；`prompt`、`agent` 與 async command hooks 尚未支援。

<figure class="hooks-data-flow" aria-labelledby="hooks-data-flow-title">
  <figcaption>
    <span>MATCH TO ACTION</span>
    <strong id="hooks-data-flow-title">Matcher 命中後，Handler 才讀取資料並回應</strong>
  </figcaption>
  <div class="hooks-data-flow__track">
    <article><b>01 · MATCH</b><strong><code>^Bash$</code></strong><small>確認這次 tool name 符合條件</small></article>
    <i aria-hidden="true">符合後啟動 →</i>
    <article class="is-command"><b>02 · HANDLE</b><strong><code>review_test.py</code></strong><small>從 stdin 讀取 command 與執行結果</small></article>
    <i aria-hidden="true">回傳結果 →</i>
    <article class="is-result"><b>03 · CODEX</b><strong>繼續或調整</strong><small>依 Event 支援的方式繼續或調整</small></article>
  </div>
</figure>

每個 command Handler 都會從 stdin 收到一個 JSON object。常見欄位包括 `cwd`、`hook_event_name` 與 `session_id`；工具事件還會提供 `tool_name`、`tool_input`，執行後事件則會提供 `tool_response`。Handler 只需讀取判斷所需的欄位。

### Event 如何影響 Handler 的能力

假設 Codex 會執行 `npm test`，需求是測試失敗時讓 Codex 取得原因並繼續修正。`PreToolUse`、`PostToolUse` 與 `Stop` 像三個檢查站：**執行前、執行後、結束前**。不同 Event 會讓 Handler 在不同時間執行，也會影響它能取得的資料與採取的動作。

<section class="hooks-output-grid hooks-timing-compare" aria-label="測試失敗需求在三個 Hook 事件的效果比較">
  <article class="is-before">
    <span>01 · BEFORE</span>
    <strong><code>PreToolUse</code></strong>
    <p><code>npm test</code> 尚未執行，Handler 只能讀取 command，還沒有測試結果。</p>
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

因此，取得測試輸出後要立即回饋時使用 `PostToolUse`；要在整輪工作結束前確認完成條件時使用 `Stop`。Event 會決定 Handler 的執行時機、可取得的資料，以及能影響的後續流程。

## 5｜Hooks 放在哪裡？

Hook 有兩種存放範圍：**使用者層級**與**Repository 層級**。JSON 與 TOML 只是兩種設定寫法，不代表不同作用範圍。

<section class="hooks-source-grid" aria-label="User 與 Repository Hooks 的差異">
  <article>
    <span>USER · 個人範圍</span>
    <strong>User Hooks</strong>
    <p>適合跨 Repository 共用的個人流程，例如統一記錄或個人提醒。</p>
    <small><code>~/.codex/hooks.json</code><br><code>~/.codex/config.toml</code></small>
  </article>
  <article class="is-repo">
    <span>REPOSITORY · 專案範圍</span>
    <strong>Repository Hooks</strong>
    <p>適合只在特定專案內、由團隊共同遵守的規則；project layer 必須受信任才會載入。</p>
    <small><code>&lt;repo&gt;/.codex/hooks.json</code><br><code>&lt;repo&gt;/.codex/config.toml</code></small>
  </article>
</section>

兩個範圍可以同時存在；所有符合條件的 Hooks 都會載入。**個人工作習慣放 User；專案共同規則放 Repository。**

## 6｜兩個完整案例：工程與非工程

<section class="hooks-case-grid" aria-label="工程與非工程 Hook 案例">
  <article class="hooks-case-study is-engineering">
    <header>
      <span>CASE 01 · ENGINEERING</span>
      <strong>測試失敗時，讓 Codex 繼續修正</strong>
      <p>團隊希望 Codex 遇到測試失敗時繼續修正，不要直接結束工作。</p>
    </header>
    <ol>
      <li><b>EVENT</b><code>PostToolUse</code><span>先取得工具執行結果。</span></li>
      <li><b>MATCHER</b><code>^Bash$</code><span>將範圍限定為 shell command。</span></li>
      <li><b>HANDLER</b><code>review_test.py</code><span>讀取 command 與 <code>tool_response</code>；只在測試命令失敗時回傳問題。</span></li>
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
      <li><b>EVENT</b><code>Stop</code><span>在 Codex 準備結束這一輪時檢查。</span></li>
      <li><b>MATCHER</b><code>不使用</code><span><code>Stop</code> 目前不支援 Matcher。</span></li>
      <li><b>HANDLER</b><code>check_brief.py</code><span>讀取最後一則回覆，只檢查四個明確標題是否存在。</span></li>
    </ol>
    <footer><b>結果</b><span>若缺少段落，Handler 回傳具體原因，Codex 再依原因補齊內容。</span></footer>
  </article>
</section>

兩個案例使用不同 Event，是因為資料出現的時機不同：測試結果要等 `PostToolUse`，交付物則要等 `Stop`。Matcher 只負責縮小範圍；Handler 再判斷 command 是否為測試命令，或交付物是否缺少段落。

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

這份設定只示範結構；Python script 需另行實作。正式的 Repository 設定應從 Git root 組成 script 路徑，避免 Codex 從子目錄啟動時找錯位置。
:::

## 7｜安全護欄：在副作用發生前阻擋

**安全護欄必須在副作用發生前執行。** 假設 Repository 規定「不得對 Production 資料庫執行 migration」，就不能等 `PostToolUse` 才提醒。

<figure class="hooks-scenario-map" aria-labelledby="hooks-guardrail-title">
  <figcaption>
    <span>GUARDRAIL CASE · PRODUCTION SAFETY</span>
    <strong id="hooks-guardrail-title">Matcher 篩出 Bash 呼叫，Handler 再判斷 command</strong>
    <small>Matcher 只比對工具名稱；是否阻擋由 Handler 根據 command 明確判斷。</small>
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
      <p>讀取 <code>tool_input.command</code>；只有 command 命中明確禁止的 Production migration 時，才回傳 deny。</p>
      <footer>回答：這個 command 應該阻擋嗎？</footer>
    </article>
  </div>
</figure>

此情境使用 `PreToolUse`。若要阻擋，Handler 可以回傳以下精簡結果：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Production migration 必須由 DBA 執行，請改用測試資料庫。"
  }
}
```

安全護欄應該只阻擋**少數、明確、可程式判斷**的行為，並提供安全替代方案。若規則需要大量語意判斷，應交給人工審查，不要把所有未知情況一律 deny。

::: warning Hook 是護欄，不是完整安全邊界
部分 specialized 或 hosted tools 可能採用不同的 Hook 執行路徑。Hooks 不能取代 Sandbox、Permissions、Approval、人工審查或 CI；它只能在特定 lifecycle 時點增加一道自動檢查。
:::

## 延伸閱讀

- [OpenAI 官方：Hooks](https://learn.chatgpt.com/docs/hooks)
- [OpenAI 官方：Advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced#hooks)
- [Codex Guide：Hooks](https://codexguide.ai/advanced/06-hooks.html#%E5%B8%B8%E8%A7%81%E4%BA%8B%E4%BB%B6)
- [Claude Code Hooks 案例整理](https://www.oao.tw/ai-knowledge/claude-code-hooks)（只參考情境；事件、schema 與支援能力不可直接套用到 Codex）
- [上一章：Subagents](/advanced/worktrees)（Hooks 的 lifecycle 也包含 SubagentStart 與 SubagentStop。）
