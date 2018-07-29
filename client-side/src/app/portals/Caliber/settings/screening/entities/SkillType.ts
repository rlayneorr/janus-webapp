import { Category } from "./Category";
import { Bucket } from './Bucket';
import { Skill } from '../../../entities/Skill';

export class SkillType {
    skillTypeId: number;
    title: string;
    categories: Category[];
    isActive: boolean;
}
