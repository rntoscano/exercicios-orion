const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
});

// Sem este listener, uma conexão perdida com o banco derruba a API inteira
pool.on("error", (erro) => {
  console.error("Conexão com o banco perdida:", erro.message);
});

async function criarTabela() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mensagens (
      id SERIAL PRIMARY KEY,
      texto TEXT NOT NULL,
      criada_em TIMESTAMP DEFAULT NOW()
    )
  `);
}

module.exports = { pool, criarTabela };
