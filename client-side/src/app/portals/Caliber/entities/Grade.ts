import { Assessment } from './Assessment';
import { GambitTrainee } from '../../../caliber-client/entities/GambitTrainee';

export class Grade {
    gradeId: number;
    assessment: Assessment;
    trainee: GambitTrainee;
    dateReceived: any;
    score: number;
}
