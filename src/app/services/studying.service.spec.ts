import { TestBed } from '@angular/core/testing';

import { StudyingService } from './studying.service';

describe('StudyingService', () => {
  let service: StudyingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
