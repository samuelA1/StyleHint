import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipPage } from './tip.page';

describe('TipPage', () => {
  let component: TipPage;
  let fixture: ComponentFixture<TipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
