# `@helm-charts/presslabs-orchestrator`

A Helm chart for github's mysql orchestrator

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | presslabs    |
| Chart Name          | orchestrator |
| Chart Version       | 0.1.5        |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
replicas: 1
image: quay.io/presslabs/orchestrator:v3.0.13-r29
imagePullPolicy: IfNotPresent

nodeSelector: []
tolerations: []
resources: {}

podDisruptionBudget:
  enabled: true
  maxUnavailable: 1

## nodeAffinity settings
# nodeAffinity:
#   requiredDuringSchedulingIgnoredDuringExecution:
#     nodeSelectorTerms:
#     - matchExpressions:
#       - key: cloud.google.com/gke-preemptible
#         operator: NotIn
#         values:
#         - true

## Anti-Affinity setting. The default "hard" will use pod anti-affinity that is
## requiredDuringSchedulingIgnoredDuringExecution to ensure 2 services don't
## end up on the same node. Setting this to "soft" will use
## preferredDuringSchedulingIgnoredDuringExecution. If set to anything else,
## no anti-affinity rules will be configured.
antiAffinity: 'hard'

persistence:
  enabled: true
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: 'ReadWriteOnce'
  size: 1Gi

service:
  type: ClusterIP
  port: 80
  # nodePort: 3000

topologyUser: orchestrator
# topologyPassword:

# key value map of orchestrator conf directives.
# see: https://github.com/github/orchestrator/blob/master/conf/orchestrator-sample.conf.json
# the following keys are manages and thus cannot be ovewritten:
#   - ListenAddress :3000
#   - MySQLTopologyCredentialsConfigFile /orchestrator/conf/orc-topology.cnf
#   - BackendDB sqlite
#   - SQLite3DataFile /var/lib/orchestrator/orc.db
#   - RaftEnabled true
#   - RaftDataDir /var/lib/orchestrator
#   - RaftBind $HOSTNAME
#   - RaftNodes The statefullset members
orchestratorConf:
  Debug: false
```

</details>
