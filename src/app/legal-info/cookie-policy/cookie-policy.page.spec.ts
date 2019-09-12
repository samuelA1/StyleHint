import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePolicyPage } from './cookie-policy.page';

describe('CookiePolicyPage', () => {
  let component: CookiePolicyPage;
  let fixture: ComponentFixture<CookiePolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiePolicyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiePolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
