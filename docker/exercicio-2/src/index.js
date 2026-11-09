const express = require("express");
const { pool, criarTabela } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do exercício 2 funcionando!");
});

app.get("/mensagens", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM mensagens ORDER BY id");
  res.json(rows);
});

app.post("/mensagens", async (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ erro: "O campo texto é obrigatório" });
  }

  const { rows } = await pool.query(
    "INSERT INTO mensagens (texto) VALUES ($1) RETURNING *",
    [texto]
  );
  res.status(201).json(rows[0]);
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
