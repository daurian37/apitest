const express = require("express");
const mysql = require("mysql");
const next = require("next");


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Configuration de la base de données MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "iob",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  // Route pour récupérer les données de la table contenu en tant qu'API
  server.get("/testapi/contenu", (req, res) => {
    const query = "SELECT * FROM contenu";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des données" });
        return;
      }
      res.json(results);
    });
  });

  // Route pour récupérer les données de la table category en tant qu'API
  server.get("/testapi/category", (req, res) => {
    const query = "SELECT * FROM category";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des données :", err);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des données" });
        return;
      }
      res.json(results);
    });
  });

  // Gère toutes les autres routes avec Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Prêt sur http://localhost:3000");
  });
});
