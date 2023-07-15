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
app.use(cors());
app.get('/pokemon', function (req, res) {
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    res.json(pokemonData);
});
app.post('/pokemon', function (req, res) {
    var newPokemon = req.body;
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    pokemonData.push(newPokemon);
    fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), function (err) {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier JSON :', err);
            res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
        }
        else {
            res.json(newPokemon);
        }
    });
});
app.delete('/pokemon/:id', function (req, res) {
    var pokemonId = parseInt(req.params.id);
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    //console.log("pokemonData = " + pokemonData +'\n')
    var pokemonIndex = pokemonData.findIndex(function (pokemon) { return pokemon.number == pokemonId; });
    // console.log("pokemonIndex = " + pokemonIndex +'\n')
    if (pokemonIndex === -1) {
        res.status(404).json({ error: 'Pokémon non trouvé' });
    }
    else {
        var deletedPokemon_1 = pokemonData.splice(pokemonIndex, 1)[0];
        // console.log("deletedPokemon = " + deletedPokemon +'\n')
        fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), function (err) {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier JSON :', err);
                res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
            }
            else {
                res.json(deletedPokemon_1);
            }
        });
    }
});
app.put('/pokemon/:id', function (req, res) {
    var pokemonId = parseInt(req.params.id);
    var updatedPokemon = req.body;
    var pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
    var pokemonIndex = pokemonData.findIndex(function (pokemon) { return pokemon.number === pokemonId; });
    console.log("pokemonIndex = " + pokemonIndex + '\n');
    if (pokemonIndex === -1) {
        res.status(404).json({ error: 'Pokémon non trouvé' });
    }
    else {
        pokemonData[pokemonIndex] = updatedPokemon;
        fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), function (err) {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier JSON :', err);
                res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
            }
            else {
                res.json(updatedPokemon);
            }
        });
    }
});
app.listen(PORT, function () {
    console.log("Serveur d\u00E9marr\u00E9 sur le port ".concat(PORT));
});
