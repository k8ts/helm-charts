// Automatically generated

export interface ChartValues {
  acme?: {
    email?: any
    enabled?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      size?: any
      storageClass?: any
    }
    staging?: any
  }
  cpuLimit?: any
  cpuRequest?: any
  dashboard?: {
    auth?: {
      basic?: any
    }
    domain?: any
    enabled?: any
    ingress?: {
      annotations?: any
    }
  }
  gzip?: {
    enabled?: any
  }
  imageTag?: any
  kubernetes?: {
    labelSelector?: any
    namespaces?: any
  }
  memoryLimit?: any
  memoryRequest?: any
  replicas?: any
  service?: {
    annotations?: any
    labels?: any
  }
  serviceType?: any
  ssl?: {
    defaultCert?: any
    defaultKey?: any
    enabled?: any
    enforced?: any
  }
}

