import { SkillType } from './skillType';
import { Bucket } from '../../settings/screening/entities/Bucket';

/*
    Entity representing the buckets (skills) matched to a given technical track (skillType)
*/
export interface SkillTypeBucketLookUp {
    skillTypeBucketLookupId: number;
    skillType: SkillType;
    buckets: Bucket[];
    weights: number[];
}
