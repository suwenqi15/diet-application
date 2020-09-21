import { TestBed } from '@angular/core/testing';

import { PersonalfoodService } from './personalfood.service';

describe('PersonalService', () => {
  let service: PersonalfoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalfoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
