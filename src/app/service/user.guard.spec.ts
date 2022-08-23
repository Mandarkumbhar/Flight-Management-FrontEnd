import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuard]
    });
  });

  it('should be created', () => {
    const service: UserGuard = TestBed.get(UserGuard);
    expect(service).toBeTruthy();
  });
});
