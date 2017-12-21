import { Batch } from '././Batch';
import { Category } from './Category';

export class Assessment {
    title: String;
    batch: Batch;
    rawScore: Number;
    type: String;
    week: Number;
    category: Category;
}


