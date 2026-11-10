# Imagem oficial do MongoDB como base dos dois ambientes
FROM mongo:7 AS base
ENV MONGO_INITDB_DATABASE=blog

# Desenvolvimento: os scripts de carga são montados por volume
# pelo docker-compose.dev.yml, então nada é copiado para a imagem
FROM base AS dev

# Produção: os scripts de carga ficam dentro da imagem,
# sem depender de nenhuma pasta do computador
FROM base AS prod
COPY --chown=mongodb:mongodb scripts/ /docker-entrypoint-initdb.d/
