import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInvestigadorComponent } from './delete-investigador.component';

describe('DeleteInvestigadorComponent', () => {
  let component: DeleteInvestigadorComponent;
  let fixture: ComponentFixture<DeleteInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
