import { TestBed } from '@angular/core/testing';

import { TimeableService } from './timeable.service';

describe('TimeableService', () => {
  let service: TimeableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
