# `@helm-charts/elastic-kibana`

Kibana

| Field               | Value        |
| ------------------- | ------------ |
| Repository Name     | elastic      |
| Chart Name          | kibana       |
| Chart Version       | 6.5.2-alpha1 |
| NPM Package Version | 0.1.0        |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
---
elasticsearchURL: 'http://elasticsearch-master:9200'

replicas: 1

# Extra environment variables to append to this nodeGroup
# This will be appended to the current 'env:' key. You can use any of the kubernetes env
# syntax here
extraEnvs:
#  - name: MY_ENVIRONMENT_VAR
#    value: the_value_goes_here

# A list of secrets and their paths to mount inside the pod
# This is useful for mounting certificates for security and for mounting
# the X-Pack license
secretMounts:
#  - name: elastic-certificates
#    secretName: elastic-certificates
#    path: /usr/share/elasticsearch/config/certs

image: 'docker.elastic.co/kibana/kibana'
imageTag: '6.5.2'
imagePullPolicy: 'IfNotPresent'

resources:
  requests:
    cpu: '100m'
    memory: '500m'
  limits:
    cpu: '1000m'
    memory: '1Gi'

# By default this will make sure two pods don't end up on the same node
# Changing this to a region would allow you to spread pods across regions
antiAffinityTopologyKey: 'kubernetes.io/hostname'

# Hard means that by default pods will only be scheduled if there are enough nodes for them
# and that they will never end up on the same node. Setting this to soft will do this "best effort"
antiAffinity: 'hard'

httpPort: 5601

# This is the max unavailable setting for the pod disruption budget
# The default value of 1 will make sure that kubernetes won't allow more than 1
# of your pods to be unavailable during maintenance
maxUnavailable: 1

updateStrategy:
  type: 'Recreate'

service:
  type: ClusterIP
  port: 5601

ingress:
  enabled: false
  annotations:
    {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  path: /
  hosts:
    - chart-example.local
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

readinessProbe:
  failureThreshold: 3
  initialDelaySeconds: 10
  periodSeconds: 10
  successThreshold: 3
  timeoutSeconds: 5

imagePullSecrets: []
nodeSelector: {}
tolerations: []
affinity: {}
```

</details>

---

# Kibana Helm Chart

This functionality is in alpha status and may be changed or removed completely in a future release. Elastic will take a best effort approach to fix any issues, but alpha features are not subject to the support SLA of official GA features.

This helm chart is a lightweight way to configure and run our official [Kibana docker image](https://www.elastic.co/guide/en/kibana/current/docker.html)

## Requirements

- Kubernetes 1.8/1.9/1.10/1.11
- [Helm](https://helm.sh/)

## Installing

- Add the elastic helm charts repo
  ```
  helm repo add elastic https://helm.elastic.co
  ```
- Install it
  ```
  helm install --name kibana elastic/kibana --version 6.5.2-alpha1
  ```

## Configuration

| Parameter                 | Description                                                                                                                                                                                                                                                                                                                                                    | Default                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `elasticsearchURL`        | The URL used to connect to Elasticsearch.                                                                                                                                                                                                                                                                                                                      | `http://elasticsearch-master:9200`                                                                                        |
| `replicas`                | Kubernetes replica count for the deployment (i.e. how many pods)                                                                                                                                                                                                                                                                                               | `1`                                                                                                                       |
| `extraEnvs`               | Extra [environment variables](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/#using-environment-variables-inside-of-your-config) which will be appended to the `env:` definition for the container                                                                                                             | `{}`                                                                                                                      |
| `secretMounts`            | Allows you easily mount a secret as a file inside the deployment. Useful for mounting certificates and other secrets. See [values.yaml](./values.yaml) for an example                                                                                                                                                                                          | `{}`                                                                                                                      |
| `image`                   | The Kibana docker image                                                                                                                                                                                                                                                                                                                                        | `docker.elastic.co/kibana/kibana`                                                                                         |
| `imageTag`                | The Kibana docker image tag                                                                                                                                                                                                                                                                                                                                    | `6.5.2`                                                                                                                   |
| `imagePullPolicy`         | The Kubernetes [imagePullPolicy](https://kubernetes.io/docs/concepts/containers/images/#updating-images) value                                                                                                                                                                                                                                                 | `IfNotPresent`                                                                                                            |
| `resources`               | Allows you to set the [resources](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/) for the statefulset                                                                                                                                                                                                                   | `requests.cpu: 100m`<br>`requests.memory: 2Gi`<br>`limits.cpu: 1000m`<br>`limits.memory: 2Gi`                             |
| `antiAffinityTopologyKey` | The [anti-affinity topology key](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity). By default this will prevent multiple Kibana instances from running on the same Kubernetes node                                                                                                                               | `kubernetes.io/hostname`                                                                                                  |
| `antiAffinity`            | Setting this to hard enforces the [anti-affinity rules](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity). If it is set to soft it will be done "best effort"                                                                                                                                                     | `hard`                                                                                                                    |
| `httpPort`                | The http port that Kubernetes will use for the healthchecks and the service.                                                                                                                                                                                                                                                                                   | `5601`                                                                                                                    |
| `maxUnavailable`          | The [maxUnavailable](https://kubernetes.io/docs/tasks/run-application/configure-pdb/#specifying-a-poddisruptionbudget) value for the pod disruption budget. By default this will prevent Kubernetes from having more than 1 unhealthy pod                                                                                                                      | `1`                                                                                                                       |
| `updateStrategy`          | Allows you to change the default update [strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment) for the deployment. A [standard upgrade](https://www.elastic.co/guide/en/kibana/current/upgrade-standard.html) of Kibana requires a full stop and start which is why the default strategy is set to `Recreate` | `Recreate`                                                                                                                |
| `readinessProbe`          | Configuration for the [readinessProbe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)                                                                                                                                                                                                                          | `failureThreshold: 3`<br>`initialDelaySeconds: 10`<br>`periodSeconds: 10`<br>`successThreshold: 3`<br>`timeoutSeconds: 5` |
| `imagePullSecrets`        | Configuration for [imagePullSecrets](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-pod-that-uses-your-secret) so that you can use a private registry for your image                                                                                                                                           | `[]`                                                                                                                      |
| `nodeSelector`            | Configurable [nodeSelector](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector) so that you can target specific nodes for your Kibana instances                                                                                                                                                                                   | `{}`                                                                                                                      |
| `tolerations`             | Configurable [tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)                                                                                                                                                                                                                                                            | `[]`                                                                                                                      |
| `ingress`                 | Configurable [ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) to expose the Kibana service. See [`values.yaml`](./values.yaml) for an example                                                                                                                                                                                       | `enabled: false`                                                                                                          |

## Examples

In [examples/](./examples) you will find some example configurations. These examples are used for the automated testing of this helm chart

### Default

- Deploy the [default Elasticsearch helm chart](../elasticsearch/README.md#default)
- Deploy Kibana with the default values
  ```
  cd examples/default
  make
  ```
- You can now setup a port forward and access Kibana at http://localhost:5601
  ```
  kubectl port-forward deployment/helm-kibana-default-kibana 5601
  ```

### Security

- Deploy a [security enabled Elasticsearch cluster](../elasticsearch/README.md#security)
- Deploy Kibana with the security example
  ```
  cd examples/security
  make
  ```
- You can now setup a port forward and access Kibana at http://localhost:5601 with the credentials `elastic:changeme`
  ```
  kubectl port-forward deployment/helm-kibana-default-kibana 5601
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
