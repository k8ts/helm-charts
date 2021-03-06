// Automatically generated

export interface ChartValues {
  affinity?: any
  fullnameOverride?: any
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  imagePullPolicy?: any
  ingress?: {
    annotations?: any
    enabled?: any
    hostName?: any
    tls?: any
    tlsSecret?: any
  }
  livenessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    timeoutSeconds?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
  }
  rabbitmq?: {
    configuration?: any
    erlangCookie?: any
    managerPort?: any
    nodePort?: any
    password?: any
    plugins?: any
    username?: any
  }
  rabbitmqClusterNodeName?: any
  rabbitmqDiskFreeLimit?: any
  rabbitmqManagerPort?: any
  rabbitmqNodeName?: any
  rabbitmqNodePort?: any
  rabbitmqNodeType?: any
  rabbitmqUsername?: any
  rabbitmqVhost?: any
  rbacEnabled?: any
  readinessProbe?: {
    enabled?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    timeoutSeconds?: any
  }
  replicas?: any
  resources?: any
  serviceType?: any
  tolerations?: any
}

