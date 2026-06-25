# Uso de Inteligência Artificial no Projeto CondoSys

Este documento registra como a Inteligência Artificial foi utilizada como apoio técnico e documental no desenvolvimento do **CondoSys**, sistema web fullstack de gestão condominial.

A IA foi usada como ferramenta auxiliar para explicação de conceitos, revisão de código, interpretação de erros, organização de tarefas, documentação e preparação para defesa técnica.

As decisões finais, alterações no código, testes e validações foram realizadas pela equipe.

---

## 1. Ferramenta de IA utilizada

A ferramenta utilizada foi:

```txt
ChatGPT
```

---

## 2. Principais finalidades de uso

A IA foi utilizada para apoiar:

- interpretação dos requisitos acadêmicos do projeto;
- definição e controle do escopo do MVP;
- explicação da arquitetura MVC;
- revisão do fluxo entre rotas, controllers, models e views;
- apoio na organização dos módulos do sistema;
- revisão de erros no terminal;
- orientação sobre Git e GitHub;
- revisão de mensagens de commit;
- apoio na instalação e validação do PostgreSQL;
- explicação de comandos SQL para conferência de dados;
- validação do Dashboard após integração com banco;
- apoio no módulo de Funcionários;
- revisão da documentação do projeto;
- preparação de perguntas e respostas para defesa técnica.

---

## 3. Exemplos de prompts utilizados

| Situação | Prompt aproximado | Resultado obtido |
|---|---|---|
| Organização inicial | "Como estruturar o projeto em MVC com Node, Express e EJS?" | Separação em routes, controllers, models, views, middlewares e database |
| Rota com erro | "Está dando erro ao acessar /moradores, o que verifico?" | Revisão de app.js, routes e controller |
| Login | "A topbar está mostrando usuário errado" | Padronização do usuário logado na sessão |
| Banco de dados | "Como vejo no PostgreSQL se está salvando?" | Uso de `SELECT *` e `SELECT COUNT(*)` no pgAdmin |
| Dashboard | "O dashboard não contabiliza unidades do banco" | Identificação da necessidade de `async/await` |
| PostgreSQL | "O psql não é reconhecido no Windows" | Orientação para configurar o PATH |
| Funcionários | "Preciso tirar os pré-cadastrados e usar banco" | Orientação para migrar o model de array para PostgreSQL |
| GitHub | "Preciso de título e descrição para commit" | Sugestão de mensagens claras de commit |
| Documentação | "Revise README e USO_IA conforme o projeto" | Atualização dos documentos com o estado atual e uso responsável da IA |

---

## 4. Apoios técnicos realizados

### 4.1 Arquitetura MVC

A IA auxiliou na explicação do fluxo MVC usado no projeto:

```txt
Rota
↓
Controller
↓
Model
↓
Banco de dados ou dados temporários
↓
View EJS
```

Esse apoio ajudou a equipe a entender a responsabilidade de cada camada e a preparar explicações para a defesa técnica.

---

### 4.2 Autenticação e rotas protegidas

A IA apoiou a revisão do fluxo de login e logout, além da proteção das rotas internas com middleware.

Foi reforçado que o sistema deve verificar a existência de:

```txt
req.session.usuario
```

Caso não exista usuário na sessão, o middleware redireciona para `/login`.

---

### 4.3 Dashboard

Após a integração do módulo de Unidades com PostgreSQL, o Dashboard deixou de contar corretamente os registros.

A IA ajudou a identificar que o problema ocorria porque alguns models passaram a retornar dados de forma assíncrona. A correção aplicada foi usar:

```js
async
await
```

no `dashboardController.js`.

---

### 4.4 PostgreSQL e pgAdmin

A IA orientou a instalação e validação do PostgreSQL e pgAdmin no ambiente local.

Foram explicados:

- senha do usuário `postgres`;
- porta `5432`;
- banco `condoServer`;
- função do pgAdmin;
- erro de `psql` não reconhecido no Windows;
- validação com consultas SQL.

Consultas usadas nos testes:

```sql
SELECT * FROM unidades;
SELECT COUNT(*) FROM unidades;
SELECT * FROM funcionarios;
SELECT COUNT(*) FROM funcionarios;
```

---

### 4.5 Validação de Pull Requests

A IA foi usada para apoiar a análise de alterações antes e depois dos merges.

Foram avaliados pontos como:

- impacto no Dashboard;
- conexão com banco;
- scripts de setup;
- rotas afetadas;
- possíveis conflitos entre arquivos;
- necessidade de testar em branch separada;
- necessidade de conferir se o merge alterou arquivos já corrigidos.

---

### 4.6 Módulo de Funcionários

A IA apoiou o módulo de Funcionários em várias etapas:

- criação e revisão das rotas;
- organização do controller;
- validação dos dados de formulário;
- cadastro por modal;
- edição por modal;
- inativação;
- reativação;
- bloqueio de CPF duplicado;
- formatação de CPF e telefone;
- explicação sobre IDs automáticos no PostgreSQL;
- orientação para substituir dados pré-cadastrados em array por consulta ao banco.

Também foi reforçado que o aluno responsável pelo módulo deve saber explicar:

```txt
funcionarioRoutes.js
funcionarioController.js
funcionarioModel.js
views/funcionarios/index.ejs
```

---

### 4.7 Documentação

A IA apoiou a revisão do `README.md` e deste `USO_IA.md`, buscando alinhar os documentos aos critérios do projeto:

- visão geral do sistema;
- tecnologias utilizadas;
- instruções de execução;
- banco de dados;
- DER e relacionamentos;
- integrantes e responsabilidades;
- registro do uso de IA;
- cuidados adotados;
- estado atual do projeto.

---

## 5. O que foi aceito pela equipe

A equipe aceitou orientações relacionadas a:

- manter o projeto em arquitetura MVC;
- usar `app.js` na raiz como arquivo principal;
- proteger rotas internas com middleware;
- usar sessão para autenticação;
- padronizar o usuário logado como "Administrador Geral";
- usar Bootstrap e partials EJS para layout;
- usar inativação em vez de exclusão definitiva em módulos administrativos;
- validar campos obrigatórios nos formulários;
- usar PostgreSQL como banco persistente;
- criar script `npm run setup`;
- validar dados pelo pgAdmin;
- corrigir o Dashboard com `async/await`;
- organizar commits com mensagens claras;
- documentar o uso de IA de forma transparente.

---

## 6. O que foi adaptado pela equipe

Algumas sugestões da IA foram adaptadas para manter o projeto simples e coerente com o prazo acadêmico:

- o login foi mantido temporariamente com credenciais fixas para testes;
- o Dashboard foi mantido simples, com cards de totais;
- alguns módulos usam modais para cadastro e edição;
- algumas funcionalidades avançadas foram deixadas para versões futuras;
- a equipe priorizou um MVP funcional em vez de um sistema grande demais;
- parte da integração com banco foi feita por etapas para reduzir risco de quebrar o projeto.

---

## 7. O que foi recusado ou deixado para depois

Foram deixados para versões futuras:

- recuperação de senha;
- envio de e-mails;
- notificações automáticas;
- permissões complexas por perfil;
- dashboard com gráficos avançados;
- deploy em nuvem;
- testes automatizados completos;
- logs avançados de auditoria;
- exclusão física definitiva de registros;
- migração completa de todos os módulos para PostgreSQL em uma única etapa.

---

## 8. Cuidados adotados para evitar cópia sem compreensão

Durante o uso da IA, a equipe adotou os seguintes cuidados:

- testar localmente cada alteração;
- revisar o código antes de aplicar;
- adaptar sugestões ao projeto real;
- não usar comandos Git perigosos sem entender;
- não usar `git push --force`;
- não enviar `node_modules`;
- não enviar `.env`;
- conferir dados no PostgreSQL com consultas SQL;
- registrar commits com mensagens compreensíveis;
- discutir problemas antes de aprovar merges;
- manter o escopo simples;
- garantir que cada integrante consiga explicar seu CRUD;
- usar a IA como apoio, não como substituição da autoria.

---

## 9. Reflexão crítica da equipe

A IA ajudou a acelerar a resolução de problemas e a organizar melhor o raciocínio técnico. Ela foi útil principalmente para explicar erros, revisar fluxos MVC, orientar testes no banco e preparar documentação.

Mesmo assim, nem toda sugestão foi aplicada diretamente. Algumas respostas precisaram ser adaptadas porque o projeto já tinha arquivos criados por integrantes diferentes, padrões diferentes de rotas e etapas em andamento.

O maior cuidado foi não copiar sem entender. A equipe precisou testar o código, comparar com o comportamento real do sistema e validar se a solução atendia aos critérios acadêmicos.

A IA contribuiu como apoio ao aprendizado, mas a responsabilidade técnica do projeto permaneceu com os integrantes da equipe.

---

## 10. Estado atual registrado

No momento desta atualização, a IA foi utilizada para apoiar:

```txt
[x] Organização MVC
[x] Login e sessão
[x] Middleware de autenticação
[x] Dashboard
[x] PostgreSQL e pgAdmin
[x] Setup do banco
[x] Validação de Unidades no banco
[x] Correção assíncrona do Dashboard
[x] Apoio ao módulo de Funcionários
[x] GitHub, commits e merges
[x] Atualização do README.md
[x] Atualização do USO_IA.md
```

Ponto de atenção:

```txt
[ ] Confirmar se a migração do módulo de Funcionários para PostgreSQL já foi enviada para a main pública do GitHub
```

---

## 11. Conclusão

O uso de IA foi importante para apoiar o desenvolvimento, mas não substituiu a compreensão técnica da equipe.

O projeto foi validado por meio de execução local, testes pelas telas, consultas no PostgreSQL, revisão de código e controle de versão no GitHub.

Este documento deve continuar sendo atualizado se a IA for usada em novas etapas relevantes do projeto.
