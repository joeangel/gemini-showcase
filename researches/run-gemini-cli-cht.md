# 研究報告：google-github-actions/run-gemini-cli

> 由 Google 開發的官方 GitHub Action，用於在工作流程中執行 Gemini CLI。

## 概述

**run-gemini-cli** 是將 Gemini CLI 整合到開發工作流程的官方 GitHub Action。可實現：

- **自動化 PR 審查和 Issue 分類**
- **透過 `@gemini-cli` 提及進行隨需協作**
- **透過工具和擴充套件進行擴展**
- **透過 `GEMINI.md` 進行自訂**

這是驅動我們所有 Gemini 工作流程的核心 Action。

---

## 專案結構

```
run-gemini-cli/
├── action.yml              # 主要 Action 定義 (497 行)
├── GEMINI.md               # 範例專案記憶
├── docs/                   # 文件
│   ├── authentication.md
│   ├── observability.md
│   ├── extensions.md
│   └── best-practices.md
├── examples/
│   └── workflows/          # 預建工作流程範本
│       ├── gemini-assistant/
│       ├── gemini-dispatch/
│       ├── issue-triage/
│       └── pr-review/
└── scripts/                # 輔助腳本
```

---

## 主要功能

### Action 輸入參數

| 輸入 | 說明 |
|------|------|
| `gemini_api_key` | Gemini API 的 API 金鑰 |
| `prompt` | 傳遞給 CLI `--prompt` 參數的字串 |
| `settings` | `.gemini/settings.json` 的 JSON 字串 |
| `extensions` | 要安裝的擴充套件清單 |
| `gemini_cli_version` | 版本：`latest`、`preview`、`nightly` 或特定版本 |
| `use_vertex_ai` | 使用 Vertex AI 而非 API 金鑰 |
| `gcp_workload_identity_provider` | 用於安全 GCP 認證的 WIF |

### 預建工作流程

| 工作流程 | 用途 |
|----------|------|
| `gemini-dispatch` | 中央調度器，將請求路由到適當的工作流程 |
| `issue-triage` | 自動 Issue 標籤和分類 |
| `pr-review` | 自動 PR 程式碼審查 |
| `gemini-assistant` | 通用對話式 AI |

### 擴充套件系統

擴充套件從 GitHub 套件庫安裝：

```yaml
extensions: |
  [
    "https://github.com/gemini-cli-extensions/security",
    "https://github.com/gemini-cli-extensions/code-review"
  ]
```

---

## 配置選項

### 認證方式

1. **Gemini API 金鑰**：最簡單，使用 `GEMINI_API_KEY` 秘密
2. **Workload Identity Federation (WIF)**：GCP 最安全的方式
3. **Vertex AI**：企業級，需要 GCP 專案
4. **Gemini Code Assist**：替代企業存取方式

### Settings JSON

傳遞內嵌設定來配置 CLI：

```yaml
settings: |-
  {
    "model": {
      "maxSessionTurns": 50
    },
    "mcpServers": {
      "github": { ... }
    }
  }
```

---

## 對我們專案的啟發

| run-gemini-cli 功能 | 我們的現狀 |
|---------------------|-----------|
| **Dispatch 模式** | ✅ 已實作 (`gemini-dispatch.yml`) |
| **預建工作流程** | ✅ 已實作 (review, triage, fix, refactor, plan) |
| **擴充套件支援** | ✅ 已實作 (`smart_replace` 本地擴充套件) |
| **WIF 認證** | ⚠️ 未使用（使用 API 金鑰） |
| **Vertex AI** | ⚠️ 未使用（可為企業新增） |
| **可觀測性** | ❌ 未實作（可新增 OTEL 追蹤） |

---

## 結論

這是我們專案的**官方基礎**。我們在所有工作流程中正確使用了此 Action。主要學習：
- `extensions` 輸入同時支援基於 URL 和本地的擴充套件
- `settings` 輸入允許內嵌配置而無需設定檔
- Dispatch 模式是處理多種工作流程類型的推薦方式

**潛在改進**：考慮在企業環境中新增 WIF 認證以提高安全性，以及 OTEL 可觀測性用於監控。
