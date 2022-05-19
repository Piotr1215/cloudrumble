---
title: Exercises
sidebar_label: Exercises
tags:
    - Examples
    - practice
---

# Examples and Exercises Setup

The goal is to explain Kubernetes and Docker Swarm topics in a practical way, like storage, deployments, services etc and provide exercises scenarios for everyone to follow along.

The idea is to focus on the core functionality, understand it well enough and exercise along.

If you already watched a few tutorials and maybe created pod or deployment and are ready for next level, those exercises are for you.

If you are new do Kubernetes, but still would like to follow along with the series I highly recommend checking out [Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://www.youtube.com/watch?v=X48VuDVv0do&ab_channel=TechWorldwithNana) from TechWorld with Nana

## Example Files

Exercises and sample code is located in a [separate repository](https://github.com/Piotr1215/dca-exercises). You can either clone it and work directly from command line or use `kubectl` with remote location of a file or folder you want to deploy.

## Structure

Each topic will follow the same structure:

1. How does it work?
2. What Problem does it solve?
3. How to implement it?

## Kubernetes Examples

### Sandbox Setup

There are a lot of different options to play around with Kubernetes for free:

- Local installation with [Minikube](https://minikube.sigs.k8s.io/docs/) or [MicroK8s](https://microk8s.io/)
- Local installation with [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/)
- Local installation with [Docker Desktop](https://www.docker.com/products/docker-desktop) on Windows, Mac or Linux
- Remote cluster with [Killercoda](https://killercoda.com/)
- Remote cluster with free credits on any public cloud provider, 3 most popular ones:
  - [AKS*](https://docs.microsoft.com/en-us/azure/aks/)
  - [GKE](https://cloud.google.com/kubernetes-engine/)
  - [EKS](https://aws.amazon.com/eks/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&eks-blogs.sort-by=item.additionalFields.createdDate&eks-blogs.sort-order=desc)
- Remote cluster or local installation with [LXC Containers](https://linuxcontainers.org/)
- Remote cluster [PWK - Play With Kubernetes*](https://labs.play-with-k8s.com/)

In most of the examples we are going to use PWK, because there is no need to install anything locally and the environment we end up with is powerful enough to get through all examples. Some examples will require cloud provider cluster and those will be done on AKS.

Follow instructions in [This guide](https://github.com/collabnix/kubelabs/blob/master/kube101.md) and setup 3 nodes cluster. 1 master and 2 worker nodes

- `git clone https://github.com/collabnix/kubelabs`
- `cd kubelabs`
- `sh bootstrap.sh`
- Add nodes to cluster by executing command printed at the end of bootstrapping process

> [!ATTENTION]
>
> - PWK is sometimes not responsive, so you need to close session and try again later
> - The guide asks to setup 5 nodes but for our purposes 3 are more than enough (1 master, 2 workers)
> - In case PWK is down or not responsive, I recommend installing Docker Desktop

### Cluster visualization tools

Once the cluster is ready, let's setup some tools:

- Better ``kubectl``: this is [my wrapper around `kubectl CLI`](https://itnext.io/portable-kubernetes-management-with-kubectl-in-docker-cb861a2c3c02) and can be installed with this command:

``` bash
# .kube/config is a symlink to /etc/kubernetes/admin.conf
# running this container as root is only for testing purposes!
docker run --network=host --name=kubectl-host -v /etc/kubernetes/admin.conf:/root/.kube/config --rm -it piotrzan/kubectl-comp:zsh
```

- [Octant](https://octant.dev/) is a VMWare open source cluster visualizer, running in a browser so no local installation is required.

All those tools will allow us to move around the cluster easier and will help us visualize and learn.

## Docker Swarm Examples

All Docker Swarm examples can be done using [Kubelab - Play With Docker](https://labs.play-with-docker.com/).

Follow instructions in [This guide](https://github.com/collabnix/dockerlabs/blob/master/intermediate/swarm/README.md) and choose 3 Managers and 2 Workers setup form instance templates.
