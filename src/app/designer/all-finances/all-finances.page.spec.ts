import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFinancesPage } from './all-finances.page';

describe('AllFinancesPage', () => {
  let component: AllFinancesPage;
  let fixture: ComponentFixture<AllFinancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFinancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFinancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
