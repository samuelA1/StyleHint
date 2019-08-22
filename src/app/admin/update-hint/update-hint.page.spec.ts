import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHintPage } from './update-hint.page';

describe('UpdateHintPage', () => {
  let component: UpdateHintPage;
  let fixture: ComponentFixture<UpdateHintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
