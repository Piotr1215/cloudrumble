---
title: Kubernetes Storage
sidebar_label: Storage
tags:
    - Kubernetes
    - Practice
---

# Kubernetes Storage: pv & pvc

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) and [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)
>
> Basic definitions are provided on diagram below

## How does it work?

Cluster admin creates *persistent volumes* as cluster resources and developers use *persistent volume claims* to use persistent volumes. This process is somewhat manual, but there are ways to automate it with *storage classes and dynamic volume provisioning* which we will look into in next exercise.

Diagram below shows typical interaction between pv, pvc, pod and its containers to create, claim, use and cleanup storage.

![Kubernetes Storage Lifecycle](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-storage-seq.puml&fmt=png)

## What Problem does it solve?

PVs and PVCs address several problems:

- enable persisting data after pod is destroyed
- decouples storage provisioning activity from its consumption
  - this enables separation of concerns between cluster admins and developers
- enable data sharing between pods

## How to implement it?

### Prerequisites

We are going to implement the example based on Azure AKS cluster.

> [!NOTE]
> To create AKS cluster on Azure using terraform, follow [my guide](https://piotrzan.medium.com/try-kubernetes-in-cloud-for-free-e5e431c507a7)
> Or alternatively use [Microsoft AKS deployment walk-through using az CLI](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough)

We are going to follow the steps from above diagram and see how this works in practice.

### Create Kubernetes Resources

This step assumes that you already have storage account created with a file share, if not [follow these steps to create it](https://docs.microsoft.com/en-us/azure/aks/azure-files-volume#create-an-azure-file-share).

After creating storage account and file share, we need to create Kubernetes secret with credentials to file share to enable pod to access the file share

> [!NOTE]
> To work easier with kubectl we will create an alias `alias k=kubectl`

``` bash
# Define variables
RG="<resource group name where storage account is>"
AKS_PERS_STORAGE_ACCOUNT_NAME="<storage account name>"

# Retrieve storage key
STORAGEKEY=$(az storage account keys list --account-name $AKS_PERS_STORAGE_ACCOUNT_NAME --resource-group $RG \
                                          --query "[?keyName == 'key1'].value" -o tsv)

echo $AKS_PERS_STORAGE_ACCOUNT_NAME
echo $STORAGEKEY

# Create secret to enable the pod to mount the PVC
k create secret generic azure-secret --from-literal=azurestorageaccountname=$AKS_PERS_STORAGE_ACCOUNT_NAME \
                                     --from-literal=azurestorageaccountkey=$STORAGEKEY
```

Once the secret is created, we can create resources for the exercise. Kubectl enables us to create resources based on remote yaml files, in this case from the exercises Github repository.

> [!WARNING]
> Always check content of the files before creating resources from remote source.

``` bash
#Persistent Volume bound to the file share
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/1-create-pv.yaml

#Persistent Volume Claim
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/2-create-pvc.yaml

#Pod with Persistent Volume Claim mounted as volume
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/3-create-pod.yaml

```

> [!NOTE]
> It is possible to create binding between pod and Azure file share without using Persistent Volume. It is also possible to let Azure dynamically provision file share for Kubernetes resources to consume. Here we being verbose for the purpose of exercise and presentation.

### Let's experiment

We are going to revisit scenarios from the section [What Problem does it solve?](#What-Problem-does-it-solve?) and validate that the statements are correct.

#### **Enable persisting data after pod is destroyed**

``` bash
# Create a file inside a mounted folder of the pod
k exec -it testpod -- sh
cd /mnt/azure/
echo "Will I still be here for new pod?" > testfile.txt
cat testfile.txt

# Remove the pod
k delete pod testpod

# Create pod again
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/3-create-pod.yaml

# Check if the file still exist in the mounted directory
k exec -it testpod -- cat /mnt/azure/testfile.txt
```

The last command should produce text: "Will I still be here for new pod?"

**Conclusion:** We have successfully proven that data is being persisted between pod destruction events.

#### Decouples storage provisioning activity from its consumption

``` bash
# Increase persistent volume capacity
k edit pv azurefile

# Change storage to 10Gi, exit and save vim (:wq). Check pv
k describe pv azurefile

# Make sure that file is still there
k exec -it testpod -- cat /mnt/azure/testfile.txt
```

**Conclusion:** We have successfully proven that data cluster administrators can perform their tasks without affecting developer activities.

#### Enable data sharing between pods

``` bash
# Create another pod bound to the same persistent volume
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/4-create-pod2.yaml

# Open new Azure Cloud session and exec into testpod
k exec -it testpod -- sh
cd /mnt/azure/
ls

# Watch for file changes
watch -n1 'ls ./*'

# Swap to another shell and create file in testpod2
k exec -it testpod2 -- touch /mnt/azure/new_testfile.txt
```

Last command should result in *new_testfile.txt* immediately appearing in another shell

**Conclusion:** We have successfully proven that pods can share data between each other in real time.

#### Cleanup

Running `k get pv` shows that persistent volume *reclaim policy* is in **RECLAIM** mode. This means that after pods will be deleted, persistent volume will stay available. Test it by removing pods and check if your file share is still there.

> [!ATTENTION]
> Don't forget to cleanup resources on Azure if you are using free subscription. The easiest way to do it is to remove resource group where all resources are created.
> In our case `az group delete --name ResourceGroupName`

### Challenge

Is there anything you would like to test? Think about a scenario, test it and let us know in comments.
