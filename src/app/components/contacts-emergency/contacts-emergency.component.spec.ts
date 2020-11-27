import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsEmergencyComponent } from './contacts-emergency.component';

describe('ContactsEmergencyComponent', () => {
  let component: ContactsEmergencyComponent;
  let fixture: ComponentFixture<ContactsEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
