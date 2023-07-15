"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");
var path = require("path");
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
app.use(cors()); // Configure CORS
app.post('/pokemon', function (req, res) {
    var newPokemon = req.body;
    // Lire le contenu actuel du fichier JSON
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    // Ajouter le nouveau Pokémon
    pokemonData.push(newPokemon);
    // Écrire le contenu mis à jour dans le fichier JSON avec une mise en forme
    fs.writeFileSync(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData[0], null, 2));
    // Répondre avec le nouveau Pokémon ajouté
    res.json(newPokemon);
});
app.delete('/pokemon/:id', function (req, res) {
    var pokemonId = req.params.id;
    // Read the current contents of the JSON file
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    // Find the index of the Pokémon to delete
    var pokemonIndex = pokemonData.findIndex(function (pokemon) { return pokemon.number === Number(pokemonId); });
    if (pokemonIndex !== -1) {
        // Remove the Pokémon from the array
        pokemonData.splice(pokemonIndex, 1);
        // Write the updated content back to the JSON file with formatting
        fs.writeFileSync(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2));
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(PORT, function () {
    console.log("Serveur d\u00E9marr\u00E9 sur le port ".concat(PORT));
});
