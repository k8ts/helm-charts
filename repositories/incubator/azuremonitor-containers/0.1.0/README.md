# `@helm-charts/incubator-azuremonitor-containers`

Helm chart for deploying Azure Monitor container monitoring agent in Kubernetes

| Field               | Value                   |
| ------------------- | ----------------------- |
| Repository Name     | incubator               |
| Chart Name          | azuremonitor-containers |
| Chart Version       | 0.1.0                   |
| NPM Package Version | 0.1.0                   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for azuremonitor-containers.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

## Microsoft OMS Agent image for kubernetes cluster monitoring
## ref: https://github.com/Microsoft/OMS-docker/tree/ci_feature_prod
omsagent:
  image:
    tag: 'ciprod06072018'
    pullPolicy: IfNotPresent
    dockerProviderVersion: '2.0.0-3'
    agentVersion: '1.6.0-42'
  ## To get your workspace id and key do the following
  ## You can create a Azure Loganalytics workspace from portal.azure.com and get its ID & PRIMARY KEY from 'Advanced Settings' tab in the Ux.

  secret:
    wsid: <your_workspace_id>
    key: <your_workspace_key>
  domain: opinsights.azure.com
  env:
    clusterName: <your_cluster_name>
    doNotCollectKubeSystemLogs: 'true'
  rbac: true

  ## Configure resource requests and limits
  ## ref: http://kubernetes.io/docs/user-guide/compute-resources/
  ##
  resources:
    daemonset:
      requests:
        cpu: 50m
        memory: 200Mi
      limits:
        cpu: 150m
        memory: 750Mi
    deployment:
      requests:
        cpu: 50m
        memory: 100Mi
      limits:
        cpu: 150m
        memory: 500Mi
```

</details>

---

# Azure Monitor – Containers

---

## Introduction

This article describes how to set up and use [Azure Monitor - Containers](https://docs.microsoft.com/en-us/azure/monitoring/monitoring-container-health)) to monitor the health and performance of your workloads deployed to Kubernetes environments. Monitoring your Kubernetes cluster and containers is critical, especially when running a production cluster, at scale, with multiple applications.

_This is a private preview. If you like to be part of the private preview, please fill in the form_ [here](<(https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR5SUgbotTSlNh-jO0uLfw51UOVBTMzFCMVIyWVEzT09NWVpDOTc0UFhENC4u)>).

---

## Pre-requisites

- Kubernetes 1.7+

- You will need to create a location to store your monitoring data.

1. [Create Azure Log Analytics Workspace](https://docs.microsoft.com/en-us/azure/log-analytics/log-analytics-quick-create-workspace))

- You will need to add AzureMonitor-Containers solution to your workspace from #1 above

2. [Add the 'AzureMonitor-Containers' Solution to your Log Analytics workspace.](http://aka.ms/coinhelmdoc)

---

## Installing the Chart

```bash

$ helm install --name azuremonitorcontainers incubator/azuremonitor-containers

```

## Uninstalling the Chart

To uninstall/delete the `azuremonitorcontainers` release:

```bash

$ helm del --purge azuremonitorcontainers

```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the MSOMS chart and their default values.

The following table lists the configurable parameters of the MSOMS chart and their default values.

| Parameter                    | Description                                                        | Default                                                                          |
| ---------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `omsagent.image.tag`         | `msoms` image tag.                                                 | Most recent release                                                              |
| `omsagent.image.pullPolicy`  | `msoms` image pull policy.                                         | IfNotPresent                                                                     |
| `omsagent.secret.wsid`       | Azure Log analytics workspace id                                   | Does not have a default value, needs to be provided                              |
| `omsagent.secret.key`        | Azure Log analytics workspace key                                  | Does not have a default value, needs to be provided                              |
| `omsagent.domain`            | Azure Log analytics cloud domain (public / govt)                   | opinsights.azure.com (Public cloud as default), opinsights.azure.us (Govt Cloud) |
| `omsagent.env.clusterName`   | Name of your cluster                                               | Does not have a default value, needs to be provided                              |
| `doNotCollectKubeSystemLogs` | Disable collecting logs from containers in 'kube-system' namespace | true                                                                             |
| `omsagent.rbac`              | rbac enabled/disabled                                              | true (i.e enabled)                                                               |

You can create a Azure Loganalytics workspace from portal.azure.com and get its ID & PRIMARY KEY from 'Advanced Settings' tab in the Ux.

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash

$ helm install --name myrelease-1 \

--set omsagent.secret.wsid=<your_workspace_id>,omsagent.secret.key=<your_workspace_key>,omsagent.env.clusterName=<my_prod_cluster>  incubator/azuremonitor-containers
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash

$ helm install --name omsagent -f values.yaml incubator/azuremonitor-containers

```

After you successfully deploy the chart, you will be able to see your data in the [azure portal](aka.ms/coinprod)

If you need help with this chart, please reach us out thru [this](mailto:omscontainers@microsoft.com) email.
