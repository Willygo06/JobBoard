const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
// Route pour GET
app.get('/my/example/get', async (req, res) => {
    try {
      const example= await prisma.my_table_name_in_db.findMany();
      res.json(example);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

// Route pour POST
app.post('/my/example/post', async (req, res) => {
  const { name, email } = req.body;
  try {
    const example= await prisma.my_table_name_in_db.create({
      data: {
        name,
        email,
      },
    });
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Serveur démarré sur le port ${PORT}"));