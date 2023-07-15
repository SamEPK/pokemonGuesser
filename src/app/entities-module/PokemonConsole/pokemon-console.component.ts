import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../entities-module.Pokemon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-console',
  templateUrl: './pokemon-console.component.html',
  styleUrls: ['./pokemon-console.component.css']
})
export class PokemonConsoleComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> | undefined;
  newPokemon: Partial<Pokemon> = {};

  constructor(private pokemonService: PokemonService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getPokemons();
  }

  getPokemons(): void {
    console.log('getPokemons called');
    this.pokemons$ = this.pokemonService.getAllPokemon();
    console.log('Pokémons:', this.pokemons$);
  }

  ajouterPokemon(): void {
    this.http.get<Pokemon[]>('http://localhost:3000/pokemon').subscribe(
      (pokemons: Pokemon[]) => {
        const lastId = pokemons.length > 0 ? pokemons[pokemons.length - 1].number : 0;
        this.newPokemon.number = lastId + 1;
  
        this.http.post<Pokemon>('http://localhost:3000/pokemon', this.newPokemon).subscribe(
          (pokemon: Pokemon) => {
            console.log('Nouveau Pokémon ajouté :', pokemon);
            this.newPokemon = {};
            this.getPokemons();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du Pokémon :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    );
  }
  
}
