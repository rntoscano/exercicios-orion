// =====================================================
// Exercício 3 — Não relacional (CRUD Básico)
// Banco: MongoDB (db_mongo), database "blog"
// =====================================================

db = db.getSiblingDB("blog");

// Permite rodar o script mais de uma vez do zero
db.posts.drop();

// -----------------------------------------------------
// 1. Criar a coleção posts
// -----------------------------------------------------
db.createCollection("posts");
print("Coleções do banco blog:");
printjson(db.getCollectionNames());

// -----------------------------------------------------
// 2. Inserir (Create): documento com titulo, autor e conteudo
// -----------------------------------------------------
printjson(
  db.posts.insertOne({
    titulo: "Primeiros passos com MongoDB",
    autor: "Carlos Mendes",
    conteudo: "O MongoDB guarda os dados em documentos parecidos com JSON."
  })
);

// -----------------------------------------------------
// 3. Testar o schema flexível: mesmo formato + campo novo "tags"
// -----------------------------------------------------
printjson(
  db.posts.insertOne({
    titulo: "Schema flexível na prática",
    autor: "Ana Costa",
    conteudo: "Na mesma coleção, cada documento pode ter campos diferentes.",
    tags: ["nosql", "flexivel"]
  })
);

// -----------------------------------------------------
// 4. Consultar (Read): listar todos os documentos
// -----------------------------------------------------
printjson(db.posts.find().toArray());
