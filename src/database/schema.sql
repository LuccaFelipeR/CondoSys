-- ============================================================
-- CONDOSYS - Schema do Banco de Dados
-- Executar conectado ao banco: condoServer
-- ============================================================

CREATE TABLE IF NOT EXISTS unidades (
    id_unidade  SERIAL          PRIMARY KEY,
    bloco       VARCHAR(10)     NOT NULL,
    numero      VARCHAR(10)     NOT NULL,
    andar       INTEGER         NOT NULL,
    status      VARCHAR(20)     NOT NULL DEFAULT 'Ativa',
    UNIQUE (bloco, numero)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario  SERIAL          PRIMARY KEY,
    nome        VARCHAR(100)    NOT NULL,
    email       VARCHAR(120)    NOT NULL UNIQUE,
    senha_hash  VARCHAR(255)    NOT NULL,
    tipo_usuario VARCHAR(30)    NOT NULL,
    ativo       BOOLEAN         NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS funcionarios (
    id_funcionario  SERIAL          PRIMARY KEY,
    nome            VARCHAR(100)    NOT NULL,
    cpf             VARCHAR(14)     NOT NULL UNIQUE,
    cargo           VARCHAR(80)     NOT NULL,
    telefone        VARCHAR(20)     NOT NULL,
    data_admissao   DATE            NOT NULL,
    data_demissao   DATE,
    salario         DECIMAL(10,2)   NOT NULL,
    status          VARCHAR(20)     NOT NULL DEFAULT 'Ativo',
    id_usuario      INTEGER         NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS moradores (
    id_morador      SERIAL          PRIMARY KEY,
    nome            VARCHAR(100)    NOT NULL,
    cpf             VARCHAR(14)     NOT NULL UNIQUE,
    telefone        VARCHAR(20)     NOT NULL,
    email           VARCHAR(120)    NOT NULL UNIQUE,
    data_nascimento DATE,
    placa_carro     VARCHAR(20),
    car_model       VARCHAR(30),
    id_unidade      INTEGER         NOT NULL,
    id_usuario      INTEGER         NOT NULL,
    FOREIGN KEY (id_unidade) REFERENCES unidades(id_unidade) ON DELETE RESTRICT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
);


CREATE TABLE IF NOT EXISTS reservas (
    id_reserva      SERIAL          PRIMARY KEY,
    area_comum      VARCHAR(30)     NOT NULL,
    data_reserva    DATE            NOT NULL,
    horario_inicio  TIME            NOT NULL,
    horario_fim     TIME            NOT NULL,
    status          VARCHAR(20)     NOT NULL DEFAULT 'Pendente',
    id_morador      INTEGER         NOT NULL,
    FOREIGN KEY (id_morador) REFERENCES moradores(id_morador) ON DELETE RESTRICT
);



CREATE TABLE IF NOT EXISTS ocorrencias (
    id_ocorrencia   SERIAL          PRIMARY KEY,
    titulo          VARCHAR(150)    NOT NULL,
    descricao       VARCHAR         NOT NULL,
    data_abertura   TIMESTAMP       NOT NULL DEFAULT NOW(),
    data_fechamento TIMESTAMP,
    status          VARCHAR(20)     NOT NULL DEFAULT 'Aberta',
    prioridade      VARCHAR(20)     NOT NULL DEFAULT 'Normal',
    id_morador      INTEGER         NOT NULL,
    FOREIGN KEY (id_morador) REFERENCES moradores(id_morador) ON DELETE RESTRICT
);
