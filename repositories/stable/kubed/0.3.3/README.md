# `@helm-charts/stable-kubed`

DEPRECATED Kubed by AppsCode - Kubernetes daemon

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | kubed  |
| Chart Version       | 0.3.3  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for kubed.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
kubed:
  image: appscode/kubed
  tag: 0.4.0
## Optionally specify an array of imagePullSecrets.
## Secrets must be manually created in the namespace.
## ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
##
# imagePullSecrets:
#   - name: myRegistryKeySecretName
## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent
## Installs Searchlight operator as critical addon
## https://kubernetes.io/docs/tasks/administer-cluster/guaranteed-scheduling-critical-addon-pods/
criticalAddon: false
## Log level for kubed
logLevel: 3
## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}
## Install Default RBAC roles and bindings
rbac:
  ## If true, create & use RBAC resources
  create: false
  ## Ignored if rbac.create is true
  serviceAccountName: default
```

</details>

---

**This chart is DEPRECATED and moved to https://github.com/appscode/charts**

# Kubed

[Kubed by AppsCode](https://github.com/appscode/kubed) - A Kubernetes cluster manager daemon.

## TL;DR;

```bash
$ helm install stable/kubed
```

## Introduction

This chart bootstraps a [Kubed controller](https://github.com/appscode/kubed) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install stable/kubed --name my-release
```

The command deploys Kubed operator on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release`:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Kubed chart and their default values.

| Parameter                 | Description                                                       | Default                                                  |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| `replicaCount`            | Number of kubed operator replicas to create (only 1 is supported) | `1`                                                      |
| `image`                   | container image                                                   | `appscode/kubed`                                         |
| `tag`                     | container image tag                                               | `0.4.0`                                                  |
| `imagePullSecrets`        | Specify image pull secrets                                        | `nil` (does not add image pull secrets to deployed pods) |
| `imagePullPolicy`         | Image pull policy                                                 | `IfNotPresent`                                           |
| `criticalAddon`           | If true, installs kubed operator as critical addon                | `false`                                                  |
| `logLevel`                | Log level for kubed                                               | `3`                                                      |
| `nodeSelector`            | Node labels for pod assignment                                    | `{}`                                                     |
| `rbac.create`             | install required rbac service account, roles and rolebindings     | `false`                                                  |
| `rbac.serviceAccountName` | ServiceAccount Kubed will use (ignored if rbac.create=true)       | `default`                                                |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```console
$ helm install --name my-release --set image.tag=v0.2.1 stable/kubed
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```console
$ helm install --name my-release --values values.yaml stable/kubed
```

## RBAC

By default the chart will not install the recommended RBAC roles and rolebindings.

You need to have the flag `--authorization-mode=RBAC` on the api server. See the following document for how to enable [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/).

To determine if your cluster supports RBAC, run the following command:

```console
$ kubectl api-versions | grep rbac
```

If the output contains "beta", you may install the chart with RBAC enabled (see below).

### Enable RBAC role/rolebinding creation

To enable the creation of RBAC resources (On clusters with RBAC). Do the following:

```console
$ helm install --name my-release stable/kubed --set rbac.create=true
```
