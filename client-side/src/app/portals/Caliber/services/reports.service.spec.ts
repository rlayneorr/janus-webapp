import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHandler} from '@angular/common/http';
import { ReportsService } from './reports.service';
import { HttpClientBackendService } from 'angular-in-memory-web-api';

xdescribe('ReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ReportsService,
        HttpClient
      ]
    });
  });

  it('should be created', inject([ReportsService], (service: ReportsService) => {
    expect(service).toBeTruthy();
  }));

});
