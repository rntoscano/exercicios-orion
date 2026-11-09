# Exercício 3 — Boas Práticas + Múltiplos Ambientes

A API do exercício 2 (Node.js + PostgreSQL) com dois ambientes separados: **desenvolvimento** e **produção**.

## Como rodar

```bash
cp .env.example .env   # opcional: sem ele, o Compose usa valores padrão

# desenvolvimento → http://localhost:3000
docker compose -f docker-compose.dev.yml up -d --build

# produção → http://localhost:3001
docker compose -f docker-compose.prod.yml up -d --build
```

Os dois podem rodar ao mesmo tempo, porque usam portas, bancos e volumes diferentes.

## Dockerfile multi-stage

Um único `Dockerfile` com três estágios:

| Estágio | O que faz |
|---|---|
| `base` | Imagem `node:20-alpine`, `WORKDIR` e cópia do `package.json`, compartilhados pelos outros dois |
| `dev` | Instala **todas** as dependências (inclui `nodemon`) e roda `npm run dev` |
| `prod` | Instala **só** as dependências de produção (`npm ci --omit=dev`), limpa o cache do npm, define `NODE_ENV=production` e roda com o usuário `node` (sem root) |

Cada Compose escolhe o estágio com `build.target`.

## Diferenças entre os ambientes

| | Dev (`docker-compose.dev.yml`) | Prod (`docker-compose.prod.yml`) |
|---|---|---|
| Estágio do Dockerfile | `dev` | `prod` |
| Porta da API | 3000 | 3001 |
| Código | montado como volume (`./src`) | copiado para dentro da imagem |
| Live reload | sim (`nodemon --legacy-watch`) | não |
| `nodemon` na imagem | sim | não |
| Usuário | root | `node` |
| Banco | `orion_dev`, porta 5432 exposta para inspeção | `orion_prod`, sem porta exposta |
| Reinício automático | não | `restart: unless-stopped` |

## Boas práticas aplicadas

- **Camadas otimizadas:** o `package.json` é copiado e as dependências são instaladas antes do código, então mudar só o código reaproveita o cache das dependências no build
- **`.dockerignore`:** mantém `node_modules`, `.git`, `.env` e arquivos de Compose fora da imagem
- **Imagem leve:** base `alpine` e, em prod, sem dependências de desenvolvimento nem cache do npm
- **Segurança:** em prod a aplicação roda sem root e as credenciais vêm de variáveis de ambiente (`.env` fora do Git)
- **Reutilização:** um único Dockerfile serve os dois ambientes

## Por que `--legacy-watch`?

No Windows, o Docker não repassa para o container os eventos de alteração de arquivos da pasta compartilhada. O `--legacy-watch` faz o `nodemon` verificar os arquivos periodicamente, então o live reload funciona em qualquer sistema.
