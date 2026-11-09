# Desafio Extra — Aplicação Completa com Docker Compose

Stack com três serviços orquestrados pelo Docker Compose:

| Serviço | Imagem | Porta | Função |
|---|---|---|---|
| `api` | Dockerfile próprio (`node:20-alpine`) | 3000 | API de mensagens em Node.js + Express |
| `db` | `postgres:16-alpine` | — | Banco de dados (só acessível pela rede interna) |
| `adminer` | `adminer:5` | 8080 | Interface web para ver e editar os dados do banco |

## Estrutura

```
exercicio-extra/
├── api/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── src/
│       ├── index.js
│       └── db.js
├── docker-compose.yml
└── .env.example
```

## Como rodar

```bash
cp .env.example .env   # opcional: sem ele, o Compose usa valores padrão
docker compose up -d --build
```

| O quê | Endereço |
|---|---|
| Status da API | http://localhost:3000/health → `{"status":"ok","banco":"ok"}` |
| Mensagens | http://localhost:3000/mensagens |
| Adminer | http://localhost:8080/?pgsql=db&username=orion&db=orion (já abre com PostgreSQL, servidor `db`, usuário e banco preenchidos; falta só a senha do `.env`, padrão `orion123`) |

> Abrindo só `http://localhost:8080`, o Adminer vem com **MySQL** selecionado: troque o sistema para **PostgreSQL**. A imagem oficial permite pré-preencher apenas o servidor (`ADMINER_DEFAULT_SERVER=db`), não o sistema.

Para gravar uma mensagem:

```bash
curl -X POST http://localhost:3000/mensagens -H "Content-Type: application/json" -d '{"texto":"Olá!"}'
```

## Requisitos atendidos

### API
- Build por **Dockerfile customizado** multi-stage; o Compose usa o estágio `dev`
- Conecta ao banco pelo **hostname do serviço** (`db`)
- Rota **`/health`** que retorna o status da aplicação e testa a conexão com o banco
- Variáveis `DB_HOST`, `DB_USER`, `DB_PASS` e `DB_NAME` configuradas no Compose
- Imagem base leve (`node:20-alpine`)
- Código-fonte montado por volume (`./api/src`) com live reload via `nodemon`

### Banco de dados
- Imagem oficial `postgres:16-alpine`
- **Volume nomeado** `dados-postgres` para persistência
- Usuário, senha e nome do banco por variáveis de ambiente
- **Healthcheck** com `pg_isready`: a API e o Adminer só sobem depois que o banco está pronto (`depends_on` com `condition: service_healthy`)

### Interface de administração
- **Adminer** na porta `8080`, já apontando para o servidor `db` (`ADMINER_DEFAULT_SERVER`)
- Escolhido em vez do pgAdmin por ser bem mais leve e funcionar com PostgreSQL sem configuração extra

## O que mais foi feito

- **Rede nomeada** `rede-orion`, ligando os três serviços
- **`.env`** fora do Git, com `.env.example` versionado
- **Healthcheck também na API** (consulta o `/health`), então `docker compose ps` mostra se ela está saudável
- **`restart: unless-stopped`** nos três serviços
- A API responde `503` em vez de cair quando o banco fica indisponível

## Comandos úteis

```bash
docker compose ps          # status e saúde dos serviços
docker compose logs -f api # logs da API
docker compose down        # para tudo, mantendo os dados
docker compose down -v     # para tudo e apaga o volume do banco
```
