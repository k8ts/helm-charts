# `@helm-charts/stable-etcd-operator`

CoreOS etcd-operator Helm chart for Kubernetes

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | etcd-operator |
| Chart Version       | 0.1.0         |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for etcd-operator.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: quay.io/coreos/etcd-operator
  tag: latest
  pullPolicy: IfNotPresent
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi
## etcd-cluster specific values
cluster:
  enabled: false
  name: etcd-cluster
  size: 3
  version: v3.1.0-rc.0
  backup:
    enabled: false
    ## Cloud specific PV provisioner
    ## Supports either kubernetes.io/gce-pd or kubernetes.io/aws-ebs
    provisioner: kubernetes.io/gce-pd
    config:
      ## short snapshot interval for testing, do not use this in production!
      snapshotIntervalInSecond: 30
      maxSnapshot: 5
      volumeSizeInMB: 512
      storageType: PersistentVolume
```

</details>

---

# CoreOS etcd-operator

[etcd-operator](https://coreos.com/blog/introducing-the-etcd-operator.html) Simplify etcd cluster
configuration and management.

**DISCLAIMER:** While this chart has been well-tested, the etcd-operator is still currently in alpha.
Current project status is available [here](https://github.com/coreos/etcd-operator)

## Introduction

This chart bootstraps an etcd-operator and allows the deployment of etcd-cluster(s).

## Official Documentation

Official project documentation found [here](https://github.com/coreos/etcd-operator)

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- **Suggested:** PV provisioner support in the underlying infrastructure to support backups

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install stable/etcd-operator --name my-release
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components EXCEPT the persistent volume.

## Updating

Updating the TPR resource will not result in the cluster being update until `kubectl apply` for
TPRs is fixed see [kubernetes/issues/29542](https://github.com/kubernetes/kubernetes/issues/29542)
Work around options are documented [here](https://github.com/coreos/etcd-operator#resize-an-etcd-cluster)

## Configuration

The following tables lists the configurable parameters of the etcd-operator chart and their default values.

| Parameter                                        | Description                                                      | Default                                        |
| ------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------- |
| `replicaCount`                                   | Number of etcd-operator replicas to create (only 1 is supported) | `1`                                            |
| `image.repository`                               | etcd-operator container image                                    | `quay.io/coreos/etcd-operator`                 |
| `image.tag`                                      | etcd-operator container image tag                                | `latest`                                       |
| `image.pullPolicy`                               | etcd-operator container image pull policy                        | `IfNotPresent`                                 |
| `resources.limits.cpu`                           | CPU limit per etcd-operator pod                                  | `100m`                                         |
| `resources.limits.memory`                        | Memory limit per etcd-operator pod                               | `128Mi`                                        |
| `resources.requests.cpu`                         | CPU request per etcd-operator pod                                | `100m`                                         |
| `resources.requests.memory`                      | Memory request per etcd-operator pod                             | `128Mi`                                        |
| `cluster.enabled`                                | Whether to enable provisioning of and etcd-cluster               | `true`                                         |
| `cluster.name`                                   | etcd cluster name                                                | `etcd-cluster`                                 |
| `cluster.version`                                | etcd cluster version                                             | `v3.1.0-rc.0`                                  |
| `cluster.size`                                   | etcd cluster size                                                | `3`                                            |
| `cluster.backup.enabled`                         | Whether to create PV for cluster backups                         | `true`                                         |
| `cluster.backup.provisioner`                     | Which PV provisioner to use                                      | `kubernetes.io/gce-pd` (kubernetes.io/aws-ebs) |
| `cluster.backup.config.snapshotIntervalInSecond` | etcd snapshot interval in seconds                                | `30`                                           |
| `cluster.backup.config.maxSnapshot`              | maximum number of snapshots to keep                              | `5`                                            |
| `cluster.backup.config.volumeSizeInMB`           | size of backup PV                                                | `512MB`                                        |
| `cluster.backup.config.storageType`              | Type to storage to provision                                     | `PersistentVolume`                             |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
$ helm install --name my-release --set cluster.version=v3.1.0-alpha.1  stable/etcd-operator
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while
installing the chart. For example:

```bash
$ helm install --name my-release --values values.yaml stable/etcd-operator
```
