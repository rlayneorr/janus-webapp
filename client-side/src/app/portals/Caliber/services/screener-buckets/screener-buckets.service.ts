import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ScreenerBucket} from '../../screening/entities/screenerBucket';
import {SCREENERBUCKETS} from '../../screening/mock-data/mock-screenerBuckets';

/*

*/
@Injectable()
export class ScreenerBucketsService {

  constructor() { }

  getScreenerBuckets(): Observable<ScreenerBucket[]> {
    return of(SCREENERBUCKETS);
  }

}
