// Automatically generated

export interface ChartValues {
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    annotations?: any
    enabled?: any
    hostname?: any
    tls?: any
  }
  nameOverride?: any
  podLabels?: any
  rbac?: {
    create?: any
    serviceAccountName?: any
  }
  redis?: {
    enabled?: any
    master?: {
      port?: any
    }
  }
  replicaCount?: any
  resources?: any
  securityContext?: any
  service?: {
    annotations?: any
    externalPort?: any
    internalPort?: any
    labels?: any
    type?: any
  }
}

