// import { TestBed, inject } from '@angular/core/testing';

// import { GranularityService } from './granularity.service';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
// import { HydraTrainee } from '../../../../hydra-client/entities/HydraTrainee';
// import { HydraBatch } from '../../../../hydra-client/entities/HydraBatch';
// import { Dependencies } from '../../caliber.test.module';
// import { ReplaySubject } from 'rxjs/ReplaySubject';

// /**
//  * Tested by Mythoua Chang
//  */
// fdescribe('GranularityService', () => {
//     beforeEach(() => {
//       TestBed.configureTestingModule(Dependencies);
//     });

//     fit('should be created', inject([GranularityService], (service: GranularityService) => {
//       expect(service).toBeTruthy();
//     }));

//     fit('pushTrainee(mythoua) should set the currentTrainee to true (it`s not null)',
//         inject([GranularityService], (service: GranularityService) => {
//         const mythoua = new HydraTrainee;
//         mythoua.resourceId = 1;
//         mythoua.trainingStatus = 'trainee';
//         mythoua.college = 'Augsburg University';
//         mythoua.major = 'Computer Science';
//         service['currentTrainee'].next(null);
//         service.pushTrainee(mythoua);
//         expect(service['currentTrainee'].last()).toBeTruthy();
//     }));

//     fit('pushBatch(batch) should set the the currentBatch to true (it`s not null anymore)',
//         inject([GranularityService], (service: GranularityService) => {
//         const batch = new HydraBatch;
//         batch.resourceId = 1;
//         batch.trainingName = 'trainee';
//         batch.trainer = 1;
//         batch.skillType = 'Java';
//         service['currentBatch'].next(null);
//         service.pushBatch(batch);
//         expect(service['currentBatch'].last()).toBeTruthy();
//     }));

//     fit('pushWeek(week) should set the the week to true, (it`s not null anymore)',
//         inject([GranularityService], (service: GranularityService) => {
//         service['currentWeek'].next(null);
//         service.pushWeek(1);
//         expect(service['currentWeek'].last()).toBeTruthy();
//     }));

//     fit('pushReady(true) should set the ready to be true, (it`s not null anymore)',
//         inject([GranularityService], (service: GranularityService) => {
//         service['ready'].next(null);
//         service.pushReady(true);
//         expect(service['ready'].last()).toBeTruthy();
//     }));
// });
