---
title: AZ-303 Certification Guide
sidebar_label: AZ 303
tags:
    - Azure
    - Certification
---

## Introduction

![](https://miro.medium.com/max/1200/1*wXeXxddbjKQdj8-f07Kc4Q.png)

AZ-300 Certification Badge

I recently passed [Exam: AZ-300: Microsoft Azure Architect Technologies](https://docs.microsoft.com/en-gb/learn/certifications/exams/az-300). This exam is one of two to earn Microsoft Certified: Azure Solutions Architect Expert certification.

I also created a GitHub repository with links to documentation and detailed description of learning progress.

[https://github.com/Piotr1215/az-300-prep-kit](https://github.com/Piotr1215/az-300-prep-kit)

Exam curriculum is based on material update from **December 4, 2019.**

The most significant change is increasing infrastructure related questions to almost half of the exam questions and reducing section dedicated for development in cloud. After the update the exam leans very heavily towards infrastructure and workloads (networking, load balancing, backup&migration, server-less, storage accounts, VMs, infrastructure as code, active directory, MFA, RBAC).

See below announcement from exam page

> _Exam AZ-300: Microsoft Azure Architect Technologies The content of this exam was updated on December 4, 2019. Please download the Skills measured document below to see what changed._

Best resource is to practice yourself what you learn in the portal, especially in the area of networking, virtual machines and active directory. Most of the resources listed below do not go deep enough into details and only way to understand the nuances of each topic is to practice it until “aha” moment is achieved.

1. [Plularsight Courses](https://app.pluralsight.com/paths/certificate/microsoft-azure-architect-technologies-az-300)
2. [Udemy “AZ-300 Azure Architecture Technologies Certification Exam” by Scott Duffy](https://www.udemy.com/course/70534-azure/)
3. [Official Microsoft exam page with free learning materials](https://docs.microsoft.com/en-gb/learn/certifications/exams/az-300)
4. [Video from MS Ignite with tips on taking the exam](https://myignite.techcommunity.microsoft.com/sessions/80470?source=sessions)
5. [Self paced Azure labs](https://www.microsoft.com/HandsOnLabs/SelfPacedLabs)
6. [Azure documentation](https://docs.microsoft.com/en-us/azure/)
7. [Quick-start ARM and Powershell templates](https://github.com/Azure/AzureStack-QuickStart-Templates)

Az-300 is focusing on practical use cases of Azure technologies. Exam has following characteristics:

1. Questions: **40–60** questions

- Some questions are worth 1 point
- Some questions cannot be skipped
- There are different types of questions: multiple-choice, build list, hot area, drag and drop, reorder etc
- There are also Performance based questions (labs) to be done in Azure portal
- Questions are often in context of Case Studies where you need to gather and understand information across multiple sources

2\. Duration: **3,5** hours

- Schedule 30 minutes for reading and understanding instructions and rest for actual exam.
- Take your time with the questions, it is important to read carefully with understanding. I have finished the exam more than 1 hour before end time, so there is plenty of time.

I had maybe 2–3 questions with some powershell commands and none with azure CLI, but of course each exam is different, so it’s best to stay safe and learn this as well.

- Use `az interactive` to enable CLI auto completion and helpful tips
- Use `powershell`, get help on commands and understand the order of command-lets (first create resource group, etc)

Preview features are not included, but you should keep an eye on the exam page and check for updates. For example, while I was preparing for the exam it has been updated and some preview features are now GA.

- [Exam with retake](https://eu1.mindhub.com/microsoft-exam-replay-mcp-exam-plus-retake/p/Microsoft-Exam-Replay?utm_source=msftmarketing&utm_medium=msft_offers&utm_campaign=ExamReplayFY20&utm_term=ERFY20&utm_content=weblink3)
- [Exam with retake and practice test](https://eu1.mindhub.com/microsoft-exam-replay-with-practice-test-mcp-exam/p/Microsoft-Exam-Replay-PT?utm_source=msftmarketing&utm_medium=msft_offers&utm_campaign=ExamReplayFY20&utm_term=ERFY20&utm_content=weblink)

You need to be very familiar with Azure Portal, know how to search for resources and create them quickly. Make use of tool tips (usually under small “?” icon), they often explain details you will need to finish the lab in case you don’t remember details for a service or resource.

- [Create free account on Azure and practice!](https://azure.microsoft.com/en-us/free/)

When I was confident I have enough preparation and understand the material, it was time to schedule the exam. Scheduling exam was important to set a date in calendar and make sure I stay focus and plan my time well.

10 days from exam I scheduled final preparation plan focusing on each section as below. Each time I would use the links, refresh core info, do a lab and most importantly go to Azure Portal and try to perform given task myself. I also used mind-maps and OneNote to keep the learning material organized.

- Days 1–3: Deploy and configure infrastructure (40–45%)
- Days 4–5: Implement workloads and security (25–35%)
- Day 6: Create and deploy apps (5–10%)
- Day 7: Implement authentication and secure data (5–10%)
- Day 8: Develop for the cloud and for Azure storage (15–20%)
- Day 9: Practice exams and mock questions, final review. Please don’t use so called braindumps. I used “Microsoft Azure AZ-300 Architecture Technologies Practice Exams” (bought cheap on Udemy during Cyber Week)
- **Day 10: EXAM!**

The exam focuses heavily on networking and VMs. Questions are really tricky with multiple layers of indirection and broad knowledge of even small properties of different Azure managed services is required to answer majority of the questions. Questions around virtual networks were most difficult for me, setting up load balances, connecting networks and all this under often complex and tricky requirements.

There is separate section for case study and separate section for labs. Case study requires good understanding of problem domain and requirements, so read each question very carefully, there is plenty of time.

Labs are not that difficult, but once or twice remote sessions hanged on me and exam was rebooted.

At the end what helped me pass was experience with Azure and trying everything on my own in Azure Portal, creating and solving problems and experimenting with virtual network and VMs.

