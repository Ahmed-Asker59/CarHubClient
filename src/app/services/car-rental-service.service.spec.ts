import { TestBed } from '@angular/core/testing';

import { CarRentalServiceService } from './car-rental-service.service';

describe('CarRentalServiceService', () => {
  let service: CarRentalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRentalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
