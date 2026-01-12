# Configuration Reference

This guide covers the core configuration files for Gemini Code integration.

## Table of Contents
- [GEMINI.md - Project Memory](#geminimd---project-memory)
- [settings.json - Hooks & Environment](#settingsjson---hooks--environment)
- [MCP Servers - External Integrations](#mcp-servers---external-integrations)
- [LSP Servers - Real-Time Code Intelligence](#lsp-servers---real-time-code-intelligence)
- [Skill Evaluation Hooks](#skill-evaluation-hooks)

---

## GEMINI.md - Project Memory

GEMINI.md is Gemini's persistent memory that loads automatically at session start.

**Locations (in order of precedence):**
1. `GEMINI.local.md` (local project override, gitignored)
2. `.gemini/GEMINI.md` (project, in .gemini folder)
3. `./GEMINI.md` (project root)
4. `~/.gemini/GEMINI.md` (user-level, all projects)

**What to include:**
- Project stack and architecture overview
- Key commands (test, build, lint, deploy)
- Code style guidelines
- Important directories and their purposes
- Critical rules and constraints

**📄 Example:** [GEMINI.md](../GEMINI.md)

---

## settings.json - Hooks & Environment

The main configuration file for hooks, environment variables, and permissions.

**Location:** `.gemini/settings.json`

**📄 Example:** [settings.json](../.gemini/settings.json) | [Human-readable docs](../.gemini/settings.md)

### Hook Events

| Event | When It Fires | Use Case |
|-------|---------------|----------|
| `PreToolUse` | Before tool execution | Block edits on main, validate commands |
| `PostToolUse` | After tool completes | Auto-format, run tests, lint |
| `UserPromptSubmit` | User submits prompt | Add context, suggest skills |
| `Stop` | Agent finishes | Decide if Gemini should continue |

### Hook Response Format

```json
{
  "block": true,           // Block the action (PreToolUse only)
  "message": "Reason",     // Message to show user
  "feedback": "Info",      // Non-blocking feedback
  "suppressOutput": true,  // Hide command output
  "continue": false        // Whether to continue
}
```

### Exit Codes
- `0` - Success
- `2` - Blocking error (PreToolUse only, blocks the tool)
- Other - Non-blocking error

---

## MCP Servers - External Integrations

MCP (Model Context Protocol) servers let Gemini Code connect to external tools like JIRA, GitHub, Slack, databases, and more.

**Location:** `.mcp.json` (project root)

**📄 Example:** [.mcp.json](../.mcp.json)

### Common Configurations

**Issue Tracking:**
```json
{
  "jira": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-jira"],
    "env": {
      "JIRA_HOST": "${JIRA_HOST}",
      "JIRA_EMAIL": "${JIRA_EMAIL}",
      "JIRA_API_TOKEN": "${JIRA_API_TOKEN}"
    }
  }
}
```

**Code & DevOps:**
```json
{
  "github": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-github"],
    "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
  }
}
```

### Environment Variables
Set these in your shell profile or `.env` file (don't commit secrets!):
```bash
export JIRA_HOST="https://yourcompany.atlassian.net"
export JIRA_EMAIL="you@company.com"
export JIRA_API_TOKEN="your-api-token"
```

---

## LSP Servers - Real-Time Code Intelligence

LSP (Language Server Protocol) gives Gemini real-time understand of your code—type information, errors, completions, and navigation.

### Enabling LSP
LSP support is enabled through plugins in `settings.json`:

```json
{
  "enabledPlugins": {
    "typescript-lsp@gemini-plugins-official": true,
    "pyright-lsp@gemini-plugins-official": true
  }
}
```

### Available LSP Plugins

| Plugin | Language | Install Binary First |
|--------|----------|---------------------|
| `typescript-lsp` | TypeScript/JavaScript | `npm install -g typescript-language-server typescript` |
| `pyright-lsp` | Python | `pip install pyright` |
| `rust-lsp` | Rust | `rustup component add rust-analyzer` |

---

## Skill Evaluation Hooks

The **skill evaluation system** runs on every prompt submission and intelligently suggests which skills Gemini should activate.

**📄 Files:** [skill-eval.sh](../.gemini/hooks/skill-eval.sh) | [skill-eval.js](../.gemini/hooks/skill-eval.js) | [skill-rules.json](../.gemini/hooks/skill-rules.json)

### How It Works
1. **Prompt Analysis**: Analyzes prompt for keywords, patterns, file paths, and intent.
2. **Directory Mapping**: Maps file paths to relevant skills.
3. **Confidence Scoring**: Scores skills based on matches.
4. **Skill Suggestion**: Suggests skills exceeding threshold.

### Configuration
Customize [skill-rules.json](../.gemini/hooks/skill-rules.json) with your project's skills and triggers.
