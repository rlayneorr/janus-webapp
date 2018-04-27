import { Skill } from './Skill';

export class SkillType {
  skillTypeId: number;
  skillTypeName: string;
  skillTypeDesc: string;
  skills: Array<Skill>;
  isActive: boolean;
  isCore: boolean;
}
