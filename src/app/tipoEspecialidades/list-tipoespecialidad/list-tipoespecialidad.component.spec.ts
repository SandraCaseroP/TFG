import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoespecialidadComponent } from './list-tipoespecialidad.component';

describe('ListTipoespecialidadComponent', () => {
  let component: ListTipoespecialidadComponent;
  let fixture: ComponentFixture<ListTipoespecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoespecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
