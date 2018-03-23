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
/*
    id: number;
    name: string;
    description: string;
    isActive?: boolean = true;
    mappedToTrack?: boolean = false;
    weight?: number;
    */
  //testBucket: Bucket = new Bucket(0, "Java", "This is Java");

  //Making an Observable
  bucketSubject = new Subject();


  constructor(private http: HttpClient) { }
  name:string = null;
    url: string = "/bucket/";
    testBucket: Bucket = new Bucket(3, "Java", "Java is jaja")


    getDescription(){
        if(this.testBucket.name === "Core Java"){
            this.testBucket.description="This is Java";
        }
        else if(this.testBucket.name=== "HTML/CSS"){
            this.testBucket.description="This is HTML/CSS";
        }
        else if(this.testBucket.name=== "SQL"){
            this.testBucket.description="This is the SQL";
        }
    }

  /** Gets all of company's buckets */
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
