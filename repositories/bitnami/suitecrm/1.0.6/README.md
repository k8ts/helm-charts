# `@helm-charts/bitnami-suitecrm`

SuiteCRM is a completely open source enterprise-grade Customer Relationship Management (CRM) application. SuiteCRM is a software fork of the popular customer relationship management (CRM) system SugarCRM.

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | bitnami  |
| Chart Name          | suitecrm |
| Chart Version       | 1.0.6    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami SuiteCRM image version
## ref: https://hub.docker.com/r/bitnami/suitecrm/tags/
##
image:
  registry: docker.io
  repository: bitnami/suitecrm
  tag: 7.10.6
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

## SuiteCRM host to create application URLs
## ref: https://github.com/bitnami/bitnami-docker-suitecrm#configuration
##
# suitecrmHost:

## loadBalancerIP for the SuiteCRM Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# suitecrmLoadBalancerIP:

## User of the application
## ref: https://github.com/bitnami/bitnami-docker-suitecrm#configuration
##
suitecrmUsername: user

## Application password
## Defaults to a random 10-character alphanumeric string if not set
## ref: https://github.com/bitnami/bitnami-docker-suitecrm#configuration
##
# suitecrmPassword:

## Admin email
## ref: https://github.com/bitnami/bitnami-docker-suitecrm#configuration
##
suitecrmEmail: user@example.com

## Lastname
## ref: https://github.com/bitnami/bitnami-docker-suitecrm#configuration
##
suitecrmLastName: Name

## Set to `yes` to allow the container to be started with blank passwords
## ref: https://github.com/bitnami/bitnami-docker-suitecrm#environment-variables
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
  user: bn_suitecrm

  ## Database password
  password:

  ## Database name
  database: bitnami_suitecrm

## SMTP mail delivery configuration
## ref: https://github.com/bitnami/bitnami-docker-suitecrm/#smtp-configuration
##
# suitecrmSmtpHost:
# suitecrmSmtpPort:
# suitecrmSmtpUser:
# suitecrmSmtpPassword:
# suitecrmSmtpProtocol:

##
## MariaDB chart configuration
##
mariadb:
  ## Whether to deploy a mariadb server to satisfy the applications database requirements. To use an external database set this to false and configure the externalDatabase parameters
  enabled: true

  ## Create a database
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-on-first-run
  ##
  mariadbDatabase: bitnami_suitecrm

  ## Create a database user
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  mariadbUser: bn_suitecrm

  ## Password for mariadbUser
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#creating-a-database-user-on-first-run
  ##
  # mariadbPassword:

  ## MariaDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  # mariadbRootPassword:

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
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
serviceType: LoadBalancer

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
  suitecrm:
    ## suitecrm data Persistent Volume Storage Class
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
  {}
  # requests:
  #   memory: 512Mi
  #   cpu: 300m
```

</details>

---

# SuiteCRM

[SuiteCRM](https://www.suitecrm.com) is a completely open source enterprise-grade Customer Relationship Management (CRM) application. SuiteCRM is a software fork of the popular customer relationship management (CRM) system SugarCRM.

## TL;DR;

```console
$ helm install stable/suitecrm
```

## Introduction

This chart bootstraps a [SuiteCRM](https://github.com/bitnami/bitnami-docker-suitecrm) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MariaDB chart](https://github.com/kubernetes/charts/tree/master/stable/mariadb) which is required for bootstrapping a MariaDB deployment for the database requirements of the SuiteCRM application.

## Prerequisites

- Kubernetes 1.5+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/suitecrm
```

The command deploys SuiteCRM on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the SuiteCRM chart and their default values.

| Parameter                           | Description                               | Default                                                 |
| ----------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| `image.registry`                    | SuiteCRM image registry                   | `docker.io`                                             |
| `image.repository`                  | SuiteCRM image name                       | `bitnami/suitecrm`                                      |
| `image.tag`                         | SuiteCRM image tag                        | `{VERSION}`                                             |
| `image.pullPolicy`                  | Image pull policy                         | `Always` if `imageTag` is `latest`, else `IfNotPresent` |
| `image.pullSecrets`                 | Specify image pull secrets                | `nil`                                                   |
| `suitecrmHost`                      | SuiteCRM host to create application URLs  | `nil`                                                   |
| `suitecrmLoadBalancerIP`            | `loadBalancerIP` for the SuiteCRM Service | `nil`                                                   |
| `suitecrmUsername`                  | User of the application                   | `user`                                                  |
| `suitecrmPassword`                  | Application password                      | _random 10 character alphanumeric string_               |
| `suitecrmEmail`                     | Admin email                               | `user@example.com`                                      |
| `suitecrmLastName`                  | Last name                                 | `Last`                                                  |
| `suitecrmSmtpHost`                  | SMTP host                                 | `nil`                                                   |
| `suitecrmSmtpPort`                  | SMTP port                                 | `nil`                                                   |
| `suitecrmSmtpUser`                  | SMTP user                                 | `nil`                                                   |
| `suitecrmSmtpPassword`              | SMTP password                             | `nil`                                                   |
| `suitecrmSmtpProtocol`              | SMTP protocol [`ssl`, `tls`]              | `nil`                                                   |
| `allowEmptyPassword`                | Allow DB blank passwords                  | `yes`                                                   |
| `externalDatabase.host`             | Host of the external database             | `nil`                                                   |
| `externalDatabase.port`             | Port of the external database             | `3306`                                                  |
| `externalDatabase.user`             | Existing username in the external db      | `bn_suitecrm`                                           |
| `externalDatabase.password`         | Password for the above username           | `nil`                                                   |
| `externalDatabase.database`         | Name of the existing database             | `bitnami_suitecrm`                                      |
| `mariadb.enabled`                   | Whether to use the MariaDB chart          | `true`                                                  |
| `mariadb.mariadbDatabase`           | Database name to create                   | `bitnami_suitecrm`                                      |
| `mariadb.mariadbUser`               | Database user to create                   | `bn_suitecrm`                                           |
| `mariadb.mariadbPassword`           | Password for the database                 | `nil`                                                   |
| `mariadb.mariadbRootPassword`       | MariaDB admin password                    | `nil`                                                   |
| `serviceType`                       | Kubernetes Service type                   | `LoadBalancer`                                          |
| `persistence.enabled`               | Enable persistence using PVC              | `true`                                                  |
| `persistence.apache.storageClass`   | PVC Storage Class for apache volume       | `nil` (uses alpha storage class annotation)             |
| `persistence.apache.accessMode`     | PVC Access Mode for apache volume         | `ReadWriteOnce`                                         |
| `persistence.apache.size`           | PVC Storage Request for apache volume     | `1Gi`                                                   |
| `persistence.suitecrm.storageClass` | PVC Storage Class for SuiteCRM volume     | `nil` (uses alpha storage class annotation)             |
| `persistence.suitecrm.accessMode`   | PVC Access Mode for SuiteCRM volume       | `ReadWriteOnce`                                         |
| `persistence.suitecrm.size`         | PVC Storage Request for SuiteCRM volume   | `8Gi`                                                   |
| `resources`                         | CPU/Memory resource requests/limits       | Memory: `512Mi`, CPU: `300m`                            |

The above parameters map to the env variables defined in [bitnami/suitecrm](http://github.com/bitnami/bitnami-docker-suitecrm). For more information please refer to the [bitnami/suitecrm](http://github.com/bitnami/bitnami-docker-suitecrm) image documentation.

> **Note**:
>
> For SuiteCRM to function correctly, you should specify the `suitecrmHost` parameter to specify the FQDN (recommended) or the public IP address of the SuiteCRM service.
>
> Optionally, you can specify the `suitecrmLoadBalancerIP` parameter to assign a reserved IP address to the SuiteCRM service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create suitecrm-public-ip
> ```
>
> The reserved IP address can be associated to the SuiteCRM service by specifying it as the value of the `suitecrmLoadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set suitecrmUsername=admin,suitecrmPassword=password,mariadb.mariadbRootPassword=secretpassword \
    stable/suitecrm
```

The above command sets the SuiteCRM administrator account username and password to `admin` and `password` respectively. Additionally, it sets the MariaDB `root` user password to `secretpassword`.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/suitecrm
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami SuiteCRM](https://github.com/bitnami/bitnami-docker-suitecrm) image stores the SuiteCRM data and configurations at the `/bitnami/suitecrm` and `/bitnami/apache` paths of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
