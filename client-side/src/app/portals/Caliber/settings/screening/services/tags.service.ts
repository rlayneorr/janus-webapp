import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class TagsService {

  constructor(private http: HttpClient) { }

  url: string = "/tag/";

  getAllTags(){
      return this.http.get(this.url + "getTags");
  }

  createNewTag(name: string){
      return this.http.post(this.url + "createNewTag", name, httpOptions);
  }
}
