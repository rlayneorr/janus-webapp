import { Category } from "../../settings/screening/entities/Category";

/*
    Entity representing a technical track (Java, .NET, PEGA)
*/
export interface SkillType {
    skillTypeId: number;
    title: string;
    categories: Category[];
    isActive: boolean;
}
