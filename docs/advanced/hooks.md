---
title: Hooks：在 lifecycle 建立確定性閘門
description: 在 Codex 執行工具與結束任務的關鍵時點，加入可審查、可測試的安全與品質檢查。
outline: [2, 3]
---

# Hooks：在 lifecycle 建立確定性閘門

Hook 是 Codex 的 lifecycle 擴充機制。它能在特定事件發生時執行 command，適合處理「不能只靠 Prompt 記得」而且可以由程式確定判斷的政策。

Hooks 是本章最進階的能力：先有清楚的 `AGENTS.md`、Config 與測試，再把少數關鍵規則提升為機械式閘門。

## Codex Hooks 不是 Git Hooks

| 類型 | 綁定事件 | 常見用途 |
| --- | --- | --- |
| Git Hooks | `commit`、`push`、`merge` 等 Git 動作 | commit message、pre-push test |
| Codex Hooks | agent session、tool call、approval、stop 等 lifecycle | secrets 檢查、命令政策、完成驗證 |

Codex Hook 不應取代所有 CI 或產品驗收。它負責在 agent 工作過程中的正確時點提供快速、確定性的檢查。

## 常見事件怎麼選

| Event | 執行時點 | 適合用途 |
| --- | --- | --- |
| `SessionStart` | session 開始或恢復 | 載入必要狀態或顯示環境資訊 |
| `PreToolUse` | tool 執行前 | 阻擋已知危險命令或不允許的工具輸入 |
| `PermissionRequest` | 產生 Approval request 時 | 檢查請求是否符合組織政策 |
| `PostToolUse` | tool 執行後 | 快速檢查輸出、格式或 lint 結果 |
| `Stop` | Codex 準備結束一輪工作時 | 執行完成閘門，失敗時要求繼續修正 |

不要從「攔截所有事件」開始。先找到一個能清楚判斷、誤判成本低的規則。

## Hooks 放在哪裡

常見位置：

- 使用者層：`~/.codex/hooks.json` 或 `~/.codex/config.toml`
- Repository：`.codex/hooks.json` 或 `.codex/config.toml`
- Plugin：由 Plugin manifest 或 bundled `hooks/hooks.json` 提供
- 管理層：由組織政策與 `requirements.toml` 提供

Repository Hooks 只有在專案的 `.codex/` layer 被信任後才會載入。多個來源中符合條件的 Hooks 可能都會執行，不要假設高優先設定會自動取代其他 Hook。

## 從觀察到阻擋

建議按五個階段導入：

1. **觀察**：先記錄事件與輸入，不改變執行結果。
2. **提醒**：用 `PostToolUse` 回報格式、lint 或常見疏漏。
3. **阻擋**：用 `PreToolUse` 只拒絕政策明確禁止的動作。
4. **完成閘門**：用 `Stop` 執行快速驗證，失敗時要求繼續修正。
5. **治理**：記錄 owner、來源、版本、信任狀態與失敗處理。

先觀察實際事件，再縮小 matcher。過度寬廣的 deny 條件會阻擋正常工作，也讓使用者傾向直接停用 Hook。

## Repository Hooks 範例

`.codex/hooks.json`：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^Bash$",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/pre_tool_use_policy.py\"",
            "timeout": 10,
            "statusMessage": "Checking command safety"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/stop_quality_gate.py\"",
            "timeout": 120,
            "statusMessage": "Running completion checks"
          }
        ]
      }
    ]
  }
}
```

透過 Git root 組成 script 路徑，能避免 Codex 從子目錄啟動時找錯相對位置。

## 每個 script 只負責一件事

### `pre_tool_use_policy.py`

- 從 stdin 解析 Hook 傳入的 JSON。
- 只阻擋政策明確列出的危險行為。
- 回傳精簡且可行動的原因。
- 其他情況交回正常 Sandbox 與 Approval 流程。

適合阻擋的例子是已明確禁止的 recursive delete、對非測試資料庫執行 migration，或輸出 `.env`。不要把任何無法辨識的命令一律視為惡意。

### `stop_quality_gate.py`

- 執行速度可接受的 lint 與相關測試。
- 失敗時說明是哪個檢查與下一步。
- 成功時允許 task 正常結束。
- 辨識 Stop Hook 是否已經重入，避免無限迴圈。

大型整合測試與部署驗證仍留在 CI 或明確的交付流程，不要讓每一次 Stop 都執行數十分鐘。

## Review 與信任

非管理型 command Hook 執行前，需要 review 並信任**確切定義**。Codex 會根據目前 Hook 內容記錄 trust；command、matcher 或其他定義改變後，需要重新審查。

在 `/hooks` 檢查：

1. 來源是 user、Repository、Plugin 或 managed policy。
2. Event 與 matcher 會在什麼情況觸發。
3. Command 會執行哪個 script。
4. Script 會讀取與輸出什麼資料。
5. Timeout、失敗與重入行為是否合理。

安裝 Plugin 不會自動代表你已信任它帶入的 Hooks。

## 四條路徑都要測試

1. **安全命令**：確認 `PreToolUse` 不會誤擋。
2. **禁止 fixture**：用不含真實破壞的測試輸入確認 deny。
3. **失敗測試**：保留刻意 failing fixture，確認 `Stop` 不讓 task 誤報完成。
4. **修正後通過**：確認問題修正後能正常結束。

測試 Hook 時不要真的執行破壞性命令。直接把模擬的 Hook JSON 傳給 script，較安全也更容易寫成 regression test。

## 與其他能力的分工

| 需求 | 正確位置 |
| --- | --- |
| 說明每次修改要跑哪些測試 | `AGENTS.md` |
| 限制檔案與網路範圍 | Config／Permissions |
| 阻擋特定危險 tool call | `PreToolUse` Hook |
| 結束前確保快速測試通過 | `Stop` Hook |
| 合併後的完整驗證 | CI／交付流程 |

先用文字規範說清楚，再用 Sandbox 建立邊界，最後才對少數可確定判斷的規則加入 Hook。

## 常見失敗

- Hook 條件過寬，讓正常命令也被阻擋。
- 把 Hook 寫成龐大建置流程，導致每個事件都緩慢或不穩定。
- 失敗只回傳 exit code，沒有可行動原因。
- Script 輸出 secrets、完整 Prompt 或不必要的客戶資料。
- Plugin 更新 Hooks 後沒有重新 review。
- 把 Hook 通過誤認為完整產品驗收已完成。

## 完成檢查

- [ ] 能說明 Codex Hook 與 Git Hook 的差異。
- [ ] Event 與 matcher 只涵蓋必要範圍。
- [ ] 每個 script 有單一責任、timeout 與清楚失敗訊息。
- [ ] Hook 的來源、command、script 與資料流已審查。
- [ ] 安全、禁止、失敗與修正後通過四條路徑都已測試。
- [ ] CI 與完整產品驗收沒有被 Hook 取代。

## 延伸閱讀

- [OpenAI：Hooks](https://learn.chatgpt.com/docs/hooks)
- [上一章：Worktrees](/advanced/worktrees)

