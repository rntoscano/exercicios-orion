# ---------- base: o que dev e prod têm em comum ----------
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---------- dev: todas as dependências + live reload ----------
FROM base AS dev
RUN npm ci
COPY src ./src
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- prod: só dependências de produção, usuário sem root ----------
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node src ./src
USER node
EXPOSE 3000
CMD ["node", "src/index.js"]
