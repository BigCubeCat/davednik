# Davednik

## Run

### run docker

`docker compose up -d`

### Setup database (IMPORTANT)

- Login root (default password in docker-compose.yml)
  `arangosh --server.endpoint tcp://127.0.0.1:8529 --server.username root --server.password eqakMXZumC7E3i9Fxt41JWpgBvVfSmgs`
- Run code from `db_init.js`
  Run `require("./db_init.js");`

- Logout
- Login user (default user - user)
  `arangosh --server.endpoint tcp://127.0.0.1:8529 --server.database main --server.username user --server.password password`
- Run code from
  Run`require("./collections_init.js");`
