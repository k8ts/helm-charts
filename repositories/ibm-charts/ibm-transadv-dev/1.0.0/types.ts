// Automatically generated

export interface ChartValues {
  couchdb?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    password?: any
    persistence?: {
      accessMode?: any
      enabled?: any
      existingClaim?: any
      size?: any
      storageClassName?: any
      useDynamicProvisioning?: any
    }
    resources?: any
    service?: {
      internalPort?: any
      name?: any
    }
    user?: any
  }
  nameOverride?: any
  transadv?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
    service?: {
      internalPort?: any
      name?: any
      nodePort?: any
    }
  }
  transadvui?: {
    image?: {
      pullPolicy?: any
      repository?: any
      tag?: any
    }
    resources?: any
    service?: {
      internalPort?: any
      name?: any
    }
  }
}

