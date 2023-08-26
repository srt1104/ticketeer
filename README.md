# Build your own npm module of the `common` package

If you don't want to use the `@srt1104-tickets/common` npm module which contains shared code used by various microservices, and want to build your own from the `common` package in this project, follow these steps:

1. Create an account on [npm](https://npmjs.com).
2. Login and create an organization.
3. Update the `name` in the `common/package.json` file with `@<organization_name>/<module_name>`
4. Update the `version` to `1.0.0`
5. In the `common` directory, run the following commands:
   - `npm run build`
   - `npm publish`
6. Replace all the imports of `@srt1104-tickets/common` module in all the microservices with the one you just published.

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
