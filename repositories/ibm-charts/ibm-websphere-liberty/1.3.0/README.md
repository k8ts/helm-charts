# `@helm-charts/ibm-charts-ibm-websphere-liberty`

WebSphere Liberty for Linux on amd64, ppc64le and s390x

| Field               | Value                 |
| ------------------- | --------------------- |
| Repository Name     | ibm-charts            |
| Chart Name          | ibm-websphere-liberty |
| Chart Version       | 1.3.0                 |
| NPM Package Version | 0.1.0                 |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
###############################################################################
# Licensed Materials - Property of IBM.
# Copyright IBM Corporation 2017. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure
# restricted by GSA ADP Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

###############################################################################
## Common image variables
###############################################################################
image:
  repository: websphere-liberty
  tag: latest
  pullPolicy: IfNotPresent
  license: ''

service:
  type: NodePort
  name: liberty
  port: 9443
  targetPort: 9443

ssl:
  enabled: true
  useClusterSSLConfiguration: false
  createClusterSSLConfiguration: false

ingress:
  enabled: false
  secureBackends: true
  rewriteTarget: '/'
  path: '/liberty'

###############################################################################
## Persistence Storage
###############################################################################

## Persistence is disabled by default, set Enabled: true to use
persistence:
  name: 'liberty-pvc'
  ## Tranlog requires a Persistence Storage volume size minimum of 1Gi
  size: '1Gi'

  useDynamicProvisioning: true

  ## Specify the name of the StorageClass
  ## Setting StorageClass: "" will use whatever storageClass is currently
  ## setup as the Default
  storageClassName: ''

  # if your not using dynamic provisioning, you can use selectors to
  # refine the binding process. You cannot specify a selector if your using dynamic provisioning!
  selector:
    label: ''
    value: ''

###############################################################################
## Logs
###############################################################################
logs:
  persistLogs: false
  persistTransactionLogs: false

###############################################################################
## MicroProfile
###############################################################################
microprofile:
  health:
    enabled: false

###############################################################################
## Auto scaling
###############################################################################
replicaCount: 1
autoscaling:
  enabled: false
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50

###############################################################################
## Resource constraints
###############################################################################
resources:
  constraints:
    enabled: false
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 500m
    memory: 512Mi
# Specify architecture (amd64, ppc64le, s390x) and weight to be  used for scheduling as follows :
#   0 - Do not use
#   1 - Least preferred
#   2 - No preference
#   3 - Most preferred
#arch:
#  amd64: "2 - No preference"
#  ppc64le: "2 - No preference"
#  s390x: "2 - No preference"
```

</details>

---

# WebSphere Liberty Helm Chart

WebSphere Liberty is a fast, dynamic, easy-to-use Java EE application server. Ideal for developers but also ready for production, Liberty is a combination of IBM technology and open source software, with fast startup times (<2 seconds), and a simple XML configuration. All in a package that's <70 MB to download. You can be developing applications in no time. With a flexible, modular runtime, you can download additional features from the Liberty Repository or strip it back to the bare essentials for deployment into production environments. Everything in Liberty is designed to help you get your job done how you want to do it.

## Requirements

A persistent volume is required, if you plan on using the transaction service within Liberty. The server.xml Liberty configuration file must be configured to place the transaction log on this volume so that it persists, if the server fails and restarts.

## Accessing Liberty

From a browser, use http://*external ip*:*nodeport\* to access the application.

## Configuration

### Parameters

The Helm chart has the following values that can be overriden using the --set parameter. For example:

- `helm repo add ibm-charts https://raw.githubusercontent.com/IBM/charts/master/repo/stable/`
- `helm install --name liberty2 --set resources.constraints.enabled=true --set autoscaling.enabled=true --set autoscaling.minReplicas=2 ibm-charts/ibm-websphere-liberty --debug`

##### Common Parameters

| Qualifier    | Parameter                      | Definition                                                                                                                                                                                                                                                                                                                              | Allowed Value                                                                                                                                                   |
| ------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| image        | pullPolicy                     | Image Pull Policy                                                                                                                                                                                                                                                                                                                       | Always, Never, or IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise                                                       |
|              | repository                     | Name of image, including repository prefix (if required).                                                                                                                                                                                                                                                                               | See Extended description of Docker tags.                                                                                                                        |
|              | tag                            | Docker image tag.                                                                                                                                                                                                                                                                                                                       | See Docker tag description                                                                                                                                      |
|              | license                        | The license state of the image being deployed.                                                                                                                                                                                                                                                                                          | Empty (default) for development or "accept" if you have previously accepted the production license.                                                             |
| service      | name                           | The name of the port service.                                                                                                                                                                                                                                                                                                           |                                                                                                                                                                 |
|              | type                           | Specify type of service.                                                                                                                                                                                                                                                                                                                | Valid options are ExternalName, ClusterIP, NodePort, and LoadBalancer. See Publishing services - service types.                                                 |
|              | port                           | The port that this container exposes.                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                 |
|              | targetPort                     | Port that will be exposed externally by the pod.                                                                                                                                                                                                                                                                                        |                                                                                                                                                                 |
| ssl          | enabled                        | Specifices whether SSL is enabled. Set to true if SSL will be enabled via generated SSL configuration or if liberty is configured to use SSL in the docker image.                                                                                                                                                                       | true (default) or false                                                                                                                                         |
|              | useClusterSSLConfiguration     | Set to true if you want to use the SSL configmap and secrets generated by the createClusterSSLConfiguration option. Set to false if the Docker image already has SSL configured.                                                                                                                                                        | false (default) or true                                                                                                                                         |
|              | createClusterSSLConfiguration  | Specifies whether to automatically generate SSL configmap and secrets. The generated configmap is: liberty-config. The generated secrets are: mb-keystore mb-keystore-password mb-truststore mb-truststore-password. Only generate the SSL configuration one time. If you generate the configuration a second time, errors might occur. | false (default) or true                                                                                                                                         |
| ingress      | enabled                        | Specifies whether to use ingress.                                                                                                                                                                                                                                                                                                       | false (default) or true                                                                                                                                         |
|              | secureBackends                 | By default, NGINX uses the HTTP protocol to reach the services. Turning on secureBackends changes the protocol to HTTPS.                                                                                                                                                                                                                | true (default) or false                                                                                                                                         |
|              | rewriteTarget                  | Specifies ingress.kubernetes.io/rewrite-target                                                                                                                                                                                                                                                                                          | See Kubernetes ingress.kubernetes.io/rewrite-target - https://github.com/kubernetes/ingress-nginx/tree/master/docs/examples/rewrite                             |
|              | path                           | Specifies the path for the Ingress HTTP rule.                                                                                                                                                                                                                                                                                           | See Kubernetes - https://kubernetes.io/docs/concepts/services-networking/ingress/                                                                               |
| persistence  | name                           | Descriptive name that will be used prefix the generated persistence volume claim. A volume is only bound if either tranlog.persistLogs or logs.persistLogs is set to true.                                                                                                                                                              |                                                                                                                                                                 |
|              | useDynamicProvisioning         | If true, the persistent volume claim will use the storageClassName to bind the volume. If storageClassName is not set it will use the default storageClass setup by kube Administrator. If false, the selector will be used for the binding process.                                                                                    | true (default) or false                                                                                                                                         |
|              | storageClassName               | Specifies a StorageClass pre-created by the Kubernetes sysadmin. When set to "", then the PVC is bound to the default storageClass setup by kube Administrator.                                                                                                                                                                         |                                                                                                                                                                 |
|              | selector.label                 | When matching a PV, the label is used to find a match on the key. See Kubernetes - https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/                                                                                                                                                                            |                                                                                                                                                                 |
|              | selector.value                 | When matching a PV, the value is used to find a match on the values. See Kubernetes - https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/                                                                                                                                                                         |                                                                                                                                                                 |
|              | size                           | Size of the volume to hold all the persisted data.                                                                                                                                                                                                                                                                                      | Size in Gi (default is 1Gi)                                                                                                                                     |
| logs         | persistLogs                    | When true, the server logs will be persisted to the volume bound according to the persistence parameters.                                                                                                                                                                                                                               | false (default) or true                                                                                                                                         |
|              | persistTransactionLogs         | When true, the transaction logs will be persisted to the volume bound according to the persistence parameters.                                                                                                                                                                                                                          | false (default) or true                                                                                                                                         |
| microprofile | health.enabled                 | Specifies whether to use the [MicroProfile Health](https://www.ibm.com/support/knowledgecenter/SSEQTP_liberty/com.ibm.websphere.wlp.doc/ae/twlp_sec_json.html) endpoint (`/health`) for readiness probe of the container.                                                                                                               | false (default) or true                                                                                                                                         |
| replicaCount |                                | Describes the number of desired replica pods running at the same time.                                                                                                                                                                                                                                                                  | Default is 1. See [Replica Sets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset)                                                          |
| autoscaling  | enabled                        | Specifies whether a horizontal pod autoscaler (HPA) is deployed. Note that enabling this field disables the `replicaCount` field.                                                                                                                                                                                                       | false (default) or true                                                                                                                                         |
|              | minReplicas                    | Lower limit for the number of pods that can be set by the autoscaler.                                                                                                                                                                                                                                                                   | Positive integer (default to 1)                                                                                                                                 |
|              | maxReplicas                    | Upper limit for the number of pods that can be set by the autoscaler. Cannot be lower than `minReplicas`.                                                                                                                                                                                                                               | Positive integer (default to 10)                                                                                                                                |
|              | targetCPUUtilizationPercentage | Target average CPU utilization (represented as a percentage of requested CPU) over all the pods.                                                                                                                                                                                                                                        | Integer between 1 and 100 (default to 50)                                                                                                                       |
| resources    | constraints.enabled            | Specifies whether the resource constraints specified in this Helm chart are enabled.                                                                                                                                                                                                                                                    | false (default) or true                                                                                                                                         |
|              | limits.cpu                     | Describes the maximum amount of CPU allowed.                                                                                                                                                                                                                                                                                            | Default is 500m. See Kubernetes - [meaning of CPU](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)        |
|              | limits.memory                  | Describes the maximum amount of memory allowed.                                                                                                                                                                                                                                                                                         | Default is 512Mi. See Kubernetes - [meaning of Memory](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) |
|              | requests.cpu                   | Describes the minimum amount of CPU required - if not specified will default to limit (if specified) or otherwise implementation-defined value.                                                                                                                                                                                         | Default is 500m. See Kubernetes - [meaning of CPU](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)        |
|              | requests.memory                | Describes the minimum amount of memory required. If not specified, the memory amount will default to the limit (if specified) or the implementation-defined value.                                                                                                                                                                      | Default is 512Mi. See Kubernetes - [meaning of Memory](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) |

##### Configuring Liberty within IBM Cloud Private

###### Liberty docker image helm chart requirements

The helm chart requires the docker image have certain directories linked. The websphere-liberty image from docker hub will already have the expected links. If you are not using this image, you must add the following to your Dockerfile:

```
ENV LOG_DIR /logs
ENV WLP_OUTPUT_DIR /opt/ibm/wlp/output
RUN mkdir /logs \
    && ln -s $WLP_OUTPUT_DIR/defaultServer /output \
    && ln -s /opt/ibm/wlp/usr/servers/defaultServer /config
```

###### Transaction log

If the server fails and restarts, then to persist the transaction logs (preserve them through server restarts) you must set logs.persistTransactionLogs to true and configure persistence in the helm chart. You must also add the following to your server.xml in your docker image.

```
<transaction
    recoverOnStartup="true"
    waitForRecovery="true" />
```

For more information about the transaction element and its attributes, see [transaction - Transaction Manager](https://www.ibm.com/support/knowledgecenter/en/SSAW57_liberty/com.ibm.websphere.liberty.autogen.nd.doc/ae/rwlp_config_transaction.html) in the Liberty documentation.

###### Persisting logs

Create a persistent volume (PV) in a shared storage, NFS for example, with the following specification:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: <persistent volume name>
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  storageClassName: <optional - must match PVC>
  nfs:
    server: <NFS Server IP>
    path: <NFS PATH>
```

Note: For NFS PATH you need to create your directory manually before deploying the persistent volume.

You can create a PV using the above template by executing:

kubectl create -f <yaml-file>

You can also create a PV from IBM Cloud Private UI by following these steps:

    From the Dashboard panel, click Create resource.
    Copy and paste the PV template.
    Click Create.

###### SSL Configuration

SSL is enabled by default. Only the secure port (9443) is exposed. Therefore, all applications must be accessed via HTTPS. It is highly recommended to set createClusterSSLConfiguration and useClusterSSLConfiguration to true to establish trust between applications.

The helm chart by default requires the Liberty docker image to have the ssl-1.0 feature installed (default websphere-liberty image includes ssl-1.0).

To turn off SSL:

1. Change service.port and service.targetPort to the nonsecure port. (default is 9080)
2. Set ssl.enabled to false.
3. If using ingress, set ingress.secureBackends to false.

###### More information

See the [Liberty documentation](https://www.ibm.com/support/knowledgecenter/en/SSAW57_liberty/as_ditamaps/was900_welcome_liberty_ndmp.html) for configuration options for deploying the Liberty server.
