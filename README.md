# CondoSys - Sistema de Gestão Condominial

O **CondoSys** é uma aplicação web fullstack para apoio à gestão de condomínios residenciais.

O objetivo do sistema é centralizar informações administrativas de um condomínio, como unidades, moradores, funcionários, reservas de áreas comuns, ocorrências e usuários do sistema, reduzindo controles manuais feitos por planilhas, mensagens soltas ou cadernos administrativos.

Este projeto foi desenvolvido como trabalho acadêmico do curso de **Análise e Desenvolvimento de Sistemas**, na disciplina **Tópicos Especiais**, utilizando **Node.js**, **Express**, **EJS**, **Bootstrap**, arquitetura **MVC**, autenticação por sessão, rotas protegidas e banco de dados **PostgreSQL**.

---

## Sumário

- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Funcionalidades atuais](#funcionalidades-atuais)
- [Estado atual dos módulos](#estado-atual-dos-módulos)
- [Arquitetura MVC](#arquitetura-mvc)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rotas principais](#rotas-principais)
- [Autenticação](#autenticação)
- [Banco de dados](#banco-de-dados)
- [Modelo de dados e relacionamentos](#modelo-de-dados-e-relacionamentos)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Scripts disponíveis](#scripts-disponíveis)
- [Equipe e responsabilidades](#equipe-e-responsabilidades)
- [Testes manuais sugeridos](#testes-manuais-sugeridos)
- [Uso de Inteligência Artificial](#uso-de-inteligência-artificial)
- [Situação atual do projeto](#situação-atual-do-projeto)
- [Pontos de atenção](#pontos-de-atenção)

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

## Funcionalidades atuais

Nesta versão, o sistema possui:

- Tela de login;
- Logout;
- Criação de sessão de usuário;
- Middleware de autenticação para proteger rotas internas;
- Dashboard com indicadores dos módulos principais;
- Menu lateral com navegação entre telas;
- Tela de perfil do usuário;
- CRUD de Unidades integrado ao PostgreSQL;
- CRUD de Funcionários funcional no sistema;
- CRUD de Moradores funcional;
- CRUD de Reservas funcional;
- CRUD de Ocorrências funcional;
- Validações básicas em formulários;
- Layout base com EJS e Bootstrap;
- Banco de dados PostgreSQL com `schema.sql`, `seed.sql` e `setup.js`;
- Documentação de uso de IA no arquivo `USO_IA.md`.

---

## Estado atual dos módulos

| Módulo | Situação atual na aplicação | Persistência observada na main analisada |
|---|---|---|
| Autenticação | Login, logout e sessão funcionando | Sessão com `express-session` |
| Dashboard | Cards com contagem dos módulos | Usa `async/await` para suportar models assíncronos |
| Unidades | Listar, cadastrar, editar e inativar | PostgreSQL |
| Funcionários | Listar, cadastrar, editar, inativar e reativar | Atenção: na main pública analisada, o model ainda aparece em memória |
| Moradores | Listar, cadastrar, editar, inativar e reativar | Em memória na main pública analisada |
| Reservas | Listar, cadastrar, editar e excluir/cancelar | Em memória na main pública analisada |
| Ocorrências | Listar, cadastrar e editar | Em memória na main pública analisada |
| Usuários | Tela simples de perfil | Dados de sessão/model auxiliar |

> **Observação importante:** caso a migração do módulo de Funcionários para PostgreSQL já tenha sido feita localmente, é necessário confirmar se o commit foi enviado para a `main` com `Push origin`. A documentação deve sempre refletir o código que está no GitHub no momento da entrega.

---

## Arquitetura MVC

O projeto segue o padrão **MVC**, separando responsabilidades em camadas:

```txt
Routes       -> recebem as requisições e direcionam para os controllers
Controllers  -> aplicam regras de aplicação e chamam os models
Models       -> acessam ou manipulam os dados
Views        -> telas EJS renderizadas no navegador
```

Exemplo de fluxo do módulo de Unidades:

```txt
GET /unidades
        ↓
unidadeRoutes.js
        ↓
unidadeController.js
        ↓
unidadeModel.js / unidadesDAO.js
        ↓
PostgreSQL
        ↓
views/unidades/index.ejs
```

Exemplo de fluxo do módulo de Funcionários:

```txt
GET /funcionarios
        ↓
funcionarioRoutes.js
        ↓
funcionarioController.js
        ↓
funcionarioModel.js
        ↓
views/funcionarios/index.ejs
```

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
    │   ├── unidadeController.js
    │   └── usuarioController.js
    ├── DAO/
    │   └── unidadesDAO.js
    ├── database/
    │   ├── connection.js
    │   ├── setup.js
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

### Funcionários

```txt
GET  /funcionarios
POST /funcionarios
POST /funcionarios/:id/editar
POST /funcionarios/:id/inativar
POST /funcionarios/:id/reativar
```

### Moradores

```txt
GET  /moradores
POST /moradores/novo
POST /moradores/:id/editar
POST /moradores/:id/inativar
POST /moradores/:id/reativar
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
```

---

## Autenticação

O sistema possui login com sessão utilizando `express-session`.

Credenciais temporárias para teste local:

```txt
E-mail: admin@condosys.com
Senha: 12345
```

Após login válido, o sistema salva um usuário na sessão e redireciona para o Dashboard.

As rotas internas usam middleware de autenticação. Se não existir `req.session.usuario`, o usuário é redirecionado para `/login`.

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

### Configuração local usada no projeto

```txt
Host: localhost
Usuário: postgres
Senha: 1234
Banco: condoServer
Porta: 5432
```

> A senha `1234` foi usada para facilitar a validação local durante o desenvolvimento. Em um ambiente real, o ideal seria configurar esses dados por variáveis de ambiente e não deixar senha fixa no código.

### Inicialização do banco

Depois de instalar as dependências, rode uma vez:

```bash
npm run setup
```

Esse comando cria o banco `condoServer`, executa o `schema.sql` e insere dados iniciais do `seed.sql`.

---

## Modelo de dados e relacionamentos

O banco possui as seguintes tabelas principais:

| Tabela | Finalidade |
|---|---|
| `usuarios` | Usuários do sistema e dados para autenticação |
| `unidades` | Apartamentos ou unidades do condomínio |
| `funcionarios` | Funcionários do condomínio |
| `moradores` | Moradores vinculados às unidades |
| `reservas` | Reservas de áreas comuns feitas por moradores |
| `ocorrencias` | Ocorrências registradas no condomínio |

Relacionamentos principais:

- Uma unidade pode possuir vários moradores;
- Um morador pertence a uma unidade;
- Um morador pode realizar várias reservas;
- Um morador pode abrir várias ocorrências;
- Um funcionário pode ser vinculado a um usuário do sistema;
- As tabelas utilizam chaves primárias e estrangeiras para representar dependências.

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

### 2. Instalar dependências

```bash
npm install
```

### 3. Instalar e configurar o PostgreSQL

Instale o PostgreSQL e o pgAdmin.

Configuração local usada durante o desenvolvimento:

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

### 5. Rodar em desenvolvimento

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

Uso principal:

```bash
npm install
npm run setup
npm run dev
```

---

## Equipe e responsabilidades

| Integrante | Responsabilidade principal | CRUD/Área |
|---|---|---|
| Lucca Felipe | Documentação, apoio de integração e módulo de Funcionários | Funcionários |
| Matheus Albertini | Banco de dados e módulo de Unidades | Unidades |
| Abel Piassa | Autenticação e módulo de Moradores | Moradores |
| Emanulle Silva | Front-end e módulo de Reservas | Reservas |
| Adrian Felipe | Back-end e módulo de Ocorrências | Ocorrências |

---

## Testes manuais sugeridos

Antes da apresentação, validar:

```txt
☐ npm install
☐ npm run setup
☐ npm run dev
☐ /login
☐ /dashboard
☐ /unidades
☐ /funcionarios
☐ /moradores
☐ /reservas
☐ /ocorrencias
☐ /usuarios
☐ logout
```

Testes de banco:

```sql
SELECT COUNT(*) FROM unidades;
SELECT COUNT(*) FROM funcionarios;
SELECT COUNT(*) FROM moradores;
SELECT COUNT(*) FROM reservas;
SELECT COUNT(*) FROM ocorrencias;
```

Testes funcionais mínimos:

```txt
☐ Login com admin@condosys.com / 12345
☐ Dashboard abre após login
☐ Rotas internas redirecionam para /login quando usuário não está autenticado
☐ Cadastro de unidade salva no banco
☐ Edição de unidade altera o registro
☐ Inativação de unidade altera o status
☐ Cadastro de funcionário funciona
☐ Edição de funcionário funciona
☐ Inativação/reativação de funcionário funciona
☐ Dashboard contabiliza os módulos sem erro
```

---

## Uso de Inteligência Artificial

O uso de IA está documentado no arquivo:

```txt
USO_IA.md
```

Esse arquivo registra:

- ferramenta utilizada;
- finalidades de uso;
- exemplos de prompts;
- sugestões aceitas, adaptadas ou recusadas;
- reflexão crítica;
- cuidados adotados para evitar cópia sem compreensão técnica.

---

## Situação atual do projeto

```txt
[x] Aplicação Node.js com Express
[x] Views EJS configuradas
[x] Layout com Bootstrap
[x] Arquitetura MVC organizada
[x] Login e logout
[x] Sessão de usuário
[x] Middleware de autenticação
[x] Rotas internas protegidas
[x] Dashboard com contagem assíncrona
[x] Banco PostgreSQL configurado
[x] Script npm run setup
[x] Schema e seed do banco
[x] CRUD de Unidades integrado ao PostgreSQL
[x] Tela de perfil do usuário
[x] README.md atualizado
[x] USO_IA.md atualizado
[ ] Confirmar se a migração de Funcionários para PostgreSQL já foi enviada para a main
[ ] Migrar Moradores para PostgreSQL
[ ] Migrar Reservas para PostgreSQL
[ ] Migrar Ocorrências para PostgreSQL
[ ] Remover logs temporários de desenvolvimento
[ ] Substituir senha fixa do banco por variáveis de ambiente
```

---

## Pontos de atenção

1. **Funcionários na main pública analisada**  
   O módulo de Funcionários aparece funcional, mas o `funcionarioModel.js` da main pública ainda contém array em memória. Se a migração para PostgreSQL já foi feita localmente, é necessário enviar o commit para o GitHub antes da entrega.

2. **Credenciais do banco fixas no código**  
   A conexão atual usa senha `1234` diretamente em `connection.js` e `setup.js`. Para fins acadêmicos locais funciona, mas o ideal é migrar para `.env`.

3. **Reservas, Moradores e Ocorrências**  
   Esses módulos possuem telas e fluxos funcionais, mas na main pública analisada ainda usam dados em memória.

4. **Critério acadêmico**  
   Cada integrante deve dominar tecnicamente seu CRUD, principalmente rotas, controller, model, view e relação com banco de dados.

---

## Observações finais

O CondoSys é um MVP acadêmico. O foco do projeto é demonstrar organização MVC, CRUDs funcionais, autenticação, rotas protegidas, banco de dados, GitHub, documentação e uso responsável de Inteligência Artificial.

As funcionalidades foram mantidas simples para facilitar a entrega local e a defesa técnica individual.
