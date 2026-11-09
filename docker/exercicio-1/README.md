# Exercício 1 — Dockerfile + Compose: "Hello Container"

Aplicação Node.js (Express) que responde **"Hello from Docker!"**.

## Como rodar

```bash
docker compose up --build
```

Acesse http://localhost:3000

## O que foi feito

- **Dockerfile** com imagem leve `node:20-alpine`, `WORKDIR`, instalação das dependências e `CMD`
- **docker-compose.yml** que faz o build, expõe a porta `3000:3000` e monta `src/` como volume
- **.dockerignore** para não copiar `node_modules`, `.git` e `.env` para a imagem
