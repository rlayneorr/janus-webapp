import { Assessment } from './Assessment';
import { Trainee } from '../../../hydra-client/entities/Trainee';

export class Grade {
    gradeId: number;
    assessment: Assessment;
    trainee: Trainee;
    dateReceived: any;
    score: number;
}
