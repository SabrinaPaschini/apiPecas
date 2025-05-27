const express = require("express");
const cors = require("cors");
const pgp = require("pg-promise")();

const app = express();
const port = 3000;

// Configuração do banco
const db = pgp({
  host: "localhost",
  port: 5432,
  database: "componentesEletronicos",
  user: "postgres",
  password: "1234",
});

app.use(cors());
app.use(express.json());

// Rota GET para buscar todos os componentes no banco
app.get("/componentes", async (req, res) => {
  try {
    const componentes = await db.any("SELECT * FROM componentes");
    res.json(componentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message  });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.post("/componentes", async (req, res) => {
  const { tipo, medida, valor } = req.body;

  // Validação: não deixar de inserir se faltar dado
  if (!tipo || !medida || !valor) {
    return res.status(400).json({ error: "Campos tipo, medida e valor são obrigatórios." });
  }

  try {
    // Faz o INSERT com retorno do dado inserido
    const resultado = await db.one(
      'INSERT INTO componentes (tipo, medida, valor) VALUES ($1, $2, $3) RETURNING *;',
      [tipo, medida, valor]
    );

    // Retorna o componente inserido
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao inserir componente:', error);
    res.status(500).json({ error: "Erro ao inserir componente" });
  }
});
