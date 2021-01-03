# Kubernetes Examples

## Sandbox Setup

There are a lot of different options to play around with Kubernetes for free:

- Local installation with [Minikube](https://minikube.sigs.k8s.io/docs/) or [MicroK8s](https://microk8s.io/)
- Local installation with [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/)
- Local installation with [Docker Desktop](https://www.docker.com/products/docker-desktop) on Windows, Mac or Linux
- Remote cluster with [Katakoda](https://www.katacoda.com/)
- Remote cluster with free credits on any public cloud provider, 3 most popular ones:
  - [AKS*](https://docs.microsoft.com/en-us/azure/aks/)
  - [GKE](https://cloud.google.com/kubernetes-engine/)
  - [EKS](https://aws.amazon.com/eks/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&eks-blogs.sort-by=item.additionalFields.createdDate&eks-blogs.sort-order=desc)
- Remote cluster or local installation with [LXC Containers](https://linuxcontainers.org/)
- Remote cluster [PWK - Play With Kubernetes*](https://labs.play-with-k8s.com/)

In most of the examples we are going to use PWK, because there is no need to install anything locally and the environment we end up with is powerful enough to get through all examples. Some examples will require cloud provider cluster and those will be done on AKS.

Follow instructions in [This guide](https://github.com/collabnix/kubelabs/blob/master/kube101.md) and setup 3 nodes cluster. 1 master and 2 worker nodes

- `git clone https://github.com/collabnix/kubelabs`
- `cd kubelabs`
- `sh bootstrap.sh`
- Add nodes to cluster by executing command printed at the end of bootstrapping process

> [!ATTENTION]
>
> - PWK is sometimes not responsive, so you need to close session and try again later
> - The guide asks to setup 5 nodes but for our purposes 3 are more than enough (1 master, 2 workers)
> - In case PWK is down or not responsive, I recommend installing Docker Desktop

### Cluster visualization tools

Once the cluster is ready, let's setup some tools:

- Better ``kubectl``: this is [my wrapper around `kubectl CLI`](https://itnext.io/portable-kubernetes-management-with-kubectl-in-docker-cb861a2c3c02) and can be installed with this command:

``` bash
# .kube/config is a symlink to /etc/kubernetes/admin.conf
# running this container as root is only for testing purposes!
docker run --network=host --name=kubectl-host -v /etc/kubernetes/admin.conf:/root/.kube/config --rm -it piotrzan/kubectl-comp:zsh
```

- [Octant](https://octant.dev/) is a VMWare open source cluster visualizer, running in a browser so no local installation is required.

All those tools will allow us to move around the cluster easier and will help us visualize and learn.
