/*
    Entity representing an occurrence of a soft skill violation during a screening
*/
export interface SoftSkillViolation {
    violationId: number;
    screeningId: number;
    violationTypeId: number;
    Time: Date;
    Comment: string;
}
