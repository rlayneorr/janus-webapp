import { TestBed, inject } from '@angular/core/testing';

import { SoftSkillsService } from './soft-skills.service';

import {HttpClientModule, HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";


fdescribe('SoftSkillsService', () => {
  beforeEach(() => { TestBed.configureTestingModule
     ({
       imports: [HttpClientModule, HttpClientTestingModule],
       providers: [SoftSkillsService, HttpClient, HttpHandler, UrlService]
     });
  });

  it('should be created', inject([SoftSkillsService], (service: SoftSkillsService) => {
    expect(service).toBeTruthy();
  }));
});
