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
 //  url: string = "/bucket/";

  //Test URL - not connecting to backend.
  url: string = "api/buckets";

 // Actual URL for connecting to backend
 // url:string = "https://hydra-gateway-service.cfapps.io/bucket-service/bucket/";
  /** Making an Observable */
  bucketSubject = new Subject();
  /** For development only */

  private currentBucket: Bucket;

  constructor(private http: HttpClient) {}
  
  /** Gets all of company's buckets from server */
  getAllBuckets(): Observable<Bucket[]>{
    return this.http.get<Bucket[]>(this.url)
    // return this.http.get(this.url + "getBuckets");
  }

  getBucketById(bucketId: number){
      return this.http.get(this.url + bucketId);
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateBucket (bucket: Bucket): Observable<Bucket> {
      //https://hydra-gateway-service.cfapps.io/question-service/question/bucketQuestions/1
      //https://hydra-gateway-service.cfapps.io/bucket-service/bucket/
    return this.http.post<Bucket>(this.url, bucket, httpOptions)
  }

  /** POST: add a new bucket to the database */
  createNewBucket(bucket: Bucket): Observable<Bucket> {
      console.log(bucket);
      return this.http.post<Bucket>(this.url, bucket, httpOptions);
  }

  setBucket(bucket:Bucket){
     // console.log("Set bucket called");

     this.currentBucket=bucket;
    //  console.log(this.currentBucket);
  }

  getCurrentBucket():Bucket {
     // console.log("Current bucket called");
     if(this.currentBucket!=null){
     return this.currentBucket;
     }
     else{
         console.log("Bucket is null");
     }
  }

  setName(name:string)
  {

      this.currentBucket.name=name;
  }

  getName(id:number){
      return this.currentBucket.name;
  }

  setDescription(desc:string){
      this.currentBucket.description=desc;
  }

  getDescription(){
      return this.currentBucket.description;
  }

}
