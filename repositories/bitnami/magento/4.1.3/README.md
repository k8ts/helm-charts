# `@helm-charts/bitnami-magento`

A feature-rich flexible e-commerce solution. It includes transaction options, multi-store functionality, loyalty programs, product categorization and shopper filtering, promotion rules, and more.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | magento |
| Chart Version       | 4.1.3   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Global Docker image registry
## Please, note that this will override the image registry for all the images, including dependencies, configured to use the global value
##
# global:
#   imageRegistry:

## Bitnami Magento image version
## ref: https://hub.docker.com/r/bitnami/magento/tags/
##
image:
  registry: docker.io
  repository: bitnami/magento
  tag: 2.3.0
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

## Magento host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
# magentoHost:

## loadBalancerIP for the Magento Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# magentoLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
magentoUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
# magentoPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
magentoEmail: user@example.com

## Prefix for Magento Admin
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
magentoAdminUri: admin

## First Name
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
magentoFirstName: FirstName

## Last Name
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
magentoLastName: LastName

## Mode
## ref: https://github.com/bitnami/bitnami-docker-magento#configuration
##
magentoMode: developer

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-magento#environment-variables
allowEmptyPassword: 'yes'

##
## External database configuration
##
externalDatabase:
  ## Database host
  host:

  ## Database host
  port: 3306

  ## Database user
  user: bn_magento

  ## Database password
  password:

  ## Database name
  database: bitnami_magento

##
## MariaDB chart configuration
##
## https://github.com/helm/charts/blob/master/stable/mariadb/values.yaml
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true
  ## Disable MariaDB replication
  replication:
    enabled: false

  ## Create a database and a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  db:
    name: bitnami_magento
    user: bn_magento
    ## If the password is not specified, mariadb will generates a random password
    ##
    # password:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # rootUser:
  #   password:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  master:
    persistence:
      enabled: true
      ## mariadb data Persistent Volume Storage Class
      ## If defined, storageClassName: <storageClass>
      ## If set to "-", storageClassName: "", which disables dynamic provisioning
      ## If undefined (the default) or set to null, no storageClassName spec is
      ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
      ##   GKE, AWS & OpenStack)
      ##
      # storageClass: "-"
      accessMode: ReadWriteOnce
      size: 8Gi

## Kubernetes configuration
## For minikube, set this to NodePort, elsewhere use LoadBalancer
##
service:
  type: LoadBalancer
  # HTTP Port
  port: 80
  # HTTPS Port
  httpsPort: 443
  ##
  ## loadBalancerIP:
  ## nodePorts:
  ##   http: <to set explicitly, choose port between 30000-32767>
  ##   https: <to set explicitly, choose port between 30000-32767>
  nodePorts:
    http: ''
    https: ''
  ## Enable client source IP preservation
  ## ref http://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip
  ##
  externalTrafficPolicy: Cluster

## Configure liveness and readiness probes
## ref: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)
##
livenessProbe:
  enabled: true
  initialDelaySeconds: 1000
  periodSeconds: 10
  timeoutSeconds: 5
  successThreshold: 1
  failureThreshold: 6
readinessProbe:
  enabled: true
  initialDelaySeconds: 30
  periodSeconds: 5
  timeoutSeconds: 3
  successThreshold: 1
  failureThreshold: 3

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  apache:
    ## apache data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi
  magento:
    ## magento data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
##
resources:
  requests:
    memory: 512Mi
    cpu: 300m

## Pod annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
##
podAnnotations: {}

## Prometheus Exporter / Metrics
##
metrics:
  enabled: false
  image:
    registry: docker.io
    repository: lusotycoon/apache-exporter
    tag: v0.5.0
    pullPolicy: IfNotPresent
    ## Optionally specify an array of imagePullSecrets.
    ## Secrets must be manually created in the namespace.
    ## ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
    ##
    # pullSecrets:
    #   - myRegistrKeySecretName
    ## Metrics exporter pod Annotation and Labels
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/port: '9117'
  ## Metrics exporter resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  # resources: {}
```

</details>

---

# Magento

[Magento](https://magento.org/) is a feature-rich flexible e-commerce solution. It includes transaction options, multi-store functionality, loyalty programs, product categorization and shopper filtering, promotion rules, and more.

## TL;DR;

```console
$ helm install stable/magento
```

## Introduction

This chart bootstraps a [Magento](https://github.com/bitnami/bitnami-docker-magento) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment as a database for the Magento application.

Bitnami charts can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/magento
```

The command deploys Magento on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the Magento chart and their default values.

| Parameter                            | Description                                      | Default                                                      |
| ------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| `global.imageRegistry`               | Global Docker image registry                     | `nil`                                                        |
| `image.registry`                     | Magento image registry                           | `docker.io`                                                  |
| `image.repository`                   | Magento Image name                               | `bitnami/magento`                                            |
| `image.tag`                          | Magento Image tag                                | `{VERSION}`                                                  |
| `image.pullPolicy`                   | Image pull policy                                | `Always` if `imageTag` is `latest`, else `IfNotPresent`      |
| `image.pullSecrets`                  | Specify image pull secrets                       | `nil`                                                        |
| `magentoHost`                        | Magento host to create application URLs          | `nil`                                                        |
| `magentoLoadBalancerIP`              | `loadBalancerIP` for the magento Service         | `nil`                                                        |
| `magentoUsername`                    | User of the application                          | `user`                                                       |
| `magentoPassword`                    | Application password                             | _random 10 character long alphanumeric string_               |
| `magentoEmail`                       | Admin email                                      | `user@example.com`                                           |
| `magentoFirstName`                   | Magento Admin First Name                         | `FirstName`                                                  |
| `magentoLastName`                    | Magento Admin Last Name                          | `LastName`                                                   |
| `magentoMode`                        | Magento mode                                     | `developer`                                                  |
| `magentoAdminUri`                    | Magento prefix to access Magento Admin           | `admin`                                                      |
| `allowEmptyPassword`                 | Allow DB blank passwords                         | `yes`                                                        |
| `externalDatabase.host`              | Host of the external database                    | `nil`                                                        |
| `externalDatabase.port`              | Port of the external database                    | `3306`                                                       |
| `externalDatabase.user`              | Existing username in the external db             | `bn_magento`                                                 |
| `externalDatabase.password`          | Password for the above username                  | `nil`                                                        |
| `externalDatabase.database`          | Name of the existing database                    | `bitnami_magento`                                            |
| `mariadb.enabled`                    | Whether to use the MariaDB chart                 | `true`                                                       |
| `mariadb.rootUser.password`          | MariaDB admin password                           | `nil`                                                        |
| `mariadb.db.name`                    | Database name to create                          | `bitnami_magento`                                            |
| `mariadb.db.user`                    | Database user to create                          | `bn_magento`                                                 |
| `mariadb.db.password`                | Password for the database                        | _random 10 character long alphanumeric string_               |
| `service.type`                       | Kubernetes Service type                          | `LoadBalancer`                                               |
| `service.port`                       | Service HTTP port                                | `80`                                                         |
| `service.httpsPort`                  | Service HTTPS port                               | `443`                                                        |
| `nodePorts.https`                    | Kubernetes https node port                       | `""`                                                         |
| `service.externalTrafficPolicy`      | Enable client source IP preservation             | `Cluster`                                                    |
| `service.nodePorts.http`             | Kubernetes http node port                        | `""`                                                         |
| `service.nodePorts.https`            | Kubernetes https node port                       | `""`                                                         |
| `service.loadBalancerIP`             | `loadBalancerIP` for the Magento Service         | `nil`                                                        |
| `livenessProbe.enabled`              | Turn on and off liveness probe                   | `true`                                                       |
| `livenessProbe.initialDelaySeconds`  | Delay before liveness probe is initiated         | `1000`                                                       |
| `livenessProbe.periodSeconds`        | How often to perform the probe                   | `10`                                                         |
| `livenessProbe.timeoutSeconds`       | When the probe times out                         | `5`                                                          |
| `livenessProbe.successThreshold`     | Minimum consecutive successes for the probe      | `1`                                                          |
| `livenessProbe.failureThreshold`     | Minimum consecutive failures for the probe       | `6`                                                          |
| `readinessProbe.enabled`             | Turn on and off readiness probe                  | `true`                                                       |
| `readinessProbe.initialDelaySeconds` | Delay before readiness probe is initiated        | `30`                                                         |
| `readinessProbe.periodSeconds`       | How often to perform the probe                   | `5`                                                          |
| `readinessProbe.timeoutSeconds`      | When the probe times out                         | `3`                                                          |
| `readinessProbe.successThreshold`    | Minimum consecutive successes for the probe      | `1`                                                          |
| `readinessProbe.failureThreshold`    | Minimum consecutive failures for the probe       | `3`                                                          |
| `persistence.enabled`                | Enable persistence using PVC                     | `true`                                                       |
| `persistence.apache.storageClass`    | PVC Storage Class for Apache volume              | `nil` (uses alpha storage annotation)                        |
| `persistence.apache.accessMode`      | PVC Access Mode for Apache volume                | `ReadWriteOnce`                                              |
| `persistence.apache.size`            | PVC Storage Request for Apache volume            | `1Gi`                                                        |
| `persistence.magento.storageClass`   | PVC Storage Class for Magento volume             | `nil` (uses alpha storage annotation)                        |
| `persistence.magento.accessMode`     | PVC Access Mode for Magento volume               | `ReadWriteOnce`                                              |
| `persistence.magento.size`           | PVC Storage Request for Magento volume           | `8Gi`                                                        |
| `resources`                          | CPU/Memory resource requests/limits              | Memory: `512Mi`, CPU: `300m`                                 |
| `podAnnotations`                     | Pod annotations                                  | `{}`                                                         |
| `metrics.enabled`                    | Start a side-car prometheus exporter             | `false`                                                      |
| `metrics.image.registry`             | Apache exporter image registry                   | `docker.io`                                                  |
| `metrics.image.repository`           | Apache exporter image name                       | `lusotycoon/apache-exporter`                                 |
| `metrics.image.tag`                  | Apache exporter image tag                        | `v0.5.0`                                                     |
| `metrics.image.pullPolicy`           | Image pull policy                                | `IfNotPresent`                                               |
| `metrics.image.pullSecrets`          | Specify docker-registry secret names as an array | `nil`                                                        |
| `metrics.podAnnotations`             | Additional annotations for Metrics exporter pod  | `{prometheus.io/scrape: "true", prometheus.io/port: "9117"}` |
| `metrics.resources`                  | Exporter resource requests/limit                 | {}                                                           |

The above parameters map to the env variables defined in [bitnami/magento](http://github.com/bitnami/bitnami-docker-magento). For more information please refer to the [bitnami/magento](http://github.com/bitnami/bitnami-docker-magento) image documentation.

> **Note**:
>
> For Magento to function correctly, you should specify the `magentoHost` parameter to specify the FQDN (recommended) or the public IP address of the Magento service.
>
> Optionally, you can specify the `magentoLoadBalancerIP` parameter to assign a reserved IP address to the Magento service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create magento-public-ip
> ```
>
> The reserved IP address can be associated to the Magento service by specifying it as the value of the `magentoLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set magentoUsername=admin,magentoPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/magento
```

The above command sets the Magento administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/magento
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Magento](https://github.com/bitnami/bitnami-docker-magento) image stores the Magento data and configurations at the `/bitnami/magento` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. There is a [known issue](https://github.com/kubernetes/kubernetes/issues/39178) in Kubernetes Clusters with EBS in different availability zones. Ensure your cluster is configured properly to create Volumes in the same availability zone where the nodes are running. Kuberentes 1.12 solved this issue with the [Volume Binding Mode](https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode).

## Upgrading

### To 3.0.0

Backwards compatibility is not guaranteed unless you modify the labels used on the chart's deployments.
Use the workaround below to upgrade from versions previous to 3.0.0. The following example assumes that the release name is magento:

```console
$ kubectl patch deployment magento-magento --type=json -p='[{"op": "remove", "path": "/spec/selector/matchLabels/chart"}]'
$ kubectl delete statefulset magento-mariadb --cascade=false
```
