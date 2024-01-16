const express = require("express")
const logger = require("morgan")

const app = express()

// MIDDLEWARE
app.use(logger("dev"))
app.use(express.static("public"))
app.use(express.json())

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose")
mongoose
  .connect(
    "mongodb+srv://gorbunoochek:5hYYsPPtbMJOZjxY@cluster0.4ywofqe.mongodb.net"
  )
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err))

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>")
})

//  Iteration 3 - Create a Recipe route
const Recipe = require("./models/Recipe.model")

app.post("/recipes", async (req, res) => {
  try {
    const {
      title,
      level,
      ingredients,
      instructions,
      cuisine,
      dishType,
      image,
      duration,
      creator,
    } = req.body
    const createdRecipe = await Recipe.create({
      title,
      level,
      ingredients,
      instructions,
      cuisine,
      dishType,
      image,
      duration,
      creator,
    })
    res.status(201).json({ message: "recipe created", data: createdRecipe })
  } catch (error) {
    console.log(error)
  }
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipes) => {
      res.status(200).json(allRecipes)
    })
    .catch((error) => {
      res.status(500).json({ message: "error while getting all the recipes" })
    })
})
//  Iteration 5 - Get a Single Recipe
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe)
    })
    .catch((error) => {
      res.status(500).json({ message: "error while getting a recipe" })
    })
})

//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe)
    })
    .catch((error) => {
      res.status(500).json({ message: "error while updating a recipe" })
    })
})
/// ??

//  Iteration 7 - Delete a Single Recipe

app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => {
      res.status(505).json({ message: "error while deleting" })
    })
})

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"))

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app
