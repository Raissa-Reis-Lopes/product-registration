//Pegando os elementos do html
const nomeInput = document.getElementById("nome");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const buttonAdd = document.getElementById("add");
const mensagem = document.getElementById("mensagem"); //Para o sucesso ou falha
const tbody = document.getElementById("conteudoTabela");
const bgModalInfo = document.getElementById("bgModalInfo");
const modalContent = document.getElementById("modalContent");

let arrayProdutos = []; 

//Adicionando um novo produto 
buttonAdd.addEventListener("click", function(event){
    //Para evitar o recarregamento automatico do forms
    event.preventDefault();

    //Pegando os valores de cada um dos inputs, sempre erro e deixo isso fora do botão, aí ele sempre pega os valores vazios. Prestar atenção nisso!!
    const nome = nomeInput.value;
    const descricao = descricaoInput.value;
    const valor = valorInput.value;

    //Validando a entrada dos dados
    if(nome !== "" && descricao !== "" && valor >=0 && valor !== ""){

    pegarDadosLocalStorage();

    //Criando o objeto do produto a ser adicionado;
    const produto = {
        id: new Date().getTime(),
        nome: nome,
        descricao: descricao,
        valor: valor,
    };

    //Agora eu tenho que mandar o produto criado para o array
    arrayProdutos.push(produto);

    salvarNoLocalStorage();

    //Informando que o produto foi adicionado com sucesso
    mensagem.innerText = `Produto ${produto.nome} incluído com sucesso!`;
    
    limparInputs();
        
    atualizarTabela(tbody);

    }else if(nome === ""){
        mensagem.innerText = "Falha no cadastro do produto! Por favor, preencha o nome do produto";
    }else if(descricao === ""){
        mensagem.innerText = "Falha no cadastro do produto! Por favor, preencha a descrição do produto";
    }else if(valor === ""){
        mensagem.innerText = "Falha no cadastro do produto! Por favor, preencha o valor do produto"
    }else if(valor <=0){
        mensagem.innerText = "Falha no cadastro do produto! Atenção, o valor não pode ser negativo"
    } else{
        mensagem.innerText = "Falha no cadastro do produto!"
    }
})

//Fui criando algumas funções para isolar as funcionalidades e chamá-las quando necessário dentro de cada parte do código, para reutilizar código
function salvarNoLocalStorage(){
    // Salvando o array atualizado no Local Storage
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos));
}

function pegarDadosLocalStorage(){
   //Recuperar os dados do Local Storage ou criar um novo array vazio
    const produtosLocalStorage = localStorage.getItem("produtos");
    arrayProdutos = produtosLocalStorage === null ? [] : JSON.parse(produtosLocalStorage);
}

function limparInputs(){
   // Limpar os campos após adicionar o produto
   nomeInput.value = "";
    descricaoInput.value = "";
    valorInput.value = "";
}

//Para ao recarregar a página, deixar a tabela montada na tela 
window.addEventListener("load", function () {
// Pegar dados do Local Storage ao recarregar a página
pegarDadosLocalStorage();

// Limpar o tbody ao recarregar a página
limparTbody();

// Atualizar a tabela com os dados do localStorage
atualizarTabela(tbody);
});

function limparTbody(){
    tbody.innerHTML = "";
}

function atualizarTabela() {
    limparTbody();
    pegarDadosLocalStorage();

for (let i = 0; i < arrayProdutos.length; i++) {

    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td style="cursor: pointer;">${arrayProdutos[i].nome}</td>
    <td>${arrayProdutos[i].valor}</td>
    <td style="cursor: pointer;">🖉</td>
    <td style="cursor: pointer;">🗑️</td>
    `;

    tbody.appendChild(tr);
}
}


//Vou colocar um escutador de eventos na tabela para fazer o mostrar, editar e o apagar dos itens e das linhas
tbody.addEventListener("click", function(event) {
const elementoClicado = event.target;

const rowIndex = elementoClicado.parentNode.rowIndex;
const i = rowIndex - 1; //Para poder pegar o mesmo índice no array

const idProduto = arrayProdutos[i].id;
// console.log(idProduto)

//PARA MOSTRAR O ITEM
// Verifica se o clique ocorreu em uma célula da primeira coluna (Nome)
if (elementoClicado.tagName === 'TD' && elementoClicado.cellIndex === 0) {
bgModalInfo.classList.remove("hidden");

modalContent.innerHTML =`

    <div class="modalHeader">
        <h3 id="title">Informações sobre o produto</h3>
    </div>
    <div class="infoModal">
        <div> <h4>Id: </h4> ${arrayProdutos[i].id} </div> 
        <div> <h4>Nome: </h4> ${arrayProdutos[i].nome}</div>  
        <div> <h4>Descrição:</h4>${arrayProdutos[i].descricao} </div> 
        <div> <h4>Valor:</h4>${arrayProdutos[i].valor} </div> 
    </div>
    <button id="fecharModal" class="buttonModal">Fechar</button>         

`    
}
const buttonFecharModal = document.getElementById("fecharModal").addEventListener("click",function(){
    bgModalInfo.classList.add("hidden");
});


//PARA EDITAR O ITEM
// Verifica se o clique ocorreu em uma célula da terceira coluna (Editar)
if (elementoClicado.tagName === 'TD' && elementoClicado.cellIndex === 2) {


const nomeAtual = arrayProdutos[i].nome;
const descricaoAtual = arrayProdutos[i].descricao;
const valorAtual = arrayProdutos[i].valor;

bgModalInfo.classList.remove("hidden");

modalContent.innerHTML =`
<form class="formEdit">
    <h4 class="titleEdit">Nome do Produto:  </h4><input id="novoNome" type="text" value="${nomeAtual}">
    <h4 class="titleEdit">Descrição do produto: </h4><textarea  id="novaDescricao" class="descricao" cols="30" rows="10">${descricaoAtual}</textarea>
    <h4 class="titleEdit">Valor do produto: </h4><input id="novoValor" type="number" value="${valorAtual}">
    <button id="salvar" class="buttonModal">Salvar</button>
</form>
`      

    // Obter os novos valores do modal
    const novoNome = document.getElementById("novoNome");
    const novaDescricao = document.getElementById("novaDescricao");
    const novoValor = document.getElementById("novoValor");

    //acessar o objeto nesse posição no array
    const produtoOBj = arrayProdutos[i];           

    novoNome.addEventListener("change",function(){
    produtoOBj.nome = novoNome.value;
    // salvarNoLocalStorage();
    // atualizarTabela();

    })

    novaDescricao.addEventListener("change",function(){
    produtoOBj.descricao = novaDescricao.value;
    // salvarNoLocalStorage();
    // atualizarTabela();
   
    })

    novoValor.addEventListener("change",function(){
    produtoOBj.valor = novoValor.value;
    //Vou deixar essa opção no ouvinte de evento, pois pensei em usar o input e mostrar a mudança em tempo real na tabela
    // salvarNoLocalStorage();
    // atualizarTabela();
    })

const buttonSalvarModal = document.getElementById("salvar");
buttonSalvarModal.addEventListener("click", function () {  
    // Salvar no localStorage e atualizar a tabela
    salvarNoLocalStorage();
    atualizarTabela();
    // bgModalInfo.classList.add("hidden");
});
}

//PARA DELETAR O ITEM
if (elementoClicado.tagName === 'TD' && elementoClicado.cellIndex === 3) {
elementoClicado.parentNode.remove();
arrayProdutos.splice(i, 1);
salvarNoLocalStorage();
}

});

