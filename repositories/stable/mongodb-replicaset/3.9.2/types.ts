// Automatically generated

export interface ChartValues {
  affinity?: any
  auth?: {
    adminPassword?: any
    adminUser?: any
    enabled?: any
    exisitingMetricsSecret?: any
    existingAdminSecret?: any
    existingKeySecret?: any
    existingMetricsSecret?: any
    key?: any
    metricsPassword?: any
    metricsUser?: any
  }
  configmap?: any
  copyConfigImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  extraLabels?: any
  extraVars?: any
  fullnameOverride?: any
  image?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  imagePullSecrets?: any
  init?: {
    resources?: any
    timeout?: any
  }
  initMongodStandalone?: any
  installImage?: {
    pullPolicy?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  metrics?: {
    enabled?: any
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    path?: any
    port?: any
    prometheusServiceDiscovery?: any
    resources?: any
    socketTimeout?: any
    syncTimeout?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistentVolume?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  podAnnotations?: any
  podDisruptionBudget?: any
  port?: any
  priorityClassName?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicaSetName?: any
  replicas?: any
  resources?: any
  securityContext?: {
    enabled?: any
    fsGroup?: any
    runAsNonRoot?: any
    runAsUser?: any
  }
  serviceAnnotations?: any
  terminationGracePeriodSeconds?: any
  tls?: {
    cacert?: any
    cakey?: any
    enabled?: any
  }
  tolerations?: any
}

