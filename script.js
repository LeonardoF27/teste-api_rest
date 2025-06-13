const API_URL = "http://localhost:5000/produtos";
const produtosContainer = document.getElementById('produtos-container');
const carrinhoList = document.getElementById('carrinho');
const totalElement = document.getElementById('total');
let carrinho = [];

// Carrega produtos da API
fetch(API_URL)
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(produto => {
      const div = document.createElement('div');
      div.classList.add('produto');
      div.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
        <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">Adicionar</button>
      `;
      produtosContainer.appendChild(div);
    });
  });

// Função para adicionar ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
  carrinho.push({ id, nome, preco });
  atualizarCarrinho();
}

// Função para remover item
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Atualiza visual do carrinho
function atualizarCarrinho() {
  carrinhoList.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    const btn = document.createElement('button');
    btn.textContent = "Remover";
    btn.onclick = () => removerDoCarrinho(index);
    li.appendChild(btn);
    carrinhoList.appendChild(li);
  });
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}
