import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { EnvironmentService } from './environment.service';
import { environment } from '../../../environments/environment';
import { AlertsService } from './alerts.service';

// entities
import { Trainer } from '../entities/Trainer';

/**
 * this service manages calls to the web service
 * for Trainer objects
 */
@Injectable()
export class TrainerService {
  private http: HttpClient;

  private listSubject: BehaviorSubject<Trainer[]>;
  private titlesSubject: BehaviorSubject<any[]>;
  private tiersSubject: BehaviorSubject<any[]>;
  private savedSubject: Subject<Trainer>;
  private deletedSubject: Subject<Trainer>;
  private envService: EnvironmentService;
  private alertService: AlertsService;

  private sendCredentials: boolean;

  constructor(private httpClient: HttpClient, envService: EnvironmentService, alertService: AlertsService) {
    this.http = httpClient;
    this.envService = envService;
    this.alertService = alertService;

    this.listSubject = new BehaviorSubject([]);
    this.titlesSubject = new BehaviorSubject([]);
    this.tiersSubject = new BehaviorSubject([]);
    this.savedSubject = new Subject();
    this.deletedSubject = new Subject();

    this.sendCredentials = true;

    this.fetchAll();
  }

  populateOnStart() {
    this.getTitles();
    this.getTiers();
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
 * returns a behavior observable of the current
 * title list
 *
 * @return Observable<any[]>
 */
  public getTitlesList(): Observable<Trainer[]> {
    return this.titlesSubject.asObservable();
  }
  /**
  * returns a behavior observable of the current
  * tier list
  *
  * @return Observable<any[]>
  */
  public getTierList(): Observable<Trainer[]> {
    return this.tiersSubject.asObservable();
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
   * @param email: string
   *
   *
   * @return Observable<Trainer>
   */
  public fetchByEmail(email: string): Observable<Trainer> {
    const url = this.envService.buildUrl(`training/trainer/byemail/${email}`);

    return this.http.get<Trainer>(url);
  }

  /**
    * retrieves all trainers and pushes them on the
    * list subject
    *
    * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'QC', 'PANEL')")
    */
  public fetchAll(): void {
    const url = this.envService.buildUrl('all/trainer/all');

    console.log('fetching all trainers in fetchall()');
    this.listSubject.next([]);

    this.http.get<Trainer[]>(url).subscribe((trainers) => {
      this.listSubject.next(trainers);
      this.alertService.success('Retrieved all trainers successfully!');
    },
      (err) => {
        this.alertService.error('Failed to retrieve all trainers!');
      });
  }

  /**
  * creates a trainer and pushes the created trainer on the
  * savedSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param trainer: Trainer
  */
  public create(trainer: Trainer): void {
    const url = this.envService.buildUrl('vp/trainer/create');
    const data = JSON.stringify(trainer);

    this.http.post<Trainer>(url, data).subscribe(
      (savedTrainer) => {
        this.savedSubject.next(savedTrainer);
        this.alertService.success('Created trainer successfully!');
      },
      (err) => {
        this.alertService.error('Failed to create trainer!');
      });
  }

  /**
   * updates a trainer and pushes the updated trainer on the
   * savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param trainer: Trainer
   */
  public update(trainer: Trainer): void {
    const url = this.envService.buildUrl('vp/trainer/update');
    const data = JSON.stringify(trainer);

    this.http.put<Trainer>(url, data).subscribe((updatedTrainer) => {
      this.savedSubject.next(updatedTrainer);
      this.alertService.success('Updated trainer successfully!');
    },
      (err) => {
        this.alertService.error('Failed to update trainer!');
      });
  }

  /**
    * retrieves all titles and pushes them on the
    * titles subject
    *
    * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'QC', 'PANEL')")
    */
  public getTitles(): void {

    this.http.get<any[]>(environment.getAllTitles).subscribe((titles) => {
      this.alertService.success('Got all titles successfully!');
      this.titlesSubject.next(titles);
    },
      (err) => {
        this.alertService.error('Failed to get all titles!');
      });
  }

  /**
  * retrieves all tiers and pushes them on the
  * tiers subject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'QC', 'PANEL')")
  */
  public getTiers(): void {

    this.http.get<any[]>(environment.getAllTiers).subscribe((tiers) => {
      this.alertService.success('Got all roles successfully!');
      this.tiersSubject.next(tiers);
    },
      (err) => {
        this.alertService.error('Failed to get all roles!');
      });
  }

  /**
   * grabs a given trainer and sets their tier to
   * inactive and disables them in the system
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param trainer
   */
  public deleteTrainer(trainer): void {
    this.http.request('delete', environment.deleteTrainer, { body: trainer })
      .subscribe((resp) => {
        this.fetchAll();
        this.alertService.success('Trainer deactivated successfully!');
      },
      (err) => {
        this.alertService.error('Failed to reactivate trainer!');
      });
  }
}
