---
title: Kubernetes Introduction
sidebar_label: Kubernetes Intro
tags:
    - Kubernetes
    - Practice
---

# Kubernetes Introduction

## Theory

### Why do we need Kubernetes

Kubernetes is a container orchestrator, but what is container orchestration?

- Provisioning and deployment
- Configuration and scheduling
- Resource allocation
- Container availability
- Scaling or removing containers based on balancing workloads across your infrastructure
- Load balancing and traffic routing
- Monitoring container health
- Configuring applications based on the container in which they will run
- Keeping interactions between containers secure

:::tip
 for in-depth analysis of kubernetes orchestartion please check [this medium blog post](https://itnext.io/how-to-be-a-devops-maestro-containers-orchestration-guide-b2cf884eaed1)
:::

## Resources

- [Kubernetes Documentation](https://kubernetes.io/)
- [CKAD - Certified Kubernetes Application Developer curriculum](https://github.com/cncf/curriculum/blob/master/CKAD-2021_Curriculum_Coming_Q3_2021.pdf): what developers should know about Kubernetes
- [Really good introduction to Kubernetes with interactive exercises](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

## Practice

We will create cluster based on our IAC session using [this repo](http://addrepo)

> Cluster will be already deployed for the exercises. We are doing to focus on what developer's point of view and will skip Operations and Infrastructure concerns
> You will have access to the cluster running in *azure-k8stest* resource group. Cluster name is **k8stest** in **azure-k8stest** resource group

### Accessing cluster

In order to access the running cluster and be able to follow along you need to install `kubectl` (CLI to interact with Kubernetes clusters).

- follow [this guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/) to install `kubectl`
- once `kubectl` is installed run this command `az aks get-credentials -g azure-k8stest -n k8stest`, it will append auth info to your Kubernetes config file so you can interact with the cluster
- run `kubectl get nodes` to verify that you have access to the cluster (you should see 3 nodes)

### AKS Specific

#### Development Loop

https://itnext.io/best-practices-for-developing-on-kubernetes-8fbdbba12538

#### Monitoring

### Exercise 1 - Deployments

[Exercise on Katacoda](https://killercoda.com/decoder/scenarios/k8s-deployments)

### Exercise 2 - Persistent Storage

[My Medium Blog](https://itnext.io/kubernetes-explained-deep-enough-storage-eb16a66483c2)

### Exercise 3 - Configuration

[Exercise on Katacoda](https://killercoda.com/decoder/scenarios/k8s-configuration)

### Exercise 5 - Services

[Exercise on Katacoda](https://killercoda.com/decoder/courses/k8s-networking/k8s-networking-services)

### Exercise 6 - Putting it all together

[Source Repository](https://github.com/Piotr1215/pwa-sample)

Clone the repository and deploy sample app to AKS cluster

### Bonus Exercise

I don't want to hand craft all those yaml files, I've already learned docker and docker compose!! Why do I have to learn new syntax again?!

Well, good news, you don't have to. If you have an existing docker-compose.yaml file, you can use `kompose` CLI to convert them to native Kubernetes resources.

Try it out yourself:

- clone sample repository: https://github.com/ilearnazuretoday/docker-compose.git
- [install kompose](https://kompose.io/installation/)
- run `kompose convert`
- create resources on the cluster `kubectl create -f .`

## Bonus Material

Here is list of free services and programs to play around with Kubernetes and Docker

- **Local** installation with [Minikube](https://minikube.sigs.k8s.io/docs/) or [MicroK8s](https://microk8s.io/)
- **Local** installation with [Kind](https://kind.sigs.k8s.io/) Kubernetes IN Docker
- **Local** installation with [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/)
- **Local** installation with [Docker Desktop](https://www.docker.com/products/docker-desktop) on Windows, Mac or Linux
- **Local** installation with [k3s](https://github.com/k3s-io/k3s) [on an old laptop/pc](https://itnext.io/how-to-create-kubernetes-home-lab-on-an-old-laptop-1de6cc12c13e)

- **Remote** cluster with [Katakoda](https://killercoda.com/)
- **Remote** cluster or local installation with [LXC Containers](https://linuxcontainers.org/)
- **Remote** cluster [PWK — Play With Kubernetes](https://labs.play-with-k8s.com/)
- **Remote** docker [Interactive online docker environments on demand: docker](https://labs.play-with-docker.com/)
