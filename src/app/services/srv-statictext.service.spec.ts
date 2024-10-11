import { TestBed } from '@angular/core/testing';

import { SrvStaticTextService } from './srv-statictext.service';

describe('SrvStaticTextService', () => {
  let service: SrvStaticTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvStaticTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
