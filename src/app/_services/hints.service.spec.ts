import { TestBed } from '@angular/core/testing';

import { HintsService } from './hints.service';

describe('HintsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HintsService = TestBed.get(HintsService);
    expect(service).toBeTruthy();
  });
});
