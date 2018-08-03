import { TestBed, inject, async, tick, fakeAsync, getTestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Request } from '@angular/http';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestService, UrlService, HttpClient, HttpHandler]
    });
  });

  // Service Object //
  it('RequestService should be created', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));
});
