---
title: Welcome Docusaurus v2
description: Setting up local KIND cluster with just and ArgoCD
tags: ["kubernetes", "gitops"]
image: _media/kubernetes_hard.png
hide_table_of_contents: false
---

![](./_media/logo_old.png) 

This article will be helpful for anyone interested in setting up local Kubernetes test environment in a repeatable and conscience way.

<!--truncate-->

# Backstage Demo

This demo showcases the usage of Backstage and ArgoCD to create and deploy a new service from the point of view of a new developer.

## Setup

There are 2 parts of the demo, both are run separately in a local environment on Mac or Linux.

- `dev part` — Standalone backstage demo app
- `platform part` — KIND cluster with ArgoCD, uxp and GCP OF

### Platform part prerequisites

- [KIND](https://kind.sigs.k8s.io/)
- install [just](https://github.com/casey/just). It is similar to `make`, but focused on commands orchestration
- latest [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) version
- up CLI `curl -sL "https://cli.upbound.io" | sh && sudo mv /usr/local/bin`
- envsubst is part of the [GNU gettext utilities](https://www.gnu.org/software/gettext/manual/gettext.html) and should be already installed on your system

### Spin up the infrastructure

This will create a local kind cluster with ArgoCD and UXP installed. 

> This setup should work with linux and mac.

From the `root` folder run

```bash
just setup_infra
```

Optionally to test if the setup is correct, you can deploy a test `GCP bucket`

```bash
just test_cluster
```

Once everything is set up, launch argo and login

```bash
just launch_argo
```

> - username: **admin**
> - password: **should be in your clipboard** so just paste it in the `password` text box. In case this didn't work, you can run `@kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d` to get the password.

### Destroy the cluster

```bash
just teardown
```

This command will also delete the `test bucket`, so you don't have to remember about it.

### How to run slides

Short presentation is created using a [terminal presentation](https://github.com/maaslalani/slides) tool called `slides`.
Diagram is rendered using `plantuml`], but it's not essential to have it installed locally

To run slides simply `cd slides; ./slides presentation.md`

> The binary is includes in the <kbd>slides folder</kbd>.

If you want fancy effects on the slides, a few programs need to be installed:

- [figlet](https://github.com/cmatsuoka/figlet)
- [boxes](https://github.com/ascii-boxes/boxes)
