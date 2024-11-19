import { TestBed } from '@angular/core/testing';

import { EgcService } from './egc.service';

describe('EgcService', () => {
  let service: EgcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
