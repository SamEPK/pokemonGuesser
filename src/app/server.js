"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var cors = require("cors");
var app = express();
var PORT = 3000;
app.use(bodyParser.json());
app.use(cors()); // Configure CORS
app.post('/pokemon', function (req, res) {
    var newPokemon = req.body;
    // Lire le contenu actuel du fichier JSON
    var pokemonData = JSON.parse(fs.readFileSync(__dirname + '/../assets/Data.json', 'utf8'));
    // Ajouter le nouveau Pokémon
    pokemonData.push(newPokemon);
    // Écrire le contenu mis à jour dans le fichier JSON avec une mise en forme
    fs.writeFileSync(__dirname + '/../assets/Data.json', JSON.stringify(pokemonData, null, 2));
    // Répondre avec le nouveau Pokémon ajouté
    res.json(newPokemon);
});

app.listen(PORT, function () {
    console.log("Serveur démarré sur le port " + PORT);
});
