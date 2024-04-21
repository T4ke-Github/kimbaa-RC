# Development

## Using docker-compose
Download and install docker 

check to see if it's running by running `docker ps`

In this directory run docker compose with 
```docker compose up -d```

## Connecting to mongo-db

Connect to mongo-db by running these commands:

- `docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo-db`
- use the output of this command for the next command

- `mongosh --host <ip-from previous command> --port 2707`

- authenticate with `db.auth('root', 'example')`

(user and pw will be changed at a later time)


