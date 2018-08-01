import { TestBed, inject } from '@angular/core/testing';

import { SoftSkillsViolationService } from './soft-skills-violation.service';
import {HttpClientModule, HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";

fdescribe('SoftSkillsViolationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule
     ({
       imports: [HttpClientModule, HttpClientTestingModule],
       providers: [SoftSkillsViolationService, HttpClient, HttpHandler, UrlService]
     });
  });

  it('should be created', inject([SoftSkillsViolationService], (service: SoftSkillsViolationService) => {
    expect(service).toBeTruthy();
  }));

  it('should delete violation', inject([SoftSkillsViolationService], (service: SoftSkillsViolationService) => {
    var start = service.deleteViolation(4);
    service.deleteViolation(4);
    var end = service.deleteViolation(4);
    expect(start).not.toEqual(end);
  }));

 it('should get previous violation', inject([SoftSkillsViolationService], (service: SoftSkillsViolationService) => {
  service.getPreviousViolations(1);
  expect(service).toBeTruthy();
}));

});
