# Skills & Agents

This guide details how to extend Gemini Code with domain knowledge (Skills) and specialized assistants (Agents).

## Skills - Domain Knowledge

Skills are markdown documents that teach Gemini project-specific patterns and conventions.

**Location:** `.gemini/skills/{skill-name}/SKILL.md`

**📄 Examples:**
- [testing-patterns](../.gemini/skills/testing-patterns/SKILL.md) - TDD, factory functions, mocking
- [systematic-debugging](../.gemini/skills/systematic-debugging/SKILL.md) - Four-phase debugging
- [react-ui-patterns](../.gemini/skills/react-ui-patterns/SKILL.md) - UI state handling
- [graphql-schema](../.gemini/skills/graphql-schema/SKILL.md) - Queries & mutations

### SKILL.md Format

```markdown
---
name: skill-name
description: What this skill does and when to use it. Include keywords users would mention.
allowed-tools: Read, Grep, Glob
model: gemini-1.5-flash
---

# Skill Title

## When to Use
- Trigger condition 1
- Trigger condition 2

## Core Patterns
...
```

### Best Practices
1. **Focus**: Keep under 500 lines.
2. **Triggers**: Write rich descriptions for semantic matching.
3. **Examples**: Show good vs. bad code patterns.
4. **Filename**: Must be `SKILL.md`.

---

## Agents - Specialized Assistants

Agents are AI assistants with focused purposes and their own prompts.

**Location:** `.gemini/agents/{agent-name}.md`

**📄 Examples:**
- [code-reviewer.md](../.gemini/agents/code-reviewer.md) - Comprehensive reviewer
- [github-workflow.md](../.gemini/agents/github-workflow.md) - Git/GitHub helper

### Agent Format

```markdown
---
name: code-reviewer
description: Reviews code for quality.
model: opus
---

# Agent System Prompt

You are a senior code reviewer...
```

---

## Commands - Slash Commands

Custom commands invoked with `/command-name`.

**Location:** `.gemini/commands/{command-name}.md`

**📄 Examples:**
- [onboard.md](../.gemini/commands/onboard.md)
- [pr-create.md](../.gemini/commands/pr-create.md)
- [pr-review.md](../.gemini/commands/pr-review.md)
- [ticket.md](../.gemini/commands/ticket.md)

### Command Format

```markdown
---
description: Brief description
---

# Command Instructions

Your task is to: $ARGUMENTS
```

### Inline Bash
```markdown
Current branch: !`git branch --show-current`
```
