# `@helm-charts/bitnami-memcached`

Chart for Memcached

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | bitnami   |
| Chart Name          | memcached |
| Chart Version       | 0.4.24    |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami Memcached image version
## ref: https://hub.docker.com/r/bitnami/memcached/tags/
##
image: bitnami/memcached:1.5.5-r1

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent

## Memcached admin user
## ref: https://github.com/bitnami/bitnami-docker-memcached#creating-the-memcached-admin-user
##
# memcachedUsername:

## Memcached admin password
## ref: https://github.com/bitnami/bitnami-docker-memcached#creating-the-memcached-admin-user
##
# memcachedPassword:

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
serviceType: ClusterIP

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 250m
```

</details>

---

# Memcached

> [Memcached](https://memcached.org/) is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.

## TL;DR;

```console
$ helm install incubator/memcached
```

## Introduction

This chart bootstraps a [Memcached](https://github.com/bitnami/bitnami-docker-memcached) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/memcached
```

The command deploys Memcached on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Memcached chart and their default values.

| Parameter           | Description                         | Default                       |
| ------------------- | ----------------------------------- | ----------------------------- |
| `image`             | Memcached image                     | `bitnami/memcached:{VERSION}` |
| `imagePullPolicy`   | Image pull policy                   | `IfNotPresent`                |
| `memcachedUsername` | Memcached admin user                | `nil`                         |
| `memcachedPassword` | Memcached admin password            | `nil`                         |
| `serviceType`       | Kubernetes Service type             | `ClusterIP`                   |
| `resources`         | CPU/Memory resource requests/limits | Memory: `256Mi`, CPU: `250m`  |

The above parameters map to the env variables defined in [bitnami/memcached](http://github.com/bitnami/bitnami-docker-memcached). For more information please refer to the [bitnami/memcached](http://github.com/bitnami/bitnami-docker-memcached) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release --set memcachedUser=user,memcachedPassword=password incubator/memcached
```

The above command sets the Memcached admin account username and password to `user` and `password` respectively.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/memcached
```

> **Tip**: You can use the default [values.yaml](values.yaml)
