
# Food Explorer - Backend

Backend utilizado no projeto food explorer, um aplicativo web que simula um menu online de um restaurante.



## Referência

- [Instalação](#-instalação)
- [Tecnologias](#-Tecnologias-utilizadas)
- [Aprendizados](#-Aprendizados)
- [API](#-Documentação-da-API)




## Instalação

Siga os passos abaixo para instalar a aplicação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/GabrielFigueiredoL/food-explorer-backend
    ```

2. **Navegue para o diretório do projeto:**

    ```bash
    cd ./food-explorer-backend
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Caso o banco de dados não esteja presente na aplicação como deveria:**

    ```bash
    npm run migrate
    ```

5. **Inicie o servidor:**

    ```bash
    npm run dev
    ```


## Tecnologias utilizadas

- [nodejs](https://nodejs.org/en)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [knex](https://www.npmjs.com/package/knex)
- [multer](https://www.npmjs.com/package/multer)


## Aprendizados

- Desenvolver uma API RESTful
- Autenticação e autorização por tokens JWT
- Utilização de Query Builder e Schema Builder do Knex
- Criptografia de dados utilizando Bcryptjs
- Gerenciamento de arquivos com multer


## Documentação da API

Rotas presentes neste backend

### Criação de usúario

```http
  POST /users
```

#### Corpo da solicitação

```json
{
	"name": "admin",
	"email": "admin@email.com",
	"password": "123456"
}
```

### Criação de uma sessão

```http
  POST /sessions
```

#### Corpo da solicitação

```json
{
	"email": "admin@email.com",
	"password": "123456"
}
```

### Retorna todos os pratos

```http
  GET /dishes
```

#### Exemplo de retorno

```json
[
	{
		"id": 7,
		"image": "407ed8e6e2987d402ca4-torta-de-limao.jpg",
		"name": "Torta de Limão",
		"category": "dessert",
		"price": 15,
		"description": "Generoso pedaço de uma maravilhosa torta de limão",
		"createdAt": "2024-01-26 00:43:20",
		"updatedAt": "2024-01-26 00:43:20"
	},
	{
		"id": 4,
		"image": "cf45b74df0015d143d04-coca-cola-lata.jpg",
		"name": "Coca cola lata",
		"category": "drink",
		"price": 3.5,
		"description": "Coca cola em lata, 350ml",
		"createdAt": "2024-01-26 00:38:30",
		"updatedAt": "2024-01-26 00:38:30"
	},
	{
		"id": 6,
		"image": "7c020f6564ebc9d9061f-caipirinha-de-morango.jpg",
		"name": "Caipirinha de morango",
		"category": "drink",
		"price": 7,
		"description": "caipirinha de morango 500ml",
		"createdAt": "2024-01-26 00:40:45",
		"updatedAt": "2024-01-26 00:40:45"
	}
]
```

### Retorna um prato

```http
  GET /dishes/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você quer |

#### Exemplo de retorno

```json
  {
	"id": 3,
	"image": "a59e54da681ea89593cc-estrogonofe-de-camarao.jpg",
	"name": "Strogonoff de camarão",
	"category": "meal",
	"price": 40,
	"description": "Strogonoff de camarão, acompanha arroz e batata palha",
	"createdAt": "2024-01-26 00:37:11",
	"updatedAt": "2024-01-26 00:37:11",
	"ingredients": [
		{
			"id": 18,
			"name": "azeite",
			"dishId": 3
		},
		{
			"id": 16,
			"name": "camarão",
			"dishId": 3
		},
		{
			"id": 21,
			"name": "creme de leite",
			"dishId": 3
		},
		{
			"id": 19,
			"name": "ketchup",
			"dishId": 3
		},
		{
			"id": 17,
			"name": "manteiga",
			"dishId": 3
		},
		{
			"id": 20,
			"name": "mostarda",
			"dishId": 3
		}
	]
}
```

### Atualiza um prato

**É necessário o token de admin para realizar esta ação**
```http
  PATCH /dishes/id
```



| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você deseja atualizar |

#### Corpo da solicitação

É necessário ser um multipart-form

```json
{
    "image": "estrogonofe-de-camarao.jpg",
	"name": "Strogonoff de camarão",
	"category": "meal",
	"price": 40,
	"description": "Strogonoff de camarão, acompanha arroz e batata palha",
    "ingredients": ["azeite", "camarão", "creme de leite", "ketchup", "manteiga","mostarda"]
}
```

### Criação de um prato
**É necessário o token de admin para realizar esta ação**
```http
  POST /dishes/
```

#### Corpo da solicitação

É necessário ser um multipart-form

```json
{
    "image": "estrogonofe-de-camarao.jpg",
	"name": "Strogonoff de camarão",
	"category": "meal",
	"price": 40,
	"description": "Strogonoff de camarão, acompanha arroz e batata palha",
    "ingredients": ["azeite", "camarão", "creme de leite", "ketchup", "manteiga","mostarda"]
}
```

### Exclui um prato
**É necessário o token de admin para realizar esta ação**
```http
  DELETE /dishes/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do prato que você quer |



