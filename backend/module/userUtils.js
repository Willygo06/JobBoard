// userUtils.js
const prisma = require("../prismaClient");

// Fonction pour trouver un utilisateur par e-mail
async function findUserByEmail(email) {
  try {
    const user = await prisma.people.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur :", error);
    throw new Error("Erreur lors de la recherche de l'utilisateur.");
  }
}
async function findUserTokenByEmail(email) {
  try {
    const user = await prisma.people.findUnique({
      where: { email: email },
    });
    return user.id;
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur :", error);
    throw new Error("Erreur lors de la recherche de l'utilisateur.");
  }
}

// Fonction pour trouver un utilisateur par token (UUID)
async function findUserByToken(uuid) {
  try {
    const user = await prisma.people.findUnique({
      where: { id: uuid }, // Rechercher l'utilisateur par token (UUID)
    });
    return user;
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur par UUID :", error);
    throw new Error("Erreur lors de la recherche de l'utilisateur.");
  }
}

module.exports = { findUserByEmail, findUserTokenByEmail, findUserByToken };
