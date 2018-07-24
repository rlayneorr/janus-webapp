import { Bucket } from './Bucket';
import { Skill } from '../../../entities/Skill';

export class SkillType {
    skillTypeId: number;
    skillTypeName: string;
    skillTypeDesc: string;
    isActive: boolean;
    isCore: boolean;
    skills: Skill[];
}
