const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const { checkBody } = require("../module/checkBody");
const { hash } = require("bcrypt");

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*()_+])[A-za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
}

// Route GET pour récupérer toutes les personnes
router.get("/", async (req, res, next) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Champs vides ou manquants" });
    return;
  }
  const { email } = req.body;
  if (!validateEmail(email)) {
    res.json({ result: false, error: "Adresse e-mail invalide" });
    return;
  }
  try {
    const people = await prisma.people.findMany();
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
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Champs vides ou manquants" });
    return;
  }
  const { email } = req.body;
  if (!validateEmail(email)) {
    res.json({ result: false, error: "Adresse e-mail invalide" });
    return;
  }
  const { password } = req.body;
  if (!validatePassword(password)) {
    res.json({
      result: false,
      error:
        "Format du mot de passe incorrect (Première lettre majusucule, 8 caractères et un symbole requis)",
    });
    return;
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    const newPerson = await prisma.people.create({
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
    res.status(201).json(newPerson);
  } catch (error) {
    next({
      message: "Erreur lors de la création de la personne.",
      details: error.message,
    });
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
