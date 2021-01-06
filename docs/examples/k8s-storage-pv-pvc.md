# Kubernetes Storage: pv & pvc <!-- {docsify-ignore-all} -->

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) and [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)
>
> Basic definitions are provided on diagram below

## How does it work?

Cluster admin creates *persistent volumes* as cluster resources and developers use *persistent volume claims* to use persistent volumes. This process is somewhat manual, but there are ways to automate it with *storage classes and dynamic volume provisioning* which we will look into in next exercise.

Diagram below shows typical interaction between pv, pvc, pod and its containers to create, claim, use and cleanup storage.

![Kubernetes Storage Lifecycle](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-storage-seq.puml&fmt=png)

## What Problem does it solve?

PVs and PVCs address several problems:

- enable persisting data after pod is destroyed
- decouples storage provisioning activity from its consumption
  - this enables separation of concerns between cluster admins and developers
- pvs are implemented as plugins and based on CNI specification are by nature hightly extensible

## How to implement it?
