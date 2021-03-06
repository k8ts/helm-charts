# `@helm-charts/rancher-stable-rancher`

Install Rancher Server to manage Kubernetes clusters across providers.

| Field               | Value          |
| ------------------- | -------------- |
| Repository Name     | rancher-stable |
| Chart Name          | rancher        |
| Chart Version       | 2.1.2          |
| NPM Package Version | 0.1.0          |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Additional Trusted CAs.
# Enable this flag and add your CA certs as a secret named tls-ca-additional in the namespace.
# See README.md for details.
additionalTrustedCAs: false

antiAffinity: preferred

# Audit Logs https://rancher.com/docs/rancher/v2.x/en/installation/api-auditing/
# The audit log is piped to the console of the rancher-audit-log container in the rancher pod.
# https://rancher.com/docs/rancher/v2.x/en/installation/api-auditing/
# destination stream to sidecar container console or hostPath volume
# level: Verbosity of logs, 0 to 3. 0 is off 3 is a lot.
auditLog:
  destination: sidecar
  hostPath: /var/log/rancher/audit/
  level: 0
  maxAge: 1
  maxBackup: 1
  maxSize: 100

# Have Rancher detect and import the "local" Rancher server cluster
# Adding the "local" cluster available in the GUI can be convenient, but any user with access to this cluster has "root" on any of the clusters that Rancher manages.
# options; "auto", "false". (auto pretty much means true)
addLocal: 'auto'
# Add debug flag to Rancher server
debug: false

# Fully qualified name to reach your Rancher server
# hostname: rancher.my.org

## Optional array of imagePullSecrets containing private registry credentials
## Ref: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/
imagePullSecrets: []
# - name: secretName

### ingress ###
# Readme for details and instruction on adding tls secrets.
ingress:
  extraAnnotations: {}
  tls:
    # rancher, letsEncrypt, secrets
    source: rancher

### LetsEncrypt config ###
# ProTip: The production environment only allows you to register a name 5 times a week.
#         Use staging until you have your config right.
letsEncrypt:
  # email: none@example.com
  environment: production

# If you are using certs signed by a private CA set to 'true' and set the 'tls-ca'
# in the 'rancher-system' namespace. See the README.md for details
privateCA: false

# http[s] proxy server passed into rancher server.
# proxy: http://<username>@<password>:<url>:<port>

# comma separated list of domains or ip addresses that will not use the proxy
noProxy: 127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16

# Override rancher image location for Air Gap installs
rancherImage: rancher/rancher
# rancher/rancher image tag. https://hub.docker.com/r/rancher/rancher/tags/
# Defaults to .Chart.appVersion
# rancherImageTag: v2.0.7

# Number of Rancher server replicas.
replicas: 3

# Set pod resource requests/limits for Rancher.
resources: {}

#
# tls
#   Where to offload the TLS/SSL encryption
# - ingress (default)
# - external
tls: ingress
```

</details>
