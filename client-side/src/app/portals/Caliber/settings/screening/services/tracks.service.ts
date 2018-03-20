import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TrackBucket } from '../entities/TrackBucket';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class TracksService {

  constructor(private http: HttpClient) { }

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

  getBucketsByTrack(trackId: number){
      return this.http.get(this.url + "getTopics/" + trackId);
  }

}
