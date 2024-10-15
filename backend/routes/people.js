const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const { checkBody } = require("../module/checkBody");
const { findUserByEmail } = require('../module/userUtils');
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
}

const verifyPassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

// Route GET pour récupérer toutes les personnes
router.get("/", async (req, res, next) => {
  try {
    const people = await prisma.people.findMany();
    
    if (people.length === 0) {
      return res.status(404).json({ 
        result: false, 
        error: "Aucune personne trouvée." 
      });
    }
    
    res.json(people);
  } catch (error) {
    next({
      message: "Erreur lors de la récupération des personnes.",
      details: error.message,
    });
  }
});

// Route POST pour créer une nouvelle personne
router.post("/", async (req, res, next) => {
  // Vérifiez que les champs requis sont présents
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Champs vides ou manquants" });
    return;
  }

  const { firstName, lastName, email, password, phone, address, zipcode, role } = req.body;

  // Vérifiez si l'utilisateur existe déjà avec cet e-mail
  const existingUser = await prisma.people.findUnique({
    where: { email: email },
  });

  // Si l'email existe déjà, retournez une erreur
  if (existingUser) {
    return res.status(400).json({ error: "L'e-mail est déjà utilisé." });
  }

  // Vérifiez si l'email est valide
  if (!validateEmail(email)) {
    res.json({ result: false, error: "Adresse e-mail invalide" });
    return;
  }

  // Vérifiez si le mot de passe respecte les critères de validation
  if (!validatePassword(password)) {
    res.json({
      result: false,
      error:
        "Format du mot de passe incorrect (Première lettre majuscule, 8 caractères et un symbole requis)",
    });
    return;
  }

  // Hachez le mot de passe avant de l'enregistrer
  const hash = bcrypt.hashSync(password, 10);

  try {
    // Créez la nouvelle personne dans la base de données
    const newPerson = await prisma.people.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        phone,
        address,
        zipcode,
        role: role || 'user', // Définit le rôle par défaut à 'user'
      },
    });

    // Retournez une réponse de succès avec la nouvelle personne créée
    res.status(201).json({ result: true, person: newPerson });
  } catch (error) {
    // Gestion des erreurs lors de la création
    console.error("Erreur lors de la création de la personne:", error);
    res.status(500).json({ error: "Erreur lors de la création de la personne." });
  }
});

// Route POST pour la connexion d'un utilisateur
router.post('/login', async (req, res) => {
  console.log("Requête de connexion reçue :", req.body);
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur par e-mail
    const user = await findUserByEmail(email);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ result: false, error: 'Utilisateur non trouvé.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ result: false, error: 'Mot de passe incorrect.' });
    }

    // Si tout est correct, retourner les données de l'utilisateur
    return res.json({ result: true, data: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return res.status(500).json({ result: false, error: 'Une erreur est survenue.' });
  }
});

// Route PUT pour mettre à jour une personne
router.put("/:id", async (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const { id } = req.params;
  const { firstName, lastName, email, phone, address, zipcode, role } =
    req.body;
  try {
    const updatedPerson = await prisma.people.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        phone,
        address,
        zipcode,
        role,
      },
    });
    res.json(updatedPerson);
  } catch (error) {
    next({
      message: "Erreur lors de la mise à jour de la personne.",
      details: error.message,
    });
  }
});

// Route DELETE pour supprimer une personne
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.people.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    next({
      message: "Erreur lors de la suppression de la personne.",
      details: error.message,
    });
  }
});

module.exports = router;