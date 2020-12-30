# Easily Deploy Containers to Azure directly from your Desktop

## Prerequisites

- [Get free Azure Subscription](https://azure.microsoft.com/en-us/free/)
- [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

## What are Azure Container Instances

![Azure ACI Architecture](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/azure-aci-architecture.puml&fmt=svg)

### Serverless vs ACI vs AKS

### How does it work

### When it is useful

- Fast startup: Launch containers in seconds.
- Per second billing: Incur costs only while the container is running.
- Hypervisor-level security: Isolate your application as completely as it would be in a VM.
- Custom sizes: Specify exact values for CPU cores and memory.
- Persistent storage: Mount Azure Files shares directly to a container to retrieve and persist state.
- Linux and Windows: Schedule both Windows and Linux containers using the same API.

## Flow

1. Login with `docker login azure --tenant-id`
2. Setup variables

``` bash
RG=rg-azure-aci
LOCATION=westeurope
# If you don't know location name, you can easily list them using below command and combine it with `grep` to search for locaiton name you are interested in
az account list-locations -o table
az interactive
az account set --subscription #hitting space after --subscription will autofill all subscriptions, choose one as default
# exit az interactive by typing "exit"
# Create variable for tenant-id, you will need it later for authenticating
TENANT="az account show --query [managedByTenants[].tenantId] -o tsv"
```

3. Create context `docker context create aci azure-context`
1. Switch to new context `docker context use azure-context`
2. Run [hello world image](https://hub.docker.com/_/hello-world) `docker run -d --name helloworld -p 80:80 mcr.microsoft.com/azuredocs/aci-helloworld`

### Deploy PlantUML Server

### What's happening behind the scenes

---

### Links

- https://docs.microsoft.com/en-gb/azure/container-instances/quickstart-docker-cli
- [Compose CLI ACI Integration Now Available](https://www.docker.com/blog/compose-cli-aci-integration-now-available/)
- [Docker docu](https://docs.docker.com/engine/context/aci-integration/)
- [Deploy minecraft](https://www.docker.com/blog/deploying-a-minecraft-docker-server-to-the-cloud/)
- [Docker and github actions](https://www.docker.com/blog/setting-up-cloud-deployments-using-docker-azure-and-github-actions/)
- [Docker CLI and compose](https://www.docker.com/blog/setting-up-cloud-deployments-using-docker-azure-and-github-actions/)
- [Compose Spec](https://www.compose-spec.io/)
- [VS Code integration](https://cloudblogs.microsoft.com/opensource/2020/07/22/vs-code-docker-extension-azure-containers-instances/)
- [Quickstart](https://docs.microsoft.com/en-us/azure/container-instances/quickstart-docker-cli)
- [Microsoft Learn](https://docs.microsoft.com/en-us/learn/modules/run-docker-with-azure-container-instances/)
- [Git repo as volume](https://docs.microsoft.com/en-gb/azure/container-instances/container-instances-volume-gitrepo)
- [Pretty cool demo](https://www.youtube.com/watch?v=7G_oDLON7Us&ab_channel=MicrosoftAzure)
- [ACI pricing](https://azure.microsoft.com/en-gb/pricing/details/container-instances/)

### Ideas to showcase Docker

- https://www.dokuwiki.org/dokuwiki
- https://medium.com/better-programming/running-desktop-apps-in-docker-43a70a5265c4