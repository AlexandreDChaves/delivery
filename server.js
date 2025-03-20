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

app.get('/', (req, res) => {
    res.send("Servidor ok!")
})

app.listen(port, () => {
    
})