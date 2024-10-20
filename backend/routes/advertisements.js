const express = require("express");
const router = express.Router();
const prisma = require('../prismaClient');


// Route GET pour récupérer toutes les annonces
router.get("/", async (req, res, next) => {
  try {
    const advertisements = await prisma.advertisements.findMany({
      include: {
        applications: true,
        company: true,
      },
    });
    res.json(advertisements);
  } catch (error) {
    next({
      message: "Erreur lors de la récupération des annonces.",
      details: error.message,
    });
  }
});

// Route POST pour créer une nouvelle annonce
router.post("/", async (req, res, next) => {
  const {
    title,
    description,
    details,
    location,
    salary,
    benefits,
    hours,
    contactEmail,
    companyId,
  } = req.body;
  try {
    const newAdvertisement = await prisma.advertisements.create({
      data: {
        title,
        description,
        details,
        location,
        salary,
        benefits,
        hours,
        contactEmail,
        Company: {
          connect: { id: companyId },
        },
      },
    });
    res.status(201).json(newAdvertisement);
  } catch (error) {
    next({
      message: "Erreur lors de la création de l'annonce.",
      details: error.message,
    });
  }
});

// Route PUT pour mettre à jour une annonce
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    details,
    location,
    salary,
    benefits,
    hours,
    contactEmail,
    companyId,
  } = req.body;

  try {
    const updatedAdvertisement = await prisma.advertisements.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        details,
        location,
        salary,
        benefits,
        hours,
        contactEmail,
        companyId: companyId ? parseInt(companyId) : null,
      },
    });

    res.json(updatedAdvertisement);
  } catch (error) {
    next({
      message: "Erreur lors de la mise à jour de l'annonce.",
      details: error.message,
    });
  }
});

// Route DELETE pour supprimer une annonce
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.advertisements.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    next({
      message: "Erreur lors de la suppression de l'annonce.",
      details: error.message,
    });
  }
});

module.exports = router;
