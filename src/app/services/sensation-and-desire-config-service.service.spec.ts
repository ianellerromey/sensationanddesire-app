import { TestBed } from '@angular/core/testing';

import { SensationAndDesireConfigService } from './sensation-and-desire-config-service.service';

describe('SensationAndDesireConfigServiceService', () => {
  let service: SensationAndDesireConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensationAndDesireConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
