import { TestBed, inject, async, tick, fakeAsync, getTestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Request } from '@angular/http';
import { UrlService } from '../../../../hydra-client/services/urls/url.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestService, UrlService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of marketing statuses', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {

      service.getStatuses().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it

  it('should return a list of associates', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {

      service.getAssociates().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it

});
