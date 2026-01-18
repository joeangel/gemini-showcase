# Research: ChrisWiles/claude-code-showcase

> The original showcase project for Claude Code configurations, skills, agents, and workflows. This is the primary inspiration for our Gemini project.

## Overview

**claude-code-showcase** is a comprehensive template demonstrating how to configure Claude Code for professional development workflows. It covers:

- **Project Memory (`CLAUDE.md`)**: Persistent context for Claude
- **Hooks**: Auto-formatting, testing, branch protection
- **Skills**: Domain knowledge documents (testing, debugging, UI patterns, GraphQL)
- **Agents**: Specialized assistants (code reviewer)
- **Commands**: Slash commands for common workflows
- **MCP Integration**: JIRA, Linear, GitHub, Slack, databases
- **LSP Integration**: Real-time code intelligence
- **GitHub Actions**: Automated PR review, scheduled maintenance

---

## Project Structure

```
claude-code-showcase/
├── CLAUDE.md               # Project memory
├── .mcp.json               # MCP server configurations
├── .claude/
│   ├── settings.json       # Hooks & environment
│   ├── settings.md         # Human-readable hook docs
│   ├── agents/             # AI agents
│   ├── commands/           # Slash commands (6)
│   │   ├── ticket.md       # End-to-end ticket workflow
│   │   ├── pr-review.md
│   │   ├── pr-summary.md
│   │   ├── code-quality.md
│   │   ├── docs-sync.md
│   │   └── onboard.md
│   ├── hooks/              # Event hooks
│   │   ├── skill-eval.sh   # Wrapper script
│   │   ├── skill-eval.js   # Node.js matching engine
│   │   └── skill-rules.json
│   └── skills/             # Domain knowledge (6)
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

## Core Skills / Commands

### Commands

| Command | Description |
|---------|-------------|
| `/ticket` | **End-to-end ticket workflow**: Read JIRA/Linear, explore code, create branch, implement, update ticket, create PR |
| `/pr-review` | PR review workflow |
| `/pr-summary` | Generate PR description |
| `/code-quality` | Quality checks |
| `/docs-sync` | Documentation alignment |
| `/onboard` | Deep task exploration |

### Skills

| Skill | Description |
|-------|-------------|
| `testing-patterns` | TDD, Jest, factory functions, mocking |
| `systematic-debugging` | 4-phase debugging methodology |
| `react-ui-patterns` | Loading states, error handling, UI state machines |
| `graphql-schema` | Queries, mutations, codegen |
| `core-components` | Design system, tokens |
| `formik-patterns` | Form handling, validation |

---

## Key Design Patterns

### 1. Skill Evaluation System (Core Innovation)
A `UserPromptSubmit` hook that analyzes every prompt and suggests relevant skills:

```
skill-eval.sh → skill-eval.js → skill-rules.json
```

**How it works**:
1. Extracts keywords, file paths, and intent from prompt
2. Matches against skill rules (keyword patterns, path patterns, directory mappings)
3. Calculates confidence scores
4. Suggests skills with reasons

### 2. MCP Integration for Full Workflow Automation
The `/ticket` command demonstrates:
- Read ticket details from JIRA/Linear
- Search codebase for related files
- Create branch, implement, commit
- Update ticket status
- Create PR and link to ticket

### 3. Scheduled Maintenance Workflows
- **Monthly docs sync**: Check commits, update documentation
- **Weekly code quality**: Review random directories, auto-fix issues
- **Biweekly dependency audit**: Safe updates with test verification

### 4. Hook-Based Quality Gates
- Block edits on main branch
- Auto-format code
- Run tests when test files change
- Type-check TypeScript

---

## Takeaways for Our Project

| claude-code-showcase Feature | Our Current Status | Opportunity |
|------------------------------|-------------------|-------------|
| **Skill Evaluation System** | Not implemented | Could build similar system for `.gemini/hooks/` |
| **`/ticket` Command** | Not implemented | Could create for JIRA/Linear integration |
| **MCP Configurations** | Partially done (`.mcp.json`) | Already aligned |
| **Scheduled Workflows** | ✅ Implemented | Already aligned |
| **Skills Structure** | Similar (`.gemini/skills/`) | Already aligned |

---

## Conclusion

This project is **the original template** that inspired our Gemini showcase. Our project has successfully adopted:
- Skills/Agents/Commands structure
- Scheduled GitHub Actions workflows
- MCP server configurations
- Hook patterns

**What we could still add**: The intelligent skill evaluation system that analyzes prompts and suggests relevant skills automatically.
