const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient'); // Assure-toi que le client Prisma est correctement importé
const { checkBody } = require("../module/checkBody");

// Route GET pour récupérer toutes les annonces
router.get('/', async (req, res, next) => {
  try {
    const advertisements = await prisma.advertisements.findMany({
      include: {
        applications: true, // Inclure les candidatures liées
        company: true, // Inclure les entreprises liées
      },
    });
    res.json(advertisements);
  } catch (error) {
    next({ message: 'Erreur lors de la récupération des annonces.', details: error.message });
  }
});

// Route POST pour créer une nouvelle annonce
router.post('/', async (req, res, next) => {
  const { title, description, details, location, salary, benefits, hours, contactEmail, companyId } = req.body;
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
          connect: { id: companyId }, // Connecter l'entreprise par son ID
        },
      },
    });
    res.status(201).json(newAdvertisement);
  } catch (error) {
    next({ message: 'Erreur lors de la création de l\'annonce.', details: error.message });
  }
});

// Route PUT pour mettre à jour une annonce
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, description, details, location, salary, benefits, hours, contactEmail, companyId } = req.body;
  
    try {
      // Mettre à jour l'annonce
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
          companyId: companyId ? parseInt(companyId) : null, // Assurez-vous que companyId est défini
        },
      });
  
      res.json(updatedAdvertisement);
    } catch (error) {
      next({ message: 'Erreur lors de la mise à jour de l\'annonce.', details: error.message });
    }
  });


  // Route DELETE pour supprimer une annonce
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      await prisma.advertisements.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      next({ message: 'Erreur lors de la suppression de l\'annonce.', details: error.message });
    }
  });
  
  module.exports = router;