import { TestBed } from '@angular/core/testing';

import { DatamanipulationService } from './datamanipulation.service';

describe('DatamanipulationService', () => {
  let service: DatamanipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatamanipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
