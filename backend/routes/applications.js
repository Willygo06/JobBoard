const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Route GET pour récupérer toutes les candidatures
router.get('/', async (req, res, next) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        advertisement: true,
        applicant: true,
      },
    });
    res.json(applications);
  } catch (error) {
    next({ message: 'Erreur lors de la récupération des candidatures.', details: error.message });
  }
});

// Route POST pour créer une nouvelle candidature
router.post('/', async (req, res, next) => {
  const { jobId, applicantId, message, guestName, guestEmail } = req.body;

  try {
    const newApplication = await prisma.application.create({
      data: {
        jobId,
        applicantId: applicantId || null, // Si l'utilisateur n'est pas connecté, applicantId sera null
        message,
        state: 'en attente',
        guestName: guestName || null, // Stocker le nom si fourni
        guestEmail: guestEmail || null, // Stocker l'email si fourni
      },
    });
    res.status(201).json(newApplication);
  } catch (error) {
    next({ message: 'Erreur lors de la création de la candidature.', details: error.message });
  }
});

// Route PUT pour mettre à jour une candidature
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { jobId, applicantId, message, state } = req.body;
  try {
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: {
        jobId,
        applicantId,
        message,
        state,
      },
    });
    res.json(updatedApplication);
  } catch (error) {
    next({ message: 'Erreur lors de la mise à jour de la candidature.', details: error.message });
  }
});

// Route DELETE pour supprimer une candidature
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.application.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    next({ message: 'Erreur lors de la suppression de la candidature.', details: error.message });
  }
});

module.exports = router;
