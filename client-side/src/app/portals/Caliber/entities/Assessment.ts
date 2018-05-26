import { GambitBatch } from '../../../gambit-client/entities/GambitBatch';
import { GambitSkill } from '../../../gambit-client/entities/GambitSkill';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: GambitBatch;
    rawScore: number;
    type: string;
    week: number;
    skill: GambitSkill;
}
