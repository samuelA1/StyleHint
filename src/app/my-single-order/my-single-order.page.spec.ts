import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySingleOrderPage } from './my-single-order.page';

describe('MySingleOrderPage', () => {
  let component: MySingleOrderPage;
  let fixture: ComponentFixture<MySingleOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySingleOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySingleOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
