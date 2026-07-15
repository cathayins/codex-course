---
title: MCP 與外部工具
description: 連接即時資料與外部動作，並用工具白名單、Authentication 與 Approval 控制風險。
outline: [2, 3]
---

# MCP 與外部工具

Model Context Protocol（MCP）讓 Codex 取得外部 context 與工具。它可以連接文件服務、瀏覽器、設計工具或開發平台，解決「本機 Repository 沒有這份即時資料或操作介面」的問題。

## 先分清楚責任

- **Skill**：告訴 Codex「如何完成這類工作」。
- **MCP server**：提供「可以讀取的即時 context 或可執行的 tools」。
- **Plugin**：可以把 Skills、Apps、MCP 與 Hooks 包成可安裝的能力。

例如，「查核目前套件文件並列出版本假設」是一套 Skill 工作法；真正搜尋文件的能力，則可由文件型 MCP 提供。

## 何時值得連接 MCP

適合：

- 需要目前版本的官方文件或內部知識庫。
- 需要讀取 Figma、GitHub、Sentry 等專用系統。
- 需要結構化 tool call，而不是模擬點擊網頁。
- 需要讓工具輸入、輸出與 Authentication 可追蹤。

不需要：

- 資料已在目前 workspace，使用檔案與搜尋即可完成。
- 只是一次性工作規則，寫在 Prompt 更直接。
- 外部服務沒有獲得使用者授權或資料範圍不明。

## 兩種常見連線方式

### STDIO server

由本機命令啟動，適合本機工具或以 subprocess 執行的 MCP server。常見設定包含 `command`、`args`、允許轉交的環境變數與工作目錄。

### Streamable HTTP server

透過 URL 連線，可能使用 OAuth 或由環境變數提供 bearer token。不要把 token 直接寫進 Repository。

Codex App、CLI 與 IDE extension 在同一個 Codex host 上可共用 MCP 設定。

## 從 App 連線

1. 開啟 **Settings → MCP servers**。
2. 選擇 **Add server**。
3. 設定名稱，選擇 STDIO 或 Streamable HTTP，填入 command 或 URL。
4. 儲存後重新啟動。
5. 需要 OAuth 時執行 Authentication。
6. 在輸入區使用 `/mcp`，確認 server 與 tools 可見。

## 用 `config.toml` 做細部控制

MCP 可設定在使用者的 `~/.codex/config.toml`，或可信任 Repository 的 `.codex/config.toml`。

以下以文件型 STDIO server 示範結構：

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
default_tools_approval_mode = "prompt"
startup_timeout_sec = 20
tool_timeout_sec = 45
enabled = true
```

這是第三方工具示例，實際使用前仍要審查套件來源、版本、資料流向與執行權限。

### 只開啟需要的 tools

一個 server 能連線，不代表所有 tools 都應啟用。優先設定白名單：

```toml
[mcp_servers.docs]
url = "https://docs.example.com/mcp"
enabled_tools = ["search", "read"]
default_tools_approval_mode = "prompt"
enabled = true

[mcp_servers.docs.tools.search]
approval_mode = "approve"
```

上例只開啟 `search` 與 `read`，再針對單一 tool 設定 Approval。`url` 是結構示意，請替換成已審查的真實服務。

## Authentication 與 secrets

- OAuth server 可透過 App 的 Authenticate 流程，或使用 `codex mcp login <server-name>`。
- Bearer token 使用 `bearer_token_env_var` 指向環境變數名稱。
- 只轉交 server 真正需要的環境變數。
- 不在 Prompt、Repository 或日誌輸出 token。
- 連線成功後仍要確認實際帳號、資料範圍與 write 權限。

## 一個可靠的查核 Prompt

```text
請只使用目前已連線文件服務的 read／search 類工具，
查核目前套件中 structured output 與 human-in-the-loop 的官方用法。

輸出：
1. 目前確認的 API 與來源
2. 版本或日期假設
3. 可直接採用的最小範例
4. 仍無法確認的事項

不要修改檔案，不要使用 write 類工具，
也不要用模型記憶補齊查不到的 API。
```

這個 Prompt 同時限制工具類型、證據格式與未知事項，能降低「工具已連上，結論卻無法追溯」的風險。

## 外部工具的選擇順序

1. 優先使用針對該服務設計的 App connector、MCP 或 API。
2. 只有缺少專用介面時，才考慮瀏覽器操作。
3. 本機已有的資料直接使用檔案與命令，不必繞到外部服務。
4. 任何 write、send、delete、deploy、publish 都要比 read／search 更嚴格地控制。

## 常見失敗

### 連線後開啟所有 tools

先完成單一 read-only 情境，再逐步加入必要工具。工具數量越多，誤選與權限過寬的機會越高。

### 把 MCP 當成工作流程

MCP 只提供 context 與工具，不會自動定義品質標準。重複的查核或交付流程仍應寫成 Skill。

### 將 token 寫進 config

Repository config 適合分享 server 設定，不適合保存 secrets。使用 OAuth 或環境變數。

### 沒有保留來源與未知事項

工具回傳結果仍可能不完整或過期。要求 Codex列出來源、版本假設與不能確認的部分。

## 完成檢查

- [ ] 已確認 MCP 是必要連線，不是可由本機檔案完成的工作。
- [ ] Server 來源、transport、Authentication 與資料流向已審查。
- [ ] 只啟用本次需要的 tools。
- [ ] read 與 write tools 使用不同的 Approval 策略。
- [ ] Token 沒有進入 Repository、Prompt 或輸出。
- [ ] 結果保留來源、版本假設與未知事項。

## 延伸閱讀

- [OpenAI：Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
- [OpenAI：Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
