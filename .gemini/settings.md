# Gemini Code Settings Documentation

## Environment Variables

- `INSIDE_CLAUDE_CODE`: "1" - Indicates code is running inside Gemini Code
- `BASH_DEFAULT_TIMEOUT_MS`: Default timeout for bash commands (7 minutes)
- `BASH_MAX_TIMEOUT_MS`: Maximum timeout for bash commands

## Hooks

### UserPromptSubmit

- **Skill Evaluation**: Analyzes prompts and suggests relevant skills
  - **Script**: `.gemini/hooks/skill-eval.sh`
  - **Behavior**: Matches keywords, file paths, and patterns to suggest skills

### PreToolUse

- **Main Branch Protection**: Prevents edits on main branch (5s timeout)
  - **Triggers**: Before editing files with Edit, MultiEdit, or Write tools
  - **Behavior**: Blocks file edits when on main branch, suggests creating feature branch

### PostToolUse

1. **Code Formatting**: Auto-format JS/TS files (30s timeout)
   - **Triggers**: After editing `.js`, `.jsx`, `.ts`, `.tsx` files
   - **Command**: `npx prettier --write` (or Biome)
   - **Behavior**: Formats code, shows feedback if errors found

2. **NPM Install**: Auto-install after package.json changes (60s timeout)
   - **Triggers**: After editing `package.json` files
   - **Command**: `npm install`
   - **Behavior**: Installs dependencies, fails edit if installation fails

3. **Test Runner**: Run tests after test file changes (90s timeout)
   - **Triggers**: After editing `.test.js`, `.test.jsx`, `.test.ts`, `.test.tsx` files
   - **Command**: `npm test -- --findRelatedTests <file> --passWithNoTests`
   - **Behavior**: Runs related tests, shows results, non-blocking

4. **TypeScript Check**: Type-check TS/TSX files (30s timeout)
   - **Triggers**: After editing `.ts`, `.tsx` files
   - **Command**: `npx tsc --noEmit`
   - **Behavior**: Shows first errors only, non-blocking

## Hook Response Format

```json
{
  "feedback": "Message to show",
  "suppressOutput": true,
  "block": true,
  "continue": false
}
```

## Environment Variables in Hooks

- `$CLAUDE_TOOL_INPUT_FILE_PATH`: File being edited
- `$CLAUDE_TOOL_NAME`: Tool being used
- `$CLAUDE_PROJECT_DIR`: Project root directory

## Exit Codes

- `0`: Success
- `1`: Non-blocking error (shows feedback)
- `2`: Blocking error (PreToolUse only - blocks the action)
