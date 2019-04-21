// Automatically generated

export interface ChartValues {
  arch?: any
  azuregateway?: {
    enabled?: any
  }
  configPath?: any
  defaultBucket?: {
    enabled?: any
    name?: any
    policy?: any
    purge?: any
  }
  fullnameOverride?: any
  gcsgateway?: {
    enabled?: any
    gcsKeyJson?: any
    projectId?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hosts?: any
    path?: any
    tls?: any
  }
  mcImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  minioAccessSercret?: any
  mode?: any
  mountPath?: any
  nameOverride?: any
  networkPolicy?: {
    allowExternal?: any
    enabled?: any
  }
  nodeSelector?: any
  persistence?: {
    accessMode?: any
    enabled?: any
    existingClaim?: any
    size?: any
    storageClass?: any
    subPath?: any
    useDynamicProvisioning?: any
  }
  replicas?: any
  resources?: any
  service?: {
    annotations?: any
    clusterIP?: any
    loadBalancerIP?: any
    port?: any
    type?: any
  }
  tolerations?: any
}

