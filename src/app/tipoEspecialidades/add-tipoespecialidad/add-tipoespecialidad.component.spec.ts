import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoespecialidadComponent } from './add-tipoespecialidad.component';

describe('AddTipoespecialidadComponent', () => {
  let component: AddTipoespecialidadComponent;
  let fixture: ComponentFixture<AddTipoespecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipoespecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
