# GitHub Actions Workflows

Automate code review, quality checks, self-repair, and maintenance with Gemini Code.

## Central Dispatch

We use a central dispatcher to handle interactions.

**📄 [gemini-dispatch.yml](../.github/workflows/gemini-dispatch.yml)**
Routes events from PRs, Issues, and Comments to specialized reusable workflows.

## Interactive Workflows

| Trigger | Command | Workflow | Description |
|---------|---------|----------|-------------|
| **PR Open** | `/review` | [gemini-review.yml](../.github/workflows/gemini-review.yml) | Automates code review. |
| **Issue Open** | `/triage` | [gemini-triage.yml](../.github/workflows/gemini-triage.yml) | Analyzes issue and applies labels. |
| **Any Comment** | `@gemini` | [gemini-invoke.yml](../.github/workflows/gemini-invoke.yml) | General chat assistant. |
| **Any Comment** | `/fix` | [gemini-fix.yml](../.github/workflows/gemini-fix.yml) | **Magic Fixer**: Writes code and opens PR to fix an issue. |

## Scheduled Maintenance

These agents run on a schedule to keep the codebase healthy.

| Workflow | Frequency | Purpose |
|----------|-----------|---------|
| [Code Quality](../.github/workflows/scheduled-gemini-code-quality.yml) | Weekly | Reviews random directories, auto-fixes issues. |
| [Docs Sync](../.github/workflows/scheduled-gemini-code-docs-sync.yml) | Monthly | Ensures documentation aligns with code. |
| [Dependency Audit](../.github/workflows/scheduled-gemini-code-dependency-audit.yml) | Biweekly | Safe dependency updates with testing. |
