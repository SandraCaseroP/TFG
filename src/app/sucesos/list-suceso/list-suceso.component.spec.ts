import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSucesoComponent } from './list-suceso.component';

describe('ListSucesoComponent', () => {
  let component: ListSucesoComponent;
  let fixture: ComponentFixture<ListSucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
