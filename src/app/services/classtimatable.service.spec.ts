import { TestBed } from '@angular/core/testing';

import { ClasstimatableService } from './classtimatable.service';

describe('ClasstimatableService', () => {
  let service: ClasstimatableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasstimatableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
