# Kubernetes Services: Exposing pods, communication <!-- {docsify-ignore-all} -->

This blog is a little nit longer than other parts of *Kubernetes explained deep enough*. Kubernetes networking is a very complex topic and trying to write about all nuances of different services and mechanisms would probably take a few blogs on it's own. Instead we will focus specific areas of Kubernetes *Networking*: services and look at their practical aspects.

Since this series is about exercising and practical examples, we will focus less on deep diving into each networking areas, but rather merge them together into a broader category of *Networking* and look at it from holistic point of view highlighting only those aspects that are important for practical examples we will work with.

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
> Basic definitions are provided on diagrams below

## How does it work?

In Kubernetes *service* i a resource that abstracts and encapsulates a way of exposing an application running in pods as a network service.

> Although services do not require DNS to work it is strongly recommended to setup DNS service on Kubernetes using and add-on. There are several DNS services compatible with [Kubernetes dns specification](https://github.com/kubernetes/dns/blob/master/docs/specification.md), 2 most popular are:
>
> - [CoreDNS](https://coredns.io/)
> - [Kube-DNS](https://github.com/kubernetes/dns)

After DNS service is setup on the cluster, it is very easy to call services taking adventage of the DNS records created for each service. Since Kubernetes networking is *flat* meaning that resources can communicate with each other directly via their IPs, this means that it should be possible to call any service in any namespace from any pod in any namespace (providing there are no network policies blocking the traffic).

There are 4 types of services in Kubernetes:

![Services Types](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-services-mindmap.puml&fmt=png)

> [!NOTE]
> Note on ports:
> It is often confusing to understand what ports do what in Service manifest, so let's make sure to refresh the definitions:
> **TargetPort** is the Port which the **application** is configured to **listen on**. **Port** is how the application will be **accessed from the outside**

## What Problem does it solve?

- expose deployment on the network and enable communication between pods

- enable service discovery via DNS
- provide static IP to connect to and internally track all changes in workloads

## How to implement it?

We are going to revisit scenarios from the section [What Problem does it solve?](#What-Problem-does-it-solve?) and validate that the statements are correct.

> [!TIP]
> If you would like to learn a few useful networking commands, I have created a gist with the ones that helped me pass my CKA certification
> [Kubernetes related networking commands](https://gist.github.com/Piotr1215/23cf678d74079f98dc7be731e6a3f1d1)

### Prerequisites

Instead of asciinema recording, this time we are going to use [katacoda](https://www.katacoda.com/). You just need a web browser, inquisitive mindset and some spare time to learn new things, no other prerequisites needed :)


> [!TIP]
> [Katacoda](https://www.katacoda.com/) is a great free service. Is is an "Interactive Learning and Training Platform for Software Engineers" that "enables learning new technologies using real
> environments right in your browser"

A very common requirement in any system is ability to facilitate point to point communication between deployed artifacts. One of the most common scenarios for this type of communication is client-server architecture or multi-tier architecture (3 tier layers being most common):

- Presentation layer (UI)
- Application layer (business logic, API, middleware)
- Date Persistance layer (typically database, but can be disc etc)

Below diagram shows connectivity between different layers of the multi-tier architecture application. We are going to see how communication part of this setup can be recreated using Kubernetes native resources.

![Multi-Tier-Architecture](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/multi-layer-architecture-components.puml&fmt=png)

> [!NOTE]
> Modern architectures, especially microservices follow different architectural patterns. For example [The Twelve-Factor App](https://12factor.net/) approach where connectivity between application layer and data persistance layer is done via HTTPS and often UI part of the application is served as a static web app or SPA.

One key difference in Kubernetes world and more broadly, in the era of infrastructure as code, servers are a resource like any other and are dynamically provisioned. Workloads can be reschedules on a different server any any time without notice and everything is expected to work just the same.
So first change is that instead of fixed servers we have dynamic, flexible infrastructure. Those are **Kubernetes Cluster Nodes**.

We are not going to focus on DNS resolution from URL in browser address which happens on public DNS.

Using Kubernetes our architecture look like this:

![Multi-Tier-Architecture-k8s](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-multi-layer-architecture-components.puml&fmt=png)

By introducing the *service* abstraction we have decoupled actual workloads from communication mechanism. This allows us to take advantage of the dynamic nature of Kubernetes infrastructure and unlocked additional possibilities like scaling, separation of layers etc. Kubernetes can now move pods to other nodes, scale them or destroy and re-create without causing disruption to our application.

Let's setup our scenarios and head to [Katacoda Scenario](https://www.katacoda.com/decoder/courses/k8s-networking/k8s-networking-services) to perform experiments on your own!

This time for each scenario we are going to use formalized notation called [Gherkin Syntax](https://docs.specflow.org/projects/specflow/en/latest/Gherkin/Gherkin-Reference.html). This will help us better express goals and conditions of our experiments.

> [!NOTE]
> Typically we would use testing framework like [Specflow](https://docs.specflow.org/projects/specflow/en/latest/index.html) or [Cucumber](https://cucumber.io/),
> but for the purpose of learning we are going to execute steps in the Katacoda environment manually.

### Expose deployment on the network and enable communication between pods


```gherkin
Feature: NodePort service

    Expose service on each node on the
    same static port. Accessible on each node IP:PORT combination

    Scenario: Expose deployment on the network
      Given there is nginx deployment present in the cluster
      And it is in default namespace
      When deployment is exposed using "NodePort" Service
      Then pods of the deployment can be curled using "http://nginxsvc" name
      And sample page correctly renders on the node port in "Katacoda"

    Scenario:
```