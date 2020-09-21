import { TestBed } from '@angular/core/testing';

import { SystemfoodService } from './systemfood.service';

describe('SystemfoodService', () => {
  let service: SystemfoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemfoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
