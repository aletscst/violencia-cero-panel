import { TestBed } from '@angular/core/testing';

import { InformationViolenceService } from './information-violence.service';

describe('InformationViolenceService', () => {
  let service: InformationViolenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationViolenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
