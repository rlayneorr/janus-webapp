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
   * retrieves all skills
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
   * @returns An Observable list of Skills.
   */
  public fetchAll(): Observable<Skill[]> {
    this.httpClient.get<Skill[]>(urls.skill.fetchAll())
      .subscribe(result => this.listSubject.next(result));
    return this.listSubject.asObservable();
  }

  /**
  * retrieves all ACTIVE skills
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  * @returns An Observable list of Skills.
  */
  public fetchAllActive(): Observable<Skill[]> {
    const url = urls.skill.findAllActive();
    this.httpClient.get<Skill[]>(url)
      .subscribe((results) => this.listSubject.next(results));
    return this.listSubject.asObservable();
  }

  /**
  * Makes a get request for a skill by its name.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  * @param name The name of the Skill you want to find.
  * @returns An Observable of Skill.
  */
  public fetchByName(name: string): Observable<Skill> {
    const url = urls.skill.findByName(name);
    return this.httpClient.get<Skill>(url);
  }

  /**
  * Makes a post request to create a new Skill.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  * @param skill Skill
  * @returns An Observable of Skill.
  */
  public create(skill: Skill): Observable<Skill> {
    const url = urls.skill.save();
    return this.httpClient.post<Skill>(url, JSON.stringify(skill));
  }

  /**
   * Makes a put request to update a Skill.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   * @param skill Skill
   */
  public update(skill: Skill): Observable<Skill> {
    const url = urls.skill.update(skill.skillName);
    return this.httpClient.put<Skill>(url, JSON.stringify(skill));
  }

  /**
   * Makes a delete request on a skill.
   * @param skill Skill
   */
  public delete(skill: Skill): Observable<Skill> {
    const url = urls.skill.delete(skill.skillName);
    return this.httpClient.delete<any>(url);
  }
}
