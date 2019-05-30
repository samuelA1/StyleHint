import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElsewherePage } from './elsewhere.page';

describe('ElsewherePage', () => {
  let component: ElsewherePage;
  let fixture: ComponentFixture<ElsewherePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElsewherePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElsewherePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
