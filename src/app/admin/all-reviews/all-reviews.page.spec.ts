import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewsPage } from './all-reviews.page';

describe('AllReviewsPage', () => {
  let component: AllReviewsPage;
  let fixture: ComponentFixture<AllReviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReviewsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
