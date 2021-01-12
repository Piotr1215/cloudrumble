# Kubernetes Configuration: configMaps, secrets, volumes <!-- {docsify-ignore-all} -->

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Configuration](https://kubernetes.io/docs/concepts/configuration/)
>
> Basic definitions are provided on diagrams below

## How does it work?

Kubernetes natively supports 2 resources geared towards storing configuration consumed by pods. Both configuration types required data to be represented in a *key:value* pair format.

- *Config Maps*: use to store non-confidential data
- *Secrets*: use to store confidential data (tokens, SSH keys, passwords, certificates, etc)

> [!ATTENTION]
> Config maps are not suited for storing large quantities of data. Please use external storage for this purpose. As a side-note, *etcd*, key-value store where Kubernetes stores all its state can only hold resources up to 1MN in size.
>
> Secrets in Kubernetes are actually not **encrypted**, but rather **base64 encoded**, so best for storing critical sensitive information, recommendation is to use key vaults such as [Hashicorp Vault](https://learn.hashicorp.com/vault) with Helm sidecar or native offerings from public cloud providers, like [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/).

![Kubernetes Configuration Components](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-config-components.puml&fmt=png)

Both config maps and secrets can be mounted into pods in 2 ways:

- As volumes
- As environmental variables

> [!TIP]
> Below diagram shows those options on the example of config map, same applies to secrets

![Kubernetes Configuration Options](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-config-mindmap.puml&fmt=png)

## What Problem does it solve?

- enable separations of application code and configuration
- enable ingestion of secrets and other security sensitive information
- updates to config maps or secrets reflects in pods (applies to mount as volumes)
  - only applies to configuration injected as env
  - manual pod restart needed or metadata update
  - Vote here to push up https://github.com/kubernetes/kubernetes/issues/22368
  - https://github.com/xing/kubernetes-deployment-restart-controller

## How to implement it?

### Prerequisites

We are going to implement the example using [Docker Desktop](https://www.docker.com/products/docker-desktop), since PWK does not work for me since a few days.
The examples however will work on any Kubernetes setup.

### Create Kubernetes Resources

> [!NOTE]
> To work easier with kubectl we will create an alias `alias k=kubectl`

Create deployment: `k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/deployment/1-create-deployment.yaml`
This will create a simple nginx deployment.

> [!WARNING]
> Always check content of the files before creating resources from remote source.