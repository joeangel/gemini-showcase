# Research: joeangel/gemini-showcase

> A comprehensive showcase of Gemini CLI configurations, workflows, and extensions for GitHub Actions automation.

## Overview

**gemini-showcase** is a project template demonstrating how to configure Gemini CLI for professional development workflows. It provides automated PR review, issue triage, code fixing, refactoring, and task planning—all triggered via GitHub comments or scheduled jobs.

**Origin**: Derived from [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase), adapted for the Gemini ecosystem.

**Key Differentiator**: Implements a custom **Smart Diff** extension (`smart_replace`) for more reliable AI-driven code edits.

---

## Project Structure

```
gemini-showcase/
├── GEMINI.md               # Project memory for Gemini CLI
├── .mcp.json               # MCP server configurations (JIRA, GitHub, Google Cloud)
├── .gemini/
│   ├── settings.json       # Hooks & environment
│   ├── settings.md         # Human-readable documentation
│   ├── agents/             # AI agents (2)
│   │   ├── code-reviewer.md
│   │   └── github-workflow.md
│   ├── commands/           # Slash commands (9)
│   ├── extensions/         # Local tool extensions
│   │   └── smart_replace/  # Fuzzy code replacement tool
│   ├── hooks/              # Event hooks (4)
│   └── skills/             # Domain knowledge (6)
├── docs/                   # Detailed documentation
│   ├── configuration.md
│   ├── workflows.md
│   ├── skills-and-agents.md
│   ├── extensions.md
│   └── cost-and-usage.md
├── researches/             # Analysis of related projects
└── .github/workflows/      # GitHub Actions (10)
```

---

## Core Features ("The Magic")

| Command | Description |
|---------|-------------|
| `/fix` | **Auto-Repair**: Analyzes issue, writes code, opens PR |
| `/review` | **Auto-Review**: Reviews PR against code-reviewer agent checklist |
| `/triage` | **Auto-Triage**: Analyzes issue and applies labels |
| `/refactor` | **Smart Refactor**: Uses Smart Diff for safe code restructuring |
| `/plan` | **Auto-Plan**: Breaks down requests into `task.md` checklists |
| `@gemini` | **Chat**: General-purpose AI assistance in comments |

---

## Commands (9 total)

| Command | File | Purpose |
|---------|------|---------|
| `/code-quality` | `code-quality.md` | Quality checks |
| `/docs-sync` | `docs-sync.md` | Documentation alignment |
| `/onboard` | `onboard.md` | Deep task exploration |
| `/plan` | `plan.md` | Task breakdown and planning |
| `/pr-create` | `pr-create.md` | Automated PR creation |
| `/pr-review` | `pr-review.md` | PR review workflow |
| `/pr-summary` | `pr-summary.md` | Generate PR description |
| `/refactor` | `refactor.md` | Proactive code refactoring |
| `/ticket` | `ticket.md` | End-to-end ticket workflow |

---

## Workflows (10 total)

### On-Demand (7)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `gemini-dispatch.yml` | Various | Central router for all commands |
| `gemini-fix.yml` | `/fix` | Write code and open PR |
| `gemini-review.yml` | `/review`, PR open | Code review |
| `gemini-triage.yml` | `/triage`, Issue open | Issue labeling |
| `gemini-refactor.yml` | `/refactor` | Code refactoring with Smart Diff |
| `gemini-plan.yml` | `/plan` | Task breakdown |
| `gemini-invoke.yml` | `@gemini` | General chat |

### Scheduled (3)

| Workflow | Schedule | Purpose |
|----------|----------|---------|
| `scheduled-gemini-code-quality.yml` | Weekly | Random directory code review |
| `scheduled-gemini-code-docs-sync.yml` | Monthly | Documentation alignment |
| `scheduled-gemini-code-dependency-audit.yml` | Biweekly | Dependency updates |

---

## Extensions

### Smart Replace (`smart_replace`)

**Location**: `.gemini/extensions/smart_replace/`

A custom local extension that performs fuzzy code replacement, tolerating whitespace and indentation differences. Used by `/refactor` and `/fix` workflows.

**Files**:
- `tool.json` - Tool definition
- `index.js` - Node.js implementation

---

## Skills (6)

| Skill | Description |
|-------|-------------|
| `testing-patterns` | TDD, Jest, factory functions |
| `systematic-debugging` | 4-phase debugging methodology |
| `react-ui-patterns` | Loading states, error handling |
| `graphql-schema` | Queries, mutations, codegen |
| `core-components` | Design system, tokens |
| `formik-patterns` | Form handling, validation |

---

## Agents (2)

| Agent | Description |
|-------|-------------|
| `code-reviewer.md` | Comprehensive code review with security, types, UI states checklist |
| `github-workflow.md` | Git commits, branches, PRs |

---

## Comparison with All Researched Projects

| Feature | gemini-showcase | run-gemini-cli | claude-code-showcase | superpowers | qwen-code |
|---------|:---------------:|:--------------:|:-------------------:|:-----------:|:---------:|
| **Platform** | Gemini CLI | Gemini CLI (Action) | Claude Code | Claude Code | Qwen CLI |
| **Type** | Showcase Template | Official GitHub Action | Showcase Template | Skills Framework | CLI Fork |
| **Commands** | 9 | N/A | 6 | 3 | N/A |
| **Workflows** | 10 | 4 examples | 4 | N/A | N/A |
| **Skills** | 6 | N/A | 6 | 14 | Dynamic |
| **Agents** | 2 | N/A | 2 | 1 | 1 |
| **Custom Extensions** | ✅ `smart_replace` | ✅ (URL-based) | ❌ | ❌ | ❌ |
| **Scheduled Jobs** | ✅ (3) | Examples provided | ✅ (3) | ❌ | ❌ |
| **Two-Stage Review** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Skill Evaluation Hook** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Subagent-Driven Dev** | ✅ (Prototype) | ❌ | ❌ | ✅ | ❌ |
| **TDD Iron Law** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **MCP Integration** | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Plugin Marketplace** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Graphviz Diagrams** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Free Tier Auth** | API Key | API Key / WIF | N/A | N/A | Qwen OAuth |

---

## Potential Improvements (Inspired by Research)

### From obra/superpowers
| Feature | Benefit | Effort |
|---------|---------|--------|
| **Two-Stage Review** (Spec Compliance → Code Quality) | Prevents wasted review on "wrong direction" code | Medium |
| **Subagent-Driven Development** | Fresh context per task, parallel-safe execution | High |
| **TDD Iron Law** | Enforce test-first discipline with anti-pattern catalogs | Low |
| **Graphviz Decision Diagrams** | Visualize complex flows in SKILL.md | Low |

### From ChrisWiles/claude-code-showcase
| Feature | Benefit | Effort |
|---------|---------|--------|
| **Skill Evaluation Hook** | Auto-suggest skills based on prompt analysis | Medium |
| **`/ticket` Workflow** | End-to-end JIRA/Linear integration | Medium |

### From google-github-actions/run-gemini-cli
| Feature | Benefit | Effort |
|---------|---------|--------|
| **WIF Authentication** | More secure than API key for enterprise | Low |
| **OTEL Observability** | Monitor AI agent performance | Medium |

### From QwenLM/qwen-code
| Feature | Benefit | Effort |
|---------|---------|--------|
| **Smart Edit Tool** | LLM-powered diff application (similar to our `smart_replace`) | Already done ✅ |
| **Memory Tool** | Long-term context management across sessions | High |

---

## Conclusion

**gemini-showcase** is the most feature-complete Gemini CLI project template available. It successfully adapts the claude-code-showcase patterns for the Gemini ecosystem while adding unique capabilities like the `smart_replace` extension.

**Strengths**:
- Most comprehensive workflow coverage (10 workflows, 9 commands)
- First-of-its-kind custom extension system for Gemini CLI
- Only project with full research documentation on related ecosystems

**Implemented Features** (Completed in Jan 2026):
1. ✅ **Graphviz Diagrams**: Logic flows in `systematic-debugging` and `testing-patterns`.
2. ✅ **Two-Stage Review**: Spec Compliance check before Code Quality analysis.
3. ✅ **TDD Anti-Patterns**: "Iron Law" strict mode for `/refactor` and `/fix`.
4. ✅ **Skill Evaluation Hook**: Dynamic skill suggestions based on prompt.
5. 🟡 **Subagent Execution (V2)**: Prototype implemented for `/plan` strict mode.

**Future Roadmap**:
1. 🔴 **Full Subagent Orchestration**: Parallel execution of V2 plans with shared memory.
2. 🟡 **Memory Tool**: Long-term context management.
