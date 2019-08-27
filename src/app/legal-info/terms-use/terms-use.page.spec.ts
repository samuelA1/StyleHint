import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsUsePage } from './terms-use.page';

describe('TermsUsePage', () => {
  let component: TermsUsePage;
  let fixture: ComponentFixture<TermsUsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsUsePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsUsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
