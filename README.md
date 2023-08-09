# Running on a local Kubernetes cluster

1. Setup ingress-nginx by running the command:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

2. Install skaffold and run the command: `skaffold dev`

3. Open `http://kubernetes.docker.internal` in the host machine to access the application.
