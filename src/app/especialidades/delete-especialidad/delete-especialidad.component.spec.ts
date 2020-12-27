import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEspecialidadComponent } from './delete-especialidad.component';

describe('DeleteEspecialidadComponent', () => {
  let component: DeleteEspecialidadComponent;
  let fixture: ComponentFixture<DeleteEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
