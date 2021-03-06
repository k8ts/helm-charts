# `@helm-charts/incubator-schema-registry`

Schema Registry provides a serving layer for your metadata. It provides a RESTful interface for storing and retrieving Avro schemas. It stores a versioned history of all schemas, provides multiple compatibility settings and allows evolution of schemas according to the configured compatibility setting. It provides serializers that plug into Kafka clients that handle schema storage and retrieval for Kafka messages that are sent in the Avro format.

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | incubator       |
| Chart Name          | schema-registry |
| Chart Version       | 0.3.1           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for Confluent Schema-Registry
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

## schema-registry repository
image: 'confluentinc/cp-schema-registry'
## The container tag to use
imageTag: 4.0.1
## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
imagePullPolicy: 'IfNotPresent'

## Number of Schema Registry Pods to Deploy
replicaCount: 1

## Schema Registry Settings Overrides
## Configuration Options can be found here: https://docs.confluent.io/current/schema-registry/docs/config.html
configurationOverrides:
  kafkastore.topic.replication.factor: 1

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
## Confluent has production deployment guidelines here:
## ref: https://github.com/confluentinc/schema-registry/blob/master/docs/deployment.rst
##
resources:
  {}
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

## The port on which the SchemaRegistry will be available and serving requests
servicePort: 8081

## If `Kafka.Enabled` is `false`, kafkaStore.overrideBootstrapServers must be provided for Master Election.
## You can list load balanced service endpoint, or list of all brokers (which is hard in K8s).  e.g.:
## overrideBootstrapServers: "PLAINTEXT://dozing-prawn-kafka-headless:9092"
## Charts uses Kafka Coordinator Master Election: https://docs.confluent.io/current/schema-registry/docs/design.html#kafka-coordinator-master-election
kafkaStore:
  overrideBootstrapServers: ''
  # By Default uses Release Name, but can be overridden.  Which means each release is its own group of
  # Schema Registry workers.  You can have multiple groups talking to same Kafka Cluster
  overrideGroupId: ''
  ## Additional Java arguments to pass to Kafka.
  # schemaRegistryOpts: -Dfoo=bar

# Options for connecting to SASL kafka brokers
sasl:
  configPath: '/etc/kafka-config'
  scram:
    enabled: false
    init:
      image: 'confluentinc/cp-schema-registry'
      imageTag: '4.0.0'
      imagePullPolicy: 'IfNotPresent'
    clientUser: 'kafka-client'
    zookeeperClientUser: 'zookeeper-client'
    # Passwords can be either provided here or pulled from an existing k8s secret.
    # If user wants to specify the password here:
    clientPassword: 'client-password'
    zookeeperClientPassword: 'zookeeper-client-password'
    # If user has an existing k8s secret they would like to use instead of generating them:
    # useExistingSecret:
    #   # Where to find the schema registry user secret
    #   clientPassword:
    #     secretKeyRef:
    #       name: "schema-reg-secret"
    #       key: "client-password"
    #   # Where to find the zookeeper user secret
    #   zookeeperClientPassword:
    #     secretKeyRef:
    #       name: "zookeeper-secret"
    #       key: "zokeeper-client-password"

## Kafka Settings
kafka:
  ## This is enabled only to allow installations of this chart without arguments
  enabled: true
  imageTag: 4.0.1
  configurationOverrides:
    # Needed to run with 1 Kafka Broker
    offsets.topic.replication.factor: 1
  replicas: 1

  ## Install only a single Zookeeper pod in the StatefulSet
  zookeeper:
    servers: 1
```

</details>

---

# Schema-Registry Helm Chart

This helm chart creates a [Confluent Schema-Registry server](https://github.com/confluentinc/schema-registry).

## Prerequisites

- Kubernetes 1.6
- A running Kafka Installation
- A running Zookeeper Installation

## Chart Components

This chart will do the following:

- Create a Schema-Registry deployment
- Create a Service configured to connect to the available Schema-Registry pods on the configured
  client port.

Note: Distributed Schema Registry Master Election is done via Kafka Coordinator Master Election
https://docs.confluent.io/current/schema-registry/docs/design.html#kafka-coordinator-master-election

## Installing the Chart

You can install the chart with the release name `mysr` as below.

```console
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name mysr incubator/schema-registry
```

If you do not specify a name, helm will select a name for you.

### Installed Components

You can use `kubectl get` to view all of the installed components.

```console{%raw}
$ kubectl get all -l app=schema-registry
NAME                          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deploy/mysr-schema-registry   1         1         1            1           23m

NAME                                DESIRED   CURRENT   READY     AGE
rs/mysr-schema-registry-bcb4c994c   1         1         1         23m

NAME                                      READY     STATUS    RESTARTS   AGE
po/mysr-schema-registry-bcb4c994c-qjqbj   1/1       Running   1          23m
```

1. `deploy/mysr-schema-registry` is the Deployment created by this chart.
1. `rs/mysr-schema-registry-bcb4c994c` is the ReplicaSet created by this Chart's Deployment.
1. `po/mysr-schema-registry-bcb4c994c-qjqbj` is the Pod created by the ReplicaSet under this Chart's Deployment.

## Configuration

You can specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml incubator/schema-registry
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Parameters

The following table lists the configurable parameters of the SchemaRegistry chart and their default values.

| Parameter                             | Description                                                                                                                                                                                          | Default                                                            |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `image`                               | The `SchemaRegistry` image repository                                                                                                                                                                | `confluentinc/cp-schema-registry`                                  |
| `imageTag`                            | The `SchemaRegistry` image tag                                                                                                                                                                       | `4.0.0`                                                            |
| `imagePullPolicy`                     | Image Pull Policy                                                                                                                                                                                    | `IfNotPresent`                                                     |
| `replicaCount`                        | The number of `SchemaRegistry` Pods in the Deployment                                                                                                                                                | `1`                                                                |
| `configurationOverrides`              | `SchemaRegistry` [configuration setting](https://github.com/confluentinc/schema-registry/blob/master/docs/config.rst#configuration-options) overrides in the dictionary format `setting.name: value` | `{}`                                                               |
| `kafkaOpts`                           | Additional Java arguments to pass to Kafka.                                                                                                                                                          | ``                                                                 |
| `sasl.configPath`                     | where to store config for sasl configurations                                                                                                                                                        | `/etc/kafka-config`                                                |
| `sasl.scram.enabled`                  | whether sasl-scam is enabled                                                                                                                                                                         | `false`                                                            |
| `sasl.scram.init.image`               | which image to use for initializing sasl scram                                                                                                                                                       | `confluentinc/cp-schema-registry`                                  |
| `sasl.scram.init.imageTag`            | which version/tag to use for sasl scram init                                                                                                                                                         | `4.0.0`                                                            |
| `sasl.scram.init.imagePullPolicy`     | the sasl scram init pull policy                                                                                                                                                                      | `IfNotPresent`                                                     |
| `sasl.scram.clientUser`               | the sasl scram user to use to authenticate to kafka                                                                                                                                                  | `kafka-client`                                                     |
| `sasl.scram.clientPassword`           | the sasl scram password to use to authenticate to kafka                                                                                                                                              | `kafka-password`                                                   |
| `sasl.scram.zookeeperClientUser`      | the sasl scram user to use to authenticate to zookeeper                                                                                                                                              | `zookeper-client`                                                  |
| `sasl.scram.zookeeperClientPassword`  | the sasl scram password to use to authenticate to zookeeper                                                                                                                                          | `zookeper-password`                                                |
| `resources`                           | CPU/Memory resource requests/limits                                                                                                                                                                  | `{}`                                                               |
| `servicePort`                         | The port on which the SchemaRegistry server will be exposed.                                                                                                                                         | `8081`                                                             |
| `overrideGroupId`                     | Group ID defaults to using Release Name so each release is its own Schema Registry worker group, it can be overridden                                                                                | `{- .Release.Name -}}`                                             |
| `kafkaStore.overrideBootstrapServers` | Defaults to Kafka Servers in the same release, it can be overridden in case there was a separate release for Kafka Deploy                                                                            | `{{- printf "PLAINTEXT://%s-kafka-headless:9092" .Release.Name }}` |
| `kafka.enabled`                       | If `true`, install Kafka/Zookeeper alongside the `SchemaRegistry`. This is intended for testing and argument-less helm installs of this chart only and should not be used in Production.             | `true`                                                             |
| `kafka.replicas`                      | The number of Kafka Pods to install as part of the `StatefulSet` if `kafka.Enabled` is `true`                                                                                                        | `1`                                                                |
| `kafka.zookeeper.servers`             | The number of Zookeeper Pods to install as part of the `StatefulSet` if `kafka.Enabled` is `true`                                                                                                    | `1`                                                                |
