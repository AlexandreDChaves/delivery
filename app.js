document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pedidoForm');
    const tableBody = document.querySelector('#pedidosTable tbody');

    // Função para carregar pedidos
    const loadPedidos = async () => {
        try {
            const response = await fetch('/pedidos');
            if (!response.ok) throw new Error('Erro ao carregar pedidos');
            const pedidos = await response.json();

            tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
            pedidos.forEach(pedido => {
                const row = `
                    <tr>
                        <td>${pedido.id}</td>
                        <td>${pedido.cliente}</td>
                        <td>${pedido.sabor_pizza}</td>
                        <td>${pedido.tamanho}</td>
                        <td>${pedido.status_pedido}</td>
                        <td>
                            <button class="update-status" data-id="${pedido.id}">Atualizar Status</button>
                            <button class="delete-pedido" data-id="${pedido.id}">Remover</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
        }
    };

    // Função para criar um novo pedido
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cliente = document.getElementById('cliente').value;
        const sabor_pizza = document.getElementById('sabor_pizza').value;
        const tamanho = document.getElementById('tamanho').value;

        try {
            const response = await fetch('/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cliente, sabor_pizza, tamanho })
            });

            if (!response.ok) throw new Error('Erro ao criar pedido');

            loadPedidos(); // Recarrega a lista de pedidos após criar um novo
            form.reset(); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
        }
    });

    // Delegação de eventos para os botões
    tableBody.addEventListener('click', async (e) => {
        const target = e.target;

        // Verifica se o botão clicado é "Atualizar Status"
        if (target.classList.contains('update-status')) {
            const id = target.getAttribute('data-id');
            const novoStatus = prompt('Novo status (Recebido, Em Preparo, Pronto, Entregue):');
            if (novoStatus) {
                try {
                    const response = await fetch(`/pedidos/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status_pedido: novoStatus })
                    });

                    if (!response.ok) throw new Error('Erro ao atualizar status');

                    loadPedidos(); // Recarrega a lista de pedidos após atualizar
                } catch (error) {
                    console.error('Erro ao atualizar status:', error);
                }
            }
        }

        // Verifica se o botão clicado é "Remover"
        if (target.classList.contains('delete-pedido')) {
            const id = target.getAttribute('data-id');
            try {
                const response = await fetch(`/pedidos/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Erro ao remover pedido');

                loadPedidos(); // Recarrega a lista de pedidos após remover
            } catch (error) {
                console.error('Erro ao remover pedido:', error);
            }
        }
    });

    // Carregar pedidos ao iniciar
    loadPedidos();
});