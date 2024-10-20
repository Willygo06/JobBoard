const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

// Import des routes
const advertisementsRoutes = require("./routes/advertisements");
const applicationsRoutes = require("./routes/applications");
const peopleRoutes = require("./routes/people");
const companiesRoutes = require("./routes/companies");

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


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
