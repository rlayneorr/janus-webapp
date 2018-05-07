import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { Curriculum } from '../../models/curriculum.model';

/**
 * @author Nathaniel Blanchard
 * @description methods for grabbing data from api for Curriculum
 */

@Injectable()
export class CurriculumService {
  private url: string = environment.msurl + '8096';

  constructor(private http: HttpClient) { }

  getAllCurriculums(): Observable<any> {
    return this.http.get(this.url + '/all/curriculum/');
  }

  getOneCurriculum(curriculumId: number): Observable<any> {
    return this.http.get(this.url + '/one/curriculum/' + curriculumId);
  }

  createCurriculum(curriculum: Curriculum): Observable<any> {
    return this.http.post(this.url + '/curriculum/create/', {curriculum: curriculum});
  }

  updateCurriculum(curriculum: Curriculum): Observable<any> {
    return this.http.put(this.url + '/curriculum/update/', {curriculum: curriculum});
  }

  deleteCurriculum(curriculumId: number): Observable<any> {
    return this.http.delete(this.url + '/curriculum/delete/' + curriculumId);
  }

}
