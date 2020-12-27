import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTiposucesoComponent } from './delete-tiposuceso.component';

describe('DeleteTiposucesoComponent', () => {
  let component: DeleteTiposucesoComponent;
  let fixture: ComponentFixture<DeleteTiposucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTiposucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTiposucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
