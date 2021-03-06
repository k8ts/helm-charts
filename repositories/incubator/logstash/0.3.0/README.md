# `@helm-charts/incubator-logstash`

A Helm chart for logstash

| Field               | Value     |
| ------------------- | --------- |
| Repository Name     | incubator |
| Chart Name          | logstash  |
| Chart Version       | 0.3.0     |
| NPM Package Version | 0.1.0     |

<details>

<summary>Helm chart `values.yaml` (default values)</summary>

```yaml
# Default values for logstash.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.
replicaCount: 1
image:
  repository: docker.elastic.co/logstash/logstash-oss
  tag: 6.0.0
  pullPolicy: IfNotPresent
service:
  type: NodePort
  internalPort: 1514
  ports:
    - name: 'syslog-tcp'
      protocol: TCP
      containerPort: 1514
    - name: 'syslog-udp'
      protocol: UDP
      containerPort: 1514
    - name: 'filebeat-tcp'
      protocol: TCP
      containerPort: 5044

ingress:
  enabled: false
  # Used to create an Ingress and Service record.
  # hosts:
  #   - name: "logstash-udp.local"
  #     protocol: UDP
  #     serviceName: logstash-udp
  #     servicePort: 514
  annotations:
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  tls:
    # Secrets must be manually created in the namespace.
    # - secretName: chart-example-tls
    #   hosts:
    #     - chart-example.local
resources:
  {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #  cpu: 100m
  #  memory: 128Mi
  # requests:
  #  cpu: 100m
  #  memory: 128Mi

elasticsearch:
  host: 'elasticsearch-client.default.svc.cluster.local'
  port: 9200

# patterns for filters
# each element will be turned into it's own pattern file
patterns:
  # testpattern: |-
  #     TESTING {"foo":.*}$

inputs:
  main: |-
    input {
      tcp {
        port => "${SYSLOG_PORT}"
        type => syslog
      }
      udp {
        port => 1514
        type => syslog
      }
      beats {
        port => 5044
      }
    }

filters:
  # main: |-
  #   filter {
  #   }

outputs:
  main: |-
    output {
      elasticsearch {
        hosts => ["${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
      }
    }
```

</details>
