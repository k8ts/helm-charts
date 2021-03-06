# `@helm-charts/incubator-docker-registry`

private docker registry

| Field               | Value           |
| ------------------- | --------------- |
| Repository Name     | incubator       |
| Chart Name          | docker-registry |
| Chart Version       | 0.2.2           |
| NPM Package Version | 0.1.0           |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
nodePort: 30400
initialLoad: false
replicas: 1
distro:
type:
branch:
initImage: centos
initImageVersion: latest
registryImage: registry
registryImageVersion: 2
tarballURL:
persistentVolume:
  enabled: false
  accessModes:
    - ReadWriteOnce
  existingClaim: ''
  size: 20Gi
  ## docker-registry data Persistent Volume Storage Class
  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack)
  ##
  storageClass: '-'
  annotations: {}
```

</details>

---

# docker-registry Helm Chart

- Installs the [docker-registry cluster addon](https://github.com/kubernetes/kubernetes/tree/master/cluster/addons/registry).

## Installing the Chart

To install the chart with the release name `my-release`:

```bash
$ helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
$ helm install --name my-release incubator/docker-registry
```

## Configuration

| Parameter              | Description                            | Default         |
| ---------------------- | -------------------------------------- | --------------- |
| `svcName`              | Service name                           | docker-registry |
| `nodePort`             | Port from the range 30000-32000        | 30400           |
| `initialLoad`          | Load tarball with saved registry       | false           |
| `replicas`             | Number of replicas                     | 1               |
| `distro`               | Used to as a part of tarball file name | \<blank>        |
| `branch`               | Used to as a part of tarball file name | \<blank>        |
| `initImage`            | Image to use for init container        | centos          |
| `initImageVersion`     | Image version for init container       | latest          |
| `registryImage`        | Registry image to use                  | registry        |
| `registryImageVersion` | Registry image version to use          | 2               |
| `tarballURL`           | URL to tarball location                | \<blank>        |

## Usage

When docker registry is running, you can push and pull containers by using following commands:

To push local docker container to the registry:

```bash
$ docker tag {local docker container ID} 127.0.0.1:{node_port}/{local docker image name}
$ docker push 127.0.0.1:{node_port}/{local docker image name}
```

To pull a container from the registry:

```bash
$ docker pull 127.0.0.1:{node_port}/{container name}
```
