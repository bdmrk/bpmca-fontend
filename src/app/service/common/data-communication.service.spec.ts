import { TestBed, inject } from '@angular/core/testing';

import { DataCommunicationService } from './data-communication.service';

describe('DataCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCommunicationService]
    });
  });

  it('should be created', inject([DataCommunicationService], (service: DataCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
