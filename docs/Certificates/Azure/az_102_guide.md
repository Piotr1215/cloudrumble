---
title: AZ-102 Certification Guide
sidebar_label: AZ 102
tags:
    - Azure
    - Certification
---

# AI-102: Designing and Implementing an Azure AI Solution

Certification [website](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/?practice-assessment-type=certification)
Study [guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102)

Here is a good list of all Azure AI services: https://azurecharts.com/overview/aiml

## Exam Facts

- [open book](https://techcommunity.microsoft.com/t5/microsoft-learn-blog/introducing-a-new-resource-for-all-role-based-microsoft/ba-p/3500870) policy allows you to use Azure Learn documentation resources during the exam
  > the best way to use it is to search for specific terms or concepts from the question and explore the documentation
- exam duration: 100 minutes, there will be additional 20 minutes for a survey. Using the documentation counts towards the exam time.
- number of questions: 40-60
- exam doesn't contain any labs however it's important to go through labs on MS Learn to understand the concepts in practice
- 700 points (70%) is required to pass the exam

## Free exam preparation resources

- MS Learn modules for [AI-102](https://learn.microsoft.com/en-us/collections/5d3kh0jz4gp?WT.mc_id=cloudskillschallenge_045dddda-f6f3-4077-8072-7d5b157b3849)
- 50 questions [practice assessment](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/practice/assessment?assessment-type=practice&assessmentId=61&practice-assessment-type=certification)
- familiarize yourself with the [exam interface](https://go.microsoft.com/fwlink/?linkid=2226877)
- free certificate course by John Savill [here](https://www.youtube.com/watch?v=I7fdWafTcPY&t=1371s)

### Learning with ChatGPT

Since the release of GPT-4o the number of tokens increased significantly and the model is also available for free tier users. You could use the following prompt to generate
questions for the exam and provide feedback from the LLM.

```text
I'm preparing for the exam AI-102: Designing and Implementing an Azure AI Solution. I would like to generate questions for the exam.

VARIABLES:
- NR_OF_QUESTIONS: 50
- QUESTIONS_AT_A_TIME: 1
- SCENARIO_LENGTH: short
- QUESTION: which service would you choose to accomplish the scenario
- ANSWER_TYPE: single choice

QUESTIONS:
**Scenario**: describe question's scenario and let me answer "$QUESTION". Make the questions scenario "$SCENARIO_LENGTH".
List of answers of type "$ANSWER_TYPE".

My response will be number(s) or letter corresponding(s) to the answers. If my response is incorrect, tell me why and explain what is the correct response, if my response is correct, continue.
Produce "$QUESTIONS_AT_A_TIME" question(s) at a time, session for max "$NR_OF_QUESTIONS". Do you understand? Feel free to ask clarifying questions before we proceed, otherwise
let's start.
```

ChatGPT will generate response similar to the following:

```text
Got it! I'll generate one question at a time, with a short scenario, and you'll choose the appropriate Azure AI service from a list of single-choice answers. If your response is incorrect, I'll explain why and provide the correct answer. We'll continue this way until we've covered 50 questions.

Let's start with the first question:

**Scenario 1**: You need to analyze customer feedback from social media to understand the overall sentiment. Which Azure AI service would you choose to accomplish this scenario?

a) Azure Cognitive Search
b) Azure Form Recognizer
c) Azure Text Analytics
d) Azure Speech Service

Please respond with the letter corresponding to your answer.
```

Alternatively you can try a [custom GPT](https://chatgpt.com/g/g-Qx4F68UYu-ai-102-exam-coach) I have created for this purpose. This GPT uses additional training data to generate questions and provide feedback.

## Skills measured

## Skills measured as of March 28, 2024

### Audience profile

As a Microsoft Azure AI engineer, you build, manage, and deploy AI solutions that leverage Azure AI.

Your responsibilities include participating in all phases of AI solutions development, including:

- Requirements definition and design
- Development
- Deployment
- Integration
- Maintenance
- Performance tuning
- Monitoring

You work with solution architects to translate their vision. You also work with data scientists, data engineers, Internet of Things (IoT) specialists, infrastructure administrators, and other software developers to:

- Build complete and secure end-to-end AI solutions.
- Integrate AI capabilities in other applications and solutions.

As an Azure AI engineer, you have experience developing solutions that use languages such as:

- Python
- C#

You should be able to use Representational State Transfer (REST) APIs and SDKs to build secure image processing, video processing, natural language processing, knowledge mining, and generative AI solutions on Azure. You should:

- Understand the components that make up the Azure AI portfolio and the available data storage options.
- Be able to apply responsible AI principles.

### Skills at a glance

- Plan and manage an Azure AI solution (15–20%)
- Implement content moderation solutions (10–15%)
- Implement computer vision solutions (15–20%)
- Implement natural language processing solutions (30–35%)
- Implement knowledge mining and document intelligence solutions (10–15%)
- Implement generative AI solutions (10–15%)

