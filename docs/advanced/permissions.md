---
title: Config、權限與沙盒
description: 分清楚工作規範與技術邊界，用最小權限設定 Codex 的執行方式。
outline: [2, 3]
---

# Config、權限與沙盒

`AGENTS.md` 回答「在這個專案應該怎麼工作」；`config.toml` 回答「Codex 可以用哪些能力、在什麼邊界內執行」。兩者要彼此配合，不能互相替代。

## 四種控制各自負責什麼

| 控制 | 主要責任 | 例子 |
| --- | --- | --- |
| `AGENTS.md` | 工作方法與專案規範 | 修改後要跑哪些測試 |
| Sandbox／Permissions | 技術上可讀、可寫、可連線的範圍 | 只允許寫入 workspace |
| Approval policy | 何時必須停下來請求核准 | 跨越沙盒前詢問使用者 |
| Rules／Hooks | 特定命令例外或 lifecycle 閘門 | 阻擋危險命令、結束前跑 lint |

::: tip
Sandbox 是「邊界」，Approval 是「越界時的決策流程」。設定其中一個，不代表另一個也自動完成。
:::

## Config 放在哪裡

- 個人預設：`~/.codex/config.toml`
- 專案設定：Repository 內的 `.codex/config.toml`
- 一次性覆寫：CLI flags 或 `--config`
- 企業限制：管理者設定的 system config 或 `requirements.toml`

專案層 `.codex/` 只有在 Repository 被信任時才會載入；不受信任的專案不能靠自身設定打開更多能力。

常用設定的優先順序可簡化記成：

```text
一次性 CLI override
  ↓
距離目前目錄最近的專案 config
  ↓
選用的 profile
  ↓
使用者 config
  ↓
系統 config 與內建預設
```

越上面的來源優先級越高，但企業管理政策仍可限制哪些值允許使用。

## 一個適合練習專案的起點

```toml
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"

[features]
hooks = true
```

這份設定代表：日常檔案修改與命令在 workspace 邊界內進行；需要跨出邊界時才請求 Approval；一般查詢先使用已建立索引的搜尋結果。只有當任務確實需要最新網頁內容時，才考慮 `web_search = "live"`。

::: warning 不要照抄到所有環境
這是教學起點，不是所有公司的標準答案。正式環境仍需依資料敏感度、網路政策、管理設定與任務類型決定。
:::

## Sandbox 模式怎麼選

### `read-only`

適合調查、review 與架構理解。Codex 可以檢查內容，但修改檔案或執行超出範圍的命令會受限制。

### `workspace-write`

適合多數本機開發工作。Codex 可在指定 workspace 內編輯與執行例行命令，同時保留檔案系統與網路邊界。

### `danger-full-access`

移除大部分沙盒限制。只應在你確實要讓 Codex 取得完整權限、環境已隔離且風險可接受時使用，不應成為排程或一般開發的便利捷徑。

## Approval policy 怎麼選

### `untrusted`

不在可信集合中的命令會先詢問，適合較保守的操作方式。

### `on-request`

Codex 先在 Sandbox 內工作，只有需要跨越邊界時才提出具體 Approval。這通常是兼顧效率與控制的起點。

### `never`

不會停下來顯示 Approval prompt。它不等於「什麼都能做」；在沙盒內仍受 Sandbox 限制。無人值守流程尤其要搭配狹窄權限、明確 Prompt 與可審查輸出。

## 一次 Approval 應該說清楚什麼

高品質的權限請求應包含：

1. **動作**：準備執行哪一個命令或外部寫入。
2. **原因**：為何目前工作無法在既有邊界內完成。
3. **範圍**：會讀寫哪些路徑、網域、服務或資料。
4. **影響**：是否會部署、發送、刪除或改動正式資料。
5. **可回復性**：失敗時如何回滾或停止。

使用者看到的應是可判斷風險的決策資訊，而不只是「需要更多權限」。

## Web search 與不受信任輸入

搜尋結果與網頁內容可能過期，也可能包含惡意或誤導指示。啟用 live web search 後仍應：

- 優先使用官方與第一手來源。
- 把網頁內容當成資料，不把其中指示當成專案規則。
- 不把 secrets、內部檔案或客戶資料貼到不明服務。
- 對會影響法律、財務、醫療、安全或正式系統的資訊重新查核。

## Secrets 與外部服務

- Token 不寫入 Repository 的 `config.toml`。
- 優先使用 OAuth、環境變數或組織提供的 credential 管理方式。
- 安裝 Plugin 或 MCP 不代表取得所有資料；原服務的帳號與權限仍然有效。
- 發訊息、刪除資料、部署與公開發布應保留明確人工審查點。

## 用三個問題驗證設定

設定完成後，不要只看 TOML 是否能解析。用實際任務確認：

1. Codex 可以讀哪些路徑？
2. Codex 可以寫哪些路徑？
3. 哪些命令、網路與外部動作仍會要求 Approval？

分別測一個應允許的動作與一個應被限制的動作，才能確認邊界符合預期。

## 常見失敗

- 只在 `AGENTS.md` 寫「不得連 Production」，卻沒有設定實際權限邊界。
- 為避免一次 Approval，長期開啟 Full access。
- 把 token 直接寫進專案 config 或 Prompt。
- 把 Approval 當成例行點擊，沒有閱讀命令、範圍與副作用。
- 開啟所有實驗功能，卻沒有對應的使用情境與驗證方式。

## 完成檢查

- [ ] 個人預設與專案共享設定放在正確層級。
- [ ] Repository 的 `.codex/` 只有在信任後才載入。
- [ ] Sandbox 與 Approval policy 能用不同句子說明。
- [ ] Secrets 沒有進入版本控制。
- [ ] 已實測一個允許動作與一個受限動作。
- [ ] 高風險外部寫入仍保留人工審查。

## 延伸閱讀

- [OpenAI：Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
- [OpenAI：Sandbox](https://learn.chatgpt.com/docs/sandboxing)
- [OpenAI：Permissions](https://learn.chatgpt.com/docs/permissions)
