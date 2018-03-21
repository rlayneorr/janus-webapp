import { BamUser } from './bamuser.model';
import { BatchType } from './batchtype.model';

export class Batch {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    trainer: BamUser;
    type: BatchType;

    constructor (id: number, name: string, startDate: Date, endDate: Date, trainer: BamUser, type: BatchType) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.trainer = trainer;
        this.type = type;
    }
}
