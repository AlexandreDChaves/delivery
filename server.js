const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Configuração do banco de dados
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Função para conectar ao banco de dados
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Banco de dados conectado');
        return connection;
    } catch (err) {
        console.error('Erro ao conectar o banco de dados:', err);
        process.exit(1); // Encerra o processo em caso de erro
    }
}

// Inicia a conexão com o banco de dados
const db = connectToDatabase();

// Rota para listar todos os pedidos
app.get('/pedidos', async (req, res) => {
    try {
        const [results] = await (await db).query('SELECT * FROM pedidos');
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
});

// Rota para criar um novo pedido
app.post('/pedidos', async (req, res) => {
    const { cliente, sabor_pizza, tamanho } = req.body;

    // Validação dos dados de entrada
    if (!cliente || !sabor_pizza || !tamanho) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const [result] = await (await db).query(
            'INSERT INTO pedidos (cliente, sabor_pizza, tamanho) VALUES (?, ?, ?)',
            [cliente, sabor_pizza, tamanho]
        );
        res.status(201).json({ message: 'Pedido criado com sucesso', id: result.insertId });
    } catch (err) {
        console.error('Erro ao criar pedido:', err);
        res.status(500).json({ message: 'Erro ao criar pedido' });
    }
});

// Rota para atualizar o status de um pedido
app.put('/pedidos/:id', async (req, res) => {
    const { status_pedido } = req.body;
    const { id } = req.params;

    // Validação dos dados de entrada
    if (!status_pedido) {
        return res.status(400).json({ message: 'O campo status_pedido é obrigatório' });
    }

    try {
        const [result] = await (await db).query(
            'UPDATE pedidos SET status_pedido = ? WHERE id = ?',
            [status_pedido, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.json({ message: 'Status do pedido atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar pedido:', err);
        res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
});

// Rota para deletar um pedido
app.delete('/pedidos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await (await db).query('DELETE FROM pedidos WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.json({ message: 'Pedido removido com sucesso' });
    } catch (err) {
        console.error('Erro ao remover pedido:', err);
        res.status(500).json({ message: 'Erro ao remover pedido' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});