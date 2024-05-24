const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3003;

// Usar middleware para analisar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'imtdb',
  database: 'mydb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para testar a conexão
app.get('/api/test', (req, res) => {
  res.send('API está funcionando!');
});

// Rota para obter todos os dados da tabela Paciente
app.get('/api/dados', (req, res) => {
  let sql = 'SELECT * FROM Paciente';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados da tabela Paciente:', err);
      res.status(500).send('Erro ao buscar dados da tabela Paciente');
      return;
    }
    console.log('Dados da tabela Paciente:');
    console.log(results); // Exibe os resultados no terminal
    res.json(results); // Retorna os resultados como JSON para o cliente
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});