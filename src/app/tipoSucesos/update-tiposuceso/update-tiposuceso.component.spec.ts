import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTiposucesoComponent } from './update-tiposuceso.component';

describe('UpdateTiposucesoComponent', () => {
  let component: UpdateTiposucesoComponent;
  let fixture: ComponentFixture<UpdateTiposucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTiposucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTiposucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
