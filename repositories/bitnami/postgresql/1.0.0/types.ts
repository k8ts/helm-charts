// Automatically generated

export interface ChartValues {
  Resources?: any
  image?: {
    debug?: any
    pullPolicy?: any
    pullSecrets?: any
    registry?: any
    repository?: any
    tag?: any
  }
  livenessProbe?: {
    enabled?: any
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
      pullSecrets?: any
      registry?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    podAnnotations?: any
    podLabels?: any
    resources?: any
    service?: {
      annotations?: any
      loadBalancerIP?: any
      type?: any
    }
    tolerations?: any
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    accessModes?: any
    annotations?: any
    enabled?: any
    size?: any
    storageClass?: any
  }
  postgresqlDatabase?: any
  postgresqlPassword?: any
  postgresqlUsername?: any
  readinessProbe?: {
    enabled?: any
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replication?: {
    enabled?: any
    password?: any
    slaveReplicas?: any
    user?: any
  }
  service?: {
    port?: any
    type?: any
  }
  tolerations?: any
}

