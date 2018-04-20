import { Batch } from './Batch';
import { Skill } from './Skill';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: Batch;
    rawScore: number;
    type: string;
    week: number;
    skill: Skill;
}
