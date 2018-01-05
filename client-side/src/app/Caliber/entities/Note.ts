import { Trainee } from './Trainee';
import { Batch } from './Batch';

export class Note {
    public static TYPE_QCBATCH = 'QC_BATCH';
    public static TYPE_QCTRAINEE = 'QC_TRAINEE';
    public static TYPE_TRAINEE = 'TRAINEE';
    public static TYPE_BATCH = 'BATCH';

    noteId: number;
    content: string;
    week: number;
    batch: Batch;
    trainee: Trainee;
    maxVisibility: number;
    type: string;
    qcFeedback: boolean;
    qcStatus: string;
}
