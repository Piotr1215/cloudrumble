# Examples and exercises

Examples showcase using different mechanisms to configure and deploy a voting app

## Vanilla Docker

With docker the only option is to run commands manually or from a shell/powershell script.

Commands:

- Redis: `docker run -d --name=redis redis`
- PostgreSQL: `docker run -d --name=db postgresq`
- Voting App: `docker run -d --name=vote -p 5000:80 --link redis:redis voting-app`
- Results App: `docker run -d --name=result -p 5001:80 result-app`
- Worker Service: `docker run -d --name=worker worker`

## Docker Compose

## Docker Swarm

## Kubernetes

## Docker Enterprise