# `@helm-charts/bitnami-rabbitmq`

Open source message broker software that implements the Advanced Message Queuing Protocol (AMQP)

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | bitnami  |
| Chart Name          | rabbitmq |
| Chart Version       | 1.1.6    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami RabbitMQ image version
## ref: https://hub.docker.com/r/bitnami/rabbitmq/tags/
##
image:
  registry: docker.io
  repository: bitnami/rabbitmq
  tag: 3.7.6

  ## set to true if you would like to see extra information on logs
  ## it turns BASH and NAMI debugging in minideb
  ## ref:  https://github.com/bitnami/minideb-extras/#turn-on-bash-debugging
  debug: false

  ## Specify a imagePullPolicy
  ## Defaults to 'Always' if image tag is 'latest', else set to 'IfNotPresent'
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  pullPolicy: IfNotPresent
  ## Optionally specify an array of imagePullSecrets.
  ## Secrets must be manually created in the namespace.
  ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
  ##
  # pullSecrets:
  #   - myRegistrKeySecretName

## does your cluster have rbac enabled? assume yes by default
rbacEnabled: true

## section of specific values for rabbitmq
rabbitmq:
  ## RabbitMQ application username
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  username: user

  ## RabbitMQ application password
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # password:

  ## Erlang cookie to determine whether different nodes are allowed to communicate with each other
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq#environment-variables
  ##
  # erlangCookie:

  ## Node port
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq#environment-variables
  ##
  nodePort: 5672

  ## Node name to cluster with. e.g.: `clusternode@hostname`
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq#environment-variables
  ##
  # rabbitmqClusterNodeName:

  ## RabbitMQ Manager port
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq#environment-variables
  ##
  managerPort: 15672

  ## RabbitMQ Disk free limit
  ## ref: https://github.com/bitnami/bitnami-docker-rabbitmq#environment-variables
  ## ref: https://www.rabbitmq.com/disk-alarms.html
  ##
  diskFreeLimit: '"6GiB"'

  ## Plugins to enable
  plugins: |-
    [rabbitmq_management, rabbitmq_peer_discovery_k8s].

  ## Configution file content
  configuration: |-
    ## Clustering
    cluster_formation.peer_discovery_backend  = rabbit_peer_discovery_k8s
    cluster_formation.k8s.host = kubernetes.default.svc.cluster.local
    cluster_formation.k8s.address_type = ip
    cluster_formation.node_cleanup.interval = 10
    cluster_formation.node_cleanup.only_log_warning = true
    cluster_partition_handling = autoheal
    ## queue master locator
    queue_master_locator=min-masters
    ## enable guest user
    loopback_users.guest = false

## Kubernetes service type
serviceType: ClusterIP

persistence:
  ## this enables PVC templates that will create one per pod
  enabled: false

  ## rabbitmq data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce

  # If you change this value, you might have to adjust `rabbitmq.diskFreeLimit` as well.
  size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources: {}

## Replica count, set to 1 to provide a default available cluster
replicas: 1

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []
affinity: {}

## annotations for rabbitmq pods
podAnnotations: {}

## Configure the ingress resource that allows you to access the
## Wordpress installation. Set up the URL
## ref: http://kubernetes.io/docs/user-guide/ingress/
##
ingress:
  ## Set to true to enable ingress record generation
  enabled: false

  ## The list of hostnames to be covered with this ingress record.
  ## Most likely this will be just one host, but in the event more hosts are needed, this is an array
  ## hostName: foo.bar.com

  ## Set this to true in order to enable TLS on the ingress record
  ## A side effect of this will be that the backend wordpress service will be connected at port 443
  tls: false

  ## If TLS is set to true, you must declare what secret will store the key/certificate for TLS
  tlsSecret: myTlsSecret

  ## Ingress annotations done as key:value pairs
  ## If you're using kube-lego, you will want to add:
  ## kubernetes.io/tls-acme: true
  ##
  ## For a full list of possible ingress annotations, please see
  ## ref: https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md
  ##
  ## If tls is set to true, annotation ingress.kubernetes.io/secure-backends: "true" will automatically be set
  annotations:
  #  kubernetes.io/ingress.class: nginx
  #  kubernetes.io/tls-acme: true

## The following settings are to configure the frequency of the lifeness and readiness probes
livenessProbe:
  enabled: true
  initialDelaySeconds: 120
  timeoutSeconds: 5
  failureThreshold: 6

readinessProbe:
  enabled: true
  initialDelaySeconds: 10
  timeoutSeconds: 3
  periodSeconds: 5
```

</details>

---

# RabbitMQ

[RabbitMQ](https://www.rabbitmq.com/) is an open source message broker software that implements the Advanced Message Queuing Protocol (AMQP).

## TL;DR;

```bash
$ helm install stable/rabbitmq
```

## Introduction

This chart bootstraps a [RabbitMQ](https://github.com/bitnami/bitnami-docker-rabbitmq) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/rabbitmq
```

The command deploys RabbitMQ on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the RabbitMQ chart and their default values.

| Parameter                            | Description                                      | Default                                                 |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------------- |
| `image.registry`                     | Rabbitmq Image registry                          | `docker.io`                                             |
| `image.repository`                   | Rabbitmq Image name                              | `bitnami/rabbitmq`                                      |
| `image.tag`                          | Rabbitmq Image tag                               | `{VERSION}`                                             |
| `image.pullPolicy`                   | Image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                  | Specify docker-ragistry secret names as an array | `nil`                                                   |
| `image.debug`                        | Specify if debug values should be set            | `false`                                                 |
| `rbacEnabled`                        | Specify if rbac is enabled in your cluster       | `true`                                                  |
| `rabbitmq.username`                  | RabbitMQ application username                    | `user`                                                  |
| `rabbitmq.password`                  | RabbitMQ application password                    | _random 10 character long alphanumeric string_          |
| `rabbitmq.erlangCookie`              | Erlang cookie                                    | _random 32 character long alphanumeric string_          |
| `rabbitmq.nodePort`                  | Node port                                        | `5672`                                                  |
| `rabbitmq.managerPort`               | RabbitMQ Manager port                            | `15672`                                                 |
| `rabbitmq.diskFreeLimit`             | Disk free limit                                  | `"6GiB"`                                                |
| `rabbitmq.plugins`                   | configuration file for plugins to enable         | `[rabbitmq_management,rabbitmq_peer_discovery_k8s].`    |
| `rabbitmq.configuration`             | rabbitmq.conf content                            | see values.yaml                                         |
| `serviceType`                        | Kubernetes Service type                          | `ClusterIP`                                             |
| `persistence.enabled`                | Use a PVC to persist data                        | `true`                                                  |
| `persistence.storageClass`           | Storage class of backing PVC                     | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`             | Use volume as ReadOnly or ReadWrite              | `ReadWriteOnce`                                         |
| `persistence.size`                   | Size of data volume                              | `8Gi`                                                   |
| `resources`                          | resource needs and limits to apply to the pod    | {}                                                      |
| `nodeSelector`                       | Node labels for pod assignment                   | {}                                                      |
| `affinity`                           | Affinity settings for pod assignment             | {}                                                      |
| `tolerations`                        | Toleration labels for pod assignment             | []                                                      |
| `ingress.enabled`                    | enable ingress for management console            | `false`                                                 |
| `ingress.tls`                        | enable ingress with tls                          | `false`                                                 |
| `ingress.tlsSecret`                  | tls type secret to be used                       | `myTlsSecret`                                           |
| `ingress.annotations`                | ingress annotations as an array                  | []                                                      |
| `livenessProbe.enabled`              | would you like a livessProbed to be enabled      | `true`                                                  |
| `livenessProbe.initialDelaySeconds`  | number of seconds                                | 120                                                     |
| `livenessProbe.timeoutSeconds`       | number of seconds                                | 5                                                       |
| `livenessProbe.failureThreshold`     | number of failures                               | 6                                                       |
| `readinessProbe.enabled`             | would you like a readinessProbe to be enabled    | `true`                                                  |
| `readinessProbe.initialDelaySeconds` | number of seconds                                | 10                                                      |
| `readinessProbe.timeoutSeconds`      | number of seconds                                | 3                                                       |
| `readinessProbe.periodSeconds`       | number of seconds                                | 5                                                       |

The above parameters map to the env variables defined in [bitnami/rabbitmq](http://github.com/bitnami/bitnami-docker-rabbitmq). For more information please refer to the [bitnami/rabbitmq](http://github.com/bitnami/bitnami-docker-rabbitmq) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set rabbitmq.username=admin,rabbitmq.password=secretpassword,rabbitmq.erlangCookie=secretcookie \
    stable/rabbitmq
```

The above command sets the RabbitMQ admin username and password to `admin` and `secretpassword` respectively. Additionally the secure erlang cookie is set to `secretcookie`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/rabbitmq
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Production configuration

A standard configuration is provided by default that will run on most development environments. To operate this chart in a production environment, we recommend you use the alternative file values-production.yaml provided in this repository.

```bash
$ helm install --name my-release -f values-production.yaml stable/rabbitmq
```

## Persistence

The [Bitnami RabbitMQ](https://github.com/bitnami/bitnami-docker-rabbitmq) image stores the RabbitMQ data and configurations at the `/opt/bitnami/rabbitmq/var/lib/rabbitmq/` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. By default, the volume is created using dynamic volume provisioning. An existing PersistentVolumeClaim can also be defined.

### Existing PersistentVolumeClaims

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME rabbitmq
```
