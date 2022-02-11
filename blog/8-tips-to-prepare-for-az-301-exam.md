---
title: "8 Tips to Prepare for Az 301 Exam"
date: 2019-12-28T20:04:23+02:00
tags: ['azure', 'certification']
---

![](https://miro.medium.com/max/1400/1*XgjNqx3rsImpoYzifqnx8w.png)

Microsoft Certified: Azure Solutions Architect Expert certification — learning path

This blog is a second part of preparation for **Microsoft Certified: Azure Solutions Architect Expert** certification**.** Here I talk about how I prepared for AZ-301 Exam. You can find second part, preparation for AZ-300 [here](https://medium.com/@piotrzan/8-tips-to-prepare-for-az-300-exam-cadff5532394).

<!--truncate-->

I also created a GitHub repository with links to documentation and detailed description of learning progress.

[https://github.com/Piotr1215/az-301-prep-kit](https://github.com/Piotr1215/az-301-prep-kit)

Exam curriculum is based on material update from **December 4, 2019.**.

See below announcement from exam page:

> _Exam AZ-301: Microsoft Azure Architect Design The content of this exam was updated on_ **_December 4, 2019._** _Please download the Skills measured document below to see what changed._

- Determine workload requirements (10–15%)
- Design for identity and security (20–25%)
- Design a data platform solution (15–20%)
- Design a business continuity strategy (15–20%)
- Design for deployment, migration, and integration (10–15%)
- Design an infrastructure strategy (15–20%)

This exam is different than AZ-300, questions are geared towards design and architecture best practices in Azure rather than concrete implementations. Still, it’s important to practice yourself in the portal, but not as essential as for AZ-300.

Resources also contain recommendations how to make best use of each one. At least this was how I was using each resource and it yielded good results.

> Resources are ordered from used least often to used most often (please note that this is purely subjective on my part and something else might work better for you)
<!--truncate-->
1. [Video from MS Ignite with tips on taking the exam](https://myignite.techcommunity.microsoft.com/sessions/78629?source=sessions), **how to use:** watch one time to understand exam requirements and learn about varioius tips and tricks.
2. [Cloud Design Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/), **how to use**: use as support resource if you want to know more about any given topic.
3. [Azure Architecture Center](https://docs.microsoft.com/en-gb/azure/architecture/), **how to use**: if you are interested in learning more about given topic, look it up on the architecture center and study.
4. [Self paced Azure labs](https://www.microsoft.com/HandsOnLabs/SelfPacedLabs), **how to use**: perform labs and/or read the documentation: Links are scattered across README files.
5. [Azure Tips and Tricks Youtube playlist curated by Microsoft](https://www.youtube.com/playlist?list=PLLasX02E8BPCNCK8Thcxu-Y-XcBUbhFWC), **how to use**: choose videos you are interested in and watch, most of the videos are very short and have enough info to help you understand the topic.
6. [Pluralsight Courses](https://app.pluralsight.com/paths/certificate/microsoft-azure-architect-design-az-301), **how to use**: View while learning certain topic: Links to videos from [Pluralsight](https://app.pluralsight.com/paths/certificate/microsoft-azure-architect-design-az-301) are scattered across README files or watch on demand.
7. [LinkedIn Learning](https://www.linkedin.com/learning/me), **how to use**:

- There are plenty of detailed short videos describing many topics needed to pass the exam in detail.
- You will need to start free month with LinkedIn, but you can cancell afterwards
- Search topic you are interested in (copy/paste from exam topics) and watch videos
- Content is detailed and almost always has a lot of Azure Portal print screens

[8\. Udemy “AZ-301 Azure Architect Design Exam Prep” by Scott Duffy](https://www.udemy.com/course/az301-azure/), **how to use**: Watch relevant section and try to follow along on Azure Portal.

[9\. Azure Landing Page](https://azure.microsoft.com/en-ca/), **how to use**:

- This is main resource I was working with most of the time
- Select “Products” and what you want to learn about. From there you will have access to full documentation and other areas. I highly recommend checking out the “Pricing” section as well as “FAQ”, they both contain information useful during the exam.

![](https://miro.medium.com/max/1400/0*jZvUvQCjN3ICzcL_.png)

- Another very useful resource are Solutions -> Solution Architectures. This gives you a good overview how reference architectures are setup on Azure and helps a lot with the exam. Some of them have even source code and ARM templates on GitHub as well as Visio and other diagrams to help better understand the solution. For example, it’s much easier to learn about Web Apps with a [reference architecture to play with](https://docs.microsoft.com/en-gb/azure/architecture/reference-architectures/app-service-web-app/basic-web-app).

![](https://miro.medium.com/max/1400/0*8a95sRZv0dAyEePi)

10\. [My repository](https://github.com/Piotr1215/az-301-prep-kit) where I gathered useful links and info. Use GitHub search functionality to find quickly what you need or simply navigate through README files.

AZ-301 is focusing on design strategies and architecture using Azure services and technologies. Exam has following characteristics:

1. Questions: **40–60** questions

- Some questions are worth 1 point
- Some questions cannot be skipped
- There are different types of questions: multiple-choice, build list, hot area, drag and drop, reorder etc
- There are also Performance based questions (labs) to be done in Azure portal
- Questions are often in context of Case Studies where you need to gather and understand information across multiple sources

2\. Duration: **3,5** hours

- Schedule 30 minutes for reading and understanding instructions and rest for actual exam.
- Take your time with the questions, it is important to read carefully with understanding. I have finished the exam more than 1 hour before end time, so there is plenty of time.

I had no questions where I had to use powershell or Azure CLI , but of course each exam is different, so it’s best to stay safe and learn this as well.

- Use `az interactive` to enable CLI auto completion and helpful tips
- Use `powershell`, get help on commands and understand the order of command-lets (first create resource group, etc)

Preview features are not included, but you should keep an eye on the exam page and check for updates. For example, while I was preparing for the exam it has been updated and some preview features are now GA.

- [Exam with retake](https://eu1.mindhub.com/microsoft-exam-replay-mcp-exam-plus-retake/p/Microsoft-Exam-Replay?utm_source=msftmarketing&utm_medium=msft_offers&utm_campaign=ExamReplayFY20&utm_term=ERFY20&utm_content=weblink3)
- [Exam with retake and practice test](https://eu1.mindhub.com/microsoft-exam-replay-with-practice-test-mcp-exam/p/Microsoft-Exam-Replay-PT?utm_source=msftmarketing&utm_medium=msft_offers&utm_campaign=ExamReplayFY20&utm_term=ERFY20&utm_content=weblink)

There are labs, but you just navigate through portal and identify information or fix problems. You need to be very familiar with Azure Portal, but it’s not as critical as for AZ-300. Know how to search for resources and create them quickly. Make use of tool tips (usually under small “?” icon), they often explain details you will need to finish the lab in case you don’t remember details for a service or resource.

- [Create free account on Azure and practice!](https://azure.microsoft.com/en-us/free/)

When I was confident I have enough preparation and understand the material, it was time to schedule the exam. Scheduling exam was important to set a date in calendar and make sure I stay focus and plan my time well.

10 days from exam I scheduled final preparation plan focusing on each section as below. Each time I would use the links, refresh core info, do a lab and most importantly go to Azure Portal and try to perform given task myself. I also used mind-maps and OneNote to keep the learning material organized.

- Day 1: Determine workload requirements (10–15%)
- Days 2–3: Design for identity and security (20–25%)
- Day 4: Design a data platform solution (15–20%)
- Day 5: Design a business continuity strategy (15–20%)
- Day 6: Design for deployment, migration, and integration (10–15%)
- Day 7: Design an infrastructure strategy (15–20%)
- Day 8–9: Practice exams and mock questions, final review. Please **don’t** use so called braindumps. I used [AZ-301: The complete practice test, Azure Architect Design](https://www.udemy.com/course/exam-az-301-microsoft-azure-architect-design-test/) (bought cheap on Udemy during Cyber Week)
- **Day 10: EXAM!** Make sure to get plenty of sleep and schedule the exam in the time when you are most active (for me it is late morning)

The exam questions spread was pretty much as advertised, I felt that there were too many questions about SQL Databases, but it could be just perception. There are labs in this exam (I got 2 labs, 6 questions each). The labs are different than AZ-300 in a sense that you don’t need to create or change any Azure resources but rather identify problems and find information needed to answer lab questions. Still, good knowledge of Azure portal is required.

Similarly to AZ-300 exam, it was important to know details of Azure offerings, for example types of premium disks, compute SKUs for App Service Plans, difference between redundancy options or exact differences between storage type V1 and V2. It is important to memorize those details as it is needed during the exam.

At the end the knowledge of those details made all the difference.

