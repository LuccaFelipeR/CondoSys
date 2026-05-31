# CondoSys - Sistema de Gerenciamento de Condomínio

## Descrição

O CondoSys é um sistema web fullstack para gerenciamento de condomínios residenciais.

O projeto tem como objetivo centralizar funcionalidades administrativas, como:

- Gestão de moradores;
- Controle de unidades;
- Reservas de áreas comuns;
- Registro de ocorrências;
- Gerenciamento de funcionários;
- Autenticação de usuários;
- Dashboard administrativo.

O sistema está sendo desenvolvido como projeto acadêmico da disciplina de Tópicos Especiais, utilizando arquitetura MVC, Node.js, Express, EJS e PostgreSQL.

---

## Tecnologias utilizadas

- Node.js
- Express
- EJS
- PostgreSQL
- HTML
- CSS
- Bootstrap
- JavaScript
- Git e GitHub
- Nodemon

---

## Estrutura do Projeto

```txt
CondoSys/
├── src/
│   ├── controllers/      # Controllers da aplicação
│   ├── database/         # Scripts e conexão com o banco
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── middlewares/      # Middlewares, como autenticação
│   ├── models/           # Models responsáveis pelo acesso ao banco
│   ├── public/           # Arquivos públicos
│   │   ├── css/
│   │   ├── img/
│   │   └── js/
│   ├── routes/           # Arquivos de rotas
│   └── views/            # Telas EJS
│       ├── auth/
│       ├── dashboard/
│       ├── funcionarios/
│       ├── layout/
│       ├── moradores/
│       ├── ocorrencias/
│       ├── partials/
│       ├── reservas/
│       └── unidades/
├── app.js                # Arquivo principal da aplicação
├── package.json          # Dependências e scripts do projeto
├── README.md             # Documentação principal
└── USO_IA.md             # Registro do uso de Inteligência Artificial
```

---

## Como rodar o projeto em outro computador

Esta seção explica como iniciar o CondoSys em um computador diferente, como o PC de outro integrante da equipe ou o computador usado no dia da apresentação.

---

### 1. Pré-requisitos

Antes de rodar o projeto, o computador precisa ter instalado:

- Node.js;
- npm;
- PostgreSQL;
- Git;
- VS Code ou outro editor de código.

Para verificar se o Node.js e o npm estão instalados, execute no terminal:

```bash
node -v
npm -v
```

---

### 2. Clonar o repositório

No terminal, escolha a pasta onde deseja salvar o projeto e execute:

```bash
git clone LINK_DO_REPOSITORIO
cd CondoSys
```

Substitua `LINK_DO_REPOSITORIO` pelo link real do GitHub do projeto.

Exemplo:

```bash
git clone https://github.com/LuccaFelipeR/GestaoCondominal.git
cd GestaoCondominal
```

---

### 3. Instalar as dependências

Dentro da pasta do projeto, execute:

```bash
npm install
```

Esse comando lê o arquivo `package.json` e instala automaticamente as dependências necessárias.

Caso alguma dependência esteja faltando, instalar manualmente:

```bash
npm install express ejs pg dotenv express-session bcrypt
npm install nodemon --save-dev
```

Dependências principais:

```txt
express          -> framework para criar o servidor
ejs              -> motor de views para renderizar telas HTML dinâmicas
pg               -> conexão com PostgreSQL
dotenv           -> leitura de variáveis do arquivo .env
express-session  -> controle de sessão/login
bcrypt           -> criptografia de senhas
nodemon          -> reinicia o servidor automaticamente no desenvolvimento
```

---

### 4. Configurar o arquivo .env

Criar um arquivo chamado `.env` na raiz do projeto.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_do_postgres
DB_DATABASE=condosys
PORT=3000
```

A senha do PostgreSQL pode mudar de computador para computador.

Por segurança, o arquivo `.env` com dados reais não deve ser enviado para o GitHub.

---

### 5. Criar o banco de dados

No PostgreSQL, criar o banco:

```sql
CREATE DATABASE condosys;
```

Depois, executar o script de criação das tabelas:

```txt
src/database/schema.sql
```

Se existir script de dados iniciais, executar também:

```txt
src/database/seed.sql
```

---

### 6. Rodar o projeto

Para rodar em modo de desenvolvimento:

```bash
npm run dev
```

Para rodar em modo normal:

```bash
npm start
```

O terminal deve mostrar uma mensagem parecida com:

```txt
Servidor rodando em http://localhost:3000
```

---

### 7. Acessar no navegador

Com o servidor rodando, acessar:

```txt
http://localhost:3000
```

Rotas iniciais do sistema:

```txt
http://localhost:3000/funcionarios
http://localhost:3000/moradores
http://localhost:3000/unidades
http://localhost:3000/reservas
http://localhost:3000/ocorrencias
```

---

## Scripts disponíveis

No `package.json`, o projeto deve conter scripts parecidos com:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Explicação:

```txt
npm start    -> inicia o projeto com Node.js
npm run dev  -> inicia o projeto com Nodemon para desenvolvimento
```

---

## Erros comuns e soluções

### Erro: Cannot find module 'express'

Solução:

```bash
npm install express
```

Esse erro acontece quando o Express não está instalado no projeto.

---

### Erro: Cannot find module 'ejs'

Solução:

```bash
npm install ejs
```

Esse erro acontece quando o Express tenta renderizar uma view `.ejs`, mas o pacote EJS não está instalado.

---

### Erro: nodemon não reconhecido

Solução:

```bash
npm install nodemon --save-dev
```

Depois rodar:

```bash
npm run dev
```

---

### Erro: Cannot GET /funcionarios

Esse erro normalmente significa que a rota não foi registrada corretamente no Express.

Verificar se no `app.js` existe:

```js
const funcionarioRoutes = require('./src/routes/funcionarioRoutes');

app.use('/funcionarios', funcionarioRoutes);
```

E se no arquivo `src/routes/funcionarioRoutes.js` existe:

```js
router.get('/', funcionarioController.listar);
```

---

### Erro: app is not defined

Esse erro acontece quando o código usa `app.use()` antes de criar o app do Express.

A ordem correta no `app.js` é:

```js
const express = require('express');
const app = express();

app.use('/funcionarios', funcionarioRoutes);
```

---

### Erro: requiere is not defined

Esse erro acontece por digitação incorreta.

Errado:

```js
requiere
```

Correto:

```js
require
```

---

## Módulos do sistema

| Módulo | Responsável | Situação inicial |
|---|---|---|
| Funcionários | Lucca Felipe | Estrutura inicial criada |
| Unidades | Matheus Albertini | Em desenvolvimento |
| Moradores | Abel Piassa | Em desenvolvimento |
| Reservas | Emanulle Silva | Em desenvolvimento |
| Ocorrências | Adrian Felipe | Em desenvolvimento |
| Autenticação | Abel Piassa | Em desenvolvimento |

---

## Responsabilidade do Lucca Felipe

O integrante Lucca Felipe é responsável pelo módulo de Funcionários e apoio na documentação do projeto.

Arquivos relacionados ao módulo:

```txt
src/routes/funcionarioRoutes.js
src/controllers/funcionarioController.js
src/models/funcionarioModel.js
src/views/funcionarios/
```

Fluxo do módulo de Funcionários:

```txt
Navegador acessa /funcionarios
        ↓
app.js encaminha para funcionarioRoutes.js
        ↓
funcionarioRoutes.js chama funcionarioController.js
        ↓
funcionarioController.js renderiza a view funcionarios/index.ejs
        ↓
A tela é exibida no navegador
```

---

## Status da Entrega 2

Checklist da estrutura inicial:

- [x] Projeto Node.js criado;
- [x] Express configurado;
- [x] EJS instalado e funcionando;
- [x] Servidor rodando na porta 3000;
- [x] Estrutura MVC criada;
- [x] Rota inicial de funcionários criada;
- [x] Tela inicial renderizando no navegador;
- [ ] PostgreSQL conectado;
- [ ] Rotas principais dos demais módulos finalizadas;
- [ ] README revisado pela equipe;
- [ ] USO_IA.md atualizado;
- [ ] Kanban atualizado;
- [ ] Commits individuais realizados.

---

## Comandos úteis para desenvolvimento

Iniciar o projeto:

```bash
npm run dev
```

Parar o servidor:

```bash
CTRL + C
```

Instalar dependências:

```bash
npm install
```

Verificar arquivos alterados no Git:

```bash
git status
```

Adicionar alterações:

```bash
git add .
```

Criar commit:

```bash
git commit -m "Atualiza README e estrutura inicial de funcionarios"
```

Enviar para o GitHub:

```bash
git push
```

---

## Observação para a apresentação

Para a apresentação, o grupo deve garantir que o projeto rode localmente sem configurações demoradas.

A sequência recomendada para demonstrar o projeto é:

```bash
npm install
npm run dev
```

Depois acessar:

```txt
http://localhost:3000
```

Caso o professor pergunte sobre a estrutura, explicar que o projeto segue MVC:

```txt
Models       -> acesso aos dados
Controllers  -> regra de aplicação
Routes       -> caminhos da aplicação
Views        -> telas EJS
```cd GestaoCondominal