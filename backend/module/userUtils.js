// userUtils.js
const prisma = require("../prismaClient");

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

async function findUserByToken(uuid) {
  try {
    const user = await prisma.people.findUnique({
      where: { id: uuid },
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

async function findRoleByToken(uuid) {
  try {
    const user = await prisma.people.findUnique({
      where: { id: uuid },
    });
    return user;
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur par UUID :", error);
    throw new Error("Erreur lors de la recherche de l'utilisateur.");
  }
}

async function findRoleByEmail(email) {
  try {
    const user = await prisma.people.findUnique({
      where: { email: email },
      select: { id: true, role: true }
    });

    return user.role;
  } catch (error) {
    console.error("Erreur lors de la recherche de l'utilisateur par email :", error);
    throw new Error("Erreur lors de la recherche de l'utilisateur.");
  }
}

module.exports = { findUserByEmail, findUserTokenByEmail, findRoleByToken, findRoleByEmail, findUserByToken };
