// Automatically generated

export interface ChartValues {
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  master?: {
    config?: any
    maxSurge?: any
    maxUnavailable?: any
  }
  service?: {
    annotations?: any
    externalPort?: any
    extraLabels?: any
    internalPort?: any
    name?: any
    nodePort?: any
    type?: any
  }
  worker?: {
    config?: any
    maxSurge?: any
    maxUnavailable?: any
    replicaCount?: any
    resources?: any
  }
}

