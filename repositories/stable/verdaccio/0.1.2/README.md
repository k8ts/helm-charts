# `@helm-charts/stable-verdaccio`

A lightweight private npm proxy registry (sinopia fork)

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | verdaccio |
| Chart Version       | 0.1.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: verdaccio/verdaccio
  tag: 2.7.1
  pullPolicy: IfNotPresent

service:
  annotations: {}
  clusterIP: ''

  ## List of IP addresses at which the service is available
  ## Ref: https://kubernetes.io/docs/user-guide/services/#external-ips
  ##
  externalIPs: []

  loadBalancerIP: ''
  loadBalancerSourceRanges: []
  port: 4873
  type: ClusterIP

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/user-guide/node-selection/
##
nodeSelector: {}

podAnnotations: {}
replicaCount: 1

resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 512Mi
  # requests:
  #  cpu: 100m
  #  memory: 512Mi

customConfigMap: false

persistence:
  enabled: true
  ## A manually managed Persistent Volume and Claim
  ## Requires Persistence.Enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## Verdaccio data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"

  accessMode: ReadWriteOnce
  size: 8Gi
  volumes:
  #  - name: nothing
  #    emptyDir: {}
  mounts:
#  - mountPath: /var/nothing
#    name: nothing
#    readOnly: true
```

</details>

---

# Verdaccio

[Verdaccio](http://www.verdaccio.org) is a lightweight private
[NPM](https://www.npmjs.com) proxy registry.

## TL;DR;

```
$ helm install stable/verdaccio
```

## Introduction

This chart bootstraps a [Verdaccio](https://github.com/verdaccio/verdaccio)
deployment on a [Kubernetes](http://kubernetes.io) cluster using the
[Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```
$ helm install --name my-release stable/verdaccio
```

The command deploys Verdaccio on the Kubernetes cluster in the default
configuration. The [configuration](#configuration) section lists the parameters
that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and
deletes the release.

## Configuration

The following tables lists the configurable parameters of the Verdaccio chart
and their default values.

| Parameter                          | Description                                                     | Default                                                  |
| ---------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| `customConfigMap`                  | Use a custom ConfigMap                                          | `false`                                                  |
| `image.pullPolicy`                 | Image pull policy                                               | `Always` if `image` tag is `latest`, else `IfNotPresent` |
| `image.repository`                 | Verdaccio container image repository                            | `verdaccio/verdaccio`                                    |
| `image.tag`                        | Verdaccio container image tag                                   | `2.7.1`                                                  |
| `nodeSelector`                     | Node labels for pod assignment                                  | `{}`                                                     |
| `persistence.accessMode`           | PVC Access Mode for Verdaccio volume                            | `ReadWriteOnce`                                          |
| `persistence.enabled`              | Enable persistence using PVC                                    | `true`                                                   |
| `persistence.mounts`               | Additional mounts                                               | `nil`                                                    |
| `persistence.size`                 | PVC Storage Request for Verdaccio volume                        | `8Gi`                                                    |
| `persistence.storageClass`         | PVC Storage Class for Verdaccio volume                          | `nil`                                                    |
| `persistence.volumes`              | Additional volumes                                              | `nil`                                                    |
| `podAnnotations`                   | Annotations to add to each pod                                  | `{}`                                                     |
| `replicaCount`                     | Desired number of pods                                          | `1`                                                      |
| `resources`                        | CPU/Memory resource requests/limits                             | `{}`                                                     |
| `resources`                        | pod resource requests & limits                                  | `{}`                                                     |
| `service.annotations`              | Annotations to add to service                                   | none                                                     |
| `service.clusterIP`                | IP address to assign to service                                 | `""`                                                     |
| `service.externalIPs`              | Service external IP addresses                                   | `[]`                                                     |
| `service.loadBalancerIP`           | IP address to assign to load balancer (if supported)            | `""`                                                     |
| `service.loadBalancerSourceRanges` | List of IP CIDRs allowed access to load balancer (if supported) | `[]`                                                     |
| `service.port`                     | Service port to expose                                          | `4873`                                                   |
| `service.type`                     | Type of service to create                                       | `ClusterIP`                                              |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```
$ helm install --name my-release \
  --set service.type=LoadBalancer \
    stable/verdaccio
```

The above command sets the a service type LoadBalancer.

Alternatively, a YAML file that specifies the values for the above parameters
can be provided while installing the chart. For example,

```
$ helm install --name my-release -f values.yaml stable/verdaccio
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Custom ConfigMap

When creating a new chart with this chart as a dependency, CustomConfigMap can
be used to override the default config.yaml provided. It also allows for
providing additional configuration files that will be copied into
`/verdaccio/conf`. In the parent chart's values.yaml, set the value to true and
provide the file `templates/config.yaml` for your use case.

### Persistence

The Verdaccio image stores persistence under `/verdaccio/storage` path of the
container. A dynamically managed Persistent Volume Claim is used to keep the
data across deployments, by default. This is known to work in GCE, AWS, and
minikube.
Alternatively, a previously configured Persistent Volume Claim can be used.

It is possible to mount several volumes using `Persistence.volumes` and
`Persistence.mounts` parameters.

#### Existing PersistentVolumeClaim

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --name my-release \
    --set persistence.existingClaim=PVC_NAME \
    stable/verdaccio
```
