import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvestigadorComponent } from './list-investigador.component';

describe('ListInvestigadorComponent', () => {
  let component: ListInvestigadorComponent;
  let fixture: ComponentFixture<ListInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
