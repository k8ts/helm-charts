// Automatically generated

export interface ChartValues {
  Agent?: {
    AlwaysPullImage?: any
    Component?: any
    Cpu?: any
    Enabled?: any
    Image?: any
    ImageTag?: any
    Memory?: any
    NodeSelector?: any
    Privileged?: any
    volumes?: any
  }
  Master?: {
    AdminPassword?: any
    AdminUser?: any
    Component?: any
    ContainerPort?: any
    Cpu?: any
    CustomConfigMap?: any
    HostName?: any
    Image?: any
    ImagePullPolicy?: any
    ImageTag?: any
    Ingress?: {
      Annotations?: any
      TLS?: any
    }
    InitScripts?: any
    InstallPlugins?: any
    JMXPort?: any
    JavaOpts?: any
    JenkinsOpts?: any
    JenkinsUriPrefix?: any
    LoadBalancerIP?: any
    LoadBalancerSourceRanges?: any
    Memory?: any
    Name?: any
    NodePort?: any
    NodeSelector?: any
    ScriptApproval?: any
    ServiceAnnotations?: any
    ServicePort?: any
    ServiceType?: any
    SlaveListenerPort?: any
    Tolerations?: any
    UseSecurity?: any
  }
  NetworkPolicy?: {
    ApiVersion?: any
    Enabled?: any
  }
  Persistence?: {
    AccessMode?: any
    Enabled?: any
    ExistingClaim?: any
    Size?: any
    StorageClass?: any
    mounts?: any
    volumes?: any
  }
  nameOverride?: any
  rbac?: {
    apiVersion?: any
    install?: any
    roleRef?: any
    serviceAccountName?: any
  }
}

