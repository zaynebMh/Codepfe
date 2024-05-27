import { TestBed } from '@angular/core/testing';

import { AoService } from './ao.service';

describe('AoService', () => {
  let service: AoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
