# `@helm-charts/cic-citrix-k8s-cpx-ingress-controller`

A Helm chart for Citrix ADC CPX with Citrix ingress Controller running as sidecar.

| Field               | Value                             |
| ------------------- | --------------------------------- |
| Repository Name     | cic                               |
| Chart Name          | citrix-k8s-cpx-ingress-controller |
| Chart Version       | 1.1.1                             |
| NPM Package Version | 0.1.0                             |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for citrix-k8s-cpx-ingress-controller.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

# cpximage contains information needed to fetch CPX image
cpximage:
  repository: quay.io/citrix/citrix-k8s-cpx-ingress
  tag: 12.1-51.16
  pullPolicy: Always
# cicimage contains information needed to fetch CIC image
cicimage:
  repository: quay.io/citrix/citrix-k8s-ingress-controller
  tag: 1.1.1
  pullPolicy: Always
# license is used accept the terms of the Citrix license
license:
  accept: no
# ingressClass is the  name of the Ingress Class
ingressClass:
# exporter conatins information of prometheus-exporter
exporter:
  require: 0
  image:
    repository: quay.io/citrix/netscaler-metrics-exporter
    tag: v1.0.4
    pullPolicy: Always
  ports:
    containerPort: 8888
```

</details>

---

# Citrix ADC CPX with Citrix ingress Controller running as sidecar.

[Citrix](https://www.citrix.com) ADC CPX with the Citrix Ingress Controller running in side-car mode will configure the CPX that runs as pod in Kubernetes cluster.

## TL;DR;

```
helm repo add cic https://citrix.github.io/citrix-k8s-ingress-controller/

helm install cic/citrix-k8s-cpx-ingress-controller --set license.accept=yes
```

> Note: "license.accept" is a mandatory argument and should be set to "yes" to accept the terms of the Citrix license.

## Introduction

This Chart deploys Citrix ADC CPX with inbuilt Ingress Controller in the [Kubernetes](https://kubernetes.io) Cluster using [Helm](https://helm.sh) package manager

### Prerequisites

- Kubernetes 1.6+
- Helm 2.8.x+
- Prometheus operator needs to be installed if you want to use exporter along with CIC.

## Installing the Chart

Add the Citrix Ingress Controller helm chart repository using command:

```
helm repo add cic https://citrix.github.io/citrix-k8s-ingress-controller/
```

To install the chart with the release name `my-release`:

`helm install cic/citrix-k8s-cpx-ingress-controller --name my-release --set license.accept=yes,ingressClass[0]=<ingressClassName>`

To run the exporter as sidecar with CPX, please install prometheus operator first and then use the following command:

`helm install cic/citrix-k8s-cpx-ingress-controller --name my-release --set license.accept=yes,ingressClass[0]=<ingressClassName>,exporter.require=1.0`

If you want to visualize the metrices collected by exporter from Citrix ADC CPX please refer "[Visualization of Metrics](https://github.com/citrix/citrix-k8s-ingress-controller/tree/master/metrics-visualizer#visualization-of-metrics)".

The command deploys Citrix ADC CPX with Citrix Ingress Controller running in side-car mode on the Kubernetes cluster in the default configuration. The configuration section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```
helm delete --purge my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release

## Configuration

The following table lists the configurable parameters of the CPX with inBuilt Ingress Controller chart and their default values.

| Parameter                      | Description                                             | Default                                        |
| ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- |
| `license.accept`               | Set to accept to accept the terms of the Citrix license | `no`                                           |
| `cpximage.repository`          | CPX Image Repository                                    | `quay.io/citrix/citrix-k8s-cpx-ingress`        |
| `cpximage.tag`                 | CPX Image Tag                                           | `12.1-51.16`                                   |
| `cpximage.pullPolicy`          | CPX Image Pull Policy                                   | `Always`                                       |
| `cicimage.repository`          | CIC Image Repository                                    | `quay.io/citrix/citrix-k8s-ingress-controller` |
| `cicimage.tag`                 | CIC Image Tag                                           | `1.1.1`                                        |
| `cicimage.pullPolicy`          | CIC Image Pull Policy                                   | `Always`                                       |
| `exporter.require`             | Exporter to be run as sidecar with CIC                  | `0`                                            |
| `exporter.image.repository`    | Exporter image repository                               | `quay.io/citrix/netscaler-metrics-exporter`    |
| `exporter.image.tag`           | Exporter image tag                                      | `v1.0.4`                                       |
| `exporter.image.pullPolicy`    | Exporter Image Pull Policy                              | `Always`                                       |
| `exporter.ports.containerPort` | Exporter Container Port                                 | `8888`                                         |
| `ingressClass`                 | List containing name of the Ingress Classes             | `nil`                                          |

> Tip: You can use the default [values.yaml](https://github.com/citrix/citrix-k8s-ingress-controller/tree/master/charts/stable/citrix-k8s-cpx-ingress-controller/values.yaml)

## RBAC

By default the chart will install the recommended [RBAC](https://kubernetes.io/docs/admin/authorization/rbac/) roles and rolebindings.

## Exporter

[Exporter](https://github.com/citrix/netscaler-metrics-exporter) is running as sidecar with the CPX and pulling metrics from the CPX. It exposes the metrics using Kubernetes NodePort.

## Ingress Class

To know more about Ingress Class refer [this](https://github.com/citrix/citrix-k8s-ingress-controller/blob/master/docs/ingress-class.md).

## For More Info: https://github.com/citrix/citrix-k8s-ingress-controller
