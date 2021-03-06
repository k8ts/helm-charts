# `@helm-charts/bitnami-kubeapps`

Kubeapps is a dashboard for your Kubernetes cluster that makes it easy to deploy and manage applications in your cluster using Helm

| Field               | Value    |
| ------------------- | -------- |
| Repository Name     | bitnami  |
| Chart Name          | kubeapps |
| Chart Version       | 0.5.3    |
| NPM Package Version | 0.1.0    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# The frontend service is the main reverse proxy used to access the Kubeapps UI
# To expose Kubeapps externally either configure the ingress object below or
# set frontend.service.type=LoadBalancer in the frontend configuration.
ingress:
  enabled: false
  annotations: {}
  path: /
  hosts:
    - kubeapps.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

frontend:
  replicaCount: 2
  image:
    registry: docker.io
    repository: bitnami/nginx
    tag: 1.14.0-r27
  service:
    port: 80
    type: ClusterIP
    annotations: {}
  livenessProbe:
    httpGet:
      path: /healthz
      port: 8080
    initialDelaySeconds: 60
    timeoutSeconds: 5
  readinessProbe:
    httpGet:
      path: /
      port: 8080
    initialDelaySeconds: 0
    timeoutSeconds: 5
  # https://github.com/kubeapps/kubeapps/issues/478#issuecomment-422979262
  resources:
    limits:
      cpu: 250m
      memory: 128Mi
    requests:
      cpu: 25m
      memory: 32Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

# AppRepository Controller is the controller used to manage the repositories to
# sync. Set apprepository.initialRepos to configure the initial set of
# repositories to use when first installing Kubeapps.
apprepository:
  # Running a single controller replica to avoid sync job duplication
  replicaCount: 1
  image:
    registry: docker.io
    repository: kubeapps/apprepository-controller
    tag: v1.0.0-beta.1
  # Image used to perform chart repository syncs
  syncImage:
    registry: docker.io
    repository: kubeapps/chart-repo
    tag: v1.0.0-beta.1
  # This image is used in a Helm post-install hook to bootstrap the initialRepos below
  jobsImage:
    registry: docker.io
    repository: lachlanevenson/k8s-kubectl
    tag: v1.9.9
  initialRepos:
    - name: stable
      url: https://kubernetes-charts.storage.googleapis.com
    - name: incubator
      url: https://kubernetes-charts-incubator.storage.googleapis.com
    - name: svc-cat
      url: https://svc-catalog-charts.storage.googleapis.com
    - name: bitnami
      url: https://charts.bitnami.com/bitnami
  # https://github.com/kubeapps/kubeapps/issues/478#issuecomment-422979262
  resources:
    limits:
      cpu: 250m
      memory: 128Mi
    requests:
      cpu: 25m
      memory: 32Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Tiller Proxy is a secure REST API on top of Helm's Tiller component used to
# manage Helm chart releases in the cluster from Kubeapps. Set tillerProxy.host
# to configure a different Tiller host to use.
tillerProxy:
  replicaCount: 2
  image:
    registry: docker.io
    repository: kubeapps/tiller-proxy
    tag: v1.0.0-beta.1
  service:
    port: 8080
  host: tiller-deploy.kube-system:44134
  tls:
    {}
    # ca:
    # cert:
    # key:
    # verify: false
  # https://github.com/kubeapps/kubeapps/issues/478#issuecomment-422979262
  resources:
    limits:
      cpu: 250m
      memory: 128Mi
    requests:
      cpu: 25m
      memory: 32Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Chartsvc is used to serve chart metadata over a REST API.
chartsvc:
  replicaCount: 2
  image:
    registry: docker.io
    repository: kubeapps/chartsvc
    tag: v1.0.0-beta.1
  service:
    port: 8080
  # https://github.com/kubeapps/kubeapps/issues/478#issuecomment-422979262
  resources:
    limits:
      cpu: 250m
      memory: 128Mi
    requests:
      cpu: 25m
      memory: 32Mi
  livenessProbe:
    httpGet:
      path: /live
      port: 8080
    initialDelaySeconds: 60
    timeoutSeconds: 5
  readinessProbe:
    httpGet:
      path: /ready
      port: 8080
    initialDelaySeconds: 0
    timeoutSeconds: 5
  nodeSelector: {}
  tolerations: []
  affinity: {}

# Dashboard serves the compiled static React frontend application. This is an
# internal service used by the main frontend reverse-proxy and should not be
# accessed directly.
dashboard:
  replicaCount: 2
  image:
    registry: docker.io
    repository: kubeapps/dashboard
    tag: v1.0.0-beta.1
  service:
    port: 8080
  livenessProbe:
    httpGet:
      path: /
      port: 8080
    initialDelaySeconds: 60
    timeoutSeconds: 5
  readinessProbe:
    httpGet:
      path: /
      port: 8080
    initialDelaySeconds: 0
    timeoutSeconds: 5
  # https://github.com/kubeapps/kubeapps/issues/478#issuecomment-422979262
  resources:
    limits:
      cpu: 250m
      memory: 128Mi
    requests:
      cpu: 25m
      memory: 32Mi
  nodeSelector: {}
  tolerations: []
  affinity: {}

mongodb:
  # Kubeapps uses MongoDB as a cache and persistence is not required
  persistence:
    enabled: false
  # https://github.com/kubeapps/kubeapps/issues/478#issuecomment-422979262
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 50m
      memory: 256Mi

nodeSelector: {}

tolerations: []

affinity: {}

# For RBAC support:
rbac:
  # Perform creation of RBAC resources
  create: true

testImage:
  # Image used for the tests. The only requirement is to include curl
  registry: docker.io
  repository: bitnami/nginx
  tag: 1.14.0-r27
```

</details>

---

# Kubeapps

[![Build Status](https://travis-ci.org/kubeapps/kubeapps.svg?branch=master)](https://travis-ci.org/kubeapps/kubeapps)

[Kubeapps](https://kubeapps.com) is a web-based UI for deploying and managing applications in Kubernetes clusters. Kubeapps allows you to:

- Browse and deploy [Helm](https://github.com/helm/helm) charts from chart repositories
- Inspect, upgrade and delete Helm-based applications installed in the cluster
- Add custom and private chart repositories (supports [ChartMuseum](https://github.com/helm/chartmuseum) and [JFrog Artifactory](https://www.jfrog.com/confluence/display/RTF/Helm+Chart+Repositories))
- Browse and provision external services from the [Service Catalog](https://github.com/kubernetes-incubator/service-catalog) and available Service Brokers
- Connect Helm-based applications to external services with Service Catalog Bindings
- Secure authentication and authorization based on Kubernetes [Role-Based Access Control](https://github.com/kubeapps/kubeapps/blob/master/docs/user/access-control.md)

## TL;DR;

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

## Introduction

This chart bootstraps a [Kubeapps](https://kubeapps.com) deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

It also packages the [Bitnami MongoDB chart](https://github.com/helm/charts/tree/master/stable/mongodb) which is required for bootstrapping a MongoDB deployment for the database requirements of the Kubeapps application.

## Prerequisites

- Kubernetes 1.8+ (tested with Azure Kubernetes Service, Google Kubernetes Engine, minikube and Docker for Desktop Kubernetes)
- Helm 2.9.1+
- PV provisioner support in the underlying infrastructure
- Administrative access to the cluster to create and update RBAC ClusterRoles

## Installing the Chart

To install the chart with the release name `kubeapps`:

```console
$ helm repo add bitnami https://charts.bitnami.com/bitnami
$ helm install --name kubeapps --namespace kubeapps bitnami/kubeapps
```

> **IMPORTANT** This assumes an insecure Helm installation, which is not recommended in production. See [the documentation to learn how to secure Helm and Kubeapps in production](https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md).

The command deploys Kubeapps on the Kubernetes cluster in the `kubeapps` namespace. The [configuration](#configuration) section lists the parameters that can be configured during installation.

> **Caveat**: Only one Kubeapps installation is supported per namespace

> **Tip**: List all releases using `helm list`

## Upgrading Kubeapps

To upgrade Kubeapps, first ensure you have the updated your local chart repository cache:

```console
$ helm repo update
```

Now upgrade Kubeapps:

```console
$ export RELEASE_NAME=kubeapps
$ export NAMESPACE=kubeapps
$ export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace $NAMESPACE $RELEASE_NAME-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)
$ helm upgrade $RELEASE_NAME bitnami/kubeapps --set mongodb.mongodbRootPassword=$MONGODB_ROOT_PASSWORD
```

The above commands ensure the MongoDB password is set to the existing password and not regenerated by the chart.

## Uninstalling Kubeapps

To uninstall/delete the `kubeapps` deployment:

```console
$ helm delete --purge kubeapps
$ # Optional: Only if there are no more instances of Kubeapps
$ kubectl delete crd apprepositories.kubeapps.com
```

The first command removes most of the Kubernetes components associated with the chart and deletes the release. After that, if there are no more instances of Kubeapps in the cluster you can manually delete the `apprepositories.kubeapps.com` CRD used by Kubeapps that is shared for the entire cluster.

> **NOTE**: If you delete the CRD for `apprepositories.kubeapps.com` it will delete the repositories for **all** the installed instances of `kubeapps`. This will break existing installations of `kubeapps` if they exist.

## Configuration

For a full list of configuration parameters of the Kubeapps chart, see the [values.yaml](values.yaml) file.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```console
$ helm install --name kubeapps --namespace kubeapps \
  --set chartsvc.service.port=9090 \
    bitnami/kubeapps
```

The above command sets the port for the chartsvc Service to 9090.

Alternatively, a YAML file that specifies the values for parameters can be provided while installing the chart. For example,

```console
$ helm install --name kubeapps --namespace kubeapps -f custom-values.yaml bitnami/kubeapps
```

### Configuring Initial Repositories

By default, Kubeapps will track the [community Helm charts](https://github.com/helm/charts) and the [Kubernetes Service Catalog charts](https://github.com/kubernetes-incubator/service-catalog). To change these defaults, override the `apprepository.initialRepos` object:

```console
$ cat > custom-values.yaml <<EOF
apprepository:
  initialRepos:
  - name: example
    url: https://charts.example.com
EOF
$ helm install --name kubeapps --namespace kubeapps bitnami/kubeapps -f custom-values.yaml
```

### Configuring connection to a custom namespace Tiller instance

By default, Kubeapps connects to the Tiller Service in the `kube-system` namespace, the default install location for Helm.

If your instance of Tiller is running in a different namespace or you want to have different instances of Kubeapps connected to different Tiller instances, you can achieve it by setting `tillerProxy.host`:

```console
helm install \
  --set tillerProxy.host=tiller-deploy.my-custom-namespace:44134 \
  bitnami/kubeapps
```

### Configuring connection to a secure Tiller instance

In production, we strongly recommend setting up a [secure installation of Tiller](https://docs.helm.sh/using_helm/#using-ssl-between-helm-and-tiller), the Helm server side component.

In this case, set the following values to configure TLS:

```console
helm install \
  --tls --tls-ca-cert ca.cert.pem --tls-cert helm.cert.pem --tls-key helm.key.pem \
  --set tillerProxy.tls.verify=true \
  --set tillerProxy.tls.ca="$(cat ca.cert.pem)" \
  --set tillerProxy.tls.key="$(cat helm.key.pem)" \
  --set tillerProxy.tls.cert="$(cat helm.cert.pem)" \
  bitnami/kubeapps
```

Learn more about how to secure your Kubeapps installation [here](https://github.com/kubeapps/kubeapps/blob/master/docs/user/securing-kubeapps.md).

### Exposing Externally

#### LoadBalancer Service

The simplest way to expose the Kubeapps Dashboard is to assign a LoadBalancer type to the Kubeapps frontend Service. For example:

```console
$ helm install --name kubeapps --namespace kubeapps bitnami/kubeapps --set frontend.service.type=LoadBalancer
```

Wait for your cluster to assign a LoadBalancer IP or Hostname to the `kubeapps` Service and access it on that address:

```console
$ kubectl get services --namespace kubeapps --watch
```

#### Ingress

This chart provides support for ingress resources. If you have an ingress controller installed on your cluster, such as [nginx-ingress](https://hub.kubeapps.com/charts/stable/nginx-ingress) or [traefik](https://hub.kubeapps.com/charts/stable/traefik) you can utilize the ingress controller to expose Kubeapps.

To enable ingress integration, please set `ingress.enabled` to `true`

##### Hosts

Most likely you will only want to have one hostname that maps to this Kubeapps installation, however, it is possible to have more than one host. To facilitate this, the `ingress.hosts` object is an array.

##### Annotations

For annotations, please see [this document](https://github.com/kubernetes/ingress-nginx/blob/master/docs/annotations.md). Not all annotations are supported by all ingress controllers, but this document does a good job of indicating which annotation is supported by many popular ingress controllers. Annotations can be set using `ingress.annotations`.

##### TLS

TLS can be configured using the `ingress.tls` object in the same format that the Kubernetes Ingress requests. Please see [this example](https://github.com/kubernetes/contrib/tree/master/ingress/controllers/nginx/examples/tls) for more information.

## Troubleshooting

### Forbidden error while installing the Chart

If during installation you run into an error similar to:

```
Error: release kubeapps failed: clusterroles.rbac.authorization.k8s.io "kubeapps-apprepository-controller" is forbidden: attempt to grant extra privileges: [{[get] [batch] [cronjobs] [] []...
```

It is possible that your cluster does not have Role Based Access Control (RBAC) fully configured. In which case you should perform the chart installation by setting `rbac.create=false`:

```console
$ helm install --name kubeapps --namespace kubeapps bitnami/kubeapps --set rbac.create=false
```
