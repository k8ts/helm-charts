# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is an object-relational database management system (ORDBMS) with an emphasis on extensibility and on standards-compliance.

## TL;DR;

```console
$ helm install bitnami/postgresql
```

## Introduction

This chart bootstraps a [PostgreSQL](https://github.com/bitnami/bitnami-docker-postgresql) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release bitnami/postgresql
```

The command deploys PostgreSQL on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the PostgreSQL chart and their default values.

|         Parameter          |                Description                |                            Default                        |
|----------------------------|-------------------------------------------|---------------------------------------------------------- |
| `image.registry`           | PostgreSQL image registry                 | `docker.io`                                               |
| `image.repository`         | PostgreSQL Image name                     | `bitnami/postgresql`                                      |
| `image.tag`                | PostgreSQL Image tag                      | `{VERSION}`                                               |
| `image.pullPolicy`         | PostgreSQL image pull policy              | `Always`                                                  |
| `image.pullSecrets`        | Specify image pull secrets                | `nil` (does not add image pull secrets to deployed pods)  |
| `image.debug`              | Specify if debug values should be set     | `false`                                                   |
| `replication.enabled`      | Would you like to enable replication      | `false`                                                   |
| `replication.user`         | Replication user                          | `repl_user`                                               |
| `replication.password`     | Replication user password                 | `repl_password`                                           |
| `replication.slaveReplicas`| Number of slaves replicas                 | `1`                                                       |
| `postgresqlUsername`       | PostgreSQL admin user                     | `postgres`                                                |
| `postgresqlPassword`       | PostgreSQL admin password                 | _random 10 character alphanumeric string_                 |
| `postgresqlDatabase`       | PostgreSQL database                       | `nil`                                                     |
| `service.type`             | Kubernetes Service type                   | `ClusterIP`                                               |
| `service.port`             | PostgreSQL port                           | `5432`                                                    |
| `persistence.enabled`      | Enable persistence using PVC              | `true`                                                    |
| `persistence.storageClass` | PVC Storage Class for PostgreSQL volume   | `nil`                                                     |
| `persistence.accessMode`   | PVC Access Mode for PostgreSQL volume     | `ReadWriteOnce`                                           |
| `persistence.size`         | PVC Storage Request for PostgreSQL volume | `8Gi`                                                     |
| `persistence.annotations`  | Annotations for the PVC                   | `{}`                                                      |
| `nodeSelector`             | Node labels for pod assignment            | `{}`                                                      |
| `tolerations`              | Toleration labels for pod assignment      | `[]`                                                      |
| `resources`                | CPU/Memory resource requests/limits       | Memory: `256Mi`, CPU: `250m`                              |
| `securityContext.enabled`            | Enable security context                                                                      | `true`                            |
| `securityContext.fsGroup`            | Group ID for the container                                                                   | `1001`                            |
| `securityContext.runAsUser`          | User ID for the container                                                                    | `1001`              | `livenessProbe.enabled`               | would you like a livessProbed to be enabled                                                   |  `true`                                                   |
| `livenessProbe.initialDelaySeconds`   | Delay before liveness probe is initiated                                                      |  30                                                       |
| `livenessProbe.periodSeconds`         | How often to perform the probe                                                                |  10                                                       |
| `livenessProbe.timeoutSeconds`        | When the probe times out                                                                      |  5                                                        |
| `livenessProbe.failureThreshold`      | Minimum consecutive failures for the probe to be considered failed after having succeeded.    |  6                                                        |
| `livenessProbe.successThreshold`      | Minimum consecutive successes for the probe to be considered successful after having failed   |  1                                                        |
| `readinessProbe.enabled`              | would you like a readinessProbe to be enabled                                                 |  `true`                                                   |
| `readinessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated                                                      |  5                                                        |
| `readinessProbe.periodSeconds`        | How often to perform the probe                                                                |  10                                                       |
| `readinessProbe.timeoutSeconds`       | When the probe times out                                                                      |  5                                                        |
| `readinessProbe.failureThreshold`     | Minimum consecutive failures for the probe to be considered failed after having succeeded.    |  6                                                        |
| `readinessProbe.successThreshold`     | Minimum consecutive successes for the probe to be considered successful after having failed   |  1                                                        |
| `metrics.enabled`                     | Start a prometheus exporter                                                                   | `false`                                                   |
| `metrics.service.type`                | Kubernetes Service type                                                                       |  `ClusterIP`                                              |
| `metrics.service.annotatios`          | Additional annotations for metrics exporter pod                                               |  `{}`                                                     |
| `metrics.service.loadBalancerIP`      | loadBalancerIP if redis metrics service type is `LoadBalancer`                                | `nil`                                                     |
| `metrics.image.registry`              | PostgreSQL image registry                                                                     | `docker.io`                                               |
| `metrics.image.repository`            | PostgreSQL Image name                                                                         | `wrouesnel/postgres_exporter`                             |
| `metrics.image.tag`                   | PostgreSQL Image tag                                                                          | `{VERSION}`                                               |
| `metrics.image.pullPolicy`            | PostgreSQL image pull policy                                                                  | `IfNotPresent`                                            |
| `metrics.image.pullSecrets`           | Specify image pull secrets                                                                    | `nil` (does not add image pull secrets to deployed pods)  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set postgresqlPassword=secretpassword,postgresqlDatabase=my-database \
    bitnami/postgresql
```

The above command sets the PostgreSQL `postgres` account password to `secretpassword`. Additionally it creates a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml bitnami/postgresql
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### postgresql.conf file as configMap

Instead of using specific variables for the PostgreSQL configuration, this helm chart also supports to customize the whole configuration file.

Add your custom file to "files/postgresql.conf" in your working directory. This file will be mounted as configMap to the containers and it will be used for configuring the PostgreSQL server.

## Initialize a fresh instance

The [Bitnami PostgreSQL](https://github.com/bitnami/bitnami-docker-postgresql) image allows you to use your custom scripts to initialize a fresh instance. In order to execute the scripts, they must be located inside the chart folder `files/docker-entrypoint-initdb.d` so they can be consumed as a ConfigMap.

The allowed extensions are `.sh`, `.sql` and `.sql.gz`.

## Production and horizontal scaling

The following repo contains the recommended production settings for PostgreSQL server in an alternative [values file](values-production.yaml). Please read carefully the comments in the values-production.yaml file to set up your environment

To horizontally scale this chart, first download the [values-production.yaml](values-production.yaml) file to your local folder, then:

```console
$ helm install --name my-release -f ./values-production.yaml bitnami/postgresql
$ kubectl scale statefulset my-postgresql-slave --replicas=3
```

## Persistence

The [Bitnami PostgreSQL](https://github.com/bitnami/bitnami-docker-postgresql) image stores the PostgreSQL data and configurations at the `/bitnami/postgresql` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is postgresql:

```console
$ kubectl delete statefulset postgresql --cascade=false
$ kubectl delete statefulset postgresql-slave --cascade=false
```
