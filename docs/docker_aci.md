# Easily Deploy Containers to Azure directly from your Desktop

## Introduction

Containers are now a mature solution providing additional level of infrastructure abstraction. In many cases containers can replace workloads traditionally powered by virtual machines.

In this blog we are going to look at [Azure Container Instances](https://azure.microsoft.com/en-us/services/container-instances/) and showcase how fast and easy it is to deploy containers directly from your docker CLI to Azure.

## Prerequisites

If you would like to follow along, you will need to have Azure subscription, Azure CLI and Docker Desktop instance.

- [Get free Azure Subscription](https://azure.microsoft.com/en-us/free/)
- [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

## What are Azure Container Instances

Azure Container Instances is a compute offering that bridges the gap between lightweight Azure Functions and more complex, but fully fledged Azure Kubernetes Service.

ACI is best suited for containerized workloads that can operate in isolation, simple apps, batch jobs including data science models, all kinds of tasks automation and integration scenarios.

![Azure ACI Architecture](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/azure-aci-architecture.puml&fmt=svg)
_Source_: https://docs.microsoft.com/en-us/azure/container-instances/container-instances-container-groups

### When it is useful

- Fast startup: Launch containers in seconds.
- Per second billing: Incur costs only while the container is running.
- Hypervisor-level security: Isolate your application as completely as it would be in a VM.
- Custom sizes: Specify exact values for CPU cores and memory.
- Persistent storage: Mount Azure Files shares directly to a container to retrieve and persist state.
- Linux and Windows: Schedule both Windows and Linux containers using the same API.

## Workflow

We are going to deploy a .NET Core 5 API. The idea is that with docker CLI and ACI we can rapidly prototype, test and deploy.

> Important node: this flow is only for testing purposes, in real code scenario you would have CI/CD pipeline deploying your app for you.

We are going to use bash, but the same is of course possible with `powershell`.

> Docker CLI contains now build-in integration with Azure Container Instances through a **context** command. When using Azure CLI, you cat activate **Azure Interactive** by typing `az interactive`. This is an experimental feature of Azure CLI which gives you parameters completion and more!

1. First let's setup variables and authenticate with Azure using docker CLI

- setup variable for *tenant* to enable login: `TENANT=$(az account show --query tenantId -o tsv)`

- Finally let's login to Azure `docker login azure --tenant-id $TENANT`. You will be prompted to login via AD or paste authentication code.

2. Create context `docker context create aci azure-context`

> This command is interactive and will prompt you to select **subscription, resource group (create or select exisitng one) and locaiton**. Make sure to note resource group name if you create a new one, so later it's easy to cleanup resources.

3. Switch to new context `docker context use azure-context`

4. Run [ACI hello world image](https://hub.docker.com/r/microsoft/aci-helloworld) `docker run -d --name helloworld -p 80:80 microsoft/aci-helloworld`

5. Great! Now grep for host IP and navigate in a browser: `docker inspect helloworld | grep HostIP`

6. Cleanup resources

- Run `docker stop helloworld` to stop the container
- Run `docker rm helloworld` to remove container group
- Optionally remove resource group if you've created it only for the purpose of this demo

7. Switch back to docker desktop context: `docker context use default`

### Summary

We've see how easy it is to deploy a container group directly to Azure Container Instances. This could be very useful for testing purposes and quick inner development loop.

THis blog barely scratches the surface of what Azure Container Instances can do and how to integrate developer workflow. In my opinion Azure Container Instances is one of the mst flexible and powerful serverless offerings in Azure.

### Links And resources

There are a lot of great blogs and tutorials to check.

- [Compose CLI ACI Integration Now Available](https://www.docker.com/blog/compose-cli-aci-integration-now-available/)
- [ACI pricing](https://azure.microsoft.com/en-gb/pricing/details/container-instances/)
- [Docker documentation](https://docs.docker.com/engine/context/aci-integration/)
- [Deploy minecraft](https://www.docker.com/blog/deploying-a-minecraft-docker-server-to-the-cloud/)
- [Compose Spec](https://www.compose-spec.io/)
- [VS Code integration](https://cloudblogs.microsoft.com/opensource/2020/07/22/vs-code-docker-extension-azure-containers-instances/)
- [Azure ACI Quickstart](https://docs.microsoft.com/en-us/azure/container-instances/quickstart-docker-cli)
- [Microsoft Learn](https://docs.microsoft.com/en-us/learn/modules/run-docker-with-azure-container-instances/)
- [Git repo as volume](https://docs.microsoft.com/en-gb/azure/container-instances/container-instances-volume-gitrepo)
- [Very cool demo with Mark Russinovich and Scott Hanselman on Azure Friday](https://www.youtube.com/watch?v=7G_oDLON7Us&ab_channel=MicrosoftAzure)
