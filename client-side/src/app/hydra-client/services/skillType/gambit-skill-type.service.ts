import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs/Observable';

// Services
import { environment } from '../../../../environments/environment';

// Entities
import { GambitSkillType } from '../../entities/GambitSkillType';

@Injectable()
export class GambitSkillTypeService {

  private context = environment.skillType;

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a skillType by its id.
   * @param id The id of the skillType
   */
  find(id: number): Observable<GambitSkillType> {
    return this.http.get<GambitSkillType>(this.context.find(id));
  }

  /**
   * Retrieves a skillType by its name.
   * @param name The name of the skillType
   */
  findByName(name: string): Observable<GambitSkillType> {
    return this.http.get<GambitSkillType>(this.context.findByName(name));
  }

  /**
   * Retrieves all skillTypes.
   */
  findAll(): Observable<Array<GambitSkillType>> {
    return this.http.get<Array<GambitSkillType>>(this.context.findAll());
  }

  /**
   * Transmits a new skillType to be created.
   * @param skillType The SkillType to be created.
   */
  create(skillType: GambitSkillType): Observable<GambitSkillType> {
    return this.http.post<GambitSkillType>(this.context.save(), JSON.stringify(skillType));
  }

  /**
   * Transmits a skillType to be updated.
   * @param skillType The skillType to be updated.
   */
  update(skillType: GambitSkillType): Observable<GambitSkillType> {
    return this.http.put<GambitSkillType>(this.context.update(skillType.skillTypeId), JSON.stringify(skillType));
  }

  /**
   * Transmits a skillType to be deleted.
   * @param skillType The skillType to be deleted.
   */
  delete(skillType: GambitSkillType): Observable<boolean> {
    return this.http.delete<boolean>(this.context.delete(skillType.skillTypeId));
  }

}
