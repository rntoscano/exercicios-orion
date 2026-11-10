-- =====================================================
-- Exercício 2 — Banco relacional (JOINs e Filtros)
-- Banco: PostgreSQL (orion_db)
-- Usa as tabelas e os dados criados no Exercício 1
-- =====================================================

-- -----------------------------------------------------
-- 1. INNER JOIN: nome do aluno e nome do curso
-- -----------------------------------------------------
SELECT a.nome AS aluno, c.nome_curso AS curso
FROM alunos a
INNER JOIN cursos c ON c.id = a.curso_id
ORDER BY a.id;

-- -----------------------------------------------------
-- 2. WHERE + JOIN: apenas os alunos de Desenvolvimento Web
-- -----------------------------------------------------
SELECT a.nome AS aluno, c.nome_curso AS curso
FROM alunos a
INNER JOIN cursos c ON c.id = a.curso_id
WHERE c.nome_curso = 'Desenvolvimento Web'
ORDER BY a.id;

-- -----------------------------------------------------
-- 3. UPDATE: mover Maria para o curso de Ciência de Dados
-- -----------------------------------------------------
UPDATE alunos
SET curso_id = (SELECT id FROM cursos WHERE nome_curso = 'Ciência de Dados')
WHERE email = 'maria.souza@email.com';

-- Conferindo a mudança com um novo SELECT com JOIN
SELECT a.nome AS aluno, c.nome_curso AS curso
FROM alunos a
INNER JOIN cursos c ON c.id = a.curso_id
ORDER BY a.id;

-- -----------------------------------------------------
-- Extra: LEFT JOIN + WHERE para achar cursos sem alunos
-- -----------------------------------------------------
SELECT c.id, c.nome_curso
FROM cursos c
LEFT JOIN alunos a ON a.curso_id = c.id
WHERE a.id IS NULL
ORDER BY c.id;
