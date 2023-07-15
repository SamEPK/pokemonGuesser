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
app.get('/pokemon', function (req, res) {
    // Lire le contenu du fichier JSON
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    // Répondre avec les données des Pokémon
    res.json(pokemonData);
});
app.post('/pokemon', function (req, res) {
    var newPokemon = req.body;
    // Lire le contenu actuel du fichier JSON
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    // Ajouter le nouveau Pokémon
    pokemonData.push(newPokemon);
    // Écrire le contenu mis à jour dans le fichier JSON avec une mise en forme
    fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), function (err) {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier JSON :', err);
            res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
        }
        else {
            // Répondre avec le nouveau Pokémon ajouté
            res.json(newPokemon);
        }
    });
});
app.delete('/pokemon/:id', function (req, res) {
    var pokemonId = req.params.id;
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    var pokemonIndex = pokemonData.findIndex(function (pokemon) { return pokemon.id === pokemonId; });
    console.log('pokemonIndex', pokemonIndex);
    console.log('pokemonData', pokemonData);
    console.log('pokemonId', pokemonId);
    if (pokemonIndex === -1) {
        res.status(404).json({ error: 'Pokémon non trouvé' });
    }
    else {
        pokemonData.splice(pokemonIndex, 1);
        fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), function (err) {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier JSON :', err);
                res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
            }
            else {
                res.json({ message: 'Pokémon supprimé avec succès' });
            }
        });
    }
});
app.listen(PORT, function () {
    console.log("Serveur d\u00E9marr\u00E9 sur le port ".concat(PORT));
});
