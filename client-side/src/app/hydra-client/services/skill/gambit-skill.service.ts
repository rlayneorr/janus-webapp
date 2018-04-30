import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../../environments/environment';

// entities
import { GambitSkill } from '../../../hydra-client/entities/GambitSkill';

const context = environment.skill;
/**
* this service manages calls to the web services
* for Skill objects
*/
@Injectable()
export class GambitSkillService {

  constructor(public httpClient: HttpClient) {
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
   */
  public findAll(): Observable<GambitSkill[]> {
    return this.httpClient.get<GambitSkill[]>(context.findAll());
  }

  /**
  * retrieves all ACTIVE categories
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  */
  public findAllActive(): Observable<GambitSkill[]> {
    return this.httpClient.get<GambitSkill[]>(context.findAllActive());
  }

  /**
  * retrieves a Skill by its ID
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  *
  * @param id: number
  * @return Observable<GambitSkill>
  */
  public findById(id: number): Observable<GambitSkill> {
    return this.httpClient.get<GambitSkill>(context.findById(id));
  }

  /**
   * Retrieves a skill by its name.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
   *
   * @param name
   * @return Observable<GambitSkill>
   */
  public findByName(name: string): Observable<GambitSkill> {
    return this.httpClient.get<GambitSkill>(context.findByName(name));
  }

  /**
  * transmits a new Skill to be created.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param skill: Skill
  */
  public create(skill: GambitSkill): Observable<GambitSkill> {
    const url = environment.skill.save();
    return this.httpClient.post<GambitSkill>(url, JSON.stringify(skill));
  }

  /**
   * transmits a Skill to be updated.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param skill: Skill
   */
  public update(skill: GambitSkill): Observable<GambitSkill> {
    const url = environment.skill.updateById(skill.skillId);
    return this.httpClient.put<GambitSkill>(url, JSON.stringify(skill));
  }

  /**
   * Transmits a Skill to be deleted from the database.
   *
   * @param skill: GambitSkill
   */
  public delete(skill: GambitSkill): Observable<boolean> {
    return this.httpClient.delete<boolean>(context.delete(skill.skillId));
  }
}
