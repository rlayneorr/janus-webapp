import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { DataSyncService } from './data-sync.service';
import { RequestService } from '../request-service/request.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UrlService } from '../../../../hydra-client/services/urls/url.service';

describe('DataSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSyncService, RequestService, HttpClient, HttpHandler, UrlService]
    });
  });

  it('should be created', inject([DataSyncService], (service: DataSyncService) => {
    expect(service).toBeTruthy();
  }));

  // fetchAssociateStorage
  it('fetchAssociateStorage() should return successfully', () => {
    const service: DataSyncService = getTestBed().get(DataSyncService);
    getTestBed().compileComponents().then(() => {
        expect(service.fetchAssociateStorage()).toBeTruthy();
        const data = service.fetchAssociateStorage();
        expect(data).toBeTruthy();
    }); // then
  }); // it

  // fetchClientStorage
  it('fetchClientStorage() should return successfully', () => {
    const service: DataSyncService = getTestBed().get(DataSyncService);
    getTestBed().compileComponents().then(() => {
        expect(service.fetchClientStorage()).toBeTruthy();
    }); // then
  }); // it

  // fetchBatchStorageSortedById
  it('fetchBatchStorageSortedById() should return successfully', () => {
    const service: DataSyncService = getTestBed().get(DataSyncService);
    getTestBed().compileComponents().then(() => {
        expect(service.fetchBatchStorageSortedById()).toBeTruthy();
    }); // then
  }); // it

  // fetchBatchStorageSortedByDate
  it('fetchBatchStorageSortedByDate() should return successfully', () => {
    const service: DataSyncService = getTestBed().get(DataSyncService);
    getTestBed().compileComponents().then(() => {
        expect(service.fetchBatchStorageSortedByDate()).toBeTruthy();
    }); // then
  }); // it

  // fetchCurriculumStorage
  it('fetchCurriculumStorage() should return successfully', () => {
    const service: DataSyncService = getTestBed().get(DataSyncService);
    getTestBed().compileComponents().then(() => {
        expect(service.fetchCurriculumStorage()).toBeTruthy();
    }); // then
  }); // it
  // fetchMarketingStorage
  it('fetchMarketingStorage() should return successfully', () => {
    const service: DataSyncService = getTestBed().get(DataSyncService);
    getTestBed().compileComponents().then(() => {
        expect(service.fetchMarketingStorage()).toBeTruthy();
    }); // then
  }); // it

});
