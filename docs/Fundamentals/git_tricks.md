---
title: "Git Tips & Tricks"
sidebar_label: Git Tips & Tricks
tags:
  - git
  - vcs
---

# Git

## Useful git commands

### git maintenance start

This starts a kind of repository defrag task so that things are faster and is not heavy on the system.

Example of setting it up for `dotfiles` repo:

```console
➜ git maintenance start
Created symlink /home/decoder/.config/systemd/user/timers.target.wants/git-maintenance@hourly.timer → /home/decoder/.config/systemd/user/git-maintenance@.timer.
Created symlink /home/decoder/.config/systemd/user/timers.target.wants/git-maintenance@daily.timer → /home/decoder/.config/systemd/user/git-maintenance@.timer.
Created symlink /home/decoder/.config/systemd/user/timers.target.wants/git-maintenance@weekly.timer → /home/decoder/.config/systemd/user/git-maintenance@.timer.
```

## Interactive rebasing

Determine which commit is the last common between my branch and the branch branched from (main/master)

`git merge-base your-branch-name base_branch`

When rebasing using zsh, the commit must be quoted due to the ^ symbo, so:

`git rebase -i "c15b0407b395b65aa315b9afa579d4f5887c5247"`

## Resolving merge conflicts

### The basics

```bash
<<<<<<< HEAD
# Your changes
=======
# Changes from the branch being merged
>>>>>>> main
```

```text
<<<<<<< HEAD marks the start of the conflicting area with your current branch's changes.
======= divides your changes from the changes in the other branch.
>>>>>>> main marks the end of the conflicting area with the changes from the branch you're trying to merge.
```

### Nvim specifics

- Use `Gv[h]diffsplit!` to open 3 way merge
- Middle one is the current file
- Left/top one with `2` is the branch we are merging from or rebasing onto
- Right/bottom side with `3` is our current branch in the worktree

To accept a whole file from specific branch just use `git checkout`. For example: `git checkout --theirs /path/to/file.txt` to accept from the branch that we are merging from or rebasing onto and `git chekcout --ours /path/to/file.txt` to accept
changes from our branch.

Also using `:diffget <tab>` will show options to get changes from other side.

## Selective merging

### Overview

A guide to selectively merge changes from one Git branch to another.

### Steps

1. **Identify Changes**:
   `git diff --name-only main old_feature`

2. **Review Changes**:
   `git diff main old_feature -- [file_path]`

3. **Cherry-Pick Changes**:
   `git checkout old_feature -- [file_path]`

4. **Select only hunks**
   If needed we can select only certain hunks from a file after checkout:
   `git add -p [file_path]`

5. **Commit the Changes**:
   `git add .`
   `git commit -m "Incorporate selected changes from old_feature"`

### Tips

- Always review changes before merging to avoid unintended modifications.
- Be prepared to resolve merge conflicts.
