# Uso de Inteligência Artificial no Projeto

## 1. Identificação

**Projeto:** CondoSys - Sistema de Gestão Condominial  
**Disciplina:** Tópicos Especiais  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Equipe:** Lucca Felipe, Matheus Albertini, Abel Piassa, Emanulle Silva e Adrian Felipe  

---

## 2. Ferramenta utilizada

Durante o desenvolvimento do projeto, a equipe utilizou o **ChatGPT** como ferramenta de apoio acadêmico e técnico.

A ferramenta foi utilizada para auxiliar na organização de ideias, revisão de documentação, esclarecimento de conceitos, apoio ao planejamento do sistema, correção de erros iniciais, organização do repositório e preparação para a defesa técnica.

As decisões finais, adaptações e validações foram realizadas pelos integrantes da equipe. A IA foi usada como apoio, não como substituição da autoria ou da compreensão técnica dos alunos.

---

## 3. Finalidades de uso

A Inteligência Artificial foi utilizada como apoio nas seguintes atividades:

- interpretação dos critérios do projeto acadêmico;
- organização da documentação inicial;
- estruturação e atualização do `README.md`;
- criação e atualização do `USO_IA.md`;
- apoio na definição do escopo do sistema;
- apoio na organização dos requisitos funcionais e não funcionais;
- revisão das entidades e relacionamentos do MER/DER;
- apoio na elaboração da matriz de responsabilidades;
- organização inicial do backlog;
- esclarecimento de conceitos relacionados à arquitetura MVC;
- orientação sobre Node.js, Express, EJS e estrutura de pastas;
- apoio na criação inicial da rota, controller e view do módulo de Funcionários;
- interpretação e correção de erros no terminal;
- orientação sobre uso do Git, commits, `.gitignore` e organização do repositório;
- apoio na preparação da equipe para a defesa técnica.

---

## 4. Exemplos de prompts utilizados

A equipe selecionou alguns prompts representativos utilizados durante as etapas de planejamento e estruturação inicial do projeto.

| Etapa | Prompt utilizado | Resumo da resposta obtida | Decisão da equipe |
|---|---|---|---|
| Planejamento inicial | "Professor Charly, vamos começar o projeto de Gestão Condominial. Antes de criar qualquer código, me conduza pela etapa de planejamento da N1." | A IA orientou quais informações deveriam ser levantadas antes da implementação, como equipe, CRUDs, banco de dados, requisitos, DER, protótipos e backlog. | A equipe utilizou a orientação para organizar a sequência inicial de trabalho. |
| Organização da documentação | "Como posso começar a documentação?" | A IA sugeriu uma estrutura inicial para o README.md, incluindo visão geral, objetivo, tecnologias, arquitetura, entidades e responsabilidades. | A equipe adaptou a estrutura para o projeto CondoSys. |
| Entrega 2 | "Baseado nesse HTML que montamos, consegue me orientar com os códigos?" | A IA orientou a iniciar pela estrutura MVC, separando rotas, controllers e views, sem criar o projeto inteiro de uma vez. | A equipe aplicou a orientação principalmente no módulo de Funcionários. |
| Correção de rota | "Cannot GET /funcionarios" | A IA explicou que o erro indicava rota não encontrada no Express, antes de chegar na view. | A equipe revisou `app.js`, `funcionarioRoutes.js` e `funcionarioController.js`. |
| Correção de dependência | "Cannot find module 'ejs'" | A IA explicou que o Express estava tentando renderizar uma view EJS, mas o pacote não estava instalado. | Foi instalado o EJS com `npm install ejs`. |
| Organização do repositório | "Quero subir toda essa pasta para o GitHub do jeito correto." | A IA orientou a manter `app.js`, `package.json`, `README.md`, `USO_IA.md` e `src/` diretamente na raiz do repositório. | A equipe reorganizou o repositório para evitar pasta duplicada. |
| Gitignore | "Preciso de ajuda para fazer o gitignore." | A IA explicou que `.gitignore` é arquivo, não comando, e orientou a ignorar `node_modules/` e `.env`. | Foi criado `.gitignore` com os itens necessários. |
| Commits seletivos | "Existe forma de dar commit somente nos arquivos que eu mexi?" | A IA explicou como usar `git add caminho/do/arquivo` em vez de `git add .`. | A equipe adotou a prática de commits mais específicos. |
| Atualização documental | "Preciso atualizar todo README e todo USO_IA com base no que aplicamos." | A IA organizou os registros do que foi aceito, adaptado e recusado durante a etapa inicial. | A documentação foi atualizada para refletir o uso real da IA. |

---

## 5. Contribuições aproveitadas

Algumas contribuições da IA foram aproveitadas pela equipe após análise e adaptação, como:

- organização inicial da documentação do projeto;
- estruturação das seções do README.md;
- melhoria na descrição do objetivo e do problema do sistema;
- organização dos requisitos funcionais por módulo;
- separação entre funcionalidades do MVP e melhorias futuras;
- revisão textual da documentação;
- apoio na explicação dos relacionamentos entre entidades;
- sugestão de uma estrutura mais clara para a matriz de papéis e responsabilidades;
- explicação do padrão MVC aplicado ao projeto;
- orientação para criar a estrutura inicial do módulo de Funcionários;
- explicação do fluxo entre `app.js`, rotas, controllers e views;
- criação de uma seção de execução local no README;
- registro de erros comuns e soluções no README;
- orientação sobre `.gitignore`;
- orientação sobre commits e organização do GitHub.

Essas contribuições foram utilizadas como base de apoio, não como substituição do trabalho da equipe.

---

## 6. Adaptações realizadas pela equipe

As sugestões recebidas foram ajustadas conforme o contexto real do projeto, a capacidade técnica da equipe e os critérios definidos para a disciplina.

Entre as principais adaptações realizadas, destacam-se:

- atualização do nome do projeto para **CondoSys**;
- escolha do **PostgreSQL** como banco de dados;
- manutenção do projeto como um MVP acadêmico;
- ajuste dos papéis dos integrantes para contemplar um CRUD principal por aluno;
- adequação das entidades ao tema Gestão Condominial;
- revisão dos requisitos conforme o escopo possível dentro do prazo;
- adaptação da documentação para refletir as decisões tomadas pelo grupo;
- simplificação de algumas funcionalidades para evitar aumento excessivo de complexidade;
- padronização das rotas no plural, como `/funcionarios`;
- reorganização do repositório para manter os arquivos principais diretamente na raiz;
- escolha por iniciar o módulo de Funcionários primeiro com rota, controller e view simples antes de integrar o banco.

---

## 7. Correções realizadas com apoio da IA

Durante a estrutura inicial do projeto, a IA auxiliou na interpretação de erros reais encontrados durante a execução local.

### Erro: `requiere is not defined`

O erro ocorreu porque foi escrito `requiere` em vez de `require`.

**Correção aplicada:**

```js
const funcionarioController = require('../controllers/funcionarioController');
```

### Erro: `app is not defined`

O erro ocorreu porque `app.use()` foi chamado antes da criação da aplicação Express.

**Correção aplicada:**

```js
const express = require('express');
const app = express();
```

Depois disso, as rotas foram registradas.

### Erro: `Cannot GET /funcionarios`

O erro indicou que a rota `/funcionarios` não estava sendo encontrada pelo Express.

**Correção aplicada:**

```js
app.use('/funcionarios', funcionarioRoutes);
```

E no arquivo de rotas:

```js
router.get('/', funcionarioController.listar);
```

### Erro: `Cannot find module 'ejs'`

O erro indicou que o projeto estava configurado para usar EJS, mas a dependência ainda não estava instalada.

**Correção aplicada:**

```bash
npm install ejs
```

### Erro: `fatal: not a git repository`

O erro ocorreu porque o comando Git foi executado em uma pasta que não estava vinculada ao repositório.

**Correção aplicada:**

A equipe passou a trabalhar na pasta clonada/vinculada ao GitHub.

### Erro: `Author identity unknown`

O erro ocorreu porque o Git ainda não possuía nome e e-mail configurados no computador.

**Correção aplicada:**

```bash
git config --global user.name "Lucca Felipe"
git config --global user.email "email_utilizado_no_github"
```

---

## 8. Sugestões não utilizadas

Algumas ideias foram avaliadas, mas não foram incluídas no escopo inicial por aumentarem a complexidade do projeto.

Entre elas:

- recuperação de senha por e-mail, SMS ou WhatsApp;
- envio automático de notificações;
- cadastro completo de visitantes;
- controle detalhado de encomendas;
- módulo financeiro com cobranças ou boletos;
- relatórios avançados;
- integrações externas;
- regras complexas de permissão logo na primeira versão;
- criação de dashboards avançados;
- criação de telas complexas antes da estrutura básica funcionar;
- implementação completa do CRUD antes da rota, controller e view estarem testados;
- envio de `node_modules/` para o GitHub;
- envio do arquivo `.env` com dados reais para o GitHub.

Essas funcionalidades e práticas foram deixadas de fora para manter o projeto simples, funcional, seguro e adequado ao prazo acadêmico.

---

## 9. Cuidados adotados

Para garantir o uso responsável da ferramenta, a equipe adotou os seguintes cuidados:

- revisão de todo conteúdo antes de inserir na documentação;
- adaptação das sugestões à realidade do projeto;
- discussão das decisões entre os integrantes;
- manutenção da autoria da equipe sobre as decisões finais;
- estudo dos conceitos utilizados no projeto;
- organização das responsabilidades individuais;
- uso do GitHub para registrar a evolução do trabalho;
- criação do `.gitignore` para evitar envio de arquivos indevidos;
- não envio de `node_modules/` para o repositório;
- não envio do `.env` com dados sensíveis;
- preparação dos integrantes para explicar suas partes na defesa técnica;
- registro dos erros encontrados e das correções realizadas.

Cada integrante será responsável por compreender e defender o CRUD e as atividades sob sua responsabilidade.

---

## 10. Responsabilidades da equipe

| Integrante | Papel no grupo | CRUD principal |
|---|---|---|
| Lucca Felipe | Documentação | Funcionários |
| Matheus Albertini | Banco de Dados | Unidades |
| Abel Piassa | Autenticação | Moradores |
| Emanulle Silva | Front-End | Reservas |
| Adrian Felipe | Back-End | Ocorrências |

A ferramenta de IA poderá apoiar diferentes etapas do projeto, mas cada integrante deverá compreender a estrutura, a lógica e as decisões técnicas relacionadas à sua parte.

---

## 11. Registro específico do módulo de Funcionários

O módulo de Funcionários ficou sob responsabilidade do integrante **Lucca Felipe**.

A IA apoiou a criação e entendimento da estrutura inicial do módulo, envolvendo:

```txt
src/routes/funcionarioRoutes.js
src/controllers/funcionarioController.js
src/models/funcionarioModel.js
src/views/funcionarios/index.ejs
```

O foco inicial foi fazer a rota `/funcionarios` abrir corretamente no navegador, passando pelo fluxo:

```txt
app.js
   ↓
funcionarioRoutes.js
   ↓
funcionarioController.js
   ↓
views/funcionarios/index.ejs
```

Essa etapa foi validada com o projeto rodando em:

```txt
http://localhost:3000/funcionarios
```

---

## 12. Registro sobre GitHub e repositório

A IA também foi utilizada para orientar a organização do repositório no GitHub.

Foram aplicadas as seguintes decisões:

- manter o projeto diretamente na raiz do repositório;
- evitar uma pasta `CondoSys` duplicada dentro do próprio repositório;
- criar `.gitignore`;
- ignorar `node_modules/`;
- ignorar `.env`;
- configurar nome e e-mail do Git;
- realizar commit com mensagem clara;
- orientar o uso de commits seletivos para arquivos alterados por cada integrante.

Essas orientações ajudaram a tornar o repositório mais organizado para o trabalho em equipe.

---

## 13. Reflexão crítica

O uso da Inteligência Artificial contribuiu principalmente para organizar melhor as ideias da equipe, revisar a documentação, esclarecer dúvidas técnicas e interpretar erros durante a configuração inicial do projeto.

A equipe entende que a ferramenta pode acelerar algumas atividades, mas também reconhece que seu uso exige análise crítica. Nem toda sugestão gerada foi aceita automaticamente. Algumas foram adaptadas, outras simplificadas e outras deixadas para versões futuras.

O principal cuidado adotado foi evitar que a ferramenta substituísse o aprendizado dos integrantes. Por isso, as decisões finais, a modelagem, a implementação, os testes e a defesa técnica permanecem sob responsabilidade da equipe.

---

## 14. Conclusão

A Inteligência Artificial foi utilizada como apoio no planejamento, documentação, revisão e estruturação inicial do projeto **CondoSys**.

Seu uso contribuiu para melhorar a organização do trabalho, corrigir erros iniciais, padronizar a documentação e apoiar o entendimento do fluxo MVC.

A construção do sistema, a validação das decisões e a compreensão técnica continuam sendo responsabilidades dos integrantes da equipe.

O grupo manterá este documento atualizado conforme o projeto evoluir.
