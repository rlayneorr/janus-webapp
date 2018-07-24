import { BUCKETS } from './mock-buckets';

import { Category } from '../entities/Category';

export const CATEGORIES: Category[] = [
    { 
        categoryId: 1,
        categoryName: 'Java',
        buckets: BUCKETS
    },
    { 
        categoryId: 2,
        categoryName: 'JavaScript',
        buckets: BUCKETS
    }
  ];
