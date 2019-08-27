import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalInfoPage } from './legal-info.page';

describe('LegalInfoPage', () => {
  let component: LegalInfoPage;
  let fixture: ComponentFixture<LegalInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
