import { Injectable } from '@angular/core';

// entities




// rxjs
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Trainer } from '../../../hydra-client/entities/Trainer';
import { UrlService } from '../urls/url.service';
import { UserRole } from '../../entities/UserRole';


@Injectable()
export class TrainerService {

  public currentTrainer = new Trainer();

  constructor(private httpClient: HttpClient, private urls: UrlService) { }


  /*
    =================================
    GET API CALLS
    =================================
  */

  /**
  * sets current trainer stored on this service
  *
  * @param trainer: HydraTrainer
  */

  public changeCurrentTrainer(trainer: Trainer) {
    this.currentTrainer = trainer;
    return this.httpClient.get<Trainer>(this.urls.trainers.fetchByEmail(trainer.email));
  }

  /**
     * retrieves all trainers and pushes them on the
     * returns HydraTrainer[] Observable
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'QC', 'PANEL')")
     */

  public fetchAll(): Observable<Trainer[]> {
    const url = this.urls.trainers.fetchAll();
    return this.httpClient.get<Trainer[]>(url);

  }
  /**
      * retrieves trainer with given email address
      * returns HydraTrainer Observable
      *
      * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'QC', 'PANEL')")
      *
      * @param email: String
      */

  public fetchByEmail(email: string) {
    const url = this.urls.trainers.fetchByEmail(email);
    return this.httpClient.get<Trainer>(url);
  }

  /**
     * Retrieves all titles for trainers
     * returns String[] Observable
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP')")
     *
     */

  public fetchTitles(): Observable<String[]> {
    const url = this.urls.trainers.getTitles();
    return this.httpClient.get<String[]>(url);

  }
  /**
     * Retrieves all roles for trainers
     * returns String[] Observable
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP')")
     *
     */

  public fetchRoles(): Observable<UserRole[]> {
    const url = this.urls.users.getAllUsersRoles();
    return this.httpClient.get<UserRole[]>(url);
  }

  /*
    =================================
    POST API CALLS
    =================================
  */
  /**
     * creates a trainer and pushes the created trainer on the
     * returns saved HydraTrainer observable
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP')")
     *
     * @param trainer: HydraTrainer
     */

  public create(trainer: Trainer): Observable<Trainer> {
    return this.httpClient.post<Trainer>(this.urls.trainers.save(), trainer);
  }

  /*
  =================================
  PUT API CALLS
  =================================
*/

  /**
     * updates a trainer and pushes the updated trainer on the
     * returnupdated HydraTrainer observable
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP')")
     *
     * @param trainer: HydraTrainer
     */

  public update(trainer: Trainer): Observable<Trainer> {
    return this.httpClient.put<Trainer>(this.urls.trainers.update(), trainer);
  }

  /**
   * Makes a trainer inactive and pushes the inactivated trainer
   * to observable
   * @param trainer
   */
  public makeInactive(trainer: Trainer): Observable<Trainer> {
    return this.httpClient.put<Trainer>(this.urls.users.makeInactive(), trainer);
  }
}
