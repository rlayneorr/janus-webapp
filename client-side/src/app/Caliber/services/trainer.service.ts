import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

// services
import { Trainer } from '../entities/Trainer';
import { Observable } from 'rxjs/Observable';
import { EnvironmentService } from './environment.service';

@Injectable()
export class TrainerService {
  private http: HttpClient;

  private listSubject: BehaviorSubject<Trainer[]>;
  private savedSubject: Subject<Trainer>;
  private deletedSubject: Subject<Trainer>;
  private envService: EnvironmentService;

  private sendCredentials: boolean;

  constructor(httpClient: HttpClient, envService: EnvironmentService) {
    this.http = httpClient;
    this.envService = envService;

    this.listSubject = new BehaviorSubject([]);
    this.savedSubject = new Subject();
    this.deletedSubject = new Subject();

    this.sendCredentials = true;
  }

    /**
     * returns a behavior observable of the current
     * trainer list
     *
     * @return Observable<Trainer[]>
     */
  public getList(): Observable<Trainer[]> {
    return this.listSubject.asObservable();
  }

    /**
     * returns a publication observable of the last
     * saved trainer object
     *
     * @return Observable<Trainer>
     */
  public getSaved(): Observable<Trainer> {
    return this.savedSubject.asObservable();
  }

  /**
     * returns a publication observable of the last
     * trainer object deleted
     *
     * @return Observable<Batch>
     */
  public getDeleted(): Observable<Trainer> {
    return this.deletedSubject.asObservable();
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
   * makes a single api call to retrieve a trainer by
   * email
   *
   * sprint-security: @PreAuthorize("permitAll")
   *
   * @param email: stirng
   *
   * @return Observable<Trainer>
   */
  public fetchByEmail(email: string): Observable<Trainer> {
    const url = this.envService.buildUrl('training/trainer/byemail', [ email ]);

    return this.http.get<Trainer>(url, {withCredentials: this.sendCredentials });
  }

   /**
     * retrieves all trainersand pushes them on the
     * list subject
     */
  public fetchAll(): void {
    const url = this.envService.buildUrl('all/trainer/all');

    this.http.get<Trainer[]>(url, { withCredentials: this.sendCredentials } )
      .subscribe( (trainers) => {
        this.listSubject.next(trainers);
      }, (error) => {
        this.listSubject.next([]);
      });
  }

  /**
   * updates a trainer and pushes the updated trainer on the
   * savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param trainer
   */
  public update(trainer: Trainer): void {
    const url = this.envService.buildUrl('vp/trainer/update');
    const data = JSON.stringify(trainer);

    this.http.post<Trainer>(url, data, { withCredentials: this.sendCredentials })
      .subscribe((updatedTrainer) => {
        this.savedSubject.next(updatedTrainer);
      });
  }

  /**
   * deletes a trainer and pushes the deleted trainer on the 
   * deletedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
   *
   * @param trainer
   */
  public delete(trainer: Trainer): void {
    const url = this.envService.buildUrl('all/trainee/delete', [ trainer.trainderId ] );

    this.http.delete(url, { withCredentials: this.sendCredentials })
      .subscribe( () => {
        this.deletedSubject.next(trainer);
      });
  }

}
