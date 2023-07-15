import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../entities-module.Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonJsonFile = "../assets/Data.json";

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonJsonFile);
  }

  getOnePokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokemonJsonFile}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.pokemonJsonFile, pokemon);
  }

  savePokemonData(pokemons: Pokemon[]): void {
    const jsonPokemons = JSON.stringify(pokemons);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.pokemonJsonFile}/${pokemon.number}`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  deletePokemon(id: number): Observable<void> {
    const url = `${this.pokemonJsonFile}/${id}`;
    return this.http.delete<void>(url);
  }
}
