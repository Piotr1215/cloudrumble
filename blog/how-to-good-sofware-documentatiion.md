---
title: "How to Good Sofware Documentatiion"
date: 2021-02-09T15:25:48+02:00
tags: ['documentation', 'automation', 'devops']
---
I have given a talk about this topic at the WorldWide Architecture Summit 2 on the 3rd of August 2021. You can find the [talk recording here](https://www.youtube.com/watch?v=-YmLFMDUzv0&t=1525s).

![Photo by [Maarten van den Heuvel](https://unsplash.com/@mvdheuvel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/9796/1*0X-pNeFVsj_4w0nC1qKC8Q.jpeg)

<!--truncate-->

## How to create and maintain good software documentation

## Introduction

In this blog we will focus on software documentation, namely the documentation produced by teams and individuals involved in defining and developing software (architects and developers). There are other complementing types of documentation like requirements, business analysis, etc which we will not be focusing on.

How many times we jump into an existing active project or take on maintenance of “legacy” software, only to find out that documentation is either missing or not sufficient.

This is unfortunately a very common experience for many development teams. Why is this happening? There are a few reasons:

* The pace of software development is constantly increasing to respond to more and more complex market demands. Activities deemed as “non-essential” like documentation and sometimes even testing(sic!) are brushed aside in favor of increasing output of features.

* Documentation is hard to maintain over time as more complex software leads to more complex documentation.

* Diagrams and drawings tend to be very brittle and as software evolves, they too became outdated.

* Developing documentation is also well … boring, most developers prefer to focus on interesting features, improving efficiency, coding.

### Software documentation goals

Knowing all the effort and time required to address the above points, let’s ask ourselves: why even bother? Why is software documentation important? Good documentation plays critical role in following scenarios:

* Onboarding of new team members. Every time new developer joins the team, good documentation will help in fast orientation and will not require extensive time investment from other team members to teach good fundamental level of the project knowledge.

* Regulatory requirements and audit. If the software you are developing must undergo external or internal audits or is influenced by any regulatory requirements, then good documentation makes it much easier to work with auditors. Sometimes documentation is even a strict requirement for audit.

* Communication with all stakeholders. Good documentation enables all types of stakeholders to understand software in the context they are interested in. If documentation takes into consideration different types of stakeholders and carefully adjusts wording to be less or more technical, then it saves the team a lot of time otherwise spent on explaining and translating software system properties to everyone.

### Software documentation characteristics

Let’s define desired characteristics of software documentation to fit into modern, rapid pace of development.

**Simple**. Documentation should be simple and minimalistic to decrease maintenance effort and make sure all stakeholders (including new developers) can understand the core concepts.

**Holistic. **Different types of documentation consumers will require different contexts. Good documentation should account for all stakeholders and make sure everyone can participate and understand. Enabling real time collaboration is another important goal.

**Automated**. In order to make sure that documentation is maintained over time and there is only minimal impact on development teams, most of the diagrams, charts and specifications should be as automated as possible.

**Reusable**. Software documentation structure, vocabulary and model should be reusable for any new software projects, so having a structured but in the same time flexible documentation model is very useful.

**Portable**. It should be easy to generate and distribute documentation independently on any hosting medium. Like with any other software, avoiding vendor lockin might be a concern for your company, so designing the core of your documentation in a way that is portable is a good practice.

## Implementation

In this section we will look at different tools, frameworks and documentation models to fulfill documentation characteristics requirements. We are going to focus mostly on open source tools and standards.

Below diagrams shows tools, frameworks and standards we will use to implement our documentation strategy later on.

![SHARP](https://cdn-images-1.medium.com/max/2062/1*3ZizAdNny__yu-ciHR4ysQ.png)

### Tools and Standards

Now, we will focus on specific tools and standards that can be used to implement our strategy. Please note that there are almost always alternatives to each tool, framework or standard. For simplicity I’m recommending the ones I’m familiar with that I know work well together. You can think about it as a starter pack for good software documentation.

### Simple

To keep documentation simple, we need a suitable medium. Most documentations nowadays are either in MS Word or pdf, but I believe that Markdown is a better choice. Markdown is a lightweight, HTML-like markup language that is very common in software projects (README.md files etc). It is more scalable and easy for developers to use markdown rather than complex text editors like MS Word. Added bonus is that markdown files can be directly edited in IDEs or code editors like Visual Studio, Visual Studio Code, Atom or WebSharper etc.
[**Markdown Guide**
*A free and open-source reference guide that explains how to use Markdown.*www.markdownguide.org](https://www.markdownguide.org/)

### Holistic

There is no specific tool that I know of that will make your documentation understandable by all stakeholders ;). You will need to make an effort to do so. Defining common vocabulary as well as logical naming conventions is a good first step!

### Automated

PlantUML is one of my favorite tools for rendering diagrams. Diagrams in PlantUML follow “…as code” movement. Where diagram is generated on the fly from simple domain specific language.

One important characteristics of PlantUML is ability to render diagrams on the fly without converting them into pictures. This is very useful and allows all online documentation that links to centralized diagrams repository to be updated automatically
[**Open-source tool that uses simple textual descriptions to draw beautiful UML diagrams.**
*PlantUML is a component that allows to quickly write : The following non-UML diagrams are also supported: Diagrams are…*plantuml.com](https://plantuml.com/)

In order to document API resources (REST) or methods (RPC) in an automated way, we can use documentation generators like Swagger that generate documentation from code comments or from API Spec.
[**API Documentation**
*Swagger takes the manual work out of API documentation, with a range of solutions for generating, visualizing, and…*swagger.io](https://swagger.io/solutions/api-documentation/)

Each separate markdown file or whole documentation repository can be imported into HackMD where all stakeholders can participate in a live collaboration session to add notes and develop documentation together. HackMD in and of itself is a very powerful tool with other useful features, check it out! After importing particular markdown file, it can be exported back to a repository.
[**HackMD - Collaborative Markdown Knowledge Base**
*We've looked for ways to make our team discussions and process more visible and accessible to all users. We recently…*hackmd.io](https://hackmd.io/)

Finally, documentation for particular software project should be encapsulated in its own repository, linking markdown files and other artifacts from other repositories belonging to the same software project. Part of CI/CD pipeline should be automated building and deployment of the documentation artifacts.

Automating as much as possible will ensure that documentation is maintained over time.

### Reusable

To make documentation reusable we need to agree and follow on standards and best practices that all software projects will adhere to.

Here are some standards and models that I find helpful in defining documentation outline.

TOGAF is and Enterprise Architecture Methodology and is mostly aimed at enterprise architects, providing guidelines and models for high level enterprise architectures.

For development teams, documentation following TOGAF standard will likely be and upstream reference that allows alignment with global company architecture standards.
[**TOGAF**
*The TOGAF Standard, Version 9.2, is an update to the TOGAF 9.1 standard providing improved guidance, correcting errors…*www.opengroup.org](https://www.opengroup.org/togaf)

arc42 is a template for communication and documentation. It creates scaffolding and structure helping place topics in right context appropriately addressing various stakeholders.
[**arc42 Template Overview**
*arc42 answers the following two questions in a pragmatic way, but can be tailored to your specific needs: What should…*arc42.org](https://arc42.org/overview/)

C4 model helps with putting structure around diagrams and visual artifacts for software documentation. It fits very well with arc42 approach.
[**The C4 model for visualising software architecture**
*A person represents one of the human users of your software system (e.g. actors, roles, personas, etc). A software…*c4model.com](https://c4model.com/)

PlantUML was mentioned before in context of diagrams automation rendering, but it is an amazing tool for visualizing software in an “…as code” way.

PlantUML has a lot of plugins for different programming languages allowing for quick diagrams generation based on source code. There are also plugins that can do reverse operation, namely g[enerate code based on planUML class diagram](https://github.com/bafolts/plantuml-code-generator).

We are not going to dive deeper into different software diagram types and their usage, but suffice to say they are all supported by PlantUML.
[**Open-source tool that uses simple textual descriptions to draw beautiful UML diagrams.**
*PlantUML is a component that allows to quickly write : The following non-UML diagrams are also supported: Diagrams are…*plantuml.com](https://plantuml.com/)

### Portable

Our documentation so far is based on open standards, uses open source flexible and powerful tools. Now it’s time to make it available to all stakeholders.

In order to make documentation portable, we need to be able to generate it based on our markdown files and present in an easily consumable form. Best way to do it is deliver documentation as a web page based on static files or HTML generated on the fly.

Docsify is one of my favorite tools for serving documentation transformed to HTML from markdown files based on a few simple configuration files. You can see results of this transformation [on my website](https://dcaguide.net/#/) dedicated to preparation for Docker Certified Associate.
[**docsify**
*A magical documentation generator.*docsify.js.org](https://docsify.js.org/#/)

Another approach is to serve documentation a static website that is build during build process (part of CI/CD pipeline). There are plenty of static site generators, which by the way are useful in many more scenarios than generated documentation. One of my favorite generators is Hugo
[***The world's fastest framework for building websites***
The world's fastest framework for building websitesgohugo.io](https://gohugo.io/)

Once our documentation is ready and CI/CD pipeline is created, we can deploy it to a hosting provider. One such provider is Netlify, but there are many others. If you are interested in how static sites can be deployed, check out [my blog about this topic](https://itnext.io/5-static-websites-deployment-options-d0aac1570331).
[**Netlify: Develop & deploy the best web experiences in record time**
*A powerful serverless platform with an intuitive git-based workflow. Automated deployments, shareable previews, and…*www.netlify.com](https://www.netlify.com/)

### Advanced topics

There are three additional topics that are more advanced, but I think it’s worth discussing them briefly. If you are interested, please study further, links are provided.

* Developer Portals

* Automated Deployment Diagrams

* File conversion

Developer portals enable development teams to not only share common documentation but much more. Spotify recently [donated to CNFC ](https://backstage.io/blog/2020/09/23/backstage-cncf-sandbox)their home grown developer portal that has smart documentation as part of its offering.
[**Backstage Service Catalog and Developer Platform · An open platform for building developer portals**
*At Spotify, we've always believed in the speed and ingenuity that comes from having autonomous development teams. But…*backstage.io](https://backstage.io/)

Deployment diagrams, especially on public cloud providers should represent actual state of the infrastructure. Such automation is possible with Hava (please note that this is a commercial product). There was also a tool called Arcentry which was open source, but is since discontinued.
[**Azure, GCP and AWS Diagrams Automated | Hava**
*If you would like a chat about how hava.io can help your team document, monitor and diagnose your cloud infrastructure…*www.hava.io](https://www.hava.io/)

Finally, to satisfy corporate requirements around document formats, like pdf or docx, you can use Pandoc to quickly convert between different document types. Pandoc has rich support for various formats, not only pdf or docx, but those are most common.
[**About pandoc**
*If you need to convert files from one markup format into another, pandoc is your swiss-army knife.*pandoc.org](https://pandoc.org/)

### Putting it all together

Below diagram shows how one centralized documentation repository per product or project could be used to maintain software documentation including files from different repositories compose software (for example with microservices architecture).

![](https://cdn-images-1.medium.com/max/2608/1*z5b5d7bCPn5hG5e4aakqzg.png)

### Summary

Software documentation is very important, but its creation and maintenance can be problematic. In this blog, we have learned what constitutes good documentation using SHARP acronym (Simple, Holistic, Automated, Reusable, Portable).

We have defined what constitutes good documentation and what are goals that software documentation fulfills.

Finally we have reviewed different open source tools that can help us create, maintain and publish high quality software documentation.

Hopefully this is a good start on your journey to high quality, sustainable software documentation. There is much to explore!

