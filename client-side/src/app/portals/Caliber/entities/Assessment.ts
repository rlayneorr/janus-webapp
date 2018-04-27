import { HydraBatch } from '../../../hydra-client/entities/HydraBatch';
import { Skill } from './Skill';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: HydraBatch;
    rawScore: number;
    type: string;
    week: number;
    skill: Skill;
}
