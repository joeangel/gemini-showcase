---
description: Review a pull request using project standards
allowed-tools: Read, Glob, Grep, Bash(git:*), Bash(gh:*)
---

# PR Review

Review the pull request: $ARGUMENTS

## Instructions

### Phase 1: Spec Compliance Review (CRITICAL)

1.  **Analyze the Request**:
    - Read PR title and body to understand the "Spec" (requirements).
    - If linked to an issue, read the issue details.

2.  **Verify Compliance**:
    - Does the code `gh pr diff` implement **exactly** what was asked?
    - **Missing Features**: Is anything from the spec missing?
    - **Gold Plating**: Is there extra code *not* requested? (Violates YAGNI)
    - **Wrong Direction**: Did the implementation misunderstand the core problem?

3.  **Gate Check**:
    - If Spec Compliance **FAILS**:
        - Comment immediately with "⛔️ **Spec Compliance Failed**" and explain why.
        - **STOP**. Do not proceed to Code Quality review.
    - If Spec Compliance **PASSES**:
        - Comment "✅ **Spec Compliance Passed**".
        - Proceed to Phase 2.

### Phase 2: Code Quality Review

4.  **Read Standards**:
    - Read `.gemini/agents/code-reviewer.md`.

5.  **Apply Code Reviewer Checklist**:
    - **Logic**: Race conditions, bugs, side effects.
    - **Types**: No `any`, strict types.
    - **UI**: Loading/Error/Empty states (Crucial).
    - **Security**: No secrets, input validation.

6.  **Provide Feedback**:
    - Group by **Critical** (Blocker), **Warning** (Should Fix), **Suggestion** (Nice to have).
    - Use `gh pr comment` to post the full review.

