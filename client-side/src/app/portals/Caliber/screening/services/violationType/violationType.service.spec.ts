import { TestBed, inject } from '@angular/core/testing';

import { ViolationTypeService } from './violationType.service';
import {HttpClientModule, HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";


fdescribe('ViolationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule
     ({
       imports: [HttpClientModule, HttpClientTestingModule],
       providers: [ViolationTypeService, HttpClient, HttpHandler, UrlService]
     });
  });

  it('should be created', inject([ViolationTypeService], (service: ViolationTypeService) => {
    expect(service).toBeTruthy();
  }));

it('should get all violationTypes', inject([ViolationTypeService], (service: ViolationTypeService) => {
  service.getAllViolationTypes();
  expect(service).toBeTruthy();
}));

it('should get violationTypes', inject([ViolationTypeService], (service: ViolationTypeService) => {
  service.getViolationTypes();
  expect(service).toBeTruthy();
}));

});
