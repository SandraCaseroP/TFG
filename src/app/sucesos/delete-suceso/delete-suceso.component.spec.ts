import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSucesoComponent } from './delete-suceso.component';

describe('DeleteSucesoComponent', () => {
  let component: DeleteSucesoComponent;
  let fixture: ComponentFixture<DeleteSucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
