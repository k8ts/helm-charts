// Automatically generated

export interface ChartValues {
  additionalPodSecurityPolicies?: any
  affinity?: any
  annotations?: any
  apiserver?: {
    bypassValidatingWebhookXray?: any
    ca?: any
    disableStatusSubresource?: any
    enableMutatingWebhook?: any
    enableValidatingWebhook?: any
    groupPriorityMinimum?: any
    healthcheck?: {
      enabled?: any
    }
    useKubeapiserverFqdnForAks?: any
    versionPriority?: any
  }
  cleaner?: {
    registry?: any
    repository?: any
    tag?: any
  }
  criticalAddon?: any
  enableAnalytics?: any
  imagePullPolicy?: any
  imagePullSecrets?: any
  kubedb?: {
    registry?: any
    repository?: any
    tag?: any
  }
  logLevel?: any
  monitoring?: {
    agent?: any
    enabled?: any
    prometheus?: {
      namespace?: any
    }
    serviceMonitor?: {
      labels?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    create?: any
  }
  replicaCount?: any
  serviceAccount?: {
    create?: any
    name?: any
  }
  tolerations?: any
}

