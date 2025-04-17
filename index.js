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
  currentId++;
  animals.push({
    id: currentId,
    name: req.body.name,
    strength: req.body.strength,
  });
  res.status(201).send({ id: currentId });
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

app.put("/animals/:id", (req, res) => {
  const idToUpdate = Number(req.params.id);
  if (!req.body) {
    res.status(400).send("Body not found");
  }
  const nameToUpdate = req.body.name;
  const strengthToUpdate = req.body.strength;
  if (!nameToUpdate || !strengthToUpdate) {
    res.status(400).send("Please provide name and strength to update");
  }
  // Obtener elemento con id idToUpdate del array para actualizarlo
  const indexAnimal = animals.findIndex((animal) => animal.id == idToUpdate);
  if (indexAnimal >= 0) {
    animals[indexAnimal].name = nameToUpdate;
    animals[indexAnimal].strength = strengthToUpdate;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
