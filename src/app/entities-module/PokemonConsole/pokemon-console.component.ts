import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../entities-module.Pokemon';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pokemon-console',
  templateUrl: './pokemon-console.component.html',
  styleUrls: ['./pokemon-console.component.css'],
  standalone: true,
  imports:[
    NgFor
  ]
})
export class PokemonConsoleComponent implements OnInit {
  pokemons: Pokemon[] = [];
  monPokemonService: PokemonService

  constructor(pokemonService: PokemonService) {
    this.monPokemonService = pokemonService
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getPokemons();
    throw new Error("un test")
  }

  getPokemons(): void {
    this.monPokemonService.getAllPokemon()
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        console.log(this.pokemons); // Affiche les données des Pokémon dans la console
      });
  }
}