# `@helm-charts/stable-ark`

A Helm chart for ark

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | stable |
| Chart Name          | ark    |
| Chart Version       | 3.0.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: gcr.io/heptio-images/ark
  tag: v0.10.1
  pullPolicy: IfNotPresent

# Only kube2iam: change the AWS_ACCOUNT_ID and HEPTIO_ARK_ROLE_NAME
podAnnotations: {}
#  iam.amazonaws.com/role: arn:aws:iam::<AWS_ACCOUNT_ID>:role/<HEPTIO_ARK_ROLE_NAME>

rbac:
  create: true

resources: {}

serviceAccount:
  server:
    create: true
    name:

tolerations: []

nodeSelector: {}

## Parameters for the ' default' Config resource
## See https://heptio.github.io/ark/v0.9.0/config-definition
configuration:
  persistentVolumeProvider: {}
  #  name:
  #  config:
  #    region:
  #    apiTimeout:

  backupStorageProvider:
    name:
    bucket:
    config: {}
    #  region:
    #  s3ForcePathStyle:
    #  s3Url:
    #  kmsKeyId:
    #  resourceGroup:
    #  storageAccount:

  backupSyncPeriod: 60m
  metricsAddress: ':8085'
  resticTimeout: 1h
  restoreResourcePriorities: namespaces,persistentvolumes,persistentvolumeclaims,secrets,configmaps,serviceaccounts,limitranges,pods
  restoreOnlyMode: false
  # additional key/value pairs to be used as environment variables such as "AWS_CLUSTER_NAME: 'yourcluster.domain.tld'"
  extraEnvVars: {}

# Eg:
# schedules:
#   mybackup:
#     schedule: "0 0 * * *"
#     template:
#       ttl: "240h"
#       includedNamespaces:
#        - foo
schedules: {}

credentials:
  existingSecret:
  useSecret: true
  secretContents: {}

deployRestic: false
```

</details>

---

# Ark-server

This helm chart installs Ark version v0.10.1
https://github.com/heptio/ark/tree/v0.10.1

## Upgrading to v0.10

Ark v0.10.1 introduces breaking changes. The below instructions are based on the [official upgrade guide](https://github.com/heptio/ark/blob/master/docs/upgrading-to-v0.10.md).

1. Pull the latest changes in this chart. If you're using Helm dependencies, update the chart version you're using in your `requirements.yaml` and run `helm dependency update`.

2. Scale down

```sh
kubectl scale -n heptio-ark deploy/ark --replicas 0
```

3. Migrate file structure of your backup storage according to [guide](https://github.com/heptio/ark/blob/master/docs/storage-layout-reorg-v0.10.md)
4. Upgrade your deployment

```sh
helm upgrade --force --namespace heptio-ark ark ./ark
```

## Prerequisites

### Secret for cloud provider credentials

Ark server needs an IAM service account in order to run, if you don't have it you must create it.
Please follow the official documentation: https://heptio.github.io/ark/v0.10.0/install-overview

Don't forget the step to create the secret

```
kubectl create secret generic cloud-credentials --namespace <ARK_NAMESPACE> --from-file cloud=credentials-ark
```

### Configuration

Please change the values.yaml according to your setup
See here for the official documentation https://heptio.github.io/ark/v0.10.0/install-overview

| Parameter            | Description                                                                                                                                                                   | Default | Required                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------- |
| `cloudprovider`      | Cloud provider                                                                                                                                                                | `nil`   | yes                             |
| `bucket`             | Object storage where to store backups                                                                                                                                         | `nil`   | yes                             |
| `region`             | AWS region                                                                                                                                                                    | `nil`   | only if using AWS               |
| `apitimeout`         | Api Timeout                                                                                                                                                                   | `nil`   | only if using Azure             |
| `credentials`        | Credentials                                                                                                                                                                   | `nil`   | Yes (not required for kube2iam) |
| `backupSyncPeriod`   | How frequently Ark queries the object storage to make sure that the appropriate Backup resources have been created for existing backup files.                                 | `60m`   | yes                             |
| `gcSyncPeriod`       | How frequently Ark queries the object storage to delete backup files that have passed their TTL.                                                                              | `60m`   | yes                             |
| `scheduleSyncPeriod` | How frequently Ark checks its Schedule resource objects to see if a backup needs to be initiated                                                                              | `1m`    | yes                             |
| `restoreOnlyMode`    | When RestoreOnly mode is on, functionality for backups, schedules, and expired backup deletion is turned off. Restores are made from existing backup files in object storage. | `false` | yes                             |

| Parameter                                                     | Description                                                                                                                                                                  | Default                                                                                                   |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `image.repository`                                            | Image repository                                                                                                                                                             | `gcr.io/heptio-images/ark`                                                                                |
| `image.tag`                                                   | Image tag                                                                                                                                                                    | `v0.9.1`                                                                                                  |
| `image.pullPolicy`                                            | Image pull policy                                                                                                                                                            | `IfNotPresent`                                                                                            |
| `podAnnotations`                                              | Annotations for the Ark server pod                                                                                                                                           | `{}`                                                                                                      |
| `rbac.create`                                                 | If true, create and use RBAC resources                                                                                                                                       | `true`                                                                                                    |
| `rbac.server.serviceAccount.create`                           | Whether a new service account name that the server will use should be created                                                                                                | `true`                                                                                                    |
| `rbac.server.serviceAccount.name`                             | Service account to be used for the server. If not set and `rbac.server.serviceAccount.create` is `true` a name is generated using the fullname template                      | ``                                                                                                        |
| `resources`                                                   | Resource requests and limits                                                                                                                                                 | `{}`                                                                                                      |
| `tolerations`                                                 | List of node taints to tolerate                                                                                                                                              | `[]`                                                                                                      |
| `nodeSelector`                                                | Node labels for pod assignment                                                                                                                                               | `{}`                                                                                                      |
| `configuration.persistentVolumeProvider.name`                 | The name of the cloud provider the cluster is using for persistent volumes, if any                                                                                           | `{}`                                                                                                      |
| `configuration.persistentVolumeProvider.config.region`        | The cloud provider region (AWS only)                                                                                                                                         | ``                                                                                                        |
| `configuration.persistentVolumeProvider.config.apiTimeout`    | The API timeout (Azure only)                                                                                                                                                 |
| `configuration.backupStorageProvider.name`                    | The name of the cloud provider that will be used to actually store the backups (`aws`, `azure`, `gcp`)                                                                       | ``                                                                                                        |
| `configuration.backupStorageProvider.bucket`                  | The storage bucket where backups are to be uploaded                                                                                                                          | ``                                                                                                        |
| `configuration.backupStorageProvider.config.region`           | The cloud provider region (AWS only)                                                                                                                                         | ``                                                                                                        |
| `configuration.backupStorageProvider.config.s3ForcePathStyle` | Set to `true` for a local storage service like Minio                                                                                                                         | ``                                                                                                        |
| `configuration.backupStorageProvider.config.s3Url`            | S3 url (primarily used for local storage services like Minio)                                                                                                                | ``                                                                                                        |
| `configuration.backupStorageProvider.config.kmsKeyId`         | KMS key for encryption (AWS only)                                                                                                                                            | ``                                                                                                        |
| `configuration.backupSyncPeriod`                              | How frequently Ark queries the object storage to make sure that the appropriate Backup resources have been created for existing backup files                                 | `60m`                                                                                                     |
| `configuration.extraEnvVars`                                  | Key/values for extra environment variables such as AWS_CLUSTER_NAME, etc                                                                                                     | `{}`                                                                                                      |
| `configuration.metricsAddress`                                | Address to expose metrics                                                                                                                                                    | `:8085`                                                                                                   |
| `configuration.restoreResourcePriorities`                     | An ordered list that describes the order in which Kubernetes resource objects should be restored                                                                             | `namespaces,persistentvolumes,persistentvolumeclaims,secrets,configmaps,serviceaccounts,limitranges,pods` |
| `configuration.restoreOnlyMode`                               | When RestoreOnly mode is on, functionality for backups, schedules, and expired backup deletion is turned off. Restores are made from existing backup files in object storage | `false`                                                                                                   |
| `credentials.existingSecret`                                  | If specified and `useSecret` is `true`, uses an existing secret with this name instead of creating one                                                                       | ``                                                                                                        |
| `credentials.useSecret`                                       | Whether a secret should be used. Set this to `false` when using `kube2iam`                                                                                                   | `true`                                                                                                    |
| `credentials.secretContents`                                  | Contents for the credentials secret                                                                                                                                          | `{}`                                                                                                      |
| `schedules`                                                   | A dict of schedules                                                                                                                                                          | `{}`                                                                                                      |

## How to

```
helm install --name ark --namespace heptio-ark ./ark
```

## Remove heptio/ark

Remember that when you remove Ark all backups remain untouched
