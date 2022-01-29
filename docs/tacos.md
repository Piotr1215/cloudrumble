# Infrastructure as Code platform & workflow

## Requirements

 The document is written with my understanding of what we need in order to create QA environments in a self-servicing, repeatable and secure manner.

 There are surely other requirements that I'm not aware of which need to be added.

## Terraform fundamentals

[Infrastructure as Code (IaC)](https://en.wikipedia.org/wiki/Infrastructure_as_code) is a common pattern where virtualized infrastructure and auxiliary services can be managed using configuration expressed in almost any language, usually hosted in a source code repository.

IaC enables automated, repeatable and reliable creation and maintenance of any virtualized infrastructure. This is especially important with creating environments on demand as well as managing infrastructure on multiple providers.

Hashicorp's [terraform](https://www.terraform.io/) and the open source ecosystem built around it is nowadays de facto a standard for Infrastructure as Code IaC. Standalone terraform workflow is great, but quickly becomes unmanageable when used at scale.

A typical simple implementation of a standard terraform workflow could consist of:

- integrating terraform CLI into CI/CD pipelines by utilizing GitLab terraform runner or a standalone container
- configuring terraform remote backend (also possible with GitLab) to store state enabling collaboration between different teams
  - as a side note, state file needs to be locked if concurrent runs are enabled to avoid overrides when running in a single environment

The above steps are possible with the standard terraform tooling, but there are challenges that need to be addressed along the way too:

- integration with common development best practices, like code reviews, updates via Merge Request, handling Feature Branches
- RBAC; as the solution matures, different roles are able to perform different tasks in different environments, such as apply only, deletion etc
- Audit history - who runs what, what was the result, ability to revert to previous state
- Infrastructure governance & policies for example using OPA
- Enabling of efficient self-service for Dev/QA teams, like creation and destruction of testing environments

Doing IaC at scale in the right way is hard! Since we are not in a cloud environment, this is even harder. Doing so means investing significant time and resources to design, develop and maintain the solution.

## Time for TACOS!

TACOS 🌮 🌮 🌮 stands for **T**erraform **A**utomation and **CO**laboration **S**oftware and it provides a framework for solving the problems with operating IaC at scale.

### Benefits of using TACOS

#### Cloud workspace

is typically a SaaS product providing a uniform layer of abstraction by integrating:

- terraform runtime environment, state, history, secrets & variables management,
- RBAC - fine graded permissions
- policy management for particular environment managed by terraform.

#### Remote operation mode

One benefit come from the **remote operation mode** of the runtime concerns. Important to note is that any vendor that offers cloud workspaces also typically offers on prem dedicated runners, so ony the runtime and UI part are on the cloud. The actual deployments and configuration/data can be safely managed on prem behind a firewall.

#### Remote State management

Another benefit comes from the ability to manage different environments created with different versions of terraform

**Remote state management** is optional. We can store the remote state in GitLab and only use the cloud workspace.

#### RBAC

We can configure many layers of **RBAC** and in many ways. Eg. we can grant permissions to do terraform plans (even from localhost) to many people. Then we can restrict terraform apply to smaller group of users, we can add them as approvers before any change. Other people can manage configuration for the environment. And eg. no-one except global admin can see and manipulate cloud credentials used by service principal to do changes in the environment. Some of TACOS also have feature to configure iheritance between multiple layers like global - group /project - particular workspace.

#### Observability

TACOS provide better **visibility** on what has happened in the environment in regards to changes made by terraform during the whole lifespan. With self-made approach we usually need to search through many runs of pipelines to see what resources were added, modified, deleted. This info is easily accessible in TACOS also with information who or what triggered that action. We can also see history of terraform plans.

#### Policy as Code

**Policy as Code** can be also leveraged by TACOS which would improve governance and security. TACOS can utilize tools like Open Policy Agent where it would work by blocking a Merge Request of non-compliant terraform code to the main branch. These policies can be reused between an on-prem Kubernetes cluster policies .

> [!INFO] this is something we should look into for our Kubernetes setup to improve our security posture

### Recommended TACOS flow

The below diagram shows a recommended TACOS flow with GitOps principles.

![TacosFlow](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/gitops-tacos-flow.puml&fmt=png)

It is worth pointing out that instead of communicating with TACOS provider directly via Web UI, it is also possible to use CLI or REST API.

The diagram captures only the infrastructure provisioning part. Once the VMs or other infrastructure are ready, the workload deployments can start. Applications deployment can be triggered by the TACOS provides, but it should be a separate pipeline.

### Security considerations

Most of the TACOS providers offer a self-hosting option with TACOS runners behind a firewall. Storing variables and secrets for pipeline triggering, SSH credentials etc can be done either in on-prem vault or TACOs provider vaults.

## TACOS Providers Overview

### Terragrunt

https://terragrunt.gruntwork.io/ It’s not a TACOS but it’s probably the first open source thing we would found trying to search for terraform automation. It’s another binary which adds a testing layer on the top of plain terraform. The main goal of Terragrunt is to keep terraform code DRY. Not only in my opinion it was a relevant tool where terraform itself wasn’t mature enough. Good usage of terraform modules and having a good infrastructure setup structure and configuration are solving these concerns.

### Atlantis

https://www.runatlantis.io/ It’s also not a full TACOS but it was a first open source tool which tries to add terraform automation to PRs. Webhooks from PRs with terraform code change can be configured to communicate with Atlantis binary (which must be hosted within the infrastructure) where terraform plan and eventually apply can be run. It gives output back to PR for visibility and the process can be also configured that only PR with successful terraform plan can be merged.
This functionality is currently available in all TACOS (via VCS flow), btw. original Atlantis developers are currently working in HashiCorp I think it would make sense to use it only if we want to create our flow without TACOS.

### Terraform Cloud TFC/Terraform Enterprise TFE

https://www.hashicorp.com/products/terraform
An offer from terraform original inventors - HashiCorp. Both of them can provide same functionality, the main difference is in the hosting schema. TFE is a private installation, where TFC is a classic multi-tenant SaaS offering.
It covers all areas mentioned at the beginning of this article. I am going to use it as reference solution and I will mention differences in other products. But only the highest (business tier) in TFC supports private agents, so I think we can’t consider any other tier.
Useful concept here is also Notifications https://www.terraform.io/docs/cloud/workspaces/notifications.html it can trigger webhooks, send emails or notify slack channel after various events in a workspace.
> [!INFO] HashiCorp is infamous for not having a clear pricing policy. Other companies    are using that in their advertisements for competing solutions.
 I was trying to use TFC (didn’t want to host anything) where I wanted to have agents within my infrastructure, so only TFC for business was applicable there. They had a combination of number of users, number of concurrent runs and number of successful applies. It could be purchased only in advance for 1 year. They told me that it’s very important to choose parameters of contract right as they can’t be changed during the contract. If I remember it correctly they wanted around 12k USD per year for 5 users, 1 concurrent run and 100 applies per month. I also have heard from other people that they are trying to propose other schema based only just on a number of applies, something like 4$ for each.

I am giving them credit for creating terraform and practically starting this industry but I don’t like their unfriendly business approach to customers. They also don’t offer any additional features in comparison to competitors.

### Scalr

https://www.scalr.com/ has a very comparable offering to TFC/TFE, all main features are included. They were openly advertising themselves as a replacement for TFC/TFE but with fair price policy, but I can’t find that statement on their website anymore
They provide multi-tenant SaaS and self-managed solution (for higher volumes, minimal contract per year 30k USD, charged 40 USD per workspace monthly) as well.

Scalr has a concept of Custom Hooks https://docs.scalr.com/en/latest/workspaces.html#custom-hooks which can enhance terraform workflow. It can run other terraform commands (like fmt), shell scripts and API calls before and after terraform plan or apply respectively.

Scalr also has classic webhooks https://docs.scalr.com/en/latest/webhooks.html which can be triggered after various events. Configuration is split between webhooks and endpoints internally. It also has integration with Zapier.

They used to have billing based on number of users and concurrent runs a few months back, when I compared it to TFC it was 2-3 times cheaper without rigid contract restrictions. If I remember it correctly they charged 500 USD per additional concurrent run monthly. Now they have pure consumption based plans with some form of prepaid credits and environment limitations.

Due to private agents feature (which is necessary in my opinion) we can only consider the highest “Pro” tier. They are including 5 concurrent runs right away there. We can start small and easily grow with that plan. It has a concept of number of available runs and minutes in the plan and over usage is just added on the top of the main fee.
We can disregard available minutes completely as we would use self-hosted agents.
The only minor concern I have is that they are counting terraform plans and applies as same. Hard to estimate how much plans we will have during development to see if it would be a problem or not. It starts on $299 per month with 100 runs.
https://www.scalr.com/pricing

Regarding compliance and certifications they are referring to SOC2 on their website but it’s not clear there. They are advertising that they have customers on Azure Federal Cloud.

Scalr has a concept of RBAC layers and inheritance (also for credentials, etc.). It can serve eg. as distinction between prod and non-prod or between projects. Cloud credentials can be defined in the top layer and then propagated down to particular workspaces. The same with authorization configuration.

We can use Workspace state sharing https://docs.scalr.com/en/latest/state_sharing.html to share information between “platform” and “project scoped” environments. It’s actually more a matter of terraform itself, Scalr is helping with accessibility.
In my opinion Scalr has better UI with more information about terraform runs. Eg. a view with number of added, changed, deleted resources per resource type with option to drill down into details. Compare that with plain terraform plan output when trying to see something particular in lengthy list.
I have also a good experience with their support, they are helpful and reacting fast.

### Env0

https://www.env0.com/ has TACOS capabilities but it’s pretty different kind of beast than TFC or Scalr. It’s closer to general purpose CI/CD system as they are focusing a lot on Custom Flows https://docs.env0.com/docs/custom-flows where any kind of script, ansible, etc. can be added into terraform workflow (before and after apply, etc.). They support terraform and Terragrunt (I think it’s not important anymore) templates.
It has capability to do automatic drift detection https://docs.env0.com/docs/drift-detection where Env0 can notify or take action after some external process or user is changing Cloud environment from outside of terraform.

Env0 has an interesting concept of costs management. It can monitor real costs and correlate them with terraform deployments, it can also setup limits for teams and users on spending.

It can also work with TTL for whole environments and delete them automatically. https://docs.env0.com/docs/policy-ttl It can help with feature environments setup.

Besides interesting features mentioned above I also have a quite a lot concerns with other things. There is no support for PR automation with AzDO yet https://docs.env0.com/docs/plan-on-pull-request . It doesn’t provide access to statefiles, they are being managed somehow behind the scene. I also haven’t found any option to integrate with terraform CLI, so it seems it doesn’t support classic remote run like TFC or Scalr. Documentation is not providing enough details.

Pricing model https://www.env0.com/pricing is going from charging per environment in basic tier to charging per maximum amount of applies per month in the business tier. Only that tier supports self-hosted agents, but it looks quite pricey and inflexible to me. With 200 applies per month it costs 1199 USD.

It’s definitely an interesting piece of software but I can’t imagine using it in its current shape.

### Spacelift

https://spacelift.io/ same as Env0 has TACOS capabilities but it’s also pretty different than TFC or Scalr, but in different way than Env0. It’s also somehow closer to general purpose CI/CD systems and it’s probably the most customizable TACOS. Beside terraform it also supports Pulumi and plan to support also CloudFormation, Ansible and ARM templates was announced. It wants to provide wrapper and similar user experience regardless to chosen “backend” technology.

Regarding customizations it also offers Custom workflows https://docs.spacelift.io/concepts/stack/stack-settings#customizing-workflow where shell scripts can be added before and after terraform plan, destroy, etc. But it also supports Customized runner image https://docs.spacelift.io /integrations/docker#customizing-the-runner-image where practically anything can be added to Docker image. Also arbitrary files can be mounted to the run container. But these files must be uploaded to Spacelift first.

It has capability to do automatic drift detection https://docs.spacelift.io/concepts/stack/drift-detection where Spacelift can notify or take action after some external process or user is changing Cloud environment from outside of terraform.

In addition to classic sharing of remote state between cloud workspaces (they are called stacks in Spacelift) it also allows to share internal context https://docs.spacelift.io/concepts/configuration/context#introduction it actually looks like better approach but it would need more research.

It seems that Spacelift is also going forward with private module registry and provides like CI/CD for modules with tests https://docs.spacelift.io /vendors/terraform/module-registry#tests https://docs.spacelift.io/concepts/run/test-case against short-lived environments.

Spacelift also has the most customizable options to work with OPA policies https://www.youtube.com/watch?v=GWWybopkyko&t=2s

Spacelift uses a different pricing than competitors. Again we should consider only the highest tier “Enterprise SaaS” due private agents. But in that tier there are no environment/applies related restrictions, only number of users. Pricing for more users or agents is uncertain. Dedicated onboarding, training and support are included in the highest tier. It’s starting on $2000 per month.

Spacelift is very different guy than others, it brings really interesting concepts to the table. Maybe higher price from the beginning can problematic.

## TACOS Providers Comparison Matrix

| Capability/Tool                  | terraform Cloud                | terraform Enterprise  | Scalr                        | Env0                         | Spacelift                          |
| -------------------------------- | ------------------------------ | --------------------- | ---------------------------- | ---------------------------- | ---------------------------------- |
| Compliance                       | ISO 27001, SOC 2               | ISO 27001, SOC 2      | ❓                           | SOC 2                        | ISO 27001, SOC 2                   |
| GitLab Integration               | ✅                             | ✅                    | ✅                           | ✅                           | ✅                                 |
| Hosting                          | SaaS                           | SaaS, On-Prem         | SaaS, On-Prem                | SaaS                         | SaaS                               |
| Policy as Code                   | Sentinel                       | Sentinel              | OPA                          | OPA                          | OPA                                |
| Pricing Model                    | Unpredictable in highers tiers | Still figuring it out | Mixed                        | Mixed                        | Per capabilities and users         |
| Private Agents                   | ✅                             | ✅                    | ✅                           | ✅                           | ✅                                 |
| Private Module Registry          | ✅                             | ✅                    | ✅                           | ❓                           | ✅ - with CI/CD                    |
| RBAC                             | ✅                             | ✅                    | ✔️ - hierarchical            | ✔️ - hierarchical            | ✔️ - also extensible with policies |
| Remote operations CLI            | ✅                             | ✅                    | ✅                           | ❌                           | ❌                                 |
| Remote operations VCS/GitOps     | ✅                             | ✅                    | ✅                           | ✅                           | ✅                                 |
| SLA                              | 99.9% for highers tier         | N/A                   | ❓                           | ❓                           | ❓                                 |
| SSO                              | ✅ - only in high paid tiers   | ✅                    | ✅ - only in high paid tiers | ✅ - only in high paid tiers | ✅                                 |
| Secrets Management               | Internal                       | Vault integrated      | Internal                     | Internal                     | Internal, also file based          |
| Short lived environments support | ❌                             | ❌                    | ❌                           | ❌                           | ✅                                 |
| State Management                 | ✅                             | ✅                    | ✅                           | ✔️ - only hidden state       | ✅ - also external                 |
| terraform Provider               | ✅                             | ✅                    | ✅                           | ✅                           | ✅                                 |
| Webhooks                         | ✅                             | ✅                    | ✅                           | ✅                           | ✅                                 |

## Additional Resources

- [Comparison of various TACOS providers](https://www.youtube.com/watch?v=4MLBpBqZmpM&ab_channel=CloudPosse)
- [Reddit thread with a good discussion around the topic](https://www.reddit.com/r/terraform/comments/lkylzk/scalr_vs_spacelift_vs_atlantis_vs_env0_bake_off/)n
