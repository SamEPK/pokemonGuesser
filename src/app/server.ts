import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as cors from 'cors';
import * as path from 'path';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.get('/pokemon', (req, res) => {
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
  res.json(pokemonData);
});

app.post('/pokemon', (req, res) => {
  const newPokemon = req.body;
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
  pokemonData.push(newPokemon);
  fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier JSON :', err);
      res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
    } else {
      res.json(newPokemon);
    }
  });
});

app.delete('/pokemon/:id', (req, res) => {
  const pokemonId: number = parseInt(req.params.id);
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
  const pokemonIndex = pokemonData.findIndex((pokemon: any) => pokemon.number == pokemonId);

  if (pokemonIndex === -1) {
    res.status(404).json({ error: 'Pokémon non trouvé' });
  } else {
    const deletedPokemon = pokemonData.splice(pokemonIndex, 1)[0];

    fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier JSON :', err);
        res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
      } else {
        res.json(deletedPokemon);
      }
    });
  }
});
app.post('/pokemon/duplicate/:id', (req, res) => {
  const pokemonId: number = parseInt(req.params.id);
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
  const originalPokemon = pokemonData.find((pokemon: any) => pokemon.number === pokemonId);

  if (!originalPokemon) {
    res.status(404).json({ error: 'Pokémon non trouvé' });
  } else {
    const duplicatedPokemon = { ...originalPokemon };
    duplicatedPokemon.number = pokemonData.length + 1; // Générer un nouveau numéro unique pour le Pokémon dupliqué

    pokemonData.push(duplicatedPokemon);
    fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier JSON :', err);
        res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
      } else {
        res.json(duplicatedPokemon);
      }
    });
  }
});
app.put('/pokemon/:id', (req, res) => {
  const pokemonId: number = parseInt(req.params.id);
  const updatedPokemon = req.body;
  const pokemonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/Data.json'), 'utf8'));
  const pokemonIndex = pokemonData.findIndex((pokemon: any) => pokemon.number === pokemonId);

  if (pokemonIndex === -1) {
    res.status(404).json({ error: 'Pokémon non trouvé' });
  } else {
    pokemonData[pokemonIndex] = updatedPokemon;

    fs.writeFile(path.join(__dirname, '../assets/Data.json'), JSON.stringify(pokemonData, null, 2), (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier JSON :', err);
        res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier JSON' });
      } else {
        res.json(updatedPokemon);
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
