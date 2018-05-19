import { Assessment } from './Assessment';
import { HydraTrainee } from '../../../gambit-client/entities/HydraTrainee';

export class Grade {
    gradeId: number;
    assessment: Assessment;
    trainee: HydraTrainee;
    dateReceived: any;
    score: number;
}
