import { TestBed } from '@angular/core/testing';
import { FuelTrackerService } from './fuel-tracker.service';

describe('FuelTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuelTrackerService = TestBed.get(FuelTrackerService);
    expect(service).toBeTruthy();
  });
});
