import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestigadorComponent } from './update-investigador.component';

describe('UpdateInvestigadorComponent', () => {
  let component: UpdateInvestigadorComponent;
  let fixture: ComponentFixture<UpdateInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
