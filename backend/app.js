<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

=======
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const errorHandler = require("./middleware/errorHandler"); // Import du middleware qui est séparé pour gérer les erreurs

// Import des routes
const advertisementsRoutes = require("./routes/advertisements");
const applicationsRoutes = require("./routes/applications");
const peopleRoutes = require("./routes/people");
const companiesRoutes = require("./routes/companies");

app.use(cors());
<<<<<<< HEAD
app.use(express.json()); // Pour traiter les requêtes en JSON

// Utilisation des routes
app.use("/api/advertisements", advertisementsRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/companies", companiesRoutes);

// Middleware de gestion des erreurs (doit être le dernier middleware)
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});
=======
app.use(express.json());
// Route pour GET
app.get("/my/example/get", async (req, res) => {
  try {
    const example = await prisma.my_table_name_in_db.findMany();
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route pour POST
app.post("/my/example/post", async (req, res) => {
  const { name, email } = req.body;
  try {
    const example = await prisma.my_table_name_in_db.create({
      data: {
        name,
        industry,
        location,
        website,
        contactEmail,
      },
    });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Serveur démarré sur le port ${PORT}"));
>>>>>>> origin/main
