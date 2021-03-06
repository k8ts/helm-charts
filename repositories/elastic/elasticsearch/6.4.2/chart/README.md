# Elasticsearch Helm Chart

This helm chart is a lightweight way to configure and run our official [Elasticsearch docker image](https://www.elastic.co/guide/en/kibana/current/docker.html)

## Requirements

* Kubernetes 1.8/1.9/1.10.
* [Helm](https://helm.sh/)

## Installing

* Add the elastic helm charts repo
  ```
  helm repo add elastic https://helm-charts-test-micky.storage.googleapis.com/
  ```
* Install it 
  ```
  helm install --name elasticsearch elastic/elasticsearch
  ```

## Configuration

| Parameter                 | Description                                                                                                                                                                                                                                                                                                                | Default                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `clusterName`             | This will be used as the Elasticsearch [cluster.name](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster.name.html) and should be unique per cluster in the namespace                                                                                                                                 | `elasticsearch`                                                                                                           |
| `nodeGroup`               | This is the name that will be used for each group of nodes in the cluster. The name will be `clusterName-nodeGroup-X`                                                                                                                                                                                                      | `master`                                                                                                                  |
| `masterService`           | The service name used for [discovery.zen.ping.unicast.hosts](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-discovery-zen.html#unicast) to connect to the masters                                                                                                                                 | `elasticsearch-master`                                                                                                    |
| `roles`                   | A hash map with the [specific roles](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html) for the node group                                                                                                                                                                                 | `master: true`<br>`data: true`<br>`ingest: true`                                                                          |
| `replicas`                | Kubernetes replica count for the statefulset (i.e. how many pods)                                                                                                                                                                                                                                                          | `3`                                                                                                                       |
| `minimumMasterNodes`      | The value for [discovery.zen.minimum_master_nodes](https://www.elastic.co/guide/en/elasticsearch/reference/current/discovery-settings.html#minimum_master_nodes). Should be set to `(replicas / 2) + 1`                                                                                                                    | `2`                                                                                                                       |
| `extraEnvs`               | Extra [environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/#using-environment-variables-inside-of-your-config) which will be appended to the `env:` definition for the container                                                                         | `{}`                                                                                                                      |
| `secretMounts`            | Allows you easily mount a secret as a file inside the statefulset. Useful for mounting certificates and other secrets. See [values.yaml](./values.yaml) for an example                                                                                                                                                     | `{}`                                                                                                                      |
| `image`                   | The Elasticsearch docker image                                                                                                                                                                                                                                                                                             | `docker.elastic.co/elasticsearch/elasticsearch`                                                                           |
| `imageTag`                | The Elasticsearch docker image tag                                                                                                                                                                                                                                                                                         | `6.4.2`                                                                                                                   |
| `imagePullPolicy`         | The Kubernetes [imagePullPolicy](https://kubernetes.io/docs/concepts/containers/images/#updating-images) value                                                                                                                                                                                                             | `IfNotPresent`                                                                                                            |
| `esJavaOpts`              | [Java options](https://www.elastic.co/guide/en/elasticsearch/reference/current/jvm-options.html) for Elasticsearch. This is where you should configure the [jvm heap size](https://www.elastic.co/guide/en/elasticsearch/reference/current/heap-size.html)                                                                 | `-Xmx1g -Xms1g`                                                                                                           |
| `resources`               | Allows you to set the [resources](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) for the statefulset                                                                                                                                                                               | `requests.cpu: 100m`<br>`requests.memory: 2Gi`<br>`limits.cpu: 1000m`<br>`limits.memory: 2Gi`                             |
| `networkHost`             | Value for the [network.host Elasticsearch setting](https://www.elastic.co/guide/en/elasticsearch/reference/current/network.host.html)                                                                                                                                                                                      | `0.0.0.0`                                                                                                                 |
| `volumeClaimTemplate`     | Configuration for the [volumeClaimTemplate for statefulsets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage). You will want to adjust the storage (default `30Gi`) and the `storageClassName` if you are using a different storage class                                            | `accessModes: [ "ReadWriteOnce" ]`<br>`storageClassName: standard`<br>`resources.requests.storage: 30Gi`                  |
| `antiAffinityTopologyKey` | The [anti-affinity topology key](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity). By default this will prevent multiple Elasticsearch nodes from running on the same Kubernetes node                                                                                        | `kubernetes.io/hostname`                                                                                                  |
| `antiAffinity`            | Setting this to hard enforces the [anti-affinity rules](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity). If it is set to soft it will be done "best effort"                                                                                                                 | `hard`                                                                                                                    |
| `podManagementPolicy`     | By default Kubernetes [deploys statefulsets serially](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies). This deploys them in parralel so that they can discover eachother                                                                                                   | `Parallel`                                                                                                                |
| `httpPort`                | The http port that Kubernetes will use for the healthchecks and the service. If you change this you will also need to set [http.port](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html#_settings_2) in `extraEnvs`                                                                        | `9200`                                                                                                                    |
| `transportPort`           | The transport port that Kubernetes will use for the service. If you change this you will also need to set [transport port configuration](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html#_tcp_transport) in `extraEnvs`                                                             | `9300`                                                                                                                    |
| `updateStrategy`          | The [updateStrategy](https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#updating-statefulsets) for the statefulset. By default Kubernetes will wait for the cluster to be green after upgrading each pod. Setting this to `OnDelete` will allow you to manually delete each pod during upgrades | `RollingUpdate`                                                                                                           |
| `maxUnavailable`          | The [maxUnavailable](https://kubernetes.io/docs/tasks/run-application/configure-pdb/#specifying-a-poddisruptionbudget) value for the pod disruption budget. By default this will prevent Kubernetes from having more than 1 unhealthy pod in the node group                                                                | `1`                                                                                                                       |
| `fsGroup`                 | The Group ID (GID) for [securityContext.fsGroup](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) so that the Elasticsearch user can read from the persistent volume                                                                                                                            | `1000`                                                                                                                    |
| `terminationGracePeriod`  | The [terminationGracePeriod](https://kubernetes.io/docs/concepts/workloads/pods/pod/#termination-of-pods) in seconds used when trying to stop the pod                                                                                                                                                                      | `120`                                                                                                                     |
| `sysctlVmMaxMapCount`     | Sets the [sysctl vm.max_map_count](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html#vm-max-map-count) needed for Elasticsearch                                                                                                                                                        | `262144`                                                                                                                  |
| `readinessProbe`          | Configuration for the [readinessProbe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)                                                                                                                                                                                      | `failureThreshold: 3`<br>`initialDelaySeconds: 10`<br>`periodSeconds: 10`<br>`successThreshold: 3`<br>`timeoutSeconds: 5` |
| `imagePullSecrets`        | Configuration for [imagePullSecrets](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-pod-that-uses-your-secret) so that you can use a private registry for your image                                                                                                       | `[]`                                                                                                                      |
| `nodeSelector`            | Configurable [nodeSelector](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector) so that you can target specific nodes for your Elasticsearch cluster                                                                                                                                          | `{}`                                                                                                                      |
| `tolerations`             | Configurable [tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)                                                                                                                                                                                                                        | `[]`                                                                                                                      |
| `ingress`                 | Configurable [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) to expose the Elasticsearch service. See [`values.yaml`](./values.yaml) for an example                                                                                                                                            | `enabled: false`                                                                                                          |

## Try it out

In [examples/](./examples) you will find some example configurations. These examples are used for the automated testing of this helm chart

### Default

To deploy a cluster with all default values and run the integration tests

```
cd examples/default
make
```

### Multi

A cluster with dedicated node types

```
cd examples/multi
make
```

### Security

A cluster with X-Pack security enabled

* Generate SSL certificates following the [official docs]( https://www.elastic.co/guide/en/elasticsearch/reference/6.3/configuring-tls.html#node-certificates)
* Get a copy of our [internal X-Pack license](https://wiki.elastic.co/pages/viewpage.action?spaceKey=PM&title=Internal+License+-+X-Pack)
* Create Kubernetes secrets for authentication credentials, X-Pack license and certificates
  ```
  kubectl create secret generic elastic-credentials  --from-literal=password=changeme --from-literal=username=elastic
  kubectl create secret generic elastic-license --from-file=license.json
  kubectl create secret generic elastic-certificates --from-file=elastic-certificates.p12
  ```
* Deploy!
  ```
  cd examples/security
  make
  ```
* Attach into one of the containers
  ```
  kubectl exec -ti $(kubectl get pods -l release=helm-es-security -o name | awk -F'/' '{ print $NF }' | head -n 1) bash
  ```
  
* Install the X-Pack license
  ```
  curl -XPUT 'http://localhost:9200/_xpack/license' -H "Content-Type: application/json" -d @/usr/share/elasticsearch/config/license/license.json
  ```
* Test that authentication is now enabled
  ```
  curl 'http://localhost:9200/' # This one will fail
  curl -u elastic:changeme 'http://localhost:9200/'
  ```
* Install some test data to play around with
  ```
  wget https://download.elastic.co/demos/kibana/gettingstarted/logs.jsonl.gz && gunzip logs.jsonl.gz && curl -u elastic:changeme -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/_bulk?pretty' --data-binary @logs.jsonl
  ```

## Testing

This chart uses [pytest](https://docs.pytest.org/en/latest/) to test the templating logic. The dependencies for testing can be installed from the [`requirements.txt`](../requirements.txt) in the parent directory.

```
pip install -r ../requirements.txt
make test
```

You can also use `helm template` to look at the YAML being generated

```
make template
```

It is possible to run all of the tests and linting inside of a docker container

```
make test
```

