import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { ApiService } from '../util/api.service';
import { environment } from '../../../../environments/environment';
import { HydraBatchService } from '../../services/batch/hydra-batch.service';

// entities
import { GambitBatch } from '../../entities/GambitBatch';
import { CompleteBatch } from '../entities/CompleteBatch';
import { GambitSkillType } from '../../entities/GambitSkillType';
import { HydraTrainee } from '../../entities/HydraTrainee';
import { Trainer } from '../../entities/Trainer';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { urls } from './urls';
import { stringifyDate } from '../util/utils';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { NullAstVisitor } from '@angular/compiler';


/**
 * this service manages calls to and from the gambit-batch microservice,
 *  aggregating the entity it uses with entities from other microservices
 *  into the CompleteBatch entity and vice-versa
 */
@Injectable()
export class CompleteBatchService {

    public listSubject: BehaviorSubject<Batch[]>;
    public batches: Batch[] = [];
    public savedSubject: Subject<Batch>;
    public updatedSubject: Subject<Batch>;
    public deletedSubject: Subject<Batch>;

    constructor(public http: HttpClient, public apiService: ApiService, public hydraBatchService: HydraBatchService) {
      this.listSubject = new BehaviorSubject([]);
      this.savedSubject = new Subject();
      this.updatedSubject = new Subject();
      this.deletedSubject = new Subject();
    }

    public getList() {
      // this.listSubject.next(data);
      return this.listSubject.asObservable();
    }

    /*
      =====================
      BEGIN: API calls
      =====================
    */

    /**
     * retrieves all training batches regardless of the trainer
     * and pushes them on the list subject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'STAGING', 'PANEL')")
     */
    public fetchAll(): Observable<Batch[]> {
      if (this.batches.length == 0) {
      this.http.get<any[]>(urls.batch.fetchAll())
        .subscribe((results) => {
          console.log(results);
          for (let result of results) {
            this.http.get<any[]>(urls.skill.fetchById(result['skillTypeId'])).subscribe(res => {
              this.batches.push({
                batchId: result['batchId'],
                resourceId: result['resourceId'],
                trainingName: result['trainingName'],
                trainer: null,
                coTrainer: null,
                skill: null,
                skillType: res['skillTypeName'],
                trainingType: result['trainingType'],
                startDate: result['startDate'],
                endDate: result['endDate'],
                location: result['location'],
                address: null,
                goodGradeThreshold: null,
                borderlineGradeThreshold: null,
                trainees: result['trainees'],
                weeks: null
              });
            });
          }
          console.log(this.batches);
          this.listSubject.next(this.batches);
        });
      return this.listSubject.asObservable();
      }
    }

    /**
     * retrieves the batches that belong to the currently
     * authenticated trainer and pushes them on the
     * list subject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'PANEL')")
     */
    // public fetchAllByTrainer() {
    //   this.http.get<any[]>(urls.batch.fetchAllByTrainer())
    //   .subscribe((results) => {
    //     this.listSubject.next(results);
    // });
    // }

    /**
    * @overloade
    * @see save()
    *
    * transmits a batch to be saved in persistent
    * storage on the server and pushes the saved
    * object on the saved subject
    *
    * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
    *
    * @param batch: Batch
    */
    public create(completeBatch: CompleteBatch): Observable<GambitBatch> {
      let gambitBatch: GambitBatch = new GambitBatch();
      gambitBatch.batchId = completeBatch.batchId;
      gambitBatch.addressId = completeBatch.resourceId;
      gambitBatch.trainingName = completeBatch.trainingName;
      gambitBatch.trainerId = completeBatch.trainer.userId;

      //TODO Verify that the logic for creating cotrainers in a batch as initially null
      //       is valid. See aggregator/entities/CompleteBatch constructor for more details
      if (completeBatch.cotrainer != null ) {
        gambitBatch.cotrainerId = completeBatch.cotrainer.userId;
      } else {
        gambitBatch.cotrainerId = 0;
      }

      gambitBatch.skillTypeId = completeBatch.skillType.skillTypeId;
      gambitBatch.addressId = completeBatch.addressId;
      gambitBatch.location = completeBatch.location;
      gambitBatch.goodGradeThreshold = completeBatch.goodGradeThreshold;
      gambitBatch.borderlineGradeThreshold = completeBatch.borderlineGradeThreshold;
      gambitBatch.startDate = completeBatch.startDate;
      gambitBatch.endDate = completeBatch.endDate;
      gambitBatch.week = completeBatch.week;
      gambitBatch.noteIds = completeBatch.noteIds;

      // iterates over the HydraTrainee array in completeBatch to push ids to
      //    the GambitBatch traineeId array
      for (let trainee of completeBatch.trainees) {
        gambitBatch.traineeIds.push(trainee.traineeId);
      }

      return this.hydraBatchService.create(gambitBatch);
    }

    /**
     * transmits a Batch object to be updated and
     * pushes the updated object on th savedSubject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
     *
     * @param batch: Batch
     */
    public update(completeBatch: CompleteBatch): Observable<GambitBatch> {

      let gambitBatch: GambitBatch = new GambitBatch();
      gambitBatch.batchId = completeBatch.batchId;
      gambitBatch.addressId = completeBatch.resourceId;
      gambitBatch.trainingName = completeBatch.trainingName;
      gambitBatch.trainerId = completeBatch.trainer.userId;

      //TODO Verify that the logic for creating cotrainers in a batch as initially null
      //       is valid. See aggregator/entities/CompleteBatch constructor for more details
      if (completeBatch.cotrainer != null ) {
        gambitBatch.cotrainerId = completeBatch.cotrainer.userId;
      } else {
        gambitBatch.cotrainerId = 0;
      }

      gambitBatch.skillTypeId = completeBatch.skillType.skillTypeId;
      gambitBatch.addressId = completeBatch.addressId;
      gambitBatch.location = completeBatch.location;
      gambitBatch.goodGradeThreshold = completeBatch.goodGradeThreshold;
      gambitBatch.borderlineGradeThreshold = completeBatch.borderlineGradeThreshold;
      gambitBatch.startDate = completeBatch.startDate;
      gambitBatch.endDate = completeBatch.endDate;
      gambitBatch.week = completeBatch.week;
      gambitBatch.noteIds = completeBatch.noteIds;

      // iterates over the HydraTrainee array in completeBatch to push ids to
      //    the GambitBatch traineeId array
      for (let trainee of completeBatch.trainees) {
        gambitBatch.traineeIds.push(trainee.traineeId);
      }

      return this.hydraBatchService.update(gambitBatch);
    }

    /**
     * transmits a batch object to be deleted and
     * pushes the deleted object on the deleted
     * subject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP')")
     *
     * @param batch: Batch
     */
    public delete(completeBatch: CompleteBatch): Observable<GambitBatch> {
      let gambitBatch: GambitBatch = new GambitBatch();
      gambitBatch.batchId = completeBatch.batchId;
      gambitBatch.addressId = completeBatch.resourceId;
      gambitBatch.trainingName = completeBatch.trainingName;
      gambitBatch.trainerId = completeBatch.trainer.userId;

      //TODO Verify that the logic for creating cotrainers in a batch as initially null
      //       is valid. See aggregator/entities/CompleteBatch constructor for more details
      if (completeBatch.cotrainer != null ) {
        gambitBatch.cotrainerId = completeBatch.cotrainer.userId;
      } else {
        gambitBatch.cotrainerId = 0;
      }

      gambitBatch.skillTypeId = completeBatch.skillType.skillTypeId;
      gambitBatch.addressId = completeBatch.addressId;
      gambitBatch.location = completeBatch.location;
      gambitBatch.goodGradeThreshold = completeBatch.goodGradeThreshold;
      gambitBatch.borderlineGradeThreshold = completeBatch.borderlineGradeThreshold;
      gambitBatch.startDate = completeBatch.startDate;
      gambitBatch.endDate = completeBatch.endDate;
      gambitBatch.week = completeBatch.week;
      gambitBatch.noteIds = completeBatch.noteIds;

      // iterates over the HydraTrainee array in completeBatch to push ids to
      //    the GambitBatch traineeId array
      for (let trainee of completeBatch.trainees) {
        gambitBatch.traineeIds.push(trainee.traineeId);
      }

      return this.hydraBatchService.delete(gambitBatch);

    }

    /**
     * produces a clone of the batch object that
     * has changes required for the API in order
     * to be processed
     *
     * @param batch: Batch
     *
     * @return any
     */
    // We should find a way to make this have an explicit non-any type
    protected prepareForApi(batch: GambitBatch): any {
      let output: any = {};
      Object.assign(output, batch);

      output.startDate = stringifyDate(batch.startDate);
      output.endDate = stringifyDate(batch.endDate);

      return output;
    }
}
