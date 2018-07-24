
/*
    Entity representing the candidate being screened
*/

//export interface SimpleTrainee {
export class Candidate {
    candidateId: number;
    firstName: string;
    lastName: string;
    skillTypeID: number;
    skillTypeName: string;
    schedule: Date;
}
