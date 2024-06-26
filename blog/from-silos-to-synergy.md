---
title: "From Silos to Synergy: Cloud Infrastructure Management in the Age of Platform Teams"
date: 2024-06-26
tags: ['platform', 'iac']
---

![](_media/289487_image0.jpg)

# From Silos to Synergy: Cloud Infrastructure Management in the Age of Platform Teams

## Navigating Lifecycle and Ownership in Modern Infrastructure Architectures

# Introduction

Software and the infrastructure it needs, have a complicated
relationship. On one hand, a web app will need somewhere to run, but
where it runs and how it gets there might vary.

Infrastructure and the software it serves can have different
**lifecycle** and **ownership**. A microservice with a database is a
good example of shared lifecycle and ownership. Different lifecycles are
when the same microservice requires a message broker like Kafka. An
example of different lifecycle and ownership? A microservice might need
a key-value store while a centralized security team manages it.

The resulting architecture is typically more complicated than a `hallo
world` IaC example.

![Applications/Infrastructure with different lifecycles and
ownerhsip](_media/289487_image2.jpg)

# Why does it matter?

![Photo by [Oyemike
Princewill](https://unsplash.com/@supaslim?utm_source=medium&utm_medium=referral)
on
[Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)](_media/289487_image3.jpg)

Platform Teams are responsible for maintaining all the shared
infrastructure. An excellent book, *“Team Toplogies”* claims.

> *“Platform teams produce and maintain the infrastructure and services
> that all of your teams use to communicate with each other and perform
> tasks. Examples of these kinds of services include your internal
> security tools, remote work applications, cloud storage solutions, and
> internal network design.”​*

I would like to argue that *it depends*. Depends on lifecycle and
ownership. Remember the phrase *“You build it, you run it”* attributed
to Werner Vogels, the CTO of Amazon? Death to silos and long live 2
pizza teams. It’s all great, if not always practical. Moreover, blindly
following this rule might get us in trouble.

# Silos are not bad

On the contrary, silos are amazing, when implemented right. Can you
imagine being involved in the decisions of how to run your EKS cluster
or Google Cloud Run?

Well, it’s your cluster and your container, so … run it. Thankfully,
that’s not how it works. Cloud providers offer a **self-service**
options and otherwise get out of the way. For all intents and purposes,
they are *silos* where we throw our workloads over the fence and that’s
it.

Cloud hyperscalers came up with guidelines that capture differences in
ownership and lifecycle. They are called shared responsibility
guidelines.

# Rethinking Ownership in Tech

The tech industry’s approach to ownership and lifecycle management
continues to evolve. While Werner Vogels’ *“You build it, you run it”*
philosophy pushed for end-to-end ownership, reality often demands more
nuance.

As Sam Newman points out in “Building Microservices”

> “Microservices give us options in terms of how we implement our
> systems, but they don’t dictate the organizational structures we use.”

This applies to ownership models as well.

Different components typically have different lifecycles and ownership
needs. A rapidly iterating microservice might be fully owned by a
product team, while a shared database could be managed by a platform
team. The key is finding the right balance for each organization’s
unique needs.

> “Good architecture allows major decisions to be deferred.” — Robert C.
> Martin

This flexibility in architecture should extend to our ownership models,
allowing them to adapt as our systems and organizations grow and change.

# Architecture Recommendations

![Photo by [Alex
wong](https://unsplash.com/@killerfvith?utm_source=medium&utm_medium=referral)
on
[Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)](_media/289487_image4.jpg)

In modern software development and infrastructure management, various
techniques and tools have emerged to address the challenges of different
lifecycle and ownership models. These include service discovery portals,
self-service platforms, GitOps practices, Infrastructure as Code (IaC),
and internal developer platforms (IDPs).

While these techniques are valuable, the underlying organizational
architecture is crucial for their effective implementation. Here is an
overview of organizational architecture models addressing each
lifecycle/ownership permutation.

| Lifecycle | Ownership | Architecture/Organization Model |
|-----------|-----------|--------------------------------|
| Application-bound | Developers | "You build it, you run it" model |
| Application-bound | External team | Embedded platform engineers |
| Shared | Developers | Complicated subsystem team |
| Shared | External team | Platform team approach |

Based on the analysis of lifecycle and ownership patterns, I recommend
the following architectural approaches:

## 1\. “You build it, you run it” model

**Context**: Application-bound infrastructure owned by developers

This model, popularized by Amazon, empowers development teams with full
responsibility for their services, including infrastructure. It
promotes:

  - End-to-end ownership and accountability
  - Rapid iteration and deployment
  - Deep understanding of both application and
    infrastructure needs

Implementation often involves extensive use of cloud services,
Infrastructure as Code, and robust CI/CD pipelines. Teams in this model
benefit from self-service platforms and comprehensive monitoring tools.

## 2\. Embedded platform engineers

**Context**: Application-bound infrastructure owned by an external team

This approach bridges the gap between specialized infrastructure
knowledge and application-specific needs. Key aspects include:

  - Close collaboration between platform experts and
    development teams
  - Tailored infrastructure solutions that align with
    application requirements
  - Knowledge transfer and upskilling of development
    teams

Successful implementation often involves creating service catalogs,
implementing GitOps practices, and establishing clear communication
channels between platform engineers and developers.

## 3\. Complicated subsystem team

**Context**: Shared infrastructure owned by developers

This model, derived from Team Topologies, is suitable for managing
complex, shared components that require deep expertise. Characteristics
include:

  - Focused team of specialists managing a critical,
    shared subsystem
  - Clear interfaces and APIs for other teams to
    interact with the subsystem
  - Continuous evolution and optimization of the shared
    component

Implementation might involve creating comprehensive documentation,
establishing service level objectives (SLOs), and developing
self-service interfaces for other teams to utilize the subsystem.

## 4\. Platform team approach

**Context**: Shared infrastructure owned by an external team

This model centralizes the management of shared infrastructure,
providing a foundation for other teams to build upon. Key features
include:

  - Dedicated team focusing on creating and maintaining
    shared infrastructure
  - Emphasis on creating self-service capabilities for
    development teams
  - Standardization of infrastructure practices across
    the organization

Successful platform teams frequently implement internal developer
platforms (IDPs), use Infrastructure as Code for managing resources, and
create service discovery portals to make their offerings easily
accessible to development teams.

# Closing Thoughts

As we’ve explored throughout this discussion, the relationship between
software and infrastructure is complex and multifaceted. The
architectural approaches we’ve outlined — from “You build it, you run
it” to Platform teams — each align with specific lifecycle and
ownership patterns, providing a foundation for effective infrastructure
management.

It’s crucial to remember that there’s no one-size-fits-all solution. The
choice of approach should be based on your organization’s specific
needs, culture, and technical landscape. Factors such as team size,
technical expertise, regulatory requirements, and business objectives
all play a role in determining the most suitable architecture.

Moreover, it’s entirely possible — and often beneficial — for these
models to coexist within the same organization. Different components or
services may require different approaches. A critical, shared database
might be best managed by a complicated subsystem team, while a
customer-facing microservice could thrive under a “You build it, you run
it” model.

The key is to remain flexible and open to evolution. As your
organization grows and changes, so too should your architectural
approach. Regular reassessment of your infrastructure management
strategies can help ensure they continue to serve your needs
effectively.

Thanks for taking the time to read this post. I hope you found it
interesting and informative.

🔗 **Connect with me on**
[**LinkedIn**](https://www.linkedin.com/in/piotr-zaniewski/)

🌐 **Visit my** [**Website**](https://cloudrumble.net/)

📺 **Subscribe to my** [**YouTube
Channel**](https://www.youtube.com/@cloud-native-corner)

