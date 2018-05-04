import { GambitSkillType } from '../../entities/GambitSkillType';
import { Trainer } from '../../entities/Trainer';
import { HydraTrainee } from '../../entities/HydraTrainee';
import { HydraAddress } from '../../entities/HydraAddress';

export class CompleteBatch {

  batchId: number;
  resourceId: number;
  trainingName: string;
  trainer: Trainer;
  cotrainer: Trainer;
  skillType: GambitSkillType;
  trainingType: string;
  addressId: number;      //TODO Refactor to Address type
  address: HydraAddress;  //TODO Refactor HydraAddress to GambitAddress when the latter microservice is developed
  location: string;
  goodGradeThreshold: number;
  borderlineGradeThreshold: number;
  startDate: Date;
  endDate: Date;
  week: number;
  noteIds: number[];
  trainees: HydraTrainee[];


  //TODO currently this constructor assumes that Trainer and (co)Trainer objects will be
  //      passed into the constructor if they exist. Trainer must exist (or be initialized by
  //      constructor) in order for de-aggregation from CompleteBatch to GambitBatch, but
  //      (co)Trainer can be null. CompleteBatchService provides the aggregation/de-aggregation
  //      functionality in its CRUD methods
  //
  //      see hydra-client/aggregator/services/completebatch.service
  constructor(batchId: number = 0, resourceId: number = 0, trainingName: string = '',
              trainer: Trainer = null, cotrainer: Trainer = null,
              addressId: number = 0, address: HydraAddress = new HydraAddress(),
              location: string = '', goodGradeThreshold: number = 0,
              borderlineGradeThreshold: number = 0, startDate: Date = new Date(),
              endDate: Date = new Date(), week: number = 0, noteIds: number[] = [],
              trainees: HydraTrainee[] = []) {

  }
}