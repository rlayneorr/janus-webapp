import { TestBed, inject } from '@angular/core/testing';

import { SoftSkillsViolationService } from './soft-skills-violation.service';

import {HttpClientModule, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";
import { Dependencies } from '../../../caliber.test.module';

fdescribe('SoftSkillsViolationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
    // ({
      // imports: [HttpClientModule, HttpClientTestingModule],
      // providers: [SoftSkillsViolationService, UrlService]
    // });
  });

  it('should be created', inject([SoftSkillsViolationService], (service: SoftSkillsViolationService) => {
    expect(service).toBeTruthy();
  }));
});
