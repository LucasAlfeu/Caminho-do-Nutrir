import { TestBed } from '@angular/core/testing';

import { BancoLeiteService } from './banco-leite-service';

describe('BancoLeiteService', () => {
  let service: BancoLeiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoLeiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
