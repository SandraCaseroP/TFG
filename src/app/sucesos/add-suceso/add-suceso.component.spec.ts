import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSucesoComponent } from './add-suceso.component';

describe('AddSucesoComponent', () => {
  let component: AddSucesoComponent;
  let fixture: ComponentFixture<AddSucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
