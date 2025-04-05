const express = require ('express') // importando o express 
const app = express();
const port = 3000; 

// midleware para aceitar o Json 

app.use(express.json());

// ROTA GET 

app.get('/', (req, res) => {
    res.send('API está funcionando');
});

// iniciando o servidor 

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});