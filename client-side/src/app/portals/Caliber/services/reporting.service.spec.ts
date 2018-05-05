import { TestBed, inject } from '@angular/core/testing';

import { ReportingService } from './reporting.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CacheData } from '../../../entities/CacheData.entity';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { XHRBackend, ResponseOptions, HttpModule, Response } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Tested by Mythoua Chang
 */
fdescribe('ReportingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportingService, HttpClient, HttpHandler, MockBackend]
    });
  });

  fit('should be created', inject([ReportingService], (service: ReportingService) => {
    expect(service).toBeTruthy();
  }));

  fit('refresh() should refresh the cached data',
  inject([ReportingService, HttpClient, HttpHandler], (service: ReportingService) => {

    // intializing the behaviorSubject
    const mock = new BehaviorSubject<CacheData>({'params': 4, data: 6});
    service['traineeOverallRadar'] = mock;
    service['traineeWeeklyRadar'] = mock;
    service['batchOverallBar'] = mock;
    service['lineTraineeOverall'] = mock;
    service['qcStatusDoughnut'] = mock;
    service['batchOverallRadar'] = mock;
    service['technologiesForTheWeek'] = mock;
    service['technologiesUpToWeek'] = mock;
    service['panelBatchAllTrainees'] = mock;
    service['batchOverallLineChart'] = mock;
    service['assessmentBreakdownBarChart'] = mock;
    service['BatchWeekSortedBarChart'] = mock;

    // Expecting the the behavior subject to be equivalent to the mock data
    expect(service['traineeOverallRadar']).toEqual(mock);
    expect(service['traineeWeeklyRadar']).toEqual(mock);
    expect(service['batchOverallBar']).toEqual(mock);
    expect(service['lineTraineeOverall']).toEqual(mock);
    expect(service['qcStatusDoughnut']).toEqual(mock);
    expect(service['batchOverallRadar']).toEqual(mock);
    expect(service['technologiesForTheWeek']).toEqual(mock);
    expect(service['technologiesUpToWeek']).toEqual(mock);
    expect(service['panelBatchAllTrainees']).toEqual(mock);
    expect(service['batchOverallLineChart']).toEqual(mock);
    expect(service['assessmentBreakdownBarChart']).toEqual(mock);
    expect(service['BatchWeekSortedBarChart']).toEqual(mock);

    // Refreshing (removing) the cached data
    service.refresh();

    // creating a new behaviorSubject set to null;
    const data = new BehaviorSubject<CacheData>(null);
    expect(service['traineeOverallRadar']).toEqual(data);
    expect(service['traineeWeeklyRadar']).toEqual(data);
    expect(service['batchOverallBar']).toEqual(data);
    expect(service['lineTraineeOverall']).toEqual(data);
    expect(service['qcStatusDoughnut']).toEqual(data);
    expect(service['batchOverallRadar']).toEqual(data);
    expect(service['technologiesForTheWeek']).toEqual(data);
    expect(service['technologiesUpToWeek']).toEqual(data);
    expect(service['panelBatchAllTrainees']).toEqual(data);
    expect(service['batchOverallLineChart']).toEqual(data);
    expect(service['assessmentBreakdownBarChart']).toEqual(data);
    expect(service['BatchWeekSortedBarChart']).toEqual(data);
  }));

});

fdescribe('ReportingService test Http calls', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ReportingService,
        {provide: XHRBackend, useClass: MockBackend},
        HttpClientTestingModule
      ]
    });
  });

  it('fetchQcStatusDonutChart(1) testing:',
    inject([ReportingService, XHRBackend, HttpClientTestingModule],
      (service: ReportingService, mockBackend: MockBackend) => {

      const mockResponse = {
        data: [
        { params: 'Jordan', data: 7},
        { params: 'David', data: 1},
        { params: 'Mythoua', data: 2},
        { params: 'Chris', data: 4},
        { params: 'William', data: 7},
        { params: 'Jake', data: 10},
      ]};

      const mock = new BehaviorSubject<CacheData>({params: 4, data: 6});
      service['qcStatusDoughnut'] = mock;
      expect(service['qcStatusDoughnut']).toEqual(mock);
      service.fetchQcStatusDoughnutChart(1);
      // Should be undefined as this is making a call to an API that does not yet
      // exist (to be expected if we're just working on front end testing)
      expect(service['qcStatusDoughnut']).toBeUndefined();

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(
          new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
          })
        ));
      });

      // Cannot test mock data because we cannot subscribe to void methods (There is no return for this method)
      // service.fetchQcStatusDoughnutChart(1).subscribe();
  }));

});
