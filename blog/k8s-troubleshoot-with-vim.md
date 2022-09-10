---
title: "Automated Kubetnernetes runbooks"
date: 2022-09-06
tags: ["kubernetes", "troubleshooting"]
image: _media/kubernetes_hard.png
---

import YouTube from 'react-youtube';

WIP

<!--truncate-->

<YouTube videoId="ZJ1oTN5uSgo" />

Guided Katacoda Scenario Tour


## Runbooks

Runbooks are useful codifying repeatable troubleshooting steps

> A runbook is a detailed “how-to” guide for completing a commonly repeated task
> or procedure within a company’s IT operations process. Runbooks are created to
> provide everyone on the team—new or experienced—the knowledge and steps to
> quickly and accurately resolve a given issue. For example, a runbook may
> outline routine operations tasks such as patching a server or renewing a
> website’s SSL certificate.

## Automating Runbooks: Goals

- Ability to execute runbook steps in a repeatable manner
- Leaving audit trail in the form of incident handling document
- Everyone with access should be able to execute a runbook

## Useful tools

### Mandatory

- shell: bash
- curl
- kubectl
- gcloud

### Optional

- terminal multiplexer: e.g. **tmux**
- terminal multiplexer session manager: e.g. tmux-ressurect or **tmuxinator**
- tooling integration: **nvim** with a runner plugin, but it's possible to run
  without it

## Demo
