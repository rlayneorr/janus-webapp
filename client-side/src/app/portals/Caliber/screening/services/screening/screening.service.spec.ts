import { TestBed, inject } from '@angular/core/testing';

import { ScreeningService } from './screening.service';
import { HttpClient, HttpHandler } from '../../../../../../../node_modules/@angular/common/http';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

fdescribe('ScreeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreeningService,HttpClient,HttpHandler,UrlService]
    });
  });

  it('should be created', inject([ScreeningService], (service: ScreeningService) => {
    expect(service).toBeTruthy();
  }));
});
