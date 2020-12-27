import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMapsComponent } from './delete-maps.component';

describe('DeleteMapsComponent', () => {
  let component: DeleteMapsComponent;
  let fixture: ComponentFixture<DeleteMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
