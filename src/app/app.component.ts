import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  //composant de style pour le composant, peut être multiple
})

// @NgModule({
//   declarations:[
//     PokemonConsoleComponent,
//     AppComponent
//   ],
//   imports:[
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]

// })
export class AppComponent {
  count = 0;
  title = 'PokeGuess';
  amount = 109768849700;
  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

