import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMapComponent } from './list-map.component';

describe('ListMapComponent', () => {
  let component: ListMapComponent;
  let fixture: ComponentFixture<ListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
