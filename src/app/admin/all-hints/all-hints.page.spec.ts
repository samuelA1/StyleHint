import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHintsPage } from './all-hints.page';

describe('AllHintsPage', () => {
  let component: AllHintsPage;
  let fixture: ComponentFixture<AllHintsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHintsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHintsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
