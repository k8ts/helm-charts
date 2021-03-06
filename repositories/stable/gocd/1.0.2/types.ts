// Automatically generated

export interface ChartValues {
  agent?: {
    env?: {
      agentAutoRegisterEnvironemnts?: any
      agentAutoRegisterHostname?: any
      agentAutoRegisterKey?: any
      agentAutoRegisterResources?: any
      goAgentBootstrapperArgs?: any
      goAgentBootstrapperJvmArgs?: any
      goAgentSystemProperties?: any
      goServerUrl?: any
    }
    goServerUrl?: any
    healthCheck?: {
      enabled?: any
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      pvSelector?: any
      size?: any
      storageClass?: any
      subpath?: {
        dockerEntryPoint?: any
        homego?: any
      }
    }
    replicaCount?: any
  }
  fullnameOverride?: any
  nameOverride?: any
  nodeSelector?: any
  rbac?: {
    apiVersion?: any
    create?: any
    roleRef?: any
  }
  server?: {
    enabled?: any
    env?: {
      extraEnvVars?: any
      goServerSystemProperties?: any
    }
    healthCheck?: {
      failureThreshold?: any
      initialDelaySeconds?: any
      periodSeconds?: any
    }
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
    }
    nodeSelector?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      pvSelector?: any
      size?: any
      storageClass?: any
      subpath?: {
        dockerEntryPoint?: any
        godata?: any
        homego?: any
      }
    }
    resources?: any
    service?: {
      annotations?: any
      externalPort?: any
      httpPort?: any
      httpsPort?: any
      nodeHttpPort?: any
      nodeHttpsPort?: any
      type?: any
    }
  }
  serviceAccount?: {
    create?: any
    name?: any
  }
}

