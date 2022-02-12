---
title: Introduction to GitOps
sidebar_label: GitOps
tags:
    - GitOps
    - DevOps
---

# Introduction to GitOps

## Resources

- [Flux Docs](https://fluxcd.io/docs/)
- [GitOps Origins by WeaveWorks](https://www.weave.works/blog/gitops-operations-by-pull-request)
- [Guide to GitOps by WeaveWorks](https://www.weave.works/technologies/gitops/)
- [GitOps Conversation Kit](https://gitops-community.github.io/kit/#need-help-or-want-updates)

## What is GitOps

GitOps Principles are set of guiding directions and rules put together by the [GitOps Working Group](https://github.com/gitops-working-group/gitops-working-group) with the goal of:

> [!INFO]
>> *The focus of the GitOps WG is to clearly define a vendor-neutral, principle-led meaning of GitOps. This will establish a foundation for interoperability between tools, conformance, and certification. Lasting programs, documents, and code are planned to live within the OpenGitOps project.*

GitOps approach follows 5 principles:

![GitOps Principles](/_media/diagrams/gitops-principles.png)

### Standard Git Flow

Before exploring GitOps further, let's make sure that we have good grasp on the git workflow.

![Standard Git Flow](/_media/diagrams/simplified-git-workflow.png)
<small>Simplified Git workflow</small>

The above example shows developer workflow in a simplified way, but taking into consideration how most of the work is done with Git repositories nowadays.

## Wait, haven’t we’ve been doing GitOps all this time?

You might ask yourself if you haven’t been doing GitOps all the time anyway? What’s all the fuss? You have been using Git and committing/pushing changes every day! The key difference is the **reconciliation loop** that happens continuously making sure whatever is defined in your Git repos is **reflected on the infrastructure side** using the automated agent on your Kubernetes cluster.

In other words; **GitOps = Continuous Delivery + Continuous Operations.**

Let’s look at how GitOps principles could work with Kubernetes. Imagine your app runs in a Kubernetes cluster and you want to update its deployment manifest increasing CPU resources allowance. In a “traditional” way you would:

- modify a helm chart, kustomize file or plain deployment YAML, changing CPU request and limits for a particular deployment
- use kubectl to apply changed YAML to your cluster

In the GitOps world, instead of applying resources to your cluster manually (or via script or pipeline), a dedicated agent would pull changes into the cluster and apply them on your behalf.

![GitOps Flow](/_media/diagrams/gitops-flow.png)
