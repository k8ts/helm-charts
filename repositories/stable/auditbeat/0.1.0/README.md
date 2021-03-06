# `@helm-charts/stable-auditbeat`

A lightweight shipper to audit the activities of users and processes on your systems

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | stable    |
| Chart Name          | auditbeat |
| Chart Version       | 0.1.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
image:
  repository: docker.elastic.co/beats/auditbeat
  tag: 6.2.4
  pullPolicy: IfNotPresent

config:
  auditbeat.modules:
    - module: auditd
      # keep this 0 and be more selective in auditd rules to rate-limit without dropping audit events
      rate_limit: 0
      # maximum number of audit messages that will be buffered by the kernel
      backlog_limit: 8196
      # See https://www.elastic.co/guide/en/beats/auditbeat/current/auditbeat-module-auditd.html for more info
      audit_rules: |
        # Things that affect identity.
        -w /etc/group -p wa -k identity
        -w /etc/passwd -p wa -k identity
        -w /etc/gshadow -p wa -k identity
        -w /etc/shadow -p wa -k identity
        # Unauthorized access attempts to files (unsuccessful).
        -a always,exit -F arch=b32 -S open,creat,truncate,ftruncate,openat,open_by_handle_at -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -F key=access
        -a always,exit -F arch=b32 -S open,creat,truncate,ftruncate,openat,open_by_handle_at -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -F key=access
        -a always,exit -F arch=b64 -S open,truncate,ftruncate,creat,openat,open_by_handle_at -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -F key=access
        -a always,exit -F arch=b64 -S open,truncate,ftruncate,creat,openat,open_by_handle_at -F exit=-EPERM -F auid>=1000 -F auid!=4294967295 -F key=access
        ## for development
        # failure_mode: log
        # include_raw_message: true
        # include_warnings: true
    - module: file_integrity
      paths:
        - /bin
        - /usr/bin
        - /sbin
        - /usr/sbin
        - /etc

  processors:
    - add_cloud_metadata:

  queue:
    {}
    ## Queue type by name (default 'mem')
    ## The memory queue will present all available events (up to the outputs
    ## bulk_max_size) to the output, the moment the output is ready to server
    ## another batch of events.
    # mem:
    ## Max number of events the queue can buffer.
    # events: 4096
    ## Hints the minimum number of events stored in the queue,
    ## before providing a batch of events to the outputs.
    ## A value of 0 (the default) ensures events are immediately available
    ## to be sent to the outputs.
    # flush.min_events: 2048
    ## Maximum duration after which events are available to the outputs,
    ## if the number of events stored in the queue is < min_flush_events.
    # flush.timeout: 1s

  # When a key contains a period, use this format for setting values on the command line:
  # --set config."output\.file".enabled=false
  output.file:
    path: '/usr/share/auditbeat/data'
    filename: auditbeat
    rotate_every_kb: 10000
    number_of_files: 5

  # output.elasticsearch:
  #  hosts: ["elasticsearch:9200"]
  #  protocol: "https"
  #  username: "elastic"
  #  password: "changeme"

# List of beat plugins
plugins:
  []
  # - kinesis.so

# Additional container arguments
extraArgs:
  []
  # - -d
  # - *

# A map of additional environment variables
extraVars:
  {}
  # test1: "test2"

# Add additional volumes and mounts, for example to read other log files on the host
extraVolumes:
  []
  # - hostPath:
  #     path: /var/log
  #   name: varlog
extraVolumeMounts:
  []
  # - name: varlog
  #   mountPath: /host/var/log
  #   readOnly: true

## Labels to be added to pods
podLabels: {}

## Annotations to be added to pods
podAnnotations: {}

resources:
  {}
  ## We usually recommend not to specify default resources and to leave this as a conscious
  ## choice for the user. This also increases chances charts run on environments with little
  ## resources, such as Minikube. If you do want to specify resources, uncomment the following
  ## lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 200Mi
  # requests:
  #  cpu: 100m
  #  memory: 100Mi

## Node labels for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
nodeSelector: {}

## Affinity configuration for pod assignment
## Ref: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
affinity: {}

rbac:
  # Specifies whether RBAC resources should be created
  create: true

serviceAccount:
  # Specifies whether a ServiceAccount should be created
  create: true
  # The name of the ServiceAccount to use.
  # If not set and create is true, a name is generated using the fullname template
  name:
```

</details>

---

# Auditbeat

[Auditbeat](https://www.elastic.co/guide/en/beats/auditbeat/current/index.html) is a lightweight shipper to audit the activities of users and processes on your systems, so that you can identify potential security policy violations. You can use Auditbeat to collect audit events from the Linux Audit Framework. You can also use Auditbeat for file integrity check, that is to detect changes to critical files, like binaries and configuration files.

## Introduction

This chart deploys auditbeat agents to all the nodes in your cluster via a DaemonSet.

By default this chart only ships a single output to a file on the local system. Users should set config.output.file.enabled=false and configure their own outputs as [documented](https://www.elastic.co/guide/en/beats/auditbeat/current/configuring-output.html)

## Prerequisites

- Kubernetes 1.9+

## Installing the Chart

To install the chart with the release name `my-release`, run:

```bash
$ helm install --name my-release stable/auditbeat
```

After a few minutes, you should see service statuses being written to the configured output, which is a log file inside the auditbeat container.

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
$ helm delete my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

The following table lists the configurable parameters of the auditbeat chart and their default values.

| Parameter                           | Description                                                                                                                                                                                           | Default                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `image.repository`                  | The image repository to pull from                                                                                                                                                                     | `docker.elastic.co/beats/auditbeat` |
| `image.tag`                         | The image tag to pull                                                                                                                                                                                 | `6.2.4`                             |
| `image.pullPolicy`                  | Image pull policy                                                                                                                                                                                     | `IfNotPresent`                      |
| `rbac.create`                       | If true, create & use RBAC resources                                                                                                                                                                  | `true`                              |
| `rbac.serviceAccount`               | existing ServiceAccount to use (ignored if rbac.create=true)                                                                                                                                          | `default`                           |
| `config`                            | The content of the configuration file consumed by auditbeat. See the [auditbeat documentation](https://www.elastic.co/guide/en/beats/auditbeat/current/auditbeat-reference-yml.html) for full details |
| `plugins`                           | List of beat plugins                                                                                                                                                                                  |
| `extraVars`                         | A map of additional environment variables                                                                                                                                                             |                                     |
| `extraVolumes`, `extraVolumeMounts` | Additional volumes and mounts, for example to provide other configuration files                                                                                                                       |                                     |
| `resources.requests.cpu`            | CPU resource requests                                                                                                                                                                                 |                                     |
| `resources.limits.cpu`              | CPU resource limits                                                                                                                                                                                   |                                     |
| `resources.requests.memory`         | Memory resource requests                                                                                                                                                                              |                                     |
| `resources.limits.memory`           | Memory resource limits                                                                                                                                                                                |                                     |

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example,

```bash
$ helm install --name my-release \
    --set rbac.create=true \
    stable/auditbeat
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example,

```bash
$ helm install --name my-release -f values.yaml stable/auditbeat
```

> **Tip**: You can use the default [values.yaml](values.yaml)
