# `@helm-charts/kanister-kanister-postgresql`

PostgreSQL w/ Kanister support based on stable/postgresql

| Field               | Value               |
| ------------------- | ------------------- |
| Repository Name     | kanister            |
| Chart Name          | kanister-postgresql |
| Chart Version       | 0.15.0              |
| NPM Package Version | 0.1.0               |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## postgres image repository
image: 'kanisterio/postgres'
## postgres image version
## ref: https://hub.docker.com/r/library/postgres/tags/
##
imageTag: 'v0.3.0'

## Specify a imagePullPolicy
## 'Always' if imageTag is 'latest', else set to 'IfNotPresent'
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
# imagePullPolicy:

## Specify imagePullSecrets
## ref: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
##
# imagePullSecrets: myregistrykey

## Create a database user
## Default: postgres
# postgresUser:
## Default: random 10 character string
# postgresPassword:

## Create a database
## Default: the postgres user
# postgresDatabase:

## Specify initdb arguments, e.g. --data-checksums
## ref: https://github.com/docker-library/docs/blob/master/postgres/content.md#postgres_initdb_args
## ref: https://www.postgresql.org/docs/current/static/app-initdb.html
# postgresInitdbArgs:

## Use an alternate scheduler, e.g. "stork".
## ref: https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/
##
# schedulerName:

## Specify runtime config parameters as a dict, using camelCase, e.g.
## {"sharedBuffers": "500MB"}
## ref: https://www.postgresql.org/docs/current/static/runtime-config.html
postgresConfig:
  wal_level: archive
  archive_mode: on
  archive_command: 'envdir "${PGDATA}/env" wal-e wal-push %p'
  archive_timeout: 60

## Persist data to a persitent volume
persistence:
  enabled: true

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## database data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi
  subPath: 'postgresql-db'
  mountPath: /var/lib/postgresql/data/pgdata

  # annotations: {}

metrics:
  enabled: false
  image: wrouesnel/postgres_exporter
  imageTag: v0.1.1
  imagePullPolicy: IfNotPresent
  resources:
    requests:
      memory: 256Mi
      cpu: 100m
    ## Define additional custom metrics
    ## ref: https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file
    # customMetrics:
    #   pg_database:
    #     query: "SELECT d.datname AS name, CASE WHEN pg_catalog.has_database_privilege(d.datname, 'CONNECT') THEN pg_catalog.pg_database_size(d.datname) ELSE 0 END AS size FROM pg_catalog.pg_database d where datname not in ('template0', 'template1', 'postgres')"
    #     metrics:
    #       - name:
    #           usage: "LABEL"
    #           description: "Name of the database"
    #       - size_bytes:
    #           usage: "GAUGE"
    #           description: "Size of the database in bytes"

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 256Mi
    cpu: 100m

service:
  type: ClusterIP
  port: 5432
  externalIPs: []
  ## Manually set NodePort value
  ## Requires service.type: NodePort
  # nodePort:

networkPolicy:
  ## Enable creation of NetworkPolicy resources.
  ##
  enabled: false

  ## The Policy model to apply. When set to false, only pods with the correct
  ## client label will have network access to the port PostgreSQL is listening
  ## on. When true, PostgreSQL will accept connections from any source
  ## (with the correct destination port).
  ##
  allowExternal: true

## Node labels and tolerations for pod assignment
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
## ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#taints-and-tolerations-beta-feature
nodeSelector: {}
tolerations: []
affinity: {}

# Configure profile for psql, the profile CR is installed in the release namespace
profile:
  create: false
  defaultProfile: false
  defaultProfileName: default-profile
  profileName:

# Configure Kanister - the blueprint CR is installed in the controller namespace
kanister:
  controller_namespace: kasten-io
```

</details>

---

# PostgreSQL

[PostgreSQL](https://postgresql.org) is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness.

[Kanister](https://kansiter.io) is a framework that enables application-level data management on Kubernetes.

## Introduction

This chart bootstraps a [PostgreSQL](https://github.com/docker-library/postgres) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.7+ with Beta APIs enabled or 1.9+ without Beta APIs
- [Helm](https://helm.sh)
- PV provisioner support in the underlying infrastructure (Only when persisting data)
- AWS S3 (or S3 compatible) keys and bucket

## Quick Start

### Install the Kanister controller

Follow the instructions [here](https://docs.kanister.io/helm.html) to install Kanister.
The commands below assume the controller is installed in the `kanister` namespace.

### Install Kanister-enabled PostgresSQL

```bash
# Add Kanister Charts
helm repo add kanister http://charts.kanister.io

# Install PostgresSQL and configure its Kanister Blueprint.
helm install kanister/kanister-postgresql --name postgres-test --namespace postgres-test \
     --set profile.create='true' \
     --set profile.profileName='postgres-test-profile' \
     --set profile.s3.accessKey=${AWS_ACCESS_KEY_ID} \
     --set profile.s3.secretKey=${AWS_SECRET_ACCESS_KEY} \
     --set profile.s3.bucket='<BUCKET_NAME e.g kanister_bucket>' \
     --set profile.s3.region='<BUCKET_REGION e.g. us-west-2>' \
     --set kanister.controller_namespace=kanister
```

### Create a Base Backup

Create an ActionSet to trigger a backup. This will also setup log shipping that enables restoring
to point-in-time restore

```bash
# Create a base backup by creating an ActionSet
cat << EOF | kubectl create -f -
apiVersion: cr.kanister.io/v1alpha1
kind: ActionSet
metadata:
    name: pg-base-backup
    namespace: kanister
spec:
    actions:
    - name: backup
      blueprint: postgres-test-kanister-postgresql-blueprint
      object:
        kind: Deployment
        name: postgres-test-kanister-postgresql
        namespace: postgres-test
      profile:
        apiVersion: v1alpha1
        kind: Profile
        name: postgres-test-profile
        namespace: postgres-test

EOF
```

### Describe ActionSet status

```bash
kubectl describe actionset pg-base-backup --namespace kanister
```

### Restore using the base backup

To restore Postgres using the base backup - use the [kanctl](https://docs.kanister.io/tooling.html#kanctl) tool which can be downloaded from the releases [page](https://github.com/kanisterio/kanister/releases)

```bash
kanctl create actionset --action restore --from pg-base-backup --namespace kanister
```

# Chart Details

## Installing the Chart

For basic installation, you can install using the provided Helm chart that will install an instance of
Postgres (a deployment with a persistent volume) as well as a Kanister blueprint to be used with it.

Prior to install you will need to have the Kanister Helm repository added to your local setup.

```bash
$ helm repo add kanister http://charts.kanister.io
```

Then install the sample Postgres application in its own namespace.

```bash
$ helm install kanister/kanister-postgresql --name postgres-test --namespace postgres-test \
     --set profile.create='true' \
     --set profile.profileName='postgres-test-profile' \
     --set profile.s3.accessKey=${AWS_ACCESS_KEY_ID} \
     --set profile.s3.secretKey=${AWS_SECRET_ACCESS_KEY} \
     --set profile.s3.bucket='<BUCKET_NAME e.g kanister_bucket>' \
     --set profile.s3.region='<BUCKET_REGION e.g. us-west-2>' \
     --set kanister.controller_namespace=kanister
```

The settings in the command above represent the minimum recommended set for your installation.
The command deploys Postgres on the Kubernetes cluster in the default configuration. The
[configuration](#configuration) section lists the parameters that can be configured during
installation.

The command will also configure a location where artifacts resulting from Kanister
data operations such as backup should go. This is stored as a `profiles.cr.kanister.io`
_CustomResource (CR)_ which is then referenced in Kanister ActionSets. Every ActionSet
requires a Profile reference whether one created as part of the application install or
not. Support for creating an ActionSet as part of install is simply for convenience.
This CR can be shared between Kanister-enabled application instances so one option is to
only create as part of the first instance.

If not creating a Profile CR, it is possible to use an even simpler command.

```bash
$ helm install kanister/kanister-postgresql -n my-release --namespace postgres-test
```

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.
To completely remove the release include the `--purge` flag.

## Configuration

The following table lists the configurable PostgreSQL Kanister blueprint and Profile CR parameters and their
default values. The Profile CR parameters are passed to the profile sub-chart.

| Parameter                       | Description                                                                                                                                                                                                                                    | Default  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `profile.create`                | (Optional) Specify if a Profile CR should be created as part of install.                                                                                                                                                                       | `false`  |
| `profile.defaultProfile`        | (Optional) Set to `true` to create a profile with name `default-profile`                                                                                                                                                                       | `false`  |
| `profile.profileName`           | (Required if not creating a default Profile) Name for the profile that is created                                                                                                                                                              | `nil`    |
| `profile.s3.accessKey`          | (Required if creating profile) API Key for an s3 compatible object store.                                                                                                                                                                      | `nil`    |
| `profile.s3.secretKey`          | (Required if creating profile) Corresponding secret for `accessKey`.                                                                                                                                                                           | `nil`    |
| `profile.s3.bucket`             | (Required if creating profile) A bucket that will be used to store Kanister artifacts. <br><br>The bucket must already exist and the account with the above API key and secret needs to have sufficient permissions to list, get, put, delete. | `nil`    |
| `profile.s3.region`             | (Optional if creating profile) Region to be used for the bucket.                                                                                                                                                                               | `nil`    |
| `profile.s3.endpoint`           | (Optional if creating profile) The URL for an s3 compatible object store provider. Can be omitted if provider is AWS. Required for any other provider.                                                                                         | `nil`    |
| `profile.verifySSL`             | (Optional if creating profile) Set to `false` to disable SSL verification on the s3 endpoint.                                                                                                                                                  | `true`   |
| `kanister.controller_namespace` | (Optional) Specify the namespace where the Kanister controller is running.                                                                                                                                                                     | kanister |

The following table lists the configurable parameters of the PostgreSQL chart and their default values.

| Parameter                     | Description                                      | Default                                                 |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `image`                       | `postgres` image repository                      | `postgres`                                              |
| `imageTag`                    | `postgres` image tag                             | `9.6.2`                                                 |
| `imagePullPolicy`             | Image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `imagePullSecrets`            | Image pull secrets                               | `nil`                                                   |
| `postgresUser`                | Username of new user to create.                  | `postgres`                                              |
| `postgresPassword`            | Password for the new user.                       | random 10 characters                                    |
| `postgresDatabase`            | Name for new database to create.                 | `postgres`                                              |
| `postgresInitdbArgs`          | Initdb Arguments                                 | `nil`                                                   |
| `schedulerName`               | Name of an alternate scheduler                   | `nil`                                                   |
| `postgresConfig`              | Runtime Config Parameters                        | `nil`                                                   |
| `persistence.enabled`         | Use a PVC to persist data                        | `true`                                                  |
| `persistence.existingClaim`   | Provide an existing PersistentVolumeClaim        | `nil`                                                   |
| `persistence.storageClass`    | Storage class of backing PVC                     | `nil` (uses alpha storage class annotation)             |
| `persistence.accessMode`      | Use volume as ReadOnly or ReadWrite              | `ReadWriteOnce`                                         |
| `persistence.annotations`     | Persistent Volume annotations                    | `{}`                                                    |
| `persistence.size`            | Size of data volume                              | `8Gi`                                                   |
| `persistence.subPath`         | Subdirectory of the volume to mount at           | `postgresql-db`                                         |
| `persistence.mountPath`       | Mount path of data volume                        | `/var/lib/postgresql/data/pgdata`                       |
| `resources`                   | CPU/Memory resource requests/limits              | Memory: `256Mi`, CPU: `100m`                            |
| `metrics.enabled`             | Start a side-car prometheus exporter             | `false`                                                 |
| `metrics.image`               | Exporter image                                   | `wrouesnel/postgres_exporter`                           |
| `metrics.imageTag`            | Exporter image                                   | `v0.1.1`                                                |
| `metrics.imagePullPolicy`     | Exporter image pull policy                       | `IfNotPresent`                                          |
| `metrics.resources`           | Exporter resource requests/limit                 | Memory: `256Mi`, CPU: `100m`                            |
| `metrics.customMetrics`       | Additional custom metrics                        | `nil`                                                   |
| `service.externalIPs`         | External IPs to listen on                        | `[]`                                                    |
| `service.port`                | TCP port                                         | `5432`                                                  |
| `service.type`                | k8s service type exposing ports, e.g. `NodePort` | `ClusterIP`                                             |
| `service.nodePort`            | NodePort value if service.type is `NodePort`     | `nil`                                                   |
| `networkPolicy.enabled`       | Enable NetworkPolicy                             | `false`                                                 |
| `networkPolicy.allowExternal` | Don't require client label for connections       | `true`                                                  |
| `nodeSelector`                | Node labels for pod assignment                   | {}                                                      |
| `affinity`                    | Affinity settings for pod assignment             | {}                                                      |
| `tolerations`                 | Toleration labels for pod assignment             | []                                                      |

The above parameters map to the env variables defined in [postgres](http://github.com/docker-library/postgres). For more information please refer to the [postgres](http://github.com/docker-library/postgres) image documentation.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set postgresUser=my-user,postgresPassword=secretpassword,postgresDatabase=my-database \
    kanister/kanister-postgresql
```

The above command creates a PostgreSQL user named `my-user` with password `secretpassword`. Additionally it creates a database named `my-database`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml kanister/kanister-postgresql
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [postgres](https://github.com/docker-library/postgres) image stores the PostgreSQL data and configurations at the `/var/lib/postgresql/data/pgdata` path of the container.

The chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning. If the PersistentVolumeClaim should not be managed by the chart, define `persistence.existingClaim`.

### Existing PersistentVolumeClaims

1. Create the PersistentVolume
1. Create the PersistentVolumeClaim
1. Install the chart

```bash
$ helm install --set persistence.existingClaim=PVC_NAME postgresql
```

The volume defaults to mount at a subdirectory of the volume instead of the volume root to avoid the volume's hidden directories from interfering with `initdb`. If you are upgrading this chart from before version `0.4.0`, set `persistence.subPath` to `""`.

## Metrics

The chart optionally can start a metrics exporter for [prometheus](https://prometheus.io). The metrics endpoint (port 9187) is not exposed and it is expected that the metrics are collected from inside the k8s cluster using something similar as the described in the [example Prometheus scrape configuration](https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus-kubernetes.yml).

The exporter allows to create custom metrics from additional SQL queries. See the Chart's `values.yaml` for an example and consult the [exporters documentation](https://github.com/wrouesnel/postgres_exporter#adding-new-metrics-via-a-config-file) for more details.

## NetworkPolicy

To enable network policy for PostgreSQL,
install [a networking plugin that implements the Kubernetes
NetworkPolicy spec](https://kubernetes.io/docs/tasks/administer-cluster/declare-network-policy#before-you-begin),
and set `networkPolicy.enabled` to `true`.

For Kubernetes v1.5 & v1.6, you must also turn on NetworkPolicy by setting
the DefaultDeny namespace annotation. Note: this will enforce policy for _all_ pods in the namespace:

    kubectl annotate namespace default "net.beta.kubernetes.io/network-policy={\"ingress\":{\"isolation\":\"DefaultDeny\"}}"

With NetworkPolicy enabled, traffic will be limited to just port 5432.

For more precise policy, set `networkPolicy.allowExternal=false`. This will
only allow pods with the generated client label to connect to PostgreSQL.
This label will be displayed in the output of a successful install.
