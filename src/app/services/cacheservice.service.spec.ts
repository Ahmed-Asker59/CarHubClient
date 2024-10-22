import { TestBed } from '@angular/core/testing';

import { CacheserviceService } from './cacheservice.service';

describe('CacheserviceService', () => {
  let service: CacheserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
