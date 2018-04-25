import { Skill } from './Skill';

/** 
 * SkillType stores the main curriculum for a Revature training batch, such as:
 * PEGA, MicroServices, Appian, JTA, .NET, etc.
 */

export class SkillType {
  skillTypeId: number;
  skillTypeName: string;
  skillTypeDesc: string;
  skills: Array<Skill>;
  isActive: boolean;
  isCore: boolean;
}
