# `@helm-charts/bitnami-nginx`

Chart for the nginx server

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | bitnami |
| Chart Name          | nginx   |
| Chart Version       | 0.4.3   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Bitnami NGINX image version
## ref: https://hub.docker.com/r/bitnami/nginx/tags/
##
image:
  registry: docker.io
  repository: bitnami/nginx
  tag: 1.12.2
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

## Specify a imagePullPolicy
## ref: http://kubernetes.io/docs/user-guide/images/#pre-pulling-images
##
imagePullPolicy: IfNotPresent
# vhost: |-
#   # example PHP-FPM vhost
#   server {
#     listen 0.0.0.0:80;
#     root /app;
#     location / {
#       index index.html index.php;
#     }
#     location ~ \.php$ {
#       fastcgi_pass phpfpm-server:9000;
#       fastcgi_index index.php;
#       include fastcgi.conf;
#     }
#   }
```

</details>

---

# NGINX

[NGINX](https://nginx.org) (pronounced "engine-x") is an open source reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, as well as a load balancer, HTTP cache, and a web server (origin server).

## TL;DR;

```bash
$ helm install nginx-x.x.x.tgz
```

## Introduction

Bitnami charts for Helm are carefully engineered, actively maintained and are the quickest and easiest way to deploy containers on a Kubernetes cluster that are ready to handle production workloads.

This chart bootstraps a [NGINX](https://github.com/bitnami/bitnami-docker-nginx) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Get this chart

Download the latest release of the chart from the [releases](../../../releases) page.

Alternatively, clone the repo if you wish to use the development snapshot:

```bash
$ git clone https://github.com/bitnami/charts.git
```

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release nginx-x.x.x.tgz
```

_Replace the `x.x.x` placeholder with the chart release version._

The command deploys NGINX on the Kubernetes cluster in the default configuration.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following tables lists the configurable parameters of the NGINX chart and their default values.

| Parameter           | Description                | Default                                                  |
| ------------------- | -------------------------- | -------------------------------------------------------- |
| `image.registry`    | Nginx image registry       | `docker.io`                                              |
| `image.repository`  | Nginx Image name           | `bitnami/nginx`                                          |
| `image.tag`         | Nginx Image tag            | `{VERSION}`                                              |
| `image.pullPolicy`  | Nginx image pull policy    | `Always` if `imageTag` is `latest`, else `IfNotPresent`  |
| `image.pullSecrets` | Specify image pull secrets | `nil` (does not add image pull secrets to deployed pods) |
| `vhost`             | Custom nginx virtual host  | `nil`                                                    |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
  --set imagePullPolicy=Always \
    nginx-x.x.x.tgz
```

The above command sets the `imagePullPolicy` to `Always`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml nginx-x.x.x.tgz
```

> **Tip**: You can use the default [values.yaml](values.yaml)

### Providing a custom virtual host

You can use the `vhost` value to provide a custom virtual host for NGINX to use.
To do this, create a values files with your virtual host:

_custom-vhost.yaml_

```yaml
vhost: |-
  server {
    listen 0.0.0.0:80;
    location / {
      return 200 "hello!";
    }
  }
```

Install the chart with this value:

```console
$ helm install --name my-release -f custom-vhost.yaml nginx-x.x.x.tgz
```
