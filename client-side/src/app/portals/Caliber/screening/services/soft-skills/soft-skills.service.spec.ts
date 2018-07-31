import { TestBed, inject } from '@angular/core/testing';

import { SoftSkillsService } from './soft-skills.service';

import {HttpClientModule, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";
import { Dependencies } from '../../../../Bam/bam.test.module';

fdescribe('SoftSkillsService', () => {
  beforeEach(() => {
    //TestBed.configureTestingModule(Dependencies).compileComponents();
    // TestBed.configureTestingModule
    // ({
      // imports: [HttpClientTestingModule],
      // providers: [SoftSkillsService, UrlService ]
    // });
  // });
  TestBed.configureTestingModule
    ({
      imports: [HttpClientModule],
      providers: [SoftSkillsService, HttpClient ]
    });
  });

  it('should be created', inject([SoftSkillsService], (service: SoftSkillsService) => {
    expect(service).toBeTruthy();
  }));
});
