---
title: "Cloud Native Developer Workflow"
date: 2020-11-09T21:01:56+02:00
tags: ['docker', 'kubernetes']
---

![Photo by [Hack Capital](https://unsplash.com/@hackcapital?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/software?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/10944/1*vJY3xQeFfVqL1UNlqQVVzg.jpeg)

## Cloud Native - Developer Workflow

### Software Development Lifecycle with Kubernetes and Docker

### Introduction

Software development tooling and processes have evolved rapidly in last decade to meet growing needs of developers. On top of mastering, often a few, programing languages and paradigms, software developers must learn to navigate increasingly complex landscape of tools and processes.

<!--truncate-->

My motivation for writing this blog was an introduction to a concept of software development in the Cloud Native ecosystem. I’m going to be focusing more in depth on software development for containerized workloads orchestrated by Kubernetes.

### Programming languages

According to Stack Overflow Developer Survey for 2020 there is a high chance that if you are reading this, you use JavaScript, HTML and CSS. Most of you will also use SQL, Python, Java or C# and number of scripting languages. There is also a high chance that some of you will use mix of frontends and backend languages.

![Source Stack Overflow [Developer Survey 2020](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages)](https://cdn-images-1.medium.com/max/4456/1*dotSyt4LayI2f-kybAVr4g.png)

This is already a lot to learn and keep track of, as the languages evolve. Most of the languages grow their own ecosystem of reusable code packages, SaaS offerings, IDEs, etc. As developers you need to keep track of all this to deliver value to customers faster and faster.

### Cloud Native Bazaar

In order to support growing complexity of distributed systems development and operationalization, cloud native ecosystem developed amazing open source projects to move faster and help IT professionals benefit from cloud native paradigm.

What is cloud native? CNCF gives us an [official definition](https://github.com/cncf/toc/blob/master/DEFINITION.md):
>  Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.
>  These techniques enable loosely coupled systems that are resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably with minimal toil.

![[CNCF Cloud Native Landscape](https://landscape.cncf.io/)](https://cdn-images-1.medium.com/max/15840/1*JNKMVA3xxtdT5OLcO_NiAw.png)

The above list of products is constantly growing and evolving. It is an extremely busy space and it’s hard to keep up the pace.

Let’s refocus on the role of developer in this environment. Now developers not only focus on programming languages, but also need to take under consideration a lot of other tools. One of the most prominent tools from CNCF landscape that reshaped how software is hosted, operated and delivered is Kubernetes.

I encourage developers to learn about Kubernetes and Docker, but very often thigh schedules and deliverables prevent this. For those people who do not want or cannot get in depth into Kubernetes but need to develop apps that run on it, there are tools to help maintain developer workflow and minimize the need to interact with Kubernetes.

### “Standard” Developer Workflow with Containers/Kubernetes

On a high level each software developer will follow those basic steps:

 1. **Development Tools and IDEs:** Install and configure your favorite code editor or IDE (VS Code, Eclipse, Visual Studio, Atom, Notepad++, etc). This often includes installing plugins, linters, syntax highlining and other addons. IDE’s plugins and addons might vary from project to project so updates and tweaks are required.

 2. **Setup Development Environment :**Install locally hosting environment for whatever you are developing. If you are developing Web App, most likely web browser is already installed on your machine, but if you develop database you might need to install it too.

 3. **Run code to see if it works: **Run code locally and make sure everything is working. Maybe use tools like Postman or Insomnia to test calls to your API. Maybe you need to install SQL Express or other database tools. If whatever you are developing needs to interact with other services, they must be ran or installed too.

 4. **Inner Development Loop. **Running your code locally, debugging and making sure everything works as intended is the core of every developer’s activity. This loop must be fast, efficient and provide instant feedback. There are plenty of patterns that help in this area, like hot reloading after source code changes, running your unit tests automatically on file save, etc. In ideal scenario, the loop should consist of 3 steps: **Code -> Build -> Test -> Commit. **Let’s look closer how this loop looks like for cloud native workloads.

* **Code**

* **Build**

* Build docker container

* Optional 1: Deploy to local docker host or Kubernetes cluster (minikube, Docker on Windows, Microk8s, etc)

* Option 2: Pull Image, Push Image to remote image repository, apply Kubernetes deployment, wait for CI/CD pipeline, verify that it works

* **Test**

* Need to wait for all artifacts to move into place before doing integration tests

* **Commit **once committed, a new image version will be uploaded to artifacts repository and either docker instance or Kubernetes pod will be updated with new content

From there we are far from “done”. Hopefully there are end to end tests, security checks and other steps running as part of your deployment pipeline.

As long as hosting environment can be easily emulated on local developer machine and system is monolithic, the above workflow is fine, but what if you are working with a modern distributed system built using [microservices-oriented architecture](https://itnext.io/the-fundamentals-of-microservices-oriented-architecture-8779d756f70f), service oriented architecture or serverless approach(or combination of all).

In fact modern software development moves towards Cloud Native model. Most of the workloads run in containers and Kubernetes. So, do you need to download and configure half of the internet on your local machine ;) to develop a simple app just because it’s running in docker container and in Kubernetes?! Well you surely can and many developers still do, but there is a better way!

### Cloud Native Development Workflow with Containers/Kubernetes

Let’s try to revisit the “standard” software development workflow and see how we can adjust it to take advantage of Cloud Native paradigm:

 1. **Development Tools and IDEs: **Use service like [Gitpod](https://www.gitpod.io/) or [GitHub Codespaces](https://visualstudio.microsoft.com/services//github-codespaces/) or simply encapsulate your development environment in an image and run a docker container to quickly spin up your development environment. This is independent from your local setup. Now you are ready to start developing in VS Code Electron Client, VC Code in browser or Visual Studio 2019 in a remote environment. Your machine does not need any SDKs, frameworks, linters, IDE plugins and addons or any tooling installed locally. Everything is pre-packaged in a containerized, repeatable environment.

 2. **Setup Development Environment: **Use tools like [Okteto](https://okteto.com/), [DevSpace](https://devspace.sh/), [Skaffold](https://github.com/GoogleContainerTools/skaffold) or many others to bring your development and debugging into remote Kubernetes clusters without needing to install Docker or Kubernetes locally.

 3. **Run code to see if it works:** Let your tools work for you and run and debug code directly in remote Kubernetes cluster. Nothing needs to be installed locally, in some cases not even docker engine.

 4. **Inner Development Loop. **Inner development loop now can look like regular 4 step development loop!

* **Code **directly in container instance or Kubernetes

* **Build **is done remotely in a container instance or Kubernetes

* **Test **can be done equally seamlessly as everything is already in a container instance or Kubernetes

* **Commit **once committed, a new image version will be uploaded to artifacts repository and either docker instance or Kubernetes pod will be updated with new content

Essential steps of the workflow stay the same, but now we can improve each step by taking advantage of what Cloud Native paradigm has to offer.

### Closing thoughts

Software development workflow is something that every developer is very familiar with. We follow same proven steps from project to project often not realizing that there are better, more optimized ways of adjusting our workflow especially when working with modern, Cloud Native projects.

In next blogs we will take a closer look at some of the tools and learn how we can benefit from Cloud Native paradigm and modernize development workflow to develop software faster and with less friction.

