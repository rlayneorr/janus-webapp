import { Bucket } from "./Bucket";
import { CategoryWeight } from "./Category-Weight";

export class Category {
    categoryId: number;
    title: string;
    categoryWeight: CategoryWeight;
    buckets: Bucket[];
}
