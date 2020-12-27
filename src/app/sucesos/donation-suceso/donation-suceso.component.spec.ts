import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationSucesoComponent } from './donation-suceso.component';

describe('DonationSucesoComponent', () => {
  let component: DonationSucesoComponent;
  let fixture: ComponentFixture<DonationSucesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationSucesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationSucesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
