import { TestBed } from '@angular/core/testing';

import { EstadosService } from './estado-service';

describe('EstadosService', () => {
  let service: EstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
