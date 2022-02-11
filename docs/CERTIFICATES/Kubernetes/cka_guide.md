---
title: CKA Certification Guide
sidebar_label: CKA
tags:
    - Kubernetes
    - Certification
---

## Introduction

Recently I have successfully passed exam for [Certified Kubernetes Administrator (CKA)](https://www.cncf.io/certification/cka/) and I would like to share learning tips and tricks as well as resources that helped me prepare and pass the exam.

The only resource needed to pass the exam was [Certified Kubernetes Administrator (CKA) with Practice Tests](https://kodekloud.com/p/certified-kubernetes-administrator-with-practice-tests). Very comprehensive and in depth course that contains all needed information and practice labs to pass the exam! Mumshad, the author of the course and owner of [KodeKloud](https://kodekloud.com/) did really great work designing it.

There is also one more resource I would like to mention, it is not needed to pass or prepare for the exam, but content is really great and it deserves a shout out. Videos from [Just me and Opensource](https://www.youtube.com/user/wenkatn/featured) YouTube channel. Author does really great work creating hands on practical videos tackling various kubernetes related topics.

Practice is very important for the exam, so use every opportunity to get familiar with kubectl command line tool and YAML files. One option is to setup local kubernetes cluster using for example: [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/), [microk8s](https://microk8s.io/docs/) or [kind](https://kind.sigs.k8s.io/). All of those are great options to quickly spin up kubernetes cluster on your machine.

If your machine does not have enough resources or you simply do not want to install anything locally, you can quickly spin up kubernetes cluster in any cloud provider. You can check out my blog where I describe how to setup AKS cluster [https://medium.com/@piotrzan/try-kubernetes-in-cloud-for-free-e5e431c507a7](https://medium.com/@piotrzan/try-kubernetes-in-cloud-for-free-e5e431c507a7), check my GitHub repos with instructions how to deploy managed kubernetes on [Azure](https://github.com/Piotr1215/terraform-aks) or [GCP](https://github.com/Piotr1215/terraform-gcp)

During the exam you are required to demonstrate practical knowledge of kubernetes and all this under time pressure. Each second counts, so one of the most important tips that helped me were those about speed.

Make sure to setup alias for kubeclt and bash/zsh completion. This information is available on the kubernetes documentation page. It will help you be much faster with commands and most importantly completion sources pod and other kubernetes objects names that you don’t need to copy or type.

<!-- select:start -->
<!-- select-menu-labels:Shell -->

### --bash--

```bash
source <(kubectl completion bash) # setup autocomplete in bash into the current shell, bash-completion package should be installed first.
echo "source <(kubectl completion bash)" >> ~/.bashrc # add autocomplete permanently to your bash shell.
```

### --zsh--

```bash
source <(kubectl completion zsh)  # setup autocomplete in zsh into the current shell
echo "[[ $commands[kubectl] ]] && source <(kubectl completion zsh)" >> ~/.zshrc # add autocomplete permanently to your zsh shell
```
<!-- select:end -->

You can also use a shorthand alias for kubectl that also works with completion:

```bash
alias k=kubectl
complete -F __start_kubectl k
```

During the exam you can have one additional chrome tab open with kubernetes documentation page, kubernetes blog and GitHub artifacts for the page. It helped me to prepare bookmarks to quickly locate part of YAML to copy and paste to terminal.

You can get the bookmarks from [my GitHub gist](https://gist.github.com/Piotr1215/016ba7218a1a949574786fb9b92382c1) and import them into your browser! Best way is to clone the gist as I’m making minor updates.

A lot of exam tasks required editing existing YAML files and ability to use vim (in my case) or nano text editors quickly and efficiently is very important. There are plenty of pages with keyboard shortcuts.

Each question is “weighted” and for CKA you have on average 6 minutes per question. If you find yourself stuck, it’s better to note question number in notepad available within the environment and come back to it later.

I’m not sure about you, but performance based exams always make me nervous and stress often gets best of me. It is helpful to remember that CKA gives you one free retry, so even if you don’t pass first time, don’t worry.

This is not strictly needed for the exam (at least I didn’t need to use the below commands), but it might be useful:

> I wish you best of luck in getting your CKA certification!
