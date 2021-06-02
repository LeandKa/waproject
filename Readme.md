<h1 align="center">Desafio WaProject</h1>

<h1 align="center"> 
	:books: Tecnologias 
</h1>

<p align="center">Desafio feito com Nodejs simples crud de exames e laboratório com associação entre os mesmo usando mongoose como ODM e o Atlas para banco de dados. </p>

<ul>
    <li><a href="https://nodejs.org/en/">Nodejs</a></li>
    <li><a href="https://joi.dev/api/">Joi</a></li>
    <li><a href="https://mongoosejs.com/docs/index.html">Mongoose</a></li>
    <li><a href="https://www.mongodb.com/cloud/atlas">Atlas</a></li>
    <li><a href="https://www.heroku.com/home">Heroku</a></li>
</ul>

<h1 align="center">:notebook: Funcionalidades</h1>

- [x] Criação/atualização/remoção de exame e laboratório
- [x] Associação de um exame ativo a um laboratorio ativo /Desassociação de um exame ativo a um laboratório ativo
- [x] Retorno de unico Exame/Laboratório 
- [x] Retorno de todos os laboratórios que estão associado com o exame atraves do nome do exame
- [x] Troca de status do laboratório/exame para ativo e inativo
- [x] Criação/atualização/remoção de exame e laboratório em lote
- [x] Associação e desassociação de um exame ativo e laboratório ativo em lote

## Respostas

| Código | Descrição |
|---|---|
| `201` | Requisição executada com sucesso (aceita).|
| `202` | Requisição executada com sucesso (Criação).|
| `400` | Erro de validação.|
| `404` | Dados não achados no sistema.|
| `500` | Erro na requisição em lote|

## Install

    yarn install // npm install
    
## Run the app

    yarn start // npm start
    
# Url base

      https://waproject.herokuapp.com/ 

# REST API
    
<h1 align="center">Laboratório</h1>

## Retorna uma lista de Laboratórios ativos    
### Request

`GET /api/get/labs-active`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/get/labs-active
    
### Response

    [{
        "exams": [],
        "_id": "60b56111533273295403f994",
        "name": "Laboratorio 2",
        "endereco": "Rua do Laboratorio 2 lugar nenhum",
        "status": true,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    },]    
    
## Retorna apenas um laboratório baseado na id passada

### Request

`GET /api/get/lab?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/get/lab?:id   substitua id pela id desejada
    
### Response

    {
        "exams": [],
        "_id": "60b56111533273295403f994",
        "name": "Laboratorio 2",
        "endereco": "Rua do Laboratorio 2 lugar nenhum",
        "status": true,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
## Cria um Laboratório 

### Request

`POST /api/create/lab`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/create/lab  
    Params passados no body não pode ser passado um endereço ja cadastrado
    {
         "name":"Nome aqui",
         "endereco":"Seu endereço aqui"
    }

### Response

    {
        "exams": [],
        "_id": "60b56111533273295403f994",
        "name": "Laboratorio 2",
        "endereco": "Rua do Laboratorio 2 lugar nenhum",
        "status": true,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
    
## Atualiza um Laboratório atraves da id passada no url 

### Request

`PUT /api/update/lab?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/update/lab?:id substitua id pela id desejada 
    Params passados no body
    {
         "name":"Nome aqui",
         "endereco":"Seu endereço aqui"
    } 
    
### Response

    {
        "exams": [],
        "_id": "60b56111533273295403f994",
        "name": "Nome Alterado",
        "endereco": "Endereço Alterado",
        "status": true,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }  
    
    
## Apaga um Laboratório atraves da id passada no url 

### Request

`DELETE /api/remove/lab?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/remove/lab?:id substitua id pela id desejada 

### Response
 Retorna o Laboratório apagado
    {
        "exams": [],
        "_id": "60b56111533273295403f994",
        "name": "Nome Alterado",
        "endereco": "Endereço Alterado",
        "status": true,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    } 
    
## Altera o Status do Laboratório para ativo ou desativado 

### Request

`PUT /api/update/status/lab?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/update/status/lab?:id substitua id pela id desejada
    
### Response
    {
        "exams": [],
        "_id": "60b56111533273295403f994",
        "name": "Nome Alterado",
        "endereco": "Endereço Alterado",
        "status": Status Alterado para true ou false ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
## Adicionar ou Removar um Exame ativo a um Laboratório ativo 

### Request

`PUT /api/add/exam`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/add/exam
    
    Params passados no body da requisição 
    { 
       IdExam:"Id do exame que você quer adicionar ",
       IdLab: "Id do Laboratório que você quer adicionar o exame"
    }
### Response
    {
        "exams": ["Id do exame adicionado"],
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
### Request

`PUT /api/remove/exam`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/remove/exam
    
    Params passados no body da requisição 
    { 
       IdExam:"Id do exame que você quer deletar ",
       IdLab: "Id do Laboratório que você quer deletar o exame"
    }
### Response
    {
        "exams": ["Remove a Id do exame passado no body","Id de um exame exemplo"],
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
## Criação em Lote  

### Request

`GET /api/create/batch/lab`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/create/batch/lab
    
    Params passados no body da requisição um Array de Objetos 
    {[
      "name":"Nome do Laboratório",
      "endereco":"Endereço do Laboratório",
      "status":true ou false
    }]
### Response
     Retorna os objetos do Array passado
    [{
        "exams": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]

## Atualização em Lote  

### Request

`PUT /api/update/batch/lab`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/update/batch/lab
    
    Params passados no body da requisição um Array de Objetos 
    [{
      "name":"Nome do Laboratório",
      "endereco":"Endereço do Laboratório",
      "status":true ou false
    ]}
### Response
     Retorna os objetos do Array passado porem com status de fullfied(Atualizou sem erros) ou rejected(Rejeitado por ter encontrado algum erro)
    [{
        "status": fullfied ou rejected
        "exams": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]
    
    
## Remoção em Lote 

### Request

`DELETE /api/delete/batch/lab`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/delete/batch/lab
    
    Params passados no body da requisição um Array de Objetos 
    ["ID Do Laboratório","ID Do Laboratório"]
    
### Response
     Retorna os objetos do Array passado porem com status de fullfied(Deletado sem erros) ou rejected(Rejeitado por ter encontrado algum erro).
    [{
        "status": fullfied ou rejected
        "exams": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]
    
    
## Adição ou Remoção de varios exames em um Laboratório

### Request

`PUT /api/add/batch-exam`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/add/batch-exam
    
    Params passados no body da requisição um Array de Objetos 
    {"idLab":"Id do Laboratorio","idsExam":["ID do Exame","ID do Exame"]}
    
### Response
     Retorna os objetos do Array passado porem com status de fullfied(Adicionou sem erros) ou rejected(Rejeitado por ter encontrado algum erro).
    [{
        "status": fullfied ou rejected
        "exams": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]
      
      
### Request

`PUT /api/remove/batch-exam`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/remove/batch-exam
    
    Params passados no body da requisição um Array de Objetos 
    {"idLab":"Id do Laboratorio","idsExam":["ID do Exame","ID do Exame"]}
    
### Response
     Retorna os objetos do Array passado porem com status de fullfied(Removeu sem erros) ou rejected(Rejeitado por ter encontrado algum erro).
    [{
        "status": fullfied ou rejected
        "exams": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]      
    
    
    <h1 align="center">Exame</h1>
  
### Request

`GET /api/get/examsActive`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/get/examsActive
    
    
### Response
     Retorna todos os exames ativos
    [{
        "status": fullfied ou rejected
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "tipo": "Imagem" ou "Analise Clinica",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]
    
    
### Request

`GET /api/get/exams?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/get/exams?:id   substitua a id pela id do exame desejado
    
    
### Response
     Retorna todos os exames ativos
    {
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "tipo": "Imagem" ou "Analise Clinica",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
 ### Request

`GET /api/get/examLabs?:name`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/get/examLabs?:name  substitua o name pelo o name do exame desejado 
    
    
### Response
     Retorna um exame e todos os seus laboratórios ativos cadastrados
    {
        "labs": [{
        "exams": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "endereco": "Endereço Laboratório",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }],
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "tipo": "Imagem" ou "Analise Clinica",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }   
    
    
### Request

`POST /api/create/exam`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/create/exam  
    
   Params passado no body {
      "name":"Nome do Exame",
      "tipo":"Imagem" ou "Analise Clinica",
   }
    
### Response
     Retorna o exame criado
    {
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Laboratório ",
        "tipo": "Imagem" ou "Analise Clinica",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
    
    ### Request

`PUT /api/update/exam?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/update/exam?:id substitua o id pelo id do exame desejado
    
   Params passado no body {
      "name":"Nome do Exame",
      "tipo":"Imagem" ou "Analise Clinica",
   }
    
### Response
     Retorna o exame que foi atualizado
    {
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Atualizado",
        "tipo": "Tipo Atualizado",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
        
        
### Request

`PUT /api/update/status/exam?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/update/status/exam?:id substitua o id pelo id do exame desejado
    
    
### Response
     Retorna o exame que foi atualizado o status
    {
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Mantido",
        "tipo": "Tipo Mantido",
        "status": "Altera apenas o status" ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }
      
      
### Request

`DELETE /api/delete/exam?:id`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/delete/exam?:id substitua o id pelo id do exame desejado
    
    
### Response
     Retorna o exame apagado
    {
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Mantido",
        "tipo": "Tipo Mantido",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }

### Request

`GET /api/create/batch/exams`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/create/batch/exams 
    params passados no body da requisição array de exame
    [{
         "name":"name do exame",
         "tipo":"tipo do exame",
         "status":false ou true
    }]
    
### Response
     Retorna um array com os exames criados
    [{
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Mantido",
        "tipo": "Tipo Mantido",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]
     
     
### Request

`PUT /api/update/batch/exams`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/update/batch/exams
    params passados no body da requisição array de exame somente com suas id
    ["Id de Exame","Id de Exame"]
    
### Response
     Retorna os objetos do Array passado porem com status de fullfied(Atualizou sem erros) ou rejected(Rejeitado por ter encontrado algum erro).
    [{
        "status":"fulfield" ou rejected
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Mantido",
        "tipo": "Tipo Mantido",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]

### Request

`DELETE /api/delete/batch/exams`

    curl -i -H 'Accept: application/json' https://waproject.herokuapp.com/api/delete/batch/exams
    params passados no body da requisição array de exame somente com suas id
    ["Id de Exame","Id de Exame"]
    
### Response
     Retorna os objetos do Array passado porem com status de fullfied(Deletou sem erros) ou rejected(Rejeitado por ter encontrado algum erro).
    [{
        "status":"fulfield" ou rejected
        "labs": "",
        "_id": "60b56111533273295403f994",
        "name": "Nome Mantido",
        "tipo": "Tipo Mantido",
        "status": true ,
        "__v": 0,
        "createdAt": "2021-05-31T22:20:01.497Z",
        "updatedAt": "2021-05-31T22:35:09.549Z"
    }]
        
