import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresCenterComponent } from './cares-center.component';

describe('CaresCenterComponent', () => {
  let component: CaresCenterComponent;
  let fixture: ComponentFixture<CaresCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaresCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaresCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
