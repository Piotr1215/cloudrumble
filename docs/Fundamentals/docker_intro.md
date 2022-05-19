---
title: Introduction to Docker
sidebar_label: Docker
tags:
    - Docker
    - Containers
---

# A gentle introduction to Docker and containers

![Photo by frank mckenna on Unsplash](https://miro.medium.com/max/1250/1*0iIXTpckP8jspZMIn9ur2Q.jpeg)
*Photo by [frank mckenna](https://unsplash.com/@frankiefoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/container?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

A gentle introduction to Docker and containers

There are plenty of great resources to learn how Docker works, what are containers and how to benefit from them, but it's often focused on either business side or on developers/administrators.

I would like to take a different approach and provide an introduction to both, business and technically-minded readers.

At the end of reading this blog you will

* know how Docker works on a high level

* understand benefits of using containerized workloads

* have a hands-on experience with Docker

* learn where to find more information and training resources

This article is also published as slide deck on slides.com, feel free to use [the presentation](https://slides.com/decoder/docker-workshop#/) for learning or maybe showing to your colleagues or team what Docker and containers are all about.

In this section we talk about what problems Docker solves. How it helped real companies with their digital transformation and we will look into benefits that Docker and containerized workloads bring.

## World before Docker and containerized workloads

If you are long enough in IT and software development business, either as administrator, developer or architect, you will be able to relate to the below image. Before Docker and idea of packaging software into containers, all workloads required their own set of dependencies (often conflicting with other components).

On the other hand, you might also remember times before virtualization, where provisioning meant actually acquiring expensive physical servers, waiting often for months. Virtualization solved this problem to some degree, but virtual machines were still slow to boot and wasted resources.

Behold, the matrix of Hell!

![The matrix from hell. Source: everywhere on internet, I couldn't find original source.](https://cdn-images-1.medium.com/max/3392/1*yzUhpiCx-8YalwCtNlLATw.jpeg)*The matrix from hell. Source: everywhere on internet, I couldn't find original source.*

## Benefits of Docker and containers

Matrix of hell becomes matrix of containers. Docker helps us ΓÇ£packageΓÇ¥ each software component as a standardized container image and run it with a very high degree of portability in a repeatable and reliable fashion.

![The matrix from hell. Source: everywhere on internet, I couldn't find original source.](https://cdn-images-1.medium.com/max/2000/1*er0oCxy3GoZqGLcbnxj7ag.png)*The matrix from hell. Source: everywhere on internet, I couldn't find original source.*

I find that main benefits of using Docker and containerized workloads are:

![](https://cdn-images-1.medium.com/max/2114/1*4B2OQFLhyt1k7J0Y0-lpJQ.png)

This is not all, there are other important aspects where containers help:

* Standardization and Productivity

* Maintainability

* Simplicity enabled by immutability

* Rapid Deployment

* Multi-Cloud Platforms

* Workloads isolation

### Docker success stories

Let's look at some of the early adopters of Docker and their success stories. Those companies were able to improve their processes often to a dramatic degree!

Information source: [http://techgenix.com/containers-success-stories/](http://techgenix.com/containers-success-stories/)

***ADP***

![](https://cdn-images-1.medium.com/max/2000/1*Av3r-S6n_kfNjoAu-jE6KA.png)

![](https://cdn-images-1.medium.com/max/2000/1*ZefzSci9-CAnTcHLZ9kIGA.png)

**Lessons from ADP:**

Increased developers productivity due to:

* faster feedback during development cycle

* standardized development environments

***PayPal***

![](https://cdn-images-1.medium.com/max/2000/1*F0-sKDR7W8KlRNxomys-5g.png)

![](https://cdn-images-1.medium.com/max/2000/1*e11zoL8QJLkuwqq5DupyuQ.png)

**Lessons from PayPal**

* Enable development Teams transition to containers by having a dedicated ΓÇ£platformΓÇ¥ team to help and guide containerization

* By decoupling Dev and Ops concerns developers can be more efficient and operations can upgrade/manage systems easier

***MetLife***

![](https://cdn-images-1.medium.com/max/2000/1*a48GXc9pmt9f_SsXtm7bzQ.png)

![](https://cdn-images-1.medium.com/max/2000/1*RdtFNXOcddAM25xpywzOTQ.png)

![](https://cdn-images-1.medium.com/max/2000/1*yF4ZTjwsJWnmqnrnGp6U7w.png)

***Lessons from MetLife***

* Enable microservices-oriented architecture and gradual modernization of legacy applications

* Take advantage of modern cloud offerings to improve development speed and scale

Continue reading if you are interested in learning about Docker architecture and how containers work.

## Docker Architecture

Let's introduce a few definitions:

<u>**Images**</u> are blueprints of our application which describe containers content and behavior. Images are immutable with a thin writable layer, this characteristics is one of the most appealing features of containerized workloads.

<u>**Containers are**</u> created based on Docker images and represent the actual instance of an app/service/etc. If you come from OOP programming background you can think about containers as instances of classes and images as classes themselves.

<u>**Docker Daemon**</u> is a Linux background service running on Docker host machine and manages life cycle of Docker containers (creating, running, deleting, etc). In Linux terminology daemon is a process that runs in the operating system usually as a service.

<u>**Docker Client**</u> is Docker's command line interface (CLI) and facilitates communication between the user and docker daemon using REST API calls. Docker CLI is not the only client, there are plenty of UI implementations such as Portainer of Kinematic.

<u>**Docker Hub or Docker Registry**</u> is simply a registry of Docker images. This registry can be public ( [https://hub.docker.com/](https://hub.docker.com/)) or private hosted on public or private cloud.

Below graphic from docker.com shows how docker architecture works on a high level.

![docs.docker.com](https://cdn-images-1.medium.com/max/2000/1*LRruRBxQ4BhoqdZVDhBlHA.png)*docs.docker.com*

## Docker flow

Typically using Docker revolves around consuming images from either public or private repositories and running containers. Another direction is to create Docker images based off of [Dockerfile ](https://docs.docker.com/engine/reference/builder/)(other options are also available, for example [using Ansible to create docker images](https://opensolitude.com/2015/05/26/building-docker-images-with-ansible.html)).

![](https://cdn-images-1.medium.com/max/2000/1*IB2D5DttkabZncd0LndDMg.gif)

### Image Layers

As mentioned before, Docker images are immutable and are constructed by using layers (union file system on Linux). Each layer represents new image put on top of the previous one.

![[https://www.docker.com/](https://www.docker.com/)](https://cdn-images-1.medium.com/max/2000/1*kkC4rSzgUt148WO136Zy5A.jpeg)*[https://www.docker.com/](https://www.docker.com/)*

## VM and Containers

It is worth point out that containers are not a replacement for virtual machines. Both have their uses and strength/weaknesses. In fact it is often beneficial to run containers on virtual machines for maximum flexibility.

The main difference is that containers share underlying OS resources directly without a need for a hypervisor.

![[https://www.docker.com/](https://www.docker.com/)](https://cdn-images-1.medium.com/max/2118/1*M9PBipNCSsWpS9QfBT1G8Q.png)*[https://www.docker.com/](https://www.docker.com/)*

## Learning Resources

There is a lot of great learning resources, but I had most success using below 4:

* [KodeKloud free Docker for beginners course](https://kodekloud.com/p/docker-for-the-absolute-beginner-hands-on). Excellent FREE training from Mumshad Monnambeth.

* [Docker curriculum](https://docker-curriculum.com/). If you prefer reading, this is comprehensive and in-depth resource.

* [Plularsight Courses from Nigel Poulton](https://www.pluralsight.com/authors/nigel-poulton). If you happen to have Plularsight subscription or even want to try for free (10 days). Nigel is a great trainer and his Docker courses are one of the best I ever seen.

* [Official Docker documentation getting started](https://docs.docker.com/get-started/). Last but not least, what is better than going directly to the source and exploring Docker home page.

## Workshop and hands on labs

If you would like to play with Docker and containers, there is no need to install anything on your machine nor spin up infrastructure in public cloud providers! Below resources enable you to play with Docker directly in your browser

* [https://killercoda.com/loodse/courses/docker](https://killercoda.com/loodse/courses/docker). Dedicated Docker workshops and hands on guided labs

* [https://labs.play-with-docker.com/](https://labs.play-with-docker.com/). Interactive environment with Docker installed where you can explore and experiment for free. Environment is active for 4 hours)

## Conclusion

This introduction to Docker and containerized workloads was intended to be just that, an introduction. We haven't talked about developer experience when developing software using containers, which will be a good subject for next blog and lots of other important topics. Most of the paragraphs were intentionally kept short.
