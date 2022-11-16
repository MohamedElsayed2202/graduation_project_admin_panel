import { TestBed } from '@angular/core/testing';

import { TeacherTimeTableService } from './teacher-time-table.service';

describe('TeacherTimeTableService', () => {
  let service: TeacherTimeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherTimeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
