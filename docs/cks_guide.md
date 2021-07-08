# CKS Guide

## The 4C's

### Cloud

Security of entire infrastructure hosting the servers. Public/Private etc.

### Cluster

Kubernetes cluster

### Container

Docker containers. Running in privilege mode.

### Code

Code configuration, no TLS, variables in code, etc.

## CIS Benchmark

Center for Internet Security

## Pod Decision Tree

![POD Decision Tree](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/cks-pods-escalation.puml&fmt=svg)

## Seccomp

<def>Seccomp: Secure Computing</def>

### How syscalls work

![Syscalls](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/linux-syscalls.puml&fmt=svg)

### How to check if Seccomp is enabled

```bash
grep -i seccomp /boot/config-$(uname -r)
```

### Check seccomp status on the process

```bash
# 1. ssh into container
# 2. list processes
ps -ef

# 3. grep for seccomp status
grep -i seccomp /proc/{PID}/status
```

If the result is **2** it means that seccomp is enabled for the container

### Seccomp modes

|Mode|Description|
|---|---|
|Mode 0| Disabled|
|Mode 1| Strict - will block all calls except *read, write, exec, sigreadon*|
|Mode 2| Filtered - filter selectively|

### Seccomp filter json file

![Syscalls](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/linux-seccomp-profile.puml&fmt=svg)

### Docker seccomp filter

By default Docker enables seccomp filter (mode 2).


