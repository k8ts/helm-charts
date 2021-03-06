// Automatically generated

export interface ChartValues {
  concourse?: {
    allowSelfSignedCertificates?: any
    atcPort?: any
    authDuration?: any
    baggageclaimDriver?: any
    basicAuth?: {
      enabled?: any
    }
    containerPlacementStrategy?: any
    dockerRegistry?: any
    encryption?: {
      enabled?: any
    }
    externalURL?: any
    genericOauth?: {
      authUrl?: any
      authUrlParam?: any
      displayName?: any
      enabled?: any
      scope?: any
      tokenUrl?: any
    }
    githubAuth?: {
      apiUrl?: any
      authUrl?: any
      enabled?: any
      organization?: any
      team?: any
      tokenUrl?: any
      user?: any
    }
    gitlabAuth?: {
      apiUrl?: any
      authUrl?: any
      enabled?: any
      group?: any
      tokenUrl?: any
    }
    insecureDockerRegistry?: any
    oldResourceGracePeriod?: any
    resourceCacheCleanupInterval?: any
    resourceCheckingInterval?: any
    tsaPort?: any
  }
  credentialManager?: {
    awsSecretsManager?: {
      enabled?: any
      pipelineSecretTemplate?: any
      region?: any
      teamSecretTemplate?: any
    }
    kubernetes?: {
      enabled?: any
      keepNamespaces?: any
      namespacePrefix?: any
      teams?: any
    }
    ssm?: {
      enabled?: any
      pipelineSecretTemplate?: any
      region?: any
      teamSecretTemplate?: any
    }
    vault?: {
      authBackend?: any
      enabled?: any
      pathPrefix?: any
      url?: any
      useCaCert?: any
    }
  }
  image?: any
  imagePullPolicy?: any
  imageTag?: any
  nameOverride?: any
  persistence?: {
    enabled?: any
    worker?: {
      accessMode?: any
      size?: any
      storageClass?: any
    }
  }
  postgresql?: {
    enabled?: any
    nameOverride?: any
    postgresDatabase?: any
    postgresUser?: any
  }
  rbac?: {
    apiVersion?: any
    create?: any
    webServiceAccountName?: any
    workerServiceAccountName?: any
  }
  secrets?: {
    awsSecretsmanagerAccessKey?: any
    awsSecretsmanagerSecretKey?: any
    awsSecretsmanagerSessionToken?: any
    awsSsmAccessKey?: any
    awsSsmSecretKey?: any
    awsSsmSessionToken?: any
    basicAuthPassword?: any
    basicAuthUsername?: any
    create?: any
    hostKey?: any
    hostKeyPub?: any
    influxdbPassword?: any
    oldEncryptionKey?: any
    sessionSigningKey?: any
    vaultAppRoleId?: any
    vaultAppRoleSecretId?: any
    vaultCaCert?: any
    vaultClientCert?: any
    vaultClientKey?: any
    vaultClientToken?: any
    workerKey?: any
    workerKeyPub?: any
  }
  web?: {
    additionalAffinities?: any
    annotations?: any
    env?: any
    ingress?: {
      annotations?: any
      enabled?: any
      hosts?: any
      tls?: any
    }
    metrics?: {
      datadog?: {
        agentHost?: any
        agentHostUseHostIP?: any
        agentPort?: any
        enabled?: any
        prefix?: any
      }
      influxdb?: {
        database?: any
        enabled?: any
        insecureSkipVerify?: any
        url?: any
        username?: any
      }
      prometheus?: {
        enabled?: any
        port?: any
      }
    }
    nameOverride?: any
    nodeSelector?: any
    replicas?: any
    resources?: any
    service?: {
      annotations?: any
      atcNodePort?: any
      loadBalancerSourceRanges?: any
      tsaNodePort?: any
      type?: any
    }
    tolerations?: any
  }
  worker?: {
    additionalAffinities?: any
    annotations?: any
    env?: any
    fatalErrors?: any
    hardAntiAffinity?: any
    minAvailable?: any
    nameOverride?: any
    nodeSelector?: any
    podManagementPolicy?: any
    replicas?: any
    resources?: any
    terminationGracePeriodSeconds?: any
    tolerations?: any
    updateStrategy?: any
  }
}

