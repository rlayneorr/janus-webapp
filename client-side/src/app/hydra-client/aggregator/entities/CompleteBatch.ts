import { SkillType } from '../../entities/SkillType';

export class CompleteBatch {

  batchId: number;
  resourceId: number;
  trainingName: number;
  trainerId: number;    //TODO Refactor to Trainer type
  cotrainerId: number;  //TODO Refactor to Trainer type
  skillType: SkillType;
  addressId: number;    //TODO Refactor to Address type
  location: string;
  goodGradeThreshold: number;
  borderlineGradeThreshold: number;
  startDate: Date;
  endDate: Date;
  week: number;
  noteIds: number[];
  traineeIds: number[];
}
