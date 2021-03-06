# `@helm-charts/stable-spartakus`

A Spartakus Helm chart for Kubernetes. Spartakus aims to collect information about Kubernetes clusters.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | spartakus |
| Chart Version       | 1.0.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Container image
##
image: gcr.io/google_containers/spartakus-amd64:v1.0.0

## imagePullPolicy
## Default: 'Always' if image tag is 'latest', else 'IfNotPresent'
## Ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## Resource requests and limits
## Ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  # limits:
  #   cpu: 2m
  #   memory: 8Mi
  requests:
    cpu: 2m
    memory: 8Mi
## A version 4 UUID to uniquely identify the cluster
## If not provided, Helm will generate automatically at install-time.
##
# uuid:
```

</details>

---

# Spartakus

[Spartakus](https://github.com/kubernetes-incubator/spartakus) aims to collect information about Kubernetes clusters. This information will help the Kubernetes development team to understand what people are doing with it, and to make it a better product.

## TL;DR;

```console
$ helm install stable/spartakus
```

## Introduction

This chart bootstraps a [Spartakus](https://github.com/kubernetes-incubator/spartakus) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.3+ with Beta APIs enabled

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/spartakus
```

The command deploys Spartakus on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Spartakus chart and their default values.

| Parameter                   | Description             | Default                                                  |
| --------------------------- | ----------------------- | -------------------------------------------------------- |
| `image`                     | Container image         | `gcr.io/google_containers/spartakus-amd64:{VERSION}`     |
| `imagePullPolicy`           | Image pull policy       | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `resources.requests.cpu`    | CPU resource request    | `2m`                                                     |
| `resources.requests.memory` | Memory resource request | `8Mi`                                                    |
| `uuid`                      | Unique cluster ID       | Dynamically generated using `uuidv4` template function   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set uuid=19339C6E-FD73-4787-BFD8-F710C8D8364E \
    stable/spartakus
```

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/spartakus
```

> **Tip**: You can use the default [values.yaml](values.yaml)
