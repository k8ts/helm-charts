// Automatically generated

export interface ChartValues {
  additionalPorts?: any
  affinity?: any
  configurationOverrides?: any
  external?: {
    domain?: any
    enabled?: any
    firstListenerPort?: any
    init?: {
      image?: any
      imagePullPolicy?: any
      imageTag?: any
    }
    servicePort?: any
  }
  heapOptions?: any
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  logSubPath?: any
  metrics?: {
    jmx?: {
      enabled?: any
      image?: any
      imageTag?: any
      kafkaConfig?: any
      port?: any
    }
    kafka?: {
      enabled?: any
      image?: any
      imageTag?: any
    }
  }
  nameOverride?: any
  nodeSelector?: any
  persistence?: {
    enabled?: any
    mountPath?: any
    size?: any
    storageClass?: any
  }
  podManagementPolicy?: any
  readinessProbe?: {
    failureThreshold?: any
    initialDelaySeconds?: any
    periodSeconds?: any
    successThreshold?: any
    timeoutSeconds?: any
  }
  replicas?: any
  resources?: any
  schedulerName?: any
  terminationGracePeriodSeconds?: any
  tolerations?: any
  updateStrategy?: any
  zookeeper?: {
    enabled?: any
    nameOverride?: any
    port?: any
    url?: any
  }
}

