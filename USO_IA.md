# Uso de Inteligência Artificial no Projeto CondoSys

> **Status:** documento de transparência para entrega acadêmica.  
> **Projeto:** CondoSys - Sistema Web Fullstack de Gestão Condominial  
> **Ferramenta:** ChatGPT

Este documento registra como a Inteligência Artificial foi utilizada como apoio técnico, documental e organizacional no desenvolvimento do **CondoSys**.

A IA foi usada como ferramenta auxiliar para interpretação de requisitos, revisão de arquitetura MVC, explicação de erros, organização de tarefas, revisão de branches, apoio em documentação e preparação para defesa técnica.

As decisões finais, alterações no código, testes locais, commits e validações permaneceram sob responsabilidade da equipe.

---

## 1. Ferramenta de IA utilizada

A ferramenta utilizada foi:

```txt
ChatGPT
```

A IA atuou como apoio de estudo, revisão e orientação. Ela não substituiu a autoria dos integrantes e não foi tratada como responsável final pelo código entregue.

---

## 2. Finalidades de uso

A IA foi utilizada para apoiar:

- interpretação dos requisitos acadêmicos do projeto;
- definição e controle do escopo do MVP;
- organização da arquitetura MVC;
- explicação do fluxo entre routes, controllers, models, views e banco;
- revisão de erros exibidos no terminal;
- apoio em Git, commits e merges;
- análise de Pull Requests e branches;
- apoio na configuração e validação do PostgreSQL;
- revisão de `schema.sql`, `seed.sql` e `setup.js`;
- validação do dashboard e das contagens dos módulos;
- revisão de CRUDs específicos;
- melhoria de mensagens para comunicação entre equipe;
- revisão do `README.md`;
- criação e atualização deste `USO_IA.md`;
- preparação para defesa técnica individual.

---

## 3. Exemplos de prompts utilizados

| Situação | Prompt aproximado | Resultado obtido |
|---|---|---|
| Organização inicial | "Como estruturar um projeto Node.js com Express, EJS e MVC para gestão condominial?" | Separação em `routes`, `controllers`, `models`, `views`, `middlewares` e `database` |
| Requisitos acadêmicos | "O que o projeto precisa ter para atender a disciplina?" | Checklist de MVC, banco, CRUDs, autenticação, README, DER e uso de IA |
| GitHub e merges | "Analise as branches de Ocorrências e Reservas antes do merge" | Lista de riscos, ordem de merge e pontos de correção |
| Erro no setup | "npm run setup deu erro de sintaxe próximo de ')'" | Identificação de fechamento duplicado no `schema.sql` |
| Dependência faltando | "npm run dev informa Cannot find module jsonwebtoken" | Orientação para instalar dependências com `npm install` e validar pacote |
| Unidades | "Erro Cannot find module '../DAO/unidadesDAO'" | Padronização do controller para usar `unidadeModel.js` em vez de DAO antigo |
| Reservas | "Compare o reservaModel da responsável com o arquivo da main" | Preservação da lógica da integrante e remoção de código quebrado por merge |
| Funcionários | "A tela de Funcionários juntou tabela e formulário" | Identificação de tabela duplicada dentro do modal de cadastro |
| Ocorrências | "Identifier OcorrenciaController has already been declared" | Identificação de controller duplicado após merge |
| Documentação | "Atualize README e USO_IA conforme as instruções do projeto" | Geração de documentação alinhada ao escopo acadêmico |

---

## 4. Apoios técnicos realizados

### 4.1 Arquitetura MVC

A IA ajudou a equipe a compreender e explicar o fluxo MVC:

```txt
Rota
↓
Controller
↓
Model
↓
Banco de dados
↓
View EJS
```

Esse apoio foi usado para organizar os módulos e preparar a defesa técnica, principalmente para explicar como uma requisição sai da tela, passa pelo controller, chega ao model e retorna com dados do banco.

---

### 4.2 Autenticação e rotas protegidas

A IA apoiou a revisão do fluxo de login, logout e sessão.

Foi reforçado que as rotas internas devem verificar a existência de usuário autenticado na sessão:

```txt
req.session.usuario
```

Caso não exista sessão válida, o middleware redireciona o usuário para `/login`.

---

### 4.3 Banco de dados PostgreSQL

A IA apoiou a configuração e validação do PostgreSQL, incluindo:

- banco `condoServer`;
- porta `5432`;
- execução de `npm run setup`;
- função do `schema.sql`;
- função do `seed.sql`;
- diferença entre erro de conexão e erro de sintaxe SQL;
- validação de dados por consultas no pgAdmin.

Consultas usadas nos testes:

```sql
SELECT COUNT(*) FROM unidades;
SELECT COUNT(*) FROM moradores;
SELECT COUNT(*) FROM funcionarios;
SELECT COUNT(*) FROM reservas;
SELECT COUNT(*) FROM ocorrencias;
```

---

### 4.4 Revisão de branches e merges

A IA foi utilizada para apoiar a análise de branches e Pull Requests, principalmente nos módulos de **Ocorrências** e **Reservas**.

Foram avaliados:

- arquivos alterados;
- impacto no banco de dados;
- conflitos em `schema.sql` e `seed.sql`;
- uso correto de PostgreSQL;
- proteção de rotas;
- duplicidade de código após merge;
- risco de sobrescrever arquivos da `main`;
- ordem mais segura de integração;
- necessidade de testes após cada merge.

A equipe decidiu aceitar os merges e depois realizou auditoria pós-merge com apoio da IA.

---

### 4.5 Correções pós-merge

Após os merges, a IA apoiou a interpretação de erros e a organização das correções.

Principais situações analisadas:

- erro de sintaxe no `schema.sql`;
- dependência `jsonwebtoken` não encontrada;
- controller de Unidades chamando um DAO inexistente;
- `reservaModel.js` com código antigo e novo misturados;
- `ocorrenciaController.js` com declaração duplicada da classe;
- tela de Funcionários com tabela duplicada dentro do modal de cadastro.

A equipe aplicou as correções manualmente, testando os arquivos e executando o projeto localmente.

---

## 5. Apoios por módulo

### 5.1 Unidades

Responsável: **Matheus Albertini**.

A IA apoiou:

- revisão do fluxo entre rota, controller e model;
- correção de importação indevida para `../DAO/unidadesDAO`;
- padronização do controller para usar `unidadeModel.js`;
- explicação de por que o projeto deveria seguir o padrão MVC sem misturar DAO isolado;
- preparação de mensagem para comunicar a alteração ao responsável.

---

### 5.2 Moradores

Responsável: **Abel Piassa**.

A IA apoiou:

- revisão da relação entre morador e unidade;
- identificação da necessidade de selecionar unidade existente;
- análise de erro relacionado à coluna `status`;
- sugestão de validações e melhorias em máscara de campos;
- orientação sobre defesa do relacionamento `moradores -> unidades`.

---

### 5.3 Funcionários

Responsável: **Lucca Felipe**.

A IA apoiou:

- revisão do CRUD de Funcionários;
- explicação do fluxo entre `funcionarioRoutes.js`, `funcionarioController.js`, `funcionarioModel.js` e `views/funcionarios/index.ejs`;
- validação de CPF duplicado;
- uso de máscara para CPF e telefone;
- inativação e reativação por status;
- correção visual da tela, removendo tabela duplicada dentro do modal de cadastro;
- explicação do que foi corrigido para comunicação com a equipe.

Arquivos que o responsável deve saber explicar:

```txt
src/routes/funcionarioRoutes.js
src/controllers/funcionarioController.js
src/models/funcionarioModel.js
src/views/funcionarios/index.ejs
src/database/schema.sql
```

---

### 5.4 Reservas

Responsável: **Emanulle Silva**.

A IA apoiou:

- comparação do `reservaModel.js` original da responsável com o arquivo quebrado na `main`;
- preservação da lógica de banco em PostgreSQL;
- validação de área comum, data, horário e status;
- análise da regra de conflito de horário;
- sugestão para trocar exclusão física por cancelamento lógico;
- orientação para melhorar mensagens de erro e máscaras de horário.

---

### 5.5 Ocorrências

Responsável: **Adrian Felipe**.

A IA apoiou:

- revisão do controller quebrado por merge;
- identificação de classe `OcorrenciaController` duplicada;
- orientação para manter uma única classe com os métodos esperados pela rota;
- análise da relação entre ocorrência e morador;
- sugestão de validação para impedir cadastro sem morador/unidade válida;
- explicação do fluxo de defesa técnica.

---

## 6. O que foi aceito pela equipe

A equipe aceitou orientações relacionadas a:

- manter arquitetura MVC simples e explicável;
- usar `app.js` como arquivo principal;
- proteger rotas internas com middleware de autenticação;
- utilizar sessão para login;
- usar PostgreSQL como banco persistente;
- manter `schema.sql`, `seed.sql` e `setup.js`;
- validar dados pelo pgAdmin;
- usar inativação ou cancelamento lógico quando fizer sentido;
- usar Bootstrap e EJS para interface;
- corrigir arquivos quebrados por merge em vez de apenas esconder erros;
- usar commits com mensagens claras;
- atualizar README e USO_IA de forma transparente.

---

## 7. O que foi adaptado pela equipe

Algumas sugestões da IA foram adaptadas para manter o projeto viável no prazo:

- o login foi mantido com usuário administrador de teste;
- o dashboard foi mantido simples, com cards e indicadores básicos;
- os formulários foram mantidos objetivos;
- algumas ações usam modal para facilitar a navegação;
- algumas validações são simples, adequadas ao MVP acadêmico;
- funcionalidades complexas foram deixadas para versões futuras;
- correções foram feitas uma por vez para reduzir risco de quebrar o projeto.

---

## 8. O que foi recusado ou deixado para versões futuras

Foram deixados para possíveis versões futuras:

- recuperação de senha;
- envio de e-mails;
- notificações automáticas;
- permissões avançadas por perfil;
- dashboard com gráficos mais completos;
- deploy em nuvem;
- testes automatizados;
- logs avançados de auditoria;
- auditoria de alterações por usuário;
- uso completo de variáveis de ambiente para credenciais locais;
- validações mais rígidas de CPF e telefone;
- seleção avançada por filtros e paginação.

---

## 9. Cuidados adotados para evitar cópia sem compreensão

A equipe adotou os seguintes cuidados:

- revisar o código antes de aplicar;
- testar localmente cada alteração;
- aplicar correções em etapas pequenas;
- comparar arquivos antes de substituir código de outro integrante;
- evitar copiar sem entender;
- não usar `git push --force`;
- não enviar `node_modules`;
- não enviar arquivos `.env`;
- conferir dados no PostgreSQL;
- usar commits com mensagens compreensíveis;
- registrar o uso de IA no repositório;
- manter o escopo do MVP simples;
- garantir que cada integrante consiga explicar seu próprio CRUD.

---

## 10. Reflexão crítica

A IA ajudou principalmente na organização do raciocínio técnico, interpretação de erros e revisão de documentação. Ela foi útil para explicar mensagens de terminal, sugerir caminhos de correção e transformar problemas em tarefas menores.

Mesmo assim, as respostas não foram aplicadas automaticamente. A equipe precisou testar, adaptar e validar cada sugestão no projeto real, considerando os arquivos existentes, o estado da `main`, as branches aceitas e as responsabilidades individuais.

O maior cuidado foi manter a compreensão técnica. Como a apresentação exige defesa individual, cada responsável precisa entender seu módulo, principalmente rotas, controllers, models, views, banco de dados e regras de negócio.

---

## 11. Estado de uso da IA registrado

A IA foi utilizada para apoiar:

```txt
[x] Interpretação dos requisitos acadêmicos
[x] Organização MVC
[x] Login e sessão
[x] Middleware de autenticação
[x] Dashboard
[x] PostgreSQL e pgAdmin
[x] Setup do banco
[x] Revisão de branches e merges
[x] Correção de erros pós-merge
[x] CRUD de Unidades
[x] CRUD de Moradores
[x] CRUD de Funcionários
[x] CRUD de Reservas
[x] CRUD de Ocorrências
[x] GitHub e mensagens de commit
[x] Atualização do README.md
[x] Atualização do USO_IA.md
[x] Preparação para defesa técnica
```

---

## 12. Conclusão

A Inteligência Artificial foi utilizada como ferramenta de apoio ao aprendizado, à organização e à documentação do projeto.

O uso da IA não substituiu a responsabilidade técnica da equipe. As decisões finais, testes, commits, validações e apresentação permaneceram com os integrantes.

Este documento deve ser mantido no repositório como evidência de uso responsável, transparente e crítico de Inteligência Artificial.