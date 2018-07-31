
/*
    Entity representing the candidate being screened
*/

//export interface SimpleTrainee {
export class Candidate {
    candidateId: number;
    resourceId: number;
    name: string;
    email: string;
    phoneNumber: string;
    skypeId: string;
    profileUrl: string;
    recruiterName: string;
    college: string;
    degree: string;
    major: string;
    techScreenerName: string;
    skillTypeName : string;
}
