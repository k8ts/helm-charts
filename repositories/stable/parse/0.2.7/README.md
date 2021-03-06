# `@helm-charts/stable-parse`

Parse is a platform that enables users to add a scalable and powerful backend to launch a full-featured app for iOS, Android, JavaScript, Windows, Unity, and more.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | parse  |
| Chart Version       | 0.2.7  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Kubernetes serviceType for Parse Deployment
## ref: http://kubernetes.io/docs/user-guide/services/#publishing-services---service-types
##
serviceType: LoadBalancer

## loadBalancerIP for the Parse Service (optional, cloud specific)
## ref: http://kubernetes.io/docs/user-guide/services/#type-loadbalancer
##
# loadBalancerIP:

server:
  ## Bitnami Parse image version
  ## ref: https://hub.docker.com/r/bitnami/parse/tags/
  ##
  image: bitnami/parse:2.6.3-r0

  ## Specify a imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  imagePullPolicy: IfNotPresent

  ## Parse Server Port
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  port: 1337

  ## Parse API mount path
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  mountPath: /parse

  ## Parse Server App ID
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  appId: myappID

  ## Parse Server Master Key
  ## ref: https://github.com/bitnami/bitnami-docker-parse#configuration
  ##
  # masterKey:

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    # requests:
    #   memory: 512Mi
    #   cpu: 300m

dashboard:
  ## Enable deployment of Parse Dashboard
  ##
  enabled: true

  ## Bitnami Parse Dashboard image version
  ## ref: https://hub.docker.com/r/bitnami/parse-dashboard/tags/
  ##
  image: bitnami/parse-dashboard:1.1.0-r0

  ## Specify a imagePullPolicy
  ## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
  ##
  imagePullPolicy: IfNotPresent

  ## Parse Dashboard application username
  ## ref: https://github.com/bitnami/bitnami-docker-parse-dashboard#configuration
  ##
  username: user

  ## Parse Dashboard application password
  ## Defaults to a random 10-character alphanumeric string if not set
  ## ref: https://github.com/bitnami/bitnami-docker-parse-dashboard#configuration
  ##
  # password:

  ## Parse Dashboard application name
  ## ref: https://github.com/bitnami/bitnami-docker-parse-dashboard#configuration
  ##
  appName: MyDashboard

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    {}
    # requests:
    #   memory: 512Mi
    #   cpu: 300m

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true
  ## parse data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 8Gi

##
## MongoDB chart configuration
##
mongodb:
  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: true
    ## mongodb data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 8Gi
```

</details>

---

# Parse

[Parse](https://parse.com/) is an open source version of the Parse backend that can be deployed to any infrastructure that can run Node.js.

## TL;DR;

```console
$ helm install stable/parse
```

## Introduction

This chart bootstraps a [Parse](https://github.com/bitnami/bitnami-docker-parse) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.4+ with Beta APIs enabled
- PV provisioner support in the underlying infrastructure

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release stable/parse
```

The command deploys Parse on the Kubernetes cluster in the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the Parse chart and their default values.

| Parameter                          | Description                            | Default                                     |
| ---------------------------------- | -------------------------------------- | ------------------------------------------- |
| `serviceType`                      | Kubernetes Service type                | `LoadBalancer`                              |
| `loadBalancerIP`                   | `loadBalancerIP` for the Parse Service | `nil`                                       |
| `server.image`                     | Parse server image                     | `bitnami/parse:{VERSION}`                   |
| `server.imagePullPolicy`           | Parse server image pull policy         | `IfNotPresent`                              |
| `server.port`                      | Parse server server port               | `1337`                                      |
| `server.mountPath`                 | Parse server API mount path            | `/parse`                                    |
| `server.appId`                     | Parse server App Id                    | `myappID`                                   |
| `server.masterKey`                 | Parse server Master Key                | `random 10 character alphanumeric string`   |
| `server.resources`                 | CPU/Memory resource requests/limits    | Memory: `512Mi`, CPU: `300m`                |
| `dashboard.enabled`                | Enable parse dashboard                 | `true`                                      |
| `dashboard.image`                  | Dashboard image                        | `bitnami/parse-dashboard:{VERSION}`         |
| `dashboard.imagePullPolicy`        | Dashboard image pull policy            | `IfNotPresent`                              |
| `dashboard.username`               | Dashboard username                     | `user`                                      |
| `dashboard.password`               | Dashboard user password                | `random 10 character alphanumeric string`   |
| `dashboard.appName`                | Dashboard application name             | `MyDashboard`                               |
| `dashboard.resources`              | CPU/Memory resource requests/limits    | Memory: `512Mi`, CPU: `300m`                |
| `persistence.enabled`              | Enable Parse persistence using PVC     | `true`                                      |
| `persistence.storageClass`         | PVC Storage Class for Parse volume     | `nil` (uses alpha storage class annotation) |
| `persistence.accessMode`           | PVC Access Mode for Parse volume       | `ReadWriteOnce`                             |
| `persistence.size`                 | PVC Storage Request for Parse volume   | `8Gi`                                       |
| `mongodb.persistence.enabled`      | Enable MongoDB persistence using PVC   | `true`                                      |
| `mongodb.persistence.storageClass` | PVC Storage Class for MongoDB volume   | `nil` (uses alpha storage class annotation) |
| `mongodb.persistence.accessMode`   | PVC Access Mode for MongoDB volume     | `ReadWriteOnce`                             |
| `mongodb.persistence.size`         | PVC Storage Request for MongoDB volume | `8Gi`                                       |

The above parameters map to the env variables defined in [bitnami/parse](http://github.com/bitnami/bitnami-docker-parse). For more information please refer to the [bitnami/parse](http://github.com/bitnami/bitnami-docker-parse) image documentation.

> **Note**:
>
> For the Parse application function correctly, you should specify the `parseHost` parameter to specify the FQDN (recommended) or the public IP address of the Parse service.
>
> Optionally, you can specify the `loadBalancerIP` parameter to assign a reserved IP address to the Parse service of the chart. However please note that this feature is only available on a few cloud providers (f.e. GKE).
>
> To reserve a public IP address on GKE:
>
> ```bash
> $ gcloud compute addresses create parse-public-ip
> ```
>
> The reserved IP address can be associated to the Parse service by specifying it as the value of the `loadBalancerIP` parameter while installing the chart.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name my-release \
  --set dashboard.username=admin,dashboard.password=password \
    stable/parse
```

The above command sets the Parse administrator account username and password to `admin` and `password` respectively.

Alternatively, a YAML file that specifies the values for the above parameters can be provided while installing the chart. For example,

```console
$ helm install --name my-release -f values.yaml stable/parse
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Persistence

The [Bitnami Parse](https://github.com/bitnami/bitnami-docker-parse) image stores the Parse data and configurations at the `/bitnami/parse` path of the container.

Persistent Volume Claims are used to keep the data across deployments. This is known to work in GCE, AWS, and minikube.
See the [Configuration](#configuration) section to configure the PVC or to disable persistence.
