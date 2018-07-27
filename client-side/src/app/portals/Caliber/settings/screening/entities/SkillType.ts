import { Category } from "./Category";
import { Bucket } from './Bucket';
import { Skill } from '../../../entities/Skill';

export class SkillType {
    skillTypeId: number;
    skillTypeName: string;
    categories: Category[]
}
