-- ============================================================
-- CONDOSYS - Dados iniciais para teste
-- Ordem respeita as dependências entre tabelas
-- ON CONFLICT DO NOTHING evita duplicatas ao rodar novamente
-- ============================================================

TRUNCATE TABLE ocorrencias, reservas, moradores, funcionarios, usuarios, unidades RESTART IDENTITY CASCADE;

INSERT INTO unidades (bloco, numero, andar, status)
VALUES ('A', '101', 1, 'Ativa')
ON CONFLICT (bloco, numero) DO NOTHING;


-- Senha: 12345 (hash gerado com bcrypt, 10 rounds)
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, ativo)
VALUES (
    'Administrador Geral',
    'admin@condosys.com',
    '$2b$10$Kn7V8QZKHv3k5k5k5k5k5uQZKHv3k5k5k5k5k5k5k5k5k5k5k5k5',
    'Administrador',
    TRUE
)
ON CONFLICT (email) DO NOTHING;


-- (depende de USUARIOS)
INSERT INTO funcionarios (nome, cpf, cargo, telefone, data_admissao, salario, status, id_usuario)
VALUES (
    'Carlos Souza',
    '111.222.333-44',
    'Zelador',
    '(43) 9 9800-0001',
    '2023-01-10',
    2500.00,
    'Ativo',
    1
)
ON CONFLICT (cpf) DO NOTHING;


--(depende de UNIDADES e USUARIOS)
INSERT INTO moradores (nome, cpf, telefone, email, data_nascimento, placa_carro, car_model, id_unidade, id_usuario)
VALUES (
    'João da Silva',
    '999.888.777-66',
    '(43) 9 9700-0001',
    'joao@email.com',
    '1990-05-15',
    'ABC-1234',
    'Fiat Uno',
    1,
    1
)
ON CONFLICT (cpf) DO NOTHING;


--(depende de MORADORES)
INSERT INTO reservas (area_comum, data_reserva, horario_inicio, horario_fim, status, id_morador)
VALUES (
    'Salão de Festas',
    '2025-07-20',
    '18:00',
    '23:00',
    'Pendente',
    1
)
ON CONFLICT DO NOTHING;


--(depende de MORADORES)
INSERT INTO ocorrencias (titulo, descricao, data_abertura, status, prioridade, id_morador)
VALUES (
    'Vazamento no corredor',
    'Há um vazamento de água no corredor do 1º andar próximo ao elevador.',
    NOW(),
    'Aberta',
    'Alta',
    1
)
ON CONFLICT DO NOTHING;