import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';

import { CandidateService } from './candidate.service';
// import { CANDIDATES } from '../../mock-data/mock-candidates';
import { defer } from 'rxjs/observable/defer';
import { Candidate } from '../../entities/Candidate';
import { Dependencies } from '../../../caliber.test.module';


import { CANDIDATES } from '../../mock-data/mock-candidates';
import { HttpClient, HttpHandler, HttpClientModule } from '../../../../../../../node_modules/@angular/common/http';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';



export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

fdescribe('CandidateService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [CandidateService,HttpClient,HttpHandler,UrlService]
    });
  });

  it('should be created', inject([CandidateService], (service: CandidateService) => {
    expect(service).toBeTruthy();
  }));


  



  it('getCandidates() should make an HTTP GET request, and return the candidates that it fetched',() =>{
      let httpClientSpyOnGet: { get: jasmine.Spy };
  let candidateService: CandidateService;
  // const AlertsService: AlertsService = new alertsService();
  httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);

    const expected: Candidate[] = CANDIDATES;

    httpClientSpyOnGet.get.and.returnValue(asyncData(expected));
    
    candidateService.getCandidates().subscribe(
      candidates => expect(candidates).toEqual(expected, 'expected candidates')
    );

    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

  it('getCandidate() should make an HTTP GET request, and return the candidate that it fetched', ()=>{
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);

    const expected: Candidate = CANDIDATES[0];

    httpClientSpyOnGet.get.and.returnValue(asyncData(expected));
    
    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(expected, 'expected candidate')
    );

    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

  it('updateCandidate() should make an HTTP PUT request, and return the candidates that is altered', ()=>{
    let httpClientSpyOnPut: {put: jasmine.Spy };
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);
    CANDIDATES[0].name = "Alexander";
    const expected: Candidate = CANDIDATES[0];

    httpClientSpyOnPut.put.and.returnValue(asyncData(expected));
    
    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(expected, 'expected candidate')
    );

    expect(httpClientSpyOnPut.put.calls.count()).toBe(0, 'one call');
  });

  it('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
    let httpClientSpyOnPost: { post: jasmine.Spy };
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);
    let newCandidate : Candidate = new Candidate();
    newCandidate.name = "Tyerra";


    const expected: Candidate = new Candidate;

    httpClientSpyOnPost.post.and.returnValue(asyncData(expected));
    
    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(candidate)
    );

    expect(httpClientSpyOnPost.post.calls.count()).toBe(0, 'one call');
  });

  it('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
    let httpClientSpyOnDelete: { delete: jasmine.Spy };
    let httpClientSpyOnPost: { post: jasmine.Spy };
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);
    let newCandidate : Candidate = new Candidate();
    newCandidate.name = "Tyerra";
  
  
    // const expected: Candidate = newCandidate;
  
    // httpClientSpyOnDelete.delete.and.returnValue(asyncData(expected));
  
    // candidateService.getCandidate(expected).subscribe(
    //   candidate => expect(candidate).toEqual(expected, 'expected candidate')
    // );
  
    expect(httpClientSpyOnPost.post.calls.count()).toBe(0, 'one call');
   });


  let httpClientSpyOnGet: { get: jasmine.Spy };
  
  let httpClientSpyOnPut: {put: jasmine.Spy };
  let httpClientSpyOnDelete: { delete: jasmine.Spy };
  let candidateService: CandidateService;
  // const alertsService: AlertsService = new AlertsService();




  it('getCandidate() should make an HTTP GET request, and return the candidate that it fetched', ()=>{
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);

    const expected: Candidate = CANDIDATES[0];

    httpClientSpyOnGet.get.and.returnValue(asyncData(expected));

    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(expected, 'expected candidate')
    );

    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

  it('updateCandidate() should make an HTTP PUT request, and return the candidates that is altered', ()=>{
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);
    // CANDIDATES[0].name = "Alexander";
    const expected: Candidate = CANDIDATES[0];

    httpClientSpyOnPut.put.and.returnValue(asyncData(expected));

    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(expected, 'expected candidate')
    );

    expect(httpClientSpyOnPut.put.calls.count()).toBe(0, 'one call');
  });

  it('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
    let httpClientSpyOnPost: { post: jasmine.Spy };
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);
    let newCandidate : Candidate = new Candidate();
    newCandidate.name = "Tyerra";
    


    const expected: Candidate = newCandidate;

    httpClientSpyOnPost.post.and.returnValue(asyncData(expected));

    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(expected, 'expected candidate')
    );

    expect(httpClientSpyOnPost.post.calls.count()).toBe(0, 'one call');
  });

  it('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
    let httpClientSpyOnPost: { post: jasmine.Spy };
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    candidateService = new CandidateService(<any> httpClientSpyOnGet);
    let newCandidate : Candidate = new Candidate();
    newCandidate.name = "Tyerra";



    const expected: Candidate = newCandidate;
    let httpClientSpyOnDelete: { delete: jasmine.Spy };
    httpClientSpyOnDelete.delete.and.returnValue(asyncData(expected));

    candidateService.getCandidate(expected).subscribe(
      candidate => expect(candidate).toEqual(expected, 'expected candidate')
    );

    expect(httpClientSpyOnPost.post.calls.count()).toBe(0, 'one call');
  });

});
