# Sistema de Gerenciamento de Pedidos de Pizzaria

Este é um sistema simples para gerenciar pedidos de uma pizzaria. Ele permite criar, listar, atualizar o status e remover pedidos. O sistema é composto por um **frontend** e um **backend**, que se comunicam para realizar as operações.

---

## 🚀 Funcionalidades

- **Criar Pedidos**: Adicione novos pedidos com informações como cliente, sabor da pizza e tamanho.
- **Listar Pedidos**: Visualize todos os pedidos cadastrados no banco de dados.
- **Atualizar Status**: Altere o status de um pedido (ex.: "Pendente", "Em Preparo", "Pronto", "Entregue").
- **Remover Pedidos**: Exclua pedidos da lista.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5**: Estrutura da interface do usuário.
- **CSS3**: Estilização básica da página.
- **JavaScript**: Manipulação do DOM e comunicação com o backend via `fetch`.

### **Backend**
- **Node.js**: Ambiente de execução para o servidor.
- **Express.js**: Framework para criar as rotas e gerenciar as requisições.
- **MySQL**: Banco de dados utilizado para armazenar os pedidos.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **cors**: Middleware para permitir requisições entre diferentes origens (CORS).
- **body-parser**: Middleware para processar dados enviados no corpo das requisições.

---

## ⚙️ Como Executar o Sistema

### Pré-requisitos
- Node.js instalado na máquina.
- MySQL configurado e rodando.
- Um editor de código, como o Visual Studio Code.

### Passos

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/AlexandreDChaves/delivery.git

2. **Configure o banco de dados**:
- Crie um banco de dados no MySQL
- Configure as variavéis de ambiente no arquivo .env

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
   
3. **Instale as dependências**:
```npm install```

4. **Inicie o servidor**:
```node server.js```

5. **Acesse o sistema**:
- Abra o navegador e acesse: http://localhost:3000

5. **Rotas de API**:

**GET/pedidos**

Retorna todos os pedidos cadastrados

**POST/pedidos**

Cria um novo pedido

. Body:

{
  "cliente": "João",

  "sabor_pizza": "Calabresa",

  "tamanho": "Grande"
}

**PUT/pedidos/:id**

Atualiza o status de um pedido

. Body:
{
  "status_pedido": "Pronto"
}

**Delete/pedidos/:id**

Remove um pedido pelo ID

