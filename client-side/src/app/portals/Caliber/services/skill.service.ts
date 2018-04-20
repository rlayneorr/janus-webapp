import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { environment } from '../../../../environments/environment';
import { Fetch } from '../interfaces/api.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { urls } from './urls';

/**
 * Manages API calls for skills
 */
@Injectable()
export class SkillService implements Fetch<string> {

  public skillList = new BehaviorSubject<string[]>([]);

  constructor(private httpClient: HttpClient) {
    this.initialize();
  }

  /**
   * Perform initialization processes
   */
  private initialize(): void {
    this.fetchAll();
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
   * Gets all skills and pushes them on the skillList
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'STAGING','TRAINER','QC','PANEL')")
   */
  public fetchAll() {
    const skillsObservable = this.httpClient.get<string[]>(urls.skill.fetchAll());
    skillsObservable.subscribe(response => this.skillList.next(response));
    return this.skillList.asObservable();
  }

  /**
   * Makes a post request to save user-created skill.
   * @param newSkill The skill you want to save. {skillID:1, skillName:'name', isActive:true}
   */
  // public save(newSkill: Skill) {
  //   const postRequest = this.httpClient.post<Skill>(urls.skill.save(newSkill));
  //   postRequest.susbcribe(response => this.postResponse = response);
  //   return this.postResponse.asObservable();
  // }

}
