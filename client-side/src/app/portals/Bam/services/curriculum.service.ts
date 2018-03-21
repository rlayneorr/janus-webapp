import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Curriculum } from '../models/curriculum.model';
import { CurriculumSubtopic } from '../models/curriculumSubtopic.model';
import { SubtopicName } from '../models/subtopicname.model';
import { Subtopic } from '../models/subtopic.model';
import { CurriculumSubtopicDTO } from '../models/curriculumSubtopicDTO.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable()
export class CurriculumService {

  private dataSource = new BehaviorSubject<CurriculumSubtopic[]>([]);
  currentData = this.dataSource.asObservable();

  public allCurriculumData = new BehaviorSubject<Curriculum[]>([]);
  currentAllCurriculumData = this.allCurriculumData.asObservable();

  private allTopicPoolData = new BehaviorSubject<SubtopicName[]>([]);
  currentTopicPoolData = this.allTopicPoolData.asObservable();

  private selectedCurrData = new BehaviorSubject<Curriculum>(null);
  currentSelectedCurr = this.selectedCurrData.asObservable();

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  changeData(data: CurriculumSubtopic[]) {
    this.dataSource.next(data);
  }

  refreshCurriculums(data: Curriculum[]) {
    this.allCurriculumData.next(data);
  }

  changeCurriculum(data: Curriculum) {
  this.selectedCurrData.next(data);
  }

  /**  This gets all curriculums from the API
   *   @author: Mohamad Alhindi
    *  @batch: 1712-Dec11-2017
    *  @return: Observable<Curriculum[]>
    */
  getAllCurriculums(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(environment.curriculum.getCurriculumAllUrl()).map(
      data => {
        return data;
      }
    );
  }

  /** This will get a specific curriculum by the curriculum id
   *  @author: Mohamad Alhindi
    * @batch: 1712-Dec11-2017
    * @return: Observable<Curriculum>
    * @param: Curriculum Id
    */
  getCurriculumById(cid: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(environment.curriculum.getCurriculumByIdUrl(cid)).map(
      data => {
        return data;
      }
    );
  }

  /** This will get a curriculums schedule based on the curriculum id
   *  @author: Mohamad Alhindi
    * @batch: 1712-Dec11-2017
    * @return: Observable<CurriculumSubtopic[]>
    * @param: Curriculum Id
    */
  getSchedualeByCurriculumId(cid: number): Observable<CurriculumSubtopic[]> {
    return this.http.get<CurriculumSubtopic[]>(environment.curriculum.getSchedulesByCurriculumIdUrl(cid)).map(
      data => {
        return data;
      }
    );
  }

  /** Gets the entire topic pool being taught at revature
   *  @author: Mohamad Alhindi
    * @batch:  1712-Dec11-2017
    * @return: Observable<SubtopicName[]>
    */
  getAllTopicPool(): Observable<SubtopicName[]> {
    return this.http.get<SubtopicName[]>(environment.curriculum.getTopicPoolAllUrl()).map(
      data => {
        this.allTopicPoolData.next(data);
        return data;
      }
    );
  }

  /** Gets entire subtopic pool as well as a relationship to which topic they belong to
    * @author: Mohamad Alhindi
    * @batch:  1712-Dec11-2017
    * @return: Observable<Subtopic[]>
    */
  getSubtopicPool(): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(environment.curriculum.getSubtopicPoolAllUrl()).map(
      data => {
        return data;
      }
    );
  }

  /** Allows you to add a curriculum to the backend
    * @author: Carter Taylor
    * @batch: 1712-Dec11-2017
    * @param: CurriculumSubtopicDTO
    */
   addCurriculum(curriculum: CurriculumSubtopicDTO) {
    return this.http.post(environment.curriculum.addCurriculumUrl(), curriculum, httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /** This method allows to set a version of a specific curriculum to master
   *  @author: Carter Taylor
    * @batch: 1712-Dec11-2017
    * @param: Curriculum Id
    */
  markCurriculumAsMaster(curriculumId: number) {
    return this.http.get(environment.curriculum.makeCurriculumMasterByIdUrl(curriculumId)).map(
      data => {
        return data;
      }
    );
  }

  /** Sync batch by batchId getting list of curriculum subtopics related to that batch type
   *  @author: Carter Taylor
    * @batch:  1712-Dec11-2017
    * @param:  Batch Id
    */
  syncBatch(batchId: number) {
    return this.http.get(environment.curriculum.syncBatchByIdUrl(batchId)).map(
      data => {
        return data;
      }
    );
  }

  /** Delete a curriculum and it's CurriculumSubtopics
    * @author: Carter Taylor, James Holzer
    * @batch: 1712-Dec11-2017
    * @param: Curriculum
    */
    deleteCurriculumVersion(curriculumVersion: Curriculum) {
      return this.http.post(environment.curriculum.deleteCurriculumVersionUrl(), curriculumVersion, {
        responseType: 'text',
      });
    }
}
