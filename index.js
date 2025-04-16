const port = 8000;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fuerza 1 - 10
let animals = [
  {
    id: 1,
    name: "Gato",
    strength: 3,
  },
  {
    id: 2,
    name: "Elefante",
    strength: 8,
  },
  {
    id: 3,
    name: "Murcielago",
    strength: 1,
  },
];
let currentId = animals.length;

// SERVER
app.post("/animals", (req, res) => {
  animals.push({
    id: currentId + 1,
    name: req.body.name,
    strength: req.body.strength,
  });
  currentId++;
  res.sendStatus(201);
});

app.get("/animals", (req, res) => {
  res.send(animals);
});

app.delete("/animals/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  const filteredAnimals = animals.filter((animal) => animal.id !== idToDelete);
  if (filteredAnimals.length == animals.length) {
    // No borre ningun elemento
    res.status(404).send("Ningun elemento borrado");
  } else {
    // Borre un elemento
    animals = filteredAnimals;
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
