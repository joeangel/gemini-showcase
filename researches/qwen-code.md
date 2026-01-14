# Research Notes: QwenLM/qwen-code

**Source**: https://github.com/QwenLM/qwen-code
**Date**: 2026-01-14

## Overview
Qwen Code is an open-source AI terminal agent optimized for the [Qwen3-Coder](https://github.com/QwenLM/Qwen3-Coder) model. It is a fork/adaptation of the [Google Gemini CLI](https://github.com/google-gemini/gemini-cli), replacing the Gemini backend with Qwen's infrastructure while retaining the core agentic framework.

**Key Features**:
- **Terminal-First**: Interactive (React-based via Ink) and headless modes.
- **Model Support**: Optimized for Qwen3-Coder; supports OpenAI-compatible APIs.
- **Free Tier**: Offers Qwen OAuth with a free tier (2,000 requests/day).
- **Architecture**: Monorepo structure using TypeScript workspaces.

## Structure
- **Root**: Standard config files.
- **`packages/`**: Monorepo packages.
    - **`cli`**: The user-facing CLI. Uses `ink` for terminal UI rendering. Entry point: `cli/src/gemini.tsx` (retained name from upstream).
    - **`core`**: The agent runtime.
        - `subagents/`: Agent logic. Currently features a `general-purpose` built-in agent.
        - `skills/`: Logic for loading user-defined skills from `.qwen/skills/`.
        - `tools/`: Built-in tools (Shell, FS, MCP, Grep/Glob).
        - `mcp/`: Native support for Model Context Protocol.
        - `qwen/`: **Qwen Integration**. Contains `qwenOAuth2.ts` (Auth) and `qwenContentGenerator.ts` (Model Client).
    - **`sdk-java`** & **`sdk-typescript`**: Language SDKs.
    - **`vscode-ide-companion`**: Integration logic for VS Code.
- **`docs/`**: Extensive documentation.

## Key Components

### Agent System (`packages/core/src/subagents`)
- **Philosophy**: Agents are specialized workers.
- **Built-in Agents**: Currently only `general-purpose`.
- **Logic**: Defined in `BuiltinAgentRegistry`. The system prompt emphasizes "doing what is asked" and "not creating files proactively".

### Skill System (`packages/core/src/skills`)
- **Extensibility**: Users can add "Skills" by dropping Markdown files into `.qwen/skills/`.
- **Format**: `SKILL.md` with YAML frontmatter.
- **Mechanism**: `SkillManager` reads these files and injects them as tools/context for the model. This matches the `antigravity` project's own `SKILL.md` pattern.

### Qwen Integration (`packages/core/src/qwen`)
- **Adaptation**: Replaces Gemini's GLM client with `QwenContentGenerator`.
- **Auth**: Implements a custom OAuth2 flow (`qwenOAuth2.ts`) for `qwen.ai` integration.

## Comparison to Gemini CLI
| Feature | Gemini CLI | Qwen Code |
| :--- | :--- | :--- |
| **Model** | Gemini Pro / Flash | Qwen3-Coder |
| **Auth** | Google Cloud / AI Studio | Qwen OAuth / OpenAI API |
| **Agent** | "Main" Agent | `general-purpose` Agent |
| **Skills** | Yes (Markdown) | Yes (Markdown, compatible structure) |
## Detailed Components

### 1. Agents & Subagents
Located in `packages/core/src/subagents`.
- **`general-purpose`**: The primary built-in agent.
    - **Description**: Designed for searching, code analysis, and multi-step tasks.
    - **Capabilities**: Can use all available tools.
    - **System Prompt**: Enforces "do not create files unless necessary" and "always use absolute paths".
- **Architecture**:
    - `BuiltinAgentRegistry`: Manages hardcoded agents.
    - `SubagentManager`: Handles lifecycle and delegation.

### 2. Skills
Located in `packages/core/src/skills`.
- **Mechanism**: The system loads skills dynamically from `.qwen/skills/` (project-level) or `~/.qwen/skills/` (user-level).
- **Format**: Directories containing a `SKILL.md` file significantly similar to the `antigravity` project's structure.
- **Core Logic**:
    - `SkillManager`: Validates and loads skills.
    - `Skill`: Represents a loaded skill, exposing it as a tool to the model.

### 3. Tools
Located in `packages/core/src/tools`. Extensive set of built-in capabilities:
- **File System**:
    - `read-file` / `read-many-files`: Reading content.
    - `write-file` / `todoWrite`: Writing content.
    - `ls`: Listing directories.
    - `edit` / `smart-edit`: Modifying files (smart-edit likely uses LLM for applying diffs).
- **Search**:
    - `grep` / `ripGrep`: Content search.
    - `glob`: Filename search.
    - `web-search` / `web-fetch`: Internet access.
- **System**:
    - `shell`: Executing shell commands.
- **Context & Memory**:
    - `memoryTool`: Managing long-term memory/context.
    - `task`: Managing task lists (likely for the Plan Mode).
- **Meta-Tools**:
    - `mcp-tool`: Bridge to call external MCP tools.
    - `skill`: Invoking learned skills.

### 4. MCP (Model Context Protocol)
Located in `packages/core/src/mcp`.
- **Client Implementation**: Qwen Code implements an MCP *Client* to connect to external servers.
- **Auth Providers**: Includes specific providers for Google and OAuth.
    - `google-auth-provider.ts`
    - `oauth-provider.ts`
    - `sa-impersonation-provider.ts` (Service Account)
- **Architecture**:
    - `McpClientManager`: Manages connections to multiple MCP servers.
    - `McpTool`: Exposes MCP server capabilities as function calls to the model.

### 5. UI & CLI
Located in `packages/cli` (React + Ink).
- **Components**: Rich terminal UI with `AppContainer`, `SessionContext`, `SettingsContext`.
- **Features**:
    - Vim Mode support.
    - Kitty Keyboard Protocol support (for better key handling).
    - Auto-update mechanism.
