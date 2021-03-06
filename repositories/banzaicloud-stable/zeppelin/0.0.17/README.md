# `@helm-charts/banzaicloud-stable-zeppelin`

A Helm chart for Kubernetes

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | zeppelin           |
| Chart Version       | 0.0.17             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for zeppelin
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

image:
  repository: banzaicloud/zeppelin-server
  tag: v0.9.0-k8s-1.0.76
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 2
    memory: 2048
  requests:
    cpu: 500m
    memory: 1024

additionalOptions:

nodeSelector: {}

tolerations: []

affinity: {}

service:
  type: ClusterIP
  internalPort: 8080
  externalPort: 8080
  rpcPort: 38853

userCredentialSecretName: ''
username: 'admin'
password: 'zeppelin'

interpreterConnectTimeout: 120000

ingress:
  baseUrl: '/zeppelin'
  enabled: false
  annotations:
    {}
    #kubernetes.io/ingress.class: traefik
    #ingress.kubernetes.io/ssl-redirect: "false"
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    - '/'
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

logService:
  zeppelinLogLevel: DEBUG
  zeppelinFacility: LOCAL4
  zeppelinLogPattern: '%5p [%d] ({%t} %F[%M]:%L) - %m%n'
  sparkLogLevel: INFO
  sparkFacility: LOCAL4
  sparkLogPattern: '[%p] XXX %c:%L - %m%n'
  applicationLoggerName: application
  applicationLogLevel: INFO
  applicationFacility: LOCAL4
  applicationLogPattern: '[%p] XXX %c:%L - %m%n'

notebookStorage:
  type: ''
  path: ''
azureStorageAccountName: ''
azureStorageAccessKey: ''

sparkSubmitOptions:
  sparkImage:
    name: banzaicloud/zeppelin-spark
    tag: v0.9.0-k8s-1.0.76
  k8sNameSpace: default
  sparkDriverCores: 1
  sparkDriverLimitCores: 1
  sparkExecutorCores: 1
  sparkDriverMemory: 1G
  sparkExecutorMemory: 1G
  dynamicAllocation: false
  shuffleService: false
  driverServiceAccountName: 'spark'
  sparkLocalDir: /tmp/spark-local

sparkEventLogStorage:
  cloudProvider: ''
  logDirectory: ''
  secretName: ''

  awsAccessKeyId: ''
  awsSecretAccessKey: ''

  aliOssEndpoint: ''
  aliOssRegion: ''
  aliAccessKeyId: ''
  aliSecretAccessKey: ''

  azureStorageAccessKey: ''
  azureStorageAccountName: ''

  googleJson: ''

  oracleRegion: ''
  oracleHost: ''
  oracleTenancyId: ''
  oracleUserId: ''
  oracleApiKeyFingerprint: ''
```

</details>

---

# Zeppelin Chart

[Zeppelin](https://zeppelin.apache.org/) is a web based notebook for interactive data analytics with Spark, SQL and Scala.

## Chart Details

## Installing the Chart

To install the chart:

```
$ helm install banzaicloud-stable/zeppelin
```

## Configuration

The following tables lists the configurable parameters of the Zeppelin Sever chart and their default values, in case you want to preserve your Spark application logs on S3 or Azure storage.

| Parameter                            | Required                               | Description                                                                                                                                                       | Example                                                                                                                                                             |
| ------------------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| username                             | no                                     | Admin username, by default is `admin`                                                                                                                             |                                                                                                                                                                     |
| password                             | no                                     | Salted password of admin user, by default is `zeppelin`                                                                                                           | You can salt your own password using [shiro cli tool](http://shiro.apache.org/command-line-hasher.html) `java -jar ~/dev/tools/shiro-tools-hasher-1.3.2-cli.jar -p` |
| userCredentialSecretName             | no                                     | Credentials above are set in a K8s secret. Instead of specifying username & password directly you can provide the name of this K8s secret containing these fields |                                                                                                                                                                     |
| logService.host                      | yes if you want to send logs to Syslog | Host address of Syslog service                                                                                                                                    | 10.44.0.12                                                                                                                                                          |
| logService.zeppelinLogPort           | yes if you want to send logs to Syslog | UDP port for Zeppelin logs                                                                                                                                        | 512                                                                                                                                                                 |
| logService.sparkLogPort              | yes if you want to send logs to Syslog | UDP port for Spark Driver and Executor logs                                                                                                                       | 512                                                                                                                                                                 |
| logService.applicationLogPort        | yes if you want to send logs to Syslog | UDP port for Application logs                                                                                                                                     | 512                                                                                                                                                                 |
| logService.applicationLoggerName     | no                                     | Name of log4j logger for Application logs                                                                                                                         | by default: application                                                                                                                                             |
| logService.zeppelinLogLevel          | no                                     | log4j log level for Zeppelin logs                                                                                                                                 | by default: DEBUG                                                                                                                                                   |
| logService.zeppelinLogPattern        | no                                     | log4j log pattern for Zeppelin logs                                                                                                                               | by default: "%5p [%d] ({%t} %F[%M]:%L) - %m%n"                                                                                                                      |
| logService.sparkLogLevel             | no                                     | log4j log level for Spark logs                                                                                                                                    | by default: INFO                                                                                                                                                    |
| logService.sparkLogPattern           | no                                     | log4j log pattern for Spark logs                                                                                                                                  | by default: "[%p] %c:%L - %m%n"                                                                                                                                     |
| logService.applicationLogLevel       | no                                     | log4j log level for Application logs                                                                                                                              | by default: INFO                                                                                                                                                    |
| logService.applicationLogPattern     | no                                     | log4j log pattern for Application logs                                                                                                                            | by default: "[%p] %c:%L - %m%n"                                                                                                                                     |
| sparkSubmitOptions.eventLogDirectory | yes                                    | the URL to the directory for event logs                                                                                                                           | s3a://yourBucketName<br>wasb://your_blob_container_name@you_storage_account_name.blob.core.windows.net<br>gs://yourBucketName                                       |
| notebookStorage.type                 | no                                     | storage type for notebooks                                                                                                                                        | s3<br>azure<br>gs<br>by default no storage is configured                                                                                                            |
| notebookStorage.path                 | no                                     | storage path for notebooks                                                                                                                                        | bucket name in case of S3 / GS, file share name for Azure                                                                                                           |
| azureStorageAccountName              | only in case of using Azure Storage    | Name of your Azure storage account                                                                                                                                | see Notes                                                                                                                                                           |
| azureStorageAccessKey                | only in case of using Azure Storage    | Access key for your Azure storage account                                                                                                                         | see Notes                                                                                                                                                           |

## Notes

- in case of using S3 and Google Storage, we don't pass credentials and access keys we're using IAM roles and policies on Amazon and Service Account based access on Google Cloud
- in case of Azure the storage account name would be the dns prefix it's created (e.g. **mystorage.blob.core.windows.net** - the name would be mystorage), and you can you either the `primary` or `secondary` keys
