import { TestBed } from '@angular/core/testing';

import { SensationAndDesireService } from './sensation-and-desire.service';

describe('SensationAndDesirePageComponent', () => {
  let service: SensationAndDesireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensationAndDesireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
