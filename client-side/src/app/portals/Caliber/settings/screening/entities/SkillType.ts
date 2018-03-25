import { Bucket } from './Bucket';

export class SkillType{
    skillTypeId: number;
    skillTypeName: string;
    isActive: boolean;
    buckets: Bucket[];
    weights: number[];
}
