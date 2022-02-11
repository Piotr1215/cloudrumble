---
title: "5 Unusual Docker Usecases"
date: 2021-08-02T01:09:18+02:00
tags: ['docker', 'linux']
image: https://cdn-images-1.medium.com/max/6032/1*8NKs9ODk9gzzFbvEcivMGQ.jpeg
---

![intro-pic](https://cdn-images-1.medium.com/max/6032/1*8NKs9ODk9gzzFbvEcivMGQ.jpeg)
*Photo by [Antoine Petitteville](https://unsplash.com/@ant0ine?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

## Introduction

[Docker ](https://www.docker.com/)introduced containers technology as mainstream around 2013. Since then, containerization became an integral part of the cloud and digital transformations. Nowadays most of the traditional server workloads such as web APIs, web apps (broadly speaking server side workloads), are containerized. Heck, even Microsoft saw the writing on the wall and since 2016 windows containers are also there (albeit a bit on the heavy side). 2017 saw the introduction of Kubernetes, a container orchestration, which even more cemented already strong position of containers as compute workhorses.

<!--truncate-->

## Basic use cases

We are living in a golden age of containerization, so much so, that container start to move from more traditional server workload scenarios to more exotic use cases.

Before we jump into those, let’s answer a question as to why containers and related technologies are so popular. In my opinion, it boils down to those 3 factors:

* **Portability**: No more “but it runs on my computer” problems. If it runs, it will run on any [OCI compliant container runtime](https://opencontainers.org/).

* **Ease of configuration**: Docker images (blueprints for containers) package not only application/service binaries, but also all its dependencies. No more complicated, error-prone configuration word documents send back and forth between Dev and Ops.

* **Standardized Tooling**: Images and containers are fully standardized packaging and runtime mechanism, meaning that tool chains will work everywhere. No more proprietary, complex deployment and development tools that differs from company to company. It can all now be standardized.

## Prerequisites

If you would like to follow along, please install those prerequisites. Please note that I’m using Windows with WLS2, so some installation steps might be different for your OS.

[Docker Desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) will install docker host on our machine and enable us to run the workloads. Once docker is up and running, you might want to make sure that you are running Linux and not Windows containers (right click Docker icon in tray). Once done, proceed to step two, installing Portainer.

![Docker Desktop](https://cdn-images-1.medium.com/max/3788/1*LZlsfD4Mg7fh9wwjG5FRSA.png)

Portainer, a lightweight web UI for managing docker host (and more). To install portainer on Linux, Windows or Mac, [follow this link](https://documentation.portainer.io/v2.0/deploy/ceinstalldocker/). Portainer will help us quickly deploy docker workloads.

To quickly install portainer on Windows WSL2 run the following:

    docker volume create portainer_data

    docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-c

Navigate to localhost:9000set username and password, connect to docker host, and off we go.

![Portainer UI](https://cdn-images-1.medium.com/max/7626/1*KkkHtNj1ozwFc4tr1lS7mg.png)

In order to deploy docker containers we are not going to use imperative docker CLI but rather will be using docker compose to describe and run our applications. Docker compose introduces a declarative way of running containers.
>  To learn more about docker-compose, check [docker compose spec](https://compose-spec.io/)

### #1 Run a UI app in a container

For our first use case we will run a UI app in a container and connect to it via a web browser! Deployment is very easy. We are using Open Source software called [digikam ](https://www.digikam.org/)as an example, but this can be almost anything, like web browsers, Libre Office etc. Follow the instructions form the container page [https://docs.linuxserver.io/images/docker-digikam](https://docs.linuxserver.io/images/docker-digikam)

![Portainer Deployment](https://cdn-images-1.medium.com/max/3038/1*FAT-0ZhSx6QC0ge4TnPFeg.png)

 1. Navigate to Stacks -> Add Stack

 2. Give a name for your app (stack)

 3. Adjust config settings

 4. PUID and GUID are the respective user ID and group ID that runs docker host. You can check it by opening WSL console and typing id

 5. Adjust TZ to yours

 6. Create a folder for configuration, I create folder in my home directory with a quick command mkdir -p /directory/config

 7. Choose a port that is not taken or blocked by firewall. Remember ports are always from outside into container so 3001(port on host):3000(port in container)

### #2 Run a Linux desktop environment in a container

What, what? Linux in a container? Indeed and although practical applications of this approach might be questionable, it’s definitely fun :). So to “clarify ”, **we are running a Linux desktop in a container, that runs in a program, that runs on Linux, which in turn runs on Windows… and we will access the Linux server via a browser! Phew.**

[https://docs.linuxserver.io/images/docker-webtop](https://docs.linuxserver.io/images/docker-webtop)

![Photo by [Yogi Purnama](https://unsplash.com/@yogipurnama?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/superman?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/9216/1*K9On-N9UwhoN8vYeUDJzQQ.jpeg)

One possible use case of running fully fledged Linux desktop as a containers is that you can test various Linux distribution and desktop environments (DE) before installing Linux on your machine.

### #3 Run a CLI tool in a container

Very often a CLI tool or set of tools are needed to diagnose or perform some tasks. Linux provides an easy way to install tools, but if you want to add some customization, aliases etc, it is time consuming. Containers to the rescue!

I have created and blogged about one such tool that enables Kubernetes management in a highly customizable way with kubectl running in a docker container. [Check it out](https://itnext.io/portable-kubernetes-management-with-kubectl-in-docker-cb861a2c3c02) if u are interested.

### #4 Run your programming environment in a container

If you are a software developer, you definitely know the pain of installing all kinds of dependencies that your project needs to compile or start. This is no longer the case if you move your development into a container!

Check out [Visual Studio Code remote containers](https://code.visualstudio.com/docs/remote/containers) extension as well as [GitPod ](https://www.gitpod.io/)project. You can also run tests inside containers!

### #5 Run Kubernetes in a container

With a KIND project (Kubernetes IN Docker) you can run whole kubernetes cluster in a Docker container.

![KIND](https://cdn-images-1.medium.com/max/2000/1*Y8KbXGe_-hhFeJx2jGN02Q.png)

This enables us to quickly create disposable clusters for development or running tests or CI/CD processes.

## Conclusion

Containers can be used for much more than just server side workloads. Some of the use cases are more of a fun way to play with containers (like webtop), but some are very useful (like developing in containers or KIND).

Check out [awesome docker](https://github.com/veggiemonk/awesome-docker) list to learn more about Docker resources.

Also big shoutout to the team behind [linuxserver containers](https://www.linuxserver.io/). Lots of great content and ideas.
