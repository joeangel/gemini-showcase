# Research: obra/superpowers

> An Agentic Skills Framework for Claude Code that hit GitHub Trending #1.

## Overview

**Superpowers** is a complete software development workflow framework built on composable "skills".

**Core Philosophy**:
- **TDD (Test-Driven Development)**: Write tests first; code exists only to make tests pass.
- **YAGNI (You Aren't Gonna Need It)**: No over-engineering.
- **Subagent-Driven-Development**: Main agent plans, subagents execute, with two-stage review after each task.

**The Basic Workflow**:
1.  `brainstorming` - Refine design through questions, output design document.
2.  `using-git-worktrees` - Create isolated Git worktree.
3.  `writing-plans` - Break work into 2-5 minute micro-tasks.
4.  `subagent-driven-development` / `executing-plans` - Dispatch subagents to execute tasks.
5.  `test-driven-development` - Enforce RED-GREEN-REFACTOR cycle.
6.  `requesting-code-review` - Review between tasks.
7.  `finishing-a-development-branch` - Verify, merge, or discard branch.

---

## Project Structure

```
superpowers/
├── .claude-plugin/         # Claude Code Plugin definition
│   ├── plugin.json         # Version, author, keywords
│   └── marketplace.json    # Marketplace publishing config
├── agents/                 # Subagent definitions (1)
├── commands/               # Slash commands (3)
│   ├── brainstorm.md
│   ├── write-plan.md
│   └── execute-plan.md
├── docs/                   # Detailed documentation
├── hooks/                  # Event hooks
│   ├── hooks.json          # SessionStart event binding
│   └── session-start.sh    # Auto-inject context on session start
├── lib/                    # Shared library
├── skills/                 # Core skills library (14 directories)
└── tests/                  # Test cases
```

---

## Core Skills / Commands

### Commands (Slash Commands)

| Command | Function |
|---------|----------|
| `/superpowers:brainstorm` | Start design brainstorming |
| `/superpowers:write-plan` | Generate implementation plan from design |
| `/superpowers:execute-plan` | Execute plan in batches |

### Key Skills

| Skill | Description | Highlights |
|-------|-------------|------------|
| `brainstorming` | Design refinement | One question at a time, prefer multiple choice |
| `writing-plans` | Write implementation plans | Each step 2-5 min, exact file paths, complete code |
| `subagent-driven-development` | Subagent execution | **Two-stage review**: Spec Compliance first, then Code Quality |
| `test-driven-development` | TDD execution | **Iron Law**: No failing test = no code. Violated? Delete code and restart. |
| `systematic-debugging` | Systematic debugging | 4-phase root cause analysis |
| `using-git-worktrees` | Git Worktree | Isolated branch per feature |

---

## Key Design Patterns

### 1. Two-Stage Code Review (Core Innovation)
After a subagent completes a task, instead of moving directly to the next step:
1.  **Spec Compliance Review**: Check if code *exactly* matches spec—no more, no less.
2.  **Code Quality Review**: Review code quality.
    - Only proceeds after Spec Compliance passes, avoiding wasted review effort on "wrong direction" code.

### 2. Graphviz Decision Diagrams
SKILL.md files embed Graphviz (`dot`) syntax for decision flow diagrams, clearly visualizing complex processes.

### 3. Anti-Pattern Catalogs & Rationalizations
The TDD skill includes a complete "Common Excuses & Rebuttals" table, effectively preventing AI from rationalizing TDD shortcuts.

### 4. Session Start Hook
Via `hooks.json` + `session-start.sh`, automatically injects project context at the start of each session.

### 5. Plugin Manifest (`plugin.json`)
Clean structure with: `name`, `version`, `author`, `keywords` for Marketplace searchability.

---

## Takeaways for Our Project

| Superpowers Highlight | What We Can Learn/Adopt |
|-----------------------|-------------------------|
| **Two-Stage Review** | Add Spec Compliance check step to `/refactor` and `/fix` |
| **Graphviz Diagrams** | Use flow diagrams in SKILL.md for readability |
| **Anti-Pattern Catalogs** | Add "common mistakes" prevention to command definitions |
| **Session Hooks** | Enhance `.gemini/hooks/` usage, auto-load project rules on session start |
| **Marketplace Model** | Could publish `smart_replace` as installable community extension |
| **Bite-Sized Tasks** | `/plan` output `task.md` should emphasize 2-5 minute steps |

---

## Conclusion

Superpowers is one of the most mature "development workflow frameworks" we've seen. Its value isn't in what it *can* do, but in how it **forces AI to follow discipline**. The key insight for our project: **A good AI Agent isn't just "capable"—it must have "principles".**
