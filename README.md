Exercício proposta na aula de javascript da Alpha Ed Tech

Descrição da atividade:

Crie uma página web que peça ao usuário que digite um nome de produto, sua descrição e seu respectivo valor e que possua um botão de “Incluir produto”.

Caso o usuário preencha um nome de produto, sua descrição e valor válidos e clique no botão “Incluir produto”, deve ser criado um objeto do produto (com as propriedades id, nome, descricao, valor) que será incluído em um array de produtos, e deve ser mostrada uma mensagem do tipo `Produto ${produto.nome} incluído com sucesso!`.

O id do objeto produto deve ser um timestamp.

Caso o usuário preencha algum dado incorreto (condições de validação de nome, descrição e valor, que não podem estar vazios e o valor deve ser positivo) e clique no botão “Incluir produto”, deverá ser mostrada uma mensagem do tipo “Falha no cadastro do produto!” e, se possível, o motivo da falha na inclusão do produto (onde houve o erro ?).

Quando um produto é incluído com sucesso, ele deve aparecer numa <table> que fica embaixo do formulário de inclusão.

A tabela deve conter 4 colunas: Nome, Valor, Editar e Apagar (note que não tem uma coluna para a descrição nem para o ID do produto).

Cada linha da tabela deve ter o nome do produto, seu valor, uma imagem pequena (ícone) que representa um botão de editar e uma imagem pequena (ícone) que representa um botão de apagar.

Caso o usuário clique no nome do produto, deve ser aberta uma janela modal onde são exibidos todos os dados do produto (tudo que já aparece na tabela, e também o ID e a descrição). A janela deve poder ser fechada.

Caso o usuário clique no ícone de editar da linha do produto, deve ser aberta uma janela modal contendo um formulário para editar todos os dados do produto (com exceção do ID) e um botão “Salvar”. Quando a janela se abre, os inputs devem ser automaticamente preenchidos com os dados atuais do produto. Ao editar os inputs e clicar em Salvar, a janela se fecha e atualiza o produto no array e na tabela.

Caso o ícone da lixeira do produto na tabela seja clicada, deve-se apagar o produto do array de produtos e da tabela.

O array de produtos deve ser salvo no Local Storage. Ao recarregar a página, a tabela deve ser preenchida com os dados recuperados do Local Storage. Ao usar o aplicativo, qualquer produto que seja incluído, editado ou apagado deve causar um salvamento no Local Storage para que a modificação não seja perdida.
