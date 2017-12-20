import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// services
import { Trainer } from '../entities/Trainer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrainerService {
  private http: HttpClient;
  private listSubject: BehaviorSubject<Trainer[]>;
  private savedSubject: Subject<Trainer>;
  private deletedSubject: Subject<Trainer>;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;

    this.listSubject = new BehaviorSubject([]);
    this.savedSubject = new Subject();
    this.deletedSubject = new Subject();
  }

    /**
     * returns a behavior observable of the current
     * trainer list
     *
     * @return Observable<Trainer[]>
     */
  public getList(): Observable<Trainer[]> {
    return this.listSubject.asObservable();
  }

    /**
     * returns a publication observable of the last
     * saved trainer object
     *
     * @return Observable<Trainer>
     */
  public getSaved(): Observable<Trainer> {
    return this.savedSubject.asObservable();
  }

  /**
     * returns a publication observable of the last
     * trainer object deleted
     *
     * @return Observable<Batch>
     */
  public getDeleted(): Observable<Trainer> {
    return this.deletedSubject.asObservable();
  }

    /*
      =====================
      BEGIN: API calls
      =====================
    */

}
