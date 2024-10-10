var express = require("express");
var router = express.Router();

app.get("/my/example/get", async (req, res) => {
  try {
    const example = await prisma.my_table_name_in_db.findMany();
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
