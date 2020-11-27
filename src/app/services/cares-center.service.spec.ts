import { TestBed } from '@angular/core/testing';

import { CaresCenterService } from './cares-center.service';

describe('CaresCenterService', () => {
  let service: CaresCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaresCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
