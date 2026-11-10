// Carga inicial do banco "blog": os mesmos posts do Exercício 3.
// O MongoDB executa os arquivos de /docker-entrypoint-initdb.d
// apenas na primeira vez que o container sobe com o banco vazio.

db = db.getSiblingDB("blog");

db.posts.insertMany([
  {
    titulo: "Primeiros passos com MongoDB",
    autor: "Carlos Mendes",
    conteudo: "O MongoDB guarda os dados em documentos parecidos com JSON."
  },
  {
    titulo: "Schema flexível na prática",
    autor: "Ana Costa",
    conteudo: "Na mesma coleção, cada documento pode ter campos diferentes.",
    tags: ["nosql", "flexivel"]
  }
]);
