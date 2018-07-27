import { TestBed, inject } from '@angular/core/testing';

import { HttpErrorHandlerService } from './http-error-handler.service';

fdescribe('HttpErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorHandlerService]
    });
  });

  it('should be created', inject([HttpErrorHandlerService], (service: HttpErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
