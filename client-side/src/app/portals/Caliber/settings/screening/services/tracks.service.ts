import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  createTrack(description: string, buckets: string[], weights){
    return this.url.post(this.url + "createTrack", {description: description, buckets: buckets, weights: weights}, httpOptions);
  }

  deactivateTrack(trackId: int){
      return this.url.put(this.url + "deactivateTrack", trackId, httpOptions);
  }

  activateTrack(trackId: int){
      return this.url.put(this.url + "activateTrack", trackId, httpOptions);
  }

  getTracks(){
      return this.url.get(this.url + "getTracks");
  }

  updateTrack(trackId: int){
      return this.url.put(this.url + "updateTrack", trackId, httpOptions);
  }

  getTrackById(trackId: int){
      return this.url.get(this.url + "getTrack/" + trackId);
  }

  getBucketsByTrack(trackId: int){
      return this.url.get(this.url + "getTopics/" + trackId);
  }

}
