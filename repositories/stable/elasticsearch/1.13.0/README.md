# `@helm-charts/stable-elasticsearch`

Flexible and powerful open source, distributed real-time search and analytics engine.

| Field               | Value         |
| ------------------- | ------------- |
| Repository Name     | stable        |
| Chart Name          | elasticsearch |
| Chart Version       | 1.13.0        |
| NPM Package Version | 0.1.0         |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for elasticsearch.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
appVersion: '6.4.2'

## Define serviceAccount names for components. Defaults to component's fully qualified name.
##
serviceAccounts:
  client:
    create: true
    name:
  master:
    create: true
    name:
  data:
    create: true
    name:

## Specify if a Pod Security Policy for node-exporter must be created
## Ref: https://kubernetes.io/docs/concepts/policy/pod-security-policy/
##
podSecurityPolicy:
  enabled: false

image:
  repository: 'docker.elastic.co/elasticsearch/elasticsearch-oss'
  tag: '6.4.2'
  pullPolicy: 'IfNotPresent'
  # If specified, use these secrets to access the image
  # pullSecrets:
  #   - registry-secret

initImage:
  repository: 'busybox'
  tag: 'latest'
  pullPolicy: 'Always'

cluster:
  name: 'elasticsearch'
  # If you want X-Pack installed, switch to an image that includes it, enable this option and toggle the features you want
  # enabled in the environment variables outlined in the README
  xpackEnable: false
  # Some settings must be placed in a keystore, so they need to be mounted in from a secret.
  # Use this setting to specify the name of the secret
  # keystoreSecret: eskeystore
  config: {}
  # Custom parameters, as string, to be added to ES_JAVA_OPTS environment variable
  additionalJavaOpts: ''
  env:
    # IMPORTANT: https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#minimum_master_nodes
    # To prevent data loss, it is vital to configure the discovery.zen.minimum_master_nodes setting so that each master-eligible
    # node knows the minimum number of master-eligible nodes that must be visible in order to form a cluster.
    MINIMUM_MASTER_NODES: '2'

client:
  name: client
  replicas: 2
  serviceType: ClusterIP
  loadBalancerIP: {}
  loadBalancerSourceRanges: {}
  ## (dict) If specified, apply these annotations to the client service
  #  serviceAnnotations:
  #    example: client-svc-foo
  heapSize: '512m'
  antiAffinity: 'soft'
  nodeAffinity: {}
  nodeSelector: {}
  tolerations: []
  resources:
    limits:
      cpu: '1'
      # memory: "1024Mi"
    requests:
      cpu: '25m'
      memory: '512Mi'
  priorityClassName: ''
  ## (dict) If specified, apply these annotations to each client Pod
  # podAnnotations:
  #   example: client-foo
  podDisruptionBudget:
    enabled: false
    minAvailable: 1
    # maxUnavailable: 1

master:
  name: master
  exposeHttp: false
  replicas: 3
  heapSize: '512m'
  persistence:
    enabled: true
    accessMode: ReadWriteOnce
    name: data
    size: '4Gi'
    # storageClass: "ssd"
  antiAffinity: 'soft'
  nodeAffinity: {}
  nodeSelector: {}
  tolerations: []
  resources:
    limits:
      cpu: '1'
      # memory: "1024Mi"
    requests:
      cpu: '25m'
      memory: '512Mi'
  priorityClassName: ''
  ## (dict) If specified, apply these annotations to each master Pod
  # podAnnotations:
  #   example: master-foo
  podDisruptionBudget:
    enabled: false
    minAvailable: 2 # Same as `cluster.env.MINIMUM_MASTER_NODES`
    # maxUnavailable: 1
  updateStrategy:
    type: OnDelete

data:
  name: data
  exposeHttp: false
  replicas: 2
  heapSize: '1536m'
  persistence:
    enabled: true
    accessMode: ReadWriteOnce
    name: data
    size: '30Gi'
    # storageClass: "ssd"
  terminationGracePeriodSeconds: 3600
  antiAffinity: 'soft'
  nodeAffinity: {}
  nodeSelector: {}
  tolerations: []
  resources:
    limits:
      cpu: '1'
      # memory: "2048Mi"
    requests:
      cpu: '25m'
      memory: '1536Mi'
  priorityClassName: ''
  ## (dict) If specified, apply these annotations to each data Pod
  # podAnnotations:
  #   example: data-foo
  podDisruptionBudget:
    enabled: false
    # minAvailable: 1
    maxUnavailable: 1
  updateStrategy:
    type: OnDelete
  hooks: # post-start and pre-stop hooks
    drain: # drain the node before stopping it and re-integrate it into the cluster after start
      enabled: true

## Additional init containers
extraInitContainers: |
```

</details>

---

# Elasticsearch Helm Chart

This chart uses a standard Docker image of Elasticsearch (docker.elastic.co/elasticsearch/elasticsearch-oss) and uses a service pointing to the master's transport port for service discovery.
Elasticsearch does not communicate with the Kubernetes API, hence no need for RBAC permissions.

## Warning for previous users

If you are currently using an earlier version of this Chart you will need to redeploy your Elasticsearch clusters. The discovery method used here is incompatible with using RBAC.
If you are upgrading to Elasticsearch 6 from the 5.5 version used in this chart before, please note that your cluster needs to do a full cluster restart.
The simplest way to do that is to delete the installation (keep the PVs) and install this chart again with the new version.
If you want to avoid doing that upgrade to Elasticsearch 5.6 first before moving on to Elasticsearch 6.0.

## Prerequisites Details

- Kubernetes 1.6+
- PV dynamic provisioning support on the underlying infrastructure

## StatefulSets Details

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

## StatefulSets Caveats

- https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#limitations

## Todo

- Implement TLS/Auth/Security
- Smarter upscaling/downscaling
- Solution for memory locking

## Chart Details

This chart will do the following:

- Implemented a dynamically scalable elasticsearch cluster using Kubernetes StatefulSets/Deployments
- Multi-role deployment: master, client (coordinating) and data nodes
- Statefulset Supports scaling down without degrading the cluster

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm install --name my-release stable/elasticsearch
```

## Deleting the Charts

Delete the Helm deployment as normal

```
$ helm delete my-release
```

Deletion of the StatefulSet doesn't cascade to deleting associated PVCs. To delete them:

```
$ kubectl delete pvc -l release=my-release,component=data
```

## Configuration

The following table lists the configurable parameters of the elasticsearch chart and their default values.

| Parameter                                                                                 | Description                                                           | Default                                             |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| `appVersion`                                                                              | Application Version (Elasticsearch)                                   | `6.4.2`                                             |
| `image.repository`                                                                        | Container image name                                                  | `docker.elastic.co/elasticsearch/elasticsearch-oss` |
| `image.tag`                                                                               | Container image tag                                                   | `6.4.2`                                             |
| `image.pullPolicy`                                                                        | Container pull policy                                                 | `IfNotPresent`                                      |
| `initImage.repository`                                                                    | Init container image name                                             | `busybox`                                           |
| `initImage.tag`                                                                           | Init container image tag                                              | `latest`                                            |
| `initImage.pullPolicy`                                                                    | Init container pull policy                                            | `Always`                                            |
| `cluster.name`                                                                            | Cluster name                                                          | `elasticsearch`                                     |
| `cluster.xpackEnable`                                                                     | Writes the X-Pack configuration options to the configuration file     | `false`                                             |
| `cluster.config`                                                                          | Additional cluster config appended                                    | `{}`                                                |
| `cluster.keystoreSecret`                                                                  | Name of secret holding secure config options in an es keystore        | `nil`                                               |
| `cluster.env`                                                                             | Cluster environment variables                                         | `{MINIMUM_MASTER_NODES: "2"}`                       |
| `cluster.additionalJavaOpts`                                                              | Cluster parameters to be added to `ES_JAVA_OPTS` environment variable | `""`                                                |
| `client.name`                                                                             | Client component name                                                 | `client`                                            |
| `client.replicas`                                                                         | Client node replicas (deployment)                                     | `2`                                                 |
| `client.resources`                                                                        | Client node resources requests & limits                               | `{} - cpu limit must be an integer`                 |
| `client.priorityClassName`                                                                | Client priorityClass                                                  | `nil`                                               |
| `client.heapSize`                                                                         | Client node heap size                                                 | `512m`                                              |
| `client.podAnnotations`                                                                   | Client Deployment annotations                                         | `{}`                                                |
| `client.nodeSelector`                                                                     | Node labels for client pod assignment                                 | `{}`                                                |
| `client.tolerations`                                                                      | Client tolerations                                                    | `[]`                                                |
| `client.serviceAnnotations`                                                               | Client Service annotations                                            | `{}`                                                |
| `client.serviceType`                                                                      | Client service type                                                   | `ClusterIP`                                         |
| `client.loadBalancerIP`                                                                   | Client loadBalancerIP                                                 | `{}`                                                |
| `client.loadBalancerSourceRanges`                                                         | Client loadBalancerSourceRanges                                       | `{}`                                                |
| `client.antiAffinity`                                                                     | Client anti-affinity policy                                           | `soft`                                              |
| `client.nodeAffinity`                                                                     | Client node affinity policy                                           | `{}`                                                |
| `master.exposeHttp`                                                                       | Expose http port 9200 on master Pods for monitoring, etc              | `false`                                             |
| `master.name`                                                                             | Master component name                                                 | `master`                                            |
| `master.replicas`                                                                         | Master node replicas (deployment)                                     | `2`                                                 |
| `master.resources`                                                                        | Master node resources requests & limits                               | `{} - cpu limit must be an integer`                 |
| `master.priorityClassName`                                                                | Master priorityClass                                                  | `nil`                                               |
| `master.podAnnotations`                                                                   | Master Deployment annotations                                         | `{}`                                                |
| `master.nodeSelector`                                                                     | Node labels for master pod assignment                                 | `{}`                                                |
| `master.tolerations`                                                                      | Master tolerations                                                    | `[]`                                                |
| `master.heapSize`                                                                         | Master node heap size                                                 | `512m`                                              |
| `master.name`                                                                             | Master component name                                                 | `master`                                            |
| `master.persistence.enabled`                                                              | Master persistent enabled/disabled                                    | `true`                                              |
| `master.persistence.name`                                                                 | Master statefulset PVC template name                                  | `data`                                              |
| `master.persistence.size`                                                                 | Master persistent volume size                                         | `4Gi`                                               |
| `master.persistence.storageClass`                                                         | Master persistent volume Class                                        | `nil`                                               |
| `master.persistence.accessMode`                                                           | Master persistent Access Mode                                         | `ReadWriteOnce`                                     |
| `master.antiAffinity`                                                                     | Master anti-affinity policy                                           | `soft`                                              |
| `master.nodeAffinity`                                                                     | Master node affinity policy                                           | `{}`                                                |
| `data.exposeHttp`                                                                         | Expose http port 9200 on data Pods for monitoring, etc                | `false`                                             |
| `data.replicas`                                                                           | Data node replicas (statefulset)                                      | `2`                                                 |
| `data.resources`                                                                          | Data node resources requests & limits                                 | `{} - cpu limit must be an integer`                 |
| `data.priorityClassName`                                                                  | Data priorityClass                                                    | `nil`                                               |
| `data.heapSize`                                                                           | Data node heap size                                                   | `1536m`                                             |
| `data.hooks.drain.enabled | Data nodes: Enable drain pre-stop and post-start hook |`true` |
| `data.persistence.enabled`                                                                | Data persistent enabled/disabled                                      | `true`                                              |
| `data.persistence.name`                                                                   | Data statefulset PVC template name                                    | `data`                                              |
| `data.persistence.size`                                                                   | Data persistent volume size                                           | `30Gi`                                              |
| `data.persistence.storageClass`                                                           | Data persistent volume Class                                          | `nil`                                               |
| `data.persistence.accessMode`                                                             | Data persistent Access Mode                                           | `ReadWriteOnce`                                     |
| `data.podAnnotations`                                                                     | Data StatefulSet annotations                                          | `{}`                                                |
| `data.nodeSelector`                                                                       | Node labels for data pod assignment                                   | `{}`                                                |
| `data.tolerations`                                                                        | Data tolerations                                                      | `[]`                                                |
| `data.terminationGracePeriodSeconds`                                                      | Data termination grace period (seconds)                               | `3600`                                              |
| `data.antiAffinity`                                                                       | Data anti-affinity policy                                             | `soft`                                              |
| `data.nodeAffinity`                                                                       | Data node affinity policy                                             | `{}`                                                |
| `extraInitContainers`                                                                     | Additional init container passed through the tpl                      | ``                                                  |
| `podSecurityPolicy.enabled`                                                               | Specify if a Pod Security Policy must be created                      | `false`                                             |
| `serviceAccounts.client.create`                                                           | If true, create the client service account                            | `true`                                              |
| `serviceAccounts.client.name`                                                             | Name of the client service account to use or create                   | `{{ elasticsearch.client.fullname }}`               |
| `serviceAccounts.master.create`                                                           | If true, create the master service account                            | `true`                                              |
| `serviceAccounts.master.name`                                                             | Name of the master service account to use or create                   | `{{ elasticsearch.master.fullname }}`               |
| `serviceAccounts.data.create`                                                             | If true, create the data service account                              | `true`                                              |
| `serviceAccounts.data.name`                                                               | Name of the data service account to use or create                     | `{{ elasticsearch.data.fullname }}`                 |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

In terms of Memory resources you should make sure that you follow that equation:

- `${role}HeapSize < ${role}MemoryRequests < ${role}MemoryLimits`

The YAML value of cluster.config is appended to elasticsearch.yml file for additional customization ("script.inline: on" for example to allow inline scripting)

# Deep dive

## Application Version

This chart aims to support Elasticsearch v2 to v6 deployments by specifying the `values.yaml` parameter `appVersion`.

### Version Specific Features

- Memory Locking _(variable renamed)_
- Ingest Node _(v5)_
- X-Pack Plugin _(v5)_

Upgrade paths & more info: https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html

## Mlocking

This is a limitation in kubernetes right now. There is no way to raise the
limits of lockable memory, so that these memory areas won't be swapped. This
would degrade performance heavily. The issue is tracked in
[kubernetes/#3595](https://github.com/kubernetes/kubernetes/issues/3595).

```
[WARN ][bootstrap] Unable to lock JVM Memory: error=12,reason=Cannot allocate memory
[WARN ][bootstrap] This can result in part of the JVM being swapped out.
[WARN ][bootstrap] Increase RLIMIT_MEMLOCK, soft limit: 65536, hard limit: 65536
```

## Minimum Master Nodes

> The minimum_master_nodes setting is extremely important to the stability of your cluster. This setting helps prevent split brains, the existence of two masters in a single cluster.

> When you have a split brain, your cluster is at danger of losing data. Because the master is considered the supreme ruler of the cluster, it decides when new indices can be created, how shards are moved, and so forth. If you have two masters, data integrity becomes perilous, since you have two nodes that think they are in charge.

> This setting tells Elasticsearch to not elect a master unless there are enough master-eligible nodes available. Only then will an election take place.

> This setting should always be configured to a quorum (majority) of your master-eligible nodes. A quorum is (number of master-eligible nodes / 2) + 1

More info: https://www.elastic.co/guide/en/elasticsearch/guide/1.x/_important_configuration_changes.html#_minimum_master_nodes

# Client and Coordinating Nodes

Elasticsearch v5 terminology has updated, and now refers to a `Client Node` as a `Coordinating Node`.

More info: https://www.elastic.co/guide/en/elasticsearch/reference/5.5/modules-node.html#coordinating-node

## Enabling elasticsearch interal monitoring

Requires version 6.3+ and standard non `oss` repository defined. Starting with 6.3 Xpack is partially free and enabled by default. You need to set a new config to enable the collection of these internal metrics. (https://www.elastic.co/guide/en/elasticsearch/reference/6.3/monitoring-settings.html)

To do this through this helm chart override with the three following changes:

```
image.repository: docker.elastic.co/elasticsearch/elasticsearch
cluster.xpackEnable: true
cluster.env.XPACK_MONITORING_ENABLED: true
```

Note: to see these changes you will need to update your kibana repo to `image.repository: docker.elastic.co/kibana/kibana` instead of the `oss` version

## Select right storage class for SSD volumes

### GCE + Kubernetes 1.5

Create StorageClass for SSD-PD

```
$ kubectl create -f - <<EOF
kind: StorageClass
apiVersion: extensions/v1beta1
metadata:
  name: ssd
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
EOF
```

Create cluster with Storage class `ssd` on Kubernetes 1.5+

```
$ helm install stable/elasticsearch --name my-release --set data.persistence.storageClass=ssd,data.storage=100Gi
```

### Usage of the `tpl` Function

The `tpl` function allows us to pass string values from `values.yaml` through the templating engine. It is used for the following values:

- `extraInitContainers`

It is important that these values be configured as strings. Otherwise, installation will fail.
