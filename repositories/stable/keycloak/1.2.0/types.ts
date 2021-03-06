// Automatically generated

export interface ChartValues {
  fullnameOverride?: any
  init?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
  keycloak?: {
    affinity?: any
    cli?: any
    extraArgs?: any
    extraEnv?: any
    extraInitContainers?: any
    extraVolumeMounts?: any
    extraVolumes?: any
    image?: {
      pullPolicy?: any
      pullSecrets?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      enabled?: any
      hosts?: any
      tls?: any
    }
    livenessProbe?: {
      initialDelaySeconds?: any
      timeoutSeconds?: any
    }
    nodeSelector?: any
    password?: any
    persistence?: {
      dbHost?: any
      dbName?: any
      dbPassword?: any
      dbPort?: any
      dbUser?: any
      dbVendor?: any
      deployPostgres?: any
      existingSecret?: any
      existingSecretKey?: any
    }
    podDisruptionBudget?: any
    preStartScript?: any
    readinessProbe?: {
      initialDelaySeconds?: any
      timeoutSeconds?: any
    }
    replicas?: any
    resources?: any
    securityContext?: any
    service?: {
      port?: any
      type?: any
    }
    tolerations?: any
    username?: any
  }
  nameOverride?: any
  postgresql?: {
    postgresDatabase?: any
    postgresUser?: any
    service?: {
      port?: any
    }
  }
  test?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
  }
}

