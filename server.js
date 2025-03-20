const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
})

db.connect((err) => {
    if(err) {
        console.log("Erro ao conectar ao banco de dados")
        return
    }
    console.log("Conectado com sucesso ao banco de dados")
})

app.get('/pedidos', (req, res) => {
    const sql = 'SELECT * FROM pedidos'
    db.query(sql, (err, results) => {
        if(err) throw err
        res.json(results)
    })
    
})

app.post('/pedidos', (req,res) => {
    const {cliente, sabor_pizza, tamanho} = req.body
    const sql = 'INSERT INTO pedidos (cliente, sabor_pizza, tamanho) VALUES (?, ?, ?)'
    db.query(sql, [cliente, sabor_pizza, tamanho], (err, result) => {
        if(err) throw err
        res.status(201).json({message: 'Pedido criado com sucesso', id: result.insertId})
    })
})

app.put('/pedidos/:id', (req, res) => {
    const {status_pedido} = req.body
    const sql = 'UPDATE pedidos SET status_pedido = ? WHERE id = ?'
    db.query(sql, [status_pedido, req.params.id], (err, result) => {
        if (err) throw err
        res.json({message: 'Status do pedido atualizado com sucesso!'})
    })
})

app.delete('/pedidos/:id', (req, res) => {
    const sql = 'DELETE FROM pedidos WHERE id = ?'
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err
        res.json({message: 'Pedido removido com sucesso'})
    })
})

app.listen(port, () => {

})