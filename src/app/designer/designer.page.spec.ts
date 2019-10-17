import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerPage } from './designer.page';

describe('DesignerPage', () => {
  let component: DesignerPage;
  let fixture: ComponentFixture<DesignerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
