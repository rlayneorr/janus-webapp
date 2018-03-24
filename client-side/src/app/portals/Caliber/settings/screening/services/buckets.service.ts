import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import{ Subject } from 'rxjs/Subject';
 
import { Bucket } from '../entities/Bucket';

const httpOptions = {
    headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

@Injectable()
export class BucketsService {

  /** This is our base URL endpoint */
  // url: string = "/bucket/";
  url: string = "api/buckets";
  /** Making an Observable */
  bucketSubject = new Subject();

  /** For development only */
  testBucket: Bucket = new Bucket(0, "Java", "This is Java");

  constructor(private http: HttpClient) {}

  /** Gets all of company's buckets from server */
  getAllBuckets(): Observable<Bucket[]>{
    return this.http.get<Bucket[]>(this.url)
    // return this.http.get(this.url + "getBuckets");
  }

  getBucketById(bucketId: number){
      return this.http.get(this.url + bucketId);
  }

  //Need to create bucket models
  createNewBucket(bucket: Bucket){
      return this.http.post(this.url + "createBucket", bucket, httpOptions);
  }



}
