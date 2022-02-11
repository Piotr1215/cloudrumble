---
title: "Try Kubernetes in Cloud for Free"
date: 2019-12-28T20:05:46+02:00
tags: ['kubernetes', 'azure']
image: https://miro.medium.com/max/1400/1*_GZO1oEtSkFY405QQK02VA.jpeg
---

If you are interested in cloud computing you have and maybe even read a few blogs about this cool thing called “Kubernetes”. It’s all good and fancy, but it’s best to actually lay your hands on it and experiment with that it has to offer.

<!--truncate-->

A quick search for “try out Kubernetes” doesn’t really help, so what can you do to get Kubernetes out for a spin without installing lots of software on your machine and not paying a penny? Well, there is an easy way! Take advantage of cloud computing and see how it is to be at the helm of everyone’s favorite containers’ orchestrator!

1. Create [free Azure subscription](https://azure.microsoft.com/en-us/free/). This will give you access to [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/) where you can get your hands dirty with Kubernetes. You can do the same creating Kubernetes clusters in Google Cloud (GCP) or Amazon Web Services (AWS).
2. Install [Terraform CLI](https://www.terraform.io/downloads.html). This is required to create and **destroy** resources you will need to check out Kubernetes.
3. [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/). This will enable you to communicate with your kubernetes cluster.

1. Create Azure resources. Please note that commands assume Linux bash/zsh, so if you are on windows use WSL or git bash.

\# Create general purpose V2 storage accountaccountName=fancyaccountmanemustbeunique123
rg=uniquergname123az group create — name $rg — location westeurope — output jsonaz storage account create \\
     -- name $accountName \\
     -- resource-group $rg \\
     -- location westeurope \\
     -- sku Standard\_RAGRS \\
     -- kind StorageV2 \# Create container to host terraform state
\# Retrieve storage account key:accountKey=$(az storage account keys list — account-name $accountName — resource-group $rg \\
      -- query “\[?keyName == ‘key1’\].value” -o tsv)az storage container create -n tfstate — account-name $accountName — account-key $accountKeyterraform init -backend-config=”storage\_account\_name=$accountName” \\
\- backend-config=”container\_name=tfstate” \\
\- backend-config=”access\_key=$accountKey” \\
\- backend-config=”key=dev.tfstate”

2\. Run `terraform plan -out out.plan` - prepare terraform deployment

3\. Run `terraform apply out.plan` - deploy AKS and store terraform state in the storage container created in step 1

4\. Run `az aks get-credentials -g azure-k8stest -n k8stest` to merge newly created config with local kubectl config file and switch to the new cluster

5\. Run `kubectl get nodes` - verify that the cluster is selected and you can access it

Once cluster deployment is done and you can access your cluster via kubeclt, there are a few fun things you can try out before you get rid of the cluster

- create a deployment and scale it up/down
- check out AKS (Azure Kubernetes Service) metrics on Azure portal
- deploy nginx pod and expose a service that you can access from outside
- deploy job and see it complete

## Play with official “Guestbook” example

Kubernetes docs site has a very easy to follow sample called “Guestbook” which allows you to test a few k8s features and have a running sample in minutes. [Follow the tutorial here](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/).

So now let’s get back to the “.. for free” part! In order not go get any costs, it is important to **destroy** all the resources. Follow those steps to do so:

1. Run `terraform destroy` - cleanup all AKS related resources
2. Run `az group delete -n \<resource group name created earlier>` - remove storage account and terraform state
3. Run `rm -Rf .terraform`\- run locally, this is needed to reset the state which is gone when removing the storage account and container

