---
title: "Portable Kubernetes Management With Kubectl in Docker Container"
date: 2020-01-25T20:11:05+02:00
tags: ['kubernetes', 'docker', 'CLI']
---

![Image by [Julius Silver](https://pixabay.com/users/Julius_Silver-4371822/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3021820) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3021820)](https://cdn-images-1.medium.com/max/3840/1*FpbN0Vh5rTCtJnj-cBAs1g.jpeg)

## Portable Kubernetes management with kubectl in Docker container

Saying that Kubernetes is becoming mainstream would be an understatement. In fact, it has influenced how modern distributed systems are designed and operated. By abstracting away infrastructure concerns we are able to leverage Kubernetes as a “platform to build platforms” or “cloud operating system” with lots of obvious benefits, but also development and operational challenges.

<!--truncate-->

A whole ecosystem around Kubernetes is blooming and nowadays there are plenty of amazing tools and projects from the open source community, some of them under CNCF umbrella and some designed by enthusiasts or companies of various sizes and influence. Suffice to say, there is a lot going on and it’s harder to keep pace with this ever-changing landscape.

Today we’re focusing on an area that is specific and also very practical: namely Kubernetes management with kubectl. [Kubectl](https://kubectl.docs.kubernetes.io/)is a command line tool (CLI) used to manage Kubernetes clusters. A well-known debate within the Kubernetes community is: “how is kubectl even pronounced?”. There are plenty of opinions and [this page](http://www.howtopronounce.cc/kubectl) provides a sample of the most common ones, so feel free to choose or even create your own.

When we’re not busy figuring out world hunger or kubectl pronunciation, we often spend a lot of time to hand-craft our environments where kubectl is running, we create aliases, add auto-completion, install plugins and other diagnostic and cluster management tools. What if we were able to carry around this diagnostic/management environment with us and use the same tools, scripts, aliases and shortcuts with every cluster?

For me the motivation for creating image with kubectl was the fact that I had to work with a new Kubernetes cluster from within Windows Server VM running on Azure without [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-on-server)(Windows Subsystem for Lunix) and I didn’t want to use cygwin or git-bash. Being used to my environment running on Ubuntu, recreating in withing an image was a quick solution to this challenge.

In the second part of this blog I explain how to use customized and personalized kubectl from within a Docker container. You can use my existing kubectl image or clone my [GitHub repository](https://github.com/Piotr1215/kubectl-container) and change it to your liking. After all, Kubernetes is designed to manage containers so it’s only fair to manage Kubernetes from a container!

## Create and use your own image with kubectl

This and next chapter are not intended to be Docker tutorials, but rather practical instructions. There are plenty of great resources about Docker if you are interested. Good starting point is [https://www.docker.com/](https://www.docker.com/).

If you would like to try creating your own customized kubectl container, here are the steps to follow. You can also clone/fork my GitHub repository [https://github.com/Piotr1215/kubectl-container](https://github.com/Piotr1215/kubectl-container).

You can also use my image from Docker Hub directly, if you would like to test how it works: [https://hub.docker.com/repository/docker/piotrzan/kubectl-comp](https://hub.docker.com/repository/docker/piotrzan/kubectl-comp).

### Create Dockerfile

Create a new git repository and add Dockerfile to it. Here is example file based on my repository.

You can add all into one Dockerfile, I choose to split provisioning part into a bootstrap.sh. Provisioning script is copied to image directory and ran as one of the RUN steps. Another common practice is to use provisioning scripts as Dockerfile ENTRYPOINT.

### Build and publish image

Once all the programs and configuration are ready, build the image and tag it with your docker user name so you can publish it.

    **docker build --rm -f “Dockerfile” -t dockeruser/image-name “.”**

Publish the image to your docker repository.

    **docker publish dockeruser/image-name**

### Pull and run your image on any environment

When you need to work with a new cluster, just run your image. Notice that we are naming the container to easier manage it and setting *network to “host”* which will enable kubectl to access host network and the clusters through it.

    **docker run --network=host --name=kubectl-host --rm -it piotrzan/kubectl-comp**

## Diving Deeper

Keep reading if you would like to learn more and understand what is included in my image as well as design choices I made.

### What is included in the image

* **kubectl**v 1.17.2 with bash/zsh completion

* **zsh-autosuggestions** for zsh shell

* **k9s** great cluster observability and management terminal based tool

* popular tools: **curl, wget, git**

* useful .bashrc/.zshrc aliases

# Instead of typing kubectl all the time, abbreviate it to just “k”

    **alias k=kubectl**

# Check what is running on the cluster

    **alias kdump=’kubectl get all — all-namespaces’**

# Display helpful info for creating k8s resources imperatively

    **alias krun=’k run -h | grep “# “ -A2'**

# Quickly spin up busybox pod for diagnostic purposes

    **alias kdiag=’kubectl run -it — rm debug — image=busybox — restart=Never — sh’**

### How to use it

[My repository](https://github.com/Piotr1215/kubectl-container) contains all scripts and commands described below, so you can just use it instead of copying from here.

Easiest way to use the image is to run it with following command. You can choose to run either bash shell

    **docker run --network=host --name=kubectl-host --rm -it piotrzan/kubectl-comp**

or if you like zsh shell, there is another image

    **docker run --network=host --name=kubectl-host --rm -it piotrzan/kubectl-comp:zsh**

This will spin up a new container named *kubectl-host* and enable you to use kubectl, but it will not contain information from about your clusters. In order to do this you need to make sure that .kube/config file is available in the container. Easiest way to do it is to run the container in detached mode, copy over the file and attach back to the container, like so:

    *# Run container with pass-through to local network*

    **docker run -d — network=host — name=kubectl-host — rm -it piotrzan/kubectl-comp**

    *# Generate raw config from kubectl on localhost and copy the config to the container*

    **kubectl config view — raw > config**

    **docker cp config kubectl-host:./root/.kube**

    **docker attach kubectl-host**

Alternatively you can use docker-compose to spin up the container and attach a volume

### Extending the image

Let’s say you want to add your own aliases or install additional software, etc. Docker enables easy image extension by using docker commit command.

 1. Run the container

 2. Configure and customize

 3. Open another shell session and run:

    docker commit CONTAINER_ID new-contianer-tag

After this when you run docker images you will see your new image listed as well with changes that you’ve made. You can publish it to Docker Hub or just use it as it with your own modifications.

### Conclusion

Kubernetes and containerized workloads offer great flexibility and open up new possibilities that were previously very hard to accomplish. I hope that with the example of creating a dedicated, fully portable and customized image of kubectl, I have inspired you to try and creating a Docker image with your favorite command line tool.

We have ended up creating a customized and personalized fully portable kubectl CLI experience. By any means is my image the only one, there are plenty of great ideas. One image worth mentioning is Bitnami curated image for kubectl, you can find it here: [https://hub.docker.com/r/bitnami/kubectl](https://hub.docker.com/r/bitnami/kubectl)

As always there is much more to be said, we haven’t talked about building automated CI/CD pipeline, making the image smaller, implementing best practices around security and much more. Some of those topics are complex enough to have their own blogs.

Thank your for reading and see you in next blog!

