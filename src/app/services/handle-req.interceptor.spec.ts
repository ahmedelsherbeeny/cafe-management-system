import { TestBed } from '@angular/core/testing';

import { HandleReqInterceptor } from './handle-req.interceptor';

describe('HandleReqInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HandleReqInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HandleReqInterceptor = TestBed.inject(HandleReqInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
