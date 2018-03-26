import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Tag} from '../entities/Tag'

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class TagsService {

  constructor(private http: HttpClient) { }
  url: string = "/tag/";
  tag: Tag;
  getAllTags(){
      return this.http.get(this.url + "getTags");
  }

  createNewTag(name: string):number{
    this.http.post(this.url + "createNewTag", name, httpOptions).subscribe(data=>{
        this.tag = (data as Tag);
    });
    return this.tag.id;
  }
}
