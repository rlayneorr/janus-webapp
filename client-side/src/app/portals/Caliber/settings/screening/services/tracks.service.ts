import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { TrackBucket } from '../entities/TrackBucket';
import { Bucket } from '../entities/Bucket';


const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class TracksService {

  constructor(private http: HttpClient) { }
  public trackBuckets : TrackBucket[]=[];

  url: string = "/track/";

  //Buckets will probably be an array of buckets after model/entity is created
  createTrack(name: string, trackBuckets: TrackBucket[]){
    return this.http.post(this.url + "createTrack", {name: name, trackBuckets: trackBuckets}, httpOptions);
  }

  deactivateTrack(trackId: number){
      return this.http.put(this.url + "deactivateTrack", trackId, httpOptions);
  }

  activateTrack(trackId: number){
      return this.http.put(this.url + "activateTrack", trackId, httpOptions);
  }

  getTracks(){
      return this.http.get(this.url + "getTracks");
  }

  updateTrack(trackBuckets: TrackBucket[]){
      return this.http.put(this.url + "updateTrack", {trackBuckets: trackBuckets}, httpOptions);
  }

  getTrackById(trackId: number){
      return this.http.get(this.url + "getTrack/" + trackId);
  }

  /** Temporary solution for this func, need to double check with back-end **/
  getBucketsByTrack(trackId: number): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.url + "getTopics/" + trackId);
  }

}