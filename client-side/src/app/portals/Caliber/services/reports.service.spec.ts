import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReportsService} from './reports.service';

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
