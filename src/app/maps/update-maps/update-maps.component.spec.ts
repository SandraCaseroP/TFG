import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMapsComponent } from './update-maps.component';

describe('UpdateMapsComponent', () => {
  let component: UpdateMapsComponent;
  let fixture: ComponentFixture<UpdateMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
