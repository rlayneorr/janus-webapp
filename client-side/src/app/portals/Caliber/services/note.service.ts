import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// rxjs
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/merge';
// services
import {AlertsService} from './alerts.service';
// entities
import {Note} from '../entities/Note';
import {BatchGambit} from '../../../caliber-client/entities/BatchGambit';
import {GambitTrainee} from '../../../caliber-client/entities/GambitTrainee';
import {UrlService} from '../../../caliber-client/services/urls/url.service';

const context = (new UrlService).note;

/**
 * This service manages calls to the web services
 * for Note objects
 */
@Injectable()
export class NoteService {

  /*
   * Holds list of notes for one trainee
   */
  private listSubject = new BehaviorSubject<Note[]>([]);
  private traineeListSubject: BehaviorSubject<Note[]>;

  constructor(private httpClient: HttpClient, alertService: AlertsService) {
    this.traineeListSubject = new BehaviorSubject([]);
  }

  /**
   * Returns the Trainee specific list of notes
   * in an observable
   * @return Observalbe<Note[]>
   */
  public getTraineeList(): Observable<Note[]> {
    return this.traineeListSubject.asObservable();
  }

  public getList(): Observable<Note[]> {
    return this.listSubject.asObservable();
  }
  /*
   =====================
   BEGIN: API calls
   =====================
   */

  /**
   * Retrieves all notes associated with the passed
   * batch ID and week number and pushes the results
   * on the listSubject
   *
   * Delegates the call to 4 separate Note API hooks for:
   * -> batch notes entered by trainer
   * -> trainee notes enetered by trainer
   * -> batch notes enetered by quality control
   * -> trainee notes by quality control
   *
   * @param batchId: number
   * @param week: number
   *
   */
  public fetchByBatchIdByWeek(batchId: number, week: number): void {
    const $nonQcbatchNotes = this.fetchBatchNotesByBatchIdByWeek(batchId, week);
    const $nonQctraineeNotes = this.fetchTraineeNotesByBatchIdByWeek(batchId, week);
    const $qcBatchNotes = this.fetchQcBatchNotesByBatchIdByWeek(batchId, week);
    const $qcTraineeNotes = this.fetchQcTraineeNotesByBatchIdByWeek(batchId, week);

    let results: Note[] = [];

    Observable.merge($nonQcbatchNotes, $nonQctraineeNotes, $qcBatchNotes, $qcTraineeNotes)
      .subscribe(
        (notes) => {results = results.concat(notes); }, // merge all results into one array
        (error) => {}, // errors are already sent to the console in the SpringInterceptor
        () => {this.listSubject.next(results); } // send the merged results
      );
  }


  /**
   * Retrieves all quality control Batch notes associated with
   * the passed batch ID and week number and returns an observable
   * which holds the array of notes found
   *
   * @param batchId: number
   * @param week: number
   *
   * @return Observable<Note[]>
   */
  public fetchQcBatchNotesByBatchIdByWeek(batchId: number, week: number): Observable<Note[]> {
    const url = context.fetchQcBatchNotesByBatchIdByWeek(batchId, week);

    return this.httpClient.get<Note[]>(url);
  }

  /**
   * Retrieves all quality control Trainee notes associated with
   * the passed batch ID and week number and returns an observable
   * which holds the array of notes found
   *
   * @param batchId: number
   * @param week: number
   *
   * @return Observable<Note[]>
   */
  public fetchQcTraineeNotesByBatchIdByWeek(batchId: number, week: number): Observable<Note[]> {
    const url = context.fetchQcTraineeNotesByBatchIdByWeek(batchId, week);

    return this.httpClient.get<Note[]>(url);
  }

  /**
   * Retrieves all trainer entered Batch notes associated with
   * the passed batch ID and week number and returns an observable
   * which holds the array of notes found
   *
   * @param batchId: number
   * @param week: number
   *
   * @return Observable<Note[]>
   */
  public fetchBatchNotesByBatchIdByWeek(batchId: number, week: number): Observable<Note[]> {
    const url = context.fetchBatchNotesByBatchIdByWeek(batchId, week);

    return this.httpClient.get<Note[]>(url);
  }

  /**
   * Retrieves all trainer entered Trainee notes associated with
   * the passed batch ID and week number and returns an observable
   * which holds the array of notes found
   *
   * @param batchId: number
   * @param week: number
   *
   * @return Observable<Note[]>
   */
  public fetchTraineeNotesByBatchIdByWeek(batchId: number, week: number): Observable<Note[]> {
    const url = context.fetchTraineeNotesByBatchIdByWeek(batchId, week);

    return this.httpClient.get<Note[]>(url);
  }

  /**
  * Retrieves all notes associated with the passed
  * trainee and pushes the results on the listSubject
  *
  * @param trainee: Trainee
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  */
  public fetchByTrainee(trainee: GambitTrainee): void {
    const $trainingNotes = this.fetchTrainingNotesByTrainee(trainee);
    const $qcNotes = this.fetchQcNotesByTrainee(trainee);
    let results: Note[] = [];
    Observable.merge($trainingNotes, $qcNotes).subscribe(
      (notes) => {results = results.concat(notes); },
      (error) => {}, // errors are already sent to the console in the SpringInterceptor
      () => {this.traineeListSubject.next(results); } // send the merged results
    );
  }

  /**
  * retrieves all Training notes associated with the passed
  * trainee and pushes the results on the listSubject
  *
  * @param trainee: Trainee
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  */
  public fetchTrainingNotesByTrainee(trainee: GambitTrainee): Observable<Note[]> {
    const url = context.fetchTrainingNotesByTrainee(trainee.traineeId);

    return this.httpClient.get<Note[]>(url);
  }

  /**
  * retrieves all Training notes associated with the passed
  * trainee and pushes the results on the listSubject
  *
  * @param trainee: Trainee
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  */
  public fetchQcNotesByTrainee(trainee: GambitTrainee): Observable<Note[]> {
    const url = context.fetchQcNotesByTrainee(trainee.traineeId);

    return this.httpClient.get<Note[]>(url);
  }


  /**
   * transmits a note to be updated and pushes the
   * updated note on the savedSubject
   *
   * @param note: Note
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   */
  public update(note: Note): void {
    const url = context.update();
    const messages = {
      success: 'Note updated successfully',
      error: 'Note update failed'
    };
    this.httpClient.post(url, note).subscribe(); // yes, the API implemented this as a POST method: @see EvaluationController
  }

  /**
 * transmits a note to be saved and pushes the
 * saved note on the savedSubject
 *
 * @param note: Note
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
 */
  public create(note: Note): void {
    this.save(note);
  }

  /**
   * Transmits a note to be saved and pushes the
   * saved note on the savedSubject
   *
   * @param note: Note
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   */
  public save(note: Note): void {
    const url = context.save();
    const messages = {
      success: 'Note saved successfully',
      error: 'Note save failed'
    };
    this.httpClient.post(url, note).subscribe();
  }

  /**
* Find all QC trainee notes in a batch for the week
*
* @param batch: Batch
* @param note: Note
*/
  public getAllQCTraineeNotes(batch: BatchGambit, note: Note): void {
    const url = context.getAllQCTraineeNotes(batch.batchId, note.week);

    this.listSubject.next([]);

    this.httpClient.get<Note[]>(url).subscribe((notes) => {
      this.listSubject.next(notes);
    });
  }

  /**
  * Find the weekly QC batch note for the week
  *
  * @param batch: Batch
  * @param note: Note
 */

  public findQCBatchNotes(batch: BatchGambit, note: Note): void {
    const url = context.findQCBatchNotes(batch.batchId, note.week);

    this.listSubject.next([]);

    this.httpClient.get<Note[]>(url).subscribe((notes) => {
      this.listSubject.next(notes);
    });
  }

}
