import {Bucket} from '../entities/bucket';
import { QUESTIONS } from '../mock-data/mock-questions';

export const BUCKETS: Bucket[] = [
    { bucketId: 1,
        skillTypeId: 1,
      category: 'Basic Java',
      description: 'OCA level Java questions',
      isActive: true,
      questions: QUESTIONS
    },
    { bucketId: 2,
        skillTypeId: 2,
        category: 'Basic JavaScript',
        description: 'OCA level JavaScript questions',
        isActive: true,
        questions: QUESTIONS
      }
  ];
