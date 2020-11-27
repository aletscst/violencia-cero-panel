import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationViolenceComponent } from './information-violence.component';

describe('InformationViolenceComponent', () => {
  let component: InformationViolenceComponent;
  let fixture: ComponentFixture<InformationViolenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationViolenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationViolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
