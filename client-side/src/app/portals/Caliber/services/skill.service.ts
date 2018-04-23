import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { AlertsService } from './alerts.service';
import { environment } from '../../../../environments/environment';

// entities
import { CRUD } from '../interfaces/api.interface';
import { urls } from './urls';
import { Skill } from '../entities/Skill';

/**
* this service manages calls to the web services
* for Skill objects
*/
@Injectable()
export class SkillService implements CRUD<Skill> {

  public listSubject = new BehaviorSubject<Skill[]>([]);

  constructor(public httpClient: HttpClient, public alertService: AlertsService) {
    this.listSubject = new BehaviorSubject([]);
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
   * retrieves all categories
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
   *
   */
  public fetchAll(): Observable<Skill[]> {
    this.httpClient.get<Skill[]>(urls.skill.fetchAll())
      .subscribe(result => this.listSubject.next(result));
    return this.listSubject.asObservable();
  }

  /**
  * retrieves all ACTIVE categories
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  *
  */
  public fetchAllActive(): Observable<Skill[]> {
    const url = urls.skill.findAllActive();
    this.httpClient.get<Skill[]>(url)
      .subscribe((results) => this.listSubject.next(results));
    return this.listSubject.asObservable();
  }

  /**
  * retrieves a Skill by its ID
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  *
  * @param id: number
  *
  * @return Observable<Skill>
  */
  public fetchById(name: string): Observable<Skill> {
    const url = urls.skill.findByName(name);
    return this.httpClient.get<Skill>(url);
  }

  /**
  * transmits a new Skill to be created.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param skill: Skill
  */
  public create(skill: Skill): Observable<Skill> {
    const url = urls.skill.save();
    return this.httpClient.post<Skill>(url, JSON.stringify(skill));
  }

  /**
   * transmits a Skill to be updated.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param skill: Skill
   */
  public update(skill: Skill): Observable<Skill> {
    const url = urls.skill.update(skill.skillName);
    return this.httpClient.put<Skill>(url, JSON.stringify(skill));
  }

  public delete(skill: Skill): Observable<Skill> {
    return Observable.of(skill);
  }
}

