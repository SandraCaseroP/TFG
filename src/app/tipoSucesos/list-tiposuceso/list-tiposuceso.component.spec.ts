import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTiposucesoComponent } from './list-tiposuceso.component';

describe('ListTiposucesoComponent', () => {
  let component: ListTiposucesoComponent;
  let fixture: ComponentFixture<ListTiposucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTiposucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTiposucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
