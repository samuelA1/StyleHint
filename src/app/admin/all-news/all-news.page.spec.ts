import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsPage } from './all-news.page';

describe('AllNewsPage', () => {
  let component: AllNewsPage;
  let fixture: ComponentFixture<AllNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
