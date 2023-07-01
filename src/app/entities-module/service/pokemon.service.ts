import { Inject, Injectable } from '@angular/core';
import { Pokemon } from '../entities-module.Pokemon';
import { Observable, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonJsonFile = "../assets/Data.json";
  
  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonJsonFile)
    .pipe(
      take(1),
      map(data => {
        // Stocker les données JSON dans une liste d'objets
        const objets: Pokemon[] = data;
        // console.log(objets); //DEBUG
        return objets;
      })
    );
  }

  getOnePokemonById(id:number) : Observable<Pokemon>{
    throw new Error('Method not implemented.');
  }

  getOnePokemonByName(name:string) : Observable<Pokemon>{
    throw new Error('Method not implemented.');
  }
}