import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class BucketsService {

  constructor(private http: HttpClient) { }

  url: string = "/bucket/";

  getBucketQuestions(bucketId: int){
      return this.http.get(this.url + "bucketQuestions/" + bucketId);
  }

  getAllBuckets(){
      return this.http.get(this.url + "getBuckets");
  }

  getBucketById(bucketId: int){
      return this.http.get(this.url + bucketId);
  }

  //Need to create bucket models
  createNewBucket(bucket){
      return this.http.post(this.url + "createBucket", bucket, httpOptions);
  }

}
