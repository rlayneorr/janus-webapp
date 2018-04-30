import { HydraBatch } from '../../../hydra-client/entities/HydraBatch';
import { GambitSkill } from '../../../hydra-client/entities/GambitSkill';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: HydraBatch;
    rawScore: number;
    type: string;
    week: number;
    skill: GambitSkill;
}
