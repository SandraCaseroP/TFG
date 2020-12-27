import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTipoespecialidadComponent } from './update-tipoespecialidad.component';

describe('UpdateTipoespecialidadComponent', () => {
  let component: UpdateTipoespecialidadComponent;
  let fixture: ComponentFixture<UpdateTipoespecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTipoespecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTipoespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
