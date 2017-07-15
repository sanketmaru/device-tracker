import { TestBed, inject } from '@angular/core/testing';

import { ServicessocketService } from './servicessocket.service';

describe('ServicessocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicessocketService]
    });
  });

  it('should ...', inject([ServicessocketService], (service: ServicessocketService) => {
    expect(service).toBeTruthy();
  }));
});
