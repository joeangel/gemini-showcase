# 研究筆記：QwenLM/qwen-code

**來源**: https://github.com/QwenLM/qwen-code
**日期**: 2026-01-14

## 概述
Qwen Code 是一個開源 AI 終端代理，專為 [Qwen3-Coder](https://github.com/QwenLM/Qwen3-Coder) 模型優化。它是 [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) 的 fork/改編版本，將 Gemini 後端替換為 Qwen 的基礎設施，同時保留核心代理框架。

**主要特點**：
- **終端優先**：互動式（透過 Ink 的 React）和無頭模式。
- **模型支援**：為 Qwen3-Coder 優化；支援 OpenAI 相容 API。
- **免費方案**：提供 Qwen OAuth 免費方案（每日 2,000 請求）。
- **架構**：使用 TypeScript 工作區的 Monorepo 結構。

## 結構
- **根目錄**：標準配置檔案。
- **`packages/`**：Monorepo 套件。
    - **`cli`**：使用者介面 CLI。使用 `ink` 進行終端 UI 渲染。入口點：`cli/src/gemini.tsx`（保留上游名稱）。
    - **`core`**：代理執行時。
        - `subagents/`：代理邏輯。目前有一個 `general-purpose` 內建代理。
        - `skills/`：從 `.qwen/skills/` 載入使用者定義技能的邏輯。
        - `tools/`：內建工具（Shell、FS、MCP、Grep/Glob）。
        - `mcp/`：原生支援 Model Context Protocol。
        - `qwen/`：**Qwen 整合**。包含 `qwenOAuth2.ts`（認證）和 `qwenContentGenerator.ts`（模型客戶端）。
    - **`sdk-java`** 和 **`sdk-typescript`**：語言 SDK。
    - **`vscode-ide-companion`**：VS Code 整合邏輯。
- **`docs/`**：詳細文件。

## 關鍵元件

### 代理系統 (`packages/core/src/subagents`)
- **理念**：代理是專業工作者。
- **內建代理**：目前只有 `general-purpose`。
- **邏輯**：定義在 `BuiltinAgentRegistry`。系統提示強調「做被要求的事」和「不主動建立檔案」。

### 技能系統 (`packages/core/src/skills`)
- **可擴展性**：使用者可透過將 Markdown 檔案放入 `.qwen/skills/` 來新增「技能」。
- **格式**：帶有 YAML 前置資料的 `SKILL.md`。
- **機制**：`SkillManager` 讀取這些檔案並將它們作為工具/上下文注入模型。這與 `antigravity` 專案自己的 `SKILL.md` 模式一致。

### Qwen 整合 (`packages/core/src/qwen`)
- **改編**：用 `QwenContentGenerator` 取代 Gemini 的 GLM 客戶端。
- **認證**：實作自訂 OAuth2 流程（`qwenOAuth2.ts`）用於 `qwen.ai` 整合。

## 與 Gemini CLI 比較
| 功能 | Gemini CLI | Qwen Code |
| :--- | :--- | :--- |
| **模型** | Gemini Pro / Flash | Qwen3-Coder |
| **認證** | Google Cloud / AI Studio | Qwen OAuth / OpenAI API |
| **代理** | 「Main」代理 | `general-purpose` 代理 |
| **技能** | 是（Markdown） | 是（Markdown，相容結構） |

## 詳細元件

### 1. 代理與子代理
位於 `packages/core/src/subagents`。
- **`general-purpose`**：主要內建代理。
    - **描述**：設計用於搜尋、程式碼分析和多步驟任務。
    - **能力**：可使用所有可用工具。
    - **系統提示**：強制「除非必要否則不建立檔案」和「始終使用絕對路徑」。
- **架構**：
    - `BuiltinAgentRegistry`：管理硬編碼代理。
    - `SubagentManager`：處理生命週期和委派。

### 2. 技能
位於 `packages/core/src/skills`。
- **機制**：系統從 `.qwen/skills/`（專案層級）或 `~/.qwen/skills/`（使用者層級）動態載入技能。
- **格式**：包含 `SKILL.md` 檔案的目錄，與 `antigravity` 專案的結構非常相似。
- **核心邏輯**：
    - `SkillManager`：驗證和載入技能。
    - `Skill`：代表已載入的技能，將其作為工具暴露給模型。

### 3. 工具
位於 `packages/core/src/tools`。廣泛的內建能力集：
- **檔案系統**：
    - `read-file` / `read-many-files`：讀取內容。
    - `write-file` / `todoWrite`：寫入內容。
    - `ls`：列出目錄。
    - `edit` / `smart-edit`：修改檔案（smart-edit 可能使用 LLM 來應用差異）。
- **搜尋**：
    - `grep` / `ripGrep`：內容搜尋。
    - `glob`：檔名搜尋。
    - `web-search` / `web-fetch`：網際網路存取。
- **系統**：
    - `shell`：執行 shell 命令。
- **上下文與記憶**：
    - `memoryTool`：管理長期記憶/上下文。
    - `task`：管理任務清單（可能用於計畫模式）。
- **元工具**：
    - `mcp-tool`：呼叫外部 MCP 工具的橋接。
    - `skill`：呼叫已學習的技能。

### 4. MCP（Model Context Protocol）
位於 `packages/core/src/mcp`。
- **客戶端實作**：Qwen Code 實作 MCP *客戶端*以連接外部伺服器。
- **認證提供者**：包含 Google 和 OAuth 的特定提供者。
    - `google-auth-provider.ts`
    - `oauth-provider.ts`
    - `sa-impersonation-provider.ts`（服務帳號）
- **架構**：
    - `McpClientManager`：管理與多個 MCP 伺服器的連接。
    - `McpTool`：將 MCP 伺服器能力作為函數呼叫暴露給模型。

### 5. UI 與 CLI
位於 `packages/cli`（React + Ink）。
- **元件**：豐富的終端 UI，包含 `AppContainer`、`SessionContext`、`SettingsContext`。
- **功能**：
    - Vim 模式支援。
    - Kitty 鍵盤協定支援（更好的按鍵處理）。
    - 自動更新機制。
