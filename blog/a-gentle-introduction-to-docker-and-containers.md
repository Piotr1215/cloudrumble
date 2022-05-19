---
title: "Introduction to Docker"
date: 2020-02-06T20:57:35+02:00
tags: ['docker', 'containers']
---
Continue reading if you are interested in learning about Docker architecture and how containers work.

<!--truncate-->

## Docker Architecture

Let’s introduce a few definitions:

**Images** are blueprints of our application which describe containers content and behavior. Images are immutable with a thin writable layer, this characteristics is one of the most appealing features of containerized workloads.

**Containers are** created based on Docker images and represent the actual instance of an app/service/etc. If you come from OOP programming background you can think about containers as instances of classes and images as classes themselves.

**Docker Daemon** is a Linux background service running on Docker host machine and manages life cycle of Docker containers (creating, running, deleting, etc). In Linux terminology daemon is a process that runs in the operating system usually as a service.

**Docker Client** is Docker’s command line interface (CLI) and facilitates communication between the user and docker daemon using REST API calls. Docker CLI is not the only client, there are plenty of UI implementations such as Portainer of Kinematic.

**Docker Hub or Docker Registry** is simply a registry of Docker images. This registry can be public ( [https://hub.docker.com/](https://hub.docker.com/)) or private hosted on public or private cloud.

Below graphic from docker.com shows how docker architecture works on a high level.

![](https://miro.medium.com/max/1400/1*LRruRBxQ4BhoqdZVDhBlHA.png)

docs.docker.com

## Docker flow

Typically using Docker revolves around consuming images from either public or private repositories and running containers. Another direction is to create Docker images based off of [Dockerfile](https://docs.docker.com/engine/reference/builder/) (other options are also available, for example [using Ansible to create docker images](https://opensolitude.com/2015/05/26/building-docker-images-with-ansible.html)).

![](https://miro.medium.com/max/1400/1*IB2D5DttkabZncd0LndDMg.gif)

## Image Layers

As mentioned before, Docker images are immutable and are constructed by using layers (union file system on Linux). Each layer represents new image put on top of the previous one.

![](https://miro.medium.com/max/1350/1*kkC4rSzgUt148WO136Zy5A.jpeg)

[https://www.docker.com/](https://www.docker.com/)

## VM and Containers

It is worth point out that containers are not a replacement for virtual machines. Both have their uses and strength/weaknesses. In fact it is often beneficial to run containers on virtual machines for maximum flexibility.

The main difference is that containers share underlying OS resources directly without a need for a hypervisor.

![](https://miro.medium.com/max/1400/1*M9PBipNCSsWpS9QfBT1G8Q.png)

[https://www.docker.com/](https://www.docker.com/)

## Learning Resources

There is a lot of great learning resources, but I had most success using below 4:

-   [KodeKloud free Docker for beginners course](https://kodekloud.com/p/docker-for-the-absolute-beginner-hands-on). Excellent FREE training from Mumshad Monnambeth.
-   [Docker curriculum](https://docker-curriculum.com/). If you prefer reading, this is comprehensive and in-depth resource.
-   [Plularsight Courses from Nigel Poulton](https://www.pluralsight.com/authors/nigel-poulton). If you happen to have Plularsight subscription or even want to try for free (10 days). Nigel is a great trainer and his Docker courses are one of the best I ever seen.
-   [Official Docker documentation getting started](https://docs.docker.com/get-started/). Last but not least, what is better than going directly to the source and exploring Docker home page.

## Workshop and hands on labs

If you would like to play with Docker and containers, there is no need to install anything on your machine nor spin up infrastructure in public cloud providers! Below resources enable you to play with Docker directly in your browser

-   [https://killercoda.com/loodse/courses/docker](https://killercoda.com/loodse/courses/docker). Dedicated Docker workshops and hands on guided labs
-   [https://labs.play-with-docker.com/](https://labs.play-with-docker.com/). Interactive environment with Docker installed where you can explore and experiment for free. Environment is active for 4 hours)

## Conclusion

This introduction to Docker and containerized workloads was intended to be just that, an introduction. We haven’t talked about developer experience when developing software using containers, which will be a good subject for next blog and lots of other important topics. Most of the paragraphs were intentionally kept short. I hope to encourage you to explore how using Docker and developing containerized workloads can help you become better software developer, architect or IT professional.

Docker has a lot to offer and space around it is very mature, but most of all it has a very friendly and welcoming community that you could be part of.
