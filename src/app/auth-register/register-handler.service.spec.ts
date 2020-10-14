import { TestBed } from '@angular/core/testing';

import { RegisterHandlerService } from './register-handler.service';

describe('RegisterHandlerService', () => {
  let service: RegisterHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
