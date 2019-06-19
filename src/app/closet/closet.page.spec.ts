import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetPage } from './closet.page';

describe('ClosetPage', () => {
  let component: ClosetPage;
  let fixture: ComponentFixture<ClosetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
