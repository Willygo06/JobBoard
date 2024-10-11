const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Route GET pour récupérer toutes les personnes
router.get('/', async (req, res, next) => {
  try {
    const people = await prisma.people.findMany();
    res.json(people);
  } catch (error) {
    next({ message: 'Erreur lors de la récupération des personnes.', details: error.message });
  }
});

// Route POST pour créer une nouvelle personne
router.post('/', async (req, res, next) => {
  const { firstName, lastName, email, phone, address, zipcode, role } = req.body;
  try {
    const newPerson = await prisma.people.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        zipcode,
        role,
      },
    });
    res.status(201).json(newPerson);
  } catch (error) {
    next({ message: 'Erreur lors de la création de la personne.', details: error.message });
  }
});

// Route PUT pour mettre à jour une personne
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, address, zipcode, role } = req.body;
  try {
    const updatedPerson = await prisma.people.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        zipcode,
        role,
      },
    });
    res.json(updatedPerson);
  } catch (error) {
    next({ message: 'Erreur lors de la mise à jour de la personne.', details: error.message });
  }
});

// Route DELETE pour supprimer une personne
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.people.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    next({ message: 'Erreur lors de la suppression de la personne.', details: error.message });
  }
});

module.exports = router;
