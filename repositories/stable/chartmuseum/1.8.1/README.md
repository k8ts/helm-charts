# `@helm-charts/stable-chartmuseum`

Host your own Helm Chart Repository

| Field               | Value       |
| ------------------- | ----------- |
| Repository Name     | stable      |
| Chart Name          | chartmuseum |
| Chart Version       | 1.8.1       |
| NPM Package Version | 0.1.0       |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicaCount: 1
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
image:
  repository: chartmuseum/chartmuseum
  tag: v0.8.0
  pullPolicy: IfNotPresent
env:
  open:
    # storage backend, can be one of: local, alibaba, amazon, google, microsoft
    STORAGE: local
    # oss bucket to store charts for alibaba storage backend
    STORAGE_ALIBABA_BUCKET:
    # prefix to store charts for alibaba storage backend
    STORAGE_ALIBABA_PREFIX:
    # oss endpoint to store charts for alibaba storage backend
    STORAGE_ALIBABA_ENDPOINT:
    # server side encryption algorithm for alibaba storage backend, can be one
    # of: AES256 or KMS
    STORAGE_ALIBABA_SSE:
    # s3 bucket to store charts for amazon storage backend
    STORAGE_AMAZON_BUCKET:
    # prefix to store charts for amazon storage backend
    STORAGE_AMAZON_PREFIX:
    # region of s3 bucket to store charts
    STORAGE_AMAZON_REGION:
    # alternative s3 endpoint
    STORAGE_AMAZON_ENDPOINT:
    # server side encryption algorithm
    STORAGE_AMAZON_SSE:
    # gcs bucket to store charts for google storage backend
    STORAGE_GOOGLE_BUCKET:
    # prefix to store charts for google storage backend
    STORAGE_GOOGLE_PREFIX:
    # container to store charts for microsoft storage backend
    STORAGE_MICROSOFT_CONTAINER:
    # prefix to store charts for microsoft storage backend
    STORAGE_MICROSOFT_PREFIX:
    # container to store charts for openstack storage backend
    STORAGE_OPENSTACK_CONTAINER:
    # prefix to store charts for openstack storage backend
    STORAGE_OPENSTACK_PREFIX:
    # region of openstack container
    STORAGE_OPENSTACK_REGION:
    # path to a CA cert bundle for your openstack endpoint
    STORAGE_OPENSTACK_CACERT:
    # form field which will be queried for the chart file content
    CHART_POST_FORM_FIELD_NAME: chart
    # form field which will be queried for the provenance file content
    PROV_POST_FORM_FIELD_NAME: prov
    # levels of nested repos for multitenancy. The default depth is 0 (singletenant server)
    DEPTH: 0
    # show debug messages
    DEBUG: false
    # output structured logs as json
    LOG_JSON: true
    # disable use of index-cache.yaml
    DISABLE_STATEFILES: false
    # disable Prometheus metrics
    DISABLE_METRICS: true
    # disable all routes prefixed with /api
    DISABLE_API: true
    # allow chart versions to be re-uploaded
    ALLOW_OVERWRITE: false
    # absolute url for .tgzs in index.yaml
    CHART_URL:
    # allow anonymous GET operations when auth is used
    AUTH_ANONYMOUS_GET: false
    # sets the base context path
    CONTEXT_PATH:
    # parallel scan limit for the repo indexer
    INDEX_LIMIT: 0
    # cache store, can be one of: redis (leave blank for inmemory cache)
    CACHE:
    # address of Redis service (host:port)
    CACHE_REDIS_ADDR:
    # Redis database to be selected after connect
    CACHE_REDIS_DB: 0
  field:
    # POD_IP: status.podIP
  secret:
    # username for basic http authentication
    BASIC_AUTH_USER:
    # password for basic http authentication
    BASIC_AUTH_PASS:
    # GCP service account json file
    GOOGLE_CREDENTIALS_JSON:
    # Redis requirepass server configuration
    CACHE_REDIS_PASSWORD:
deployment:
  ## Chartmuseum Deployment annotations
  annotations: {}
  #   name: value
  labels: {}
  #   name: value
  matchlabes: {}
  #   name: value
replica:
  ## Chartmuseum Replicas annotations
  annotations: {}
  ## Read more about kube2iam to provide access to s3 https://github.com/jtblin/kube2iam
  #   iam.amazonaws.com/role: role-arn
service:
  servicename:
  type: ClusterIP
  # clusterIP: None
  externalPort: 8080
  nodePort:
  annotations: {}
  labels: {}

resources: {}
#  limits:
#    cpu: 100m
#    memory: 128Mi
#  requests:
#    cpu: 80m
#    memory: 64Mi

probes:
  liveness:
    initialDelaySeconds: 5
    periodSeconds: 10
    timeoutSeconds: 1
    successThreshold: 1
    failureThreshold: 3
  readiness:
    initialDelaySeconds: 5
    periodSeconds: 10
    timeoutSeconds: 1
    successThreshold: 1
    failureThreshold: 3

serviceAccount:
  create: false
  # name:

# UID/GID 1000 is the default user "chartmuseum" used in
# the container image starting in v0.8.0 and above. This
# is required for local persistant storage. If your cluster
# does not allow this, try setting securityContext: {}
securityContext:
  fsGroup: 1000

nodeSelector: {}

tolerations: []

affinity: {}

persistence:
  enabled: false
  accessMode: ReadWriteOnce
  size: 8Gi
  labels: {}
  #   name: value
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## Chartmuseum data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  # volumeName:
  pv:
    enabled: false
    pvname:
    capacity:
      storage: 8Gi
    accessMode: ReadWriteOnce
    nfs:
      server:
      path:

## Ingress for load balancer
ingress:
  enabled: false
## Chartmuseum Ingress labels
##
#   labels:
#     dns: "route53"

## Chartmuseum Ingress annotations
##
#   annotations:
#     kubernetes.io/ingress.class: nginx
#     kubernetes.io/tls-acme: "true"

## Chartmuseum Ingress hostnames
## Must be provided if Ingress is enabled
##
#   hosts:
#     chartmuseum.domain.com:
#         - /charts
#         - /index.yaml

## Chartmuseum Ingress TLS configuration
## Secrets must be manually created in the namespace
##
#   tls:
#   - secretName: chartmuseum-server-tls
#     hosts:
#     - chartmuseum.domain.com

# Adding secrets to tiller is not a great option, so If you want to use an existing
# secret that contains the json file, you can use the following entries
gcp:
  secret:
    enabled: false
    # Name of the secret that contains the encoded json
    name:
    # Secret key that holds the json value.
    key: credentials.json
```

</details>

---

# ChartMuseum Helm Chart

Deploy your own private ChartMuseum.

Please also see https://github.com/kubernetes-helm/chartmuseum

## Table of Content

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Installation](#installation)
  - [Using with Amazon S3](#using-with-amazon-s3)
    - [permissions grant with access keys](#permissions-grant-with-access-keys)
    - [permissions grant with IAM instance profile](#permissions-grant-with-iam-instance-profile)
    - [permissions grant with IAM assumed role](#permissions-grant-with-iam-assumed-role)
  - [Using with Google Cloud Storage](#using-with-google-cloud-storage)
  - [Using with Microsoft Azure Blob Storage](#using-with-microsoft-azure-blob-storage)
  - [Using with Alibaba Cloud OSS Storage](#using-with-alibaba-cloud-oss-storage)
  - [Using with local filesystem storage](#using-with-local-filesystem-storage)
    - [Example storage class](#example-storage-class)
- [Uninstall](#uninstall)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Prerequisites

- Kubernetes with extensions/v1beta1 available
- [If enabled] A persistent storage resource and RW access to it
- [If enabled] Kubernetes StorageClass for dynamic provisioning

## Configuration

By default this chart will not have persistent storage, and the API service
will be _DISABLED_. This protects against unauthorized access to the API
with default configuration values.

In addition, by default, pod `securityContext.fsGroup` is set to `1000`. This
is the user/group that the ChartMuseum container runs as, and is used to
enable local persitant storage. If your cluster has DenySecurityContext enabled,
you can set `securityContext` to `{}` and still use this chart with one of
the cloud storage options.

For a more robust solution supply helm install with a custom values.yaml
You are also required to create the StorageClass resource ahead of time:

```
kubectl create -f /path/to/storage_class.yaml
```

The following table lists common configurable parameters of the chart and
their default values. See values.yaml for all available options.

| Parameter                              | Description                                                        | Default                      |
| -------------------------------------- | ------------------------------------------------------------------ | ---------------------------- |
| `image.pullPolicy`                     | Container pull policy                                              | `IfNotPresent`               |
| `image.repository`                     | Container image to use                                             | `chartmuseum/chartmuseum`    |
| `image.tag`                            | Container image tag to deploy                                      | `v0.8.0`                     |
| `persistence.accessMode`               | Access mode to use for PVC                                         | `ReadWriteOnce`              |
| `persistence.enabled`                  | Whether to use a PVC for persistent storage                        | `false`                      |
| `persistence.size`                     | Amount of space to claim for PVC                                   | `8Gi`                        |
| `persistence.labels`                   | Additional labels for PVC                                          | `{}`                         |
| `persistence.storageClass`             | Storage Class to use for PVC                                       | `-`                          |
| `persistence.volumeName`               | Volume to use for PVC                                              | ``                           |
| `persistence.pv.enabled`               | Whether to use a PV for persistent storage                         | `false`                      |
| `persistence.pv.capacity.storage`      | Storage size to use for PV                                         | `8Gi`                        |
| `persistence.pv.accessMode`            | Access mode to use for PV                                          | `ReadWriteOnce`              |
| `persistence.pv.nfs.server`            | NFS server for PV                                                  | ``                           |
| `persistence.pv.nfs.path`              | Storage Path                                                       | ``                           |
| `persistence.pv.pvname`                | Custom name for private volume                                     | ``                           |
| `replicaCount`                         | k8s replicas                                                       | `1`                          |
| `resources.limits.cpu`                 | Container maximum CPU                                              | `100m`                       |
| `resources.limits.memory`              | Container maximum memory                                           | `128Mi`                      |
| `resources.requests.cpu`               | Container requested CPU                                            | `80m`                        |
| `resources.requests.memory`            | Container requested memory                                         | `64Mi`                       |
| `serviceAccount.create`                | If true, create the service account                                | `false`                      |
| `serviceAccount.name`                  | Name of the serviceAccount to create or use                        | `{{ chartmuseum.fullname }}` |
| `securityContext`                      | Map of securityContext for the pod                                 | `{ fsGroup: 1000 }`          |
| `nodeSelector`                         | Map of node labels for pod assignment                              | `{}`                         |
| `tolerations`                          | List of node taints to tolerate                                    | `[]`                         |
| `affinity`                             | Map of node/pod affinities                                         | `{}`                         |
| `env.open.STORAGE`                     | Storage Backend to use                                             | `local`                      |
| `env.open.ALIBABA_BUCKET`              | Bucket to store charts in for Alibaba                              | ``                           |
| `env.open.ALIBABA_PREFIX`              | Prefix to store charts under for Alibaba                           | ``                           |
| `env.open.ALIBABA_ENDPOINT`            | Alternative Alibaba endpoint                                       | ``                           |
| `env.open.ALIBABA_SSE`                 | Server side encryption algorithm to use                            | ``                           |
| `env.open.AMAZON_BUCKET`               | Bucket to store charts in for AWS                                  | ``                           |
| `env.open.AMAZON_ENDPOINT`             | Alternative AWS endpoint                                           | ``                           |
| `env.open.AMAZON_PREFIX`               | Prefix to store charts under for AWS                               | ``                           |
| `env.open.AMAZON_REGION`               | Region to use for bucket access for AWS                            | ``                           |
| `env.open.AMAZON_SSE`                  | Server side encryption algorithm to use                            | ``                           |
| `env.open.GOOGLE_BUCKET`               | Bucket to store charts in for GCP                                  | ``                           |
| `env.open.GOOGLE_PREFIX`               | Prefix to store charts under for GCP                               | ``                           |
| `env.open.STORAGE_MICROSOFT_CONTAINER` | Container to store charts under for MS                             | ``                           |
| `env.open.STORAGE_MICROSOFT_PREFIX`    | Prefix to store charts under for MS                                | ``                           |
| `env.open.STORAGE_OPENSTACK_CONTAINER` | Container to store charts for openstack                            | ``                           |
| `env.open.STORAGE_OPENSTACK_PREFIX`    | Prefix to store charts for openstack                               | ``                           |
| `env.open.STORAGE_OPENSTACK_REGION`    | Region of openstack container                                      | ``                           |
| `env.open.STORAGE_OPENSTACK_CACERT`    | Path to a CA cert bundle for openstack                             | ``                           |
| `env.open.CHART_POST_FORM_FIELD_NAME`  | Form field to query for chart file content                         | ``                           |
| `env.open.PROV_POST_FORM_FIELD_NAME`   | Form field to query for chart provenance                           | ``                           |
| `env.open.DEPTH`                       | levels of nested repos for multitenancy.                           | `0`                          |
| `env.open.DEBUG`                       | Show debug messages                                                | `false`                      |
| `env.open.LOG_JSON`                    | Output structured logs in JSON                                     | `true`                       |
| `env.open.DISABLE_STATEFILES`          | Disable use of index-cache.yaml                                    | `false`                      |
| `env.open.DISABLE_METRICS`             | Disable Prometheus metrics                                         | `true`                       |
| `env.open.DISABLE_API`                 | Disable all routes prefixed with /api                              | `true`                       |
| `env.open.ALLOW_OVERWRITE`             | Allow chart versions to be re-uploaded                             | `false`                      |
| `env.open.CHART_URL`                   | Absolute url for .tgzs in index.yaml                               | ``                           |
| `env.open.AUTH_ANONYMOUS_GET`          | Allow anon GET operations when auth is used                        | `false`                      |
| `env.open.CONTEXT_PATH`                | Set the base context path                                          | ``                           |
| `env.open.INDEX_LIMIT`                 | Parallel scan limit for the repo indexer                           | ``                           |
| `env.open.CACHE`                       | Cache store, can be one of: redis                                  | ``                           |
| `env.open.CACHE_REDIS_ADDR`            | Address of Redis service (host:port)                               | ``                           |
| `env.open.CACHE_REDIS_DB`              | Redis database to be selected after connect                        | `0`                          |
| `env.field`                            | Expose pod information to containers through environment variables | ``                           |
| `env.secret.BASIC_AUTH_USER`           | Username for basic HTTP authentication                             | ``                           |
| `env.secret.BASIC_AUTH_PASS`           | Password for basic HTTP authentication                             | ``                           |
| `env.secret.CACHE_REDIS_PASSWORD`      | Redis requirepass server configuration                             | ``                           |
| `gcp.secret.enabled`                   | Flag for the GCP service account                                   | `false`                      |
| `gcp.secret.name`                      | Secret name for the GCP json file                                  | ``                           |
| `gcp.secret.key`                       | Secret key for te GCP json file                                    | `credentials.json`           |
| `service.type`                         | Kubernetes Service type                                            | `ClusterIP`                  |
| `service.clusterIP`                    | Static clusterIP or None for headless services                     | `nil`                        |
| `service.servicename`                  | Custom name for service                                            | ``                           |
| `service.labels`                       | Additional labels for service                                      | `{}`                         |
| `deployment.labels`                    | Additional labels for deployment                                   | `{}`                         |
| `deployment.matchlabes`                | Match labels for deployment selector                               | `{}`                         |

Specify each parameter using the `--set key=value[,key=value]` argument to
`helm install`.

## Installation

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

### Using with Amazon S3

Make sure your environment is properly setup to access `my-s3-bucket`

You need at least the following permissions inside your IAM Policy

```yaml
{
  'Version': '2012-10-17',
  'Statement':
    [
      {
        'Sid': 'AllowListObjects',
        'Effect': 'Allow',
        'Action': ['s3:ListBucket'],
        'Resource': 'arn:aws:s3:::my-s3-bucket',
      },
      {
        'Sid': 'AllowObjectsCRUD',
        'Effect': 'Allow',
        'Action': ['s3:DeleteObject', 's3:GetObject', 's3:PutObject'],
        'Resource': 'arn:aws:s3:::my-s3-bucket/*',
      },
    ],
}
```

You can grant it to `chartmuseum` by several ways:

#### permissions grant with access keys

Grant permissions to `special user` and us it's access keys for auth on aws

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: amazon
    STORAGE_AMAZON_BUCKET: my-s3-bucket
    STORAGE_AMAZON_PREFIX:
    STORAGE_AMAZON_REGION: us-east-1
  secret:
    AWS_ACCESS_KEY_ID: '********' ## aws access key id value
    AWS_SECRET_ACCESS_KEY: '********' ## aws access key secret value
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

#### permissions grant with IAM instance profile

You can grant permissions to k8s node IAM instance profile.
For more information read this [article](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html)

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: amazon
    STORAGE_AMAZON_BUCKET: my-s3-bucket
    STORAGE_AMAZON_PREFIX:
    STORAGE_AMAZON_REGION: us-east-1
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

#### permissions grant with IAM assumed role

To provide access with assumed role you need to install [kube2iam](https://github.com/kubernetes/charts/tree/master/stable/kube2iam)
and create role with granded permissions.

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: amazon
    STORAGE_AMAZON_BUCKET: my-s3-bucket
    STORAGE_AMAZON_PREFIX:
    STORAGE_AMAZON_REGION: us-east-1
replica:
  annotations:
    iam.amazonaws.com/role: '{assumed role name}'
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

### Using with Google Cloud Storage

Make sure your environment is properly setup to access `my-gcs-bucket`

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: google
    STORAGE_GOOGLE_BUCKET: my-gcs-bucket
    STORAGE_GOOGLE_PREFIX:
```

### Using with Google Cloud Storage and a Google Service Account

A Google service account credentials are stored in a json file. There are two approaches here. Ideally you don't want to send your secrets to tiller. In that case, before installing this chart, you should create a secret with those credentials:

```shell
kubectl create secret generic chartmuseum-secret --from-file=credentials.json="my-project-45e35d85a593.json"
```

Then you can either use a `VALUES` yaml with your values or set those values in the command line:

```shell
helm install stable/chartmuseum --debug  --set gcp.secret.enabled=true,env.open.STORAGE=google,env.open.DISABLE_API=false,env.open.STORAGE_GOOGLE_BUCKET=my-gcp-chartmuseum,gcp.secret.name=chartmuseum-secret
```

If you prefer to use a yaml file:

```yaml
env:
  open:
    STORAGE: google
    STORAGE_GOOGLE_BUCKET: my-gcs-bucket
    STORAGE_GOOGLE_PREFIX:

gcp:
  secret:
    enabled: true
    name: chartmuseum-secret
    key: credentials.json
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

In case that you don't mind adding your secret to tiller (you shouldn't do it), this are the commands

```yaml
env:
  open:
    STORAGE: google
    STORAGE_GOOGLE_BUCKET: my-gcs-bucket
    STORAGE_GOOGLE_PREFIX:
  secret:
    GOOGLE_CREDENTIALS_JSON: my-json-file-base64-encoded
gcp:
  secret:
    enabled: true
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

To set the values directly in the command line, use the follosing command. Note that we have to base64 encode the json file because we cannot pass a multi-line text as a value.

```shell
export JSONKEY=$(cat my-project-77e35d85a593.json | base64)
helm install stable/chartmuseum --debug  --set gcp.secret.enabled=true,env.secret.GOOGLE_CREDENTIALS_JSON=${JSONKEY},env.open.STORAGE=google,env.open.DISABLE_API=false,env.open.STORAGE_GOOGLE_BUCKET=my-gcp-chartmuseum
```

### Using with Microsoft Azure Blob Storage

Make sure your environment is properly setup to access `mycontainer`.

To do so, you must set the following env vars:

- `AZURE_STORAGE_ACCOUNT`
- `AZURE_STORAGE_ACCESS_KEY`

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: microsoft
    STORAGE_MICROSOFT_CONTAINER: mycontainer
    # prefix to store charts for microsoft storage backend
    STORAGE_MICROSOFT_PREFIX:
  secret:
    AZURE_STORAGE_ACCOUNT: '********' ## azure storage account
    AZURE_STORAGE_ACCESS_KEY: '********' ## azure storage account access key
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

### Using with Alibaba Cloud OSS Storage

Make sure your environment is properly setup to access `my-oss-bucket`.

To do so, you must set the following env vars:

- `ALIBABA_CLOUD_ACCESS_KEY_ID`
- `ALIBABA_CLOUD_ACCESS_KEY_SECRET`

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: alibaba
    STORAGE_ALIBABA_BUCKET: my-oss-bucket
    STORAGE_ALIBABA_PREFIX:
    STORAGE_ALIBABA_ENDPOINT: oss-cn-beijing.aliyuncs.com
  secret:
    ALIBABA_CLOUD_ACCESS_KEY_ID: '********' ## alibaba OSS access key id
    ALIBABA_CLOUD_ACCESS_KEY_SECRET: '********' ## alibaba OSS access key secret
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

### Using with Openstack Object Storage

Make sure your environment is properly setup to access `mycontainer`.

To do so, you must set the following env vars (depending on your openstack version):

- `OS_AUTH_URL`
- either `OS_PROJECT_NAME` or `OS_TENANT_NAME` or `OS_PROJECT_ID` or `OS_TENANT_ID`
- either `OS_DOMAIN_NAME` or `OS_DOMAIN_ID`
- either `OS_USERNAME` or `OS_USERID`
- `OS_PASSWORD`

Specify `custom.yaml` with such values

```yaml
env:
  open:
    STORAGE: openstack
    STORAGE_OPENSTACK_CONTAINER: mycontainer
    STORAGE_OPENSTACK_PREFIX:
    STORAGE_OPENSTACK_REGION: YOURREGION
  secret:
    OS_AUTH_URL: https://myauth.url.com/v2.0/
    OS_TENANT_ID: yourtenantid
    OS_USERNAME: yourusername
    OS_PASSWORD: yourpassword
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

### Using with local filesystem storage

By default chartmuseum uses local filesystem storage.
But on pod recreation it will lose all charts, to prevent that enable persistent storage.

```yaml
env:
  open:
    STORAGE: local
persistence:
  enabled: true
  accessMode: ReadWriteOnce
  size: 8Gi
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:
  ## Chartmuseum data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
```

Run command to install

```shell
helm install --name my-chartmuseum -f custom.yaml stable/chartmuseum
```

#### Example storage class

Example storage-class.yaml provided here for use with a Ceph cluster.

```
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: storage-volume
provisioner: kubernetes.io/rbd
parameters:
  monitors: "10.11.12.13:4567,10.11.12.14:4567"
  adminId: admin
  adminSecretName: thesecret
  adminSecretNamespace: default
  pool: chartstore
  userId: user
  userSecretName: thesecret
```

## Uninstall

By default, a deliberate uninstall will result in the persistent volume
claim being deleted.

```shell
helm delete my-chartmuseum
```

To delete the deployment and its history:

```shell
helm delete --purge my-chartmuseum
```
