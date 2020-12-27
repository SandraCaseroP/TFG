import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInvestigadorComponent } from './details-investigador.component';

describe('DetailsInvestigadorComponent', () => {
  let component: DetailsInvestigadorComponent;
  let fixture: ComponentFixture<DetailsInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
