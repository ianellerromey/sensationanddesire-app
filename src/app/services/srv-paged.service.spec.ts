import { TestBed } from '@angular/core/testing';

import { PagedEntry, SrvPagedService } from './srv-paged.service';

describe('SrvPagedService', () => {
  let service: SrvPagedService<PagedEntry>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvPagedService<PagedEntry>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
