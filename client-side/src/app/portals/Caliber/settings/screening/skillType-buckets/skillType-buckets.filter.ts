import { Pipe, PipeTransform } from '@angular/core';

import { Bucket } from '../entities/Bucket';

@Pipe({
    name: 'bucketFilter',
    pure: false
})

export class BucketFilterPipe implements PipeTransform {
    transform(items: Bucket[], filter: Bucket): Bucket[] {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item: Bucket) => this.applyFilter(item, filter));
    }


    applyFilter(bucket: Bucket, filter: Bucket): boolean {
        for (let field in filter) {
            if (filter[field]) {
                if (typeof filter[field] === 'string') {
                    if (bucket.name.toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return false;
                    }
                }
                else if (typeof filter[field] === 'number') {
                    if (bucket[field] !== filter[field]) {
                        return false;
                    }
                }
            }
        }
        return true;

    }
}