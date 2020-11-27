import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMakerComponent } from './add-maker.component';

describe('AddMakerComponent', () => {
  let component: AddMakerComponent;
  let fixture: ComponentFixture<AddMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
