const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log de l'erreur dans la console
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'Erreur serveur',
      details: err.details || 'Une erreur est survenue. Veuillez réessayer plus tard.',
    },
  });
};

// Routes pour les Annonces (Advertisements)
app.get('/api/advertisements', async (req, res, next) => {
  try {
    const advertisements = await prisma.advertisements.findMany({
      include: {
        applications: true,
        Company: true,
      },
    });
    res.json(advertisements);
  } catch (error) {
    next({ message: 'Erreur lors de la récupération des annonces.', details: error.message });
  }
});

app.post('/api/advertisements', async (req, res, next) => {
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
          connect: { id: companyId },
        },
      },
    });
    res.status(201).json(newAdvertisement);
  } catch (error) {
    next({ message: 'Erreur lors de la création de l\'annonce.', details: error.message });
  }
});

// Routes pour les Candidatures (Applications)
app.get('/api/applications', async (req, res, next) => {
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

app.post('/api/applications', async (req, res, next) => {
  const { jobId, applicantId, message } = req.body;
  try {
    const newApplication = await prisma.application.create({
      data: {
        jobId,
        applicantId,
        message,
        state: 'en attente',
      },
    });
    res.status(201).json(newApplication);
  } catch (error) {
    next({ message: 'Erreur lors de la création de la candidature.', details: error.message });
  }
});

// Routes pour les Personnes (People)
app.get('/api/people', async (req, res, next) => {
  try {
    const people = await prisma.people.findMany();
    res.json(people);
  } catch (error) {
    next({ message: 'Erreur lors de la récupération des personnes.', details: error.message });
  }
});

app.post('/api/people', async (req, res, next) => {
  const { firstName, lastName, email, phone, address, zipcode, role } = req.body;
  try {
    const newPerson = await prisma.people.create({
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
    res.status(201).json(newPerson);
  } catch (error) {
    next({ message: 'Erreur lors de la création de la personne.', details: error.message });
  }
});

// Routes pour les Entreprises (Companies)
app.get('/api/companies', async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    next({ message: 'Erreur lors de la récupération des entreprises.', details: error.message });
  }
});

app.post('/api/companies', async (req, res, next) => {
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
    next({ message: 'Erreur lors de la création de l\'entreprise.', details: error.message });
  }
});

// Middleware de gestion des erreurs (doit être le dernier middleware)
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ton server est accessible ici http://localhost:${PORT}`);
});
