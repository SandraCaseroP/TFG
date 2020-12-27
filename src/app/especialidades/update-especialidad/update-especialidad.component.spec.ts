import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEspecialidadComponent } from './update-especialidad.component';

describe('UpdateEspecialidadComponent', () => {
  let component: UpdateEspecialidadComponent;
  let fixture: ComponentFixture<UpdateEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
