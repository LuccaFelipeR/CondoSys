# Uso de Inteligência Artificial no Projeto CondoSys

Este arquivo registra como a Inteligência Artificial foi utilizada como apoio durante o desenvolvimento do CondoSys.

A IA foi usada como ferramenta auxiliar para organização, revisão, explicação de erros e apoio técnico. As decisões finais, alterações no código e validações foram feitas pela equipe.

---

## Ferramenta utilizada

A ferramenta utilizada foi o **ChatGPT**.

---

## Finalidades de uso

A IA foi utilizada para apoiar:

- organização inicial do projeto;
- interpretação dos requisitos técnicos;
- estruturação do README.md;
- criação e atualização deste arquivo USO_IA.md;
- explicação da arquitetura MVC;
- revisão do fluxo entre `app.js`, rotas, controllers e views;
- análise de erros no terminal;
- organização dos commits;
- padronização de telas;
- apoio no módulo de Funcionários;
- apoio na correção de rotas;
- apoio na documentação do estado atual do sistema.

---

## Principais apoios durante o desenvolvimento

### Organização do app.js

A IA ajudou a identificar que existiam dois arquivos `app.js`: um na raiz do projeto e outro dentro de `src`.

O projeto foi padronizado para usar apenas o `app.js` da raiz, com o `package.json` apontando para:

```json
"start": "node app.js",
"dev": "nodemon app.js"
```

Também foi ajustada a rota inicial para redirecionar o usuário para `/login`.

---

### Correção do fluxo de login

A IA ajudou a revisar o fluxo:

```txt
GET /login
↓
authRoutes.js
↓
authController.loginPage
↓
views/auth/login.ejs
```

Também foi revisado o login temporário usando sessão com `express-session`.

Credenciais temporárias usadas no desenvolvimento:

```txt
admin@condosys.com
12345
```

---

### Correção da rota de Moradores

Durante os testes, a rota `/moradores` apresentou erro.

A IA ajudou a identificar que o controller usava o método:

```js
moradorController.index
```

Então a rota correta deveria ser:

```js
router.get('/', moradorController.index);
```

Também foi corrigida a estrutura visual da view de moradores para seguir o mesmo padrão de layout usado no sistema.

---

### Módulo de Funcionários

A IA apoiou a construção do fluxo inicial de Funcionários.

Arquivos envolvidos:

```txt
src/routes/funcionarioRoutes.js
src/controllers/funcionarioController.js
src/views/funcionarios/index.ejs
src/models/funcionarioModel.js
```

Funcionalidades desenvolvidas com apoio da IA:

- listagem de funcionários;
- cadastro por modal;
- edição por modal;
- preenchimento automático do modal de edição usando atributos `data-*`;
- inativação de funcionário;
- organização das rotas;
- limpeza do controller, removendo funções duplicadas;
- retirada da tela separada `form.ejs`, pois o cadastro passou a ser feito por modal.

No momento, os dados de Funcionários ainda ficam em memória no controller. Isso foi mantido de forma temporária para validar o funcionamento das rotas e views antes da integração com PostgreSQL.

---

### Correção de erro no dashboard

A IA ajudou a corrigir o erro causado pelo uso de:

```ejs
<%= usuario.nome %>
```

quando `usuario` ainda não existia na sessão.

A solução foi enviar um usuário padrão pela rota do dashboard ou validar a existência do objeto antes de acessar `usuario.nome`.

---

### Organização visual

A IA apoiou a padronização das telas com:

```txt
app-layout
sidebar/navbar
main-content
topbar
content-area
table-card
```

Também ajudou a identificar conflitos entre partials antigos e o novo layout, principalmente nas telas de Moradores e Funcionários.

---

### Git e versionamento

A IA foi usada para orientar comandos de Git, como:

```bash
git status
git add -A
git diff --cached --name-status
git commit -m "mensagem"
git pull --rebase origin main
git push origin main
```

Também ajudou a interpretar avisos como:

```txt
LF will be replaced by CRLF
```

e a recuperar arquivos removidos por engano, como README.md e USO_IA.md.

---

## Exemplos de prompts utilizados

| Situação | Prompt aproximado | Resultado |
|---|---|---|
| Erro de rota | "Está dando Cannot GET /moradores, vamos verificar?" | Revisão de `app.js`, rota e controller de moradores |
| Dois app.js | "Está abrindo direto em funcionários mesmo com app.js certo" | Identificação de dois arquivos `app.js` no projeto |
| Modal de funcionários | "Preciso fazer o cadastro de funcionário igual o de moradores, por popup" | Criação do fluxo de cadastro por modal |
| Edição criando novo registro | "Quando clico em editar ele cadastra outro funcionário" | Separação entre modal de cadastro e modal de edição |
| Documentação | "Preciso atualizar README e USO_IA com tudo que fizemos" | Organização do estado atual do projeto |

---

## O que foi aceito

A equipe aproveitou as seguintes orientações:

- uso do `app.js` principal na raiz;
- redirecionamento inicial para `/login`;
- organização das rotas principais;
- correção da rota de moradores;
- padronização das telas com o mesmo layout;
- cadastro e edição de funcionários por modal;
- inativação em vez de exclusão física;
- uso de dados em memória enquanto o banco ainda não está integrado;
- atualização do README.md e USO_IA.md conforme o andamento real do projeto.

---

## O que foi adaptado

Algumas sugestões foram adaptadas para manter o projeto mais simples:

- O cadastro de Funcionários inicialmente seria em uma tela separada, mas foi alterado para modal para seguir o padrão de Moradores;
- A exclusão de funcionário foi tratada como inativação;
- Os dados do módulo de Funcionários ficaram temporariamente em memória antes da criação do model com banco;
- O dashboard foi mantido simples;
- As rotas de Unidades, Reservas e Ocorrências foram mantidas em preparação até os responsáveis finalizarem seus módulos.

---

## O que foi recusado ou deixado para depois

Algumas ideias foram deixadas para versões futuras:

- recuperação de senha;
- envio de notificações;
- dashboard com gráficos avançados;
- permissões complexas por perfil;
- exclusão física definitiva de funcionários;
- integração completa com banco antes de validar as telas;
- módulos extras fora do escopo principal.

---

## Cuidados adotados

Durante o uso da IA, foram tomados os seguintes cuidados:

- revisar o código antes de aplicar;
- não substituir a compreensão da equipe;
- testar as alterações localmente;
- evitar comandos Git perigosos;
- não usar `git push --force`;
- não enviar `node_modules`;
- não enviar `.env`;
- manter o código simples;
- registrar as decisões tomadas;
- adaptar as respostas ao contexto real do projeto.

---

## Estado atual registrado

No momento desta atualização:

```txt
[x] Login funciona com sessão temporária
[x] Dashboard abre
[x] Moradores abre com listagem visual
[x] Funcionários lista, cadastra, edita e inativa em memória
[x] Layout base foi padronizado
[x] Middleware de autenticação foi criado
[x] Models existem como base
[ ] Funcionários ainda não usa PostgreSQL
[ ] Models ainda não possuem consultas ao banco
[ ] Unidades, Reservas e Ocorrências ainda precisam ser implementados completamente
```

---

## Reflexão da equipe

A IA ajudou principalmente na organização, na explicação de erros e na revisão do fluxo técnico. Em vários momentos, as respostas precisaram ser adaptadas porque o projeto tinha arquivos já existentes feitos por integrantes diferentes.

O uso da ferramenta foi útil para destravar problemas, mas a equipe precisou testar, revisar e decidir o que realmente fazia sentido aplicar. O objetivo foi usar a IA como apoio, não como substituição do desenvolvimento e da compreensão do código.

---

## Manutenção deste arquivo

Este documento deve ser atualizado sempre que a IA for usada para uma nova parte importante do projeto.
