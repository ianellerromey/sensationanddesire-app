import { TestBed } from '@angular/core/testing';

import { SrvMtcbrrService } from './srv-mtcbrr.service';

describe('SrvMtcbrrService', () => {
  let service: SrvMtcbrrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvMtcbrrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
