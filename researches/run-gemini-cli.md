# Research: google-github-actions/run-gemini-cli

> Official GitHub Action for running Gemini CLI in workflows, developed by Google.

## Overview

**run-gemini-cli** is the official GitHub Action that integrates Gemini CLI into development workflows. It enables:

- **Automated PR reviews and issue triage**
- **On-demand collaboration via `@gemini-cli` mentions**
- **Extensibility through tools and extensions**
- **Customization via `GEMINI.md`**

This is the core action that powers all of our Gemini workflows.

---

## Project Structure

```
run-gemini-cli/
├── action.yml              # Main action definition (497 lines)
├── GEMINI.md               # Example project memory
├── docs/                   # Documentation
│   ├── authentication.md
│   ├── observability.md
│   ├── extensions.md
│   └── best-practices.md
├── examples/
│   └── workflows/          # Pre-built workflow templates
│       ├── gemini-assistant/
│       ├── gemini-dispatch/
│       ├── issue-triage/
│       └── pr-review/
└── scripts/                # Helper scripts
```

---

## Key Features

### Action Inputs

| Input | Description |
|-------|-------------|
| `gemini_api_key` | API key for Gemini API |
| `prompt` | String passed to CLI's `--prompt` argument |
| `settings` | JSON string for `.gemini/settings.json` |
| `extensions` | List of extensions to install |
| `gemini_cli_version` | Version: `latest`, `preview`, `nightly`, or specific |
| `use_vertex_ai` | Use Vertex AI instead of API key |
| `gcp_workload_identity_provider` | WIF for secure GCP authentication |

### Pre-Built Workflows

| Workflow | Purpose |
|----------|---------|
| `gemini-dispatch` | Central dispatcher routing requests to appropriate workflows |
| `issue-triage` | Automatic issue labeling and triage |
| `pr-review` | Automatic PR code review |
| `gemini-assistant` | General-purpose conversational AI |

### Extension System

Extensions are installed from GitHub repositories:

```yaml
extensions: |
  [
    "https://github.com/gemini-cli-extensions/security",
    "https://github.com/gemini-cli-extensions/code-review"
  ]
```

---

## Configuration Options

### Authentication Methods

1. **Gemini API Key**: Simplest, uses `GEMINI_API_KEY` secret
2. **Workload Identity Federation (WIF)**: Most secure for GCP
3. **Vertex AI**: Enterprise-grade, requires GCP project
4. **Gemini Code Assist**: Alternative enterprise access

### Settings JSON

Pass inline settings to configure the CLI:

```yaml
settings: |-
  {
    "model": {
      "maxSessionTurns": 50
    },
    "mcpServers": {
      "github": { ... }
    }
  }
```

---

## Takeaways for Our Project

| run-gemini-cli Feature | Our Current Status |
|------------------------|-------------------|
| **Dispatch Pattern** | ✅ Implemented (`gemini-dispatch.yml`) |
| **Pre-built Workflows** | ✅ Implemented (review, triage, fix, refactor, plan) |
| **Extension Support** | ✅ Implemented (`smart_replace` local extension) |
| **WIF Authentication** | ⚠️ Not using (using API key instead) |
| **Vertex AI** | ⚠️ Not using (could be added for enterprise) |
| **Observability** | ❌ Not implemented (could add OTEL tracing) |

---

## Conclusion

This is **the official foundation** for our project. We are using this action correctly in all our workflows. Key learnings:
- The `extensions` input supports both URL-based and local extensions
- The `settings` input allows inline configuration without needing a settings file
- The dispatch pattern is the recommended way to handle multiple workflow types

**Potential improvements**: Consider adding WIF authentication for better security in enterprise environments, and OTEL observability for monitoring.
