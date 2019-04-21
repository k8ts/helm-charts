# `@helm-charts/incubator-drone`

Drone is a Continuous Delivery system built on container technology

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | drone     |
| Chart Version       | 0.2.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
appVersion: '0.8.2'

images:
  ## The official drone (server) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/drone/drone/tags/
  ##
  server:
    repository: 'docker.io/drone/drone'
    tag: 0.8.2
    pullPolicy: IfNotPresent

  ## The official drone (agent) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/drone/agent/tags/
  ##
  agent:
    repository: 'docker.io/drone/agent'
    tag: 0.8.2
    pullPolicy: IfNotPresent

  ## The official docker (dind) image, change tag to use a different version.
  ## ref: https://hub.docker.com/r/library/docker/tags/
  ##
  dind:
    repository: 'docker.io/library/docker'
    tag: 17.12.0-ce-dind
    pullPolicy: IfNotPresent

service:
  httpPort: 80

  ## If service.type is not set to NodePort, the following statement
  ## will be ignored.
  ##
  # nodePort: 32015

  ## Service type can be set to ClusterIP, NodePort or LoadBalancer.
  ##
  type: ClusterIP

ingress:
  ## If true, Drone Ingress will be created.
  ##
  enabled: false

  ## Drone Ingress annotations
  ##
  # annotations:
  #   kubernetes.io/ingress.class: nginx
  #   kubernetes.io/tls-acme: 'true'
  ## Drone hostnames must be provided if Ingress is enabled
  ##
  # hosts:
  #   - drone.domain.io
  ## Drone Ingress TLS configuration secrets
  ## Must be manually created in the namespace
  ##
  # tls:
  #   - secretName: drone-tls
  #     hosts:
  #       - drone.domain.io

server:
  ## If not set, it will be autofilled with the cluster host.
  ##
  # host: "https://drone.domain.io"

  ## Drone server configuration.
  ## Values in here get injected as environment variables.
  ## ref: http://readme.drone.io/admin/installation-reference
  ##
  env:
    DRONE_DEBUG: 'false'
    DRONE_DATABASE_DRIVER: 'sqlite3'
    DRONE_DATABASE_DATASOURCE: '/var/lib/drone/drone.sqlite'

    ## Drone requires some environment variables to bootstrap the
    ## git service or it won't start up.
    ## Uncomment this and add your own custom configuration.
    ##
    # DRONE_PROVIDER: "github"
    # DRONE_OPEN: "true"
    # DRONE_GITHUB: "true"
    # DRONE_ORGS: "my-github-org,my-other-github-org"
    # DRONE_ADMIN:"admin-1,admin-2"
    # DRONE_GITHUB_CLIENT: "github-oauth2-client-id"
    # DRONE_GITHUB_SECRET: "github-oauth2-client-secret"

  ## CPU and memory limits for drone server
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

agent:
  ## Drone agent configuration.
  ## Values in here get injected as environment variables.
  ## ref: http://readme.drone.io/admin/installation-reference
  ##
  env:
    DRONE_DEBUG: 'false'

  ## CPU and memory limits for drone agent
  ##
  resources: {}
  #  requests:
  #    memory: 32Mi
  #    cpu: 40m
  #  limits:
  #    memory: 2Gi
  #    cpu: 1

## Enable persistence using Persistent Volume Claims
## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
##
persistence:
  enabled: true

  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## rabbitmq data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 1Gi
## Uncomment this if you want to set a specific shared secret between
## the agents and servers, otherwise this will be auto-generated.
##
# sharedSecret: supersecret
```

</details>

---

# Drone.io

[Drone](http://readme.drone.io/) is a Continuous Integration platform built on container technology.

## TL;DR;

```console
$ helm install incubator/drone
```

## Installing the Chart

To install the chart with the release name `my-release`:

```console
$ helm install --name my-release incubator/drone
```

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
$ helm delete my-release
```

The command removes nearly all the Kubernetes components associated with the
chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the drone charts and their default values.

| Parameter                   | Description                                                                                   | Default                    |
| --------------------------- | --------------------------------------------------------------------------------------------- | -------------------------- |
| `images.server.repository`  | Drone **server** image                                                                        | `docker.io/drone/drone`    |
| `images.server.tag`         | Drone **server** image tag                                                                    | `0.8.2`                    |
| `images.server.pullPolicy`  | Drone **server** image pull policy                                                            | `IfNotPresent`             |
| `images.agent.repository`   | Drone **agent** image                                                                         | `docker.io/drone/agent`    |
| `images.agent.tag`          | Drone **agent** image tag                                                                     | `0.8.2`                    |
| `images.agent.pullPolicy`   | Drone **agent** image pull policy                                                             | `IfNotPresent`             |
| `images.dind.repository`    | Docker **dind** image                                                                         | `docker.io/library/docker` |
| `images.dind.tag`           | Docker **dind** image tag                                                                     | `17.12.0-ce-dind`          |
| `images.dind.pullPolicy`    | Docker **dind** image pull policy                                                             | `IfNotPresent`             |
| `service.httpPort`          | Drone's Web GUI HTTP port                                                                     | `80`                       |
| `service.httpPort`          | Drone's Web GUI HTTP port                                                                     | `80`                       |
| `service.nodePort`          | If `service.type` is `NodePort` and this is non-empty, sets the http node port of the service | `32015`                    |
| `service.type`              | Service type (ClusterIP, NodePort or LoadBalancer)                                            | `ClusterIP`                |
| `ingress.enabled`           | Enables Ingress for Drone                                                                     | `false`                    |
| `ingress.annotations`       | Ingress annotations                                                                           | `{}`                       |
| `ingress.hosts`             | Ingress accepted hostnames                                                                    | `nil`                      |
| `ingress.tls`               | Ingress TLS configuration                                                                     | `[]`                       |
| `server.host`               | Drone **server** hostname                                                                     | `(internal hostname)`      |
| `server.env`                | Drone **server** environment variables                                                        | `(default values)`         |
| `server.resources`          | Drone **server** pod resource requests & limits                                               | `{}`                       |
| `agent.env`                 | Drone **agent** environment variables                                                         | `(default values)`         |
| `agent.resources`           | Drone **agent** pod resource requests & limits                                                | `{}`                       |
| `persistence.enabled`       | Use a PVC to persist data                                                                     | `true`                     |
| `persistence.existingClaim` | Use an existing PVC to persist data                                                           | `nil`                      |
| `persistence.storageClass`  | Storage class of backing PVC                                                                  | `nil`                      |
| `persistence.accessMode`    | Use volume as ReadOnly or ReadWrite                                                           | `ReadWriteOnce`            |
| `persistence.size`          | Size of data volume                                                                           | `1Gi`                      |
| `sharedSecret`              | Drone server and agent shared secret                                                          | `(random value)`           |