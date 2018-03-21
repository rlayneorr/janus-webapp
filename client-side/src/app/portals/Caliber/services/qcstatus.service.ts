import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { urls } from './urls';

// Interfaces
import { Fetch } from '../interfaces/api.interface';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QCStatusService implements Fetch<string> {

  private listSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(public http: HttpClient) {
    this.listSubject = new BehaviorSubject([]);
    this.fetchAll();
  }

  public getList(): Observable<string[]> {
    return this.listSubject.asObservable();
  }

  /**
   * retrieve all QCStatus types
   */
  public fetchAll(): Observable<string[]> {
    this.http.get<string[]>(urls.qcStatus.fetchAll()).subscribe((data) => {
      this.listSubject.next(data);
    });
    return this.listSubject.asObservable();
  }

}
