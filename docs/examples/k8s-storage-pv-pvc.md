# Kubernetes Storage: pv & pvc <!-- {docsify-ignore-all} -->

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) and [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)
>
> Basic definitions are provided on diagram below

## How does it work?

Cluster admin creates *persistent volumes* as cluster resources and developers use *persistent volume claims* to use persistent volumes. This process is somewhat manual, but there are ways to automate it with *storage classes and dynamic volume provisioning* which we will look into in next exercise.

Diagram below shows typical interaction between pv, pvc, pod and its containers to create, claim, use and cleanup storage.

![Kubernetes Storage Lifecycle](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-storage-seq.puml&fmt=png)

## What Problem does it solve?

PVs and PVCs address several problems:

- enable persisting data after pod is destroyed
- decouples storage provisioning activity from its consumption
  - this enables separation of concerns between cluster admins and developers
- pvs are implemented as plugins and based on CNI specification are by nature hightly extensible

## How to implement it?

### Prerequisites

We are going to implement the example based on Azure AKS cluster.

> [!NOTE]
> To create AKS cluster on Azure using terraform, follow [my guide](https://piotrzan.medium.com/try-kubernetes-in-cloud-for-free-e5e431c507a7)
> Or alternatively use [Microsoft AKS deployment walk-through using az CLI](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough)

### Create Kubernetes Resources

1. Secret with credentials to file share

This step assumes that you already have storage account created with a file share, if not [follow these steps to create it](https://docs.microsoft.com/en-us/azure/aks/azure-files-volume#create-an-azure-file-share).

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
kubectl create secret generic azure-secret --from-literal=azurestorageaccountname=$AKS_PERS_STORAGE_ACCOUNT_NAME \
                                           --from-literal=azurestorageaccountkey=$STORAGEKEY
```

2. Persistent Volume bound to the file share

`k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/1-create-pv.yaml`

3. Persistent Volume Claim

`kubectl apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/2-create-pvc.yaml`

4. Pod with Persistent Volume Claim mounted as volume

`kubectl apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/storage-pv-pvc/3-create-pod.yaml`

### Let's experiment



### Cleanup
