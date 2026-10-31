---
name: summarize-changes
description: Summarize git changes in plain language. Use when the user asks what changed, wants a summary of a diff, branch, commit range, or uncommitted work, or needs a PR description or changelog draft.
---

# Summarize Changes

Produce a concise, accurate summary of git changes.

## 1. Pick the scope

Use what the user asked for. If they gave no scope, choose in this order:

1. Uncommitted work: `git status -sb`, `git diff HEAD`, and untracked files.
2. If the tree is clean, the current branch against its base: find the base with `git merge-base HEAD origin/main` (or `origin/master`), then `git log --oneline <base>..HEAD` and `git diff <base>...HEAD`.
3. A specific commit, range, or PR if named: `git show <sha>`, `git diff A..B`.

Say which scope you used.

## 2. Gather facts

- `git diff --stat` for the shape of the change.
- `git log --format='%h %s%n%b' <range>` for intent.
- Read the actual diff for any file that matters. For very large diffs, read the most-changed files and skim the rest. Say so if you skimmed.
- Do not guess intent from file names alone.

## 3. Write the summary

Use this layout, omitting empty sections:

**Overview**: one or two sentences on what the change does and why.

**Changes**: bullets grouped by area (feature, fix, refactor, tests, docs, config). Each bullet names the file or module and what changed in behavior, not line counts.

**Risks / things to check**: breaking changes, migrations, new dependencies, removed code, missing tests, anything surprising.

**Stats**: files changed, insertions, deletions.

## Rules

- Describe behavior and purpose, not a line-by-line replay.
- Keep it short: under about 20 lines unless the user asks for detail.
- Flag secrets, credentials, or large generated or binary files if you see them.
- Read-only: never commit, push, stash, or modify the working tree.
- If there are no changes in the chosen scope, say so instead of inventing a summary.
