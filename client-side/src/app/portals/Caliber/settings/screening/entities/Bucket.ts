import {Question} from "./Question";

export class Bucket {
    bucketId: number;
    // skillTypeId: number;
    categoryId : number;
    category: string;
    bucketDescription: string;
    isActive: boolean;
    questions: Question[];
}
