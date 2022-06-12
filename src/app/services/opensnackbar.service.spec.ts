import { TestBed } from '@angular/core/testing';

import { OpensnackbarService } from './opensnackbar.service';

describe('OpensnackbarService', () => {
  let service: OpensnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpensnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
