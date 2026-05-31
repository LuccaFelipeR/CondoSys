# CondoSys - Sistema de Gerenciamento de Condomínio

## Descrição

O **CondoSys** é um sistema web fullstack para gerenciamento de condomínios residenciais.

O projeto tem como objetivo centralizar funcionalidades administrativas, como:

- gestão de moradores;
- controle de unidades;
- reservas de áreas comuns;
- registro de ocorrências;
- gerenciamento de funcionários;
- autenticação de usuários;
- dashboard administrativo.

O sistema está sendo desenvolvido como projeto acadêmico da disciplina **Tópicos Especiais**, utilizando arquitetura **MVC**, **Node.js**, **Express**, **EJS** e **PostgreSQL**.

---

## Repositório

Repositório oficial do projeto:

```txt
https://github.com/LuccaFelipeR/CondoSys
```

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
- Dotenv
- Express-session
- Bcrypt

---

## Arquitetura utilizada

O projeto segue o padrão **MVC**, separando responsabilidades em camadas:

```txt
Models       -> acesso aos dados e comunicação com o banco
Controllers  -> regras de aplicação e controle das requisições
Routes       -> definição dos caminhos/URLs da aplicação
Views        -> telas EJS renderizadas para o usuário
```

Fluxo básico de uma requisição:

```txt
Navegador
   ↓
app.js
   ↓
routes
   ↓
controller
   ↓
model
   ↓
banco de dados
   ↓
view EJS
```

---

## Estrutura do Projeto

A estrutura do projeto foi organizada diretamente na raiz do repositório:

```txt
CondoSys/
├── app.js                  # Arquivo principal da aplicação
├── package.json            # Dependências e scripts do projeto
├── package-lock.json       # Controle das versões instaladas
├── README.md               # Documentação principal
├── USO_IA.md               # Registro do uso de Inteligência Artificial
├── .gitignore              # Arquivos ignorados pelo Git
└── src/
    ├── controllers/        # Controllers da aplicação
    ├── database/           # Scripts e conexão com o banco
    │   ├── schema.sql
    │   └── seed.sql
    ├── middlewares/        # Middlewares, como autenticação
    ├── models/             # Models responsáveis pelo acesso ao banco
    ├── public/             # Arquivos públicos
    │   ├── css/
    │   ├── img/
    │   └── js/
    ├── routes/             # Arquivos de rotas
    └── views/              # Telas EJS
        ├── auth/
        ├── dashboard/
        ├── funcionarios/
        ├── layout/
        ├── moradores/
        ├── ocorrencias/
        ├── partials/
        ├── reservas/
        └── unidades/
```

---

## Módulos do sistema

| Módulo | Responsável | Situação inicial |
|---|---|---|
| Funcionários | Lucca Felipe | Estrutura inicial criada e tela abrindo |
| Unidades | Matheus Albertini | Em desenvolvimento |
| Moradores | Abel Piassa | Em desenvolvimento |
| Reservas | Emanulle Silva | Em desenvolvimento |
| Ocorrências | Adrian Felipe | Em desenvolvimento |
| Autenticação | Abel Piassa | Em desenvolvimento |

---

## Responsabilidades da equipe

| Integrante | Papel no grupo | CRUD principal |
|---|---|---|
| Lucca Felipe | Documentação | Funcionários |
| Matheus Albertini | Banco de Dados | Unidades |
| Abel Piassa | Autenticação | Moradores |
| Emanulle Silva | Front-End | Reservas |
| Adrian Felipe | Back-End | Ocorrências |

Cada integrante é responsável por compreender e defender tecnicamente seu CRUD, incluindo rotas, controllers, models, views e integração com o banco de dados.

---

## Responsabilidade do Lucca Felipe

O integrante **Lucca Felipe** é responsável pelo módulo de **Funcionários** e pelo apoio na documentação do projeto.

Arquivos relacionados ao módulo de Funcionários:

```txt
src/routes/funcionarioRoutes.js
src/controllers/funcionarioController.js
src/models/funcionarioModel.js
src/views/funcionarios/index.ejs
```

Fluxo atual do módulo de Funcionários:

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

Rota atual funcionando:

```txt
http://localhost:3000/funcionarios
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
git clone https://github.com/LuccaFelipeR/CondoSys.git
cd CondoSys
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

Por segurança, o arquivo `.env` com dados reais **não deve ser enviado para o GitHub**.

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

## Uso do Git no projeto

Fluxo recomendado antes de começar a mexer:

```bash
git pull origin main
```

Verificar alterações:

```bash
git status
```

Adicionar arquivos específicos:

```bash
git add caminho/do/arquivo
```

Exemplo para o módulo de Funcionários:

```bash
git add src/controllers/funcionarioController.js
git add src/routes/funcionarioRoutes.js
git add src/views/funcionarios/index.ejs
```

Criar commit:

```bash
git commit -m "Descreve claramente a alteração realizada"
```

Enviar para o GitHub:

```bash
git push origin main
```

Observação: em projeto em grupo, é recomendado evitar `git add .` quando houver alterações de outras pessoas. O ideal é adicionar apenas os arquivos modificados pelo integrante.

---

## Arquivo .gitignore

O projeto utiliza `.gitignore` para evitar o envio de arquivos desnecessários ou sensíveis.

Conteúdo básico:

```gitignore
node_modules/
.env
.DS_Store
```

Explicação:

```txt
node_modules/ -> dependências instaladas localmente, recriadas com npm install
.env          -> arquivo com configurações locais e possíveis senhas
.DS_Store    -> arquivo automático criado em sistemas macOS
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

### Erro: Cannot GET /funcionario

Esse erro pode acontecer quando a rota é acessada no singular.

Rota incorreta:

```txt
http://localhost:3000/funcionario
```

Rota correta:

```txt
http://localhost:3000/funcionarios
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

### Erro: fatal: not a git repository

Esse erro acontece quando o comando Git é executado em uma pasta que não está vinculada ao repositório.

Solução:

```bash
cd caminho/da/pasta/clonada
git status
```

---

### Erro: Author identity unknown

Esse erro acontece quando o Git ainda não possui nome e e-mail configurados.

Solução:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@exemplo.com"
```

---

## Status da Entrega 2

Checklist da estrutura inicial:

- [x] Projeto Node.js criado;
- [x] Express configurado;
- [x] EJS instalado e funcionando;
- [x] Servidor rodando na porta 3000;
- [x] Estrutura MVC criada;
- [x] Repositório reorganizado com o projeto na raiz;
- [x] `.gitignore` configurado;
- [x] Rota inicial de funcionários criada;
- [x] Tela inicial de funcionários renderizando no navegador;
- [x] README.md atualizado;
- [x] USO_IA.md atualizado;
- [x] Commit inicial de organização realizado;
- [ ] PostgreSQL conectado;
- [ ] Rotas principais dos demais módulos finalizadas;
- [ ] Kanban atualizado;
- [ ] CRUD completo de Funcionários finalizado.

---

## Próximos passos

Próximas atividades técnicas do projeto:

- padronizar a conexão com PostgreSQL;
- criar ou revisar `src/database/connection.js`;
- validar o script `src/database/schema.sql`;
- implementar o `funcionarioModel.js`;
- evoluir a tela de funcionários para listagem com dados reais;
- implementar cadastro de funcionário;
- implementar edição de funcionário;
- implementar inativação de funcionário;
- integrar autenticação e rotas protegidas quando o módulo de login estiver pronto.

---

## Observação para a apresentação

Para a apresentação, o grupo deve garantir que o projeto rode localmente sem configurações demoradas.

Sequência recomendada para demonstrar o projeto:

```bash
npm install
npm run dev
```

Depois acessar:

```txt
http://localhost:3000
http://localhost:3000/funcionarios
```

Caso o professor pergunte sobre a estrutura, explicar que o projeto segue MVC:

```txt
Models       -> acesso aos dados
Controllers  -> regra de aplicação
Routes       -> caminhos da aplicação
Views        -> telas EJS
```
