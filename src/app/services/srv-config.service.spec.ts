import { TestBed } from '@angular/core/testing';

import { SrvConfigService } from './srv-config.service';

describe('SrvConfigService', () => {
  let service: SrvConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
