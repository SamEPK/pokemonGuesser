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

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});