# 研究報告：ChrisWiles/claude-code-showcase

> Claude Code 配置的原始範本專案，包含技能、代理和工作流程。這是我們 Gemini 專案的主要靈感來源。

## 概述

**claude-code-showcase** 是一個全面的範本，展示如何為專業開發工作流程配置 Claude Code。涵蓋：

- **專案記憶 (`CLAUDE.md`)**：Claude 的持久化上下文
- **Hooks**：自動格式化、測試、分支保護
- **技能 (Skills)**：領域知識文件（測試、除錯、UI 模式、GraphQL）
- **代理 (Agents)**：專業助手（程式碼審查員）
- **指令 (Commands)**：常見工作流程的 Slash 指令
- **MCP 整合**：JIRA、Linear、GitHub、Slack、資料庫
- **LSP 整合**：即時程式碼智慧
- **GitHub Actions**：自動化 PR 審查、定期維護

---

## 專案結構

```
claude-code-showcase/
├── CLAUDE.md               # 專案記憶
├── .mcp.json               # MCP 伺服器配置
├── .claude/
│   ├── settings.json       # Hooks 與環境
│   ├── settings.md         # 人類可讀的 Hook 文件
│   ├── agents/             # AI 代理
│   ├── commands/           # Slash 指令 (6 個)
│   │   ├── ticket.md       # 端到端票務工作流程
│   │   ├── pr-review.md
│   │   ├── pr-summary.md
│   │   ├── code-quality.md
│   │   ├── docs-sync.md
│   │   └── onboard.md
│   ├── hooks/              # 事件 Hooks
│   │   ├── skill-eval.sh   # 包裝腳本
│   │   ├── skill-eval.js   # Node.js 匹配引擎
│   │   └── skill-rules.json
│   └── skills/             # 領域知識 (6 個)
│       ├── testing-patterns/
│       ├── systematic-debugging/
│       ├── react-ui-patterns/
│       ├── graphql-schema/
│       ├── core-components/
│       └── formik-patterns/
└── .github/workflows/      # GitHub Actions
    ├── pr-claude-code-review.yml
    ├── scheduled-claude-code-docs-sync.yml
    ├── scheduled-claude-code-quality.yml
    └── scheduled-claude-code-dependency-audit.yml
```

---

## 核心技能 / 指令

### 指令

| 指令 | 說明 |
|------|------|
| `/ticket` | **端到端票務工作流程**：讀取 JIRA/Linear、探索程式碼、建立分支、實作、更新票務、建立 PR |
| `/pr-review` | PR 審查工作流程 |
| `/pr-summary` | 生成 PR 描述 |
| `/code-quality` | 品質檢查 |
| `/docs-sync` | 文件對齊 |
| `/onboard` | 深度任務探索 |

### 技能

| 技能 | 說明 |
|------|------|
| `testing-patterns` | TDD、Jest、工廠函數、Mocking |
| `systematic-debugging` | 四階段除錯方法論 |
| `react-ui-patterns` | 載入狀態、錯誤處理、UI 狀態機 |
| `graphql-schema` | 查詢、變更、Codegen |
| `core-components` | 設計系統、Tokens |
| `formik-patterns` | 表單處理、驗證 |

---

## 關鍵設計模式

### 1. 技能評估系統 (核心創新)
`UserPromptSubmit` Hook 分析每個 Prompt 並建議相關技能：

```
skill-eval.sh → skill-eval.js → skill-rules.json
```

**運作方式**：
1. 從 Prompt 中提取關鍵字、檔案路徑和意圖
2. 與技能規則匹配（關鍵字模式、路徑模式、目錄映射）
3. 計算信心分數
4. 附帶理由建議技能

### 2. MCP 整合實現完整工作流程自動化
`/ticket` 指令展示：
- 從 JIRA/Linear 讀取票務詳情
- 搜尋程式碼庫中的相關檔案
- 建立分支、實作、提交
- 更新票務狀態
- 建立 PR 並連結到票務

### 3. 定期維護工作流程
- **每月文件同步**：檢查提交，更新文件
- **每週程式碼品質**：審查隨機目錄，自動修復問題
- **每兩週依賴審計**：帶測試驗證的安全更新

### 4. 基於 Hook 的品質關卡
- 阻止在 main 分支上編輯
- 自動格式化程式碼
- 測試檔案變更時執行測試
- TypeScript 類型檢查

---

## 對我們專案的啟發

| claude-code-showcase 功能 | 我們的現狀 | 機會 |
|---------------------------|-----------|------|
| **技能評估系統** | 尚未實作 | 可為 `.gemini/hooks/` 建立類似系統 |
| **`/ticket` 指令** | 尚未實作 | 可建立用於 JIRA/Linear 整合 |
| **MCP 配置** | 部分完成 (`.mcp.json`) | 已對齊 |
| **定期工作流程** | ✅ 已實作 | 已對齊 |
| **技能結構** | 類似 (`.gemini/skills/`) | 已對齊 |

---

## 結論

此專案是**啟發我們 Gemini 展示專案的原始範本**。我們的專案已成功採用：
- Skills/Agents/Commands 結構
- 定期 GitHub Actions 工作流程
- MCP 伺服器配置
- Hook 模式

**我們仍可新增的功能**：分析 Prompt 並自動建議相關技能的智慧技能評估系統。
