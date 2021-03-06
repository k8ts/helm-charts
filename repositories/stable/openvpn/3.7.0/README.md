# `@helm-charts/stable-openvpn`

A Helm chart to install an openvpn server inside a kubernetes cluster. Certificate generation is also part of the deployment, and this chart will generate client keys as needed.

| Field               | Value   |
| ------------------- | ------- |
| Repository Name     | stable  |
| Chart Name          | openvpn |
| Chart Version       | 3.7.0   |
| NPM Package Version | 0.1.0   |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for openvpn.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1

updateStrategy:
  {}
  # type: RollingUpdate
  # rollingUpdate:
  #   maxSurge: 1
  #   maxUnavailable: 0

image:
  repository: jfelten/openvpn-docker
  tag: 1.1.0
  pullPolicy: IfNotPresent
service:
  type: LoadBalancer
  externalPort: 443
  internalPort: 443
  externalIPs: []
  nodePort: 32085
  # LoadBalancerSourceRanges: 0.0.0.0/0
  # loadBalancerIP: 10.0.0.1

  ## Here annotations can be added to the openvpn service
  # annotations:
  #   external-dns.alpha.kubernetes.io/hostname: vpn.example.com
  annotations: {}

resources:
  limits:
    cpu: 300m
    memory: 128Mi
  requests:
    cpu: 300m
    memory: 128Mi
persistence:
  enabled: true
  # subPath: openvpn
  ## A manually managed Persistent Volume and Claim
  ## Requires persistence.enabled: true
  ## If defined, PVC must be created manually before volume will be bound
  # existingClaim:

  ## openvpn data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  # storageClass: "-"
  accessMode: ReadWriteOnce
  size: 2M
openvpn:
  # Network allocated for openvpn clients (default: 10.240.0.0).
  OVPN_NETWORK: 10.240.0.0
  # Network subnet allocated for openvpn client (default: 255.255.0.0).
  OVPN_SUBNET: 255.255.0.0
  # Protocol used by openvpn tcp or udp (default: udp).
  OVPN_PROTO: tcp
  # Kubernetes pod network (optional).
  OVPN_K8S_POD_NETWORK: '10.0.0.0'
  # Kubernetes pod network subnet (optional).
  OVPN_K8S_POD_SUBNET: '255.0.0.0'
  # Push a `dhcp-option DOMAIN` config
  dhcpOptionDomain: true
  # Redirect all client traffic through VPN
  redirectGateway: true
  # Arbitrary lines appended to the end of the server configuration file
  # conf: |
  #  max-clients 100
  #  client-to-client
```

</details>

---

# Helm chart for OpenVPN

This chart will install an [OpenVPN](https://openvpn.net/) server inside a kubernetes cluster. New certificates are generated on install, and a script is provided to generate client keys as needed. The chart will automatically configure dns to use kube-dns and route all network traffic to kubernetes pods and services through the vpn. By connecting to this vpn a host is effectively inside a cluster's network.

### Uses

The primary purpose of this chart was to make it easy to access kubernetes services during development. It could also be used for any service that only needs to be accessed through a vpn or as a standard vpn.

## Usage

```bash
helm repo add stable http://storage.googleapis.com/kubernetes-charts
helm install stable/openvpn
```

Wait for the external load balancer IP to become available. Check service status via: `kubectl get svc`

Please be aware that certificate generation is variable and may take some time (minutes).
Check pod status, replacing `$HELM_RELEASE` with the name of your release, via:

```bash
POD_NAME=$(kubectl get pods -l "app=openvpn,release=$HELM_RELEASE" -o jsonpath='{.items[0].metadata.name}') \
&& kubectl log "$POD_NAME" --follow
```

When all components of the openvpn chart have started use the following script to generate a client key:

```bash
#!/bin/bash

if [ $# -ne 3 ]
then
  echo "Usage: $0 <CLIENT_KEY_NAME> <NAMESPACE> <HELM_RELEASE>"
  exit
fi

KEY_NAME=$1
NAMESPACE=$2
HELM_RELEASE=$3
POD_NAME=$(kubectl get pods -n "$NAMESPACE" -l "app=openvpn,release=$HELM_RELEASE" -o jsonpath='{.items[0].metadata.name}')
SERVICE_NAME=$(kubectl get svc -n "$NAMESPACE" -l "app=openvpn,release=$HELM_RELEASE" -o jsonpath='{.items[0].metadata.name}')
SERVICE_IP=$(kubectl get svc -n "$NAMESPACE" "$SERVICE_NAME" -o go-template='{{range $k, $v := (index .status.loadBalancer.ingress 0)}}{{$v}}{{end}}')
kubectl -n "$NAMESPACE" exec -it "$POD_NAME" /etc/openvpn/setup/newClientCert.sh "$KEY_NAME" "$SERVICE_IP"
kubectl -n "$NAMESPACE" exec -it "$POD_NAME" cat "/etc/openvpn/certs/pki/$KEY_NAME.ovpn" > "$KEY_NAME.ovpn"
```

The entire list of helper scripts can be found on [templates/config-openvpn.yaml](templates/config-openvpn.yaml)

Be sure to change `KEY_NAME` if generating additional keys. Import the .ovpn file into your favorite openvpn tool like tunnelblick and verify connectivity.

## Configuration

The following table lists the configurable parameters of the `openvpn` chart and their default values,
and can be overwritten via the helm `--set` flag.

| Parameter                      | Description                                                          | Default                  |
| ------------------------------ | -------------------------------------------------------------------- | ------------------------ |
| `replicaCount`                 | amount of parallel openvpn replicas to be started                    | `1`                      |
| `updateStrategy`               | update strategy for deployment                                       | `{}`                     |
| `image.repository`             | `openvpn` image repository                                           | `jfelten/openvpn-docker` |
| `image.tag`                    | `openvpn` image tag                                                  | `1.1.0`                  |
| `image.pullPolicy`             | Image pull policy                                                    | `IfNotPresent`           |
| `service.type`                 | k8s service type exposing ports, e.g. `NodePort`                     | `LoadBalancer`           |
| `service.externalPort`         | TCP port reported when creating configuration files                  | `443`                    |
| `service.internalPort`         | TCP port on which the service works                                  | `443`                    |
| `service.nodePort`             | NodePort value if service.type is `NodePort`                         | `nil` (auto-assigned)    |
| `service.externalIPs`          | External IPs to listen on                                            | `[]`                     |
| `resources.requests.cpu`       | OpenVPN cpu request                                                  | `300m`                   |
| `resources.requests.memory`    | OpenVPN memory request                                               | `128Mi`                  |
| `resources.limits.cpu`         | OpenVPN cpu limit                                                    | `300m`                   |
| `resources.limits.memory`      | OpenVPN memory limit                                                 | `128Mi`                  |
| `persistence.enabled`          | Use a PVC to persist configuration                                   | `true`                   |
| `persistence.subPath`          | Subdirectory of the volume to mount at                               | `nil`                    |
| `persistence.existingClaim`    | Provide an existing PersistentVolumeClaim                            | `nil`                    |
| `persistence.storageClass`     | Storage class of backing PVC                                         | `nil`                    |
| `persistence.accessMode`       | Use volume as ReadOnly or ReadWrite                                  | `ReadWriteOnce`          |
| `persistence.size`             | Size of data volume                                                  | `2M`                     |
| `openvpn.OVPN_NETWORK`         | Network allocated for openvpn clients                                | `10.240.0.0`             |
| `openvpn.OVPN_SUBNET`          | Network subnet allocated for openvpn                                 | `255.255.0.0`            |
| `openvpn.OVPN_PROTO`           | Protocol used by openvpn tcp or udp                                  | `tcp`                    |
| `openvpn.OVPN_K8S_POD_NETWORK` | Kubernetes pod network (optional)                                    | `10.0.0.0`               |
| `openvpn.OVPN_K8S_POD_SUBNET`  | Kubernetes pod network subnet (optional)                             | `255.0.0.0`              |
| `openvpn.dhcpOptionDomain`     | Push a `dhcp-option DOMAIN` config                                   | `true`                   |
| `openvpn.conf`                 | Arbitrary lines appended to the end of the server configuration file | `nil`                    |
| `openvpn.redirectGateway`      | Redirect all client traffic through VPN                              | `true`                   |

This chart has been engineered to use kube-dns and route all network traffic to kubernetes pods and services,
to disable this behaviour set `openvpn.OVPN_K8S_POD_NETWORK` and `openvpn.OVPN_K8S_POD_SUBNET` to `null`.

#### Note: As configured the chart will create a route for a large 10.0.0.0/8 network that may cause issues if that is your local network. If so tweak this value to something more restrictive. This route is added, because GKE generates pods with IPs in this range.

### Certificates

New certificates are generated with each deployment.
If persistence is enabled certificate data will be persisted across pod restarts.
Otherwise new client certs will be needed after each deployment or pod restart.
