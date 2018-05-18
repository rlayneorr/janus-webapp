import { TestBed, inject } from '@angular/core/testing';

import { GranularityService } from './granularity.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HydraTrainee } from '../../../../gambit-client/entities/HydraTrainee';
import { HydraBatch } from '../../../../gambit-client/entities/HydraBatch';
import { Dependencies } from '../../caliber.test.module';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { CompleteBatch } from '../../../../gambit-client/aggregator/entities/CompleteBatch';
import { GambitSkillType } from '../../../../gambit-client/entities/GambitSkillType';
import { HydraTrainer } from '../../../../gambit-client/entities/HydraTrainer';

/**
 * Tested by Mythoua Chang
 */
describe('GranularityService', () => {
    beforeEach(() => {
      TestBed.configureTestingModule(Dependencies);
    });

    it('should be created', inject([GranularityService], (service: GranularityService) => {
      expect(service).toBeTruthy();
    }));

    it('pushTrainee(mythoua) should set the currentTrainee to true (it`s not null)',
        inject([GranularityService], (service: GranularityService) => {
        const mythoua = new HydraTrainee;
        mythoua.resourceId = 1;
        mythoua.trainingStatus = 'trainee';
        mythoua.college = 'Augsburg University';
        mythoua.major = 'Computer Science';
        service['currentTrainee'].next(null);
        service.pushTrainee(mythoua);
        expect(service['currentTrainee'].last()).toBeTruthy();
    }));

    it('pushBatch(batch) should set the the currentBatch to true (it`s not null anymore)',
        inject([GranularityService], (service: GranularityService) => {
        const batch = new CompleteBatch;
        const john = new HydraTrainer;
        const skill = new GambitSkillType;
        john.userId = 1;
        john.firstName = 'john';

        skill.skillTypeName = 'java';

        batch.resourceId = 1;
        batch.trainingName = 'trainee';
        batch.trainer = john;
        batch.skillType = skill;
        service['currentBatch'].next(null);
        service.pushBatch(batch);
        expect(service['currentBatch'].last()).toBeTruthy();
    }));

    it('pushWeek(week) should set the the week to true, (it`s not null anymore)',
        inject([GranularityService], (service: GranularityService) => {
        service['currentWeek'].next(null);
        service.pushWeek(1);
        expect(service['currentWeek'].last()).toBeTruthy();
    }));

    it('pushReady(true) should set the ready to be true, (it`s not null anymore)',
        inject([GranularityService], (service: GranularityService) => {
        service['ready'].next(null);
        service.pushReady(true);
        expect(service['ready'].last()).toBeTruthy();
    }));
});
