import { Candidate } from './Candidate';
import { SkillType } from './skillType';

/*
  Entity representing a screening scheduled to take place
  Specifies candidate, screener (as a CaliberTrainer object's ID, subject to change),
  skill type, completion status, and time.
*/
export class ScheduledScreening {
  scheduledScreeningId: number;
  candidate: Candidate;
  skillTypeId: number;
  scheduledStatus: string;
  trainer: number;
  scheduledDate: Date;
  skillTypeName : string;
}
