import { TestBed } from '@angular/core/testing';

import { PokemonAccesService } from './pokemon-acces.service';

describe('PokemonAccesService', () => {
  let service: PokemonAccesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonAccesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
