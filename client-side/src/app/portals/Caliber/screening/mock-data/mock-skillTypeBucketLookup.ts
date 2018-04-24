import { Bucket } from '../entities/bucket';
import { SkillTypeBucketLookUp } from '../entities/skillTypeBucketLookup';
import { SkillType } from '../entities/skillType';

export const SKILL_TYPE_BUCKET_LOOKUP: SkillTypeBucketLookUp = {
      skillTypeBucketLookupID: 1,
      skillType: {
          skillTypeID: 51,
          skillTypeName: 'Java EE/Microservices',
          isActive: true
      },
      buckets: [
        { bucketID: 1,
          bucketSkill: 'Basic Java',
          bucketDescription: 'OCA level Java questions',
          isActive: false,
          questions: null
        },
        { bucketID: 2,
          bucketSkill: 'SQL',
          bucketDescription: 'SQL database questions',
          isActive: true,
          questions: null
        },
        { bucketID: 3,
          bucketSkill: 'JavaScript',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 4,
          bucketSkill: 'HTML',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 5,
          bucketSkill: 'CSS',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 6,
          bucketSkill: 'Spring',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        },
        { bucketID: 7,
          bucketSkill: 'Angular',
          bucketDescription: 'JavaScript questions',
          isActive: true,
          questions: null
        }
      ],
      weights: [14, 14, 14, 14, 14, 14, 16]
    }

  ;
