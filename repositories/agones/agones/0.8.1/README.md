# `@helm-charts/agones-agones`

a library for hosting, running and scaling dedicated game servers on Kubernetes.

| Field               | Value  |
| ------------------- | ------ |
| Repository Name     | agones |
| Chart Name          | agones |
| Chart Version       | 0.8.1  |
| NPM Package Version | 0.1.0  |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Declare variables to be passed into your templates.

agones:
  metrics:
    prometheusEnabled: true
    prometheusServiceDiscovery: true
    stackdriverEnabled: false
    stackdriverProjectID: ''
  rbacEnabled: true
  registerServiceAccounts: true
  registerWebhooks: true
  crds:
    install: true
    cleanupOnDelete: true
  serviceaccount:
    controller: agones-controller
    sdk: agones-sdk
  createPriorityClass: true
  priorityClassName: agones-system
  controller:
    resources: {}
    nodeSelector: {}
    tolerations:
      - key: 'stable.agones.dev/agones-system'
        operator: 'Equal'
        value: 'true'
        effect: 'NoExecute'
    affinity:
      nodeAffinity:
        preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 1
            preference:
              matchExpressions:
                - key: stable.agones.dev/agones-system
                  operator: Exists
    generateTLS: true
    safeToEvict: false
    numWorkers: 100
    apiServerQPS: 400
    apiServerQPSBurst: 500
    http:
      port: 8080
    healthCheck:
      initialDelaySeconds: 3
      periodSeconds: 3
      failureThreshold: 3
      timeoutSeconds: 1
  ping:
    install: true
    resources: {}
    nodeSelector: {}
    tolerations:
      - key: 'stable.agones.dev/agones-system'
        operator: 'Equal'
        value: 'true'
        effect: 'NoExecute'
    affinity:
      nodeAffinity:
        preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 1
            preference:
              matchExpressions:
                - key: stable.agones.dev/agones-system
                  operator: Exists
    replicas: 2
    http:
      expose: true
      response: ok
      port: 80
      serviceType: LoadBalancer
    udp:
      expose: true
      rateLimit: 20
      port: 50000
      serviceType: LoadBalancer
    healthCheck:
      initialDelaySeconds: 3
      periodSeconds: 3
      failureThreshold: 3
      timeoutSeconds: 1
  image:
    registry: gcr.io/agones-images
    tag: 0.8.1
    controller:
      name: agones-controller
      pullPolicy: IfNotPresent
    sdk:
      name: agones-sdk
      cpuRequest: 30m
      cpuLimit: 0
      alwaysPull: false
    ping:
      name: agones-ping
      pullPolicy: IfNotPresent

gameservers:
  namespaces:
    - default
  minPort: 7000
  maxPort: 8000
```

</details>

---

# Install Agones using Helm

This chart installs the Agones application and defines deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

See [Install Agones using Helm](https://agones.dev/site/docs/installation/helm/) for installation and configuration instructions.
