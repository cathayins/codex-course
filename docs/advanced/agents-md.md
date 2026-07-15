---
title: AGENTS.md：Repository 的長期規範
description: 把真實命令、變更邊界與完成定義寫成 Codex 每次都能遵循的專案指示。
outline: [2, 3]
---

# `AGENTS.md`：Repository 的長期規範

`AGENTS.md` 保存的是「Codex 在這個 Repository 應長期遵守什麼」。它適合記錄無法只從程式碼推斷，卻會影響每一次修改的命令、邊界與交付標準。

## 先分清楚：Prompt 還是 `AGENTS.md`

| 內容 | 建議位置 | 範例 |
| --- | --- | --- |
| 只影響這次任務 | Prompt | 這次不要新增 dependency |
| 每次都要遵守的 Repository 規則 | 根目錄 `AGENTS.md` | 修改後執行 `npm test` |
| 只適用某個子目錄 | 子目錄 `AGENTS.md` 或 `AGENTS.override.md` | migration 必須附 rollback 說明 |
| 個人跨專案偏好 | `~/.codex/AGENTS.md` | 回報時列出驗證結果 |
| 檔案、網路與審批限制 | Config／Permissions | `sandbox_mode = "workspace-write"` |

::: warning
把「禁止連 Production」寫進 `AGENTS.md` 很重要，但文字規範不能取代 Sandbox、Approval 或企業管理政策。高風險邊界需要同時用技術控制落實。
:::

## Codex 如何載入指示

Codex 在開始工作時建立 instruction chain：

1. 先讀 Codex home 中的全域指示；同一層若有 `AGENTS.override.md`，會優先於 `AGENTS.md`。
2. 再從專案根目錄往目前工作目錄逐層尋找指示檔。
3. 越接近目前工作目錄的內容越晚加入，因此能覆蓋較上層的規則。
4. 每一層最多載入一份指示檔；空白檔案會被略過。

例如從 `services/payments/` 開始任務時，可能形成：

```text
~/.codex/AGENTS.md
└── repository/AGENTS.md
    └── services/payments/AGENTS.override.md
```

這種分層讓根目錄保留全專案規則，特殊模組只增加必要的局部限制。

## 一份好規範的四個區塊

### 1. Repository purpose

用兩三句話說明專案提供什麼、服務誰，以及重要的架構定位。這能避免 Codex 只看局部檔案就誤判用途。

### 2. Setup and validation

寫入**確實存在且可執行**的命令，並說明各自適用時機：

```markdown
## Setup and validation

- Install: `uv sync`
- Unit tests: `uv run pytest tests/unit -q`
- Integration tests: `uv run pytest tests/integration -q`
- Lint: `uv run ruff check .`
- Type check: `uv run mypy app`
```

不要只寫「請執行測試」。如果完整測試耗時很長，應同時列出局部測試與完整驗證的使用條件。

### 3. Change boundaries

把不應跨越的產品、資料與安全邊界寫清楚：

```markdown
## Change boundaries

- Do not access Production services or customer data.
- Do not change the public API or database schema without an approved plan.
- Never print `.env`, tokens, credentials, or raw customer content.
- Prefer deterministic test doubles over a live LLM in tests.
```

好的邊界會說明「禁止什麼」以及「改用什麼」。只有禁止，卻沒有替代路徑，往往讓任務卡住。

### 4. Definition of done

完成定義要能被檢查：

```markdown
## Definition of done

- Report changed files and behavior changes.
- Run relevant tests and state their results.
- State API, schema, migration, security, and rollback impact.
```

## 可直接改寫的起始範本

```markdown
# Repository purpose

[用 2–3 句說明專案目的、主要使用者與架構。]

## Setup and validation

- Install: `[真實指令]`
- Fast check: `[局部 lint 或 test]`
- Full check: `[完整驗證指令]`
- Build: `[建置指令]`

## Change boundaries

- Do not modify: `[public API／schema／generated files 等範圍]`
- Never access or print: `[Production／secrets／個資]`
- Ask before: `[新增正式依賴／migration／外部寫入]`

## Definition of done

- Explain behavior changes and important trade-offs.
- Run relevant validation and report the exact result.
- List remaining risks, skipped checks, and rollback impact.
```

::: tip 從 `/init` 開始，仍要人工校正
可先用 `/init` 產生初稿，但一定要核對命令是否存在、目錄責任是否正確，以及限制是否真能代表團隊共識。
:::

## 驗證 discovery

不要假設檔案放好就會生效。分別從 Repository root 與特殊子目錄詢問：

```bash
codex --ask-for-approval never \
  "Summarize the active project instructions and list their source files."

codex --cd services/payments --ask-for-approval never \
  "Show which instruction files are active."
```

檢查結果是否包含正確來源、順序與局部規則。若剛修改指示但內容未更新，開啟新的 session 再驗證。

## 常見失敗

### 規則太抽象

「Follow best practices」「注意品質」無法驗收。改成真實命令、禁止範圍與輸出格式。

### 內容太長

不要把整份架構文件、API reference 或教學文章塞進 `AGENTS.md`。它是高頻載入的工作規範；細節應放在一般文件或 Skill references。

### 一次性要求變成永久規則

如果需求只屬於某張 ticket 或某次 PR，留在本次 Prompt。長期規範越少、越具體，越容易維護。

### 子目錄規則沒有驗證

只有從目標子目錄啟動任務，才能確認 discovery chain 是否符合預期。

## 完成檢查

- [ ] 每一個命令都能在目前 Repository 執行。
- [ ] 規則涵蓋資料、外部操作、API／schema 與 secrets 邊界。
- [ ] Definition of Done 能以輸出或命令結果驗證。
- [ ] 已從 root 與至少一個特殊子目錄確認載入來源。
- [ ] 一次性需求沒有被寫成永久規則。

## 延伸閱讀

- [OpenAI：Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [OpenAI：Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
