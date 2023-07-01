import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonService } from './entities-module/service/pokemon.service';
import { PokemonConsoleComponent } from './entities-module/PokemonConsole/pokemon-console.component';
import { HttpClientModule } from '@angular/common/http';
import { EntitiesModule } from './entities-module/entities.module';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EntitiesModule,
    PokemonConsoleComponent
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
