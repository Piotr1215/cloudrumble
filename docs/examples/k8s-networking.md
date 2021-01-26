# Kubernetes Services: services, ingress, network policies <!-- {docsify-ignore-all} -->

This blog is a little nit longer than other parts of *Kubernetes explained deep enough*. We will focus on a complex topic; *Networking* and look at 3 of its aspects:

- Services
- Ingress
- Network Policies

Since this series is about exercising and practical examples, we will focus less on deep diving into each networking areas, but rather merge them together into a broader category of *Networking* and look at it from holistic point of view.

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about:
>
> - [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
> - [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
> - [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
>
> Basic definitions are provided on diagrams below

## How does it work?

### Services

There are 4 types of services in Kubernetes:

![Services Types](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-services-mindmap.puml&fmt=png)

### Network Policies

- CNI plugin required, only some support netpo

### Ingress

- ingress controller required

## What Problem does it solve?

- **Services** expose pods on the network to be consumed by other resources
- **Services** enable service discovery and load balancing between pods
- **Services** provide static IP to connect to and internally track all changes in workloads
- **Services** provide static IP to connect to and internally track all changes in workloads
- **Ingress** enable external access to services, typically cia HPPT(s)
- **Ingress** provide load balancing from when connecting from outside the cluster
- **Network Policies** enable fine grained control over how pods communicate with other network entities