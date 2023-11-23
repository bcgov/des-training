## Deploy to Kubernetes
In order to deploy this simple Nginx example to kubernetes we have to create a deployment
- [Kubernetes deployment documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- For the deployment we only need some basic information
 - apiVersion
 - kind
 - metadata (name, namespace)
 - containers.
- to run this deployment just run `oc apply -f ./HowTo/Kubernetes/ConfigMaps/deployment-simple.yaml`
 - to view the status of this deployment run `kubectl get pods`, if successful the status should indicate running.
 - Unlike docker you can't access this pod directly, so you have to port-forward.

@[code yaml](../../.vuepress/public/code/2023/11/simple-deployment.yaml)