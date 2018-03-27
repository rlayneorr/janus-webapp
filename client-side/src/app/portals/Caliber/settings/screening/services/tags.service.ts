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
    tag: Tag;
  constructor(private http: HttpClient) { }
  url: string = "/tag/";
  getAllTags(){
      return this.http.get(this.url + "getTags");
  }

  createNewTag(newTag: Tag):Tag{
    this.http.post(this.url + "createNewTag", newTag, httpOptions).subscribe(data=>{
        this.tag = (data as Tag);
    });
    return this.tag;
  }
}
