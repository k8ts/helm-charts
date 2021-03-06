# `@helm-charts/stable-redis-ha`

Highly available Redis cluster with multiple sentinels and standbys.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | stable   |
| Chart Name          | redis-ha |
| Chart Version       | 2.1.2    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  server:
    requests:
      memory: 200Mi
      cpu: 100m
    limits:
      memory: 700Mi
  sentinel:
    requests:
      memory: 200Mi
      cpu: 100m
    limits:
      memory: 200Mi

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []

## Redis image version
redis_image: quay.io/smile/redis:4.0.8r0
## replicas number for each component
replicas:
  servers: 3
  sentinels: 3
servers:
  serviceType: ClusterIP # [ClusterIP|LoadBalancer]
  annotations: {}

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:

## Configures redis with AUTH (requirepass & masterauth conf params)
auth: false
## Redis password
## Defaults to a random 10-character alphanumeric string if not set and auth is true
## ref: https://github.com/kubernetes/charts/blob/master/stable/redis-ha/templates/redis-auth-secret.yaml
##
## redisPassword:
```

</details>

---

# Redis

[Redis](http://redis.io/) is an advanced key-value cache and store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets, sorted sets, bitmaps and hyperloglogs.

## TL;DR;

```bash
$ helm install stable/redis-ha
```

By default this chart install one master pod containing redis master container and sentinel container, 2 sentinels and 1 redis slave.

## Introduction

This chart bootstraps a [Redis](https://github.com/bitnami/bitnami-docker-redis) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart

```bash
$ helm install stable/redis-ha
```

The command deploys Redis on the Kubernetes cluster in the default configuration. By default this chart install one master pod containing redis master container and sentinel container, 2 sentinels and 1 redis slave. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the deployment:

```bash
$ helm delete <chart-name>
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Appliance mode

This chart can be used to launch Redis in a black box appliance mode that you can think of like a managed service. To run as an appliance, change the service type for the master and slave LBs to enable local access from within the K8S cluster.

To launch in VPC-only appliance mode, set appliance.serviceType to "LoadBalancer". If using appliance mode in Google Cloud, set appliance.annotations to:
`cloud.google.com/load-balancer-type:Internal`

```bash
$ helm install \
  --set="servers.annotations.cloud\.google\.com/load-balancer-type=Internal,servers.serviceType=LoadBalancer" \
    stable/redis-ha
```

## Configuration

The following table lists the configurable parameters of the Redis chart and their default values.

| Parameter               | Description                                                                                                                 | Default                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `redis_image`           | Redis image                                                                                                                 | `quay.io/smile/redis:4.0.6r2` |
| `resources.master`      | CPU/Memory for master nodes resource requests/limits                                                                        | Memory: `200Mi`, CPU: `100m`  |
| `resources.slave`       | CPU/Memory for slave nodes resource requests/limits                                                                         | Memory: `200Mi`, CPU: `100m`  |
| `resources.sentinel`    | CPU/Memory for sentinel node resource requests/limits                                                                       | Memory: `200Mi`, CPU: `100m`  |
| `replicas.servers`      | Number of redis master/slave pods                                                                                           | 3                             |
| `replicas.sentinels`    | Number of sentinel pods                                                                                                     | 3                             |
| `nodeSelector`          | Node labels for pod assignment                                                                                              | {}                            |
| `tolerations`           | Toleration labels for pod assignment                                                                                        | []                            |
| `servers.serviceType`   | Set to "LoadBalancer" to enable access from the VPC                                                                         | ClusterIP                     |
| `servers.annotations`   | See Appliance mode                                                                                                          | ``                            |
| `rbac.create`           | whether RBAC resources should be created                                                                                    | true                          |
| `serviceAccount.create` | whether a new service account name that the agent will use should be created.                                               | true                          |
| `serviceAccount.name`   | service account to be used. If not set and serviceAccount.create is `true` a name is generated using the fullname template. | ``                            |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install \
  --set redis_image=quay.io/smile/redis:4.0.6r2 \
    stable/redis-ha
```

The above command sets the Redis server within `default` namespace.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install -f values.yaml stable/redis-ha
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Internals

The customized Redis server image determines whether the pod that executes it will be a Redis Sentinel,
Master, or Slave and launches the appropriate service. This Helm chart signals Sentinel status with
environment variables. If not set, the newly launched pod will query K8S for an active master. If none
exists, it uses a deterministic means of sensing whether it should launch as master then writes "master"
or "slave" to the label called redis-role as appropriate. It's this label that determines which LB a pod
can be seen through.

The redis-role=master pod is the key for the cluster to get started. Sentinels will wait for it to appear
in the LB before they finish launching. All other pods wait for the Sentinels to ID the master. Running
Pods also set the labels podIP and runID. runID is the first few characters of the unique run_id value
generated by each Redis server.

During normal operation, there should be only one redis-role=master pod. If it fails, the Sentinels
will nominate a new master and change all the redis-role values appropriately.

To see the pod roles, run the following:

```bash
$ kubectl get pods -L redis-role
```
