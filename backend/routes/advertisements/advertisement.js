app.post("/my/example/post", async (req, res) => {
  const { name, email } = req.body;
  try {
    const example = await prisma.my_table_name_in_db.create({
      data: {
        name,
        email,
      },
    });
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});
