#!/bin/bash
# Skill Evaluation Hook v2.0
# Wrapper script that delegates to the Node.js evaluation engine
#
# This hook runs on UserPromptSubmit and analyzes the prompt for:
# - Keywords and patterns indicating skill relevance
# - File paths mentioned in the prompt
# - Intent patterns (what the user wants to do)
# - Directory mappings (what directories map to which skills)
#
# Configuration is in skill-rules.json

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_SCRIPT="$SCRIPT_DIR/skill-eval.js"

# Check if Node.js is available
if ! command -v node &>/dev/null; then
  # Fallback: exit silently if Node.js not found
  exit 0
fi

# Check if the Node script exists
if [[ ! -f "$NODE_SCRIPT" ]]; then
  exit 0
fi

# Pipe stdin to the Node.js script (suppress stderr noise from nvm/shell init)
cat | node "$NODE_SCRIPT" 2>/dev/null

# Always exit 0 to allow the prompt through
exit 0
