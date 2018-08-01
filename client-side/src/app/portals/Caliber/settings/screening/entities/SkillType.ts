import { Category } from './Category';

export class SkillType {
    skillTypeId: number;
    title: string;
    categories: Category[];
    isActive: boolean;
}
