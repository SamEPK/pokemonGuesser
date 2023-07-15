import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as cors from 'cors';
import * as path from 'path';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors()); // Configure CORS

app.post('/pokemon', (req, res) => {
  const newPokemon = req.body;

  // Lire le contenu actuel du fichier JSON
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));

  // Ajouter le nouveau Pokémon
  pokemonData.push(newPokemon);

  // Écrire le contenu mis à jour dans le fichier JSON avec une mise en forme
  fs.writeFileSync(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData[0], null, 2));

  // Répondre avec le nouveau Pokémon ajouté
  res.json(newPokemon);
});

app.delete('/pokemon/:id', (req, res) => {
  const pokemonId = req.params.id;

  // Read the current contents of the JSON file
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));

  // Find the index of the Pokémon to delete
  const pokemonIndex = pokemonData.findIndex((pokemon: { number: number }) => pokemon.number === Number(pokemonId));

  if (pokemonIndex !== -1) {
    // Remove the Pokémon from the array
    pokemonData.splice(pokemonIndex, 1);

    // Write the updated content back to the JSON file with formatting
    fs.writeFileSync(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2));

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});