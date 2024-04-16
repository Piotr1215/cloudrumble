---
title: "5 Static Websites Deployment Options"
date: 2020-11-09T21:01:19+02:00
tags: ["devops", "deployment"]
---

![intro-pic](https://cdn-images-1.medium.com/max/12032/1*T1tAElaHDl_mwUOSvdguTw.jpeg)
_Photo by [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/server?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

Static websites have become a mainstream content delivery medium consumed by modern browsers. In this blog, we will look at different ways of deploying a sample static website using automated CI/CD pipelines and different hosting providers.

<!--truncate-->

The sample website is designed using [Blazor ](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)and compiled using [Web Assembly](https://en.wikipedia.org/wiki/WebAssembly) with [PWA](https://en.wikipedia.org/wiki/Progressive_web_application) option on. This shows that not only simple websites can be delivered as static content but also potentially complex web apps benefit from this delivery mechanism.

## Prerequisites

If you want to follow along you can check out [my git repository](https://github.com/Piotr1215/pwa-sample) with GitHub actions and [Docker Hub](https://hub.docker.com/repository/docker/piotrzan/blazorindocker) with deployment scripts.

All builds and deployments are automated and triggered based on a commit to the master branch of a GitHub repository. For deployment to Netlify and Surge. You will need to create accounts in both hosting providers and use GitHub actions templating feature to substitute variables in deployment manifests with content from Secrets. To access and set up secrets go to the Project Settings page and find the Secrets tab.

![GitHub Secrets Management in a Project](https://cdn-images-1.medium.com/max/3148/1*7cONnbGKXAvpWeOTgHRtjA.png)

## Motivation

My motivation to write this blog was to present different deployment options for static content and introducing the topic of modern content delivery mechanisms available for free.

Every build and deployment is fully automated and takes advantage of the “pipelines as code” concept where each step within the CI/CD pipeline is represented as a section of a YAML file. This file can be checked into a repository alongside your source code and versioned and maintained as one of the artifacts.

Let’s look at different deployment options in more detail. Each option has a corresponding yaml file details steps needed to build and deploy the site.

## Deployment options

### 1. Deploying to GitHub Pages

[GitHub pages](https://pages.github.com/) is a build-in deployment option in GitHub.

### 2. Deploying to Netlify

[Netlify](https://www.netlify.com/) is championing a development model called [JAM Stack](https://jamstack.org/) which is a pre-built static website using APIs for personalized content. JAM Stack stands for **JavaScript APIs Markup.**

Neflity guide to deploying static sites: [https://docs.netlify.com/site-deploys/create-deploys/](https://docs.netlify.com/site-deploys/create-deploys/)

### 3. Deploying to Docker Hub

Why would we want to deploy a web page to a docker container? Portability is one answer, once content has been packaged into a docker image it is easy to run on any OS with no external configuration needed. It is also a first step towards running the workload on a Kubernetes cluster.

### 4. Deploying to Public Cloud (Azure)

Azure Storage Account offers an interesting feature for hosting static websites directly in a blob container, it is easy to add custom domain or CDN on top of the container.

### 5. Deploying to Surge

Deployment to Surge is very similar to the deployment to Netlify. One additional step is installation of node. Surge offers a very quick user onboarding and a simple CLI to deploy pages quickly even without CI/CD. Just to be clear, Netlify offers same functionality but is a bit more involving as far as account creation is concerned.

Getting started with Surge: [https://surge.sh/help/getting-started-with-surge](https://surge.sh/help/getting-started-with-surge)

## Conclusion

We have seen how different hosting platforms can be easily integrated with fully automated CI/CD pipeline triggered on commit to our GitHub Project. Of course each deployment can be triggered manually and each hosting provider offers free tiers. It is worth noting that CI/CD pipelines do not require GitHub actions, in fact the Azure pipeline is triggered from within Azure DevOps.

All of the providers offer additional services such as custom domains, SSL certificates and analytics.

Rapid content delivery becomes one of the fundamental modern DevOps practices and it is very easy to take advantage of many offerings in the space of hosting and delivering static content.
