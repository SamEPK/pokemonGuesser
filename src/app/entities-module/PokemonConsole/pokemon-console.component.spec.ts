import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonConsoleComponent } from './pokemon-console.component';

describe('PokemonConsoleComponent', () => {
  let component: PokemonConsoleComponent;
  let fixture: ComponentFixture<PokemonConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
