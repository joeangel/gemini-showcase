# Local Extensions

Gemini Code allows you to extend its capabilities by creating local tools. This is useful for project-specific logic, integrating with internal scripts, or adding "power tools" like Smart Diff.

## Directory Structure

Extensions live in `.gemini/extensions/`. Each extension is a directory containing a `tool.json` definition and the executable code.

```
.gemini/extensions/
└── my-extension/
    ├── tool.json       # Tool definition
    └── index.js        # Implementation (Node.js, python, bash, etc.)
```

## Built-in Extensions

### 🪄 Smart Diff (`smart_replace`)

**Location**: `.gemini/extensions/smart_replace/`

This is a powerful "fuzzy replace" tool designed to fix a common pain point with LLM code editing: strict whitespace matching.

- **Why use it**: Standard `replace_file_content` fails if the LLM miscounts spaces or tabs. `smart_replace` uses fuzzy matching to find the target block even if indentation varies.
- **Workflow Integration**: It is automatically used by the `/refactor` and `/fix` workflows.

**Definition (`tool.json`):**
```json
{
  "name": "smart_replace",
  "toolType": "executable",
  "entryPoint": "node index.js",
  "parameters": { ... }
}
```

## Creating Your Own Extension

1.  **Create Directory**: `mkdir -p .gemini/extensions/my-tool`
2.  **Define Tool**: Create `tool.json`.
3.  **Implement**: Write your script (e.g., `index.js`).
4.  **Use**: In your workflows (`gemini-*.yml`), add the extension to the `extensions` input:

```yaml
with:
  extensions: 'local:.gemini/extensions/my-tool'
```
