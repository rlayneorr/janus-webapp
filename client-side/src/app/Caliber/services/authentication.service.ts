import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// entities
import { User } from '../entities/User';

@Injectable()
export class AuthenticationService {
  private http: HttpClient;

  private userSubject: BehaviorSubject<User>;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;

    this.userSubject = new BehaviorSubject(null);
   }

   /**
    * returns the observable that contains the currently
    * authenticated user
    *
    * @return Observable<User>
    */
   public getAuthenticatedUser(): Observable<User> {
      return this.userSubject.asObservable();
   }

   /*
    BEGIN: API calls
    */

    /**
     * retrieves the currently authenticated user from the
     * service and pushes it on the userSubject
     */
    public fetchCurrentUser(): void {
      const url = '[unknown]';

      this.http.get<User>(url, { withCredentials: true })
        .subscribe( (user) => {
          this.userSubject.next(user);
        }, (error) => {
          this.userSubject.next(null);
        });
    }

}
