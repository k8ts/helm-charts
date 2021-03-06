# `@helm-charts/stable-sensu`

Sensu monitoring framework backed by the Redis transport

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | sensu  |
| Chart Version       | 0.1.2  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Docker image name
image: 'sstarcher/sensu'
# Docker image tag
imageTag: '0.28'

# Image pull policy for the container
pullPolicy: 'IfNotPresent'

# How many sensu containers to spawn
replicaCount: 1

# How to publish the service http://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
serviceType: ClusterIP

# Service port to expose Sensu on
httpPort: 4567

# If set to true, the service will be exposed via the Deis Router if setup https://github.com/deis/router
deis:
  routable: false
  domains: sensu

# CPU and Memory limit and request for Sensu Server
server:
  resources:
    requests:
      cpu: 100m
      memory: 100Mi
# CPU and Memory limit and request for Sensu Api
api:
  resources:
    requests:
      cpu: 50m
      memory: 100Mi

# Redis configuration
REDIS_PORT: 6379
REDIS_DB: 0
REDIS_AUTO_RECONNECT: true
REDIS_RECONNECT_ON_ERROR: true

# Redis chart configuration
redis:
  persistence:
    enabled: false
```

</details>

---

# Sensu

[Sensu](https://sensuapp.org/) is monitoring that doesn't suck.

## TL;DR;

```console
$ helm install stable/sensu
```

## Introduction

This chart bootstraps a [Sensu](https://github.com/sstarcher/docker-sensu) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```console
$ git clone https://github.com/kubernetes/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/sensu
```

_Replace the `x.x.x` placeholder with the chart release version._

The command deploys Sensu on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Sensu chart and their default values.

| Parameter                          | Description                                                     | Default           |
| ---------------------------------- | --------------------------------------------------------------- | ----------------- |
| `image`                            | Sensu image                                                     | `sstarcher/sensu` |
| `imageTag`                         | Sensu version                                                   | `0.26`            |
| `imagePullPolicy`                  | Image pull policy                                               | `IfNotPresent`    |
| `replicaCount`                     | Number of sensu replicas                                        | `1`               |
| `httpPort`                         | Service port for kubernetes                                     | `80`              |
| `deis.routable`                    | Enables routing through the Deis router                         | `false`           |
| `deis.domain`                      | The service name for deis to route                              | `sensu`           |
| `server.resources.requests.cpu`    | CPU request for sensu server                                    | `100m`            |
| `server.resources.requests.memory` | Memory request for sensu server                                 | `100Mi`           |
| `server.resources.limits.cpu`      | CPU limit for sensu server                                      | ``                |
| `server.resources.limits.memory`   | Memory limit for sensu server                                   | ``                |
| `api.resources.requests.cpu`       | CPU request for api server                                      | `50m`             |
| `api.resources.requests.memory`    | Memory request for api server                                   | `100Mi`           |
| `api.resources.limits.cpu`         | CPU limit for api server                                        | ``                |
| `api.resources.limits.memory`      | Memory limit for api server                                     | ``                |
| `REDIS_PORT`                       | Default port for redis                                          | `6379`            |
| `REDIS_DB`                         | The Redis instance DB to use/select                             | `0`               |
| `REDIS_AUTO_RECONNECT`             | Reconnect to Redis in the event of a connection failure         | `true`            |
| `REDIS_RECONNECT_ON_ERROR`         | Reconnect to Redis in the event of a Redis error, e.g. READONLY | `true`            |

Configuration reference for sensu [Sensu/Docs](https://sensuapp.org/docs/latest/reference/)

```console
$ helm install --name my-release \
  --set imageTag=0.26.5 \
    stable/sensu
```

The above command sets the Sensu version to `0.26.5`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/sensu
```

> **Tip**: You can use the default [values.yaml](values.yaml)
