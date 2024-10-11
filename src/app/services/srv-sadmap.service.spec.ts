import { TestBed } from '@angular/core/testing';

import { SrvSadmapService as SrvSadMapService } from './srv-sadmap.service';

describe('SrvSadMapService', () => {
  let service: SrvSadMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvSadMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
