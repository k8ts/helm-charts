# `@helm-charts/incubator-buzzfeed-sso`

Single sign-on for your Kubernetes services using Google OAuth

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | incubator    |
| Chart Name          | buzzfeed-sso |
| Chart Version       | 0.0.1        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for buzzfeed-sso.

emailDomain: '<your_email_domain>' # Required. e.g "email.mydomain.foo"
rootDomain: '<your_root_domain>' # Required. e.g "mydomain.foo"

auth:
  annotations: {}
  domain: '<your_auth_domain>' # Required. e.g "sso-auth.mydomain.foo"
  replicaCount: 1
  resources:
    limits:
      memory: '256Mi'
      cpu: '200m'
  nodeSelector: {}
  tolerations: []
  affinity: {}
  service:
    type: ClusterIP
    port: 80
  # Generate these secrets with the command:
  # 'openssl rand -base64 32 | head -c 32 | base64'
  secret:
    {} # Required (if customSecret is not set)
    # codeSecret: ''
    # cookieSecret: ''
  # # Or if you do not want to create the secret via helm
  # customSecret: my-sso-auth-secret
  tls:
    secretName: sso-auth-tls-secret

proxy:
  annotations: {}
  # providerUrlInternal: https://sso-auth.mydomain.com
  cluster: dev
  replicaCount: 1
  resources:
    limits:
      memory: '256Mi'
      cpu: '200m'
  nodeSelector: {}
  tolerations: []
  affinity: {}
  service:
    type: ClusterIP
    port: 80
  # Generate these secrets with the command:
  # 'openssl rand -base64 32 | head -c 32 | base64'
  secret:
    {} # Required (if customSecret is not set)
    # clientId: ''
    # clientSecret: ''
    # cookieSecret: ''
  # # Or if you do not want to create the secret via helm
  # customSecret: my-sso-proxy-secret

provider:
  google: {} # Required.
  # google:
  #   adminEmail: me@mydomain.foo
  #   secret:
  #     clientId: foo123123-fake123123.apps.googleusercontent.com
  #     clientSecret: googleOauthClientSecret
  #     serviceAccount: 'service account content in JSON format'
  # # Or if you do not want to create the secret via helm
  # google:
  #   adminEmail: me@mydomain.foo
  #   customSecret: my-sso-google-secret

image:
  repository: buzzfeed/sso
  tag: v1.1.0
  pullPolicy: IfNotPresent

ingress:
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # certmanager.k8s.io/cluster-issuer: my-letsencrypt-issuer
    # ingress.kubernetes.io/ssl-redirect: "true"
  hosts: []
  #  - domain: mybackend.mydomain.foo
  #    path: /
  tls: []
  #  - secretName: mybackend-mydomain-tls
  #    hosts:
  #      - mybackend.mydomain.foo

upstreams: []
# See https://github.com/buzzfeed/sso/blob/f437f237ac977201f15868601c9bc0e9dff11f40/docs/sso_config.md#proxy-config
# - service: mybackend
#   default:
#     from: mybackend.mydomain.foo
#     to: http://mybackend.mynamespace.svc.cluster.local:9091
#     options:
#       allowed_groups:
#         - sso-test-group-1@example.com
#         - sso-test-group-2@example.com
#       skip_auth_regex:
#         - ^\/github-webhook\/$
#       header_overrides:
#         X-Frame-Options: DENY
```

</details>

---

# Buzzfeed SSO

Single sign-on for your Kubernetes services using Google OAuth (more providers are welcomed)

[Blogpost](https://tech.buzzfeed.com/unleashing-the-a6a1a5da39d6?gi=e6db395406ae)
[Quickstart guide](https://github.com/buzzfeed/sso/blob/master/docs/quickstart.md)
[SSO in Kubernetes with Google Auth](https://medium.com/@while1eq1/single-sign-on-for-internal-apps-in-kubernetes-using-google-oauth-sso-2386a34bc433)
[Repo](https://github.com/buzzfeed/sso)

This helm chart is heavily inspired in [Buzzfeed's example](https://github.com/buzzfeed/sso/tree/master/quickstart/kubernetes), and provides a way of protecting Kubernetes services that have no authentication layer globally from a single OAuth proxy.

Many of the Kubernetes OAuth solutions require to run an extra container within the pod using [oauth2_proxy](https://github.com/bitly/oauth2_proxy), but the project seems to not be maintained anymore. The approach presented on this chart allows to have a global OAuth2 Proxy that can protect services even in different namespaces, thanks to [Kube DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).

We use this chart in production at [MindDoc](https://minddoc.de) for protecting endpoints that have no built-in authentication (or that would require to run inner containers), like `Kibana`, `Prometheus`, etc...

## Introduction

This chart creates a SSO deployment on a [Kubernetes](http://kubernetes.io)
cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.8+ with Beta APIs enabled
- Kube DNS

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/buzzfeed-sso
```

The command deploys SSO on the Kubernetes cluster using the default configuration. The [configuration](#configuration) section lists the parameters that can be configured during installation.

This chart has required variables, see [Configuration](#configuration).

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the SSO chart and their default/required values.

| Parameter                      | Description                                                                            | Default                                               |
| ------------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `namespace`                    | namespace to use                                                                       | `default`                                             |
| `emailDomain`                  | the sso email domain for authentication                                                | REQUIRED                                              |
| `rootDomain`                   | the parent domain used for protecting your backends                                    | REQUIRED                                              |
| `auth.annotations`             | extra annotations for auth pods                                                        | `{}`                                                  |
| `auth.domain`                  | the auth domain used for OAuth callbacks                                               | REQUIRED                                              |
| `auth.replicaCount`            | desired number of auth pods                                                            | `1`                                                   |
| `auth.resources`               | resource limits and requests for auth pods                                             | `{ limits: { memory: "256Mi", cpu: "200m" }}`         |
| `auth.nodeSelector`            | node selector logic for auth pods                                                      | `{}`                                                  |
| `auth.tolerations`             | resource tolerations for auth pods                                                     | `{}`                                                  |
| `auth.affinity`                | node affinity for auth pods                                                            | `{}`                                                  |
| `auth.service.type`            | type of auth service to create                                                         | `ClusterIP`                                           |
| `auth.service.port`            | port for the http auth service                                                         | `80`                                                  |
| `auth.secret`                  | secrets to be generated randomly with `openssl rand -base64 32 | head -c 32`.          | REQUIRED if `auth.customSecret` is not set            |
| `auth.tls`                     | tls configuration for central sso auth ingress.                                        | `{ secretName: "sso-auth-tls-secret" }`               |
| `auth.customSecret`            | the secret key to reuse (avoids secret creation via helm)                              | REQUIRED if `auth.secret` is not set                  |
| `proxy.annotations`            | extra annotations for proxy pods                                                       | `{}`                                                  |
| `proxy.providerUrlInternal`    | url for split dns deployments                                                          |
| `proxy.cluster`                | the cluster name for SSO                                                               | `dev`                                                 |
| `proxy.replicaCount`           | desired number of proxy pods                                                           | `1`                                                   |
| `proxy.resources`              | resource limits and requests for proxy pods                                            | `{ limits: { memory: "256Mi", cpu: "200m" }}`         |
| `proxy.nodeSelector`           | node selector logic for proxy pods                                                     | `{}`                                                  |
| `proxy.tolerations`            | resource tolerations for proxy pods                                                    | `{}`                                                  |
| `proxy.affinity`               | node affinity for proxy pods                                                           | `{}`                                                  |
| `proxy.service.type`           | type of proxy service to create                                                        | `ClusterIP`                                           |
| `proxy.service.port`           | port for the http proxy service                                                        | `80`                                                  |
| `proxy.secret`                 | secrets to be generated randomly with `openssl rand -base64 32 | head -c 32 | base64`. | REQUIRED if `proxy.customSecret` is not set           |
| `proxy.customSecret`           | the secret key to reuse (avoids secret creation via helm)                              | REQUIRED if `proxy.secret` is not set                 |
| `provider.google`              | the Oauth provider to use (only Google support for now)                                | REQUIRED                                              |
| `provider.google.adminEmail`   | the Google admin email                                                                 | `undefined`                                           |
| `provider.google.secret`       | the Google OAuth secrets                                                               | REQUIRED if `provider.google.customSecret` is not set |
| `provider.google.customSecret` | the secret key to reuse instead of creating it via helm                                | REQUIRED if `provider.google.secret` is not set       |
| `image.repository`             | container image repository                                                             | `buzzfeed/sso`                                        |
| `image.tag`                    | container image tag                                                                    | `v1.0.0`                                              |
| `image.pullPolicy`             | container image pull policy                                                            | `IfNotPresent`                                        |
| `ingress.annotations`          | ingress load balancer annotations                                                      | `{}`                                                  |
| `ingress.hosts`                | proxied hosts                                                                          | `[]`                                                  |
| `ingress.tls`                  | tls certificates for the proxied hosts                                                 | `[]`                                                  |
| `upstreams`                    | configuration of services that use sso                                                 | `[]`                                                  |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set key_1=value_1,key_2=value_2 \
    stable/buzzfeed-sso
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/buzzfeed-sso
```

> **Tip**: This will merge parameters with [values.yaml](values.yaml), which does not specify all the required values

### Example

**NEVER expose your `auth.secret`, `proxy.secret`, `provider.google.clientId`, `provider.google.clientSecret` and `provider.google.serviceAccount`.** Always keep them in a safe place and do not push them to any repository. As values are merged, you can always generate a different `.yaml` file. For instance:

```yaml
# values.yaml
emailDomain: 'email.coolcompany.foo'

rootDomain: 'coolcompany.foo'

auth:
  domain: sso-auth.coolcompany.foo

proxy:
  cluster: dev

google:
  adminEmail: iamtheadmin@email.coolcompany.foo
```

```yaml
# secrets.yaml
auth:
  secret:
    codeSecret: 'randomSecret1'
    cookieSecret: 'randomSecret2'

proxy:
  secret:
    clientId: 'randomSecret3'
    clientSecret: 'randomSecret4'
    cookieSecret: 'randomSecret6'

google:
  secret:
    clientId: 'googleSecret!'
    clientSecret: 'evenMoreSecret'
    serviceAccount: '{ <json content super secret> }'
```

Therefore, you could push your own `values.yaml` to a repo and keep `secrets.yaml` locally safe, and then install/update the chart:

```bash
$ helm install --name my-release -f values.yaml -f secrets.yaml stable/buzzfeed-sso
```

Alternatively, you can specify your own secret key, if you have already created it in the cluster. The secret should follow the data format defined in `secret.yaml` (auth and proxy) and `google-secret.yaml` (google provider).

```yaml
# values.yaml
emailDomain: 'email.coolcompany.foo'

rootDomain: 'coolcompany.foo'

auth:
  domain: sso-auth.coolcompany.foo
  customSecret: my-sso-auth-secret

proxy:
  cluster: dev
  customSecret: my-sso-proxy-secret

provider:
  google:
    adminEmail: iamtheadmin@email.coolcompany.foo
    customSecret: my-sso-google-secret
```

## Updating the Chart

You can update the chart values and trigger a pod reload. If the configmap changes, it will automatically retrieve the new values.

```bash
$ helm upgrade -f values.yaml my-release stable/buzzfeed-sso
```
