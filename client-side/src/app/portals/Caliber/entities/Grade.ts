import { Assessment } from './Assessment';
import { GambitTrainee } from '../../../gambit-client/entities/GambitTrainee';

export class Grade {
    gradeId: number;
    assessment: Assessment;
    trainee: GambitTrainee;
    dateReceived: any;
    score: number;
}
