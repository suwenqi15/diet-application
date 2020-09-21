import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:src/app/services/personalfood.service.spec.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
import { PersonalfoodService } from './personalfood.service';

describe('PersonalService', () => {
  let service: PersonalfoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalfoodService);
<<<<<<< HEAD
=======
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c:src/app/services/account.service.spec.ts
=======
>>>>>>> b71bb4e5a3537316666d4abcd6caac687482584c
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
