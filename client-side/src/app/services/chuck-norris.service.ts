import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChuckNorrisService {

  private dataSubject = new BehaviorSubject([]);

  joke$: Observable<any> = this.dataSubject.asObservable(); // this is how components should access the data if you want to cache it

  constructor(@Inject(Http) public http: Http) {
    this.fetch();
  }

  fetch(): void {
    this.http.get('http://api.icndb.com/jokes/random/')
    .map(
      resp => resp.json(), // map the resp so all subscribers just get the body of the request as a js object
      // err => // can have the error mapped for all subscribers if you want also
    )
    .subscribe(
      resp => {
        this.dataSubject.next(resp);
      },
      err => {
        // handle the error however you want
      }
    );
  }

}
