-- =====================================================
-- Exercício 1 — Banco relacional (SQL Básico)
-- Banco: PostgreSQL (orion_db)
-- =====================================================

-- Permite rodar o script mais de uma vez do zero
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS cursos;

-- -----------------------------------------------------
-- 1. Tabela cursos
-- -----------------------------------------------------
CREATE TABLE cursos (
    id         SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- 2. Tabela alunos (curso_id é chave estrangeira para cursos.id)
-- -----------------------------------------------------
CREATE TABLE alunos (
    id       SERIAL PRIMARY KEY,
    nome     VARCHAR(100) NOT NULL,
    email    VARCHAR(150) NOT NULL UNIQUE,
    curso_id INTEGER NOT NULL,
    CONSTRAINT fk_alunos_cursos
        FOREIGN KEY (curso_id) REFERENCES cursos (id)
);

-- -----------------------------------------------------
-- 3. Inserindo dados
-- -----------------------------------------------------
INSERT INTO cursos (nome_curso) VALUES
    ('Desenvolvimento Web'),
    ('Ciência de Dados'),
    ('DevOps');

INSERT INTO alunos (nome, email, curso_id) VALUES
    ('João Silva',   'joao.silva@email.com',   1),
    ('Maria Souza',  'maria.souza@email.com',  1),
    ('Pedro Santos', 'pedro.santos@email.com', 2),
    ('Ana Lima',     'ana.lima@email.com',     2);

-- -----------------------------------------------------
-- 4. Teste da chave estrangeira
-- O curso 99 não existe, então este INSERT DEVE falhar com
-- "violates foreign key constraint fk_alunos_cursos"
-- -----------------------------------------------------
INSERT INTO alunos (nome, email, curso_id) VALUES
    ('Aluno Inválido', 'invalido@email.com', 99);

-- -----------------------------------------------------
-- 5. Consultando os alunos inseridos
-- -----------------------------------------------------
SELECT * FROM alunos;
