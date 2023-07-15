import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../entities-module.Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonJsonFile = "../assets/Data.json";

  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonJsonFile);
  }
  
  getOnePokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokemonJsonFile}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    // Récupérez les données actuelles du fichier JSON
    this.getAllPokemon().subscribe(pokemons => {
      // Ajoutez le nouveau Pokémon au tableau existant
      pokemons.push(pokemon);
  
      // Enregistrez le tableau mis à jour dans le fichier JSON
      this.savePokemonData(pokemons);
    });
  
    // Retournez le Pokémon ajouté
    return of(pokemon);
  }
  
  private savePokemonData(pokemons: Pokemon[]): void {
    // Convertissez le tableau des Pokémon en JSON
    const jsonPokemons = JSON.stringify(pokemons);
  
    // Enregistrez les données dans le stockage local (localStorage)
    localStorage.setItem('pokemonData', jsonPokemons);
  }
  
  

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.pokemonJsonFile}/${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  deletePokemon(id: number): Observable<void> {
    const url = `${this.pokemonJsonFile}/${id}`;
    return this.http.delete<void>(url);
  }
}