---
title: "The Fundamentals of Microservices Oriented Architecture"
date: 2020-01-19T20:08:44+02:00
tags: ['architecture', 'design']
---
## The fundamentals of microservices-oriented architecture

![Photo by [Kevin Ku](https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/6706/1*xPN1TMIK_kHoVBcQLKErYA.jpeg)

Microservices architecture has gained popularity in recent years; and for a good reason: implemented correctly, microservices can bring numerous advantages that are particularly important in our modern, cloud computing era.

<!--truncate-->

In this blog we focus on a few important architecture foundations that underpin microservices-oriented architecture. A deep understanding of these underlying principles can help create better software architectures that are resilient, extensible, well-aging and, of course, microservices-oriented.

### Consider the fallacies of Distributed Computing

[Distributed computing](https://en.wikipedia.org/wiki/Distributed_computing) is not a new concept; in fact internet itself is a huge distributed computing system. Microservices by definition fall under the category of a Distributed System.
> **The appeal of distributed computing lies in the ability to harness the power of multiple, often parallel compute resources and take advantage of modern cloud computing offerings to enable almost unlimited scaling.**

Yet distributed systems, by nature, function in an unpredictable environment where a lot of things can go wrong. A very common pitfall is to treat distributed computing systems with the same degree of trust we have for local, non-distributed environments.
> **The [Fallacies of Distributed Computing](https://medium.com/baseds/foraging-for-the-fallacies-of-distributed-computing-part-1-1b35c3b85b53) help us understand the most common false assumptions we tend to make about distributed systems.**

The below list would be true in an ideal world, but in our imperfect reality making these assumptions can prove dangerous:

* The network is reliable

* Latency is zero

* Bandwidth is infinite

* The network is secure

* Topology doesn’t change

* There is only one administrator

* Transport cost is zero

* The network is homogeneous

The above applies especially in microservices-based systems that are by definition distributed.

### Promise Theory

Microservices often benefit from asynchronous communication via:

* queuing mechanisms like Kafka, RabbitMQ or cloud provider native service bus offerings

* asynchronous calls over HTTP, TCP, with most popular being REST API model and gRPC calls.

[Promise Theory](https://www.youtube.com/watch?v=2TPsB5WuZgk)’s main contribution to microservices architecture is the ability to move away from the *obligations concept*of communication — in which both sender and receiver are dependent on each other and must be active during the process of communication — towards the *promises concept*.
> **Promises concept postulates autonomy and independence of the systems and services collaborating with each other as part of a distributed system.**

### Actor Model

The [Actor model](https://en.wikipedia.org/wiki/Actor_model) tries to model a domain by introducing concept of “Actors”, similar to Object Oriented Programming (OOP) using “Objects” and Functional Programming (FP) using “Functions” as base first-class citizens building blocks of any given domain.

An actor is a computational entity that, in response to a message it receives, can concurrently:

* send a finite number of messages to other actors;

* create a finite number of new actors;

* designate the behavior to be used for the next message it receives.

The actor model is also a method of describing interactions between autonomous actors in a distributed system. This pattern allows for fault tolerance and resiliency by embracing the uncertainty of autonomy (actor A cannot compel actor B). Promise Theory introduced the concept of autonomy of communication participants.
> **The Actor model helps us understand how to address challenges around concurrency, state management and consistency.**

### Event Driven Architecture

[Event Driven Architecture](https://microservices.io/patterns/data/event-driven-architecture.html) further promotes asynchronous and decoupled communication by introducing the concept of “event” or, simply put, an important change of state.
> **Microservices collaborating with each other can react to an event in their own time and fully autonomously**.

It brings to the table a deeper understanding of the dynamic nature of data exchange and the influence it has on the architecture.

This type of communication has a few very well-known implementations, like serverless computing, event sourcing or CQRS.

### CAP Theorem

The [CAP Theorem](https://www.ibm.com/cloud/learn/cap-theorem) states that in a distributed system it is impossible to provide more than two of the following three guarantees when it comes to data management:

* Consistency: All clients have the same representation of the data

* Availability: Each client can read and write the data at any point in time

* Partition tolerance: Physical data partitioning does not affect the functionality of the system

> **Having the CAP Theorem in mind helps us choose the best combination based on requirements and use cases.**

### UNIX Philosophy

Great software architectures are often judged by how well they age. One of the oldest architectures and still very relevant to this day is the [Unix Philosophy](https://homepage.cs.uri.edu/~thenry/resources/unix_art/ch01s06.html).
> **Core idea of UNIX Philosophy is that every program should do one thing well and collaborate with other programs through well-defined interfaces.**

UNIX Philosophy guidelines are nicely summarized by Peter H. Salus. in *A Quarter-Century of Unix*:

This is the Unix philosophy: Write programs that **do one thing and do it well**. Write programs to **work together**. Write programs to handle text streams, because that is a **universal interface**.

### Twelve-Factor App Methodology

The [Twelve-Factor App Methodology](https://12factor.net/) is a very useful set of principles and guidance for developing microservices-based architectures, which helps avoid most common pitfalls and problems during software design. Here are the 12 factors:

* Codebase: One codebase tracked in revision control, many deploys

* Dependencies: Explicitly declare and isolate dependencies

* Config: Store config in the environment

* Backing services: Treat backing services as attached resources

* Build, release, run: Strictly separate build and run stages

* Processes: Execute the app as one or more stateless processes

* Port binding: Export services via port binding

* Concurrency: Scale out via the process model

* Disposability: Maximize robustness with fast startup and graceful shutdown

* Dev/prod parity: Keep development, staging, and production as similar as possible

* Logs: Treat logs as event streams

* Admin processes: Run admin/management tasks as one-off processes

> **The 12-Factor App Methodology helps us design software and supporting DevOps processes in a manner consistent with modern microservices-based architecture.**

### Putting it all together

Designing a good architecture using microservices approach is pretty challenging. Applying the knowledge from the theories and models above can help create a first draft of any architecture:

 1. Start by understanding requirements in the context of Distributed Systems and its fallacies. Will the system need to span multiple data centers? How do you plan to address the eight fallacies of distributed computing? Will your system take advantage of public cloud offering?

 2. Think about how services will communicate. Is there a need to manage state as a result of communication (actor model)? Is there a need to react to events (event-based architectures)?

 3. What are the requirements around data management? Which two elements of the CAP Theorem should be satisfied by which microservice?

 4. How can you support developers by providing and helping introduce microservices-oriented design patterns and practices (Twelve-Factor App and UNIX Philosophy)?

### Conclusion

The architecture of microservices-based distributed systems is a complex task involving much more than mentioned in this blog; we haven’t talked about security, testing, DevOps, infrastructure as code just to mention a few important topics.

The goal was to expose aspiring software architects to theoretical foundations of microservices-based systems and maybe give some food for thought to more experienced architects. In my opinion, it is worth the effort to familiarize yourself with these theories and know when to apply which.

You can find me on [GitHub](https://github.com/Piotr1215?tab=repositories) or leave a comment in the responses section. I would love to hear about your experiences with designing microservices-based architectures and what helped you make your architecture great.

