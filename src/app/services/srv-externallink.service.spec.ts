import { TestBed } from '@angular/core/testing';

import { SrvExternalLinkService } from './srv-externallink.service';

describe('SrvExternalLinkService', () => {
  let service: SrvExternalLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvExternalLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
