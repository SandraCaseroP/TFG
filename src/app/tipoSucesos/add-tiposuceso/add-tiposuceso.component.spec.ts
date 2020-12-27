import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTiposucesoComponent } from './add-tiposuceso.component';

describe('AddTiposucesoComponent', () => {
  let component: AddTiposucesoComponent;
  let fixture: ComponentFixture<AddTiposucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTiposucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTiposucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
