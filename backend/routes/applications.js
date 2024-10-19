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

// Route GET pour chopper les candidatures de l'utilisateur connecté (pour /applications/me)
router.get("/me", async (req, res) => {
  const uuid = req.cookies.uuid;
  console.log("Token:", uuid);
  console.log("User found:", user);

  if (!uuid) {
    return res.status(401).json({ result: false, error: "Non autorisé" });
  }

  try {
    // Récupérer l'utilisateur par le token ou une autre méthode
    const user = await prisma.people.findFirst({
      where: { token: uuid }, // Remplace par la méthode de récupération d'utilisateur
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ result: false, error: "Utilisateur non trouvé" });
    }

    // Récupérer les candidatures de l'utilisateur
    const applications = await prisma.application.findMany({
      where: { applicantId: user.id }, // Assurez-vous que vous utilisez le bon champ ici
      include: {
        advertisement: {
          select: {
            title: true,
          },
        },
      },
    });

    return res.json(applications);
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures:", error);
    return res.status(500).json({ result: false, error: "Une erreur est survenue." });
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
