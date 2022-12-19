---
title: Linuc Foundation Certified Cloud Practitioner
sidebar_label: LFCT
tags:
  - Linux
  - Cloud
  - Certification
---

## Certification

:::note
More details about certification and exam [available on Linux Foundation website](https://training.linuxfoundation.org/certification/linux-foundation-certified-cloud-technician/).
The Linux Foundation introduced the certification in [November
2022](https://training.linuxfoundation.org/blog/introducing-lfct/).
:::

## Exam

- Exam can be taken remotely
- **120** minutes to go through **20** tasks and questions
- Questions are multiple-choice
- Exam VMs run distro-agnostic Alpine based Linux
- Vim/Nano editors are available
- Man pages are available
- Both practical task and theoretical questions
- Chrome browser recommended for the exam
- Passing score is minimum **64%**
- 12 months to schedule and take the exam from the purchase date
- One free retake
- Certification valid for 3 years

### Exam topics

| Topic                         | % of exam questions |
| ----------------------------- | :-----------------: |
| Essencial Commands            |         20%         |
| System Configuration          |         15%         |
| Troubleshooting               |         20%         |
| Virtualization and Containers |         20%         |
| GitOps Basics                 |         25%         |

## Learning Plan

Each section references various skills needed to pass the exam.

### Learn to use man pages

Man pages are available in the exam environment. Learn how to use them
effectively alongside _command_ builtin help.

Section 1 : Shell commands and applications
Section 2 : Basic kernel services – system calls and error codes
Section 3 : Library information for programmers
Section 4 : Network services – if TCP/IP or NFS is installed Device drivers and network protocols
Section 5 : Standard file formats – for example: shows what a tar archive looks like.
Section 6 : Games
Section 7 : Miscellaneous files and documents
Section 8 : System administration and maintenance commands
Section 9 : Obscure kernel specs and interfaces

The format in general for pages in man is;

    Letters in bold are to be written exactly as they are.
    Words in between [] are options, that is, they can be sent as arguments to the command.
    Letters in italic are to be substituted with your arguments.

Use `whatis passwd` to identify what sections a given command is part of.

> This is equivalent to `man -f passwd`

get man help

```bash
man man
```

It's possible to use `/search` and `n/N` to navigate the search results. Search
also support regex so `/^(\s*\-v)` would search for lines starting from `-h`

If you know that the command is in multiple sections (like `passwd` for example)
you can.

```bash
man passwd.5
```

Search for man pages with certain keyword, for example `man -k directory` would
show all the man pages that have a directory word in them. This can be extended
with `grep` and focus search on specific actions. `man -k directory | grep -i
crate`.

### Essential Commands

#### Search for, compare, and manipulate files and file content

There are several command in this category:

- find, grep
- diff
- sed, awk, cut

#### Use pipes and shell input/output redirections

Pipeing takes output of one command and makes it an input of another command.

Redirection takes output of a command and redirects it into a file or process.

#### Analyze file content using regular expressions

[Regular expressions 101](https://regex101.com/)

[Regex cheatsheet](https://docs.linuxfoundation.org/lfx/project-control-center/tools/security/manage-false-positives/regular-expressions-cheat-sheet)

#### Create and work with archives

unzip, tar, cpio

#### Create and manage hard and symbolic links

ln and ln -s

https://stackoverflow.com/questions/185899/what-is-the-difference-between-a-symbolic-link-and-a-hard-link

#### List, set, and change file access permissions

chmod, chown, setfacl (ubuntu derivatives only)

### System Configuration

#### Install software packages

Depending on the system.

#### Create and maintain filesystems

https://www.thegeekdiary.com/how-to-create-and-mount-filesystems-in-linux/

#### Administer local user and group accounts

Create user: useradd, groupadd, 

#### Configure and set system time and timezone

https://linuxize.com/post/how-to-set-or-change-timezone-in-linux/

#### Configure networking and local hostname resolution

### Troubleshooting

#### Identify and inspect processes and services

ps, pskill, netstat

#### Health-check and repair network services

#### Identify and inspect storage issues

https://www.howtouselinux.com/post/debugging-disk-usage-in-linux

#### Troubleshoot containers

What kind of containers?

### Virtualization and Containers

#### Create and manage local and cloud-hosted Virtual Machines

virtualbox, quemu 

#### Use cloud-init to initialize cloud-hosted Virtual Machines

#### Create and manage application containers (Podman or Docker)

#### Understand the need for container orchestration

https://itnext.io/how-to-be-a-devops-maestro-containers-orchestration-guide-b2cf884eaed1

### GitOps Basics

#### Use the Git version control system

#### Perform change/code review

#### Work on version control and collaboration platforms (GitHub, GitLab)

#### Understand models of change management

#### Run commands on multiple systems and capture output

#### Automate configuration management

### Find good training material

As a primary online training learning source I have used Kodekloud's [Docker Certified Associate Exam Course](https://kodekloud.com/p/docker-certified-associate-exam-course).

As a primary learning resource in general I cannot recommend enough **Nigel Poulton's DOCKER DEEP DIVE**. You can get the book for less than 10 EUR on Amazon in kindle format.

You can check out [Nigel's personal page](https://nigelpoulton.com/) for more information.

I have already passed, and blogged about [CKA](https://medium.com/faun/preparation-and-resources-for-cka-exam-ca868fc678c9) and [CKAD](https://piotrzan.medium.com/preparation-and-resources-for-ckad-exam-ea1b2e8888e3) and there is significant overlap with Kubernetes orchestration part and containers basics.

There is a great repo by [Govinda Fichtner](https://github.com/Govinda-Fichtner) where there are links to docker documentation organized per learning topic. You can find the repo here: [DCA Prep Guide from DevOps-Academy](https://github.com/DevOps-Academy-Org/dca-prep-guide).

### Go though mock questions and exams

Since the exam is in the form of questions, it is important to exercise as much as possible and go thought questions and mock exams. Kodekloud course I've mentioned before has a lot of questions build in, but there are also free mock exams and questions. One from medium I find very good:
[Medium blog - 250 Practice Questions for the DCA Exam](https://medium.com/bb-tutorials-and-thoughts/250-practice-questions-for-the-dca-exam-84f3b9e8f5ce).

### Practice with Docker

In this exam practical exercises are not as important as in CKA and CKAD for example, but I still find it valuable to follow up a theoretical session with a practical review.

There is a free service there you can spin up a few vms (some of them already have docker swarm preinstalled) and exercise without installing anything on your machine!

[Interactive online docker environments on demand: docker](https://labs.play-with-docker.com/)

There is also a similar service for exercising with Kubernetes and is very useful for the Kubernetes orchestration part.

[Interactive online docker environments on demand: kubernetes](https://labs.play-with-k8s.com/)

:::tip
Just a small hint, once you bootstrap Kubernetes, you can use my [_portable kubectl in docker image_](https://itnext.io/portable-kubernetes-management-with-kubectl-in-docker-cb861a2c3c02) to run kubectl with diagnostic tools and aliases.
:::

Here are easy steps to run the container:

```bash

*Results:*
```
PASSWD(5)                                                                                                                        File Formats and Conversions                                                                                                                        PASSWD(5)

NAME
       passwd - the password file

DESCRIPTION
       /etc/passwd contains one line for each user account, with seven fields delimited by colons (“:”). These fields are:

       •   login name

       •   optional encrypted password

       •   numerical user ID

       •   numerical group ID

       •   user name or comment field

       •   user home directory

       •   optional user command interpreter

       If the password field is a lower-case “x”, then the encrypted password is actually stored in the shadow(5) file instead; there must be a corresponding line in the /etc/shadow file, or else the user account is invalid.

       The encrypted password field may be empty, in which case no password is required to authenticate as the specified login name. However, some applications which read the /etc/passwd file may decide not to permit any access at all if the password field is blank.

       A password field which starts with an exclamation mark means that the password is locked. The remaining characters on the line represent the password field before the password was locked.

       Refer to crypt(3) for details on how this string is interpreted.

       If the password field contains some string that is not a valid result of crypt(3), for instance ! or *, the user will not be able to use a unix password to log in (but the user may log in the system by other means).

       The comment field is used by various system utilities, such as finger(1).

       The home directory field provides the name of the initial working directory. The login program uses this information to set the value of the $HOME environmental variable.

       The command interpreter field provides the name of the user's command language interpreter, or the name of the initial program to execute. The login program uses this information to set the value of the $SHELL environmental variable. If this field is empty, it defaults to the
       value /bin/sh.

FILES
       /etc/passwd
           User account information.

       /etc/shadow
           optional encrypted password file

       /etc/passwd-
           Backup file for /etc/passwd.

           Note that this file is used by the tools of the shadow toolsuite, but not by all user and password management tools.

SEE ALSO
       crypt(3), getent(1), getpwnam(3), login(1), passwd(1), pwck(8), pwconv(8), pwunconv(8), shadow(5), su(1), sulogin(8).

shadow-utils 4.8.1                                                                                                                        11/24/2022                                                                                                                                 PASSWD(5)
/tmp/mdeval//lfctguidemd_72_175.sh: line 4: unexpected EOF while looking for matching ``'
/tmp/mdeval//lfctguidemd_72_175.sh: line 102: syntax error: unexpected end of file
```

# Run container on same network as host
docker run -d --network=host --name=kubectl-host --rm -it piotrzan/kubectl-comp:zsh

# Copy over Kubernetes config file
kubectl config view --raw > config
docker cp ./config kubectl-host:./root/.kube

# Attach shell to running container
docker attach kubectl-host
```

Or simpler version with volume mount

```bash
# .kube/config is a symling to /etc/kubernetes/admin.conf
docker run --network=host --name=kubectl-host -v /etc/kubernetes/admin.conf:/root/.kube/config --rm -it piotrzan/kubectl-comp:zsh
```

### Know Docker/Mirantis documentation well

There are plenty of great learning repositories with exam topics directly linked to Docker/Mirantis documentation. A good one that is also up to date is [Evalle/DCA](https://github.com/Evalle/DCA).

Such sources are great shortcut for learning and reference later on, but I like to have all my links at my fingertips right in bookmarks bar.

If you would like to have same bookmarks, please use my gist below and import them from file. Bookmarks are arranged in subfolder corresponding to exam topics:
:::note
[DCA Bookmarks GIST](https://gist.github.com/Piotr1215/75b0105e020b740480a7d85e4e5e3dd7)
:::

## Basic Concepts

### Docker CLI syntax

Docker CLI has following syntax:

**Syntax:** `docker <docker-object> <sub-command> <-options> <arguments/commands>`

**Example**: `docker container run -it ubuntu`

### Docker Components

![Docker Architecture](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-architecture.puml&fmt=svg)
_Sources_:

- [dockerd](https://docs.docker.com/engine/reference/commandline/dockerd/)
- [containerd](https://containerd.io/)
- [runc](https://github.com/opencontainers/runc)
- [libcontainer](http://jancorg.github.io/blog/2015/01/03/libcontainer-overview/)
- [containerd-shim](https://medium.com/faun/docker-containerd-standalone-runtimes-heres-what-you-should-know-b834ef155426)

### Container Layer

By default all docker image layers are immutable (read-only). When container is created using `docker run` command, an additional mutable (read-write) layer is created. **This layer is only there for the duration of container lifetime and will be removed once container exits**. When modifying any files in a running container, docker creates a copy of the file and moves it to container layer (COPY-ON-WRITE) before changes are saved. Original files as part of the image are never changed.

### Access remote Docker host from CLI

On machine form where you want to access docker host, setup variable:

```bash
export DOCKER_HOST="tcp://<docker-host-ip>:2375"
```

:::note
Docker default ports:
:::

> - **2375** - unencrypted traffic
> - **2376** - encrypted traffic.

:::danger
**IMPORTANT**: This setting is only for testing/playground purposes. It will make docker host available on the network and by default there is no authentication.
:::

### Use docker CLI as non root user

1. Create Docker group: `sudo groupadd docker`
2. Create a non-root user you want to use with docker: `sudo useradd -G docker <user-name>`
3. Change this user primary group: `sudo usermod -aG docker <non-root user>`
4. Logoff and login with the docker user.
5. Optional - restart docker service: `sudo systemctl restart docker`

## Orchestration

### Orchestration Areas

![Orchestration](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-orchestration.puml&fmt=svg)

There are a few solutions on the marked that can help with container and nodes orchestration. By far most widely adopted one is Kubernetes followed by Docker Swarm. During the exam there will be questions about both.

:::tip
I have covered in detail my learning path for **CKA** and **CKAD** certifications. So check my [Medium profile](https://piotrzan.medium.com/) if you would like to learn more.
:::

### Kubernetes Architecture

![Kubernetes Architecture](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-architecture.puml&fmt=svg)
_Source_: <https://kubernetes.io/docs/concepts/overview/components/>.

### Docker Swarm Architecture

![Docker Swarm](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-swarm-architecture.puml&fmt=svg)
_Source_: <https://docs.docker.com/engine/swarm/images/service-lifecycle.png>.

#### What is docker stack

Docker stack is very similar to docker compose with key difference being that **docker compose defines containers** while **docker stack defines services**. Swarm also provides commands to work with stacks directly.

Useful Stack commands:

- `docker stack deploy -c <compose file>` - deploy the new stack or update
- `docker stack services` - list services in the stack
- `docker stack ps` - list the tasks in the stack
- `docker stack rm` - remove the stack
- `docker stack ls` - List stack

#### Difference between docker stack ls and docker stack ps

- `docker stack ls` - lists all the stacks
- `docker stack services` - list the services created by a stack
- `docker stack ps <stack-name>` - lists all the services running in a stack

#### Docker Swarm Networks

- **Overlay networks**: manage communications among the Docker daemons participating in the swarm.You can attach a service to one or more existing overlay networks as well, to enable service-to-service communication.

- **ingress network**: is a special overlay network that facilitates load balancing among a service’s nodes. When any swarm node receives a request on a published port, it hands that request off to a module called IPVS. IPVS keeps track of all the IP addresses participating in that service, selects one of them, and routes the request to it, over the ingress network.

- **docker_gwbridge**: is a bridge network that connects the overlay networks (including the ingress network) to an individual Docker daemon’s physical network.

### Raft Consensus and Quorum

Implementing [Raft Consensus Algorithm](http://thesecretlivesofdata.com/raft/) ensures that all manager nodes in a distributed system are storing the same consistent state.

#### Quorum

To calculate minimum number of master nodes required to achieve _quorum_ (or simply majority) use $\boxed{N=\frac {N + 1} 2}$ and round the result to full number.

So having 5 master nodes, the quorum is 3.

#### Fault Tolerance

Knowing the quorum of master nodes, we can predict fault tolerance which is a number describing how many master nodes can fail before cluster is going to be put in an inconsistent state.

To calculate _fault tolerance_ of the cluster use $\boxed{N=\frac {N - 1} 2}$

So as an example having 7 master nodes, our quorum is **7+1/2 = 4** and fault tolerance **7-1/2 = 3**

### Kubernetes Deployment Spec

![Kubernetes Deployment Spec](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-deployment-spec.puml&fmt=png)

_Sources_:

- Json representation of a deployment based on my [blazor in Docker demo](https://hub.docker.com/repository/docker/piotrzan/blazorindocker)
- <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#writing-a-deployment-spec>

Highlighted fields are the only required fields for deployment to work.

:::note
.spec.template is the same as pod spec, without apiVersion and kind fields
:::

## Images and Registry

### Creating docker images

Docker image is an immutable blueprint based on which containers are created.

### Difference between CMD and ENTRYPOINT

_CMD_ and _ENTRYPOINT_ sections of `Dockerfile` are used to instruct docker what to do once container is started.

<u>CMD</u>

This section defines what command will be executed once container starts.
For example:

- defining `CMD ["httpd"]` in a `Dockerfile` building httpd server will start httpd Apache server based on the image used
- running httpd image with command override `docker run httpd printenv` will override default `CMD` with `printenv` command which will output environmental variables to the terminal
- command can be specified as regular command: `CMD httpd` or as json array `CMD ["sleep", "5"]`

:::note
in json array syntax first element of an array is command itself and all subsequent elements are parameters/options
:::

<u>ENTRYPOINT</u>

This section defines what command will be executed once container starts and cannot be overridden by default (you need to use `--entrypoint` flag to force override). All arguments passed via docker run will be appended to command defined in `ENTRYPOINT`

- `CMD` and `ENTRYPOINT` work great together where `ENTRYPOINT` defines "fixed" command to be executed once container starts and `CMD` provides default, but overrideable arguments to run the container in different ways.

:::note
It is required to specify both `CMD` and `ENTRYPOINT` in a json array format for the override to work
:::

### How to control resources utilization by a container

#### CPU

Default CPU share per container is 1024

**Option 1:**
If host has multiple CPUs, it is possible to assign each container a specific CPU.

**Option 2:**
If host has multiple CPUs, it is possible to restrict how many CPUs can given container use.

It's worth noting that container orchestrators (like Kubernetes) provide declarative methods to restrict resources usage per run-time unit (pod in case of Kubernetes).

#### Memory

**Option 1:**
Run container with `--memory=limit` flag to restrict use of memory.
If a container tries to consume more memory than its limit, system will kill it exiting the process with Out Of Memory Exception (OOM). By default container will be allowed to consume same amount of SWAP space as the memory limit, effectively doubling the memory limit. Providing of course that SWAP space is not disabled on the host.

### Ports mapping

Ports mapping always goes from HOST to CONTAINER, so `-p 8080:80` would be mapping of port 8080 on host to port 80 on container.

:::tip
Hint: Prefer using "-p" option with static port when running containers in production.
:::

### How to copy files

Copying files is very easy, first parameter after cp command is source and second destination.

1. Copy file from host to continuer: `docker container cp /tmp/file.txt container_name:/tmp/file.txt`
2. Copy file from container tp host: `docker container cp container_name:/tmp/file.txt /tmp/file.txt`

### Check logs to troubleshoot docker service

- Check system logs: `journalctl -u docker.service`
- Check free space on the host: `df -h`, use `docker container prune` or `docker image prune` to get rid of stale containers/images

### Where Images are pulled from?

By default docker will pull images from configured images repository (Docker Hub by default), but it's possible to specify `build` directive instead of `image` with a path to `Dockerfile`

## Installation and Configuration

### MKE Architecture

![MKE Architecture](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/MKE-UCP-architecture.puml&fmt=svg)

_Source_: <https://docs.mirantis.com/docker-enterprise/v3.0/dockeree-products/mke/mke-architecture.html>

Be aware that after Docker acquisition by Mirantis there have been some naming and product changes, so following applies:

- Docker Trusted Registry (DRT) **is now** Mirantis Secure Registry (MSR)
- Universal Control Plane **is now** Mirantis Kubernetes Engine (MKE)
- Docker Enterprise Edition (DEE) **is now** Mirantis Container Runtime (MCR)

### UCP/MKE Backup

To take a backup of UCP/MKE use **docker/ucp** container

### DTR/MSR Backup

To perform a backup of a MSR node, run the **mirantis/dtr backup msr-cli-backup** command

### Docker Swarm Backup (simplified)

To back up the swarm using any manager, follow these steps.

1. If the swarm has auto-lock enabled, you need the unlock key to restore the swarm from backup.

2. Stop Docker on the manager before backing up the data, so that no data is being changed during the backup.

:::note
Be sure to maintain the quorum of swarm managers
:::

3. Back up the entire /var/lib/docker/swarm directory.

4. Restart the manager.

_Source_: <https://docs.docker.com/engine/swarm/admin_guide/#back-up-the-swarm>

### Kubernetes configMaps

In order to configure configMapKeyRef in a pod to use environment variables defined in a ConfigMap, use container path subset **spec.containers.env.valueFrom**

### Change docker daemon host configuration

Configuration file is located at `/etc/docker/daemon.json` and is by default in `json` format.
This file is not present by default.

### Logging in docker

Default logging drive for docker is **json-file**.
To change logging driver to for example splunk, update deamon.json, like so:

`echo ‘{“log-driver”: “splunk”}’ > /etc/docker/daemon.json`

## Networking

![Docker Core Networking](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-core-networking.puml&fmt=svg)

### Docker server components

![Docker Server Components](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-components-tree.puml&fmt=svg)

### Kubernetes network policies

![Kubernetes Network Policy](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-network-policy.puml&fmt=svg)

As soon as a network policy is associated with a POD all ingress and egress traffic to that POD are denied except allowed by the network policy.

### Kubernetes service resource

Kubernetes uses services to enable communication between pods and other resources as well as external endpoints. Service can declare 3 types of ports:

- **Port** - exposes the Kubernetes service on the specified port within the cluster. Other pods within the cluster can communicate with this server on the specified port.
- **TargetPort** - is the port on which the service will send requests to, that your pod will be listening on. Your application in the container will need to be listening on this port also.
- **NodePort** - exposes a service externally to the cluster by means of the target nodes IP address and the NodePort. NodePort is the default setting if the port field is not specified.

:::note
By default NodePort range in Kubernetes is **30000-32767**
:::

### Docker daemon stop behavior

By default once docker deamon is stopped or crashes all containers will be stopped as well.

To change this behavior set `"live-restore: true"` in `/etc/docker/deamon.json` config file.

### Docker port mapping

![Docker Port Mapping](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-port-mapping.puml&fmt=svg)

### Docker Networking

![Docker Networking Mindmap](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-networks.puml&fmt=svg)

:::caution
**Important** Containers can only communicate on a user defined bridge/host network
:::

### DTR overlay network

The network created for the DTR services to communicate with each other is **overlay/dtr-ol**

## Security

### Security Layers

![Layered Security](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-security-layers.puml&fmt=svg)

### Access Control Model in MKE

![Access Control Model](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/MKE-UCP-access-control-model.puml&fmt=svg)
_Source:_ <http://docs.docker.oeynet.com/datacenter/ucp/2.2/guides/access-control/>

Grants are effectively Access Control Lists (ACLs) which provide comprehensive access policies for an entire organization when grouped together.,Grants define which users can access what resources in what way.,A grant is made up of a subject, a role, and a resource set.

To control user access, cluster resources are grouped into Docker Swarm collections or Kubernetes namespaces.,Together, collections and namespaces are named resource sets.

### Image Scanning

DTR/MSR has an ability to scan images for known vulnerabilities, it is done with a container called **dtr-jobrunner**.

## Storage and Volumes

### Kubernetes Storage Lifecycle

![Kubernetes Storage Lifecycle](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-storage-seq.puml&fmt=png)

_Source_: [Kubernetes Documentation](https://kubernetes.io/)

The above diagram shows manual provisioning of **Persistent Volumes** as well as using them via **Persistent Volume Claims**.

The process can be divided into 4 phases:

- Creation
- Setting up
- Usage
- Cleanup

### Where is everything stored

Once installed, docker creates a folder under `/var/lib/docker/` where all the containers, images, volumes and configurations are stored.

Kubernetes and Docker Swarm store cluster state and related information in [etcd](https://etcd.io/).
etcd by default listens on port `2380` for client connections.

### Configure a storage class for an application in k8s

Steps:

1. Create a storage class with a provisioner
2. Create a PVC with the storage class
3. Use the PVC in the volumes section in the pod definition file

### Mounting volumes syntax

List of common storage drivers:

- AUFS - Ubuntu default
- ZFS
- BTRFS
- Device Mapper
- Overlay
- Overlay2

<u>Volume mount</u>

Template old syntax: `docker run -v volume_name:<path to store in container> container_name`

Template new syntax: `docker run --mount source=volume_name,target=<path to store in container> container_name`

Example old syntax: `docker run -v data_vol:/var/lib/nginx_data nginx`

<u>Bind mount</u>

Template old syntax: `docker run -v <full path to folder in docker host>:<full path to folder in container> container_name`

Template new syntax:
`docker run --mount type=bind,source=<full path to folder in docker host>,target=<path to store in container> container_name`

Example old syntax: `docker run -v /data/nginx_data:/var/lib/nginx_data nginx`

## Useful Commands

This section describes useful docker CLI commands in following format:

> **Command:** - docker command syntax
>
> **When is it useful:** - common usecases when command should be used
>
> **Result:** - what is the expected behavior or

### Check Docker Status

> **Command:** `docker system info`
>
> **When is it useful:** quickly see how many containers are running and what is the status of host OS
>
> **Result:** information about docker host environment and containers

### Remove all unused docker artifacts

> **Command:** `docker system prune --all`
>
> **Command Variation:** `docker system prune --all --volumes`
>
> **When is it useful:** when learning or experimenting with docker, it is useful to clear unused artifacts without resetting the whole environment. Command variation with `--volumes` flag will also remove volumes.
>
> **Result:** following will be removed:
>
> - all stopped containers
> - all networks not used by at least one container
> - all images without at least one container associated to them
> - all build cache
> - volumes (if `--volumes` flag is used)

### Stop all running containers

> **Command:** `docker container stop $(docker container ls -q)`
>
> **When is it useful:** quickly stop all running containers at once.
>
> **Result:** all containers are stopped.

### Setup container hostname

> **Command:** `docker container run -it --name=ingress --hostname=nginx nginx`
>
> **When is it useful:** default hostname is container id, setting up recognizable hostname can help with logging etc.
>
> **Result:** container hostname is set to custom one.

### Automatically remove a container when on exit

> **Command:** `docker container run -d --name=ingress --rm nginx`
>
> **When is it useful:** run a container and automatically remove it once stopped. This is very usefully when running CI/CD containers.
>
> **Result:** container starts and is removed once it's stopped.

### Add or remove capabilities for the user running a container

> **Command:** `docker run --cap-add/--cap-drop KILL nginx` or `docker run --privileged nginx`
>
> **When is it useful:** This command is useful when elevating or dropping privileges on the user running container. By default containers run with limited root privileges. Second command runs container with full user privileges.
>
> **Result:** container is run with expected privileges.

### Filter results using --filter flag

> **Command:** `docker search --filter=stars=3 --no-trunc busybox`
>
> **When is it useful:** Results of almost every docker command can be filtered using `--filter key=value` flag. Refer to docker documentation to check what filter options are supported for given command.
>
> **Result:** command output filtered as per filter flag.

## Links and resources

1. [Docker Certified Associate Study Guide](https://docker.cdn.prismic.io/docker/4a619747-6889-48cd-8420-60f24a6a13ac_DCA_study+Guide_v1.3.pdf)
2. [DCA Prep Guide from DevOps-Academy](https://github.com/DevOps-Academy-Org/dca-prep-guide)
3. [Docker Cheatsheet](https://github.com/wsargent/docker-cheat-sheet)
4. [Interactive online docker environments on demand](https://labs.play-with-docker.com/)
5. [Interactive online kubernetes environments on demand](https://labs.play-with-k8s.com/)
6. [Medium blog - 250 Practice Questions for the DCA Exam](https://medium.com/bb-tutorials-and-thoughts/250-practice-questions-for-the-dca-exam-84f3b9e8f5ce)
7. [Kubernetes Official Documentation](https://kubernetes.io/)
8. [Docker Docs](https://docs.docker.com/)
9. [Mirantis Docs](https://docs.mirantis.com/welcome/)
10. [Kodekloud Youtube Docker for Beginners](https://www.youtube.com/watch?v=zJ6WbK9zFpI&t=2s&ab_channel=KodeKloud)
11. [Docker Handbook](https://www.freecodecamp.org/news/the-docker-handbook/)
12. [PlantUML Diagrams as Code](https://plantuml.com/)
13. [K8s Services Explained](https://www.bmc.com/blogs/kubernetes-port-targetport-nodeport/)
