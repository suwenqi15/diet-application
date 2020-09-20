import { TestBed } from '@angular/core/testing';

import { Dailyfoodservice } from './dailyfood.service';

describe('DbService', () => {
  let service: Dailyfoodservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dailyfoodservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
