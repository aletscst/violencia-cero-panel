import { TestBed } from '@angular/core/testing';

import { ContactsEmergencyService } from './contacts-emergency.service';

describe('ContactsEmergencyService', () => {
  let service: ContactsEmergencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsEmergencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
