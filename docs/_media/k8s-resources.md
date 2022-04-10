NAME                              SHORTNAMES   APIVERSION                               NAMESPACED   KIND
certificatesigningrequests        csr          certificates.k8s.io/v1                   false        CertificateSigningRequest
clusterrolebindings                            rbac.authorization.k8s.io/v1             false        ClusterRoleBinding
clusterroles                                   rbac.authorization.k8s.io/v1             false        ClusterRole
*configmaps                       cm           v1                                       true         ConfigMap
cronjobs                          cj           batch/v1                                 true         CronJob
customresourcedefinitions         crd,crds     apiextensions.k8s.io/v1                  false        CustomResourceDefinition
daemonsets                        ds           apps/v1                                  true         DaemonSet
*deployments                      deploy       apps/v1                                  true         Deployment
endpoints                         ep           v1                                       true         Endpoints
endpointslices                                 discovery.k8s.io/v1                      true         EndpointSlice
*horizontalpodautoscalers         hpa          autoscaling/v1                           true         HorizontalPodAutoscaler
ingressclasses                                 networking.k8s.io/v1                     false        IngressClass
*ingresses                        ing          extensions/v1beta1                       true         Ingress
*jobs                                          batch/v1                                 true         Job
*namespaces                       ns           v1                                       false        Namespace
*networkpolicies                  netpol       networking.k8s.io/v1                     true         NetworkPolicy
nodes                             no           v1                                       false        Node
*persistentvolumeclaims           pvc          v1                                       true         PersistentVolumeClaim
persistentvolumes                 pv           v1                                       false        PersistentVolume
poddisruptionbudgets              pdb          policy/v1                                true         PodDisruptionBudget
*pods                             po           v1                                       true         Pod
podsecuritypolicies               psp          policy/v1beta1                           false        PodSecurityPolicy
*replicasets                      rs           apps/v1                                  true         ReplicaSet
replicationcontrollers            rc           v1                                       true         ReplicationController
resourcequotas                    quota        v1                                       true         ResourceQuota
rolebindings                                   rbac.authorization.k8s.io/v1             true         RoleBinding
roles                                          rbac.authorization.k8s.io/v1             true         Role
runtimeclasses                                 node.k8s.io/v1                           false        RuntimeClass
*secrets                                       v1                                       true         Secret
serviceaccounts                   sa           v1                                       true         ServiceAccount
*services                         svc          v1                                       true         Service
*statefulsets                     sts          apps/v1                                  true         StatefulSet
storageclasses                    sc           storage.k8s.io/v1                        false        StorageClass
