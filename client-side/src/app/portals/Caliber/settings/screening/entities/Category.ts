import { Bucket } from "./Bucket";
import { CategoryWeight } from "./Category-Weight";

export class Category {
    categoryId: number;
    categoryName: string;
    categoryWeight: CategoryWeight;
    buckets: Bucket[];
}
