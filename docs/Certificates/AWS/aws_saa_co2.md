---
title: AWS Certified Solutions Architect Associate
sidebar_label: AWS SAA
tags:
  - AWS
  - Certificates
---

# AWS Certified Solutions Architect Associate

## Table of content

1. [Table of content](#table-of-content)
2. [About the exam](#about-the-exam)
3. [Learning resources](#learning-resources)
4. [Active learning](#active-learning)
5. [Fundamentals](#fundamentals)
   - [Cloud Environment](#cloud-environment)
   - [AWS Fundamentals](#aws-fundamentals)
6. [Identity & Governance](#identity-&-governance)
   - [Accounts](#accounts)
   - [IAM](#iam)
   - [Cognito](#cognito)
7. [ACM (AWS Certificate Manager)](<#acm-(aws-certificate-manager)>)
   - [Policies](#policies)
8. [Networking](#networking)
   - [Networking Fundamentals](#networking-fundamentals)
   - [VPC](#vpc)
     - [VPC Peering](#vpc-peering)
   - [Route 53](#route-53)
     - [Public Hosted Zones](#public-hosted-zones)
     - [Private Hosted Zones](#private-hosted-zones)
     - [Routing Types](#routing-types)
     - [Registering a domain](#registering-a-domain)
   - [Load Balancers](#load-balancers)
     - [Application Load Balancer (ALB)](<#application-load-balancer-(alb)>)
     - [Network Load Balancer (NLB)](<#network-load-balancer-(nlb)>)
     - [Gateway Load Balancer](#gateway-load-balancer)
   - [Cloud Front](#cloud-front)
   - [Global Accelerator](#global-accelerator)
9. [Compute](#compute)
   - [RDS](#rds)
     - [RDS Backup & Restore](#rds-backup-&-restore)
     - [Data Security](#data-security)
   - [EC2](#ec2)
     - [Auto Scaling Groups](#auto-scaling-groups)
10. [ECS](#ecs)
    - [Lambda](#lambda)
11. [Storage](#storage)
    - [S3](#s3)
    - [EFS](#efs)
    - [Aurora](#aurora)
      - [Database Migration Service](#database-migration-service)
12. [Integration](#integration)
    - [API Gateway](#api-gateway)
    - [SNS](#sns)
    - [SQS](#sqs)
    - [Kinesis](#kinesis)
13. [KMS (Key Management Service)](<#kms-(key-management-service)>)
14. [Cloud Formation](#cloud-formation)
15. [CloudWatch & Observability](#cloudwatch-&-observability)
16. [Tips](#tips)
    - [Tip #1](#tip-#1)
    - [Tip #2](#tip-#2)
    - [Tip #3](#tip-#3)

## About the exam

https://aws.amazon.com/certification/certified-solutions-architect-associate/

## Learning resources

Main resource: https://learn.cantrill.io/p/aws-certified-solutions-architect-associate-saa-c02

Practice exams (dojo): https://portal.tutorialsdojo.com/product/aws-certified-solutions-architect-associate-practice-exams/

## Active learning

Basic questions for active learning. Start the session by answering all the questions and mark the answers with emojis depending on the result (see the table below).

**Bolded items** are either important to understand or there is high likelihood that they will appear on the exam.

| Answer Status | Description                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| 👍            | You've answered correctly first time, skip repetition for the next session                                      |
| ✋            | You've answered the question only partially right, include the question in the next session                     |
| 👎            | You've answered the question wrong and had to lookup the answer. Start from those questions in the next session |

You can easily add emojis to markdown by typing \:emojiname\:

- thumbs up: `:+1:`
- thumbs down: `:-1:`
- hand: `:hand:`

Easiest way to to learn yourself is to:

- clone [this repository](https://github.com/Piotr1215/dca-prep-kit)
- make a copy of [this file](aws_saa_co2.md)
- use this [regex expression](https://stackoverflow.com/a/16880892) to select and remove (replace with empty) all the `<details>` tags (they contain the answers to the questions) `<(details)>(.|\n)*?</details>`, remember to toggle "use regular expressions" in the search box if you are using VS Code. If you are using vim/nvim use this command instead `:g/<details>/,/<\/details>/d _`
- save the file as a learning session, grade yourself for answers
- IMPORTANT: **lookup in the original file if you don't know the answer at all**
- leave the files with dates of each learning session and start next session from the ones you didn't know the answers for

## Fundamentals

### Cloud Environment

1. On-Demand Self Service
2. Broad Network Access
3. Resource Pooling (multi-tenancy)
4. **Rapid elasticity**
5. Measured Service (pay as you go)

### AWS Fundamentals

- What is the difference between public and private services?
- Describe different types of high availability (regional, zonal, etc)

## Identity & Governance

### Accounts

- An account is a container, what it can contain?
    <details>
    <summary>click to see the answer</summary>
     <ul>
       <li>identities (users)</li>
       <li>resources</li>
     </ul>
  </details>
- What is required to create AWS account?
    <details>
    <summary>click to see the answer</summary>
     <ul>
       <li>email</li>
       <li>payment method</li>
     </ul>
  </details>
- How are resources grouped?
    <details>
    <summary>click to see the answer</summary>
     Into accounts
  </details>
- Can the same email address be used with multiple accounts?
    <details>
    <summary>click to see the answer</summary>
     No
  </details>
- Can account root user login into multiple accounts?
    <details>
    <summary>click to see the answer</summary>
     No
  </details>
- What are called the things that you can create inside of the account?
    <details>
    <summary>click to see the answer</summary>
     <ul>
       <li>Users</li>
       <li>Groups</li>
       <li>Roles</li>
     </ul>
  </details>
- What is the default access mode for an account for external actors?
    <details>
    <summary>click to see the answer</summary>
     Only identies created inside an account can be granted access to the resources in this account.
     Cross-permissions are possible with IAM roles
  </details>
- What set of permissons does new IAM Identity starts with?
    <details>
    <summary>click to see the answer</summary>
     None, every new identity starts with zero permissions until granted.
  </details>
- What are the 3 alarm states?
    <details>
    <summary>click to see the answer</summary>
     <ul>
       <li>OK</li>
       <li>ALARM</li>
       <li>INSUFFICIENT DATA</li>
     </ul>
  </details>

### IAM

- How/where to allow IAM user access to billing information?
- How is IAM resilient?
- What identity objects IAM let us create?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>user</li>
    <li>group</li>
    <li>role</li>
    </ul>

  </details>

- Does **users** type represents only human users?
- What is the necessary condition for a policy to have an effect?
- Is IAM authentication service as well as identity management and authorization?
- How much does IAM cost?
- Why IAM account aliases must be globally uniq?
- How many access keys can IAM user have?
- What variable to setup for the _aws_ cli to designate a default profile?
    <details>
    <summary>click to see the answer</summary>

  ```bash
  export AWS_DEFAULT_PROFILE=
  ```

  </details>

- Can external identiy be used to access AWS resources?
- When to use IAM Role?
- When does principal became authenticated identity?
- How can you login into an IAM group?
    <details>
    <summary>click to see the answer</summary>

  No, IAM groups are for helping with organizing IAM user access to AWS resources.

  </details>

- Can IAM groups be nested?
- Can IAM user be a member of more than one group?
- Can you reference an IAM Group from a resource policy?
- What are the two types of authentication for IAM?
    <details>
    <summary>click to see the answer</summary>

  Username/password or Access Keys

  </details>

- What does ARN stand for?
- What is the ARN structure?
    <details>
    <summary>click to see the answer</summary>

  arn:partition:service:region:account-id:resource-type:resource-id

  </details>

- How many IAM users can be created in an account?
  <details>
  <summary>click to see the answer</summary>

  5000

  </details>

- How many IAM groups can a user be a member of?
  <details>
  <summary>click to see the answer</summary>

  10

  </details>

- What does SCP stand for
  <details>
  <summary>click to see the answer</summary>

  Service Control Policies

  </details>

- How do you call a nested grouping within an organization?
  <details>
  <summary>click to see the answer</summary>

  Organization Units

  </details>

- Is the root "management" account of an organization affected by SCP?
  <details>
  <summary>click to see the answer</summary>

  No

  </details>

- What is the main role of an SCP?
  <details>
  <summary>click to see the answer</summary>

  To limit what an account can do. Only Deny.

  </details>

- Can you attach an identity policy to someone's else account?
  <details>
  <summary>click to see the answer</summary>

  No

  </details>

- What is more preferable, Roles or IAM User?
  <details>
  <summary>click to see the answer</summary>

  Always prefer IAM roles if possible.

  </details>

### Cognito

- What functionality does cognito provide?
  <details>
  <summary>click to see the answer</summary>

  For web applications. This looks a bit like Okta/Auth0
    <ul>
        <li>Authentication</li>
        <li>Authorization</li>
        <li>User management</li>
    </ul>

  </details>

- What are identity pools?
- Can the JWT tokens be used to access AWS resources?
  <details>
  <summary>click to see the answer</summary>

  No

  </details>

## ACM (AWS Certificate Manager)

- What is origin access identit?
- <b>Can/Should you reuse one OAI?</b>

TODO: pick up here

### Policies

- What are 2 main types of policies?
  <details>
  <summary>click to see the answer</summary>

  Inline, Managed

  </details>

- When to use inline policy?
  <details>
    <summary>click to see the answer</summary>

  For exceptions to the managed policy.

  </details>

## Networking

### Networking Fundamentals

- How many layers are there in OSI model? :+1:
- What groups are OSI layers divided into? :+1:
- Does the device on a higher layer include the capabilities of the devices in layers below it? Why? :+1:
- If a network consists of 5 participants and a HUB, when participant 1 broadcasts a signal, how many participants will receive it? :+1:
- In a network with a HUB, what happens when participants transmit a broadcast at once? :+1:
- Describe on a high level frame components :+1:
- What is a backoff period? :-1:
- What does MAC stands for? :hand:
- What layer switch belongs to?
- What layer does router belong to?
- What are the two components of an IP address?
- How does subnet mask and its prefix indicate which octets describe network?
- What does ARP stand for?
- What is the high level structure of a TCP packet?
- How does TCP ensures packets delivery reliability?
- What does NAT do?
- What is static NAT?
- What is dynamic NAT?
- What does PAT stand for?
- The larger the CIDR value the .... the network.
- Explain briefly what are network classes
    <details>
    <summary>click to see the answer</summary>

    <p>
    Class A through E, A is the biggest, D, E are reserved.
    <em>Important note</em>: network classes are replaced by <strong>CIDR</strong>
    <ul>
    <li>Class A: <b>10</b>.0.0.0    - <b>10</b>.255.255.255 - single network</li>
    <li>Class B: <b>172.16</b>.0.0. - <b>172.19</b>.255.255 - 16 networks</li>
    <mark>This is also the default VPC range.</mark>
    <li>Class C: <b>192.168.0</b>.0 - <b>192.168.255</b>.0  - 256 networks</li>
    </ul>
    </p>

  </details>

- Explain what are CIDR networks and how to calculate CIDR
    <details>
    <summary>click to see the answer</summary>

    <p>
    <ul>
    <li>/16 networks have fixed value in first and second octet</li>
    <li>To create two networks from 10.0.0.0/16 use 2x 10.0.0.0/17 by halving the third and fourth octets.</li>
    </ul>
    </p>

  </details>

- What CIDR represents all IP addresses
    <details>
    <summary>click to see the answer</summary>

  0.0.0.0/0

  </details>

- What CIDR represents 1 IP address
    <details>
    <summary>click to see the answer</summary>

  1.2.3.4/32

  </details>

### VPC

- How many default VPCs per region/per account are there?
    <details>
    <summary>click to see the answer</summary>

  1

  </details>

- What are the CIDR limits for AWS VPC
    <details>
    <summary>click to see the answer</summary>

    <p>
    <ul>
    <li>minimum /28</li>
    <li>maximum /16</li>
    </ul>
    </p>

  </details>

- Can you launch an AWS service directly into a VPC?
    <details>
    <summary>click to see the answer</summary>

  No, services use subnets to be launched from

  </details>

- What is a good default number or VPCs subnets and why?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>4 is a good number because it will cover most of the AZs.</li>
    <li>/16 network subdivided into 16 subnets gives 16 subnets of CIDR size /20 - 4091 IPs per subnet</li>
    </ul>

  </details>

- What is the level of isolation & resiliency for a VPC?
    <details>
    <summary>click to see the answer</summary>

  Regional

  </details>

- What is the default setting for the in and outgoing traffic in a VPC?
    <details>
    <summary>click to see the answer</summary>

  IN and OUT traffic is blocked by default

  </details>

- What are the VPC's tenancy models?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>Default - shared hardware</li>
    <li>Dedicated tenancy - dedicated hardware</li>
    <mark>Comes with a cost premium and all resources also must be on the dedicated hardware</mark>
    </ul>

  </details>

- What settings to use to enable DNS hostnames for entities with public IP addresses in a VPC and switch on DNS support?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>enableDnsHostnames</li>
    <li>enableDnsSupport</li>
    </ul>

  </details>

- What is the subnet resiliency level?
    <details>
    <summary>click to see the answer</summary>

  AZ resilient

  </details>

- Can a subnet be in multiple AZs?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- Can the subnet be moved into another AZ?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- **Can a subnet overlap with other subnets?**
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- Can you use all the available IP addresses in a subnet?
    <details>
    <summary>click to see the answer</summary>

  No, there are 5 that are reserved.
    <ul>
    <li>first address cannot be used</li>
    <li>second address cannot be used (used by VPC router)</li>
    <li>third address cannot be used (used for DNS)</li>
    <li>fourth address cannot be used (reserved)</li>
    <li>last IP address cannot b used (broadcast address)</li>
    </ul>

  </details>

- Are there any charges for creating VPCs and Subnets?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- How to get VPC router into your VPC?
    <details>
    <summary>click to see the answer</summary>

  VPC router is a global service available by default in every VPC, so no need to configure anything.

  </details>

- What is the role of VCP Router
    <details>
    <summary>click to see the answer</summary>

  It routes traffic between subnets of a VPC

  </details>

- How many route tables can a subnet have associated with it?
    <details>
    <summary>click to see the answer</summary>

  1

  </details>

- What does the route table control?
    <details>
    <summary>click to see the answer</summary>

  Route table controls the destination of the data leaving the subnet. In can be within a subnet or a gateway address.

  </details>

- What is the resiliency mode of an internet gateway?
    <details>
    <summary>click to see the answer</summary>

  Regionally resilient

  </details>

- How many IGW can a VPC have?
    <details>
    <summary>click to see the answer</summary>

  0 or 1

  </details>

- What happens is a VPC has an IGW?
    <details>
    <summary>click to see the answer</summary>

  This VPC is publicly available.

  </details>

- List actions required to make a subnet public
    <details>
    <summary>click to see the answer</summary>

    <ol>
    <li>Create IGW</li>
    <li>Attach IGW to the VPC</li>
    <li>Create a custom route table</li>
    <li>Associate the route table with the VPC</li>
    <li>Configure default routes in the route table to point to IGW</li>
    <li>Configure VPC to auto-allocate IPv4 and optionally IPv6 addresses withing the subnet</li>
    </ol>

  </details>

- Where is the public IP of a service (for example EC2) running in a VPC maintained?
    <details>
    <summary>click to see the answer</summary>

  In the IGW, NOT in the VPC where the service is located

  </details>

- What does NACL stand for?
    <details>
    <summary>click to see the answer</summary>

  Network Access Control List. Works similar as Azure security group.
  Once it matches it stops.

  </details>

- Is Security Group stateless or stateful?
    <details>
    <summary>click to see the answer</summary>

  Stateful. Security group is more like Azure private endpoint.

  </details>

- **What is the implicit setting for a security group?**
    <details>
    <summary>click to see the answer</summary>

  Implicit deny - everything is denied by default and only things you allow are allowed.

  </details>

- In a security group is traffic and response separate?
    <details>
    <summary>click to see the answer</summary>

  No, a security group is stateful, so traffic and response to it is covered by the same rule.

  </details>

- Why would you use NACL in combination with an SG?
    <details>
    <summary>click to see the answer</summary>

  NACL allows for adding an explicit DENY rule

  </details>

- If the traffic is not crossing the boundary of a subnet, would you use NACL or SG?
    <details>
    <summary>click to see the answer</summary>

  Use SG, NACL has no effect within subnet

  </details>

- What does IP masquerading do?
    <details>
    <summary>click to see the answer</summary>

  Hides whole private CIDR IP block behind a single public IP

  </details>

- What is the resiliency level of a NAT Gateway?
    <details>
    <summary>click to see the answer</summary>

  AZ

  </details>

- Does a NAT Gateway work with IPv6?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- What SSH option is used to connect secrely to a Bastion server?
    <details>
    <summary>click to see the answer</summary>

  SSH Agent Forwarding
    <p><code>ssh -A</code></p>

  </details>

- What are points of failure for VPN site-to-site connection?
    <details>
    <summary>click to see the answer</summary>

  ```plantuml
  @startuml
  box "AWS VPC"
  "router" -> "AWS Public zone"
  end box
  box "AWS Public Zone"
  participant "Virtual Gateway" as vgw
  participant "VPN" as vpn
  vgw <-> vpn

  vpn -> "Endpoint1"
  vpn -> "Endpoint2"
  end box
  box "Public Internet"
  participant "Customer Gateway" as cgw
  cgw ->
  end box
  "AWS Public zone" -> "Public internet"

  "Public internet" -> "On prem router"
  @enduml
  ```

  </details>

- What are VPC flow logs?
- Do VPC flow logs capture metadata or contents of a request?
  <details>
  <summary>click to see the answer</summary>

  Only metadata

  </details>

#### VPC Peering

- Can you peer more than one VPC together?
    <details>
    <summary>click to see the answer</summary>
     No
  </details>

### Route 53

- What is the difference between a hosted zone and a hosted zone group?
- Which DNS record points to IPv6 address?
- What is the difference between a CNAME and an ALIAS?
    <details>
    <summary>click to see the answer</summary>
    <ul>
    <li>CNAME maps a name to another name in the same domain (naked domain)</li>
    <li>ALIAS maps a name to AWS resource - default for the exam. AWS specific implementation</li>
    </ul>
  </details>
- What does CNAME stand for?
- Can CNAMEs point to an IP address?
- How many DNS root servers exist?
    <details>
    <summary>click to see the answer</summary>
    13
  </details>

#### Public Hosted Zones

- What are R53 public hosted zones?
- How many name servers does R53 alocate?
- What records to use to point at the hosted name servers?
- What is the DNS resolver in a VPC instance?
    <details>
    <summary>click to see the answer</summary>
    VPC+2 IP
  </details>

#### Private Hosted Zones

- Can you access the zone in the VPC?
- How to run intranet and public facing web page on the same DNS?
    <details>
    <summary>click to see the answer</summary>
    Split-View
  </details>

#### Routing Types

- What is simple routing?
- What are health checkers?
- Can health checks be performed on targets outside of AWS resources?
- What protocols are supported by health checkers?
- What checks are supported?
  <details>
    <summary>click to see the answer</summary>
    Endpoint, CloudWatch Alarm, Checks of Checks
  </details>
- What is failover routing?
  <details>
  <summary>click to see the answer</summary>
  Endpoint, CloudWatch Alarm, Checks of Checks
  </details>
  -What is failover routing?
- What is a multivalue routing
    <details>
    <summary>click to see the answer</summary>
    Can create many records with the same name
    Up to 8 healthy records are returned to the client
    Improves availability
  </details>

- What is a weighted routing
- What is the weight formula
    <details>
    <summary>click to see the answer</summary>
    Record weight vs total weight, each of the 3 records.
    Use when u want to control the distribution of the DNS queries
  </details>
- When to use latency based routing
- When to use geo-location based routing
    <details>
    <summary>click to see the answer</summary>
    It returns relevant locations only, NOT based on goe-proximity
  </details>
- When to use geo-proximity routing?
- What is a geo-proximity bias?
    <details>
    <summary>click to see the answer</summary>
    Expands or shrinks the location of the routing zone
  </details>

- What is the difference between Route 53 routing policies and load balancing?
    <details>
    <summary>click to see the answer</summary>
    Load balancer is actually routing traffic to the backend services whereas DNS routing returns a DNS resolver server location.
  </details>

#### Registering a domain

- What are different scenarios for registering a domain
    <details>
    <summary>click to see the answer</summary>
    <ul>
    <li>Registrar and Public DNS Hosting role</li>

  ```plantuml
  @startuml domain-registration-traditional
  !theme materia-outline
  actor Developer as user
  participant "Route53\nRegistrar Role" as r53_registrar
  participant "Route53\nDNS Hosting Role" as r53_dns_hosting
  participant "TLD Server for *.domain" as tld_server
  user -> r53_registrar: Requests domain registration\nand pays 1 time fee
  r53_registrar -> r53_dns_hosting : Requests cretion of public hosted zone
  return 4x Name Servers

  r53_registrar -> tld_server : Passes the Name Servers to

  tld_server -> tld_server : Creates entries\nfor the Name Servers

  tld_server -> r53_dns_hosting : Points to 4 NS Servers in Public Hosted Zone

  @enduml
  ```

    <li>Hosting only role</li>

  ```plantuml
  @startuml domain-registration-traditional
  !theme materia-outline
  actor Developer as user
  participant "Route53\nRegistrar Role" as r53_registrar
  participant "3rd Party Domain Hosting" as r53_dns_hosting
  participant "TLD Server for *.domain" as tld_server
  user -> r53_registrar: Requests domain registration\nand pays 1 time fee
  r53_registrar -> r53_dns_hosting : Requests cretion of public hosted zone
  return 4x Name Servers

  r53_registrar -> tld_server : Passes the Name Servers to

  tld_server -> tld_server : Creates entries\nfor the Name Servers

  tld_server -> r53_dns_hosting : Points to 4 NS Servers in Public Hosted Zone

  @enduml
  ```

    </ul>
  </details>

### Load Balancers

- What is LCU?
- How load balancer is priced?
- Describe briefly ALB architecture
- How many load balancing nodes does ALB have as a minimum?
- What is the default distribution algorithm?
- What is cross zone load balancing?
- What is a listener configuration?
- What types of load balancers are there?
    <details>
    <summary>click to see the answer</summary>
    <ul>
    <li>A(pplication)LB</li>
    <li>N(etwork)LB</li>
    <li>C(lassic)LB</li>
    </ul>
  </details>
- How can load balancer handle SSL offloading?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li><strong>Bridging</strong> - connection terminated on the ELB. Second connection is created to target services (http). EC2 instances also need copy of the same certificate</li>
    <li><strong>Pass-through</strong> - connection encryption is maintained by the client. Listener is configured for TCP.</li>
    <li><strong>Offload</strong> - backend connections use http </li>
    </ul>

  </details>

- What is session stickiness?
- How does a load balancer enable session stickiness?
    <details>
    <summary>click to see the answer</summary>

  Cookie 1s to 7 days. It is generally better to use stateless servers and host the state somewhere else, either in a database of on the client side in the case of SPA.

  </details>

#### Application Load Balancer (ALB)

- What layer is ALB on?
    <details>
    <summary>click to see the answer</summary>
    7
  </details>
- What makes ALB internet facing?
    <details>
    <summary>click to see the answer</summary>
    Presence of public IP
  </details>

#### Network Load Balancer (NLB)

- What layer is NLB on?
- Is NLB a performance-oriented load balancer?

#### Gateway Load Balancer

- What is the usecase for a gateway load balancer?
    <details>
    <summary>click to see the answer</summary>

  Load balances between multiple security appliances

  </details>

- What are 2 components of a GWLB?
    <details>
    <summary>click to see the answer</summary>

  GWLB endpoints
  GWLB instances

  </details>

- What protocol is used by GWLB?
    <details>
    <summary>click to see the answer</summary>

  GENEVE

  </details>

- How does GWLB endpoint integrates with the existing VPC traffic?
    <details>
    <summary>click to see the answer</summary>

  It is added to a route table as a nex hop in the traffic

  </details>

### Cloud Front

- What does CDN stand for?

### Global Accelerator

- What are anycast IP addresses?

## Compute

### RDS

- What are some of the downsides of putting a database on EC2 instnace?
- What is an RDS Instance?
- Can you connect to RDS instance using IP?
    <details>
    <summary>click to see the answer</summary>
    No, you have to use CNAME DNS record
  </details>

- What is the resiliency level of an RDS instance?
    <details>
    <summary>click to see the answer</summary>
    AZ, also storage (EBS)
  </details>

- Explain pricing model of RDS
    <details>
    <summary>click to see the answer</summary>
    ALlocated GM/month
    Additional storage charges if applicable
  </details>

- Can you reuse an security group with RDS?
    <details>
    <summary>click to see the answer</summary>
    Yes
  </details>

- Why do we need to configure subnet groups when provisioning an RDS database instance?
- Is the multi AZ feature available in the free tier?
    <details>
    <summary>click to see the answer</summary>
    No
  </details>

- Can the standby replica be accessed directly?
    <details>
    <summary>click to see the answer</summary>
    No, it's just an availability improvement.
  </details>

- What is synchronous Replication
    <details>
    <summary>click to see the answer</summary>
    Multi AZ, same AWS region
  </details>

#### RDS Backup & Restore

- What are RTO and RPO?
  RP(oint)O - time between last working backup and data loss event
  RT(ime)O - time between data loss event and full recovery

- Do manual snapshots expire?
    <details>
    <summary>click to see the answer</summary>
    No
  </details>

- What are transaction logs?
  Stored every 5 minitest (lowers RPO)

- Do automated backups expire?
    <details>
    <summary>click to see the answer</summary>
    Yes, you can set up to 35 days.
  </details>

- **How does the restore process work?**
    <details>
    <summary>click to see the answer</summary>
    Backups are restored from the closest snapshot (from S3) and than transaction logs are replayed on top of the backup. Restoring snapshots can be a long time.
  </details>

- Can read replicas be created in a different regions?
    <details>
    <summary>click to see the answer</summary>
    Yes
  </details>

- **How many read replicas can you have per RDS DB Instance?**
    <details>
    <summary>click to see the answer</summary>
    5
  </details>

- **Why do read replicas matter?**
    <details>
    <summary>click to see the answer</summary>
    <ul>
    <li>Improved performance</li>
    <li>Makes CQRS pattern possible</li>
    <li>Use read only data in different regions to improve access performance</li>
    <li>In case of a failure, read replica can be promoted to read-write database. This is only useful for database failures, not data corruption</li>
    </ul>
  </details>

#### Data Security

- How is encryption at rest supported?
    <details>
    <summary>click to see the answer</summary>
    Handled by host
    <ul>
    <li>EBS Volume Encryption</li>
    <li>KMS</li>
    <li>TDE: Only MS SQL and Oracle</li>
    </ul>
  </details>

### EC2

- 👍 What does EC2 stand for?
    <details>
    <summary>click to see the answer</summary>

  Elastic Compute 2

  </details>

- Is EC2 going to fail when az (zone) fails?
- 👍 Are you still getting charged when EC2 instance is stopped? If yes for what component?
    <details>
    <summary>click to see the answer</summary>

  Yes, for storage

  </details>

- 👍 Is deleting an EC2 instance a reversible operation?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- What does AMI stand for?
- What kinds of permissions are on the AMI?
- What port number RDP service runs on?
    <details>
    <summary>click to see the answer</summary>

  3389

  </details>

- How many times can you download private key for linux EC2 instance?
- Can a single security group apply to multiple EC2 instances?
- What is the resiliency model of EC2
    <details>
    <summary>click to see the answer</summary>

  AZ, all things connected to EC2, like networking or storage run in the same AZ.

  </details>

- After restarting EC2 instance, will it move to another random host?
    <details>
    <summary>click to see the answer</summary>

  No, after restarting the EC2 instance boots up on the same host.

  </details>

- What are the two conditions under which the instance can be relocated to another EC2 host?
    <details>
    <summary>click to see the answer</summary>

  Host taken down for maintenance by AWE, EC2 instance stopped and started (not jus restarted)

  </details>

- What are the 5 EC2 instance types
    <details>
    <summary>click to see the answer</summary>

    <ol>
    <li>General Purpose</li>
    <li>Compute optimized - ML, Games, HPC</li>
    <li>Memory optimized - some databases</li>
    <li>Accelerated computing - custom programmable hardware</li>
    <li>Storage optimized - transactional databases, data warehouses, data analytics</li>
    </ol>
    <img src="./_media/ec2-instance-types.png" alt="EC2 Instance Types"></img>
    <a href="https://aws.amazon.com/ec2/instance-types/">https://aws.amazon.com/ec2/instance-types/</a>
    <a href="https://instances.vantage.sh/">https://instances.vantage.sh/</a>

  </details>

- Explain storage types that can be attached to EC2
    <details>
    <summary>click to see the answer</summary>

  Directly attached (hadrware)
  Network attached

  </details>

- Explain key differences between Block, Volume and Object Storage

- **Can you attach EBS storage between availability zones?**
    <details>
    <summary>click to see the answer</summary>

  <mark>No</mark>

  </details>

- What mechanism can be used to create snapshots of EBS volumes between AZs?
    <details>
    <summary>click to see the answer</summary>

  S3 replication

  </details>

- What are 2 volume types available?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>GP2</li>
    <li>GP3</li>
    </ul>

  </details>

- What is an IO Credit and how big is it?
    <details>
    <summary>click to see the answer</summary>

  IO Credit is a single chunk of data and is 16kb in size

  </details>

- What is an IOPS?
    <details>
    <summary>click to see the answer</summary>

  1 IOPS is 1 IO Credit in 1 second

  </details>

- What EBS drives are designed for max performance?

- What are 2 types of HDD drives?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>ST1 - throughput optimized</li>
    <li>SC1 - cold</li>
    </ul>

  </details>

- What are Instances Store Volumes?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>Block Storage Devices</li>
    <li>Physically connected to one EC2 Host</li>
    <li>Highest storage performance</li>
    <li>Included in the instance price</li>
    <li>Need to be attached at launch time</li>
    </ul>

  </details>

- When to choose EBS vs Instance Store Volumes

- How does incremental copy work in S3 snapshots
    <details>
    <summary>click to see the answer</summary>

    <ol>
    <li>Full data is copied</li>
    <li>Following snapshots are incremental</li>
    </ol>

  </details>

- What happens when incremental snapshot is deleted
    <details>
    <summary>click to see the answer</summary>

  All prior snapshots are still kept safely

  </details>

- Explain what it means that the EBS snapshot volume restores lazily
    <details>
    <summary>click to see the answer</summary>

    <p>Data is fetched gradually.</p>
    <p>To remedy it, use FSR (Fast Snapshot Restore). You can also force this manually using dd for example</p>

  </details>

- How many FRS you can have per region?
    <details>
    <summary>click to see the answer</summary>

  50

  </details>

- How does snapshot pricing work?
    <details>
    <summary>click to see the answer</summary>

  Gigabyte-month, paid only for <mark>used</mark> data

  </details>

- Can EC2 network interfaces be in different AZs?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- What does AMI stand for?
    <details>
    <summary>click to see the answer</summary>

  Amazon Machine Image

  </details>

- **Are AMIs global?**
    <details>
    <summary>click to see the answer</summary>

  No, each region will have their own AMI for a given image.
  AMI in a given region will work only in this region.

  </details>

- Explain briefly lifecycle of AMI
    <details>
    <summary>click to see the answer</summary>

    <ol>
    <li>Launch</li>
    <li>Configure - this also includes volumes</li>
    <li>Create Image</li>
    <li>Launch</li>
    </ol>

  </details>

- **What is "AMI baking"?**
    <details>
    <summary>click to see the answer</summary>

  It is a process of creating an AMI from an EC2 instance with all the dependencies and applications pre-installed.

  </details>

- **Can AMI be edited/updated?**
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- **What are you paying for when using AMI**
    <details>
    <summary>click to see the answer</summary>

  You are billed for using EBS snapshots. Remember, snapshots are <mark>charged by space actually used by data</mark> not allocated.

  </details>

- What is EC2 Instance Metadata
  This is data about runtime environment of the instance

- **What IP do you need to access to see the Instance Metadata information?**
    <details>
    <summary>click to see the answer</summary>

  (http) <mark>169.254.169.254</mark> /latest/metadata

  </details>

- Is the metadata service encrypted?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- Does the metadata service require authentication?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- How to access user data for EC2 build automation?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>http://169.254.169.254/latest/user-data</li>
    <li>Executes only once at the initial launch time</li>
    <li>runs as a root user</li>
    </ul>

  </details>

- What metric measures how much time does it take to get a service in a ready state?
    <details>
    <summary>click to see the answer</summary>

  Boot-Time-To-Service-Time

  </details>

- What is an instance profile?
    <details>
    <summary>click to see the answer</summary>

  It is a wrapper around an IAM role and is attached to an EC2 instance. Credentials are automatically renewed.

  </details>

- Can you use parameter store to store secrets?
    <details>
    <summary>click to see the answer</summary>

  Yes, is also supports versioning. Any changes to parameters can trigger events.
    <p>You can also establish hierarchy by adding / in the name.</p>

  </details>

- What types of parameters can be stored in PS?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>Strings</li>
    <li>StringLists</li>
    <li>SecureStrings</li>
    </ul>

  </details>

- How to capture logs inside of an EC2 instance?
    <details>
    <summary>click to see the answer</summary>

  Install CloudWatch agent

  </details>

- What technology is used in enhanced networking?
    <details>
    <summary>click to see the answer</summary>

  SR-IVO - logical cards, higher PPS, better bandwidth. Most EC2 instance types have this available by default.

  </details>

- What is launch configuration and launch template?
- Are launch configurations editable?
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

#### Auto Scaling Groups

- Where are auto scaling groups defined?
- What are the 3 characteristics of an auto scaling group?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>Minimum</li>
    <li>Desired - lways will be set</li>
    <li>Maximum</li>
    </ul>

  </details>

- Are auto scaling groups regional?
    <details>
    <summary>click to see the answer</summary>

  Auto scaling group will try to provision an EC2 instance in a different AZ.

  </details>

- What are scaling policies?
- What are sub types of dynamic scaling?
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li>Simple</li>
    <li>Stepped - almost always preferred</li>
    <li>Target tracking</li>
    </ul>

  </details>

## ECS

- What modes does ECS run in
    <details>
    <summary>click to see the answer</summary>

    <ul>
    <li><strong>Fargate:</strong></li>
    <ul>
    <li>Infra is abstracted away</li>
    <li>Hosted on shared platform</li>
    <li>Each task and service is injected into your VPC</li>
    <li>Only pay for use as containers run</li>
    <li>Use for small or burst style workloads, batch, periodic</li>
    </ul>
    <li><strong>EC2</strong></li>
    <ul>
    <li>Created inside a VPC</li>
    <li>Uses ASG for EC2 instances scaling</li>
    <li>You manage the instances</li>
    <li>Good if you want to manage infra</li>
    </ul>
    </ul>

  </details>

- What is task?
    <details>
    <summary>click to see the answer</summary>

  Container for containers (same as ACI group) - self contained app

  </details>

- What is task role?
    <details>
    <summary>click to see the answer</summary>

  It is an IAM role that the task can assume to gain the credentials to interact with AWS resources

  </details>

- What is service definition?
    <details>
    <summary>click to see the answer</summary>

  Defines task scalability and HA options.

  </details>

- What are the main ECS concepts
    <details>
    <summary>click to see the answer</summary>

  <img src="_media/ecs-concepts.png" alt="ECS concepts"></img>

  </details>

### Lambda

- What resource can you allocate to lambda? :+1:
    <details>
    <summary>click to see the answer</summary>

  Memory

  </details>

- **What is the execution time limit on a lambda function?** :+1:
    <details>
    <summary>click to see the answer</summary>

  15 min

  </details>

- What are cloud watch events and EventBdirge?
- What is Lambda edge?
- What languages do lambda edge support?
  <details>
  <summary>click to see the answer</summary>

  <ul>
    <li>Ptyhon</li>
    <li>Node.js</li>
  </ul>

  </details>

## Storage

### S3

- What are the 2 constituent parts of S3 object?
- What is the size limit of a single object?
- Are buckets regional?
- **Does a bucket name have to be globally uniq?**
- How many objects can be stored in 1 bucket?
- Can objects be nested in the bucket?
- How can you simulate a folder name in a bucket?
- What is another name that folders are refereed as?
- What are the naming rules for a bucket?
  <details>
    <summary>click to see the answer</summary>

  </details>

- How many buckets can you have in an account?
    <details>
    <summary>click to see the answer</summary>

  100 soft limit, 1000 hard limit

  </details>

- Can you mount an S3 bucket like a block storage?
- **Are S3s public by default?**
    <details>
    <summary>click to see the answer</summary>

  No

  </details>

- What is the difference between S3 resource policy and identity policy?
- What is an anonymous principal?
    <details>
    <summary>click to see the answer</summary>

  An principal that is not authenticated against AWS

  </details>

- How many policies can there be assigned to an S3 bucket?
    <details>
    <summary>click to see the answer</summary>

  1

  </details>

- What name requirement is there in an S3 bucket when you want to use it as static page hosting with a custom domain?

- What field is used to identify a version of an object?
    <details>
    <summary>click to see the answer</summary>

  Id

  </details>

- How to fully delete a versioned object?
    <details>
    <summary>click to see the answer</summary>

  By specifying its version in the delete command

  </details>

- **What is MFA delete**
- What does SSE-C stand for?
    <details>
    <summary>click to see the answer</summary>

  Server-Side Encryption with Customer-Provided Keys.
  S3 encrypts data with keys provided by the customer.
  Key is discarded after encryption, only key hash is stored.

  </details>

- What are the benefits of SSE-C model?
    <details>
    <summary>click to see the answer</summary>

  Save on CPU, more control over the encryption process (you hold the keys).

  </details>

- What does SSE-S3 stand for?
    <details>
    <summary>click to see the answer</summary>

  Server-Side Encryption with AWS S2-Managed Keys.
  S3 creates a master key and a key for each object.
  Master key is encrypted with object key and master key is discarded.
  We have encrypted object, encrypted master key and public key used to encrypt the object.

  </details>

- What are the benefits of SSE-S3 model?
    <details>
    <summary>click to see the answer</summary>

  Key are managed by AWS, very low admin overhead.

  </details>

- What algorithm does SSE-S3 uses by default?
    <details>
    <summary>click to see the answer</summary>

  AES256

  </details>

- What does SSE-KMS stand for?
    <details>
    <summary>click to see the answer</summary>

  Server-Side Encryption with Customer-Managed Keys stored in AWS Key Management Service (KMS).

  </details>

- What are the benefits of SSE-KMS model?
    <details>
    <summary>click to see the answer</summary>

  Someone else can manage the KMS, role separation. Key rotation control.

  </details>

