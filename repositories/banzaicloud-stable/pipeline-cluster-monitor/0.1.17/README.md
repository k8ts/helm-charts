# `@helm-charts/banzaicloud-stable-pipeline-cluster-monitor`

Monitoring chart to deploy on clusters managed by Banzai Cloud Pipeline

| Field               | Value                    |
| ------------------- | ------------------------ |
| Repository Name     | banzaicloud-stable       |
| Chart Name          | pipeline-cluster-monitor |
| Chart Version       | 0.1.17                   |
| NPM Package Version | 0.1.0                    |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for pipeline-cluster-monitor
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

prometheus:
  nodeExporter:
    enabled: true
  alertmanager:
    enabled: false
  pushgateway:
    enabled: true
    image:
      repository: banzaicloud/pushgateway
      tag: v0.5.2-banzaicloud-0.0.1
      pullPolicy: IfNotPresent
    extraArgs:
      push.accept-timestamp: 'true'

  server:
    baseURL: /prometheus
    prefixURL: /prometheus
    ingress:
      enabled: false
      hosts:
        - '/prometheus'
      annotations:
        kubernetes.io/ingress.class: traefik
        traefik.frontend.rule.type: PathPrefix
        traefik.ingress.kubernetes.io/ssl-redirect: 'true'
    global:
      scrape_interval: 15s
    configMapOverrideName: prometheus-server
    persistentVolume:
      # This size is required because specific cloud provider requires at least 20Gi for storage
      size: 20Gi
  ## Prometheus server ConfigMap entries
  ##
  serverFiles:
    alerts: {}
    rules: {}

    prometheus.yml:
      rule_files:
        - /etc/config/rules
        - /etc/config/alerts

      scrape_configs:
        - job_name: prometheus
          metrics_path: /prometheus/metrics
          static_configs:
            - targets:
                - localhost:9090

        # A scrape configuration for running Prometheus on a Kubernetes cluster.
        # This uses separate scrape configs for cluster components (i.e. API server, node)
        # and services to allow each to use different authentication configs.
        #
        # Kubernetes labels will be added as Prometheus labels on metrics via the
        # `labelmap` relabeling action.

        # Scrape config for API servers.
        #
        # Kubernetes exposes API servers as endpoints to the default/kubernetes
        # service so this uses `endpoints` role and uses relabelling to only keep
        # the endpoints associated with the default/kubernetes service using the
        # default named port `https`. This works for single API server deployments as
        # well as HA API server deployments.
        - job_name: 'kubernetes-apiservers'

          kubernetes_sd_configs:
            - role: endpoints

          # Default to scraping over https. If required, just disable this or change to
          # `http`.
          scheme: https

          # This TLS & bearer token file config is used to connect to the actual scrape
          # endpoints for cluster components. This is separate to discovery auth
          # configuration because discovery & scraping are two separate concerns in
          # Prometheus. The discovery auth config is automatic if Prometheus runs inside
          # the cluster. Otherwise, more config options have to be provided within the
          # <kubernetes_sd_config>.
          tls_config:
            ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
            # If your node certificates are self-signed or use a different CA to the
            # master CA, then disable certificate verification below. Note that
            # certificate verification is an integral part of a secure infrastructure
            # so this should only be disabled in a controlled environment. You can
            # disable certificate verification by uncommenting the line below.
            #
            insecure_skip_verify: true
          bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

          # Keep only the default/kubernetes service endpoints for the https port. This
          # will add targets for each API server which Kubernetes adds an endpoint to
          # the default/kubernetes service.
          relabel_configs:
            - source_labels:
                [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
              action: keep
              regex: default;kubernetes;https

        - job_name: 'kubernetes-nodes'

          # Default to scraping over https. If required, just disable this or change to
          # `http`.
          scheme: https

          # This TLS & bearer token file config is used to connect to the actual scrape
          # endpoints for cluster components. This is separate to discovery auth
          # configuration because discovery & scraping are two separate concerns in
          # Prometheus. The discovery auth config is automatic if Prometheus runs inside
          # the cluster. Otherwise, more config options have to be provided within the
          # <kubernetes_sd_config>.
          tls_config:
            ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
            # If your node certificates are self-signed or use a different CA to the
            # master CA, then disable certificate verification below. Note that
            # certificate verification is an integral part of a secure infrastructure
            # so this should only be disabled in a controlled environment. You can
            # disable certificate verification by uncommenting the line below.
            #
            insecure_skip_verify: true
          bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

          kubernetes_sd_configs:
            - role: node

          relabel_configs:
            - action: labelmap
              regex: __meta_kubernetes_node_label_(.+)
            - target_label: __address__
              replacement: kubernetes.default.svc:443
            - source_labels: [__meta_kubernetes_node_name]
              regex: (.+)
              target_label: __metrics_path__
              replacement: /api/v1/nodes/${1}/proxy/metrics

        - job_name: 'kubernetes-nodes-cadvisor'

          # Default to scraping over https. If required, just disable this or change to
          # `http`.
          scheme: https

          # This TLS & bearer token file config is used to connect to the actual scrape
          # endpoints for cluster components. This is separate to discovery auth
          # configuration because discovery & scraping are two separate concerns in
          # Prometheus. The discovery auth config is automatic if Prometheus runs inside
          # the cluster. Otherwise, more config options have to be provided within the
          # <kubernetes_sd_config>.
          tls_config:
            ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
            # If your node certificates are self-signed or use a different CA to the
            # master CA, then disable certificate verification below. Note that
            # certificate verification is an integral part of a secure infrastructure
            # so this should only be disabled in a controlled environment. You can
            # disable certificate verification by uncommenting the line below.
            #
            insecure_skip_verify: true
          bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

          kubernetes_sd_configs:
            - role: node

          # This configuration will work only on kubelet 1.7.3+
          # As the scrape endpoints for cAdvisor have changed
          # if you are using older version you need to change the replacement to
          # replacement: /api/v1/nodes/${1}:4194/proxy/metrics
          # more info here https://github.com/coreos/prometheus-operator/issues/633
          relabel_configs:
            - action: labelmap
              regex: __meta_kubernetes_node_label_(.+)
            - target_label: __address__
              replacement: kubernetes.default.svc:443
            - source_labels: [__meta_kubernetes_node_name]
              regex: (.+)
              target_label: __metrics_path__
              replacement: /api/v1/nodes/${1}/proxy/metrics/cadvisor

        # Scrape config for service endpoints.
        #
        # The relabeling allows the actual service scrape endpoint to be configured
        # via the following annotations:
        #
        # * `prometheus.io/scrape`: Only scrape services that have a value of `true`
        # * `prometheus.io/scheme`: If the metrics endpoint is secured then you will need
        # to set this to `https` & most likely set the `tls_config` of the scrape config.
        # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
        # * `prometheus.io/port`: If the metrics are exposed on a different port to the
        # service then set this appropriately.
        - job_name: 'kubernetes-service-endpoints'

          kubernetes_sd_configs:
            - role: endpoints

          relabel_configs:
            - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
              action: keep
              regex: true
            - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
              action: replace
              target_label: __scheme__
              regex: (https?)
            - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
              action: replace
              target_label: __metrics_path__
              regex: (.+)
            - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
              action: replace
              target_label: __address__
              regex: ([^:]+)(?::\d+)?;(\d+)
              replacement: $1:$2
            - action: labelmap
              regex: __meta_kubernetes_service_label_(.+)
            - source_labels: [__meta_kubernetes_namespace]
              action: replace
              target_label: kubernetes_namespace
            - source_labels: [__meta_kubernetes_service_name]
              action: replace
              target_label: kubernetes_name

        - job_name: 'prometheus-pushgateway'
          honor_labels: true

          kubernetes_sd_configs:
            - role: service

          relabel_configs:
            - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
              action: keep
              regex: pushgateway

        # Example scrape config for probing services via the Blackbox Exporter.
        #
        # The relabeling allows the actual service scrape endpoint to be configured
        # via the following annotations:
        #
        # * `prometheus.io/probe`: Only probe services that have a value of `true`
        - job_name: 'kubernetes-services'

          metrics_path: /probe
          params:
            module: [http_2xx]

          kubernetes_sd_configs:
            - role: service

          relabel_configs:
            - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_probe]
              action: keep
              regex: true
            - source_labels: [__address__]
              target_label: __param_target
            - target_label: __address__
              replacement: blackbox
            - source_labels: [__param_target]
              target_label: instance
            - action: labelmap
              regex: __meta_kubernetes_service_label_(.+)
            - source_labels: [__meta_kubernetes_namespace]
              target_label: kubernetes_namespace
            - source_labels: [__meta_kubernetes_service_name]
              target_label: kubernetes_name

        # Example scrape config for pods
        #
        # The relabeling allows the actual pod scrape endpoint to be configured via the
        # following annotations:
        #
        # * `prometheus.io/scrape`: Only scrape pods that have a value of `true`
        # * `prometheus.io/path`: If the metrics path is not `/metrics` override this.
        # * `prometheus.io/port`: Scrape the pod on the indicated port instead of the default of `9102`.
        - job_name: 'kubernetes-pods'

          kubernetes_sd_configs:
            - role: pod

          relabel_configs:
            - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
              action: keep
              regex: true
            - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
              action: replace
              target_label: __metrics_path__
              regex: (.+)
            - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
              action: replace
              regex: ([^:]+)(?::\d+)?;(\d+)
              replacement: $1:$2
              target_label: __address__
            - action: labelmap
              regex: __meta_kubernetes_pod_label_(.+)
            - source_labels: [__meta_kubernetes_namespace]
              action: replace
              target_label: kubernetes_namespace
            - source_labels: [__meta_kubernetes_pod_name]
              action: replace
              target_label: kubernetes_pod_name

grafana:
  enabled: true
  grafana.ini:
    server:
      root_url: '%(protocol)s://%(domain)s/grafana/'
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: traefik
      traefik.frontend.rule.type: PathPrefixStrip
      traefik.ingress.kubernetes.io/redirect-permanent: 'true'
      traefik.ingress.kubernetes.io/redirect-regex: ^http://(.*)
      traefik.ingress.kubernetes.io/redirect-replacement: https://$1
    path: /grafana
    hosts:
      - localhost

  sidecar:
    dashboards:
      enabled: true
      label: pipeline_grafana_dashboard
      searchNamespace: ALL
    datasources:
      enabled: true
      label: pipeline_grafana_datasource
      searchNamespace: ALL
#
#  dashboardProviders:
#    dashboardproviders.yaml:
#      apiVersion: 1
#      providers:
#      - name: 'default'
#        orgId: 1
#        folder: ''
#        type: file
#        disableDeletion: false
#        editable: true
#        options:
#          path: /var/lib/grafana/dashboards/default
#
#  dashboards:
#    default:
#      kubernetes:
#        url: https://grafana.com/api/dashboards/1621/revisions/1/download
#        datasource: Prometheus
#      pod:
#        url: https://grafana.com/api/dashboards/747/revisions/2/download
#        datasource: Prometheus
#      deployment:
#        url: https://grafana.com/api/dashboards/741/revisions/1/download
#        datasource: Prometheus
#      cluster:
#        url: https://grafana.com/api/dashboards/5312/revisions/1/download
#        datasource: Prometheus
```

</details>
