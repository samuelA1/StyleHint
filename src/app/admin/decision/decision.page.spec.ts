import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionPage } from './decision.page';

describe('DecisionPage', () => {
  let component: DecisionPage;
  let fixture: ComponentFixture<DecisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
