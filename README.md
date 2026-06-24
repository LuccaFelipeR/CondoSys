# CondoSys - Sistema Web Fullstack de Gestão Condominial

> **Status:** em validação final para entrega e apresentação acadêmica.  
> **Curso:** Análise e Desenvolvimento de Sistemas  
> **Disciplina:** Tópicos Especiais  
> **Tema:** Gestão de Condomínios

O **CondoSys** é uma aplicação web fullstack desenvolvida para apoiar a administração de condomínios residenciais. O sistema centraliza informações de unidades, moradores, funcionários, reservas de áreas comuns, ocorrências e usuários do sistema, reduzindo controles manuais feitos em planilhas, mensagens soltas ou anotações físicas.

O projeto foi desenvolvido com **Node.js**, **Express**, **EJS**, **Bootstrap**, **PostgreSQL** e arquitetura **MVC**, atendendo à proposta acadêmica de construir uma aplicação com banco de dados persistente, autenticação, rotas protegidas, CRUDs completos, documentação técnica, uso responsável de Inteligência Artificial e versionamento no GitHub.

---

## Sumário

- [Links do projeto](#links-do-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Funcionalidades do sistema](#funcionalidades-do-sistema)
- [Módulos e responsabilidades](#módulos-e-responsabilidades)
- [Arquitetura MVC](#arquitetura-mvc)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Rotas principais](#rotas-principais)
- [Autenticação e rotas protegidas](#autenticação-e-rotas-protegidas)
- [Banco de dados](#banco-de-dados)
- [Modelo de dados e relacionamentos](#modelo-de-dados-e-relacionamentos)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Scripts disponíveis](#scripts-disponíveis)
- [Testes manuais recomendados](#testes-manuais-recomendados)
- [Uso de Inteligência Artificial](#uso-de-inteligência-artificial)
- [Pontos de atenção antes da apresentação](#pontos-de-atenção-antes-da-apresentação)
- [Observações finais](#observações-finais)

---

## Links do projeto

| Item | Link |
|---|---|
| Repositório GitHub | `https://github.com/LuccaFelipeR/CondoSys` |
| Protótipo no Canva | `https://canva.link/bbj3stnodggeso6` |
| Quadro Miro | `https://miro.com/app/board/uXjVHSA3JIY=/?share_link_id=822904129862` |
| Kanban ClickUp | `https://app.clickup.com/90132544251/v/li/901327243146` |

Os protótipos foram usados como referência visual para as principais telas: login, dashboard, listagens, formulários de cadastro/edição, reservas, ocorrências, funcionários, moradores, unidades e perfil de usuário.

---

## Tecnologias utilizadas

- Node.js
- Express
- EJS
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Bootstrap Icons
- PostgreSQL
- pg
- dotenv
- express-session
- bcrypt
- jsonwebtoken
- nodemon
- Git e GitHub

---

## Funcionalidades do sistema

Nesta versão, o sistema contempla:

- login e logout;
- criação de sessão de usuário;
- middleware de autenticação para rotas internas;
- dashboard com indicadores dos módulos principais;
- menu lateral de navegação;
- tela de perfil do usuário;
- CRUD de Unidades;
- CRUD de Moradores;
- CRUD de Funcionários;
- CRUD de Reservas;
- CRUD de Ocorrências;
- validações básicas nos formulários;
- máscaras em campos como CPF, telefone e horários, quando aplicável;
- persistência dos dados em PostgreSQL;
- scripts de criação e popularização inicial do banco;
- documentação do uso de IA no arquivo `USO_IA.md`.

---

## Módulos e responsabilidades

| Integrante | Responsabilidade principal | CRUD/Área |
|---|---|---|
| Lucca Felipe | Documentação, integração e módulo de Funcionários | Funcionários |
| Matheus Albertini | Banco de dados e módulo de Unidades | Unidades |
| Abel Piassa | Autenticação e módulo de Moradores | Moradores |
| Emanulle Silva | Front-end e módulo de Reservas | Reservas |
| Adrian Felipe | Back-end e módulo de Ocorrências | Ocorrências |
| IA | Apoio técnico e documental | Revisão, orientação, documentação e preparação para defesa |

Cada integrante deve dominar tecnicamente seu CRUD, incluindo **rotas**, **controller**, **model**, **view**, **tabela no banco** e **regras de negócio**.

---

## Arquitetura MVC

O projeto segue o padrão **MVC**, separando responsabilidades em camadas:

```txt
Routes       -> recebem as requisições e direcionam para os controllers
Controllers  -> tratam regras de aplicação e coordenam as respostas
Models       -> consultam e manipulam os dados no PostgreSQL
Views        -> renderizam as telas EJS no navegador
Middlewares  -> protegem rotas e validam acesso
```

Fluxo geral de uma funcionalidade:

```txt
Usuário acessa uma rota
        ↓
Arquivo de rota direciona a requisição
        ↓
Controller trata a regra da aplicação
        ↓
Model consulta ou altera o banco
        ↓
View EJS exibe o resultado
```

Exemplo do fluxo de Funcionários:

```txt
GET /funcionarios
        ↓
funcionarioRoutes.js
        ↓
funcionarioController.js
        ↓
funcionarioModel.js
        ↓
PostgreSQL
        ↓
views/funcionarios/index.ejs
```

---

## Estrutura de pastas

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
    │   ├── unidadeController.js
    │   └── usuarioController.js
    ├── database/
    │   ├── connection.js
    │   ├── setup.js
    │   ├── schema.sql
    │   └── seed.sql
    ├── middlewares/
    │   ├── adminMiddleware.js
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
    │   ├── unidadeRoutes.js
    │   └── usuarioRoutes.js
    └── views/
        ├── auth/
        ├── dashboard/
        ├── funcionarios/
        ├── moradores/
        ├── ocorrencias/
        ├── reservas/
        ├── unidades/
        ├── usuarios/
        └── partials/
```

> Observação: caso ainda exista uma pasta `DAO` antiga no projeto, ela deve ser removida ou desconsiderada se não fizer mais parte do padrão atual. O padrão adotado na entrega é **Routes -> Controllers -> Models -> Database**.

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

### Perfil de usuário

```txt
GET /usuarios
GET /usuarios/perfil
```

### Unidades

```txt
GET  /unidades
POST /unidades/salvar
POST /unidades/editar/:id
POST /unidades/excluir/:id
```

### Moradores

```txt
GET  /moradores
POST /moradores/novo
POST /moradores/:id/editar
POST /moradores/:id/inativar
POST /moradores/:id/reativar
```

### Funcionários

```txt
GET  /funcionarios
POST /funcionarios
POST /funcionarios/:id/editar
POST /funcionarios/:id/inativar
POST /funcionarios/:id/reativar
```

### Reservas

```txt
GET  /reservas
GET  /reservas/nova
POST /reservas/salvar
GET  /reservas/:id/editar
POST /reservas/:id/editar
POST /reservas/:id/excluir
```

### Ocorrências

```txt
GET  /ocorrencias
POST /ocorrencias
POST /ocorrencias/:id/editar
POST /ocorrencias/:id/excluir
```

---

## Autenticação e rotas protegidas

O sistema utiliza autenticação com sessão por meio do `express-session`.

Credenciais de teste local:

```txt
E-mail: admin@condosys.com
Senha: 12345
```

Após login válido, o sistema salva o usuário autenticado na sessão e redireciona para o dashboard. As rotas internas utilizam middleware de autenticação. Caso não exista usuário na sessão, o acesso é redirecionado para `/login`.

Fluxo simplificado:

```txt
/login
  ↓
authController valida usuário
  ↓
req.session.usuario recebe os dados do usuário
  ↓
middleware libera acesso às rotas internas
```

---

## Banco de dados

O projeto utiliza **PostgreSQL** como banco de dados relacional.

Arquivos principais:

```txt
src/database/connection.js
src/database/setup.js
src/database/schema.sql
src/database/seed.sql
```

Configuração local usada no desenvolvimento:

```txt
Host: localhost
Usuário: postgres
Senha: 1234
Banco: condoServer
Porta: 5432
```

> A senha `1234` foi usada para facilitar a execução local no contexto acadêmico. Em um ambiente real, o recomendado seria configurar credenciais por variáveis de ambiente em `.env`.

---

## Modelo de dados e relacionamentos

Tabelas principais:

| Tabela | Finalidade |
|---|---|
| `usuarios` | Usuários do sistema e dados de autenticação |
| `unidades` | Apartamentos ou unidades do condomínio |
| `moradores` | Moradores vinculados às unidades |
| `funcionarios` | Funcionários do condomínio |
| `reservas` | Reservas de áreas comuns feitas por moradores |
| `ocorrencias` | Ocorrências registradas por moradores |

Relacionamentos principais:

- uma unidade pode possuir vários moradores;
- um morador pertence a uma unidade;
- um morador pode realizar várias reservas;
- um morador pode registrar várias ocorrências;
- um funcionário pode estar vinculado a um usuário do sistema;
- as tabelas usam chaves primárias e estrangeiras para representar dependências.

Resumo das dependências:

| Tabela | Depende de |
|---|---|
| `unidades` | — |
| `usuarios` | — |
| `funcionarios` | `usuarios` |
| `moradores` | `unidades`, `usuarios` |
| `reservas` | `moradores` |
| `ocorrencias` | `moradores` |

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/LuccaFelipeR/CondoSys.git
cd CondoSys
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o PostgreSQL

Instale o PostgreSQL e deixe o serviço ativo.

Configuração esperada:

```txt
Usuário: postgres
Senha: 1234
Porta: 5432
Banco: condoServer
```

### 4. Criar banco, tabelas e dados iniciais

```bash
npm run setup
```

Esse comando executa `src/database/setup.js`, cria ou prepara o banco `condoServer`, executa o `schema.sql` e insere dados iniciais do `seed.sql`.

### 5. Rodar em modo desenvolvimento

```bash
npm run dev
```

### 6. Acessar no navegador

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
  "dev": "nodemon app.js",
  "test": "echo \"Error: no test specified\" && exit 1",
  "setup": "node src/database/setup.js"
}
```

Fluxo principal para execução local:

```bash
npm install
npm run setup
npm run dev
```

---

## Testes manuais recomendados

Antes da apresentação, validar:

```txt
[ ] npm install
[ ] npm run setup
[ ] npm run dev
[ ] /login
[ ] /dashboard
[ ] /usuarios
[ ] /unidades
[ ] /moradores
[ ] /funcionarios
[ ] /reservas
[ ] /ocorrencias
[ ] logout
```

Testes funcionais mínimos:

```txt
[ ] Login com admin@condosys.com / 12345
[ ] Dashboard abre após login
[ ] Rotas internas redirecionam para /login sem sessão
[ ] Cadastro de unidade salva no banco
[ ] Edição/inativação de unidade funciona
[ ] Cadastro, edição, inativação e reativação de morador funcionam
[ ] Cadastro, edição, inativação e reativação de funcionário funcionam
[ ] Cadastro, edição e cancelamento/exclusão de reserva funcionam
[ ] Bloqueio de reserva conflitante funciona
[ ] Cadastro, edição e exclusão/finalização de ocorrência funcionam
[ ] Dashboard contabiliza os módulos sem erro
```

Consultas úteis para validação no PostgreSQL:

```sql
SELECT COUNT(*) FROM unidades;
SELECT COUNT(*) FROM moradores;
SELECT COUNT(*) FROM funcionarios;
SELECT COUNT(*) FROM reservas;
SELECT COUNT(*) FROM ocorrencias;

SELECT * FROM unidades;
SELECT * FROM moradores;
SELECT * FROM funcionarios;
SELECT * FROM reservas;
SELECT * FROM ocorrencias;
```

---

## Uso de Inteligência Artificial

O uso de Inteligência Artificial está documentado no arquivo:

```txt
USO_IA.md
```

A IA foi utilizada como apoio para:

- interpretação de requisitos acadêmicos;
- organização do escopo do MVP;
- revisão de arquitetura MVC;
- explicação de rotas, controllers, models e views;
- análise de erros de terminal;
- revisão de branches e merges;
- apoio em PostgreSQL, schema, seed e setup;
- revisão de documentação;
- preparação para defesa técnica.

As decisões finais, alterações no código, testes locais e validações permaneceram sob responsabilidade da equipe.

---

## Pontos de atenção antes da apresentação

Antes da entrega final, a equipe deve conferir:

```txt
[ ] O repositório remoto está atualizado com os últimos commits locais
[ ] npm run setup executa sem erro
[ ] npm run dev sobe o servidor sem crash
[ ] Não existem arquivos quebrados por merge
[ ] Não existem imports para arquivos removidos, como DAO antigo
[ ] Todos os CRUDs estão acessíveis após login
[ ] README.md e USO_IA.md estão na raiz do projeto
[ ] O arquivo .env, se existir, não foi enviado ao GitHub
[ ] node_modules não foi enviado ao GitHub
[ ] Cada integrante sabe explicar sua parte
```

---

## Observações finais

O **CondoSys** é um MVP acadêmico. O foco do projeto é demonstrar organização MVC, CRUDs funcionais, autenticação, rotas protegidas, banco de dados persistente, documentação técnica, GitHub, Kanban e uso responsável de Inteligência Artificial.

As funcionalidades foram mantidas simples e objetivas para facilitar a execução local, a apresentação e a defesa técnica individual.