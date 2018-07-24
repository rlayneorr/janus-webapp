<<<<<<< HEAD
// import { Tag } from './tag';
import { SimpleTrainee } from './simpleTrainee';
=======
import { Tag } from './tag';
import { Candidate } from './Candidate';
>>>>>>> 256fa418cfdcc716366b81eb1b38302bde4d1773
import { CaliberTrainer } from './caliberTrainer';
import { SkillType } from './skillType';

/*
  Entity representing all data related to the screening of a candidate
*/
export interface Screening {
  screeningID: number;
  candidateID: number;
  screenerID: number;
  skillTypeID: number;
  compositeScore: number;
  aboutMeCommentary: string;
  generalCommentary: string;
  softSkillCommentary: string;
  startDateTime: Date;
  endDateTime: Date;
  softSkillsVerdict: boolean;
  status: string;
}
