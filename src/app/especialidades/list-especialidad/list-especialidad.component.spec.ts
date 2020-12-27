import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEspecialidadComponent } from './list-especialidad.component';

describe('ListEspecialidadComponent', () => {
  let component: ListEspecialidadComponent;
  let fixture: ComponentFixture<ListEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
