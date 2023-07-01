import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/entities-module/entities-module.Pokemon';
import { PokemonService } from 'src/app/entities-module/service/pokemon.service';

@Component({
  selector: 'app-pokemon-admin',
  templateUrl: './pokemon-admin.component.html',
  styleUrls: ['./pokemon-admin.component.css']
})
export class PokemonAdminComponent {
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons(): void {
    this.pokemonService.getAllPokemon()
      // .subscribe((pokemons: Pokemon[]) => {
      //   this.pokemons = pokemons;
      // });
  }
//   createPokemon(pokemon: Pokemon): void {
//     this.pokemonService.createPokemon(pokemon)
//       .subscribe((newPokemon: Pokemon) => {
//         this.pokemons.push(newPokemon);
//       });
//   }

//   updatePokemon(pokemon: Pokemon): void {
//     this.pokemonService.updatePokemon(pokemon)
//       .subscribe((updatedPokemon: Pokemon) => {
//         const index = this.pokemons.findIndex(p => p.id === updatedPokemon.id);
//         if (index !== -1) {
//           this.pokemons[index] = updatedPokemon;
//         }
//       });
//   }

//   deletePokemon(pokemon: Pokemon): void {
//     this.pokemonService.deletePokemon(pokemon.id)
//       .subscribe(() => {
//         this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
//       });
//   }
}