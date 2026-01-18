# Research: obra/superpowers

> Claude Code 生態系中的 Agentic Skills Framework，曾登上 GitHub Trending #1。

## Overview

**Superpowers** 是一個完整的軟體開發工作流程框架，建立在一組可組合的「技能 (Skills)」之上。

**核心哲學**:
- **TDD (Test-Driven Development)**: 先寫測試，程式碼只為讓測試通過而存在。
- **YAGNI (You Aren't Gonna Need It)**: 不過度設計。
- **Subagent-Driven-Development**: 主代理規劃，子代理執行，每任務後進行兩階段審查。

**工作流程 (The Basic Workflow)**:
1.  `brainstorming` - 透過提問細化設計，輸出設計文件。
2.  `using-git-worktrees` - 建立隔離的 Git Worktree。
3.  `writing-plans` - 將工作拆分成每個 2-5 分鐘可完成的微任務。
4.  `subagent-driven-development` / `executing-plans` - 啟動子代理執行任務。
5.  `test-driven-development` - 強制執行 RED-GREEN-REFACTOR 循環。
6.  `requesting-code-review` - 任務間進行審查。
7.  `finishing-a-development-branch` - 驗證、合併或刪除分支。

---

## Project Structure

```
superpowers/
├── .claude-plugin/         # Claude Code Plugin 定義
│   ├── plugin.json         # 版本、作者、關鍵字
│   └── marketplace.json    # Marketplace 發佈設定
├── agents/                 # 子代理定義 (1 個)
├── commands/               # Slash 指令 (3 個)
│   ├── brainstorm.md
│   ├── write-plan.md
│   └── execute-plan.md
├── docs/                   # 詳細文件
├── hooks/                  # 事件 Hooks
│   ├── hooks.json          # SessionStart 事件綁定
│   └── session-start.sh    # 會話啟動時自動注入上下文
├── lib/                    # 共用函式庫
├── skills/                 # 核心技能庫 (14 個目錄)
└── tests/                  # 測試用例
```

---

## Core Skills / Commands

### Commands (Slash 指令)

| Command | 功能 |
|---------|------|
| `/superpowers:brainstorm` | 啟動設計腦力激盪 |
| `/superpowers:write-plan` | 從設計稿生成實作計畫 |
| `/superpowers:execute-plan` | 批次執行計畫 |

### Key Skills

| Skill | 描述 | 特色 |
|-------|------|------|
| `brainstorming` | 設計細化 | 一次只問一個問題，偏好選擇題 |
| `writing-plans` | 撰寫實作計畫 | 每步驟 2-5 分鐘，含精確檔案路徑與完整程式碼 |
| `subagent-driven-development` | 子代理執行 | **兩階段審查**：先 Spec Compliance，再 Code Quality |
| `test-driven-development` | TDD 執行 | **Iron Law**: 沒有失敗的測試就沒有程式碼。違反？刪除程式碼重來。 |
| `systematic-debugging` | 系統化除錯 | 4 階段根因分析 |
| `using-git-worktrees` | Git Worktree | 每功能獨立分支，乾淨隔離 |

---

## Key Design Patterns

### 1. Two-Stage Code Review (核心創新)
Subagent 完成任務後，不是直接進入下一步，而是：
1.  **Spec Compliance Review**: 檢查程式碼是否「完全」符合 Spec，不多不少。
2.  **Code Quality Review**: 程式碼品質審查。
    - 只有在 Spec Compliance 通過後才進行，避免在「方向錯誤」的程式碼上浪費審查資源。

### 2. Graphviz Decision Diagrams
SKILL.md 內嵌 Graphviz (`dot`) 語法的決策流程圖，清晰呈現複雜流程。

### 3. Anti-Pattern Catalogs & Rationalizations
TDD 技能中列出了完整的「常見藉口與反駁」表格，有效預防 AI 自我說服跳過 TDD。

### 4. Session Start Hook
透過 `hooks.json` + `session-start.sh`，在每次會話開始時自動注入專案上下文。

### 5. Plugin Manifest (`plugin.json`)
結構簡潔，包含：`name`, `version`, `author`, `keywords`，便於 Marketplace 搜尋。

---

## Takeaways for Our Project

| Superpowers 亮點 | 我們可學習/借鏡 |
|------------------|----------------|
| **Two-Stage Review** | 現有 `/refactor` 和 `/fix` 可加入 Spec Compliance 檢查步驟 |
| **Graphviz Diagrams** | 在 SKILL.md 中使用流程圖提升可讀性 |
| **Anti-Pattern Catalogs** | 在指令定義中加入「常見錯誤」預防 |
| **Session Hooks** | 加強 `.gemini/hooks/` 的使用，在會話開始時自動載入專案規則 |
| **Marketplace Model** | 未來可將 `smart_replace` 獨立發佈為可安裝的社群 Extension |
| **Bite-Sized Tasks** | `/plan` 輸出的 `task.md` 應強調每步驟 2-5 分鐘可完成 |

---

## Conclusion

Superpowers 是目前看到最成熟的「開發流程框架」之一。它的價值不在於它能做什麼，而在於它**強制 AI 遵守紀律**。這對我們專案的啟發是：**好的 AI Agent 不只是「能幹」，更要「有原則」**。
