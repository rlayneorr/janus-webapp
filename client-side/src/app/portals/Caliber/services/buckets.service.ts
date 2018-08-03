import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Bucket} from '../settings/screening/entities/Bucket';
import {UrlService} from '../../../caliber-client/services/urls/url.service';
import {CategoryService} from "./category/category.service";

//import { BUCKETS } from '../mock-data/mock-buckets'

/**
   * Imported urlservice to replace hardcoded endpoints
   *
   * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
   *
   * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
   *
   * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
   *
   * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
   */

const httpOptions = {
    headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

@Injectable()
export class BucketsService {

  /** Making an Observable */
  bucketSubject = new Subject();
  routingToAllBuckets = false;

  private currentBucket: Bucket;

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
    private categoryService: CategoryService
    ) {}

  getAllBuckets(): Observable<Bucket[]> {
      return this.http.get<Bucket[]>(this.urlService.bucket.getAllBuckets());
  }

  getBucketById(bucketId: number) {
      return this.http.get<Bucket>(this.urlService.bucket.getBucketById(bucketId));
  }

  updateBucket (bucket: Bucket) {
    this.categoryService.update({categoryId: bucket.categoryId, title: bucket.category}).subscribe();
    return this.http.put<Bucket>(this.urlService.bucket.updateBucket(bucket.bucketId), bucket, httpOptions);
  }

  createNewBucket(bucket: Bucket): Observable<Bucket> {
      return this.http.post<Bucket>(this.urlService.bucket.createNewBucket(), bucket, httpOptions);
  }

 deleteBucket(bucketId: number) {
    console.log(this.urlService.bucket.deleteBucket(bucketId));
    return this.http.delete<Bucket>(this.urlService.bucket.deleteBucket(bucketId));
    // return this.http.delete<Bucket[]>(this.urlService.bucket.getBucketById(bucketId));
}

// getAllBuckets(): any {
//     return BUCKETS;
// }

// getBucketById(bucketId: number) {
//     BUCKETS.forEach(bucket => {
//         if(bucket.bucketId == bucketId){
//             return bucket;
//         }
//         else
//             return null;
//     });
// }

  setBucket(bucket: Bucket) {
     this.currentBucket = bucket;
  }

  getCurrentBucket(): Bucket {
     if (this.currentBucket != null) {
         return this.currentBucket;
     }
  }

  setName(name: string) {
      this.currentBucket.category = name;
  }

  getName(id: number) {
      return this.currentBucket.category;
  }

  setDescription(desc: string) {
      this.currentBucket.bucketDescription = desc;
  }

  getDescription() {
      return this.currentBucket.bucketDescription;
  }

}
