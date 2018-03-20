import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bucket } from '../entities/Bucket';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class BucketsService {

  constructor(private http: HttpClient) { }

  url: string = "/bucket/";

  getAllBuckets(){
      return this.http.get(this.url + "getBuckets");
  }

  getBucketById(bucketId: number){
      return this.http.get(this.url + bucketId);
  }

  //Need to create bucket models
  createNewBucket(bucket: Bucket){
      return this.http.post(this.url + "createBucket", bucket, httpOptions);
  }

}
