# `@helm-charts/stable-janusgraph`

Open source, scalable graph database.

| Field               | Value      |
| ------------------- | ---------- |
| Repository Name     | stable     |
| Chart Name          | janusgraph |
| Chart Version       | 0.2.0      |
| NPM Package Version | 0.1.0      |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for JanusGraph chart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

image:
  repository: gcr.io/cloud-solutions-images/janusgraph
  tag: v2
  pullPolicy: IfNotPresent

## The default configuration provided here uses attached storage for db and indexing
## For a distributed deployment, increase the number of replicas and choose
## a distributed backend for storage and indexing below (i.e. hbase and elasticsearch)
replicaCount: 1

## set any pod specific resource requests here
resources: {}

service:
  type: ClusterIP # Change to LoadBalancer if you plan to access JanusGraph outside k8s cluster
  port: 8182
  serviceAnnotations:
    # the following line is ignored unless unless using a LoadBalancer with GCP
    # cloud.google.com/load-balancer-type: "Internal"

## This chart can deploy the Elasticsearch as a dependency.
## Use this section to provide elasticsearch chart specific values
elasticsearch:
  deploy: false # change to true if you want to deploy Elasticsearch as a requirement along with this chart
  rbac:
    create: true # required for kubernetes >1.7

properties:
  ## use this section to add or adjust JanusGraph properties as needed
  ## all uncommented values in this section will be placed in the janusgraph.properties file

  ## see http://docs.janusgraph.org/0.2.0/storage-backends.html, choose the desired storage backend
  ## (i.e. berkeleyje, cassandra, cassandrathrift, cql, embeddedcassandra, hbase, inmemory )
  ## for Cloud Bigtable choose hbase
  storage.backend: berkeleyje
  storage.directory: /db/berkeley

  ## Google Cloud Bigtable specific configuration
  ## To use Cloud Bigtable, uncomment the following three lines and replace values
  # storage.hbase.ext.google.bigtable.instance.id: <your-cbt-instance> # replace with your Cloud Bigtable Instance ID
  # storage.hbase.ext.google.bigtable.project.id: <your-cbt-project> # replace with your Cloud Bigtable Project ID
  # storage.hbase.ext.hbase.client.connection.impl: com.google.cloud.bigtable.hbase1_x.BigtableConnection # required for using Cloud Bigtable

  ## Indexing/Search backend configuration (see http://docs.janusgraph.org/latest/index-backends.html)
  index.search.backend: lucene
  index.search.directory: /db/searchindex
  ## choose the index backend you want to use: elasticsearch, es, solr or lucene (default "lucene")
  ## if you plan to use elasticsearch, change to "index.search.backend=elasticsearch"
  ## Elasticsearch configuration (see http://docs.janusgraph.org/latest/elasticsearch.html)
  ## This property is only relevant if you are using Elasticsearch as your index backend.
  # index.search.hostname: <your-es-hostname>
  ## Only set this if you plan to use an elasticsearch deployment created outside of this chart,
  ## If you plan to deploy Elasticsearch as a requirement with this helm chart,
  ## then leave this commented out or empty, it will be filled in automatically
  ## other common properties
  # cache.db-cache: true
  # cache.db-cache-clean-wait: 20
  # cache.db-cache-time: 180000
  # cache.db-cache-size: 0.5

## when using local storage and indexing, choose whether to persist day
persistence:
  enabled: true # set to false if you are testing and do not want to persist data
  path: /db
  accessMode: ReadWriteOnce
  size: 4Gi # adjust size as needed depending on the size of local storage and indexing required
  existingClaim: # to reattach to previously used storage, provide an existing claim (or use --set)

## To make adjustments to janusgraph.properties and gremlin-server.yaml, provide a
## custom ConfigMap in your k8s cluster (using the helm created ConfigMap as a base).
configMapOverrideName: ''
```

</details>

---

# JanusGraph

[JanusGraph](http://janusgraph.org/) is a scalable graph database capable of handling an extremely large number of vertices and edges. It has a pluggable architecture that allows for choice of storage and indexing backends.

## Introduction

This chart bootstraps a JanusGraph deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites Details

- Kubernetes 1.7

## Installing the Chart

To install the chart with the release name `my-release`:

```shell
helm install --name my-release stable/janusgraph
```

## Deleting the Chart

To delete the chart with the release name `my-release`:

```shell
helm delete janusgraph --purge
```

## Configuration

Use the default [values.yaml](values.yaml) to gain an understanding of the ways in which you can customize this chart.

Some common properties and their usage have been referenced in the values.yaml file.

Specify your own parameters using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, your own YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```shell
helm install --name my-release -f values.yaml stable/janusgraph
```

JanusGraph specific properties are nested under the properties key.

A full list of JanusGraph properties are defined provided in the [JanusGraph configuration reference](http://docs.janusgraph.org/latest/config-ref.html).

## Persistence

When deployed with local storage, the JanusGraph image stores the graph and index data at the `/db` path of the container.

By default, the chart mounts a [Persistent Volume](http://kubernetes.io/docs/user-guide/persistent-volumes/) at this location. The volume is created using dynamic volume provisioning and will be cleaned up when the chart is deleted. To persist data outside of this lifecycle of this chart, choose a remote [storage backend](http://docs.janusgraph.org/0.2.0/storage-backends.html) or bring your own [Persistent Volume Claim](https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage#create-a-persistentvolumeclaim):

### Existing PersistentVolumeClaim

```bash
$ helm install --set persistence.existingClaim=<your-persistent-volume-claim> stable/janusgraph
```
