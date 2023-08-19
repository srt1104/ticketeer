# Running on a local Kubernetes cluster

1. Share JWT secret key: Run the command `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<secret_key>` to share the JWT secret key with other services that require authentication.

2. Setup ingress-nginx by running the command:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

3. Install skaffold and run the command: `skaffold dev`

4. Open `http://kubernetes.docker.internal` in the host machine to access the application.

# Miscellaneous

## Shorten command line (bash) prompt

Type `PS1='\u:\W\$ '` in the prompt and press enter.
