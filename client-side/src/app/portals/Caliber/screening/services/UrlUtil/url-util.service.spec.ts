import { TestBed, inject } from '@angular/core/testing';

import { UrlUtilService } from './url-util.service';

describe('UrlUtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlUtilService]
    });
  });

  it('should be created', inject([UrlUtilService], (service: UrlUtilService) => {
    expect(service).toBeTruthy();
  }));

  it('get base should return zuul endpoint', inject([UrlUtilService], (service: UrlUtilService) => {
    const returnedString: string = service.getBase();
    expect(returnedString).toContain(service['zuulEndpoint']);
  }));
});
