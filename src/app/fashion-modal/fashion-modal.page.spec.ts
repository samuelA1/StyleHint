import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionModalPage } from './fashion-modal.page';

describe('FashionModalPage', () => {
  let component: FashionModalPage;
  let fixture: ComponentFixture<FashionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FashionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
