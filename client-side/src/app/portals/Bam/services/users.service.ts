import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BamUser } from '../models/bamuser.model';
import { UrlService } from '../../../gambit-client/services/urls/url.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  observe: 'response' as 'response'
};
@Injectable()
export class UsersService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  getUserByID(userId: number): Observable<BamUser> {
    return this.http.get<BamUser>(this.urlService.users.getUserByID(userId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Gets all users.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @returns BamUser[]
   */
  getAllUsers(): Observable<BamUser[]> {
    return this.http.get<BamUser[]>(this.urlService.users.getAllUsersUrl()).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Gets all trainers.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @returns BamUser[]
   */
  getAllTrainers(): Observable<BamUser[]> {
    return this.http.get<BamUser[]>(this.urlService.users.getAllTrainersUrl()).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Gets all associates.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @returns BamUser[]
   */
  getAllAssociates(): Observable<BamUser[]> {
    return this.http.get<BamUser[]>(this.urlService.users.getAllAssociatesUrl()).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Gets all the user in the batch.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @returns BamUser[]
   * @param batchId number
   */
  getUsersInBatch(batchId: number): Observable<BamUser[]> {
    return this.http.get<BamUser[]>(this.urlService.users.getUsersInBatchUrl(batchId)).map(
      data  => {
        return data;
      }
    );
  }

  /**
   * Drops batch from database.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @param batchId number
   */
  dropUserFromBatch(batchId: number) {
    return this.http.post(this.urlService.users.dropUserFromBatchUrl(batchId), httpOptions).map(
      data => {
        return data;
      }
    );
  }
  /**
   * Must pass in the updated Bamuser.
   * @author Jeffery Camacho | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param currentUser BamUser
   */
  updateUser(currentUser: BamUser): Observable<BamUser> {
    return this.http.get<BamUser>(this.urlService.users.updateUserUrl(currentUser.userId)).map(
      data => {
        return data;
      }
    );
  }
  /**
   * Adds a user to the database.
   * @author Jeffery Camacho | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param newUser BamUser
   */
  addUser(newUser: BamUser): Observable<BamUser> {
    return this.http.post<BamUser>(this.urlService.users.addUserUrl(), newUser).map(
      data => {
        return data;
      }
    );
  }
  /**
   * Resets the pass word of the user.
   * Must pass in the user with new password.
   * @author Jeffery Camacho | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param userNewPass BamUser
   */
  resetPassword(userNewPass: BamUser): Observable<BamUser> {
    return this.http.post<BamUser>(this.urlService.users.resetPasswordUrl(), userNewPass).map(
      data => {
        return data;
      }
    );
  }
  /**
   * Recovers the password by sending the new password to an email.
   * @author Jeffery Camacho | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param recoverEmail string
   */
  recoverPassword(recoverEmail: string): Observable<BamUser> {
    return this.http.post<BamUser>(this.urlService.users.resetPasswordUrl(), recoverEmail).map(
      data => {
        return data;
      }
    );
  }

    /**
   * Get users not in batch
   * @author Shane Sistoza, Patrick Kennedy | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param  userId  the user id of user added
   * @param  batchId the batch id of batch to add user to
   */
  getUsersNotInBatch(): Observable<BamUser[]> {
    return this.http.get<BamUser[]>(this.urlService.users.getUsersNotInBatchUrl()).map(
      data => {
        return data;
      }
    );
  }

    /**
   * Adds a user to a batch
   * @author Shane Sistoza, Patrick Kennedy | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param  userId  the user id of user added
   * @param  batchId the batch id of batch to add user to
   */
  addUserToBatch(batchId: number, userId: number): Observable<BamUser[]> {
    return this.http.post<BamUser[]>(this.urlService.users.addUserToBatchUrl(batchId, userId), httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Removes a user from a batch
   * @author Shane Sistoza, Patrick Kennedy | Batch: 1712-dec10-java-steve
   * @returns BamUser
   * @param  userId  the user id of user removed
   */
  removeUserFromBatch(userId: number): Observable<BamUser[]> {
    return this.http.post<BamUser[]>(this.urlService.users.removeUserUrl(userId), httpOptions).map(
      data => {
        return data;
      }
    );
  }

}
