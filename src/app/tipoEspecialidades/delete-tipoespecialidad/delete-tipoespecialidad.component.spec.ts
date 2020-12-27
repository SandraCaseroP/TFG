import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTipoespecialidadComponent } from './delete-tipoespecialidad.component';

describe('DeleteTipoespecialidadComponent', () => {
  let component: DeleteTipoespecialidadComponent;
  let fixture: ComponentFixture<DeleteTipoespecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTipoespecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTipoespecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
