import { TestBed, inject } from '@angular/core/testing';

import { ViolationTypeService } from './violationType.service';

import {HttpClientModule, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";
import { Dependencies } from '../../../caliber.test.module';


fdescribe('ViolationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
    // ({
      // imports: [HttpClientModule, HttpClientTestingModule],
      // providers: [ViolationTypeService, UrlService]
    // });
  });

  it('should be created', inject([ViolationTypeService], (service: ViolationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
