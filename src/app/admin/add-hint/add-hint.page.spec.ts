import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHintPage } from './add-hint.page';

describe('AddHintPage', () => {
  let component: AddHintPage;
  let fixture: ComponentFixture<AddHintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
