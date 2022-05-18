import { TestBed } from '@angular/core/testing';

import { TipoProcedimentoService } from './tipo-procedimento.service';

describe('TipoProcedimentoService', () => {
  let service: TipoProcedimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProcedimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
