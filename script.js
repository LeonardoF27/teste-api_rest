const API_URL = "http://localhost:5000/produtos";
const produtosContainer = document.getElementById('produtos-container');
const carrinho = [];

const carrinhoIcon = document.querySelector("#carrinho-icon");
const modal = document.querySelector("#carrinho-modal");
const modalClose = document.querySelector("#fechar-carrinho");

carrinhoIcon.addEventListener("click", () => {
  modal.classList.add("active");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Funcao pra atualizar o carrinho no modal
function atualizarCarrinho(){
  const ul = document.querySelector("#carrinho-itens");
  ul.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    ul.innerHTML += `
      <li>
        ${item.nome} - R$ ${item.preco.toFixed(2)} 
        <button onclick="removerDoCarrinho(${index})">Remover</button>
      </li>`;
    total += item.preco;
  });

  document.querySelector("#carrinho-total").innerText = total.toFixed(2);
  document.querySelector("#carrinho-quantidade").innerText = carrinho.length;
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function adicionarAoCarrinho(id, nome, preco) {
  carrinho.push({ id, nome, preco });
  atualizarCarrinho();
}

function exibirProdutos(){
  fetch(API_URL)
    .then(res => res.json()) 
    .then(produtos => {
      produtosContainer.innerHTML = '';
      produtos.forEach(produto => {
        const li = document.createElement('li');  
        li.className = 'produto';  // <-- Aqui adiciona a classe
        li.innerHTML = `
          <h3>${produto.nome}</h3> 
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <p>${produto.descricao}</p>
          <button id="add-carrinho" onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">
            Adicionar ao carrinho
          </button>`;
        produtosContainer.prepend(li);
      });
    })
    .catch(err => console.log(err));  
}
window.onload = exibirProdutos;
