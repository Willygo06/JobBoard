<!-- Job board README file -->

Welcome to the Job Board project led by Wilfried Gomes-Fortes and Clément Lores. Students at Epitech Nice.

# Description
LFG est une plateforme de recrutement en ligne qui publie des offres d'emploi des entreprises aux candidats

Esapce Candidat: L'utilisateur peuvent créer leur profil et postuler à des offres d'emplois
Espace Administration: L'administrateurs peut publier des offres d'emplois, et gère les entreprises et les candidatures.
Candidature simple: On peut postuler à des offres en quelques clics

Les technologies utilisées : 
Backend: Nodejs / Express 
Frontend: React / Tailwinds
Base de donnée: My SQL/ prisma

Pour exécuter le projet en local : 

1. Cloner le repository :
  git clone git@github.com:Willygo06/JobBoard.git

2. Accédez au doosier du projet LFG:
   cd jobboard

3. Installer les dépendances:
  npm i

4. Démarrer la base de donnée
    npx prisma studio

5. Démarer le serveur (backend) 
   node App.js 

6. Démarer le frontend 
  npm start

## Les Routes 

# Route pour Création de compte 
Méthode: Post

 const newPerson = await prisma.people.create({
      data: {
        firstName,
        lastName,
        email,
        password: hash,
        phone,
        address,
        zipcode,
        role: role || "user", // Définit le rôle par défaut à 'user'
      },
    });
    
 res.status(201).json({ result: true, person: newPerson });
  } catch (error) {
    console.error("Erreur lors de la création de la personne:", error);
    res

# Route pour récupéerer toutes les annonces
Méthode: Get

  try {
    const advertisements = await prisma.advertisements.findMany({
      include: {
        applications: true, // Inclure les candidatures liées
        company: true, // Inclure les entreprises liées
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

# Route pour modifier une candidature 

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

# Route pour supprimer une annonce
Méthode: Delete


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

# Requete API pour l'inscription d'un candidat

fetch("http://localhost:5000/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        zipcode,
      }),
    })
(data.result) {
          toast.success("Compte créé avec succès");
          
.catch((error) => {
        console.error("Erreur lors de la création du compte:", error);
        toast.error("Une erreur inattendue s'est produite.");

# Requète API pour récupérer les anonces 

const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/advertisements'); // URL de l'API des annonces
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du fetch des annonces:', error);
        setLoading(false);
      }
    };
    
