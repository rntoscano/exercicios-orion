# Banco de Dados

Exercícios de banco relacional (PostgreSQL) e não relacional (MongoDB).

## Ambiente

O `docker-compose.yml` desta pasta é o arquivo do material de apoio, sem alterações. Ele sobe os dois bancos ao mesmo tempo:

```bash
cd banco-de-dados
docker compose up -d
docker compose ps   # os dois serviços devem aparecer como "healthy"
```

![Ambiente com PostgreSQL e MongoDB rodando](prints/ambiente.png)

| Serviço | Container | Imagem | Porta |
|---|---|---|---|
| `db_postgres` | `orion_postgres_db` | `postgres:16-alpine` | `5432` |
| `db_mongo` | `orion_mongo_db` | `mongo:latest` | `27017` |

### Dados de conexão

**PostgreSQL** (DBeaver, Beekeeper, pgAdmin)

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Porta | `5432` |
| Banco | `orion_db` |
| Usuário | `orion_user` |
| Senha | `orion_password` |

**MongoDB** (Compass, mongosh)

```
mongodb://orion_admin:orion_admin_pass@localhost:27017/
```

> As credenciais são as do enunciado e servem só para estudo local.

### Acessando pelo terminal

```bash
docker compose exec db_postgres psql -U orion_user -d orion_db
docker compose exec db_mongo mongosh -u orion_admin -p orion_admin_pass
```

## Exercícios

| Exercício | Tema |
|---|---|
| Exercício 1 | SQL básico: `CREATE TABLE`, chaves e `INSERT` |
| Exercício 2 | `JOIN`, `WHERE` e `UPDATE` |
| Exercício 3 | MongoDB: CRUD básico e schema flexível |
| Exercício 4 | MongoDB: consultas avançadas e Compose dev/prod |
