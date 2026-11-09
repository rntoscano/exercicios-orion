const express = require("express");
const { pool, criarTabela } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do desafio extra funcionando!");
});

app.get("/mensagens", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM mensagens ORDER BY id");
    res.json(rows);
  } catch (erro) {
    console.error("Erro ao listar mensagens:", erro.message);
    res.status(503).json({ erro: "Banco de dados indisponível" });
  }
});

app.post("/mensagens", async (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ erro: "O campo texto é obrigatório" });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO mensagens (texto) VALUES ($1) RETURNING *",
      [texto]
    );
    res.status(201).json(rows[0]);
  } catch (erro) {
    console.error("Erro ao gravar mensagem:", erro.message);
    res.status(503).json({ erro: "Banco de dados indisponível" });
  }
});

criarTabela()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar no banco:", erro.message);
    process.exit(1);
  });
