import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSucesoComponent } from './update-suceso.component';

describe('UpdateSucesoComponent', () => {
  let component: UpdateSucesoComponent;
  let fixture: ComponentFixture<UpdateSucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
