import { TestBed, inject, async, tick, fakeAsync, getTestBed } from '@angular/core/testing';

import { RequestService } from './request.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Request } from '@angular/http';
import { UrlService } from '../../../../hydra-client/services/urls/url.service';

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestService, UrlService, HttpClient, HttpHandler]
    });
  });

  // Service Object //
  it('RequestService should be created', inject([RequestService], (service: RequestService) => {
    expect(service).toBeTruthy();
  }));

  // Service Functions //

  // populateDB
  it('populateDB() should return successfully', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.populateDB().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // populateDBSF
  it('populateDBSF() should return successfully', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.populateDBSF().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // deleteDB
  it('deleteDB() should return successfully', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.deleteDB().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getAssociates
  it('getAssociates() should return a list of associates', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getAssociates().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // login
  it('login() should return successfully', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.login('username', 'password').subscribe(res => {
        const data = res;
        console.log(data);
        expect(data).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getUsername
  it('getUsername() should return a username', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getUsername().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // updateAssociates
  it('updateAssociates() should return a list of updated associates', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.updateAssociates().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getBatchesSortedById
  it('getBatchesSortedById() should return a list of batches sorted by ID', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getBatchesSortedById().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getBatchesSortedByDate
  it('getBatchesSortedByDate() should return a list of batches sorted by date', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getBatchesSortedByDate().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getClients
  it('getClients() should return a list of clients', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getClients().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getTotals
  it('getTotals() should return a list of skill totals', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getTotals().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getSkills
  it('getSkills() should return a list of skills', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getSkills().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getStatuses
  it('should return a list of marketing statuses', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      // expect(service.getStatuses()).toBeTruthy();
      service.getStatuses().subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getBatches
  it('getBatches() should return a list of batches', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getBatches(0, 0).subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getBatchesPerType
  it('getBatchesPerType() should return a list of batches sorted by type', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getBatchPerType(0, 0).subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // createUser
  it('createUser() should return a filled out user', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.createUser('username', 'password', 0).subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
  // getOneClient
  it('getOneClient() should return a client', () => {
    const service: RequestService = getTestBed().get(RequestService);
    getTestBed().compileComponents().then(() => {
      service.getOneClient(0).subscribe(res => {
        const data = res.data;
        console.log(data);
        expect(data).toBeTruthy();
        expect(data.length).toBeTruthy();
        expect(data[0]).toBeTruthy();
      }).unsubscribe(); // subscribe
    }); // then
  }); // it
});
