# `@helm-charts/banzaicloud-stable-pipeline`

A Helm chart for Banzai Cloud Pipeline, a solution-oriented application platform which allows enterprises to develop, deploy and securely scale container-based applications in multi- and hybrid-cloud environments.

| Field               | Value              |
| ------------------- | ------------------ |
| Repository Name     | banzaicloud-stable |
| Chart Name          | pipeline           |
| Chart Version       | 0.2.12             |
| NPM Package Version | 0.1.0              |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for pipeline

## Resource definitions for Kubernetes resources
replicaCount: 1
# Upgrade strategy
strategy: {}
image:
  repository: banzaicloud/pipeline
  tag: 0.16.2
  pullPolicy: IfNotPresent

resources:
  requests:
    cpu: 250m
    memory: 256Mi

worker:
  ## Resource definitions for Kubernetes resources
  replicaCount: 1
  # Upgrade strategy
  strategy: {}
  image:
    repository: banzaicloud/pipeline
    tag: 0.16.2
    pullPolicy: IfNotPresent

  resources:
    requests:
      cpu: 250m
      memory: 256Mi

  deploymentLabels: {}
  deploymentAnnotations: {}

service:
  name: pipeline
  type: ClusterIP
  internalPort: 9090
  externalPort: 9090
  tls: true

serviceInternal:
  name: pipeline-internal
  type: ClusterIP
  externalPort: 9091
  internalPort: 9091
  tls: true

ingress:
  enabled: false
  annotations:
    {}
    #traefik.frontend.rule.type: PathPrefix
  hosts:
    []
    # - "/"
    # - "domain.com/xyz"
    # - "domain.com"
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

env: {}

## Additional deployment labels and annotations
## ref: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
deploymentLabels: {}
deploymentAnnotations: {}

# Database configuration
database:
  # Vault role
  role: ''
  dbname: pipeline
  logging: 'true'

## Pipeline metrics, rules and alerting configuration
metrics:
  serviceMonitor:
    enabled: false
    additionalLabels: {}
  alertRulesEnabled: false

## The Pipeline configuration definition
configuration:
  # Pipeline configs
  pipeline:
    bindaddr: 127.0.0.1:9090
    internalBindAddr: 127.0.0.1:9091
    # Url basepath
    # Default is "/pipeline" in the development environment to allow using the UI locally
    basepath: /pipeline

    # Use to redirect url after login
    uipath: /ui/
    signupRedirectPath: /ui/
  pipelineExternalBaseURL: https://example.org/pipeline

  cloudinfo:
    endPointUrl: ''

  anchore:
    enabled: false
    username: admin
    serviceEndpoint: ''
    secretName: ''

  logging:
    logformat: text
    loglevel: debug

  cloud:
    configRetryCount: 30
    configRetrySleep: 15

  # CORS configuration
  cors:
    AllowAllOrigins: false
    AllowOrigins: ['http://localhost:4200']

  statestore:
    path: ''

  # CICD
  cicd:
    url: http://localhost:8000
  # Github
  github:
    token: ''
  # Authentication
  auth:
    dexurl: http://dex/dex
    clientid: ''
    clientsecret: ''
    jwtissueer: https://banzaicloud.com/
    jwtaudience: https://pipeline.banzaicloud.com
    secureCookie: true
    # Domain field for cookies
    cookieDomain: ''
    setCookieDomain: false
    whitelistEnabled: false
  # Database handling
  database:
    autoMigrateEnabled: false

  # Pipeline Helm related configuration
  helm:
    retryAttemp: 30
    retrySleepSeconds: 15
    tillerVersion: 'v2.12.2'
    path: '/cache/helm'

    #helm repo URLs
    stableRepositoryURL: 'https://kubernetes-charts.storage.googleapis.com'
    banzaiRepositoryURL: 'http://kubernetes-charts.banzaicloud.com/branch/master'

  # Pipeline federated monitoring configurations
  monitor:
    enabled: false
    configMap: prometheus-federation
    certSecret: prometheus-federation-secrets
    mountPath: /etc/prometheus/secrets
    grafanaAdminUsername: admin

  loggingOperator:
    chartVersion: ''
    imageTag: 0.1.2

  # DNS service settings
  dns:
    # base domain under which organisation level subdomains will be registered
    domain: example.org
    # Kubernetes namespace which the secret for interacting with external DNS server (Route53) is created into
    secretNamespace: default
    # The interval in minutes at which the garbage collector runs to clean up unused organisation level domains
    gcIntervalMinute: 1
    gcLogLevel: debug

  # AWS Route53 config
  route53:
    # The window before the next AWS Route53 billing period starts when unused organisation level domains (which are older than 12hrs)
    # are cleaned up
    maintenanceWindowMinute: 15

  # Default Amazon region to initialize client
  amazon:
    defaultApiRegion: us-west-1

  # Default Alibaba region to initialize client
  alibaba:
    defaultApiRegion: eu-central-1

  # Pipeline infra environment related settings
  infra:
    namespace: pipeline-system

    # Name of the node pool reserved for infra deployments
    # If you set this property Pipeline will place a taint on all nodes in this node pool and Tiller will be deployed with
    # a node selector and toleration matching nodes from this node pool. Make sure all Infra deployments are setup with
    # the node-affinity and toleration as described in docs/infra-node-pool.md
    #headNodePoolName="head"

    headNodeTaintRetryAttempt: 30
    headNodeTaintRetrySleepSeconds: 5

    forbiddenLabelDomains:
      - k8s.io
      - kubernetes.io
      - google.com
      - coreos.com
      - oraclecloud.com
      - node.info
      - azure.com
      - agentpool
      - storageprofile
      - storagetier

  eks:
    templateLocation: https://raw.githubusercontent.com/banzaicloud/pipeline/master/templates/eks
    ASGFulfillmentTimeout: 10m

  gke:
    resourceDeleteWaitAttempt: 12
    resourceDeleteSleepSeconds: 5

  oke:
    waitAttemptsForNodepoolActive: 60
    sleepSecondsForNodepoolActive: 30

  ark:
    name: ark
    namespace: pipeline-infra
    chart: banzaicloud-stable/ark
    chartVersion: 1.2.2
    image: banzaicloud/ark
    imageTag: v0.9.6
    pullPolicy: IfNotPresent
    syncEnabled: true
    logLevel: info
    bucketSyncInterval: 10m
    restoreSyncInterval: 20s
    backupSyncInterval: 20s
    restoreWaitTimeout: 5m

  servicemesh:
    istioOperatorChartVersion: 0.0.3

  spotguide:
    allowPrereleases: false
    allowPrivateRepos: false
    syncInterval: 5m
    sharedLibraryGitHubOrganization: spotguides

  metrics:
    enabled: false
    port: 9900
    # if true, some metrics have unique labels
    debug: true

  issue:
    type: 'github'
    githubOwner: 'kelly-slater'
    githubRepository: 'the-pipeline-issues'

  spotmetrics:
    enabled: false
    collectionInterval: 30s

  # CA source for automated self sing cert generator
  cert:
    source: file
    path: /sign-ca
    ca:
      key: ''
      cert: ''

  cadence:
    host: ''
    port: 7933
    domain: pipeline

##
## Vault connector settings
##
vault:
  # Vault service endpoint
  serviceAddress: ''
  # The secret that holds the Vault CA cert.
  # If left empty SKIP_VERIFY will be used.
  tlsSecret: ''

##
## Enable Cache persistence store
##
cache:
  persistence:
    enabled: true

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    ## Pipeline StateStore data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 1Gi

statestore:
  persistence:
    enabled: true

    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    # existingClaim:

    ## Pipeline StateStore data Persistent Volume Storage Class
    ## If defined, storageClassName: <storageClass>
    ## If set to "-", storageClassName: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClassName spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
    accessMode: ReadWriteOnce
    size: 128Mi

## This is the MySQL connector related configuration
## If enabled MySQL dependent chart will be installed else you need to prepare
## MySQL by hand or use CloudSQL
##
## mysql image version
## ref: https://hub.docker.com/r/library/mysql/tags/
##
mysql:
  enabled: true
  nameOverride: pipeline-db
  mysqlDatabase: pipeline
  mysqlUser: bonanzabanzai
  ## Default: random 10 character string
  # mysqlPassword:
  initializationFiles:
    cicd-db.sql: |-
      CREATE DATABASE IF NOT EXISTS drone;
      GRANT ALL PRIVILEGES ON drone.* TO 'bonanzabanzai'@'%';
      FLUSH PRIVILEGES;

  ## Enable persistence using Persistent Volume Claims
  ## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
  ##
  persistence:
    enabled: false

##
## CloudSQL configuration
##
cloudsql:
  enabled: false
  instance: ''
  dbName: ''
  dbUserName: ''
  dbUserPass: ''
  image:
    repository: gcr.io/cloudsql-docker/gce-proxy
    tag: 1.11
    pullPolicy: IfNotPresent
```

</details>
