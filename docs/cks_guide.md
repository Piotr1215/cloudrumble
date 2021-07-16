# CKS Guide

## The 4C's of cloud native computing

The 4C's of cloud native computing represent security in depth where each "C" stands for level of isolation from outside in.

![The 4 C's](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/cks-4cs.puml&fmt=svg)

|Layer| Description |
|---|---|
|Cloud|Security of entire infrastructure hosting the servers. Public/Private etc.|
|Cluster|Kubernetes cluster|
|Container|Docker containers. Running, for example in privilege mode.|
|Code|Binaries, source code, code configuration, no TLS, variables in code, etc.|

## Admission controllers

### Image policy webhook

#### Admission configuration

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: AdmissionConfiguration
plugins:
- name: ImagePolicyWebhook
  configuration:
    imagePolicy:
      kubeConfigFile: <path-to-kubeconfig-file>
      allowTTL: 50
      denyTTL: 50
      retryBackoff: 500
      defaultAllow: true
```

> [!NOTE] `defaultAllow: true` if admission webhook server is not reachable, all request will be allowed

#### Enable admission controller

If Kubernetes components are deployed as daemons, edit service configuration file by `systemctl edit service_name`, else if Kubernetes has been deployed using `kubeadm`, simply edit pod manifest `vim /etc/kubernetes/manifests/kube-apiserver.yaml` and add `ImagePolicyWebhook` to `--enable-admission-plugins=` section as well as pass admission control config file via `--admission-control-config-file=`

## Secrets

> [!TIP] to switch off auto-mounting secrets on the pod, use `automountServiceAccountToken: false`

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

there are 2 profile types:

- **whitelist**: only specified syscalls are allowed, all others are rejected
- **blacklist**: all syscalls are allowed, unless specified in the file

### Docker seccomp filter

By default Docker enables seccomp filter (mode 2).

It blocks around *60* of the around *300* syscalls available with default profile

> [!TIP] How to check what syscalls are blocked?
> Run amicontained tool as container to see syscalls blocked by default docker profile
>
> `docker run r.j3ss.co/amicontained amicontained`
>
> Run amicontained tool as pod to see syscalls blocked by Kubernetes default profile
>
> `k run amicontained --image r.j3ss.co/amicontained amicontained -- amidontained`
>
> check pod logs
>
> `k logs amicontained`

### Enable seccomp in Kubernetes

Create a pod using yaml spec and enable *RuntimeDefault* profile under securityContext of pod

```yaml
spec:
  securityContext:
    seccompProfile:
      type: RuntimeDefault
```

### Custom seccomp profile in Kubenetes

> [!ATTENTION] default seccomp profile is located at **`/var/lib/kubelet/seccomp`**.
> Custom seccomp profile path must be relative to this path

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: audit-pod
  labels:
    app: audit-pod
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: profiles/audit.json
  containers:
  - name: test-container
    image: hashicorp/http-echo:0.2.3
    args:
    - "-text=just made some syscalls!"
    securityContext:
      allowPrivilegeEscalation: false
```

> [!NOTE] In order to apply new seccomp profile, pod must be deleted and re-created. use `k recreate -f ` command

### Seccomp logs

By default seccomp logs will be saved in **`/var/log/syslog`**

You can easily tail logs for specific pod by `tail -f /var/log/syslog | grep {pod_name}`

## AppArmor

<def>AppArmor is a Linux security [module](https://uisapp2.iu.edu/confluence-prd/pages/viewpage.action?pageId=115540061)</def>

- restrict access to specific objects in the system
- determines what resources can be used by an application
- more fine grained control than seccomp
- installed in most systems
- AppArmor profiles are stored under `/etc/apparmor.d/`

### Example AppArmor Profile

```c
#include <tunables/global>

profile k8s-apparmor-example-deny-write flags=(attach_disconnected) {
  #include <abstractions/base>

  file,

  # Deny all file writes.
  deny /** w,
}
```

### Check if AppArmor is running

- `systemctl status apparmor`
- is AppArmor module enabled? `cat /sys/module/apparmor/parameters/enabled`
- is AppArmor profile loaded into kernel? `cat /sys/kernel/security/apparmor/profiles`
- use `aa-status` to check what profiles are loaded

### AppArmor profiles load modes

|Mode|Description|
|---|---|
|enforce|enforce and monitor on any app that fits the profile|
|complain|log as events|
|unconfined|any task allowed, no logging|

### AppArmor in Kubernetes

- support added in v 1.4, but still in beta
- to load profile from default location use `apparmor_parser -q /etc/apparmor.d/{profile_name}`

> [!TIP] to secure a pod an annotation in this format `container.apparmor.security.beta.kubernetes.io/<container_name>: localhost/profile_name OR runtime/default OR unconfined`

#### Use Case

AppArmor can be used to for example restrict access to a folder inside pod/container.

## Linux Capabilities

- [List of Linux Capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html)
- Capabilities are added and removed per container

  ```yaml
  securityContext:
    capabilities:
     add: ["CAP1"]
     drop: ["CAP2"]
  ```

> [!TIP] To check what capabilities are needed for any give command run `getcap /<path>/<command>` or to check capabililties used by a running process run `getpcaps PID`

## Containers Isolation

![Container Isolation](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/cks-container-isolation.puml&fmt=svg)

### gVisor

<def>[gVisor](https://gvisor.dev/) is an application kernel for containers that provides efficient defense-in-depth anywhere.</def>

> [!NOTE] [Install gVisor](https://gvisor.dev/docs/user_guide/install/)

![Container Isolation](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/cks-containers-gvisor-isolation.puml&fmt=svg)

### Kata Containers

<def>[Kata Containers](https://katacontainers.io/) Kata Containers is an open source container runtime, building lightweight virtual machines that seamlessly plug into the containers ecosystem.</def>

![Container Isolation](http://www.plantuml.com/plantuml/proxy?cache=yes&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/cks-containers-katacontainers-isolation.puml&fmt=svg)

> [!NOTE] this requires nested virtualization (in case of running workloads on VMs) and can degrade performance. Some cloud providers do not support nested virtualization.

### Containers isolation in Kubernetes

- run a container with kata container runtime: `docker run --runtime kata -d nginx`
- run a container with gVisor runtime: `docker run --runtime runsc -d nginx`

1. Create runtime object
2. use `runtimeClassName` on pod definition level to use the runtime