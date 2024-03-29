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
  editingPokemon: Pokemon | null = null;
  originalPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService, private http: HttpClient) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.getPokemons();
  }

  getPokemons(): void {
    console.log('getPokemons called');
    this.pokemons$ = this.pokemonService.getAllPokemon();

    this.pokemons$.subscribe(
      (pokemons: Pokemon[]) => {
        console.log('Pokémons:', pokemons);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    );
  }

  formatPokemonNumber(pokemon: Pokemon): string {
    if (pokemon && pokemon.number) {
      const paddedNumber = pokemon.number.toString().padStart(3, '0');
      return `${paddedNumber}${pokemon.name}.webp`;
    }
    return '';
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

  deletePokemon(id: number): void {
    this.http.delete(`http://localhost:3000/pokemon/${id}`).subscribe(
      () => {
        console.log(`Pokémon avec l'ID ${id} supprimé avec succès`);
        this.getPokemons();
      },
      (error) => {
        console.error(`Erreur lors de la suppression du Pokémon avec l'ID ${id}`, error);
      }
    );
  }

  updatePokemon(): void {
    const url = `http://localhost:3000/pokemon/${this.editingPokemon!.number}`;

    this.http.put<Pokemon>(url, this.editingPokemon!).subscribe(
      (updatedPokemon: Pokemon) => {
        console.log('Pokémon mis à jour :', updatedPokemon);
        this.getPokemons();
        this.cancelEdit();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du Pokémon :', error);
      }
    );
  }

  editPokemon(pokemon: Pokemon): void {
    this.editingPokemon = { ...pokemon };
  }

  cancelEdit(): void {
    this.editingPokemon = null;
    this.originalPokemon = null;
  }

  isEditing(pokemon: Pokemon): boolean {
    return !!this.editingPokemon && this.editingPokemon.number === pokemon.number;
  }

  duplicatePokemon(): void {
    if (this.editingPokemon) {
      const duplicatedPokemon: Pokemon = { ...this.editingPokemon };
      
      this.http.get<Pokemon[]>('http://localhost:3000/pokemon').subscribe(
        (pokemons: Pokemon[]) => {
          const lastId = pokemons.length > 0 ? pokemons[pokemons.length - 1].number : 0;
          duplicatedPokemon.number = lastId + 1; // Incrément de l'ID
  
          this.http.post<Pokemon>('http://localhost:3000/pokemon', duplicatedPokemon).subscribe(
            (pokemon: Pokemon) => {
              console.log('Pokémon dupliqué ajouté :', pokemon);
              this.getPokemons();
            },
            (error) => {
              console.error('Erreur lors de l\'ajout du Pokémon dupliqué :', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération des Pokémon :', error);
        }
      );
    }
  }
  
  
}
  
  
  
  
  
