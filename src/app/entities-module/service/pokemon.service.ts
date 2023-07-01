import { Inject, Injectable } from '@angular/core';
import { Pokemon } from '../entities-module.Pokemon';
import { Observable, map, take, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonJsonFile = "../assets/Data.json";
  
  constructor(private http: HttpClient) {}

  async getAllPokemon(): Promise<Pokemon[]> {
    try {
      const data: Pokemon[]|undefined = await this.http.get<Pokemon[]>(this.pokemonJsonFile)
        .pipe(
          take(1),
          map(response => response as Pokemon[]) // Transformer la réponse en Pokemon[]
        )
        .toPromise();
      if (data === undefined) {
        throw new Error('La réponse de la requête est undefined.');
      }
      // Stocker les données JSON dans une liste d'objets
      const objets: Pokemon[] = data;
      // console.log(objets); //DEBUG
  
      return objets;
    } catch (error) {
      console.error('Une erreur inattendue s\'est produite:', error);
      return []; // Renvoyer une liste vide en cas d'erreur inattendue
    }
  }

  getOnePokemonById(id:number) : Observable<Pokemon>{
    throw new Error('Method not implemented.');
  }

  getOnePokemonByName(name:string) : Observable<Pokemon>{
    throw new Error('Method not implemented.');
  }
  createPokemon(pokemon:Pokemon) : Observable<Pokemon>{
    return this.http.post<Pokemon>(this.pokemonJsonFile, pokemon);
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