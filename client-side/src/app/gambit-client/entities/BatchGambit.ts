import { GambitTrainer } from './GambitTrainer';
import { GambitAddress } from './GambitAddress';
import { GambitTrainee } from './GambitTrainee';

  /**
   * Last modified by the Avengers
   *
   * formelly named HydraBatch converted it to BatchGambit
   * beause a newer version which was named GambitBatch was
   * aready created but this file still has dependencies
   *
   * Alex Pich | 1803-USF-MAR26 | Wezley Singleton
   *
   * Danny S Chhunn | 1803-USF-MAR26 | Wezley Singleton
   *
   * Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
   *
   * Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
   */
export class BatchGambit {
    resourceId: number;
    trainingName: string;
    trainer: number;
    cotrainer: number;
    skillType: string;
    trainingType: string;
    startDate: Date;
    endDate: Date;
    location: string;
    curriculum: string;
    skills: number;
    trainees: GambitTrainee[];
    notes: string;
    batchId: number;

    constructor(resourceId: number = 0, trainingName: string = '', trainer: number = 0, cotrainer: number = 0, skillType: string = '',
        trainingType: string = '', startDate: Date = new Date(), endDate: Date = new Date(), location: string = '',
        curriculum: string = '', skills: number = 0, trainees: GambitTrainee[] = [], notes: string = '', batchId: number = 0) {
            this.resourceId = resourceId;
            this.trainingName = trainingName;
            this.trainer = trainer;
            this.cotrainer = cotrainer;
            this.skillType = skillType;
            this.trainingType = trainingType;
            this.startDate = startDate;
            this.endDate = endDate;
            this.location = location;
            this.curriculum = curriculum;
            this.skills = skills;
            this.trainees = trainees;
            this.notes = notes;
            this.batchId = batchId;
    }
}
