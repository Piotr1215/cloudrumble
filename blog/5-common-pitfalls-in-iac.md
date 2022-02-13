---
title: "5 Common Pitfalls in Iac"
date: 2022-08-02T01:07:36+02:00
tags: ['terraform', 'iac']
---

![Image by [Elchinator](https://pixabay.com/users/elchinator-10722855/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4280758) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4280758)](https://cdn-images-1.medium.com/max/3840/1*7RTz2NJ_PVuxU8_b7gNSKg.jpeg)

## 5 common pitfalls in Infrastructure as Code

## Introduction

Modern, cloud-native infrastructure can be created and destroyed within minutes. It can be scaled up and down depending on load and usage patterns.

<!--truncate-->

**Infrastructure as Code (IaC) **is a common pattern where virtualized infrastructure and auxiliary services can be managed using configuration expressed in almost any language, usually hosted in a source code repository.

### Why is this important?

IaC enables automated, repeatable and reliable creation and maintenance of any virtualized infrastructure. If you are interested to learn more about available tools and practices, here is a list to get you started:

Terraform, Pulumi and Crossplane all support multiple providers and are great for operating cross-cloud.

Crossplane takes a very interesting approach to IaC and leverages native Kubernetes constructs and automatically “inherits” rich Kubernetes ecosystem and tooling. Oh and it also has the coolest logo :).
[**Introduction - Terraform by HashiCorp**
*Welcome to the intro guide to Terraform! This guide is the best place to start with Terraform. We cover what Terraform…*www.terraform.io](https://www.terraform.io/intro/index.html)
[**Pulumi - Modern Infrastructure as Code**
*Setting up the infrastructure to serve a static website is often harder than it seems - but fortunately, this is a task…*www.pulumi.com](https://www.pulumi.com/)
[**Crossplane**
*Crossplane brings Kubernetes-styled declarative and API-driven configuration and management to any piece of…*crossplane.io](https://crossplane.io/)

There are also cloud vendor specific tools and standards

Azure:
[**ARM template documentation**
*Learn how to develop Azure Resource Manager templates and use them to deploy Azure resources*docs.microsoft.com](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/)
[**Farmer :: Farmer**
*Farmer is an easy-to-learn library for rapidly authoring and deploying entire Azure architectures…*compositionalit.github.io](https://compositionalit.github.io/farmer/)
[**Bicep language for Azure Resource Manager templates - Azure Resource Manager**
*Bicep is a language for declaratively deploying Azure resources. You can use Bicep instead of JSON for developing your…*docs.microsoft.com](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/bicep-overview#get-started)

AWS:
[**AWS CloudFormation - Infrastructure as Code & AWS Resource Provisioning**
*Speed up cloud provisioning with infrastructure as code AWS CloudFormation gives you an easy way to model a collection…*aws.amazon.com](https://aws.amazon.com/cloudformation/)

GCP:
[**Cloud Deployment Manager | Google Cloud**
*Create and manage cloud resources with simple templates. View documentation for this product. Google Cloud Deployment…*cloud.google.com](https://cloud.google.com/deployment-manager)

## Common Mistakes

As with every new paradigm shift, it takes time before industry as a whole comes up with set of patterns and adoption strategies. Often times, a lot of companies will try to apply IaC principles in their organization and fail due to common mistakes.

Almost all the mistakes come from lack of mindset change and insufficient cultural shift within the organization. Simply put, we all have a tendency to fall back into well known tracks the moment things became complicated or overwhelming.

### #1 Pets vs Cattle

This mistake happens when servers and other infrastructure assets are treated like fixed resources, tended to, typically with names and IP addresses somewhere in an obscure excel file.

To make the most of cloud native infrastructure consider treating your infrastructure like cattle instead. This way infrastructure becomes an asset or artifact more resembling applications than physical servers.

### #2 Virtualized Data Center

If you have worked previously with physical data centers, you might be tempted to port the same concept to IaC. This is a mistake as data centers are something that cloud providers are worrying about. The abstraction you should be working with is 100% virtualized.

The mental model of data center is very limiting in what could be accomplished with IaC. For example:

* split into multiple providers

* scale compute down to lower cost

* offloading cross cutting concerns to 3rd party services

### #3 Not understanding relation between infrastructure and data

Data is the the most important commodity in modern world, so naturally securing it is at the center of focus for all organizations.

This mistake often results in low IaC adoption due to fear of losing/corrupting data. Here is a very simple step-by-step scenario to show how IaC can be used safely with live, production data.

![](https://cdn-images-1.medium.com/max/2000/1*T9h8DfgPxUPJD_fXopoltA.png)

Understanding that infrastructure can be created and destroyed all the time is the key concept.

### #4 Breaking Dev and Ops

DevOps movement promises faster and reliable software delivery once Dev and Ops are not silos, but rather part of the same continuous, uninterrupted, automated process.

Companies in highly regulated business domains tend to drift towards siloed mentality as it appear to offload and distribute responsibilities and often in practice gives a clear targets in the “blame game”. This is obviously backwards thinking and applies not only to IaC, but also other areas.

In IaC specifically it often means separating development teams and operations.

### #5 Using IaC as fancy deployment scripts

Don’t try to use IaC as a fancy script, like PowerShell or bash to automate creation of the infrastructure. To get most benefits, try to think about your configuration files in the same way as software. It should be properly versioned, has its own CI/CD pipeline, it should be tested and secure. Great benefit of IaC is that you can use same developer workflows as you are used to for software development process.

Also do try to parametrize your IaC code to be more reusable. Configuration tends to increase in complexity and as with any other code, strive to apply DRY principle (Don’t Repeat Yourself).

### #6 Bonus Point: Using IaC as configuration management

This antipattern is likely to come up in day 2 operations with IaC. Once the infrastructure is provisioned and everything is up and running, a request pops up to make a change in the configuration of provisioned resources.

Let’s imagine that your infrastructure is in Azure and want to add a new rule to a network security group (NSG) for your VMs. It is easy enough to achieve with tool like Terraform. This might sound like a good practice at first glance, but in reality creates problems around state reconciliation and drift management. Using IaC tools to manage existing infrastructure’s configuration and settings violates the **immutability principle. **Instead think about the provisioned infrastructure as fully immutable, you can either provision new infrastructure or destroy it and create new one in its place.

This approach simplifies greatly reasoning about the state of infrastructure and helps maintain clear operational model. This of course doesn’t mean that configuration changes are impossible, but instead use dedicated set of tools to manage configuration changes. Tools like Ansible paired with GitOps practices (Flux, ArgoCD, etc) will ensure correct, idempotent change process.

In short, use IaC tools to provision your infrastructure into a desired state. Use tools like Ansible or Consul to manage existing infrastructure’s configuration, detect and remediate configuration drift.

## Final Thoughts

IaC is not a silver bullet and comes with its own challenges, but in the modern era of cloud native computing, there is no better alternative as of yet to manage infrastructure.

Steadily progressing containerization of all workloads and increasing presence of orchestrators like Kubernetes, drives most of the organizations towards more complex software and ever faster rate of changes.

If you are still thinking of adopting some IaC practices within your organization, the time is yesterday.

