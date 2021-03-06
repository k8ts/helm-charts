// Automatically generated

export interface ChartValues {
  autoscaling?: {
    enabled?: any
    maxReplicas?: any
    minReplicas?: any
    targetCPUUtilizationPercentage?: any
  }
  env?: {
    jvmArgs?: any
  }
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  ingress?: {
    enabled?: any
    path?: any
    rewriteTarget?: any
    secureBackends?: any
  }
  logs?: {
    consoleFormat?: any
    consoleLogLevel?: any
    consoleSource?: any
    persistLogs?: any
    persistTransactionLogs?: any
  }
  microprofile?: {
    health?: {
      enabled?: any
    }
  }
  nameOverride?: any
  persistence?: {
    name?: any
    selector?: {
      label?: any
      value?: any
    }
    size?: any
    storageClassName?: any
    useDynamicProvisioning?: any
  }
  replicaCount?: any
  resources?: {
    constraints?: {
      enabled?: any
    }
    limits?: any
    requests?: any
  }
  service?: {
    name?: any
    port?: any
    targetPort?: any
    type?: any
  }
  ssl?: {
    createClusterSSLConfiguration?: any
    enabled?: any
    useClusterSSLConfiguration?: any
  }
}

