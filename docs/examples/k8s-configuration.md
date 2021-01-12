# Kubernetes Configuration: configMaps, secrets, volumes <!-- {docsify-ignore-all} -->

> [!NOTE]
> Visit Kubernetes documentation if you need a refresher about [Configuration](https://kubernetes.io/docs/concepts/configuration/)
>
> Basic definitions are provided on diagrams below

## How does it work?

Kubernetes natively supports 2 resources geared towards storing configuration consumed by pods. Both configuration types required data to be represented in a *key:value* pair format.

- *Config Maps*: use to store non-confidential data
- *Secrets*: use to store confidential data (tokens, SSH keys, passwords, certificates, etc)

> [!ATTENTION]
> Config maps are not suited for storing large quantities of data. Please use external storage for this purpose. As a side-note, *etcd*, key-value store where Kubernetes stores all its state can only hold resources up to 1MN in size.
>
> Secrets in Kubernetes are actually not **encrypted**, but rather **base64 encoded**, so best for storing critical sensitive information, recommendation is to use key vaults such as [Hashicorp Vault](https://learn.hashicorp.com/vault) with Helm sidecar or native offerings from public cloud providers, like [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/).

![Kubernetes Configuration Components](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/Piotr1215/dca-prep-kit/master/diagrams/k8s-config-components.puml&fmt=png)
