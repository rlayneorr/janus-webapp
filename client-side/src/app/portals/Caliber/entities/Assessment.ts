import { GambitBatch } from '../../../caliber-client/entities/GambitBatch';
import { GambitSkill } from '../../../caliber-client/entities/GambitSkill';

export class Assessment {
    assessmentId: number;
    title: string;
    batch: GambitBatch;
    rawScore: number;
    type: string;
    week: number;
    skill: GambitSkill;
}
