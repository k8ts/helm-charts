// Automatically generated

export interface ChartValues {
  daemonset?: {
    config?: any
    debug?: any
    enabled?: any
    modules?: any
    nodeSelector?: any
    overrideConfig?: any
    overrideModules?: any
    podAnnotations?: any
    priorityClassName?: any
    resources?: any
    tolerations?: any
  }
  deployment?: {
    config?: any
    debug?: any
    enabled?: any
    modules?: any
    nodeSelector?: any
    overrideConfig?: any
    overrideModules?: any
    podAnnotations?: any
    priorityClassName?: any
    resources?: any
    tolerations?: any
  }
  extraEnv?: any
  extraVolumeMounts?: any
  extraVolumes?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  nameOverride?: any
  nodeSelector?: any
  plugins?: any
  rbac?: {
    create?: any
    pspEnabled?: any
  }
  resources?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
}

