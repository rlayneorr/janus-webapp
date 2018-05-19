import { HydraBatch } from '../../../gambit-client/entities/HydraBatch';
import { GambitSkill } from '../../../gambit-client/entities/GambitSkill';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: HydraBatch;
    rawScore: number;
    type: string;
    week: number;
    skill: GambitSkill;
}
