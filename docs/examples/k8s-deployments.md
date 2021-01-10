# Kubernetes Deployments: scaling, rollouts, rollbacks <!-- {docsify-ignore-all} -->

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
>
> Basic definitions are provided on diagrams below

## How does it work?

Typical deployment resource consists of following objects

![Deployment Spec](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-deployment-spec.puml&fmt=png)

As usual *apiVersion, kind, metadata and spec* are mandatory fields in every Kubernetes resource. Deployment adds following important fields under *spec*:

- replicas: number of pods replicated via the deployment
- selector: tells Kubernetes how deployment should find pods to act on
- template: fields under this section refer to pod specification that deployment acts on

## What Problem does it solve?

Deployments are very flexible and can be used in many ways. Below I have selected most important problems that deployments help solve.

- **Scalability**: enable up and down-scaling of pods
- **Configuration**: enables changing of pods state and configuration on the flight
- **Deployment**: enables zero-downtime updates of pods to new versions: rollouts
- **Delivery Control**: enables zero-downtime reversing of updates made to pods: rollbacks

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

### Let's experiment

> [!TIP]
> Each experiment has corresponding `asciinema` recording, you can follow along and also copy/paste commands directly from the recording.

We are going to revisit scenarios from the section [What Problem does it solve?](#What-Problem-does-it-solve?) and validate that the statements are correct.

#### Scalability: enable up and down-scaling of pods

1. Scale deployment up and watch pods being created
2. Scale deployment down and watch pods being terminated

[![asciicast](https://asciinema.org/a/383682.svg)](https://asciinema.org/a/383682)

**Conclusion:** We have successfully proven pods can be easily scaled up and down.

> [!TIP]
> In this we have manually scalled number of pod replicas. There are a few ways to enable automatic scalling:
>
> - [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
> - [Kubernetes Event Driven Autoscaling: KEDA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)

#### Configuration: enables changing of pods state and configuration on the flight

1. Scale pods to 5
2. Check that there are no environmental variables on the pods
3. Set environment variable on the deployment
4. Observe that environmental variable has been added

[![asciicast](https://asciinema.org/a/383703.svg)](https://asciinema.org/a/383703)

**Conclusion:** We have successfully proven that pods in a deployment can be easily changed via deployment manipulation.

#### Deployment: enables zero-downtime updates of pods to new versions