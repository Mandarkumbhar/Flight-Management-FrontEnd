import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard]
    });
  });

  it('should be created', () => {
    const service: AdminGuard = TestBed.get(AdminGuard);
    expect(service).toBeTruthy();
  });
});

