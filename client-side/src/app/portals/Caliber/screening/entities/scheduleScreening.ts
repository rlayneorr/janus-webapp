import { Candidate } from './Candidate';

/*
  Entity representing a screening scheduled to take place
  Specifies candidate, screener's id,
  skill type id, completion status, and date/time.
*/
export class ScheduledScreening {
  scheduledScreeningId: number;
  candidate: Candidate;
  skillTypeId: number;
  scheduledStatus: string;
  trainer: number;
  scheduledDate: Date;
}
