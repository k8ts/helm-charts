# `@helm-charts/incubator-cassandra`

Apache Cassandra is a free and open-source distributed database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | cassandra |
| Chart Version       | 0.1.3     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
## Cassandra image version
## ref: https://hub.docker.com/r/library/cassandra/
image:
  repo: 'cassandra'
  tag: '3'
  pullPolicy: IfNotPresent

## Specify a service type
## ref: http://kubernetes.io/docs/user-guide/services/
service:
  type: ClusterIP

## Persist data to a persitent volume
persistence:
  enabled: true
  ## If defined, volume.beta.kubernetes.io/storage-class: <storageClass>
  ## Default: volume.alpha.kubernetes.io/storage-class: default
  #  storageClass: generic
  accessMode: ReadWriteOnce
  size: 10Gi

## Configure resource requests and limits
## ref: http://kubernetes.io/docs/user-guide/compute-resources/
## Minimum memory for development is 4GB and 2 CPU cores
## Minimum memory for production is 8GB and 4 CPU cores
## ref: http://docs.datastax.com/en/archived/cassandra/2.0/cassandra/architecture/architecturePlanningHardware_c.html
resources:
  requests:
    memory: 4Gi
    cpu: 2
  limits:
    memory: 4Gi
    cpu: 2

## Change cassandra configuration paramaters below:
## ref: http://docs.datastax.com/en/cassandra/3.0/cassandra/configuration/configCassandra_yaml.html
## Recommended max heap size is 1/2 of system memory
## Recommeneed heap new size is 1/4 of max heap size
## ref: http://docs.datastax.com/en/cassandra/3.0/cassandra/operations/opsTuneJVM.html
config:
  cluster_name: cassandra
  cluster_size: 3
  seed_size: 2
  num_tokens: 256
  dc_name: DC1
  rack_name: RAC1
  endpoint_snitch: SimpleSnitch
  max_heap_size: 2048M
  heap_new_size: 512M
  ports:
    cql: 9042
    thrift: 9160
## Configure node selector. Edit code below for adding selector to pods
## ref: https://kubernetes.io/docs/user-guide/node-selection/
# selector:
# nodeSelector:
# cloud.google.com/gke-nodepool: pool-db
```

</details>

---

# Cassandra

A Cassandra Chart for Kubernetes

## Install Chart

To install the Cassandra Chart into your Kubernetes cluster (This Chart requires persistent volume by default, you may need to create a storage class before install chart. To create storage class, see [Persist data](#persist_data) section)

```bash
helm install --namespace "cassandra" -n "cassandra" incubator/cassandra
```

After installation succeeds, you can get a status of Chart

```bash
helm status "cassandra"
```

If you want to delete your Chart, use this command

```bash
helm delete  --purge "cassandra"
```

## Persist data

You need to create `StorageClass` before able to persist data in persistent volume.
To create a `StorageClass` on Google Cloud, run the following

```bash
kubectl create -f sample/create-storage-gce.yaml
```

And set the following values in `values.yaml`

```yaml
persistence:
  enabled: true
```

If you want to create a `StorageClass` on other platform, please see documentation here [https://kubernetes.io/docs/user-guide/persistent-volumes/](https://kubernetes.io/docs/user-guide/persistent-volumes/)

## Install Chart with specific cluster size

By default, this Chart will create a cassandra with 3 nodes. If you want to change the cluster size during installation, you can use `--set config.cluster_size={value}` argument. Or edit `values.yaml`

For example:
Set cluster size to 5

```bash
helm install --namespace "cassandra" -n "cassandra" --set config.cluster_size=5 incubator/cassandra/
```

## Install Chart with specific resource size

By default, this Chart will create a cassandra with CPU 2 vCPU and 4Gi of memory which is suitable for development environment.
If you want to use this Chart for production, I would recommend to update the CPU to 4 vCPU and 16Gi. Also increase size of `max_heap_size` and `heap_new_size`.
To update the settings, edit `values.yaml`

## Install Chart with specific node

Sometime you may need to deploy your cassandra to specific nodes to allocate resources. You can use node selector by edit `nodes.enabled=true` in `values.yaml`
For example, you have 6 vms in node pools and you want to deploy cassandra to node which labeled as `cloud.google.com/gke-nodepool: pool-db`

Set the following values in `values.yaml`

```yaml
nodes:
  enabled: true
  selector:
    nodeSelector:
      cloud.google.com/gke-nodepool: pool-db
```

## Scale cassandra

When you want to change the cluster size of your cassandra, you can use the helm upgrade command.

```bash
helm upgrade --set config.cluster_size=5 cassandra incubator/cassandra
```

## Get cassandra status

You can get your cassandra cluster status by running the command

```bash
kubectl exec -it --namespace cassandra $(kubectl get pods --namespace cassandra -l app=cassandra-cassandra -o jsonpath='{.items[0].metadata.name}') nodetool status
```

Output

```bash
Datacenter: asia-east1
======================
Status=Up/Down
|/ State=Normal/Leaving/Joining/Moving
--  Address    Load       Tokens       Owns (effective)  Host ID                               Rack
UN  10.8.1.11  108.45 KiB  256          66.1%             410cc9da-8993-4dc2-9026-1dd381874c54  a
UN  10.8.4.12  84.08 KiB  256          68.7%             96e159e1-ef94-406e-a0be-e58fbd32a830  c
UN  10.8.3.6   103.07 KiB  256          65.2%             1a42b953-8728-4139-b070-b855b8fff326  b
```

## Benchmark

You can use [cassandra-stress](https://docs.datastax.com/en/cassandra/3.0/cassandra/tools/toolsCStress.html) tool to run the benchmark on the cluster by the following command

```bash
kubectl exec -it --namespace cassandra $(kubectl get pods --namespace cassandra -l app=cassandra-cassandra -o jsonpath='{.items[0].metadata.name}') cassandra-stress
```

Example of `cassandra-stress` argument

- Run both read and write with ration 9:1
- Operator total 1 million keys with uniform distribution
- Use QUORUM for read/write
- Generate 50 threads
- Generate result in graph
- Use NetworkTopologyStrategy with replica factor 2

```bash
cassandra-stress mixed ratio\(write=1,read=9\) n=1000000 cl=QUORUM -pop dist=UNIFORM\(1..1000000\) -mode native cql3 -rate threads=50 -log file=~/mixed_autorate_r9w1_1M.log -graph file=test2.html title=test revision=test2 -schema "replication(strategy=NetworkTopologyStrategy, factor=2)"
```
