export class GambitBatch {

  batchId: number;
  resourceId: number;
  goodGradeThreshold: number;

  addressId: number;

  borderlineGradeThreshold: number;
  week: number;
  trainingName: string;

  trainerId: number;
  cotrainerId: number;

  skillTypeId: number;

  location: string;
  startDate: Date;
  endDate: Date;

  noteIds: number[];

  traineeIds: number[];

  /**
   * Initialize empty batch for BAM service
   *
   */
  constructor(batchId: number = 0, resourceId: number = 0, goodGradeThreshold: number = 0,
              addressId: number = 0, borderlineGradeThreshold: number = 0, week: number = 0,
              trainingName: string = '', trainerId: number = 0, cotrainerId: number = 0,
              skillTypeId: number = 0, location: string = '', startDate: Date = new Date(),
              endDate: Date = new Date(), noteIds: number[] = [], traineeIds: number[] = [] ) {

      this.batchId = batchId;
      this.resourceId = resourceId;
      this.goodGradeThreshold = goodGradeThreshold;
      this.addressId = addressId;
      this.borderlineGradeThreshold = borderlineGradeThreshold;
      this.week = week;
      this.trainingName = trainingName;
      this.trainerId = trainerId;
      this.cotrainerId = cotrainerId;
      this.skillTypeId = skillTypeId;
      this.location = location;
      this.startDate = startDate;
      this.endDate = endDate;
      this.noteIds = noteIds;
      this.traineeIds = traineeIds;

  }

}
