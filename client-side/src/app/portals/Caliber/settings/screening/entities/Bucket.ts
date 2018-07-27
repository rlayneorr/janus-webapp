import { Question } from "./Question";

export class Bucket {
    bucketId: number;
    skillTypeId: number;
    category: string;
    description: string;
    isActive: boolean;
    questions: Question[];
}
