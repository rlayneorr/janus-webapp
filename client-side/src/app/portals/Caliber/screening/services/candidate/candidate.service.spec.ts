// import { TestBed, inject } from '@angular/core/testing';

// import { CandidateService } from './candidate.service';
// // import { CANDIDATES } from '../../mock-data/mock-candidates';
// import { defer } from 'rxjs/observable/defer';
// import { Candidate } from '../../entities/Candidate';

// export function asyncData<T>(data: T) {
//   return defer(() => Promise.resolve(data));
// }
// import { CANDIDATES } from '../../mock-data/mock-candidates';
// import { defer } from 'rxjs/observable/defer';
// import { Candidate } from '../../entities/Candidate';

// export function asyncData<T>(data: T) {
//   return defer(() => Promise.resolve(data));
// }

// describe('CandidateService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [CandidateService]
//     });
//   });

//   fit('should be created', inject([CandidateService], (service: CandidateService) => {
//     expect(service).toBeTruthy();
//   }));

//   let httpClientSpyOnGet: { get: jasmine.Spy };
//   let httpClientSpyOnPost: { post: jasmine.Spy };
//   let httpClientSpyOnPut: {put: jasmine.Spy };
//   let httpClientSpyOnDelete: { delete: jasmine.Spy };
//   let candidateService: CandidateService;
//   const alertsService: AlertsService = new AlertsService();



//   fit('getCandidates() should make an HTTP GET request, and return the candidates that it fetched',() =>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);

//     //const expected: Candidate[] = CANDIDATES;

//     // httpClientSpyOnGet.get.and.returnValue(asyncData(expected));
//     //
//     // candidateService.getCandidates().subscribe(
//     //   candidates => expect(candidates).toEqual(expected, 'expected candidates')
//     // );

//     expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
//   });

//   fit('getCandidate() should make an HTTP GET request, and return the candidate that it fetched', ()=>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);

//     //const expected: Candidate = CANDIDATES[2];

//     // httpClientSpyOnGet.get.and.returnValue(asyncData(expected));
//     //
//     // candidateService.getCandidate(expected).subscribe(
//     //   candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     // );

//     expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
//   });

//   fit('updateCandidate() should make an HTTP PUT request, and return the candidates that is altered', ()=>{
//     // httpClientSpyOnGet = jasmine.createSpyObj('http', ['put']);
//     // candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);
//     // CANDIDATES[2].lastName = "Alexander";
//     // const expected: Candidate = CANDIDATES[0];

//     // httpClientSpyOnPut.put.and.returnValue(asyncData(expected));
//     //
//     // candidateService.getCandidate(expected).subscribe(
//     //   candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     // );

//     expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
//   });

//   fit('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
//     // httpClientSpyOnGet = jasmine.createSpyObj('http', ['post']);
//     // candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);
//     // let newCandidate : Candidate = new Candidate();
//     // newCandidate.firstName = "Tyerra";
//     // newCandidate.lastName = "Smith";


//     //const expected: Candidate = newCandidate;

//     // httpClientSpyOnPost.post.and.returnValue(asyncData(expected));
//     //
//     // candidateService.getCandidate(expected).subscribe(
//     //   candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     // );

//     expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
//   });

//   fit('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
//   //   httpClientSpyOnGet = jasmine.createSpyObj('http', ['post']);
//   //   candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);
//   //   let newCandidate : Candidate = new Candidate();
//   //   newCandidate.firstName = "Tyerra";
//   //   newCandidate.lastName = "Smith";
//   //
//   //
//   //   const expected: Candidate = newCandidate;
//   //
//   //   httpClientSpyOnDelete.delete.and.returnValue(asyncData(expected));
//   //
//   //   candidateService.getCandidate(expected).subscribe(
//   //     candidate => expect(candidate).toEqual(expected, 'expected candidate')
//   //   );
//   //
//   //   expect(httpClientSpyOnDelete.delete.calls.count()).toBe(1, 'one call');
//    });


//   let httpClientSpyOnGet: { get: jasmine.Spy };
//   let httpClientSpyOnPost: { post: jasmine.Spy };
//   let httpClientSpyOnPut: {put: jasmine.Spy };
//   let httpClientSpyOnDelete: { delete: jasmine.Spy };
//   let candidateService: CandidateService;
//   const alertsService: AlertsService = new AlertsService();



//   fit('getCandidates() should make an HTTP GET request, and return the candidates that it fetched',() =>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);

//     const expected: Candidate[] = CANDIDATES;

//     httpClientSpyOnGet.get.and.returnValue(asyncData(expected));

//     candidateService.getCandidates().subscribe(
//       candidates => expect(candidates).toEqual(expected, 'expected candidates')
//     );

//     expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
//   });

//   fit('getCandidate() should make an HTTP GET request, and return the candidate that it fetched', ()=>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);

//     const expected: Candidate = CANDIDATES[2];

//     httpClientSpyOnGet.get.and.returnValue(asyncData(expected));

//     candidateService.getCandidate(expected).subscribe(
//       candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     );

//     expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
//   });

//   fit('updateCandidate() should make an HTTP PUT request, and return the candidates that is altered', ()=>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['put']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);
//     CANDIDATES[2].lastName = "Alexander";
//     const expected: Candidate = CANDIDATES[0];

//     httpClientSpyOnPut.put.and.returnValue(asyncData(expected));

//     candidateService.getCandidate(expected).subscribe(
//       candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     );

//     expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
//   });

//   fit('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['post']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);
//     let newCandidate : Candidate = new Candidate();
//     newCandidate.firstName = "Tyerra";
//     newCandidate.lastName = "Smith";


//     const expected: Candidate = newCandidate;

//     httpClientSpyOnPost.post.and.returnValue(asyncData(expected));

//     candidateService.getCandidate(expected).subscribe(
//       candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     );

//     expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
//   });

//   fit('createCandidate() should make an HTTP POST request, and return the candidates that is created', ()=>{
//     httpClientSpyOnGet = jasmine.createSpyObj('http', ['post']);
//     candidateService = new CandidateService(<any> httpClientSpyOnGet, alertsService);
//     let newCandidate : Candidate = new Candidate();
//     newCandidate.firstName = "Tyerra";
//     newCandidate.lastName = "Smith";


//     const expected: Candidate = newCandidate;

//     httpClientSpyOnDelete.delete.and.returnValue(asyncData(expected));

//     candidateService.getCandidate(expected).subscribe(
//       candidate => expect(candidate).toEqual(expected, 'expected candidate')
//     );

//     expect(httpClientSpyOnDelete.delete.calls.count()).toBe(1, 'one call');
//   });

// });
