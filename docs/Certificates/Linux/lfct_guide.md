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

## LFC Free training

Linux Foundation has a lot of [free courses](https://training.linuxfoundation.org/resources/?_sft_content_type=free-course)

Here are some that are useful for the exam:

- [introduction to git](https://training.linuxfoundation.org/training/git-for-distributed-software-development-lfd109x/)
- [linux tools and command line utilities](https://training.linuxfoundation.org/training/linux-tools-for-software-development-lfd108x/)
- [introduction to GitOps](https://training.linuxfoundation.org/training/introduction-to-gitops-lfs169/)
- [devops iac and containers](https://training.linuxfoundation.org/training/introduction-to-devops-and-site-reliability-engineering-lfs162/)
- [cloud infrastructure](https://training.linuxfoundation.org/training/introduction-to-cloud-infrastructure-technologies/)

Another useful training in Pawel's [final
test](https://killercoda.com/pawelpiwosz/course/linuxFundamentals/lf-21-finalTest)
on his killercoda linux scenarios. what makes in good is not only excellent
content but also the fact that the test is practical which is what real exam is
about.

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
| Essential Commands            |         20%         |
| System Configuration          |         15%         |
| Troubleshooting               |         20%         |
| Virtualization and Containers |         20%         |
| GitOps Basics                 |         25%         |

The exam is heavy on Linux questions and going through the [linux tools and command line utilities](https://training.linuxfoundation.org/training/linux-tools-for-software-development-lfd108x/)
course is very helpful. Working with archives, using regex, grep, creating and
mounting file systems, permissions, ownership, all this is important to know
very well in a practical application.

Familiarity with `git` is also important, but nothing
too advanced. Definitely refresh on `ip` related config and `cloud-init` in detail.

## Learning Plan

Each section references various skills needed to pass the exam.

If you don't want to install a linux VM, a good way to get some hands on.
practice is to use interactive [killercoda linux
environment](https://killercoda.com/playgrounds/scenario/ubuntu). You can also
use some of the predefined scenarios, such as excellent scenarios by [Pawel
Piwosz](https://killercoda.com/pawelpiwosz).

> Although the exam environment is not ubuntu, the core commands are the same.

### Commands help

It is often easier to use the `--help` flag of a command rather than going
through man pages. Here are a few useful tricks

#### Grep in help output

When using the `--help` parameter it is not possible to `grep` on the result.
Instead use the built in `pager` search functionality. For example:

`ls --help | less` and press `/` to get into search mode.

#### Check what commands are available

If you get stuck and don't know what commands are available, for example for
creating block devices, check the `/sbin` and `/bin` directories content.

### Using man pages

Man pages are available in the exam environment. Learn how to use them
effectively alongside _command_ builtin help. Each _man_ page belongs to one of
the below sections.

> Alternatively to man you can use `info`

A `section` is a number in brackets with the man page name.

✔ section 1: Shell commands and applications <br/>
✔ section 4: Network services – if TCP/IP or NFS is installed Device drivers and
network protocols <br/>
✔ section 5: Standard file formats – for example: shows what a tar archive looks
like. <br/>
✔ section 6: Games <br/>
✔ section 7: Miscellaneous files and documents <br/>
✔ section 8: System administration and maintenance commands <br/>
✔ section 9: Obscure kernel specs and interfaces <br/>

The format in general for pages in man is:

> Letters in **bold** are to be written exactly as they are.
> Words in between [] are options, that is, they can be sent as arguments to the command.
> Letters in _italic_ are to be [substituted](substituted.md) with your arguments.

To identify what man pages sections the command belongs to, use `whatis`
command. For example `whatis passwd` to identify what sections a given command is part of.

> This is equivalent to `man -f passwd`

Getting man help is easy: `man man`

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

##### Searching for files

Use `find` command to search for files.

- Find all files in `root` directory and list them with full path
<details>
<summary>click to see the answer</summary>
<code>find $PWD -maxdepth 1 -type f</code>
</details>

- Find all log files in the `/var` directory, but search only 1 subderictory
deep.
<details>
<summary>click to see the answer</summary>
<code>find /var -maxdepth 2 -name "*.log"</code>
</details>

- list files in the `/usr/local/bin` directory. Output the listing to the screen
AND redirect it to a `~/temp.txt` file
  <details>
  <summary>click to see the answer</summary>
   <code>ls /usr/local/bin | tee ~/temp.txt</code>
  </details>

##### Compare files

- Compare two text files side by side and ignore white space.
<details>
<summary>click to see the answer</summary>
<code>diff --side-by-side --ignore-all-space file1 file2</code>
</details>

##### Create files

- Create 5 files named `file1` to `file5` using one command.

```bash
touch file{1,2,3,4,5}
```

- ls (1) - list directory contents
- cat (1) - concatenate files and print on the standard output
- rm (1) - remove files or directories
- mv (1) - move (rename) files
- mkdir (2) - create a directory
- mkdir (1) - make directories
- rmdir (2) - delete a directory
- rmdir (1) - remove empty directories
- file (1) - determine file type
- ln (1) - make links between files
- tail (1) - output the last part of files
- head (1) - output the first part of files
- less (1) - opposite of more
- more (1) - file perusal filter for crt viewing
- touch (1) - change file timestamps
- wc (1) - print newline, word, and byte counts for each file

#### Use pipes and shell input/output redirections

Pipeing takes output of one command and makes it an input of another command.

Redirection takes output of a command and redirects it into a file or process.

#### Analyze file content using regular expressions

Using `vim` here is preferred as `vim` comes with extensive help system. Just
type `:h regex` to get basic info about regex syntax.

Use egrep for command line regular expressions, for example `egrep "Dec 11| Dec 10" testdates.txt`

To practice regular expressions use [regular expressions
101](https://regex101.com/).

Linux Foundation has a comprehensive [regex
cheatsheet](https://docs.linuxfoundation.org/lfx/project-control-center/tools/security/manage-false-positives/regular-expressions-cheat-sheet).

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

- check timezone with `timedatectl`
- `ls -l /etc/localtime`
- `timedatectl set-timezone CET`

#### Configure networking and local hostname resolution

[RedHat ip command cheatsheet](https://access.redhat.com/sites/default/files/attachments/rh_ip_command_cheatsheet_1214_jcs_print.pdf)

## ip commands

Changes made with the `ip` command take immediate effect, there is no need to
reboot.

Good guide [here](https://www.howtogeek.com/657911/how-to-use-the-ip-command-on-linux/)

> in older liux distributions there was `ifconfig` command. It has limited
> capabilities compared to the `ip` command.

### `ip link`, `ip link show dev em1`

**Description:** display and change the state of network interfaces.

**Use cases:**

- identify networking interface for cluster connectivity (ens3)
- show MAC address on the ens3 network interface (ip link show dev ens3)

### `ip addr`

**Description:** display IP Addresses and property information assigned to network interfaces.

**Use cases:**

- check network range of cluster nodes

### `ip -4 addr`

Show all ipv4 addresses of all devices

### `ip route` or `route`

**Description:** view routing table on the host.

**Use cases:**

- check default route for dns resolution (ip route show default)

## `arp`

**Description:** Using the arp command allows you to display and modify the Address Resolution Protocol (ARP) cache. An ARP cache is a simple mapping of IP addresses to MAC addresses. Each time a computer’s TCP/IP stack uses ARP to determine the Media Access Control (MAC) address for an IP address, it records the mapping in the ARP cache so that future ARP lookups go faster.

**Use cases:**

- check MAC address of a node

## DNS commands

### `nslookup`

**Description:** query DNS server to resolve domain name

**Use cases:** check if k9s DNS server (like Core DNS) is working correctly

### `dig`

**Description:** query DNS server to resolve domain name, similar to nslookup but returns more details

**Use cases:** check if k9s DNS server (like Core DNS) is working correctly

## services commands

### `ps -aux | grep <service-name>`

**Use cases:**

- find paths to certificates and other settings for CNI etc `ps -aux | grep kubelet`

## network status

### `netstat -plnt`

**Description:** In computing, netstat (network statistics) is a command-line tool that displays network connections (both incoming and outgoing), routing tables, and a number of network interface (network interface controller or software-defined network interface) and network protocol statistics

**Use cases:**

- check

## sockets

### `ss -lp`

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

[ubuntu official docc](https://cloud-init.io/)

[cloud init tutorial](https://cloudinit.readthedocs.io/en/latest/topics/examples.html)

[video](https://www.youtube.com/watch?v=exeuvgPxd-E&ab_channel=LearnLinuxTV)

#### Create and manage application containers (Podman or Docker)

There is a free service there you can spin up a few vms (some of them already have docker swarm preinstalled) and exercise without installing anything on your machine!

[Interactive online docker environments on demand: docker](https://labs.play-with-docker.com/)

#### Understand the need for container orchestration

https://itnext.io/how-to-be-a-devops-maestro-containers-orchestration-guide-b2cf884eaed1

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

### GitOps Basics

[link](https://medium.com/itnext/gitops-with-kubernetes-740f37ea015b)

#### Use the Git version control system

#### Perform change/code review

#### Work on version control and collaboration platforms (GitHub, GitLab)

#### Understand models of change management

#### Run commands on multiple systems and capture output

#### Automate configuration management

### Logging in docker

Default logging drive for docker is **json-file**.
To change logging driver to for example splunk, update deamon.json, like so:

`echo ‘{“log-driver”: “splunk”}’ > /etc/docker/daemon.json`

## Networking

![Docker Core Networking](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-core-networking.puml&fmt=svg)

### Docker server components

![Docker Server Components](https://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/docker-components-tree.puml&fmt=svg)

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
