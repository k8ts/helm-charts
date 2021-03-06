// Automatically generated

export interface ChartValues {
  appVersion?: any
  client?: {
    antiAffinity?: any
    heapSize?: any
    name?: any
    nodeSelector?: any
    podAnnotations?: any
    replicas?: any
    resources?: any
    serviceAnnotations?: any
    serviceType?: any
    tolerations?: any
  }
  cluster?: {
    config?: any
    env?: any
    kubernetesDomain?: any
    name?: any
    xpackEnable?: any
  }
  data?: {
    antiAffinity?: any
    exposeHttp?: any
    heapSize?: any
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      name?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    replicas?: any
    resources?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
  }
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    antiAffinity?: any
    exposeHttp?: any
    heapSize?: any
    name?: any
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      name?: any
      size?: any
      storageClass?: any
    }
    podAnnotations?: any
    replicas?: any
    resources?: any
    tolerations?: any
  }
  nameOverride?: any
}

