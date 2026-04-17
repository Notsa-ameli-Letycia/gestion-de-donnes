const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let depenses = [];

app.post("/depenses", (req, res) => {
    const depense = {
        id: Date.now(),
        categorie: req.body.categorie,
        montant: Number(req.body.montant),
        date: req.body.date,
        description: req.body.description
    };

    depenses.push(depense);

    res.json(depense);
});

app.get("/depenses", (req, res) => {
    res.json(depenses);
});

app.get("/total", (req, res) => {
    const total = depenses.reduce((sum, d) => sum + d.montant, 0);
    res.json({ total });
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
