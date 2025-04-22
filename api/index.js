const express = require("express"); // importando o express
const app = express();
const port = 3000;

const cors = require("cors"); // importando o cors, que é um pacote, que permite a conexão entre dois projetos diferentes
app.use(cors());

// midleware para aceitar o Json
app.use(express.json());

// ROTA GET

app.get("/componentes", (req, res) => {
  res.json(componentes);
});

// iniciando o servidor

let componentes = [];

// primeira rota POST para receber os dados do Angular

app.post("/componentes", (req, res) => {
  const componente = req.body;
  componentes.push(componente); // salvando temporariamente

  console.log("Componente recebido", componente);

  // uma resposta de sucesso!

  res
    .status(201)
    .json({ mensagem: "Componente recebido com sucesso", componente });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
