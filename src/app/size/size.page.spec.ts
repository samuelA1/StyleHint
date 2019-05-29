import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizePage } from './size.page';

describe('SizePage', () => {
  let component: SizePage;
  let fixture: ComponentFixture<SizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
