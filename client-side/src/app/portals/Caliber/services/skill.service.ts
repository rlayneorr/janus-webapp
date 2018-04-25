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
import { Skill } from '../../../hydra-client/entities/Skill';

const context = environment.skill;
/**
* this service manages calls to the web services
* for Skill objects
*/
@Injectable()
export class SkillService {

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
  public findAll(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(context.findAll());
  }

  /**
  * retrieves all ACTIVE categories
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  *
  */
  public findAllActive(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(context.findAllActive());
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
  public findById(id: number): Observable<Skill> {
    return this.httpClient.get<Skill>(context.findById(id));
  }

  /**
   * Retrieves a skill by its name.
   * 
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
   * 
   * @param name
   * 
   * @return Observable<Skill>
   */
  public findByName(name: string): Observable<Skill> {
    return this.httpClient.get<Skill>(context.findByName(name));
  }

  /**
  * transmits a new Skill to be created.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param skill: Skill
  */
  public create(skill: Skill): Observable<Skill> {
    const url = environment.skill.save();
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
    const url = environment.skill.updateById(skill.skillId);
    return this.httpClient.put<Skill>(url, JSON.stringify(skill));
  }

  /**
   * Transmits a Skill to be deleted from the database.
   * 
   * @param skill: Skill
   */
  public delete(skill: Skill): Observable<boolean> {
    // return Observable.of(skill);
    return this.httpClient.delete<boolean>(context.delete(skill.skillId));
  }
}
