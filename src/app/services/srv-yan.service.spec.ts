import { TestBed } from '@angular/core/testing';

import { SrvYanService } from './srv-yan.service';

describe('SrvYanService', () => {
  let service: SrvYanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvYanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
