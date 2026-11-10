// =====================================================
// Exercício 4 — Não relacional (Consultas Avançadas)
// Banco: MongoDB, database "blog"
// Usa a coleção posts do Exercício 3
// =====================================================

db = db.getSiblingDB("blog");

// -----------------------------------------------------
// 1. Atualizar (Update): adicionar "comentarios" a um post
//    comentarios é um array de documentos
// -----------------------------------------------------
printjson(
  db.posts.updateOne(
    { titulo: "Schema flexível na prática" },
    {
      $set: {
        comentarios: [
          { autor: "João Silva", texto: "Ótima explicação!", data: new Date("2026-11-10T10:00:00Z") },
          { autor: "Maria Souza", texto: "Não sabia que dava para misturar formatos.", data: new Date("2026-11-10T11:30:00Z") }
        ]
      }
    }
  )
);

// -----------------------------------------------------
// 2. Consultar dentro de um array: posts com a tag "nosql"
// -----------------------------------------------------
print('Posts com a tag "nosql":');
printjson(db.posts.find({ tags: "nosql" }, { _id: 0, titulo: 1, tags: 1 }).toArray());

// -----------------------------------------------------
// 3. Filtrar por um campo específico: posts do autor Carlos Mendes
// -----------------------------------------------------
print('Posts do autor "Carlos Mendes":');
printjson(db.posts.find({ autor: "Carlos Mendes" }, { _id: 0, titulo: 1, autor: 1 }).toArray());

// -----------------------------------------------------
// Extra: consultar dentro dos documentos aninhados
//        posts que têm comentário da Maria Souza
// -----------------------------------------------------
print('Posts com comentário de "Maria Souza":');
printjson(db.posts.find({ "comentarios.autor": "Maria Souza" }, { _id: 0, titulo: 1, comentarios: 1 }).toArray());
