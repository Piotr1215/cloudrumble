---
title: Introduction
sidebar_label: Introduction
sidebar_position: 0
tags:
    - Intro
    - Info
---

### Introduction

This documentation and accompanying [GtiHub Repo](https://github.com/Piotr1215/dca-prep-kit) is my way of learning, making notes and in the same time giving back to great open source community. Try it yourself, just a few markdown files and you will have a useful handbook for learning and reference later on.

Sections below contain my notes and diagrams as well as sample commands, cheat sheets and tips and tricks. This is by definition an opinionated learning material, but I hope you will find it useful on your journey to learning and passing Docker Certified Associate exam.

Please let me know in comments if you spot an error and feel free to do a PR if you would like to contribute to the repo.

I wish you best of luck on getting all IT Certifications you set out to get :)

Each section corresponds to exam topics. [`Plantuml` diagrams](https://plantuml.com/)  (component, sequence, minimap) help visualize and better understand architectural concepts in Docker, Docker Swarm and Kubernetes. All diagrams are available in [Diagrams](https://github.com/Piotr1215/dca-prep-kit/tree/master/diagrams) folder.

:::note
If you are new to Docker, check my post about [Docker basics](https://medium.com/faun/a-gentle-introduction-to-docker-and-containers-2e67b1832918)
:::

For every exam I follow similar approach as outlined here below

### Find good training material

This is a key step, preparation for every exam requires focus and commitment. In reality we rarely have unlimited time on our hands and often lean on weekends, so having a training material that is tailored to our needs is essential. In each exam section, i have selected a few training materials that I used and were helpful in passing the exam.

### Go though mock questions and exams

It is important to exercise as much as possible and go thought questions and mock exams. Take advantage of free online sandboxes or your own test environments to experiment and practice.
Here are examples of Kubernetes and Docker sandboxes:

- **Local** installation with [Minikube](https://minikube.sigs.k8s.io/docs/) or [MicroK8s](https://microk8s.io/)
- **Local** installation with [Kind](https://kind.sigs.k8s.io/) Kubernetes IN Docker
- **Local** installation with [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/)
- **Local** installation with [Docker Desktop](https://www.docker.com/products/docker-desktop) on Windows, Mac or Linux
- **Local** installation with [k3s](https://github.com/k3s-io/k3s) [on an old laptop/pc](https://itnext.io/how-to-create-kubernetes-home-lab-on-an-old-laptop-1de6cc12c13e)
- **Remote** cluster with [Killercoda](https://killercoda.com/)
- **Remote** cluster with free credits on any public cloud provider, 3 most popular ones: Azure [AKS](https://docs.microsoft.com/en-us/azure/aks/), Google Cloud [GKE](https://cloud.google.com/kubernetes-engine/), AWS [EKS](https://aws.amazon.com/eks/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&eks-blogs.sort-by=item.additionalFields.createdDate&eks-blogs.sort-order=desc)
- **Remote** cluster or local installation with [LXC Containers](https://linuxcontainers.org/)
- **Remote** cluster [PWK — Play With Kubernetes](https://labs.play-with-k8s.com/)
- **Remote** docker [Interactive online docker environments on demand: docker](https://labs.play-with-docker.com/)

:::tip
 Just a small hint, once you bootstrap Kubernetes, you can use my [_portable kubectl in docker image_](https://itnext.io/portable-kubernetes-management-with-kubectl-in-docker-cb861a2c3c02) to run kubectl with diagnostic tools and aliases.
:::

Here are easy steps to run the container:

```bash
# Run container on same network as host
docker run -d --network=host --name=kubectl-host --rm -it piotrzan/kubectl-comp:zsh

# Copy over Kubernetes config file
kubectl config view --raw > config
docker cp ./config kubectl-host:./root/.kube

# Attach shell to running container
docker attach kubectl-host
```

Or simpler version with volume mount

```bash
# .kube/config is a symling to /etc/kubernetes/admin.conf
docker run --network=host --name=kubectl-host -v /etc/kubernetes/admin.conf:/root/.kube/config --rm -it piotrzan/kubectl-comp:zsh
```

### Know documentation well

Knowing the documentation of product/system you are learning about is critical. I usually arrange all topics into self-describing bookmarks. Most of them are available online.

If you would like to have same bookmarks, please use my gist below and import them from file. Bookmarks are arranged in subfolder corresponding to exam topics:

:::note
 [DCA Bookmarks GIST](https://gist.github.com/Piotr1215/75b0105e020b740480a7d85e4e5e3dd7)
:::

### Make notes

Making notes is easy, making good notes a bit more difficult. To make best of learning notes, I follow this 5 step approach:

| **Notes Level** | **How to** | **When to use** |
|---|---|---|
| 1. Regular notes | Typically copy and paste or direct link. | Use for low importance/easy to remember topics. |
| 2. Highlight with formatting | Use highlighting or other formatting techniques. | Use for topics with large volume of material to highlight important bits. |
| 3. Visual representation | Create diagrams, mind-maps and other visual representation of the topic. | Use for complex topics, typically architecture and high level design. |
| 4. Visual representation with summary | Create diagrams, mind-maps and other visual representation of the topic with summary in your own words. | Use for complex topics that you need to understand on a deep level. |
| 5. Design to teach | Use all the above techniques, but always ask youself a question, how can I teach this topic to anyone in best possible way? Typically you would create a blog, youtube video or engage directly with community | Use for very complex topics or the ones you wish to became expert in. By far making notes and content in a way that is designed to teach someone is the best ways to learn. |

### Additional Resources

Check out my GitHub profile where you can find links to other content I create

[Other Content](https://raw.githubusercontent.com/Piotr1215/Piotr1215/main/README.md)
