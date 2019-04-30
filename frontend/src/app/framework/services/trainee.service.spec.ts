import { TestBed } from '@angular/core/testing';

import { TraineeService } from './trainee.service';

describe('TraineeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TraineeService = TestBed.get(TraineeService);
    expect(service).toBeTruthy();
  });
});
