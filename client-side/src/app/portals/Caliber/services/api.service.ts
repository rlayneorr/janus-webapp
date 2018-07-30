import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// rxjs
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

// util

@Injectable()
export class ApiService {

    public http: HttpClient;

    constructor(httpClient: HttpClient) {
      this.http = httpClient;
    }

  /**
   * performs a GET request that returns an array of
   * objects and returns an Observable of the array
   * of objects
   *
   *
   * @return Observable<T[]>
   * @param url
   */
    public doGet(url: string): Observable<any> {
      return this.http.get<any[]>(url);
    }

  /**
   * performs a PUT request and places the result in the
   * updatedSubject on success
   *
   * @param object: any
   * @param url
   */
    public doPut(object: any, url: string): Observable<any> {
      return this.http.put<any>(url, JSON.stringify(object));
    }

  /**
   * performs a DELETE request and places the passed
   * object in the deletedSubject on success
   *
   * NOTE: the apiUrl MUST include the route parameter
   *
   * @param url
   */
    public doDelete(url: string): Observable<any> {
      return this.http.delete(url);
    }

  /**
   * Performs a POST request and places the result in the
   * savedSubject on success
   *
   * @param object: T
   * @param url
   */
    public doPost(object: any, url: string): Observable<any> {
      return this.http.post<any>(url, JSON.stringify(object));
    }

    /**
     * Used to convert date values returned by the
     * ng-bootstrap module into ISO strings
     *
     * @param date: any
     *
     * @return string
     */
    public stringifyDate(date: any): string {
      let dateString: string;

      if (date.hasOwnProperty('year') === false) {
        dateString = date;
      } else {
        dateString = [
          date.year,
          date.month,
          date.day
        ].join('-');
      }

      return [
        dateString,
        'T00:00:00.0'
      ].join('');
    }
}
