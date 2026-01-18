# Gemini Code Project Configuration Showcase

> Most software engineers are seriously sleeping on how good LLM agents are right now.

Once you've got Gemini Code set up, you can point it at your codebase and have it operate like a super-powered teammate. The real unlock is building a solid set of **Skills** and **Agents** for the stuff you do all the time.

For background on how this project was produced, see the companion notes repo: https://github.com/joeangel/gemini-showcase-notes

## ✨ The Magic

This project demonstrates specific "Magic" capabilities powered by Gemini:

### 1. Auto-Repair (`/fix`)
See an issue? Just comment:
> `@gemini /fix`

Gemini will analyze the issue, **write the code to fix it**, and **open a PR** for you.

### 2. Auto-Review (`/review`)
Open a PR, and Gemini automatically reviews it against our [Code Review Agent](.gemini/agents/code-reviewer.md) checklist (Security, Types, UI States).

### 3. Auto-Triage (`/triage`)
Open an issue, and Gemini immediately analyzes it and applies the correct labels.

### 4. Smart Refactor (`/refactor`)
Want to modernize your code? Comment:
> `@gemini /refactor convert this to async/await`

Gemini acts as a **Senior Engineer**, using our specialized **Smart Diff** tool to safely restructure your code.

### 5. Auto-Plan (`/plan`)
Have a big idea but don't know where to start?
> `@gemini /plan implement user login`

- **V1 (Context-Aware)**: Default. Fast and efficient.
- **V2 (Strict Isolation)**: Experimental. Runs totally isolated subagents for each task. **High Cost**.

Gemini acts as a **Project Manager**, breaking down your request into a detailed `task.md` checklist.

### 6. Chat (`@gemini`)
Mention `@gemini` in any comment to ask questions or request changes.

---

## 📚 Documentation

Detailed documentation has been moved to keep this README token-friendly for AI agents.

| Topic | Description |
|-------|-------------|
| **[Configuration](docs/configuration.md)** | `AIMD`, `settings.json`, MCP, LSP, Hooks |
| **[Skills & Agents](docs/skills-and-agents.md)** | Creating Custom Skills, Agents, and Commands |
| **[Workflows](docs/workflows.md)** | Dispatch, Review, Triage, Refactor, Plan, Fixer |
| **[Extensions](docs/extensions.md)** | **[NEW]** Smart Diff & Local Tool Extensions |
| **[Cost & Usage](docs/cost-and-usage.md)** | **Billing, API Limits, and Security (MUST READ)** |

---

## ⚠️ Prerequisites & Safety

Before you start, please read our **[Cost & Usage Guide](docs/cost-and-usage.md)**.

### 1. Essentials
- **GitHub Account**: Free Tier is fine, but be aware of [Action Limits](docs/cost-and-usage.md#github-actions-billing).
- **Gemini API Key**: Get one from [Google AI Studio](https://aistudio.google.com/).

### 2. Critical Configuration
- **Add Secret**: Go to `Settings` -> `Secrets` -> `Actions` and add `GEMINI_API_KEY`.
- **Permissions**: Enable **Read and write permissions** in `Settings` -> `Actions` -> `General`.

> [!CAUTION]
> **Private Repository Users**: Scheduled workflows consume your 2,000 free minutes. See [Fixed Costs Table](docs/cost-and-usage.md#monthly-rental-fixed-costs) to avoid unexpected quotas usage.

---

## 🚀 Quick Start

### 1. Create the `.gemini` directory
```bash
mkdir -p .gemini/{agents,commands,hooks,skills}
```

### 2. Add Project Memory
Create `GEMINI.md` in your project root. See [Example GEMINI.md](GEMINI.md).

### 3. Add Settings
Create `.gemini/settings.json`. See [Example settings.json](.gemini/settings.json).

---

## License
MIT

> **Notice:** Portions of this software are derived from [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase), copyright (c) 2025 Chris Wiles, licensed under the MIT License.
