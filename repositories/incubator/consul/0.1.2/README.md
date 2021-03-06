# `@helm-charts/incubator-consul`

Hashicorp Consul Helm chart for Kubernetes.

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | consul    |
| Chart Version       | 0.1.2     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for consul.
# This is a YAML-formatted file.
# Declare name/value pairs to be passed into your templates.
# name: value

Name: consul
HttpPort: 8500
RpcPort: 8400
SerflanPort: 8301
SerflanUdpPort: 8301
SerfwanPort: 8302
SerfwanUdpPort: 8302
ServerPort: 8300
ConsulDnsPort: 8600
Component: 'consul'
Replicas: 3
Image: 'consul'
ImageTag: 'v0.6.4'
ImagePullPolicy: 'Always'
Cpu: '100m'
Memory: '512Mi'
Storage: '1Gi'
```

</details>

---

# Consul Helm Chart

## Prerequisites Details

- Kubernetes 1.3 with alpha APIs enabled
- PV support on the underlying infrastructure

## PetSet Details

- http://kubernetes.io/docs/user-guide/petset/

## PetSet Caveats

- http://kubernetes.io/docs/user-guide/petset/#alpha-limitations

## Chart Details

This chart will do the following:

- Implemented a dynamically scalable consul cluster using Kubernetes PetSets

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/consul
```

## Configuration

The following tables lists the configurable parameters of the consul chart and their default values.

| Parameter         | Description                           | Default  |
| ----------------- | ------------------------------------- | -------- |
| `Name`            | Consul petset name                    | `consul` |
| `Image`           | Container image name                  | `consul` |
| `ImageTag`        | Container image tag                   | `v0.6.4` |
| `ImagePullPolicy` | Container pull policy                 | `Always` |
| `Replicas`        | k8s petset replicas                   | `3`      |
| `Component`       | k8s selector key                      | `consul` |
| `Cpu`             | container requested cpu               | `100m`   |
| `Memory`          | container requested memory            | `512Mi`  |
| `Storage`         | Persistent volume size                | `1Gi`    |
| `HttpPort`        | Consul http listening port            | `8500`   |
| `RpcPort`         | Consul rpc listening port             | `8400`   |
| `SerflanPort`     | Container serf lan listening port     | `8301`   |
| `SerflanUdpPort`  | Container serf lan UDP listening port | `8301`   |
| `SerfwanPort`     | Container serf wan listening port     | `8302`   |
| `SerfwanUdpPort`  | Container serf wan UDP listening port | `8302`   |
| `ServerPort`      | Container server listening port       | `8300`   |
| `ConsulDnsPort`   | Container dns listening port          | `8600`   |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`.

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml incubator/consul
```

> **Tip**: You can use the default [values.yaml](values.yaml)

## Cleanup orphaned Persistent Volumes

Deleting a PetSet will not delete associated Persistent Volumes (Alpha limitation).

Do the following after deleting the chart release to clean up orphaned Persistent Volumes.

```bash
$ kubectl delete pvc -l component=${RELEASE-NAME}-consul
```

## Testing

Execute test.sh. It will confirm that there are at least 3 consul servers present.

## Cluster Health

```
$ for i in <0..n>; do kubectl exec <consul-$i> -- sh -c 'consul members'; done
```

eg.

```
for i in {0..2}; do kubectl exec consul-$i --namespace=consul -- sh -c 'consul members'; done
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
cluster is healthy
```

## Failover

If any consul member fails it gets re-joined eventually.
You can test the scenario by killing process of one of the pets:

```
shell
$ ps aux | grep consul
$ kill CONSUL_PID
```

```
kubectl logs consul-0 --namespace=consul
Waiting for consul-0.consul to come up
Waiting for consul-1.consul to come up
Waiting for consul-2.consul to come up
==> WARNING: Expect Mode enabled, expecting 3 servers
==> Starting Consul agent...
==> Starting Consul agent RPC...
==> Consul agent running!
         Node name: 'consul-0'
        Datacenter: 'dc1'
            Server: true (bootstrap: false)
       Client Addr: 0.0.0.0 (HTTP: 8500, HTTPS: -1, DNS: 8600, RPC: 8400)
      Cluster Addr: 10.244.2.6 (LAN: 8301, WAN: 8302)
    Gossip encrypt: false, RPC-TLS: false, TLS-Incoming: false
             Atlas: <disabled>

==> Log data will now stream in as it occurs:

    2016/08/18 19:20:35 [INFO] serf: EventMemberJoin: consul-0 10.244.2.6
    2016/08/18 19:20:35 [INFO] serf: EventMemberJoin: consul-0.dc1 10.244.2.6
    2016/08/18 19:20:35 [INFO] raft: Node at 10.244.2.6:8300 [Follower] entering Follower state
    2016/08/18 19:20:35 [INFO] serf: Attempting re-join to previously known node: consul-1: 10.244.3.8:8301
    2016/08/18 19:20:35 [INFO] consul: adding LAN server consul-0 (Addr: 10.244.2.6:8300) (DC: dc1)
    2016/08/18 19:20:35 [WARN] serf: Failed to re-join any previously known node
    2016/08/18 19:20:35 [INFO] consul: adding WAN server consul-0.dc1 (Addr: 10.244.2.6:8300) (DC: dc1)
    2016/08/18 19:20:35 [ERR] agent: failed to sync remote state: No cluster leader
    2016/08/18 19:20:35 [INFO] agent: Joining cluster...
    2016/08/18 19:20:35 [INFO] agent: (LAN) joining: [10.244.2.6 10.244.3.8 10.244.1.7]
    2016/08/18 19:20:35 [INFO] serf: EventMemberJoin: consul-1 10.244.3.8
    2016/08/18 19:20:35 [WARN] memberlist: Refuting an alive message
    2016/08/18 19:20:35 [INFO] serf: EventMemberJoin: consul-2 10.244.1.7
    2016/08/18 19:20:35 [INFO] serf: Re-joined to previously known node: consul-1: 10.244.3.8:8301
    2016/08/18 19:20:35 [INFO] consul: adding LAN server consul-1 (Addr: 10.244.3.8:8300) (DC: dc1)
    2016/08/18 19:20:35 [INFO] consul: adding LAN server consul-2 (Addr: 10.244.1.7:8300) (DC: dc1)
    2016/08/18 19:20:35 [INFO] agent: (LAN) joined: 3 Err: <nil>
    2016/08/18 19:20:35 [INFO] agent: Join completed. Synced with 3 initial agents
    2016/08/18 19:20:51 [INFO] agent.rpc: Accepted client: 127.0.0.1:36302
    2016/08/18 19:20:59 [INFO] agent.rpc: Accepted client: 127.0.0.1:36313
    2016/08/18 19:21:01 [INFO] agent: Synced node info
```

## Scaling using kubectl

The consul cluster can be scaled up by running `kubectl patch` or `kubectl edit`. For example,

```
kubectl get pods -l "component=${RELEASE-NAME}-consul" --namespace=consul
NAME       READY     STATUS    RESTARTS   AGE
consul-0   1/1       Running   1          4h
consul-1   1/1       Running   0          4h
consul-2   1/1       Running   0          4h

$ kubectl patch petset/consul -p '{"spec":{"replicas": 5}}'
"consul" patched

kubectl get pods -l "component=${RELEASE-NAME}-consul" --namespace=consul
NAME       READY     STATUS    RESTARTS   AGE
consul-0   1/1       Running   1          4h
consul-1   1/1       Running   0          4h
consul-2   1/1       Running   0          4h
consul-3   1/1       Running   0          41s
consul-4   1/1       Running   0          23s

lachlanevenson@faux$ for i in {0..4}; do kubectl exec consul-$i --namespace=consul -- sh -c 'consul members'; done
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  alive   server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  alive   server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  alive   server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  alive   server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  alive   server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  alive   server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  alive   server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  alive   server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  alive   server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  alive   server  0.6.4  2         dc1
```

Scale down

```
kubectl patch petset/consul -p '{"spec":{"replicas": 3}}' --namespace=consul
"consul" patched
lachlanevenson@faux$ kubectl get pods -l "component=${RELEASE-NAME}-consul" --namespace=consul
NAME       READY     STATUS    RESTARTS   AGE
consul-0   1/1       Running   1          4h
consul-1   1/1       Running   0          4h
consul-2   1/1       Running   0          4h
lachlanevenson@faux$ for i in {0..2}; do kubectl exec consul-$i --namespace=consul -- sh -c 'consul members'; done
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  failed  server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  failed  server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  failed  server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  failed  server  0.6.4  2         dc1
Node      Address          Status  Type    Build  Protocol  DC
consul-0  10.244.2.6:8301  alive   server  0.6.4  2         dc1
consul-1  10.244.3.8:8301  alive   server  0.6.4  2         dc1
consul-2  10.244.1.7:8301  alive   server  0.6.4  2         dc1
consul-3  10.244.2.7:8301  failed  server  0.6.4  2         dc1
consul-4  10.244.2.8:8301  failed  server  0.6.4  2         dc1
```
