import { TestBed } from '@angular/core/testing';

import { SrvShortsService } from './srv-shorts.service';

describe('SrvLovService', () => {
  let service: SrvShortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvShortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
