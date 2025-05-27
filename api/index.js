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
