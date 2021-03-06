# `@helm-charts/odavid-my-bloody-jenkins`

A Helm chart for my-bloody-jenkins - a self configured jenkins docker image, based on Jenkins LTS. Inspired by https://github.com/kubernetes/charts/tree/master/stable/jenkins, but better suites https://github.com/odavid/my-bloody-jenkins.

| Field               | Value             |
| ------------------- | ----------------- |
| Repository Name     | odavid            |
| Chart Name          | my-bloody-jenkins |
| Chart Version       | 0.1.1             |
| NPM Package Version | 0.1.0             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
---
########################################################
## Override image
image:
  repository: odavid/my-bloody-jenkins
  tag: 2.121.1-62
  pullPolicy: IfNotPresent
  imagePullSecret:
########################################################

########################################################
## Exposing service
service:
  # type: ClusterIP
  type: LoadBalancer
  annotations: {}
  # httpPort: 8080
  # jnlpPort: 50000
  # sshdPort: 16022
  # loadBalancerSourceRanges: 0.0.0.0/0
  # loadBalancerIP:
########################################################

########################################################
## Exposing ingress
ingress:
  ## Change to https if the ingress uses tls or you are using external
  ## tls termination using annotations
  httpProtocol: http
  enabled: false
  path: /
  # hostname: jenkins.host.name
  # annotations: {}
  # tls:
  #   secretName:
########################################################

########################################################
## By default rbac are not used and default service account
## is being used.
rbac:
  ## Create serviceAccount, Eole and RoleBindings
  create: true
  ## Instead of Role, create a ClusterRole and ClusterRoleBindings
  clusterWideAccess: false
########################################################

########################################################
## Control requests limit
## It is highly recommended to give jenkins the amount of
## cpu and memory in production usage
resources:
# requests:
#   cpu: 200m
#   memory: 256Mi
# limits:
#   cpu: 200m
#   memory: 256Mi
########################################################

########################################################
## It can take a lot of time for jenkins to be started
## This is why the livenessProbe.initialDelaySeconds is high
readinessProbe:
  timeout: 5
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3

livenessProbe:
  timeout: 5
  initialDelaySeconds: 600
  periodSeconds: 5
  failureThreshold: 3
########################################################

########################################################
## Control peristence of jenkins data:
## By default, the master workspace and master home are separated
## Since master should be used as executer, the workspace directory is
## mainly used for fetching pipeline libraries and some initial clone of
## projects. Therefore, the jenkinsWorkspace can be left as emptyDir (enabled=false).
## On the other hand, jenkinsHome must be persistent!
persistence:
  mountDockerSocket: true
  jenkinsHome:
    enabled: true
    annotations: {}
    accessMode: ReadWriteOnce
    size: 20Gi
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.jenkinsHome.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    existingClaim:
    ## If defined, storageClass: <storageClass>
    ## If set to "-", storageClass: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClass spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"
  jenkinsWorkspace:
    enabled: false
    annotations: {}
    accessMode: ReadWriteOnce
    size: 8Gi
    ## A manually managed Persistent Volume and Claim
    ## Requires persistence.jenkinsWorkspace.enabled: true
    ## If defined, PVC must be created manually before volume will be bound
    existingClaim:
    ## If defined, storageClass: <storageClass>
    ## If set to "-", storageClass: "", which disables dynamic provisioning
    ## If undefined (the default) or set to null, no storageClass spec is
    ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
    ##   GKE, AWS & OpenStack)
    ##
    # storageClass: "-"

  ## Additional volumes and mounts that will be attached to the container. e.g. secrets
  volumes:
  #  - name: nothing
  #    emptyDir: {}
  mounts:
  #  - mountPath: /var/nothing
  #    name: nothing
  #    readOnly: true
########################################################

########################################################
## See: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
nodeSelector: {}
tolerations: []
affinity: {}
########################################################

########################################################
## Additional Environment variables to be provided to the container
env:
#   ENVIRONMENT_VARIABLE_NAME: VALUE
########################################################

########################################################
## Use external secrets as environment variables
## Each item in the list represents an existing secret name
## All its keys will be transformed to environment variables
## See https://github.com/odavid/my-bloody-jenkins/pull/102
envSecrets:
#   - my-jenkins-external-secret
########################################################

########################################################
## List of ConfigMaps that will be mounted as configuration files
## All configuration files will be deep merged into single config
## See https://github.com/odavid/my-bloody-jenkins/pull/102
configMaps:
#  - my-config-map
########################################################

########################################################
## The jenkins Admin Username - must be a valid username
## within the Jenkins Security Realm
jenkinsAdminUser: admin
########################################################

########################################################
## Java Options for Jenkins Master. Make sure
## resource limits and requests are defined accordingly
javaMemoryOpts: '-Xmx256m'
########################################################

########################################################
## If enabled = 'true', then
## a Default k8s Jenkins cloud will be configured to
## provision slaves automatically based on labels
defaultK8sCloud:
  enabled: true
  name: 'k8s'
  labels:
    - 'generic'
  jvmArgs: '-Xmx1g'
  remoteFs: '/home/jenkins'
  image: 'odavid/jenkins-jnlp-slave:latest'
########################################################

########################################################
## A managed configuration based on
## My Bloody Jenkins YAML config.
## See: https://github.com/odavid/my-bloody-jenkins#configuration-reference
managedConfig:
## Configure Security - https://github.com/odavid/my-bloody-jenkins#security-section
# security:
## Configure tools - https://github.com/odavid/my-bloody-jenkins#tools-section
# tools:
## Configure credentials - https://github.com/odavid/my-bloody-jenkins#credentials-section
# credentials:
## Configure notifiers - https://github.com/odavid/my-bloody-jenkins#notifiers-section
# notifiers:
## Configure notifiers - https://github.com/odavid/my-bloody-jenkins#pipeline-libraries-section
# pipeline_libraries:
## Script Approvals - https://github.com/odavid/my-bloody-jenkins#script-approval-section
# script_approval:
## Configure Clouds - https://github.com/odavid/my-bloody-jenkins#clouds-section
# clouds:
## Configure Seed Jobs - https://github.com/odavid/my-bloody-jenkins#seed-jobs-section
# seed_jobs:
## Configure Job DSL Scripts - https://github.com/odavid/my-bloody-jenkins#jobdsl-scripts-section
# job_dsl_scripts:
########################################################
```

</details>

---

# My Bloody Jenkins

## Prerequisites Details

- Kubernetes 1.8+

## Chart Details

The chart will do the following:

- Deploy [My Bloody Jenkins](https://github.com/odavid/my-bloody-jenkins)
- Manage Configuration in a dedicated ConfigMap
- Configures Jenkins to use a default [k8s jenkins cloud](https://plugins.jenkins.io/kubernetes)
- Optionally expose Jenkins with [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- Manages a [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for Jenkins Storage
- Optionally mount extenral [secrets](https://kubernetes.io/docs/concepts/configuration/secret/) as volumes to be used within the configuration [See docs](https://github.com/odavid/my-bloody-jenkins/pull/102)
- Optionally mount extenral [configMaps](https://kubernetes-v1-4.github.io/docs/user-guide/configmap/) to be used as configuration data sources [See docs](https://github.com/odavid/my-bloody-jenkins/pull/102)
- Optionally configures [rbac](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) and a dedicated [service account](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)

## Installing the Chart

First add the following repo:

```shell
helm repo add odavid https://odavid.github.io/k8s-helm-charts
```

To install the chart with the release name `jenkins`:

```shell
helm install --name jenkins odavid/my-bloody-jenkins
```

To install the chart with a custom configuration values.yml

```shell
helm install --name jenkins odavid/my-bloody-jenkins -f <valueFiles>
```

## Upgrading the Release

To install the chart with a custom configuration values.yml

```shell
helm upgrade jenkins odavid/my-bloody-jenkins -f <valueFiles>
```

## Deleting the Chart

```shell
helm delete jenkins
```

## Docker Image

By default the chart uses the [`odavid/my-bloody-jenkins:lts`](https://hub.docker.com/r/odavid/my-bloody-jenkins/tags/) image.
The Helm Chart provides a way to use different repo or tags:

- `image.repository` - by default `odavid/my-bloody-jenkins`
- `image.tag` - by default `lts`
- `image.pullPolicy` - by default `IfNotPresent`
- `image.imagePullSecret` - not set by default

## CPU and Memory Resources

The Helm chart comes with support for configured resource requests and limits.
By default these values are commented out.
It is **highly** recommended to change this behavior on a production deployment. Also the Helm Chart provides a way to control Jenkins Java Memory Opts. When using Jenkins in production, you will need to set the values that suites your needs.

## Persistence

By default the helm chart allocates a 20gb volume for jenkins storage.
The chart provides the ability to control:

- `persistence.jenkinsHome.enabled` - if set to false, jenkins home will be using empty{} volume instead of persistentVolumeClaim. Default is `true`
- `persistence.jenkinsHome.size` - the managed volume size
- `persistence.jenkinsHome.storageClass` - If set to `"-"`, then storageClass: `""`, which disables dynamic provisioning. If undefined (the default) or set to null, no storageClass spec is set, choosing the default provisioner. (gp2 on AWS, standard on GKE, AWS & OpenStack)
- `persistence.jenkinsHome.existingClaim` - if provided, jenkins storage will be stored on an manually managed persistentVolumeClaim
- `persistence.jenkinsHome.annotations` - annotations that will be added to the managed persistentVolumeClaim

## Secrets

My Bloody Jenkins natively supports [environment variable substitution](https://github.com/odavid/my-bloody-jenkins#environment-variable-substitution-and-remove-master-env-vars) within its configuration files.
The Helm Chart provides a simple way to map [k8s secrets] in dedicated folders that will be later on used as environment variables datasource.

In order to use this feature, you will need to create external secrets and then use: `envSecrets` property to add these secrets to the search order.
For example:

```shell
echo -n 'admin' > ./username
echo -n 'password' > ./password
kubectl create secret generic my-jenkins-secret --from-file=./username --from-file=./password
```

Then add this secret to values.yml:

```yaml
envSecrets:
  - my-jenkins-secret
```

Now, you can refer these secrets as environmnet variables:

- `MY_JENKINS_SECRET_USERNAME`
- `MY_JENKINS_SECRET_PASSWORD`

See [Support multiple data sources and secrets from files](https://github.com/odavid/my-bloody-jenkins/pull/102) for more details

## Managed Configuration and additional ConfigMaps

My Bloody Jenkins natively supports watching multiple config data sources and merge them into one config top to bottom
The Helm Chart provides a way to define a `managedConfig` yaml within the chart values.yml as well as add additional external `configMaps` that will be merged/override the default configuration.

See [Support multiple data sources and secrets from files](https://github.com/odavid/my-bloody-jenkins/pull/102) for more details
The `managedConfig` is mounted as `/var/jenkins_managed_config/jenkins-config.yml` and contains the `managedConfig` yaml contents

Additional `configMaps` list are mounted as `/var/jenkins_config/<ConfigMapName>` within the container and are merged with the `managedConfig`

## Default K8S Jenkins Cloud for provisioning slaves within k8s

By default the Helm Chart Configures a [kubernetes cloud](https://plugins.jenkins.io/kubernetes) with a simple jnlp slave template.
For disabling this behavior, you need to set `defaultK8sCloud.enabled` to `false`
The following attributes can control the default template:

- `defaultK8sCloud.name` - the name of the k8s cloud - default (`k8s`)
- `defaultK8sCloud.labels` - list of agent labels that are used to provision the node - e.g. `node(labels){}` pipeline step - default (`["generic"]`)
- `defaultK8sCloud.jvmArgs` - JVM Args for the JNLP Slave - default (`"-Xmx1g"`)
- `defaultK8sCloud.remoteFs` - JNLP Remote FS - default (`"/home/jenkins"`)
- `defaultK8sCloud.image` - JNLP Slave Image - default (`"odavid/jenkins-jnlp-slave:latest"`)

## Configuration

The following table lists the configurable parameters of the chart and their default values.

| Parameter                                    | Description                                                                                                                                         | Default                                                                                                                                                                                                                                 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `managedConfig`                              | `My Bloody Jenkins` Configuration yaml - See [Configuration Reference](https://github.com/odavid/my-bloody-jenkins#configuration-reference)         |
| `defaultK8sCloud.enabled`                    | If `true` a default k8s jenkins cloud will be configured to enable automatic slave provisioning                                                     | `true`                                                                                                                                                                                                                                  |
| `defaultK8sCloud.name`                       | The name of the default k8s cloud                                                                                                                   | `k8s`                                                                                                                                                                                                                                   |
| `defaultK8sCloud.labels`                     | List of labels that mark the k8s provisioned slaves, use `node(label){}` within pipeline                                                            | `["generic"]`                                                                                                                                                                                                                           |
| `defaultK8sCloud.jvmArgs`                    | Default JVM Args to pass to the jnlp slave of the k8s cloud                                                                                         | `-Xmx1g`                                                                                                                                                                                                                                |
| `defaultK8sCloud.remoteFs`                   | The remoteFS of the JNLP Slave                                                                                                                      | `/home/jenkins`                                                                                                                                                                                                                         |
| `defaultK8sCloud.image`                      | The docker image of the JNLP Slave                                                                                                                  | `odavid/jenkins-jnlp-slave:latest`                                                                                                                                                                                                      |
| `image.repository`                           | `My Bloody Jenkins` Docker Image                                                                                                                    | `odavid/my-bloody-jenkins`                                                                                                                                                                                                              |
| `image.tag`                                  | `My Bloody Jenkins` Docker Image Tag                                                                                                                | `2.121.1-62`                                                                                                                                                                                                                            |
| `image.pullPolicy`                           | Image Pull Policy                                                                                                                                   | `IfNotPresent`                                                                                                                                                                                                                          |
| `image.imagePullSecrets`                     | Docker registry pull secret                                                                                                                         |
| `service.type`                               | Service Type                                                                                                                                        | `LoadBalanacer`                                                                                                                                                                                                                         |
| `service.annotations`                        | Service Annotations                                                                                                                                 | `{}`                                                                                                                                                                                                                                    |
| `service.loadBalancerSourceRanges`           | Array Of IP CIDR ranges to whitelist (Only if service type is `LoadBalancer`)                                                                       |
| `service.loadBalancerIP`                     | Service Load Balancer IP Address (Only if service type is `LoadBalancer`)                                                                           |
| `ingress.enabled`                            | If `true` Ingress will be created                                                                                                                   | `false`                                                                                                                                                                                                                                 |
| `ingress.path`                               | Ingress Path (Only if ingress is enabled)                                                                                                           | `/`                                                                                                                                                                                                                                     |
| `ingress.annotations`                        | Ingress Annoations                                                                                                                                  | `{}`                                                                                                                                                                                                                                    |
| `ingress.hostname`                           | Ingress Hostname (Required only if ingress is enabled)                                                                                              |
| `ingress.tls.secretName`                     | Ingress TLS Secret Name - if provided, the ingress will terminate TLS                                                                               |
| `rbac.create`                                | If `true` - a ServiceAccount, and a Role will be created                                                                                            | `true`                                                                                                                                                                                                                                  |
| `rbac.clusterWideAccess`                     | If `true` - A ClusterRole will be created instead of Role - relevant only if `rbac.create` is `true`                                                | `false`                                                                                                                                                                                                                                 |
| `resources.requests.cpu`                     | Initial CPU Request                                                                                                                                 |
| `resources.requests.memory`                  | Initial Memory Request                                                                                                                              |
| `resources.limits.cpu`                       | CPU Limit                                                                                                                                           |
| `resources.limits.memory`                    | Memory Limit                                                                                                                                        |
| `readinessProbe.timeout`                     | Readiness Probe Timeout                                                                                                                             | `5`                                                                                                                                                                                                                                     |
| `readinessProbe.initialDelaySeconds`         | Readiness Probe Initial Delay in seconds                                                                                                            | `5`                                                                                                                                                                                                                                     |
| `readinessProbe.periodSeconds`               | Readiness Probe - check for readiess every `X` seconds                                                                                              | `5`                                                                                                                                                                                                                                     |
| `readinessProbe.failureThreshold`            | Readiness Probe - Mark the pod as not ready for traffic after `X` consecutive failures                                                              | `3`                                                                                                                                                                                                                                     |
| `livenessProbe.timeout`                      | Liveness Probe Timeout                                                                                                                              | `5`                                                                                                                                                                                                                                     |
| `livenessProbe.initialDelaySeconds`          | Liveness Probe Initial Delay in seconds - a high value since it takes time to start                                                                 | `600`                                                                                                                                                                                                                                   |
| `livenessProbe.periodSeconds`                | Liveness Probe - check for liveness every `X` seconds                                                                                               | `5`                                                                                                                                                                                                                                     |
| `livenessProbe.failureThreshold`             | Liveness Probe - Kill the pod after `X` consecutive failures                                                                                        | `3`                                                                                                                                                                                                                                     |
| `persistence.mountDockerSocket`              | If `true` - `/var/run/docker.sock` will be mounted                                                                                                  | `true`                                                                                                                                                                                                                                  |
| `persistence.jenkinsHome.enabled`            | If `true` - Jenkins Storage will be persistent                                                                                                      | `true`                                                                                                                                                                                                                                  |
| `persistence.jenkinsHome.existingClaim`      | External Jenkins Storage PesistentVolumeClaim - if set, then no volume claim will be created by the Helm Chart                                      |
| `persistence.jenkinsHome.annotations`        | Jenkins Storage PesistentVolumeClaim annotations                                                                                                    | `{}`                                                                                                                                                                                                                                    |
| `persistence.jenkinsHome.accessMode`         | Jenkins Storage PesistentVolumeClaim accessMode                                                                                                     | `ReadWriteOnce`                                                                                                                                                                                                                         |
| `persistence.jenkinsHome.size`               | Jenkins Storage PesistentVolumeClaim size                                                                                                           | `20Gi`                                                                                                                                                                                                                                  |
| `persistence.jenkinsHome.storageClass`       | External Jenkins Storage PesistentVolumeClaim                                                                                                       | If set to `"-"`, then storageClass: `""`, which disables dynamic provisioning. If undefined (the default) or set to null, no storageClass spec is set, choosing the default provisioner. (gp2 on AWS, standard on GKE, AWS & OpenStack) |
| `persistence.jenkinsWorkspace.enabled`       | If `true` - Jenkins Workspace Storage will be persistent                                                                                            | `false`                                                                                                                                                                                                                                 |
| `persistence.jenkinsWorkspace.existingClaim` | External Jenkins Workspace Storage PesistentVolumeClaim - if set, then no volume claim will be created by the Helm Chart                            |
| `persistence.jenkinsWorkspace.annotations`   | Jenkins Workspace Storage PesistentVolumeClaim annotations                                                                                          | `{}`                                                                                                                                                                                                                                    |
| `persistence.jenkinsWorkspace.accessMode`    | Jenkins Workspace Storage PesistentVolumeClaim accessMode                                                                                           | `ReadWriteOnce`                                                                                                                                                                                                                         |
| `persistence.jenkinsWorkspace.size`          | Jenkins Workspace Storage PesistentVolumeClaim size                                                                                                 | `8Gi`                                                                                                                                                                                                                                   |
| `persistence.jenkinsWorkspace.storageClass`  | External Jenkins Workspace Storage PesistentVolumeClaim                                                                                             | If set to `"-"`, then storageClass: `""`, which disables dynamic provisioning. If undefined (the default) or set to null, no storageClass spec is set, choosing the default provisioner. (gp2 on AWS, standard on GKE, AWS & OpenStack) |
| `persistence.volumes`                        | Additional volumes to be included within the Deployments                                                                                            |
| `persistence.mounts`                         | Additional mounts to be mounted to the container                                                                                                    |
| `nodeSelector`                               | Node Selector                                                                                                                                       | `{}`                                                                                                                                                                                                                                    |
| `tolerations`                                | Tolerations                                                                                                                                         | `[]`                                                                                                                                                                                                                                    |
| `affinity`                                   | Affinity                                                                                                                                            | `{}`                                                                                                                                                                                                                                    |
| `env`                                        | Additional Environment Variables to be passed to the container - format `key`: `value`                                                              |
| `envSecrets`                                 | List of external secret names to be mounted as env secrets - see [Docs](https://github.com/odavid/my-bloody-jenkins/pull/102)                       |
| `configMaps`                                 | List of external config maps to be used as configuration files - see [Docs](https://github.com/odavid/my-bloody-jenkins/pull/102)                   |
| `jenkinsAdminUser`                           | The name of the admin user - must be a valid user within the [Jenkins Security Realm](https://github.com/odavid/my-bloody-jenkins#security-section) | `admin`                                                                                                                                                                                                                                 |
| `javaMemoryOpts`                             | Jenkins Java Memory Opts                                                                                                                            | `-Xmx256m`                                                                                                                                                                                                                              |
