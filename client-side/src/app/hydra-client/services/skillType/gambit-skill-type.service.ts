import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
=======

>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
// rxjs
import { Observable } from 'rxjs/Observable';

// Services
import { environment } from '../../../../environments/environment';

// Entities
<<<<<<< HEAD
import { SkillType } from '../../entities/SkillType';
=======
import { GambitSkillType } from '../../entities/GambitSkillType';
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273

@Injectable()
export class GambitSkillTypeService {

  private context = environment.skillType;

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a skillType by its id.
   * @param id The id of the skillType
   */
<<<<<<< HEAD
  find(id: number): Observable<SkillType> {
    return this.http.get<SkillType>(this.context.find(id));
=======
  find(id: number): Observable<GambitSkillType> {
    return this.http.get<GambitSkillType>(this.context.find(id));
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
  }

  /**
   * Retrieves a skillType by its name.
   * @param name The name of the skillType
   */
<<<<<<< HEAD
  findByName(name: string): Observable<SkillType> {
    return this.http.get<SkillType>(this.context.findByName(name));
=======
  findByName(name: string): Observable<GambitSkillType> {
    return this.http.get<GambitSkillType>(this.context.findByName(name));
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
  }

  /**
   * Retrieves all skillTypes.
   */
<<<<<<< HEAD
  findAll(): Observable<Array<SkillType>> {
    return this.http.get<Array<SkillType>>(this.context.findAll());
=======
  findAll(): Observable<Array<GambitSkillType>> {
    return this.http.get<Array<GambitSkillType>>(this.context.findAll());
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
  }

  /**
   * Transmits a new skillType to be created.
   * @param skillType The SkillType to be created.
   */
<<<<<<< HEAD
  create(skillType: SkillType): Observable<SkillType> {
    return this.http.post<SkillType>(this.context.save(), JSON.stringify(skillType));
=======
  create(skillType: GambitSkillType): Observable<GambitSkillType> {
    return this.http.post<GambitSkillType>(this.context.save(), JSON.stringify(skillType));
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
  }

  /**
   * Transmits a skillType to be updated.
   * @param skillType The skillType to be updated.
   */
<<<<<<< HEAD
  update(skillType: SkillType): Observable<SkillType> {
    return this.http.put<SkillType>(this.context.update(skillType.skillTypeId), JSON.stringify(skillType));
=======
  update(skillType: GambitSkillType): Observable<GambitSkillType> {
    return this.http.put<GambitSkillType>(this.context.update(skillType.skillTypeId), JSON.stringify(skillType));
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
  }

  /**
   * Transmits a skillType to be deleted.
   * @param skillType The skillType to be deleted.
   */
<<<<<<< HEAD
  delete(skillType: SkillType): Observable<boolean> {
    return this.http.delete<boolean>(this.context.delete(skillType.skillTypeId));
  }

}
=======
  delete(skillType: GambitSkillType): Observable<boolean> {
    return this.http.delete<boolean>(this.context.delete(skillType.skillTypeId));
  }

}
>>>>>>> 4e6718b8856aecdc03aaeeb7a65917a752772273
