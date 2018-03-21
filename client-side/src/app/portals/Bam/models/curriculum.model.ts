import { BamUser } from './bamuser.model';

export class Curriculum {
    id: number;
    curriculumName: string;
    curriculumVersion: number;
    curriculumCreator: BamUser;
    curriculumModifier: BamUser;
    curriculumdateCreated: string;
    curriculumNumberOfWeeks: number;
    isMaster: number;

    constructor(
        id: number,
        curriculumName: string,
        curriculumVersion: number,
        curriculumCreator: BamUser,
        curriculumModifier: BamUser,
        curriculumdateCreated: string,
        curriculumNumberOfWeeks: number,
        isMaster: number) {
            this.id = id;
            this.curriculumName = curriculumName;
            this.curriculumVersion = curriculumVersion;
            this.curriculumCreator = curriculumCreator;
            this.curriculumModifier = curriculumModifier;
            this.curriculumdateCreated = curriculumdateCreated;
            this.curriculumNumberOfWeeks = curriculumNumberOfWeeks;
            this.isMaster = isMaster;
    }
}
