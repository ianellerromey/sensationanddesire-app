import { TestBed } from '@angular/core/testing';

import { SrvLovService } from './srv-lov.service';

describe('SrvLovService', () => {
  let service: SrvLovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvLovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
