import { TestBed } from '@angular/core/testing';

import { SrvAudioService } from './srv-audio.service';

describe('SrvAudioService', () => {
  let service: SrvAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
