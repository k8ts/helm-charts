# `@helm-charts/incubator-kubeless`

Kubeless is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | kubeless  |
| Chart Version       | 0.2.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubeless.
## RBAC configuration
rbac:
  create: false

## Controller configuration
controller:
  deployment:
    replicaCount: 1
    image:
      repository: bitnami/kubeless-controller
      tag: v0.3.1
      pullPolicy: IfNotPresent
  ## Kubeless Controller resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    # requests:
    #   cpu: 500m
    #   memory: 512Mi

## UI configuration
ui:
  enabled: false
  deployment:
    replicaCount: 1
    ui:
      image:
        repository: bitnami/kubeless-ui
        tag: v0.1.0
        pullPolicy: IfNotPresent
    proxy:
      image:
        repository: kelseyhightower/kubectl
        tag: 1.4.0
        pullPolicy: IfNotPresent

  service:
    name: ui-port
    type: NodePort
    externalPort: 3000

## Zookeeper configuration
zookeeper:
  statefulSet:
    replicaCount: 1
    image:
      repository: bitnami/zookeeper
      tag: 3.4.10-r6
      pullPolicy: IfNotPresent
  ## Zookeeper server resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    # requests:
    #   cpu: 500m
    #   memory: 512Mi

## Kafka configuration
kafka:
  statefulSet:
    replicaCount: 1
    image:
      repository: bitnami/kafka
      tag: 1.0.0-r2
      pullPolicy: IfNotPresent
  ## Kafka server resource requests and limits
  ## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # limits:
    #   cpu: 500m
    #   memory: 512Mi
    # requests:
    #   cpu: 500m
    #   memory: 512Mi
```

</details>

---

# Kubeless

[Kubeless](http://kubeless.io/) is a Kubernetes-native serverless framework. It runs on top of your Kubernetes cluster and allows you to deploy small unit of code without having to build container images. With kubeless you can build advanced applications that tie together services using functions.

## TL;DR;

```bash
$ helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
$ helm install --namespace kubeless incubator/kubeless
```

## Introduction

This chart bootstraps a [Kubeless](https://github.com/kubeless/kubeless) and a [Kubeless-UI](https://github.com/kubeless/kubeless-ui) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release --namespace kubeless incubator/kubeless
```

> **NOTE**
>
> While the chart supports deploying Kubeless to any namespace, Kubeless expects to be deployed under a namespace named `kubeless`.

The command deploys Kubernetes on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Kubeless chart and their default values.

| Parameter                                | Description                   | Default                       |
| ---------------------------------------- | ----------------------------- | ----------------------------- |
| `controller.deployment.image.repository` | Controller image              | `bitnami/kubeless-controller` |
| `controller.deployment.image.pullPolicy` | Controller image pull policy  | `IfNotPresent`                |
| `controller.deployment.replicaCount`     | Number of replicas            | `1`                           |
| `ui.enabled`                             | Kubeless UI component         | `false`                       |
| `ui.deployment.ui.image.repository`      | Kubeless UI image             | `bitnami/kubeless-ui`         |
| `ui.deployment.ui.image.pullPolicy`      | Kubeless UI image pull policy | `IfNotPresent`                |
| `ui.deployment.proxy.image.repository`   | Proxy image                   | `kelseyhightower/kubectl`     |
| `ui.deployment.proxy.image.pullPolicy`   | Proxy image pull policy       | `IfNotPresent`                |
| `ui.deployment.replicaCount`             | Number of replicas            | `1`                           |
| `ui.service.name`                        | Service name                  | `ui-port`                     |
| `ui.service.type`                        | Kubernetes service name       | `NodePort`                    |
| `ui.service.externalPort`                | Service external port         | `3000`                        |
| `zookeeper.statefulSet.image.repository` | Zookeeper image               | `bitnami/zookeeper`           |
| `zookeeper.statefulSet.image.pullPolicy` | Zookeeper image pull policy   | `IfNotPresent`                |
| `zookeeper.statefulSet.replicaCount`     | Number of replicas            | `1`                           |
| `kafka.statefulSet.image.repository`     | Kafka image                   | `bitnami/kafka`               |
| `kafka.statefulSet.image.pullPolicy`     | Kafka image pull policy       | `IfNotPresent`                |
| `kafka.statefulSet.replicaCount`         | Number of replicas            | `1`                           |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release --set service.name=ui-service,service,externalPort=4000 --namespace kubeless incubator/kubeless
```

The above command sets the Kubeless service name to `ui-service` and the external port to `4000`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml --namespace kubeless incubator/kubeless
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Kubeless UI

The [Kubeless UI](https://github.com/kubeless/kubeless-ui) component is disabled by default. In order to enable it set the ui.enabled property to true. For example,

```bash
$ helm install --name my-release --set ui.enabled=true --namespace kubeless incubator/kubeless
```

## Persistence

The Kafka and Zookeeper images stores the data and configurations at the `/bitnami/kafka` and `/bitnami/zookeeper` path of the container.
