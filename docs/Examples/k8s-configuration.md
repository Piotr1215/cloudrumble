---
title: Kubernetes Config Maps
sidebar_label: Config Maps
tags:
    - Kubernetes
    - Practice
---

# Kubernetes Configuration: configMaps, secrets, volumes

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

![Kubernetes Configuration Components](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-config-components.puml&fmt=png)

Both config maps and secrets can be mounted into pods in 2 ways:

- As volumes
- As environmental variables

> [!TIP]
> Below diagram shows those options on the example of config map, same applies to secrets

![Kubernetes Configuration Options](https://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-config-mindmap.puml&fmt=png)

## What Problem does it solve?

- enable separations of application code and configuration
- enable ingestion of secrets and other security sensitive information
- updates to config maps or secrets reflects in pods automatically


## How to implement it?

### Prerequisites

We are going to implement the example using [Docker Desktop](https://www.docker.com/products/docker-desktop), since PWK does not work for me since a few days.
The examples however will work on any Kubernetes setup.

### Create Kubernetes Resources

> [!NOTE]
> To work easier with kubectl we will create an alias `alias k=kubectl`

We will create separate Kubernetes resources per experiment

> [!WARNING]
> Always check content of the files before creating resources from remote source.

### Let's experiment

> [!TIP]
> Each experiment has corresponding `asciinema` recording, you can follow along and also copy/paste commands directly from the recording.

We are going to revisit scenarios from the section [What Problem does it solve?](#What-Problem-does-it-solve?) and validate that the statements are correct.

#### Enable separations of application code and configuration

1. Create config map
2. Create deployment with config map mounted as volume
3. Check how config map data is mounted into a folder specified in pod template

Resources to create:

``` bash
#Create config map:
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/1-create-configmap.yaml

#Create deployment with config map mounted as volume:
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/4-Create-deployment.yaml
```

[![Config and App Separation](https://asciinema.org/a/384410.svg)](https://asciinema.org/a/384410)

Cleanup Resources:

``` bash
#Delete deployment:
k delete -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/4-Create-deployment.yaml

#Delete config map:
k delete -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/1-create-configmap.yaml
```

**Conclusion:** We have successfully proven applications and configuration can be easily decoupled using confg maps

#### Enable ingestion of secrets and other security sensitive information

> [!TIP]
> Secrets are by detaulf base64 encoded, but it's possible to create secret with plain text by using **stringData:** instead of **data** section of secret YAML

Resources to create:

``` bash
#Create encoded secret:
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/3-create-secret-encoded.yaml

#Create deployment with secret mounted as volume:
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/5-create-deployment-secret.yaml
```

1. Create secret
2. Create deployment with secret mounted as volume
3. Check if secret is correctly mounted to a pod
4. Display secret *password* value using *describe* command
5. Decode secret *password* value from base64 `echo 'dW5icmVha2FibGU=' | base64 --decode`

[![Mounting Secret](https://asciinema.org/a/384412.svg)](https://asciinema.org/a/384412)

Cleanup Resources:

``` bash
#Delete encoded secret:
k delete -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/3-create-secret-encoded.yaml

#Delete deployment:
k delete -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/5-create-deployment-secret.yaml
```

> [!ATTENTION]
> Kubernetes currently does not encrypt secrets in its data store *etcd*. Mounted secrets are only encoded, nevertheless, there are discussions to provide secrets encryption at rest and in transit, so it's considered best practice to use secrets whenever dealing with sensitive information.

**Conclusion:** We have successfully proven that base64 encoded secrets can be ingested and consumed by pod and in turn containers

#### Updates to config maps or secrets reflects in pods automatically

> [!ATTENTION]
>
> - This functionality applies only to configuration or secrets **mounted to pods as volumes**
> - If you would like to reflect changes in environmental variables injected from configs or secrets, manual pod restart is required
> - You can vote here to push up https://github.com/kubernetes/kubernetes/issues/22368 to introduce auto restarts similar to configs and secrets mounted as volumes
> - Alternatively [admission controller](https://github.com/xing/kubernetes-deployment-restart-controller) setup is possible, but this is out of scope for this exercise

Create Resources:

``` bash
#Create config map:
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/1-create-configmap.yaml

#Create deployment with config map mounted as volume:
k apply -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/4-Create-deployment.yaml
```

1. Create config map
2. Create deployment with config map mounted as volume
3. Check how config map data is mounted into a folder specified in pod template
4. Edit config map and adjust one value
5. Check how config map data is is updated in a folder pod specified in pod template as mount point

[![Config Update](https://asciinema.org/a/384415.svg)](https://asciinema.org/a/384415)

Cleanup Resources:

``` bash
#Delete deployment:
k delete -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/4-Create-deployment.yaml

#Delete config map:
k delete -f https://raw.githubusercontent.com/Piotr1215/dca-exercises/master/k8s/configuration/1-create-configmap.yaml
```

**Conclusion:** We have successfully proven configuration values mounted to pod as volume are auto updated after config map changes

### Challenge

Is there anything you would like to test? Think about a scenario, test it and let us know in comments.
