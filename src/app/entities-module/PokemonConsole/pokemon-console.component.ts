import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../entities-module.Pokemon';
import { NgFor } from '@angular/common';
import { Observable, take } from 'rxjs';

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
    // throw new Error("un test")
  }

  async getPokemons(): Promise<void> {
    this.pokemons = await this.monPokemonService.getAllPokemon()
  }
}