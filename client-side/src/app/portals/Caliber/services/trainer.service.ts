import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

// services
import { environment } from '../../../../environments/environment';
import { AlertsService } from './alerts.service';

// entities
import { Trainer } from '../entities/Trainer';

// Interfaces
import { CRUD } from '../interfaces/api.interface';

const context = environment.trainer;

/**
 * This service manages calls to the web service
 * for Trainer objects.
 */
@Injectable()
export class TrainerService implements CRUD<Trainer> {

  public listSubject = new BehaviorSubject<Trainer[]>(null);
  public titlesSubject = new BehaviorSubject<String[]>([]);
  public tiersSubject = new BehaviorSubject<String[]>([]);
  public currentTrainer = new BehaviorSubject<Trainer>(null);

  constructor(private httpClient: HttpClient, alertService: AlertsService) {
    this.populateOnStart();
  }

  /**
  * Fetches the data of the service initially and
  * bootstraps default responsive behavior with subscriptions.
  */
  public populateOnStart(): void {
    this.httpClient.get<String[]>(context.getTitles()).subscribe(x => this.titlesSubject.next(x));
    this.httpClient.get<String[]>(context.getTiers()).subscribe(x => this.tiersSubject.next(x));
    this.fetchAll();
  }

  /**
  * Sets current trainer
  */
  public changeCurrentTrainer(trainer: Trainer) {
    this.currentTrainer.next(trainer);
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
  * Makes a single api call to retrieve a trainer by email
  *
  * sprint-security: @PreAuthorize("permitAll")
  *
  * @param email: string
  *
  * @return Observable<Trainer>
  */
  public fetchByEmail(email: string): Observable<Trainer> {
    this.httpClient.get<Trainer>(context.fetchByEmail(email)).subscribe(x => this.currentTrainer.next(x));
    return this.currentTrainer.asObservable();
  }

  /**
  * Retrieves all trainers and pushes them on the
  * list subject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'QC', 'PANEL')")
  */
  public fetchAll(): Observable<Trainer[]> {
    this.httpClient.get<Trainer[]>(context.fetchAll()).subscribe(x => this.listSubject.next(x));
    return this.listSubject.asObservable();
  }

  /**
   * Given a trainer object, posts it to the database and returns the created object.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param trainer: Trainer
   */
  public create(trainer: Trainer): Observable<Trainer> {
    return this.httpClient.post<Trainer>(context.save(), trainer);
  }

  /**
   * Given a trainer object, updates the given trainer in the database
   * and returns the updated trainer object.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param trainer: Trainer
   */
  public update(trainer: Trainer): Observable<Trainer> {
    return this.httpClient.put<Trainer>(context.update(), trainer);
  }

  /**
  * the DELETE method on the API actually updates
  * the Trainer passed as inactive
  *
  * HttpClient adheres to RESTful conventions and does not
  * allow a delete method call to pass a body
  *
  * yeah, what the hell
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param trainer: Trainer
  */
  public delete(trainer: Trainer): Observable<Trainer> {
    return Observable.of(trainer);
  }

  /*
  * ============================================
  * BEGIN: deprecated functions
  *
  * -> retained for backwards compatibility
  * ============================================
  */

  /**
  * @deprecated
  *
  * @see fetchAll()
  */
  public getAll(): void {
    this.fetchAll();
  }


  /**
  * @deprecated
  *
  * @see update()
  *
  */
  public updateTrainer(trainer: Trainer): void {
    this.update(trainer);
  }

  /**
  * @deprecated
  *
  * @see save()
  *
  * @param name: string
  * @param title: string
  * @param email: string
  * @param tier: string   // actually this is a TrainerRole
  *
  */
  public createTrainer(name: string, title: string, email: string, tier: string): void {
    const trainer = new Trainer();

    trainer.firstName = name;
    trainer.title = title;
    trainer.email = email;
    trainer.tier = tier;

    this.create(trainer);
  }

  /**
  * @deprecated
  *
  * @see delete()
  */
  public deleteTrainer(trainer: Trainer) {
    this.delete(trainer);
  }

 }
