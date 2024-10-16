const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// Route GET pour récupérer toutes les entreprises
router.get("/", async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    next({
      message: "Erreur lors de la récupération des entreprises.",
      details: error.message,
    });
  }
});

// Route POST pour créer une nouvelle entreprise
router.post("/", async (req, res, next) => {
  const { name, industry, location, website, contactEmail } = req.body;
  try {
    const newCompany = await prisma.company.create({
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
    next({
      message: "Erreur lors de la création de l'entreprise.",
      details: error.message,
    });
  }
});

// Route PUT pour mettre à jour une entreprise
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, industry, location, website, contactEmail } = req.body;
  try {
    const updatedCompany = await prisma.company.update({
      where: { id: parseInt(id) },
      data: {
        name,
        industry,
        location,
        website,
        contactEmail,
      },
    });
    res.json(updatedCompany);
  } catch (error) {
    next({
      message: "Erreur lors de la mise à jour de l'entreprise.",
      details: error.message,
    });
  }
});

// Route DELETE pour supprimer une entreprise
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.company.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    next({
      message: "Erreur lors de la suppression de l'entreprise.",
      details: error.message,
    });
  }
});

module.exports = router;
