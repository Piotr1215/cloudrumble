---
title: "Gitops With Kubernetes"
date: 2021-07-14T15:29:15+02:00
tags: ["kubernetes", "gitops"]
---

![Photo by [Timelab Pro](https://unsplash.com/@timelabpro?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/container?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/12032/1*bZYRUC186rFiox2B9OVD9g.jpeg)

## GitOps with Kubernetes

### Introduction

In 2017, a cloud-native company [Weaveworks ](https://www.weave.works/)release a blog post called “[GitOps — Operations by Pull Request](https://www.weave.works/blog/gitops-operations-by-pull-request)”. The post introduces the term **GitOps** defining it as *using Git as a source of truth to operate almost anything. *Since then GitOps movement has been growing and gaining in popularity.

<!--truncate-->

We are going to take a closer look at what GitOps is and how it applies to Kubernetes. What are the benefits we can gain from applying GitOps principles? What is the difference between simply using Git to deploy stuff and GitOps? Can we use GitOps at scale?

### Git

GitOps, as the name suggests, has something to do with Git. Fun fact, GitOps doesn’t have to be really (Git)Ops, it could also be (SVN)Ops or (Mercurial)Ops or even (Version Control System)Ops…, but well GitOps just rolls better off the tongue ;)

Anyway, we all know and love Git (when it just works) or hate it (when we need to resolve a merge conflict). Let’s have a quick refresher, how modern Git-based developer workflow looks like. Obviously, features like Pull Requests are not part of Git the version control system, but rather GitHub, GitLab etc. In the diagram we are looking at activities developers perform that include pull requests as good practices around managing code changes.

![Sample Git workflow](https://cdn-images-1.medium.com/max/2678/1*iPXGlE7tk_UEBAYixcMqXw.png)

The above example shows developer workflow in a simplified way, but taking into consideration how most of the work is done with Git repositories nowadays.

### Wait, haven’t we’ve been doing GitOps all this time?

You might ask yourself if you haven’t been doing GitOps all the time anyway? What’s all the fuss? You have been using Git and committing/pushing changes every day! The key difference is the **reconciliation loop** that happens continuously making sure whatever is defined in your Git repos is **reflected on the infrastructure side **using the automated agent on your Kubernetes cluster.

In other words; **GitOps = Continuous Delivery + Continuous Operations.**

Let’s look at how GitOps principles could work with Kubernetes. Imagine your app runs in a Kubernetes cluster and you want to update its deployment manifest increasing CPU resources allowance. In a “traditional” way you would:

- modify a helm chart, kustomize file or plain deployment YAML, changing CPU request and limits for a particular deployment

- use kubectl to apply changed YAML to your cluster

In the GitOps world, instead of applying resources to your cluster manually (or via script or pipeline), a dedicated agent would pull changes into the cluster and apply them on your behalf.

![GitOps Flow with Kubernetes](https://cdn-images-1.medium.com/max/2310/1*oOx3_hScga5SDb5yafjWKw.png)

### Benefits of GitOps in Kubernetes

Kubernetes brings enormous power to managing workloads at scale, but this power comes with a cost of complexity. The less manual intervention and the higher the automation, the better. GitOps enables a very high degree of automation which is in my opinion its most significant benefit.

This is what [Kelsey Hightower](https://twitter.com/kelseyhightower) had to say about GitOps.

![](https://cdn-images-1.medium.com/max/2000/1*Lo55hzX30yntB6NN296xHg.png)

### GitOps Tooling

GitOps Tools are maturing rapidly and offering a broad spectrum of features, covering security and Day2 operations. The tool I’m familiar with and can highly recommend is [Flux](https://www.weave.works/oss/flux/) as well as [GitOps Core](https://www.weave.works/product/gitops-core/) (both tools from Weaveworks). There is also a very popular tool [ArgoCD](https://argoproj.github.io/argo-cd/) in the same category, but I’m less familiar with it.

Cloud providers develop their own GitOps related tooling as well. For example Azure uses [Azure Arc](https://docs.microsoft.com/en-us/azure/azure-arc/kubernetes/conceptual-configurations) with Azure Arc enabled Kubernetes and Google Cloud uses [Cloud Build](https://cloud.google.com/kubernetes-engine/docs/tutorials/gitops-cloud-build).

### Kubernetes manifests in-app repo or a dedicated repo

Somehow related to GitOps, a question that often pops up is: Should I put my Kubernetes YAML manifests in the same repo as my app (microservice) or in a dedicated repo?

The answer depends on what your app is doing, how many clusters do you have and how mature your Platform Team is. If you are a small team and have only a handful of apps deployed on a single Kubernetes cluster, then having your Kubernetes manifests in the same repo as your app makes sense.

If you are a bigger team with multiple clusters, then splitting cluster-specific YAML files from your app files into a separate repo might be a better choice.

In the end, remember, all YAML files, helm charts or other ways to apply changes to your cluster will be managed from those Git repos, so make sure that your branching strategy is correct and you will be fine.

### What if I have 100+ clusters

Kubernetes on the edge, at scale, is becoming the norm, but how do I manage multiple Kubernetes clusters with only 2 team members? Obviously, automation is the key. A very interesting solution is [Rancher Fleet.](https://fleet.rancher.io/)

![Rancher Fleet](https://cdn-images-1.medium.com/max/2000/1*74uCX__UgyVWob844FqdlA.png)

Using GitOps principles and Rancher amazing function of managing any Kubernetes cluster at scale, we can now apply GitOps principles to a lot of clusters at the same time.

### Where can I learn more

The best way to learn more about GitOps is to check Weaveworks blogs and resources, for example, [Guide To GitOps](https://www.weave.works/technologies/gitops/), you can also get involved in [GitOps Working Group](https://github.com/gitops-working-group/gitops-working-group).

Would you like to convince your team or boss to give GitOps a try? Check out [GitOps Conversation Kit](https://gitops-community.github.io/kit/#need-help-or-want-updates).

### Conclusion

We have just scratched the surface of how GitOps practices can be used with Kubernetes apps and infrastructure. GitOps is a trend gaining in popularity in Cloud Native space. It is worth your time to investigate it a bit and see what benefits might it bring to you and your team.
