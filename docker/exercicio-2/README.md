# Exercício 2 — Compose com API + Banco de Dados

API Node.js (Express) que grava e lista mensagens em um PostgreSQL, os dois rodando em containers ligados pelo Docker Compose.

## Como rodar

```bash
cp .env.example .env   # ajuste a senha se quiser
docker compose up -d --build
```

Sem o `.env`, o Compose usa valores padrão (`orion` / `orion123`).

## Testando

```bash
# grava uma mensagem
curl -X POST http://localhost:3000/mensagens -H "Content-Type: application/json" -d '{"texto":"Olá banco!"}'

# lista as mensagens
curl http://localhost:3000/mensagens
```

## O que foi feito

- **api:** build pelo `Dockerfile` (mesmo padrão do exercício 1), lê `DB_HOST`, `DB_USER`, `DB_PASS` e `DB_NAME` e se conecta ao banco pelo hostname do serviço, `db`
- **db:** imagem oficial `postgres:16-alpine`, configurada por variáveis de ambiente e com o volume nomeado `dados-postgres` para os dados não se perderem
- **Rede interna:** o Compose cria uma rede onde cada serviço é encontrado pelo nome (`db`)

### Extras

- **`.env`:** as credenciais ficam em um `.env` fora do Git (está no `.gitignore`); o repositório traz só o `.env.example`
- **`depends_on` + `healthcheck`:** a API só sobe depois que o Postgres responde ao `pg_isready`. Sem isso, a API tentava conectar antes de o banco estar pronto e caía com `ECONNREFUSED`

## Persistência

```bash
docker compose down      # para e remove os containers, mas mantém o volume
docker compose up -d     # as mensagens continuam lá
docker compose down -v   # remove também o volume (apaga os dados)
```
