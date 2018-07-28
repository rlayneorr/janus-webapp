import { Bucket } from "./Bucket";
import { CategoryWeight } from "./Category-Weight";

export class Category {
    categoryId: number;
    //categoryName: string;
    title: string;
    categoryWeight: CategoryWeight;
    buckets: Bucket[];
}
