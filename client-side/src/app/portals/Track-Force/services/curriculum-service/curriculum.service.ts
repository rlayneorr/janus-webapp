import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment'
import { Curriculum } from '../../models/curriculum.model';

/**
 * @author Nathaniel Blanchard
 * @description methods for grabbing data from api for Curriculum
 */

@Injectable()
export class CurriculumService {
  private url: string = environment.msurl + '8090';

  constructor(private http: HttpClient) { }

  // get all curriculum objects
  getAllCurriculums(): Observable<any> {
    return this.http.get(this.url + '/all/curriculum/');
  }

  /** get a curriculum Object by id
    *@param {number} curriculumId
    */
  getOneCurriculum(curriculumId: number): Observable<any> {
    return this.http.get(this.url + '/one/curriculum/' + curriculumId);
  }

   //-- create a curriculum
  createCurriculum(curriculum: Curriculum): Observable<any> {
    return this.http.post(this.url + '/curriculum/create/', {curriculum: curriculum});
  }

  /** update curriculum Object by object
    *@param {number} clientId
    */
  updateCurriculum(curriculum: Curriculum): Observable<any> {
    return this.http.put(this.url + '/curriculum/update/', {curriculum: curriculum});
  }

  /** delete curriculum Object by id
    *@param {number} curriculumId
    */
  deleteCurriculum(curriculumId: number): Observable<any> {
    return this.http.delete(this.url + '/curriculum/delete/' + curriculumId);
  }

}
