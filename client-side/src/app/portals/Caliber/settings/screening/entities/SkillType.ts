import { Category } from "./Category";

export class SkillType {
    skillTypeId: number;
    skillTypeName: string;
    categories: Category[]
    isActive: boolean;
}
