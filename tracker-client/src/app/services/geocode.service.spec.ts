import { TestBed, inject } from '@angular/core/testing';

import { GeocodeService } from './geocode.service';

describe('GeocodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocodeService]
    });
  });

  it('should ...', inject([GeocodeService], (service: GeocodeService) => {
    expect(service).toBeTruthy();
  }));
});
