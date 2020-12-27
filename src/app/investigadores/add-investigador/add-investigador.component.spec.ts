import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigadorComponent } from './add-investigador.component';

describe('AddInvestigadorComponent', () => {
  let component: AddInvestigadorComponent;
  let fixture: ComponentFixture<AddInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
