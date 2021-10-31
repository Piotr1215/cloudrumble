# AWS Certified Solutions Architect Associate

## Identity & Governance
### Accounts

* An account is a container, what it can contain? :+1: 
* How are resources grouped? :+1: 
* What are required information you need to provide in order to create an account? :+1: 
* Can the same email address be used with multiple accounts? :+1: 
* Can account root user login into multiple accounts? :+1: 
* What are called the things that you can create inside of the account? :hand: 
* Can accounts be used to create separate environments? :+1: 
* What is the default access mode for an account for external actors? :+1: 
* What service is used to configure billing alerts? :+1: 
* What are the 3 alarm states?
* How/where to allow IAM user access to billing information?

### IAM

* How is IAM resilient?
* What identity objects IAM let us create?

* Does **users** type represents only human users?
* What is the necessary condition for a policy to have an effect?
* Is IAM authentication service as well as identity management and authorization?
* How much does IAM cost?
* Why IAM account aliases must be globally uniq?
* How many access keys can IAM user have?
* What variable to setup for the *aws* cli to designate a default profile?

* Can external identiy be used to access AWS resources?
* When to use IAM Role?
* When does principal became authenticated identity?
* How can you login into an IAM group?

* Can IAM groups be nested?
* Can IAM user be a member of more than one group?
* Can you reference an IAM Group from a resource policy?
* What are the two types of authentication for IAM?

* What does ARN stand for?
* What is the ARN structure?

* What is the difference between those ARNs:
    - arn:aws:s3:::bucket
    - arn:aws:s3:::bucket/*


* How many IAM users can be created in an account?

* How many IAM groups can a user be a member of?

* What does SCP stand for

* How do you call a nested grouping within an organization?

* Is the root "management" account of an organization affected by SCP?

* What is the main role of an SCP?

* Can you attach an identity policy to someone's else account?

* What is more preferable, Roles or IAM User?

### Cognito

* What functionality does cognito provide?

* What are identity pools?
* Can the JWT tokens be used to access AWS resources?

## ACM (AWS Certificate Manager)

* What is origin access identit?
* <b>Can/Should you reuse one OAI?</b>

TODO: pick up here

### Policies

* What are policy priorities

* What are 2 main types of policies?

* When to use inline policy?

## Networking
### Networking Fundamentals

* How many layers are there in OSI model? :+1:
* What groups are OSI layers divided into? :+1:
* Does the device on a higher layer include the capabilities of the devices in layers below it? Why? :+1:
* If a network consists of 5 participants and a HUB, when participant 1 broadcasts a signal, how many participants will receive it? :+1:
* In a network with a HUB, what happens when participants transmit a broadcast at once? :+1:
* Describe on a high level frame components :+1:
* What is a backoff period? :-1:
* What does MAC stands for? :hand:
* What layer switch belongs to?
* What layer does router belong to?
* What are the two components of an IP address?
* How does subnet mask and its prefix indicate which octets describe network?
* What does ARP stand for?
* What is the high level structure of a TCP packet?
* How does TCP ensures packets delivery reliability?
* What does NAT do?
* What is static NAT?
* What is dynamic NAT?
* What does PAT stand for?
* The larger the CIDR value the .... the network.
* Explain briefly what are network classes

* Explain what are CIDR networks and how to calculate CIDR

* What CIDR represents all IP addresses

* What CIDR represents 1 IP address

### VPC

* How many default VPCs per region/per account are there?

* What are the CIDR limits for AWS VPC

* Can you launch an AWS service directly into a VPC?

* What is a good default number or VPCs subnets and why?

* What is the level of isolation & resiliency for a VPC?

* What is the default setting for the in and outgoing traffic in a VPC?

* What are the VPC's tenancy models?

* What settings to use to enable DNS hostnames for entities with public IP addresses in a VPC and switch on DNS support?

* What is the subnet resiliency level?

* Can a subnet be in multiple AZs?

* Can the subnet be moved into another AZ?

* **Can a subnet overlap with other subnets?**

* Can you use all the available IP addresses in a subnet?

* Are there any charges for creating VPCs and Subnets?

* How to get VPC router into your VPC?

* What is the role of VCP Router

* How many route tables can a subnet have associated with it?

* What does the route table control?

* What is the resiliency mode of an internet gateway?

* How many IGW can a VPC have?

* What happens is a VPC has an IGW?

* List actions required to make a subnet public

* Where is the public IP of a service (for example EC2) running in a VPC maintained?

* What does NACL stand for?

* Is Security Group stateless or stateful?

* **What is the implicit setting for a security group?**

* In a security group is traffic and response separate?

* Why would you use NACL in combination with an SG?

* If the traffic is not crossing the boundary of a subnet, would you use NACL or SG?

* What does IP masquerading do?

* What is the resiliency level of a NAT Gateway?

* Does a NAT Gateway work with IPv6?

* What SSH option is used to connect secrely to a Bastion server?
* What are points of failure for VPN site-to-site connection?

* What are VPC flow logs?
* Do VPC flow logs capture metadata or contents of a request?

### Route 53

* What is the difference between a hosted zone and a hosted zone group?
* Which DNS record points to IPv6 address?
* What is the difference between a CNAME and an ALIAS?
* What does CNAME stand for?
* Can CNAMEs point to an IP address?
* How many DNS root servers exist?

#### Public Hosted Zones

* What are R53 public hosted zones?
* How many name servers does R53 alocate?
* What records to use to point at the hosted name servers?
* What is the DNS resolver in a VPC instance?

#### Private Hosted Zones

* Can you access the zone in the VPC?
* How to run intranet and public facing web page on the same DNS?

#### Routing Types

* What is simple routing?
* What are health checkers?
* Can health checks be performed on targets outside of AWS resources?
* What protocols are supported by health checkers?
* What checks are supported?
* What is failover routing?
* What is a multivalue routing

* What is a weighted routing
* What is the weight formula
* When to use latency based routing
* When to use geo-location based routing
* When to use geo-proximity routing?
* What is a geo-proximity bias?

* What is the difference between Route 53 routing policies and load balancing?

#### Registering a domain

* What are different scenarios for registering a domain

### Load Balancers

* What is LCU?
* How load balancer is priced?
* Describe briefly ALB architecture
* How many load balancing nodes does ALB have as a minimum?
* What is the default distribution algorithm?
* What is cross zone load balancing?
* What is a listener configuration?
* What types of load balancers are there?
* How can load balancer handle SSL offloading?

* What is session stickiness?
* How does a load balancer enable session stickiness?

#### Application Load Balancer (ALB)

* What layer is ALB on?
* What makes ALB internet facing?

#### Network Load Balancer (NLB)

* What layer is NLB on?
* Is NLB a performance-oriented load balancer?

#### Gateway Load Balancer

* What is the usecase for a gateway load balancer?

* What are 2 components of a GWLB?

* What protocol is used by GWLB?

* How does GWLB endpoint integrates with the existing VPC traffic?

### Cloud Front

* What does CDN stand for?

### Global Accelerator

* What are anycast IP addresses?

## Compute
### RDS

* What are some of the downsides of putting a database on EC2 instnace?
* What is an RDS Instance?
* Can you connect to RDS instance using IP?

* What is the resiliency level of an RDS instance?

* Explain pricing model of RDS

* Can you reuse an security group with RDS?

* Why do we need to configure subnet groups when provisioning an RDS database instance?
* Is the multi AZ feature available in the free tier?

* Can the standby replica be accessed directly?

* What is synchronous Replication

#### RDS Backup & Restore

* What are RTO and RPO?
    RP(oint)O - time  between last working backup and data loss event
    RT(ime)O - time between data loss event and full recovery

* Do manual snapshots expire?

* What are transaction logs?
    Stored every 5 minitest (lowers RPO)

* Do automated backups expire?

* **How does the restore process work?**

* Can read replicas be created in a different regions?

* **How many read replicas can you have per RDS DB Instance?**

* **Why do read replicas matter?**

#### Data Security

* How is encryption at rest supported?

### EC2

* 👍 What does EC2 stand for?

* Is EC2 going to fail when az (zone) fails?
* 👍 Are you still getting charged when EC2 instance is stopped? If yes for what component?

* 👍 Is deleting an EC2 instance a reversible operation?

* What does AMI stand for?
* What kinds of permissions are on the AMI?
* What port number RDP service runs on?

* How many times can you download private key for linux EC2 instance?
* Can a single security group apply to multiple EC2 instances?
* What is the resiliency model of EC2

* After restarting EC2 instance, will it move to another random host?

* What are the two conditions under which the instance can be relocated to another EC2 host?

* What are the 5 EC2 instance types

* Explain storage types that can be attached to EC2

* Explain key differences between Block, Volume and Object Storage

* **Can you attach EBS storage between availability zones?**

* What mechanism can be used to create snapshots of EBS volumes between AZs?

* What are 2 volume types available?

* What is an IO Credit and how big is it?

* What is an IOPS?

* What EBS drives are designed for max performance?

* What are 2 types of HDD drives?

* What are Instances Store Volumes?

* When to choose EBS vs Instance Store Volumes

* How does incremental copy work in S3 snapshots

* What happens when incremental snapshot is deleted

* Explain what it means that the EBS snapshot volume restores lazily

* How many FRS you can have per region?

* How does snapshot pricing work?

* Can EC2 network interfaces be in different AZs?

* What does AMI stand for?

* What permission options does AMI have?

* **Are AMIs global?**

* Explain briefly lifecycle of AMI

* **What is "AMI baking"?**

* **Can AMI be edited/updated?**

* **What are you paying for when using AMI**

* What is EC2 Instance Metadata
    This is data about runtime environment of the instance

* **What IP do you need to access to see the Instance Metadata information?**

* Is the metadata service encrypted?

* Does the metadata service require authentication?

* How to access user data for EC2 build automation?

* What metric measures how much time does it take to get a service in a ready state?

* What is an instance profile?

* Can you use parameter store to store secrets?

* What types of parameters can be stored in PS?

* How to capture logs inside of an EC2 instance?

* What are the 3 types of placement groups?

* What technology is used in enhanced networking?

* What is launch configuration and launch template?
* Are launch configurations editable?

#### Auto Scaling Groups

* Where are auto scaling groups defined?
* What are the 3 characteristics of an auto scaling group?

* Are auto scaling groups regional?

* What are scaling policies?
* What are sub types of dynamic scaling?

## ECS

* What modes does ECS run in

* What is task?

* What is task role?

* What is service definition?

* What are the main ECS concepts

### Lambda

*  What resource can you allocate to lambda? :+1:

* **What is the execution time limit on a lambda function?** :+1:

* What are cloud watch events and EventBdirge?
* What is Lambda edge?
* What languages do lambda edge support?

## Storage

AWS Databases

### S3

* What are the 2 constituent parts of S3 object?
* What is the size limit of a single object?
* Are buckets regional?
* **Does a bucket name have to be globally uniq?**
* How many objects can be stored in 1 bucket?
* Can objects be nested in the bucket?
* How can you simulate a folder name in a bucket?
* What is another name that folders are refereed as?
* What are the naming rules for a bucket?

* How many buckets can you have in an account?

* Can you mount an S3 bucket like a block storage?
* **Are S3s public by default?**

* What is the difference between S3 resource policy and identity policy?
* What is an anonymous principal?

* How many policies can there be assigned to an S3 bucket?

* What name requirement is there in an S3 bucket when you want to use it as static page hosting with a custom domain?
* **Can you disable object versioning in an S3 bucket once it was enabled?**

* What field is used to identify a version of an object?

* How to fully delete a versioned object?

* **What is MFA delete**
* What are the two main methods of encryption in S3

* What does SSE-C stand for?

* What are the benefits of SSE-C model?

* What does SSE-S3 stand for?

* What are the benefits of SSE-S3 model?

* What algorithm does SSE-S3 uses by default?

* What does SSE-KMS stand for?

* What are the benefits of SSE-KMS model?

* What are storage classes types, compare main characteristics

* Explain the components of S3 storage pricing model

* What is the HTTP Status Code that S3 responds with upon successfully upload?

* What is a lifecycle configuration in S3

* Lifecycle configuration can apply to:

* What are the types of lifecycle actions

* When using transitions, how many days must an object remain in the Standard tier before moving automatically to lower tiers?

* When using transitions, how many days must an object remain in the lower tiers than standard before moving automatically to glacier or glacier deep archive?

* Explain how would you use an expiration transition rule to save cost on storing old versions of objects?

* What are the two types of replication supported by S3?

* How to choose a subset of objects to replicate

* Can you override a storage class in the replication destination bucket?

* How to observe and put time constraints on the replication process

* **Is the replication retroactive**

* **What feature must be enabled on both source and destination buckets for the replication to work?**

* **Does the replication process work both ways?**

* **Can encrypted objects be replicated?**

* **What objects cannot be replicated?**

* **Are deletes replicated?**

* What are the potential scenarios when replication should be used?

* What can you use to provide the ability to upload (PUT) or download (GET) S3 objects in a secure way for non-authenticated users?

* What are some architectures when using pre signed urls makes sense?

* Can you create a pre signed URL for an object you don't have access to?

* How are pre signed URL permissions calculated?

* Is it better to use IAM Role or IAM Identity when generating pre signed URL?

* How does S3 Select and S3 Glacier Select work and what does it provide?

* What are the two services to help you implement an event driven architecture based on S3?

### EFS

* What does EFS stand for?

* What standard EFS implements

* What command would you use to mount a file system on Linux?

* Can you mount an EFS storage on multiple EC2 instances?
* How to access EFS via VPC peering?
* What do you use to mount EFS onto a target machine?
* Is EBS available for Linux and Windows servers?
* What throughput modes are available in EFS?
* What storage classes are available in EFS?

### Aurora

* What is Aurora Global Database?

#### Database Migration Service

## Integration
### API Gateway

* How do we connect to AWS services?

* What does API Gateway allow to do?

* Can you pull data directly from Dynamo DB using API Gateway?

### SNS

* What messaging pattern does SNS support?

* Where do publishers send messages to?

* How to apply filter to a subscriber's topic?
* What is fanout?
* What information SNS retunrns?

* What are step functions?
* How step functions use state machines?
* How to support long running order flow?
* What is the maximum duration of the state machine?

### SQS

* What SQS stand for?

* What is a visibility timeout?
* What is a dead letter queue?
* What are the differences between SNS and SQS?

### Kinesis

* What are kinesis streams?
* What are good use cases for kinesis?
* Kinesis is like Azure IoT Hub

## KMS (Key Management Service)

* What security standard does KMS comply with?

## Cloud Formation

* What YAML tag need to follow if *AWSTemplateFromatVersion* is present in the file?
* What tag controls the UI aspects of the service?
* The ... section enables adding options selectable by users.
* Template > Stack > Logical Resources. What happens when stack is deleted?
* What field is referenced by default when using *! Ref* function?

## CloudWatch & Observability

* What are the 3 components of CloudWatch?

* What is a Cloud Trail Event
* How long does Cloud Trail store events?

* How much does Cloud Trail service cost

* What are two types of cloud trail events?

* What is the default scope of cloud 
