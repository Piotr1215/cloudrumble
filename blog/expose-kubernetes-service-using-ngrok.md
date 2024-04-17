---
title: "Expose Kubernetes Service Using Ngrok"
date: 2020-02-08T21:00:45+02:00
tags: ["kubernetes", "ngrok"]
---

![Photo by [Product School](https://unsplash.com/@productschool?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/office?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/8064/1*trEH_iYn7WBWUAz6DVto1Q.jpeg)

## **Expose local Kubernetes service on internet using ngrok**

Working with local Kubernetes cluster such as minikube, k3s, microk8s or others is great for testing new features, experimenting and running POCs. Once you are ready with a cool new functionality or just want to share quickly results of your work with colleagues or customers, well you have to push everything to an online cluster. It might not be an issue if you have good CI/CD pipeline setup, but most of the time it’s simply too much effort for a simple one-off demo.

<!--truncate-->

Ngrok is an online, free service that enables you (among other things) to create an SSL tunnel to expose your local http traffic to the internet and it takes just a few moments to setup! You can read more about ngrok on their [home page](https://dashboard.ngrok.com/get-started), it’s a great product and can be very useful not only in the scenario we are looking at right now but in broader scope.

### Setup and prerequisites

In order to follow along with thus tutorial you need a few prerequisites.

A local Kubernetes cluster (I’m using minikube on Windows 10 and accessing it via WSL). Local installations that are easy to setup that I can recommend are:

- [Minikube](https://github.com/kubernetes/minikube): Part of Kubernetes repository

- [K3D](https://github.com/rancher/k3d): Helper binary for a small and very fast distribution by Rancher called k3s

- [Microk8s](https://github.com/ubuntu/microk8s): Maintained by Ubuntu

Follow this [installation steps](https://dashboard.ngrok.com/get-started) from ngrok page to setup the cli (you will need to create free account).

You will need **kubectl cli**. Follow official guide from [Kubernetes home page](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or you can also use [my docker image](https://hub.docker.com/repository/docker/piotrzan/kubectl-comp) that hosts kubectl cli as well as bash/zsh completion and a few useful aliases.

### Setup

Once all the prerequisites are installed it’s time to create a few resources in your Kubernetes cluster that we will later expose on internet via ngrok.

We are going to create a simple nginx pod and expose it in Kubernetes via service of type nodePort. Kubernetes services create internal load balancing layer for the pods they target. You can read more about services in [official Kubernetes documentation page](https://kubernetes.io/docs/concepts/services-networking/service/). Once we’ve exposed the service locally, we will use ngrok to create a tunnel between our local service and auto-generated internet address.

### Step by step instructions

1. Set alias for **kubectl **to easier run commands. This step is optional.

`alias k=kubectl`

2. Create nginx pod in your local cluster.

`k run nginx — image nginx — restart Never`

3. Expose nginx pod via a NodePort service.

`k expose pod nginx — port 80 — target-port 80 — type NodePort — name nginx-service`

4. Create variable with the node port of the service. Here we are using **jsonpath **which is kubectl feature allowing to select arbitrary values from api-server. We are checking what nodePort has been automatically assigned by Kubernetes for our service.

`NODE_PORT=$(k get svc nginx-service -o=jsonpath=”{$.spec.ports[0].nodePort}{'\n'}")`

5. Use curl to check if nginx is available on the port of the host. You should see HTML content of the nginx default welcome page.

If you are running Kubernetes in minikube:

`curl [http://{minikube](http://{minikube) ip}:$NODE_PORT`

Hint: you can check host ip by running **mikikube ip**

If you are running local Kubernetes installation that supports localhost, just type

`curl [http://localhost:$NODE_PORT](http://localhost:$NODE_PORT`)`

6. Expose your service on the internet using ngrok. Ngrok will generate for us http and https addresses where we will be able to access our service.

If you are running Kubernetes in minikube:

`ngrok http [http://{minikube](http://{minikube) ip}:$NODE_PORT`

If you are running local Kubernetes installation that supports localhost, just type

`ngrok http [http://localhost:$NODE_PORT](http://localhost:$NODE_PORT`)`

This will open ngrok session showing generated addresses:

![](https://cdn-images-1.medium.com/max/2854/1*M6TsBA-AE-uHSS59t2gN6Q.png)

Go ahead and follow the “Web Interface” address to see ngrok’s dashboard: [http://127.0.0.1:4040](http://127.0.0.1:4040) and explore the interface. Click on one of the auto-generated links and you should see nginx welcome page!

### Conclusion

We have seen how easy it is to expose Kubernetes service using ngrok. No need to deploy to any online cluster, just use local Kubernetes setup that you know works and be able to share with anyone the results of your work.

This is of course intended only for testing/demo purposes and is not suitable for running production grade workloads.
