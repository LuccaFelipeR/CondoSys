# CondoSys - Sistema de Gestão Condominial

O **CondoSys** é uma aplicação web fullstack para apoio à gestão de condomínios residenciais.  
O objetivo do sistema é centralizar informações administrativas, como moradores, funcionários, unidades, reservas de áreas comuns, ocorrências e usuários do sistema.

Este projeto está em desenvolvimento como aplicação acadêmica utilizando **Node.js**, **Express**, **EJS**, **CSS/Bootstrap**, arquitetura **MVC** e banco de dados **PostgreSQL**.

---

## Funcionalidades atuais

Nesta versão, o sistema já possui:

- Tela de login;
- Criação de sessão de usuário;
- Logout;
- Dashboard inicial;
- Navegação lateral entre módulos;
- Tela de moradores com listagem e modal de cadastro visual;
- Tela de funcionários com:
  - listagem;
  - cadastro por modal;
  - edição por modal;
  - inativação de funcionário;
- Layout base compartilhado com `header`, `navbar` e `footer`;
- Estrutura MVC organizada em `routes`, `controllers`, `models` e `views`;
- Middleware de autenticação criado;
- Arquivos base para models e banco de dados.

No momento, o módulo de Funcionários utiliza dados temporários em memória para validar o fluxo entre rota, controller e view. A integração com PostgreSQL será implementada na próxima etapa.

---

## Tecnologias utilizadas

- Node.js
- Express
- EJS
- HTML
- CSS
- Bootstrap
- Bootstrap Icons
- JavaScript
- PostgreSQL
- pg
- dotenv
- express-session
- bcrypt
- nodemon
- Git e GitHub

---

## Estrutura do projeto

```txt
CondoSys/
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── USO_IA.md
├── .gitignore
└── src/
    ├── controllers/
    │   ├── authController.js
    │   ├── dashboardController.js
    │   ├── funcionarioController.js
    │   ├── moradorController.js
    │   ├── ocorrenciaController.js
    │   ├── reservaController.js
    │   └── unidadeController.js
    ├── database/
    │   ├── schema.sql
    │   └── seed.sql
    ├── middlewares/
    │   └── authMiddleware.js
    ├── models/
    │   ├── funcionarioModel.js
    │   ├── moradorModel.js
    │   ├── ocorrenciaModel.js
    │   ├── reservaModel.js
    │   ├── unidadeModel.js
    │   └── usuarioModel.js
    ├── public/
    │   └── css/
    │       └── style.css
    ├── routes/
    │   ├── authRoutes.js
    │   ├── dashboardRoutes.js
    │   ├── funcionarioRoutes.js
    │   ├── moradorRoutes.js
    │   ├── ocorrenciaRoutes.js
    │   ├── reservaRoutes.js
    │   └── unidadeRoutes.js
    └── views/
        ├── auth/
        ├── dashboard/
        ├── funcionarios/
        ├── moradores/
        └── partials/
```

---

## Arquitetura MVC

O sistema foi organizado seguindo o padrão **MVC**:

```txt
Routes       -> recebem as requisições e direcionam para os controllers
Controllers  -> controlam as regras da aplicação e renderizam as views
Models       -> serão responsáveis pela comunicação com o banco de dados
Views        -> telas EJS exibidas no navegador
```

Exemplo do fluxo do módulo de Funcionários:

```txt
GET /funcionarios
        ↓
funcionarioRoutes.js
        ↓
funcionarioController.js
        ↓
views/funcionarios/index.ejs
```

---

## Rotas principais

### Autenticação

```txt
GET  /login
POST /login
GET  /logout
```

### Dashboard

```txt
GET /dashboard
```

### Moradores

```txt
GET /moradores
```

### Funcionários

```txt
GET  /funcionarios
POST /funcionarios
POST /funcionarios/:id/editar
POST /funcionarios/:id/inativar
```

### Rotas em preparação

Os módulos de Unidades, Reservas e Ocorrências já possuem arquivos criados, mas ainda precisam de implementação completa de rotas, controllers, views e integração com banco.

```txt
/unidades
/reservas
/ocorrencias
```

---

## Módulo de Funcionários

O módulo de Funcionários está em uma versão funcional inicial, ainda sem persistência no banco de dados.

Funcionalidades atuais:

- Listagem de funcionários;
- Cadastro de funcionário por modal;
- Edição de funcionário por modal;
- Inativação de funcionário;
- Exibição de status `Ativo` ou `Inativo`.

Arquivos principais:

```txt
src/routes/funcionarioRoutes.js
src/controllers/funcionarioController.js
src/models/funcionarioModel.js
src/views/funcionarios/index.ejs
```

Observação: os dados ainda são armazenados em um array temporário dentro do controller. Ao reiniciar o servidor, alterações feitas em tela podem ser perdidas. A próxima etapa será mover essa lógica para o `funcionarioModel.js` e salvar os dados no PostgreSQL.

---

## Autenticação

O sistema possui uma tela de login e cria uma sessão para o usuário autenticado.

Credenciais temporárias para teste local:

```txt
E-mail: admin@condosys.com
Senha: 12345
```

Após login válido, o usuário é redirecionado para o dashboard.

O middleware `authMiddleware.js` já foi criado para proteger rotas privadas, verificando se existe `req.session.usuario`.

---

## Banco de dados

O projeto utiliza **PostgreSQL** como banco de dados relacional.

### Configuração

As credenciais de conexão ficam no arquivo `src/database/connection.js`.  
Para facilitar a configuração entre ambientes diferentes, as variáveis sensíveis devem ser definidas no `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=condoServer
```

### Estrutura

```txt
src/database/
├── connection.js  → Pool de conexão com o PostgreSQL
├── setup.js       → Cria o banco, tabelas e dados iniciais automaticamente
├── schema.sql     → Estrutura das tabelas (CREATE TABLE IF NOT EXISTS)
└── seed.sql       → Dados iniciais para teste
```

### Tabelas

| Tabela | Depende de |
|---|---|
| `unidades` | — |
| `usuarios` | — |
| `funcionarios` | `usuarios` |
| `moradores` | `unidades`, `usuarios` |
| `reservas` | `moradores` |
| `ocorrencias` | `moradores` |

### Inicializar o banco

Após clonar o projeto, rode **uma vez**:

```bash
npm run setup
```

Esse comando cria o banco `condoServer`, executa o `schema.sql` e popula com dados de teste via `seed.sql`.

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/LuccaFelipeR/CondoSys.git
cd CondoSys
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Criar um arquivo `.env` na raiz do projeto.

Exemplo:

```env
PORT=3000
SESSION_SECRET=condosys_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=condosys
```

O arquivo `.env` não deve ser enviado para o GitHub.

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

### 5. Acessar no navegador

```txt
http://localhost:3000
```

A rota inicial redireciona para:

```txt
http://localhost:3000/login
```

---

## Scripts disponíveis

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Uso:

```bash
npm start
npm run dev
```

---

## Git e versionamento

Comandos básicos usados no projeto:

```bash
git status
git add caminho/do/arquivo
git commit -m "mensagem do commit"
git pull --rebase origin main
git push origin main
```

Em alterações maiores, foi usado:

```bash
git add -A
```

Esse comando registra arquivos modificados, adicionados e removidos.

---

## Situação atual do projeto

```txt
[x] app.js principal organizado na raiz
[x] package.json apontando para app.js
[x] Login renderizando
[x] Sessão temporária funcionando
[x] Dashboard acessível
[x] Moradores com tela de listagem
[x] Funcionários com listagem, cadastro, edição e inativação em memória
[x] Layout base com partials
[x] CSS principal padronizado
[x] Middleware de autenticação criado
[x] Models criados como base
[ ] Integração dos models com PostgreSQL
[ ] Persistência real do CRUD de Funcionários
[ ] CRUD completo de Unidades
[ ] CRUD completo de Reservas
[ ] CRUD completo de Ocorrências
[ ] Proteção efetiva das rotas internas com middleware
```

---

## Próximas etapas técnicas

- Criar conexão com PostgreSQL;
- Implementar `funcionarioModel.js`;
- Trocar o array temporário do controller por consultas no banco;
- Implementar `INSERT`, `UPDATE`, `SELECT` e inativação no banco;
- Aplicar `authMiddleware` nas rotas internas;
- Finalizar os módulos dos demais integrantes;
- Manter README.md e USO_IA.md atualizados conforme o projeto evoluir.

---

## Equipe

| Integrante | Responsabilidade principal |
|---|---|
| Lucca Felipe | Funcionários e documentação |
| Matheus Albertini | Unidades e banco de dados |
| Abel Piassa | Autenticação e Moradores |
| Emanulle Silva | Reservas e front-end |
| Adrian Felipe | Ocorrências e back-end |

---

## Observação

Este README descreve o estado atual da aplicação e deve ser atualizado conforme novas funcionalidades forem implementadas.
