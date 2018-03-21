import { SubtopicName } from './subtopicname.model';

export class DaysDTO {
    subtopics: SubtopicName[] = [];

    constructor(subtopics: SubtopicName[]) {

        this.subtopics = subtopics;
    }
}
