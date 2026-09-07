import { TestBed } from '@angular/core/testing';

import { SrvLilacService } from './srv-lilac.service';

describe('SrvLilacService', () => {
  let service: SrvLilacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvLilacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
